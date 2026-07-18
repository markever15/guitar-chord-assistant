// app.js

window.currentRoot = null;
window.currentQuality = null;
window.currentVoicingIndex = 0;
window.showAllNotesState = false;

window.totalFrets = 15; 
window.stringCount = 6; 
window.openStringNotes = ['E', 'B', 'G', 'D', 'A', 'E']; 

// 🌟 대중적인 혼합 표기법(Hybrid) 적용
window.chromScale = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

window.rootOffset = { 
    'C': 0, 'C#': 1, 'D': 2, 'Eb': 3, 'E': 4, 
    'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 
    'Bb': 10, 'B': 11 
};

// 🌟 1줄: 자연음(C D E F G A B), 2줄: 반음이 각자 이름의 기준 음(C#→C, Eb→E, F#→F, G#→G, Bb→B) 바로 아래에 오도록 배치
window.rootLayout = [
    { note: 'C', row: 1, col: 1 }, { note: 'D', row: 1, col: 2 }, { note: 'E', row: 1, col: 3 },
    { note: 'F', row: 1, col: 4 }, { note: 'G', row: 1, col: 5 }, { note: 'A', row: 1, col: 6 }, { note: 'B', row: 1, col: 7 },
    { note: 'C#', row: 2, col: 1 }, { note: 'Eb', row: 2, col: 3 }, { note: 'F#', row: 2, col: 4 },
    { note: 'G#', row: 2, col: 5 }, { note: 'Bb', row: 2, col: 7 }
];

// 🌟 누락되었던 'm9'을 포함하여 29개 전체 퀄리티 완벽 등록[cite: 1]
window.qualities = [
    'Major', 'm', 'm7', '7', 'maj7', 'sus2', 'sus4', '5', 'm7b5', '9', 'maj9', '6', 'dim', 'dim7', 'add9', 'aug',
    'm9', '11', 'm11', 'maj11', '13', 'm13', 'maj13', '7sus4', '6/9', '7b9', '7#9', 'm(maj7)', 'm(add9)'
];

window.getNoteName = function(stringIdx, fret) {
    const baseNote = window.openStringNotes[stringIdx];
    const baseIdx = window.chromScale.indexOf(baseNote);
    return window.chromScale[(baseIdx + fret) % 12];
};

function activateTab(targetId) {
    const targetTab = document.querySelector(`.nav-tab[data-target="${targetId}"]`);
    const targetView = document.getElementById(targetId);
    if (!targetTab || !targetView) return;

    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    targetTab.classList.add('active');

    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    targetView.classList.add('active');

    if (targetId === 'tab-dictionary' && window.dictView) {
        window.dictView.renderAll();
    } else if (targetId === 'tab-recognizer' && window.recogView) {
        window.recogView.renderFinderFretboard();
        window.recogView.detectChordFromFinder();
    }
}

function initTabSystem() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.getAttribute('data-target')));
    });

    // 🌟 tips/*.html 같은 외부 페이지에서 "../index.html#tab-blog" 형태로 돌아왔을 때 해당 탭을 열어줌
    if (location.hash) {
        activateTab(location.hash.slice(1));
    }
    window.addEventListener('hashchange', () => {
        if (location.hash) activateTab(location.hash.slice(1));
    });
}

// 🌟 m9 공식 추가 및 텐션 구성음 완벽 세팅[cite: 1]
const missingChordFormulas = {
    'm9':      [0, 3, 7, 10, 2],
    '11':      [0, 4, 7, 10, 2, 5],   
    'm11':     [0, 3, 7, 10, 2, 5],   
    'maj11':   [0, 4, 7, 11, 2, 5],   
    '13':      [0, 4, 7, 10, 2, 9],   
    'm13':     [0, 3, 7, 10, 2, 9],   
    'maj13':   [0, 4, 7, 11, 2, 9],   
    '7sus4':   [0, 5, 7, 10],         
    '6/9':     [0, 4, 7, 9, 2],       
    '7b9':     [0, 4, 7, 10, 1],      
    '7#9':     [0, 4, 7, 10, 3],      
    'm(maj7)': [0, 3, 7, 11],         
    'm(add9)': [0, 3, 7, 2]           
};

