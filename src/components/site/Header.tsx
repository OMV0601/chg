"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, links, org } from "@content/site";
import Logo from "@/components/ui/Logo";

/**
 * Transparent while the walk scene is on screen, solid afterwards. Pages with
 * no scene render no sentinel, so the header is solid from the first frame.
 */
export default function Header() {
  const [solid, setSolid] = useState(true);

  useEffect(() => {
    const sentinel = document.querySelector("[data-header-sentinel]");
    if (!sentinel) {
      setSolid(true);
      return;
    }
    setSolid(false);
    const io = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-whitewash/95 text-ink shadow-[0_1px_0_rgba(27,31,35,0.12)] backdrop-blur"
          : "on-dark bg-transparent text-whitewash"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[84rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[1.0625rem] font-bold tracking-tight sm:text-xl"
        >
          <Logo className="h-7 w-7 shrink-0 text-marigold" />
          <span className="whitespace-nowrap">{org.name}</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden rounded-full px-3 py-2 font-display text-[0.9375rem] font-medium hover:underline hover:underline-offset-4 sm:inline-block"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={links.donate}
            className="rounded-full bg-marigold px-5 py-2.5 font-display text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-marigold-deep"
          >
            Donate
          </a>
        </nav>
      </div>
    </header>
  );
}
