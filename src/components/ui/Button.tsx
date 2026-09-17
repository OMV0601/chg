import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "quiet";

const base =
  "inline-flex items-center justify-center font-display font-semibold tracking-tight " +
  "px-6 py-3 text-[1.0625rem] leading-none transition-colors duration-200 rounded-full";

const variants: Record<Variant, string> = {
  // Ink on Marigold clears AA comfortably; white would not.
  primary: "bg-marigold text-ink hover:bg-marigold-deep",
  outline:
    "border-2 border-current text-peacock hover:bg-peacock hover:text-whitewash",
  quiet: "text-peacock underline underline-offset-4 hover:text-laterite px-0",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const isExternal = href.startsWith("http") || href.startsWith("#TODO");

  if (isExternal) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
