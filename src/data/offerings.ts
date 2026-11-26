/**
 * ============================================================================
 * 🍊 本地幽默供品配置区（以后想加新供品，只需照着下面格式加一段！）
 * ============================================================================
 * 字段说明：
 * - id: 唯一英文编号（不要重复即可，例如 'nasi-lemak'）
 * - icon: 显示用的 Emoji 图标
 * - name: 供品名称
 * - shortName: 摆上供桌后显示在托盘下的简短名字（建议 4-6 字以内）
 * - tagline: 幽默功效标签
 * - unlockStreak: （可选）填数字表示「连续签到第几天解锁」，不填则默认常驻开放
 */
export interface Offering {
  id: string;
  icon: string;
  name: string;
  shortName: string;
  tagline: string;
  unlockStreak?: number;
}

export const OFFERINGS: Offering[] = [
  {
    id: 'kopi-o',
    icon: '☕',
    name: '醒神 Kopi O Kosong',
    shortName: 'Kopi O',
    tagline: '专治早起犯困',
  },
  {
    id: 'musang-king',
    icon: '👑',
    name: '猫山王榴莲',
    shortName: '猫山王',
    tagline: '霸气侧漏保平安',
  },
  {
    id: 'highway-charm',
    icon: '🚗',
    name: '大道顺风符',
    shortName: '顺风符',
    tagline: '专治上班大塞车',
  },
  {
    id: 'anti-cake-shield',
    icon: '🛡️',
    name: '防老板画大饼盾牌',
    shortName: '防饼盾',
    tagline: '职场护体',
  },
  {
    id: 'drumstick',
    icon: '🍗',
    name: '加薪大鸡腿',
    shortName: '大鸡腿',
    tagline: '月底不吃土',
  },
  {
    id: 'mandarin',
    icon: '🍊',
    name: '大吉大利',
    shortName: '大吉大利',
    tagline: '万事顺意',
  },
  // 👇 连签解锁隐藏大马美食供品
  {
    id: 'teh-tarik',
    icon: '🧋',
    name: '拉茶 Teh Tarik',
    shortName: '拉茶',
    tagline: '加甜不加压',
    unlockStreak: 2,
  },
  {
    id: 'maggi-goreng',
    icon: '🍜',
    name: '半夜 Maggi Goreng',
    shortName: 'Maggi面',
    tagline: 'Mamak 灵魂回血',
    unlockStreak: 4,
  },
];
