"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { clamp, range, pulse, smoothstep } from "@/lib/math";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { org, links, labPhoto } from "@content/site";
import Button from "@/components/ui/Button";
import Kid, { kidStyles } from "./Kid";
import {
  HillsLayer,
  FieldsLayer,
  VillageLayer,
  SchoolLayer,
  PathLayer,
} from "./layers";
import LabInterior from "./LabInterior";
import WalkStatic from "./WalkStatic";
import { beats } from "./beats";

/** Scene progress at which the children reach the door. */
const WALK_END = 0.63;
/** Full leg cycles across the walk. Two steps per cycle. */
const STEPS = 22;

/** How far each layer travels, in viewBox units, across the whole walk. */
const DRIFT = {
  hills: 320,
  fields: 920,
  village: 1650,
  school: 1650,
  path: 2600,
} as const;

const KIDS = [
  { x: 520, scale: 1.34, style: kidStyles[0] },
  { x: 665, scale: 1.46, style: kidStyles[1] },
  { x: 820, scale: 1.52, style: kidStyles[2] },
  { x: 962, scale: 1.4, style: kidStyles[3] },
];

export default function WalkScene() {
  const reduced = useReducedMotion();
  if (reduced) return <WalkStatic />;
  return <WalkAnimated />;
}

