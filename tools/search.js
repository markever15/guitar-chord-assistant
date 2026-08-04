#!/usr/bin/env node
// 지판 전수 탐색으로 어떤 코드의 연주 가능한 폼을 찾는다. 읽기 전용.
//
//   node tools/search.js <ROOT> <QUALITY>
//
// 조건: 구성음 전부 울림 · 루트가 최저음 · 프렛 벌림 4프렛 이내 ·
//       울리는 줄 5개 이상 · 중간 뮤트 없음 · computeFingers 배정 성공 ·
//       기존 generatedVoicings.js와 프렛 중복 없음.

const fs = require('fs');
const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..');

function loadApp() {
    const win = {
        addEventListener() {},
        document: {
            querySelector: () => null,
            querySelectorAll: () => [],
            getElementById: () => null,
            createElement: () => ({ style: {}, classList: { add() {} }, appendChild() {} }),
        },
        location: { hash: '' },
    };
    for (const file of ['app.js', 'chords.js', 'generatedVoicings.js', 'dictView.js']) {
        const src = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
        try { new Function('window', src + '\n;if(typeof computeFingers!=="undefined")window.computeFingers=computeFingers;')(win); }
        catch (e) { if (file !== 'dictView.js') throw e; }
    }
    return win;
}

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const OPEN = [4, 9, 2, 7, 11, 4]; // E A D G B e (semitone index)

const [root, quality] = process.argv.slice(2);
const win = loadApp();
const target = ((win.chordNotesTable[root] || {})[quality] || []).slice();
if (!target.length) { console.error(`✗ ${root} ${quality} 공식 없음`); process.exit(1); }
const targetIdx = new Set(target.map(n => NOTES.indexOf(n)));
const rootIdx = NOTES.indexOf(target[0]);

const existing = new Set(
    ((win.generatedVoicings[root] || {})[quality] || []).map(v => v.frets.join(','))
);

const MAXF = 16;
const results = [];

function noteAt(s, f) { return (OPEN[s] + f) % 12; }

// 각 줄에서 쓸 수 있는 프렛 후보 (뮤트 -1, 개방 0, 1..MAXF)
const perString = OPEN.map((_, s) => {
    const opts = [-1];
    for (let f = 0; f <= MAXF; f++) if (targetIdx.has(noteAt(s, f))) opts.push(f);
    return opts;
});

const combo = new Array(6);
function rec(s) {
    if (s === 6) { check(combo.slice()); return; }
    for (const f of perString[s]) { combo[s] = f; rec(s + 1); }
}

function check(frets) {
    const sounding = frets.filter(f => f !== -1);
    if (sounding.length < 5) return;
    // 중간 뮤트 금지 (울리는 줄 사이에 -1 이 끼면 탈락)
    const first = frets.findIndex(f => f !== -1);
    const last = 5 - [...frets].reverse().findIndex(f => f !== -1);
    for (let i = first; i < last; i++) if (frets[i] === -1) return;
    // 최저음이 루트
    if (noteAt(first, frets[first]) !== rootIdx) return;
    // 구성음 전부
    const got = new Set(frets.map((f, s) => (f === -1 ? null : noteAt(s, f))).filter(x => x !== null));
    for (const t of targetIdx) if (!got.has(t)) return;
    // 벌림 4프렛 이내
    const fretted = frets.filter(f => f > 0);
    if (fretted.length && Math.max(...fretted) - Math.min(...fretted) > 3) return;
    if (existing.has(frets.join(','))) return;
    const fingers = win.computeFingers(frets);
    if (!fingers) return;
    results.push({ frets, fingers });
}

rec(0);
results.sort((a, b) => {
    const af = a.frets.filter(f => f > 0), bf = b.frets.filter(f => f > 0);
    return Math.min(...af) - Math.min(...bf);
});
console.log(`${root}${quality} 구성음: ${target.join(', ')} / 찾은 폼 ${results.length}개`);
results.forEach(r => console.log(`  [${r.frets.join(',')}]  fingers [${r.fingers.join(',')}]`));
