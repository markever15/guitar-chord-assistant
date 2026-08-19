// 🌟 근음 × 카테고리 정적 페이지 생성기.
//    본체는 자바스크립트로 다이어그램을 그려서, 크롤러 눈에는 버튼만 있는 빈 도구로 보인다.
//    여기서 만드는 페이지는 같은 데이터를 HTML로 미리 박아 두어 스크립트 없이도 읽힌다.
const fs = require('fs');
const path = require('path');
const M = require('./buildChordPages.js');
const { GROUPS, ROOTS, ROOT_SLUG, OPEN_ROOTS, esc, diagram, fretText, fingerText, w, DIR, OUT, BASE } = M;

const DISPLAY = { 'Common': 'Common', 'Major': 'Major-family', 'Minor': 'Minor-family',
                  'Dominant': 'Dominant', 'Sus & Altered': 'Suspended & Altered' };

// 🌟 카테고리 설명은 근음이 달라도 같다. 그래서 짧게 두고, 근음마다 실제로 달라지는
//    내용(개방현 유무 · 프렛 범위 · 보이싱 수 · 조성에서의 자리)을 본문으로 삼는다.
const BLURB = {
    'Common': 'The five shapes every player meets first: the plain major and minor triads, the power chord, and the two triads that alter the fifth.',
    'Major': 'Major seventh and the colours stacked on top of it. These are the chords that sound settled and bright rather than restless.',
    'Minor': 'Minor seventh and its extensions, plus the minor-major seventh family. The same darkness as a plain minor chord, with more air in the upper voices.',
    'Dominant': 'A major triad with a flat seventh on top. These chords lean forward and want to resolve, which is what makes a turnaround work.',
    'Sus & Altered': 'Chords that swap the third for a second or a fourth, and chords that bend the fifth or the ninth out of shape. Suspensions blur the major/minor question; altered chords sharpen the pull toward whatever comes next.'
};

const CH = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const idx = n => CH.indexOf(n);

// 🌟 이 근음이 I·IV·V가 되는 조성. 근음마다 실제로 달라지는 정보다.
function keyContext(root) {
    const i = idx(root);
    return { I: root, IV: CH[(i + 5) % 12], V: CH[(i + 7) % 12] };
}

