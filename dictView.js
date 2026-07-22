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
                return Math.min(4, Math.max(startFinger, gap <= 1 ? 2 : gap === 2 ? 3 : 4));
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
                result0._tier = 0;
                allVoicings.push(result0);
            }

            const result12 = processVoicing(sv, 12, `${sv.name} (High)`);
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
                allVoicings.push({ name: gv.name, frets: gv.frets, fingers: gv.fingers, _tier: 2 });
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

        // 🌟 특정 코드에서 못 잡는(비현실적인) 파지법을 프렛 배열로 지정해 제외
        const excluded = (window.excludedVoicings && window.excludedVoicings[root] && window.excludedVoicings[root][quality]) || [];
        if (excluded.length) {
            const exSet = new Set(excluded.map(f => f.join(',')));
            allVoicings = allVoicings.filter(v => !exSet.has(v.frets.join(',')));
        }

        // 🌟 15프렛 이상은 실제로 잘 안 쓰이는 구간이라 통째로 제외 (거의 항상 더 낮은 프렛에 같은
        //    폼의 옥타브 반복이 이미 있음 - 예: "Open D Shape (High)")
        allVoicings = allVoicings.filter(v => {
            const activeFrets = v.frets.filter(f => f > 0);
            return activeFrets.length === 0 || Math.max(...activeFrets) < 15;
        });

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

    // 🌟 "잡기 쉬운 정도"를 대충 점수로 매김 - 작을수록 쉬움. 바레면 확 어려워지고, 누르는 프렛
    //    종류가 여러 개(줄마다 프렛이 다 다름)일수록, 손을 벌리는 폭(최저~최고 프렛 차이)이
    //    클수록 어려움. 완벽한 난이도 모델은 아니지만 "같은 포지션 안에서 뭐가 더 편한가" 정도는
    //    충분히 가려냄.
    easeRank: function(v) {
        const activeFrets = v.frets.filter(f => f > 0);
        const distinctFrets = new Set(activeFrets).size;
        const span = activeFrets.length ? Math.max(...activeFrets) - Math.min(...activeFrets) : 0;
        return [this.isBarre(v) ? 1 : 0, distinctFrets, span];
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
    getShapeRepresentatives: function(voicings) {
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

        const categories = this.getShapeRepresentatives(voicings);
        const repIndices = [categories.open, categories.aShape, categories.eShape, categories.dShape, categories.compact].filter(Boolean).map(c => c.idx);
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

        const buckets = new Map();
        voicings.forEach((v, idx) => {
            const activeFrets = v.frets.filter(f => f > 0);
            const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
            const bucket = Math.floor(minFret / 3);
            if (!buckets.has(bucket)) buckets.set(bucket, []);
            buckets.get(bucket).push(idx);
        });

        const bucketLabel = (bucket) => bucket === 0 ? 'Open Position' : `Frets ${bucket * 3}-${bucket * 3 + 2}`;

        // 🌟 각 프렛 구간 안에서는 잡기 쉬운 폼이 맨 앞(대표 자리)에 오도록 정렬
        buckets.forEach(idxList => {
            idxList.sort((a, b) => {
                const rankA = this.easeRank(voicings[a]);
                const rankB = this.easeRank(voicings[b]);
                for (let i = 0; i < rankA.length; i++) {
                    if (rankA[i] !== rankB[i]) return rankA[i] - rankB[i];
                }
                return a - b;
            });
        });

        [...buckets.keys()].sort((a, b) => a - b).forEach(bucket => {
            const section = document.createElement('div');
            section.className = 'v-position-section';

            const label = document.createElement('div');
            label.className = 'group-title';
            label.textContent = bucketLabel(bucket);
            section.appendChild(label);

            const grid = document.createElement('div');
            grid.className = 'vertical-voicing-grid';
            buckets.get(bucket).forEach(idx => {
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

        const groups = [
            { key: 'open', label: 'Open Position' },
            { key: 'aShape', label: '5th-String Root (A Shape)' },
            { key: 'eShape', label: '6th-String Root (E Shape)' },
            { key: 'dShape', label: '4th-String Root (D Shape)' },
            { key: 'compact', label: 'Compact / Jazz Shape' }
        ];

        // 🌟 항상 넥 아래쪽(낮은 프렛)부터 나열 - 카테고리 종류 순서가 아니라 실제 대표 폼의 최저 프렛 기준
        groups.sort((a, b) => {
            const fa = categories[a.key] ? categories[a.key].minFret : Infinity;
            const fb = categories[b.key] ? categories[b.key].minFret : Infinity;
            return fa - fb;
        });

        let any = false;
        groups.forEach(g => {
            const candidate = categories[g.key];
            if (!candidate) return;
            any = true;
            const idx = candidate.idx;
            const v = voicings[idx];

            const group = document.createElement('div');
            group.className = 'v-shape-group';

            const label = document.createElement('div');
            label.className = 'group-title';
            label.textContent = g.label;
            group.appendChild(label);

            const isActive = !window.selectedSlashVoicing && idx === window.currentVoicingIndex;
            const card = this.renderVerticalDiagram(v, isActive, () => {
                window.currentVoicingIndex = idx;
                window.selectedSlashVoicing = null;
                this.renderAll();
            });
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
