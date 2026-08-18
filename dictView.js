// dictView.js

// 🌟 입력한 텍스트에서 루트음을 인식하기 위한 이명동음(enharmonic) 정규화 테이블
const CHORD_SEARCH_ROOT_ALIASES = {
    'C': 'C', 'B#': 'C',
    'C#': 'C#', 'Db': 'C#',
    'D': 'D',
    'D#': 'Eb', 'Eb': 'Eb',
    'E': 'E', 'Fb': 'E',
    'F': 'F', 'E#': 'F',
    'F#': 'F#', 'Gb': 'F#',
    'G': 'G',
    'G#': 'G#', 'Ab': 'G#',
    'A': 'A',
    'A#': 'Bb', 'Bb': 'Bb',
    'B': 'B', 'Cb': 'B'
};

// 🌟 입력한 텍스트에서 코드 퀄리티를 인식하기 위한 표기법 별칭 테이블 (소문자로 비교)
const CHORD_SEARCH_QUALITY_ALIASES = {
    '': 'Major', 'maj': 'Major', 'major': 'Major',
    'm': 'm', 'min': 'm', 'minor': 'm', '-': 'm',
    'm7': 'm7', 'min7': 'm7', '-7': 'm7',
    '7': '7', 'dom7': '7',
    'maj7': 'maj7', 'm7+': 'maj7',
    'sus2': 'sus2',
    'sus4': 'sus4', 'sus': 'sus4',
    '5': '5',
    'm7b5': 'm7b5', 'm7-5': 'm7b5', 'halfdim': 'm7b5', 'halfdim7': 'm7b5', 'ø': 'm7b5', 'ø7': 'm7b5',
    '9': '9',
    'maj9': 'maj9',
    '6': '6',
    'm6': 'm6', 'min6': 'm6', '-6': 'm6',
    'dim': 'dim', 'o': 'dim',
    'dim7': 'dim7', 'o7': 'dim7',
    'add9': 'add9',
    'aug': 'aug', '+': 'aug', '#5': 'aug',
    'm9': 'm9', 'min9': 'm9',
    '11': '11',
    'm11': 'm11', 'min11': 'm11',
    'maj11': 'maj11',
    '13': '13',
    'm13': 'm13', 'min13': 'm13',
    'maj13': 'maj13',
    '7sus4': '7sus4', '7sus': '7sus4',
    '6/9': '6/9', '69': '6/9',
    '7b9': '7b9',
    '7#9': '7#9', '7+9': '7#9',
    'm(maj7)': 'm(maj7)', 'mmaj7': 'm(maj7)', 'minmaj7': 'm(maj7)', 'm/maj7': 'm(maj7)',
    'm(add9)': 'm(add9)', 'madd9': 'm(add9)',
    'm(maj9)': 'm(maj9)', 'mmaj9': 'm(maj9)', 'minmaj9': 'm(maj9)', 'm/maj9': 'm(maj9)',
    'm(maj11)': 'm(maj11)', 'mmaj11': 'm(maj11)', 'minmaj11': 'm(maj11)', 'm/maj11': 'm(maj11)',
    'm6/9': 'm6/9', 'm69': 'm6/9', 'min6/9': 'm6/9', 'm6add9': 'm6/9',
    '7add11': '7add11', '7(add11)': '7add11', 'dom7add11': '7add11',
    'maj7add11': 'maj7add11', 'maj7(add11)': 'maj7add11',
    'm7add11': 'm7add11', 'm7(add11)': 'm7add11', 'min7add11': 'm7add11', 'min7(add11)': 'm7add11',
    'm(maj7)add11': 'm(maj7)add11', 'mmaj7add11': 'm(maj7)add11', 'minmaj7add11': 'm(maj7)add11', 'm/maj7add11': 'm(maj7)add11',
    'mm7add11': 'm(maj7)add11', 'mm7(add11)': 'm(maj7)add11',
    '7add13': '7add13', '7(add13)': '7add13', 'dom7add13': '7add13',
    'maj7add13': 'maj7add13', 'maj7(add13)': 'maj7add13',
    'm7add13': 'm7add13', 'm7(add13)': 'm7add13', 'min7add13': 'm7add13', 'min7(add13)': 'm7add13',
    'm(maj7)add13': 'm(maj7)add13', 'mmaj7add13': 'm(maj7)add13', 'minmaj7add13': 'm(maj7)add13', 'm/maj7add13': 'm(maj7)add13',
    'mm7add13': 'm(maj7)add13', 'mm7(add13)': 'm(maj7)add13',
    '7b5': '7b5', '7-5': '7b5', 'dom7b5': '7b5',
    'aug7': 'aug7', '7#5': 'aug7', '7+5': 'aug7', '+7': 'aug7',
    'aug7b9': 'aug7b9', '7#5b9': 'aug7b9', '+7b9': 'aug7b9', '7+5b9': 'aug7b9',
    'm7#5': 'm7#5', 'm7+5': 'm7#5', 'min7#5': 'm7#5', 'm7(#5)': 'm7#5', 'min7(#5)': 'm7#5',
    'm7b9': 'm7b9', 'min7b9': 'm7b9', 'm7(b9)': 'm7b9', 'min7(b9)': 'm7b9',
    '6sus4': '6sus4',
    '6sus2': '6sus2',
    'maj7sus4': 'maj7sus4', 'maj7(sus4)': 'maj7sus4', 'm7sus4': 'maj7sus4', 'm7(sus4)': 'maj7sus4',
    '7sus2': '7sus2', '7(sus2)': '7sus2', 'dom7sus2': '7sus2',
    'maj7sus2': 'maj7sus2', 'maj7(sus2)': 'maj7sus2', 'm7sus2': 'maj7sus2', 'm7(sus2)': 'maj7sus2'
};

// 🌟 손가락 번호를 frets에서 자동 계산 (모든 코드가 동일 규칙을 따르도록).
//   - 규칙: 프렛이 낮고 6번줄(인덱스 0)에 가까울수록 낮은 번호
//   - 최저 프렛의 줄들은 검지(1) 바레. 단, 바레 양 끝 사이에 '개방현'이 있으면 바레 불가 → 각자 다른 손가락
//   - 나머지 눌러야 할 줄은 프렛 오름차순, 같은 프렛이면 6번줄 우선으로 2·3·4 배정 (같은 프렛이어도 다른 손가락)
// 🌟 손가락을 "검지에서 몇 프렛 떨어졌나"로 고르는 배치. computeFingers보다 규칙이 단순한 대신,
//    사람이 실제로 잡는 방식에 더 가깝게 나온다 - 같은 프렛에 여러 줄이 있어도 한 손가락으로
//    뭉개지 않고 3,4처럼 나눠 쓰고, 3프렛 이상 떨어진 음은 약지 대신 새끼로 간다.
//    손가락이 모자라면 null을 돌려주고, 그런 폼은 computeFingers 결과를 그대로 쓴다(엄지가 필요한
//    자리들이 여기 걸린다).
//    C의 Major/m/5/aug는 사람이 하나씩 확인해 손으로 지정해둔 구간이라 이 배치를 적용하지 않는다.
function ruleAssign(frets, allowBridge) {
    const fretted = [];
    frets.forEach((f, s) => { if (f > 0) fretted.push({ s, f }); });
    if (!fretted.length) return null;
    const lowest = Math.min(...fretted.map(x => x.f));
    const levels = [...new Set(fretted.map(x => x.f))].sort((a, b) => a - b);
    const out = frets.map(f => (f === -1 ? -1 : 0));
    let prev = 0;
    let firstRun = true;
    for (const level of levels) {
        const strings = fretted.filter(x => x.f === level).map(x => x.s).sort((a, b) => a - b);
        // 한 손가락으로 묶으려면 줄이 실제로 붙어 있어야 한다. 사이에 뮤트/개방현이 끼면
        // 바레했을 때 그 줄까지 눌려버리므로 따로 짚는다.
        // 🌟 검지 바레는 더 높은 프렛을 짚는 줄 밑을 그대로 지나갈 수 있다. 다만 그렇게 잡아야만
        //    하는 게 아니라면 손가락을 따로 쓰는 쪽이 정석이다 - 오픈 D(x x 0 2 3 2)를 바레로
        //    그리면 안 된다. 그래서 손가락을 따로 쓰는 배치를 먼저 시도하고, 그게 안 될 때만
        //    바레로 건너뛴다(allowBridge).
        const runs = [];
        strings.forEach(s => {
            const last = runs[runs.length - 1];
            if (!last) { runs.push([s]); return; }
            const prevS = last[last.length - 1];
            let bridge = prevS === s - 1;                       // 그냥 붙어 있으면 한 손가락
            if (!bridge && allowBridge && level === lowest) {
                bridge = true;
                for (let k = prevS + 1; k < s; k++) if (frets[k] <= 0) bridge = false;
            }
            if (bridge) last.push(s);
            else runs.push([s]);
        });
        for (const run of runs) {
            if (firstRun) { run.forEach(s => { out[s] = 1; }); prev = 1; firstRun = false; continue; }
            const gap = level - lowest;
            const wanted = level === lowest ? prev + 1 : (gap === 1 ? 2 : gap === 2 ? 3 : 4);
            // 같은 프렛의 줄 수만큼 연달아 써야 하므로 시작 손가락을 그만큼 앞당긴다
            const base = Math.max(Math.min(wanted, 4 - (run.length - 1)), prev + 1);
            if (base + run.length - 1 > 4) return null;
            run.forEach((s, i) => { out[s] = base + i; });
            prev = base + run.length - 1;
        }
    }
    return out;
}

// 🌟 프렛 배열마다 한 번만 계산해 두고 재사용한다.
const fingerCache = new Map();
function ruleBasedFingers(frets) {
    const key = frets.join(',');
    if (!fingerCache.has(key)) fingerCache.set(key, ruleAssign(frets, false) || ruleAssign(frets, true));
    const hit = fingerCache.get(key);
    return hit ? hit.slice() : null;
}

// 🌟 C의 이 네 품질은 운지를 하나씩 손으로 확인해둔 구간이라 규칙 배정을 돌리지 않는다.
//    다른 루트까지 끄면 안 된다 - D5처럼 규칙을 못 받아 손가락이 겹쳐 배정되는 폼이 생겼다.
const HAND_CHECKED = { 'C': new Set(['Major', 'm', '5', 'aug']) };

// 🌟 목록을 정돈할 때 쓰는 두 값. 나는 음이 같은 폼끼리 붙이고, 그 안에서 손가락이 적은
//    기본형부터 보여주기 위한 것이다 - "All" 목록과 대표 목록 양쪽에서 같은 기준을 쓴다.
function voicingNoteKey(v) {
    const set = new Set();
    v.frets.forEach((f, st) => { if (f >= 0) set.add(window.getNoteName(5 - st, f)); });
    return [...set].sort().join(',');
}
function voicingFingerCount(v) {
    const used = new Set();
    (v.fingers || []).forEach((x, st) => {
        if (v.frets[st] > 0 && typeof x === 'number' && x > 0) used.add(x);
    });
    return used.size || v.frets.filter(f => f > 0).length;
}
// 🌟 확장 코드는 여섯 음을 여섯 줄에 다 넣기 어려워서 5도를 빼고 잡는 게 오히려 기본이다.
//    그런 폼을 위쪽에, 음이 다 들어간 폼을 아래쪽에 두면 "먼저 이걸 잡고, 필요하면 이쪽"으로
//    읽힌다. 0이면 생략형, 1이면 전체음.
function voicingIsComplete(v) {
    const target = ((window.chordNotesTable || {})[window.currentRoot] || {})[window.currentQuality];
    if (!target) return 1;
    const set = new Set();
    v.frets.forEach((f, st) => { if (f >= 0) set.add(window.getNoteName(5 - st, f)); });
    return target.every(n => set.has(n)) ? 1 : 0;
}

