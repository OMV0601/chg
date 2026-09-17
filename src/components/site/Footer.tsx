import Link from "next/link";
import { org, links, nav } from "@content/site";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="on-dark bg-peacock-deep text-whitewash">
      <div className="mx-auto max-w-[84rem] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight"
            >
              <Logo className="h-8 w-8 text-marigold" />
              {org.name}
            </Link>
            <p className="measure mt-4 text-small text-whitewash/75">
              {org.mission}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-small font-semibold text-marigold">
              Pages
            </h2>
            <ul className="mt-4 space-y-2.5 text-small">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={links.donate} className="hover:underline">
                  Donate
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-small font-semibold text-marigold">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-small">
              <li>
                <a href={`mailto:${links.email}`} className="hover:underline">
                  {links.email}
                </a>
              </li>
              <li>
                <a href={links.instagram} className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href={links.linkedin} className="hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-whitewash/15 pt-8">
          <p className="measure-wide text-[0.875rem] leading-relaxed text-whitewash/70">
            {org.taxLine}
          </p>
          <p className="mt-4 font-display text-[0.875rem] tracking-wide text-whitewash/85">
            EIN {org.ein}
          </p>
          <p className="mt-6 text-[0.8125rem] text-whitewash/55">
            &copy; {new Date().getFullYear()} {org.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
