// app.js

// 🌟 사전이 첫 화면이다. 넓은 화면은 선택 패널과 코드가 나란히 보이므로 C 메이저를 깔아두면
//    열자마자 다이어그램이 보인다. 좁은 화면은 "고르는 화면"과 "코드 보는 화면"이 나뉘어서,
//    퀄리티까지 정해져 있으면 선택 패널을 건너뛰고 결과부터 열린다. 그래서 좁은 화면에서는
//    루트만 C로 잡아두고 퀄리티는 비워, 고르는 화면에서 시작하게 한다.
const NARROW = window.matchMedia
    ? window.matchMedia('(max-width: 900px)').matches
    : window.innerWidth <= 900;
window.currentRoot = 'C';
window.currentQuality = NARROW ? null : 'Major';
window.currentVoicingIndex = 0;
window.showAllNotesState = false;
window.showAllVoicings = false;

window.totalFrets = 17; 
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

window.qualities = [
    'Major', 'm', 'm7', '7', 'maj7', 'sus2', 'sus4', '5', 'm7b5', '9', 'maj9', '6', 'm6', 'dim', 'dim7', 'add9', 'aug',
    'm9', '11', 'm11', 'maj11', '13', 'm13', 'maj13', '7sus4', '6/9', '7b9', '7#9', 'm(maj7)', 'm(add9)', 'm(maj9)', 'm(maj11)', 'm6/9', '7add11', 'maj7add11', 'm7add11', 'm(maj7)add11', '7add13', 'maj7add13', 'm7add13', 'm(maj7)add13', '7b5', 'aug7', 'aug7b9', 'm7#5', 'm7b9', '6sus4', '6sus2', 'maj7sus4', '7sus2', 'maj7sus2'
];

window.getNoteName = function(stringIdx, fret) {
    const baseNote = window.openStringNotes[stringIdx];
    const baseIdx = window.chromScale.indexOf(baseNote);
    return window.chromScale[(baseIdx + fret) % 12];
};

// 🌟 실제 기타 넥에 있는 포지션 마커(점) — 3,5,7,9,15,17,19,21프렛은 점 하나, 12,24프렛(옥타브)은 점 두 개
// 🌟 실제 기타처럼 프렛 간격이 넉넉한 저프렛 → 촘촘한 고프렛으로 좁아지게 위치를 계산한다.
//    현악기 표준인 "rule of 18"(각 프렛이 남은 현 길이를 2^(1/12)씩 나눔)을 지판 폭에 정규화한 것.
//    n=0이 너트, n=totalFrets가 지판 오른쪽 끝.
//    다만 19프렛까지 그리면 실제 비율 그대로는 고프렛이 20px 남짓까지 좁아져 누르기 어렵다.
//    그래서 실제 비율과 균등 분할을 taper 비율로 섞어 위쪽이 과하게 뭉치지 않게 완화한다.
window.makeFretX = function(width, totalFrets, taper) {
    const t = taper === undefined ? 0.55 : taper;
    const span = 1 - Math.pow(2, -totalFrets / 12);
    return n => {
        const real = (1 - Math.pow(2, -n / 12)) / span;
        const even = n / totalFrets;
        return width * (real * t + even * (1 - t));
    };
};

window.renderFretInlays = function(fb, fretX, totalFrets, boardHeight) {
    const singleDotFrets = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleDotFrets = [12, 24];
    const center = boardHeight / 2;

    const addDot = (fret, top) => {
        const dot = document.createElement('div');
        dot.className = 'fret-inlay-dot';
        dot.style.left = `${(fretX(fret - 1) + fretX(fret)) / 2}px`;
        dot.style.top = `${top}px`;
        fb.appendChild(dot);
    };

    singleDotFrets.forEach(f => { if (f <= totalFrets) addDot(f, center); });
    doubleDotFrets.forEach(f => {
        if (f > totalFrets) return;
        addDot(f, center - 25);
        addDot(f, center + 25);
    });
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

window.addEventListener('load', () => {
    initTabSystem();

    if (window.dictView) {
        window.dictView.updateButtons();
        window.dictView.renderAll();
    }
    if (window.recogView) {
        window.recogView.renderFinderFretboard();
    }
});