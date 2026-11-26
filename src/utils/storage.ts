import { CHECKIN_REWARDS, type CheckInReward } from '../data/levels';

const LEGACY_MERIT_KEY = 'cyber_blessing_merit_v1';
const PROFILE_STORAGE_KEY = 'cyber_blessing_profile_v1';
const MUTE_STORAGE_KEY = 'cyber_blessing_muted_v1';

export type PosterTheme = 'classic' | 'black-gold';

export interface UserProfile {
  totalMerit: number;
  todayMerit: number;
  todayDate: string;
  streak: number;
  bestStreak: number;
  lastCheckInDate: string | null;
  posterTheme: PosterTheme;
}

interface LegacyMeritRecord {
  date: string;
  count: number;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayDateKey(): string {
  return formatDateKey(new Date());
}

export function getYesterdayDateKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDateKey(d);
}

export function getFormattedChineseDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const w = weekdays[now.getDay()];
  return `${y}年${m}月${d}日 · 星期${w}`;
}

function createDefaultProfile(): UserProfile {
  const today = getTodayDateKey();
  let migratedMerit = 0;
  try {
    const legacyRaw = localStorage.getItem(LEGACY_MERIT_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw) as LegacyMeritRecord;
      if (typeof legacy.count === 'number' && legacy.count > 0) {
        migratedMerit = legacy.count;
      }
    }
  } catch {
    // 忽略读取异常
  }

  return {
    totalMerit: migratedMerit,
    todayMerit: migratedMerit,
    todayDate: today,
    streak: 0,
    bestStreak: 0,
    lastCheckInDate: null,
    posterTheme: 'classic',
  };
}

export function loadUserProfile(): UserProfile {
  const today = getTodayDateKey();
  const yesterday = getYesterdayDateKey();

  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) {
      const fresh = createDefaultProfile();
      saveUserProfile(fresh);
      return fresh;
    }

    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    const sameDay = parsed.todayDate === today;

    // 若昨天和今天都没签到，当前连签天数归零（保留历史最高 bestStreak 解锁状态）
    const checkedTodayOrYesterday =
      parsed.lastCheckInDate === today || parsed.lastCheckInDate === yesterday;

    const normalized: UserProfile = {
      totalMerit: typeof parsed.totalMerit === 'number' ? Math.max(0, parsed.totalMerit) : 0,
      todayMerit:
        sameDay && typeof parsed.todayMerit === 'number'
          ? Math.max(0, parsed.todayMerit)
          : 0,
      todayDate: today,
      streak:
        checkedTodayOrYesterday && typeof parsed.streak === 'number'
          ? Math.max(0, parsed.streak)
          : 0,
      bestStreak: typeof parsed.bestStreak === 'number' ? Math.max(0, parsed.bestStreak) : 0,
      lastCheckInDate: typeof parsed.lastCheckInDate === 'string' ? parsed.lastCheckInDate : null,
      posterTheme: parsed.posterTheme === 'black-gold' ? 'black-gold' : 'classic',
    };

    if (!sameDay) {
      saveUserProfile(normalized);
    }
    return normalized;
  } catch {
    return createDefaultProfile();
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // 忽略隐私模式等存储限制
  }
}

export function hasCheckedInToday(profile: UserProfile): boolean {
  return profile.lastCheckInDate === getTodayDateKey();
}

export function getRewardForDay(streakDay: number): CheckInReward {
  const index = Math.min(CHECKIN_REWARDS.length - 1, Math.max(0, streakDay - 1));
  return CHECKIN_REWARDS[index];
}

export interface CheckInOutcome {
  profile: UserProfile;
  reward: CheckInReward;
  unlockedMessage: string | null;
}

export function performDailyCheckIn(profile: UserProfile): CheckInOutcome {
  const today = getTodayDateKey();
  const yesterday = getYesterdayDateKey();

  if (profile.lastCheckInDate === today) {
    const reward = getRewardForDay(Math.max(1, profile.streak));
    return { profile, reward, unlockedMessage: null };
  }

  const nextStreak = profile.lastCheckInDate === yesterday ? profile.streak + 1 : 1;
  const reward = getRewardForDay(nextStreak);
  const nextBest = Math.max(profile.bestStreak, nextStreak);

  const nextProfile: UserProfile = {
    ...profile,
    todayDate: today,
    todayMerit: profile.todayMerit + reward.meritBonus,
    totalMerit: profile.totalMerit + reward.meritBonus,
    streak: nextStreak,
    bestStreak: nextBest,
    lastCheckInDate: today,
  };

  saveUserProfile(nextProfile);

  const unlockedMessage =
    reward.unlockText && nextBest === nextStreak
      ? `解锁新奖励：${reward.unlockText}`
      : null;

  return { profile: nextProfile, reward, unlockedMessage };
}

/**
 * 店主体验模式专用：模拟连签推进 1 天，便于立刻试玩 2/4/7 天解锁及高段位效果
 */
export function simulateNextCheckInDay(profile: UserProfile): CheckInOutcome {
  const today = getTodayDateKey();
  const nextStreak = profile.streak + 1;
  const reward = getRewardForDay(nextStreak);
  const nextBest = Math.max(profile.bestStreak, nextStreak);

  const nextProfile: UserProfile = {
    ...profile,
    todayDate: today,
    todayMerit: profile.todayMerit + reward.meritBonus,
    totalMerit: profile.totalMerit + reward.meritBonus,
    streak: nextStreak,
    bestStreak: nextBest,
    lastCheckInDate: today,
  };

  saveUserProfile(nextProfile);

  const unlockedMessage = reward.unlockText
    ? `体验解锁：${reward.unlockText}`
    : null;

  return { profile: nextProfile, reward, unlockedMessage };
}

export function resetUserProfile(): UserProfile {
  const fresh: UserProfile = {
    totalMerit: 0,
    todayMerit: 0,
    todayDate: getTodayDateKey(),
    streak: 0,
    bestStreak: 0,
    lastCheckInDate: null,
    posterTheme: 'classic',
  };
  saveUserProfile(fresh);
  return fresh;
}

export function loadMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveMuted(muted: boolean): void {
  try {
    localStorage.setItem(MUTE_STORAGE_KEY, muted ? 'true' : 'false');
  } catch {
    // 忽略存储限制
  }
}
