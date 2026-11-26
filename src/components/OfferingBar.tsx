import { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { OFFERINGS, type Offering } from '../data/offerings';

interface OfferingBarProps {
  selectedIds: string[];
  bestStreak: number;
  shakeHint: boolean;
  onToggleOffering: (offering: Offering) => void;
  onOpenCheckIn: () => void;
}

/**
 * 第 1 步：摆供桌（常驻 6 款 + 连签解锁隐藏供品分栏）
 */
export function OfferingBar({
  selectedIds,
  bestStreak,
  shakeHint,
  onToggleOffering,
  onOpenCheckIn,
}: OfferingBarProps) {
  const [activeTab, setActiveTab] = useState<'base' | 'hidden'>('base');

  const maxCount = APP_CONFIG.maxOfferings;
  const isFull = selectedIds.length >= maxCount;

  const baseOfferings = OFFERINGS.filter((o) => !o.unlockStreak);
  const hiddenOfferings = OFFERINGS.filter((o) => Boolean(o.unlockStreak));
  const unlockedHiddenCount = hiddenOfferings.filter(
    (o) => bestStreak >= (o.unlockStreak ?? 99)
  ).length;

  const visibleList = activeTab === 'base' ? baseOfferings : hiddenOfferings;

  return (
    <section
      className="mx-3 mt-1.5 rounded-2xl border border-[#E4D3B3] bg-white/75 backdrop-blur-sm p-2 shadow-sm"
      aria-label="选择本地幽默供品"
    >
      <div className="flex items-center justify-between gap-1 px-0.5 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="inline-block w-1.5 h-3.5 rounded-full bg-[#C83E2B] shrink-0" />
          <h2 className="text-[12px] font-bold text-[#3A2618] truncate">
            摆今日供品
          </h2>
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 transition-colors ${
              isFull
                ? 'bg-[#C83E2B] text-[#FAF5EB]'
                : 'bg-[#FDF4DC] text-[#B88322] border border-[#E6B450]/60'
            }`}
          >
            {selectedIds.length}/{maxCount}
          </span>
        </div>

        {/* 常驻 / 隐藏供品切换标签 */}
        <div className="inline-flex rounded-full bg-[#F3E9D6] p-0.5 border border-[#E4D3B3] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('base')}
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
              activeTab === 'base'
                ? 'bg-[#C83E2B] text-[#FFF7E2] shadow-sm'
                : 'text-[#7A5C48]'
            }`}
          >
            常驻({baseOfferings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hidden')}
            className={`relative rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
              activeTab === 'hidden'
                ? 'bg-[#C83E2B] text-[#FFF7E2] shadow-sm'
                : 'text-[#7A5C48]'
            }`}
          >
            隐藏({unlockedHiddenCount}/{hiddenOfferings.length})
          </button>
        </div>
      </div>

      {shakeHint && (
        <p className="text-[10.5px] text-[#C83E2B] font-medium px-1 mb-1 animate-gentle-shake">
          供桌已有 3 样啦！点一下已选供品即可撤下来换～
        </p>
      )}

      <div
        className={`grid gap-1.5 ${
          activeTab === 'base' ? 'grid-cols-3' : 'grid-cols-2'
        }`}
      >
        {visibleList.map((item) => {
          const locked = Boolean(item.unlockStreak && bestStreak < item.unlockStreak);
          const selected = selectedIds.includes(item.id);

          if (locked) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={onOpenCheckIn}
                className="relative flex flex-col items-center justify-center text-center rounded-xl px-2 py-2.5 border border-dashed border-[#D9C29C] bg-[#F3E9D6]/65 text-[#7A5C48] active:scale-95 transition"
              >
                <span className="text-[18px] leading-none opacity-65 mb-1">
                  {item.icon}
                </span>
                <span className="text-[10.5px] font-bold text-[#3A2618]/80">
                  {item.name}
                </span>
                <span className="mt-1 inline-flex items-center gap-0.5 rounded-full bg-[#3A2618]/10 px-2 py-0.5 text-[9.5px] font-bold text-[#A62C1E]">
                  🔒 连签 {item.unlockStreak} 天解锁
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleOffering(item)}
              className={`
                group relative flex flex-col items-center text-center rounded-xl px-1 py-1.5
                border transition-all duration-150 active:scale-95 touch-manipulation
                ${
                  selected
                    ? 'bg-[#FDF4DC] border-[#C83E2B] shadow-[0_2px_8px_rgba(200,62,43,0.16)]'
                    : 'bg-[#FAF5EB]/90 border-[#E4D3B3] hover:border-[#E6B450]'
                }
              `}
            >
              {selected && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C83E2B] text-white text-[10px] font-bold flex items-center justify-center shadow">
                  ✓
                </span>
              )}
              {item.unlockStreak && !selected && (
                <span className="absolute -top-1.5 right-1 rounded-full bg-[#E6B450] px-1.5 py-0.2 text-[8.5px] font-bold text-[#3A2618]">
                  限定
                </span>
              )}
              <span className="text-[19px] leading-none mb-0.5 group-active:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-[10px] font-bold text-[#3A2618] leading-[1.18] min-h-[23px] flex items-center justify-center">
                {item.name}
              </span>
              <span className="text-[9px] text-[#7A5C48] leading-tight mt-0.5 line-clamp-1">
                {item.tagline}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
