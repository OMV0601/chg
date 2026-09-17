import Image from "next/image";
import { org, links, labPhoto } from "@content/site";
import { beats } from "./beats";
import LabInterior from "./LabInterior";
import Button from "@/components/ui/Button";

/**
 * Shown to anyone who has asked for less motion. No pin, no scrub, no walk.
 * The destination is drawn as a still, and the three beats become plain text.
 */
export default function WalkStatic() {
  return (
    <section
      data-header-sentinel
      className="on-dark relative isolate overflow-hidden bg-peacock-deep"
      aria-label="Introduction"
    >
      <div className="absolute inset-0">
        <LabInterior />
        {labPhoto && (
          <Image
            src={labPhoto}
            alt="A computer lab built by Code Hope Global in a rural Indian school."
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        )}
        <div className="absolute inset-0 bg-peacock-deep/62" />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-4 pt-32 pb-20 sm:px-6 lg:px-10">
        <ol className="measure space-y-4 text-lead text-whitewash/85">
          {beats.map((beat) => (
            <li key={beat.text}>{beat.text}</li>
          ))}
        </ol>

        <h1 className="mt-12 font-display text-display font-bold text-whitewash">
          {org.name}
        </h1>
        <p className="mt-4 font-display text-h3 text-marigold">{org.tagline}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={links.donate}>Donate</Button>
          <Button href="/fundraisers" variant="outline" className="text-whitewash">
            Our fundraisers
          </Button>
          <Button href="/team" variant="outline" className="text-whitewash">
            Meet the team
          </Button>
        </div>
      </div>
    </section>
  );
}
