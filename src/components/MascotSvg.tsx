import { useId } from 'react';

interface LuckyCatProps {
  excited?: boolean;
  coolGlasses?: boolean;
  className?: string;
}

/**
 * 原创 Q 版「招财祈福小猫」矢量插画
 * 头戴国潮红金小瓜皮帽，怀抱「福」字金元宝，自带温暖金色光环；
 * 连续签到 7 天后还可戴上炫酷金边小墨镜！
 */
export function LuckyCatMascot({
  excited = false,
  coolGlasses = false,
  className = '',
}: LuckyCatProps) {
  const uid = useId().replace(/:/g, '');
  const haloId = `halo-${uid}`;
  const ingotId = `ingot-${uid}`;
  const hatId = `hat-${uid}`;

  return (
    <svg
      viewBox="0 0 220 210"
      className={`select-none ${excited ? 'animate-cat-excited' : ''} ${className}`}
      aria-label={coolGlasses ? '戴墨镜的Q版招财祈福小猫' : 'Q版招财祈福小猫'}
    >
      <defs>
        <radialGradient id={haloId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F6D277" stopOpacity="0.65" />
          <stop offset="65%" stopColor="#E6B450" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#E6B450" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ingotId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE99B" />
          <stop offset="50%" stopColor="#F2BC45" />
          <stop offset="100%" stopColor="#C88719" />
        </linearGradient>
        <linearGradient id={hatId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E04F3A" />
          <stop offset="100%" stopColor="#A62C1E" />
        </linearGradient>
      </defs>

      {/* 背后暖金光环 */}
      <circle cx="110" cy="108" r="90" fill={`url(#${haloId})`} className="animate-halo-pulse" />
      <circle
        cx="110"
        cy="108"
        r="74"
        fill="none"
        stroke="#E6B450"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        opacity="0.55"
      />

      {/* 小装饰星光 */}
      <path d="M36 66 L39 73 L46 76 L39 79 L36 86 L33 79 L26 76 L33 73 Z" fill="#F6D277" />
      <path d="M184 58 L186 63 L191 65 L186 67 L184 72 L182 67 L177 65 L182 63 Z" fill="#F6D277" />

      {/* 尾巴（在身体右侧翘起） */}
      <path
        d="M158 158 C184 152, 192 124, 178 112 C170 105, 160 112, 165 122 C170 132, 162 142, 152 145"
        fill="#FFF9EE"
        stroke="#3A2618"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 圆滚滚身体 */}
      <ellipse cx="110" cy="148" rx="52" ry="44" fill="#FFF9EE" stroke="#3A2618" strokeWidth="3.5" />
      {/* 肚皮暖奶白斑 */}
      <ellipse cx="110" cy="154" rx="34" ry="29" fill="#FFFDF8" />

      {/* 招财举起的左小爪（带粉嫩肉垫） */}
      <g transform={excited ? 'rotate(-10 60 120)' : 'rotate(0 60 120)'}>
        <path
          d="M66 138 C46 130, 38 104, 52 94 C64 85, 76 100, 74 120"
          fill="#FFF9EE"
          stroke="#3A2618"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <ellipse cx="57" cy="104" rx="5" ry="4" fill="#F4A59B" />
        <circle cx="51" cy="97" r="2.2" fill="#F4A59B" />
        <circle cx="57" cy="95" r="2.2" fill="#F4A59B" />
        <circle cx="63" cy="97" r="2.2" fill="#F4A59B" />
      </g>

      {/* 猫耳朵 */}
      <path d="M64 82 L56 44 L90 62 Z" fill="#FFF9EE" stroke="#3A2618" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M67 74 L63 53 L83 64 Z" fill="#F4A59B" />

      <path d="M156 82 L164 44 L130 62 Z" fill="#FFF9EE" stroke="#3A2618" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M153 74 L157 53 L137 64 Z" fill="#F4A59B" />

      {/* 猫咪大圆脸 */}
      <ellipse cx="110" cy="94" rx="52" ry="43" fill="#FFF9EE" stroke="#3A2618" strokeWidth="3.5" />

      {/* 国潮小红帽（瓜皮帽 + 金边 + 小玉扣） */}
      <path
        d="M78 60 C78 39, 142 39, 142 60 Z"
        fill={`url(#${hatId})`}
        stroke="#3A2618"
        strokeWidth="3"
      />
      <rect x="75" y="56" width="70" height="9" rx="4.5" fill="#E6B450" stroke="#3A2618" strokeWidth="2.5" />
      {/* 帽顶金珠 */}
      <circle cx="110" cy="41" r="6" fill="#F6D277" stroke="#3A2618" strokeWidth="2.5" />
      {/* 帽前翡翠圆扣 */}
      <circle cx="110" cy="60.5" r="5.5" fill="#46A87A" stroke="#3A2618" strokeWidth="2" />

      {/* 额头招财金纹 */}
      <path d="M110 68 L110 74 M105 70 L115 70" stroke="#E6B450" strokeWidth="2.5" strokeLinecap="round" />

      {/* 眼睛（7天解锁炫酷招财墨镜 / 普通圆眼 / 兴奋弯弯笑眼） */}
      {coolGlasses ? (
        <g aria-label="招财金边墨镜">
          {/* 镜腿 */}
          <line x1="60" y1="88" x2="70" y2="89" stroke="#D49B2A" strokeWidth="3" strokeLinecap="round" />
          <line x1="160" y1="88" x2="150" y2="89" stroke="#D49B2A" strokeWidth="3" strokeLinecap="round" />
          {/* 鼻梁金桥 */}
          <path d="M102 88 Q110 84 118 88" fill="none" stroke="#D49B2A" strokeWidth="3" strokeLinecap="round" />
          {/* 左镜片 */}
          <rect x="69" y="81" width="34" height="20" rx="7" fill="#231B17" stroke="#E6B450" strokeWidth="2.8" />
          <line x1="76" y1="96" x2="86" y2="85" stroke="#FFF7E2" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
          <line x1="84" y1="96" x2="90" y2="89" stroke="#FFF7E2" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
          {/* 右镜片 */}
          <rect x="117" y="81" width="34" height="20" rx="7" fill="#231B17" stroke="#E6B450" strokeWidth="2.8" />
          <line x1="124" y1="96" x2="134" y2="85" stroke="#FFF7E2" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
          <line x1="132" y1="96" x2="138" y2="89" stroke="#FFF7E2" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
        </g>
      ) : excited ? (
        <>
          <path d="M78 93 Q86 84 94 93" fill="none" stroke="#3A2618" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M126 93 Q134 84 142 93" fill="none" stroke="#3A2618" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="86" cy="91" r="6.5" fill="#3A2618" />
          <circle cx="83.8" cy="88.5" r="2.3" fill="#FFFFFF" />
          <circle cx="88.5" cy="93.2" r="1.1" fill="#FFFFFF" />

          <circle cx="134" cy="91" r="6.5" fill="#3A2618" />
          <circle cx="131.8" cy="88.5" r="2.3" fill="#FFFFFF" />
          <circle cx="136.5" cy="93.2" r="1.1" fill="#FFFFFF" />
        </>
      )}

      {/* 腮红 */}
      <ellipse cx="72" cy="102" rx="8.5" ry="5" fill="#F49B92" opacity="0.65" />
      <ellipse cx="148" cy="102" rx="8.5" ry="5" fill="#F49B92" opacity="0.65" />

      {/* 小鼻子与微笑猫嘴 */}
      <polygon points="106,97 114,97 110,102" fill="#E36D67" />
      <path
        d="M101 105 Q105.5 110 110 104 Q114.5 110 119 105"
        fill="none"
        stroke="#3A2618"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* 胡须 */}
      <path d="M52 93 L68 95 M50 102 L67 101" stroke="#7A5C48" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M168 93 L152 95 M170 102 L153 101" stroke="#7A5C48" strokeWidth="2.2" strokeLinecap="round" />

      {/* 红色项圈与金色铃铛 */}
      <path d="M74 126 Q110 138 146 126" fill="none" stroke="#C83E2B" strokeWidth="8" strokeLinecap="round" />
      <path d="M74 126 Q110 138 146 126" fill="none" stroke="#3A2618" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
      <circle cx="110" cy="134" r="7.5" fill="#F6D277" stroke="#3A2618" strokeWidth="2.5" />
      <circle cx="110" cy="135.5" r="1.8" fill="#3A2618" />

      {/* 怀抱「福」字大金元宝 */}
      <g transform="translate(110, 166)">
        <path
          d="M-36 -6 C-34 15, 34 15, 36 -6 C28 -11, 20 -4, 0 -4 C-20 -4, -28 -11, -36 -6 Z"
          fill={`url(#${ingotId})`}
          stroke="#3A2618"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <ellipse cx="0" cy="-9" rx="18" ry="8" fill="#FFE89E" stroke="#3A2618" strokeWidth="2.5" />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#A62C1E"
        >
          福
        </text>
      </g>

      {/* 右爪扶着元宝 */}
      <ellipse cx="144" cy="158" rx="11" ry="9" fill="#FFF9EE" stroke="#3A2618" strokeWidth="3" />
      <ellipse cx="76" cy="158" rx="11" ry="9" fill="#FFF9EE" stroke="#3A2618" strokeWidth="3" />
    </svg>
  );
}