function WalkAnimated() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const q = <T extends Element>(sel: string) =>
        stage.querySelector<T>(sel);
      const qa = <T extends Element>(sel: string) =>
        Array.from(stage.querySelectorAll<T>(sel));

      const layer = (name: string) => q<SVGGElement>(`[data-layer="${name}"]`);
      const layers = {
        hills: layer("hills"),
        fields: layer("fields"),
        village: layer("village"),
        school: layer("school"),
        path: layer("path"),
      };

      const world = q<HTMLDivElement>("[data-world]");
      const morning = q<HTMLDivElement>("[data-sky-morning]");
      const lab = q<HTMLDivElement>("[data-lab]");
      const photo = q<HTMLDivElement>("[data-lab-photo]");
      const hero = q<HTMLDivElement>("[data-hero]");
      const cue = q<HTMLDivElement>("[data-cue]");
      const beatEls = qa<HTMLElement>("[data-beat]");
      const screens = qa<SVGRectElement>("[data-screen-face]");

      // Cache each child's limbs once so the frame loop only writes styles.
      const kids = qa<SVGGElement>("[data-kid]").map((el) => ({
        legFar: el.querySelector<SVGGElement>('[data-limb="leg-far"]'),
        legNear: el.querySelector<SVGGElement>('[data-limb="leg-near"]'),
        shinFar: el.querySelector<SVGGElement>('[data-limb="shin-far"]'),
        shinNear: el.querySelector<SVGGElement>('[data-limb="shin-near"]'),
        armFar: el.querySelector<SVGGElement>('[data-limb="arm-far"]'),
        armNear: el.querySelector<SVGGElement>('[data-limb="arm-near"]'),
        head: el.querySelector<SVGGElement>('[data-limb="head"]'),
      }));

      const rot = (el: Element | null, deg: number) => {
        if (el) (el as SVGElement).style.transform = `rotate(${deg}deg)`;
      };
      const shift = (el: Element | null, x: number, y = 0) => {
        if (el) (el as SVGElement).style.transform = `translate(${x}px, ${y}px)`;
      };
      const fade = (el: Element | null, o: number) => {
        if (el) (el as HTMLElement).style.opacity = String(o);
      };

      const render = (p: number) => {
        const walk = range(p, 0, WALK_END);

        // Layers slide left, each at its own rate.
        shift(layers.hills, -walk * DRIFT.hills);
        shift(layers.fields, -walk * DRIFT.fields);
        shift(layers.village, -walk * DRIFT.village);
        shift(layers.school, -walk * DRIFT.school);
        shift(layers.path, -walk * DRIFT.path);

        // Dawn gives way to morning.
        fade(morning, smoothstep(range(p, 0.04, 0.52)));

        // The gait eases off over the last stretch so they arrive, not halt.
        const gait = walk - 0.05 * smoothstep(range(walk, 0.9, 1));
        const phase = gait * STEPS * Math.PI * 2;

        kids.forEach((k, i) => {
          const a = phase + i * 1.7;
          const swing = Math.sin(a);
          const swingOff = Math.sin(a + Math.PI);

          rot(k.legFar, swing * 27);
          rot(k.legNear, swingOff * 27);
          // Knees only bend backwards, and most on the recovery stroke.
          rot(k.shinFar, Math.max(0, -Math.cos(a)) * 34);
          rot(k.shinNear, Math.max(0, -Math.cos(a + Math.PI)) * 34);
          rot(k.armFar, swingOff * 21);
          rot(k.armNear, swing * 21);
          // Head rises twice per cycle, at each push off.
          shift(k.head, 0, Math.abs(Math.cos(a)) * -2.4);
        });

        // The camera pushes through the doorway.
        const push = smoothstep(range(p, WALK_END, 0.78));
        if (world) {
          world.style.transform = `scale(${1 + push * 5.6})`;
          world.style.opacity = String(1 - range(p, 0.72, 0.80));
        }

        // Inside: the room settles and the machines come on one by one.
        const inside = range(p, 0.74, 0.83);
        if (lab) {
          lab.style.opacity = String(inside);
          lab.style.transform = `scale(${1.26 - smoothstep(inside) * 0.26})`;
        }
        screens.forEach((s, i) => {
          const at = 0.825 + i * 0.008;
          s.style.opacity = String(range(p, at, at + 0.016) * 0.92);
        });

        // Then a real photograph of a real lab. It is a low resolution crop, so
        // it sits behind the glow rather than replacing it.
        fade(photo, range(p, 0.88, 0.95) * 0.5);

        // Beats, then the hero.
        beatEls.forEach((el, i) => {
          const b = beats[i];
          const o = pulse(p, b.from, b.to);
          el.style.opacity = String(o);
          el.style.transform = `translateY(${(1 - o) * 14}px)`;
        });

        const heroIn = smoothstep(range(p, 0.91, 0.995));
        if (hero) {
          hero.style.opacity = String(heroIn);
          hero.style.transform = `translateY(${(1 - heroIn) * 22}px)`;
          hero.style.pointerEvents = heroIn > 0.9 ? "auto" : "none";
        }

        fade(cue, 1 - range(p, 0.01, 0.05));
      };

      const state = { p: 0 };
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        })
        .to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => render(clamp(state.p)),
        });

      render(0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-header-sentinel
      aria-label="Introduction"
      className="relative h-[300vh] lg:h-[500vh]"
    >
      <div
        ref={stageRef}
        className="on-dark sticky top-0 h-[100svh] overflow-hidden bg-[#10212F]"
      >
        {/* Sky. Dawn underneath, morning fading in on top. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#152A44_0%,#3C3358_36%,#8A5A54_68%,#D98E52_100%)]" />
        <div
          data-sky-morning
          className="absolute inset-0 bg-[linear-gradient(180deg,#7FB6D6_0%,#AFD4E4_44%,#E4E8DF_78%,#F2E4C7_100%)]"
          style={{ opacity: 0 }}
        />

        {/* The world, which the camera later pushes into. */}
        <div
          data-world
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "50% 78%" }}
        >
          <HillsLayer />
          <FieldsLayer />
          <VillageLayer />
          <SchoolLayer />
          <PathLayer />
          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <g transform="translate(0 838)">
              {KIDS.map((k, i) => (
                <Kid key={i} x={k.x} scale={k.scale} style={k.style} />
              ))}
            </g>
          </svg>
        </div>

        {/* Inside the lab. */}
        <div
          data-lab
          className="absolute inset-0 will-change-transform"
          style={{ opacity: 0, transformOrigin: "50% 50%" }}
        >
          <LabInterior />
          {labPhoto && (
            <div data-lab-photo className="absolute inset-0" style={{ opacity: 0 }}>
              <Image
                src={labPhoto}
                alt="A computer lab built by Code Hope Global in a rural Indian school."
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-peacock-deep/55" />
            </div>
          )}
        </div>

        {/* Story beats. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {beats.map((beat) => (
            <p
              key={beat.text}
              data-beat
              className="absolute max-w-[26ch] px-16 py-14 text-center font-display text-h2 font-semibold text-whitewash"
              style={{
                opacity: 0,
                background:
                  "radial-gradient(ellipse 52% 42% at 50% 50%, rgba(9,22,31,0.80) 0%, rgba(9,22,31,0.55) 48%, rgba(9,22,31,0.18) 76%, rgba(9,22,31,0) 100%)",
              }}
            >
              {beat.text}
            </p>
          ))}
        </div>

        {/* The final frame doubles as the hero. */}
        <div
          data-hero
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <h1 className="font-display text-display font-bold text-whitewash drop-shadow-[0_2px_30px_rgba(8,20,30,0.95)]">
            {org.name}
          </h1>
          <p className="mt-4 font-display text-h3 font-semibold text-marigold drop-shadow-[0_2px_16px_rgba(8,20,30,0.95)]">
            {org.tagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={links.donate}>Donate</Button>
            <Button href="/fundraisers" variant="outline" className="text-whitewash">
              Our fundraisers
            </Button>
            <Button href="/team" variant="outline" className="text-whitewash">
              Meet the team
            </Button>
          </div>
        </div>

        <div
          data-cue
          className="pointer-events-none absolute inset-x-0 bottom-8 text-center font-display text-small text-whitewash drop-shadow-[0_1px_10px_rgba(8,20,30,0.95)]"
        >
          Scroll to walk with us
        </div>
      </div>
    </section>
  );
}

