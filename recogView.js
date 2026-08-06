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

        // 1. 프렛 세로선 그리기
        for (let i = 0; i <= totalFrets; i++) {
            const left = fretX(i);
            const line = document.createElement('div'); 
            line.className = 'fret-line'; 
            line.style.left = `${left}px`; 
            line.style.height = '100%'; 
            fb.appendChild(line);
            
            const num = document.createElement('div'); 
            num.className = 'fret-number'; 
            if (i === 0) {
                // 너트 라벨은 지판 왼쪽 끝에 붙어 있어 중앙 정렬하면 잘리므로 왼쪽 기준으로 놓는다
                num.style.left = '0px';
                num.style.marginLeft = '0';
                num.style.textAlign = 'left';
            } else {
                num.style.left = `${cellCenter(i)}px`;
            }
            num.textContent = i === 0 ? 'Nut' : i;
            fn.appendChild(num);
        }

        window.renderFretInlays(fb, fretX, totalFrets, 180);

        // 🌟 "Show Notes"가 켜지면 선택 여부와 상관없이 지판 전체(1프렛~마지막 프렛)의
        // 음이름을 다 보여줌 (개방현 fret 0은 별도 O/X 인디케이터가 이미 담당하므로 겹치지 않게 1프렛부터만 표시)
        const showAllNotes = window.finderShowNotesState && window.getNoteName;

        // 2. 기타 줄(가로선) 및 터치 영역 생성
        for (let s = 0; s < stringCount; s++) {
            const string = document.createElement('div'); 
            string.className = 'string'; 
            string.style.height = `${1 + s * 0.5}px`; 
            string.style.top = `${s * 30 + 15}px`; 
            string.style.width = '100%'; 
            fb.appendChild(string);

            const openIndicator = document.createElement('div'); 
            openIndicator.style.height = '30px';
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

            const row = document.createElement('div'); 
            row.className = 'string-row'; 
            row.style.height = '30px';
            
            for (let f = 1; f <= totalFrets; f++) {
                const cell = document.createElement('div'); 
                cell.className = 'fret-cell'; 
                cell.style.height = '30px';
                // 실제 프렛 간격과 클릭 영역을 맞춤 (flex 균등 분배 대신 실제 폭을 지정)
                cell.style.flex = 'none';
                cell.style.width = `${fretX(f) - fretX(f - 1)}px`;
                
                // 터치 및 클릭 이벤트 할당
                cell.onclick = () => {
                    window.finderUserFrets[s] = window.finderUserFrets[s] === f ? 0 : f;
                    this.renderFinderFretboard(); 
                    this.detectChordFromFinder();
                };
                row.appendChild(cell);
            }
            hd.appendChild(row);

            // 사용자가 찍은 노트 마커 렌더링
            if (window.finderUserFrets[s] > 0) {
                const m = document.createElement('div'); 
                m.className = 'note-marker';
                m.textContent = (window.getNoteName) ? window.getNoteName(s, window.finderUserFrets[s]) : '';
                
                m.style.position = 'absolute';
                m.style.transform = 'translate(-50%, -50%)';
                m.style.left = `${cellCenter(window.finderUserFrets[s])}px`; 
                m.style.top = `${s * 30 + 15}px`;
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
                    ghost.style.top = `${s * 30 + 15}px`;
                    fb.appendChild(ghost);
                }
            }
        }
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
            document.getElementById('recog-detected-name').textContent = "Unknown";
            document.getElementById('recog-detected-notes').textContent = "Notes: None";
            document.getElementById('analysis-status').textContent = "Click frets to begin detection.";
            return;
        }

        document.getElementById('recog-detected-notes').textContent = `Notes: ${uniqueUserNotes.join(', ')}`;
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
            document.getElementById('analysis-status').textContent = "🎯 Analysis finished (Includes simplified voicings).";
        } else {
            document.getElementById('analysis-status').textContent = "🤔 Notes don't match any standard chord perfectly.";
        }

        document.getElementById('recog-detected-name').textContent = matchedChordName;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const resetBtn = document.getElementById('reset-finder-btn');
    if (resetBtn) {
        resetBtn.onclick = () => {
            window.finderUserFrets = [0, 0, 0, 0, 0, 0];
            window.recogView.renderFinderFretboard();
            window.recogView.detectChordFromFinder();
        };
    }

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
            window.recogView.renderFinderFretboard();
        };
    }

    // 🌟 1. 다른 스크립트와 무관하게 DOM이 준비되면 무조건 즉시 지판을 그리도록 강제 호출
    window.recogView.renderFinderFretboard();
    window.recogView.detectChordFromFinder();
    
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