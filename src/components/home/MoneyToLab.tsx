import { moneyToLab } from "@content/site";
import { Section, Heading } from "@/components/ui/Section";

/** A genuine sequence, so the steps are numbered. */
export default function MoneyToLab() {
  return (
    <Section className="bg-whitewash-warm">
      <Heading className="measure">How your money becomes a lab</Heading>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/12 md:grid-cols-5">
        {moneyToLab.map((step, i) => (
          <li key={step.title} className="bg-whitewash-warm p-6">
            <span
              aria-hidden="true"
              className="font-display text-[2.75rem] font-bold leading-none text-marigold-deep"
            >
              {i + 1}
            </span>
            <h3 className="mt-3 font-display text-h3 font-semibold text-peacock">
              {step.title}
            </h3>
            <p className="mt-2 text-small text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