// 🌟 어떤 음이 빠졌는지를 도수 이름으로 돌려준다. 카드에 폼 이름을 쓰지 않는 대신 이 값으로
//    묶어서 "5th omitted" 같은 제목을 붙인다. 음이 다 들어 있으면 빈 배열.
const DEGREE_NAME = { 0: 'root', 1: 'b9', 2: '9th', 3: 'b3', 4: '3rd', 5: '11th',
                      6: 'b5', 7: '5th', 8: '#5', 9: '6th', 10: 'b7', 11: '7th' };
function voicingOmittedDegrees(v) {
    const root = window.currentRoot;
    const target = ((window.chordNotesTable || {})[root] || {})[window.currentQuality];
    if (!target || !window.chromScale) return [];
    const idx = n => window.chromScale.indexOf(n);
    const set = new Set();
    v.frets.forEach((f, st) => { if (f >= 0) set.add(window.getNoteName(5 - st, f)); });
    return target.filter(n => !set.has(n))
        .map(n => (idx(n) - idx(root) + 12) % 12)
        .sort((a, b) => a - b)
        .map(semi => DEGREE_NAME[semi] || String(semi));
}

// 🌟 이 개수 이하면 대표를 추리지 않고 전부 보여준다 (Chord Dictionary의 "All" 버튼도 감춤).
//    카드 한 장이 164px + 간격 20px이라 데스크탑 기본 폭에서 한 줄에 4장 - 8이면 딱 두 줄이고
//    거기까지는 스크롤 없이 한 화면에 들어온다.
const FEW_ENOUGH_TO_SHOW_ALL = 8;

function computeFingers(frets) {
    const fretted = [];
    frets.forEach((f, s) => { if (f > 0) fretted.push({ s, f }); });
    if (fretted.length === 0) return frets.map(f => (f === -1 ? -1 : 0));

    // 그냥 프렛 오름차순(동률이면 6번줄 가까운 순)으로 손가락 매기는 단순 배정
    function naiveAssign() {
        const sorted = [...fretted].sort((a, b) => a.f - b.f || a.s - b.s);
        const result = frets.map(f => (f === -1 ? -1 : 0));
        sorted.forEach((x, i) => { result[x.s] = i + 1; });
        return result;
    }

    // 🌟 4손가락 안에 들어가고, 유독 멀리 떨어진 음(다른 음들과 2프렛 이상 차이나는 외톨이 음)도
    //    없으면 굳이 바레로 묶을 필요 없이 단순 배정이 더 자연스러움 (E/A/Em/Am 오픈코드처럼
    //    같은 프렛에 인접한 두 줄이 있어도 그냥 손가락 두 개 따로 쓰는 게 표준 운지법인 경우가 많음)
    const distinctFrets = [...new Set(fretted.map(x => x.f))].sort((a, b) => a - b);
    const hasFarOutlier = distinctFrets.length >= 2 && (distinctFrets[distinctFrets.length - 1] - distinctFrets[distinctFrets.length - 2]) >= 2;
    if (fretted.length <= 4 && !hasFarOutlier) return naiveAssign();

    // 같은 프렛을 짚은 줄들이 이어지는(사이에 열린 줄이나 다른 프렛 음이 안 끼는, 뮤트된 줄은
    // 껴도 되는) 구간을 손가락 하나로 묶을 수 있는 그룹으로 봄 (1줄짜리 = 그냥 단독 음)
    function findGroups(items) {
        const byFret = {};
        items.forEach(x => { (byFret[x.f] = byFret[x.f] || []).push(x.s); });
        const groups = [];
        Object.keys(byFret).forEach(fretStr => {
            const fret = Number(fretStr);
            const strings = byFret[fretStr].sort((a, b) => a - b);
            let current = [strings[0]];
            for (let i = 1; i < strings.length; i++) {
                const prev = current[current.length - 1];
                let interrupted = false;
                for (let k = prev + 1; k < strings[i]; k++) { if (frets[k] !== -1) { interrupted = true; break; } }
                if (interrupted) { groups.push({ fret, strings: [...current] }); current = [strings[i]]; }
                else current.push(strings[i]);
            }
            groups.push({ fret, strings: [...current] });
        });
        return groups;
    }

    // 그룹/단독 음들을 프렛 오름차순(동률이면 6번줄에 가까운 쪽)으로 정렬해 손가락 번호를 매김.
    // 바레(refFret) 기준으로 실제 손가락이 뻗는 자연스러운 각도를 반영: 0~1프렛 차이=검지
    // 바로 옆(2번), 2프렛 차이=3번, 3프렛 이상=4번 - 멀어질수록 더 뻗는 힘 좋은 손가락을 씀
    function assignSequential(items, startFinger, refFret) {
        items.sort((a, b) => a.fret - b.fret || Math.min(...a.strings) - Math.min(...b.strings));
        const budget = 4 - startFinger + 1;
        if (items.length > budget) return null;
        const result = {};
        if (refFret !== undefined) {
            const desired = items.map(item => {
                const gap = item.fret - refFret;
                // gap 0 = 기준 프렛 자체(검지 자리). 그 위로는 벌어진 만큼 뻗기 좋은 손가락을 씀.
                let want = gap === 0 ? startFinger : gap === 1 ? 2 : gap === 2 ? 3 : 4;
                // 두 줄 이상을 한 손가락으로 눌러야 하는 자리는 새끼손가락으로 안 보냄 - 멀리
                // 뻗는 건 새끼가 낫지만, 여러 줄을 눕혀 누르는 건 약지가 훨씬 안정적임
                if (want === 4 && item.strings.length > 1) want = 3;
                return Math.min(4, Math.max(startFinger, want));
            });
            for (let i = desired.length - 2; i >= 0; i--) { desired[i] = Math.min(desired[i], desired[i + 1] - 1); }
            let prev = startFinger - 1;
            for (let i = 0; i < items.length; i++) {
                const finger = Math.max(desired[i], prev + 1, startFinger);
                if (finger > 4) return null;
                items[i].strings.forEach(s => { result[s] = finger; });
                prev = finger;
            }
            return result;
        }
        items.forEach((item, i) => { item.strings.forEach(s => { result[s] = startFinger + i; }); });
        return result;
    }

    // 1) 확장 바레 시도: 최저 프렛(F)을 짚은 줄이 2개 이상이면, 그 최소~최대 줄 범위를 검지 하나로
    //    감싸고(그 구간 안의 더 높은 프렛 음은 다른 손가락이 검지 위에서 눌러 처리 - 실제 바레코드
    //    기법, 예: F코드) 나머지를 처리
    const F = Math.min(...fretted.map(x => x.f));
    const atF = fretted.filter(x => x.f === F).map(x => x.s);
    if (atF.length >= 2) {
        const minS = Math.min(...atF), maxS = Math.max(...atF);
        let blocked = false;
        for (let s = minS; s <= maxS; s++) { if (frets[s] === 0) { blocked = true; break; } }
        if (!blocked) {
            const remaining = fretted.filter(x => x.s < minS || x.s > maxS || x.f > F);
            const assigned = assignSequential(findGroups(remaining), 2, F);
            if (assigned) {
                const result = frets.map(f => (f === -1 ? -1 : 0));
                for (let s = minS; s <= maxS; s++) { if (frets[s] === F) result[s] = 1; }
                Object.keys(assigned).forEach(s => { result[s] = assigned[s]; });
                return result;
            }
        }
    }

    // 2) 확장 바레가 안 되거나 부족하면, 전체를 같은 프렛끼리만 묶어서 배정.
    //    🌟 여기서도 최저 프렛을 기준으로 삼아 간격에 맞는 손가락을 고른다. 예전엔 기준 없이 프렛
    //    순서대로 1,2,3을 붙여서, 10·11·13프렛처럼 벌어진 폼이 새끼손가락을 놀리고 약지로 3프렛을
    //    벌리는(1,2,3) 운지로 나왔다. 기준을 주면 1,2,4가 되어 실제로 짚는 방식과 맞는다.
    //    단 프렛 단계가 둘뿐이면 이 표를 쓰면 안 된다. 표는 손가락을 일부러 건너뛰어(3번을 비우고
    //    먼 음에 4번을 보내는 식) 중간 음 자리를 만들어주려는 것인데, 자리가 둘뿐이면 비워둘 이유가
    //    없다. Bm7의 [7,x,7,7,7,5]가 그랬다 - 7프렛 네 줄이 기준(5프렛)에서 2프렛 떨어졌다고
    //    약지를 배정받아, 중지를 놀리고 약지를 눕혀 네 줄을 누르는 모양이 됐다.
    const assigned2 = assignSequential(findGroups(fretted), 1, distinctFrets.length >= 3 ? F : undefined);
    if (assigned2) {
        const result = frets.map(f => (f === -1 ? -1 : 0));
        Object.keys(assigned2).forEach(s => { result[s] = assigned2[s]; });
        return result;
    }
    // 바레로도 안 묶이는데 원래 4개 이하였다면(먼 외톨이 음 때문에 바레를 시도했던 경우),
    // 그냥 단순 배정으로라도 결과를 냄
    if (fretted.length <= 4) return naiveAssign();
    return null;
}

