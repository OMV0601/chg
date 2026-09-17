import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-20 sm:py-28 ${className}`} {...rest}>
      <div className="mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}

export function Heading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={`text-h2 font-semibold tracking-tight ${className}`}>
      {children}
    </Tag>
  );
}
