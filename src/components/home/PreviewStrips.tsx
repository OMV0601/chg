import Link from "next/link";
import { fundraisers } from "@content/fundraisers";
import { members, teamNote } from "@content/team";
import Photo from "@/components/ui/Photo";

const featured = fundraisers.find((f) => f.featured) ?? fundraisers[0];

export default function PreviewStrips() {
  return (
    <section className="grid md:grid-cols-2">
      <Link
        href="/fundraisers"
        className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden bg-laterite p-8 text-whitewash sm:p-12"
      >
        <div className="absolute inset-0 opacity-45 transition-opacity duration-500 group-hover:opacity-60">
          <Photo
            src={featured.cover}
            alt={featured.coverAlt}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-laterite via-laterite/70 to-transparent" />
        <div className="relative">
          <h2 className="font-display text-h2 font-semibold">Our fundraisers</h2>
          <p className="measure mt-3 text-whitewash/85">
            Cookies, brownies, paintbrushes and a lot of doorbells. See how the
            money actually gets raised.
          </p>
          <span className="mt-6 inline-block font-display font-semibold text-marigold underline underline-offset-4">
            See the fundraisers
          </span>
        </div>
      </Link>

      <Link
        href="/team"
        className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden bg-crimson-deep p-8 text-whitewash sm:p-12"
      >
        <div className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-55">
          <Photo
            src={members[0].photo ?? ""}
            alt={members[0].alt}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-crimson-deep via-crimson-deep/75 to-transparent" />
        <div className="relative">
          <h2 className="font-display text-h2 font-semibold">Meet the team</h2>
          <p className="measure mt-3 text-whitewash/85">
            Students in Washington and California who run all of this around
            school. {teamNote}
          </p>
          <span className="mt-6 inline-block font-display font-semibold text-brass underline underline-offset-4">
            Meet the team
          </span>
        </div>
      </Link>
    </section>
  );
}
