export interface KidStyle {
  shirt: string;
  bottoms: string;
  pack: string;
  skin: string;
  hair: string;
  /** Two plaits instead of short hair. */
  plaits?: boolean;
}

/**
 * One child walking to the right, drawn at origin with the feet on y = 0 and
 * the head reaching about y = -118.
 *
 * Every part that moves sits in its own `<g data-limb>` with `transform-box:
 * fill-box`, so the parent scene can rotate it about its own joint without
 * knowing anything about the rest of the drawing.
 */
export default function Kid({
  style,
  x,
  scale,
}: {
  style: KidStyle;
  x: number;
  scale: number;
}) {
  const { shirt, bottoms, pack, skin, hair, plaits } = style;

  return (
    <g data-kid transform={`translate(${x} 0) scale(${scale})`}>
      {/* Far side limbs sit behind the torso. */}
      <g data-limb="leg-far" className="joint">
        <rect x="-4.5" y="-46" width="9" height="24" rx="4" fill="#0b2a33" />
        <g data-limb="shin-far" className="joint">
          <rect x="-4" y="-23" width="8" height="23" rx="3.5" fill={skin} />
          <path d="M-5 0h11a2 2 0 0 1 2 2v2H-5Z" fill="#14343d" />
        </g>
      </g>

      <g data-limb="arm-far" className="joint">
        <rect x="-3.4" y="-86" width="6.8" height="31" rx="3.4" fill={skin} />
        <rect x="-3.4" y="-86" width="6.8" height="15" rx="3.4" fill={shirt} opacity="0.9" />
      </g>

      {/* Backpack rides on the child's back, which is the left side here. */}
      <g data-limb="pack">
        <rect x="-19" y="-84" width="13" height="30" rx="5" fill={pack} />
        <rect x="-19" y="-74" width="13" height="4" rx="2" fill="#000" opacity="0.14" />
      </g>

      {/* Torso */}
      <path
        d="M-13 -88h26a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4h-26a4 4 0 0 1-4-4v-28a4 4 0 0 1 4-4Z"
        fill={shirt}
      />
      <rect x="-13" y="-58" width="26" height="14" rx="3" fill={bottoms} />

      {/* Head bobs as a unit. */}
      <g data-limb="head" className="joint">
        <circle cx="1" cy="-102" r="12" fill={skin} />
        {plaits ? (
          <>
            <path d="M-11 -108a12 12 0 0 1 24 0v3c-4-5-20-5-24 0Z" fill={hair} />
            <path d="M-10 -101c-3 5-3 11-1 16l5-2c-2-5-2-9 0-13Z" fill={hair} />
            <path d="M12 -101c3 5 3 11 1 16l-5-2c2-5 2-9 0-13Z" fill={hair} />
          </>
        ) : (
          <path d="M-11 -106a12 12 0 0 1 24 0c-5-4-19-4-24 0Z" fill={hair} />
        )}
        <circle cx="7" cy="-102" r="1.4" fill="#1B1F23" />
      </g>

      {/* Near side limbs sit in front. */}
      <g data-limb="arm-near" className="joint">
        <rect x="-2.6" y="-86" width="6.8" height="31" rx="3.4" fill={skin} />
        <rect x="-2.6" y="-86" width="6.8" height="15" rx="3.4" fill={shirt} />
      </g>

      <g data-limb="leg-near" className="joint">
        <rect x="-4.5" y="-46" width="9" height="24" rx="4" fill={bottoms} />
        <g data-limb="shin-near" className="joint">
          <rect x="-4" y="-23" width="8" height="23" rx="3.5" fill={skin} />
          <path d="M-5 0h11a2 2 0 0 1 2 2v2H-5Z" fill="#1d4650" />
        </g>
      </g>
    </g>
  );
}

export const kidStyles: KidStyle[] = [
  { shirt: "#F6F5F1", bottoms: "#12313A", pack: "#F2A900", skin: "#B9784F", hair: "#20150F" },
  { shirt: "#EAF3F4", bottoms: "#8C3B24", pack: "#8E1330", skin: "#8A5433", hair: "#160E0A", plaits: true },
  { shirt: "#FFFDF6", bottoms: "#12313A", pack: "#2D6B7B", skin: "#C98A5E", hair: "#1A110C" },
  { shirt: "#F1EFE6", bottoms: "#1B3A2E", pack: "#C9A227", skin: "#9C6239", hair: "#191009", plaits: true },
];
