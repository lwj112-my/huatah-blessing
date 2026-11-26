/**
 * ============================================================================
 * 🏆 功德段位 & 7天连续签到奖励配置区（可随时修改称号、门槛与奖励！）
 * ============================================================================
 */
export interface MeritLevel {
  level: number;
  title: string;
  icon: string;
  minMerit: number;
  badgeBg: string;
  badgeText: string;
}

export const MERIT_LEVELS: MeritLevel[] = [
  {
    level: 1,
    title: '摸鱼见习生',
    icon: '🐟',
    minMerit: 0,
    badgeBg: '#FAF5EB',
    badgeText: '#7A5C48',
  },
  {
    level: 2,
    title: '防饼小能手',
    icon: '🛡️',
    minMerit: 30,
    badgeBg: '#EEF7F0',
    badgeText: '#2F7D4E',
  },
  {
    level: 3,
    title: '大道顺风锦鲤',
    icon: '🎏',
    minMerit: 100,
    badgeBg: '#FFF3E0',
    badgeText: '#C85A17',
  },
  {
    level: 4,
    title: '准时放工大师',
    icon: '⏰',
    minMerit: 250,
    badgeBg: '#FDF0EE',
    badgeText: '#C83E2B',
  },
  {
    level: 5,
    title: 'Huat Ah 财神挚友',
    icon: '👑',
    minMerit: 600,
    badgeBg: '#FDF4DC',
    badgeText: '#B88322',
  },
];

export interface LevelProgressInfo {
  current: MeritLevel;
  next: MeritLevel | null;
  progressPercent: number;
  meritToNext: number;
}

export function getLevelInfo(totalMerit: number): LevelProgressInfo {
  let current = MERIT_LEVELS[0];
  for (const tier of MERIT_LEVELS) {
    if (totalMerit >= tier.minMerit) {
      current = tier;
    }
  }

  const nextIndex = MERIT_LEVELS.findIndex((t) => t.level === current.level) + 1;
  const next = nextIndex < MERIT_LEVELS.length ? MERIT_LEVELS[nextIndex] : null;

  if (!next) {
    return {
      current,
      next: null,
      progressPercent: 100,
      meritToNext: 0,
    };
  }

  const span = next.minMerit - current.minMerit;
  const gained = totalMerit - current.minMerit;
  const progressPercent = Math.min(100, Math.max(0, Math.round((gained / span) * 100)));

  return {
    current,
    next,
    progressPercent,
    meritToNext: Math.max(0, next.minMerit - totalMerit),
  };
}

export interface CheckInReward {
  day: number;
  meritBonus: number;
  label: string;
  unlockText?: string;
}

export const CHECKIN_REWARDS: CheckInReward[] = [
  { day: 1, meritBonus: 10, label: '开门红' },
  { day: 2, meritBonus: 15, label: '解锁供品', unlockText: '🧋 拉茶 Teh Tarik' },
  { day: 3, meritBonus: 20, label: '好运稳' },
  { day: 4, meritBonus: 25, label: '解锁供品', unlockText: '🍜 半夜 Maggi Goreng' },
  { day: 5, meritBonus: 30, label: '功德涨' },
  { day: 6, meritBonus: 40, label: '欧气满' },
  {
    day: 7,
    meritBonus: 60,
    label: '尊享解锁',
    unlockText: '🖤 黑金海报 + 墨镜小猫',
  },
];

export const BLACK_GOLD_UNLOCK_STREAK = 7;
