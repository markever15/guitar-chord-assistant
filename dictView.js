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
    'maj7add11': 'maj7add11', 'maj7(add11)': 'maj7add11', 'm7add11': 'maj7add11', 'm7(add11)': 'maj7add11',
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

    // 🌟 4손가락 안에 들어가고, 유독 멀리 떨어진 음(다른 음들과 3프렛 이상 차이나는 외톨이 음)도
    //    없으면 굳이 바레로 묶을 필요 없이 단순 배정이 더 자연스러움 (E/A/Em/Am 오픈코드처럼
    //    같은 프렛에 인접한 두 줄이 있어도 그냥 손가락 두 개 따로 쓰는 게 표준 운지법인 경우가 많음)
    const distinctFrets = [...new Set(fretted.map(x => x.f))].sort((a, b) => a - b);
    const hasFarOutlier = distinctFrets.length >= 2 && (distinctFrets[distinctFrets.length - 1] - distinctFrets[distinctFrets.length - 2]) >= 3;
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

    // 그룹/단독 음들을 프렛 오름차순(동률이면 6번줄에 가까운 쪽)으로 정렬해 손가락 번호를 순서대로 매김.
    // 딱 하나만 남았는데 기준 프렛(refFret, 보통 바레)에서 3프렛 이상 떨어져 있으면 옆 손가락으로
    // 이어 뻗기엔 너무 머니까 새끼손가락(4번)으로 바로 보냄
    function assignSequential(items, startFinger, refFret) {
        items.sort((a, b) => a.fret - b.fret || Math.min(...a.strings) - Math.min(...b.strings));
        const budget = 4 - startFinger + 1;
        if (items.length > budget) return null;
        const result = {};
        if (items.length === 1 && refFret !== undefined && items[0].fret - refFret >= 3 && startFinger < 4) {
            items[0].strings.forEach(s => { result[s] = 4; });
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

    // 2) 확장 바레가 안 되거나 부족하면, 전체를 같은 프렛끼리만 묶어서 프렛 오름차순으로 배정
    const assigned2 = assignSequential(findGroups(fretted), 1, undefined);
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

            return {
                name: nameSuffix,
                frets: shiftedFrets,
                fingers: shiftedFingers
            };
        };

        // 1. 하드코딩된 지정 파지법을 먼저 넣어 이름/운지 우선권을 줌 (원본 및 +12 옥타브 하이 포지션)
        //    → 아래 자동 변환 폼과 프렛이 겹치면 지정 파지법이 이기고, 안 겹치는 자동 생성분만 뒤에 추가됨
        specificVoicings.forEach(sv => {
            const result0 = processVoicing(sv, 0, sv.name);
            if (result0 && !allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(result0.frets))) {
                allVoicings.push(result0);
            }

            const result12 = processVoicing(sv, 12, `${sv.name} (High)`);
            if (result12 && !allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(result12.frets))) {
                allVoicings.push(result12);
            }
        });

        // 2. 자동 생성된 파지법(generatedVoicings) - 지정 파지법이 없는 루트/품질의 빈 자리를 채움.
        //    지정 파지법과 겹치면 건너뜀 (지정 파지법이 항상 우선)
        const generated = (window.generatedVoicings && window.generatedVoicings[root] && window.generatedVoicings[root][quality]) || [];
        generated.forEach(gv => {
            if (!allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(gv.frets))) {
                allVoicings.push({ name: gv.name, frets: gv.frets, fingers: gv.fingers });
            }
        });

        // 3. C 코드 기준 변환 폼 대량 생성 - 위에서 이미 추가된 파지법과 겹치는 프렛은 건너뜀
        baseVoicings.forEach(v => {
            offsetsToTry.forEach(off => {
                const result = processVoicing(v, off, `${root}${quality === 'Major' ? '' : quality} (${v.name.split(' ')[0]} Shape)`, true);
                if (result && !allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(result.frets))) {
                    allVoicings.push(result);
                }
            });
        });

        // 🌟 특정 코드에서 못 잡는(비현실적인) 파지법을 프렛 배열로 지정해 제외
        const excluded = (window.excludedVoicings && window.excludedVoicings[root] && window.excludedVoicings[root][quality]) || [];
        if (excluded.length) {
            const exSet = new Set(excluded.map(f => f.join(',')));
            allVoicings = allVoicings.filter(v => !exSet.has(v.frets.join(',')));
        }

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

    // 현재 재생/하이라이트의 기준이 되는 보이싱: 슬래시 코드가 선택돼 있으면 그게 우선, 아니면 메인 리스트의 선택된 인덱스
    getActiveVoicing: function() {
        if (window.selectedSlashVoicing) return window.selectedSlashVoicing;
        if (!window.currentRoot || !window.currentQuality) return null;
        const voicings = this.getChordVoicings(window.currentRoot, window.currentQuality);
        return voicings[window.currentVoicingIndex] || voicings[0] || null;
    },

    renderAll: function() {
        const formulaTitle = document.getElementById('formula-title');

        if (!window.currentRoot || !window.currentQuality) {
            if (formulaTitle) formulaTitle.textContent = "Select a Chord";
            document.getElementById('notes-badges').innerHTML = '';
            this.renderVerticalVoicingGrid('voicing-list', [], 'Pick a root note and chord quality to see every practical voicing.');
            this.renderSlashChordShelf(null, null);
            return;
        }

        const voicings = this.getChordVoicings(window.currentRoot, window.currentQuality);

        if (formulaTitle) {
            formulaTitle.textContent = window.selectedSlashVoicing
                ? `${window.selectedSlashVoicing.name}`
                : `${window.currentRoot}${window.currentQuality === 'Major' ? '' : window.currentQuality}`;
        }

        this.renderChordFormula();
        this.renderVerticalVoicingGrid('voicing-list', voicings, 'No practical voicing found for this chord within 15 frets.');
        this.renderSlashChordShelf(window.currentRoot, window.currentQuality);
    },

    renderChordFormula: function() {
        const badges = document.getElementById('notes-badges');
        if (!badges || !window.currentRoot || !window.currentQuality) return;
        badges.innerHTML = '';
        const table = window.chordNotesTable || {};
        const notes = table[window.currentRoot]?.[window.currentQuality] || [window.currentRoot];

        notes.forEach((note, idx) => {
            const badge = document.createElement('div');
            badge.className = `note-badge ${idx === 0 ? 'is-root' : ''}`;
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

    // 표준 세로형 코드 다이어그램(줄=세로, 프렛=가로) 카드 하나를 만들어 반환
    renderVerticalDiagram: function(voicing, isActive, onSelect) {
        const frets = voicing.frets;
        // 🌟 저장된 fingers 대신 항상 규칙 기반으로 계산 → 전체 코드 손가락 번호 일관성 보장
        // (바레로도 4손가락 안에 못 들어가는 예외적인 기존 데이터가 있을 경우를 대비한 안전장치)
        const fingers = computeFingers(frets) || frets.map(f => (f === -1 ? -1 : (f > 0 ? Math.min(frets.filter(x => x > 0 && x <= f).length, 4) : 0)));
        const activeFrets = frets.filter(f => f > 0);
        const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
        const maxFret = activeFrets.length ? Math.max(...activeFrets) : 0;
        // 🌟 프렛 1~4 안에 다 들어가는 파지법은 항상 너트(1프렛)부터 그림 (포지션 라벨 없이 오픈 코드처럼 보이게)
        const startFret = (maxFret > 0 && maxFret <= 4) ? 1 : (minFret > 0 ? minFret : 1);
        const isNut = startFret === 1;
        const numRows = Math.max(4, maxFret - startFret + 1);

        const card = document.createElement('div');
        card.className = `v-chord-card ${isActive ? 'active' : ''}`;

        const nameEl = document.createElement('div');
        nameEl.className = 'v-chord-name';
        nameEl.textContent = voicing.name;
        card.appendChild(nameEl);

        const diagram = document.createElement('div');
        diagram.className = 'v-chord-diagram';

        const legend = document.createElement('div');
        legend.className = 'v-legend-row';
        for (let s = 0; s < 6; s++) {
            const cell = document.createElement('div');
            cell.className = 'v-legend-cell';
            cell.style.left = `${(s / 5) * 100}%`;
            if (frets[s] === -1) { cell.textContent = 'X'; cell.classList.add('mute'); }
            else if (frets[s] === 0) { cell.textContent = 'O'; cell.classList.add('open'); cell.dataset.note = window.getNoteName(5 - s, 0); }
            legend.appendChild(cell);
        }
        diagram.appendChild(legend);

        diagram.appendChild(document.createElement('div')).className = isNut ? 'v-nut-bar' : 'v-top-border';

        const gridWrap = document.createElement('div');
        gridWrap.className = 'v-grid-wrap';

        if (!isNut) {
            const posLabel = document.createElement('div');
            posLabel.className = 'v-position-label';
            posLabel.textContent = startFret;
            gridWrap.appendChild(posLabel);
        }

        const grid = document.createElement('div');
        grid.className = 'v-grid';
        grid.style.height = `${numRows * 36}px`;

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

        // 검지(1번) 바레 표시줄
        const barreMap = {};
        fingers.forEach((fg, s) => {
            if (fg === 1 && frets[s] > 0) { (barreMap[frets[s]] = barreMap[frets[s]] || []).push(s); }
        });
        Object.entries(barreMap).forEach(([fretStr, strs]) => {
            if (strs.length < 2) return;
            const fret = parseInt(fretStr);
            const rowIdx = fret - startFret;
            if (rowIdx < 0 || rowIdx >= numRows) return;
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
                dot.className = `v-dot ${noteName === window.currentRoot ? 'root' : ''}`;
                dot.dataset.note = noteName;
                dot.style.left = `${(s / 5) * 100}%`;
                dot.style.top = `${((rowIdx + 0.5) / numRows) * 100}%`;
                const fingerVal = fingers[s];
                dot.textContent = window.showAllNotesState ? noteName : (fingerVal > 0 ? fingerVal : '');
                grid.appendChild(dot);
            }
        }

        gridWrap.appendChild(grid);
        diagram.appendChild(gridWrap);
        card.appendChild(diagram);

        if (onSelect) card.onclick = onSelect;
        return card;
    },

    renderVerticalVoicingGrid: function(containerId, voicings, emptyMessage) {
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

        voicings.forEach((v, idx) => {
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
        let targetQuality = (quality === 'm' || quality === 'dim' || quality === 'dim7') ? 'm' : (quality === 'Major' ? 'Major' : 'None');

        const items = rootGroup[targetQuality] || [];
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
            b.style.gridColumn = item.col;
            b.style.gridRow = item.row;
            b.onclick = () => {
                if (window.currentRoot === item.note) { window.currentRoot = null; }
                else { window.currentRoot = item.note; }
                window.currentVoicingIndex = 0;
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
            'Minor': ['m7', 'm6', 'm6/9', 'm(maj7)', 'm(maj7)add11', 'm7add13', 'm(maj7)add13', 'm(add9)', 'm9', 'm(maj9)', 'm11', 'm(maj11)', 'm13'],
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
                b.onclick = () => {
                    if (window.currentQuality === q) { window.currentQuality = null; }
                    else { window.currentQuality = q; }
                    window.currentVoicingIndex = 0;
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
    if (showBtn) showBtn.onclick = () => { window.showAllNotesState = !window.showAllNotesState; showBtn.classList.toggle('active', window.showAllNotesState); showBtn.innerText = window.showAllNotesState ? "Hide Notes" : "Show Notes"; window.dictView.renderAll(); };

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
