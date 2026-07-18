# 🎸 Guitar Chord Assistant

An interactive guitar chord dictionary, reverse chord finder, and songwriting tips assistant, built as a single-page vanilla JS app.

**Live demo:** https://markever15.github.io/guitar-chord-assistant/

## Features

### 📖 Chord Dictionary
- Look up any of **12 roots × 29 chord qualities** (major, minor, 7th, 9th, 11th, 13th, sus, dim, aug, altered dominants, and more) — 348 combinations total.
- Every chord comes with **multiple verified fingerings**: an open/CAGED-style shape plus movable 6th-string (E shape), 5th-string (A shape), and 4th-string (D shape) voicings, so there's almost always a comfortable low-fret option.
- Search by name (e.g. `G#m7`, `Bb13`, `F#7#9`) or browse by root/quality buttons.
- Real fretboard inlay dots (3/5/7/9/12/15 frets) and finger-number markers, just like a real guitar neck.
- Click "Play" to hear any voicing, or "Show Notes" to see every occurrence of the chord tones across the neck.
- Slash chord shelf for common bass-note inversions (e.g. `C/E`, `G/B`).

### 🔍 Chord Finder (reverse lookup)
- Click frets directly on a blank fretboard and get an instant chord name, including slash-chord bass notes.

### ✍️ Songwriting Tips
- 15 short articles covering fretboard reading, barre chords, capos, transposition, diatonic harmony, voice leading, strumming patterns, and more.

## Tech

Plain HTML/CSS/JavaScript — no build step, no dependencies, no framework. Just open `index.html` or serve the folder with any static file server.

```
npx serve .
```

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Page structure for all three tabs |
| `style.css` | Styling, incl. mobile-responsive layout |
| `chords.js` | Chord formulas and fingering data |
| `app.js` | Global state, tab logic, shared helpers |
| `dictView.js` | Chord Dictionary tab logic |
| `recogView.js` | Chord Finder tab logic |
| `audio.js` | Web Audio playback (samples or synthesized) |
| `tips/*.html` | Songwriting tip articles |