const chordName = (root, q) => (q === 'Major' ? root : root + q);
const chordId = (root, q) => chordName(root, q).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function head(title, desc, canonical, depth) {
    const up = '../'.repeat(depth);
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="canonical" href="${canonical}">
    <link rel="stylesheet" href="${up}style.css">
    <script src="${up}analytics.js" defer></script>
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9070889592582221" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
    <nav class="main-nav">
        <a class="nav-tab" href="${up}index.html#tab-recognizer">🔍 Chord Finder</a>
        <a class="nav-tab active" href="${up}chords/">📖 Chord Dictionary</a>
        <a class="nav-tab" href="${up}index.html#tab-blog">✍️ Tips</a>
    </nav>
`;
}

function foot(depth) {
    const up = '../'.repeat(depth);
    return `    <div class="ad-slot ad-slot-banner" aria-hidden="true"><span class="ad-slot-label">Advertisement</span></div>
    <footer class="site-footer">
        <nav class="site-footer-nav">
            <a href="${up}index.html">Home</a>
            <a href="${up}chords/">All Chords</a>
            <a href="${up}about.html">About</a>
            <a href="${up}privacy.html">Privacy Policy</a>
        </nav>
        <p class="site-footer-note">&copy; 2026 Guitar Chord Assistant</p>
    </footer>
</div>
</body>
</html>
`;
}

function collect(root, groupName) {
    const out = [];
    GROUPS[groupName].qualities.forEach(q => {
        let vs;
        try { vs = w.dictView.getChordVoicings(root, q); } catch (e) { return; }
        if (!vs || !vs.length) return;
        out.push({ q, vs, notes: (w.chordNotesTable[root] || {})[q] || [] });
    });
    return out;
}

// ── 근음 × 카테고리 페이지 ─────────────────────────────────────────
function categoryPage(root, groupName) {
    const g = GROUPS[groupName];
    const rs = ROOT_SLUG[root];
    const entries = collect(root, groupName);
    if (!entries.length) return null;

    const totalV = entries.reduce((a, e) => a + e.vs.length, 0);
    const allFrets = entries.flatMap(e => e.vs.flatMap(v => v.frets.filter(x => x > 0)));
    const lo = Math.min(...allFrets), hi = Math.max(...allFrets);
    const openCount = entries.reduce((a, e) => a + e.vs.filter(v => v.frets.includes(0)).length, 0);
    const k = keyContext(root);

    const title = `${root} ${DISPLAY[groupName]} Chords for Guitar — ${entries.length} chords, ${totalV} shapes`;
    const desc = `Every playable ${root} ${DISPLAY[groupName].toLowerCase()} chord voicing for guitar: `
        + `${entries.length} chord types and ${totalV} diagrams, each with the fingering marked.`;
    const canonical = `${BASE}/chords/${rs}/${g.slug}/`;

    const depth = 3;
    let html = head(title, desc, canonical, depth);
    html += `    <article class="chord-page">
        <p class="crumb"><a href="../../">All chords</a> &rsaquo; <a href="../">${esc(root)}</a> &rsaquo; ${esc(DISPLAY[groupName])}</p>
        <h1>${esc(root)} ${esc(DISPLAY[groupName])} Chords</h1>
        <p class="chord-lede">${esc(BLURB[groupName])}</p>

        <p class="chord-stats"><strong>${entries.length}</strong> chord types &middot; <strong>${totalV}</strong> playable voicings &middot; frets <strong>${lo}&ndash;${hi}</strong> &middot; <strong>${openCount}</strong> use an open string</p>

        <p>${openCount === 0
            ? `None of these shapes use an open string, so every one of them is movable &mdash; the same grip slides along the neck to give you the other eleven roots.`
            : `${openCount} of the ${totalV} shapes below let at least one string ring open, which usually makes them easier to hold and fuller to hear than the barred equivalents. The rest are movable grips.`}
        In the keys you are most likely to meet them, these chords sit as the <strong>I</strong> of ${esc(k.I)}, the <strong>IV</strong> of ${esc(k.IV)}, and the <strong>V</strong> of ${esc(k.V)}.</p>

        <p class="chord-jump">Jump to: ${entries.map(e => `<a href="#${esc(chordId(root, e.q))}">${esc(chordName(root, e.q))}</a>`).join(' &middot; ')}</p>
`;

    entries.forEach(e => {
        html += `
        <section class="chord-block" id="${esc(chordId(root, e.q))}">
            <div class="chord-header-container">
                <div class="chord-formula-bar">
                    <h2 class="formula-title notranslate">${esc(chordName(root, e.q))}</h2>
                    <div class="notes-badges">${e.notes.map((n, i) => `<span class="note-badge notranslate${i === 0 ? ' is-root' : ''}">${esc(n)}</span>`).join('')}</div>
                </div>
                <span class="v-legend-note">${e.vs.length} ${e.vs.length === 1 ? 'shape' : 'shapes'}
                    &middot; <a href="${'../'.repeat(depth)}index.html?c=${encodeURIComponent(root)}&amp;q=${encodeURIComponent(e.q)}#tab-dictionary">open &amp; play</a></span>
            </div>
            <div class="vertical-voicing-grid">${e.vs.map(diagram).join('')}</div>
            <details class="chord-table-wrap">
                <summary>Fret and finger numbers for ${esc(chordName(root, e.q))}</summary>
                <table class="chord-table">
                    <thead><tr><th>Frets (low E &rarr; high E)</th><th>Fingering</th></tr></thead>
                    <tbody>${e.vs.map(v => `<tr><td class="notranslate">${esc(fretText(v.frets))}</td><td class="notranslate">${esc(fingerText(v.fingers))}</td></tr>`).join('')}</tbody>
                </table>
            </details>
        </section>`;
    });

    // 🌟 Common은 근음 페이지 본문에 있으므로 슬러그가 아니라 상위로 링크한다.
    const others = Object.keys(GROUPS).filter(x => x !== groupName);
    const href = o => (o === 'Common' ? '../' : `../${GROUPS[o].slug}/`);
    const label = o => (o === 'Common' ? `${root} triads &amp; power chords` : `${root} ${DISPLAY[o]} chords`);
    html += `
        <p class="open-in-app">Every chord above has an <strong>open &amp; play</strong> link that opens it in the interactive dictionary, where you can hear it and step through the shapes. You can also <a href="../../../index.html#tab-recognizer">work backwards from a shape you are already holding</a>.</p>

        <nav class="chord-more">
            <h2>More ${esc(root)} chords</h2>
            <ul>${others.map(o => `<li><a href="${href(o)}">${label(o)}</a></li>`).join('')}</ul>
            <h2>The same chords on other roots</h2>
            <ul class="root-row">${ROOTS.filter(r => r !== root).map(r => `<li><a href="../../${ROOT_SLUG[r]}/${g.slug}/">${esc(r)}</a></li>`).join('')}</ul>
        </nav>
    </article>
`;
    return { file: path.join(OUT, rs, g.slug, 'index.html'), html: html + foot(3), url: canonical };
}

// ── 근음 목차 페이지 ───────────────────────────────────────────────
function rootPage(root) {
    const rs = ROOT_SLUG[root];
    const k = keyContext(root);
    const rows = Object.keys(GROUPS).map(gn => {
        const entries = collect(root, gn);
        return { gn, n: entries.length, v: entries.reduce((a, e) => a + e.vs.length, 0),
                 openV: entries.reduce((a, e) => a + e.vs.filter(x => x.frets.includes(0)).length, 0),
                 names: entries.map(e => chordName(root, e.q)) };
    }).filter(r => r.n);
    const total = rows.reduce((a, r) => a + r.v, 0);
    const kinds = rows.reduce((a, r) => a + r.n, 0);

    const title = `${root} Guitar Chords — all ${kinds} chord types with fingerings`;
    const desc = `Every ${root} chord for guitar, grouped by family: ${kinds} chord types and ${total} playable shapes, each diagram marked with the fingering.`;
    const canonical = `${BASE}/chords/${rs}/`;

    // 🌟 Common 계열(트라이어드·파워코드)은 이 근음으로 검색했을 때 사람들이 실제로 찾는 것이다.
    //    별도 페이지로 한 단계 더 들어가게 두지 않고 근음 페이지 본문으로 올린다.
    //    (그래야 근음 페이지가 목차만 있는 얄팍한 페이지가 되지 않는다.)
    const common = collect(root, 'Common');
    const commonV = common.reduce((a, e) => a + e.vs.length, 0);
    const rest = rows.filter(r => r.gn !== 'Common');

    const depth = 2;
    let html = head(title, desc, canonical, depth);
    html += `    <article class="chord-page">
        <p class="crumb"><a href="../">All chords</a> &rsaquo; ${esc(root)}</p>
        <h1>${esc(root)} Guitar Chords</h1>
        <p class="chord-lede">${kinds} chord types built on ${esc(root)}, from the plain triad through to the extended and altered shapes &mdash; ${total} playable voicings in total, every one with its fingering marked.</p>
        <p>${(() => {
            const openV = rows.reduce((a, r) => a + r.openV, 0);
            const pct = Math.round(openV / total * 100);
            if (openV === 0) return `Not one ${esc(root)} shape here uses an open string, so every grip on this page is movable &mdash; learn it once and slide it to any other root.`;
            if (pct >= 40) return `${pct}% of the ${esc(root)} shapes here (${openV} of ${total}) let at least one string ring open, so a lot of them sound fuller than the barre versions and are easier to hold.`;
            return `${openV} of the ${total} ${esc(root)} shapes here use an open string; the rest are movable grips that transpose by sliding.`;
        })()}
        As a key centre, ${esc(root)} is the <strong>I</strong> chord; it also turns up as the <strong>IV</strong> of ${esc(k.IV)} and the <strong>V</strong> of ${esc(k.V)}.</p>

        <h2>The five you will reach for first</h2>
        <p>${esc(BLURB['Common'])} Between them these ${common.length} chords account for ${commonV} of the ${total} ${esc(root)} shapes on this site.</p>
        <p class="chord-jump">Jump to: ${common.map(e => `<a href="#${esc(chordId(root, e.q))}">${esc(chordName(root, e.q))}</a>`).join(' &middot; ')}</p>
`;
    common.forEach(e => {
        html += `
        <section class="chord-block" id="${esc(chordId(root, e.q))}">
            <div class="chord-header-container">
                <div class="chord-formula-bar">
                    <h2 class="formula-title notranslate">${esc(chordName(root, e.q))}</h2>
                    <div class="notes-badges">${e.notes.map((n, i) => `<span class="note-badge notranslate${i === 0 ? ' is-root' : ''}">${esc(n)}</span>`).join('')}</div>
                </div>
                <span class="v-legend-note">${e.vs.length} ${e.vs.length === 1 ? 'shape' : 'shapes'}
                    &middot; <a href="${'../'.repeat(depth)}index.html?c=${encodeURIComponent(root)}&amp;q=${encodeURIComponent(e.q)}#tab-dictionary">open &amp; play</a></span>
            </div>
            <div class="vertical-voicing-grid">${e.vs.map(diagram).join('')}</div>
            <details class="chord-table-wrap">
                <summary>Fret and finger numbers for ${esc(chordName(root, e.q))}</summary>
                <table class="chord-table">
                    <thead><tr><th>Frets (low E &rarr; high E)</th><th>Fingering</th></tr></thead>
                    <tbody>${e.vs.map(v => `<tr><td class="notranslate">${esc(fretText(v.frets))}</td><td class="notranslate">${esc(fingerText(v.fingers))}</td></tr>`).join('')}</tbody>
                </table>
            </details>
        </section>`;
    });

    html += `
        <h2>The rest of the ${esc(root)} chords</h2>
        <div class="chord-family-list">`;
    rest.forEach(r => {
        html += `
            <section class="chord-family">
                <h2><a href="${GROUPS[r.gn].slug}/">${esc(root)} ${esc(DISPLAY[r.gn])} chords</a></h2>
                <p class="chord-stats"><strong>${r.n}</strong> chord types &middot; <strong>${r.v}</strong> shapes</p>
                <p class="chord-names notranslate">${r.names.map(esc).join(' &middot; ')}</p>
            </section>`;
    });
    html += `
        </div>
        <p class="open-in-app">Every chord above has an <strong>open &amp; play</strong> link that opens it in the interactive dictionary, where you can hear it and step through the shapes. You can also <a href="../../index.html#tab-recognizer">work backwards from a shape you are already holding</a>.</p>

        <nav class="chord-more">
            <h2>Other roots</h2>
            <ul class="root-row">${ROOTS.filter(r => r !== root).map(r => `<li><a href="../${ROOT_SLUG[r]}/">${esc(r)}</a></li>`).join('')}</ul>
        </nav>
    </article>
`;
    return { file: path.join(OUT, rs, 'index.html'), html: html + foot(2), url: canonical };
}

// ── 전체 목차 ─────────────────────────────────────────────────────
function indexPage() {
    let total = 0, kinds = 0;
    const per = ROOTS.map(root => {
        const rows = Object.keys(GROUPS).map(gn => collect(root, gn));
        const v = rows.flat().reduce((a, e) => a + e.vs.length, 0);
        const n = rows.flat().length;
        total += v; kinds += n;
        // 🌟 카드마다 "51 chord types"만 반복하면 열두 장이 구분이 안 된다.
        //    근음마다 실제로 달라지는 것(기본 코드 이름 · shapes 수)을 보여준다.
        const common = collect(root, 'Common').map(e => esc(chordName(root, e.q)));
        // 🌟 "근음이 개방현인가"가 아니라 "실제로 개방현을 쓰는 폼이 있는가"로 센다.
        //    C는 개방현이 아니지만 C 메이저(x32010)는 대표적인 개방 코드다.
        const openV = rows.flat().reduce((a, e) => a + e.vs.filter(x => x.frets.includes(0)).length, 0);
        return { root, n, v, common, openV };
    });
    const title = `Guitar Chord Dictionary — every chord, every shape, with fingerings`;
    const desc = `A free guitar chord dictionary: ${kinds} chords across 12 roots and ${total} playable voicings, each diagram marked with the fingering you would actually use.`;
    const canonical = `${BASE}/chords/`;

    let html = head(title, desc, canonical, 1);
    html += `    <article class="chord-page">
        <h1>Guitar Chord Dictionary</h1>
        <p class="chord-lede">Every chord in the dictionary, laid out so you can read it without running anything: ${kinds} chords across the twelve roots, ${total} playable shapes, each with its fingering marked.</p>
        <p>Pick a root to see its chords grouped by family, or jump straight into a family. If you already know the shape and want the name instead, the <a href="../index.html">Chord Finder</a> works the other way round &mdash; tap the fretboard and it tells you what you are holding.</p>
        <div class="chord-family-list">`;
    per.forEach(p => {
        html += `
            <section class="chord-family">
                <h2><a href="${ROOT_SLUG[p.root]}/">${esc(p.root)} chords</a></h2>
                <p class="chord-stats"><strong>${p.v}</strong> shapes &middot; <strong>${p.openV}</strong> use an open string</p>
                <p class="chord-names notranslate">${p.common.join(' &middot; ')}</p>
                <div class="chord-links">${Object.keys(GROUPS).filter(gn => gn !== 'Common').map(gn =>
                    `<a href="${ROOT_SLUG[p.root]}/${GROUPS[gn].slug}/">${esc(DISPLAY[gn])}</a>`).join('')}</div>
            </section>`;
    });
    html += `
        </div>
    </article>
`;
    return { file: path.join(OUT, 'index.html'), html: html + foot(1), url: canonical };
}

function buildAll() {
    const pages = [indexPage()];
    ROOTS.forEach(root => {
        pages.push(rootPage(root));
        // 🌟 Common은 근음 페이지 본문에 들어가므로 별도 페이지를 만들지 않는다.
        Object.keys(GROUPS).filter(gn => gn !== 'Common').forEach(gn => {
            const p = categoryPage(root, gn);
            if (p) pages.push(p);
        });
    });
    pages.forEach(p => {
        fs.mkdirSync(path.dirname(p.file), { recursive: true });
        fs.writeFileSync(p.file, p.html);
    });
    return pages;
}

module.exports = { categoryPage, rootPage, indexPage, buildAll, DISPLAY, chordName, chordId };
