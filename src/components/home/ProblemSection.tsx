import { problem } from "@content/site";
import { Section } from "@/components/ui/Section";
import Photo from "@/components/ui/Photo";

export default function ProblemSection() {
  return (
    <Section className="bg-whitewash">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="font-display text-[clamp(5rem,14vw,10rem)] font-bold leading-[0.8] tracking-tighter text-peacock">
            {problem.statValue}
            {problem.statSuffix}
          </p>
          <p className="measure mt-6 text-lead text-ink">
            {problem.statLabel}.
          </p>
          <p className="mt-4 text-small text-ink-soft">
            Figure reported by {problem.source}.
          </p>
        </div>

        <figure className="relative aspect-4/3 overflow-hidden rounded-sm">
          <Photo
            src="/images/impact/lab-handover-adloor.jpg"
            alt="A row of desktop computers along a classroom wall, with staff and officials standing in front of a Code Hope Global banner at a lab handover."
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </figure>
      </div>
    </Section>
  );
}