/**
 * 国潮小香炉 + 袅袅青烟 SVG
 */
export function IncenseBurnerSvg({ smokeBurst }: { smokeBurst: number }) {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* 袅袅轻烟层 */}
      <svg
        viewBox="0 0 120 70"
        className="w-24 h-12 -mb-2 overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        {/* 常驻轻烟 */}
        <path
          d="M42 62 C36 48, 48 36, 42 20"
          fill="none"
          stroke="#D4B475"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="animate-smoke-1"
        />
        <path
          d="M60 62 C67 45, 53 33, 61 15"
          fill="none"
          stroke="#E6C88A"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-smoke-2"
        />
        <path
          d="M78 62 C72 47, 84 35, 76 18"
          fill="none"
          stroke="#D4B475"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="animate-smoke-3"
        />

        {/* 点击上香触发的额外金烟 */}
        {smokeBurst > 0 && (
          <g key={smokeBurst} className="animate-burst-smoke">
            <circle cx="60" cy="48" r="5" fill="#F6D277" opacity="0.55" />
            <circle cx="48" cy="44" r="3.5" fill="#E6B450" opacity="0.45" />
            <circle cx="72" cy="44" r="3.5" fill="#E6B450" opacity="0.45" />
          </g>
        )}
      </svg>

      {/* 香炉本体 */}
      <svg viewBox="0 0 110 72" className="w-20 h-14 drop-shadow-sm" aria-label="招财香炉">
        {/* 三支香 */}
        <line x1="43" y1="30" x2="39" y2="8" stroke="#C83E2B" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="39" cy="7" r="2.2" fill="#FF7B39" />

        <line x1="55" y1="30" x2="55" y2="4" stroke="#C83E2B" strokeWidth="3" strokeLinecap="round" />
        <circle cx="55" cy="3" r="2.5" fill="#FF8C42" />

        <line x1="67" y1="30" x2="71" y2="8" stroke="#C83E2B" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="71" cy="7" r="2.2" fill="#FF7B39" />

        {/* 左右耳 */}
        <path d="M23 35 C12 33, 12 48, 25 46" fill="none" stroke="#B88322" strokeWidth="4" strokeLinecap="round" />
        <path d="M87 35 C98 33, 98 48, 85 46" fill="none" stroke="#B88322" strokeWidth="4" strokeLinecap="round" />

        {/* 炉脚 */}
        <path d="M36 56 L32 66" stroke="#8E5F15" strokeWidth="5" strokeLinecap="round" />
        <path d="M74 56 L78 66" stroke="#8E5F15" strokeWidth="5" strokeLinecap="round" />
        <path d="M55 58 L55 67" stroke="#8E5F15" strokeWidth="5" strokeLinecap="round" />

        {/* 炉身 */}
        <path
          d="M25 32 L85 32 C85 52, 74 60, 55 60 C36 60, 25 52, 25 32 Z"
          fill="#E6B450"
          stroke="#3A2618"
          strokeWidth="2.6"
        />
        <rect x="22" y="27" width="66" height="7" rx="3.5" fill="#F6D277" stroke="#3A2618" strokeWidth="2.4" />
        <circle cx="55" cy="46" r="8.5" fill="#C83E2B" stroke="#3A2618" strokeWidth="1.8" />
        <text x="55" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#F6D277">
          吉
        </text>
      </svg>
    </div>
  );
}

