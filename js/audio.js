/**
 * VĂN UYỂN - AMBIENT AUDIO ENGINE (Web Audio API)
 * Bộ tạo âm thanh không gian đọc sách tĩnh lặng (Mưa nhẹ bên song cửa, Thư viện cổ)
 * Hoạt động thuần Web Audio API, không cần tải tệp âm thanh ngoài.
 */

class LiteraryAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.rainNode = null;
    this.gainNode = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Tạo tiếng mưa rơi tĩnh lặng qua bộ lọc băng thông dải thấp (Pink noise / Rain filter)
  createRainGenerator() {
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.045; // Âm lượng thư thái, êm dịu
      b6 = white * 0.115926;
    }

    const whiteNoiseSource = this.audioCtx.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;

    // Bộ lọc Lowpass để tái tạo âm thanh mưa rơi ngoài cửa sổ thư phòng
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, this.audioCtx.currentTime);

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.35, this.audioCtx.currentTime + 2); // Fade in mượt mà

    whiteNoiseSource.connect(filter);
    filter.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);

    return whiteNoiseSource;
  }

  toggleAmbient(buttonElement) {
    this.initContext();

    if (this.isPlaying) {
      this.stop();
      if (buttonElement) {
        buttonElement.classList.remove('playing');
        buttonElement.innerHTML = `${window.LiteraryIcons ? window.LiteraryIcons.get('ambient', 'icon-sm') : ''} Âm thanh thư phòng`;
      }
      return false;
    } else {
      this.start();
      if (buttonElement) {
        buttonElement.classList.add('playing');
        buttonElement.innerHTML = `${window.LiteraryIcons ? window.LiteraryIcons.get('ambientPlaying', 'icon-sm') : ''} Đang phát âm thanh`;
      }
      return true;
    }
  }

  start() {
    try {
      this.rainNode = this.createRainGenerator();
      this.rainNode.start(0);
      this.isPlaying = true;
    } catch (e) {
      console.warn("Không thể khởi chạy audio context:", e);
    }
  }

  stop() {
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (this.rainNode) {
          this.rainNode.stop();
          this.rainNode.disconnect();
          this.rainNode = null;
        }
        this.isPlaying = false;
      }, 800);
    } else {
      this.isPlaying = false;
    }
  }

  // Âm thanh lật trang sách nhẹ (Page turn effect)
  playPageTurnSound() {
    try {
      this.initContext();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.15);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.audioCtx.currentTime + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.15);
    } catch (e) {
      // Bỏ qua nếu browser chưa có user interaction
    }
  }
}

window.literaryAudio = new LiteraryAudioEngine();
