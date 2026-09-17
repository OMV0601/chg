/**
 * What waits at the end of the walk. Screens carry `data-screen` so the scene
 * can light them one at a time, and the whole thing is drawn in Screen glow,
 * the one place that colour is allowed.
 */
export default function LabInterior({ lit = true }: { lit?: boolean }) {
  const desks = [
    { x: 300, y: 700, s: 1.0 },
    { x: 620, y: 700, s: 1.0 },
    { x: 980, y: 700, s: 1.0 },
    { x: 1300, y: 700, s: 1.0 },
    { x: 440, y: 600, s: 0.78 },
    { x: 700, y: 600, s: 0.78 },
    { x: 960, y: 600, s: 0.78 },
    { x: 560, y: 534, s: 0.6 },
    { x: 840, y: 534, s: 0.6 },
  ];

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lab-glow" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#8FE3FF" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#8FE3FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FE3FF" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#8FE3FF" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#0A2730" />
      <rect y="470" width="1600" height="430" fill="#0D3440" />
      <rect width="1600" height="900" fill="url(#lab-glow)" />

      {/* Projector throwing code onto the far wall. */}
      <g data-projector opacity={lit ? 1 : 0}>
        <path d="M770 300 L1160 176 L1160 402 Z" fill="url(#beam)" />
        <rect x="1160" y="160" width="250" height="180" rx="6" fill="#0F4C5C" />
        <rect x="1160" y="160" width="250" height="180" rx="6" fill="#8FE3FF" opacity="0.13" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={1182 + (i % 2) * 14}
            y={188 + i * 28}
            width={120 - (i % 3) * 32}
            height="9"
            rx="4"
            fill="#8FE3FF"
            opacity="0.72"
          />
        ))}
        <rect x="726" y="286" width="52" height="30" rx="5" fill="#123B47" />
      </g>

      {/* Rows of machines. */}
      {desks.map((d, i) => (
        <g key={i} transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
          <rect x="-84" y="0" width="168" height="12" rx="3" fill="#123B47" />
          <rect x="-72" y="12" width="10" height="46" fill="#0E2F39" />
          <rect x="62" y="12" width="10" height="46" fill="#0E2F39" />
          <rect x="-16" y="-14" width="32" height="14" rx="3" fill="#123B47" />
          <g data-screen data-screen-index={i}>
            <rect x="-56" y="-86" width="112" height="72" rx="5" fill="#0B2C36" />
            <rect
              data-screen-face
              x="-52"
              y="-82"
              width="104"
              height="64"
              rx="3"
              fill="#8FE3FF"
              opacity="0"
            />
          </g>
        </g>
      ))}
    </svg>
  );
}
