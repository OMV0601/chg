"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { arrivalOrder, type Member } from "@content/team";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { isPlaceholder } from "@/lib/placeholder";
import CarpetBackdrop from "./CarpetBackdrop";
import MemberCard from "./MemberCard";
import BioPanel from "./BioPanel";

const UNKNOWN_CHAPTER = "Chapter to be confirmed";

interface Group {
  key: string;
  title: string;
  /** Arrival order across the whole carpet, not just within the group. */
  members: { member: Member; arrival: number }[];
}

function group(members: Member[]): Group[] {
  const leads = members.filter((m) => m.tier === "lead");
  const rest = members.filter((m) => m.tier !== "lead");

  const byChapter = new Map<string, Member[]>();
  for (const m of rest) {
    const key = isPlaceholder(m.chapter) ? UNKNOWN_CHAPTER : m.chapter;
    byChapter.set(key, [...(byChapter.get(key) ?? []), m]);
  }

  const ordered: { key: string; title: string; list: Member[] }[] = [
    ...(leads.length
      ? [{ key: "leads", title: "Founders and leads", list: leads }]
      : []),
    ...Array.from(byChapter, ([title, list]) => ({ key: title, title, list })),
  ];

  let arrival = 0;
  return ordered.map((g) => ({
    key: g.key,
    title: g.title,
    members: g.list.map((member) => ({ member, arrival: arrival++ })),
  }));
}

export default function TeamStage() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Member | null>(null);
  const groups = useMemo(() => group(arrivalOrder), []);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced !== false) return;

    const ctx = gsap.context(() => {
      const spots = gsap.utils.toArray<HTMLElement>("[data-spot]");
      if (spots.length < 2) return;
      const [a, b] = spots;

      // One orchestrated entrance: sweep in, cross, settle. Under 2.5 seconds.
      gsap
        .timeline()
        .set(spots, { opacity: 0 })
        .to(a, { opacity: 0.85, rotate: -30, duration: 0.55, ease: "power2.out" }, 0)
        .to(b, { opacity: 0.85, rotate: 30, duration: 0.55, ease: "power2.out" }, 0.08)
        .to(a, { rotate: 8, duration: 0.8, ease: "sine.inOut" }, 0.55)
        .to(b, { rotate: -8, duration: 0.8, ease: "sine.inOut" }, 0.55)
        .to(a, { rotate: -10, opacity: 0.6, duration: 0.7, ease: "power2.inOut" }, 1.3)
        .to(b, { rotate: 10, opacity: 0.6, duration: 0.7, ease: "power2.inOut" }, 1.3);
    }, stage);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={stageRef} className="on-dark relative bg-velvet">
      <div className="pointer-events-none sticky top-0 h-[100svh] overflow-hidden">
        <CarpetBackdrop />
        {reduced === false &&
          [0, 1].map((i) => (
            <div
              key={i}
              data-spot
              className="absolute -top-[10%] left-1/2 h-[135%] w-[62%] -translate-x-1/2 origin-top mix-blend-screen"
              style={{
                opacity: 0,
                clipPath: "polygon(47% 0, 53% 0, 100% 100%, 0 100%)",
                background:
                  "linear-gradient(180deg, rgba(255,246,214,0.55) 0%, rgba(255,246,214,0.10) 55%, rgba(255,246,214,0) 100%)",
              }}
            />
          ))}
      </div>

      <div className="relative -mt-[100svh] px-4 pt-[46svh] pb-28 sm:px-6">
        {groups.map((g) => (
          <section key={g.key} className="mb-20 last:mb-0">
            <h2 className="mb-10 text-center font-display text-h3 font-semibold text-brass">
              {g.title}
            </h2>
            <ul className="space-y-16 sm:space-y-24">
              {g.members.map(({ member, arrival }) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={arrival}
                  reduced={reduced !== false}
                  onOpen={() => setOpen(member)}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {open && <BioPanel member={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