/**
 * 国潮摇签筒 SVG
 */
export function FortuneCylinderSvg({
  shaking = false,
  showStick = false,
}: {
  shaking?: boolean;
  showStick?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 160 190"
      className={`w-36 h-44 select-none ${shaking ? 'animate-tube-rattle' : ''}`}
      aria-label="幸运签筒"
    >
      {/* 筒内竹签束 */}
      <g>
        <rect x="52" y="28" width="7" height="58" rx="3" fill="#F6D277" stroke="#3A2618" strokeWidth="2" transform="rotate(-12 55 60)" />
        <rect x="64" y="22" width="7" height="62" rx="3" fill="#E6B450" stroke="#3A2618" strokeWidth="2" transform="rotate(-5 67 60)" />
        <rect x="88" y="22" width="7" height="62" rx="3" fill="#E6B450" stroke="#3A2618" strokeWidth="2" transform="rotate(6 91 60)" />
        <rect x="100" y="28" width="7" height="58" rx="3" fill="#F6D277" stroke="#3A2618" strokeWidth="2" transform="rotate(13 103 60)" />
      </g>

      {/* 跃出的金色灵签 */}
      {showStick && (
        <g className="animate-stick-eject">
          <rect x="74" y="4" width="12" height="72" rx="4" fill="#FFE794" stroke="#A62C1E" strokeWidth="2.5" />
          <rect x="74" y="4" width="12" height="14" rx="3" fill="#C83E2B" />
          <text x="80" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#A62C1E">
            吉
          </text>
          <text x="80" y="47" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#A62C1E">
            签
          </text>
        </g>
      )}

      {/* 签筒桶身 */}
      <path
        d="M44 64 L116 64 L108 164 C108 172, 52 172, 52 164 Z"
        fill="#C83E2B"
        stroke="#3A2618"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* 筒口椭圆 */}
      <ellipse cx="80" cy="64" rx="36" ry="9" fill="#7D1F14" stroke="#3A2618" strokeWidth="3" />
      {/* 金色箍环 */}
      <rect x="44" y="75" width="72" height="9" rx="3" fill="#E6B450" stroke="#3A2618" strokeWidth="2.4" />
      <rect x="50" y="146" width="60" height="9" rx="3" fill="#E6B450" stroke="#3A2618" strokeWidth="2.4" />

      {/* 筒身「签」字菱形铭牌 */}
      <polygon
        points="80,94 100,114 80,134 60,114"
        fill="#FAF5EB"
        stroke="#E6B450"
        strokeWidth="3"
      />
      <text x="80" y="121" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#A62C1E">
        签
      </text>
    </svg>
  );
}

/**
 * 国潮四角回纹装饰
 */
export function CornerOrnamentSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <path
        d="M3 33 L3 5 C3 3.9 3.9 3 5 3 L33 3"
        fill="none"
        stroke="#E6B450"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M9 24 L9 9 L24 9"
        fill="none"
        stroke="#C83E2B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="9" r="2.2" fill="#E6B450" />
    </svg>
  );
}
