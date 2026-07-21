// chords.js

// 🌟 특정 코드에서 물리적으로 못 잡는 자동 생성 파지법을 프렛 배열로 지정해 목록에서 제외
window.excludedVoicings = {
    'D': {
        'm': [ [-1, 5, 3, 2, 3, 5] ],
        '7': [ [-1, 5, 4, 5, 3, 2] ],
        'm9': [ [10, 12, 12, 10, 13, 12] ]
    }
};

window.chordNotesTable = {
    'C': { 'Major': ['C', 'E', 'G'], 'm': ['C', 'Eb', 'G'], 'm7': ['C', 'Eb', 'G', 'Bb'], 'm7b5': ['C', 'Eb', 'F#', 'Bb'], '5': ['C', 'G'], 'sus2': ['C', 'D', 'G'], '9': ['C', 'E', 'G', 'Bb', 'D'], 'maj9': ['C', 'E', 'G', 'B', 'D'], '6': ['C', 'E', 'G', 'A'], 'sus4': ['C', 'F', 'G'], '7': ['C', 'E', 'G', 'Bb'], 'maj7': ['C', 'E', 'G', 'B'], 'dim': ['C', 'Eb', 'F#'], 'dim7': ['C', 'Eb', 'F#', 'A'], 'add9': ['C', 'E', 'G', 'D'], 'aug': ['C', 'E', 'G#'] , 'm9': ['C', 'Eb', 'G', 'Bb', 'D'], '11': ['C', 'E', 'G', 'Bb', 'D', 'F'], 'm11': ['C', 'Eb', 'G', 'Bb', 'D', 'F'], 'maj11': ['C', 'E', 'G', 'B', 'D', 'F'], '13': ['C', 'E', 'G', 'Bb', 'D', 'A'], 'm13': ['C', 'Eb', 'G', 'Bb', 'D', 'A'], 'maj13': ['C', 'E', 'G', 'B', 'D', 'A'], '7sus4': ['C', 'F', 'G', 'Bb'], '6/9': ['C', 'E', 'G', 'A', 'D'], '7b9': ['C', 'E', 'G', 'Bb', 'C#'], '7#9': ['C', 'E', 'G', 'Bb', 'Eb'], 'm(maj7)': ['C', 'Eb', 'G', 'B'], 'm(add9)': ['C', 'Eb', 'G', 'D'] , 'm6': ['C', 'Eb', 'G', 'A'], 'm(maj9)': ['C', 'Eb', 'G', 'B', 'D'], 'm(maj11)': ['C', 'Eb', 'G', 'B', 'D', 'F'], 'm6/9': ['C', 'Eb', 'G', 'A', 'D'], '7add11': ['C', 'E', 'G', 'Bb', 'F'], 'maj7add11': ['C', 'E', 'G', 'B', 'F'], 'm(maj7)add11': ['C', 'Eb', 'G', 'B', 'F'], '7add13': ['C', 'E', 'G', 'Bb', 'A'], 'maj7add13': ['C', 'E', 'G', 'B', 'A'], 'm7add13': ['C', 'Eb', 'G', 'Bb', 'A'], 'm(maj7)add13': ['C', 'Eb', 'G', 'B', 'A'], '7b5': ['C', 'E', 'F#', 'Bb'], 'aug7': ['C', 'E', 'G#', 'Bb'], 'aug7b9': ['C', 'E', 'G#', 'Bb', 'C#'], 'm7#5': ['C', 'Eb', 'G#', 'Bb'], 'm7b9': ['C', 'Eb', 'G', 'Bb', 'C#'], '6sus4': ['C', 'F', 'G', 'A'], '6sus2': ['C', 'D', 'G', 'A'], 'maj7sus4': ['C', 'F', 'G', 'B'], '7sus2': ['C', 'D', 'G', 'Bb'], 'maj7sus2': ['C', 'D', 'G', 'B'] },
    'C#': { 'Major': ['C#', 'F', 'G#'], 'm': ['C#', 'E', 'G#'], 'm7': ['C#', 'E', 'G#', 'B'], 'm7b5': ['C#', 'E', 'G', 'B'], '5': ['C#', 'G#'], 'sus2': ['C#', 'Eb', 'G#'], '9': ['C#', 'F', 'G#', 'B', 'Eb'], 'maj9': ['C#', 'F', 'G#', 'C', 'Eb'], '6': ['C#', 'F', 'G#', 'Bb'], 'sus4': ['C#', 'F#', 'G#'], '7': ['C#', 'F', 'G#', 'B'], 'maj7': ['C#', 'F', 'G#', 'C'], 'dim': ['C#', 'E', 'G'], 'dim7': ['C#', 'E', 'G', 'Bb'], 'add9': ['C#', 'F', 'G#', 'Eb'], 'aug': ['C#', 'F', 'A'] , 'm9': ['C#', 'E', 'G#', 'B', 'Eb'], '11': ['C#', 'F', 'G#', 'B', 'Eb', 'F#'], 'm11': ['C#', 'E', 'G#', 'B', 'Eb', 'F#'], 'maj11': ['C#', 'F', 'G#', 'C', 'Eb', 'F#'], '13': ['C#', 'F', 'G#', 'B', 'Eb', 'Bb'], 'm13': ['C#', 'E', 'G#', 'B', 'Eb', 'Bb'], 'maj13': ['C#', 'F', 'G#', 'C', 'Eb', 'Bb'], '7sus4': ['C#', 'F#', 'G#', 'B'], '6/9': ['C#', 'F', 'G#', 'Bb', 'Eb'], '7b9': ['C#', 'F', 'G#', 'B', 'D'], '7#9': ['C#', 'F', 'G#', 'B', 'E'], 'm(maj7)': ['C#', 'E', 'G#', 'C'], 'm(add9)': ['C#', 'E', 'G#', 'Eb'] , 'm6': ['C#', 'E', 'G#', 'Bb'], 'm(maj9)': ['C#', 'E', 'G#', 'C', 'Eb'], 'm(maj11)': ['C#', 'E', 'G#', 'C', 'Eb', 'F#'], 'm6/9': ['C#', 'E', 'G#', 'Bb', 'Eb'], '7add11': ['C#', 'F', 'G#', 'B', 'F#'], 'maj7add11': ['C#', 'F', 'G#', 'C', 'F#'], 'm(maj7)add11': ['C#', 'E', 'G#', 'C', 'F#'], '7add13': ['C#', 'F', 'G#', 'B', 'Bb'], 'maj7add13': ['C#', 'F', 'G#', 'C', 'Bb'], 'm7add13': ['C#', 'E', 'G#', 'B', 'Bb'], 'm(maj7)add13': ['C#', 'E', 'G#', 'C', 'Bb'], '7b5': ['C#', 'F', 'G', 'B'], 'aug7': ['C#', 'F', 'A', 'B'], 'aug7b9': ['C#', 'F', 'A', 'B', 'D'], 'm7#5': ['C#', 'E', 'A', 'B'], 'm7b9': ['C#', 'E', 'G#', 'B', 'D'], '6sus4': ['C#', 'F#', 'G#', 'Bb'], '6sus2': ['C#', 'Eb', 'G#', 'Bb'], 'maj7sus4': ['C#', 'F#', 'G#', 'C'], '7sus2': ['C#', 'Eb', 'G#', 'B'], 'maj7sus2': ['C#', 'Eb', 'G#', 'C'] },
    'D': { 'Major': ['D', 'F#', 'A'], 'm': ['D', 'F', 'A'], 'm7': ['D', 'F', 'A', 'C'], 'm7b5': ['D', 'F', 'G#', 'C'], '5': ['D', 'A'], 'sus2': ['D', 'E', 'A'], '9': ['D', 'F#', 'A', 'C', 'E'], 'maj9': ['D', 'F#', 'A', 'C#', 'E'], '6': ['D', 'F#', 'A', 'B'], 'sus4': ['D', 'G', 'A'], '7': ['D', 'F#', 'A', 'C'], 'maj7': ['D', 'F#', 'A', 'C#'], 'dim': ['D', 'F', 'G#'], 'dim7': ['D', 'F', 'G#', 'B'], 'add9': ['D', 'F#', 'A', 'E'], 'aug': ['D', 'F#', 'Bb'] , 'm9': ['D', 'F', 'A', 'C', 'E'], '11': ['D', 'F#', 'A', 'C', 'E', 'G'], 'm11': ['D', 'F', 'A', 'C', 'E', 'G'], 'maj11': ['D', 'F#', 'A', 'C#', 'E', 'G'], '13': ['D', 'F#', 'A', 'C', 'E', 'B'], 'm13': ['D', 'F', 'A', 'C', 'E', 'B'], 'maj13': ['D', 'F#', 'A', 'C#', 'E', 'B'], '7sus4': ['D', 'G', 'A', 'C'], '6/9': ['D', 'F#', 'A', 'B', 'E'], '7b9': ['D', 'F#', 'A', 'C', 'Eb'], '7#9': ['D', 'F#', 'A', 'C', 'F'], 'm(maj7)': ['D', 'F', 'A', 'C#'], 'm(add9)': ['D', 'F', 'A', 'E'] , 'm6': ['D', 'F', 'A', 'B'], 'm(maj9)': ['D', 'F', 'A', 'C#', 'E'], 'm(maj11)': ['D', 'F', 'A', 'C#', 'E', 'G'], 'm6/9': ['D', 'F', 'A', 'B', 'E'], '7add11': ['D', 'F#', 'A', 'C', 'G'], 'maj7add11': ['D', 'F#', 'A', 'C#', 'G'], 'm(maj7)add11': ['D', 'F', 'A', 'C#', 'G'], '7add13': ['D', 'F#', 'A', 'C', 'B'], 'maj7add13': ['D', 'F#', 'A', 'C#', 'B'], 'm7add13': ['D', 'F', 'A', 'C', 'B'], 'm(maj7)add13': ['D', 'F', 'A', 'C#', 'B'], '7b5': ['D', 'F#', 'G#', 'C'], 'aug7': ['D', 'F#', 'Bb', 'C'], 'aug7b9': ['D', 'F#', 'Bb', 'C', 'Eb'], 'm7#5': ['D', 'F', 'Bb', 'C'], 'm7b9': ['D', 'F', 'A', 'C', 'Eb'], '6sus4': ['D', 'G', 'A', 'B'], '6sus2': ['D', 'E', 'A', 'B'], 'maj7sus4': ['D', 'G', 'A', 'C#'], '7sus2': ['D', 'E', 'A', 'C'], 'maj7sus2': ['D', 'E', 'A', 'C#'] },
    'Eb': { 'Major': ['Eb', 'G', 'Bb'], 'm': ['Eb', 'F#', 'Bb'], 'm7': ['Eb', 'F#', 'Bb', 'C#'], 'm7b5': ['Eb', 'F#', 'A', 'C#'], '5': ['Eb', 'Bb'], 'sus2': ['Eb', 'F', 'Bb'], '9': ['Eb', 'G', 'Bb', 'C#', 'F'], 'maj9': ['Eb', 'G', 'Bb', 'D', 'F'], '6': ['Eb', 'G', 'Bb', 'C'], 'sus4': ['Eb', 'G#', 'Bb'], '7': ['Eb', 'G', 'Bb', 'C#'], 'maj7': ['Eb', 'G', 'Bb', 'D'], 'dim': ['Eb', 'F#', 'A'], 'dim7': ['Eb', 'F#', 'A', 'C'], 'add9': ['Eb', 'G', 'Bb', 'F'], 'aug': ['Eb', 'G', 'B'] , 'm9': ['Eb', 'F#', 'Bb', 'C#', 'F'], '11': ['Eb', 'G', 'Bb', 'C#', 'F', 'G#'], 'm11': ['Eb', 'F#', 'Bb', 'C#', 'F', 'G#'], 'maj11': ['Eb', 'G', 'Bb', 'D', 'F', 'G#'], '13': ['Eb', 'G', 'Bb', 'C#', 'F', 'C'], 'm13': ['Eb', 'F#', 'Bb', 'C#', 'F', 'C'], 'maj13': ['Eb', 'G', 'Bb', 'D', 'F', 'C'], '7sus4': ['Eb', 'G#', 'Bb', 'C#'], '6/9': ['Eb', 'G', 'Bb', 'C', 'F'], '7b9': ['Eb', 'G', 'Bb', 'C#', 'E'], '7#9': ['Eb', 'G', 'Bb', 'C#', 'F#'], 'm(maj7)': ['Eb', 'F#', 'Bb', 'D'], 'm(add9)': ['Eb', 'F#', 'Bb', 'F'] , 'm6': ['Eb', 'F#', 'Bb', 'C'], 'm(maj9)': ['Eb', 'F#', 'Bb', 'D', 'F'], 'm(maj11)': ['Eb', 'F#', 'Bb', 'D', 'F', 'G#'], 'm6/9': ['Eb', 'F#', 'Bb', 'C', 'F'], '7add11': ['Eb', 'G', 'Bb', 'C#', 'G#'], 'maj7add11': ['Eb', 'G', 'Bb', 'D', 'G#'], 'm(maj7)add11': ['Eb', 'F#', 'Bb', 'D', 'G#'], '7add13': ['Eb', 'G', 'Bb', 'C#', 'C'], 'maj7add13': ['Eb', 'G', 'Bb', 'D', 'C'], 'm7add13': ['Eb', 'F#', 'Bb', 'C#', 'C'], 'm(maj7)add13': ['Eb', 'F#', 'Bb', 'D', 'C'], '7b5': ['Eb', 'G', 'A', 'C#'], 'aug7': ['Eb', 'G', 'B', 'C#'], 'aug7b9': ['Eb', 'G', 'B', 'C#', 'E'], 'm7#5': ['Eb', 'F#', 'B', 'C#'], 'm7b9': ['Eb', 'F#', 'Bb', 'C#', 'E'], '6sus4': ['Eb', 'G#', 'Bb', 'C'], '6sus2': ['Eb', 'F', 'Bb', 'C'], 'maj7sus4': ['Eb', 'G#', 'Bb', 'D'], '7sus2': ['Eb', 'F', 'Bb', 'C#'], 'maj7sus2': ['Eb', 'F', 'Bb', 'D'] },
    'E': { 'Major': ['E', 'G#', 'B'], 'm': ['E', 'G', 'B'], 'm7': ['E', 'G', 'B', 'D'], 'm7b5': ['E', 'G', 'Bb', 'D'], '5': ['E', 'B'], 'sus2': ['E', 'F#', 'B'], '9': ['E', 'G#', 'B', 'D', 'F#'], 'maj9': ['E', 'G#', 'B', 'Eb', 'F#'], '6': ['E', 'G#', 'B', 'C#'], 'sus4': ['E', 'A', 'B'], '7': ['E', 'G#', 'B', 'D'], 'maj7': ['E', 'G#', 'B', 'Eb'], 'dim': ['E', 'G', 'Bb'], 'dim7': ['E', 'G', 'Bb', 'C#'], 'add9': ['E', 'G#', 'B', 'F#'], 'aug': ['E', 'G#', 'C'] , 'm9': ['E', 'G', 'B', 'D', 'F#'], '11': ['E', 'G#', 'B', 'D', 'F#', 'A'], 'm11': ['E', 'G', 'B', 'D', 'F#', 'A'], 'maj11': ['E', 'G#', 'B', 'Eb', 'F#', 'A'], '13': ['E', 'G#', 'B', 'D', 'F#', 'C#'], 'm13': ['E', 'G', 'B', 'D', 'F#', 'C#'], 'maj13': ['E', 'G#', 'B', 'Eb', 'F#', 'C#'], '7sus4': ['E', 'A', 'B', 'D'], '6/9': ['E', 'G#', 'B', 'C#', 'F#'], '7b9': ['E', 'G#', 'B', 'D', 'F'], '7#9': ['E', 'G#', 'B', 'D', 'G'], 'm(maj7)': ['E', 'G', 'B', 'Eb'], 'm(add9)': ['E', 'G', 'B', 'F#'] , 'm6': ['E', 'G', 'B', 'C#'], 'm(maj9)': ['E', 'G', 'B', 'Eb', 'F#'], 'm(maj11)': ['E', 'G', 'B', 'Eb', 'F#', 'A'], 'm6/9': ['E', 'G', 'B', 'C#', 'F#'], '7add11': ['E', 'G#', 'B', 'D', 'A'], 'maj7add11': ['E', 'G#', 'B', 'Eb', 'A'], 'm(maj7)add11': ['E', 'G', 'B', 'Eb', 'A'], '7add13': ['E', 'G#', 'B', 'D', 'C#'], 'maj7add13': ['E', 'G#', 'B', 'Eb', 'C#'], 'm7add13': ['E', 'G', 'B', 'D', 'C#'], 'm(maj7)add13': ['E', 'G', 'B', 'Eb', 'C#'], '7b5': ['E', 'G#', 'Bb', 'D'], 'aug7': ['E', 'G#', 'C', 'D'], 'aug7b9': ['E', 'G#', 'C', 'D', 'F'], 'm7#5': ['E', 'G', 'C', 'D'], 'm7b9': ['E', 'G', 'B', 'D', 'F'], '6sus4': ['E', 'A', 'B', 'C#'], '6sus2': ['E', 'F#', 'B', 'C#'], 'maj7sus4': ['E', 'A', 'B', 'Eb'], '7sus2': ['E', 'F#', 'B', 'D'], 'maj7sus2': ['E', 'F#', 'B', 'Eb'] },
    'F': { 'Major': ['F', 'A', 'C'], 'm': ['F', 'G#', 'C'], 'm7': ['F', 'G#', 'C', 'Eb'], 'm7b5': ['F', 'G#', 'B', 'Eb'], '5': ['F', 'C'], 'sus2': ['F', 'G', 'C'], '9': ['F', 'A', 'C', 'Eb', 'G'], 'maj9': ['F', 'A', 'C', 'E', 'G'], '6': ['F', 'A', 'C', 'D'], 'sus4': ['F', 'Bb', 'C'], '7': ['F', 'A', 'C', 'Eb'], 'maj7': ['F', 'A', 'C', 'E'], 'dim': ['F', 'G#', 'B'], 'dim7': ['F', 'G#', 'B', 'D'], 'add9': ['F', 'A', 'C', 'G'], 'aug': ['F', 'A', 'C#'] , 'm9': ['F', 'G#', 'C', 'Eb', 'G'], '11': ['F', 'A', 'C', 'Eb', 'G', 'Bb'], 'm11': ['F', 'G#', 'C', 'Eb', 'G', 'Bb'], 'maj11': ['F', 'A', 'C', 'E', 'G', 'Bb'], '13': ['F', 'A', 'C', 'Eb', 'G', 'D'], 'm13': ['F', 'G#', 'C', 'Eb', 'G', 'D'], 'maj13': ['F', 'A', 'C', 'E', 'G', 'D'], '7sus4': ['F', 'Bb', 'C', 'Eb'], '6/9': ['F', 'A', 'C', 'D', 'G'], '7b9': ['F', 'A', 'C', 'Eb', 'F#'], '7#9': ['F', 'A', 'C', 'Eb', 'G#'], 'm(maj7)': ['F', 'G#', 'C', 'E'], 'm(add9)': ['F', 'G#', 'C', 'G'] , 'm6': ['F', 'G#', 'C', 'D'], 'm(maj9)': ['F', 'G#', 'C', 'E', 'G'], 'm(maj11)': ['F', 'G#', 'C', 'E', 'G', 'Bb'], 'm6/9': ['F', 'G#', 'C', 'D', 'G'], '7add11': ['F', 'A', 'C', 'Eb', 'Bb'], 'maj7add11': ['F', 'A', 'C', 'E', 'Bb'], 'm(maj7)add11': ['F', 'G#', 'C', 'E', 'Bb'], '7add13': ['F', 'A', 'C', 'Eb', 'D'], 'maj7add13': ['F', 'A', 'C', 'E', 'D'], 'm7add13': ['F', 'G#', 'C', 'Eb', 'D'], 'm(maj7)add13': ['F', 'G#', 'C', 'E', 'D'], '7b5': ['F', 'A', 'B', 'Eb'], 'aug7': ['F', 'A', 'C#', 'Eb'], 'aug7b9': ['F', 'A', 'C#', 'Eb', 'F#'], 'm7#5': ['F', 'G#', 'C#', 'Eb'], 'm7b9': ['F', 'G#', 'C', 'Eb', 'F#'], '6sus4': ['F', 'Bb', 'C', 'D'], '6sus2': ['F', 'G', 'C', 'D'], 'maj7sus4': ['F', 'Bb', 'C', 'E'], '7sus2': ['F', 'G', 'C', 'Eb'], 'maj7sus2': ['F', 'G', 'C', 'E'] },
    'F#': { 'Major': ['F#', 'Bb', 'C#'], 'm': ['F#', 'A', 'C#'], 'm7': ['F#', 'A', 'C#', 'E'], 'm7b5': ['F#', 'A', 'C', 'E'], '5': ['F#', 'C#'], 'sus2': ['F#', 'G#', 'C#'], '9': ['F#', 'Bb', 'C#', 'E', 'G#'], 'maj9': ['F#', 'Bb', 'C#', 'F', 'G#'], '6': ['F#', 'Bb', 'C#', 'Eb'], 'sus4': ['F#', 'B', 'C#'], '7': ['F#', 'Bb', 'C#', 'E'], 'maj7': ['F#', 'Bb', 'C#', 'F'], 'dim': ['F#', 'A', 'C'], 'dim7': ['F#', 'A', 'C', 'Eb'], 'add9': ['F#', 'Bb', 'C#', 'G#'], 'aug': ['F#', 'Bb', 'D'] , 'm9': ['F#', 'A', 'C#', 'E', 'G#'], '11': ['F#', 'Bb', 'C#', 'E', 'G#', 'B'], 'm11': ['F#', 'A', 'C#', 'E', 'G#', 'B'], 'maj11': ['F#', 'Bb', 'C#', 'F', 'G#', 'B'], '13': ['F#', 'Bb', 'C#', 'E', 'G#', 'Eb'], 'm13': ['F#', 'A', 'C#', 'E', 'G#', 'Eb'], 'maj13': ['F#', 'Bb', 'C#', 'F', 'G#', 'Eb'], '7sus4': ['F#', 'B', 'C#', 'E'], '6/9': ['F#', 'Bb', 'C#', 'Eb', 'G#'], '7b9': ['F#', 'Bb', 'C#', 'E', 'G'], '7#9': ['F#', 'Bb', 'C#', 'E', 'A'], 'm(maj7)': ['F#', 'A', 'C#', 'F'], 'm(add9)': ['F#', 'A', 'C#', 'G#'] , 'm6': ['F#', 'A', 'C#', 'Eb'], 'm(maj9)': ['F#', 'A', 'C#', 'F', 'G#'], 'm(maj11)': ['F#', 'A', 'C#', 'F', 'G#', 'B'], 'm6/9': ['F#', 'A', 'C#', 'Eb', 'G#'], '7add11': ['F#', 'Bb', 'C#', 'E', 'B'], 'maj7add11': ['F#', 'Bb', 'C#', 'F', 'B'], 'm(maj7)add11': ['F#', 'A', 'C#', 'F', 'B'], '7add13': ['F#', 'Bb', 'C#', 'E', 'Eb'], 'maj7add13': ['F#', 'Bb', 'C#', 'F', 'Eb'], 'm7add13': ['F#', 'A', 'C#', 'E', 'Eb'], 'm(maj7)add13': ['F#', 'A', 'C#', 'F', 'Eb'], '7b5': ['F#', 'Bb', 'C', 'E'], 'aug7': ['F#', 'Bb', 'D', 'E'], 'aug7b9': ['F#', 'Bb', 'D', 'E', 'G'], 'm7#5': ['F#', 'A', 'D', 'E'], 'm7b9': ['F#', 'A', 'C#', 'E', 'G'], '6sus4': ['F#', 'B', 'C#', 'Eb'], '6sus2': ['F#', 'G#', 'C#', 'Eb'], 'maj7sus4': ['F#', 'B', 'C#', 'F'], '7sus2': ['F#', 'G#', 'C#', 'E'], 'maj7sus2': ['F#', 'G#', 'C#', 'F'] },
    'G': { 'Major': ['G', 'B', 'D'], 'm': ['G', 'Bb', 'D'], 'm7': ['G', 'Bb', 'D', 'F'], 'm7b5': ['G', 'Bb', 'C#', 'F'], '5': ['G', 'D'], 'sus2': ['G', 'A', 'D'], '9': ['G', 'B', 'D', 'F', 'A'], 'maj9': ['G', 'B', 'D', 'F#', 'A'], '6': ['G', 'B', 'D', 'E'], 'sus4': ['G', 'C', 'D'], '7': ['G', 'B', 'D', 'F'], 'maj7': ['G', 'B', 'D', 'F#'], 'dim': ['G', 'Bb', 'C#'], 'dim7': ['G', 'Bb', 'C#', 'E'], 'add9': ['G', 'B', 'D', 'A'], 'aug': ['G', 'B', 'Eb'] , 'm9': ['G', 'Bb', 'D', 'F', 'A'], '11': ['G', 'B', 'D', 'F', 'A', 'C'], 'm11': ['G', 'Bb', 'D', 'F', 'A', 'C'], 'maj11': ['G', 'B', 'D', 'F#', 'A', 'C'], '13': ['G', 'B', 'D', 'F', 'A', 'E'], 'm13': ['G', 'Bb', 'D', 'F', 'A', 'E'], 'maj13': ['G', 'B', 'D', 'F#', 'A', 'E'], '7sus4': ['G', 'C', 'D', 'F'], '6/9': ['G', 'B', 'D', 'E', 'A'], '7b9': ['G', 'B', 'D', 'F', 'G#'], '7#9': ['G', 'B', 'D', 'F', 'Bb'], 'm(maj7)': ['G', 'Bb', 'D', 'F#'], 'm(add9)': ['G', 'Bb', 'D', 'A'] , 'm6': ['G', 'Bb', 'D', 'E'], 'm(maj9)': ['G', 'Bb', 'D', 'F#', 'A'], 'm(maj11)': ['G', 'Bb', 'D', 'F#', 'A', 'C'], 'm6/9': ['G', 'Bb', 'D', 'E', 'A'], '7add11': ['G', 'B', 'D', 'F', 'C'], 'maj7add11': ['G', 'B', 'D', 'F#', 'C'], 'm(maj7)add11': ['G', 'Bb', 'D', 'F#', 'C'], '7add13': ['G', 'B', 'D', 'F', 'E'], 'maj7add13': ['G', 'B', 'D', 'F#', 'E'], 'm7add13': ['G', 'Bb', 'D', 'F', 'E'], 'm(maj7)add13': ['G', 'Bb', 'D', 'F#', 'E'], '7b5': ['G', 'B', 'C#', 'F'], 'aug7': ['G', 'B', 'Eb', 'F'], 'aug7b9': ['G', 'B', 'Eb', 'F', 'G#'], 'm7#5': ['G', 'Bb', 'Eb', 'F'], 'm7b9': ['G', 'Bb', 'D', 'F', 'G#'], '6sus4': ['G', 'C', 'D', 'E'], '6sus2': ['G', 'A', 'D', 'E'], 'maj7sus4': ['G', 'C', 'D', 'F#'], '7sus2': ['G', 'A', 'D', 'F'], 'maj7sus2': ['G', 'A', 'D', 'F#'] },
    'G#': { 'Major': ['G#', 'C', 'Eb'], 'm': ['G#', 'B', 'Eb'], 'm7': ['G#', 'B', 'Eb', 'F#'], 'm7b5': ['G#', 'B', 'D', 'F#'], '5': ['G#', 'Eb'], 'sus2': ['G#', 'Bb', 'Eb'], '9': ['G#', 'C', 'Eb', 'F#', 'Bb'], 'maj9': ['G#', 'C', 'Eb', 'G', 'Bb'], '6': ['G#', 'C', 'Eb', 'F'], 'sus4': ['G#', 'C#', 'Eb'], '7': ['G#', 'C', 'Eb', 'F#'], 'maj7': ['G#', 'C', 'Eb', 'G'], 'dim': ['G#', 'B', 'D'], 'dim7': ['G#', 'B', 'D', 'F'], 'add9': ['G#', 'C', 'Eb', 'Bb'], 'aug': ['G#', 'C', 'E'] , 'm9': ['G#', 'B', 'Eb', 'F#', 'Bb'], '11': ['G#', 'C', 'Eb', 'F#', 'Bb', 'C#'], 'm11': ['G#', 'B', 'Eb', 'F#', 'Bb', 'C#'], 'maj11': ['G#', 'C', 'Eb', 'G', 'Bb', 'C#'], '13': ['G#', 'C', 'Eb', 'F#', 'Bb', 'F'], 'm13': ['G#', 'B', 'Eb', 'F#', 'Bb', 'F'], 'maj13': ['G#', 'C', 'Eb', 'G', 'Bb', 'F'], '7sus4': ['G#', 'C#', 'Eb', 'F#'], '6/9': ['G#', 'C', 'Eb', 'F', 'Bb'], '7b9': ['G#', 'C', 'Eb', 'F#', 'A'], '7#9': ['G#', 'C', 'Eb', 'F#', 'B'], 'm(maj7)': ['G#', 'B', 'Eb', 'G'], 'm(add9)': ['G#', 'B', 'Eb', 'Bb'] , 'm6': ['G#', 'B', 'Eb', 'F'], 'm(maj9)': ['G#', 'B', 'Eb', 'G', 'Bb'], 'm(maj11)': ['G#', 'B', 'Eb', 'G', 'Bb', 'C#'], 'm6/9': ['G#', 'B', 'Eb', 'F', 'Bb'], '7add11': ['G#', 'C', 'Eb', 'F#', 'C#'], 'maj7add11': ['G#', 'C', 'Eb', 'G', 'C#'], 'm(maj7)add11': ['G#', 'B', 'Eb', 'G', 'C#'], '7add13': ['G#', 'C', 'Eb', 'F#', 'F'], 'maj7add13': ['G#', 'C', 'Eb', 'G', 'F'], 'm7add13': ['G#', 'B', 'Eb', 'F#', 'F'], 'm(maj7)add13': ['G#', 'B', 'Eb', 'G', 'F'], '7b5': ['G#', 'C', 'D', 'F#'], 'aug7': ['G#', 'C', 'E', 'F#'], 'aug7b9': ['G#', 'C', 'E', 'F#', 'A'], 'm7#5': ['G#', 'B', 'E', 'F#'], 'm7b9': ['G#', 'B', 'Eb', 'F#', 'A'], '6sus4': ['G#', 'C#', 'Eb', 'F'], '6sus2': ['G#', 'Bb', 'Eb', 'F'], 'maj7sus4': ['G#', 'C#', 'Eb', 'G'], '7sus2': ['G#', 'Bb', 'Eb', 'F#'], 'maj7sus2': ['G#', 'Bb', 'Eb', 'G'] },
    'A': { 'Major': ['A', 'C#', 'E'], 'm': ['A', 'C', 'E'], 'm7': ['A', 'C', 'E', 'G'], 'm7b5': ['A', 'C', 'Eb', 'G'], '5': ['A', 'E'], 'sus2': ['A', 'B', 'E'], '9': ['A', 'C#', 'E', 'G', 'B'], 'maj9': ['A', 'C#', 'E', 'G#', 'B'], '6': ['A', 'C#', 'E', 'F#'], 'sus4': ['A', 'D', 'E'], '7': ['A', 'C#', 'E', 'G'], 'maj7': ['A', 'C#', 'E', 'G#'], 'dim': ['A', 'C', 'Eb'], 'dim7': ['A', 'C', 'Eb', 'F#'], 'add9': ['A', 'C#', 'E', 'B'], 'aug': ['A', 'C#', 'F'] , 'm9': ['A', 'C', 'E', 'G', 'B'], '11': ['A', 'C#', 'E', 'G', 'B', 'D'], 'm11': ['A', 'C', 'E', 'G', 'B', 'D'], 'maj11': ['A', 'C#', 'E', 'G#', 'B', 'D'], '13': ['A', 'C#', 'E', 'G', 'B', 'F#'], 'm13': ['A', 'C', 'E', 'G', 'B', 'F#'], 'maj13': ['A', 'C#', 'E', 'G#', 'B', 'F#'], '7sus4': ['A', 'D', 'E', 'G'], '6/9': ['A', 'C#', 'E', 'F#', 'B'], '7b9': ['A', 'C#', 'E', 'G', 'Bb'], '7#9': ['A', 'C#', 'E', 'G', 'C'], 'm(maj7)': ['A', 'C', 'E', 'G#'], 'm(add9)': ['A', 'C', 'E', 'B'] , 'm6': ['A', 'C', 'E', 'F#'], 'm(maj9)': ['A', 'C', 'E', 'G#', 'B'], 'm(maj11)': ['A', 'C', 'E', 'G#', 'B', 'D'], 'm6/9': ['A', 'C', 'E', 'F#', 'B'], '7add11': ['A', 'C#', 'E', 'G', 'D'], 'maj7add11': ['A', 'C#', 'E', 'G#', 'D'], 'm(maj7)add11': ['A', 'C', 'E', 'G#', 'D'], '7add13': ['A', 'C#', 'E', 'G', 'F#'], 'maj7add13': ['A', 'C#', 'E', 'G#', 'F#'], 'm7add13': ['A', 'C', 'E', 'G', 'F#'], 'm(maj7)add13': ['A', 'C', 'E', 'G#', 'F#'], '7b5': ['A', 'C#', 'Eb', 'G'], 'aug7': ['A', 'C#', 'F', 'G'], 'aug7b9': ['A', 'C#', 'F', 'G', 'Bb'], 'm7#5': ['A', 'C', 'F', 'G'], 'm7b9': ['A', 'C', 'E', 'G', 'Bb'], '6sus4': ['A', 'D', 'E', 'F#'], '6sus2': ['A', 'B', 'E', 'F#'], 'maj7sus4': ['A', 'D', 'E', 'G#'], '7sus2': ['A', 'B', 'E', 'G'], 'maj7sus2': ['A', 'B', 'E', 'G#'] },
    'Bb': { 'Major': ['Bb', 'D', 'F'], 'm': ['Bb', 'C#', 'F'], 'm7': ['Bb', 'C#', 'F', 'G#'], 'm7b5': ['Bb', 'C#', 'E', 'G#'], '5': ['Bb', 'F'], 'sus2': ['Bb', 'C', 'F'], '9': ['Bb', 'D', 'F', 'G#', 'C'], 'maj9': ['Bb', 'D', 'F', 'A', 'C'], '6': ['Bb', 'D', 'F', 'G'], 'sus4': ['Bb', 'Eb', 'F'], '7': ['Bb', 'D', 'F', 'G#'], 'maj7': ['Bb', 'D', 'F', 'A'], 'dim': ['Bb', 'C#', 'E'], 'dim7': ['Bb', 'C#', 'E', 'G'], 'add9': ['Bb', 'D', 'F', 'C'], 'aug': ['Bb', 'D', 'F#'] , 'm9': ['Bb', 'C#', 'F', 'G#', 'C'], '11': ['Bb', 'D', 'F', 'G#', 'C', 'Eb'], 'm11': ['Bb', 'C#', 'F', 'G#', 'C', 'Eb'], 'maj11': ['Bb', 'D', 'F', 'A', 'C', 'Eb'], '13': ['Bb', 'D', 'F', 'G#', 'C', 'G'], 'm13': ['Bb', 'C#', 'F', 'G#', 'C', 'G'], 'maj13': ['Bb', 'D', 'F', 'A', 'C', 'G'], '7sus4': ['Bb', 'Eb', 'F', 'G#'], '6/9': ['Bb', 'D', 'F', 'G', 'C'], '7b9': ['Bb', 'D', 'F', 'G#', 'B'], '7#9': ['Bb', 'D', 'F', 'G#', 'C#'], 'm(maj7)': ['Bb', 'C#', 'F', 'A'], 'm(add9)': ['Bb', 'C#', 'F', 'C'] , 'm6': ['Bb', 'C#', 'F', 'G'], 'm(maj9)': ['Bb', 'C#', 'F', 'A', 'C'], 'm(maj11)': ['Bb', 'C#', 'F', 'A', 'C', 'Eb'], 'm6/9': ['Bb', 'C#', 'F', 'G', 'C'], '7add11': ['Bb', 'D', 'F', 'G#', 'Eb'], 'maj7add11': ['Bb', 'D', 'F', 'A', 'Eb'], 'm(maj7)add11': ['Bb', 'C#', 'F', 'A', 'Eb'], '7add13': ['Bb', 'D', 'F', 'G#', 'G'], 'maj7add13': ['Bb', 'D', 'F', 'A', 'G'], 'm7add13': ['Bb', 'C#', 'F', 'G#', 'G'], 'm(maj7)add13': ['Bb', 'C#', 'F', 'A', 'G'], '7b5': ['Bb', 'D', 'E', 'G#'], 'aug7': ['Bb', 'D', 'F#', 'G#'], 'aug7b9': ['Bb', 'D', 'F#', 'G#', 'B'], 'm7#5': ['Bb', 'C#', 'F#', 'G#'], 'm7b9': ['Bb', 'C#', 'F', 'G#', 'B'], '6sus4': ['Bb', 'Eb', 'F', 'G'], '6sus2': ['Bb', 'C', 'F', 'G'], 'maj7sus4': ['Bb', 'Eb', 'F', 'A'], '7sus2': ['Bb', 'C', 'F', 'G#'], 'maj7sus2': ['Bb', 'C', 'F', 'A'] },
    'B': { 'Major': ['B', 'Eb', 'F#'], 'm': ['B', 'D', 'F#'], 'm7': ['B', 'D', 'F#', 'A'], 'm7b5': ['B', 'D', 'F', 'A'], '5': ['B', 'F#'], 'sus2': ['B', 'C#', 'F#'], '9': ['B', 'Eb', 'F#', 'A', 'C#'], 'maj9': ['B', 'Eb', 'F#', 'Bb', 'C#'], '6': ['B', 'Eb', 'F#', 'G#'], 'sus4': ['B', 'E', 'F#'], '7': ['B', 'Eb', 'F#', 'A'], 'maj7': ['B', 'Eb', 'F#', 'Bb'], 'dim': ['B', 'D', 'F'], 'dim7': ['B', 'D', 'F', 'G#'], 'add9': ['B', 'Eb', 'F#', 'C#'], 'aug': ['B', 'Eb', 'G'], 'm9': ['B', 'D', 'F#', 'A', 'C#'], '11': ['B', 'Eb', 'F#', 'A', 'C#', 'E'], 'm11': ['B', 'D', 'F#', 'A', 'C#', 'E'], 'maj11': ['B', 'Eb', 'F#', 'Bb', 'C#', 'E'], '13': ['B', 'Eb', 'F#', 'A', 'C#', 'G#'], 'm13': ['B', 'D', 'F#', 'A', 'C#', 'G#'], 'maj13': ['B', 'Eb', 'F#', 'Bb', 'C#', 'G#'], '7sus4': ['B', 'E', 'F#', 'A'], '6/9': ['B', 'Eb', 'F#', 'G#', 'C#'], '7b9': ['B', 'Eb', 'F#', 'A', 'C'], '7#9': ['B', 'Eb', 'F#', 'A', 'D'], 'm(maj7)': ['B', 'D', 'F#', 'Bb'], 'm(add9)': ['B', 'D', 'F#', 'C#'] , 'm6': ['B', 'D', 'F#', 'G#'], 'm(maj9)': ['B', 'D', 'F#', 'Bb', 'C#'], 'm(maj11)': ['B', 'D', 'F#', 'Bb', 'C#', 'E'], 'm6/9': ['B', 'D', 'F#', 'G#', 'C#'], '7add11': ['B', 'Eb', 'F#', 'A', 'E'], 'maj7add11': ['B', 'Eb', 'F#', 'Bb', 'E'], 'm(maj7)add11': ['B', 'D', 'F#', 'Bb', 'E'], '7add13': ['B', 'Eb', 'F#', 'A', 'G#'], 'maj7add13': ['B', 'Eb', 'F#', 'Bb', 'G#'], 'm7add13': ['B', 'D', 'F#', 'A', 'G#'], 'm(maj7)add13': ['B', 'D', 'F#', 'Bb', 'G#'], '7b5': ['B', 'Eb', 'F', 'A'], 'aug7': ['B', 'Eb', 'G', 'A'], 'aug7b9': ['B', 'Eb', 'G', 'A', 'C'], 'm7#5': ['B', 'D', 'G', 'A'], 'm7b9': ['B', 'D', 'F#', 'A', 'C'], '6sus4': ['B', 'E', 'F#', 'G#'], '6sus2': ['B', 'C#', 'F#', 'G#'], 'maj7sus4': ['B', 'E', 'F#', 'Bb'], '7sus2': ['B', 'C#', 'F#', 'A'], 'maj7sus2': ['B', 'C#', 'F#', 'Bb'] }
};

