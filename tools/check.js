#!/usr/bin/env node
// 코드(보이싱) 데이터 검증 도구. 브라우저 없이 Node에서만 돌아감.
//
//   node tools/check.js validate
//       generatedVoicings.js 전체를 검사한다.
//       - 문법 오류
//       - 구성음이 chordNotesTable과 안 맞는 항목
//       - 같은 root+quality 안의 중복 프렛
//
//   node tools/check.js decode <ROOT> <QUALITY> "<코드들>"
//       숫자 코드를 프렛으로 풀어서 구성음이 맞는지, 기존 데이터와
//       겹치는지 알려준다. 예:
//         node tools/check.js decode F Major "133211 3fret xx1343"
//
// 읽기 전용이다. 어떤 파일도 수정하지 않는다.

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// index.html이 로드하는 순서대로 window에 올린다.
// app.js는 브라우저 API를 몇 개 건드리므로(addEventListener, document 등)
// 여기서 필요한 만큼만 빈 껍데기로 채워준다. 데이터와 getNoteName만 쓸 거라
// UI 쪽 코드는 실행되지 않아도 무방하다.
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
    for (const file of ['app.js', 'chords.js', 'generatedVoicings.js']) {
        const src = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
        try {
            new Function('window', src)(win);
        } catch (err) {
            console.error(`✗ ${file} 로드 실패: ${err.message}`);
            process.exit(1);
        }
    }
    return win;
}

// frets 배열은 항상 [6번줄(저음E), 5번(A), 4번(D), 3번(G), 2번(B), 1번(고음E)] 순서.
// app.js의 getNoteName은 반대 순서를 쓰므로 dictView와 동일하게 5-i로 뒤집는다.
function notesOf(win, frets) {
    const set = new Set();
    frets.forEach((f, i) => { if (f >= 0) set.add(win.getNoteName(5 - i, f)); });
    return [...set];
}

function sameNoteSet(notes, target) {
    return target.every(n => notes.includes(n)) && notes.every(n => target.includes(n));
}

// 숫자 코드 해독.
//   프렛 접두사 없음 → 숫자가 곧 프렛
//   "Nfret" 접두사   → fret = N + (숫자 - 1), 단 0은 개방현
//   x                → 뮤트(-1)
function decode(code, base) {
    return code.split('').map(ch => {
        if (ch === 'x') return -1;
        if (ch === '0') return 0;
        const d = Number(ch);
        if (Number.isNaN(d)) return null;
        return base === null ? d : base + (d - 1);
    });
}

function cmdValidate(win) {
    const gen = win.generatedVoicings || {};
    const table = win.chordNotesTable || {};
    let checked = 0;
    const badNotes = [];
    const dups = [];
    const noFormula = [];

    for (const root of Object.keys(gen)) {
        for (const quality of Object.keys(gen[root])) {
            const target = (table[root] || {})[quality];
            if (!target) { noFormula.push(`${root} ${quality}`); continue; }

            const seen = new Map();
            for (const v of gen[root][quality]) {
                checked++;
                const notes = notesOf(win, v.frets);
                if (!sameNoteSet(notes, target)) {
                    badNotes.push({ root, quality, name: v.name, frets: v.frets.join(','), notes, target });
                }
                const key = v.frets.join(',');
                if (seen.has(key)) {
                    dups.push({ root, quality, frets: key, a: seen.get(key), b: v.name });
                } else {
                    seen.set(key, v.name);
                }
            }
        }
    }

    console.log(`검사한 보이싱: ${checked}개`);

    if (noFormula.length) {
        console.log(`\n! chordNotesTable에 공식이 없는 quality (${noFormula.length}):`);
        noFormula.forEach(s => console.log(`    ${s}`));
    }
    if (badNotes.length) {
        console.log(`\n✗ 구성음 불일치 (${badNotes.length}):`);
        badNotes.forEach(b => console.log(
            `    ${b.root} ${b.quality} "${b.name}" [${b.frets}]\n` +
            `        나온 음: ${b.notes.join(', ')}\n` +
            `        맞는 음: ${b.target.join(', ')}`));
    }
    if (dups.length) {
        console.log(`\n✗ 같은 프렛 중복 (${dups.length}):`);
        dups.forEach(d => console.log(`    ${d.root} ${d.quality} [${d.frets}] — "${d.a}" / "${d.b}"`));
    }

    if (!badNotes.length && !dups.length) {
        console.log('\n✓ 문법 정상. 구성음 불일치·중복 없음.');
        return 0;
    }
    return 1;
}

function cmdDecode(win, root, quality, codesArg) {
    const target = (win.chordNotesTable[root] || {})[quality];
    if (!target) {
        console.error(`✗ ${root} ${quality} 공식을 chordNotesTable에서 못 찾음`);
        return 1;
    }

    // 기존 데이터(수록 코드 + 생성 코드) 프렛 목록
    const existing = new Map();
    const curated = ((win.chordDatabase || {})[root] || {})[quality] || [];
    const generated = ((win.generatedVoicings || {})[root] || {})[quality] || [];
    for (const v of [...curated, ...generated]) {
        if (v && v.frets) existing.set(v.frets.join(','), v.name || '(이름없음)');
    }

    console.log(`${root}${quality === 'Major' ? '' : quality} 구성음: ${target.join(', ')}`);
    console.log(`기존 보이싱: ${existing.size}개\n`);

    let base = null; // null이면 프렛 접두사 없음(숫자=프렛)
    let ok = 0, bad = 0, dup = 0;

    for (const tok of codesArg.split(/\s+/).filter(Boolean)) {
        // "0fret"과 "기본"은 접두사 없음(숫자=프렛)과 같은 뜻이므로 먼저 걸러낸다.
        // 그러지 않으면 아래 숫자 패턴이 0을 잡아 base=0으로 오해한다.
        if (/^0fret$/i.test(tok) || tok === '기본') { base = null; continue; }
        const m = /^(\d+)fret$/i.exec(tok);
        if (m) { base = Number(m[1]); continue; }

        const frets = decode(tok, base);
        if (!frets || frets.length !== 6 || frets.some(f => f === null)) {
            console.log(`? ${tok.padEnd(8)} — 6자리가 아니거나 해독 불가`);
            bad++;
            continue;
        }
        const notes = notesOf(win, frets);
        const label = `${base === null ? '기본' : base + 'fret'} ${tok}`;
        const key = frets.join(',');

        if (!sameNoteSet(notes, target)) {
            console.log(`✗ ${label.padEnd(16)} [${key}]  음: ${notes.join(', ')}  ← 불일치`);
            bad++;
        } else if (existing.has(key)) {
            console.log(`= ${label.padEnd(16)} [${key}]  중복 → "${existing.get(key)}"`);
            dup++;
        } else {
            console.log(`+ ${label.padEnd(16)} [${key}]  음: ${notes.join(', ')}  ← 추가 가능`);
            ok++;
        }
    }

    console.log(`\n추가 가능 ${ok} / 중복 ${dup} / 불일치·해독불가 ${bad}`);
    return 0;
}

function main() {
    const [cmd, ...rest] = process.argv.slice(2);
    const win = loadApp();

    if (cmd === 'validate' || !cmd) return cmdValidate(win);
    if (cmd === 'decode') {
        const [root, quality, ...codes] = rest;
        if (!root || !quality || !codes.length) {
            console.error('사용법: node tools/check.js decode <ROOT> <QUALITY> "<코드들>"');
            return 1;
        }
        return cmdDecode(win, root, quality, codes.join(' '));
    }
    console.error(`알 수 없는 명령: ${cmd}`);
    return 1;
}

process.exit(main());
