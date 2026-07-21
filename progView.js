// progView.js

// 🌟 다이어토닉 화성 데이터: 7개 모드 + 하모닉/멜로딕 마이너, 각각 반음 오프셋/코드 품질/로마 숫자
// 품질은 각 디그리에서 3화음(1-3-5)을 쌓아 3rd/5th 반음 간격으로 직접 분류해서 검증함(Major/m/dim/aug)
const PROG_SCALES = {
    ionian: {
        label: 'Major (Ionian)',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        qualities: ['Major', 'm', 'm', 'Major', 'Major', 'm', 'dim'],
        numerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
    },
    dorian: {
        label: 'Dorian',
        intervals: [0, 2, 3, 5, 7, 9, 10],
        qualities: ['m', 'm', 'Major', 'Major', 'm', 'dim', 'Major'],
        numerals: ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII']
    },
    phrygian: {
        label: 'Phrygian',
        intervals: [0, 1, 3, 5, 7, 8, 10],
        qualities: ['m', 'Major', 'Major', 'm', 'dim', 'Major', 'm'],
        numerals: ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii']
    },
    lydian: {
        label: 'Lydian',
        intervals: [0, 2, 4, 6, 7, 9, 11],
        qualities: ['Major', 'Major', 'm', 'dim', 'Major', 'm', 'm'],
        numerals: ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii']
    },
    mixolydian: {
        label: 'Mixolydian',
        intervals: [0, 2, 4, 5, 7, 9, 10],
        qualities: ['Major', 'm', 'dim', 'Major', 'm', 'm', 'Major'],
        numerals: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII']
    },
    aeolian: {
        label: 'Minor (Aeolian)',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        qualities: ['m', 'dim', 'Major', 'm', 'm', 'Major', 'Major'],
        numerals: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']
    },
    locrian: {
        label: 'Locrian',
        intervals: [0, 1, 3, 5, 6, 8, 10],
        qualities: ['dim', 'Major', 'm', 'm', 'Major', 'Major', 'm'],
        numerals: ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii']
    },
    harmonicMinor: {
        label: 'Harmonic Minor',
        intervals: [0, 2, 3, 5, 7, 8, 11],
        qualities: ['m', 'dim', 'aug', 'm', 'Major', 'Major', 'dim'],
        numerals: ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°']
    },
    melodicMinor: {
        label: 'Melodic Minor',
        intervals: [0, 2, 3, 5, 7, 9, 11],
        qualities: ['m', 'm', 'aug', 'Major', 'Major', 'dim', 'dim'],
        numerals: ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°']
    }
};

const PROG_SCALE_ORDER = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian', 'harmonicMinor', 'melodicMinor'];

// 🌟 자주 쓰이는 진행을 스케일 디그리 인덱스(0-6)로 표현 - 어떤 스케일이든 그 스케일의 실제 코드 품질/숫자로 대입됨
const PROG_PRESET_DEGREES = [
    { degrees: [0, 4, 5, 3] },
    { degrees: [0, 3, 4] },
    { degrees: [1, 4, 0] },
    { degrees: [5, 3, 0, 4] },
    { degrees: [0, 5, 3, 4] },
    { degrees: [0, 6, 5] }
];

// 🌟 "다음 코드 추천"용 단순화된 기능화성 이동 규칙 (으뜸음 중심 진행 경향 - 딸림→으뜸, 버금딸림→딸림 등)
// 디그리 인덱스(0-6) 기준이라 어떤 스케일에서도 그대로 적용됨
const PROG_TRANSITIONS = {
    0: [3, 4, 5, 1],
    1: [4, 3, 6],
    2: [5, 3],
    3: [4, 0, 1],
    4: [0, 5],
    5: [3, 1, 4],
    6: [0]
};
const PROG_START_DEGREES = [0, 3, 4, 5];

const PROG_MEASURE_SIZE = 4; // 한 마디에 들어가는 코드 수(4/4박자 기준 - 코드 하나당 한 박)
const PROG_MINI_SCALE = 0.58; // 시트 위 미니 파지법 다이어그램의 축소 비율 (CSS .prog-mini-voicing의 scale()과 반드시 일치)

window.progState = window.progState || {
    keyRoot: 'C',
    scale: 'ionian',
    sequence: []
};

// 🌟 파지법 선택 오버레이 상태 (열려있지 않으면 null)
let progPickerState = null;

function progComputeDiatonicChords(keyRoot, scale) {
    const def = PROG_SCALES[scale];
    const keyIdx = window.chromScale.indexOf(keyRoot);
    return def.intervals.map((offset, i) => ({
        root: window.chromScale[(keyIdx + offset) % 12],
        quality: def.qualities[i],
        numeral: def.numerals[i],
        degreeIndex: i
    }));
}

