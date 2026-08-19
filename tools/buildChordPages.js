// 🌟 근음 × 카테고리로 정적 코드 페이지를 만든다.
//    사이트 본체는 자바스크립트로 다이어그램을 그리므로 크롤러 눈에는 빈 도구로 보인다.
//    여기서 만드는 페이지는 같은 데이터를 HTML로 미리 박아 두어, 스크립트 없이도 읽힌다.
const fs = require('fs');
const path = require('path');
const w = require('./env.js');

const DIR = path.join(__dirname, '..');
const OUT = path.join(DIR, 'chords');
const BASE = 'https://mychordstudio.com';

const GROUPS = {
    'Common':        { slug: 'common',       qualities: ['Major', 'm', '5', 'aug', 'dim'] },
    'Major':         { slug: 'major',        qualities: ['maj7', 'add9', '6', 'maj9', 'maj11', 'maj13', '6/9', 'maj7add11', 'maj7add13'] },
    'Minor':         { slug: 'minor',        qualities: ['m7', 'm6', 'm6/9', 'm(maj7)', 'm7add11', 'm(maj7)add11', 'm7add13', 'm(maj7)add13', 'm(add9)', 'm9', 'm(maj9)', 'm11', 'm(maj11)', 'm13'] },
    'Dominant':      { slug: 'dominant',     qualities: ['7', '9', '11', '13', '7add11', '7add13'] },
    'Sus & Altered': { slug: 'sus-altered',  qualities: ['sus2', 'sus4', '7sus4', 'maj7sus4', '7sus2', 'maj7sus2', '6sus4', '6sus2', 'm7b5', 'm7#5', 'dim7', '7b9', '7#9', '7b5', 'aug7', 'aug7b9', 'm7b9'] }
};

const ROOTS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const ROOT_SLUG = { 'C': 'c', 'C#': 'c-sharp', 'D': 'd', 'Eb': 'e-flat', 'E': 'e', 'F': 'f',
                    'F#': 'f-sharp', 'G': 'g', 'G#': 'g-sharp', 'A': 'a', 'Bb': 'b-flat', 'B': 'b' };
// 🌟 개방현으로 울릴 수 있는 근음. 페이지 설명이 근음마다 실제로 달라지는 근거 중 하나다.
const OPEN_ROOTS = new Set(['E', 'A', 'D', 'G', 'B']);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── 다이어그램 (dictView의 렌더링 규칙과 같은 4칸 그리드) ──────────────
function diagram(v) {
    const f = v.frets, fg = v.fingers || [];
    const act = f.filter(x => x > 0);
    const mn = act.length ? Math.min(...act) : 0, mx = act.length ? Math.max(...act) : 0;
    const start = (mx > 0 && mx <= 4 && mn <= 2) ? 1 : (mn > 0 ? mn : 1);
    const top = fr => ((fr - start + 0.5) / 4 * 100).toFixed(1);
    let legend = '', dots = '', barres = '';
    f.forEach((x, i) => {
        const L = (i * 20) + '%';
        if (x === -1) legend += `<div class="v-legend-cell mute">X</div>`.replace('class="', `style="left:${L}" class="`);
        else if (x === 0) legend += `<div style="left:${L}" class="v-legend-cell open">O</div>`;
        else dots += `<div style="left:${L};top:${top(x)}%" class="v-dot">${esc(fg[i] ?? '')}</div>`;
    });
    const groups = {};
    f.forEach((x, i) => { if (x > 0 && fg[i]) (groups[fg[i] + ':' + x] ||= []).push(i); });
    for (const k in groups) {
        const g = groups[k]; if (g.length < 2) continue;
        const a = Math.min(...g), b = Math.max(...g);
        barres += `<div class="v-barre-bar" style="top:${top(f[a])}%;left:${a * 20}%;width:${(b - a) * 20}%"></div>`;
    }
    const lines = [0, 1, 2, 3, 4, 5].map(i => `<div class="v-string-line" style="left:${i * 20}%"></div>`).join('')
        + [0, 25, 50, 75, 100].map(p => `<div class="v-fret-line" style="top:${p}%"></div>`).join('');
    return `<div class="v-chord-card"><div class="v-chord-diagram"><div class="v-grid-wrap"><div class="v-grid-stack">`
        + `<div class="v-legend-row">${legend}</div>`
        + (start === 1 ? '<div class="v-nut-bar"></div>' : '<div class="v-top-border"></div>')
        + `<div class="v-grid" style="height:144px">${start === 1 ? '' : `<div class="v-position-label">${start}</div>`}${lines}${barres}${dots}</div>`
        + `</div></div></div></div>`;
}

// ── 프렛 배열을 사람이 읽는 문자열로 (X 3 2 0 1 0) ───────────────────
const fretText = f => f.map(x => x === -1 ? 'X' : x).join(' ');
const fingerText = g => (g || []).map(x => (x === -1 || x === 0) ? '–' : x).join(' ');

module.exports = { GROUPS, ROOTS, ROOT_SLUG, OPEN_ROOTS, esc, diagram, fretText, fingerText, w, DIR, OUT, BASE };
