"use client";

import { useEffect, type RefObject } from "react";

/**
 * Only the dialog on top of this stack answers Escape, so closing a lightbox
 * opened from inside a panel does not close the panel underneath it too.
 */
const stack: symbol[] = [];

/**
 * Shared modal behaviour: focus moves in and comes back, Tab stays inside,
 * Escape closes, and the page behind does not scroll.
 */
export function useDialog(
  panelRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const id = Symbol("dialog");
    stack.push(id);

    const restore = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])",
        ) ?? [],
      );

    focusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return;

      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      const at = stack.indexOf(id);
      if (at > -1) stack.splice(at, 1);
      document.body.style.overflow = previousOverflow;
      restore?.focus();
    };
  }, [panelRef, onClose]);
}