function progChordLabel(root, quality) {
    return root + (quality === 'Major' ? '' : quality);
}

// 🌟 팔레트(다이어토닉/추천) 칩을 드래그해서 시트에 놓을 수 있게 만드는 공통 헬퍼
function progMakeChipDraggable(chip, chord) {
    chip.draggable = true;
    chip.ondragstart = (e) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('application/json', JSON.stringify({ type: 'new', chord }));
        chip.classList.add('dragging');
    };
    chip.ondragend = () => chip.classList.remove('dragging');
}

// 🌟 특정 코드의 실제 연주 가능한 파지법 목록을 가져오는 공통 헬퍼 (코드 사전과 동일한 데이터/필터링 로직 재사용)
function progGetVoicings(root, quality) {
    if (!window.dictView) return [];
    return window.dictView.getChordVoicings(root, quality);
}

function progVoicingToStored(v) {
    return { name: v.name, frets: v.frets.slice(), fingers: (v.fingers || []).slice() };
}

// 🌟 커서 위치에서 가장 가까운 시트 슬롯을 찾아 그 앞/뒤 중 어디에 꽂을지 인덱스로 계산
function progComputeDropIndex(container, clientX, clientY) {
    const chips = [...container.querySelectorAll('.prog-sheet-slot:not(.dragging)')];
    if (chips.length === 0) return 0;
    let closestIdx = chips.length, closestDist = Infinity, insertBefore = false;
    chips.forEach((chip, i) => {
        const rect = chip.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(clientX - cx, clientY - cy);
        if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
            insertBefore = clientX < cx;
        }
    });
    return insertBefore ? closestIdx : closestIdx + 1;
}

