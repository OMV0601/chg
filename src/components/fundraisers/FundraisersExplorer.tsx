"use client";

import { useMemo, useState } from "react";
import {
  fundraiserTypes,
  type Fundraiser,
  type FundraiserType,
} from "@content/fundraisers";
import Photo from "@/components/ui/Photo";
import FundraiserDetail from "./FundraiserDetail";

type Filter = FundraiserType | "All";
const filters: Filter[] = ["All", ...fundraiserTypes];

/** Deliberately uneven, so the page reads as an editorial spread. */
const spans = [
  "md:col-span-7 md:aspect-4/3",
  "md:col-span-5 md:aspect-3/4",
  "md:col-span-5 md:aspect-square",
  "md:col-span-7 md:aspect-16/10",
];

export default function FundraisersExplorer({
  fundraisers,
}: {
  fundraisers: Fundraiser[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Fundraiser | null>(null);

  const shown = useMemo(
    () =>
      filter === "All"
        ? fundraisers
        : fundraisers.filter((f) => f.type === filter),
    [filter, fundraisers],
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`rounded-full px-5 py-2.5 font-display text-small font-semibold transition-colors ${
                active
                  ? "bg-peacock text-whitewash"
                  : "border border-ink/25 text-ink hover:border-peacock hover:text-peacock"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-small text-ink-soft" aria-live="polite">
        Showing {shown.length} of {fundraisers.length}.
      </p>

      <ul className="mt-8 grid gap-6 md:grid-cols-12">
        {shown.map((f, i) => (
          <li key={f.id} className={spans[i % spans.length]}>
            <button
              type="button"
              onClick={() => setOpen(f)}
              className="group flex h-full w-full flex-col text-left"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-whitewash-warm md:aspect-auto md:grow">
                <Photo
                  src={f.cover}
                  alt={f.coverAlt}
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="pt-4">
                <p className="font-display text-[0.8125rem] text-laterite">
                  {f.type}
                </p>
                <h3 className="mt-1 font-display text-h3 font-semibold text-peacock group-hover:underline group-hover:underline-offset-4">
                  {f.title}
                </h3>
                <p className="measure mt-1.5 text-small text-ink-soft">
                  {f.date}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <FundraiserDetail fundraiser={open} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
