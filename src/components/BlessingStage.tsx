import { APP_CONFIG } from '../data/config';
import { BLACK_GOLD_UNLOCK_STREAK, getLevelInfo } from '../data/levels';
import type { Offering } from '../data/offerings';
import { getFormattedChineseDate } from '../utils/storage';
import { CornerOrnamentSvg, IncenseBurnerSvg, LuckyCatMascot } from './MascotSvg';

export interface DanmakuItem {
  id: number;
  text: string;
  leftPercent: number;
}

interface BlessingStageProps {
  todayMerit: number;
  totalMerit: number;
  streak: number;
  bestStreak: number;
  checkedInToday: boolean;
  muted: boolean;
  onToggleMute: () => void;
  onOpenCheckIn: () => void;
  selectedOfferings: Offering[];
  onRemoveOffering: (id: string) => void;
  smokeBurst: number;
  catExcited: boolean;
  danmakuList: DanmakuItem[];
}

/**
 * 顶部状态栏 + 功德段位/签到条 + 中央赛博祈福主舞台
 */
export function BlessingStage({
  todayMerit,
  totalMerit,
  streak,
  bestStreak,
  checkedInToday,
  muted,
  onToggleMute,
  onOpenCheckIn,
  selectedOfferings,
  onRemoveOffering,
  smokeBurst,
  catExcited,
  danmakuList,
}: BlessingStageProps) {
  const slots = Array.from({ length: APP_CONFIG.maxOfferings }, (_, idx) => {
    return selectedOfferings[idx] ?? null;
  });

  const levelInfo = getLevelInfo(totalMerit);
  const hasSunglasses = bestStreak >= BLACK_GOLD_UNLOCK_STREAK;

  return (
    <div className="flex flex-col">
      {/* 顶部朱红国潮牌匾栏 */}
      <header className="mx-3 mt-1.5 rounded-2xl bg-gradient-to-r from-[#A62C1E] via-[#C83E2B] to-[#A62C1E] px-3.5 py-2 text-[#FAF5EB] shadow-md border border-[#E6B450]/60 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none" aria-hidden="true">
              🏮
            </span>
            <h1 className="font-serif-cn font-bold text-[15.5px] tracking-wide truncate text-[#FFF7E2]">
              {APP_CONFIG.appName}
            </h1>
          </div>
          <p className="text-[10px] text-[#F6D277]/90 mt-0.5 truncate">
            {getFormattedChineseDate()}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* 今日功德值徽章 */}
          <div
            className="flex items-center gap-1 rounded-full bg-[#3A2618]/45 border border-[#F6D277]/65 px-2.5 py-1"
            aria-label={`今日功德值 ${todayMerit}`}
          >
            <span className="text-xs leading-none" aria-hidden="true">
              ✨
            </span>
            <span className="text-[10.5px] text-[#F6D277] font-medium">今日</span>
            <span
              data-testid="merit-count"
              className="text-[13px] font-extrabold text-[#FFE99B] tabular-nums"
            >
              {todayMerit}
            </span>
          </div>

          {/* 静音开关 */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? '开启音效' : '静音音效'}
            title={muted ? '当前已静音，点击开启木鱼/铜磬音效' : '点击静音'}
            className="w-8 h-8 rounded-full bg-[#FAF5EB]/15 hover:bg-[#FAF5EB]/25 active:scale-90 border border-[#F6D277]/50 flex items-center justify-center text-sm transition"
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>

      {/* 功德段位 & 每日签到条 */}
      <div className="mx-3 mt-1.5 rounded-xl border border-[#E4D3B3] bg-white/80 px-2.5 py-1.5 shadow-sm flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onOpenCheckIn}
          className="flex items-center gap-2 min-w-0 flex-1 text-left group"
          aria-label="查看功德段位与升级进度"
        >
          <span className="w-6 h-6 rounded-lg bg-[#FDF4DC] border border-[#E6B450] flex items-center justify-center text-xs shrink-0">
            {levelInfo.current.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span
                data-testid="level-badge"
                className="text-[11px] font-extrabold text-[#A62C1E] truncate"
              >
                Lv.{levelInfo.current.level} {levelInfo.current.title}
              </span>
              <span className="text-[9.5px] text-[#7A5C48] shrink-0 tabular-nums">
                {levelInfo.next ? `${totalMerit}/${levelInfo.next.minMerit}` : `${totalMerit} MAX`}
              </span>
            </div>
            <div className="mt-0.5 h-1.5 w-full rounded-full bg-[#E4D3B3]/70 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C83E2B] to-[#E6B450] transition-all duration-300"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={onOpenCheckIn}
          data-testid="checkin-trigger"
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold transition active:scale-95 ${
            checkedInToday
              ? 'bg-[#EEF7F0] text-[#2F7D4E] border border-[#92C7A3]'
              : 'bg-gradient-to-r from-[#F6D277] to-[#E6B450] text-[#3A2618] border border-[#B88322] shadow-sm animate-pulse'
          }`}
        >
          {checkedInToday ? `🔥 连签 ${streak} 天` : '🎁 每日签到'}
        </button>
      </div>

      {/* 中央祈福神龛舞台 */}
      <section
        className="relative mx-3 mt-1.5 rounded-2xl border-2 border-[#E6B450]/70 bg-gradient-to-b from-[#FFFDF7] via-[#FAF5EB] to-[#F3E6CE] px-3 pt-1.5 pb-2 shadow-inner overflow-hidden"
        aria-label="赛博祈福主舞台"
      >
        {/* 四角国潮回纹 */}
        <CornerOrnamentSvg className="w-5 h-5 absolute top-1.5 left-1.5 opacity-80 pointer-events-none" />
        <CornerOrnamentSvg className="w-5 h-5 absolute top-1.5 right-1.5 rotate-90 opacity-80 pointer-events-none" />

        {/* 金色飘字弹幕层 */}
        <div
          className="absolute inset-x-0 top-1 bottom-14 pointer-events-none overflow-hidden z-20"
          aria-hidden="true"
        >
          {danmakuList.map((item) => (
            <div
              key={item.id}
              style={{ left: `${item.leftPercent}%` }}
              className="
                absolute bottom-6 -translate-x-1/2 whitespace-nowrap
                px-2.5 py-0.5 rounded-full
                bg-gradient-to-r from-[#FFF6D6] to-[#FCE49C]
                border border-[#D99B26]/70
                text-[#A62C1E] font-bold text-[12px]
                shadow-[0_2px_8px_rgba(230,180,80,0.45)]
                animate-danmaku-float
              "
            >
              ✨ {item.text}
            </div>
          ))}
        </div>

        {/* 吉祥物 + 香炉组合 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C83E2B]/10 border border-[#C83E2B]/20 text-[10px] font-semibold text-[#A62C1E]">
            <span>{hasSunglasses ? '😎 墨镜财猫霸气接单' : '🐱 招财小猫在线接单'}</span>
            <span className="text-[#B88322]">· 心诚则灵 Huat Ah!</span>
          </div>

          <div className="relative flex items-end justify-center w-full -mt-1">
            <LuckyCatMascot
              excited={catExcited}
              coolGlasses={hasSunglasses}
              className="w-24 h-24"
            />
          </div>

          <div className="-mt-5 relative z-20">
            <IncenseBurnerSvg smokeBurst={smokeBurst} />
          </div>
        </div>

        {/* 朱红国潮供桌与 3 个供品槽位 */}
        <div className="relative z-10 -mt-1.5 rounded-xl bg-gradient-to-b from-[#B33322] to-[#8C2215] p-1.5 border-t-4 border-[#E6B450] shadow-md">
          <div className="grid grid-cols-3 gap-1.5">
            {slots.map((offering, index) =>
              offering ? (
                <button
                  key={`${offering.id}-${index}`}
                  type="button"
                  onClick={() => onRemoveOffering(offering.id)}
                  title="点击撤下该供品"
                  className="animate-jelly-pop flex flex-col items-center justify-center rounded-xl bg-[#FAF5EB] border-2 border-[#F6D277] py-1.5 px-1 shadow active:scale-95 transition-transform"
                >
                  <span className="text-[20px] leading-none">{offering.icon}</span>
                  <span className="text-[10px] font-bold text-[#3A2618] mt-1 leading-none truncate max-w-full">
                    {offering.shortName}
                  </span>
                </button>
              ) : (
                <div
                  key={`empty-${index}`}
                  className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#F6D277]/60 bg-[#6A180E]/35 py-1.5 px-1 text-center"
                >
                  <span className="text-[13px] text-[#F6D277]/65 leading-none">＋</span>
                  <span className="text-[9.5px] text-[#F6D277]/75 mt-1 leading-none">
                    供品槽 {index + 1}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
