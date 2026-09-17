import { pillars } from "@content/site";
import { Section, Heading } from "@/components/ui/Section";

export default function WhatWeDo() {
  return (
    <Section className="bg-peacock text-whitewash">
      <Heading className="measure">What we do about it</Heading>

      <dl className="mt-14 divide-y divide-whitewash/18 border-t border-whitewash/18">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="grid gap-3 py-9 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-14"
          >
            <dt className="font-display text-h3 font-semibold text-marigold">
              {pillar.title}
            </dt>
            <dd className="measure-wide text-whitewash/88">{pillar.body}</dd>
          </div>
        ))}
      </dl>

      <p className="measure-wide mt-12 border-l-2 border-marigold pl-6 font-display text-lead text-whitewash">
        Girls are the ones most often left out of the computer room. We count how
        many are in ours.
      </p>
    </Section>
  );
}
