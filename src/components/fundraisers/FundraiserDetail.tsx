"use client";

import { useRef, useState } from "react";
import type { Fundraiser } from "@content/fundraisers";
import { useDialog } from "@/lib/useDialog";
import Photo from "@/components/ui/Photo";
import Lightbox from "@/components/ui/Lightbox";

const money = (n: number | null) =>
  n === null ? "Not yet recorded" : `$${n.toLocaleString("en-US")}`;

export default function FundraiserDetail({
  fundraiser,
  onClose,
}: {
  fundraiser: Fundraiser;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useDialog(panelRef, onClose);

  const facts = [
    ["Type", fundraiser.type],
    ["When", fundraiser.date],
    ["Where", fundraiser.location],
    ["Raised", money(fundraiser.raisedUsd)],
  ] as const;

  return (
    <>
      <div
        className="fixed inset-0 z-90 overflow-y-auto bg-ink/70 p-0 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={fundraiser.title}
      >
        <div
          ref={panelRef}
          className="mx-auto max-w-4xl bg-whitewash p-6 sm:p-10"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="font-display text-h2 font-semibold text-peacock">
                {fundraiser.title}
              </h2>
              <p className="measure mt-3 text-ink-soft">{fundraiser.summary}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border-2 border-peacock px-5 py-2 font-display text-small font-semibold text-peacock hover:bg-peacock hover:text-whitewash"
            >
              Close
            </button>
          </div>

          <dl className="mt-8 grid gap-6 border-y border-ink/15 py-6 sm:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="font-display text-[0.8125rem] text-ink-soft">
                  {label}
                </dt>
                <dd className="mt-1 font-display font-semibold text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-h3 font-semibold text-ink">
                What we did
              </h3>
              <p className="measure mt-2 text-ink-soft">{fundraiser.whatWeDid}</p>
            </div>
            <div>
              <h3 className="font-display text-h3 font-semibold text-ink">
                What it paid for
              </h3>
              <p className="measure mt-2 text-ink-soft">
                {fundraiser.whatItPaidFor}
              </p>
            </div>
          </div>

          <h3 className="mt-10 font-display text-h3 font-semibold text-ink">
            Photos
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {fundraiser.gallery.map((image, i) => (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="relative block aspect-4/3 w-full overflow-hidden bg-whitewash-warm"
                >
                  <Photo
                    src={image.src}
                    alt={image.alt}
                    sizes="(max-width: 640px) 50vw, 30vw"
                  />
                  <span className="sr-only">Open image {i + 1} full size</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={fundraiser.gallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </>
  );
}
