// chords.js

window.chordNotesTable = {
    'C': { 'Major': ['C', 'E', 'G'], 'm': ['C', 'Eb', 'G'], 'm7': ['C', 'Eb', 'G', 'Bb'], 'm7b5': ['C', 'Eb', 'F#', 'Bb'], '5': ['C', 'G'], 'sus2': ['C', 'D', 'G'], '9': ['C', 'E', 'G', 'Bb', 'D'], 'maj9': ['C', 'E', 'G', 'B', 'D'], '6': ['C', 'E', 'G', 'A'], 'sus4': ['C', 'F', 'G'], '7': ['C', 'E', 'G', 'Bb'], 'maj7': ['C', 'E', 'G', 'B'], 'dim': ['C', 'Eb', 'F#'], 'dim7': ['C', 'Eb', 'F#', 'A'], 'add9': ['C', 'E', 'G', 'D'], 'aug': ['C', 'E', 'G#'] },
    'C#': { 'Major': ['C#', 'F', 'G#'], 'm': ['C#', 'E', 'G#'], 'm7': ['C#', 'E', 'G#', 'B'], 'm7b5': ['C#', 'E', 'G', 'B'], '5': ['C#', 'G#'], 'sus2': ['C#', 'Eb', 'G#'], '9': ['C#', 'F', 'G#', 'B', 'Eb'], 'maj9': ['C#', 'F', 'G#', 'C', 'Eb'], '6': ['C#', 'F', 'G#', 'Bb'], 'sus4': ['C#', 'F#', 'G#'], '7': ['C#', 'F', 'G#', 'B'], 'maj7': ['C#', 'F', 'G#', 'C'], 'dim': ['C#', 'E', 'G'], 'dim7': ['C#', 'E', 'G', 'Bb'], 'add9': ['C#', 'F', 'G#', 'Eb'], 'aug': ['C#', 'F', 'A'] },
    'D': { 'Major': ['D', 'F#', 'A'], 'm': ['D', 'F', 'A'], 'm7': ['D', 'F', 'A', 'C'], 'm7b5': ['D', 'F', 'G#', 'C'], '5': ['D', 'A'], 'sus2': ['D', 'E', 'A'], '9': ['D', 'F#', 'A', 'C', 'E'], 'maj9': ['D', 'F#', 'A', 'C#', 'E'], '6': ['D', 'F#', 'A', 'B'], 'sus4': ['D', 'G', 'A'], '7': ['D', 'F#', 'A', 'C'], 'maj7': ['D', 'F#', 'A', 'C#'], 'dim': ['D', 'F', 'G#'], 'dim7': ['D', 'F', 'G#', 'B'], 'add9': ['D', 'F#', 'A', 'E'], 'aug': ['D', 'F#', 'Bb'] },
    'Eb': { 'Major': ['Eb', 'G', 'Bb'], 'm': ['Eb', 'F#', 'Bb'], 'm7': ['Eb', 'F#', 'Bb', 'C#'], 'm7b5': ['Eb', 'F#', 'A', 'C#'], '5': ['Eb', 'Bb'], 'sus2': ['Eb', 'F', 'Bb'], '9': ['Eb', 'G', 'Bb', 'C#', 'F'], 'maj9': ['Eb', 'G', 'Bb', 'D', 'F'], '6': ['Eb', 'G', 'Bb', 'C'], 'sus4': ['Eb', 'G#', 'Bb'], '7': ['Eb', 'G', 'Bb', 'C#'], 'maj7': ['Eb', 'G', 'Bb', 'D'], 'dim': ['Eb', 'F#', 'A'], 'dim7': ['Eb', 'F#', 'A', 'C'], 'add9': ['Eb', 'G', 'Bb', 'F'], 'aug': ['Eb', 'G', 'B'] },
    'E': { 'Major': ['E', 'G#', 'B'], 'm': ['E', 'G', 'B'], 'm7': ['E', 'G', 'B', 'D'], 'm7b5': ['E', 'G', 'Bb', 'D'], '5': ['E', 'B'], 'sus2': ['E', 'F#', 'B'], '9': ['E', 'G#', 'B', 'D', 'F#'], 'maj9': ['E', 'G#', 'B', 'Eb', 'F#'], '6': ['E', 'G#', 'B', 'C#'], 'sus4': ['E', 'A', 'B'], '7': ['E', 'G#', 'B', 'D'], 'maj7': ['E', 'G#', 'B', 'Eb'], 'dim': ['E', 'G', 'Bb'], 'dim7': ['E', 'G', 'Bb', 'C#'], 'add9': ['E', 'G#', 'B', 'F#'], 'aug': ['E', 'G#', 'C'] },
    'F': { 'Major': ['F', 'A', 'C'], 'm': ['F', 'G#', 'C'], 'm7': ['F', 'G#', 'C', 'Eb'], 'm7b5': ['F', 'G#', 'B', 'Eb'], '5': ['F', 'C'], 'sus2': ['F', 'G', 'C'], '9': ['F', 'A', 'C', 'Eb', 'G'], 'maj9': ['F', 'A', 'C', 'E', 'G'], '6': ['F', 'A', 'C', 'D'], 'sus4': ['F', 'Bb', 'C'], '7': ['F', 'A', 'C', 'Eb'], 'maj7': ['F', 'A', 'C', 'E'], 'dim': ['F', 'G#', 'B'], 'dim7': ['F', 'G#', 'B', 'D'], 'add9': ['F', 'A', 'C', 'G'], 'aug': ['F', 'A', 'C#'] },
    'F#': { 'Major': ['F#', 'Bb', 'C#'], 'm': ['F#', 'A', 'C#'], 'm7': ['F#', 'A', 'C#', 'E'], 'm7b5': ['F#', 'A', 'C', 'E'], '5': ['F#', 'C#'], 'sus2': ['F#', 'G#', 'C#'], '9': ['F#', 'Bb', 'C#', 'E', 'G#'], 'maj9': ['F#', 'Bb', 'C#', 'F', 'G#'], '6': ['F#', 'Bb', 'C#', 'Eb'], 'sus4': ['F#', 'B', 'C#'], '7': ['F#', 'Bb', 'C#', 'E'], 'maj7': ['F#', 'Bb', 'C#', 'F'], 'dim': ['F#', 'A', 'C'], 'dim7': ['F#', 'A', 'C', 'Eb'], 'add9': ['F#', 'Bb', 'C#', 'G#'], 'aug': ['F#', 'Bb', 'D'] },
    'G': { 'Major': ['G', 'B', 'D'], 'm': ['G', 'Bb', 'D'], 'm7': ['G', 'Bb', 'D', 'F'], 'm7b5': ['G', 'Bb', 'C#', 'F'], '5': ['G', 'D'], 'sus2': ['G', 'A', 'D'], '9': ['G', 'B', 'D', 'F', 'A'], 'maj9': ['G', 'B', 'D', 'F#', 'A'], '6': ['G', 'B', 'D', 'E'], 'sus4': ['G', 'C', 'D'], '7': ['G', 'B', 'D', 'F'], 'maj7': ['G', 'B', 'D', 'F#'], 'dim': ['G', 'Bb', 'C#'], 'dim7': ['G', 'Bb', 'C#', 'E'], 'add9': ['G', 'B', 'D', 'A'], 'aug': ['G', 'B', 'Eb'] },
    'G#': { 'Major': ['G#', 'C', 'Eb'], 'm': ['G#', 'B', 'Eb'], 'm7': ['G#', 'B', 'Eb', 'F#'], 'm7b5': ['G#', 'B', 'D', 'F#'], '5': ['G#', 'Eb'], 'sus2': ['G#', 'Bb', 'Eb'], '9': ['G#', 'C', 'Eb', 'F#', 'Bb'], 'maj9': ['G#', 'C', 'Eb', 'G', 'Bb'], '6': ['G#', 'C', 'Eb', 'F'], 'sus4': ['G#', 'C#', 'Eb'], '7': ['G#', 'C', 'Eb', 'F#'], 'maj7': ['G#', 'C', 'Eb', 'G'], 'dim': ['G#', 'B', 'D'], 'dim7': ['G#', 'B', 'D', 'F'], 'add9': ['G#', 'C', 'Eb', 'Bb'], 'aug': ['G#', 'C', 'E'] },
    'A': { 'Major': ['A', 'C#', 'E'], 'm': ['A', 'C', 'E'], 'm7': ['A', 'C', 'E', 'G'], 'm7b5': ['A', 'C', 'Eb', 'G'], '5': ['A', 'E'], 'sus2': ['A', 'B', 'E'], '9': ['A', 'C#', 'E', 'G', 'B'], 'maj9': ['A', 'C#', 'E', 'G#', 'B'], '6': ['A', 'C#', 'E', 'F#'], 'sus4': ['A', 'D', 'E'], '7': ['A', 'C#', 'E', 'G'], 'maj7': ['A', 'C#', 'E', 'G#'], 'dim': ['A', 'C', 'Eb'], 'dim7': ['A', 'C', 'Eb', 'F#'], 'add9': ['A', 'C#', 'E', 'B'], 'aug': ['A', 'C#', 'F'] },
    'Bb': { 'Major': ['Bb', 'D', 'F'], 'm': ['Bb', 'C#', 'F'], 'm7': ['Bb', 'C#', 'F', 'G#'], 'm7b5': ['Bb', 'C#', 'E', 'G#'], '5': ['Bb', 'F'], 'sus2': ['Bb', 'C', 'F'], '9': ['Bb', 'D', 'F', 'G#', 'C'], 'maj9': ['Bb', 'D', 'F', 'A', 'C'], '6': ['Bb', 'D', 'F', 'G'], 'sus4': ['Bb', 'Eb', 'F'], '7': ['Bb', 'D', 'F', 'G#'], 'maj7': ['Bb', 'D', 'F', 'A'], 'dim': ['Bb', 'C#', 'E'], 'dim7': ['Bb', 'C#', 'E', 'G'], 'add9': ['Bb', 'D', 'F', 'C'], 'aug': ['Bb', 'D', 'F#'] },
    'B': { 'Major': ['B', 'Eb', 'F#'], 'm': ['B', 'D', 'F#'], 'm7': ['B', 'D', 'F#', 'A'], 'm7b5': ['B', 'D', 'F', 'A'], '5': ['B', 'F#'], 'sus2': ['B', 'C#', 'F#'], '9': ['B', 'Eb', 'F#', 'A', 'C#'], 'maj9': ['B', 'Eb', 'F#', 'Bb', 'C#'], '6': ['B', 'Eb', 'F#', 'G#'], 'sus4': ['B', 'E', 'F#'], '7': ['B', 'Eb', 'F#', 'A'], 'maj7': ['B', 'Eb', 'F#', 'Bb'], 'dim': ['B', 'D', 'F'], 'dim7': ['B', 'D', 'F', 'G#'], 'add9': ['B', 'Eb', 'F#', 'C#'], 'aug': ['B', 'Eb', 'G'] }
};

