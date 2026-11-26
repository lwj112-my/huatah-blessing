import { APP_CONFIG } from '../data/config';
import {
  CHECKIN_REWARDS,
  MERIT_LEVELS,
  getLevelInfo,
} from '../data/levels';
import { getRewardForDay } from '../utils/storage';

interface CheckInModalProps {
  open: boolean;
  totalMerit: number;
  streak: number;
  bestStreak: number;
  checkedInToday: boolean;
  feedbackText: string | null;
  onClose: () => void;
  onCheckIn: () => void;
  onSimulateNextDay: () => void;
  onResetProgress: () => void;
}

/**
 * 每日签到 & 5 级大马打工人功德段位弹窗
 */
export function CheckInModal({
  open,
  totalMerit,
  streak,
  bestStreak,
  checkedInToday,
  feedbackText,
  onClose,
  onCheckIn,
  onSimulateNextDay,
  onResetProgress,
}: CheckInModalProps) {
  if (!open) return null;

  const levelInfo = getLevelInfo(totalMerit);
  const nextClaimDay = checkedInToday ? streak : streak + 1;
  const todayReward = getRewardForDay(Math.max(1, nextClaimDay));
  const regularDays = CHECKIN_REWARDS.slice(0, 6);
  const day7Reward = CHECKIN_REWARDS[6];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#23140B]/70 backdrop-blur-sm p-3"
      role="dialog"
      aria-modal="true"
      aria-label="每日签到与功德段位"
    >
      <div className="w-full max-w-[366px] max-h-[92dvh] overflow-y-auto rounded-3xl border-2 border-[#E6B450] bg-[#FAF5EB] p-4 shadow-2xl animate-jelly-pop">
        {/* 顶部标题 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-lg leading-none" aria-hidden="true">
              📅
            </span>
            <h2 className="font-bold text-[15px] text-[#A62C1E]">
              每日签到 & 功德段位
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭签到弹窗"
            className="w-7 h-7 rounded-full bg-[#E4D3B3]/70 text-[#3A2618] font-bold text-sm flex items-center justify-center hover:bg-[#E4D3B3]"
          >
            ✕
          </button>
        </div>

        {/* 1. 当前段位与升级进度卡 */}
        <div className="rounded-2xl border border-[#E6B450] bg-gradient-to-br from-[#FFFDF7] to-[#FDF4DC] p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-[#C83E2B] text-white text-lg flex items-center justify-center shadow-sm">
                {levelInfo.current.icon}
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-[#A62C1E] text-[#FFE99B]">
                    Lv.{levelInfo.current.level}
                  </span>
                  <span className="text-[14px] font-extrabold text-[#3A2618]">
                    {levelInfo.current.title}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A5C48] mt-0.5">
                  历史总功德：<strong className="text-[#A62C1E]">{totalMerit}</strong>
                  {levelInfo.next ? (
                    <span> · 再攒 {levelInfo.meritToNext} 升级</span>
                  ) : (
                    <span> · 已达最高财神挚友！</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* 进度条 */}
          <div className="mt-2.5 h-2.5 w-full rounded-full bg-[#E4D3B3]/70 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C83E2B] via-[#E6B450] to-[#F6D277] transition-all duration-300"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>

          {/* 5级段位一览 */}
          <div className="mt-2.5 grid grid-cols-5 gap-1">
            {MERIT_LEVELS.map((tier) => {
              const reached = totalMerit >= tier.minMerit;
              return (
                <div
                  key={tier.level}
                  className={`rounded-lg py-1 px-0.5 text-center border ${
                    reached
                      ? 'bg-white border-[#E6B450] text-[#3A2618]'
                      : 'bg-[#F3E9D6]/60 border-[#E4D3B3] text-[#7A5C48]/65'
                  }`}
                >
                  <div className="text-[12px] leading-none">{tier.icon}</div>
                  <div className="text-[9px] font-bold mt-0.5 leading-none">
                    Lv.{tier.level}
                  </div>
                  <div className="text-[8px] mt-0.5 leading-none">{tier.minMerit}+</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. 七天连签奖励卡片 */}
        <div className="mt-3">
          <div className="flex items-center justify-between px-0.5 mb-1.5">
            <span className="text-[12.5px] font-bold text-[#3A2618]">
              🔥 连续祈福进度（已连签 {streak} 天）
            </span>
            <span className="text-[10.5px] text-[#7A5C48]">
              最高连签 {bestStreak} 天
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {regularDays.map((item) => {
              const claimed = streak >= item.day;
              const isTodayTarget = !checkedInToday && streak + 1 === item.day;

              return (
                <div
                  key={item.day}
                  className={`relative rounded-xl border px-2 py-2 text-center transition ${
                    claimed
                      ? 'bg-[#EEF7F0] border-[#82BF95]'
                      : isTodayTarget
                      ? 'bg-[#FDF4DC] border-[#C83E2B] shadow-sm'
                      : 'bg-white/80 border-[#E4D3B3]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className={claimed ? 'text-[#2F7D4E]' : 'text-[#7A5C48]'}>
                      第{item.day}天
                    </span>
                    {claimed && <span className="text-[#2F7D4E]">✓</span>}
                  </div>
                  <div className="text-[13px] font-extrabold text-[#A62C1E] mt-1">
                    +{item.meritBonus} 功德
                  </div>
                  <div className="text-[9.5px] font-semibold text-[#3A2618] mt-0.5 leading-tight">
                    {item.unlockText ? item.unlockText : item.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 第7天终极尊享卡 */}
          <div
            className={`mt-1.5 rounded-xl border-2 px-3 py-2 flex items-center justify-between gap-2 ${
              streak >= 7 || bestStreak >= 7
                ? 'bg-[#1F1713] border-[#E6B450] text-[#F6D277]'
                : !checkedInToday && streak + 1 >= 7
                ? 'bg-[#FDF4DC] border-[#C83E2B]'
                : 'bg-[#2B201A] border-[#B88322]/70 text-[#FAF5EB]'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E6B450] text-[#23140B]">
                  第7天大奖
                </span>
                <span className="text-[12px] font-extrabold text-[#F6D277]">
                  {day7Reward.unlockText}
                </span>
              </div>
              <p className="text-[10px] opacity-85 mt-0.5">
                永久解锁「黑金尊享版」9:16 分享海报 + 小猫金边墨镜！
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[13px] font-extrabold text-[#FFE99B]">
                +{day7Reward.meritBonus}
              </div>
              <div className="text-[9.5px] opacity-80">
                {bestStreak >= 7 ? '已解锁 ✓' : '功德'}
              </div>
            </div>
          </div>
        </div>

        {/* 签到成功 / 解锁提示 */}
        {feedbackText && (
          <div className="mt-2.5 rounded-xl bg-[#EEF7F0] border border-[#82BF95] px-3 py-2 text-[11.5px] font-bold text-[#234E34] text-center">
            {feedbackText}
          </div>
        )}

        {/* 立即签到主按钮 */}
        <div className="mt-3">
          {!checkedInToday ? (
            <button
              type="button"
              onClick={onCheckIn}
              className="w-full rounded-xl bg-gradient-to-r from-[#C83E2B] to-[#A62C1E] py-3 text-[#FFF7E2] font-bold text-[14px] shadow-md active:scale-[0.98] transition"
            >
              ✨ 立即签到（领 +{todayReward.meritBonus} 功德）
            </button>
          ) : (
            <div className="w-full rounded-xl bg-[#EEF7F0] border border-[#92C7A3] py-2.5 text-center text-[#234E34] font-bold text-[13px]">
              ✅ 今日已签到 · 已连续祈福 {streak} 天
            </div>
          )}
        </div>

        {/* 店主体验模式控制区（方便立即测试所有天数解锁与黑金海报） */}
        {APP_CONFIG.enablePreviewControls && (
          <div className="mt-3 rounded-xl border border-dashed border-[#B88322]/70 bg-[#FDF4DC]/70 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10.5px] font-bold text-[#7A5C48]">
                🛠️ 店主体验模式（上线前可在 config.ts 关闭）
              </span>
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={onSimulateNextDay}
                className="rounded-lg bg-white border border-[#E6B450] py-1.5 px-2 text-[11px] font-bold text-[#A62C1E] hover:bg-[#FFF9EE] active:scale-95 transition"
              >
                ⏩ 模拟连签 +1 天
              </button>
              <button
                type="button"
                onClick={onResetProgress}
                className="rounded-lg bg-white border border-[#E4D3B3] py-1.5 px-2 text-[11px] font-semibold text-[#7A5C48] hover:bg-[#FAF5EB] active:scale-95 transition"
              >
                🔄 重置签到与段位
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