window.dictView = {
    // 사용자가 입력한 문자열(예: "Cmaj7", "F#m7", "Bbsus4")을 { root, quality }로 해석
    parseChordQuery: function(rawQuery) {
        const query = (rawQuery || '').trim().replace(/\s+/g, '');
        if (!query) return { root: null, quality: null, empty: true };

        const rootMatch = query.match(/^([A-Ga-g])([#b♯♭]?)/);
        if (!rootMatch) return { root: null, quality: null, empty: false };

        const letter = rootMatch[1].toUpperCase();
        let accidental = rootMatch[2];
        if (accidental === '♯') accidental = '#';
        if (accidental === '♭') accidental = 'b';
        const rootKey = letter + accidental;
        const root = CHORD_SEARCH_ROOT_ALIASES[rootKey];
        if (!root) return { root: null, quality: null, empty: false };

        const qualityRaw = query.slice(rootMatch[0].length);
        // 🌟 대문자 M(메이저)과 소문자 m(마이너)은 표기가 반대 의미이므로 대소문자를 구분해서 먼저 처리
        const caseSensitiveAliases = { 'M': 'Major', 'M7': 'maj7', 'M9': 'maj9', 'M11': 'maj11', 'M13': 'maj13', 'm': 'm' };
        let quality;
        if (qualityRaw in caseSensitiveAliases) quality = caseSensitiveAliases[qualityRaw];
        else quality = CHORD_SEARCH_QUALITY_ALIASES[qualityRaw.toLowerCase()];

        if (!quality) return { root, quality: null, empty: false };
        return { root, quality, empty: false };
    },

    handleSearchInput: function(rawQuery) {
        const input = document.getElementById('chord-search-input');
        const feedback = document.getElementById('chord-search-feedback');
        const result = this.parseChordQuery(rawQuery);

        if (result.empty) {
            if (input) input.classList.remove('invalid');
            if (feedback) feedback.textContent = '';
            window.currentRoot = null;
            window.currentQuality = null;
            window.currentVoicingIndex = 0;
            window.showAllVoicings = false;
            this.updateButtons();
            this.renderAll();
            return;
        }

        if (!result.root || !result.quality) {
            if (input) input.classList.add('invalid');
            if (feedback) feedback.textContent = !result.root ? 'Root note not recognized' : 'Chord quality not recognized';
            return;
        }

        if (input) input.classList.remove('invalid');
        if (feedback) feedback.textContent = '';
        window.currentRoot = result.root;
        window.currentQuality = result.quality;
        window.currentVoicingIndex = 0;
        window.showAllVoicings = false;
        this.updateButtons();
        this.renderAll();
    },
    getChordVoicings: function(root, quality) {
        if (!root || !quality) return [];

        const db = window.chordDatabase || {};
        const specificVoicings = (db[root] && db[root][quality]) ? db[root][quality] : [];
        const offset = (window.rootOffset[root] - window.rootOffset['C'] + 12) % 12;

        const baseVoicings = (db['C'] && db['C'][quality]) ? db['C'][quality] : (db['C'] && db['C']['Major'] ? db['C']['Major'] : []);

        const offsetsToTry = [offset - 12, offset, offset + 12];
        let allVoicings = [];

        // 🌟 핵심: 코드를 이동시키고 인체공학적(물리적)으로 잡을 수 있는지 검증하는 통합 헬퍼 함수
        //    requireRootBass: true면 가장 낮게 울리는 음이 루트가 아닌 폼은 버림
        //    (C 코드 모양을 그대로 옮기는 자동 변환 경로에서만 사용 - 확장음이 베이스에 오면
        //     "이 루트의 코드"라는 정체성이 흐려짐. 직접 검증한 지정 파지법에는 적용 안 함)
        const processVoicing = (v, off, nameSuffix, requireRootBass) => {
            // 🌟 "뮤트(-1)"와 "이동 후 프렛이 음수가 되어 -1과 값이 겹치는 경우"를 반드시 구분해야 함.
            // 구분하지 않으면 루트음이 통째로 잘려나간 반쪽짜리 코드가 뮤트로 위장해 통과해버림(예: G#m7 버그).
            let invalidShift = false;
            const shiftedFrets = v.frets.map(f => {
                if (f === -1) return -1;
                const nf = f + off;
                if (nf < 0) invalidShift = true;
                return nf;
            });
            // 1. 렌더링 범위 이탈 필터링
            if (invalidShift) return null;
            if (shiftedFrets.some(f => f !== -1 && f > window.totalFrets)) return null;

            // 2. 물리적 한계 필터링 (손가락이 5프렛 이상 찢어지면 삭제)
            const activeFrets = shiftedFrets.filter(f => f > 0);
            const fretSpan = activeFrets.length > 0 ? Math.max(...activeFrets) - Math.min(...activeFrets) : 0;
            if (fretSpan > 4) return null;

            // 3. 실제 손가락 배치 알고리즘(computeFingers)으로 4손가락 이내에 진짜 잡을 수 있는지 검증
            //    (렌더링 시점에도 항상 이 알고리즘으로 다시 계산하므로, 필터링도 같은 기준을 써야
            //    "필터는 통과했는데 화면엔 이상한 손가락 번호로 뜨는" 불일치가 안 생김)
            const shiftedFingers = computeFingers(shiftedFrets);
            if (!shiftedFingers) return null;

            // 4. 베이스(가장 낮게 울리는 줄)가 루트음이 아니면 버림 (확장음이 베이스면 어느 코드인지 헷갈림)
            if (requireRootBass) {
                const soundingIdx = shiftedFrets.findIndex(f => f >= 0);
                if (soundingIdx === -1) return null;
                const bassNote = window.getNoteName(5 - soundingIdx, shiftedFrets[soundingIdx]);
                if (bassNote !== root) return null;

                // 5. 코드 공식에 있는 음은 하나도 빠짐없이 다 울려야 함 (최대 6음이라 6줄로 항상 가능함)
                //    하나라도 빠지면 다른(더 단순한/애매한) 코드처럼 들림
                const chordTones = window.chordNotesTable[root] && window.chordNotesTable[root][quality];
                if (chordTones) {
                    const soundingNotes = new Set();
                    shiftedFrets.forEach((f, idx) => { if (f >= 0) soundingNotes.add(window.getNoteName(5 - idx, f)); });
                    for (const tone of chordTones) { if (!soundingNotes.has(tone)) return null; }
                }
            }

            // 🌟 손으로 지정한 운지(manualFingers)는 옮겨도 모양이 그대로라 손가락도 그대로 쓴다.
            //    이걸 안 넘기면 수록 파지법에 박아둔 운지가 여기서 자동 계산으로 덮여버린다.
            //    단 옥타브로 올리면 개방현이 짚는 음으로 바뀌는데, 그 자리 손가락 번호는 0(개방)인
            //    채로 남아 번호 없는 점이 그려졌다. 짚고/안 짚고가 달라지면 자동 계산으로 넘긴다.
            const shapeKept = v.manualFingers &&
                v.frets.every((f, s) => (f > 0) === (shiftedFrets[s] > 0));
            return {
                name: nameSuffix,
                frets: shiftedFrets,
                fingers: shapeKept ? v.fingers.slice() : shiftedFingers,
                manualFingers: !!shapeKept
            };
        };

        // 1. 하드코딩된 지정 파지법을 먼저 넣어 이름/운지 우선권을 줌 (원본 및 +12 옥타브 하이 포지션)
        //    → 아래 자동 변환 폼과 프렛이 겹치면 지정 파지법이 이기고, 안 겹치는 자동 생성분만 뒤에 추가됨
        specificVoicings.forEach(sv => {
            const result0 = processVoicing(sv, 0, sv.name);
            if (result0 && !allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(result0.frets))) {
                result0._tier = 0;
                allVoicings.push(result0);
            }

            // 🌟 개방현이 없는 폼을 12프렛 올리면 모양이 원본과 완전히 같다 - 프렛 번호만 다른
            //    같은 카드가 두 장 생기므로 만들지 않는다. 개방현이 있으면 그 줄이 짚는 음으로
            //    바뀌어 다른 폼이 되니 그때만 만든다.
            if (!sv.frets.includes(0)) return;

            const result12 = processVoicing(sv, 12, `${sv.name} (High)`);
            // 🌟 개방현이 짚는 음으로 바뀌면서 벌림이 커질 수 있다. 다이어그램은 네 칸짜리라
            //    그보다 넓은 폼 하나 때문에 그 카드만 다섯 칸으로 그려져 옆 카드와 비율이 어긋난다.
            //    원본이 이미 목록에 있으니 옥타브분만 버린다.
            if (result12) {
                const pressed = result12.frets.filter(f => f > 0);
                if (pressed.length && Math.max(...pressed) - Math.min(...pressed) > 3) return;
            }
            if (result12 && !allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(result12.frets))) {
                result12._tier = 1;
                allVoicings.push(result12);
            }
        });

        // 2. 자동 생성된 파지법(generatedVoicings) - 지정 파지법이 없는 루트/품질의 빈 자리를 채움.
        //    지정 파지법과 겹치면 건너뜀 (지정 파지법이 항상 우선)
        const generated = (window.generatedVoicings && window.generatedVoicings[root] && window.generatedVoicings[root][quality]) || [];
        generated.forEach(gv => {
            if (!allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(gv.frets))) {
                allVoicings.push({ name: gv.name, frets: gv.frets, fingers: gv.fingers, manualFingers: !!gv.manualFingers, _tier: 2 });
            }
        });

        // 3. C 코드 기준 변환 폼 대량 생성 - 위에서 이미 추가된 파지법과 겹치는 프렛은 건너뜀
        baseVoicings.forEach(v => {
            offsetsToTry.forEach(off => {
                const result = processVoicing(v, off, `${root}${quality === 'Major' ? '' : quality} (${v.name.split(' ')[0]} Shape)`, true);
                if (result && !allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(result.frets))) {
                    result._tier = 3;
                    allVoicings.push(result);
                }
            });
        });

        // 🌟 12프렛 아래에 같은 모양이 이미 있으면 프렛 번호만 다른 같은 카드다. 개방현·뮤트는
        //    옮겨도 그대로이므로 짚는 음만 12프렛 내려서 비교한다. 직접 지정한 대표는 남긴다.
        const fretKeys = new Set(allVoicings.map(v => v.frets.join(',')));
        const pinnedKeys = new Set(
            ((window.pinnedRepresentatives && window.pinnedRepresentatives[root]
                && window.pinnedRepresentatives[root][quality]) || []).map(f => f.join(','))
        );
        allVoicings = allVoicings.filter(v => {
            if (pinnedKeys.has(v.frets.join(','))) return true;
            if (!v.frets.some(f => f > 0)) return true;
            if (v.frets.some(f => f > 0 && f - 12 <= 0)) return true;
            const lower = v.frets.map(f => (f > 0 ? f - 12 : f));
            return !fretKeys.has(lower.join(','));
        });

        // 🌟 짚는 자리가 똑같고 나머지 줄이 개방이냐 뮤트냐만 다른 폼들은 잡는 손 모양이 완전히
        //    같다. 그 줄을 칠지 말지 차이뿐이라 카드를 여러 장 둘 이유가 없다. 개방현이 가장 많은
        //    하나만 남기고, 갈리는 줄을 "선택"으로 표시해 둘 다 된다는 걸 알린다.
        //    최저음이 달라지면 다른 코드가 되므로 그런 조합은 묶지 않고, 직접 지정한 대표도 건드리지 않는다.
        {
            const bassOf = v => {
                const s = v.frets.findIndex(f => f >= 0);
                return s === -1 ? null : window.getNoteName(5 - s, v.frets[s]);
            };
            // 짚는 자리(f > 0)가 같은 폼끼리 모은다
            const groups = new Map();
            allVoicings.forEach(v => {
                const key = v.frets.map((f, s) => (f > 0 ? s + ':' + f : '')).filter(Boolean).join('|');
                if (!groups.has(key)) groups.set(key, []);
                groups.get(key).push(v);
            });
            const dropped = new Set();
            groups.forEach(list => {
                if (list.length < 2) return;
                // 🌟 직접 지정한 대표도 병합에 참여한다 - 다만 남는 쪽을 그 폼으로 삼는다.
                //    대표 조회가 프렛 배열을 그대로 찾기 때문에, 지정한 폼이 병합으로 사라지면
                //    카드 자체가 안 나온다. 지정한 폼이 없을 때만 개방현이 제일 많은 폼을 남긴다.
                const openCount = v => v.frets.filter(f => f === 0).length;
                const keep = list.find(v => pinnedKeys.has(v.frets.join(',')))
                    || list.slice().sort((a, b) => openCount(b) - openCount(a))[0];
                list.forEach(v => {
                    if (v === keep) return;
                    if (bassOf(v) !== bassOf(keep)) return;
                    // 갈리는 줄은 한쪽이 개방, 다른 쪽이 뮤트인 자리뿐이어야 한다
                    const diff = [];
                    for (let s = 0; s < 6; s++) {
                        if (v.frets[s] === keep.frets[s]) continue;
                        if (v.frets[s] <= 0 && keep.frets[s] <= 0) diff.push(s);
                        else return;                       // 그 외 차이가 있으면 다른 폼이다
                    }
                    if (!diff.length) return;
                    keep.optional = (keep.optional || []).concat(diff.filter(s => !(keep.optional || []).includes(s)));
                    dropped.add(v);
                });
            });
            if (dropped.size) allVoicings = allVoicings.filter(v => !dropped.has(v));
        }

        // 🌟 손으로 지정한 운지 덮어쓰기 - 렌더링 때 만들어지는 폼은 데이터에 손댈 자리가 없다.
        //    운지 규칙으로 걸러내기 전에 얹어야, 규칙이 못 푸는 폼도 손운지로 살릴 수 있다
        const overrides = (window.fingeringOverrides && window.fingeringOverrides[root]
            && window.fingeringOverrides[root][quality]) || [];
        const overrideKeys = new Set(overrides.map(o => o.frets.join(',')));
        if (overrides.length) {
            const map = new Map(overrides.map(o => [o.frets.join(','), o.fingers]));
            allVoicings.forEach(v => {
                const fg = map.get(v.frets.join(','));
                if (fg) { v.fingers = fg.slice(); v.manualFingers = true; }
            });
        }

        // 🌟 중간 뮤트 자체는 dim·aug 같은 3화음에선 정상이라 남긴다. 다만 손가락을 나눠 짚는
        //    규칙 배정이 실패하는 폼은 뮤트를 넘는 바레로만 그려지는데, 그러면 없는 음이 울린다.
        allVoicings = allVoicings.filter(v => {
            const first = v.frets.findIndex(f => f !== -1);
            if (first === -1) return false;
            const last = 5 - [...v.frets].reverse().findIndex(f => f !== -1);
            let interiorMute = false;
            for (let s = first + 1; s < last; s++) if (v.frets[s] === -1) { interiorMute = true; break; }
            if (!interiorMute) return true;
            return v.manualFingers || !!ruleBasedFingers(v.frets);
        });

        // 🌟 직접 지워 온 79개를 되짚어 보니 85%가 규칙 배정이 실패하는 폼이었다. 이런 폼은
        //    그려질 때 손가락을 아무렇게나 갖다 붙인 엉터리 운지가 나오니 목록에서 뺀다.
        //    다만 확장 코드는 폼 자체가 몇 개 없어서 다 지우면 코드가 비어버린다. 최소 개수는 남긴다.
        const MIN_KEEP = 6;
        const pinnedKeep = new Set(((((window.pinnedRepresentatives || {})[root]) || {})[quality] || [])
            .map(f => f.join(',')));
        const playable = [], awkward = [];
        allVoicings.forEach(v => {
            if (v.manualFingers || pinnedKeep.has(v.frets.join(',')) || ruleBasedFingers(v.frets)) playable.push(v);
            else awkward.push(v);
        });
        if (awkward.length) {
            if (playable.length >= MIN_KEEP) allVoicings = playable;
            else {
                awkward.sort((a, b) => this.voicingScore(a, root, quality) - this.voicingScore(b, root, quality));
                allVoicings = playable.concat(awkward.slice(0, MIN_KEEP - playable.length));
            }
        }

        // 🌟 다섯 줄 이상 울리는데 그 한가운데 뮤트가 하나 끼어 있고 양옆이 다 짚는 줄이면,
        //    스트로크로 훑을 때 그 줄만 손가락 옆면으로 죽여야 한다. 바레 위에서는 사실상
        //    불가능하고 굳이 쓸 일도 없어서 뺀다. 줄이 적게 울리는 폼은 그 줄을 안 뜯으면
        //    그만이라 남긴다.
        allVoicings = allVoicings.filter(v => {
            const key = v.frets.join(',');
            if (pinnedKeep.has(key) || overrideKeys.has(key)) return true;   // 손으로 넣은 건 예외
            if (v.frets.filter(f => f >= 0).length < 5) return true;
            for (let s = 1; s < 5; s++) {
                if (v.frets[s] === -1 && v.frets[s - 1] > 0 && v.frets[s + 1] > 0) return false;
            }
            return true;
        });

        // 🌟 특정 코드에서 못 잡는(비현실적인) 파지법을 프렛 배열로 지정해 제외
        const excluded = (window.excludedVoicings && window.excludedVoicings[root] && window.excludedVoicings[root][quality]) || [];
        if (excluded.length) {
            const exSet = new Set(excluded.map(f => f.join(',')));
            allVoicings = allVoicings.filter(v => !exSet.has(v.frets.join(',')));
        }

        // 🌟 손으로 확인한 구간을 뺀 나머지는 규칙 기반 배치로 손가락을 다시 매긴다
        if (!(HAND_CHECKED[root] && HAND_CHECKED[root].has(quality))) {
            allVoicings.forEach(v => {
                if (v.manualFingers) return;
                const rf = ruleBasedFingers(v.frets);
                if (rf) { v.fingers = rf; v.manualFingers = true; }
            });
        }

        // 🌟 대표 폼 선정에 쓸 원래 생성 순서를 기록해둠 (지정 파지법 원본 → 지정 파지법 옥타브 이동분 →
        //    자동 생성 → C코드 변환분 순으로 쌓았으므로, 이 순서 자체가 "더 정통적인/의도된" 폼일수록 앞에 옴)
        allVoicings.forEach((v, i) => { v._srcOrder = i; });

        // 🌟 정렬 로직: 넥 위치(최저 프렛) 순으로 1프렛 → 12프렛 나열.
        //    같은 포지션이면 (1) 개방현 있는 쉬운 폼 먼저 (2) 저음줄부터 울리는 폼 먼저
        return allVoicings.sort((a, b) => {
            const activeFretsA = a.frets.filter(f => f > 0);
            const activeFretsB = b.frets.filter(f => f > 0);
            const minFretA = activeFretsA.length ? Math.min(...activeFretsA) : 0;
            const minFretB = activeFretsB.length ? Math.min(...activeFretsB) : 0;

            // 1순위: 최저 프렛 오름차순 (넥 아래쪽 → 위쪽)
            if (minFretA !== minFretB) return minFretA - minFretB;

            // 2순위: 같은 포지션이면 개방현 있는 폼 먼저
            const hasOpenA = a.frets.includes(0);
            const hasOpenB = b.frets.includes(0);
            if (hasOpenA !== hasOpenB) return hasOpenA ? -1 : 1;

            // 3순위: 더 굵은 베이스 줄(저음)부터 울리는 폼 먼저
            let bassA = 6, bassB = 6;
            for (let i = 0; i < 6; i++) { if (a.frets[i] !== -1) { bassA = i; break; } }
            for (let i = 0; i < 6; i++) { if (b.frets[i] !== -1) { bassB = i; break; } }
            return bassA - bassB;
        });
    },

    // 🌟 한 폼에 통짜 바레가 있는지 확인: 같은 손가락 번호가 울리는 줄 3개 이상을 덮고 있으면 바레로 봄.
    //    "맨 아래줄~맨 위줄이 같은 손가락"만 보면 E Shape처럼 근음을 바레와 다른 손가락으로 따로 짚는
    //    흔한 폼(예: D6/9의 "E Shape (7th Fret)" - 저음 E줄만 새끼손가락, 나머지 5줄은 검지 바레)을
    //    놓침 - 그래서 "어떤 손가락이든 3줄 이상 덮으면 바레"로 더 느슨하게 판단함.
    isBarre: function(v) {
        const soundingIdx = v.frets.map((f, i) => f >= 0 ? i : -1).filter(i => i >= 0);
        const counts = {};
        soundingIdx.forEach(i => { const f = v.fingers[i]; if (f > 0) counts[f] = (counts[f] || 0) + 1; });
        return Math.max(0, ...Object.values(counts)) >= 3;
    },

    // 🌟 이름 자체가 "A Shape"/"E Shape"/"D Shape"(또는 열린 폼이 없는 루트의 "Standard ... Barre")로
    //    큐레이션돼 있으면 그게 그 CAGED 폼이라는 가장 확실한 신호임 - 사람이 직접 그렇게 이름
    //    붙였기 때문. 기하학적 추정(바레 여부, 넥 위치 등)보다 훨씬 신뢰도가 높음.
    namedShapeMatch: function(name, key) {
        if (key === 'aShape') return /\bA Shape\b/.test(name);
        if (key === 'eShape') return /\bE Shape\b/.test(name) || /^Standard .*Barre/.test(name);
        if (key === 'dShape') return /\bD Shape\b/.test(name);
        return false;
    },

    // 🌟 넥 포지션(3프렛 단위)이 아니라 "폼의 종류" 기준으로 대표를 뽑음 - 연주자가 실제로 구분하는
    //    개방현 폼 / 5번줄(A) 근음 하이코드 / 6번줄(E) 근음 하이코드 / 4번줄(D) 근음 하이코드 / 재즈
    //    컴팩트 폼, 최대 5개.
    //    - open: 개방현이 최소 하나 울리면서 넥 아래쪽(0번 포지션 구간)에 있는 폼. 지정 파지법
    //      (_tier 0/1)에서만 뽑음 - 자동 생성 폼 중에 개방현 하나가 우연히 낀 얇은 파편이 "오픈
    //      코드"로 둔갑하는 문제가 있었음. 이 데이터셋은 실제 오픈 코드를 항상 사람이 직접
    //      "Open X Shape"로 큐레이션해왔으므로, 지정 파지법에 없으면 그 루트/품질엔 오픈 폼이
    //      없다고 보는 게 맞음.
    //    - aShape/eShape/dShape: 베이스가 각각 5번줄(A)/6번줄(E)/4번줄(D)인 폼 중에서 고름.
    //      기하학적 규칙(바레 여부, 넥 위치)만으로는 안정적으로 못 가려냈음 - 어떤 코드는 더 낮은
    //      프렛의 진짜 CAGED 바레가 우선순위여야 하고(D메이저의 5프렛 "A Shape"가 2프렛의 혼합형
    //      "A-String Root"에 밀리면 안 됨), 어떤 코드는 반대로 로우 포지션의 재즈/루트리스 보이싱이
    //      우선순위여야 함(Cm7의 1프렛 "Rootless Shape"가 3프렛의 일반 바레 코드에 밀리면 안 됨) -
    //      두 상황을 프렛/바레 숫자만으로 구분할 방법이 없었음. 그래서 가장 확실한 신호부터 봄:
    //      1) 이름 자체가 "A/E/D Shape"로 큐레이션된 폼 2) 바레가 있는 폼(CAGED 이동 코드) 3) 그
    //      다음은 넥 아래쪽부터. 바레도 이름 매치도 없는 코드(m7b5/dim7/확장 코드처럼 애초에 통짜
    //      바레가 잘 안 나오는 경우)는 최선의 비-바레 폼으로 대체함 - 바레를 필수로 요구하면 대표가
    //      통째로 비는 조합이 절반 넘게 나왔음.
    //    - compact: 위 네 자리와는 별도로, 3~4줄만 울리는 재즈 스타일 컴팩트 폼(예: G#m7의 "4x444x")도
    //      항상 대표에 하나 끼워줌 - 바레 위주 규칙 때문에 이런 폼이 아예 안 보이면 재즈 보이싱을
    //      찾는 사람에게 불편하다는 피드백이 있었음. Shell/Jazz/Rootless로 큐레이션된 폼을 최우선하고,
    //      없으면 그냥 가장 낮은 포지션의 3~4줄짜리 폼으로 대체함.
    //    울리는 줄이 4개 미만인 얇은 폼은 open/A/E/D 넷에서는 전부 제외. 해당 종류가 아예 없으면 그
    //    항목만 건너뜀(예: 오픈코드가 없는 F#/C# 등은 open이 없음).
    // 🌟 넥을 구간으로 나눠 구간마다 가장 좋은 폼을 하나씩 뽑는다. "좋다"의 기준은 두 가지 -
    //    잡기 쉬울 것(손가락 배정이 되고, 벌림이 좁고, 중간 뮤트가 없을 것)과 소리가 풍부할 것
    //    (울리는 줄이 많고, 구성음이 다 들어가고, 근음이 최저음일 것). 점수가 낮을수록 좋다.
    POSITION_BANDS: [[0, 2], [3, 5], [6, 8], [9, 11], [12, 15]],

    voicingScore: function(v, root, quality) {
        const frets = v.frets;
        const sounding = frets.filter(f => f >= 0);
        const fretted = frets.filter(f => f > 0);
        let score = 0;

        // --- 소리의 풍부함 ---
        score += (6 - sounding.length) * 8;    // 울리는 줄이 적을수록 손해

        const wanted = (window.chordNotesTable[root] || {})[quality] || [];
        if (wanted.length) {
            const got = new Set();
            frets.forEach((f, s) => {
                if (f < 0) return;
                const open = window.rootOffset[window.openStringNotes[5 - s]];
                got.add(window.chromScale[(open + f) % 12]);
            });
            wanted.forEach(n => { if (!got.has(n)) score += 14; });   // 빠진 구성음마다 감점
            const bassIdx = frets.findIndex(f => f >= 0);
            if (bassIdx !== -1) {
                const open = window.rootOffset[window.openStringNotes[5 - bassIdx]];
                if (window.chromScale[(open + frets[bassIdx]) % 12] !== wanted[0]) score += 4;
            }
        }

        // --- 잡기 쉬움 ---
        if (fretted.length) {
            const span = Math.max(...fretted) - Math.min(...fretted);
            score += span <= 1 ? 0 : span === 2 ? 2 : span === 3 ? 16 : 30;
        }
        const first = frets.findIndex(f => f !== -1);
        const last = 5 - [...frets].reverse().findIndex(f => f !== -1);
        for (let s = first + 1; s < last; s++) if (frets[s] === -1) { score += 4; break; }
        // 화면에 실제로 그려질 운지가 무리한지 본다 - 손가락이 모자라거나, 검지 아닌 손가락이
        // 두 줄을 겹쳐 눌러야 하거나, 바레가 울리면 안 되는 줄을 지나가는 경우
        const fingers = v.fingers || [];
        const used = {};
        let hard = false;
        fingers.forEach((f, s) => {
            if (frets[s] <= 0) return;
            if (f === 'T') { if (frets[s] > 10) hard = true; return; }   // 엄지는 로우 포지션에서만
            if (f > 4) hard = true;
            used[f] = (used[f] || 0) + 1;
        });
        Object.keys(used).forEach(f => { if (f !== '1' && used[f] > 1) hard = true; });
        const barred = [];
        fingers.forEach((f, s) => { if (f === 1 && frets[s] > 0) barred.push(s); });
        for (let s = barred[0] + 1; s < barred[barred.length - 1]; s++) {
            if (frets[s] === -1 || frets[s] === 0) { hard = true; break; }
        }
        if (hard) score += 25;
        if (fretted.length < 2) score += 20;   // 짚는 음이 하나뿐이면 포지션 폼이 아니다
        if (v._tier === 0 || v._tier === 1) score -= 14;   // 사람이 큐레이션한 폼 우대
        return score;
    },

    // 🌟 검지가 최저 프렛에서 울리는 줄 전체를 가로지르는 폼 (E 폼 / A 폼 바레)
    isFullBarre: function(v) {
        const frets = v.frets, fingers = v.fingers || [];
        const first = frets.findIndex(f => f !== -1);
        if (first === -1) return false;
        const last = 5 - [...frets].reverse().findIndex(f => f !== -1);
        if (last - first < 3) return false;
        for (let s = first; s <= last; s++) if (frets[s] <= 0) return false;   // 중간에 뮤트/개방현이 없어야 한다
        if (fingers[first] !== 1 || fingers[last] !== 1) return false;
        const lowest = Math.min(...frets.slice(first, last + 1));
        return frets[first] === lowest && frets[last] === lowest;
    },

    getBalancedRepresentatives: function(voicings, root, quality) {
        // 🌟 직접 지정해 온 대표 291개를 되짚어 보니 한 구간에서 하나만 고른 경우는 드물었다.
        //    구간마다 성격이 다른 폼을 최대 두 개까지, 그 구간 최고점과 크게 벌어지지 않는
        //    것만 고른다. 짚는 자리가 똑같은 폼은 같은 코드를 두 번 보여주는 셈이라 건너뛴다.
        const PER_BAND = 2;
        const SLACK = 14;
        const picked = [];
        const scored = voicings.map((v, idx) => {
            const activeFrets = v.frets.filter(f => f > 0);
            return { idx, minFret: activeFrets.length ? Math.min(...activeFrets) : 0,
                score: this.voicingScore(v, root, quality),
                sounding: v.frets.filter(f => f >= 0).length,
                fullBarre: this.isFullBarre(v),
                grip: v.frets.map((f, s) => (f > 0 ? s + ':' + f : '')).filter(Boolean).join('|') };
        });
        this.POSITION_BANDS.forEach(([lo, hi]) => {
            const band = scored.filter(c => c.minFret >= lo && c.minFret <= hi && c.sounding >= 3)
                .sort((a, b) => a.score - b.score);
            if (!band.length) return;
            const chosen = [];
            for (const c of band) {
                if (chosen.length >= PER_BAND) break;
                // 🌟 그 구간에 쓸 만한 폼이 없으면 억지로 채우지 않고 건너뛴다
                if (c.score > 32 || c.score - band[0].score > SLACK) break;
                if (chosen.some(o => o.grip === c.grip)) continue;
                chosen.push(c);
            }
            // 🌟 검지로 전 줄을 눌러 잡는 풀 바레는 그 자리를 대표하는 폼이라 점수와 상관없이
            //    구간마다 하나는 들어가야 한다. 통째로 옮겨 다른 코드로 쓸 수 있기 때문이다.
            if (!chosen.some(c => c.fullBarre)) {
                const barre = band.find(c => c.fullBarre);
                if (barre) chosen.push(barre);
            }
            chosen.forEach(c => picked.push(c));
        });

        // 🌟 구간 기준만으로 3개가 안 되면(확장 코드처럼 폼 자체가 적은 경우) 구간을 무시하고
        //    점수순으로 채운다 - 대표 칸이 비어 보이는 것보다는 낫다
        if (picked.length < 3) {
            const taken = new Set(picked.map(c => c.idx));
            scored.filter(c => !taken.has(c.idx) && c.sounding >= 3)
                .sort((a, b) => a.score - b.score)
                .slice(0, 3 - picked.length)
                .forEach(c => picked.push(c));
        }
        picked.sort((a, b) => a.minFret - b.minFret);
        return picked;
    },

    getShapeRepresentatives: function(voicings, root, quality) {
        // 🌟 직접 지정한 대표가 있으면 자동 선정을 건너뛴다
        const pinned = (window.pinnedRepresentatives && window.pinnedRepresentatives[root]
            && window.pinnedRepresentatives[root][quality]) || null;
        if (pinned) {
            const list = [];
            pinned.forEach(frets => {
                const key = frets.join(',');
                const idx = voicings.findIndex(v => v.frets.join(',') === key);
                if (idx === -1) return;
                const activeFrets = voicings[idx].frets.filter(f => f > 0);
                list.push({ idx, minFret: activeFrets.length ? Math.min(...activeFrets) : 0 });
            });
            if (list.length) return { pinned: list };
        }

        const balanced = this.getBalancedRepresentatives(voicings, root, quality);
        if (balanced.length) return { pinned: balanced };

        const result = { open: null, aShape: null, eShape: null, dShape: null, compact: null };
        // rank 배열은 앞자리일수록 중요 - 작을수록 우선.
        const rankOf = (v, candidate, key) => {
            const isCurated = v._tier === 0 || v._tier === 1;
            // 🌟 이름 매치는 "지정 파지법"에서만 의미 있는 신호임 - 자동 생성 폼은 베이스 줄만 보고
            //    기계적으로 "A Shape (Nth Fret)"처럼 이름 붙이므로, 큐레이션 여부 안 가리면 이 신호가
            //    자동 생성 폼에도 걸려서 무의미해짐(Cm7의 진짜 재즈 폼이 그냥 "A Shape"라고 이름
            //    붙은 자동 생성 폼에 밀리는 문제가 있었음).
            return [
                (isCurated && this.namedShapeMatch(v.name, key)) ? 0 : 1,
                this.isBarre(v) ? 0 : 1,
                Math.floor(candidate.minFret / 3),
                isCurated ? 0 : 1,
                candidate.minFret,
                candidate.srcOrder
            ];
        };
        const better = (rankA, rankB) => {
            for (let i = 0; i < rankA.length; i++) {
                if (rankA[i] !== rankB[i]) return rankA[i] < rankB[i];
            }
            return false;
        };
        const consider = (key, v, candidate) => {
            const rank = rankOf(v, candidate, key);
            const current = result[key];
            if (!current || better(rank, current.rank)) {
                result[key] = { ...candidate, rank };
            }
        };
        // 🌟 1단계: 오픈 폼 먼저 확정
        voicings.forEach((v, i) => {
            const activeFrets = v.frets.filter(f => f > 0);
            const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
            const srcOrder = v._srcOrder !== undefined ? v._srcOrder : i;
            const candidate = { idx: i, minFret, srcOrder };
            const soundingCount = v.frets.filter(f => f >= 0).length;
            if (soundingCount < 4) return;

            const isCurated = v._tier === 0 || v._tier === 1;
            if (isCurated && v.frets.includes(0) && Math.floor(minFret / 3) === 0) {
                result.open = (!result.open || minFret < result.open.minFret ||
                    (minFret === result.open.minFret && srcOrder < result.open.srcOrder))
                    ? candidate : result.open;
            }
        });

        // 🌟 2단계: 5/6/4번줄 근음 하이코드 - 오픈으로 이미 뽑힌 바로 그 폼은 건너뜀
        //    (예: D메이저의 "Open D Shape"는 베이스가 D줄이라 4번줄 근음 조건도 만족하는데,
        //    같은 카드가 라벨만 다르게 두 번 뜨는 걸 막음)
        voicings.forEach((v, i) => {
            if (result.open && i === result.open.idx) return;
            const activeFrets = v.frets.filter(f => f > 0);
            const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
            const srcOrder = v._srcOrder !== undefined ? v._srcOrder : i;
            const candidate = { idx: i, minFret, srcOrder };
            const soundingCount = v.frets.filter(f => f >= 0).length;
            if (soundingCount < 4) return;

            let bassString = 6;
            for (let s = 0; s < 6; s++) { if (v.frets[s] !== -1) { bassString = s; break; } }
            if (bassString === 1) consider('aShape', v, candidate);
            else if (bassString === 0) consider('eShape', v, candidate);
            else if (bassString === 2) consider('dShape', v, candidate);
        });

        // 🌟 3단계: 재즈 컴팩트 폼 - 3~4줄만 울리는 폼 중에서, 위 네 자리에 이미 뽑힌 폼은 제외하고 고름
        const usedIdx = new Set([result.open, result.aShape, result.eShape, result.dShape]
            .filter(Boolean).map(c => c.idx));
        voicings.forEach((v, i) => {
            if (usedIdx.has(i)) return;
            const soundingCount = v.frets.filter(f => f >= 0).length;
            if (soundingCount < 3 || soundingCount > 4) return;
            const activeFrets = v.frets.filter(f => f > 0);
            const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
            const srcOrder = v._srcOrder !== undefined ? v._srcOrder : i;
            const isCurated = v._tier === 0 || v._tier === 1;
            const isNamedJazz = isCurated && /shell|jazz|rootless/i.test(v.name);
            const rank = [isNamedJazz ? 0 : 1, isCurated ? 0 : 1, minFret, srcOrder];
            const current = result.compact;
            if (!current || better(rank, current.rank)) {
                result.compact = { idx: i, minFret, srcOrder, rank };
            }
        });
        return result;
    },

    // 🌟 좁은 화면에서 "고르는 화면 / 코드 보는 화면"을 전환한다. 넓은 화면에선 클래스가 붙어도
    //    CSS가 무시하므로 둘 다 그대로 보인다.
    syncMobilePane: function() {
        const layout = document.querySelector('.dict-layout');
        if (!layout) return;
        const picked = !!(window.currentRoot && window.currentQuality);
        layout.classList.toggle('mobile-results', picked && !window.dictShowPicker);
    },

    // 현재 재생/하이라이트의 기준이 되는 보이싱: 슬래시 코드가 선택돼 있으면 그게 우선, 아니면 메인 리스트의 선택된 인덱스
    getActiveVoicing: function() {
        if (window.selectedSlashVoicing) return window.selectedSlashVoicing;
        if (!window.currentRoot || !window.currentQuality) return null;
        const voicings = this.getChordVoicings(window.currentRoot, window.currentQuality);
        return voicings[window.currentVoicingIndex] || voicings[0] || null;
    },

    renderAll: function() {
        const formulaTitle = document.getElementById('formula-title');
        this.syncMobilePane();

        if (!window.currentRoot || !window.currentQuality) {
            if (formulaTitle) { formulaTitle.textContent = "Select a Chord"; formulaTitle.translate = true; }
            document.getElementById('notes-badges').innerHTML = '';
            this.renderVerticalVoicingGrid('voicing-list', [], 'Pick a root note and chord quality to see every practical voicing.');
            this.renderSlashChordShelf(null, null);
            return;
        }

        const voicings = this.getChordVoicings(window.currentRoot, window.currentQuality);

        if (formulaTitle) {
            formulaTitle.translate = false;   // 여기부턴 코드 이름이라 번역되면 안 된다
            formulaTitle.textContent = window.selectedSlashVoicing
                ? `${window.selectedSlashVoicing.name}`
                : `${window.currentRoot}${window.currentQuality === 'Major' ? '' : window.currentQuality}`;
        }

        this.renderChordFormula();

        let categories = this.getShapeRepresentatives(voicings, window.currentRoot, window.currentQuality);
        // 🌟 폼 자체가 몇 개 없는 코드는 대표를 골라 봐야 "All"을 눌러 두세 장 더 보는 게 전부다.
        //    그럴 바엔 처음부터 다 보여주고 버튼을 감춘다 - 아래 repIndices가 전체가 되므로
        //    "대표 수 < 전체 수" 조건이 깨지면서 버튼은 알아서 사라진다.
        if (voicings.length <= FEW_ENOUGH_TO_SHOW_ALL) {
            categories = {
                pinned: voicings.map((v, idx) => {
                    const active = v.frets.filter(f => f > 0);
                    return { idx, minFret: active.length ? Math.min(...active) : 0 };
                }).sort((a, b) => a.minFret - b.minFret)
            };
            window.showAllVoicings = false;
        }
        const repIndices = (categories.pinned
            ? categories.pinned
            : [categories.open, categories.aShape, categories.eShape, categories.dShape, categories.compact]
        ).filter(Boolean).map(c => c.idx);
        const allBtn = document.getElementById('voicing-all-btn');
        if (allBtn) {
            if (repIndices.length < voicings.length) {
                allBtn.style.display = '';
                allBtn.classList.toggle('active', !!window.showAllVoicings);
                allBtn.textContent = window.showAllVoicings ? 'Less' : `All (${voicings.length})`;
            } else {
                allBtn.style.display = 'none';
            }
        }
        // 🌟 범례는 지금 화면에 (O)가 실제로 있을 때만 - 전체 목록에만 있는데 띄우면 찾게 된다
        const legend = document.getElementById('optional-legend');
        if (legend) {
            const shown = window.showAllVoicings ? voicings : repIndices.map(i => voicings[i]);
            legend.style.display = shown.some(v => v && v.optional && v.optional.length) ? '' : 'none';
        }

        if (window.showAllVoicings) {
            this.renderVoicingPositionGroups('voicing-list', voicings, 'No practical voicing found for this chord within 14 frets.');
        } else {
            this.renderVoicingCategoryGroups('voicing-list', voicings, categories, 'No practical voicing found for this chord within 14 frets.');
        }
        this.renderSlashChordShelf(window.currentRoot, window.currentQuality);
    },

    // 🌟 "All"로 펼쳤을 때 전체를 한 줄로 쭉 나열하면 코드가 많은 품질(예: D6/9 22개)은 훑어보기
    //    힘들어짐 - 그래서 넥 포지션 3프렛 단위 구간으로 나눠서, 구간마다 작은 제목을 붙여 세로로
    //    쌓아줌. 각 구간 안에서는 기존 카드 그리드 그대로 씀.
    renderVoicingPositionGroups: function(containerId, voicings, emptyMessage) {
        const list = document.getElementById(containerId);
        if (!list) return;
        list.innerHTML = '';
        list.classList.remove('v-shape-group-row');
        list.classList.add('v-position-group-col');

        if (!voicings || voicings.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'v-grid-empty';
            empty.textContent = emptyMessage || 'No voicings to show.';
            list.appendChild(empty);
            return;
        }

        // 🌟 음을 생략한 폼이 섞여 있는 코드는 넥 위치보다 "다 울리느냐"가 먼저 궁금하다. 확장
        //    코드에서 5도를 뺀 폼은 타협이 아니라 실제로 잡는 방식이라, 그쪽을 위에 몰아 놓고
        //    음이 다 들어간 폼을 아래에 둔다. 생략형이 아예 없으면 예전처럼 넥 구간으로 나눈다.
        const hasOmitted = voicings.some(v => voicingIsComplete(v) === 0);
        const omitKey = v => voicingOmittedDegrees(v).join(', ');
        const buckets = new Map();
        voicings.forEach((v, idx) => {
            let bucket;
            if (hasOmitted) {
                bucket = omitKey(v) || '';               // '' = 전체음, 그 외 = 빠진 도수
            } else {
                const activeFrets = v.frets.filter(f => f > 0);
                const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
                bucket = Math.floor(minFret / 3);
            }
            if (!buckets.has(bucket)) buckets.set(bucket, []);
            buckets.get(bucket).push(idx);
        });

        const bucketLabel = (bucket) => hasOmitted
            ? (bucket === '' ? 'All notes' : `${bucket} omitted`)
            : (bucket === 0 ? 'Open Position' : `Frets ${bucket * 3}-${bucket * 3 + 2}`);

        const bucketOrder = hasOmitted
            ? (a, b) => (a === '' ? 1 : b === '' ? -1
                : (a.split(', ').length - b.split(', ').length) || (a < b ? -1 : 1))
            : (a, b) => a - b;
        [...buckets.keys()].sort(bucketOrder).forEach(bucket => {
            const section = document.createElement('div');
            section.className = 'v-position-section';

            const label = document.createElement('div');
            label.className = 'group-title';
            label.textContent = bucketLabel(bucket);
            section.appendChild(label);

            const grid = document.createElement('div');
            grid.className = 'vertical-voicing-grid';
            // 🌟 짚는 음이 같고 뮤트/개방현만 다른 폼들이 흩어져 있으면 같은 코드를 여러 번 보는
            //    느낌이 든다. 구간 안에서 "짚는 자리"가 같은 것끼리 붙여 놓고, 그 안에서는
            //    줄이 많이 울리는(=꽉 찬) 폼을 먼저 보여준다.
            const grip = v => v.frets.map((f, st) => (f > 0 ? st + ':' + f : '')).filter(Boolean).join('|');
            const sounding = v => v.frets.filter(f => f >= 0).length;
            const lowest = v => { const a = v.frets.filter(f => f > 0); return a.length ? Math.min(...a) : 0; };
            const highest = v => { const a = v.frets.filter(f => f > 0); return a.length ? Math.max(...a) : 0; };
            // 🌟 한 구간 안에서 나는 음이 똑같은 폼이 여럿 나오는 자리가 있다. 예를 들어 C6/9는
            //    6번줄 8프렛에 근음을 놓으면 나머지 개방현만으로 화음이 완성돼서, 손가락을 더
            //    얹어봐야 같은 음을 다른 옥타브에 겹치는 변형만 아홉 개가 생긴다. 흩어 놓으면
            //    "비슷한 게 왜 이렇게 많지"로 읽히므로 음집합이 같은 것끼리 붙이고, 그 안에서는
            //    손가락이 적은 기본형부터 보여준다 - 변형이 무엇을 더 짚는 것인지 바로 보인다.
            const noteKey = voicingNoteKey;
            const fingerCount = voicingFingerCount;
            const order = buckets.get(bucket).slice().sort((a, b) => {
                const va = voicings[a], vb = voicings[b];
                // 프렛이 낮은 것부터. 같은 프렛 안에서만 짚는 자리가 같은 것끼리 붙인다.
                if (lowest(va) !== lowest(vb)) return lowest(va) - lowest(vb);
                const na = noteKey(va), nb = noteKey(vb);
                if (na !== nb) return na < nb ? -1 : 1;
                if (fingerCount(va) !== fingerCount(vb)) return fingerCount(va) - fingerCount(vb);
                // 그다음은 손이 덜 올라가는 폼 먼저. 최저 프렛만 같고 위로 몇 프렛까지 뻗는지가
                // 다르면 2프렛에서 끝나는 오픈 코드가 5프렛까지 가는 바레보다 앞에 와야 한다.
                // 다이어그램이 몇 프렛부터 그려지는지도 이 값으로 정해지므로, 이걸 먼저 봐야
                // 프렛 번호가 없는(=너트부터 그려지는) 카드들이 흩어지지 않고 앞에 모인다.
                if (highest(va) !== highest(vb)) return highest(va) - highest(vb);
                // 그리는 범위까지 같으면 개방현을 쓰는 폼이 먼저 - 실제로는 0프렛부터 잡는 코드다
                const oa = va.frets.includes(0), ob = vb.frets.includes(0);
                if (oa !== ob) return oa ? -1 : 1;
                const ga = grip(va), gb = grip(vb);
                if (ga !== gb) return ga < gb ? -1 : 1;
                return sounding(vb) - sounding(va);
            });
            order.forEach(idx => {
                const v = voicings[idx];
                const isActive = !window.selectedSlashVoicing && idx === window.currentVoicingIndex;
                const card = this.renderVerticalDiagram(v, isActive, () => {
                    window.currentVoicingIndex = idx;
                    window.selectedSlashVoicing = null;
                    this.renderAll();
                });
                grid.appendChild(card);
            });
            section.appendChild(grid);
            list.appendChild(section);
        });
    },

    // 🌟 대표 폼을 넥 포지션이 아니라 "개방현 폼 / 5번줄 근음 하이코드 / 6번줄 근음 하이코드" 세 종류로
    //    나눠서, 종류별로 작은 라벨을 붙여 보여줌 (해당 종류가 없는 코드는 그 칸을 건너뜀)
    renderVoicingCategoryGroups: function(containerId, voicings, categories, emptyMessage) {
        const list = document.getElementById(containerId);
        if (!list) return;
        list.innerHTML = '';
        list.classList.remove('v-position-group-col');
        list.classList.add('v-shape-group-row');

        // 🌟 직접 지정한 대표는 지정한 순서 그대로, 라벨도 폼 이름을 쓴다
        const groups = categories.pinned
            ? categories.pinned.map((c, i) => ({
                key: 'pinned' + i,
                // 같은 폼 이름이 여러 포지션에서 나오므로 프렛을 붙여 구분한다
                label: this.displayName(voicings[c.idx].name),
                pin: c
            }))
            : [
            { key: 'open', label: 'Open Position' },
            { key: 'aShape', label: '5th-String Root (A Shape)' },
            { key: 'eShape', label: '6th-String Root (E Shape)' },
            { key: 'dShape', label: '4th-String Root (D Shape)' },
            { key: 'compact', label: 'Compact / Jazz Shape' }
        ];

        // 🌟 항상 넥 아래쪽(낮은 프렛)부터 나열 - 카테고리 종류 순서가 아니라 실제 대표 폼의 최저 프렛 기준
        if (!categories.pinned) {
            groups.sort((a, b) => {
                const fa = categories[a.key] ? categories[a.key].minFret : Infinity;
                const fb = categories[b.key] ? categories[b.key].minFret : Infinity;
                return fa - fb;
            });
        } else {
            // 🌟 지정한 대표도 같은 기준으로 정돈한다 - 프렛이 먼저고, 같은 자리에 둘 이상이면
            //    나는 음이 같은 것끼리 붙인 뒤 손가락이 적은 폼을 앞에 둔다. chords.js에 적어둔
            //    줄 순서는 더 이상 화면 순서를 정하지 않으므로 넣을 자리를 신경 쓸 필요가 없다.
            groups.sort((a, b) => {
                const va = voicings[a.pin.idx], vb = voicings[b.pin.idx];
                // 생략형이 위, 음이 다 들어간 폼이 아래. 그 안에서는 넥 아래쪽부터.
                const ca = voicingIsComplete(va), cb = voicingIsComplete(vb);
                if (ca !== cb) return ca - cb;
                if (a.pin.minFret !== b.pin.minFret) return a.pin.minFret - b.pin.minFret;
                const na = voicingNoteKey(va), nb = voicingNoteKey(vb);
                if (na !== nb) return na < nb ? -1 : 1;
                return voicingFingerCount(va) - voicingFingerCount(vb);
            });
        }

        let any = false;
        // 🌟 생략형과 전체음 사이에 제목 줄을 하나 끼운다. 두 묶음이 다 있을 때만 - 한쪽뿐이면
        //    제목이 분류가 아니라 군더더기가 된다.
        const sectionOf = g => {
            const c = g.pin || categories[g.key];
            return c ? (voicingOmittedDegrees(voicings[c.idx]).join(', ') || '') : null;
        };
        const sections = new Set(groups.map(sectionOf).filter(s => s !== null));
        const showSectionTitles = categories.pinned && sections.size > 1;
        let lastSection = null;

        groups.forEach(g => {
            const candidate = g.pin || categories[g.key];
            if (!candidate) return;
            any = true;
            const idx = candidate.idx;
            const v = voicings[idx];

            if (showSectionTitles) {
                const section = sectionOf(g);
                if (section !== lastSection) {
                    const head = document.createElement('div');
                    head.className = 'v-section-title';
                    head.textContent = section === '' ? 'All notes' : `${section} omitted`;
                    list.appendChild(head);
                    lastSection = section;
                }
            }

            const group = document.createElement('div');
            group.className = 'v-shape-group';

            // 🌟 폼 이름은 카드에 쓰지 않는다 - 같은 이름이 여러 번 나와 구분에 도움이 안 되고,
            //    무엇이 다른지는 위쪽 제목(빠진 도수)과 다이어그램이 말해준다.

            const isActive = !window.selectedSlashVoicing && idx === window.currentVoicingIndex;
            const card = this.renderVerticalDiagram(v, isActive, () => {
                window.currentVoicingIndex = idx;
                window.selectedSlashVoicing = null;
                this.renderAll();
            }, '');   // 카드 위 제목이 이미 이름을 말해주므로 카드 안에는 다시 쓰지 않는다
            group.appendChild(card);
            list.appendChild(group);
        });

        if (!any) {
            list.classList.remove('v-shape-group-row');
            const empty = document.createElement('div');
            empty.className = 'v-grid-empty';
            empty.textContent = voicings.length > 0
                ? `No open-position or barre-shape form for this chord - click "All" above to see all ${voicings.length} voicings.`
                : (emptyMessage || 'No voicings to show.');
            list.appendChild(empty);
        }
    },

    renderChordFormula: function() {
        const badges = document.getElementById('notes-badges');
        if (!badges || !window.currentRoot || !window.currentQuality) return;
        badges.innerHTML = '';
        const table = window.chordNotesTable || {};
        const notes = table[window.currentRoot]?.[window.currentQuality] || [window.currentRoot];

        notes.forEach((note, idx) => {
            const badge = document.createElement('div');
            badge.className = `note-badge notranslate ${idx === 0 ? 'is-root' : ''}`;
        badge.translate = false;
            badge.textContent = note;
            badge.onmouseenter = () => this.highlightSoundingNotes(note);
            badge.onmouseleave = () => this.clearHighlights();
            badges.appendChild(badge);
        });
    },

    // 배지에 마우스를 올리면, 화면에 그려진 모든 세로형 다이어그램 카드에서 그 음이 나오는 자리를 하이라이트
    highlightSoundingNotes: function(targetNote) {
        document.querySelectorAll('#tab-dictionary .v-dot').forEach(dot => {
            if (dot.dataset.note === targetNote) {
                dot.classList.add('highlighted-marker');
                dot.dataset.prevText = dot.textContent;
                dot.textContent = targetNote;
            }
        });
        document.querySelectorAll('#tab-dictionary .v-legend-cell.open').forEach(cell => {
            if (cell.dataset.note === targetNote) cell.classList.add('highlighted-open');
        });
    },

    clearHighlights: function() {
        document.querySelectorAll('#tab-dictionary .v-dot.highlighted-marker').forEach(dot => {
            dot.classList.remove('highlighted-marker');
            if (dot.dataset.prevText !== undefined) { dot.textContent = dot.dataset.prevText; delete dot.dataset.prevText; }
        });
        document.querySelectorAll('#tab-dictionary .v-legend-cell.highlighted-open').forEach(cell => cell.classList.remove('highlighted-open'));
    },

    // 🌟 카드에 찍을 이름은 저장된 이름에서 군더더기를 걷어낸 것. 프렛 위치는 다이어그램의 포지션
    //    라벨과 목록의 "FRETS N-M" 헤더에 이미 있어서 이름에 또 넣으면 중복이고, "#3"이나 "(Auto)"는
    //    같은 폼끼리 구분하려고 붙인 내부 표시라 화면에서는 의미가 없다.
    //    저장된 이름 자체는 그대로 둔다 - 대표 폼 선정(namedShapeMatch)과 중복 판정이 쓰고 있음.
    displayName: function(name) {
        const cleaned = name
            .replace(/\s*\(\d+(?:st|nd|rd|th) Fret\)/g, '')
            .replace(/\s*\(Auto\)/g, '')
            .replace(/\s*#\d+/g, '')
            .replace(/\s*\(Barre\)/g, ' \u00b7 Barre')
            .replace(/\s+/g, ' ')
            .trim();
        return cleaned || name;
    },

    // 🌟 대표 폼 화면은 카드마다 "5TH-STRING ROOT (A SHAPE)" 같은 카테고리 헤더가 이미 붙는다.
    //    거기서 카드 이름까지 "A Shape"라고 쓰면 같은 말을 두 번 하는 셈이고, 컴팩트 자리에 A 폼이
    //    뽑히기라도 하면 헤더와 카드가 서로 다른 말을 하는 것처럼 보인다. 그래서 이 화면에서는
    //    헤더가 못 담는 것(바레 여부, 사람이 붙인 고유 이름)만 남기고 폼 종류는 지운다.
    //    전체 목록은 헤더가 "FRETS 3-5"라 폼 종류를 알려주지 않으므로 displayName을 그대로 쓴다.
    shapeGroupLabel: function(name) {
        const shown = this.displayName(name);
        if (/^(?:[A-G]#?b?) Shape(?: \u00b7 Barre)?$/.test(shown)) {
            return /\u00b7 Barre$/.test(shown) ? 'Barre' : '';
        }
        if (/^(?:Shell|Open Position)$/.test(shown)) return '';
        // "F#m7b5 (E Shape)"처럼 자동 생성 이름은 코드명 + 폼 종류라 헤더와 겹친다
        if (/^\S+ \((?:[A-G]#?b?\d*) Shape\)$/.test(shown)) return '';
        return shown;
    },

    // 표준 세로형 코드 다이어그램(줄=세로, 프렛=가로) 카드 하나를 만들어 반환
    renderVerticalDiagram: function(voicing, isActive, onSelect, nameOverride) {
        const frets = voicing.frets;
        // 🌟 저장된 fingers 대신 항상 규칙 기반으로 계산 → 전체 코드 손가락 번호 일관성 보장
        // (바레로도 4손가락 안에 못 들어가는 예외적인 기존 데이터가 있을 경우를 대비한 안전장치)
        // 단, manualFingers로 표시된 파지법은 자동 규칙이 실제 운지와 안 맞는 예외 케이스라 손으로
        // 지정한 fingers를 그대로 씀.
        const fingers = voicing.manualFingers
            ? voicing.fingers
            : (computeFingers(frets) || frets.map(f => (f === -1 ? -1 : (f > 0 ? Math.min(frets.filter(x => x > 0 && x <= f).length, 4) : 0))));
        const activeFrets = frets.filter(f => f > 0);
        const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
        const maxFret = activeFrets.length ? Math.max(...activeFrets) : 0;
        // 🌟 프렛 1~4 안에 다 들어가는 파지법은 너트(1프렛)부터 그려 오픈 코드처럼 보이게 한다.
        //    다만 짚는 자리가 3프렛 이상에서 시작하면 위쪽 칸이 텅 비고 점이 바닥에 몰려서 오히려
        //    읽기 어렵다. 그런 경우엔 옆 카드들처럼 짚는 프렛부터 그린다.
        const startFret = (maxFret > 0 && maxFret <= 4 && minFret <= 2) ? 1 : (minFret > 0 ? minFret : 1);
        const isNut = startFret === 1;
        const numRows = Math.max(4, maxFret - startFret + 1);

        const card = document.createElement('div');
        card.className = `v-chord-card ${isActive ? 'active' : ''}`;

        // 🌟 빈 이름('')을 넘기면 제목줄 자체를 만들지 않는다 - 대표 폼 화면은 카드 위 라벨이
        //    이미 이름을 말해주므로, 빈 칸만 남으면 카드 높이가 서로 어긋난다.
        const nameText = nameOverride !== undefined ? nameOverride : this.displayName(voicing.name);
        if (nameText) {
            const nameEl = document.createElement('div');
            nameEl.className = 'v-chord-name notranslate';
            nameEl.translate = false;
            nameEl.textContent = nameText;
            // 줄인 이름만으론 어떤 폼인지 못 좁힐 때가 있어 원본은 툴팁으로 남겨둠
            if (nameText !== voicing.name) nameEl.title = voicing.name;
            card.appendChild(nameEl);
        }

        const diagram = document.createElement('div');
        diagram.className = 'v-chord-diagram';

        const legend = document.createElement('div');
        legend.className = 'v-legend-row';
        for (let s = 0; s < 6; s++) {
            const cell = document.createElement('div');
            cell.className = 'v-legend-cell notranslate';
            // 🌟 X(뮤트)/O(개방현)는 기타 기보 기호지 영어 단어가 아니다. 브라우저 번역이 켜지면
            //    다른 글자로 바뀌어 다이어그램을 못 읽게 되므로 번역에서 제외한다.
            cell.translate = false;
            cell.style.left = `${(s / 5) * 100}%`;
            if (frets[s] === -1) { cell.textContent = 'X'; cell.classList.add('mute'); }
            else if (frets[s] === 0) {
                cell.textContent = 'O';
                cell.classList.add('open');
                cell.dataset.note = window.getNoteName(5 - s, 0);
                // 🌟 뮤트해도 같은 코드가 되는 줄은 괄호로 - 악보에서 선택 음을 괄호로 쓰는 관례
                if (voicing.optional && voicing.optional.includes(s)) {
                    cell.textContent = '(O)';
                    cell.classList.add('optional');
                    cell.title = 'Optional — play it or leave it out';
                }
            }
            legend.appendChild(cell);
        }
        const gridWrap = document.createElement('div');
        gridWrap.className = 'v-grid-wrap';

        // 🌟 X/O 줄과 너트 바는 반드시 그리드와 같은 열에 있어야 한다. 예전엔 diagram 바로 밑에
        //    붙어 있어서, 프렛 번호 라벨이 그리드만 오른쪽으로 밀 때 줄 위치가 어긋났다.
        const stack = document.createElement('div');
        stack.className = 'v-grid-stack';
        stack.appendChild(legend);
        stack.appendChild(document.createElement('div')).className = isNut ? 'v-nut-bar' : 'v-top-border';


        const grid = document.createElement('div');
        grid.className = 'v-grid';
        grid.style.height = `${numRows * 36}px`;

        // 🌟 시작 프렛 숫자. 그리드 안에 넣어야 위치 기준이 흔들리지 않는다 - 바깥에 두면
        //    기준 요소가 달라져 첫 칸에서 어긋났다. 흐름에 없으니 다이어그램은 가운데를 지킨다.
        if (!isNut) {
            const posLabel = document.createElement('div');
            posLabel.className = 'v-position-label';
            posLabel.textContent = startFret;
            grid.appendChild(posLabel);
        }

        for (let s = 0; s < 6; s++) {
            const line = document.createElement('div');
            line.className = 'v-string-line';
            line.style.left = `${(s / 5) * 100}%`;
            grid.appendChild(line);
        }
        for (let r = 0; r <= numRows; r++) {
            const line = document.createElement('div');
            line.className = 'v-fret-line';
            line.style.top = `${(r / numRows) * 100}%`;
            grid.appendChild(line);
        }

        // 바레 표시줄 - 검지뿐 아니라 한 손가락이 같은 프렛에서 두 줄 이상을 누르면 다 그린다.
        //    (약지로 3번줄과 1번줄을 함께 누르고 그 사이 2번줄은 새끼가 더 높은 프렛을 짚는 식)
        const barreMap = {};
        fingers.forEach((fg, s) => {
            if (typeof fg === 'number' && fg > 0 && frets[s] > 0) {
                const key = `${fg}:${frets[s]}`;
                (barreMap[key] = barreMap[key] || []).push(s);
            }
        });
        Object.entries(barreMap).forEach(([key, strs]) => {
            if (strs.length < 2) return;
            const fret = parseInt(key.split(':')[1]);
            const rowIdx = fret - startFret;
            if (rowIdx < 0 || rowIdx >= numRows) return;
            // 🌟 막대는 검지가 실제로 누르는 줄까지만 그린다. 더 높은 프렛을 짚는 줄 밑을
            //    지나가더라도 거기까지 늘리면 막대만 툭 튀어나와 보인다.
            const minS = Math.min(...strs), maxS = Math.max(...strs);
            const bar = document.createElement('div');
            bar.className = 'v-barre-bar';
            bar.style.top = `${((rowIdx + 0.5) / numRows) * 100}%`;
            bar.style.left = `${(minS / 5) * 100}%`;
            bar.style.width = `${((maxS - minS) / 5) * 100}%`;
            grid.appendChild(bar);
        });

        for (let s = 0; s < 6; s++) {
            const fret = frets[s];
            if (fret > 0) {
                const rowIdx = fret - startFret;
                if (rowIdx < 0 || rowIdx >= numRows) continue;
                const noteName = window.getNoteName(5 - s, fret);
                const dot = document.createElement('div');
                dot.className = `v-dot notranslate ${noteName === window.currentRoot ? 'root' : ''}`;
                dot.translate = false;
                dot.dataset.note = noteName;
                dot.style.left = `${(s / 5) * 100}%`;
                dot.style.top = `${((rowIdx + 0.5) / numRows) * 100}%`;
                const fingerVal = fingers[s];
                // 🌟 fingerVal이 'T'면 엄지로 감아 잡는 자리. 6번줄을 엄지로 눌러 검지를 비워야만
                //    잡히는 폼이 있어서(예: C5 [8,10,10,0,8,8] - 3번줄 개방을 살리려면 6번줄 8프렛을
                //    바레에 넣을 수 없음) 손가락 번호와 함께 표기한다.
                dot.textContent = window.showAllNotesState ? noteName
                    : (fingerVal === 'T' ? 'T' : (fingerVal > 0 ? fingerVal : ''));
                if (fingerVal === 'T') dot.classList.add('thumb');
                grid.appendChild(dot);
            }
        }

        stack.appendChild(grid);
        gridWrap.appendChild(stack);
        diagram.appendChild(gridWrap);
        card.appendChild(diagram);

        if (onSelect) card.onclick = onSelect;
        return card;
    },

    renderVerticalVoicingGrid: function(containerId, voicings, emptyMessage, indices) {
        const list = document.getElementById(containerId);
        if (!list) return;
        list.innerHTML = '';

        if (!voicings || voicings.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'v-grid-empty';
            empty.textContent = emptyMessage || 'No voicings to show.';
            list.appendChild(empty);
            return;
        }

        const displayIndices = indices || voicings.map((_, i) => i);
        displayIndices.forEach(idx => {
            const v = voicings[idx];
            const isActive = containerId === 'voicing-list'
                ? (!window.selectedSlashVoicing && idx === window.currentVoicingIndex)
                : (window.selectedSlashVoicing === v);
            const card = this.renderVerticalDiagram(v, isActive, () => {
                if (containerId === 'voicing-list') {
                    window.currentVoicingIndex = idx;
                    window.selectedSlashVoicing = null;
                } else {
                    window.selectedSlashVoicing = v;
                }
                this.renderAll();
            });
            list.appendChild(card);
        });
    },

    renderSlashChordShelf: function(root, quality) {
        const compSection = document.getElementById('slash-chord-shelf')?.closest('.composition-section');
        if (!root || !quality) {
            if (compSection) compSection.style.display = 'none';
            this.renderVerticalVoicingGrid('slash-chord-shelf', []);
            return;
        }

        const sDb = window.slashChordDatabase || {};
        const rootGroup = sDb[root] || {};
        // 🌟 dim을 m으로 대신 보여주면 C#dim 자리에 C#m/E 같은 다른 코드가 뜬다.
        //    슬래시 코드는 반드시 같은 퀄리티끼리만 붙인다.
        const items = rootGroup[quality] || [];
        if (compSection) compSection.style.display = items.length === 0 ? 'none' : 'block';
        this.renderVerticalVoicingGrid('slash-chord-shelf', items);
    },

    updateButtons: function() {
        Array.from(document.getElementById('root-buttons').children).forEach(b =>
            b.classList.toggle('active', b.textContent === window.currentRoot)
        );
        document.querySelectorAll('#quality-buttons button').forEach(b =>
            b.classList.toggle('active', b.textContent === window.currentQuality)
        );
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('chord-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => window.dictView.handleSearchInput(searchInput.value));
    }

    const rArea = document.getElementById('root-buttons');
    const qArea = document.getElementById('quality-buttons');
    if(rArea) {
        window.rootLayout.forEach(item => {
            const b = document.createElement('button');
            b.textContent = item.note;
            b.translate = false;
            b.style.gridColumn = item.col;
            b.style.gridRow = item.row;
            b.onclick = () => {
                if (window.currentRoot === item.note) { window.currentRoot = null; }
                else { window.currentRoot = item.note; }
                window.dictShowPicker = false;
                window.currentVoicingIndex = 0;
                window.showAllVoicings = false;
                window.selectedSlashVoicing = null;
                window.dictView.updateButtons();
                window.dictView.renderAll();
            };
            rArea.appendChild(b);
        });
    }

    if(qArea) {
        qArea.style.display = 'flex';
        qArea.style.flexDirection = 'column';
        qArea.style.gap = '10px';

        const qualityGroups = {
            'Common': ['Major', 'm', '5', 'aug', 'dim'],
            'Major': ['maj7', 'add9', '6', 'maj9', 'maj11', 'maj13', '6/9', 'maj7add11', 'maj7add13'],
            'Minor': ['m7', 'm6', 'm6/9', 'm(maj7)', 'm7add11', 'm(maj7)add11', 'm7add13', 'm(maj7)add13', 'm(add9)', 'm9', 'm(maj9)', 'm11', 'm(maj11)', 'm13'],
            'Dominant': ['7', '9', '11', '13', '7add11', '7add13'],
            'Sus & Altered': ['sus2', 'sus4', '7sus4', 'maj7sus4', '7sus2', 'maj7sus2', '6sus4', '6sus2', 'm7b5', 'm7#5', 'dim7', '7b9', '7#9', '7b5', 'aug7', 'aug7b9', 'm7b9']
        };

        for (const [groupName, qualities] of Object.entries(qualityGroups)) {
            const groupTitle = document.createElement('div');
            groupTitle.style.fontSize = '0.8rem';
            groupTitle.style.color = '#828997';
            groupTitle.style.fontWeight = 'bold';
            groupTitle.style.cursor = 'pointer';
            groupTitle.style.display = 'flex';
            groupTitle.style.justifyContent = 'space-between';
            groupTitle.style.alignItems = 'center';
            groupTitle.style.padding = '4px 0';
            groupTitle.style.userSelect = 'none';

            const titleText = document.createElement('span');
            titleText.textContent = groupName;

            const toggleIcon = document.createElement('span');
            toggleIcon.style.fontSize = '0.7rem';

            groupTitle.appendChild(titleText);
            groupTitle.appendChild(toggleIcon);

            const grid = document.createElement('div');
            grid.className = 'btn-grid-quality';

            const isDefaultOpen = groupName === 'Common';
            grid.style.display = isDefaultOpen ? 'grid' : 'none';
            toggleIcon.textContent = isDefaultOpen ? '▼' : '▶';

            groupTitle.onclick = () => {
                const isHidden = grid.style.display === 'none';
                grid.style.display = isHidden ? 'grid' : 'none';
                toggleIcon.textContent = isHidden ? '▼' : '▶';
            };

            qualities.forEach(q => {
                const b = document.createElement('button');
                b.textContent = q;
                b.translate = false;
                b.onclick = () => {
                    if (window.currentQuality === q) { window.currentQuality = null; }
                    else { window.currentQuality = q; }
                    window.dictShowPicker = false;
                    window.currentVoicingIndex = 0;
                    window.showAllVoicings = false;
                    window.selectedSlashVoicing = null;
                    window.dictView.updateButtons();
                    window.dictView.renderAll();
                };
                grid.appendChild(b);
            });

            const groupContainer = document.createElement('div');
            groupContainer.style.background = '#1b1d23';
            groupContainer.style.padding = '8px 12px';
            groupContainer.style.borderRadius = '6px';
            groupContainer.style.border = '1px solid #2d313f';

            groupContainer.appendChild(groupTitle);
            groupContainer.appendChild(grid);
            qArea.appendChild(groupContainer);
        }
    }

    const slashHeader = document.getElementById('slash-chord-header');
    const slashShelf = document.getElementById('slash-chord-shelf');
    const slashToggleIcon = document.getElementById('slash-chord-toggle-icon');
    if (slashHeader && slashShelf && slashToggleIcon) {
        slashHeader.onclick = () => {
            const isHidden = slashShelf.style.display === 'none';
            slashShelf.style.display = isHidden ? 'grid' : 'none';
            slashShelf.style.marginTop = isHidden ? '10px' : '0';
            slashToggleIcon.textContent = isHidden ? '▼' : '▶';
        };
    }

    const showBtn = document.getElementById('show-all-btn');
    const backBtn = document.getElementById('dict-back-btn');
    if (backBtn) backBtn.onclick = () => {
        window.dictShowPicker = true;
        window.dictView.syncMobilePane();
        window.scrollTo({ top: 0 });
    };

    if (showBtn) showBtn.onclick = () => { window.showAllNotesState = !window.showAllNotesState; showBtn.classList.toggle('active', window.showAllNotesState); showBtn.innerText = window.showAllNotesState ? "Hide Notes" : "Show Notes"; window.dictView.renderAll(); };

    const voicingAllBtn = document.getElementById('voicing-all-btn');
    if (voicingAllBtn) voicingAllBtn.onclick = () => { window.showAllVoicings = !window.showAllVoicings; window.dictView.renderAll(); };

    const playChordBtn = document.getElementById('play-chord-btn');
    if (playChordBtn) {
        playChordBtn.onclick = () => {
            if (!window.chordAudio) return;
            const active = window.dictView.getActiveVoicing();
            if (active) window.chordAudio.playFrets(active.frets);
        };
    }

    window.dictView.updateButtons(); window.dictView.renderAll(); window.addEventListener('resize', () => window.dictView.renderAll());
});
