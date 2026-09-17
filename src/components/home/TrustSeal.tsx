import { org } from "@content/site";

/** Calm and official. This is a record, not a sales badge. */
export default function TrustSeal() {
  return (
    <section className="bg-whitewash-warm pb-20 sm:pb-28">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl border-y-2 border-peacock/25 px-4 py-12 text-center sm:px-10">
          <svg
            viewBox="0 0 64 64"
            className="mx-auto h-14 w-14 text-peacock"
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <path
              d="M22 32.5 29 39.5 43 25.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2 className="mt-6 font-display text-h3 font-semibold text-peacock">
            A registered {org.taxStatus} nonprofit
          </h2>

          <p className="measure-wide mx-auto mt-4 text-ink-soft">
            {org.taxLine}
          </p>

          <dl className="mt-8 flex flex-wrap items-start justify-center gap-x-14 gap-y-6 border-t border-peacock/20 pt-8 text-left">
            <div>
              <dt className="font-display text-[0.8125rem] text-ink-soft">
                Federal identification number
              </dt>
              <dd className="mt-1 font-display text-h3 font-semibold tracking-wide text-ink tabular-nums">
                {org.ein}
              </dd>
            </div>
            <div>
              <dt className="font-display text-[0.8125rem] text-ink-soft">
                Incorporated as
              </dt>
              <dd className="mt-1 font-display text-h3 font-semibold text-ink">
                {org.legalForm}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
