import { useEffect, useRef, useState } from 'react';
import { BlessingStage, type DanmakuItem } from './components/BlessingStage';
import { CheckInModal } from './components/CheckInModal';
import { FortuneModal, type ModalPhase } from './components/FortuneModal';
import { OfferingBar } from './components/OfferingBar';
import { PhoneFrame } from './components/PhoneFrame';
import { APP_CONFIG } from './data/config';
import { DANMAKU_PHRASES } from './data/danmaku';
import { FORTUNES, type Fortune } from './data/fortunes';
import { getLevelInfo } from './data/levels';
import { OFFERINGS, type Offering } from './data/offerings';
import {
  playBellChime,
  playPopSound,
  playShakeRattle,
  playWoodenFish,
  setSoundMuted,
} from './utils/sound';
import {
  hasCheckedInToday,
  loadMuted,
  loadUserProfile,
  performDailyCheckIn,
  resetUserProfile,
  saveMuted,
  saveUserProfile,
  simulateNextCheckInDay,
  type PosterTheme,
  type UserProfile,
} from './utils/storage';

export function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [shakeHint, setShakeHint] = useState(false);

  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [muted, setMuted] = useState<boolean>(() => {
    const initial = loadMuted();
    setSoundMuted(initial);
    return initial;
  });

  const [smokeBurst, setSmokeBurst] = useState(0);
  const [catExcited, setCatExcited] = useState(false);
  const [danmakuList, setDanmakuList] = useState<DanmakuItem[]>([]);
  const [levelUpBanner, setLevelUpBanner] = useState<string | null>(null);

  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkInFeedback, setCheckInFeedback] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhase, setModalPhase] = useState<ModalPhase>('shaking');
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);

  const nextDanmakuId = useRef(1);
  const catTimerRef = useRef<number | null>(null);
  const shakeTimerRef = useRef<number | null>(null);
  const hintTimerRef = useRef<number | null>(null);
  const levelBannerTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (catTimerRef.current) window.clearTimeout(catTimerRef.current);
      if (shakeTimerRef.current) window.clearTimeout(shakeTimerRef.current);
      if (hintTimerRef.current) window.clearTimeout(hintTimerRef.current);
      if (levelBannerTimerRef.current) window.clearTimeout(levelBannerTimerRef.current);
    };
  }, []);

  const checkedInToday = hasCheckedInToday(profile);

  const selectedOfferings: Offering[] = selectedIds
    .map((id) => OFFERINGS.find((o) => o.id === id))
    .filter((o): o is Offering => Boolean(o));

  function announceLevelUpIfNeeded(prevMerit: number, nextMerit: number) {
    const prevTier = getLevelInfo(prevMerit).current;
    const nextTier = getLevelInfo(nextMerit).current;
    if (nextTier.level > prevTier.level) {
      playBellChime();
      setLevelUpBanner(
        `🎉 恭喜晋升 ${nextTier.icon} Lv.${nextTier.level} ${nextTier.title}！`
      );
      if (levelBannerTimerRef.current) {
        window.clearTimeout(levelBannerTimerRef.current);
      }
      levelBannerTimerRef.current = window.setTimeout(
        () => setLevelUpBanner(null),
        2800
      );
    }
  }

  function handleToggleOffering(offering: Offering) {
    if (selectedIds.includes(offering.id)) {
      playPopSound(false);
      setSelectedIds((prev) => prev.filter((id) => id !== offering.id));
      setShakeHint(false);
      return;
    }

    if (selectedIds.length >= APP_CONFIG.maxOfferings) {
      setShakeHint(true);
      if (hintTimerRef.current) window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = window.setTimeout(() => setShakeHint(false), 2400);
      return;
    }

    playPopSound(true);
    setSelectedIds((prev) => [...prev, offering.id]);
    setShakeHint(false);
  }

  function handleRemoveFromAltar(id: string) {
    playPopSound(false);
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setShakeHint(false);
  }

  function handleToggleMute() {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
    saveMuted(next);
  }

  function handleTapMerit() {
    const prevTotal = profile.totalMerit;
    const nextProfile: UserProfile = {
      ...profile,
      todayMerit: profile.todayMerit + 1,
      totalMerit: profile.totalMerit + 1,
    };
    setProfile(nextProfile);
    saveUserProfile(nextProfile);

    // 敲木鱼声 + 第1次/每10次铜磬声
    playWoodenFish();
    if (nextProfile.todayMerit === 1 || nextProfile.todayMerit % 10 === 0) {
      window.setTimeout(() => playBellChime(), 70);
    }
    announceLevelUpIfNeeded(prevTotal, nextProfile.totalMerit);

    // 烟雾爆发 & 小猫开心跳动
    setSmokeBurst((c) => c + 1);
    setCatExcited(false);
    requestAnimationFrame(() => setCatExcited(true));
    if (catTimerRef.current) window.clearTimeout(catTimerRef.current);
    catTimerRef.current = window.setTimeout(() => setCatExcited(false), 380);

    // 飘出金色功德弹幕
    const phrase =
      DANMAKU_PHRASES[Math.floor(Math.random() * DANMAKU_PHRASES.length)];
    const id = nextDanmakuId.current++;
    const leftPercent = 22 + Math.random() * 56;

    setDanmakuList((prev) => [...prev.slice(-8), { id, text: phrase, leftPercent }]);
    window.setTimeout(() => {
      setDanmakuList((prev) => prev.filter((item) => item.id !== id));
    }, 1450);
  }

  function handleClaimCheckIn() {
    const prevTotal = profile.totalMerit;
    const outcome = performDailyCheckIn(profile);
    setProfile(outcome.profile);
    playBellChime();
    announceLevelUpIfNeeded(prevTotal, outcome.profile.totalMerit);

    const parts = [`签到成功！功德 +${outcome.reward.meritBonus}`];
    if (outcome.unlockedMessage) {
      parts.push(outcome.unlockedMessage);
    }
    setCheckInFeedback(parts.join(' · '));
  }

  function handleSimulateNextDay() {
    const prevTotal = profile.totalMerit;
    const outcome = simulateNextCheckInDay(profile);
    setProfile(outcome.profile);
    playBellChime();
    announceLevelUpIfNeeded(prevTotal, outcome.profile.totalMerit);

    const parts = [
      `已模拟连签至第 ${outcome.profile.streak} 天（功德 +${outcome.reward.meritBonus}）`,
    ];
    if (outcome.unlockedMessage) {
      parts.push(outcome.unlockedMessage);
    }
    setCheckInFeedback(parts.join(' · '));
  }

  function handleResetProgress() {
    const fresh = resetUserProfile();
    setProfile(fresh);
    setSelectedIds((prev) =>
      prev.filter((id) => {
        const item = OFFERINGS.find((o) => o.id === id);
        return !item?.unlockStreak;
      })
    );
    setCheckInFeedback('已重置签到天数与段位，随时可以重新体验～');
  }

  function handleChangePosterTheme(theme: PosterTheme) {
    const nextProfile: UserProfile = {
      ...profile,
      posterTheme: theme,
    };
    setProfile(nextProfile);
    saveUserProfile(nextProfile);
  }

  function drawRandomFortune(): Fortune {
    if (FORTUNES.length <= 1) return FORTUNES[0];
    const candidates = FORTUNES.filter((f) => f.id !== currentFortune?.id);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function handleShakeFortune() {
    setModalOpen(true);
    setModalPhase('shaking');
    playShakeRattle();

    if (shakeTimerRef.current) window.clearTimeout(shakeTimerRef.current);
    shakeTimerRef.current = window.setTimeout(() => {
      const picked = drawRandomFortune();
      setCurrentFortune(picked);
      setModalPhase('result');
      playBellChime();
    }, 1150);
  }

  return (
    <PhoneFrame>
      {/* 段位晋升喜报浮条 */}
      {levelUpBanner && (
        <div
          role="status"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] whitespace-nowrap rounded-full bg-gradient-to-r from-[#A62C1E] to-[#C83E2B] border-2 border-[#F6D277] px-4 py-1.5 text-[12.5px] font-extrabold text-[#FFE99B] shadow-xl animate-jelly-pop"
        >
          {levelUpBanner}
        </div>
      )}

      <main className="flex-1 flex flex-col justify-between pb-2.5">
        <div>
          <BlessingStage
            todayMerit={profile.todayMerit}
            totalMerit={profile.totalMerit}
            streak={profile.streak}
            bestStreak={profile.bestStreak}
            checkedInToday={checkedInToday}
            muted={muted}
            onToggleMute={handleToggleMute}
            onOpenCheckIn={() => {
              setCheckInFeedback(null);
              setCheckInOpen(true);
            }}
            selectedOfferings={selectedOfferings}
            onRemoveOffering={handleRemoveFromAltar}
            smokeBurst={smokeBurst}
            catExcited={catExcited}
            danmakuList={danmakuList}
          />

          <OfferingBar
            selectedIds={selectedIds}
            bestStreak={profile.bestStreak}
            shakeHint={shakeHint}
            onToggleOffering={handleToggleOffering}
            onOpenCheckIn={() => {
              setCheckInFeedback(null);
              setCheckInOpen(true);
            }}
          />
        </div>

        {/* 底部核心互动按钮区 */}
        <section className="mx-3 mt-1.5 flex flex-col gap-1.5" aria-label="祈福操作按钮">
          <button
            type="button"
            onClick={handleTapMerit}
            className="
              w-full rounded-2xl
              bg-gradient-to-r from-[#C83E2B] via-[#D94B36] to-[#C83E2B]
              border-b-4 border-[#8A1F12]
              py-2.5 px-4 text-[#FFF7E2]
              shadow-[0_6px_16px_rgba(200,62,43,0.3)]
              active:translate-y-0.5 active:border-b-2
              transition-all touch-manipulation
              flex items-center justify-center gap-2
            "
          >
            <span className="text-lg leading-none" aria-hidden="true">
              🥢
            </span>
            <span className="font-bold text-[14.5px] tracking-wide">
              点击上香 / 敲木鱼积功德
            </span>
          </button>

          <button
            type="button"
            onClick={handleShakeFortune}
            className="
              w-full rounded-2xl
              bg-gradient-to-r from-[#F6D277] via-[#E6B450] to-[#F6D277]
              border-2 border-[#B88322]
              py-2 px-4 text-[#3A2618]
              shadow-[0_4px_12px_rgba(230,180,80,0.32)]
              active:scale-[0.98]
              transition-all touch-manipulation
              flex items-center justify-center gap-2
            "
          >
            <span className="text-base leading-none" aria-hidden="true">
              🎋
            </span>
            <span className="font-extrabold text-[14px] tracking-wide">
              摇一摇求今日灵签
            </span>
          </button>
        </section>
      </main>

      <CheckInModal
        open={checkInOpen}
        totalMerit={profile.totalMerit}
        streak={profile.streak}
        bestStreak={profile.bestStreak}
        checkedInToday={checkedInToday}
        feedbackText={checkInFeedback}
        onClose={() => setCheckInOpen(false)}
        onCheckIn={handleClaimCheckIn}
        onSimulateNextDay={handleSimulateNextDay}
        onResetProgress={handleResetProgress}
      />

      <FortuneModal
        open={modalOpen}
        phase={modalPhase}
        fortune={currentFortune}
        offerings={selectedOfferings}
        todayMerit={profile.todayMerit}
        totalMerit={profile.totalMerit}
        streak={profile.streak}
        bestStreak={profile.bestStreak}
        posterTheme={profile.posterTheme}
        onChangePosterTheme={handleChangePosterTheme}
        onClose={() => setModalOpen(false)}
        onRedraw={handleShakeFortune}
        onOpenPoster={() => setModalPhase('poster')}
        onBackToResult={() => setModalPhase('result')}
        onOpenCheckIn={() => {
          setCheckInFeedback(null);
          setCheckInOpen(true);
        }}
      />
    </PhoneFrame>
  );
}

export default App;
