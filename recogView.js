// recogView.js

// 🌟 스크립트 로드 순서와 상관없이 최상단에서 전역 변수 초기화 보장
window.finderUserFrets = window.finderUserFrets || [0, 0, 0, 0, 0, 0];
window.finderShowNotesState = window.finderShowNotesState || false;

window.recogView = {
    renderFinderFretboard: function() {
        const fb = document.getElementById('finder-fretboard');
        const hd = document.getElementById('finder-hover-detector');
        const oi = document.getElementById('finder-open-indicators');
        const fn = document.getElementById('finder-fret-numbers');
        if (!fb || !hd || !oi || !fn) return;

        // 기존 렌더링 초기화
        fb.innerHTML = ''; hd.innerHTML = ''; oi.innerHTML = ''; fn.innerHTML = '';
        
        const totalFrets = window.totalFrets || 15;
        const stringCount = window.stringCount || 6;
        
        // 🌟 모바일이나 특정 브라우저에서 너비를 0으로 계산하여 렌더링이 증발하는 버그 차단
        const safeWidth = fb.clientWidth > 50 ? fb.clientWidth : 540;
        const fretX = window.makeFretX(safeWidth, totalFrets);
        // 🌟 지판(.fretboard)은 왼쪽에 너트 역할의 border가 있어 내용 영역이 그만큼 오른쪽에서 시작한다.
        //    클릭 판정용 .hover-detector와 프렛 번호줄은 형제 요소라 그 border 폭을 모르는 채로
        //    0부터 깔려서, 프렛이 좁아질수록 클릭 위치가 눈에 띄게 어긋났다. 여기서 맞춰준다.
        const nutWidth = parseFloat(getComputedStyle(fb).borderLeftWidth) || 0;
        hd.style.left = `${nutWidth}px`;
        hd.style.width = `${safeWidth}px`;
        hd.style.minWidth = '0';
        // 프렛 번호줄은 position:relative라 left 대신 왼쪽 여백으로 같은 만큼 민다
        fn.style.marginLeft = `${nutWidth}px`;
        fn.style.width = `${safeWidth}px`;
        fn.style.minWidth = '0';
        // 프렛 n의 칸(=n-1프렛과 n프렛 사이) 중앙 x좌표 - 마커/음이름을 여기에 놓는다
        const cellCenter = n => (fretX(n - 1) + fretX(n)) / 2;

        // 🌟 줄 간격을 코드에 박아두면 CSS에서 지판 높이를 줄여도 줄만 제자리에 남아 어긋난다.
        //    (가로 폰에서 지판을 132px로 줄였더니 6번줄이 지판 밖으로 나갔다) 한 군데서만 정한다.
        const gap = parseFloat(getComputedStyle(document.documentElement)
            .getPropertyValue('--fb-string-gap')) || 30;
        // 🌟 실제 넥은 너트에서 몸통 쪽으로 갈수록 넓어진다(43mm → 15프렛에서 약 53mm, +24%).
        //    다만 가로 지판은 넥 길이를 실제보다 짧게, 넥 폭을 실제보다 넓게 그린다. 폭이 길이보다
        //    1.5배쯤 부풀려져 있어서 실제 비율을 그대로 넣으면 벌어지는 각도가 그만큼 과해진다.
        //    화면에서 보이는 각도가 실제와 같아지도록 되돌린 값이다. 앉아서 보는 각도는
        //    넥을 좁히는 게 아니라 줄 사이 간격으로 표현한다(아래 DEPTH).
        const TAPER = 0.13;
        const widen = x => (1 + TAPER * (x / safeWidth)) / (1 + TAPER);
        const midY = gap * stringCount / 2;

        // 🌟 연주자는 6번줄 쪽에서 1번줄 쪽을 내려다본다. 가까운 6번줄 쪽 간격이 넓고
        //    멀어질수록 좁아 보인다. 줄 간격을 등비로 줄여 그 시점을 흉내낸다.
        //    (s=0이 1번줄로 화면 위쪽, s=5가 6번줄로 아래쪽)
        //    실제 거리 차이만 따지면 6번줄이 1번줄보다 눈에서 5cm쯤 가까워 간격 차가 1.1배에
        //    그친다. 화면은 지판 높이가 고정이라 줄 전체가 눌려 보이는 압축을 표현할 수 없으니,
        //    그 몫까지 간격 차에 실어 실제보다 과장한다.
        const DEPTH = 1.0;      // 1이면 줄 간격이 균등하다. 낮출수록 6번줄 쪽이 벌어진다.
        const stringOffset = (() => {
            const gaps = [];
            for (let k = 0; k < stringCount - 1; k++) gaps.push(Math.pow(DEPTH, stringCount - 2 - k));
            const sum = gaps.reduce((a, b) => a + b, 0);
            const scale = (stringCount - 1) / sum;      // 평균 간격은 그대로 두고 분배만 바꾼다
            const pos = [0];
            for (let k = 0; k < gaps.length; k++) pos.push(pos[k] + gaps[k] * scale);
            const mid = pos[pos.length - 1] / 2;
            return pos.map(v => v - mid);
        })();
        const stringY = (s, x) => midY + stringOffset[s] * gap * widen(x);

        // 1. 프렛 세로선 그리기 - 넥이 벌어지는 만큼만 긋는다. 지판 높이만큼 곧게 세우면
        //    테두리만 직사각형으로 남아 줄이 삐뚤어진 것처럼 보인다.
        const boardH = gap * stringCount;
        for (let i = 0; i <= totalFrets; i++) {
            const left = fretX(i);
            const neckH = boardH * widen(left);
            const line = document.createElement('div'); 
            line.className = i === 0 ? 'fret-line nut-line' : 'fret-line'; 
            line.style.left = `${left}px`; 
            line.style.height = `${neckH}px`; 
            line.style.top = `${(boardH - neckH) / 2}px`;
            fb.appendChild(line);
            
            // 🌟 0번 자리(너트)는 라벨을 달지 않는다 - 굵은 너트 선이 이미 그 자리를 말해준다
            if (i > 0) {
                const num = document.createElement('div');
                num.className = 'fret-number';
                num.style.left = `${cellCenter(i)}px`;
                num.textContent = i;
                fn.appendChild(num);
            }
        }

        window.renderFretInlays(fb, fretX, totalFrets, 180);

        // 🌟 "Show Notes"가 켜지면 선택 여부와 상관없이 지판 전체(1프렛~마지막 프렛)의
        // 음이름을 다 보여줌 (개방현 fret 0은 별도 O/X 인디케이터가 이미 담당하므로 겹치지 않게 1프렛부터만 표시)
        const showAllNotes = window.finderShowNotesState && window.getNoteName;

        // 2. 기타 줄 - 기울어지므로 div 막대 대신 SVG 직선으로 긋는다
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'fb-strings');
        svg.setAttribute('viewBox', `0 0 ${safeWidth} ${gap * stringCount}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        for (let s = 0; s < stringCount; s++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);          line.setAttribute('y1', stringY(s, 0));
            line.setAttribute('x2', safeWidth);  line.setAttribute('y2', stringY(s, safeWidth));
            line.setAttribute('stroke-width', 1 + s * 0.5);
            line.setAttribute('vector-effect', 'non-scaling-stroke');
            svg.appendChild(line);
        }
        fb.appendChild(svg);

        // 3. 개방현 표시 · 클릭 판정 · 마커
        for (let s = 0; s < stringCount; s++) {
            const openIndicator = document.createElement('div'); 
            openIndicator.style.position = 'absolute';
            openIndicator.style.top = `${stringY(s, 0)}px`;
            openIndicator.style.transform = 'translateY(-50%)';
            openIndicator.style.height = `${gap}px`;
            openIndicator.style.lineHeight = `${gap}px`;
            const currentFret = window.finderUserFrets[s];
            
            openIndicator.textContent = currentFret === 0 ? 'O' : (currentFret === -1 ? 'X' : '');
            openIndicator.className = `open-indicator notranslate ${currentFret === 0 ? 'play' : (currentFret === -1 ? 'mute' : '')}`;
            openIndicator.translate = false;   // X/O는 기보 기호라 번역되면 안 된다
            
            openIndicator.onclick = () => {
                window.finderUserFrets[s] = window.finderUserFrets[s] === 0 ? -1 : 0;
                this.renderFinderFretboard(); 
                this.detectChordFromFinder();
            };
            oi.appendChild(openIndicator);

            // 🌟 줄이 기울어지니 클릭 칸도 프렛마다 높이와 위치가 달라진다. 칸 가운데 x에서
            //    줄 간격을 다시 재서 그 프렛 칸에 맞춘다.
            for (let f = 1; f <= totalFrets; f++) {
                const x0 = fretX(f - 1), x1 = fretX(f), xc = (x0 + x1) / 2;
                const cell = document.createElement('div'); 
                cell.className = 'fret-cell'; 
                cell.style.position = 'absolute';
                cell.style.left = `${x0}px`;
                cell.style.width = `${x1 - x0}px`;
                cell.style.height = `${gap * widen(xc)}px`;
                cell.style.top = `${stringY(s, xc) - gap * widen(xc) / 2}px`;
                
                // 터치 및 클릭 이벤트 할당
                cell.onclick = () => {
                    window.finderUserFrets[s] = window.finderUserFrets[s] === f ? 0 : f;
                    this.renderFinderFretboard(); 
                    this.detectChordFromFinder();
                };
                hd.appendChild(cell);
            }

            // 사용자가 찍은 노트 마커 렌더링
            if (window.finderUserFrets[s] > 0) {
                const m = document.createElement('div'); 
                m.className = 'note-marker';
                m.textContent = (window.getNoteName) ? window.getNoteName(s, window.finderUserFrets[s]) : '';
                
                m.style.position = 'absolute';
                m.style.transform = 'translate(-50%, -50%)';
                m.style.left = `${cellCenter(window.finderUserFrets[s])}px`; 
                m.style.top = `${stringY(s, cellCenter(window.finderUserFrets[s]))}px`;
                m.style.cursor = 'pointer'; 
                
                m.onclick = () => {
                    window.finderUserFrets[s] = 0; 
                    this.renderFinderFretboard(); 
                    this.detectChordFromFinder();
                };
                
                fb.appendChild(m);
            }

            if (showAllNotes) {
                for (let f = 1; f <= totalFrets; f++) {
                    if (f === window.finderUserFrets[s]) continue; // 실제 유저 마커와 겹치지 않게 건너뜀
                    const note = window.getNoteName(s, f);

                    const ghost = document.createElement('div');
                    ghost.className = 'note-marker ghost-marker';
                    ghost.textContent = note;
                    ghost.style.position = 'absolute';
                    ghost.style.transform = 'translate(-50%, -50%)';
                    ghost.style.left = `${cellCenter(f)}px`;
                    ghost.style.top = `${stringY(s, cellCenter(f))}px`;
                    fb.appendChild(ghost);
                }
            }
        }
    },

    // 🌟 세로 화면용 지판. 줄이 세로 칸, 프렛이 가로 줄이라 사전 다이어그램과 방향이 같다.
    //    가로 지판은 세로 폰에서 프렛 한 칸이 10px 안팎으로 좁아져 정확히 못 누른다.
    //    finderUserFrets는 s=0이 1번줄(high e)이므로, 왼쪽부터 6번줄이 오게 뒤집어 그린다.
    VERTICAL_FRETS: 15,
    VERTICAL_INLAYS: [3, 5, 7, 9, 12, 15],
    renderFinderVertical: function() {
        const wrap = document.getElementById('finder-vertical');
        if (!wrap) return;
        wrap.innerHTML = '';

        const total = this.VERTICAL_FRETS;

        const BASE_H = 52, MIN_H = 36;
        // 🌟 실제 넥은 너트에서 몸통 쪽으로 갈수록 넓어진다(43mm → 15프렛에서 약 53mm).
        //    칸마다 폭을 조금씩 키워 사다리꼴로 그린다. 줄은 SVG 직선으로 따로 그어
        //    칸 경계마다 어긋나 보이지 않게 한다.
        const TAPER = 0.22;
        const rowH = f => Math.max(MIN_H, Math.round(BASE_H * Math.pow(2, -(f - 1) / 12)));

        // 보이는 칸 수는 CSS에서 화면 높이에 맞춰 정한다 - 기기마다 쓸 수 있는 높이가 다르다
        // 칸 높이를 먼저 계산해 두어야 폭을 정할 수 있다
        const heights = [];
        for (let f = 1; f <= total; f++) heights[f] = rowH(f);
        let totalH = 0;
        for (let f = 1; f <= total; f++) totalH += heights[f];
        let yTop = [];
        let acc = 0;
        for (let f = 1; f <= total; f++) { yTop[f] = acc; acc += heights[f]; }
        // 너트에서의 폭 비율. 가장 넓은 칸이 100%가 되도록 맞춘다.
        const widthAt = y => (1 + TAPER * (y / totalH)) / (1 + TAPER);
        const rowWidth = f => widthAt(yTop[f] + heights[f] / 2);


        // 🌟 위쪽 O/X 줄은 고정하고 프렛 칸만 드래그로 넘긴다. 6칸씩 보이고 칸 높이는 그대로라
        //    누르기 편하면서 넥 전체를 훑을 수 있다.
        const top = document.createElement('div');
        top.className = 'fv-top';
        top.appendChild(Object.assign(document.createElement('div'), { className: 'fv-numspacer' }));

        const headGrid = document.createElement('div');
        headGrid.className = 'fv-headgrid';
        const head = document.createElement('div');
        head.className = 'fv-head';
        for (let col = 0; col < 6; col++) {
            const s = 5 - col;
            const cur = window.finderUserFrets[s];
            const b = document.createElement('button');
            b.className = `fv-mark notranslate ${cur === 0 ? 'open' : (cur === -1 ? 'mute' : '')}`;
            b.translate = false;
            b.textContent = cur === 0 ? 'O' : (cur === -1 ? 'X' : '');
            b.onclick = () => {
                window.finderUserFrets[s] = cur === 0 ? -1 : 0;
                this.renderFinder();
            };
            head.appendChild(b);
        }
        head.style.width = (widthAt(0) * 100) + '%';
        head.style.margin = '0 auto';
        headGrid.appendChild(head);
        const nut = Object.assign(document.createElement('div'), { className: 'fv-nut' });
        nut.style.width = (widthAt(0) * 100) + '%';
        nut.style.margin = '0 auto 2px';
        headGrid.appendChild(nut);
        top.appendChild(headGrid);
        wrap.appendChild(top);

        // 🌟 실제 기타처럼 넥 위로 갈수록 칸이 좁아진다. 프렛 간격은 12제곱근 2의 비율로
        //    줄어드는데(2^(-1/12) ≈ 0.944), 그대로 두면 15프렛이 23px까지 좁아져 못 누른다.
        //    최소 높이를 정해 그 아래로는 안 내려가게 한다.
        const scroll = document.createElement('div');
        scroll.className = 'fv-scroll';
        const inner = document.createElement('div');
        inner.className = 'fv-inner';
        const nums = document.createElement('div');
        nums.className = 'fv-fretnums';
        const rows = document.createElement('div');
        rows.className = 'fv-rows';
        const showAll = window.finderShowNotesState && window.getNoteName;

        for (let f = 1; f <= total; f++) {
            const h = rowH(f);
            const label = document.createElement('div');
            label.className = 'fv-fretnum';
            label.style.height = h + 'px';
            label.textContent = f;
            nums.appendChild(label);

            const row = document.createElement('div');
            row.className = 'fv-row';
            row.style.height = h + 'px';
            row.style.width = (rowWidth(f) * 100) + '%';
            for (let col = 0; col < 6; col++) {
                const s = 5 - col;
                const cell = document.createElement('div');
                cell.className = 'fv-cell';
                if (this.VERTICAL_INLAYS.includes(f) && col === 2) {
                    cell.appendChild(Object.assign(document.createElement('div'), { className: 'fv-inlay' }));
                }
                const note = window.getNoteName ? window.getNoteName(s, f) : '';
                const dotSize = Math.min(30, h - 6);
                if (window.finderUserFrets[s] === f) {
                    const dot = document.createElement('div');
                    dot.className = 'fv-dot notranslate';
                    dot.translate = false;
                    dot.style.width = dot.style.height = dotSize + 'px';
                    dot.textContent = note;
                    cell.appendChild(dot);
                } else if (showAll) {
                    const ghost = document.createElement('div');
                    ghost.className = 'fv-dot ghost notranslate';
                    ghost.translate = false;
                    ghost.style.width = ghost.style.height = (dotSize - 4) + 'px';
                    ghost.textContent = note;
                    cell.appendChild(ghost);
                }
                cell.onclick = () => {
                    window.finderUserFrets[s] = window.finderUserFrets[s] === f ? 0 : f;
                    this.renderFinder();
                };
                row.appendChild(cell);
            }
            rows.appendChild(row);
        }

        // 🌟 줄은 곧게 뻗어야 한다. 칸마다 그리면 프렛선마다 1~2px씩 어긋나 계단처럼 보인다.
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'fv-strings');
        svg.setAttribute('viewBox', `0 0 100 ${totalH}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        for (let i = 0; i < 6; i++) {
            const xAt = y => {
                const w = widthAt(y);
                return ((1 - w) / 2 + w * (i + 0.5) / 6) * 100;
            };
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', xAt(0));       line.setAttribute('y1', 0);
            line.setAttribute('x2', xAt(totalH));  line.setAttribute('y2', totalH);
            // 가로 지판처럼 저음줄일수록 굵게 - 프렛선과 구분되고 몇 번 줄인지 바로 보인다
            line.setAttribute('stroke-width', 1 + (5 - i) * 0.5);
            line.setAttribute('vector-effect', 'non-scaling-stroke');
            svg.appendChild(line);
        }
        rows.appendChild(svg);

        inner.appendChild(nums);
        inner.appendChild(rows);
        scroll.appendChild(inner);
        wrap.appendChild(scroll);

        // 🌟 짚은 음이 보이는 범위 밖이면 그 자리로 스크롤한다. 예제를 불러왔는데 빈 지판만
        //    보이는 일이 없어야 한다. 개방현은 위쪽 고정 줄에 있으므로 계산에서 뺀다.
        const fretted = window.finderUserFrets.filter(f => f > 0);
        if (fretted.length) {
            let above = 0;
            for (let f = 1; f < Math.min(...fretted); f++) above += rowH(f);
            scroll.scrollTop = Math.max(0, above - rowH(1) * 0.5);
        }
    },

    // 가로/세로 지판을 함께 갱신한다 - CSS가 화면 방향에 따라 하나만 보여준다
    renderFinder: function() {
        this.renderFinderFretboard();
        this.renderFinderVertical();
        this.detectChordFromFinder();
    },

    // 🌟 결과 화면에는 지판이 없다. 방금 짚은 모양을 코드 사전과 같은 다이어그램으로 그려
    //    "이걸 짚은 게 맞다"를 눈으로 확인하게 한다. finderUserFrets는 s=0이 1번줄이고
    //    사전 다이어그램은 6번줄부터라 뒤집어 넘긴다.
    renderShapeCard: function(rootKey) {
        const box = document.getElementById('recog-shape');
        if (!box || !window.dictView) return;
        box.innerHTML = '';
        const frets = [...window.finderUserFrets].reverse();
        if (!frets.some(f => f > 0)) return;          // 개방현만 눌린 상태면 그릴 게 없다
        const prevRoot = window.currentRoot;
        window.currentRoot = rootKey;                 // 근음만 다른 색으로 찍히게 한다
        try {
            box.appendChild(window.dictView.renderVerticalDiagram({ frets, name: '' }, false, null, ''));
        } finally {
            window.currentRoot = prevRoot;
        }
    },

    // 🌟 세로 화면에서는 지판과 결과를 한 화면에 같이 두면 지판이 눌린다. 사전과 같은 방식으로
    //    "짚는 화면"과 "결과 화면"을 오간다. 넓은 화면에서는 CSS가 둘 다 보여주므로 영향이 없다.
    showFinderResult: function(on) {
        const layout = document.querySelector('.finder-layout');
        if (!layout) return;
        layout.classList.toggle('finder-result-view', !!on);
        window.scrollTo(0, 0);
    },

    // 🌟 처음 들어온 사람이 뭘 눌러야 할지 모르는 경우가 많아 익숙한 코드를 하나씩 넣어준다
    EXAMPLES: [
        { name: 'C',  frets: [0, 1, 0, 2, 3, -1] },
        { name: 'G',  frets: [3, 0, 0, 0, 2, 3] },
        { name: 'Am', frets: [0, 1, 2, 2, 0, -1] },
        { name: 'Em', frets: [0, 0, 0, 2, 2, 0] },
        { name: 'D',  frets: [2, 3, 2, 0, -1, -1] },
        { name: 'F',  frets: [1, 1, 2, 3, 3, 1] }
    ],
    exampleIndex: 0,

    loadExample: function() {
        const ex = this.EXAMPLES[this.exampleIndex % this.EXAMPLES.length];
        this.exampleIndex++;
        window.finderUserFrets = ex.frets.slice();
        this.renderFinder();
    },

    detectChordFromFinder: function() {
        const detectedNotes = [];
        const stringCount = window.stringCount || 6;
        let bassNote = null;

        for (let s = 5; s >= 0; s--) {
            const fret = window.finderUserFrets[s];
            if (fret !== -1 && fret !== undefined && fret !== null) {
                const note = (window.getNoteName) ? window.getNoteName(s, fret) : null;
                if (note) {
                    if (!bassNote) bassNote = note; 
                    detectedNotes.push(note);
                }
            }
        }

        const uniqueUserNotes = [...new Set(detectedNotes)].sort();
        if (uniqueUserNotes.length === 0) {
            const nameEl = document.getElementById('recog-detected-name');
            nameEl.textContent = "Unknown";
            nameEl.translate = true;
            document.getElementById('recog-detected-notes').textContent = "Notes: None";
            document.getElementById('analysis-status').textContent = '';
            this.renderShapeCard(null);
            this.renderResultLinks(null);
            return;
        }

        // 🌟 "Notes:"는 번역돼도 되지만 음 이름은 기보라 그대로 둬야 한다
        const notesEl = document.getElementById('recog-detected-notes');
        notesEl.textContent = 'Notes: ';
        const notesVal = document.createElement('span');
        notesVal.className = 'notranslate';
        notesVal.translate = false;
        notesVal.textContent = uniqueUserNotes.join(', ');
        notesEl.appendChild(notesVal);
        const table = window.chordNotesTable || {};
        let matchedChordName = "Unknown";
        
        let bestMatch = null;
        let maxMatchScore = -1; 

        for (const [rootKey, qualitiesObj] of Object.entries(table)) {
            for (const [qualityKey, formulaNotes] of Object.entries(qualitiesObj)) {
                const isSubset = uniqueUserNotes.every(note => formulaNotes.includes(note));
                
                if (isSubset) {
                    if (!uniqueUserNotes.includes(rootKey)) continue;

                    if (qualityKey !== '5') {
                        const thirdNote = formulaNotes[1]; 
                        if (thirdNote && !uniqueUserNotes.includes(thirdNote)) continue;
                    }

                    const score = uniqueUserNotes.length / formulaNotes.length;
                    const bassBonus = (rootKey === bassNote) ? 0.5 : 0;
                    const totalScore = score + bassBonus;

                    if (totalScore > maxMatchScore) {
                        maxMatchScore = totalScore;
                        bestMatch = { rootKey, qualityKey };
                    }
                }
            }
        }

        if (bestMatch) {
            matchedChordName = `${bestMatch.rootKey}${bestMatch.qualityKey === 'Major' ? '' : bestMatch.qualityKey}`;
            if (bassNote && bassNote !== bestMatch.rootKey) {
                matchedChordName += `/${bassNote}`;
            }
            // 코드를 찾아냈으면 이름이 이미 크게 떠 있다 - 굳이 한 줄 더 붙이지 않는다
            document.getElementById('analysis-status').textContent = '';
        } else {
            document.getElementById('analysis-status').textContent = '';
        }

        const detectedEl = document.getElementById('recog-detected-name');
        detectedEl.translate = false;   // 코드 이름은 번역 대상이 아니다
        detectedEl.textContent = matchedChordName;

        this.renderShapeCard(bestMatch ? bestMatch.rootKey : null);
        this.renderResultLinks(bestMatch);
    },

    // 🌟 이름을 알아낸 다음으로 이어 주는 문. 여기서 끊기면 파인더는 퀴즈로 끝난다.
    renderResultLinks: function(match) {
        const host = document.getElementById('recog-links');
        if (!host) return;
        if (!match) { host.style.display = 'none'; host.innerHTML = ''; return; }

        const { rootKey, qualityKey } = match;
        const label = rootKey + (qualityKey === 'Major' ? '' : qualityKey);
        const count = (window.dictView ? window.dictView.getChordVoicings(rootKey, qualityKey).length : 0);
        host.style.display = '';
        host.innerHTML = '';

        const mk = (text, onClick) => {
            const b = document.createElement('button');
            b.className = 'recog-link';
            b.innerHTML = text;
            b.addEventListener('click', onClick);
            host.appendChild(b);
        };

        mk(`📖 All ${count} ways to play <span class="notranslate">${label}</span>`, () => {
            window.currentRoot = rootKey;
            window.currentQuality = qualityKey;
            window.currentVoicingIndex = 0;
            window.showAllVoicings = false;
            window.dictShowPicker = false;
            if (window.dictView) { window.dictView.updateButtons(); }
            const tab = document.querySelector('.nav-tab[data-target="tab-dictionary"]');
            if (tab) tab.click();
        });

        // 이 코드가 어느 조성에 속하는지 알면 그 조성의 진행으로 바로 넘어갈 수 있다.
        const places = (window.chordContext ? window.chordContext.placements(rootKey, qualityKey) : []);
        if (places.length && window.progView && window.progView.loadPreset) {
            const p = places[0];
            const progs = window.chordContext.progressionsFor(p, rootKey, qualityKey);
            if (progs.length) {
                mk(`🎼 Put <span class="notranslate">${label}</span> in a progression`, () => {
                    window.progView.loadPreset(progs[0].key, progs[0].mode, progs[0].name);
                });
            } else {
                mk(`🎼 Write in <span class="notranslate">${p.key} ${p.mode}</span>, where this is the ${p.roman}`, () => {
                    window.progView.loadPreset(p.key, p.mode, null);
                });
            }
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const resetBtn = document.getElementById('reset-finder-btn');
    if (resetBtn) {
        resetBtn.onclick = () => {
            window.finderUserFrets = [0, 0, 0, 0, 0, 0];
            window.recogView.showFinderResult(false);
            window.recogView.renderFinder();
        };
    }

    const exampleBtn = document.getElementById('example-finder-btn');
    if (exampleBtn) exampleBtn.onclick = () => window.recogView.loadExample();

    const identifyBtn = document.getElementById('finder-identify-btn');
    if (identifyBtn) identifyBtn.onclick = () => window.recogView.showFinderResult(true);

    const finderBackBtn = document.getElementById('finder-back-btn');
    if (finderBackBtn) finderBackBtn.onclick = () => window.recogView.showFinderResult(false);

    const playFinderBtn = document.getElementById('play-finder-btn');
    if (playFinderBtn) {
        playFinderBtn.onclick = () => {
            if (window.chordAudio) window.chordAudio.playFrets(window.finderUserFrets);
        };
    }

    const showFinderNotesBtn = document.getElementById('show-finder-notes-btn');
    if (showFinderNotesBtn) {
        showFinderNotesBtn.onclick = () => {
            window.finderShowNotesState = !window.finderShowNotesState;
            showFinderNotesBtn.classList.toggle('active', window.finderShowNotesState);
            showFinderNotesBtn.textContent = window.finderShowNotesState ? 'Hide Notes' : 'Show Notes';
            window.recogView.renderFinder();
        };
    }

    // 🌟 1. 다른 스크립트와 무관하게 DOM이 준비되면 무조건 즉시 지판을 그리도록 강제 호출
    window.recogView.renderFinder();

    // 🌟 화면을 돌리면 가로/세로 지판이 바뀌므로 다시 그린다
    window.addEventListener('orientationchange', () => window.recogView.renderFinder());
    window.addEventListener('resize', () => window.recogView.renderFinder());

    // 🌟 2. 렌더링 직후 브라우저 딜레이로 인해 너비가 0으로 잡혀 숨겨지는 현상 방지 (0.1초 뒤 재확인)
    setTimeout(() => {
        window.recogView.renderFinderFretboard();
    }, 100);

    // 🌟 3. 모바일 기기 회전(가로/세로) 및 창 크기 조절 시 지판 리사이징 적용
    window.addEventListener('resize', () => {
        if (document.getElementById('tab-recognizer').classList.contains('active')) {
            window.recogView.renderFinderFretboard();
        }
    });
});