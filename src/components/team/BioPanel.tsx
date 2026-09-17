"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Member } from "@content/team";
import { useDialog } from "@/lib/useDialog";
import { isPlaceholder } from "@/lib/placeholder";

export default function BioPanel({
  member,
  onClose,
}: {
  member: Member;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, onClose);

  return (
    <div
      className="on-dark fixed inset-0 z-90 flex items-center justify-center bg-velvet/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
    >
      <div
        ref={panelRef}
        className="max-h-full w-full max-w-lg overflow-y-auto border border-brass/45 bg-[#1B0D12] p-6 text-whitewash sm:p-8"
      >
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-center gap-4">
            {member.photo && (
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-brass/50">
                <Image
                  src={member.photo}
                  alt={member.alt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="font-display text-h3 font-semibold">{member.name}</h2>
              {!isPlaceholder(member.role) && (
                <p className="mt-0.5 font-display text-small text-brass">
                  {member.role}
                </p>
              )}
              {!isPlaceholder(member.chapter) && (
                <p className="text-small text-whitewash/65">{member.chapter}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-brass/50 px-4 py-2 font-display text-small hover:bg-brass hover:text-velvet"
          >
            Close
          </button>
        </div>

        {member.quote && (
          <blockquote className="mt-7 border-l-2 border-brass pl-5 text-lead italic">
            {member.quote}
          </blockquote>
        )}
        {member.favouriteQuote && (
          <div className="mt-6">
            <h3 className="font-display text-[0.8125rem] text-whitewash/60">
              Favourite quote
            </h3>
            <p className="measure mt-1.5 text-whitewash/85">
              {member.favouriteQuote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
