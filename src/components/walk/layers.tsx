/**
 * The parallax world. Each layer fills the stage and holds one `<g>` that the
 * scene controller slides left. Content runs well past the right edge so there
 * is always something new arriving.
 */

const V = "0 0 1600 900";

function Layer({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox={V}
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <g data-layer={id}>{children}</g>
    </svg>
  );
}

/** Deterministic jitter so the world looks hand placed but never reflows. */
const wobble = (i: number, amp: number) =>
  ((Math.sin(i * 12.9898) * 43758.5453) % 1) * amp;

export function HillsLayer() {
  return (
    <Layer id="hills">
      <path
        d="M-200 640 Q 160 520 460 612 T 1080 596 T 1700 618 T 2340 590 T 2980 614 T 3700 600 L3700 900 L-200 900Z"
        fill="#2D6B7B"
        opacity="0.42"
      />
      <path
        d="M-200 690 Q 260 596 620 668 T 1260 652 T 1900 676 T 2560 648 T 3700 668 L3700 900 L-200 900Z"
        fill="#0F4C5C"
        opacity="0.32"
      />
    </Layer>
  );
}

export function FieldsLayer() {
  const trees = Array.from({ length: 16 }, (_, i) => ({
    x: -120 + i * 250 + wobble(i, 90),
    s: 0.8 + wobble(i + 7, 0.5),
  }));

  return (
    <Layer id="fields">
      <path
        d="M-200 700 H3700 V900 H-200Z"
        fill="#7FA05A"
        opacity="0.34"
      />
      {/* Crop rows, thin and receding. */}
      {Array.from({ length: 60 }, (_, i) => (
        <rect
          key={i}
          x={-200 + i * 66}
          y={706 + wobble(i, 8)}
          width="30"
          height="10"
          rx="5"
          fill="#5F7F3C"
          opacity="0.5"
        />
      ))}
      {trees.map((t, i) => (
        <g key={i} transform={`translate(${t.x} 706) scale(${t.s})`}>
          <rect x="-4" y="-46" width="8" height="48" fill="#5C4127" />
          <circle cx="0" cy="-62" r="34" fill="#3E6B36" />
          <circle cx="-22" cy="-48" r="22" fill="#4A7B3E" />
          <circle cx="22" cy="-50" r="20" fill="#355C2E" />
        </g>
      ))}
    </Layer>
  );
}

export function VillageLayer() {
  const houses = Array.from({ length: 12 }, (_, i) => ({
    x: -160 + i * 330 + wobble(i + 3, 120),
    w: 118 + wobble(i, 60),
    h: 78 + wobble(i + 5, 34),
  }));
  const poles = Array.from({ length: 10 }, (_, i) => -100 + i * 400);

  return (
    <Layer id="village">
      {houses.map((h, i) => (
        <g key={i} transform={`translate(${h.x} 742)`}>
          <rect x={-h.w / 2} y={-h.h} width={h.w} height={h.h} fill="#D8CBB6" />
          <path
            d={`M${-h.w / 2 - 12} ${-h.h} L0 ${-h.h - 34} L${h.w / 2 + 12} ${-h.h}Z`}
            fill="#8C3B24"
          />
          <rect x="-13" y={-38} width="26" height="38" fill="#5C3B2A" />
          <rect x={-h.w / 2 + 14} y={-h.h + 20} width="20" height="18" fill="#2D6B7B" opacity="0.7" />
        </g>
      ))}

      {/* Poles and the wire that sags between them. */}
      {poles.map((x, i) => (
        <g key={i} transform={`translate(${x} 746)`}>
          <rect x="-3" y="-150" width="6" height="150" fill="#6B5B4A" />
          <rect x="-22" y="-146" width="44" height="5" fill="#6B5B4A" />
          {i < poles.length - 1 && (
            <path
              d="M0 -142 Q 200 -108 400 -142"
              stroke="#4A4036"
              strokeWidth="2"
              fill="none"
              opacity="0.65"
            />
          )}
        </g>
      ))}
    </Layer>
  );
}

export function PathLayer() {
  return (
    <Layer id="path">
      <path
        d="M-200 812 Q 500 792 1100 814 T 2300 808 T 3700 816 L3700 900 L-200 900Z"
        fill="#8C3B24"
        opacity="0.9"
      />
      <path
        d="M-200 828 Q 600 812 1300 832 T 2600 826 T 3700 834"
        stroke="#6E2C19"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      {/* Stones and grass tufts nearest the camera. */}
      {Array.from({ length: 44 }, (_, i) => (
        <ellipse
          key={`s${i}`}
          cx={-160 + i * 90 + wobble(i, 40)}
          cy={852 + wobble(i + 2, 26)}
          rx={5 + wobble(i + 4, 7)}
          ry={3 + wobble(i + 6, 3)}
          fill="#5E2614"
          opacity="0.55"
        />
      ))}
      {Array.from({ length: 26 }, (_, i) => (
        <path
          key={`g${i}`}
          d="M0 0 l-5 -14 M0 0 l0 -18 M0 0 l6 -13"
          transform={`translate(${-140 + i * 150 + wobble(i + 9, 70)} 884)`}
          stroke="#4E6B32"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </Layer>
  );
}

/** The school the walk ends at. Sits far to the right until the world arrives. */
export function SchoolLayer() {
  return (
    <Layer id="school">
      <g transform="translate(2450 742)">
        <rect x="-250" y="-210" width="500" height="210" fill="#EFE6D4" />
        <path d="M-274 -210 L0 -286 L274 -210Z" fill="#8C3B24" />
        <rect x="-250" y="-216" width="500" height="12" fill="#C9A227" opacity="0.8" />

        {/* Painted sign above the door. */}
        <rect x="-108" y="-186" width="216" height="46" rx="5" fill="#0F4C5C" />
        <text
          x="0"
          y="-155"
          textAnchor="middle"
          fill="#F2A900"
          fontSize="27"
          fontFamily="var(--font-display), sans-serif"
          fontWeight="700"
          letterSpacing="1"
        >
          Computer Lab
        </text>

        {/* Doorway. The camera goes through this. */}
        <g data-door>
          <rect x="-52" y="-124" width="104" height="124" rx="4" fill="#20130C" />
          <rect x="-52" y="-124" width="104" height="124" rx="4" fill="#8FE3FF" opacity="0.14" />
        </g>

        <rect x="-214" y="-128" width="74" height="60" fill="#2D6B7B" opacity="0.55" />
        <rect x="140" y="-128" width="74" height="60" fill="#2D6B7B" opacity="0.55" />
        <rect x="-250" y="-6" width="500" height="10" fill="#B9A98D" />
      </g>
    </Layer>
  );
}
