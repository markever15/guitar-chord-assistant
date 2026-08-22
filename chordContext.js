// 🌟 코드 하나를 "어디에 쓰는지"로 이어 주는 다리.
//    사전은 "이 코드에 어떤 폼이 있나"까지만 답한다. 정작 곡을 쓸 때 필요한 건
//    이 코드가 어느 조성의 몇 번째 자리이고, 그 자리를 쓰는 진행이 무엇인가다.
//    새 데이터 없이 다이아토닉 표만으로 계산되므로 사전 탭과 정적 페이지가 같이 쓴다.

window.chordContext = (() => {
    const SEMI = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
    const idx = n => SEMI.indexOf(n);
    const at = (root, step) => SEMI[(idx(root) + step) % 12];

    const SCALES = {
        major: { steps: [0, 2, 4, 5, 7, 9, 11],
                 roman: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
                 quals: {
                     triad:   ['Major', 'm', 'm', 'Major', 'Major', 'm', 'dim'],
                     seventh: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'],
                     add9:    ['add9', 'm(add9)', 'm(add9)', 'add9', 'add9', 'm(add9)', null],
                     sixth:   ['6', 'm6', null, '6', '6', 'm6', null],
                     ninth:   ['maj9', 'm9', 'm7', 'maj9', '9', 'm9', 'm7b5']
                 } },
        minor: { steps: [0, 2, 3, 5, 7, 8, 10],
                 roman: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
                 quals: {
                     triad:   ['m', 'dim', 'Major', 'm', 'm', 'Major', 'Major'],
                     seventh: ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7'],
                     add9:    ['m(add9)', null, 'add9', 'm(add9)', 'm(add9)', 'add9', 'add9'],
                     sixth:   ['m6', null, '6', 'm6', null, '6', '7'],
                     ninth:   ['m9', 'm7b5', 'maj9', 'm9', 'm7', 'maj9', '9']
                 } }
    };

    const MODE_LABEL = { major: 'major', minor: 'minor' };

    // 🌟 다이아토닉 표에 안 잡히는 코드들. "어느 조성에도 없다"로 뭉뚱그리면 거짓말이 된다.
    //    파워 코드는 3도가 없어서 오히려 어디에나 들어가고, sus는 해결을 미루는 장치이며,
    //    aug·dim7은 진짜로 조성 밖에서 끌어오는 코드다. 셋을 같은 문장으로 설명할 수 없다.
    //    이제 자리 판정은 구성음으로 하므로, 여기 남는 것은 정말로 어느 장·단조에도
    //    통째로 들어가지 않는 코드뿐이다. 그런 코드도 이유가 제각각이라 한 문장으로 못 묶는다.
    //    성질 이름은 근음이 달라도 같으므로 품질만으로 찾는다.
    const OUTSIDE = {
        'dim7': 'Four notes stacked a minor third apart, so it belongs to no key in particular. '
              + 'That symmetry makes it a pivot: it can slide into almost any chord, which is why it '
              + 'turns up at the seams where a song changes direction.',
        'aug': 'The fifth is raised, which puts a note outside every major and minor key. It almost '
             + 'always appears on the way somewhere &mdash; holding a major chord for a moment while the '
             + 'top voice climbs toward the next one.',
        '7b5': 'A dominant seventh with the fifth flattened. It is a V chord under tension, and it '
             + 'resolves like one; the flat fifth just sharpens the pull.',
        'aug7': 'A dominant seventh with the fifth raised. Same job as a plain seventh &mdash; pulling '
              + 'toward the chord a fourth above &mdash; with more strain in the middle of the chord.',
        '7b9': 'A dominant seventh with a flattened ninth on top. The ninth is outside the key, which is '
             + 'the point: it makes the resolution feel earned. Very common resolving into a minor chord.',
        '7#9': 'The Hendrix chord. A dominant seventh carrying both a major third and a raised ninth &mdash; '
             + 'which is the minor third in disguise. Major and minor at once, and neither.',
        'aug7b9': 'A dominant seventh with both the fifth and the ninth altered. It exists to make the '
                + 'chord it resolves to sound like relief.',
        'm7b9': 'A minor seventh carrying a flattened ninth. The ninth grinds against the root, so it is '
              + 'usually passing through rather than sitting still.',
        'm7#5': 'A minor seventh with the fifth raised. The raised fifth is outside the key, and it often '
              + 'reads as a chord in motion rather than a place to rest.',
        'm(maj7)': 'A minor triad with a major seventh. It comes from harmonic minor, not from any plain '
                 + 'major or minor scale &mdash; that half-step between the seventh and the root is what makes '
                 + 'it sound suspenseful. Think spy themes and stairwells of descending bass lines.',
        'm(maj9)': 'The minor-major seventh with a ninth on top. Same harmonic-minor origin, more air above it.',
        'm(maj11)': 'The minor-major seventh stacked up to the eleventh. From harmonic minor; dense and unresolved.',
        'm(maj7)add11': 'A minor-major seventh with the eleventh added. Harmonic-minor colour with a fourth ringing against the third.',
        'm(maj7)add13': 'A minor-major seventh with the thirteenth added. Harmonic-minor colour, opened out at the top.'
    };

    // 🌟 진행 정의는 progView가 갖고 있다. 여기에 베껴 두면 한쪽만 고쳐져 반드시 어긋난다.
    const presetsFor = mode => ((window.progView && window.progView.PRESETS) || {})[mode] || [];

    // 🌟 어느 조성의 몇 번째 자리인지 찾는다.
    //    성질 표를 손으로 적어두면 maj13·m11·6/9처럼 깊게 쌓은 코드가 전부 누락된다.
    //    Cmaj13은 분명히 C장조의 I인데 표에 없다는 이유로 "조성 밖"이 되면 거짓말이다.
    //    그래서 표 대신 "구성음이 그 조성 음계에 모두 들어가는가"로 판정한다.
    //    파워 코드가 어디에나 걸리는 것도 이 방식이면 자연히 맞아떨어진다.
    const DEGREE_ORDER = [0, 4, 3, 5, 1, 2, 6];   // I · V · IV · vi · ii · iii · vii 순으로 보여준다

    function scaleNotes(key, mode) {
        return new Set(SCALES[mode].steps.map(st => at(key, st)));
    }

    function placements(root, quality) {
        const tones = ((window.chordNotesTable || {})[root] || {})[quality];
        if (!tones || !tones.length) return [];
        const out = [];
        SEMI.forEach(key => {
            Object.keys(SCALES).forEach(mode => {
                const sc = SCALES[mode];
                const inKey = scaleNotes(key, mode);
                // 이 조성 음계 밖 음이 하나라도 있으면 그 조성의 코드가 아니다.
                if (!tones.every(n => inKey.has(n))) return;
                const deg = sc.steps.findIndex(st => at(key, st) === root);
                if (deg === -1) return;   // 근음이 음계에 없으면 이 조성의 화음이 아니다
                out.push({ key, mode, degree: deg, roman: sc.roman[deg] });
            });
        });
        return out.sort((a, b) =>
            DEGREE_ORDER.indexOf(a.degree) - DEGREE_ORDER.indexOf(b.degree)
            || SEMI.indexOf(a.key) - SEMI.indexOf(b.key));
    }

    // 🌟 그 자리를 쓰는 진행 중에서도, 그 자리의 성질까지 이 코드와 맞는 것만 고른다.
    //    Cmaj7에 "I – V – vi – IV"를 추천하면 안 된다 - 그 진행의 I은 3화음 C다.
    function progressionsFor(placement, root, quality) {
        const pv = window.progView;
        if (!pv || !pv.diatonicFor) return [];
        const dia = pv.diatonicFor(placement.key, placement.mode);
        return presetsFor(placement.mode).filter(p =>
            (p.chords || []).some(slot => {
                const r = pv.resolveSlot(slot, dia);
                return r.root === root && r.quality === quality;
            })
        ).map(p => ({ name: p.name, key: placement.key, mode: placement.mode }));
    }

    // 사전 탭·정적 페이지가 함께 쓰는 요약
    function summarise(root, quality, limit) {
        const places = placements(root, quality);
        const max = limit || 4;
        const progs = [];
        const seen = new Set();
        places.forEach(p => progressionsFor(p, root, quality).forEach(pr => {
            const k = pr.name + pr.key + pr.mode;
            if (seen.has(k) || progs.length >= max) return;
            seen.add(k); progs.push(pr);
        }));
        return { places, progressions: progs };
    }

    const keyLabel = p => `${p.key} ${MODE_LABEL[p.mode]}`;

    // 다이아토닉에 안 잡히는 코드의 설명. 성질마다 이유가 다르다.
    function outsideText(root, quality) {
        const label = quality === 'Major' ? root : root + quality;
        const o = OUTSIDE[quality];
        if (o) return `<strong class="notranslate">${label}</strong> &mdash; ${o}`;
        return `<strong class="notranslate">${label}</strong> does not sit inside the seven chords of any one key. `
            + `That is what makes it useful: dropped into a progression it reads as a departure rather than a step.`;
    }

    // 🌟 조성 자리를 문장으로. 개수에 따라 말이 달라져야 한다.
    //    파워 코드처럼 열두 곳에 걸리는 코드에 로마숫자를 열두 개 나열하면 정보가 아니라 소음이다.
    const MAIN = [0, 3, 4];   // I · IV · V - 곡의 뼈대가 되는 자리
    function placementText(root, quality, places) {
        const label = quality === 'Major' ? root : root + quality;
        const tag = `<strong class="notranslate">${label}</strong>`;
        const romans = [...new Set(places.map(p => p.roman))];

        if (places.length <= 3) {
            return `${tag} is the <strong>${romans.join('</strong> and the <strong>')}</strong> chord `
                 + `of ${places.map(p => `<span class="notranslate">${keyLabel(p)}</span>`).join(' and ')}.`;
        }
        if (places.length <= 8) {
            return `${tag} turns up as the <strong>${romans.slice(0, 4).join('</strong>, <strong>')}</strong> `
                 + `chord across ${places.length} keys:`;
        }
        // 아홉 곳 넘게 걸리면 왜 그런지를 말해 주는 편이 낫다.
        const main = places.filter(p => MAIN.includes(p.degree));
        return `${tag} fits <strong>${places.length}</strong> of the twenty-four major and minor keys &mdash; `
             + `a chord this open leaves most of the scale untouched. `
             + `These are the ${main.length} where it carries the weight, as the <strong>I</strong>, <strong>IV</strong> or <strong>V</strong>:`;
    }

    // 🌟 자리가 셋 이하면 문장이 이미 조성 이름을 말한다. 그 뒤에 목록을 또 붙이면
    //    "V and VII chord of F major and D minor. V of F major, VII of D minor" 처럼 겹친다.
    const needsList = places => places.length > 3;

    // 화면에 보여줄 자리. 많으면 뼈대가 되는 자리(I·IV·V)만 남긴다.
    function displayPlaces(places) {
        if (places.length <= 8) return places;
        const main = places.filter(p => MAIN.includes(p.degree));
        return main.length ? main : places.slice(0, 8);
    }

    // ── 사전 탭에 붙이는 화면 ────────────────────────────────────────
    function render(containerId, root, quality) {
        const host = document.getElementById(containerId);
        if (!host) return;
        host.innerHTML = '';
        if (!root || !quality) return;

        const { places, progressions } = summarise(root, quality, 5);
        if (!places.length) {
            host.innerHTML = `<p class="ctx-empty">${outsideText(root, quality)}</p>`;
            return;
        }

        const label = quality === 'Major' ? root : root + quality;
        const wrap = document.createElement('div');
        wrap.className = 'ctx-block';
        const shown = displayPlaces(places);
        wrap.innerHTML = `<div class="comp-header"><span class="comp-title">🎼 Where <span class="notranslate">${label}</span> belongs</span></div>`
            + `<p class="ctx-line">${placementText(root, quality, places)}</p>`
            + (needsList(places)
                ? `<div class="ctx-keys">${shown.map(p =>
                    `<span class="ctx-key"><span class="ctx-roman">${p.roman}</span> <span class="notranslate">${keyLabel(p)}</span></span>`).join('')}</div>`
                : '');

        if (progressions.length) {
            const list = document.createElement('div');
            list.className = 'ctx-progs';
            list.innerHTML = '<p class="ctx-line">Progressions built on that spot:</p>';
            progressions.forEach(pr => {
                const b = document.createElement('button');
                b.className = 'ctx-prog';
                b.innerHTML = `<span class="ctx-prog-name">${pr.name}</span>`
                    + ` <span class="ctx-prog-key notranslate">in ${pr.key} ${MODE_LABEL[pr.mode]}</span>`;
                b.addEventListener('click', () => {
                    if (window.progView && window.progView.loadPreset) {
                        window.progView.loadPreset(pr.key, pr.mode, pr.name);
                    }
                });
                list.appendChild(b);
            });
            wrap.appendChild(list);
        }
        host.appendChild(wrap);
    }

    return { placements, progressionsFor, summarise, render, keyLabel, outsideText,
             placementText, displayPlaces, needsList, SCALES };
})();
