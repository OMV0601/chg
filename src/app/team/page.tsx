import type { Metadata } from "next";
import { teamNote } from "@content/team";
import TeamStage from "@/components/team/TeamStage";

export const metadata: Metadata = {
  title: "Meet the team",
  description:
    "The students across Washington and California who run Code Hope Global around school.",
};

export default function TeamPage() {
  return (
    <>
      <section className="on-dark bg-velvet px-4 pt-32 pb-12 text-center sm:px-6">
        <h1 className="font-display text-h1 font-semibold text-whitewash">
          Meet the team
        </h1>
        <p className="measure mx-auto mt-5 text-lead text-whitewash/80">
          Students who fundraise, cook, teach and organise around school. Select
          anyone to read more about them.
        </p>
        <p className="measure mx-auto mt-4 text-small text-whitewash/55">
          {teamNote}
        </p>
      </section>
      <TeamStage />
    </>
  );
}
