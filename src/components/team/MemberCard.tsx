"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import type { Member } from "@content/team";
import { isPlaceholder } from "@/lib/placeholder";
import { gsap } from "@/lib/gsap";
import { scheduleFlash } from "@/lib/flash";

/**
 * Arrives up the carpet from the far end, lands on its spot, and takes a single
 * soft flash. Anyone who has asked for less motion gets the landed state only.
 */
export default function MemberCard({
  member,
  index,
  reduced,
  onOpen,
}: {
  member: Member;
  index: number;
  reduced: boolean;
  onOpen: () => void;
}) {
  const rootRef = useRef<HTMLLIElement>(null);
  const flashRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    let timer = 0;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { yPercent: -34, scale: 0.52, opacity: 0, filter: "blur(7px)" },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
          onComplete: () => {
            timer = scheduleFlash(() => {
              if (!flashRef.current) return;
              gsap.fromTo(
                flashRef.current,
                { opacity: 0 },
                {
                  opacity: 0.34,
                  duration: 0.1,
                  ease: "power1.out",
                  yoyo: true,
                  repeat: 1,
                },
              );
            });
          },
        },
      );
    }, root);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <li
      ref={rootRef}
      className="relative mx-auto w-full max-w-[19rem] will-change-transform md:max-w-[21rem]"
      style={
        reduced
          ? undefined
          : { transform: "translateY(-34%) scale(0.52)", opacity: 0 }
      }
    >
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-left"
      >
        <div className="relative overflow-hidden border border-brass/45 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]">
          <div className="relative aspect-4/5">
            {member.photo && (
              <Image
                src={member.photo}
                alt={member.alt}
                fill
                sizes="(max-width: 768px) 76vw, 21rem"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                priority={index < 2}
              />
            )}
            <span
              ref={flashRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-white"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Premiere nameplate. */}
          <div className="border-t border-brass/45 bg-[#1B0D12] px-4 py-3.5 text-center">
            <p className="font-display text-[1.0625rem] font-semibold tracking-tight text-whitewash group-hover:underline group-hover:underline-offset-4">
              {member.name}
            </p>
            {!isPlaceholder(member.role) && (
              <p className="mt-1 font-display text-[0.8125rem] text-brass">
                {member.role}
              </p>
            )}
            {!isPlaceholder(member.chapter) && (
              <p className="text-[0.8125rem] text-whitewash/60">
                {member.chapter}
              </p>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}
