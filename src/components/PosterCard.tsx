import { forwardRef } from 'react';
import { APP_CONFIG } from '../data/config';
import type { Fortune } from '../data/fortunes';
import { BLACK_GOLD_UNLOCK_STREAK, getLevelInfo } from '../data/levels';
import type { Offering } from '../data/offerings';
import { getFormattedChineseDate, type PosterTheme } from '../utils/storage';
import { CornerOrnamentSvg, LuckyCatMascot } from './MascotSvg';

interface PosterCardProps {
  fortune: Fortune;
  offerings: Offering[];
  todayMerit: number;
  totalMerit: number;
  streak: number;
  bestStreak: number;
  theme: PosterTheme;
}

/**
 * 9:16 竖屏分享海报卡片（基准尺寸 360 x 640，导出时以 3x 分辨率生成 1080 x 1920 高清 PNG）
 * 支持「经典国潮版」与连签 7 天解锁的「黑金尊享版」。
 */
export const PosterCard = forwardRef<HTMLDivElement, PosterCardProps>(
  function PosterCard(
    { fortune, offerings, todayMerit, totalMerit, streak, bestStreak, theme },
    ref
  ) {
    const todayText = getFormattedChineseDate();
    const levelInfo = getLevelInfo(totalMerit);
    const isBlackGold = theme === 'black-gold';
    const hasSunglasses = bestStreak >= BLACK_GOLD_UNLOCK_STREAK;

    return (
      <div
        ref={ref}
        style={{ width: '360px', height: '640px' }}
        className={`relative flex flex-col justify-between p-4 select-none overflow-hidden ${
          isBlackGold
            ? 'bg-[#1A1411] text-[#FAF5EB]'
            : 'bg-[#FAF5EB] text-[#3A2618]'
        }`}
      >
        {/* 背景淡雅祥云/鎏金质感 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isBlackGold
              ? 'radial-gradient(circle at 22% 14%, rgba(246,210,119,0.22) 0%, transparent 48%), radial-gradient(circle at 80% 85%, rgba(200,62,43,0.18) 0%, transparent 45%)'
              : 'radial-gradient(circle at 20% 15%, rgba(230,180,80,0.22) 0%, transparent 45%), radial-gradient(circle at 80% 85%, rgba(200,62,43,0.12) 0%, transparent 45%)',
          }}
        />

        {/* 外层双线国潮边框 */}
        <div
          className={`relative z-10 flex-1 rounded-2xl border-[3px] p-1.5 flex flex-col ${
            isBlackGold ? 'border-[#E6B450]' : 'border-[#C83E2B]'
          }`}
        >
          <div
            className={`relative flex-1 rounded-xl border px-4 py-3 flex flex-col justify-between ${
              isBlackGold
                ? 'border-[#B88322]/80 bg-[#241B16]/95'
                : 'border-[#E6B450] bg-[#FFFDF8]/90'
            }`}
          >
            {/* 四角回纹 */}
            <CornerOrnamentSvg className="w-6 h-6 absolute top-1.5 left-1.5" />
            <CornerOrnamentSvg className="w-6 h-6 absolute top-1.5 right-1.5 rotate-90" />
            <CornerOrnamentSvg className="w-6 h-6 absolute bottom-1.5 left-1.5 -rotate-90" />
            <CornerOrnamentSvg className="w-6 h-6 absolute bottom-1.5 right-1.5 rotate-180" />

            {/* 1. 顶部小馆牌匾 & 段位连签条 */}
            <div className="text-center pt-0.5">
              <div
                className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wider ${
                  isBlackGold
                    ? 'bg-gradient-to-r from-[#E6B450] to-[#F6D277] text-[#23140B]'
                    : 'bg-[#C83E2B] text-[#FFF7E2]'
                }`}
              >
                {isBlackGold ? '🖤 ' : '🏮 '}
                {APP_CONFIG.posterTitle}
              </div>
              <p
                className={`text-[9.5px] mt-1 font-medium ${
                  isBlackGold ? 'text-[#D6C3A3]' : 'text-[#7A5C48]'
                }`}
              >
                {todayText}
              </p>
              <div className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9.5px] font-bold border border-[#E6B450]/70 bg-[#E6B450]/15 text-[#E6B450]">
                <span className={isBlackGold ? 'text-[#FFE99B]' : 'text-[#A62C1E]'}>
                  {levelInfo.current.icon} Lv.{levelInfo.current.level} {levelInfo.current.title}
                </span>
                {streak > 0 && (
                  <span className={isBlackGold ? 'text-[#F6D277]' : 'text-[#B88322]'}>
                    · 🔥 连签 {streak} 天
                  </span>
                )}
              </div>
            </div>

            {/* 2. 吉祥物 + 签位印章 + 四字吉言 */}
            <div className="flex flex-col items-center text-center my-0.5">
              <LuckyCatMascot coolGlasses={hasSunglasses} className="w-20 h-20 -mb-1" />

              <div
                className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3 py-0.5 mt-1 ${
                  isBlackGold
                    ? 'border-[#E6B450] bg-[#E6B450]/15'
                    : 'border-[#C83E2B] bg-[#C83E2B]/10'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isBlackGold ? 'bg-[#F6D277]' : 'bg-[#C83E2B]'
                  }`}
                />
                <span
                  className={`text-[11.5px] font-extrabold tracking-widest ${
                    isBlackGold ? 'text-[#FFE99B]' : 'text-[#A62C1E]'
                  }`}
                >
                  {fortune.level}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isBlackGold ? 'bg-[#F6D277]' : 'bg-[#C83E2B]'
                  }`}
                />
              </div>

              <h3
                className={`font-serif-cn text-[28px] font-black tracking-[0.14em] mt-1.5 leading-tight ${
                  isBlackGold ? 'text-[#F6D277]' : 'text-[#A62C1E]'
                }`}
              >
                {fortune.idiom}
              </h3>

              <div className="flex items-center gap-2 w-40 my-1.5">
                <div className="h-[1px] flex-1 bg-[#E6B450]/75" />
                <span className="text-[10px] text-[#E6B450]">✦</span>
                <div className="h-[1px] flex-1 bg-[#E6B450]/75" />
              </div>

              {/* 幽默白话解签 */}
              <div
                className={`w-full rounded-xl border px-3 py-2 text-left ${
                  isBlackGold
                    ? 'bg-[#1A1411] border-[#B88322]/60'
                    : 'bg-[#FAF5EB] border-[#E4D3B3]'
                }`}
              >
                <p
                  className={`text-[10px] font-bold mb-0.5 ${
                    isBlackGold ? 'text-[#F6D277]' : 'text-[#B88322]'
                  }`}
                >
                  【小猫白话解签】
                </p>
                <p
                  className={`text-[12px] leading-[1.52] font-medium ${
                    isBlackGold ? 'text-[#F5EBD8]' : 'text-[#3A2618]'
                  }`}
                >
                  {fortune.interpretation}
                </p>
              </div>
            </div>

            {/* 3. 今日宜 / 忌 */}
            <div className="grid grid-cols-2 gap-2 my-0.5">
              <div
                className={`rounded-lg border px-2.5 py-1.5 ${
                  isBlackGold
                    ? 'bg-[#17261D] border-[#3F7A54]'
                    : 'bg-[#EEF7F0] border-[#92C7A3]'
                }`}
              >
                <span className="inline-block rounded bg-[#2F7D4E] text-white text-[9.5px] font-bold px-1.5 py-0.5 mb-0.5">
                  今日宜
                </span>
                <p
                  className={`text-[10.5px] font-semibold leading-snug ${
                    isBlackGold ? 'text-[#BCE8CA]' : 'text-[#234E34]'
                  }`}
                >
                  {fortune.yi}
                </p>
              </div>
              <div
                className={`rounded-lg border px-2.5 py-1.5 ${
                  isBlackGold
                    ? 'bg-[#2C1816] border-[#964237]'
                    : 'bg-[#FDF0EE] border-[#E6ACA3]'
                }`}
              >
                <span className="inline-block rounded bg-[#C83E2B] text-white text-[9.5px] font-bold px-1.5 py-0.5 mb-0.5">
                  今日忌
                </span>
                <p
                  className={`text-[10.5px] font-semibold leading-snug ${
                    isBlackGold ? 'text-[#F7C2BA]' : 'text-[#7A2218]'
                  }`}
                >
                  {fortune.ji}
                </p>
              </div>
            </div>

            {/* 4. 用户本次供品 + 今日功德值 */}
            <div
              className={`rounded-xl border px-2.5 py-1.5 flex items-center justify-between gap-1.5 ${
                isBlackGold
                  ? 'bg-[#2E231A] border-[#E6B450]/70'
                  : 'bg-[#FDF4DC] border-[#E6B450]/80'
              }`}
            >
              <div className="flex items-center gap-1 min-w-0">
                {offerings.length > 0 ? (
                  <div className="flex items-center gap-1 flex-nowrap">
                    {offerings.map((o) => (
                      <span
                        key={o.id}
                        className={`inline-flex items-center gap-0.5 whitespace-nowrap rounded-full border px-1.5 py-0.5 text-[9.5px] font-semibold ${
                          isBlackGold
                            ? 'bg-[#1A1411] border-[#B88322] text-[#F6D277]'
                            : 'bg-white border-[#E4D3B3] text-[#3A2618]'
                        }`}
                      >
                        <span>{o.icon}</span>
                        <span>{o.shortName}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span
                    className={`text-[10.5px] font-medium whitespace-nowrap ${
                      isBlackGold ? 'text-[#D6C3A3]' : 'text-[#7A5C48]'
                    }`}
                  >
                    ✨ 随缘诚心祈福
                  </span>
                )}
              </div>

              <div
                className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isBlackGold
                    ? 'bg-[#E6B450] text-[#23140B]'
                    : 'bg-[#C83E2B] text-[#FFE99B]'
                }`}
              >
                功德 +{todayMerit}
              </div>
            </div>

            {/* 5. 底部扫码 / 搜同款水印位 */}
            <div
              className={`pt-1.5 mt-0.5 border-t border-dashed flex items-center justify-between gap-2 ${
                isBlackGold ? 'border-[#B88322]/60' : 'border-[#D9C29C]'
              }`}
            >
              <div>
                <p
                  className={`text-[11px] font-extrabold ${
                    isBlackGold ? 'text-[#F6D277]' : 'text-[#A62C1E]'
                  }`}
                >
                  {APP_CONFIG.posterWatermark}
                </p>
                <p
                  className={`text-[9px] mt-0.5 ${
                    isBlackGold ? 'text-[#C8B598]' : 'text-[#7A5C48]'
                  }`}
                >
                  {APP_CONFIG.posterSubline}
                </p>
              </div>
              {/* 精致国潮二维码印章占位图标 */}
              <div
                className={`w-9 h-9 rounded-lg border p-1 shrink-0 flex items-center justify-center ${
                  isBlackGold
                    ? 'bg-[#1A1411] border-[#E6B450]/70'
                    : 'bg-[#FAF5EB] border-[#C83E2B]/50'
                }`}
              >
                <svg viewBox="0 0 28 28" className="w-full h-full" aria-hidden="true">
                  <rect
                    x="2"
                    y="2"
                    width="8"
                    height="8"
                    rx="1"
                    fill="none"
                    stroke={isBlackGold ? '#E6B450' : '#A62C1E'}
                    strokeWidth="2"
                  />
                  <rect
                    x="4.5"
                    y="4.5"
                    width="3"
                    height="3"
                    fill={isBlackGold ? '#F6D277' : '#A62C1E'}
                  />
                  <rect
                    x="18"
                    y="2"
                    width="8"
                    height="8"
                    rx="1"
                    fill="none"
                    stroke={isBlackGold ? '#E6B450' : '#A62C1E'}
                    strokeWidth="2"
                  />
                  <rect
                    x="20.5"
                    y="4.5"
                    width="3"
                    height="3"
                    fill={isBlackGold ? '#F6D277' : '#A62C1E'}
                  />
                  <rect
                    x="2"
                    y="18"
                    width="8"
                    height="8"
                    rx="1"
                    fill="none"
                    stroke={isBlackGold ? '#E6B450' : '#A62C1E'}
                    strokeWidth="2"
                  />
                  <rect
                    x="4.5"
                    y="20.5"
                    width="3"
                    height="3"
                    fill={isBlackGold ? '#F6D277' : '#A62C1E'}
                  />
                  <rect
                    x="13"
                    y="4"
                    width="2.5"
                    height="2.5"
                    fill={isBlackGold ? '#F6D277' : '#C83E2B'}
                  />
                  <rect x="13" y="13" width="4" height="4" rx="0.5" fill="#E6B450" />
                  <rect
                    x="19"
                    y="14"
                    width="3"
                    height="3"
                    fill={isBlackGold ? '#F6D277' : '#A62C1E'}
                  />
                  <rect
                    x="14"
                    y="20"
                    width="3"
                    height="3"
                    fill={isBlackGold ? '#F6D277' : '#A62C1E'}
                  />
                  <rect
                    x="21"
                    y="21"
                    width="5"
                    height="5"
                    rx="1"
                    fill={isBlackGold ? '#E6B450' : '#C83E2B'}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
