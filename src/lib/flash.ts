"use client";

/**
 * Camera flashes are queued through here so two never land together.
 * WCAG 2.3.1 allows up to three per second; 500ms apart caps us at 2, with room for timer jitter.
 */
const MIN_GAP_MS = 500;
let nextSlot = 0;

export function scheduleFlash(run: () => void) {
  const now = performance.now();
  const at = Math.max(now, nextSlot);
  nextSlot = at + MIN_GAP_MS;
  return window.setTimeout(run, at - now);
}
