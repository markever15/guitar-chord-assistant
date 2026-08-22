// 🌟 진행(Progression) 탭.
//    사전이 "이 코드에 어떤 폼이 있나"에 답한다면, 여기는 "이 진행에서 어느 폼을 쓸까"에 답한다.
//    같은 코드라도 앞뒤 코드에 따라 잡아야 할 폼이 달라지는데, 그 판단을 손으로 하려면
//    보이싱 수천 개를 머릿속에 넣고 비교해야 한다. 그걸 대신 해 주는 게 이 탭의 존재 이유다.

window.progView = (() => {
    const SEMI = window.chromScale;                          // ['C','C#','D',...]
    const idx = n => SEMI.indexOf(n);
    const at = (root, step) => SEMI[(idx(root) + step) % 12];

    // 장음계·자연단음계의 반음 간격과, 각 자리에 쌓이는 3화음 성질
    const SCALES = {
        major: { steps: [0, 2, 4, 5, 7, 9, 11],
                 quals: ['Major', 'm', 'm', 'Major', 'Major', 'm', 'dim'],
                 roman: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'] },
        minor: { steps: [0, 2, 3, 5, 7, 8, 10],
                 quals: ['m', 'dim', 'Major', 'm', 'm', 'Major', 'Major'],
                 roman: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'] }
    };

    // 🌟 3화음만 쓰면 Major·m·dim 셋뿐이라 작곡 도구로는 반쪽이다. 자리마다 어떤 성질을
    //    쌓을지 골라 한 번에 바꾼다. 그 자리에 어울리지 않는 성질(예: vii°에 add9)은
    //    3화음으로 되돌린다 - 억지로 만들면 조성 밖 음이 섞인다.
    const FLAVORS = {
        triad:  { name: 'Triads', hint: 'The plain three-note chords.',
                  major: ['Major', 'm', 'm', 'Major', 'Major', 'm', 'dim'],
                  minor: ['m', 'dim', 'Major', 'm', 'm', 'Major', 'Major'] },
        seventh:{ name: '7ths', hint: 'Adds the seventh — the jazz and soul default.',
                  major: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'],
                  minor: ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7'] },
        add9:   { name: 'add9', hint: 'A ninth on top of the triad. Open and modern.',
                  major: ['add9', 'm(add9)', 'm(add9)', 'add9', 'add9', 'm(add9)', 'dim'],
                  minor: ['m(add9)', 'dim', 'add9', 'm(add9)', 'm(add9)', 'add9', 'add9'] },
        sixth:  { name: '6ths', hint: 'Sweeter and less final than a seventh.',
                  major: ['6', 'm6', 'm', '6', '6', 'm6', 'dim'],
                  minor: ['m6', 'dim', '6', 'm6', 'm', '6', '7'] },
        ninth:  { name: '9ths', hint: 'The full stack. Neo-soul and R&B territory.',
                  major: ['maj9', 'm9', 'm7', 'maj9', '9', 'm9', 'm7b5'],
                  minor: ['m9', 'm7b5', 'maj9', 'm9', 'm7', 'maj9', '9'] },
        sus:    { name: 'sus', hint: 'No third at all — neither happy nor sad.',
                  major: ['sus4', 'sus4', 'sus4', 'sus2', 'sus4', 'sus4', 'dim'],
                  minor: ['sus4', 'dim', 'sus2', 'sus4', 'sus4', 'sus2', 'sus4'] },
        // 🌟 록은 진행 전체가 파워 코드인 경우가 흔하다. 다만 감3화음 자리(장조 vii°, 단조 ii°)는
        //    5도가 이미 좁아서 파워 코드로 만들면 조성 밖 음이 나온다 - 그 자리는 그대로 둔다.
        power:  { name: '5 (power)', hint: 'No third, so nothing is major or minor. Rock and punk.',
                  major: ['5', '5', '5', '5', '5', '5', 'dim'],
                  minor: ['5', 'dim', '5', '5', '5', '5', '5'] }
    };

    // 코드 하나만 따로 바꿀 때 돌아가는 후보. 자리 성질에 맞는 것들만 모아 둔다.
    const SWAPS = {
        major: ['Major', 'maj7', 'add9', '6', 'maj9', 'sus2', 'sus4', '6/9', '5'],
        minor: ['m', 'm7', 'm(add9)', 'm6', 'm9', 'sus2', 'sus4', 'm6/9', '5'],
        dom:   ['Major', '7', '9', 'sus4', '7sus4', '13'],
        dim:   ['dim', 'm7b5', 'dim7']
    };
    function swapListFor(quality) {
        if (quality === 'dim' || quality === 'm7b5' || quality === 'dim7') return SWAPS.dim;
        if (quality === '7' || quality === '9' || quality === '13' || quality === '7sus4') return SWAPS.dom;
        if (quality === '5') return SWAPS.major;
        if (quality.startsWith('m') && quality !== 'maj7' && quality !== 'maj9') return SWAPS.minor;
        return SWAPS.major;
    }

    // 🌟 자리 번호로만 적어 두면 어느 조성에든 그대로 옮겨진다.
    //    실제 곡은 성질이 한 가지로 통일되지 않는다. ii-V-I만 해도 m7-7-maj7이지 3화음 셋이 아니고,
    //    조성 밖에서 빌려오는 코드(♭VII, 단조의 iv, 단조의 V7)가 곡의 성격을 만드는 일이 잦다.
    //    그래서 프리셋은 자리마다 성질을 직접 적고, 필요하면 반음 거리로 조성 밖 코드도 쓴다.
    //      { deg }        - 조성 안 자리. 성질은 현재 flavour를 따른다
    //      { deg, q }     - 조성 안 자리인데 성질을 못 박음
    //      { semi, q, roman } - 조성 밖. 으뜸음에서 반음 몇 칸인지로 지정
    const PRESETS = {
        major: [
            { name: 'I – V – vi – IV', chords: [{ deg: 0 }, { deg: 4 }, { deg: 5 }, { deg: 3 }],
              note: 'The four chords behind a huge share of pop songs.' },
            { name: 'I – vi – IV – V', chords: [{ deg: 0 }, { deg: 5 }, { deg: 3 }, { deg: 4 }],
              note: 'The 50s turnaround — doo-wop, ballads, early rock.' },
            { name: 'I – IV – V', chords: [{ deg: 0 }, { deg: 3 }, { deg: 4 }],
              note: 'Three chords, blues and folk and most of rock.' },
            { name: 'ii7 – V7 – Imaj7', chords: [{ deg: 1, q: 'm7' }, { deg: 4, q: '7' }, { deg: 0, q: 'maj7' }],
              note: 'The real jazz ii–V–I. Three different qualities, and that is the point.' },
            { name: 'Imaj7 – vi7 – ii7 – V7', chords: [{ deg: 0, q: 'maj7' }, { deg: 5, q: 'm7' }, { deg: 1, q: 'm7' }, { deg: 4, q: '7' }],
              note: 'The rhythm-changes turnaround. Circles back to the top every time.' },
            { name: 'I – IV – iv – I', chords: [{ deg: 0 }, { deg: 3 }, { semi: 5, q: 'm', roman: 'iv' }, { deg: 0 }],
              note: 'The borrowed minor iv — that sudden ache in a ballad chorus.' },
            { name: 'I – ♭VII – IV – I', chords: [{ deg: 0 }, { semi: 10, q: 'Major', roman: '♭VII' }, { deg: 3 }, { deg: 0 }],
              note: 'Borrowed from mixolydian. Rock without the pull of a leading tone.' },
            { name: 'I7 – IV7 – I7 – V7', chords: [{ deg: 0, q: '7' }, { deg: 3, q: '7' }, { deg: 0, q: '7' }, { deg: 4, q: '7' }],
              note: 'Twelve-bar blues. Everything is a dominant seventh, nothing resolves cleanly.' },
            { name: 'Iadd9 – V – vi7 – IV', chords: [{ deg: 0, q: 'add9' }, { deg: 4 }, { deg: 5, q: 'm7' }, { deg: 3 }],
              note: 'The pop loop with colour added only where it shows.' },
            { name: 'vi7 – ii7 – V7 – Imaj7', chords: [{ deg: 5, q: 'm7' }, { deg: 1, q: 'm7' }, { deg: 4, q: '7' }, { deg: 0, q: 'maj7' }],
              note: 'The long way home — each root falls a fourth into the next.' }
        ],
        minor: [
            { name: 'i – VI – III – VII', chords: [{ deg: 0 }, { deg: 5 }, { deg: 2 }, { deg: 6 }],
              note: 'The minor-key equivalent of the four-chord loop.' },
            { name: 'i – iv – v', chords: [{ deg: 0 }, { deg: 3 }, { deg: 4 }],
              note: 'Plain minor blues; all three chords are minor.' },
            { name: 'i – iv – V7 – i', chords: [{ deg: 0 }, { deg: 3 }, { semi: 7, q: '7', roman: 'V7' }, { deg: 0 }],
              note: 'Harmonic minor. The V turns major so it can pull back to the i.' },
            { name: 'i – VII – VI – V', chords: [{ deg: 0 }, { deg: 6 }, { deg: 5 }, { semi: 7, q: 'Major', roman: 'V' }],
              note: 'The Andalusian cadence — flamenco, and half the minor-key songs you know.' },
            { name: 'i7 – VImaj7 – IIImaj7 – VII7', chords: [{ deg: 0, q: 'm7' }, { deg: 5, q: 'maj7' }, { deg: 2, q: 'maj7' }, { deg: 6, q: '7' }],
              note: 'The same loop with sevenths — smoother, and it drifts toward the relative major.' },
            { name: 'i – iv – VII – III', chords: [{ deg: 0 }, { deg: 3 }, { deg: 6 }, { deg: 2 }],
              note: 'Moves toward the relative major without arriving.' }
        ]
    };

    let key = 'C';
    let mode = 'major';
    let progression = [];       // [{ root, quality, roman }]
    let openBias = true;        // 개방 코드를 우대할지 (초보 기본값)
    let flavor = 'triad';       // 자리마다 쌓을 성질
    let solved = null;          // [{ root, quality, roman, voicing }]
    let pickerAt = null;        // 대체 폼 목록을 펼쳐 둔 자리 (없으면 null)
    let pickerAll = false;      // 그 자리에서 전체 폼을 펼쳤는지

    // ── 보이싱 고르기 ────────────────────────────────────────────────
    // 코드 사이 손가락 이동. 짚는 줄은 프렛 차이, 짚다↔떼다는 고정 비용.
    function moveCost(a, b) {
        let d = 0;
        for (let s = 0; s < 6; s++) {
            const x = a.frets[s], y = b.frets[s];
            if (x > 0 && y > 0) d += Math.abs(x - y);
            else if ((x > 0) !== (y > 0)) d += 1.5;
        }
        return d;
    }

    // 폼 자체의 값. 이동만 최소화하면 서너 줄짜리 앙상한 폼만 남는다.
    function shapeCost(v, root, quality) {
        const sounding = v.frets.filter(f => f >= 0).length;
        const pressed = v.frets.filter(f => f > 0);
        const lo = pressed.length ? Math.min(...pressed) : 0;
        const pinned = (((window.pinnedRepresentatives[root] || {})[quality] || [])
            .some(f => f.join(',') === v.frets.join(',')));
        const opens = v.frets.filter(f => f === 0).length;
        let c = (6 - sounding) * 2.5;              // 안 울리는 줄마다 벌점
        if (pinned) c -= 3;                        // 손으로 골라둔 대표 폼 우대
        if (openBias) {
            // 🌟 개방현이 하나 있다고 위치를 봐주면 안 된다. 개방 D현 하나 낀 10프렛 폼이
            //    "개방 코드"로 둔갑해 이긴다. 위치 벌점은 늘 매기고, 개방현은 개수만큼만 깎는다.
            c += lo * 0.6 - opens * 1.2;
        }
        return c;
    }

    // 동적계획법 - 앞 코드까지의 최소 비용을 들고 다음 코드로 넘어간다.
    function solve() {
        if (!progression.length) return null;
        // 🌟 사람이 직접 고른 폼이 있으면 그 자리는 후보를 하나로 묶는다. 나머지 코드는
        //    그 폼을 전제로 다시 계산되므로, 한 곳을 고정하면 앞뒤가 따라 바뀐다.
        const lists = progression.map(p => {
            let vs = window.dictView.getChordVoicings(p.root, p.quality);
            if (p.lock) {
                const hit = vs.find(v => v.frets.join(',') === p.lock);
                if (hit) vs = [hit];
            }
            return vs.map(v => ({ ...p, voicing: v }));
        });
        if (lists.some(l => !l.length)) return null;

        let layer = lists[0].map(x => ({ x, cost: shapeCost(x.voicing, x.root, x.quality), path: [x] }));
        for (let i = 1; i < lists.length; i++) {
            layer = lists[i].map(x => {
                let best = null;
                for (const p of layer) {
                    const c = p.cost + moveCost(p.x.voicing, x.voicing) + shapeCost(x.voicing, x.root, x.quality);
                    if (!best || c < best.cost) best = { cost: c, path: p.path };
                }
                return { x, cost: best.cost, path: best.path.concat([x]) };
            });
        }
        return layer.reduce((a, b) => (a.cost < b.cost ? a : b)).path;
    }

    // 가장 높게 울리는 음 - 진행에서 멜로디가 어떻게 걸어가는지 보여준다.
    function topNote(v) {
        for (let s = 5; s >= 0; s--) if (v.frets[s] >= 0) return window.getNoteName(5 - s, v.frets[s]);
        return null;
    }

    const chordLabel = (root, quality) => (quality === 'Major' ? root : root + quality);

    // 프리셋 한 칸을 실제 코드로 푼다. 조성 밖 코드는 반음 거리로 직접 만든다.
    function resolveSlot(slot, dia) {
        if (slot.semi != null) {
            const root = at(key, slot.semi);
            let q = slot.q;
            if (!window.dictView.getChordVoicings(root, q).length) q = 'Major';
            return { root, quality: q, roman: slot.roman || '' };   // degree 없음 = flavour 영향 안 받음
        }
        const d = dia[slot.deg];
        if (!slot.q) return { ...d };
        const q = window.dictView.getChordVoicings(d.root, slot.q).length ? slot.q : d.quality;
        return { root: d.root, quality: q, roman: d.roman, degree: slot.deg, fixed: true };
    }

    function diatonic() {
        const sc = SCALES[mode];
        const fl = FLAVORS[flavor][mode];
        return sc.steps.map((st, i) => {
            const root = at(key, st);
            let q = fl[i];
            // 데이터에 없는 조합이면 3화음으로 되돌린다.
            if (!window.dictView.getChordVoicings(root, q).length) q = sc.quals[i];
            return { root, quality: q, roman: sc.roman[i], degree: i };
        });
    }

    // ── 그리기 ──────────────────────────────────────────────────────
    function renderKeyPicker() {
        const host = document.getElementById('prog-key-buttons');
        if (!host) return;
        host.innerHTML = '';
        window.rootLayout.forEach(item => {
            const b = document.createElement('button');
            b.textContent = item.note;
            b.className = 'notranslate';
            b.style.gridRow = item.row;
            b.style.gridColumn = item.col;
            if (item.note === key) b.classList.add('active');
            b.addEventListener('click', () => { key = item.note; progression = []; solved = null; pickerAt = null; pickerAll = false; renderAll(); });
            host.appendChild(b);
        });
        document.querySelectorAll('#prog-mode-buttons button').forEach(b => {
            b.classList.toggle('active', b.dataset.mode === mode);
        });
    }

    function renderFlavors() {
        const host = document.getElementById('prog-flavors');
        if (!host) return;
        host.innerHTML = '';
        Object.entries(FLAVORS).forEach(([k, f]) => {
            const b = document.createElement('button');
            b.textContent = f.name;
            b.title = f.hint;
            if (k === flavor) b.classList.add('active');
            b.addEventListener('click', () => {
                flavor = k;
                // 이미 쌓아둔 진행도 같은 자리 그대로 성질만 바꾼다.
                const dia = (() => { const t = flavor; flavor = k; const d = diatonic(); flavor = t; return d; })();
                progression = progression.map(p =>
                    (p.degree != null && !p.fixed) ? { ...dia[p.degree] } : p);
                solved = null; pickerAt = null; pickerAll = false; renderAll();
            });
            host.appendChild(b);
        });
        const hint = document.getElementById('prog-flavor-hint');
        if (hint) hint.textContent = FLAVORS[flavor].hint;
    }

    function renderDiatonic() {
        const host = document.getElementById('prog-diatonic');
        if (!host) return;
        host.innerHTML = '';
        diatonic().forEach(d => {
            const b = document.createElement('button');
            b.className = 'prog-degree';
            b.innerHTML = `<span class="prog-roman">${d.roman}</span><span class="notranslate">${chordLabel(d.root, d.quality)}</span>`;
            b.addEventListener('click', () => { progression.push(d); solved = null; pickerAt = null; pickerAll = false; renderAll(); });
            host.appendChild(b);
        });
    }

    function renderPresets() {
        const host = document.getElementById('prog-presets');
        if (!host) return;
        host.innerHTML = '';
        const dia = diatonic();
        PRESETS[mode].forEach(p => {
            const resolved = p.chords.map(c => resolveSlot(c, dia));
            const b = document.createElement('button');
            b.className = 'prog-preset';
            b.innerHTML = `<span class="prog-preset-name">${p.name}</span>`
                + `<span class="prog-preset-chords notranslate">${resolved.map(r => chordLabel(r.root, r.quality)).join(' · ')}</span>`
                + `<span class="prog-preset-note">${p.note}</span>`;
            b.addEventListener('click', () => {
                progression = resolved.map(r => ({ ...r }));
                solved = null; pickerAt = null; pickerAll = false; renderAll();
            });
            host.appendChild(b);
        });
    }

    function renderStrip() {
        const host = document.getElementById('prog-strip');
        if (!host) return;
        host.innerHTML = '';
        if (!progression.length) {
            host.innerHTML = '<p class="prog-empty">Tap a chord above, or start from one of the progressions.</p>';
            return;
        }
        progression.forEach((p, i) => {
            const chip = document.createElement('span');
            chip.className = 'prog-chip notranslate';
            chip.innerHTML = `<button class="prog-chip-name">${chordLabel(p.root, p.quality)}</button>`
                + `<button class="prog-chip-x" aria-label="remove">×</button>`;
            chip.querySelector('.prog-chip-x').addEventListener('click', e => {
                e.stopPropagation();
                progression.splice(i, 1); solved = null; pickerAt = null; pickerAll = false; renderAll();
            });
            // 🌟 코드 하나만 따로 바꾸기 - 작곡할 때 "저 Am만 Am7으로" 하는 그 동작이다.
            chip.querySelector('.prog-chip-name').addEventListener('click', e => {
                e.stopPropagation();
                const list = swapListFor(p.quality).filter(q => window.dictView.getChordVoicings(p.root, q).length);
                const at = list.indexOf(p.quality);
                progression[i] = { ...p, quality: list[(at + 1) % list.length] };
                solved = null; pickerAt = null; pickerAll = false; renderAll();
            });
            host.appendChild(chip);
        });
    }

    function renderResult() {
        const host = document.getElementById('prog-result');
        if (!host) return;
        host.innerHTML = '';
        if (!progression.length) return;

        solved = solve();
        if (!solved) { host.innerHTML = '<p class="prog-empty">No playable voicing set for that combination.</p>'; return; }

        const row = document.createElement('div');
        row.className = 'prog-voicing-row';
        solved.forEach((s, i) => {
            const cell = document.createElement('div');
            cell.className = 'prog-voicing-cell';
            if (pickerAt === i) cell.classList.add('picking');
            const cap = document.createElement('div');
            cap.className = 'prog-voicing-cap';
            cap.innerHTML = `<span class="prog-roman">${s.roman || ''}</span> <strong class="notranslate">${chordLabel(s.root, s.quality)}</strong>`
                + (progression[i].lock ? ' <span class="prog-locked" title="You chose this shape">📌</span>' : '');
            cell.appendChild(cap);
            const d = window.dictView.renderVerticalDiagram(s.voicing, false, () => {
                window.chordAudio && window.chordAudio.playFrets(s.voicing.frets);
                pickerAt = (pickerAt === i ? null : i); pickerAll = false;
                renderResult();
            });
            if (d) cell.appendChild(d);
            // 🌟 진행에서 사전으로 나가는 문. 그 코드를 더 파고들고 싶을 때가 있다.
            const dict = document.createElement('a');
            dict.className = 'prog-dict-link';
            dict.href = `index.html?c=${encodeURIComponent(s.root)}&q=${encodeURIComponent(s.quality)}#tab-dictionary`;
            dict.textContent = 'in the dictionary →';
            dict.addEventListener('click', ev => {
                ev.preventDefault();
                window.currentRoot = s.root; window.currentQuality = s.quality;
                window.currentVoicingIndex = 0; window.showAllVoicings = false;
                window.dictShowPicker = false;
                if (window.dictView) window.dictView.updateButtons();
                const t = document.querySelector('.nav-tab[data-target="tab-dictionary"]');
                if (t) t.click();
            });
            cell.appendChild(dict);

            const swap = document.createElement('button');
            swap.className = 'prog-swap-btn';
            swap.textContent = pickerAt === i ? 'Close' : 'Other shapes';
            swap.addEventListener('click', () => { pickerAt = (pickerAt === i ? null : i); pickerAll = false; renderResult(); });
            cell.appendChild(swap);
            row.appendChild(cell);
        });
        host.appendChild(row);

        if (pickerAt != null && solved[pickerAt]) renderPicker(host, pickerAt);

        // 🌟 맨 위 음의 흐름 - 진행에서 멜로디가 어떻게 움직이는지가 작곡에 바로 쓰인다.
        const tops = solved.map(s => topNote(s.voicing));
        const moves = solved.slice(1).reduce((a, s, i) => a + moveCost(solved[i].voicing, s.voicing), 0);
        const line = document.createElement('p');
        line.className = 'prog-analysis';
        line.innerHTML = `Top note walks <strong class="notranslate">${tops.join(' → ')}</strong>`
            + ` &middot; total finger movement <strong>${moves.toFixed(1)}</strong> frets`
            + (moves / Math.max(1, solved.length - 1) < 4 ? ' &mdash; these sit close together, so the changes stay smooth.' : '');
        host.appendChild(line);
    }

    // 🌟 한 코드의 모든 폼을 펼쳐 직접 고르게 한다. 고르면 그 자리는 고정되고
    //    나머지 코드가 그 폼에 맞춰 다시 계산된다.
    function renderPicker(host, i) {
        const p = progression[i];
        const all = window.dictView.getChordVoicings(p.root, p.quality);
        const chosen = solved[i].voicing.frets.join(',');

        // 🌟 폼을 스무 개 넘게 늘어놓으면 고르라는 게 아니라 포기하라는 화면이 된다.
        //    사전 탭이 쓰는 대표 선정을 그대로 써서, 서로 다른 자리·다른 소리인 것만 먼저 보인다.
        let list = all;
        if (!pickerAll) {
            const cat = window.dictView.getShapeRepresentatives(all, p.root, p.quality);
            const idxs = (cat && cat.pinned) ? cat.pinned.map(x => x.idx) : [];
            if (idxs.length) {
                // 지금 골라져 있는 폼이 대표에 없으면 같이 보여준다.
                const cur = all.findIndex(v => v.frets.join(',') === chosen);
                if (cur >= 0 && !idxs.includes(cur)) idxs.push(cur);
                list = idxs.sort((a, b) => a - b).map(x => all[x]);
            }
        }

        const box = document.createElement('div');
        box.className = 'prog-picker';
        const head = document.createElement('div');
        head.className = 'prog-picker-head';
        head.innerHTML = `<strong class="notranslate">${chordLabel(p.root, p.quality)}</strong>`
            + ` <span>${list.length === all.length
                ? `all ${all.length} shapes`
                : `${list.length} shapes worth knowing`} &mdash; pick one and the chords around it will re-fit</span>`;
        if (list.length < all.length) {
            const more = document.createElement('button');
            more.className = 'prog-auto-btn';
            more.textContent = `Show all ${all.length}`;
            more.addEventListener('click', () => { pickerAll = true; renderResult(); });
            head.appendChild(more);
        }
        if (p.lock) {
            const auto = document.createElement('button');
            auto.className = 'prog-auto-btn';
            auto.textContent = '↺ Back to automatic';
            auto.addEventListener('click', () => { delete progression[i].lock; solved = null; renderResult(); });
            head.appendChild(auto);
        }
        box.appendChild(head);

        const grid = document.createElement('div');
        grid.className = 'prog-picker-grid';
        list.forEach(v => {
            const key = v.frets.join(',');
            const d = window.dictView.renderVerticalDiagram(v, key === chosen, () => {
                progression[i].lock = key;
                window.chordAudio && window.chordAudio.playFrets(v.frets);
                solved = null; renderResult();
            });
            if (d) grid.appendChild(d);
        });
        box.appendChild(grid);
        host.appendChild(box);
    }

    function renderAll() {
        renderKeyPicker();
        renderFlavors();
        renderDiatonic();
        renderPresets();
        renderStrip();
        renderResult();
    }

    async function playProgression() {
        if (!solved || !solved.length) return;
        const btn = document.getElementById('prog-play-btn');
        if (btn) btn.disabled = true;
        for (const s of solved) {
            window.chordAudio && window.chordAudio.playFrets(s.voicing.frets);
            await new Promise(r => setTimeout(r, 1400));
        }
        if (btn) btn.disabled = false;
    }

    function init() {
        document.querySelectorAll('#prog-mode-buttons button').forEach(b => {
            b.addEventListener('click', () => { mode = b.dataset.mode; progression = []; solved = null; pickerAt = null; pickerAll = false; renderAll(); });
        });
        const clear = document.getElementById('prog-clear-btn');
        if (clear) clear.addEventListener('click', () => { progression = []; solved = null; pickerAt = null; pickerAll = false; renderAll(); });
        const play = document.getElementById('prog-play-btn');
        if (play) play.addEventListener('click', playProgression);
        const bias = document.getElementById('prog-bias-btn');
        if (bias) bias.addEventListener('click', () => {
            openBias = !openBias;
            bias.textContent = openBias ? '🪕 Open chords' : '🎸 Up the neck';
            bias.classList.toggle('active', openBias);
            renderAll();
        });
        renderAll();
    }

    // 🌟 사전 탭에서 "이 진행 열기"를 눌렀을 때 들어오는 문.
    function loadPreset(k, m, name) {
        key = k; mode = m;
        const preset = name ? (PRESETS[m] || []).find(x => x.name === name) : null;
        if (preset) {
            const dia = diatonic();
            progression = preset.chords.map(c => resolveSlot(c, dia));
        } else if (!name) {
            progression = [];   // 조성만 열어 주고 직접 짜게 둔다
        }
        solved = null; pickerAt = null; pickerAll = false;
        renderAll();
        const tab = document.querySelector('.nav-tab[data-target="tab-progressions"]');
        if (tab) tab.click();
        const el = document.getElementById('prog-result');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 🌟 chordContext가 같은 진행 정의를 읽어 쓴다 - 두 곳에 베껴두면 반드시 어긋난다.
    return { init, renderAll, loadPreset, PRESETS, SCALES, resolveSlot, diatonicFor: (k, m) => {
        const pk = key, pm = mode; key = k; mode = m;
        const d = diatonic(); key = pk; mode = pm; return d;
    } };
})();
