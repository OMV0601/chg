import Image from "next/image";
import { photosAvailable } from "@content/site";

/**
 * Renders a photograph once the file exists, and a labelled placeholder until
 * then, so the site builds and lays out correctly either way.
 */
export default function Photo({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (!photosAvailable) {
    return (
      <div
        className={`flex items-end bg-whitewash-warm p-4 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="measure font-display text-[0.8125rem] leading-snug text-ink-soft">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
