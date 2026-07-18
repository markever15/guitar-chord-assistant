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
    'm(add9)': 'm(add9)', 'madd9': 'm(add9)'
};

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
        const processVoicing = (v, off, nameSuffix) => {
            const shiftedFrets = v.frets.map(f => f === -1 ? -1 : f + off);
            const wasOpenShape = v.frets.includes(0);
            
            const shiftedFingers = v.fingers.map((fing, idx) => {
                if (off === 0) return fing === 0 ? -1 : fing; // 원본 폼에서도 0번 손가락은 강제 삭제
                
                if (wasOpenShape) {
                    if (v.frets[idx] === 0) return 1; // 개방현이었던 줄은 1번(바레)으로
                    if (fing > 0) return Math.min(4, fing + 1); // 나머지는 손가락 번호 +1
                }
                return fing === 0 ? -1 : fing;
            });

            // 1. 렌더링 범위 이탈 필터링
            if (shiftedFrets.some(f => f !== -1 && f < 0)) return null;
            if (shiftedFrets.some(f => f !== -1 && f > window.totalFrets)) return null;

            // 2. 물리적 한계 필터링 (손가락이 5프렛 이상 찢어지면 삭제)
            const activeFrets = shiftedFrets.filter(f => f > 0);
            const fretSpan = activeFrets.length > 0 ? Math.max(...activeFrets) - Math.min(...activeFrets) : 0;
            if (fretSpan > 4) return null;

            // 3. 중복 손가락 사용 방지 (검지(1)는 바레로 여러 줄 커버 가능하지만, 2, 3, 4번 손가락은 중복 불가)
            if (off !== 0) {
                const fingerCounts = { 2: 0, 3: 0, 4: 0 };
                shiftedFingers.forEach(fing => {
                    if (fing >= 2 && fing <= 4) fingerCounts[fing]++;
                });
                if (fingerCounts[2] > 1 || fingerCounts[3] > 1 || fingerCounts[4] > 1) {
                    return null;
                }
            }

            return {
                name: nameSuffix,
                frets: shiftedFrets,
                fingers: shiftedFingers
            };
        };

        // 1. C 코드 기준 변환 폼 대량 생성 및 필터링
        baseVoicings.forEach(v => {
            offsetsToTry.forEach(off => {
                const result = processVoicing(v, off, `${root}${quality === 'Major' ? '' : quality} (${v.name.split(' ')[0]} Shape)`);
                if (result && !allVoicings.some(existing => JSON.stringify(existing.frets) === JSON.stringify(result.frets))) {
                    allVoicings.push(result);
                }
            });
        });

        // 2. 특정 키 하드코딩 폼들 (원본 및 +12 옥타브 하이 포지션) 동일한 필터링 통과
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

        // 정렬 로직 (1. 개방현 -> 2. 낮은 프렛 -> 3. 굵은 베이스 줄)
        return allVoicings.sort((a, b) => {
            const hasOpenA = a.frets.includes(0);
            const hasOpenB = b.frets.includes(0);
            
            if (hasOpenA && !hasOpenB) return -1;
            if (!hasOpenA && hasOpenB) return 1;
            
            const activeFretsA = a.frets.filter(f => f > 0);
            const activeFretsB = b.frets.filter(f => f > 0);
            const minFretA = activeFretsA.length ? Math.min(...activeFretsA) : 0;
            const minFretB = activeFretsB.length ? Math.min(...activeFretsB) : 0;
            
            if (minFretA !== minFretB) return minFretA - minFretB;
            
            let lowestStringA = -1;
            for (let i = 5; i >= 0; i--) { if (a.frets[i] !== -1) { lowestStringA = i; break; } }
            let lowestStringB = -1;
            for (let i = 5; i >= 0; i--) { if (b.frets[i] !== -1) { lowestStringB = i; break; } }
            
            return lowestStringB - lowestStringA; 
        });
    },

    renderSlashChordShelf: function(root, quality) {
        const shelf = document.getElementById('slash-chord-shelf');
        const compSection = document.querySelector('.composition-section'); 
        if (!shelf) return;
        shelf.innerHTML = '';

        if (!root || !quality) {
            if (compSection) compSection.style.display = 'none';
            return;
        }

        const sDb = window.slashChordDatabase || {};
        const rootGroup = sDb[root] || {};
        let targetQuality = (quality === 'm' || quality === 'dim' || quality === 'dim7') ? 'm' : (quality === 'Major' ? 'Major' : 'None');

        const items = rootGroup[targetQuality] || [];
        if (items.length === 0) {
            if (compSection) compSection.style.display = 'none';
            return;
        } else {
            if (compSection) compSection.style.display = 'block';
        }

        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'prog-row';
            row.style.cursor = 'pointer';
            row.onclick = () => {
                document.getElementById('formula-title').textContent = `${item.name} Positions`;
                this.renderFretboardGrid();
                this.renderOpenIndicators(item.frets);
                this.renderMarkers(item.frets, item.fingers);
                document.querySelectorAll('.voicing-card').forEach(c => c.classList.remove('active'));
            };
            row.innerHTML = `<div class="prog-desc"><strong style="color:var(--selected-card-border);font-size:1.05rem;">${item.name}</strong></div>`;
            shelf.appendChild(row);
        });
    },

    renderAll: function() {
        const formulaTitle = document.getElementById('formula-title');
        
        if (!window.currentRoot || !window.currentQuality) {
            if (formulaTitle) formulaTitle.textContent = "Select a Chord";
            document.getElementById('notes-badges').innerHTML = '';
            this.renderFretboardGrid();
            this.renderOpenIndicators([0, 0, 0, 0, 0, 0]);
            this.renderMarkers(null, null);
            this.renderVoicingCards([]);
            this.buildHoverDetector();
            this.renderSlashChordShelf(null, null);
            return;
        }

        const voicings = this.getChordVoicings(window.currentRoot, window.currentQuality);
        const activeVoicing = voicings[window.currentVoicingIndex] || voicings[0] || { frets: [0,0,0,0,0,0], fingers: [-1,-1,-1,-1,-1,-1] };

        if (formulaTitle) formulaTitle.textContent = `${window.currentRoot} ${window.currentQuality} Tones`;

        this.renderChordFormula();
        this.renderFretboardGrid();
        this.renderOpenIndicators(activeVoicing.frets);
        this.renderMarkers(activeVoicing.frets, activeVoicing.fingers);
        this.renderVoicingCards(voicings);
        this.buildHoverDetector();
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

    highlightSoundingNotes: function(targetNote) {
        if (!window.currentRoot || !window.currentQuality) return;
        const voicings = this.getChordVoicings(window.currentRoot, window.currentQuality);
        const frets = (voicings[window.currentVoicingIndex] || {frets:[]}).frets;
        if (!frets) return;
        frets.forEach((fretValue, index) => {
            if (fretValue === -1) return;
            if (window.getNoteName(5 - index, fretValue) === targetNote) {
                if (fretValue > 0) {
                    document.querySelectorAll('#tab-dictionary .note-marker').forEach(m => {
                        if (m.dataset.string === String(index) && m.dataset.fret === String(fretValue)) {
                            m.classList.add('highlighted-marker'); m.textContent = targetNote;
                        }
                    });
                } else {
                    const strings = document.querySelectorAll('#tab-dictionary .string');
                    if (strings[5 - index]) strings[5 - index].classList.add('highlighted-string');
                    const openIndicators = document.querySelectorAll('#tab-dictionary .open-indicator');
                    if (openIndicators[5 - index]) openIndicators[5 - index].classList.add('highlighted-open');
                }
            }
        });
    },

    clearHighlights: function() {
        if (!window.currentRoot || !window.currentQuality) return;
        const voicings = this.getChordVoicings(window.currentRoot, window.currentQuality);
        const fingers = (voicings[window.currentVoicingIndex] || {fingers:[]}).fingers;
        document.querySelectorAll('#tab-dictionary .note-marker').forEach(m => {
            m.classList.remove('highlighted-marker');
            const sIdx = parseInt(m.dataset.string);
            const fingerVal = fingers ? fingers[sIdx] : -1;
            // 🌟 2중 잠금: fingerVal이 0보다 큰 경우에만 손가락 번호 출력
            m.textContent = window.showAllNotesState ? window.getNoteName(5-sIdx, parseInt(m.dataset.fret)) : ((fingerVal !== undefined && fingerVal > 0) ? fingerVal : '');
        });
        document.querySelectorAll('#tab-dictionary .string').forEach(s => s.classList.remove('highlighted-string'));
        document.querySelectorAll('#tab-dictionary .open-indicator').forEach(o => o.classList.remove('highlighted-open'));
    },

    renderFretboardGrid: function() {
        const fb = document.getElementById('fretboard');
        const fn = document.getElementById('fret-numbers');
        if (!fb || !fn) return;
        fb.innerHTML = ''; fn.innerHTML = '';
        
        const totalFrets = window.totalFrets || 15;
        const stringCount = window.stringCount || 6;
        const fWidth = fb.clientWidth > 0 ? fb.clientWidth / totalFrets : 740 / totalFrets;

        for (let i = 0; i <= totalFrets; i++) {
            const left = i * fWidth;
            const line = document.createElement('div'); 
            line.className = 'fret-line'; 
            line.style.left = `${left}px`; 
            line.style.height = '100%'; 
            fb.appendChild(line);
            
            const num = document.createElement('div'); 
            num.className = 'fret-number'; 
            num.style.left = `${left - fWidth/2}px`; 
            num.textContent = i === 0 ? 'Nut' : i; 
            fn.appendChild(num);
        }

        const table = window.chordNotesTable || {};
        const isChordSelected = window.currentRoot && window.currentQuality;
        let notes = [];
        
        if (isChordSelected) {
            notes = table[window.currentRoot]?.[window.currentQuality] || [window.currentRoot];
        } else {
            notes = (window.chromScale || []).concat(Object.values(window.displayFlatMap || {})); 
        }

        for (let s = 0; s < stringCount; s++) {
            const string = document.createElement('div'); 
            string.className = 'string'; 
            string.style.height = `${1 + s*0.5}px`; 
            string.style.top = `${s*30 + 15}px`; 
            string.style.width = '100%'; 
            fb.appendChild(string);
            
            if (window.showAllNotesState) {
                for (let f = 1; f <= totalFrets; f++) {
                    const noteName = window.getNoteName(s, f);
                    
                    if (!isChordSelected || notes.includes(noteName)) {
                        const lbl = document.createElement('div'); 
                        lbl.className = 'fret-note-label'; 
                        lbl.style.position = 'absolute';
                        lbl.style.transform = 'translate(-50%, -50%)';
                        lbl.style.zIndex = '5';
                        lbl.style.padding = '2px 5px';
                        lbl.style.borderRadius = '4px';
                        lbl.style.fontSize = '0.75rem';
                        lbl.style.fontWeight = 'bold';
                        
                        if (!isChordSelected) {
                            lbl.style.color = '#abb2bf';
                            lbl.style.border = '1px solid #3e4452';
                            lbl.style.background = 'rgba(40, 44, 52, 0.9)';
                        } else {
                            lbl.style.color = '#1a1c23';
                            lbl.style.border = '1px solid var(--highlight-color, #ffca28)';
                            lbl.style.background = 'var(--highlight-color, #ffca28)';
                            lbl.style.boxShadow = '0 0 8px rgba(255, 202, 40, 0.5)';
                        }
                        
                        lbl.textContent = noteName; 
                        lbl.style.left = `${f*fWidth - fWidth/2}px`; 
                        lbl.style.top = `${s*30 + 15}px`; 
                        fb.appendChild(lbl);
                    }
                }
            }
        }
    },

    renderOpenIndicators: function(frets) {
        const container = document.getElementById('open-indicators');
        if (!container || !frets) return;
        container.innerHTML = '';
        for (let i = 5; i >= 0; i--) {
            const el = document.createElement('div'); el.className = `open-indicator ${frets[i] === 0 ? 'play' : frets[i] === -1 ? 'mute' : ''}`;
            el.textContent = frets[i] === 0 ? 'O' : frets[i] === -1 ? 'X' : ''; container.appendChild(el);
        }
    },

    renderMarkers: function(frets, fingers) {
        const fretboardEl = document.getElementById('fretboard');
        if (!fretboardEl) return;
        fretboardEl.querySelectorAll('.note-marker').forEach(el => el.remove());
        fretboardEl.querySelectorAll('.barre-finger-line').forEach(el => el.remove());
        if (!frets) return;
        
        const totalFrets = window.totalFrets || 15;
        const fWidth = fretboardEl.clientWidth > 0 ? fretboardEl.clientWidth / totalFrets : 740 / totalFrets;

        if (fingers) {
            const barreMap = {};
            fingers.forEach((finger, idx) => {
                const fret = frets[idx];
                if (finger === 1 && fret > 0) {
                    if (!barreMap[fret]) barreMap[fret] = [];
                    barreMap[fret].push(idx);
                }
            });

            for (const [fretStr, stringIndices] of Object.entries(barreMap)) {
                if (stringIndices.length >= 2) {
                    const fretVal = parseInt(fretStr);
                    const minStrIdx = Math.min(...stringIndices);
                    const maxStrIdx = Math.max(...stringIndices);
                    const barreLine = document.createElement('div');
                    barreLine.className = 'barre-finger-line';
                    barreLine.style.position = 'absolute';
                    barreLine.style.left = `${fretVal * fWidth - fWidth / 2}px`;
                    barreLine.style.top = `${(5 - maxStrIdx) * 30 + 15}px`;
                    barreLine.style.height = `${(maxStrIdx - minStrIdx) * 30}px`;
                    fretboardEl.appendChild(barreLine);
                }
            }
        }

        frets.forEach((f, idx) => {
            if (f > 0) {
                const m = document.createElement('div'); m.className = `note-marker ${window.getNoteName(5-idx, f) === window.currentRoot ? 'root-note' : ''}`;
                m.dataset.string = idx; m.dataset.fret = f;
                const fingerVal = fingers ? fingers[idx] : -1;
                // 🌟 2중 잠금: fingerVal이 0보다 큰 경우에만 출력되게 막음
                m.textContent = window.showAllNotesState ? window.getNoteName(5-idx, f) : ((fingerVal !== undefined && fingerVal > 0) ? fingerVal : '');
                
                m.style.position = 'absolute';
                m.style.transform = 'translate(-50%, -50%)';
                m.style.left = `${f*fWidth - fWidth/2}px`; 
                m.style.top = `${(5-idx)*30 + 15}px`;
                
                m.onmouseenter = () => { m.textContent = window.getNoteName(5-idx, f); m.classList.add('highlighted-marker'); };
                m.onmouseleave = () => { m.textContent = window.showAllNotesState ? window.getNoteName(5-idx, f) : ((fingerVal !== undefined && fingerVal > 0) ? fingerVal : ''); m.classList.remove('highlighted-marker'); };
                fretboardEl.appendChild(m);
            }
        });
    },

    buildHoverDetector: function() {
        const hd = document.getElementById('hover-detector'); if (!hd) return;
        hd.innerHTML = ''; const tooltip = document.getElementById('note-tooltip');
        const table = window.chordNotesTable || {};
        const notes = (window.currentRoot && window.currentQuality) ? (table[window.currentRoot]?.[window.currentQuality] || [window.currentRoot]) : [];
        const stringCount = window.stringCount || 6;
        const totalFrets = window.totalFrets || 15;
        
        for (let s = 0; s < stringCount; s++) {
            const row = document.createElement('div'); row.className = 'string-row';
            for (let f = 1; f <= totalFrets; f++) {
                const cell = document.createElement('div'); cell.className = 'fret-cell';
                cell.onmouseenter = () => {
                    if (!tooltip) return; const name = window.getNoteName(s, f); const isTone = notes.includes(name);
                    tooltip.style.display = 'block'; tooltip.style.borderColor = isTone ? 'var(--highlight-color)' : '#61afef';
                    tooltip.innerHTML = `${name} ${isTone ? '<span class="highlight-chord">★ Chord Tone</span>' : ''}`;
                };
                cell.onmousemove = (e) => { if (tooltip) { tooltip.style.left = `${e.clientX + 15}px`; tooltip.style.top = `${e.clientY + 15}px`; tooltip.style.position = 'fixed'; } };
                cell.onmouseleave = () => { if (tooltip) tooltip.style.display = 'none'; };
                row.appendChild(cell);
            }
            hd.appendChild(row);
        }
    },

    renderVoicingCards: function(voicings) {
        const list = document.getElementById('voicing-list'); if (!list) return;
        list.innerHTML = '';
        voicings.forEach((v, idx) => {
            const card = document.createElement('div'); 
            card.className = `voicing-card ${idx === window.currentVoicingIndex ? 'active' : ''}`;
            const activeFrets = v.frets.filter(f => f > 0); 
            const minFret = activeFrets.length ? Math.min(...activeFrets) : 0;
            
            card.innerHTML = `
                <div class="voicing-info">
                    <h4>${v.name}</h4>
                </div>
                <div class="badge">${minFret === 0 ? 'Open' : 'Fret ' + minFret}</div>
            `;
            
            card.onclick = () => { window.currentVoicingIndex = idx; this.renderAll(); };
            list.appendChild(card);
        });
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
            'Major': ['maj7', 'add9', '6', 'maj9', 'maj11', 'maj13', '6/9'],
            'Minor': ['m7', 'm(maj7)', 'm(add9)', 'm9', 'm11', 'm13'],
            'Dominant': ['7', '9', '11', '13'],
            'Sus & Altered': ['sus2', 'sus4', '7sus4', 'm7b5', 'dim7', '7b9', '7#9']
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
    
    const showBtn = document.getElementById('show-all-btn');
    if (showBtn) showBtn.onclick = () => { window.showAllNotesState = !window.showAllNotesState; showBtn.classList.toggle('active', window.showAllNotesState); showBtn.innerText = window.showAllNotesState ? "Hide Notes" : "Show Notes"; window.dictView.renderAll(); };

    const playChordBtn = document.getElementById('play-chord-btn');
    if (playChordBtn) {
        playChordBtn.onclick = () => {
            if (!window.currentRoot || !window.currentQuality || !window.chordAudio) return;
            const voicings = window.dictView.getChordVoicings(window.currentRoot, window.currentQuality);
            const active = voicings[window.currentVoicingIndex] || voicings[0];
            if (active) window.chordAudio.playFrets(active.frets);
        };
    }
    
    window.dictView.updateButtons(); window.dictView.renderAll(); window.addEventListener('resize', () => window.dictView.renderAll());
});