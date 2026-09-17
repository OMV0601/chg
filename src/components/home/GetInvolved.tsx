import { getInvolved } from "@content/site";
import { Section, Heading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function GetInvolved() {
  return (
    <Section className="bg-whitewash">
      <Heading className="measure">Get involved</Heading>

      <div className="mt-12 grid gap-px bg-ink/12 md:grid-cols-3">
        {getInvolved.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-whitewash p-7 sm:p-9"
          >
            <h3 className="font-display text-h3 font-semibold text-peacock">
              {item.title}
            </h3>
            <p className="measure mt-3 grow text-ink-soft">{item.body}</p>
            <Button
              href={item.href}
              variant={item.id === "donate" ? "primary" : "outline"}
              className="mt-7 self-start"
            >
              {item.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
