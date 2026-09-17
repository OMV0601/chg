"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@content/site";
import { Section, Heading } from "@/components/ui/Section";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** "$10,000" becomes prefix "$", number 10000, suffix "". */
function parse(display: string) {
  const m = /^([^\d]*)([\d,]+)(.*)$/.exec(display);
  if (!m) return { prefix: "", suffix: "" };
  return { prefix: m[1], suffix: m[3] };
}

export default function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section className="bg-whitewash">
      <Heading className="measure">What that has added up to</Heading>

      <div
        ref={ref}
        className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.id} className="border-t-2 border-peacock pt-5">
            <Counter
              value={stat.value}
              display={stat.display}
              run={run && reduced === false}
              instant={reduced !== false}
            />
            <h3 className="mt-2 font-display text-h3 font-semibold text-ink">
              {stat.label}
            </h3>
            <p className="mt-1.5 text-small text-ink-soft">{stat.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Counter({
  value,
  display,
  run,
  instant,
}: {
  value: number;
  display: string;
  run: boolean;
  instant: boolean;
}) {
  const { prefix, suffix } = parse(display);
  const [n, setN] = useState(instant ? value : 0);

  useEffect(() => {
    if (instant) {
      setN(value);
      return;
    }
    if (!run) return;

    let frame = 0;
    const start = performance.now();
    const DURATION = 1400;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // Ease out, so it settles rather than stops dead.
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, instant, value]);

  return (
    <p className="font-display text-[clamp(2.75rem,5vw,3.75rem)] font-bold leading-none tracking-tight text-peacock tabular-nums">
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </p>
  );
}
