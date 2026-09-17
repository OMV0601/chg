export const clamp = (v: number, min = 0, max = 1) =>
  v < min ? min : v > max ? max : v;

/** 0 below `from`, 1 above `to`, linear between. */
export const range = (v: number, from: number, to: number) =>
  clamp((v - from) / (to - from));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Rises 0 to 1, holds, then falls back to 0. Used for the story beats. */
export function pulse(v: number, start: number, end: number, fade = 0.04) {
  return Math.min(range(v, start, start + fade), 1 - range(v, end - fade, end));
}

export const smoothstep = (t: number) => t * t * (3 - 2 * t);