window.progView = {
    renderAll: function() {
        this.renderKeyButtons();
        this.renderScaleButtons();
        this.renderDiatonicChords();
        this.renderPresets();
        this.renderSequence();
        this.renderSuggestions();
    },

    renderKeyButtons: function() {
        const area = document.getElementById('prog-key-buttons');
        if (!area) return;
        area.innerHTML = '';
        window.rootLayout.forEach(item => {
            const b = document.createElement('button');
            b.textContent = item.note;
            b.style.gridColumn = item.col;
            b.style.gridRow = item.row;
            b.classList.toggle('active', item.note === window.progState.keyRoot);
            b.onclick = () => {
                window.progState.keyRoot = item.note;
                this.renderKeyButtons();
                this.renderDiatonicChords();
                this.renderPresets();
                this.renderSuggestions();
            };
            area.appendChild(b);
        });
    },

    renderScaleButtons: function() {
        const area = document.getElementById('prog-scale-buttons');
        if (!area) return;
        area.innerHTML = '';
        PROG_SCALE_ORDER.forEach(key => {
            const b = document.createElement('button');
            b.textContent = PROG_SCALES[key].label;
            b.classList.toggle('active', window.progState.scale === key);
            b.onclick = () => {
                window.progState.scale = key;
                this.renderScaleButtons();
                this.renderDiatonicChords();
                this.renderPresets();
                this.renderSuggestions();
            };
            area.appendChild(b);
        });
    },

    renderDiatonicChords: function() {
        const area = document.getElementById('prog-diatonic-chords');
        if (!area) return;
        area.innerHTML = '';
        const chords = progComputeDiatonicChords(window.progState.keyRoot, window.progState.scale);
        chords.forEach(c => {
            const chip = document.createElement('div');
            chip.className = 'prog-chip';
            chip.innerHTML = `<span class="prog-chip-numeral">${c.numeral}</span><span class="prog-chip-name">${progChordLabel(c.root, c.quality)}</span>`;
            chip.onclick = () => this.openPicker(c, {});
            progMakeChipDraggable(chip, c);
            area.appendChild(chip);
        });
    },

    // 🌟 지금까지 쌓은 진행의 마지막 코드를 기준으로 "다음에 어울리는 코드"를 추천 (기능화성 이동 경향 기반)
    renderSuggestions: function() {
        const area = document.getElementById('prog-suggestions');
        const label = document.getElementById('prog-suggestions-label');
        if (!area) return;
        area.innerHTML = '';

        const chords = progComputeDiatonicChords(window.progState.keyRoot, window.progState.scale);
        const seq = window.progState.sequence;

        let degrees, labelText;
        if (seq.length === 0) {
            degrees = PROG_START_DEGREES;
            labelText = 'Good chords to start a progression with:';
        } else {
            const lastChord = seq[seq.length - 1];
            degrees = PROG_TRANSITIONS[lastChord.degreeIndex] || [];
            labelText = `Chords that often follow ${progChordLabel(lastChord.root, lastChord.quality)} (${lastChord.numeral}):`;
        }
        if (label) label.textContent = labelText;

        degrees.forEach(d => {
            const c = chords[d];
            const chip = document.createElement('div');
            chip.className = 'prog-chip prog-suggest-chip';
            chip.innerHTML = `<span class="prog-chip-numeral">${c.numeral}</span><span class="prog-chip-name">${progChordLabel(c.root, c.quality)}</span>`;
            chip.onclick = () => this.openPicker(c, {});
            progMakeChipDraggable(chip, c);
            area.appendChild(chip);
        });
    },

    renderPresets: function() {
        const area = document.getElementById('prog-presets');
        if (!area) return;
        area.innerHTML = '';
        const chords = progComputeDiatonicChords(window.progState.keyRoot, window.progState.scale);
        const numerals = PROG_SCALES[window.progState.scale].numerals;
        PROG_PRESET_DEGREES.forEach(preset => {
            const chip = document.createElement('div');
            chip.className = 'prog-chip prog-preset-chip';
            chip.textContent = preset.degrees.map(d => numerals[d]).join(' - ');
            chip.onclick = () => {
                window.progState.sequence = preset.degrees.map(d => {
                    const c = chords[d];
                    const voicings = progGetVoicings(c.root, c.quality);
                    return { ...c, voicing: voicings[0] ? progVoicingToStored(voicings[0]) : null };
                });
                this.renderSequence();
            };
            area.appendChild(chip);
        });
    },

    // 🌟 실제 악보처럼 코드를 마디(4개씩) 단위로 나누고, 각 코드는 텍스트 대신 선택된 파지법 다이어그램으로 그림
    renderSequence: function() {
        const area = document.getElementById('prog-sequence');
        if (!area) return;
        area.innerHTML = '';

        const sequence = window.progState.sequence;
        if (sequence.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'v-grid-empty';
            empty.id = 'prog-sequence-empty';
            empty.textContent = 'Click or drag chords on the left to build a progression.';
            area.appendChild(empty);
            this.renderSuggestions();
            return;
        }

        const measureCount = Math.ceil(sequence.length / PROG_MEASURE_SIZE);
        let flatIdx = 0;

        for (let m = 0; m < measureCount; m++) {
            const measureDiv = document.createElement('div');
            measureDiv.className = 'prog-measure' + (m === measureCount - 1 ? ' last-measure' : '');
            const numberLabel = document.createElement('div');
            numberLabel.className = 'prog-measure-number';
            numberLabel.textContent = m + 1;
            measureDiv.appendChild(numberLabel);
            area.appendChild(measureDiv);

            for (let s = 0; s < PROG_MEASURE_SIZE && flatIdx < sequence.length; s++, flatIdx++) {
                const idx = flatIdx;
                const c = sequence[idx];

                const slot = document.createElement('div');
                slot.className = 'prog-sheet-slot';
                slot.title = 'Click to change fingering. Drag to reorder.';

                const numeralEl = document.createElement('div');
                numeralEl.className = 'prog-slot-numeral';
                numeralEl.textContent = c.numeral;
                slot.appendChild(numeralEl);

                const diagramWrap = document.createElement('div');
                diagramWrap.className = 'prog-mini-voicing';
                slot.appendChild(diagramWrap);

                measureDiv.appendChild(slot);

                let voicing = c.voicing;
                if (!voicing) {
                    const fallback = progGetVoicings(c.root, c.quality)[0];
                    voicing = fallback ? progVoicingToStored(fallback) : null;
                }

                if (voicing) {
                    const prevRoot = window.currentRoot;
                    window.currentRoot = c.root;
                    const card = window.dictView.renderVerticalDiagram(voicing, false, null);
                    window.currentRoot = prevRoot;
                    diagramWrap.appendChild(card);
                    const rect = card.getBoundingClientRect();
                    diagramWrap.style.width = (rect.width * PROG_MINI_SCALE) + 'px';
                    diagramWrap.style.height = (rect.height * PROG_MINI_SCALE) + 'px';
                }

                const nameEl = document.createElement('div');
                nameEl.className = 'prog-slot-name';
                nameEl.textContent = progChordLabel(c.root, c.quality);
                slot.appendChild(nameEl);

                const removeBtn = document.createElement('div');
                removeBtn.className = 'prog-slot-remove';
                removeBtn.title = 'Remove';
                removeBtn.textContent = '×';
                removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    window.progState.sequence.splice(idx, 1);
                    this.renderSequence();
                };
                slot.appendChild(removeBtn);

                slot.onclick = () => this.openPicker({ root: c.root, quality: c.quality, numeral: c.numeral, degreeIndex: c.degreeIndex }, { editIndex: idx });

                slot.draggable = true;
                slot.ondragstart = (e) => {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('application/json', JSON.stringify({ type: 'reorder', fromIndex: idx }));
                    slot.classList.add('dragging');
                };
                slot.ondragend = () => slot.classList.remove('dragging');
            }
        }

        this.renderSuggestions();
    },

    // 🌟 파지법 선택 오버레이 열기. opts.insertIndex(드래그 드롭 위치)나 opts.editIndex(이미 시트에 있는 코드 수정) 중 하나를 전달
    openPicker: function(chord, opts) {
        const voicings = progGetVoicings(chord.root, chord.quality);
        let startIndex = 0;

        if (opts.editIndex !== undefined && opts.editIndex !== null) {
            const existing = window.progState.sequence[opts.editIndex];
            if (existing && existing.voicing) {
                const found = voicings.findIndex(v => JSON.stringify(v.frets) === JSON.stringify(existing.voicing.frets));
                if (found >= 0) startIndex = found;
            }
        }

        progPickerState = {
            chord,
            voicings,
            index: startIndex,
            insertIndex: opts.insertIndex !== undefined ? opts.insertIndex : null,
            editIndex: opts.editIndex !== undefined ? opts.editIndex : null
        };
        this.renderPicker();
    },

    closePicker: function() {
        progPickerState = null;
        const overlay = document.getElementById('prog-picker-overlay');
        if (overlay) { overlay.classList.remove('open'); overlay.innerHTML = ''; }
    },

    renderPicker: function() {
        const overlay = document.getElementById('prog-picker-overlay');
        if (!overlay || !progPickerState) return;
        overlay.innerHTML = '';
        overlay.classList.add('open');

        const { chord, voicings, index, editIndex } = progPickerState;

        const panel = document.createElement('div');
        panel.className = 'prog-picker-panel';
        panel.onclick = (e) => e.stopPropagation();

        const closeRow = document.createElement('div');
        closeRow.className = 'prog-picker-cancel';
        const closeBtn = document.createElement('button');
        closeBtn.className = 'prog-picker-close';
        closeBtn.textContent = '✕';
        closeBtn.onclick = () => this.closePicker();
        closeRow.appendChild(closeBtn);
        panel.appendChild(closeRow);

        const title = document.createElement('div');
        title.className = 'prog-picker-title';
        title.textContent = `${progChordLabel(chord.root, chord.quality)} (${chord.numeral})`;
        panel.appendChild(title);

        const subtitle = document.createElement('div');
        subtitle.className = 'prog-picker-subtitle';
        subtitle.textContent = editIndex !== null ? 'Choose a different fingering' : 'Choose a fingering to place on the sheet';
        panel.appendChild(subtitle);

        if (voicings.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'v-grid-empty';
            empty.textContent = 'No practical fingering found for this chord.';
            panel.appendChild(empty);
        } else {
            const voicing = voicings[index];
            const prevRoot = window.currentRoot;
            window.currentRoot = chord.root;
            const card = window.dictView.renderVerticalDiagram(voicing, true, null);
            window.currentRoot = prevRoot;
            panel.appendChild(card);

            const nav = document.createElement('div');
            nav.className = 'prog-picker-nav';

            const prevBtn = document.createElement('button');
            prevBtn.textContent = '‹ Prev';
            prevBtn.onclick = () => {
                progPickerState.index = (progPickerState.index - 1 + voicings.length) % voicings.length;
                this.renderPicker();
            };

            const posLabel = document.createElement('div');
            posLabel.className = 'prog-picker-position';
            posLabel.textContent = `${index + 1} / ${voicings.length}`;

            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next ›';
            nextBtn.onclick = () => {
                progPickerState.index = (progPickerState.index + 1) % voicings.length;
                this.renderPicker();
            };

            nav.appendChild(prevBtn);
            nav.appendChild(posLabel);
            nav.appendChild(nextBtn);
            panel.appendChild(nav);

            const actions = document.createElement('div');
            actions.className = 'prog-picker-actions';

            const playBtn = document.createElement('button');
            playBtn.className = 'side-btn';
            playBtn.textContent = '🔊 Play';
            playBtn.onclick = () => { if (window.chordAudio) window.chordAudio.playFrets(voicing.frets); };

            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = editIndex !== null ? 'Save Fingering' : 'Add to Sheet';
            confirmBtn.onclick = () => this.confirmPicker();

            actions.appendChild(playBtn);
            actions.appendChild(confirmBtn);
            panel.appendChild(actions);
        }

        overlay.appendChild(panel);
    },

    confirmPicker: function() {
        if (!progPickerState) return;
        const { chord, voicings, index, insertIndex, editIndex } = progPickerState;
        const voicing = voicings[index];

        const item = {
            root: chord.root,
            quality: chord.quality,
            numeral: chord.numeral,
            degreeIndex: chord.degreeIndex,
            voicing: voicing ? progVoicingToStored(voicing) : null
        };

        if (editIndex !== null) {
            window.progState.sequence[editIndex] = item;
        } else {
            const at = insertIndex !== null ? insertIndex : window.progState.sequence.length;
            window.progState.sequence.splice(at, 0, item);
        }

        this.closePicker();
        this.renderSequence();
    },

    handleSheetDrop: function(e) {
        e.preventDefault();
        const area = document.getElementById('prog-sequence');
        area.classList.remove('drag-over');

        let payload;
        try {
            payload = JSON.parse(e.dataTransfer.getData('application/json'));
        } catch (err) {
            return;
        }

        const dropIndex = progComputeDropIndex(area, e.clientX, e.clientY);

        if (payload.type === 'reorder') {
            const [moved] = window.progState.sequence.splice(payload.fromIndex, 1);
            window.progState.sequence.splice(dropIndex, 0, moved);
            this.renderSequence();
        } else if (payload.type === 'new') {
            // 🌟 드래그로 놓아도 바로 꽂지 않고, 그 위치를 기억해뒀다가 파지법을 고른 뒤에 삽입
            this.openPicker(payload.chord, { insertIndex: dropIndex });
        }
    },

    // 🌟 지금 만든 진행을 흰 배경 PNG로 그려서 다운로드 (실제 악보/문서에 바로 붙여넣을 수 있게)
    exportAsImage: function() {
        const sequence = window.progState.sequence;
        if (sequence.length === 0) {
            alert('Add some chords to your progression first.');
            return;
        }

        const chipW = 150, chipH = 110, gap = 20, padding = 40, headerH = 70;
        const canvas = document.createElement('canvas');
        canvas.width = sequence.length * chipW + (sequence.length - 1) * gap + padding * 2;
        canvas.height = headerH + chipH + padding * 2;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scaleLabel = PROG_SCALES[window.progState.scale].label;
        ctx.fillStyle = '#1a1c23';
        ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(`${window.progState.keyRoot} ${scaleLabel}`, padding, padding);
        ctx.fillStyle = '#828997';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('Guitar Chord Assistant', padding, padding + 30);

        sequence.forEach((c, idx) => {
            const x = padding + idx * (chipW + gap);
            const y = padding + headerH;

            ctx.fillStyle = '#f4f5f7';
            ctx.strokeStyle = '#d7dae0';
            ctx.lineWidth = 1;
            const r = 10;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + chipW, y, x + chipW, y + chipH, r);
            ctx.arcTo(x + chipW, y + chipH, x, y + chipH, r);
            ctx.arcTo(x, y + chipH, x, y, r);
            ctx.arcTo(x, y, x + chipW, y, r);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#828997';
            ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(c.numeral, x + chipW / 2, y + 16);

            ctx.fillStyle = '#1a1c23';
            ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillText(progChordLabel(c.root, c.quality), x + chipW / 2, y + 46);
            ctx.textAlign = 'left';
        });

        const link = document.createElement('a');
        const scaleFileTag = window.progState.scale;
        link.download = `${window.progState.keyRoot}-${scaleFileTag}-progression.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const clearBtn = document.getElementById('prog-clear-btn');
    if (clearBtn) clearBtn.onclick = () => {
        window.progState.sequence = [];
        window.progView.renderSequence();
    };

    const exportBtn = document.getElementById('prog-export-btn');
    if (exportBtn) exportBtn.onclick = () => window.progView.exportAsImage();

    const sheet = document.getElementById('prog-sequence');
    if (sheet) {
        sheet.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            sheet.classList.add('drag-over');
        });
        sheet.addEventListener('dragleave', (e) => {
            if (!sheet.contains(e.relatedTarget)) sheet.classList.remove('drag-over');
        });
        sheet.addEventListener('drop', (e) => window.progView.handleSheetDrop(e));
    }

    const pickerOverlay = document.getElementById('prog-picker-overlay');
    if (pickerOverlay) {
        pickerOverlay.addEventListener('click', (e) => {
            if (e.target === pickerOverlay) window.progView.closePicker();
        });
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && progPickerState) window.progView.closePicker();
    });

    window.progView.renderAll();
});
