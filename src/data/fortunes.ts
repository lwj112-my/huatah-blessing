/**
 * ============================================================================
 * 🎋 今日幽默灵签库（18 条大马本地 Rojak 幽默签，随时可往下扩充！）
 * ============================================================================
 * 想加新签文？直接复制其中一对 { ... }, 粘贴到数组末尾，改一下 id 和内容即可！
 * - id: 唯一数字编号
 * - level: 签位印章（例如：上上签、摸鱼吉签、顺风顺水签）
 * - idiom: 四字吉言（4-6字效果最好看）
 * - interpretation: 幽默白话解签（支持自然中英混排）
 * - yi: 今日宜
 * - ji: 今日忌
 */
export interface Fortune {
  id: number;
  level: string;
  idiom: string;
  interpretation: string;
  yi: string;
  ji: string;
}

export const FORTUNES: Fortune[] = [
  {
    id: 1,
    level: '上上签',
    idiom: '一路绿灯',
    interpretation:
      '今天出门连 Federal Highway 都不怎么 Jam，LRT 刚好门开等你上车，Steady 到爆！',
    yi: '准时出发、顺手买张 Toto',
    ji: '赖床 5 分钟',
  },
  {
    id: 2,
    level: '摸鱼吉签',
    idiom: '带薪喘气',
    interpretation:
      'Boss 今天开会忙到飞起，根本没空看你屏幕。请安心喝口 Kopi，该摸鱼时就摸鱼，工作做完准时跑。',
    yi: '泡杯 Kopi O、整理桌面',
    ji: '主动问「还有东西要做吗」',
  },
  {
    id: 3,
    level: '暴富预备签',
    idiom: '钱包回血',
    interpretation:
      '月底吃土警报解除！不是 Bonus 要来了，就是有朋友突然想起还欠你一顿 Mamak 没请。',
    yi: '看银行户口、收红包',
    ji: '半夜刷 Shopee 加购物车',
  },
  {
    id: 4,
    level: '防饼护体签',
    idiom: '免疫画饼',
    interpretation:
      '老板今天又要讲「大家是一家人」？别慌，你的防画大饼盾牌已满级，左耳进右耳出，心态 Steady。',
    yi: '微笑点头、记录真实 KPI',
    ji: '免费加班做义工',
  },
  {
    id: 5,
    level: 'Huat Ah 签',
    idiom: '贵人Tapau',
    interpretation:
      '今天有隐形贵人罩你！可能是同事顺手帮你 Tapau 鸡饭，也可能是客户突然不改稿直接 Approve。',
    yi: '说谢谢、夸夸身边人',
    ji: '一个人闷头硬扛',
  },
  {
    id: 6,
    level: '干饭大吉签',
    idiom: '加蛋不愁',
    interpretation:
      '人生没什么烦恼是一包 Nasi Lemak 加炸鸡腿解决不了的。如果有，今晚去 Mamak 叫多一杯 Teh Tarik！',
    yi: '好好吃饭、奖励自己',
    ji: '节食算卡路里',
  },
  {
    id: 7,
    level: '顺风顺水签',
    idiom: 'OT退散',
    interpretation:
      '今日下班运势极佳！5:59 PM 电脑准时关机，谁发 WhatsApp 找你都要等到明天早上再说。',
    yi: '准时放工、去运动或追剧',
    ji: '17:55 才打开新任务',
  },
  {
    id: 8,
    level: '水逆退散签',
    idiom: 'Cincai过关',
    interpretation:
      '原本以为很难搞的麻烦，今天对方竟然说「Cincai lah，ok 的啦！」，直接省下三小时折腾。',
    yi: '大胆沟通、先交初稿',
    ji: '自己吓自己、过度完美主义',
  },
  {
    id: 9,
    level: '猫山王签',
    idiom: '霸气外漏',
    interpretation:
      '像猫山王榴莲一样，味道够浓、气场够稳！今天你的提议特别有说服力，讲出来大家都服。',
    yi: '会议发言、争取权益',
    ji: '过度谦虚当透明人',
  },
  {
    id: 10,
    level: '人缘爆棚签',
    idiom: '绝对Bojio',
    interpretation:
      '近期社交雷达全开！老朋友突然 jio 你喝茶，群里八卦你刚好抢到前排吃瓜位。',
    yi: '回复群消息、参加聚会',
    ji: '已读不回太久',
  },
  {
    id: 11,
    level: '醒神回魂签',
    idiom: 'Kopi救命',
    interpretation:
      '虽然昨晚刷 Reels 到凌晨两点，但今天精神意外在线！一杯 Kopi O Kosong 下肚，战力直接满格。',
    yi: '上午处理重要大事',
    ji: '午饭后吃太饱马上开长会',
  },
  {
    id: 12,
    level: '稳如泰山签',
    idiom: 'Boleh搞掂',
    interpretation:
      '遇到突发小状况别慌，深呼吸敲两下赛博木鱼。你比自己想象中更 Steady，这关一定 Boleh！',
    yi: '列个清单逐项打勾',
    ji: '一口气焦虑十件事',
  },
  {
    id: 13,
    level: '小确幸签',
    idiom: '冷气够冷',
    interpretation:
      '今天好运藏在细节里：Mall 门口秒找到 Parking 位、Grab 不起价、办公室冷气刚好不吹头。',
    yi: '留意生活小美好',
    ji: '为了小事生闷气',
  },
  {
    id: 14,
    level: '桃花招财签',
    idiom: '人见人爱',
    interpretation:
      '不管是客户、Crush 还是家里毛孩子，今天看你都特别顺眼！多笑两下，好运自己贴上来。',
    yi: '换个好看头像、发个 Story',
    ji: '整天黑着脸',
  },
  {
    id: 15,
    level: '清零解压签',
    idiom: '烦恼清空',
    interpretation:
      '把昨天没做完的遗憾和别人的坏情绪通通打包丢掉！今天是全新副本，轻装上阵最轻松。',
    yi: '听歌散步、早点洗洗睡',
    ji: '半夜内耗复盘三年前的事',
  },
  {
    id: 16,
    level: '收工大吉签',
    idiom: '万事Steady',
    interpretation:
      '总体运势四平八稳，没有惊吓只有小惊喜。平安健康、有吃有喝、家人开心，就是今日顶配好彩头！',
    yi: '给家人发句问候、截图分享好运',
    ji: '跟自己过不去',
  },
  {
    id: 17,
    level: '避坑神签',
    idiom: '闪避满分',
    interpretation:
      '今天本来有个小锅差点扣你头上，幸好你机智闪开，或者正好休假完美错过，全靠平时功德攒得好！',
    yi: '重要决定多看一眼再发',
    ji: '没看清群名就乱回消息',
  },
  {
    id: 18,
    level: '锦鲤附体签',
    idiom: '天选之子',
    interpretation:
      '极罕见好运加成！今天抽奖、抢优惠券、点外卖多送一块肉的概率直线上升，快截图吸欧气！',
    yi: '发 IG Story 传递好运',
    ji: '低调过头忘了开心',
  },
];
