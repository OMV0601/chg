import type { Metadata } from "next";
import {
  fundraisers,
  foodSaleCycle,
  knownTotalRaised,
  amountsAreComplete,
} from "@content/fundraisers";
import { stats } from "@content/site";
import { Section, Heading } from "@/components/ui/Section";
import Photo from "@/components/ui/Photo";
import FundraisersExplorer from "@/components/fundraisers/FundraisersExplorer";
import { isPlaceholder } from "@/lib/placeholder";

export const metadata: Metadata = {
  title: "Our fundraisers",
  description:
    "How Code Hope Global raises the money for rural computer labs: door to door food sales, workshops and online campaigns.",
};

const seattle = stats.find((s) => s.id === "raised");
const featured = fundraisers.find((f) => f.featured) ?? fundraisers[0];

export default function FundraisersPage() {
  const total = amountsAreComplete
    ? `$${knownTotalRaised.toLocaleString("en-US")}`
    : (seattle?.display ?? "TODO");

  const summary = [
    {
      value: total,
      label: amountsAreComplete
        ? "Raised across these fundraisers"
        : "Raised by our Seattle chapter",
      note: amountsAreComplete
        ? undefined
        : "Per fundraiser totals are still being confirmed.",
    },
    { value: String(fundraisers.length), label: "Fundraisers recorded here" },
    { value: "113", label: "Laptops those funds helped donate" },
  ];

  return (
    <>
      <Section className="bg-whitewash pt-32">
        <Heading as="h1" className="measure text-h1">
          Our fundraisers
        </Heading>
        <p className="measure mt-5 text-lead text-ink-soft">
          Students cook, sell, teach and ask. This is the record of how the money
          for each lab was actually raised.
        </p>

        <dl className="mt-14 grid gap-10 border-t-2 border-peacock pt-8 sm:grid-cols-3">
          {summary.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2.5rem,4.5vw,3.5rem)] font-bold leading-none tracking-tight text-peacock tabular-nums">
                  {item.value}
                </span>
                <span className="mt-2 block font-display font-semibold text-ink">
                  {item.label}
                </span>
                {item.note && (
                  <span className="mt-1 block text-small text-ink-soft">
                    {item.note}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="bg-whitewash-warm">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <figure className="relative aspect-4/3 overflow-hidden">
            <Photo
              src={featured.cover}
              alt={featured.coverAlt}
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </figure>

          <div className="flex flex-col justify-center">
            <p className="font-display text-small text-laterite">
              {featured.type}
            </p>
            <Heading className="mt-2">{featured.title}</Heading>
            <p className="measure mt-4 text-ink-soft">{featured.summary}</p>
            <p className="measure mt-4 text-ink-soft">{featured.whatWeDid}</p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
              <div>
                <dt className="font-display text-[0.8125rem] text-ink-soft">
                  When
                </dt>
                <dd className="mt-1 font-display font-semibold">
                  {featured.date}
                </dd>
              </div>
              {!isPlaceholder(featured.location) && (
                <div>
                  <dt className="font-display text-[0.8125rem] text-ink-soft">
                    Where
                  </dt>
                  <dd className="mt-1 font-display font-semibold">
                    {featured.location}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Section>

      <Section className="bg-whitewash">
        <Heading className="measure">All fundraisers</Heading>
        <div className="mt-8">
          <FundraisersExplorer fundraisers={fundraisers} />
        </div>
      </Section>

      <Section className="bg-peacock text-whitewash">
        <Heading className="measure">How our food sales work</Heading>
        <p className="measure mt-4 text-whitewash/85">
          The same four weeks, every time.
        </p>

        <ol className="mt-12 grid gap-px bg-whitewash/20 md:grid-cols-4">
          {foodSaleCycle.map((step, i) => (
            <li key={step.title} className="bg-peacock p-6">
              <span
                aria-hidden="true"
                className="font-display text-[2.75rem] font-bold leading-none text-marigold"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-h3 font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-small text-whitewash/80">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
