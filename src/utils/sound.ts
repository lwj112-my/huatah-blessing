/**
 * 纯 Web Audio API 音效合成器
 * 无需加载任何外部 mp3/wav 文件，永不失效，支持 iOS / Android 浏览器交互解锁。
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean): void {
  isMuted = muted;
}

export function getSoundMuted(): boolean {
  return isMuted;
}

/**
 * 合成清脆温润的「木鱼」敲击声
 */
export function playWoodenFish(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // 微小音高抖动，连敲更自然有手感
  const jitter = 0.96 + Math.random() * 0.08;

  // 主木腔共振音
  const oscMain = ctx.createOscillator();
  const gainMain = ctx.createGain();
  oscMain.type = 'sine';
  oscMain.frequency.setValueAtTime(720 * jitter, now);
  oscMain.frequency.exponentialRampToValueAtTime(290 * jitter, now + 0.075);

  gainMain.gain.setValueAtTime(0.001, now);
  gainMain.gain.linearRampToValueAtTime(0.45, now + 0.006);
  gainMain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

  oscMain.connect(gainMain);
  gainMain.connect(ctx.destination);
  oscMain.start(now);
  oscMain.stop(now + 0.18);

  // 清脆木槌轻击泛音
  const oscTap = ctx.createOscillator();
  const gainTap = ctx.createGain();
  oscTap.type = 'triangle';
  oscTap.frequency.setValueAtTime(1180 * jitter, now);
  oscTap.frequency.exponentialRampToValueAtTime(620 * jitter, now + 0.04);

  gainTap.gain.setValueAtTime(0.001, now);
  gainTap.gain.linearRampToValueAtTime(0.18, now + 0.003);
  gainTap.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  oscTap.connect(gainTap);
  gainTap.connect(ctx.destination);
  oscTap.start(now);
  oscTap.stop(now + 0.08);
}

/**
 * 合成空灵悦耳的「铜磬」声（点香里程碑 / 开签揭晓时）
 */
export function playBellChime(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const partials = [
    { freq: 528, gain: 0.24, duration: 1.45 },
    { freq: 1056, gain: 0.11, duration: 1.05 },
    { freq: 1588, gain: 0.06, duration: 0.75 },
    { freq: 2112, gain: 0.03, duration: 0.5 },
  ];

  partials.forEach(({ freq, gain, duration }) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  });
}

/**
 * 摆供品 / 撤供品时的 Q 弹泡泡声
 */
export function playPopSound(placing: boolean): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  if (placing) {
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.08);
  } else {
    osc.frequency.setValueAtTime(640, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.08);
  }

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

/**
 * 摇签筒竹签碰撞声
 */
export function playShakeRattle(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const offsets = [0, 0.14, 0.27, 0.42, 0.56, 0.72, 0.88];
  offsets.forEach((delay, idx) => {
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    const baseFreq = 920 + (idx % 3) * 140;
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(380, t + 0.045);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  });
}
