"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { nav, links, org } from "@content/site";
import Logo from "@/components/ui/Logo";

const SENTINEL = "[data-header-sentinel]";
const HEADER_H = 72;

/**
 * The header is transparent while a page's opening scene is on screen and
 * solid once it has passed. Pages without a scene render no sentinel, so they
 * are solid throughout.
 */
function subscribe(onChange: () => void) {
  const sentinel = document.querySelector(SENTINEL);
  if (!sentinel) return () => {};

  const io = new IntersectionObserver(onChange, {
    rootMargin: `-${HEADER_H}px 0px 0px 0px`,
    threshold: 0,
  });
  io.observe(sentinel);
  return () => io.disconnect();
}

function getSnapshot() {
  const sentinel = document.querySelector(SENTINEL);
  if (!sentinel) return true;
  return sentinel.getBoundingClientRect().bottom <= HEADER_H;
}

export default function Header() {
  const solid = useSyncExternalStore(subscribe, getSnapshot, () => true);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-whitewash/95 text-ink shadow-[0_1px_0_rgba(27,31,35,0.12)] backdrop-blur"
          : "on-dark bg-transparent text-whitewash"
      }`}
    >
      {!solid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(9,22,31,0.72)_0%,rgba(9,22,31,0)_100%)]"
        />
      )}
      <div className="relative mx-auto flex h-18 max-w-[84rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-display font-bold tracking-tight sm:text-xl"
          aria-label={`${org.name}, home`}
        >
          <Logo className="h-7 w-7 shrink-0 text-marigold" />
          {/* The wordmark gives way to the navigation on narrow screens. */}
          <span className="hidden whitespace-nowrap sm:inline">{org.name}</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-2 sm:gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-1 py-2 font-display text-[0.8125rem] font-medium hover:underline hover:underline-offset-4 sm:px-3 sm:text-[0.9375rem]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={links.donate}
            className="rounded-full bg-marigold px-4 py-2.5 font-display text-[0.8125rem] font-semibold text-ink transition-colors hover:bg-marigold-deep sm:px-5 sm:text-[0.9375rem]"
          >
            Donate
          </a>
        </nav>
      </div>
    </header>
  );
}