window.chordDatabase = {
    'C': {
        'Major': [
            { name: 'Open C Shape', desc: 'Standard open C chord.', frets: [-1, 3, 2, 0, 1, 0], fingers: [-1, 3, 2, 0, 1, 0] },
            { name: 'Open Shape (High G)', desc: 'Open C with the high E string fretted for a brighter top note.', frets: [-1, 3, 2, 0, 1, 3], fingers: [-1, 3, 2, 0, 1, 4] },
            { name: 'Echo Shape (2nd Fret)', desc: 'Open C with the B string moved up to double the 3rd.', frets: [-1, 3, 2, 0, 5, 0], fingers: [-1, 3, 2, 0, 4, 0] },
            { name: 'Echo Shape (Bright)', desc: 'Echo shape with the high E string also fretted.', frets: [-1, 3, 2, 0, 5, 3], fingers: [-1, 3, 2, 0, 4, 3] },
            { name: 'Echo Shape (Full)', desc: 'Echo shape with the G string fretted instead of open.', frets: [-1, 3, 2, 5, 5, 3], fingers: [-1, 3, 2, 4, 4, 3] },
            { name: 'Drone Shape (3rd Fret)', desc: 'A-shape barre with the open G string as the 5th.', frets: [-1, 3, 5, 0, 5, 3], fingers: [-1, 1, 3, 0, 3, 1] },
            { name: 'Drone Shape (Double Open)', desc: 'Drone shape with the high E string also left open.', frets: [-1, 3, 5, 0, 5, 0], fingers: [-1, 1, 3, 0, 3, 0] },
            { name: 'Ring Shape (3rd Fret)', desc: 'A-shape barre with the high E string left open to ring.', frets: [-1, 3, 5, 5, 5, 0], fingers: [-1, 1, 3, 3, 3, 0] },
            { name: 'A Shape (3rd Fret)', desc: 'Full 5-string barre shape.', frets: [-1, 3, 5, 5, 5, 3], fingers: [-1, 1, 3, 3, 3, 1] },
            { name: 'E Shape (8th Fret)', desc: 'Full 6-string barre shape.', frets: [8, 10, 10, 9, 8, 8], fingers: [1, 3, 4, 2, 1, 1] },
            { name: 'Top Shape (8th Fret)', desc: 'E-shape barre with the high E string left open.', frets: [8, 10, 10, 9, 8, 0], fingers: [1, 3, 4, 2, 1, 0] },
            { name: 'Top Shape (Shell)', desc: 'Top shape with the low strings left out.', frets: [-1, -1, 10, 9, 8, 0], fingers: [-1, -1, 3, 2, 1, 0] },
            { name: 'Jangle Shape (8th Fret)', desc: 'E-shape barre with the G and high E strings left open.', frets: [8, 10, 10, 0, 8, 0], fingers: [1, 3, 4, 0, 1, 0] },
            { name: 'Jangle Shape (Shell)', desc: 'Jangle shape with the low strings left out.', frets: [-1, -1, 10, 0, 8, 0], fingers: [-1, -1, 3, 0, 1, 0] },
            { name: 'G Shape (5th Fret)', desc: 'G-shape barre, open on the high E string.', frets: [8, 7, 5, 5, 5, 0], fingers: [4, 3, 1, 1, 1, 0] },
            { name: 'Shell Shape (8th Fret)', desc: '4-string jazz shell voicing.', frets: [-1, -1, 10, 9, 8, 8], fingers: [-1, -1, 3, 2, 1, 1] },
            { name: 'D Shape Major', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 9, 8, -1], fingers: [-1, -1, 3, 2, 1, -1] }
        ],
        'm': [
            { name: 'Cm (Muted)', desc: 'Muted bottom 4-string shape.', frets: [-1, 3, 5, 5, 4, -1], fingers: [-1, 1, 3, 4, 2, -1] },
            { name: 'Compact Shape (Open 5th)', desc: 'Uses the open G string as the 5th.', frets: [-1, 3, 1, 0, 1, 3], fingers: [-1, 3, 1, 0, 2, 4] },
            { name: 'Split Shape (Open 5th)', desc: 'Open G 5th with a stretch on the B string.', frets: [-1, 3, 1, 0, 4, 3], fingers: [-1, 1, 2, 0, 4, 3] },
            { name: 'Trim Shape (Open 5th)', desc: 'Split shape with the D string left out.', frets: [-1, 3, -1, 0, 4, 3], fingers: [-1, 1, -1, 0, 3, 2] },
            { name: 'Wide Shape (Open 5th)', desc: 'Spread voicing using the open G string as the 5th.', frets: [-1, 3, 5, 0, 4, 3], fingers: [-1, 1, 4, 0, 3, 1] },
            { name: 'A Shape m (3rd Fret)', desc: 'Full 5-string minor barre shape.', frets: [-1, 3, 5, 5, 4, 3], fingers: [-1, 1, 3, 4, 2, 1] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Wide partial barre voicing.', frets: [8, 6, 5, 5, 8, 8], fingers: [1, 2, 3, 3, 1, 1] },
            { name: 'Cluster Shape (Open 5th)', desc: 'Cluster voicing with the open G string as the 5th.', frets: [8, 6, 5, 0, 8, 8], fingers: [1, 2, 3, 0, 1, 1] },
            { name: 'Bare Shape (Open 5th)', desc: 'Cluster shape with the D string left out.', frets: [8, 6, -1, 0, 8, 8], fingers: [2, 1, -1, 0, 3, 4] },
            { name: 'E Shape m (8th Fret)', desc: 'Full 6-string minor barre shape.', frets: [8, 10, 10, 8, 8, 8], fingers: [1, 3, 4, 1, 1, 1] },
            { name: 'Stretch Shape (8th Fret)', desc: 'E-shape barre with an extended high E string.', frets: [8, 10, 10, 8, 8, 11], fingers: [1, 3, 4, 1, 1, 4] },
            { name: 'Stretch Shape (Open 5th)', desc: 'Stretch shape with the open G string as the 5th.', frets: [8, 10, 10, 0, 8, 11], fingers: [1, 3, 4, 0, 1, 4] },
            { name: 'D Shape m', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 8, 8, -1], fingers: [-1, -1, 3, 1, 2, -1] },
            { name: 'Shell Shape (8th Fret)', desc: '4-string jazz shell voicing.', frets: [-1, -1, 10, 8, 8, 8], fingers: [-1, -1, 3, 1, 1, 1] },
            { name: 'Reach Shape (8th Fret)', desc: 'Shell voicing with an extended high E string.', frets: [-1, -1, 10, 8, 8, 11], fingers: [-1, -1, 3, 1, 1, 4] },
            { name: 'Reach Shape (Open 5th)', desc: 'Reach shape with the open G string as the 5th.', frets: [-1, -1, 10, 0, 8, 11], fingers: [-1, -1, 3, 0, 1, 4] },
            { name: 'Sparse Shape (10th Fret)', desc: '3-note high-position voicing.', frets: [-1, -1, 10, 0, -1, 11], fingers: [-1, -1, 2, 0, -1, 3] },
            { name: 'High Shape (10th Fret)', desc: 'High-position voicing without the 5th.', frets: [-1, -1, 10, 12, -1, 11], fingers: [-1, -1, 1, 3, -1, 2] }
        ],
        'm7': [
            { name: 'Weave Shape (3rd Fret)', desc: 'Interlocking low-position minor 7th voicing.', frets: [-1, 3, 1, 3, 1, 3], fingers: [-1, 2, 1, 3, 1, 4] },
            { name: 'Rootless Shape (Jazz)', desc: 'Rootless jazz voicing (Eb-G-Bb upper structure).', frets: [-1, 1, -1, 3, 4, 3], fingers: [-1, 1, -1, 2, 4, 2] },
            { name: 'Am7 Shape (3rd Fret)', desc: 'Standard minor 7th barre.', frets: [-1, 3, 5, 3, 4, 3], fingers: [-1, 1, 3, 1, 2, 1] },
            { name: 'Am7 Shape (Wide Top)', desc: 'Am7 shape with the b7 voiced up top.', frets: [-1, 3, 5, 3, 4, 6], fingers: [-1, 1, 3, 1, 2, 4] },
            { name: 'Open Shape (3rd Fret)', desc: 'Open G string as the 5th, b7 voiced up top.', frets: [-1, 3, 5, 0, 4, 6], fingers: [-1, 1, 3, 0, 2, 4] },
            { name: 'Layer Shape (3rd Fret)', desc: 'Am7 shape with the G string fretted for a doubled root.', frets: [-1, 3, 5, 5, 4, 6], fingers: [-1, 1, 3, 3, 2, 4] },
            { name: 'Jazz m7 (3rd Fret)', desc: 'R&B voicing (5th string root, no 5th).', frets: [-1, 3, 5, 3, 4, -1], fingers: [-1, 1, 4, 2, 3, -1] },
            { name: 'E Shape m7 (8th Fret)', desc: 'Full 6-string E-shape minor 7th barre.', frets: [8, 10, 8, 8, 11, 8], fingers: [1, 2, 1, 1, 3, 1] },
            { name: 'E Shape m7 (Doubled Root)', desc: 'E-shape m7 with the D string voicing the root.', frets: [8, 10, 10, 8, 11, 8], fingers: [1, 2, 2, 1, 3, 1] },
            { name: 'E Shape m7 (High Reach)', desc: 'E-shape m7 with the b7 voiced up on the B string.', frets: [8, 10, 8, 8, 8, 11], fingers: [1, 3, 1, 1, 1, 4] },
            { name: 'E Shape m7 (Wide)', desc: 'E-shape m7 with the 5th doubled up top.', frets: [8, 10, 8, 8, 11, 11], fingers: [1, 3, 1, 1, 4, 4] },
            { name: 'E Shape m7 (Full)', desc: 'E-shape m7 with the root doubled on the D string.', frets: [8, 10, 10, 8, 11, 11], fingers: [1, 3, 3, 1, 4, 4] },
            { name: 'E Shape m7 (Open Triad)', desc: 'E-shape m7 with the open G string as the 5th.', frets: [8, 10, 10, 0, 11, 11], fingers: [1, 3, 3, 0, 4, 4] },
            { name: 'E Shape m7 (No 5th)', desc: '6th string root, skip the 5th & 1st strings (no barre needed).', frets: [8, -1, 8, 8, 8, -1], fingers: [1, -1, 2, 3, 4, -1] },
            { name: 'D Shape m7 (No 5th)', desc: '4th string root jazz shell voicing.', frets: [8, 10, 8, 8, -1, 8], fingers: [2, 3, 1, 1, -1, 1] },
            { name: 'Shell Shape (10th Fret)', desc: '3-note high-position shell.', frets: [-1, -1, 10, 0, 11, 11], fingers: [-1, -1, 1, 0, 2, 2] },
            { name: 'Shell Shape (Full G)', desc: 'Shell shape with the G string fretted instead of open.', frets: [-1, -1, 10, 12, 11, 11], fingers: [-1, -1, 1, 4, 2, 2] }
        ],
        '5': [
            { name: 'Nut Shape (Open 5th)', desc: 'Low-position power chord with the open G string as the 5th.', frets: [-1, 3, -1, 0, 1, 3], fingers: [-1, 2, -1, 0, 1, 2] },
            { name: 'Nut Shape (Sparse)', desc: 'Bare 2-note version of the nut shape.', frets: [-1, 3, -1, 0, -1, 3], fingers: [-1, 1, -1, 0, -1, 1] },
            { name: 'Reach Shape (3rd Fret)', desc: 'Power chord with the open G string as the 5th.', frets: [-1, 3, 5, 0, -1, 3], fingers: [-1, 1, 3, 0, -1, 1] },
            { name: 'A5 Shape (3rd Fret)', desc: 'Rock power chord.', frets: [-1, 3, 5, 5, -1, -1], fingers: [-1, 1, 3, 4, -1, -1] },
            { name: 'Layered Shape (3rd Fret)', desc: 'A5 shape with the high E string added.', frets: [-1, 3, 5, 5, -1, 3], fingers: [-1, 1, 3, 4, -1, 1] },
            { name: 'E Shape 5', desc: '6th string root power chord.', frets: [8, 10, -1, -1, -1, -1], fingers: [1, 2, -1, -1, -1, -1] },
            { name: 'Split Shape (5th Fret)', desc: 'Power chord with the A string left out.', frets: [8, -1, 5, 5, 8, 8], fingers: [1, -1, 2, 3, 1, 1] },
            { name: 'Split Shape (Open 5th)', desc: 'Split shape with the open G string as the 5th.', frets: [8, -1, 5, 0, 8, 8], fingers: [1, -1, 2, 0, 1, 1] },
            { name: 'Sparse Shape (8th Fret)', desc: 'Power chord with the A and D strings left out.', frets: [8, -1, -1, 0, 8, 8], fingers: [1, -1, -1, 0, 1, 1] },
            { name: 'Full Barre (8th Fret)', desc: 'Full 6-string power chord barre.', frets: [8, 10, 10, 0, 8, 8], fingers: [1, 3, 4, 0, 1, 1] },
            { name: 'D Shape 5', desc: '4th string root power chord.', frets: [-1, -1, 10, -1, 8, -1], fingers: [-1, -1, 2, -1, 1, -1] },
            { name: 'Duo Shape (10th Fret)', desc: 'Sparse high-position 2-note power chord.', frets: [-1, -1, 10, 0, -1, -1], fingers: [-1, -1, 1, 0, -1, -1] },
            { name: 'Duo Shape (Wide)', desc: 'Duo shape voiced an octave apart.', frets: [-1, -1, 10, 12, -1, -1], fingers: [-1, -1, 1, 3, -1, -1] }
        ],
        'sus2': [
            { name: 'Open Csus2', desc: 'Open suspended 2nd chord.', frets: [-1, 3, 0, 0, 1, -1], fingers: [-1, 3, 0, 0, 1, -1] },
            { name: 'Bright Shape (Nut)', desc: 'Open-position voicing with the high E string fretted.', frets: [-1, 3, 0, 0, 1, 3], fingers: [-1, 2, 0, 0, 1, 3] },
            { name: 'Wide Shape (Nut)', desc: 'Open-position voicing with the B string voicing the 2nd.', frets: [-1, 3, 0, 0, 3, 3], fingers: [-1, 1, 0, 0, 1, 1] },
            { name: 'Reach Shape (Nut)', desc: 'Wide shape with the D string voicing the 5th.', frets: [-1, 3, 5, 0, 3, 3], fingers: [-1, 1, 3, 0, 1, 1] },
            { name: 'Layer Shape (Nut)', desc: 'Wide shape with the G string voicing the root.', frets: [-1, 3, 0, 5, 3, 3], fingers: [-1, 1, 0, 3, 1, 1] },
            { name: 'Full Shape (Nut)', desc: 'Wide shape with the D and G strings both fretted.', frets: [-1, 3, 5, 5, 3, 3], fingers: [-1, 1, 3, 4, 1, 1] },
            { name: 'Sparse Shape (8th Fret)', desc: '3-note voicing with the A string left out.', frets: [8, -1, 0, 0, 8, 8], fingers: [1, -1, 0, 0, 1, 1] },
            { name: 'Split Shape (8th Fret)', desc: 'Sparse shape with the G string fretted instead of open.', frets: [8, -1, 0, 7, 8, 8], fingers: [1, -1, 0, 3, 1, 1] },
            { name: 'Full Barre (8th Fret)', desc: 'Full 6-string sus2 barre.', frets: [8, 10, 0, 0, 8, 8], fingers: [1, 3, 0, 0, 1, 1] },
            { name: 'Full Barre (Wide)', desc: 'Full barre with the 2nd voiced on the high E string.', frets: [8, 10, 0, 0, 8, 10], fingers: [1, 3, 0, 0, 1, 3] },
            { name: 'Full Barre (Full)', desc: 'Full barre with the D string fretted instead of open.', frets: [8, 10, 10, 0, 8, 10], fingers: [1, 3, 3, 0, 1, 3] },
            { name: 'Shell Shape (10th Fret)', desc: 'High-position shell voicing.', frets: [-1, -1, 10, 0, 8, 10], fingers: [-1, -1, 2, 0, 1, 2] },
            { name: 'E Shape sus2', desc: '6th string root, no barre needed.', frets: [8, 5, 5, -1, -1, -1], fingers: [3, 1, 2, -1, -1, -1] },
            { name: 'Spread Shape (5th Fret)', desc: 'Full 6-string barre near the 5th fret.', frets: [8, 5, 5, 5, 8, 8], fingers: [4, 1, 1, 1, 4, 4] },
            { name: 'Spread Shape (Open D)', desc: 'Spread shape with the D string left open.', frets: [8, 5, 0, 5, 8, 8], fingers: [3, 1, 0, 1, 3, 3] },
            { name: 'Spread Shape (Open G)', desc: 'Spread shape with the G string left open.', frets: [8, 5, 5, 0, 8, 8], fingers: [3, 1, 1, 0, 3, 3] },
            { name: 'Spread Shape (Sparse)', desc: 'Spread shape with the D and G strings left open.', frets: [8, 5, 0, 0, 8, 8], fingers: [3, 1, 0, 0, 3, 3] },
            { name: 'Spread Shape (Full)', desc: 'Spread shape with the G string voicing the 2nd.', frets: [8, 5, 5, 7, 8, 8], fingers: [3, 1, 1, 2, 3, 3] },
            { name: 'D Shape sus2', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, -1, 8, 10], fingers: [-1, -1, 2, -1, 1, 3] }
        ],
        'sus4': [
            { name: 'Open Csus4', desc: 'Standard open suspended 4th.', frets: [-1, 3, 3, 0, 1, 1], fingers: [-1, 3, 4, 0, 1, 1] },
            { name: 'Bright Shape (Nut)', desc: 'Open Csus4 with the high E string fretted.', frets: [-1, 3, 3, 0, 1, 3], fingers: [-1, 3, 4, 0, 1, 3] },
            { name: 'Sparse Shape (Nut)', desc: 'Bright shape with the B string left out.', frets: [-1, 3, 3, 0, -1, 3], fingers: [-1, 1, 1, 0, -1, 1] },
            { name: 'Reach Shape (3rd Fret)', desc: 'Low-position voicing with a stretch on the B string.', frets: [-1, 3, 3, 0, 6, 3], fingers: [-1, 1, 1, 0, 4, 1] },
            { name: 'Open Shape (3rd Fret)', desc: 'Open G string as the 5th.', frets: [-1, 3, 5, 0, 6, 3], fingers: [-1, 1, 2, 0, 4, 1] },
            { name: 'Layer Shape (3rd Fret)', desc: 'Reach shape with the G string fretted instead of open.', frets: [-1, 3, 3, 5, 6, 3], fingers: [-1, 1, 1, 2, 4, 1] },
            { name: 'Wide Shape (3rd Fret)', desc: 'Layer shape with the D string voicing the 5th.', frets: [-1, 3, 5, 5, 6, 3], fingers: [-1, 1, 2, 2, 4, 1] },
            { name: 'Shell Shape (3rd Fret)', desc: 'Layer shape with the B string left out.', frets: [-1, 3, 3, 5, -1, 3], fingers: [-1, 1, 1, 2, -1, 1] },
            { name: 'Full Barre (8th Fret)', desc: 'Full 6-string sus4 barre.', frets: [8, 8, 10, 10, 8, 8], fingers: [1, 1, 3, 4, 1, 1] },
            { name: 'Full Barre (Wide)', desc: 'Full barre with the 5th voiced on the G string.', frets: [8, 10, 10, 10, 8, 8], fingers: [1, 3, 3, 3, 1, 1] },
            { name: 'Spread Shape (5th Fret)', desc: 'Wide low-position voicing.', frets: [8, 8, 5, 5, 6, 8], fingers: [4, 4, 1, 1, 2, 4] },
            { name: 'Spread Shape (Open G)', desc: 'Spread shape with the open G string as the 5th.', frets: [8, 8, 5, 0, 6, 8], fingers: [4, 4, 1, 0, 2, 4] },
            { name: 'Split Shape (6th Fret)', desc: 'Barre with the D string left out.', frets: [8, 8, -1, 0, 6, 8], fingers: [3, 3, -1, 0, 1, 3] },
            { name: 'E Shape sus4', desc: '6th string root, no barre needed.', frets: [8, 10, -1, 10, -1, -1], fingers: [1, 2, -1, 3, -1, -1] },
            { name: 'D Shape sus4', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 10, 8, -1], fingers: [-1, -1, 2, 3, 1, -1] },
            { name: 'Shell Shape (10th Fret)', desc: '3-note high-position shell.', frets: [-1, -1, 10, 0, -1, 13], fingers: [-1, -1, 1, 0, -1, 4] },
            { name: 'Shell Shape (Full G)', desc: 'Shell shape with the G string fretted instead of open.', frets: [-1, -1, 10, 12, -1, 13], fingers: [-1, -1, 1, 3, -1, 4] }
        ],
        '7': [
            { name: 'Open C7 Shape', desc: 'Bluesy dominant 7th shape.', frets: [-1, 3, 2, 3, -1, 3], fingers: [-1, 2, 1, 3, -1, 4] },
            { name: 'Barre Shape (3rd Fret)', desc: '5-string dominant 7th barre.', frets: [-1, 3, 5, 3, 5, 3], fingers: [-1, 1, 2, 1, 3, 1] },
            { name: 'Barre Shape (Open Top)', desc: 'Barre shape with the high E string left open.', frets: [-1, 3, 5, 3, 5, 0], fingers: [-1, 1, 3, 1, 3, 0] },
            { name: 'Barre Shape (Alt Top)', desc: 'Barre shape with the high E string voicing the b7 higher up.', frets: [-1, 3, 5, 3, 5, 6], fingers: [-1, 1, 2, 1, 3, 4] },
            { name: 'Reach Shape (3rd Fret)', desc: 'Open G string as the 5th, b7 voiced up top.', frets: [-1, 3, 5, 0, 5, 6], fingers: [-1, 1, 3, 0, 3, 4] },
            { name: 'Layer Shape (3rd Fret)', desc: 'A-shape barre with the b7 added on top.', frets: [-1, 3, 5, 5, 5, 6], fingers: [-1, 1, 3, 3, 3, 4] },
            { name: 'Wide Shape (7th Fret)', desc: 'Spread dominant 7th voicing.', frets: [8, 7, 8, 0, 8, 0], fingers: [2, 1, 2, 0, 2, 0] },
            { name: 'Open Shape (5th Fret)', desc: 'G-shape derived partial voicing.', frets: [8, 7, 8, 0, 5, 0], fingers: [3, 2, 3, 0, 1, 0] },
            { name: 'G Shape 7 (5th Fret)', desc: 'Full 6-string G-shape dominant 7th barre.', frets: [8, 7, 5, 5, 5, 6], fingers: [3, 2, 1, 1, 1, 4] },
            { name: 'E Shape 7 (8th Fret)', desc: 'Full 6-string E-shape barre.', frets: [8, 10, 8, 9, 8, 8], fingers: [1, 3, 1, 2, 1, 1] },
            { name: 'E Shape 7 (Open Top)', desc: 'E-shape barre with the G and high E strings left open.', frets: [8, 10, 8, 0, 8, 0], fingers: [1, 3, 1, 0, 1, 0] },
            { name: 'E Shape 7 (High Open)', desc: 'E-shape barre with the high E string left open.', frets: [8, 10, 8, 9, 8, 0], fingers: [1, 3, 1, 2, 1, 0] },
            { name: 'E Shape 7 (Wide)', desc: 'E-shape barre with the b7 voiced up on the B string.', frets: [8, 10, 8, 9, 11, 8], fingers: [1, 3, 1, 2, 4, 1] },
            { name: 'E Shape 7 (No 5th)', desc: '6th string root jazz shell voicing.', frets: [8, -1, 8, 0, 8, 0], fingers: [1, -1, 2, 0, 3, 0] },
            { name: 'D Shape 7 (No 5th)', desc: '4th string root jazz shell voicing.', frets: [8, 10, 8, -1, -1, 0], fingers: [1, 3, 2, -1, -1, 0] },
            { name: 'Shell Shape (10th Fret)', desc: '3-note high-position shell.', frets: [-1, -1, 10, 0, 11, 0], fingers: [-1, -1, 1, 0, 2, 0] },
            { name: 'Shell Shape (Full G)', desc: 'Shell shape with the G string fretted instead of open.', frets: [-1, -1, 10, 12, 11, 0], fingers: [-1, -1, 1, 4, 2, 0] },
            { name: 'Climb Shape (10th Fret)', desc: 'Shell shape with the b7 voiced up top.', frets: [-1, -1, 10, 0, 11, 12], fingers: [-1, -1, 1, 0, 2, 4] },
            { name: 'Climb Shape (Full)', desc: 'Climb shape with the G string fretted instead of open.', frets: [-1, -1, 10, 12, 11, 12], fingers: [-1, -1, 1, 3, 2, 3] }
        ],
        'maj7': [
            { name: 'Open Cmaj7 Shape', desc: 'Standard acoustic Cmaj7.', frets: [-1, 3, 2, 0, 0, 0], fingers: [-1, 3, 2, 0, 0, 0] },
            { name: 'Bell Shape (Bright Top)', desc: 'Open Cmaj7 with the high E string fretted.', frets: [-1, 3, 2, 0, 0, 3], fingers: [-1, 3, 2, 0, 0, 4] },
            { name: 'Bell Shape (Full)', desc: 'Bell shape with the G string also fretted.', frets: [-1, 3, 2, 4, 0, 3], fingers: [-1, 3, 2, 4, 0, 1] },
            { name: 'Jazz Shape (3rd Fret)', desc: 'Classic jazz Cmaj7 voicing.', frets: [-1, 3, 5, 4, 5, 3], fingers: [-1, 1, 3, 2, 4, 1] },
            { name: 'Jazz Shape (Open Top)', desc: 'Jazz shape with the high E string left open.', frets: [-1, 3, 5, 4, 5, 0], fingers: [-1, 1, 3, 2, 3, 0] },
            { name: 'Open Shape (3rd Fret)', desc: 'Open-voiced Cmaj7 higher up the neck.', frets: [-1, 3, 5, 0, 0, 0], fingers: [-1, 1, 3, 0, 0, 0] },
            { name: 'Open Shape (Add B)', desc: 'Open shape with the G string fretted.', frets: [-1, 3, 5, 4, 0, 0], fingers: [-1, 1, 3, 2, 0, 0] },
            { name: 'Open Shape (Doubled Root)', desc: 'Open shape with the G string voicing the root.', frets: [-1, 3, 5, 5, 0, 0], fingers: [-1, 1, 3, 4, 0, 0] },
            { name: 'Spread Shape (7th Fret)', desc: 'Wide dominant-position maj7 voicing.', frets: [8, 7, 9, 0, 0, 7], fingers: [2, 1, 4, 0, 0, 1] },
            { name: 'Spread Shape (Open Top)', desc: 'Spread shape with the high E string left open.', frets: [8, 7, 9, 0, 0, 0], fingers: [2, 1, 4, 0, 0, 0] },
            { name: 'E Shape maj7 (8th Fret)', desc: 'Full 6-string E-shape maj7 barre.', frets: [8, 10, 9, 9, 8, 8], fingers: [1, 3, 2, 2, 1, 1] },
            { name: 'E Shape maj7 (Open Top)', desc: 'E-shape maj7 with the G and high E strings left open.', frets: [8, 10, 9, 0, 8, 0], fingers: [1, 3, 2, 0, 1, 0] },
            { name: 'E Shape maj7 (High Open)', desc: 'E-shape maj7 with the high E string left open.', frets: [8, 10, 9, 9, 8, 0], fingers: [1, 3, 2, 2, 1, 0] },
            { name: 'E Shape maj7 (Open Triad)', desc: 'E-shape maj7 with the top three strings left open.', frets: [8, 10, 9, 0, 0, 0], fingers: [1, 3, 2, 0, 0, 0] },
            { name: 'E Shape maj7 (Doubled Root)', desc: 'E-shape maj7 with the D string voicing the root.', frets: [8, 10, 10, 0, 0, 0], fingers: [1, 3, 4, 0, 0, 0] },
            { name: 'Cmaj7 (No 5th)', desc: 'Muted 4th string jazzy voicing.', frets: [-1, 3, 5, -1, 0, 0], fingers: [-1, 1, 2, -1, 0, 0] },
            { name: 'D Shape maj7 (No 5th)', desc: '4th string root jazz shell voicing.', frets: [8, -1, -1, 0, 0, 0], fingers: [1, -1, -1, 0, 0, 0] },
            { name: 'Shell Shape (10th Fret)', desc: 'High-position shell voicing.', frets: [-1, -1, 10, 0, 0, 0], fingers: [-1, -1, 1, 0, 0, 0] }
        ],
        'm7b5': [
            { name: 'Cm7b5', desc: 'Half-diminished jazz voicing.', frets: [-1, 3, 4, 3, 4, -1], fingers: [-1, 1, 3, 2, 4, -1] },
            { name: 'E Shape m7b5 (No 5th)', desc: '6th string root half-diminished shell.', frets: [8, -1, 8, 8, 7, -1], fingers: [2, -1, 3, 4, 1, -1] },
            { name: 'D Shape m7b5', desc: '4th string root half-diminished shell.', frets: [-1, -1, 10, 11, 11, 11], fingers: [-1, -1, 1, 2, 3, 4] },
            { name: 'Cluster Shape (1st Fret)', desc: 'Close-position m7b5 voicing.', frets: [-1, 3, 1, 3, 1, 2], fingers: [-1, 3, 1, 4, 1, 2] },
            { name: 'Full Shape (6th Fret)', desc: '6-string closed m7b5 chord.', frets: [8, 6, 8, 8, 7, 6], fingers: [3, 1, 4, 4, 2, 1] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position m7b5 voicing.', frets: [-1, 3, 4, 3, 4, 6], fingers: [-1, 1, 2, 1, 3, 4] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m7b5 chord.', frets: [8, 9, 8, 8, 11, 8], fingers: [1, 2, 1, 1, 3, 1] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed m7b5 chord.', frets: [8, 9, 10, 8, 11, 8], fingers: [1, 2, 3, 1, 4, 1] },
            { name: 'Full Shape (8th Fret High)', desc: '6-string closed m7b5 chord.', frets: [8, 9, 8, 8, 11, 11], fingers: [1, 2, 1, 1, 3, 3] },
            { name: 'Full Shape (8th Fret Highest)', desc: '6-string closed m7b5 chord.', frets: [8, 9, 10, 8, 11, 11], fingers: [1, 2, 3, 1, 4, 4] },
            { name: 'Full Shape (9th Fret)', desc: '6-string closed m7b5 chord.', frets: [8, 9, 8, 11, 11, 11], fingers: [1, 2, 1, 3, 3, 3] },
            { name: 'Full Shape (9th Fret Wide)', desc: '6-string closed m7b5 chord.', frets: [8, 9, 10, 11, 11, 11], fingers: [1, 2, 3, 4, 4, 4] }
        ],
        '9': [
            { name: 'C9 Shape', desc: 'Jazz 5-string 9th chord.', frets: [-1, 3, 2, 3, 3, 3], fingers: [-1, 2, 1, 3, 3, 3] },
            { name: 'E Shape 9 (No 5th)', desc: '6th string root jazz 9th shell.', frets: [8, 5, -1, 0, 5, 6], fingers: [4, 1, -1, 0, 2, 3] },
            { name: 'D Shape 9 (No 5th)', desc: '4th string root jazz 9th shell.', frets: [8, 10, 0, -1, 11, 0], fingers: [1, 2, 0, -1, 3, 0] },
            { name: 'Reach Shape (Nut)', desc: 'Open-position 9th voicing.', frets: [-1, 3, 0, 3, 5, 3], fingers: [-1, 1, 0, 1, 3, 1] },
            { name: 'Layer Shape (Nut)', desc: 'Open-position 9th with high open string.', frets: [-1, 3, 5, 3, 3, 0], fingers: [-1, 1, 3, 1, 1, 0] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string 9th voicing higher up the neck.', frets: [8, 7, 0, 0, 8, 6], fingers: [3, 1, 0, 0, 3, 2] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 9th chord.', frets: [8, 7, 8, 7, 8, 0], fingers: [2, 1, 3, 1, 4, 0] },
            { name: 'E Shape 9 (Full Barre)', desc: 'Full 6-string barre 9th chord.', frets: [8, 10, 8, 9, 8, 10], fingers: [1, 3, 1, 2, 1, 4] },
            { name: 'Open Shape (3rd Fret)', desc: 'Low-position 9th with open strings.', frets: [-1, 3, 0, 0, 5, 6], fingers: [-1, 1, 0, 0, 3, 4] },
            { name: 'Spread Shape (5th Fret)', desc: 'Wide-interval 9th voicing.', frets: [8, 5, 8, 0, 5, 0], fingers: [3, 1, 3, 0, 1, 0] },
            { name: 'Spread Shape (Closed)', desc: 'Closed wide-interval 9th voicing.', frets: [8, 5, 8, 5, 8, 0], fingers: [2, 1, 3, 1, 4, 0] },
            { name: 'Spread Shape (Open G)', desc: 'Wide-interval 9th with open G.', frets: [8, 5, 8, 0, 8, 0], fingers: [3, 1, 3, 0, 3, 0] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position 9th voicing.', frets: [8, 5, 5, 5, 5, 6], fingers: [4, 1, 1, 1, 1, 2] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string 9th voicing with wide span.', frets: [8, 7, 0, 0, 5, 6], fingers: [4, 3, 0, 0, 1, 2] },
            { name: 'Cluster Shape (Full G)', desc: 'Close-position 9th chord with full G.', frets: [8, 5, 5, 7, 5, 6], fingers: [4, 1, 1, 3, 1, 2] },
            { name: 'Spread Shape (High Root)', desc: 'Wide-interval 9th with doubled root.', frets: [8, 5, 8, 0, -1, 0], fingers: [2, 1, 3, 0, -1, 0] },
            { name: 'Shell Shape (10th Fret)', desc: '4-note jazz 9th shell higher up the neck.', frets: [8, 10, 0, 0, 11, 0], fingers: [2, 3, 0, 0, 4, 0] },
            { name: 'Shell Shape (Full G)', desc: 'Jazz 9th shell with added G.', frets: [8, 10, 0, 9, 11, 0], fingers: [2, 3, 0, 1, 4, 0] }
        ],
        'maj9': [
            { name: 'Cmaj9 Shape', desc: 'Lush major 9th.', frets: [-1, 3, 2, 4, 3, 3], fingers: [-1, 3, 2, 4, 1, 1] },
            { name: 'E Shape maj9 (No 5th)', desc: '6th string root jazz maj9 shell.', frets: [8, 5, -1, 0, 0, 0], fingers: [2, 1, -1, 0, 0, 0] },
            { name: 'D Shape maj9 (No 5th)', desc: '4th string root jazz maj9 shell.', frets: [8, -1, 0, 0, 0, 0], fingers: [1, -1, 0, 0, 0, 0] }
        ],
        '6': [
            { name: 'Open C6 Shape', desc: 'Sweet vintage 6th.', frets: [-1, 3, 2, 0, -1, 5], fingers: [-1, 2, 1, 0, -1, 3] },
            { name: 'Bright Shape (Nut)', desc: 'Open C6 with the high E string fretted.', frets: [-1, 3, 2, 2, 1, 3], fingers: [-1, 3, 2, 2, 1, 3] },
            { name: 'Drone Shape (3rd Fret)', desc: 'Open G string as the 5th.', frets: [-1, 3, 5, 0, 5, 5], fingers: [-1, 1, 3, 0, 3, 3] },
            { name: 'Airy Shape (8th Fret)', desc: '3-note voicing with open A and B strings.', frets: [8, 0, 7, 0, 8, 0], fingers: [3, 0, 1, 0, 3, 0] },
            { name: 'Airy Shape (Full A)', desc: 'Airy shape with the A string fretted instead of open.', frets: [8, 7, 7, 0, 8, 0], fingers: [4, 1, 1, 0, 4, 0] },
            { name: 'Airy Shape (Closed)', desc: 'Airy shape with the high E string also fretted.', frets: [8, 7, 7, 0, 8, 8], fingers: [3, 1, 1, 0, 3, 3] },
            { name: 'Cluster Shape (8th Fret)', desc: '5-note voicing with the A string left open.', frets: [8, 0, 10, 9, 8, 8], fingers: [1, 0, 3, 2, 1, 1] },
            { name: 'E Shape 6 (Full Barre)', desc: 'Full 6-string E-shape 6th barre.', frets: [8, 10, 10, 9, 10, 8], fingers: [1, 3, 3, 2, 4, 1] },
            { name: 'Open Shape (8th Fret)', desc: 'E-shape 6th with the A and B strings left open.', frets: [8, 0, 10, 0, 8, 0], fingers: [1, 0, 3, 0, 1, 0] },
            { name: 'Open Shape (High E)', desc: 'Open shape with the G string fretted instead of open.', frets: [8, 0, 10, 9, 8, 0], fingers: [1, 0, 3, 2, 1, 0] },
            { name: 'Open Shape (High B)', desc: 'Open shape with the 6th voiced on the B string.', frets: [8, 0, 10, 0, 10, 0], fingers: [1, 0, 3, 0, 3, 0] },
            { name: 'E Shape 6', desc: '6th string root, no barre needed.', frets: [8, 10, 7, 9, -1, -1], fingers: [2, 4, 1, 3, -1, -1] },
            { name: 'D Shape 6 (No 5th)', desc: '4th string root, no barre needed.', frets: [8, 0, -1, -1, 8, 0], fingers: [1, 0, -1, -1, 2, 0] },
            { name: 'Shell Shape (10th Fret)', desc: '3-note high-position shell.', frets: [-1, -1, 10, 0, 10, 0], fingers: [-1, -1, 1, 0, 2, 0] },
            { name: 'Shell Shape (Full G)', desc: 'Shell shape with the G string fretted instead of open.', frets: [-1, -1, 10, 12, 10, 0], fingers: [-1, -1, 1, 4, 1, 0] },
            { name: 'Shell Shape (High E)', desc: 'Shell shape with the high E string fretted instead of open.', frets: [-1, -1, 10, 0, 10, 12], fingers: [-1, -1, 1, 0, 1, 3] },
            { name: 'Shell Shape (Wide)', desc: 'Shell shape with the G and high E strings both fretted.', frets: [-1, -1, 10, 12, 10, 12], fingers: [-1, -1, 1, 3, 1, 3] },
            { name: 'Barre Shape (10th Fret)', desc: 'A/D-string barre with the 6th voiced on the B string.', frets: [8, 10, 10, 0, 10, 0], fingers: [1, 3, 3, 0, 3, 0] },
            { name: 'Barre Shape (Full G)', desc: 'Barre shape with the G string fretted instead of open.', frets: [8, 10, 10, 9, 10, 0], fingers: [1, 3, 3, 2, 3, 0] }
        ],
        'm6': [
            { name: 'Twist Shape (Nut)', desc: 'Open-position minor 6th voicing.', frets: [-1, 3, 1, 2, 1, 3], fingers: [-1, 3, 1, 2, 1, 4] },
            { name: 'Drone Shape (3rd Fret)', desc: 'Open G string as the 5th.', frets: [-1, 3, 5, 0, 4, 5], fingers: [-1, 1, 3, 0, 2, 3] },
            { name: 'Layer Shape (3rd Fret)', desc: 'Drone shape with the G string fretted instead of open.', frets: [-1, 3, 5, 5, 4, 5], fingers: [-1, 1, 3, 3, 2, 3] },
            { name: 'Airy Shape (8th Fret)', desc: '4-note voicing with the G string left open.', frets: [8, 6, 7, 0, 8, 8], fingers: [3, 1, 2, 0, 3, 3] },
            { name: 'E Shape m6 (Full Barre)', desc: 'Full 6-string E-shape minor 6th barre.', frets: [8, 10, 10, 8, 10, 8], fingers: [1, 2, 2, 1, 3, 1] },
            { name: 'E Shape m6 (Wide)', desc: 'E-shape m6 with the 6th voiced up on the high E string.', frets: [8, 10, 10, 8, 10, 11], fingers: [1, 2, 2, 1, 3, 4] },
            { name: 'E Shape m6 (Open G)', desc: 'E-shape m6 with the open G string as the 5th.', frets: [8, 10, 10, 0, 10, 11], fingers: [1, 3, 3, 0, 3, 4] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Wide voicing near the 5th fret.', frets: [8, 6, 5, 5, 8, 5], fingers: [3, 2, 1, 1, 4, 1] },
            { name: 'Cluster Shape (Open A)', desc: 'Cluster shape with the A string left open.', frets: [8, 0, 5, 8, 8, 5], fingers: [3, 0, 1, 3, 3, 1] },
            { name: 'Cluster Shape (Full)', desc: 'Cluster shape with the A string fretted instead of open.', frets: [8, 6, 5, 8, 8, 5], fingers: [3, 2, 1, 4, 4, 1] },
            { name: 'Cluster Shape (Open A, Full)', desc: 'Cluster shape with the open A string and D string fretted.', frets: [8, 0, 7, 8, 8, 5], fingers: [3, 0, 2, 3, 3, 1] },
            { name: 'Open Shape (8th Fret)', desc: 'E-shape m6 variant with the A string left open.', frets: [8, 0, 10, 8, 8, 11], fingers: [1, 0, 3, 1, 1, 4] },
            { name: 'Open Shape (High B)', desc: 'Open shape with the G string left open too.', frets: [8, 0, 10, 0, 8, 11], fingers: [1, 0, 3, 0, 1, 4] },
            { name: 'Open Shape (Full)', desc: 'Open shape with the 5th voiced on the B string.', frets: [8, 0, 10, 0, 10, 11], fingers: [1, 0, 3, 0, 3, 4] },
            { name: 'Shell Shape (10th Fret)', desc: '3-note high-position shell.', frets: [-1, -1, 10, 0, 10, 11], fingers: [-1, -1, 1, 0, 1, 2] },
            { name: 'Shell Shape (Full G)', desc: 'Shell shape with the G string fretted instead of open.', frets: [-1, -1, 10, 12, 10, 11], fingers: [-1, -1, 1, 4, 1, 2] }
        ],
        'm(maj9)': [
            { name: 'Compact Shape (Nut)', desc: 'Open-position minor major 9th voicing.', frets: [-1, 3, 0, 4, 4, 3], fingers: [-1, 1, 0, 2, 2, 1] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string minor major 9th voicing.', frets: [8, 6, 0, 0, 0, 7], fingers: [3, 1, 0, 0, 0, 2] },
            { name: 'Open Shape (6th Fret)', desc: 'Minor major 9th with open D and G strings.', frets: [8, 6, 0, 0, 8, 7], fingers: [3, 1, 0, 0, 3, 2] },
            { name: 'Full Shape (6th Fret)', desc: 'Minor major 9th with open D string.', frets: [8, 6, 0, 8, 8, 7], fingers: [3, 1, 0, 3, 3, 2] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string minor major 9th voicing with doubled root.', frets: [8, 6, 0, 0, 0, 8], fingers: [2, 1, 0, 0, 0, 2] },
            { name: 'Shell Shape (8th Fret)', desc: '4-note minor major 9th shell.', frets: [8, -1, 0, 8, 8, 7], fingers: [2, -1, 0, 2, 2, 1] },
            { name: 'Spread Shape (8th Fret)', desc: 'Wide-interval minor major 9th voicing.', frets: [8, 10, 0, 8, 0, 8], fingers: [1, 2, 0, 1, 0, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed minor major 9th chord.', frets: [8, 10, 9, 8, 8, 10], fingers: [1, 3, 2, 1, 1, 4] },
            { name: 'Spread Shape (10th Fret)', desc: 'Wide-interval minor major 9th voicing higher up the neck.', frets: [8, 10, 0, 8, 0, 10], fingers: [1, 2, 0, 1, 0, 2] },
            { name: 'Spread Shape (Full)', desc: 'Wide-interval minor major 9th chord with added 5th.', frets: [8, 10, 9, 8, 0, 10], fingers: [1, 3, 2, 1, 0, 4] },
            { name: 'Cluster Shape (10th Fret)', desc: 'Close-position minor major 9th voicing.', frets: [8, 10, 10, 8, 0, 10], fingers: [1, 2, 2, 1, 0, 2] },
            { name: 'Compact Shape (3rd Fret)', desc: 'Open-position minor major 9th voicing, muted low E.', frets: [-1, 3, 1, 4, 3, 3], fingers: [-1, 2, 1, 3, 2, 2] },
            { name: 'Spread Shape (5th Fret)', desc: 'Wide-interval minor major 9th voicing.', frets: [8, 5, 5, 8, 0, 7], fingers: [3, 1, 1, 3, 0, 2] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed minor major 9th chord.', frets: [8, 5, 5, 8, 8, 7], fingers: [3, 1, 1, 3, 3, 2] },
            { name: 'Open Shape (5th Fret)', desc: 'Minor major 9th with open D string.', frets: [8, 5, 0, 8, 8, 7], fingers: [3, 1, 0, 3, 3, 2] },
            { name: 'Spread Shape (Wide)', desc: 'Wide-interval minor major 9th voicing with doubled root.', frets: [8, 5, 5, 8, 0, 8], fingers: [2, 1, 1, 2, 0, 2] }
        ],
        'm(maj11)': [
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string minor major 11th voicing.', frets: [8, 6, 0, 0, 6, 7], fingers: [3, 1, 0, 0, 1, 2] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed minor major 11th chord.', frets: [8, 8, 9, 8, 8, 10], fingers: [1, 1, 2, 1, 1, 3] },
            { name: 'Shell Shape (8th Fret)', desc: '4-note minor major 11th shell.', frets: [8, 8, 0, 0, 0, 11], fingers: [1, 1, 0, 0, 0, 2] },
            { name: 'Shell Shape (Full G)', desc: 'Minor major 11th shell with added D string.', frets: [8, 10, 0, 10, 0, 11], fingers: [1, 2, 0, 2, 0, 3] }
        ],
        'm6/9': [
            { name: 'Compact Shape (3rd Fret)', desc: 'Open-position m6/9 voicing.', frets: [-1, 3, 1, 2, 3, 3], fingers: [-1, 3, 1, 2, 3, 3] },
            { name: 'Layer Shape (3rd Fret)', desc: 'Open-position m6/9 voicing.', frets: [-1, 3, 0, 2, 4, 3], fingers: [-1, 2, 0, 1, 3, 2] },
            { name: 'Echo Shape (Nut)', desc: 'Open-position m6/9 voicing.', frets: [-1, 3, 0, 0, 4, 5], fingers: [-1, 1, 0, 0, 2, 3] },
            { name: 'Full Shape (6th Fret)', desc: '6-string closed m6/9 chord.', frets: [8, 6, 7, 7, 8, 8], fingers: [3, 1, 2, 2, 3, 3] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string m6/9 voicing.', frets: [8, 0, 0, 8, 8, 10], fingers: [1, 0, 0, 1, 1, 2] },
            { name: 'Open Shape (8th Fret)', desc: 'm6/9 with open A string.', frets: [8, 0, 10, 8, 8, 10], fingers: [1, 0, 2, 1, 1, 2] },
            { name: 'Open Shape (10th Fret)', desc: 'm6/9 with open D string.', frets: [8, 10, 0, 8, 10, 10], fingers: [1, 2, 0, 1, 2, 2] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position m6/9 voicing.', frets: [8, 6, 0, 5, 8, 5], fingers: [3, 2, 0, 1, 4, 1] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string m6/9 voicing.', frets: [8, 6, 0, 0, 8, 5], fingers: [3, 2, 0, 0, 3, 1] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed m6/9 chord.', frets: [8, 5, 5, 8, 8, 5], fingers: [2, 1, 1, 2, 2, 1] },
            { name: 'Open Shape (5th Fret)', desc: 'm6/9 with open D string.', frets: [8, 5, 0, 8, 8, 5], fingers: [2, 1, 0, 2, 2, 1] },
            { name: 'Open Shape (6th Fret)', desc: 'm6/9 with open D string.', frets: [8, 6, 0, 8, 8, 5], fingers: [3, 2, 0, 3, 3, 1] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string m6/9 voicing.', frets: [8, 0, 0, 8, 8, 5], fingers: [2, 0, 0, 2, 2, 1] },
            { name: 'Cluster Shape (Full)', desc: 'Close-position m6/9 voicing.', frets: [8, 5, 7, 8, 8, 5], fingers: [3, 1, 2, 4, 4, 1] },
            { name: 'Spread Shape (8th Fret)', desc: 'Wide-interval m6/9 voicing.', frets: [8, 0, 7, 8, 8, 10], fingers: [2, 0, 1, 2, 2, 3] },
            { name: 'Spread Shape (Wide)', desc: 'Wide-interval m6/9 voicing higher up the neck.', frets: [8, 0, 0, 8, 8, 11], fingers: [1, 0, 0, 1, 1, 2] }
        ],
        '7add11': [
            { name: 'Compact Shape (3rd Fret)', desc: 'Open-position 7add11 voicing.', frets: [-1, 3, 3, 3, 5, 3], fingers: [-1, 1, 1, 1, 2, 1] },
            { name: 'Full Shape (6th Fret)', desc: '7add11 with open D string.', frets: [8, 7, 8, 0, 6, 6], fingers: [3, 2, 3, 0, 1, 1] },
            { name: 'Open Shape (6th Fret)', desc: '7add11 with open strings.', frets: [8, 7, 8, 0, 6, 0], fingers: [3, 2, 3, 0, 1, 0] },
            { name: 'Open Shape (Full)', desc: '7add11 with open D and high E strings.', frets: [8, 8, 8, 0, 6, 0], fingers: [2, 2, 2, 0, 1, 0] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 7add11 chord.', frets: [8, 8, 8, 9, 8, 0], fingers: [1, 1, 1, 2, 1, 0] },
            { name: 'Full Shape (Wide)', desc: '7add11 voicing with wide top.', frets: [8, 8, 8, 10, 8, 0], fingers: [1, 1, 1, 2, 1, 0] },
            { name: 'Spread Shape (8th Fret)', desc: 'Wide-interval 7add11 voicing.', frets: [8, 10, 8, 10, 8, 0], fingers: [1, 2, 1, 3, 1, 0] },
            { name: 'Reach Shape (Nut)', desc: 'Open-position 7add11 voicing with wide reach.', frets: [-1, 3, 5, 3, 6, 0], fingers: [-1, 1, 2, 1, 3, 0] },
            { name: 'Echo Shape (Nut)', desc: 'Open-position 7add11 voicing.', frets: [-1, 3, 3, 0, 5, 6], fingers: [-1, 1, 1, 0, 2, 3] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string 7add11 voicing.', frets: [8, 8, 8, 0, 5, 0], fingers: [2, 2, 2, 0, 1, 0] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position 7add11 voicing.', frets: [8, 8, 5, 5, 5, 6], fingers: [3, 3, 1, 1, 1, 2] },
            { name: 'Open Shape (5th Fret)', desc: '7add11 with open D string.', frets: [8, 8, 8, 0, 5, 6], fingers: [3, 3, 3, 0, 1, 2] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed 7add11 chord.', frets: [8, 7, 5, 5, 6, 6], fingers: [4, 3, 1, 1, 2, 2] },
            { name: 'Open Shape (Wide)', desc: '7add11 with open D string.', frets: [8, 7, 5, 0, 6, 6], fingers: [4, 3, 1, 0, 2, 2] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string 7add11 voicing higher up the neck.', frets: [8, 8, 8, 0, 11, 0], fingers: [1, 1, 1, 0, 2, 0] },
            { name: 'Open Shape (10th Fret)', desc: '7add11 with open D string higher up the neck.', frets: [8, 8, 10, 0, 11, 0], fingers: [1, 1, 2, 0, 3, 0] }
        ],
        'maj7add11': [
            { name: 'Compact Shape (Nut)', desc: 'Open-position maj7add11 voicing.', frets: [-1, 3, 2, 0, 0, 1], fingers: [-1, 3, 2, 0, 0, 1] },
            { name: 'Airy Shape (Nut)', desc: 'Open-string maj7add11 voicing.', frets: [-1, 3, 3, 0, 0, 0], fingers: [-1, 1, 1, 0, 0, 0] },
            { name: 'Full Shape (3rd Fret)', desc: 'Closed maj7add11 voicing.', frets: [-1, 3, 3, 4, 5, 3], fingers: [-1, 1, 1, 2, 3, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed maj7add11 chord.', frets: [8, 8, 9, 9, 8, 8], fingers: [1, 1, 2, 2, 1, 1] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string maj7add11 voicing.', frets: [8, 8, 9, 0, 0, 0], fingers: [1, 1, 2, 0, 0, 0] },
            { name: 'Open Shape (8th Fret)', desc: 'maj7add11 with open D string.', frets: [8, 8, 9, 0, 8, 0], fingers: [1, 1, 2, 0, 1, 0] },
            { name: 'Open Shape (Full)', desc: 'maj7add11 with open high E string.', frets: [8, 8, 9, 9, 8, 0], fingers: [1, 1, 2, 2, 1, 0] },
            { name: 'Full Shape (Wide)', desc: 'maj7add11 voicing with wide top.', frets: [8, 8, 9, 10, 8, 0], fingers: [1, 1, 2, 3, 1, 0] },
            { name: 'Spread Shape (8th Fret)', desc: 'Wide-interval maj7add11 voicing.', frets: [8, 10, 9, 10, 8, 0], fingers: [1, 3, 2, 4, 1, 0] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string maj7add11 voicing.', frets: [8, 8, 10, 0, 0, 0], fingers: [1, 1, 2, 0, 0, 0] },
            { name: 'Spread Shape (High Root)', desc: 'Wide-interval maj7add11 voicing with doubled root.', frets: [8, 10, 9, 10, 0, 0], fingers: [1, 3, 2, 3, 0, 0] },
            { name: 'Spread Shape (Full)', desc: 'Wide-interval maj7add11 chord.', frets: [8, 10, 10, 10, 0, 0], fingers: [1, 2, 2, 2, 0, 0] },
            { name: 'Echo Shape (Nut)', desc: 'Open-position maj7add11 voicing.', frets: [-1, 3, 5, 4, 6, 0], fingers: [-1, 1, 3, 2, 4, 0] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position maj7add11 voicing.', frets: [8, 8, 5, 5, 0, 0], fingers: [2, 2, 1, 1, 0, 0] },
            { name: 'Airy Shape (5th Fret)', desc: 'Open-string maj7add11 voicing.', frets: [8, 8, 5, 0, 0, 0], fingers: [2, 2, 1, 0, 0, 0] },
            { name: 'Cluster Shape (Full)', desc: 'Close-position maj7add11 chord.', frets: [8, 8, 5, 5, 5, 7], fingers: [3, 3, 1, 1, 1, 2] }
        ],
        'm(maj7)add11': [
            { name: 'Compact Shape (Nut)', desc: 'Open-position m(maj7)add11 voicing.', frets: [-1, 3, 1, 0, 0, 1], fingers: [-1, 2, 1, 0, 0, 1] },
            { name: 'Full Shape (3rd Fret)', desc: 'Closed m(maj7)add11 voicing.', frets: [-1, 3, 3, 4, 4, 3], fingers: [-1, 1, 1, 2, 2, 1] },
            { name: 'Spread Shape (7th Fret)', desc: 'Wide-interval m(maj7)add11 voicing.', frets: [8, 8, 5, 8, 0, 7], fingers: [3, 3, 1, 3, 0, 2] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m(maj7)add11 chord.', frets: [8, 8, 9, 8, 8, 11], fingers: [1, 1, 2, 1, 1, 3] },
            { name: 'Full Shape (Wide)', desc: 'm(maj7)add11 voicing with wide top.', frets: [8, 8, 9, 10, 8, 11], fingers: [1, 1, 2, 3, 1, 4] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string m(maj7)add11 voicing.', frets: [8, 8, 9, 0, 0, 11], fingers: [1, 1, 2, 0, 0, 3] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string m(maj7)add11 voicing.', frets: [8, 8, 10, 0, 0, 11], fingers: [1, 1, 2, 0, 0, 3] },
            { name: 'Spread Shape (High Root)', desc: 'Wide-interval m(maj7)add11 chord.', frets: [8, 10, 10, 10, 0, 11], fingers: [1, 2, 2, 2, 0, 3] },
            { name: 'Echo Shape (6th Fret)', desc: 'm(maj7)add11 voicing with muted D string.', frets: [8, 6, -1, 0, 6, 7], fingers: [3, 1, -1, 0, 1, 2] }
        ],
        '7add13': [
            { name: 'Full Shape (3rd Fret)', desc: 'Closed 7add13 voicing.', frets: [-1, 3, 5, 3, 5, 5], fingers: [-1, 1, 2, 1, 2, 2] },
            { name: 'Open Shape (6th Fret)', desc: '7add13 with open D string.', frets: [8, 7, 7, 0, 8, 6], fingers: [3, 2, 2, 0, 3, 1] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string 7add13 voicing.', frets: [8, 0, 8, 0, 8, 0], fingers: [1, 0, 1, 0, 1, 0] },
            { name: 'Open Shape (8th Fret)', desc: '7add13 with open A and high E strings.', frets: [8, 0, 8, 9, 8, 0], fingers: [1, 0, 1, 2, 1, 0] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 7add13 chord.', frets: [8, 10, 8, 9, 10, 8], fingers: [1, 3, 1, 2, 4, 1] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string 7add13 voicing higher up the neck.', frets: [8, 0, 8, 0, 10, 0], fingers: [1, 0, 1, 0, 2, 0] },
            { name: 'Open Shape (10th Fret)', desc: '7add13 with open D and high E strings.', frets: [8, 10, 8, 0, 10, 0], fingers: [1, 2, 1, 0, 2, 0] },
            { name: 'Open Shape (Full 10th)', desc: '7add13 with open high E string.', frets: [8, 10, 8, 9, 10, 0], fingers: [1, 3, 1, 2, 4, 0] },
            { name: 'Airy Shape (5th Fret)', desc: 'Open-string 7add13 voicing.', frets: [8, 0, 8, 0, 5, 5], fingers: [2, 0, 2, 0, 1, 1] },
            { name: 'Open Shape (5th Fret)', desc: '7add13 with open D string.', frets: [8, 7, 8, 0, 5, 5], fingers: [3, 2, 3, 0, 1, 1] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position 7add13 voicing.', frets: [8, 0, 5, 5, 5, 6], fingers: [3, 0, 1, 1, 1, 2] },
            { name: 'Spread Shape (5th Fret)', desc: 'Wide-interval 7add13 voicing.', frets: [8, 0, 7, 0, 5, 6], fingers: [4, 0, 3, 0, 1, 2] },
            { name: 'Open Shape (Wide)', desc: '7add13 with open D string.', frets: [8, 7, 7, 0, 5, 6], fingers: [4, 3, 3, 0, 1, 2] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string 7add13 voicing.', frets: [8, 0, 8, 0, 5, 6], fingers: [3, 0, 3, 0, 1, 2] },
            { name: 'Open Shape (Full)', desc: '7add13 with open A and high E strings.', frets: [8, 0, 8, 5, 8, 0], fingers: [2, 0, 2, 1, 2, 0] }
        ],
        'maj7add13': [
            { name: 'Airy Shape (7th Fret)', desc: 'Open-string maj7add13 voicing.', frets: [8, 0, 7, 0, 0, 0], fingers: [2, 0, 1, 0, 0, 0] },
            { name: 'Open Shape (7th Fret)', desc: 'maj7add13 with open G, B and high E strings.', frets: [8, 7, 7, 0, 0, 0], fingers: [2, 1, 1, 0, 0, 0] },
            { name: 'Open Shape (7th Fret Wide)', desc: 'maj7add13 with open G and B strings.', frets: [8, 7, 7, 0, 0, 7], fingers: [2, 1, 1, 0, 0, 1] },
            { name: 'Full Shape (7th Fret)', desc: 'maj7add13 with open G and B strings, high root.', frets: [8, 7, 7, 0, 0, 8], fingers: [2, 1, 1, 0, 0, 2] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string maj7add13 voicing.', frets: [8, 0, 9, 0, 0, 0], fingers: [1, 0, 2, 0, 0, 0] },
            { name: 'Open Shape (8th Fret)', desc: 'maj7add13 with open A and D strings.', frets: [8, 0, 9, 0, 8, 0], fingers: [1, 0, 2, 0, 1, 0] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed maj7add13 chord.', frets: [8, 10, 9, 9, 10, 8], fingers: [1, 3, 2, 2, 4, 1] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string maj7add13 voicing higher up the neck.', frets: [8, 0, 10, 0, 0, 0], fingers: [1, 0, 2, 0, 0, 0] },
            { name: 'Open Shape (10th Fret)', desc: 'maj7add13 with open A and D strings.', frets: [8, 0, 9, 0, 10, 0], fingers: [1, 0, 2, 0, 3, 0] },
            { name: 'Open Shape (10th Fret Wide)', desc: 'maj7add13 with open D string.', frets: [8, 10, 9, 0, 10, 0], fingers: [1, 3, 2, 0, 3, 0] },
            { name: 'Full Shape (10th Fret)', desc: 'maj7add13 with open high E string.', frets: [8, 10, 9, 9, 10, 0], fingers: [1, 3, 2, 2, 3, 0] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position maj7add13 voicing.', frets: [8, 7, 5, 5, 0, 5], fingers: [3, 2, 1, 1, 0, 1] }
        ],
        'm7add13': [
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position m7add13 voicing.', frets: [-1, 3, 5, 3, 4, 5], fingers: [-1, 1, 3, 1, 2, 4] },
            { name: 'Full Shape (6th Fret)', desc: '6-string closed m7add13 chord.', frets: [8, 6, 7, 8, 8, 6], fingers: [3, 1, 2, 4, 4, 1] },
            { name: 'Open Shape (6th Fret)', desc: 'm7add13 with open A string.', frets: [8, 0, 7, 8, 8, 6], fingers: [3, 0, 2, 3, 3, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m7add13 chord, high root.', frets: [8, 10, 8, 8, 10, 8], fingers: [1, 2, 1, 1, 3, 1] },
            { name: 'Open Shape (5th Fret)', desc: 'm7add13 with open A string.', frets: [8, 0, 5, 8, 8, 6], fingers: [3, 0, 1, 3, 3, 2] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string m7add13 voicing.', frets: [8, 0, 8, 0, 8, 11], fingers: [1, 0, 1, 0, 1, 2] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed m7add13 chord, wide voicing.', frets: [8, 10, 8, 8, 10, 11], fingers: [1, 2, 1, 1, 3, 4] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string m7add13 voicing higher up the neck.', frets: [8, 0, 8, 0, 10, 11], fingers: [1, 0, 1, 0, 2, 3] },
            { name: 'Open Shape (10th Fret)', desc: 'm7add13 with open D string.', frets: [8, 10, 8, 0, 10, 11], fingers: [1, 2, 1, 0, 3, 4] },
            { name: 'Airy Shape (11th Fret)', desc: 'Open-string m7add13 voicing higher up the neck.', frets: [8, 0, 8, 0, 11, 11], fingers: [1, 0, 1, 0, 2, 2] },
            { name: 'Open Shape (11th Fret)', desc: 'm7add13 with open D string.', frets: [8, 0, 10, 0, 11, 11], fingers: [1, 0, 2, 0, 3, 3] }
        ],
        'm(maj7)add13': [
            { name: 'Compact Shape (1st Fret)', desc: 'm(maj7)add13 with open B string.', frets: [-1, 3, 1, 2, 0, 3], fingers: [-1, 3, 1, 2, 0, 3] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position m(maj7)add13 voicing.', frets: [-1, 3, 5, 4, 4, 5], fingers: [-1, 1, 3, 2, 2, 3] },
            { name: 'Open Shape (7th Fret)', desc: 'm(maj7)add13 with open A string.', frets: [8, 0, 7, 8, 8, 7], fingers: [2, 0, 1, 2, 2, 1] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string m(maj7)add13 voicing.', frets: [8, 6, 7, 0, 0, 8], fingers: [3, 1, 2, 0, 0, 3] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m(maj7)add13 chord.', frets: [8, 10, 9, 8, 10, 8], fingers: [1, 3, 2, 1, 4, 1] },
            { name: 'Airy Shape (5th Fret)', desc: 'Open-string m(maj7)add13 voicing.', frets: [8, 6, 7, 0, 0, 5], fingers: [4, 2, 3, 0, 0, 1] },
            { name: 'Airy Shape (5th Fret Wide)', desc: 'Open-string m(maj7)add13 voicing.', frets: [8, 0, 5, 8, 0, 5], fingers: [2, 0, 1, 2, 0, 1] },
            { name: 'Airy Shape (5th Fret High)', desc: 'Open-string m(maj7)add13 voicing higher up the neck.', frets: [8, 0, 5, 8, 0, 7], fingers: [3, 0, 1, 3, 0, 2] },
            { name: 'Open Shape (5th Fret)', desc: 'm(maj7)add13 with open A string.', frets: [8, 0, 5, 8, 8, 7], fingers: [3, 0, 1, 3, 3, 2] },
            { name: 'Airy Shape (5th Fret Widest)', desc: 'Open-string m(maj7)add13 voicing, wide.', frets: [8, 0, 5, 8, 0, 8], fingers: [2, 0, 1, 2, 0, 2] },
            { name: 'Full Shape (7th Fret)', desc: '6-string closed m(maj7)add13 chord.', frets: [8, 10, 7, 8, 8, 7], fingers: [2, 4, 1, 3, 3, 1] },
            { name: 'Open Shape (7th Fret High)', desc: 'm(maj7)add13 with open A string, high position.', frets: [8, 0, 10, 8, 8, 7], fingers: [2, 0, 3, 2, 2, 1] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string m(maj7)add13 voicing higher up the neck.', frets: [8, 0, 9, 0, 0, 11], fingers: [1, 0, 2, 0, 0, 3] },
            { name: 'Airy Shape (8th Fret High)', desc: 'Open-string m(maj7)add13 voicing, higher position.', frets: [8, 0, 10, 0, 0, 11], fingers: [1, 0, 2, 0, 0, 3] },
            { name: 'Open Shape (8th Fret)', desc: 'm(maj7)add13 with open D string.', frets: [8, 0, 9, 0, 10, 11], fingers: [1, 0, 2, 0, 3, 4] }
        ],
        '7b5': [
            { name: 'Open Shape (3rd Fret)', desc: '7b5 with open high E string.', frets: [-1, 3, 4, 3, 5, 0], fingers: [-1, 1, 2, 1, 3, 0] },
            { name: 'Open Shape (10th Fret)', desc: '7b5 with open high E string.', frets: [-1, -1, 10, 11, 11, 0], fingers: [-1, -1, 1, 2, 2, 0] },
            { name: 'Cluster Shape (10th Fret)', desc: 'Close-position 7b5 voicing.', frets: [-1, -1, 10, 11, 11, 12], fingers: [-1, -1, 1, 2, 2, 3] },
            { name: 'Open Shape (1st Fret)', desc: '7b5 with open high E string.', frets: [-1, 3, 4, 3, 1, 0], fingers: [-1, 2, 3, 2, 1, 0] },
            { name: 'Cluster Shape (2nd Fret)', desc: 'Close-position 7b5 voicing.', frets: [-1, 3, 2, 3, 5, 2], fingers: [-1, 2, 1, 3, 4, 1] },
            { name: 'Cluster Shape (3rd Fret Wide)', desc: 'Close-position 7b5 voicing.', frets: [-1, 3, 4, 3, 5, 6], fingers: [-1, 1, 2, 1, 3, 4] },
            { name: 'Cluster Shape (3rd Fret High)', desc: 'Close-position 7b5 voicing.', frets: [-1, 3, 4, 5, 5, 6], fingers: [-1, 1, 2, 3, 3, 4] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 7b5 chord.', frets: [8, 9, 8, 9, 11, 8], fingers: [1, 2, 1, 3, 4, 1] },
            { name: 'Open Shape (8th Fret)', desc: '7b5 with open high E string.', frets: [8, 9, 8, 9, 11, 0], fingers: [1, 2, 1, 3, 4, 0] },
            { name: 'Open Shape (8th Fret Wide)', desc: '7b5 with open high E string.', frets: [8, 9, 8, 11, 11, 0], fingers: [1, 2, 1, 3, 3, 0] },
            { name: 'Open Shape (8th Fret High)', desc: '7b5 with open high E string.', frets: [8, 9, 10, 11, 11, 0], fingers: [1, 2, 3, 4, 4, 0] },
            { name: 'Compact Shape (2nd Fret)', desc: '7b5 with muted A and B strings.', frets: [-1, 3, 2, 3, -1, 2], fingers: [-1, 2, 1, 2, -1, 1] },
            { name: 'Airy Shape (3rd Fret)', desc: '7b5 with open high E string, muted B string.', frets: [-1, 3, 4, 3, -1, 0], fingers: [-1, 1, 2, 1, -1, 0] },
            { name: 'Airy Shape (8th Fret)', desc: '7b5 with open high E string, muted B string.', frets: [8, 9, 8, 9, -1, 0], fingers: [1, 2, 1, 2, -1, 0] }
        ],
        'aug7': [
            { name: 'Open Shape (3rd Fret)', desc: 'aug7 with open high E string.', frets: [-1, 3, 6, 3, 5, 0], fingers: [-1, 1, 3, 1, 2, 0] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position aug7 voicing.', frets: [-1, 3, 6, 3, 5, 4], fingers: [-1, 1, 4, 1, 3, 2] },
            { name: 'Cluster Shape (3rd Fret Wide)', desc: 'Close-position aug7 voicing.', frets: [-1, 3, 6, 3, 5, 6], fingers: [-1, 1, 3, 1, 2, 4] },
            { name: 'Cluster Shape (3rd Fret High)', desc: 'Close-position aug7 voicing.', frets: [-1, 3, 6, 5, 5, 6], fingers: [-1, 1, 3, 2, 2, 3] },
            { name: 'Full Shape (6th Fret)', desc: '6-string closed aug7 chord.', frets: [8, 7, 6, 9, 9, 6], fingers: [3, 2, 1, 4, 4, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed aug7 chord.', frets: [8, 11, 8, 9, 9, 8], fingers: [1, 3, 1, 2, 2, 1] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed aug7 chord.', frets: [8, 11, 8, 9, 11, 8], fingers: [1, 3, 1, 2, 4, 1] },
            { name: 'Open Shape (8th Fret)', desc: 'aug7 with open high E string.', frets: [8, 11, 8, 9, 9, 0], fingers: [1, 3, 1, 2, 2, 0] },
            { name: 'Open Shape (8th Fret Wide)', desc: 'aug7 with open high E string.', frets: [8, 11, 8, 9, 11, 0], fingers: [1, 3, 1, 2, 4, 0] },
            { name: 'Open Shape (10th Fret)', desc: 'aug7 with open high E string.', frets: [-1, -1, 10, 13, 11, 0], fingers: [-1, -1, 1, 3, 2, 0] },
            { name: 'Cluster Shape (10th Fret)', desc: 'Close-position aug7 voicing.', frets: [-1, -1, 10, 13, 11, 12], fingers: [-1, -1, 1, 4, 2, 3] },
            { name: 'Compact Shape (2nd Fret)', desc: 'aug7 with muted A and B strings.', frets: [-1, 3, 2, 3, -1, 4], fingers: [-1, 2, 1, 2, -1, 3] },
            { name: 'Compact Shape (3rd Fret)', desc: 'aug7 with muted A and D strings.', frets: [-1, 3, -1, 3, 5, 4], fingers: [-1, 1, -1, 1, 3, 2] },
            { name: 'Compact Shape (6th Fret)', desc: 'aug7 with muted D and G strings.', frets: [8, 7, 6, -1, -1, 6], fingers: [3, 2, 1, -1, -1, 1] }
        ],
        'aug7b9': [
            { name: 'Compact Shape (8th Fret)', desc: 'aug7b9 with muted A string.', frets: [8, -1, 8, 9, 9, 9], fingers: [1, -1, 1, 2, 2, 2] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position aug7b9 voicing.', frets: [-1, 3, 6, 6, 5, 6], fingers: [-1, 1, 3, 3, 2, 3] },
            { name: 'Full Shape (6th Fret)', desc: '6-string closed aug7b9 chord.', frets: [8, 7, 6, 6, 9, 6], fingers: [3, 2, 1, 1, 4, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed aug7b9 chord.', frets: [8, 11, 11, 9, 11, 8], fingers: [1, 3, 3, 2, 4, 1] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed aug7b9 chord.', frets: [8, 11, 8, 9, 9, 9], fingers: [1, 3, 1, 2, 2, 2] },
            { name: 'Open Shape (8th Fret)', desc: 'aug7b9 with open high E string.', frets: [8, 11, 11, 9, 11, 0], fingers: [1, 3, 3, 2, 3, 0] },
            { name: 'Compact Shape (6th Fret)', desc: 'aug7b9 with muted B string.', frets: [8, 7, 6, 6, -1, 6], fingers: [3, 2, 1, 1, -1, 1] }
        ],
        'm7#5': [
            { name: 'Cluster Shape (1st Fret)', desc: 'Close-position m7#5 voicing.', frets: [-1, 3, 1, 3, 1, 4], fingers: [-1, 2, 1, 3, 1, 4] },
            { name: 'Cluster Shape (1st Fret Wide)', desc: 'Close-position m7#5 voicing.', frets: [-1, 3, 1, 3, 4, 4], fingers: [-1, 2, 1, 2, 3, 3] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position m7#5 voicing.', frets: [-1, 3, 6, 3, 4, 4], fingers: [-1, 1, 3, 1, 2, 2] },
            { name: 'Cluster Shape (3rd Fret Wide)', desc: 'Close-position m7#5 voicing.', frets: [-1, 3, 6, 3, 4, 6], fingers: [-1, 1, 3, 1, 2, 4] },
            { name: 'Full Shape (6th Fret)', desc: '6-string closed m7#5 chord.', frets: [8, 6, 6, 8, 9, 6], fingers: [2, 1, 1, 3, 4, 1] },
            { name: 'Full Shape (6th Fret Wide)', desc: '6-string closed m7#5 chord.', frets: [8, 6, 8, 8, 9, 6], fingers: [2, 1, 3, 3, 4, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m7#5 chord.', frets: [8, 11, 8, 8, 9, 8], fingers: [1, 3, 1, 1, 2, 1] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed m7#5 chord.', frets: [8, 11, 8, 8, 11, 8], fingers: [1, 2, 1, 1, 3, 1] },
            { name: 'Full Shape (8th Fret High)', desc: '6-string closed m7#5 chord.', frets: [8, 11, 10, 8, 11, 8], fingers: [1, 3, 2, 1, 4, 1] },
            { name: 'Full Shape (9th Fret)', desc: '6-string closed m7#5 chord.', frets: [8, 11, 8, 8, 9, 11], fingers: [1, 3, 1, 1, 2, 4] },
            { name: 'Full Shape (9th Fret Wide)', desc: '6-string closed m7#5 chord.', frets: [8, 11, 8, 8, 11, 11], fingers: [1, 2, 1, 1, 2, 2] },
            { name: 'Full Shape (9th Fret High)', desc: '6-string closed m7#5 chord.', frets: [8, 11, 10, 8, 11, 11], fingers: [1, 3, 2, 1, 4, 4] },
            { name: 'Cluster Shape (10th Fret)', desc: 'Close-position m7#5 voicing.', frets: [-1, -1, 10, 13, 11, 11], fingers: [-1, -1, 1, 3, 2, 2] },
            { name: 'Compact Shape (3rd Fret)', desc: 'm7#5 with muted G string.', frets: [-1, 3, -1, 3, 4, 4], fingers: [-1, 1, -1, 1, 2, 2] },
            { name: 'Compact Shape (6th Fret)', desc: 'm7#5 with muted B string.', frets: [8, 6, 6, 8, -1, 6], fingers: [2, 1, 1, 2, -1, 1] },
            { name: 'Compact Shape (5th Fret)', desc: 'm7#5 with muted B string.', frets: [8, 6, 6, 5, -1, 6], fingers: [3, 2, 2, 1, -1, 2] }
        ],
        'm7b9': [
            { name: 'Full Shape (6th Fret)', desc: '6-string closed m7b9 chord.', frets: [8, 6, 8, 6, 8, 6], fingers: [2, 1, 3, 1, 4, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m7b9 chord.', frets: [8, 10, 8, 8, 8, 9], fingers: [1, 3, 1, 1, 1, 2] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed m7b9 chord.', frets: [8, 10, 11, 8, 11, 8], fingers: [1, 2, 3, 1, 4, 1] },
            { name: 'Full Shape (9th Fret)', desc: '6-string closed m7b9 chord.', frets: [8, 10, 8, 8, 11, 9], fingers: [1, 3, 1, 1, 4, 2] },
            { name: 'Full Shape (9th Fret Wide)', desc: '6-string closed m7b9 chord.', frets: [8, 10, 10, 8, 11, 9], fingers: [1, 3, 3, 1, 4, 2] },
            { name: 'Full Shape (10th Fret)', desc: '6-string closed m7b9 chord.', frets: [8, 10, 11, 8, 11, 11], fingers: [1, 2, 3, 1, 4, 4] },
            { name: 'Open Shape (10th Fret)', desc: 'm7b9 with open D string.', frets: [8, 10, 11, 0, 11, 11], fingers: [1, 2, 3, 0, 3, 3] }
        ],
        '6sus4': [
            { name: 'Cluster Shape (1st Fret)', desc: 'Close-position 6sus4 voicing.', frets: [-1, 3, 3, 2, 1, 3], fingers: [-1, 3, 3, 2, 1, 3] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string 6sus4 voicing.', frets: [8, 0, 7, 0, 6, 8], fingers: [3, 0, 2, 0, 1, 3] },
            { name: 'Open Shape (6th Fret)', desc: '6sus4 with open G string.', frets: [8, 8, 7, 0, 6, 8], fingers: [3, 3, 2, 0, 1, 3] },
            { name: 'Open Shape (8th Fret)', desc: '6sus4 with open A string.', frets: [8, 0, 10, 10, 8, 8], fingers: [1, 0, 2, 2, 1, 1] },
            { name: 'Open Shape (8th Fret Wide)', desc: '6sus4 with open D string.', frets: [8, 8, 10, 0, 10, 8], fingers: [1, 1, 2, 0, 2, 1] },
            { name: 'Open Shape (3rd Fret)', desc: '6sus4 with open D string.', frets: [-1, 3, 3, 0, 6, 5], fingers: [-1, 1, 1, 0, 3, 2] },
            { name: 'Open Shape (3rd Fret Wide)', desc: '6sus4 with open D string.', frets: [-1, 3, 5, 0, 6, 5], fingers: [-1, 1, 2, 0, 3, 2] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position 6sus4 voicing.', frets: [-1, 3, 5, 5, 6, 5], fingers: [-1, 1, 2, 2, 3, 2] },
            { name: 'Open Shape (5th Fret)', desc: '6sus4 with open A string.', frets: [8, 0, 5, 5, 6, 5], fingers: [3, 0, 1, 1, 2, 1] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed 6sus4 chord.', frets: [8, 8, 5, 5, 6, 5], fingers: [3, 3, 1, 1, 2, 1] },
            { name: 'Airy Shape (5th Fret)', desc: 'Open-string 6sus4 voicing.', frets: [8, 0, 7, 0, 6, 5], fingers: [4, 0, 3, 0, 2, 1] },
            { name: 'Open Shape (5th Fret Wide)', desc: '6sus4 with open G string.', frets: [8, 8, 7, 0, 6, 5], fingers: [4, 4, 3, 0, 2, 1] }
        ],
        '6sus2': [
            { name: 'Open Shape (1st Fret)', desc: '6sus2 with open D string.', frets: [-1, 3, 0, 2, 1, 3], fingers: [-1, 3, 0, 2, 1, 3] },
            { name: 'Open Shape (2nd Fret)', desc: '6sus2 with open D string.', frets: [-1, 3, 0, 2, 3, 3], fingers: [-1, 2, 0, 1, 2, 2] },
            { name: 'Airy Shape (3rd Fret)', desc: 'Open-string 6sus2 voicing.', frets: [-1, 3, 0, 0, 3, 5], fingers: [-1, 1, 0, 0, 1, 2] },
            { name: 'Open Shape (3rd Fret Wide)', desc: '6sus2 with open G string.', frets: [-1, 3, 5, 0, 3, 5], fingers: [-1, 1, 2, 0, 1, 2] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position 6sus2 voicing.', frets: [-1, 3, 5, 5, 3, 5], fingers: [-1, 1, 2, 2, 1, 2] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string 6sus2 voicing.', frets: [8, 0, 0, 0, 8, 8], fingers: [1, 0, 0, 0, 1, 1] },
            { name: 'Open Shape (7th Fret)', desc: '6sus2 with open A and D strings.', frets: [8, 0, 0, 7, 8, 8], fingers: [2, 0, 0, 1, 2, 2] },
            { name: 'Open Shape (7th Fret Wide)', desc: '6sus2 with open A string.', frets: [8, 0, 7, 7, 8, 8], fingers: [2, 0, 1, 1, 2, 2] },
            { name: 'Airy Shape (8th Fret Wide)', desc: 'Open-string 6sus2 voicing.', frets: [8, 0, 0, 0, 10, 8], fingers: [1, 0, 0, 0, 2, 1] },
            { name: 'Open Shape (8th Fret)', desc: '6sus2 with open D and G strings.', frets: [8, 10, 0, 0, 10, 8], fingers: [1, 2, 0, 0, 2, 1] },
            { name: 'Airy Shape (8th Fret High)', desc: 'Open-string 6sus2 voicing.', frets: [8, 0, 0, 0, 8, 10], fingers: [1, 0, 0, 0, 1, 2] },
            { name: 'Open Shape (8th Fret High)', desc: '6sus2 with open A and G strings.', frets: [8, 0, 10, 0, 8, 10], fingers: [1, 0, 2, 0, 1, 2] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string 6sus2 voicing.', frets: [8, 0, 0, 0, 10, 10], fingers: [1, 0, 0, 0, 2, 2] },
            { name: 'Open Shape (10th Fret)', desc: '6sus2 with open A and G strings.', frets: [8, 0, 10, 0, 10, 10], fingers: [1, 0, 2, 0, 2, 2] }
        ],
        'dim': [
            { name: 'Cdim Shape', desc: 'Diminished triad.', frets: [-1, -1, 10, 8, 7, -1], fingers: [-1, -1, 3, 2, 1, -1] },
            { name: 'E Shape dim', desc: '6th string root diminished triad.', frets: [8, -1, -1, 8, 7, -1], fingers: [2, -1, -1, 3, 1, -1] },
            { name: 'A Shape dim', desc: '5th string root diminished triad.', frets: [-1, 3, 1, -1, -1, 2], fingers: [-1, 3, 1, -1, -1, 2] },
            { name: 'Thin Shape (1st Fret)', desc: 'Close-position dim voicing.', frets: [-1, 3, 1, -1, 1, 2], fingers: [-1, 3, 1, -1, 1, 2] },
            { name: 'Cluster Shape (2nd Fret)', desc: 'Close-position dim voicing.', frets: [-1, 3, 4, -1, 4, 2], fingers: [-1, 2, 3, -1, 3, 1] },
            { name: 'Airy Shape (10th Fret)', desc: 'Close-position dim voicing higher up the neck.', frets: [-1, -1, 10, 11, -1, 11], fingers: [-1, -1, 1, 2, -1, 2] },
            { name: 'Wide Shape (1st Fret)', desc: 'Close-position dim voicing.', frets: [-1, 3, 1, -1, 4, 2], fingers: [-1, 3, 1, -1, 4, 2] },
            { name: 'Full Shape (8th Fret)', desc: 'Wide-position dim voicing.', frets: [8, 9, 10, 8, -1, 11], fingers: [1, 2, 3, 1, -1, 4] }
        ],
        'dim7': [
            { name: 'Cdim7 Shape', desc: 'Symmetrical dim7.', frets: [-1, 3, 4, 2, 4, -1], fingers: [-1, 2, 3, 1, 4, -1] },
            { name: 'E Shape dim7', desc: '6th string root symmetrical dim7.', frets: [8, -1, 7, 8, 7, -1], fingers: [3, -1, 1, 4, 2, -1] },
            { name: 'D Shape dim7', desc: '4th string root symmetrical dim7.', frets: [-1, -1, 10, 11, 10, 11], fingers: [-1, -1, 1, 3, 2, 4] },
            { name: 'Open Shape (7th Fret)', desc: 'dim7 with open A string.', frets: [8, 0, 7, 8, 7, 8], fingers: [2, 0, 1, 3, 1, 4] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed dim7 chord.', frets: [8, 9, 10, 8, 10, 8], fingers: [1, 2, 3, 1, 4, 1] }
        ],
        'add9': [
            { name: 'Open Cadd9', desc: 'Standard acoustic Cadd9.', frets: [-1, 3, 2, 0, 3, 0], fingers: [-1, 2, 1, 0, 3, 0] },
            { name: 'E Shape add9 (No 5th)', desc: '6th string root, no barre needed.', frets: [8, -1, 0, 0, 5, -1], fingers: [2, -1, 0, 0, 1, -1] },
            { name: 'D Shape add9 (No 5th)', desc: '4th string root, no barre needed.', frets: [8, -1, 0, -1, 8, 0], fingers: [1, -1, 0, -1, 2, 0] },
            { name: 'Compact Shape (Nut)', desc: 'Open-position add9 voicing.', frets: [-1, 3, 0, 0, 1, 0], fingers: [-1, 2, 0, 0, 1, 0] },
            { name: 'Layer Shape (Nut)', desc: 'Open-position add9 voicing.', frets: [-1, 3, 0, 0, 3, 0], fingers: [-1, 1, 0, 0, 1, 0] },
            { name: 'Full Shape (3rd Fret)', desc: 'Add9 with the high E string fretted.', frets: [-1, 3, 2, 0, 3, 3], fingers: [-1, 2, 1, 0, 2, 2] },
            { name: 'Echo Shape (Nut)', desc: 'Add9 voicing with wide top.', frets: [-1, 3, 0, 0, 5, 3], fingers: [-1, 1, 0, 0, 2, 1] },
            { name: 'Echo Shape (Full)', desc: 'Add9 voicing with G string fretted.', frets: [-1, 3, 0, 5, 5, 3], fingers: [-1, 1, 0, 2, 2, 1] },
            { name: 'Reach Shape (Nut)', desc: 'Open-position add9 voicing with wide reach.', frets: [-1, 3, 5, 0, 3, 0], fingers: [-1, 1, 2, 0, 1, 0] },
            { name: 'Reach Shape (Full)', desc: 'Add9 voicing with G string fretted.', frets: [-1, 3, 5, 5, 3, 0], fingers: [-1, 1, 2, 2, 1, 0] },
            { name: 'Open Shape (Nut)', desc: 'Open-position add9 voicing.', frets: [-1, 3, 0, 0, 5, 0], fingers: [-1, 1, 0, 0, 2, 0] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string add9 voicing.', frets: [8, 7, 0, 0, 8, 0], fingers: [2, 1, 0, 0, 2, 0] },
            { name: 'Full Shape (8th Fret)', desc: 'Add9 voicing with doubled root.', frets: [8, 7, 0, 0, 8, 8], fingers: [2, 1, 0, 0, 2, 2] },
            { name: 'Open Shape (8th Fret)', desc: 'Add9 with open D string.', frets: [8, 10, 0, 9, 8, 8], fingers: [1, 3, 0, 2, 1, 1] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string add9 voicing.', frets: [8, 10, 0, 0, 8, 0], fingers: [1, 2, 0, 0, 1, 0] },
            { name: 'Open Shape (Wide)', desc: 'Add9 with open D and high E strings.', frets: [8, 10, 0, 9, 8, 0], fingers: [1, 3, 0, 2, 1, 0] },
            { name: 'Full Shape (10th Fret)', desc: '6-string closed add9 chord.', frets: [8, 10, 10, 9, 8, 10], fingers: [1, 3, 3, 2, 1, 4] },
            { name: 'Shell Shape (10th Fret)', desc: '4-note add9 shell higher up the neck.', frets: [-1, -1, 10, 9, 8, 10], fingers: [-1, -1, 3, 2, 1, 3] }
        ],
        'aug': [
            { name: 'Caug Shape', desc: 'Standard augmented triad.', frets: [-1, 3, 2, 1, 1, -1], fingers: [-1, 3, 2, 1, 1, -1] },
            { name: 'E Shape aug', desc: '6th string root augmented triad.', frets: [8, -1, -1, 9, 9, -1], fingers: [1, -1, -1, 2, 3, -1] },
            { name: 'D Shape aug', desc: '4th string root augmented triad.', frets: [-1, -1, 10, 9, 9, -1], fingers: [-1, -1, 3, 1, 2, -1] },
            { name: 'Open Shape (1st Fret)', desc: 'Augmented triad with open high E string.', frets: [-1, 3, 2, 1, 1, 0], fingers: [-1, 3, 2, 1, 1, 0] },
            { name: 'Cluster Shape (8th Fret)', desc: 'Close-position augmented triad.', frets: [-1, -1, 10, 9, 9, 8], fingers: [-1, -1, 3, 2, 2, 1] },
            { name: 'Open Shape (8th Fret)', desc: 'Augmented triad with open high E string.', frets: [8, -1, 10, 9, 9, 0], fingers: [1, -1, 3, 2, 2, 0] },
            { name: 'Airy Shape (9th Fret)', desc: 'Augmented triad with open high E string.', frets: [-1, -1, 10, 9, 9, 0], fingers: [-1, -1, 2, 1, 1, 0] },
            { name: 'Cluster Shape (1st Fret)', desc: 'Close-position augmented triad.', frets: [-1, 3, 2, 1, 1, 4], fingers: [-1, 3, 2, 1, 1, 4] },
            { name: 'Cluster Shape (2nd Fret)', desc: 'Close-position augmented triad.', frets: [-1, 3, 2, 5, 5, 4], fingers: [-1, 2, 1, 4, 4, 3] },
            { name: 'Open Shape (3rd Fret)', desc: 'Augmented triad with open high E string.', frets: [-1, 3, 6, 5, 5, 0], fingers: [-1, 1, 3, 2, 2, 0] },
            { name: 'Cluster Shape (3rd Fret Wide)', desc: 'Close-position augmented triad.', frets: [-1, 3, 6, 5, 5, 4], fingers: [-1, 1, 4, 3, 3, 2] },
            { name: 'Open Shape (5th Fret)', desc: 'Augmented triad with open high E string.', frets: [8, 7, 6, 5, 5, 0], fingers: [4, 3, 2, 1, 1, 0] },
            { name: 'Open Shape (6th Fret)', desc: 'Augmented triad with open high E string.', frets: [8, 7, 6, 9, 9, 0], fingers: [3, 2, 1, 4, 4, 0] },
            { name: 'Open Shape (7th Fret)', desc: 'Augmented triad with open high E string.', frets: [8, 7, 10, 9, 9, 0], fingers: [2, 1, 4, 3, 3, 0] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed augmented triad.', frets: [8, 11, 10, 9, 9, 8], fingers: [1, 4, 3, 2, 2, 1] },
            { name: 'Open Shape (8th Fret Wide)', desc: 'Augmented triad with open high E string.', frets: [8, 11, 10, 9, 9, 0], fingers: [1, 4, 3, 2, 2, 0] },
            { name: 'Cluster Shape (9th Fret)', desc: 'Close-position augmented triad.', frets: [-1, -1, 10, 9, 9, 12], fingers: [-1, -1, 2, 1, 1, 3] },
            { name: 'Compact Shape (2nd Fret)', desc: 'Augmented triad with muted G and B strings.', frets: [-1, 3, 2, -1, -1, 4], fingers: [-1, 2, 1, -1, -1, 3] },
            { name: 'Compact Shape (3rd Fret)', desc: 'Augmented triad with muted D string.', frets: [-1, 3, -1, 5, 5, 4], fingers: [-1, 1, -1, 3, 3, 2] }
        ],
        'm9': [
            { name: 'Cm9 Shape', desc: '', frets: [-1, 3, 1, 3, 3, 3], fingers: [-1, 3, 2, 1, 1, 1] },
            { name: 'E Shape m9 (No 5th)', desc: '6th string root jazz m9 shell.', frets: [8, 5, 8, 8, 8, -1], fingers: [3, 2, 1, 1, 1, -1] },
            { name: 'D Shape m9 (No 5th)', desc: '4th string root jazz m9 shell.', frets: [8, 10, 8, 8, -1, 10], fingers: [2, 3, 1, 1, -1, 4] },
            { name: 'Compact Shape (Nut)', desc: 'Open-position m9 voicing.', frets: [-1, 3, 0, 3, 4, 3], fingers: [-1, 1, 0, 2, 3, 2] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string m9 voicing higher up the neck.', frets: [8, 6, 0, 0, 8, 6], fingers: [3, 1, 0, 0, 4, 2] },
            { name: 'Open Shape (6th Fret)', desc: 'm9 voicing with open D string.', frets: [8, 6, 0, 8, 8, 6], fingers: [2, 1, 0, 3, 4, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m9 chord.', frets: [8, 10, 8, 8, 8, 10], fingers: [1, 4, 1, 1, 1, 4] },
            { name: 'Airy Shape (Nut)', desc: 'Open-position m9 voicing with muted low E.', frets: [-1, 3, 0, 0, 4, 6], fingers: [-1, 1, 0, 0, 2, 4] },
            { name: 'Spread Shape (5th Fret)', desc: 'Wide-interval m9 voicing.', frets: [8, 5, 5, 8, 8, 6], fingers: [3, 1, 1, 4, 4, 2] },
            { name: 'Spread Shape (Open D)', desc: 'Wide-interval m9 with open D string.', frets: [8, 5, 0, 8, 8, 6], fingers: [3, 1, 0, 4, 4, 2] },
            { name: 'Full Shape (10th Fret)', desc: '6-string closed m9 chord higher up the neck.', frets: [8, 10, 8, 8, 11, 10], fingers: [1, 2, 1, 1, 4, 3] },
            { name: 'Cluster Shape (10th Fret)', desc: 'Close-position m9 voicing.', frets: [8, 10, 10, 8, 11, 10], fingers: [1, 2, 2, 1, 4, 3] },
            { name: 'Spread Shape (10th Fret)', desc: 'Wide-interval m9 voicing higher up the neck.', frets: [8, 10, 0, 8, 11, 11], fingers: [1, 2, 0, 1, 3, 3] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string m9 voicing higher up the neck.', frets: [8, 10, 0, 0, 11, 11], fingers: [1, 2, 0, 0, 3, 3] }
        ],
        '11': [
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string 11th voicing.', frets: [8, 7, 0, 0, 6, 6], fingers: [3, 2, 0, 0, 1, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 11th chord.', frets: [8, 8, 8, 9, 8, 10], fingers: [1, 1, 1, 2, 1, 3] },
            { name: 'Spread Shape (5th Fret)', desc: 'Wide-interval 11th voicing with open strings.', frets: [8, 5, 8, 0, 6, 0], fingers: [3, 1, 3, 0, 2, 0] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string 11th voicing.', frets: [8, 8, 0, 0, 5, 6], fingers: [3, 3, 0, 0, 1, 2] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position 11th voicing.', frets: [8, 8, 5, 7, 5, 6], fingers: [4, 4, 1, 3, 1, 2] },
            { name: 'Open Shape (8th Fret)', desc: '11th voicing with open D string.', frets: [8, 8, 0, 9, 8, 6], fingers: [2, 2, 0, 3, 2, 1] },
            { name: 'Shell Shape (10th Fret)', desc: '4-note 11th shell higher up the neck.', frets: [8, 8, 0, 0, 11, 0], fingers: [1, 1, 0, 0, 2, 0] },
            { name: 'Shell Shape (Full G)', desc: '11th shell with added D string.', frets: [8, 10, 0, 10, 11, 0], fingers: [1, 2, 0, 2, 3, 0] }
        ],
        'm11': [
            { name: 'Cm11 Shape', desc: '', frets: [8, 8, 0, 8, 8, 6], fingers: [1, 1, 0, 3, 4, 2] },
            { name: 'A Shape m11 (No 5th/9th)', desc: '5th string root jazz m11 shell.', frets: [8, 8, 8, 8, 8, 10], fingers: [1, 1, 1, 1, 1, 2] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string m11 voicing.', frets: [8, 6, 0, 0, 6, 6], fingers: [2, 1, 0, 0, 1, 1] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position m11 voicing.', frets: [8, 5, 5, 8, 6, 6], fingers: [3, 1, 1, 3, 2, 2] },
            { name: 'Shell Shape (8th Fret)', desc: '4-note m11 shell higher up the neck.', frets: [8, 8, 0, 0, 11, 11], fingers: [1, 1, 0, 0, 2, 2] },
            { name: 'Shell Shape (Full G)', desc: 'm11 shell with added D string.', frets: [8, 10, 0, 10, 11, 11], fingers: [1, 2, 0, 2, 3, 3] }
        ],
        'maj11': [
            { name: 'Cmaj11 Shape', desc: '', frets: [8, 8, 9, 7, 8, 0], fingers: [1, 1, 4, 2, 3, 0] },
            { name: 'D Shape maj11 (No 3rd/5th)', desc: '4th string root jazz maj11 shell.', frets: [8, 7, 0, 0, 6, 7], fingers: [4, 2, 0, 0, 1, 3] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string maj11 voicing.', frets: [8, 8, 0, 0, 0, 0], fingers: [1, 1, 0, 0, 0, 0] },
            { name: 'Open Shape (8th Fret)', desc: 'Wide maj11 voicing with open high strings.', frets: [8, 10, 0, 10, 0, 0], fingers: [1, 2, 0, 2, 0, 0] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed maj11 chord.', frets: [8, 8, 9, 9, 8, 10], fingers: [1, 1, 2, 2, 1, 3] },
            { name: 'Open Shape (Wide)', desc: 'Wide maj11 voicing with open high strings.', frets: [8, 8, 5, 7, 0, 0], fingers: [3, 3, 1, 2, 0, 0] },
            { name: 'Airy Shape (Wide)', desc: 'Open-string maj11 voicing.', frets: [8, 8, 0, 0, 5, 7], fingers: [3, 3, 0, 0, 1, 2] },
            { name: 'Cluster Shape (5th Fret)', desc: 'Close-position maj11 voicing.', frets: [8, 8, 5, 7, 5, 7], fingers: [4, 4, 1, 2, 1, 3] }
        ],
        '13': [
            { name: 'C13 Shape', desc: '', frets: [8, 0, 0, 0, 11, 0], fingers: [1, 0, 0, 0, 2, 0] },
            { name: 'A Shape 13 (No 5th/9th)', desc: '5th string root jazz 13th shell.', frets: [8, 0, 0, 0, 5, 6], fingers: [3, 0, 0, 0, 1, 2] },
            { name: 'D Shape 13 (No 5th/9th)', desc: '4th string root jazz 13th shell.', frets: [8, 7, 7, 7, 8, 6], fingers: [3, 1, 1, 1, 4, 2] }
        ],
        'm13': [
            { name: 'Cm13 Shape', desc: '', frets: [8, 0, 8, 8, 8, 10], fingers: [2, 0, 1, 1, 1, 3] },
            { name: 'A Shape m13 (No 5th/9th)', desc: '5th string root jazz m13 shell.', frets: [8, 0, 0, 8, 8, 6], fingers: [2, 0, 0, 3, 4, 1] },
            { name: 'D Shape m13 (No 5th/9th)', desc: '4th string root jazz m13 shell.', frets: [8, 5, 8, 8, 8, 5], fingers: [4, 2, 1, 1, 1, 3] }
        ],
        'maj13': [
            { name: 'Cmaj13 Shape', desc: '', frets: [8, 0, 0, 0, 5, 7], fingers: [3, 0, 0, 0, 1, 2] },
            { name: 'E Shape maj13 (No 5th/9th)', desc: '6th string root jazz maj13 shell.', frets: [8, 0, 0, 0, 0, 0], fingers: [1, 0, 0, 0, 0, 0] },
            { name: 'D Shape maj13 (No 5th/9th)', desc: '4th string root jazz maj13 shell.', frets: [8, 7, 7, 7, 8, 7], fingers: [3, 1, 1, 1, 4, 2] }
        ],
        '7sus4': [
            { name: 'C7sus4 Shape', desc: '', frets: [-1, 3, 5, 3, 6, -1], fingers: [-1, 1, 3, 1, 4, -1] },
            { name: 'E Shape 7sus4 (No 5th)', desc: '6th string root jazz 7sus4 shell.', frets: [8, 8, 8, -1, 8, 6], fingers: [1, 1, 1, -1, 1, 2] },
            { name: 'D Shape 7sus4 (No 5th)', desc: '4th string root jazz 7sus4 shell.', frets: [8, -1, -1, 0, 6, 6], fingers: [3, -1, -1, 0, 1, 2] },
            { name: 'Open Shape (6th Fret)', desc: '7sus4 with open D string.', frets: [8, 8, 8, 0, 6, 6], fingers: [2, 2, 2, 0, 1, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 7sus4 chord.', frets: [8, 10, 8, 10, 8, 8], fingers: [1, 2, 1, 3, 1, 1] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position 7sus4 voicing.', frets: [-1, 3, 3, 3, 6, 3], fingers: [-1, 1, 1, 1, 2, 1] },
            { name: 'Cluster Shape (3rd Fret Wide)', desc: 'Close-position 7sus4 voicing.', frets: [-1, 3, 5, 3, 6, 3], fingers: [-1, 1, 2, 1, 3, 1] },
            { name: 'Cluster Shape (3rd Fret High)', desc: 'Close-position 7sus4 voicing.', frets: [-1, 3, 5, 3, 6, 6], fingers: [-1, 1, 2, 1, 3, 3] },
            { name: 'Open Shape (3rd Fret)', desc: '7sus4 with open D string.', frets: [-1, 3, 3, 0, 6, 6], fingers: [-1, 1, 1, 0, 2, 2] },
            { name: 'Open Shape (3rd Fret Wide)', desc: '7sus4 with open D string.', frets: [-1, 3, 5, 0, 6, 6], fingers: [-1, 1, 2, 0, 3, 3] },
            { name: 'Cluster Shape (3rd Fret Widest)', desc: 'Close-position 7sus4 voicing.', frets: [-1, 3, 5, 5, 6, 6], fingers: [-1, 1, 2, 2, 3, 3] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed 7sus4 chord.', frets: [8, 8, 5, 5, 6, 6], fingers: [3, 3, 1, 1, 2, 2] },
            { name: 'Open Shape (5th Fret)', desc: '7sus4 with open D string.', frets: [8, 8, 5, 0, 6, 6], fingers: [3, 3, 1, 0, 2, 2] },
            { name: 'Full Shape (5th Fret Wide)', desc: '6-string closed 7sus4 chord.', frets: [8, 8, 5, 5, 8, 6], fingers: [3, 3, 1, 1, 3, 2] },
            { name: 'Open Shape (5th Fret Wide)', desc: '7sus4 with open D string.', frets: [8, 8, 5, 0, 8, 6], fingers: [3, 3, 1, 0, 3, 2] },
            { name: 'Open Shape (8th Fret)', desc: '7sus4 with open D string.', frets: [8, 8, 10, 0, 11, 8], fingers: [1, 1, 2, 0, 3, 1] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed 7sus4 chord.', frets: [8, 10, 8, 10, 11, 8], fingers: [1, 2, 1, 3, 4, 1] },
            { name: 'Full Shape (8th Fret High)', desc: '6-string closed 7sus4 chord.', frets: [8, 10, 10, 10, 11, 8], fingers: [1, 2, 2, 2, 3, 1] },
            { name: 'Open Shape (10th Fret)', desc: '7sus4 with open D string.', frets: [-1, -1, 10, 0, 11, 13], fingers: [-1, -1, 1, 0, 2, 3] }
        ],
        'maj7sus4': [
            { name: 'Thin Shape (1st Fret)', desc: 'maj7sus4 with open G and B strings.', frets: [-1, 3, 3, 0, 0, 1], fingers: [-1, 2, 2, 0, 0, 1] },
            { name: 'Open Shape (3rd Fret)', desc: 'maj7sus4 with open G and B strings.', frets: [-1, 3, 3, 0, 0, 3], fingers: [-1, 1, 1, 0, 0, 1] },
            { name: 'Airy Shape (3rd Fret)', desc: 'maj7sus4 with open B string.', frets: [-1, 3, 3, 4, 0, 3], fingers: [-1, 1, 1, 2, 0, 1] },
            { name: 'Wide Shape (3rd Fret)', desc: 'maj7sus4 with open B string.', frets: [-1, 3, 3, 5, 0, 3], fingers: [-1, 1, 1, 2, 0, 1] },
            { name: 'Open Shape (7th Fret)', desc: 'maj7sus4 with open G and B strings.', frets: [8, 8, 9, 0, 0, 7], fingers: [2, 2, 3, 0, 0, 1] },
            { name: 'Compact Shape (8th Fret)', desc: 'maj7sus4 with open G and B strings.', frets: [8, 8, 9, 0, 0, 8], fingers: [1, 1, 2, 0, 0, 1] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed maj7sus4 chord.', frets: [8, 8, 9, 10, 8, 8], fingers: [1, 1, 2, 3, 1, 1] },
            { name: 'Stretched Shape (8th Fret)', desc: '6-string closed maj7sus4 chord.', frets: [8, 10, 9, 10, 8, 8], fingers: [1, 3, 2, 4, 1, 1] },
            { name: 'Bright Shape (8th Fret)', desc: 'maj7sus4 with open G and B strings.', frets: [8, 8, 10, 0, 0, 8], fingers: [1, 1, 2, 0, 0, 1] },
            { name: 'Barre Shape (8th Fret)', desc: 'maj7sus4 with open B string.', frets: [8, 10, 10, 10, 0, 8], fingers: [1, 2, 2, 2, 0, 1] },
            { name: 'Layered Shape (1st Fret)', desc: 'Close-position maj7sus4 voicing.', frets: [-1, 3, 3, 4, 1, 3], fingers: [-1, 2, 2, 3, 1, 2] },
            { name: 'Extended Shape (3rd Fret)', desc: 'Close-position maj7sus4 voicing.', frets: [-1, 3, 3, 4, 6, 3], fingers: [-1, 1, 1, 2, 3, 1] },
            { name: 'Spread Shape (3rd Fret)', desc: 'Close-position maj7sus4 voicing.', frets: [-1, 3, 5, 4, 6, 3], fingers: [-1, 1, 3, 2, 4, 1] },
            { name: 'Mixed Shape (5th Fret)', desc: 'maj7sus4 with open B string.', frets: [8, 8, 5, 5, 0, 7], fingers: [3, 3, 1, 1, 0, 2] },
            { name: 'Light Shape (5th Fret)', desc: 'maj7sus4 with open G and B strings.', frets: [8, 8, 5, 0, 0, 7], fingers: [3, 3, 1, 0, 0, 2] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed maj7sus4 chord.', frets: [8, 8, 5, 5, 6, 7], fingers: [4, 4, 1, 1, 2, 3] }
        ],
        '7sus2': [
            { name: 'Thin Shape (1st Fret)', desc: '7sus2 with open D string.', frets: [-1, 3, 0, 3, 1, 3], fingers: [-1, 2, 0, 2, 1, 2] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'Close-position 7sus2 voicing.', frets: [-1, 3, 5, 3, 3, 3], fingers: [-1, 1, 2, 1, 1, 1] },
            { name: 'Airy Shape (6th Fret)', desc: '7sus2 with open D and G strings.', frets: [8, -1, 0, 0, 8, 6], fingers: [2, -1, 0, 0, 2, 1] },
            { name: 'Open Shape (6th Fret)', desc: '7sus2 with open D string.', frets: [8, -1, 0, 7, 8, 6], fingers: [3, -1, 0, 2, 3, 1] },
            { name: 'Airy Shape (10th Fret)', desc: '7sus2 with open G string.', frets: [-1, -1, 10, 0, 11, 10], fingers: [-1, -1, 1, 0, 2, 1] },
            { name: 'Cluster Shape (10th Fret)', desc: 'Close-position 7sus2 voicing higher up the neck.', frets: [-1, -1, 10, 12, 11, 10], fingers: [-1, -1, 1, 3, 2, 1] },
            { name: 'Wide Shape (3rd Fret)', desc: 'Close-position 7sus2 voicing.', frets: [-1, 3, 5, 3, 3, 6], fingers: [-1, 1, 2, 1, 1, 3] },
            { name: 'Open Shape (3rd Fret)', desc: '7sus2 with open D and G strings.', frets: [-1, 3, 0, 0, 3, 6], fingers: [-1, 1, 0, 0, 1, 2] },
            { name: 'Open Shape (3rd Fret Wide)', desc: '7sus2 with open G string.', frets: [-1, 3, 5, 0, 3, 6], fingers: [-1, 1, 2, 0, 1, 3] },
            { name: 'Cluster Shape (3rd Fret Wide)', desc: 'Close-position 7sus2 voicing.', frets: [-1, 3, 5, 5, 3, 6], fingers: [-1, 1, 2, 2, 1, 3] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed 7sus2 chord.', frets: [8, 5, 5, 5, 8, 6], fingers: [3, 1, 1, 1, 3, 2] },
            { name: 'Open Shape (5th Fret)', desc: '7sus2 with open G string.', frets: [8, 5, 5, 0, 8, 6], fingers: [3, 1, 1, 0, 3, 2] },
            { name: 'Open Shape (5th Fret Wide)', desc: '7sus2 with open D and G strings.', frets: [8, 5, 0, 0, 8, 6], fingers: [3, 1, 0, 0, 3, 2] },
            { name: 'Open Shape (8th Fret)', desc: '7sus2 with open D and G strings.', frets: [8, 10, 0, 0, 11, 8], fingers: [1, 2, 0, 0, 3, 1] },
            { name: 'Full Shape (8th Fret)', desc: '7sus2 with open G string.', frets: [8, 10, 8, 0, 11, 10], fingers: [1, 2, 1, 0, 4, 3] },
            { name: 'Open Shape (8th Fret Wide)', desc: '7sus2 with open D and G strings.', frets: [8, 10, 0, 0, 11, 10], fingers: [1, 2, 0, 0, 3, 2] }
        ],
        'maj7sus2': [
            { name: 'Thin Shape (3rd Fret)', desc: 'maj7sus2 with open D, G, and B strings.', frets: [-1, 3, 0, 0, 0, 3], fingers: [-1, 1, 0, 0, 0, 1] },
            { name: 'Open Shape (3rd Fret)', desc: 'maj7sus2 with open D and B strings.', frets: [-1, 3, 0, 4, 0, 3], fingers: [-1, 1, 0, 2, 0, 1] },
            { name: 'Cluster Shape (3rd Fret)', desc: 'maj7sus2 with open D string.', frets: [-1, 3, 0, 4, 3, 3], fingers: [-1, 1, 0, 2, 1, 1] },
            { name: 'Wide Shape (3rd Fret)', desc: 'Close-position maj7sus2 voicing.', frets: [-1, 3, 5, 4, 3, 3], fingers: [-1, 1, 3, 2, 1, 1] },
            { name: 'Open Shape (3rd Fret Wide)', desc: 'maj7sus2 with open D and B strings.', frets: [-1, 3, 0, 5, 0, 3], fingers: [-1, 1, 0, 2, 0, 1] },
            { name: 'Airy Shape (7th Fret)', desc: 'maj7sus2 with open D, G, and B strings.', frets: [8, -1, 0, 0, 0, 7], fingers: [2, -1, 0, 0, 0, 1] },
            { name: 'Open Shape (7th Fret)', desc: 'maj7sus2 with open D and G strings.', frets: [8, -1, 0, 0, 8, 7], fingers: [2, -1, 0, 0, 2, 1] },
            { name: 'Open Shape (7th Fret Wide)', desc: 'maj7sus2 with open D string.', frets: [8, -1, 0, 7, 8, 7], fingers: [2, -1, 0, 1, 2, 1] },
            { name: 'Thin Shape (8th Fret)', desc: 'maj7sus2 with open D, G, and B strings.', frets: [8, -1, 0, 0, 0, 8], fingers: [1, -1, 0, 0, 0, 1] },
            { name: 'Open Shape (8th Fret)', desc: 'maj7sus2 with open D, G, and B strings.', frets: [8, 10, 0, 0, 0, 8], fingers: [1, 2, 0, 0, 0, 1] },
            { name: 'Open Shape (8th Fret Wide)', desc: 'maj7sus2 with open D, G, and B strings.', frets: [8, 10, 0, 0, 0, 10], fingers: [1, 2, 0, 0, 0, 2] },
            { name: 'Full Shape (8th Fret)', desc: 'maj7sus2 with open D and G strings.', frets: [8, 10, 9, 0, 0, 10], fingers: [1, 3, 2, 0, 0, 3] },
            { name: 'Cluster Shape (8th Fret)', desc: 'maj7sus2 with open D and G strings.', frets: [8, 10, 10, 0, 0, 10], fingers: [1, 2, 2, 0, 0, 2] },
            { name: 'Airy Shape (10th Fret)', desc: 'maj7sus2 with open G and B strings.', frets: [-1, -1, 10, 0, 0, 10], fingers: [-1, -1, 1, 0, 0, 1] },
            { name: 'Cluster Shape (10th Fret)', desc: 'maj7sus2 with open B string.', frets: [-1, -1, 10, 12, 0, 10], fingers: [-1, -1, 1, 2, 0, 1] },
            { name: 'Cluster Shape (10th Fret Wide)', desc: 'maj7sus2 with open G string.', frets: [-1, -1, 10, 0, 12, 10], fingers: [-1, -1, 1, 0, 2, 1] }
        ],
        '6/9': [
            { name: 'C6/9 Shape', desc: '', frets: [-1, 3, 2, 0, 3, 5], fingers: [-1, 2, 1, 0, 3, 4] },
            { name: 'E Shape 6/9 (No 5th)', desc: '6th string root, no barre needed.', frets: [8, 0, 0, 0, 5, -1], fingers: [2, 0, 0, 0, 1, -1] },
            { name: 'D Shape 6/9 (No 5th)', desc: '4th string root, no barre needed.', frets: [8, 0, 0, 0, -1, 0], fingers: [1, 0, 0, 0, -1, 0] },
            { name: 'Full Shape (3rd Fret)', desc: 'Closed 6/9 voicing.', frets: [-1, 3, 2, 2, 3, 3], fingers: [-1, 2, 1, 1, 2, 2] },
            { name: 'Airy Shape (Nut)', desc: 'Open-string 6/9 voicing.', frets: [-1, 3, 0, 0, 5, 5], fingers: [-1, 1, 0, 0, 2, 2] },
            { name: 'Airy Shape (8th Fret)', desc: 'Open-string 6/9 voicing.', frets: [8, 0, 0, 0, 8, 0], fingers: [1, 0, 0, 0, 1, 0] },
            { name: 'Open Shape (8th Fret)', desc: '6/9 with open A and G strings.', frets: [8, 0, 0, 7, 8, 0], fingers: [2, 0, 0, 1, 2, 0] },
            { name: 'Open Shape (Wide)', desc: '6/9 with open A string.', frets: [8, 0, 7, 7, 8, 0], fingers: [2, 0, 1, 1, 2, 0] },
            { name: 'Full Shape (8th Fret, Open E)', desc: '6/9 with open high E string.', frets: [8, 7, 7, 7, 8, 0], fingers: [2, 1, 1, 1, 2, 0] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 6/9 chord.', frets: [8, 7, 7, 7, 8, 8], fingers: [2, 1, 1, 1, 2, 2] },
            { name: 'Open Shape (8th Fret, D)', desc: '6/9 with open A and D strings.', frets: [8, 0, 0, 9, 8, 0], fingers: [1, 0, 0, 2, 1, 0] },
            { name: 'Open Shape (D, Full)', desc: '6/9 with open A and D strings, doubled root.', frets: [8, 0, 0, 9, 8, 8], fingers: [1, 0, 0, 2, 1, 1] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string 6/9 voicing higher up the neck.', frets: [8, 0, 0, 0, 10, 0], fingers: [1, 0, 0, 0, 2, 0] },
            { name: 'Open Shape (10th Fret)', desc: '6/9 with open D and high E strings.', frets: [8, 10, 0, 0, 10, 0], fingers: [1, 2, 0, 0, 2, 0] },
            { name: 'Open Shape (Full 10th)', desc: '6/9 with open D string.', frets: [8, 10, 0, 9, 10, 0], fingers: [1, 3, 0, 2, 3, 0] },
            { name: 'Spread Shape (8th Fret)', desc: 'Wide-interval 6/9 voicing.', frets: [8, 0, 0, 9, 8, 10], fingers: [1, 0, 0, 2, 1, 3] },
            { name: 'Full Shape (10th Fret)', desc: '6-string closed 6/9 chord higher up the neck.', frets: [8, 10, 0, 9, 10, 10], fingers: [1, 3, 0, 2, 3, 3] },
            { name: 'Reach Shape (Nut)', desc: 'Open-position 6/9 voicing with wide reach.', frets: [-1, 3, 5, 2, 3, 0], fingers: [-1, 2, 3, 1, 2, 0] },
            { name: 'Echo Shape (Nut)', desc: 'Open-position 6/9 voicing.', frets: [-1, 3, 0, 2, 5, 3], fingers: [-1, 2, 0, 1, 3, 2] }
        ],
        '7b9': [
            { name: 'C7b9 Shape', desc: '', frets: [8, 7, 5, 6, -1, 6], fingers: [4, 3, 2, 1, -1, 1] },
            { name: 'E Shape 7b9 (No 5th)', desc: '6th string root jazz 7b9 shell.', frets: [8, -1, 8, 6, 8, 0], fingers: [2, -1, 3, 1, 4, 0] },
            { name: 'D Shape 7b9 (No 5th/7th)', desc: '4th string root jazz 7b9 shell.', frets: [8, -1, 8, 9, 8, 9], fingers: [1, -1, 1, 2, 1, 3] },
            { name: 'Open Shape (2nd Fret)', desc: '7b9 with open high E string.', frets: [-1, 3, 5, 3, 2, 0], fingers: [-1, 2, 3, 2, 1, 0] },
            { name: 'Open Shape (8th Fret)', desc: '7b9 with open D and high E strings.', frets: [8, 10, 11, 0, 11, 0], fingers: [1, 2, 3, 0, 3, 0] }
        ],
        '7#9': [
            { name: 'C7#9 Shape', desc: '', frets: [8, 6, -1, 0, 5, 6], fingers: [4, 2, -1, 0, 1, 3] },
            { name: 'E Shape 7#9 (No 5th)', desc: '6th string root jazz 7#9 shell (Hendrix chord).', frets: [8, 6, 5, -1, 5, 6], fingers: [4, 2, 1, -1, 1, 3] },
            { name: 'D Shape 7#9 (No 5th/7th)', desc: '4th string root jazz 7#9 shell (Hendrix chord).', frets: [8, -1, 8, 8, 8, 0], fingers: [1, -1, 1, 1, 1, 0] },
            { name: 'Open Shape (3rd Fret)', desc: '7#9 with open high E string.', frets: [-1, 3, 5, 3, 4, 0], fingers: [-1, 1, 3, 1, 2, 0] },
            { name: 'Open Shape (6th Fret)', desc: '7#9 with open G and high E strings.', frets: [8, 6, 8, 0, 8, 0], fingers: [2, 1, 2, 0, 2, 0] },
            { name: 'Open Shape (8th Fret)', desc: '7#9 with open high E string.', frets: [8, 10, 8, 8, 8, 0], fingers: [1, 2, 1, 1, 1, 0] },
            { name: 'Open Shape (5th Fret)', desc: '7#9 with open G and high E strings.', frets: [8, 6, 8, 0, 5, 0], fingers: [3, 2, 3, 0, 1, 0] },
            { name: 'Full Shape (5th Fret)', desc: '6-string closed 7#9 chord.', frets: [8, 6, 5, 5, 5, 6], fingers: [3, 2, 1, 1, 1, 2] },
            { name: 'Open Shape (8th Fret Wide)', desc: '7#9 with open high E string.', frets: [8, 10, 8, 8, 11, 0], fingers: [1, 2, 1, 1, 3, 0] },
            { name: 'Open Shape (8th Fret High)', desc: '7#9 with open high E string.', frets: [8, 10, 10, 8, 11, 0], fingers: [1, 2, 2, 1, 3, 0] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed 7#9 chord.', frets: [8, 10, 8, 9, 8, 11], fingers: [1, 3, 1, 2, 1, 4] },
            { name: 'Full Shape (8th Fret Wide)', desc: '6-string closed 7#9 chord.', frets: [8, 10, 8, 9, 11, 11], fingers: [1, 3, 1, 2, 4, 4] },
            { name: 'Full Shape (8th Fret High)', desc: '6-string closed 7#9 chord.', frets: [8, 10, 10, 9, 11, 11], fingers: [1, 3, 3, 2, 4, 4] }
        ],
        'm(maj7)': [
            { name: 'Open Shape (Nut)', desc: 'Low-position minor-major 7th voicing.', frets: [-1, 3, 1, 0, 0, 3], fingers: [-1, 3, 1, 0, 0, 3] },
            { name: 'Reach Shape (Nut)', desc: 'Open-position voicing with a stretch on the G string.', frets: [-1, 3, 1, 4, 1, 3], fingers: [-1, 2, 1, 4, 1, 3] },
            { name: 'Reach Shape (Open B)', desc: 'Reach shape with the B string left open.', frets: [-1, 3, 1, 4, 0, 3], fingers: [-1, 3, 1, 4, 0, 3] },
            { name: 'Reach Shape (Doubled Eb)', desc: 'Reach shape with the B string fretted instead of open.', frets: [-1, 3, 1, 4, 4, 3], fingers: [-1, 3, 1, 4, 4, 3] },
            { name: 'Cm(maj7) Shape', desc: '', frets: [-1, 3, 5, 4, 4, 3], fingers: [-1, 1, 4, 2, 3, 1] },
            { name: 'Spread Shape (5th Fret)', desc: 'Wide low-position voicing.', frets: [8, 6, 5, 5, 0, 7], fingers: [4, 2, 1, 1, 0, 3] },
            { name: 'Spread Shape (Open B)', desc: 'Spread shape with the D string voicing the root.', frets: [8, 6, 5, 0, 0, 7], fingers: [4, 2, 1, 0, 0, 3] },
            { name: 'Spread Shape (High Root)', desc: 'Spread shape with the root doubled on the high E string.', frets: [8, 6, 5, 5, 0, 8], fingers: [4, 2, 1, 1, 0, 4] },
            { name: 'Spread Shape (Open, High Root)', desc: 'Spread shape with the root doubled and the G string left out.', frets: [8, 6, 5, 0, 0, 8], fingers: [4, 2, 1, 0, 0, 4] },
            { name: 'Angular Shape (6th Fret)', desc: 'Wide voicing built on the D string.', frets: [8, 6, 9, 0, 0, 7], fingers: [3, 1, 4, 0, 0, 2] },
            { name: 'Angular Shape (High Root)', desc: 'Angular shape with the root doubled on the high E string.', frets: [8, 6, 9, 0, 0, 8], fingers: [3, 1, 4, 0, 0, 3] },
            { name: 'E Shape mM7 (8th Fret)', desc: 'Full 6-string E-shape minor-major 7th barre.', frets: [8, 10, 9, 8, 8, 8], fingers: [1, 3, 2, 1, 1, 1] },
            { name: 'E Shape m(maj7) (No 5th)', desc: '6th string root jazz shell voicing.', frets: [8, -1, -1, 0, 0, 11], fingers: [1, -1, -1, 0, 0, 2] },
            { name: 'D Shape m(maj7) (No 5th)', desc: '4th string root jazz shell voicing.', frets: [8, -1, 9, 8, 8, 8], fingers: [2, -1, 3, 1, 1, 1] },
            { name: 'Shell Shape (10th Fret)', desc: '3-note high-position shell.', frets: [-1, -1, 10, 0, 0, 11], fingers: [-1, -1, 1, 0, 0, 2] },
            { name: 'Shell Shape (Full G)', desc: 'Shell shape with the G string fretted instead of open.', frets: [-1, -1, 10, 12, 0, 11], fingers: [-1, -1, 1, 4, 0, 2] },
            { name: 'Shell Shape (High B)', desc: 'Shell shape with the B string fretted instead of open.', frets: [-1, -1, 10, 0, 12, 11], fingers: [-1, -1, 1, 0, 4, 2] },
            { name: 'Shell Shape (Full)', desc: 'Shell shape with the G and B strings both fretted.', frets: [-1, -1, 10, 12, 12, 11], fingers: [-1, -1, 1, 4, 4, 2] }
        ],
        'm(add9)': [
            { name: 'Cm(add9) Shape', desc: '', frets: [-1, 3, 1, 0, 3, -1], fingers: [-1, 3, 1, 0, 4, -1] },
            { name: 'E Shape m(add9) (No 5th)', desc: '6th string root, no barre needed.', frets: [8, 5, -1, 8, 8, 8], fingers: [3, 2, -1, 1, 1, 1] },
            { name: 'D Shape m(add9) (No 5th)', desc: '4th string root, no barre needed.', frets: [8, 6, 0, 0, -1, -1], fingers: [2, 1, 0, 0, -1, -1] },
            { name: 'Compact Shape (3rd Fret)', desc: 'Open-position m(add9) voicing.', frets: [-1, 3, 1, 0, 3, 3], fingers: [-1, 2, 1, 0, 2, 2] },
            { name: 'Layer Shape (3rd Fret)', desc: 'Open-position m(add9) voicing.', frets: [-1, 3, 0, 0, 4, 3], fingers: [-1, 1, 0, 0, 2, 1] },
            { name: 'Layer Shape (Full)', desc: 'm(add9) voicing with G string fretted.', frets: [-1, 3, 0, 5, 4, 3], fingers: [-1, 1, 0, 3, 2, 1] },
            { name: 'Airy Shape (6th Fret)', desc: 'Open-string m(add9) voicing.', frets: [8, 6, 0, 0, 8, 8], fingers: [2, 1, 0, 0, 2, 2] },
            { name: 'Open Shape (6th Fret)', desc: 'm(add9) with open D string.', frets: [8, 6, 0, 7, 8, 8], fingers: [3, 1, 0, 2, 3, 3] },
            { name: 'Spread Shape (8th Fret)', desc: 'Wide-interval m(add9) voicing.', frets: [8, 10, 0, 8, 8, 10], fingers: [1, 2, 0, 1, 1, 2] },
            { name: 'Full Shape (8th Fret)', desc: '6-string closed m(add9) chord.', frets: [8, 10, 10, 8, 8, 10], fingers: [1, 2, 2, 1, 1, 2] },
            { name: 'Shell Shape (8th Fret)', desc: '4-note m(add9) shell higher up the neck.', frets: [-1, -1, 10, 8, 8, 10], fingers: [-1, -1, 2, 1, 1, 2] },
            { name: 'Cluster Shape (6th Fret)', desc: 'Close-position m(add9) voicing.', frets: [8, 6, 0, 5, 8, 8], fingers: [3, 2, 0, 1, 3, 3] },
            { name: 'Spread Shape (10th Fret)', desc: 'Wide-interval m(add9) voicing higher up the neck.', frets: [8, 10, 0, 8, 8, 11], fingers: [1, 2, 0, 1, 1, 3] },
            { name: 'Airy Shape (10th Fret)', desc: 'Open-string m(add9) voicing higher up the neck.', frets: [8, 10, 0, 0, 8, 11], fingers: [1, 2, 0, 0, 1, 3] }
        ]
    },
    'D': {
        'Major': [
            { name: 'Open D Shape', desc: 'Standard acoustic open D.', frets: [-1, -1, 0, 2, 3, 2], fingers: [-1, -1, 0, 1, 3, 2] },
            { name: 'A-String Root (2nd Fret)', desc: 'Root on the A string, open D ringing.', frets: [-1, 5, 0, 2, 3, 2], fingers: [-1, 4, 0, 1, 2, 1] },
            { name: 'A-String Root (Full)', desc: 'A-string root with the D string fretted.', frets: [-1, 5, 4, 2, 3, 2], fingers: [-1, 4, 3, 1, 2, 1] },
            { name: 'Spread Shape (4th Fret)', desc: 'Wide voicing spanning the 4th to 7th frets.', frets: [-1, 5, 4, 7, 7, 5], fingers: [-1, 2, 1, 4, 4, 3] },
            { name: 'A Shape (5th Fret, Open D)', desc: 'A-shape barre with the open D string as the 5th.', frets: [-1, 5, 0, 7, 7, 5], fingers: [-1, 1, 0, 3, 4, 2] },
            { name: 'A Shape (5th Fret, Top 4)', desc: 'Top-4 string A-shape voicing.', frets: [-1, -1, 0, 7, 7, 5], fingers: [-1, -1, 0, 3, 4, 1] },
            { name: 'A Shape (5th Fret)', desc: 'Full 5-string A-shape barre.', frets: [-1, 5, 7, 7, 7, 5], fingers: [-1, 1, 2, 3, 4, 1] },
            { name: 'Octave Shape (7th Fret)', desc: '6th-string root with the open-style top octave.', frets: [10, 0, 7, 7, 7, 10], fingers: [3, 0, 1, 1, 1, 4] },
            { name: 'Octave Shape (Full)', desc: '7th-position voicing with the A string fretted.', frets: [10, 9, 7, 7, 7, 10], fingers: [3, 2, 1, 1, 1, 4] },
            { name: 'Octave Shape (Open Top)', desc: '6th-string root, open A and D strings.', frets: [10, 0, 0, 7, 7, 10], fingers: [3, 0, 0, 1, 1, 4] },
            { name: 'Wide Shape (7th Fret)', desc: 'Spread voicing with the open D string.', frets: [10, 9, 0, 7, 10, 10], fingers: [3, 2, 0, 1, 4, 4] },
            { name: 'Wide Shape (Full)', desc: 'Full 7th-position spread voicing.', frets: [10, 9, 7, 7, 10, 10], fingers: [3, 2, 1, 1, 4, 4] },
            { name: 'E Shape (10th, Open)', desc: 'E-shape barre with open A and D strings.', frets: [10, 0, 0, 11, 10, 10], fingers: [1, 0, 0, 3, 2, 2] },
            { name: 'E Shape (10th, A Root)', desc: 'E-shape with the A string doubling the 5th.', frets: [10, 12, 0, 11, 10, 10], fingers: [1, 4, 0, 3, 2, 2] },
            { name: 'E Shape (10th, D Root)', desc: 'E-shape with the D string fretted, A open.', frets: [10, 0, 12, 11, 10, 10], fingers: [1, 0, 4, 3, 2, 2] },
            { name: 'E Shape (10th Fret)', desc: 'Full 6-string E-shape barre.', frets: [10, 12, 12, 11, 10, 10], fingers: [1, 3, 4, 2, 1, 1] }
        ],
        'm': [
            { name: 'Open Dm Shape', desc: 'Standard open D minor.', frets: [-1, -1, 0, 2, 3, 1], fingers: [-1, -1, 0, 2, 3, 1] },
            { name: 'A Shape (5th Fret, Open D)', desc: 'A-shape minor with the open D string.', frets: [-1, 5, 0, 7, 6, 5], fingers: [-1, 1, 0, 4, 3, 2] },
            { name: 'A Shape (5th Fret, Top 4)', desc: 'Top-4 string A-shape minor voicing.', frets: [-1, -1, 0, 7, 6, 5], fingers: [-1, -1, 0, 3, 2, 1] },
            { name: 'Octave Shape (7th Fret)', desc: '6th-string root with the open D string.', frets: [10, 8, 0, 7, 10, 10], fingers: [3, 2, 0, 1, 4, 4] },
            { name: 'Shell Shape (10th Fret)', desc: 'Top-3 string minor triad barre.', frets: [-1, -1, 0, 10, 10, 10], fingers: [-1, -1, 0, 1, 1, 1] },
            { name: 'E Shape (10th, Open)', desc: '6th-string root, open A and D strings.', frets: [10, 0, 0, 10, 10, 13], fingers: [1, 0, 0, 2, 3, 4] },
            { name: 'Reach Shape (10th Fret)', desc: 'Top-3 string voicing with the b3 up top.', frets: [-1, -1, 0, 10, 10, 13], fingers: [-1, -1, 0, 1, 1, 4] },
            { name: 'E Shape (10th, A Root)', desc: 'E-shape minor with the A string doubling the 5th.', frets: [10, 12, 0, 10, 10, 13], fingers: [1, 4, 0, 2, 3, 4] },
            { name: 'E Shape (10th, D Root)', desc: 'E-shape minor with the D string fretted, A open.', frets: [10, 0, 12, 10, 10, 13], fingers: [1, 0, 4, 2, 3, 4] },
            { name: 'E Shape (10th Fret)', desc: 'Full 6-string E-shape minor barre.', frets: [10, 12, 12, 10, 10, 13], fingers: [1, 4, 4, 2, 3, 4] }
        ],
        'm7': [
            { name: 'Open Dm7 Shape', desc: 'Easy open minor 7th.', frets: [-1, -1, 0, 2, 1, 1], fingers: [-1, -1, 0, 2, 1, 1] },
            { name: 'A-Root (5th Fret)', desc: 'A-string root, upper structure.', frets: [-1, 5, 0, 5, 6, 5], fingers: [-1, 1, 0, 2, 4, 3] },
            { name: 'D-Root (5th Fret)', desc: 'Open D root, top voicing.', frets: [-1, -1, 0, 5, 6, 5], fingers: [-1, -1, 0, 1, 2, 1] },
            { name: 'E Shape (7th Fret)', desc: '6th-string root, open A string.', frets: [10, 0, 7, 10, 10, 8], fingers: [3, 0, 1, 4, 4, 2] },
            { name: 'Shell (8th Fret)', desc: 'Top-4 string shell voicing.', frets: [-1, -1, 0, 10, 10, 8], fingers: [-1, -1, 0, 2, 3, 1] },
            { name: 'E Shape Open (8th Fret)', desc: '6th-string root, open A and D.', frets: [10, 0, 0, 10, 10, 8], fingers: [2, 0, 0, 3, 4, 1] },
            { name: 'E Shape (8th Fret)', desc: 'Full 6th-string root voicing.', frets: [10, 8, 0, 10, 10, 8], fingers: [3, 1, 0, 4, 4, 2] }
        ],
        '5': [
            { name: 'Open D5', desc: 'Fat sounding open power chord.', frets: [-1, -1, 0, 2, 3, -1], fingers: [-1, -1, 0, 1, 3, -1] }
        ],
        'sus2': [
            { name: 'Open Dsus2', desc: 'Dreamy open suspended 2.', frets: [-1, -1, 0, 2, 3, 0], fingers: [-1, -1, 0, 1, 3, 0] },
            { name: 'Compact (2nd Fret)', desc: 'A-string root, no 5th.', frets: [-1, 5, 2, 2, 3, 0], fingers: [-1, 3, 1, 1, 2, 0] },
            { name: 'A-Root (2nd Fret)', desc: 'A-string root with the open shell.', frets: [-1, 5, 0, 2, 3, 0], fingers: [-1, 3, 0, 1, 2, 0] },
            { name: 'Compact Full (2nd Fret)', desc: 'A-string root, 5th doubled up top.', frets: [-1, 5, 2, 2, 5, 0], fingers: [-1, 2, 1, 1, 3, 0] },
            { name: 'D-Root (2nd Fret)', desc: 'Open D root, wide voicing.', frets: [-1, -1, 0, 2, 5, 0], fingers: [-1, -1, 0, 1, 2, 0] },
            { name: 'A-Root Wide (2nd Fret)', desc: 'A-string root, wide voicing.', frets: [-1, 5, 0, 2, 5, 0], fingers: [-1, 2, 0, 1, 3, 0] },
            { name: 'Compact (2nd, High E)', desc: 'A-string root, high E added.', frets: [-1, 5, 2, 2, 3, 5], fingers: [-1, 3, 1, 1, 2, 4] },
            { name: 'Compact Full (2nd, High E)', desc: 'A-string root, wide with high E.', frets: [-1, 5, 2, 2, 5, 5], fingers: [-1, 2, 1, 1, 3, 4] },
            { name: 'A-Root (5th Fret)', desc: 'A-string root, upper structure.', frets: [-1, 5, 0, 7, 5, 5], fingers: [-1, 1, 0, 4, 2, 3] },
            { name: 'D-Root (5th Fret)', desc: 'Open D root, top voicing.', frets: [-1, -1, 0, 7, 5, 5], fingers: [-1, -1, 0, 2, 1, 1] },
            { name: 'E Shape (5th Fret)', desc: 'A-string root, full voicing.', frets: [-1, 5, 7, 7, 5, 5], fingers: [-1, 1, 2, 3, 1, 1] },
            { name: 'E Shape (5th, Open E)', desc: 'A-string root, open high E.', frets: [-1, 5, 7, 7, 5, 0], fingers: [-1, 1, 2, 3, 1, 0] },
            { name: 'Shell (9th Fret)', desc: 'Top-3 string sus2 shell.', frets: [-1, -1, 0, 9, 10, 0], fingers: [-1, -1, 0, 1, 2, 0] },
            { name: 'E Shape Open (9th Fret)', desc: '6th-string root, open A/D strings.', frets: [10, 0, 0, 9, 10, 0], fingers: [2, 0, 0, 1, 3, 0] },
            { name: 'Shell Full (9th Fret)', desc: 'Top-3 string sus2 shell, high E fretted.', frets: [-1, -1, 0, 9, 10, 10], fingers: [-1, -1, 0, 1, 2, 3] }
        ],
        'sus4': [
            { name: 'Open Dsus4', desc: 'Resolved to D major commonly.', frets: [-1, -1, 0, 2, 3, 3], fingers: [-1, -1, 0, 1, 3, 4] },
            { name: 'Open Shell (3rd Fret)', desc: 'Open D and G, 5th on top.', frets: [-1, -1, 0, 0, 3, 5], fingers: [-1, -1, 0, 0, 1, 2] },
            { name: 'A-Root (3rd Fret)', desc: 'A-string root with the open shell.', frets: [-1, 5, 0, 0, 3, 5], fingers: [-1, 2, 0, 0, 1, 3] },
            { name: 'A-Root Full (3rd Fret)', desc: 'A-string root, D string fretted.', frets: [-1, 5, 5, 0, 3, 5], fingers: [-1, 2, 3, 0, 1, 4] },
            { name: 'Compact (2nd Fret)', desc: 'A-string root, no 5th.', frets: [-1, 5, 0, 2, 3, 3], fingers: [-1, 4, 0, 1, 2, 3] },
            { name: 'E Shape (8th Fret)', desc: '6th-string root, open A/D/G strings.', frets: [10, 0, 0, 0, 8, 10], fingers: [2, 0, 0, 0, 1, 3] },
            { name: 'E Shape (10th Fret)', desc: '6th-string root, open A/D/G strings.', frets: [10, 0, 0, 0, 10, 10], fingers: [1, 0, 0, 0, 2, 3] },
            { name: 'E Shape (10th, A Root)', desc: '6th-string root with the A string fretted.', frets: [10, 12, 0, 0, 10, 10], fingers: [1, 4, 0, 0, 2, 3] },
            { name: 'E Shape (10th, D Root)', desc: '6th-string root with the D string fretted.', frets: [10, 0, 12, 0, 10, 10], fingers: [1, 0, 4, 0, 2, 3] },
            { name: 'E Shape (10th, A+D Root)', desc: '6th-string root, A and D both fretted.', frets: [10, 12, 12, 0, 10, 10], fingers: [1, 4, 4, 0, 2, 3] },
            { name: 'E Shape (10th, G Root)', desc: '6th-string root with the G string fretted.', frets: [10, 0, 0, 12, 10, 10], fingers: [1, 0, 0, 4, 2, 3] },
            { name: 'E Shape (10th, A+G Root)', desc: '6th-string root, A and G both fretted.', frets: [10, 12, 0, 12, 10, 10], fingers: [1, 4, 0, 4, 2, 3] },
            { name: 'E Shape Barre (10th Fret)', desc: 'Full 6-string movable sus4 barre.', frets: [10, 10, 12, 12, 10, 10], fingers: [1, 1, 2, 3, 1, 1] },
            { name: 'E Shape (10th, D+G Root)', desc: '6th-string root, D and G both fretted.', frets: [10, 0, 12, 12, 10, 10], fingers: [1, 0, 4, 4, 2, 3] },
            { name: 'E Shape Full (10th Fret)', desc: 'Full 6th-string root, all strings fretted.', frets: [10, 12, 12, 12, 10, 10], fingers: [1, 2, 3, 4, 1, 1] }
        ],
        '7': [
            { name: 'Open D7 Shape', desc: 'Folksy dominant 7th.', frets: [-1, -1, 0, 2, 1, 2], fingers: [-1, -1, 0, 2, 1, 3] },
            { name: 'Compact (4th Fret)', desc: 'A-string root, no 5th.', frets: [-1, 5, 4, 5, -1, 5], fingers: [-1, 2, 1, 3, -1, 4] },
            { name: 'A-Root (5th Fret)', desc: 'A-string root with the b7 on top.', frets: [-1, 5, 0, 5, 7, 5], fingers: [-1, 1, 0, 2, 4, 3] },
            { name: 'D-Root (5th Fret)', desc: 'Open D root, upper structure.', frets: [-1, -1, 0, 5, 7, 5], fingers: [-1, -1, 0, 1, 2, 1] },
            { name: 'E Shape (7th Fret)', desc: '6th-string root, open A/D strings.', frets: [10, 0, 0, 7, 7, 8], fingers: [3, 0, 0, 1, 1, 2] },
            { name: 'E Shape Full (7th Fret)', desc: '6th-string root with the b7 on the D string.', frets: [10, 0, 10, 7, 7, 8], fingers: [3, 0, 4, 1, 1, 2] },
            { name: 'E Shape (7th, D top)', desc: '6th-string root, D doubled on top.', frets: [10, 0, 10, 7, 7, 10], fingers: [2, 0, 3, 1, 1, 4] },
            { name: 'Shell (8th Fret)', desc: 'Top-4 string 7th shell voicing.', frets: [-1, -1, 0, 11, 10, 8], fingers: [-1, -1, 0, 3, 2, 1] },
            { name: 'E Shape (8th Fret)', desc: '6th-string root, open A/D strings.', frets: [10, 0, 0, 11, 10, 8], fingers: [2, 0, 0, 4, 3, 1] },
            { name: 'E Shape (8th, no G)', desc: '6th-string root, muted G string.', frets: [10, 9, 0, -1, 10, 8], fingers: [3, 2, 0, -1, 4, 1] }
        ],
        'maj7': [
            { name: 'Open Dmaj7 Shape', desc: 'Lush major 7th open.', frets: [-1, -1, 0, 2, 2, 2], fingers: [-1, -1, 0, 1, 1, 1] },
            { name: 'Open+ (2nd Fret)', desc: 'Open Dmaj7 with the A-string root added.', frets: [-1, 5, 0, 2, 2, 2], fingers: [-1, 2, 0, 1, 1, 1] },
            { name: 'A-Root (5th Fret)', desc: 'A-string root, upper structure.', frets: [-1, 5, 0, 6, 7, 5], fingers: [-1, 1, 0, 3, 4, 2] },
            { name: 'D-Root (5th Fret)', desc: 'Open D root, top voicing.', frets: [-1, -1, 0, 6, 7, 5], fingers: [-1, -1, 0, 2, 3, 1] },
            { name: 'E Shape (7th Fret)', desc: '6th-string root, open A string.', frets: [10, 0, 7, 7, 7, 9], fingers: [3, 0, 1, 1, 1, 2] },
            { name: 'E Shape Full (7th Fret)', desc: 'Full 6th-string root barre.', frets: [10, 9, 7, 7, 7, 9], fingers: [4, 2, 1, 1, 1, 3] },
            { name: 'E Shape Open (7th Fret)', desc: '6th-string root, open A and D.', frets: [10, 0, 0, 7, 7, 9], fingers: [3, 0, 0, 1, 1, 2] },
            { name: 'D Shape (9th Fret)', desc: '4th-string root, top-4 voicing.', frets: [-1, -1, 12, 11, 10, 9], fingers: [-1, -1, 4, 3, 2, 1] }
        ],
        'm(maj7)': [
            { name: 'Shell (5th Fret)', desc: 'Top-3 string m(maj7) shell.', frets: [-1, -1, 0, 6, 6, 5], fingers: [-1, -1, 0, 2, 3, 1] },
            { name: 'A-Root (5th Fret)', desc: 'A-string root, upper structure.', frets: [-1, 5, 7, 6, 6, 5], fingers: [-1, 1, 4, 2, 3, 1] },
            { name: 'Shell (9th Fret)', desc: 'Top-3 string m(maj7) shell.', frets: [-1, -1, 0, 10, 10, 9], fingers: [-1, -1, 0, 2, 3, 1] },
            { name: 'E Shape Open (9th Fret)', desc: '6th-string root, open A/D strings.', frets: [10, 0, 0, 10, 10, 9], fingers: [2, 0, 0, 3, 4, 1] },
            { name: 'E Shape (8th Fret)', desc: '6th-string root voicing.', frets: [10, 8, 0, 10, 10, 9], fingers: [3, 1, 0, 4, 4, 2] },
            { name: 'Compact (2nd Fret)', desc: 'A-string root, no 5th.', frets: [-1, 5, 3, 2, 2, 5], fingers: [-1, 4, 2, 1, 1, 3] },
            { name: 'Jazz Shell (3rd Fret)', desc: 'Wide top-4 string voicing.', frets: [-1, 5, 3, 6, 3, 5], fingers: [-1, 2, 1, 4, 1, 3] },
            { name: 'Jazz Shape (3rd Fret)', desc: 'Full top-4 string voicing.', frets: [-1, 5, 3, 6, 6, 5], fingers: [-1, 2, 1, 3, 3, 4] },
            { name: 'E Shape (7th Fret)', desc: '6th-string root, open A string.', frets: [10, 0, 7, 10, 10, 9], fingers: [2, 0, 1, 3, 3, 4] },
            { name: 'E Shape Full (9th Fret)', desc: 'Full 6th-string root barre.', frets: [10, 12, 0, 10, 10, 9], fingers: [3, 4, 0, 1, 1, 2] },
            { name: 'Shell (9th, Top)', desc: 'Top-3 string shell, D-string root.', frets: [-1, -1, 12, 10, 10, 9], fingers: [-1, -1, 4, 2, 2, 1] },
            { name: 'E Shape (9th, D Root)', desc: '6th-string root with the D string fretted.', frets: [10, 0, 12, 10, 10, 9], fingers: [1, 0, 4, 2, 2, 1] },
            { name: 'E Shape Full (9th, A+D Root)', desc: 'Full 6th-string root, D and A both fretted.', frets: [10, 12, 12, 10, 10, 9], fingers: [2, 4, 4, 1, 1, 3] },
            { name: 'E Shape (10th Fret)', desc: 'Full 6-string movable barre.', frets: [10, 12, 11, 10, 10, 13], fingers: [1, 3, 2, 1, 1, 4] }
        ],
        '6': [
            { name: 'Open D6 Shape', desc: 'Sweet vintage 6th, open position.', frets: [-1, -1, 0, 2, 0, 2], fingers: [-1, -1, 0, 1, 0, 2] },
            { name: 'Compact (2nd Fret)', desc: 'A-string root, no 5th.', frets: [-1, 5, 0, 2, 0, 2], fingers: [-1, 3, 0, 1, 0, 2] },
            { name: 'A-Root (2nd Fret)', desc: 'A-string root, full voicing.', frets: [-1, 5, 4, 2, 0, 2], fingers: [-1, 3, 2, 1, 0, 2] },
            { name: 'A-Root Wide (2nd Fret)', desc: 'A-string root, wide voicing.', frets: [-1, 5, 4, 2, 0, 5], fingers: [-1, 2, 1, 1, 0, 3] },
            { name: 'A-Root (3rd Fret)', desc: 'A-string root, closed voicing.', frets: [-1, 5, 4, 4, 3, 5], fingers: [-1, 3, 1, 1, 1, 4] },
            { name: 'A-Root (4th Fret)', desc: 'A-string root, open B string.', frets: [-1, 5, 4, 4, 0, 5], fingers: [-1, 3, 1, 1, 0, 4] },
            { name: 'A-Root Full (4th Fret)', desc: 'A-string root, 6th on top.', frets: [-1, 5, 4, 7, 0, 5], fingers: [-1, 2, 1, 4, 0, 3] },
            { name: 'E Shape (10th Fret)', desc: '6th-string root, open B string.', frets: [10, 0, 0, 11, 0, 10], fingers: [2, 0, 0, 3, 0, 1] },
            { name: 'E Shape (10th, A Root)', desc: '6th-string root, A string fretted.', frets: [10, 12, 0, 11, 0, 10], fingers: [2, 4, 0, 3, 0, 1] },
            { name: 'E Shape (10th, D Root)', desc: '6th-string root, D string fretted.', frets: [10, 0, 12, 11, 0, 10], fingers: [2, 0, 4, 3, 0, 1] },
            { name: 'E Shape (10th, B Root)', desc: '6th-string root, B string fretted.', frets: [10, 0, 0, 11, 12, 10], fingers: [2, 0, 0, 3, 4, 1] },
            { name: 'E Shape Full (10th Fret)', desc: 'Full 6th-string root voicing.', frets: [10, 12, 12, 11, 12, 10], fingers: [1, 3, 3, 2, 4, 1] },
            { name: 'Shell (12th Fret)', desc: 'Top-3 string 6th shell.', frets: [-1, -1, 12, 14, 12, 14], fingers: [-1, -1, 1, 3, 1, 4] },
            { name: 'D-Root Shell (12th Fret)', desc: 'Open D, top-2 string voicing.', frets: [-1, -1, 0, 14, 12, 14], fingers: [-1, -1, 0, 2, 1, 3] },
            { name: 'Shell Open B (12th Fret)', desc: 'Top-3 string, open B string.', frets: [-1, -1, 12, 14, 0, 14], fingers: [-1, -1, 1, 3, 0, 4] },
            { name: 'D-Root Shell (14th Fret)', desc: 'Open D and B, top voicing.', frets: [-1, -1, 0, 14, 0, 14], fingers: [-1, -1, 0, 1, 0, 2] }
        ],
        'add9': [
            { name: 'Open Dadd9', desc: 'Beautiful open ringing strings.', frets: [-1, -1, 0, 2, 5, 2], fingers: [-1, -1, 0, 1, 4, 1] },
            { name: 'A Shape (2nd Fret)', desc: '5th-string root, open D string.', frets: [-1, 5, 0, 2, 5, 2], fingers: [-1, 2, 0, 1, 3, 1] },
            { name: 'A Shape (5th Fret)', desc: '5th-string root, open high E string.', frets: [-1, 5, 7, 7, 7, 0], fingers: [-1, 1, 2, 3, 4, 0] },
            { name: 'E Shape (10th, Open A/Top)', desc: '6th-string root, open A and high E strings.', frets: [10, 0, 12, 11, 10, 0], fingers: [1, 0, 4, 3, 2, 0] },
            { name: 'D Shape (10th, Open Top)', desc: '4th-string root, open high E string.', frets: [-1, -1, 12, 11, 10, 0], fingers: [-1, -1, 3, 2, 1, 0] },
            { name: 'E Shape (10th Fret)', desc: '6th-string root, full voicing.', frets: [10, 12, 12, 11, 10, 0], fingers: [1, 3, 3, 2, 1, 0] },
            { name: 'E Shape (10th, Open A/D)', desc: '6th-string root, open A and D strings.', frets: [10, 0, 0, 11, 10, 12], fingers: [1, 0, 0, 3, 2, 4] },
            { name: 'D Shape (10th, Open D)', desc: '4th-string root, open D string.', frets: [-1, -1, 0, 11, 10, 12], fingers: [-1, -1, 0, 2, 1, 3] },
            { name: 'E Shape (10th, Full)', desc: '6th-string root, closed 6-string voicing.', frets: [10, 12, 12, 11, 10, 12], fingers: [1, 3, 3, 2, 1, 4] }
        ],
        'aug': [
            { name: 'Daug Shape', desc: 'Tense augmented passing chord.', frets: [-1, -1, 0, 3, 3, 2], fingers: [-1, -1, 0, 2, 3, 1] }
        ],
        'maj7add13': [
            { name: 'Open Dmaj7add13 Shape', desc: 'Open-position maj7add13 voicing.', frets: [-1, 5, 4, 6, 0, 5], fingers: [-1, 2, 1, 4, 0, 3] }
        ],
        'm7add13': [
            { name: 'Open Dm7add13 Shape', desc: 'Open-position m7add13 voicing.', frets: [-1, 5, 3, 5, 0, 5], fingers: [-1, 2, 1, 3, 0, 4] }
        ],
        'm(maj7)add13': [
            { name: 'Open Dm(maj7)add13 Shape', desc: 'Open-position m(maj7)add13 voicing.', frets: [-1, 5, 3, 6, 0, 5], fingers: [-1, 2, 1, 4, 0, 3] }
        ],
        '7b5': [
            { name: 'Open D7b5 Shape', desc: 'Open-position 7b5 voicing.', frets: [-1, -1, 0, 1, 1, 2], fingers: [-1, -1, 0, 1, 1, 2] }
        ],
        'aug7': [
            { name: 'Open Daug7 Shape', desc: 'Open-position aug7 voicing.', frets: [-1, -1, 0, 3, 1, 2], fingers: [-1, -1, 0, 3, 1, 2] }
        ],
        'aug7b9': [
            { name: 'Open Daug7b9 Shape', desc: 'Open-position aug7b9 voicing.', frets: [-1, 5, 4, 5, 4, 6], fingers: [-1, 2, 1, 3, 1, 4] }
        ],
        'm7#5': [
            { name: 'Open Dm7#5 Shape', desc: 'Open-position m7#5 voicing.', frets: [-1, -1, 0, 3, 1, 1], fingers: [-1, -1, 0, 2, 1, 1] }
        ],
        'm7b9': [
            { name: 'Open Dm7b9 Shape', desc: 'Open-position m7b9 voicing.', frets: [10, 8, -1, 8, 10, 8], fingers: [2, 1, -1, 1, 3, 1] }
        ],
        '6sus4': [
            { name: 'Open D6sus4 Shape', desc: 'Open-position 6sus4 voicing.', frets: [-1, -1, 0, 2, 0, 3], fingers: [-1, -1, 0, 1, 0, 2] }
        ],
        '6sus2': [
            { name: 'Open D6sus2 Shape', desc: 'Open-position 6sus2 voicing.', frets: [-1, -1, 0, 2, 0, 0], fingers: [-1, -1, 0, 1, 0, 0] }
        ],
        'maj7sus4': [
            { name: 'Open Dmaj7sus4 Shape', desc: 'Open-position maj7sus4 voicing.', frets: [-1, -1, 0, 0, 2, 5], fingers: [-1, -1, 0, 0, 1, 2] }
        ],
        '7sus2': [
            { name: 'Open D7sus2 Shape', desc: 'Open-position 7sus2 voicing.', frets: [-1, -1, 0, 2, 1, 0], fingers: [-1, -1, 0, 2, 1, 0] }
        ],
        'maj7sus2': [
            { name: 'Open Dmaj7sus2 Shape', desc: 'Open-position maj7sus2 voicing.', frets: [-1, -1, 0, 2, 2, 0], fingers: [-1, -1, 0, 1, 1, 0] }
        ],
        '9': [
            { name: 'E Shape (9th Fret)', desc: '6th-string root, open high E string.', frets: [10, 9, 10, 9, 10, 0], fingers: [2, 1, 3, 1, 4, 0] },
            { name: 'E Shape (10th, Open)', desc: '6th-string root, open A/D strings.', frets: [10, 0, 10, 11, 10, 0], fingers: [1, 0, 2, 4, 3, 0] },
            { name: 'E Shape (10th, A Root)', desc: '6th-string root with the A string fretted.', frets: [10, 12, 10, 11, 10, 0], fingers: [1, 3, 1, 2, 1, 0] },
            { name: 'E Shape Full (10th Fret)', desc: 'Full 6th-string root voicing.', frets: [10, 12, 10, 11, 10, 12], fingers: [1, 3, 1, 2, 1, 4] },
            { name: 'E Shape (7th, Open Top)', desc: '6th-string root, open A and high E.', frets: [10, 0, 10, 7, 7, 0], fingers: [2, 0, 3, 1, 1, 0] },
            { name: 'E Shape (7th, D Root)', desc: '6th-string root with the D string fretted.', frets: [10, 0, 10, 9, 7, 0], fingers: [3, 0, 4, 2, 1, 0] },
            { name: 'E Shape (7th, Full)', desc: '6th-string root, full voicing.', frets: [10, 0, 7, 9, 7, 8], fingers: [4, 0, 1, 3, 1, 2] },
            { name: 'E Shape (7th, Open A)', desc: '6th-string root with the A string open.', frets: [10, 0, 0, 9, 7, 8], fingers: [4, 0, 0, 3, 1, 2] }
        ],
        'm9': [
            { name: 'E Shape (10th, Open Top)', desc: '6th-string root, open high E string.', frets: [10, 12, 10, 10, 10, 0], fingers: [1, 2, 1, 1, 1, 0] },
            { name: 'E Shape (7th, Open D)', desc: '6th-string root, open D string.', frets: [10, 7, 0, 10, 10, 8], fingers: [3, 1, 0, 4, 4, 2] }
        ],
        '11': [
            { name: 'E Shape (9th, Open Top)', desc: '6th-string root, open D and high E strings.', frets: [10, 9, 10, 0, 10, 0], fingers: [2, 1, 3, 0, 4, 0] },
            { name: 'E Shape (7th Fret)', desc: '6th-string root, full voicing.', frets: [10, 10, 7, 9, 7, 8], fingers: [4, 4, 1, 3, 1, 2] },
            { name: 'E Shape (8th, Open A)', desc: '6th-string root with the A string open.', frets: [10, 0, 10, 11, 8, 0], fingers: [2, 0, 3, 4, 1, 0] }
        ],
        'm11': [
            { name: 'E Shape (8th, Open G/Top)', desc: '6th-string root, open G and high E strings.', frets: [10, 8, 10, 0, 10, 0], fingers: [2, 1, 3, 0, 4, 0] }
        ],
        'maj11': [
            { name: 'E Shape (10th, Open Top)', desc: '6th-string root, open high E string.', frets: [10, 10, 11, 11, 10, 0], fingers: [1, 1, 3, 4, 2, 0] },
            { name: 'E Shape (8th, Open A)', desc: '6th-string root with the A string open.', frets: [10, 0, 11, 11, 8, 0], fingers: [2, 0, 3, 4, 1, 0] }
        ],
        'm(maj9)': [
            { name: 'E Shape (10th, Open Top)', desc: '6th-string root, open high E string.', frets: [10, 12, 11, 10, 10, 0], fingers: [1, 3, 2, 1, 1, 0] },
            { name: 'E Shape (7th, Open D)', desc: '6th-string root, open D string.', frets: [10, 7, 0, 10, 10, 9], fingers: [3, 1, 0, 4, 4, 2] },
            { name: 'E Shape (10th, Open A)', desc: '6th-string root with the A string open.', frets: [10, 0, 11, 10, 10, 12], fingers: [1, 0, 4, 2, 3, 4] }
        ],
        'm(maj11)': [
            { name: 'E Shape (8th, Open G/Top)', desc: '6th-string root, open G and high E strings.', frets: [10, 8, 11, 0, 10, 0], fingers: [2, 1, 4, 0, 3, 0] }
        ]
    },
    'E': {
        'Major': [
            { name: 'Open E Shape', desc: 'Standard open E chord.', frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] }
        ],
        'm': [
            { name: 'Open Em Shape', desc: 'Standard open E minor.', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 1, 2, 0, 0, 0] }
        ],
        'm7': [
            { name: 'Open Em7 Shape', desc: 'Very common acoustic 7th.', frets: [0, 2, 2, 0, 3, 0], fingers: [0, 1, 2, 0, 4, 0] },
            { name: 'Em7 (No 5th)', desc: 'Simplest Em7 voicing.', frets: [0, 2, 0, 0, 0, 0], fingers: [0, 1, 0, 0, 0, 0] }
        ],
        '5': [
            { name: 'E5 Power Chord', desc: 'Low rock power chord.', frets: [0, 2, 2, -1, -1, -1], fingers: [0, 1, 2, -1, -1, -1] }
        ],
        'sus4': [
            { name: 'Open Esus4', desc: 'Suspended 4th moving to E.', frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0] }
        ],
        '7': [
            { name: 'Open E7 Shape', desc: 'Blues dominant 7th.', frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] }
        ],
        'maj7': [
            { name: 'Open Emaj7 Shape', desc: 'Sweet open major 7th.', frets: [0, 2, 1, 1, 0, 0], fingers: [0, 2, 1, 1, 0, 0] }
        ],
        'add9': [
            { name: 'Open Eadd9', desc: 'Lush open ringing chord.', frets: [0, 2, 4, 1, 0, 0], fingers: [0, 2, 4, 1, 0, 0] }
        ],
        'aug': [
            { name: 'Eaug Shape', desc: 'Open augmented shape.', frets: [0, 3, 2, 1, 1, 0], fingers: [0, 4, 3, 1, 2, 0] }
        ],
        'maj7add13': [
            { name: 'Open Emaj7add13 Shape', desc: 'Open-position maj7add13 voicing.', frets: [0, 4, 1, 1, 0, 0], fingers: [0, 2, 1, 1, 0, 0] }
        ],
        'm7add13': [
            { name: 'Open Em7add13 Shape', desc: 'Open-position m7add13 voicing.', frets: [0, 4, 0, 0, 0, 0], fingers: [0, 1, 0, 0, 0, 0] }
        ],
        'm(maj7)add13': [
            { name: 'Open Em(maj7)add13 Shape', desc: 'Open-position m(maj7)add13 voicing.', frets: [0, 4, 1, 0, 0, 0], fingers: [0, 2, 1, 0, 0, 0] }
        ],
        '7b5': [
            { name: 'Open E7b5 Shape', desc: 'Open-position 7b5 voicing.', frets: [0, 1, 0, 1, -1, 0], fingers: [0, 1, 0, 1, -1, 0] }
        ],
        'aug7': [
            { name: 'Open Eaug7 Shape', desc: 'Open-position aug7 voicing.', frets: [0, -1, 0, 1, 1, 0], fingers: [0, -1, 0, 1, 1, 0] }
        ],
        'aug7b9': [
            { name: 'Open Eaug7b9 Shape', desc: 'Open-position aug7b9 voicing.', frets: [0, -1, 0, 1, 1, 1], fingers: [0, -1, 0, 1, 1, 1] }
        ],
        'm7#5': [
            { name: 'Open Em7#5 Shape', desc: 'Open-position m7#5 voicing.', frets: [0, -1, 0, 0, 1, 0], fingers: [0, -1, 0, 0, 1, 0] }
        ],
        'm7b9': [
            { name: 'Open Em7b9 Shape', desc: 'Open-position m7b9 voicing.', frets: [0, -1, 0, 0, 0, 1], fingers: [0, -1, 0, 0, 0, 1] }
        ],
        '6sus4': [
            { name: 'Open E6sus4 Shape', desc: 'Open-position 6sus4 voicing.', frets: [0, 0, -1, 4, 2, 0], fingers: [0, 0, -1, 2, 1, 0] }
        ],
        '6sus2': [
            { name: 'Open E6sus2 Shape', desc: 'Open-position 6sus2 voicing.', frets: [0, 4, 4, -1, 0, 0], fingers: [0, 1, 1, -1, 0, 0] }
        ],
        'maj7sus4': [
            { name: 'Open Emaj7sus4 Shape', desc: 'Open-position maj7sus4 voicing.', frets: [0, 0, 1, -1, 0, 0], fingers: [0, 0, 1, -1, 0, 0] }
        ],
        '7sus2': [
            { name: 'Open E7sus2 Shape', desc: 'Open-position 7sus2 voicing.', frets: [0, -1, 0, -1, 0, 2], fingers: [0, -1, 0, -1, 0, 1] }
        ],
        'maj7sus2': [
            { name: 'Open Emaj7sus2 Shape', desc: 'Open-position maj7sus2 voicing.', frets: [0, -1, 1, -1, 0, 2], fingers: [0, -1, 1, -1, 0, 2] }
        ]
    },
    'F': {
        'Major': [
            { name: 'Standard F Barre', desc: 'Essential 1st fret full barre chord.', frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] },
            { name: 'Easy F (No Barre)', desc: 'Small F major shape.', frets: [-1, -1, 3, 2, 1, 1], fingers: [-1, -1, 3, 2, 1, 1] }
        ],
        'm': [
            { name: 'Fm Barre', desc: 'Standard minor barre.', frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1] }
        ],
        'm7': [
            { name: 'Fm7 Barre', desc: 'Standard minor 7th.', frets: [1, 3, 1, 1, 1, 1], fingers: [1, 3, 1, 1, 1, 1] },
            { name: 'Jazz Fm7 (No 5th)', desc: 'R&B 6th string root.', frets: [1, -1, 1, 1, 1, -1], fingers: [1, -1, 2, 3, 4, -1] }
        ],
        '7': [
            { name: 'F7 Barre', desc: 'Standard dominant 7th.', frets: [1, 3, 1, 2, 1, 1], fingers: [1, 3, 1, 2, 1, 1] }
        ],
        'maj7': [
            { name: 'Open Fmaj7', desc: 'Beautiful acoustic Fmaj7.', frets: [-1, -1, 3, 2, 1, 0], fingers: [-1, -1, 3, 2, 1, 0] }
        ],
        'add9': [
            { name: 'Fadd9 Barre', desc: 'Standard major with added 9.', frets: [1, 3, 3, 2, 1, 3], fingers: [1, 3, 3, 2, 1, 4] }
        ],
        'aug': [
            { name: 'Faug Shape', desc: 'Mid-neck augmented shape.', frets: [-1, -1, 3, 2, 2, 1], fingers: [-1, -1, 4, 2, 3, 1] }
        ],
        'maj7add13': [
            { name: 'Open Fmaj7add13 Shape', desc: 'Open-position maj7add13 voicing.', frets: [1, 0, 0, -1, 1, 0], fingers: [1, 0, 0, -1, 2, 0] }
        ],
        'm7add13': [
            { name: 'Open Fm7add13 Shape', desc: 'Open-position m7add13 voicing.', frets: [1, 3, 0, -1, 4, 4], fingers: [1, 2, 0, -1, 3, 4] }
        ],
        'm(maj7)add13': [
            { name: 'Open Fm(maj7)add13 Shape', desc: 'Open-position m(maj7)add13 voicing.', frets: [1, -1, 0, 1, 1, 0], fingers: [1, -1, 0, 2, 3, 0] }
        ],
        '7b5': [
            { name: 'Open F7b5 Shape', desc: 'Open-position 7b5 voicing.', frets: [1, 0, 1, -1, 0, -1], fingers: [1, 0, 2, -1, 0, -1] }
        ],
        'aug7': [
            { name: 'Open Faug7 Shape', desc: 'Open-position aug7 voicing.', frets: [1, 0, 1, -1, 2, -1], fingers: [1, 0, 2, -1, 3, -1] }
        ],
        'aug7b9': [
            { name: 'Open Faug7b9 Shape', desc: 'Open-position aug7b9 voicing.', frets: [1, 0, 1, -1, 2, 2], fingers: [1, 0, 1, -1, 2, 2] }
        ],
        'm7#5': [
            { name: 'Open Fm7#5 Shape', desc: 'Open-position m7#5 voicing.', frets: [1, -1, 1, 1, 2, -1], fingers: [1, -1, 1, 1, 2, -1] }
        ],
        'm7b9': [
            { name: 'Open Fm7b9 Shape', desc: 'Open-position m7b9 voicing.', frets: [1, -1, 1, 1, 1, 2], fingers: [1, -1, 1, 1, 1, 2] }
        ],
        '6sus4': [
            { name: 'Open F6sus4 Shape', desc: 'Open-position 6sus4 voicing.', frets: [1, -1, 0, 3, 1, -1], fingers: [1, -1, 0, 3, 2, -1] }
        ],
        '6sus2': [
            { name: 'Open F6sus2 Shape', desc: 'Open-position 6sus2 voicing.', frets: [1, -1, 0, 0, 1, -1], fingers: [1, -1, 0, 0, 2, -1] }
        ],
        'maj7sus4': [
            { name: 'Open Fmaj7sus4 Shape', desc: 'Open-position maj7sus4 voicing.', frets: [1, 1, -1, -1, 1, 0], fingers: [1, 1, -1, -1, 1, 0] }
        ],
        '7sus2': [
            { name: 'Open F7sus2 Shape', desc: 'Open-position 7sus2 voicing.', frets: [1, 3, 1, 0, -1, -1], fingers: [1, 2, 1, 0, -1, -1] }
        ],
        'maj7sus2': [
            { name: 'Open Fmaj7sus2 Shape', desc: 'Open-position maj7sus2 voicing.', frets: [-1, -1, 3, 0, 1, 0], fingers: [-1, -1, 2, 0, 1, 0] }
        ]
    },
    'G': {
        'Major': [
            { name: 'Open G Shape', desc: 'Standard open G major.', frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
            { name: 'Folk G (4 fingers)', desc: 'Popular pop/rock G shape.', frets: [3, 2, 0, 0, 3, 3], fingers: [2, 1, 0, 0, 3, 4] }
        ],
        'sus2': [
            { name: 'Open Gsus2', desc: 'Open sounding sus2.', frets: [3, 0, 0, 0, 3, 3], fingers: [2, 0, 0, 0, 3, 4] }
        ],
        'sus4': [
            { name: 'Open Gsus4', desc: 'Suspended 4th variation.', frets: [3, 3, 0, 0, 1, 3], fingers: [3, 4, 0, 0, 1, 4] }
        ],
        '7': [
            { name: 'Open G7 Shape', desc: 'Standard dominant 7th.', frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] }
        ],
        'maj7': [
            { name: 'Open Gmaj7 Shape', desc: 'Jazzy open chord.', frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1] }
        ],
        '6': [
            { name: 'Open G6 Shape', desc: 'Sweet vintage 6th.', frets: [3, 2, 0, 0, 0, 0], fingers: [2, 1, 0, 0, 0, 0] }
        ],
        'add9': [
            { name: 'Open Gadd9', desc: 'Lush open Gadd9.', frets: [3, 2, 0, 2, 0, 3], fingers: [2, 1, 0, 3, 0, 4] }
        ],
        'aug': [
            { name: 'Gaug Shape', desc: 'Standard augmented triad.', frets: [3, 2, 1, 0, 0, -1], fingers: [3, 2, 1, 0, 0, -1] }
        ],
        'maj7add13': [
            { name: 'Open Gmaj7add13 Shape', desc: 'Open-position maj7add13 voicing.', frets: [3, 2, 4, 0, 3, 0], fingers: [2, 1, 4, 0, 3, 0] }
        ],
        'm7add13': [
            { name: 'Open Gm7add13 Shape', desc: 'Open-position m7add13 voicing.', frets: [3, 1, 3, 0, 3, 0], fingers: [2, 1, 3, 0, 4, 0] }
        ],
        'm(maj7)add13': [
            { name: 'Open Gm(maj7)add13 Shape', desc: 'Open-position m(maj7)add13 voicing.', frets: [3, 1, 4, 0, 3, 0], fingers: [2, 1, 4, 0, 3, 0] }
        ],
        '7b5': [
            { name: 'Open G7b5 Shape', desc: 'Open-position 7b5 voicing.', frets: [3, 4, -1, 0, 0, 1], fingers: [2, 3, -1, 0, 0, 1] }
        ],
        'aug7': [
            { name: 'Open Gaug7 Shape', desc: 'Open-position aug7 voicing.', frets: [3, -1, 1, 0, 0, 1], fingers: [3, -1, 1, 0, 0, 2] }
        ],
        'aug7b9': [
            { name: 'Open Gaug7b9 Shape', desc: 'Open-position aug7b9 voicing.', frets: [3, -1, 1, 1, 0, 1], fingers: [4, -1, 1, 2, 0, 3] }
        ],
        'm7#5': [
            { name: 'Open Gm7#5 Shape', desc: 'Open-position m7#5 voicing.', frets: [3, 1, 1, 0, -1, 1], fingers: [4, 1, 2, 0, -1, 3] }
        ],
        'm7b9': [
            { name: 'Open Gm7b9 Shape', desc: 'Open-position m7b9 voicing.', frets: [3, 1, 0, 1, -1, 1], fingers: [4, 1, 0, 2, -1, 3] }
        ],
        '6sus4': [
            { name: 'Open G6sus4 Shape', desc: 'Open-position 6sus4 voicing.', frets: [3, -1, 0, 0, 1, 0], fingers: [2, -1, 0, 0, 1, 0] }
        ],
        '6sus2': [
            { name: 'Open G6sus2 Shape', desc: 'Open-position 6sus2 voicing.', frets: [3, 0, 0, 2, -1, 0], fingers: [2, 0, 0, 1, -1, 0] }
        ],
        'maj7sus4': [
            { name: 'Open Gmaj7sus4 Shape', desc: 'Open-position maj7sus4 voicing.', frets: [3, -1, 0, 0, 1, 2], fingers: [3, -1, 0, 0, 1, 2] }
        ],
        '7sus2': [
            { name: 'Open G7sus2 Shape', desc: 'Open-position 7sus2 voicing.', frets: [3, 0, 0, 0, -1, 1], fingers: [2, 0, 0, 0, -1, 1] }
        ],
        'maj7sus2': [
            { name: 'Open Gmaj7sus2 Shape', desc: 'Open-position maj7sus2 voicing.', frets: [3, 0, 0, 0, -1, 2], fingers: [2, 0, 0, 0, -1, 1] }
        ]
    },
    'A': {
        'Major': [
            { name: 'Open A Shape', desc: 'Standard open A major.', frets: [-1, 0, 2, 2, 2, 0], fingers: [-1, 0, 1, 2, 3, 0] }
        ],
        'm': [
            { name: 'Open Am Shape', desc: 'Standard open A minor.', frets: [-1, 0, 2, 2, 1, 0], fingers: [-1, 0, 2, 3, 1, 0] }
        ],
        'm7': [
            { name: 'Open Am7 Shape', desc: 'Standard minor 7th.', frets: [-1, 0, 2, 0, 1, 0], fingers: [-1, 0, 2, 0, 1, 0] },
            { name: 'Am7 (No 5th)', desc: 'Popular omitted 5th voicing.', frets: [-1, 0, -1, 0, 1, 0], fingers: [-1, 0, -1, 0, 1, 0] }
        ],
        'sus2': [
            { name: 'Open Asus2', desc: 'Dreamy suspended chord.', frets: [-1, 0, 2, 2, 0, 0], fingers: [-1, 0, 2, 3, 0, 0] }
        ],
        'sus4': [
            { name: 'Open Asus4', desc: 'Tense suspended 4th.', frets: [-1, 0, 2, 2, 3, 0], fingers: [-1, 0, 1, 2, 3, 0] }
        ],
        '7': [
            { name: 'Open A7 Shape', desc: 'Blues dominant 7th.', frets: [-1, 0, 2, 0, 2, 0], fingers: [-1, 0, 2, 0, 3, 0] }
        ],
        'maj7': [
            { name: 'Open Amaj7 Shape', desc: 'Relaxing major 7th.', frets: [-1, 0, 2, 1, 2, 0], fingers: [-1, 0, 2, 1, 3, 0] }
        ],
        'add9': [
            { name: 'Open Aadd9', desc: 'Standard open add9.', frets: [-1, 0, 2, 4, 2, 0], fingers: [-1, 0, 1, 4, 2, 0] }
        ],
        'aug': [
            { name: 'Aaug Shape', desc: 'Open position augmented.', frets: [-1, 0, 3, 2, 2, 1], fingers: [-1, 0, 4, 2, 3, 1] }
        ],
        'maj7add13': [
            { name: 'Open Amaj7add13 Shape', desc: 'Open-position maj7add13 voicing.', frets: [-1, 0, 4, 1, 2, 0], fingers: [-1, 0, 3, 1, 2, 0] }
        ],
        'm7add13': [
            { name: 'Open Am7add13 Shape', desc: 'Open-position m7add13 voicing.', frets: [-1, 0, 4, 0, 1, 0], fingers: [-1, 0, 2, 0, 1, 0] }
        ],
        'm(maj7)add13': [
            { name: 'Open Am(maj7)add13 Shape', desc: 'Open-position m(maj7)add13 voicing.', frets: [-1, 0, 4, 1, 1, 0], fingers: [-1, 0, 2, 1, 1, 0] }
        ],
        '7b5': [
            { name: 'Open A7b5 Shape', desc: 'Open-position 7b5 voicing.', frets: [-1, 0, 1, 0, 2, -1], fingers: [-1, 0, 1, 0, 2, -1] }
        ],
        'aug7': [
            { name: 'Open Aaug7 Shape', desc: 'Open-position aug7 voicing.', frets: [-1, 0, -1, 0, 2, 1], fingers: [-1, 0, -1, 0, 2, 1] }
        ],
        'aug7b9': [
            { name: 'Open Aaug7b9 Shape', desc: 'Open-position aug7b9 voicing.', frets: [-1, 0, 3, 3, 2, 3], fingers: [-1, 0, 2, 2, 1, 2] }
        ],
        'm7#5': [
            { name: 'Open Am7#5 Shape', desc: 'Open-position m7#5 voicing.', frets: [-1, 0, -1, 0, 1, 1], fingers: [-1, 0, -1, 0, 1, 1] }
        ],
        'm7b9': [
            { name: 'Open Am7b9 Shape', desc: 'Open-position m7b9 voicing.', frets: [-1, 0, 2, 3, 1, 3], fingers: [-1, 0, 2, 3, 1, 4] }
        ],
        '6sus4': [
            { name: 'Open A6sus4 Shape', desc: 'Open-position 6sus4 voicing.', frets: [-1, 0, 0, -1, 5, 2], fingers: [-1, 0, 0, -1, 2, 1] }
        ],
        '6sus2': [
            { name: 'Open A6sus2 Shape', desc: 'Open-position 6sus2 voicing.', frets: [-1, 0, 4, 2, 0, 0], fingers: [-1, 0, 2, 1, 0, 0] }
        ],
        'maj7sus4': [
            { name: 'Open Amaj7sus4 Shape', desc: 'Open-position maj7sus4 voicing.', frets: [-1, 0, 0, 1, -1, 0], fingers: [-1, 0, 0, 1, -1, 0] }
        ],
        '7sus2': [
            { name: 'Open A7sus2 Shape', desc: 'Open-position 7sus2 voicing.', frets: [-1, 0, -1, 0, 0, 0], fingers: [-1, 0, -1, 0, 0, 0] }
        ],
        'maj7sus2': [
            { name: 'Open Amaj7sus2 Shape', desc: 'Open-position maj7sus2 voicing.', frets: [-1, 0, -1, 1, 0, 0], fingers: [-1, 0, -1, 1, 0, 0] }
        ]
    },
    'B': {
        // 🌟 Bm7 등 실전 폼 전면 추가
        'm7': [
            { name: 'Bm7 Shape', desc: 'Standard Bm7 barre chord.', frets: [-1, 2, 4, 2, 3, 2], fingers: [-1, 1, 3, 1, 2, 1] },
            { name: 'Bm7 (No 5th)', desc: 'Very common acoustic shell voicing (like your screenshot!).', frets: [-1, 2, 0, 2, 0, 2], fingers: [-1, 1, 0, 2, 0, 3] }
        ],
        '7': [
            { name: 'Open B7 Shape', desc: 'Classic blues turnaround chord.', frets: [-1, 2, 1, 2, 0, 2], fingers: [-1, 2, 1, 3, 0, 4] }
        ],
        'add9': [
            { name: 'Badd9 Shape', desc: 'Moved Aadd9 shape.', frets: [-1, 2, 4, 6, 4, 2], fingers: [-1, 1, 2, 4, 3, 1] }
        ],
        'aug': [
            { name: 'Baug Shape', desc: 'Tense augmented flavor.', frets: [-1, 2, 1, 0, 0, -1], fingers: [-1, 2, 1, 0, 0, -1] }
        ],
        'maj7add13': [
            { name: 'Open Bmaj7add13 Shape', desc: 'Open-position maj7add13 voicing.', frets: [7, 6, 6, -1, 7, 6], fingers: [2, 1, 1, -1, 3, 1] }
        ],
        'm7add13': [
            { name: 'Open Bm7add13 Shape', desc: 'Open-position m7add13 voicing.', frets: [-1, 2, 4, 2, 3, 4], fingers: [-1, 1, 3, 1, 2, 4] }
        ],
        'm(maj7)add13': [
            { name: 'Open Bm(maj7)add13 Shape', desc: 'Open-position m(maj7)add13 voicing.', frets: [7, 9, 0, -1, 9, 6], fingers: [2, 3, 0, -1, 4, 1] }
        ],
        '7b5': [
            { name: 'Open B7b5 Shape', desc: 'Open-position 7b5 voicing.', frets: [-1, 2, 1, 2, 0, 1], fingers: [-1, 3, 1, 4, 0, 2] }
        ],
        'aug7': [
            { name: 'Open Baug7 Shape', desc: 'Open-position aug7 voicing.', frets: [-1, 2, 1, 2, 0, 3], fingers: [-1, 2, 1, 3, 0, 4] }
        ],
        'aug7b9': [
            { name: 'Open Baug7b9 Shape', desc: 'Open-position aug7b9 voicing.', frets: [-1, 2, 1, 2, 1, 3], fingers: [-1, 2, 1, 3, 1, 4] }
        ],
        'm7#5': [
            { name: 'Open Bm7#5 Shape', desc: 'Open-position m7#5 voicing.', frets: [-1, 2, 0, 0, 0, 5], fingers: [-1, 1, 0, 0, 0, 2] }
        ],
        'm7b9': [
            { name: 'Open Bm7b9 Shape', desc: 'Open-position m7b9 voicing.', frets: [-1, 2, 0, 2, 1, 2], fingers: [-1, 2, 0, 3, 1, 4] }
        ],
        '6sus4': [
            { name: 'Open B6sus4 Shape', desc: 'Open-position 6sus4 voicing.', frets: [-1, 2, 4, 1, 0, 0], fingers: [-1, 2, 3, 1, 0, 0] }
        ],
        '6sus2': [
            { name: 'Open B6sus2 Shape', desc: 'Open-position 6sus2 voicing.', frets: [-1, 2, -1, 1, 2, 2], fingers: [-1, 2, -1, 1, 3, 4] }
        ],
        'maj7sus4': [
            { name: 'Open Bmaj7sus4 Shape', desc: 'Open-position maj7sus4 voicing.', frets: [-1, 2, 4, 3, 0, 0], fingers: [-1, 1, 3, 2, 0, 0] }
        ],
        '7sus2': [
            { name: 'Open B7sus2 Shape', desc: 'Open-position 7sus2 voicing.', frets: [-1, 2, -1, 2, 2, 2], fingers: [-1, 1, -1, 1, 1, 1] }
        ],
        'maj7sus2': [
            { name: 'Open Bmaj7sus2 Shape', desc: 'Open-position maj7sus2 voicing.', frets: [-1, 2, -1, 3, 2, 2], fingers: [-1, 1, -1, 2, 1, 1] }
        ]
    }
};

window.slashChordDatabase = {
    'C': {
        'Major': [
            { name: 'C/E', desc: 'C major chord with an open E string bass.', frets: [0, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
            { name: 'C/G', desc: 'Full, rich sounding C chord with G bass.', frets: [3, 3, 2, 0, 1, 0], fingers: [3, 4, 2, 0, 1, 0] }
        ],
        'm': [
            { name: 'Cm/Eb', desc: 'Cm chord with Eb bass on the 5th string.', frets: [-1, 6, 5, 5, 4, -1], fingers: [-1, 4, 2, 3, 1, -1] }
        ]
    },
    'D': {
        'Major': [
            { name: 'D/F#', desc: 'Essential transitional chord with F# bass.', frets: [2, 0, 0, 2, 3, 2], fingers: [1, 0, 0, 2, 4, 3] },
            { name: 'D/A', desc: 'Standard open D chord leaving the A string open.', frets: [-1, 0, 0, 2, 3, 2], fingers: [-1, 0, 0, 1, 3, 2] }
        ],
        'm': [
            { name: 'Dm/F', desc: 'Beautiful emotional Dm with F bass on the 1st fret.', frets: [1, -1, 0, 2, 3, 1], fingers: [1, -1, 0, 2, 4, 1] },
            { name: 'Dm/A', desc: 'Dm chord with open A bass string.', frets: [-1, 0, 0, 2, 3, 1], fingers: [-1, 0, 0, 2, 3, 1] }
        ]
    },
    'E': {
        'Major': [
            { name: 'E/G#', desc: 'Bright inversion frequently used to step smoothly into A.', frets: [4, -1, 2, 1, 0, 0], fingers: [4, -1, 2, 1, 0, 0] },
            { name: 'E/B', desc: 'E chord powered by B string bass.', frets: [-1, 2, 2, 1, 0, 0], fingers: [-1, 2, 3, 1, 0, 0] }
        ],
        'm': [
            { name: 'Em/G', desc: 'Em chord with G bass on the 6th string 3rd fret.', frets: [3, 2, 2, 0, 0, 0], fingers: [3, 1, 2, 0, 0, 0] }
        ]
    },
    'F': {
        'Major': [
            { name: 'F/A', desc: 'Bright lightweight F triad with an open A string bass.', frets: [-1, 0, 3, 2, 1, 1], fingers: [-1, 0, 3, 2, 1, 1] },
            { name: 'F/C', desc: 'Powerful F inversion with C bass.', frets: [-1, 3, 3, 2, 1, 1], fingers: [-1, 3, 4, 2, 1, 1] }
        ],
        'm': [
            { name: 'Fm/G#', desc: 'Fm triad with G# bass on the 4th string.', frets: [-1, -1, 6, 5, 6, 4], fingers: [-1, -1, 3, 2, 4, 1] }
        ]
    },
    'G': {
        'Major': [
            { name: 'G/B', desc: 'The most popular acoustic slash chord for descending basslines.', frets: [-1, 2, 0, 0, 3, 3], fingers: [-1, 1, 0, 0, 3, 4] },
            { name: 'G/D', desc: 'Big open G chord with D bass.', frets: [-1, -1, 0, 0, 0, 3], fingers: [-1, -1, 0, 0, 0, 3] }
        ],
        'm': [
            { name: 'Gm/Bb', desc: 'Gm chord with Bb bass on the 5th string.', frets: [-1, 1, 0, 0, 3, 3], fingers: [-1, 1, 0, 0, 3, 4] }
        ]
    },
    'A': {
        'Major': [
            { name: 'A/C#', desc: 'Acoustic standard step chord moving gracefully to Bm.', frets: [-1, 4, 2, 2, 2, -1], fingers: [-1, 3, 1, 1, 1, -1] },
            { name: 'A/E', desc: 'Heavy A chord with low E bass.', frets: [0, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] }
        ],
        'm': [
            { name: 'Am/G', desc: 'Beautiful minor line-cliche melody descending chord.', frets: [3, 0, 2, 2, 1, 0], fingers: [3, 0, 1, 2, 1, 0] },
            { name: 'Am/F#', desc: 'Half-diminished flavor slash chord (Am6 vibe).', frets: [2, 0, 2, 2, 1, 0], fingers: [2, 0, 3, 4, 1, 0] }
        ]
    },
    'B': {
        'Major': [
            { name: 'B/Eb', desc: 'Major inversion commonly used for stepping up to E.', frets: [-1, 6, 4, 4, 4, -1], fingers: [-1, 3, 1, 1, 1, -1] }
        ],
        'm': [
            { name: 'Bm/A', desc: 'Bm barre chord with open A bass string.', frets: [-1, 0, 4, 4, 3, 2], fingers: [-1, 0, 3, 4, 2, 1] }
        ]
    }
};