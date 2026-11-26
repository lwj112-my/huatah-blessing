import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';
import type { Fortune } from '../data/fortunes';
import { BLACK_GOLD_UNLOCK_STREAK } from '../data/levels';
import type { Offering } from '../data/offerings';
import type { PosterTheme } from '../utils/storage';
import { FortuneCylinderSvg } from './MascotSvg';
import { PosterCard } from './PosterCard';

export type ModalPhase = 'shaking' | 'result' | 'poster';

interface FortuneModalProps {
  open: boolean;
  phase: ModalPhase;
  fortune: Fortune | null;
  offerings: Offering[];
  todayMerit: number;
  totalMerit: number;
  streak: number;
  bestStreak: number;
  posterTheme: PosterTheme;
  onChangePosterTheme: (theme: PosterTheme) => void;
  onClose: () => void;
  onRedraw: () => void;
  onOpenPoster: () => void;
  onBackToResult: () => void;
  onOpenCheckIn: () => void;
}

/**
 * 摇签筒动画 + 幽默灵签结果 + 9:16 分享海报生成与导出弹窗
 */
export function FortuneModal({
  open,
  phase,
  fortune,
  offerings,
  todayMerit,
  totalMerit,
  streak,
  bestStreak,
  posterTheme,
  onChangePosterTheme,
  onClose,
  onRedraw,
  onOpenPoster,
  onBackToResult,
  onOpenCheckIn,
}: FortuneModalProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [skinLockHint, setSkinLockHint] = useState(false);

  if (!open) return null;

  const blackGoldUnlocked = bestStreak >= BLACK_GOLD_UNLOCK_STREAK;
  const activeTheme: PosterTheme =
    posterTheme === 'black-gold' && blackGoldUnlocked ? 'black-gold' : 'classic';

  function handleSelectSkin(theme: PosterTheme) {
    if (theme === 'black-gold' && !blackGoldUnlocked) {
      setSkinLockHint(true);
      return;
    }
    setSkinLockHint(false);
    setExportedUrl(null);
    setExportStatus('');
    onChangePosterTheme(theme);
  }

  async function handleDownloadPoster() {
    if (!posterRef.current || exporting) return;
    setExporting(true);
    setExportStatus('');
    try {
      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 3, // 360x640 -> 1080x1920 高清 9:16 PNG
        cacheBust: true,
        backgroundColor: activeTheme === 'black-gold' ? '#1A1411' : '#FAF5EB',
      });
      setExportedUrl(dataUrl);

      const link = document.createElement('a');
      const safeIdiom = fortune?.idiom ?? '好彩头';
      link.download = `赛博祈福-${safeIdiom}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportStatus(
        '海报已生成并开始下载！若手机内置浏览器未自动保存，可长按上方海报存图～'
      );
    } catch {
      setExportStatus('导出遇到小状况，请截图或再试一次～');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#23140B]/70 backdrop-blur-sm p-3"
      role="dialog"
      aria-modal="true"
      aria-label="今日幽默灵签"
    >
      {/* 阶段 A：摇签筒动画 */}
      {phase === 'shaking' && (
        <div className="w-full max-w-[340px] rounded-3xl border-2 border-[#E6B450] bg-[#FAF5EB] p-6 text-center shadow-2xl flex flex-col items-center">
          <p className="text-[13px] font-bold text-[#A62C1E] tracking-widest mb-2">
            ✨ 招财小猫正在帮你摇灵签…
          </p>
          <FortuneCylinderSvg shaking showStick />
          <p className="text-[12px] text-[#7A5C48] mt-2">
            默念愿望：不 Jam、加薪、Huat Ah!
          </p>
        </div>
      )}

      {/* 阶段 B：灵签详情 */}
      {phase === 'result' && fortune && (
        <div className="w-full max-w-[360px] rounded-3xl border-2 border-[#E6B450] bg-[#FAF5EB] p-4 shadow-2xl animate-jelly-pop">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#C83E2B] px-3 py-0.5 text-[11px] font-bold text-[#FFF7E2]">
              🎋 {fortune.level}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭签文"
              className="w-7 h-7 rounded-full bg-[#E4D3B3]/60 text-[#3A2618] font-bold text-sm flex items-center justify-center hover:bg-[#E4D3B3]"
            >
              ✕
            </button>
          </div>

          <div className="rounded-2xl border border-[#E4D3B3] bg-white/85 p-4 text-center">
            <p className="text-[11px] text-[#B88322] font-semibold">【今日四字吉言】</p>
            <h2 className="font-serif-cn text-[32px] font-black text-[#A62C1E] tracking-[0.14em] my-1">
              {fortune.idiom}
            </h2>
            <div className="h-[1px] w-28 mx-auto bg-[#E6B450]/70 my-2.5" />
            <p className="text-[13.5px] leading-relaxed text-[#3A2618] font-medium text-left bg-[#FAF5EB] rounded-xl p-3 border border-[#E4D3B3]/70">
              {fortune.interpretation}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-3 text-left">
              <div className="rounded-xl bg-[#EEF7F0] border border-[#92C7A3] p-2.5">
                <span className="inline-block rounded bg-[#2F7D4E] text-white text-[10px] font-bold px-1.5 py-0.5 mb-1">
                  今日宜
                </span>
                <p className="text-[11.5px] font-semibold text-[#234E34] leading-snug">
                  {fortune.yi}
                </p>
              </div>
              <div className="rounded-xl bg-[#FDF0EE] border border-[#E6ACA3] p-2.5">
                <span className="inline-block rounded bg-[#C83E2B] text-white text-[10px] font-bold px-1.5 py-0.5 mb-1">
                  今日忌
                </span>
                <p className="text-[11.5px] font-semibold text-[#7A2218] leading-snug">
                  {fortune.ji}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setExportedUrl(null);
                setExportStatus('');
                setSkinLockHint(false);
                onOpenPoster();
              }}
              className="w-full rounded-xl bg-gradient-to-r from-[#C83E2B] to-[#A62C1E] py-3 text-[#FFF7E2] font-bold text-[14px] shadow-md active:scale-[0.98] transition"
            >
              🖼️ 生成 9:16 分享海报
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onRedraw}
                className="rounded-xl border border-[#E6B450] bg-[#FDF4DC] py-2.5 text-[#A62C1E] font-bold text-[12.5px] active:scale-[0.98] transition"
              >
                🔄 再摇一签
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#E4D3B3] bg-white py-2.5 text-[#7A5C48] font-semibold text-[12.5px] active:scale-[0.98] transition"
              >
                回到供桌
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 阶段 C：9:16 竖屏分享海报预览 & 保存 PNG */}
      {phase === 'poster' && fortune && (
        <div className="w-full max-w-[366px] max-h-[95dvh] overflow-y-auto rounded-3xl border-2 border-[#E6B450] bg-[#FAF5EB] p-3 shadow-2xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-1 mb-1.5">
            <span className="text-[12.5px] font-bold text-[#A62C1E]">
              📱 9:16 分享海报预览
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭海报预览"
              className="w-7 h-7 rounded-full bg-[#E4D3B3]/70 text-[#3A2618] font-bold text-sm flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* 皮肤切换开关 */}
          <div className="w-full grid grid-cols-2 gap-1.5 mb-2">
            <button
              type="button"
              onClick={() => handleSelectSkin('classic')}
              className={`rounded-xl py-1.5 px-2 text-[11.5px] font-bold border transition ${
                activeTheme === 'classic'
                  ? 'bg-[#C83E2B] border-[#A62C1E] text-[#FFF7E2] shadow-sm'
                  : 'bg-white border-[#E4D3B3] text-[#7A5C48]'
              }`}
            >
              🏮 经典国潮版
            </button>
            <button
              type="button"
              onClick={() => handleSelectSkin('black-gold')}
              className={`rounded-xl py-1.5 px-2 text-[11.5px] font-bold border transition ${
                activeTheme === 'black-gold'
                  ? 'bg-[#1A1411] border-[#E6B450] text-[#F6D277] shadow-sm'
                  : blackGoldUnlocked
                  ? 'bg-[#2B201A] border-[#B88322]/60 text-[#E6B450]'
                  : 'bg-[#F3E9D6] border-dashed border-[#D9C29C] text-[#7A5C48]'
              }`}
            >
              {blackGoldUnlocked ? '🖤 黑金尊享版' : '🔒 黑金版(连签7天)'}
            </button>
          </div>

          {skinLockHint && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckIn();
              }}
              className="w-full mb-2 rounded-xl bg-[#FDF4DC] border border-[#E6B450] px-2.5 py-1.5 text-[11px] font-bold text-[#A62C1E] text-center"
            >
              连续签到 7 天即可解锁黑金海报 + 墨镜小猫，点我去看签到进度 →
            </button>
          )}

          {/* 缩放盒子：内部保持 360x640 精确比例，外面适配小屏手机高度 */}
          <div
            className={`w-[295px] h-[525px] rounded-xl overflow-hidden shadow-lg border relative ${
              activeTheme === 'black-gold'
                ? 'border-[#E6B450] bg-[#1A1411]'
                : 'border-[#E4D3B3] bg-[#FAF5EB]'
            }`}
          >
            <div
              className="origin-top-left"
              style={{ transform: 'scale(0.82)', width: '360px', height: '640px' }}
            >
              {exportedUrl ? (
                <img
                  src={exportedUrl}
                  alt="今日祈福分享海报"
                  className="w-[360px] h-[640px] block"
                />
              ) : (
                <PosterCard
                  ref={posterRef}
                  fortune={fortune}
                  offerings={offerings}
                  todayMerit={todayMerit}
                  totalMerit={totalMerit}
                  streak={streak}
                  bestStreak={bestStreak}
                  theme={activeTheme}
                />
              )}
            </div>
          </div>

          {exportStatus && (
            <p className="text-[11px] text-[#2F7D4E] font-semibold text-center mt-2 px-2 leading-snug">
              {exportStatus}
            </p>
          )}

          <div className="w-full mt-2 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={handleDownloadPoster}
              disabled={exporting}
              className="w-full rounded-xl bg-gradient-to-r from-[#C83E2B] to-[#A62C1E] py-2.5 text-[#FFF7E2] font-bold text-[13.5px] shadow-md active:scale-[0.98] transition disabled:opacity-60"
            >
              {exporting ? '⏳ 正在绘制高清海报…' : '📥 保存签文海报 (PNG)'}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setExportedUrl(null);
                  setExportStatus('');
                  onBackToResult();
                }}
                className="rounded-xl border border-[#E6B450] bg-[#FDF4DC] py-2 text-[#A62C1E] font-bold text-[12px]"
              >
                ← 返回看签文
              </button>
              <button
                type="button"
                onClick={() => {
                  setExportedUrl(null);
                  setExportStatus('');
                  onRedraw();
                }}
                className="rounded-xl border border-[#E4D3B3] bg-white py-2 text-[#7A5C48] font-semibold text-[12px]"
              >
                🔄 换个签再抽
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