window.chordDatabase = {
    'C': {
        'Major': [
            { name: 'Open C Shape', desc: 'Standard open C chord.', frets: [-1, 3, 2, 0, 1, 0], fingers: [-1, 3, 2, 0, 1, 0] },
            { name: 'A Shape (3rd Fret)', desc: 'Full 5-string barre shape.', frets: [-1, 3, 5, 5, 5, 3], fingers: [-1, 1, 3, 3, 3, 1] },
            { name: 'D Shape Major', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 9, 8, -1], fingers: [-1, -1, 3, 2, 1, -1] }
        ],
        'm': [
            { name: 'Cm (Muted)', desc: 'Muted bottom 4-string shape.', frets: [-1, 3, 5, 5, 4, -1], fingers: [-1, 1, 3, 4, 2, -1] },
            { name: 'A Shape m (3rd Fret)', desc: 'Full 5-string minor barre shape.', frets: [-1, 3, 5, 5, 4, 3], fingers: [-1, 1, 3, 4, 2, 1] },
            { name: 'D Shape m', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 8, 8, -1], fingers: [-1, -1, 3, 1, 2, -1] }
        ],
        'm7': [
            { name: 'Am7 Shape (3rd Fret)', desc: 'Standard minor 7th barre.', frets: [-1, 3, 5, 3, 4, 3], fingers: [-1, 1, 3, 1, 2, 1] },
            { name: 'Jazz m7 (3rd Fret)', desc: 'R&B voicing (5th string root, no 5th).', frets: [-1, 3, -1, 3, 4, -1], fingers: [-1, 1, -1, 2, 3, -1] },
            { name: 'E Shape m7 (No 5th)', desc: '6th string root, skip the 5th & 1st strings (no barre needed).', frets: [8, -1, 8, 8, 8, -1], fingers: [1, -1, 2, 3, 4, -1] },
            { name: 'D Shape m7 (No 5th)', desc: '4th string root jazz shell voicing.', frets: [-1, -1, 10, 8, 11, -1], fingers: [-1, -1, 2, 1, 3, -1] }
        ],
        '5': [
            { name: 'A5 Shape (3rd Fret)', desc: 'Rock power chord.', frets: [-1, 3, 5, 5, -1, -1], fingers: [-1, 1, 3, 4, -1, -1] },
            { name: 'E Shape 5', desc: '6th string root power chord.', frets: [8, 10, -1, -1, -1, -1], fingers: [1, 2, -1, -1, -1, -1] },
            { name: 'D Shape 5', desc: '4th string root power chord.', frets: [-1, -1, 10, -1, 8, -1], fingers: [-1, -1, 2, -1, 1, -1] }
        ],
        'sus2': [
            { name: 'Open Csus2', desc: 'Open suspended 2nd chord.', frets: [-1, 3, 0, 0, 1, -1], fingers: [-1, 3, 0, 0, 1, -1] },
            { name: 'E Shape sus2', desc: '6th string root, no barre needed.', frets: [8, 5, 5, -1, -1, -1], fingers: [3, 1, 2, -1, -1, -1] },
            { name: 'D Shape sus2', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, -1, 8, 10], fingers: [-1, -1, 2, -1, 1, 3] }
        ],
        'sus4': [
            { name: 'Open Csus4', desc: 'Standard open suspended 4th.', frets: [-1, 3, 3, 0, 1, 1], fingers: [-1, 3, 4, 0, 1, 1] },
            { name: 'E Shape sus4', desc: '6th string root, no barre needed.', frets: [8, 10, -1, 10, -1, -1], fingers: [1, 2, -1, 3, -1, -1] },
            { name: 'D Shape sus4', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 10, 8, -1], fingers: [-1, -1, 2, 3, 1, -1] }
        ],
        '7': [
            { name: 'Open C7 Shape', desc: 'Bluesy dominant 7th shape.', frets: [-1, 3, 2, 3, 1, 0], fingers: [-1, 3, 2, 4, 1, 0] },
            { name: 'E Shape 7 (No 5th)', desc: '6th string root jazz shell voicing.', frets: [8, -1, 8, 9, -1, -1], fingers: [1, -1, 2, 3, -1, -1] },
            { name: 'D Shape 7 (No 5th)', desc: '4th string root jazz shell voicing.', frets: [-1, -1, 10, 9, 11, -1], fingers: [-1, -1, 2, 1, 3, -1] }
        ],
        'maj7': [
            { name: 'Open Cmaj7 Shape', desc: 'Standard acoustic Cmaj7.', frets: [-1, 3, 2, 0, 0, 0], fingers: [-1, 3, 2, 0, 0, 0] },
            { name: 'Cmaj7 (No 5th)', desc: 'Muted 4th string jazzy voicing.', frets: [-1, 3, -1, 4, 5, -1], fingers: [-1, 1, -1, 2, 3, -1] },
            { name: 'D Shape maj7 (No 5th)', desc: '4th string root jazz shell voicing.', frets: [-1, -1, 10, 9, 12, -1], fingers: [-1, -1, 2, 1, 3, -1] }
        ],
        'm7b5': [
            { name: 'Cm7b5', desc: 'Half-diminished jazz voicing.', frets: [-1, 3, 4, 3, 4, -1], fingers: [-1, 1, 3, 2, 4, -1] },
            { name: 'E Shape m7b5 (No 5th)', desc: '6th string root half-diminished shell.', frets: [8, -1, 8, 8, 7, -1], fingers: [2, -1, 3, 4, 1, -1] },
            { name: 'D Shape m7b5', desc: '4th string root half-diminished shell.', frets: [-1, -1, 10, 11, 11, 11], fingers: [-1, -1, 1, 2, 3, 4] }
        ],
        '9': [
            { name: 'C9 Shape', desc: 'Jazz 5-string 9th chord.', frets: [-1, 3, 2, 3, 3, 3], fingers: [-1, 2, 1, 3, 3, 3] },
            { name: 'E Shape 9 (No 5th)', desc: '6th string root jazz 9th shell.', frets: [8, 5, 8, 9, -1, -1], fingers: [2, 1, 3, 4, -1, -1] },
            { name: 'D Shape 9 (No 5th)', desc: '4th string root jazz 9th shell.', frets: [-1, -1, 10, 9, 11, 10], fingers: [-1, -1, 2, 1, 4, 3] }
        ],
        'maj9': [
            { name: 'Cmaj9 Shape', desc: 'Lush major 9th.', frets: [-1, 3, 2, 4, 3, -1], fingers: [-1, 2, 1, 4, 3, -1] },
            { name: 'E Shape maj9 (No 5th)', desc: '6th string root jazz maj9 shell.', frets: [8, 5, 9, 9, -1, -1], fingers: [2, 1, 3, 3, -1, -1] },
            { name: 'D Shape maj9 (No 5th)', desc: '4th string root jazz maj9 shell.', frets: [-1, -1, 10, 9, 12, 10], fingers: [-1, -1, 2, 1, 4, 3] }
        ],
        '6': [
            { name: 'Open C6 Shape', desc: 'Sweet vintage 6th.', frets: [-1, 3, 2, 2, 1, 0], fingers: [-1, 3, 2, 2, 1, 0] },
            { name: 'E Shape 6', desc: '6th string root, no barre needed.', frets: [8, 10, 7, 9, -1, -1], fingers: [2, 4, 1, 3, -1, -1] },
            { name: 'D Shape 6 (No 5th)', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 9, 10, -1], fingers: [-1, -1, 2, 1, 3, -1] }
        ],
        'dim': [
            { name: 'Cdim Shape', desc: 'Diminished triad.', frets: [-1, -1, 10, 8, 7, -1], fingers: [-1, -1, 3, 2, 1, -1] },
            { name: 'E Shape dim', desc: '6th string root diminished triad.', frets: [8, -1, -1, 8, 7, -1], fingers: [2, -1, -1, 3, 1, -1] },
            { name: 'A Shape dim', desc: '5th string root diminished triad.', frets: [2, 3, 1, -1, -1, -1], fingers: [2, 3, 1, -1, -1, -1] }
        ],
        'dim7': [
            { name: 'Cdim7 Shape', desc: 'Symmetrical dim7.', frets: [-1, 3, 4, 2, 4, -1], fingers: [-1, 2, 3, 1, 4, -1] },
            { name: 'E Shape dim7', desc: '6th string root symmetrical dim7.', frets: [8, -1, 7, 8, 7, -1], fingers: [3, -1, 1, 4, 2, -1] },
            { name: 'D Shape dim7', desc: '4th string root symmetrical dim7.', frets: [-1, -1, 10, 11, 10, 11], fingers: [-1, -1, 1, 3, 2, 4] }
        ],
        'add9': [
            { name: 'Open Cadd9', desc: 'Standard acoustic Cadd9.', frets: [-1, 3, 2, 0, 3, 0], fingers: [-1, 2, 1, 0, 3, 0] },
            { name: 'E Shape add9 (No 5th)', desc: '6th string root, no barre needed.', frets: [8, 5, -1, 9, -1, -1], fingers: [2, 1, -1, 3, -1, -1] },
            { name: 'D Shape add9 (No 5th)', desc: '4th string root, no barre needed.', frets: [-1, -1, 10, 9, -1, 10], fingers: [-1, -1, 2, 1, -1, 3] }
        ],
        'aug': [
            { name: 'Caug Shape', desc: 'Standard augmented triad.', frets: [-1, 3, 2, 1, 1, -1], fingers: [-1, 3, 2, 1, 1, -1] },
            { name: 'E Shape aug', desc: '6th string root augmented triad.', frets: [8, -1, -1, 9, 9, -1], fingers: [1, -1, -1, 2, 3, -1] },
            { name: 'D Shape aug', desc: '4th string root augmented triad.', frets: [-1, -1, 10, 9, 9, -1], fingers: [-1, -1, 3, 1, 2, -1] }
        ]
    },
    'D': {
        'Major': [
            { name: 'Open D Shape', desc: 'Standard acoustic open D.', frets: [-1, -1, 0, 2, 3, 2], fingers: [-1, -1, 0, 1, 3, 2] }
        ],
        'm': [
            { name: 'Open Dm Shape', desc: 'Standard open D minor.', frets: [-1, -1, 0, 2, 3, 1], fingers: [-1, -1, 0, 2, 3, 1] }
        ],
        'm7': [
            { name: 'Open Dm7 Shape', desc: 'Easy open minor 7th.', frets: [-1, -1, 0, 2, 1, 1], fingers: [-1, -1, 0, 2, 1, 1] }
        ],
        '5': [
            { name: 'Open D5', desc: 'Fat sounding open power chord.', frets: [-1, -1, 0, 2, 3, -1], fingers: [-1, -1, 0, 1, 3, -1] }
        ],
        'sus2': [
            { name: 'Open Dsus2', desc: 'Dreamy open suspended 2.', frets: [-1, -1, 0, 2, 3, 0], fingers: [-1, -1, 0, 1, 3, 0] }
        ],
        'sus4': [
            { name: 'Open Dsus4', desc: 'Resolved to D major commonly.', frets: [-1, -1, 0, 2, 3, 3], fingers: [-1, -1, 0, 1, 3, 4] }
        ],
        '7': [
            { name: 'Open D7 Shape', desc: 'Folksy dominant 7th.', frets: [-1, -1, 0, 2, 1, 2], fingers: [-1, -1, 0, 2, 1, 3] }
        ],
        'maj7': [
            { name: 'Open Dmaj7 Shape', desc: 'Lush major 7th open.', frets: [-1, -1, 0, 2, 2, 2], fingers: [-1, -1, 0, 1, 1, 1] }
        ],
        'add9': [
            { name: 'Open Dadd9', desc: 'Beautiful open ringing strings.', frets: [-1, -1, 4, 2, 3, 0], fingers: [-1, -1, 3, 1, 2, 0] }
        ],
        'aug': [
            { name: 'Daug Shape', desc: 'Tense augmented passing chord.', frets: [-1, -1, 0, 3, 3, 2], fingers: [-1, -1, 0, 2, 3, 1] }
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
            { name: 'Fadd9 Barre', desc: 'Standard major with added 9.', frets: [1, 3, 3, 2, 1, 3], fingers: [1, 3, 4, 2, 1, 4] }
        ],
        'aug': [
            { name: 'Faug Shape', desc: 'Mid-neck augmented shape.', frets: [-1, -1, 3, 2, 2, 1], fingers: [-1, -1, 4, 2, 3, 1] }
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
            { name: 'Am7 (No 5th)', desc: 'Popular omitted 5th voicing.', frets: [-1, 0, -1, 0, 1, -1], fingers: [-1, 0, -1, 0, 1, -1] }
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
        ]
    },
    'B': {
        // 🌟 Bm7 등 실전 폼 전면 추가
        'm7': [
            { name: 'Bm7 Shape', desc: 'Standard Bm7 barre chord.', frets: [-1, 2, 4, 2, 3, 2], fingers: [-1, 1, 3, 1, 2, 1] },
            { name: 'Bm7 (No 5th)', desc: 'Very common acoustic shell voicing (like your screenshot!).', frets: [-1, 2, -1, 2, 3, -1], fingers: [-1, 1, -1, 2, 3, -1] }
        ],
        '7': [
            { name: 'Open B7 Shape', desc: 'Classic blues turnaround chord.', frets: [-1, 2, 1, 2, 0, 2], fingers: [-1, 2, 1, 3, 0, 4] }
        ],
        'add9': [
            { name: 'Badd9 Shape', desc: 'Moved Aadd9 shape.', frets: [-1, 2, 4, 6, 4, 2], fingers: [-1, 1, 2, 4, 3, 1] }
        ],
        'aug': [
            { name: 'Baug Shape', desc: 'Tense augmented flavor.', frets: [-1, 2, 1, 0, 0, -1], fingers: [-1, 2, 1, 0, 0, -1] }
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