import Link from "next/link";
import { homeFaq } from "@/data/home-system";

const decisionPrinciples = [
  ["01", "Use consistent criteria", "Compare destinations through the same lenses instead of isolated impressions."],
  ["02", "Make weights visible", "Understand which priorities shape the result and where the real trade-offs remain."],
  ["03", "Treat signals as directional", "Use models to frame better questions, never as absolute or permanent answers."],
  ["04", "Verify changing facts", "Confirm visas, taxes, costs and local rules with current official or qualified sources."],
] as const;

export default function HomeAuthorityLayer() {
  return (
    <section
      className="border-y border-[var(--tgpi-border)] bg-[#F1EADC] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="home-authority-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
              Academic responsibility
            </p>
            <h2
              id="home-authority-title"
              className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.6rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]"
            >
              Intelligence needs a method—and clear boundaries.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--tgpi-muted)]">
              TGPI helps people structure international decisions. It does not hide uncertainty, claim a universal best country or replace regulated professional advice.
            </p>
            <Link
              href="/authority"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              Review the decision methodology
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {decisionPrinciples.map(([number, title, description]) => (
              <article key={number} className="rounded-[24px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-sm)]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">
                  Principle {number}
                </p>
                <h3 className="mt-4 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--tgpi-border)] pt-12 sm:mt-16 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="max-w-xl">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
                Understand before you trust
              </p>
              <h2 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.98] text-[var(--tgpi-ink)] sm:text-5xl">
                The essential questions about TGPI.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[var(--tgpi-muted)] sm:text-base">
                Clear answers help visitors understand what the platform does, where it adds value and what still requires official verification.
              </p>
            </div>

            <div className="space-y-3">
              {homeFaq.map((item, index) => (
                <details
                  key={item.question}
                  className="group rounded-[22px] border border-[var(--tgpi-border)] bg-white px-5 py-1 shadow-[var(--tgpi-shadow-sm)] open:border-[var(--tgpi-gold)]"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-xl py-4 text-left text-sm font-extrabold text-[var(--tgpi-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="mr-3 text-[10px] font-extrabold tracking-[0.16em] text-[var(--tgpi-gold-strong)]">
                        0{index + 1}
                      </span>
                      {item.question}
                    </span>
                    <span className="text-xl text-[var(--tgpi-gold-strong)] transition group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-[var(--tgpi-border-soft)] pb-5 pt-4 text-sm leading-7 text-[var(--tgpi-muted)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