// 🌟 핵심: 기타리스트들이 실제로 사용하는 재즈/R&B 실전 파지법 뼈대 주입 
// (너무 넓게 찢어지는 폼은 필터링에 걸리므로 안정적인 폼으로 엄선)
const missingVoicingsForC = {
    'm9':      [{ name: 'Cm9 Shape', desc: '', frets: [-1, 3, 1, 3, 3, -1], fingers: [-1, 2, 1, 3, 4, -1] }],
    '11':      [{ name: 'C11 Shape', desc: '', frets: [-1, 3, 3, 3, 3, -1], fingers: [-1, 1, 1, 1, 1, -1] }],
    'm11':     [{ name: 'Cm11 Shape', desc: '', frets: [8, -1, 8, 8, 6, -1], fingers: [3, -1, 4, 4, 1, -1] }],
    'maj11':   [{ name: 'Cmaj11 Shape', desc: '', frets: [-1, 3, 2, 0, 0, 1], fingers: [-1, 3, 2, 0, 0, 1] }],
    '13':      [{ name: 'C13 Shape', desc: '', frets: [8, -1, 8, 9, 10, -1], fingers: [1, -1, 2, 3, 4, -1] }],
    'm13':     [{ name: 'Cm13 Shape', desc: '', frets: [8, -1, 8, 8, 10, -1], fingers: [1, -1, 2, 2, 4, -1] }],
    'maj13':   [{ name: 'Cmaj13 Shape', desc: '', frets: [-1, 3, 2, 2, 0, 0], fingers: [-1, 3, 2, 1, 0, 0] }],
    '7sus4':   [{ name: 'C7sus4 Shape', desc: '', frets: [-1, 3, 5, 3, 6, -1], fingers: [-1, 1, 3, 1, 4, -1] }],
    '6/9':     [{ name: 'C6/9 Shape', desc: '', frets: [-1, 3, 2, 2, 3, -1], fingers: [-1, 2, 1, 1, 3, -1] }],
    '7b9':     [{ name: 'C7b9 Shape', desc: '', frets: [-1, 3, 2, 3, 2, -1], fingers: [-1, 2, 1, 3, 1, -1] }],
    '7#9':     [{ name: 'C7#9 Shape', desc: '', frets: [-1, 3, 2, 3, 4, -1], fingers: [-1, 2, 1, 3, 4, -1] }],
    'm(maj7)': [{ name: 'Cm(maj7) Shape', desc: '', frets: [-1, 3, 5, 4, 4, 3], fingers: [-1, 1, 4, 2, 3, 1] }],
    'm(add9)': [{ name: 'Cm(add9) Shape', desc: '', frets: [-1, 3, 1, 0, 3, -1], fingers: [-1, 3, 1, 0, 4, -1] }]
};

window.addEventListener('load', () => {
    // 1. 코드 구성음(Formula) 세팅[cite: 1]
    if (!window.chordNotesTable) window.chordNotesTable = {};
    window.chromScale.forEach((rootNote, rootIdx) => {
        if (!window.chordNotesTable[rootNote]) window.chordNotesTable[rootNote] = {};
        Object.keys(missingChordFormulas).forEach(quality => {
            window.chordNotesTable[rootNote][quality] = missingChordFormulas[quality].map(interval => {
                return window.chromScale[(rootIdx + interval) % 12];
            });
        });
    });

    // 2. 바레코드 및 누락된 고급 텐션 뼈대 일괄 주입[cite: 1]
    if (window.chordDatabase && window.chordDatabase['C']) {
        if (window.chordDatabase['C']['Major']) {
            window.chordDatabase['C']['Major'].push({
                name: 'E Shape Barre', desc: 'Standard 6th string barre chord.',
                frets: [8, 10, 10, 9, 8, 8], fingers: [1, 3, 4, 2, 1, 1]
            });
        }
        if (window.chordDatabase['C']['m']) {
            window.chordDatabase['C']['m'].push({
                name: 'Em Shape Barre', desc: 'Standard 6th string minor barre.',
                frets: [8, 10, 10, 8, 8, 8], fingers: [1, 3, 4, 1, 1, 1]
            });
        }
        
        // 🔥 C 코드를 기준으로 13개의 텐션 코드 뼈대 데이터 병합
        Object.assign(window.chordDatabase['C'], missingVoicingsForC);
    }

    initTabSystem();
    
    if (window.dictView) {
        window.dictView.updateButtons();
        window.dictView.renderAll();
    }
    if (window.recogView) {
        window.recogView.renderFinderFretboard();
    }
});