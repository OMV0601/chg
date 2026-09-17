const POSTS = 7;

/** Perspective by hand: `u` runs 0 at the vanishing point to 1 at the viewer. */
function post(u: number) {
  return {
    y: 60 + 760 * Math.pow(u, 1.45),
    left: 452 - 520 * u,
    right: 548 + 520 * u,
    height: 14 + 104 * u,
    width: 2 + 5 * u,
  };
}

const us = Array.from({ length: POSTS }, (_, i) => (i + 1) / POSTS);
const marks = us.map(post);

function rope(side: "left" | "right") {
  const pts = marks.map((m) => ({
    x: side === "left" ? m.left : m.right,
    y: m.y - m.height,
  }));
  return pts
    .slice(0, -1)
    .map((p, i) => {
      const n = pts[i + 1];
      const sag = (n.y - p.y) * 0.3 + 6;
      return `M${p.x} ${p.y} Q ${(p.x + n.x) / 2} ${(p.y + n.y) / 2 + sag} ${n.x} ${n.y}`;
    })
    .join(" ");
}

/** Velvet room, carpet running back to a vanishing point, ropes down both sides. */
export default function CarpetBackdrop() {
  return (
    <svg
      viewBox="0 0 1000 820"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="carpet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C0C1F" />
          <stop offset="45%" stopColor="#8E1330" />
          <stop offset="100%" stopColor="#A5173A" />
        </linearGradient>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E0E14" />
          <stop offset="100%" stopColor="#14090D" />
        </linearGradient>
        <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3C766" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8A6E16" />
        </linearGradient>
        <radialGradient id="haze" cx="50%" cy="8%" r="58%">
          <stop offset="0%" stopColor="#C9A227" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1000" height="820" fill="url(#wall)" />
      <rect width="1000" height="820" fill="url(#haze)" />

      <path d="M452 60 L548 60 L1068 820 L-68 820 Z" fill="url(#carpet)" />
      <path
        d="M452 60 L548 60 L1068 820 L-68 820 Z"
        fill="none"
        stroke="#C9A227"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {(["left", "right"] as const).map((side) => (
        <g key={side}>
          <path
            d={rope(side)}
            fill="none"
            stroke="#6E0E22"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.92"
          />
          {marks.map((m, i) => {
            const x = side === "left" ? m.left : m.right;
            return (
              <g key={i}>
                <rect
                  x={x - m.width / 2}
                  y={m.y - m.height}
                  width={m.width}
                  height={m.height}
                  fill="url(#brass)"
                />
                <ellipse
                  cx={x}
                  cy={m.y - m.height}
                  rx={m.width * 1.5}
                  ry={m.width * 1.5}
                  fill="#E3C766"
                />
                <ellipse cx={x} cy={m.y} rx={m.width * 2.4} ry={m.width} fill="#3B2A0B" />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
