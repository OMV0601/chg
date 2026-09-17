"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { photosAvailable } from "@content/site";
import type { GalleryImage } from "@content/fundraisers";
import { useDialog } from "@/lib/useDialog";

/** Full screen viewer. Escape closes, the arrow keys move between images. */
export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, onClose);

  const go = useCallback(
    (delta: number) =>
      onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  const image = images[index];

  return (
    <div
      className="on-dark fixed inset-0 z-[100] bg-ink/96 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}`}
    >
      <div ref={panelRef} className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 text-whitewash">
          <p className="font-display text-small tabular-nums">
            {index + 1} of {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-whitewash/40 px-5 py-2 font-display text-small hover:bg-whitewash hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="relative my-4 min-h-0 grow">
          {photosAvailable ? (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center border border-whitewash/25 p-8 text-center"
              role="img"
              aria-label={image.alt}
            >
              <span className="measure text-whitewash/75">{image.alt}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full border border-whitewash/40 px-5 py-2 font-display text-small text-whitewash hover:bg-whitewash hover:text-ink"
          >
            Previous
          </button>
          <p className="measure hidden text-center text-small text-whitewash/80 sm:block">
            {image.caption}
          </p>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full border border-whitewash/40 px-5 py-2 font-display text-small text-whitewash hover:bg-whitewash hover:text-ink"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
