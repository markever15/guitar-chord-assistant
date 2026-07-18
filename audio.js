// audio.js
// samples/ 폴더에 녹음된 개방현 샘플이 있으면 그걸 피치시프트해서 재생하고,
// 없으면 Karplus-Strong 합성 사운드로 자동 대체(fallback)

window.chordAudio = (() => {
    let ctx = null;

    // window.openStringNotes(['E','B','G','D','A','E'], 고음 e -> 저음 E 순서)와 동일한 순서
    const OPEN_STRING_FREQS = [329.63, 246.94, 196.00, 146.83, 110.00, 82.41];
    const SAMPLE_NAMES = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']; // samples/E4.wav 등, 위 배열과 1:1 대응

    const sampleBuffers = new Array(6).fill(null);
    let samplesReady = null;

    function getContext() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }

    async function loadOneSample(context, name) {
        for (const ext of ['wav', 'mp3']) {
            try {
                const res = await fetch(`samples/${name}.${ext}`);
                if (!res.ok) continue;
                const arrayBuffer = await res.arrayBuffer();
                return await context.decodeAudioData(arrayBuffer);
            } catch (e) {
                // 파일이 없거나(file:// 로 직접 열었거나) 디코딩 실패 - 합성 사운드로 대체됨
            }
        }
        return null;
    }

    function ensureSamplesLoading(context) {
        if (!samplesReady) {
            samplesReady = Promise.all(
                SAMPLE_NAMES.map((name, i) => loadOneSample(context, name).then(buf => { sampleBuffers[i] = buf; }))
            );
        }
        return samplesReady;
    }

    // Karplus-Strong: 노이즈를 짧은 딜레이 루프에 넣고 감쇠시켜 튕긴 현 같은 소리를 생성
    function pluckedStringBuffer(context, frequency, duration) {
        const sampleRate = context.sampleRate;
        const bufferSize = Math.floor(sampleRate * duration);
        const buffer = context.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);

        const period = Math.max(2, Math.round(sampleRate / frequency));
        const ring = new Float32Array(period);
        for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;

        const damping = 0.996;
        let idx = 0;
        for (let n = 0; n < bufferSize; n++) {
            const next = (idx + 1) % period;
            ring[idx] = (ring[idx] + ring[next]) * 0.5 * damping;
            data[n] = ring[idx];
            idx = next;
        }
        return buffer;
    }

    function playBuffer(context, buffer, playbackRate, startTime, duration, volume) {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = playbackRate;

        const gain = context.createGain();
        gain.gain.setValueAtTime(volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        source.connect(gain);
        gain.connect(context.destination);
        source.start(startTime);
        source.stop(startTime + duration);
    }

    function playString(context, stringIdx, fret, startTime, duration, volume) {
        const sample = sampleBuffers[stringIdx];
        if (sample) {
            // 녹음된 개방현 샘플을 프렛만큼 피치시프트
            playBuffer(context, sample, Math.pow(2, fret / 12), startTime, duration, volume);
        } else {
            // 샘플이 없으면 해당 음높이를 직접 합성
            const freq = OPEN_STRING_FREQS[stringIdx] * Math.pow(2, fret / 12);
            playBuffer(context, pluckedStringBuffer(context, freq, duration), 1, startTime, duration, volume);
        }
    }

    return {
        // 페이지 로드 후 미리 호출해두면 첫 재생 전에 샘플을 준비해둘 수 있음 (호출하지 않아도 자동으로 로드됨)
        preload: function() {
            ensureSamplesLoading(getContext());
        },

        // frets: 6칸 배열, index 0 = 저음 E ~ index 5 = 고음 e (프렛보드 데이터 형식과 동일), -1은 뮤트
        playFrets: function(frets, options) {
            if (!frets || !frets.some(f => f !== -1)) return;
            const context = getContext();
            const strumDelay = (options && options.strumDelay) || 0.045;
            const duration = (options && options.duration) || 2.0;

            ensureSamplesLoading(context).then(() => {
                const startTime = context.currentTime + 0.02;
                let strumIndex = 0;
                frets.forEach((fret, i) => {
                    if (fret === -1 || fret === undefined || fret === null) return;
                    const stringIdx = 5 - i;
                    playString(context, stringIdx, fret, startTime + strumIndex * strumDelay, duration, 0.9);
                    strumIndex++;
                });
            });
        }
    };
})();
