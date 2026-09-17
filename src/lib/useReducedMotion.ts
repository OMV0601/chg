"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/**
 * Null until the client has read the media query, so the first render matches
 * what the server sent. Components should treat null as "not decided yet".
 */
export function useReducedMotion(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
