// 🌟 브라우저용 스크립트(app.js / dictView.js)를 Node에서 그대로 불러오기 위한 최소 DOM 대역.
//    페이지 생성기가 화면 로직과 똑같은 getChordVoicings를 써야 결과가 어긋나지 않는다.
const path = require('path');
const stubEl = () => ({
    style: {}, dataset: {}, children: [],
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    appendChild() {}, insertBefore() {}, remove() {}, setAttribute() {},
    getAttribute: () => null, addEventListener() {}, removeEventListener() {},
    querySelectorAll: () => [], querySelector: () => null,
    cloneNode() { return stubEl(); },
    innerHTML: '', textContent: '', offsetWidth: 0, clientWidth: 0
});

global.window = {
    addEventListener() {}, removeEventListener() {},
    matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }),
    innerWidth: 1200, innerHeight: 800,
    location: { href: '', search: '', hash: '' },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    requestAnimationFrame(fn) { return fn && 0; },
    getComputedStyle: () => ({ getPropertyValue: () => '' })
};
global.document = {
    createElement: stubEl, createElementNS: stubEl, createTextNode: () => stubEl(),
    querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
    addEventListener() {}, removeEventListener() {},
    body: stubEl(), documentElement: stubEl(), head: stubEl(),
    readyState: 'complete'
};
global.navigator = { userAgent: 'node' };
global.localStorage = window.localStorage;
global.AudioContext = function () { return { createOscillator: stubEl, createGain: stubEl, destination: {} }; };

const dir = path.join(__dirname, '..');
require(path.join(dir, 'chords.js'));
require(path.join(dir, 'generatedVoicings.js'));
require(path.join(dir, 'app.js'));
require(path.join(dir, 'dictView.js'));

module.exports = global.window;
