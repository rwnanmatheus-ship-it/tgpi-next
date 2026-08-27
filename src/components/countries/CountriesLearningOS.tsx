import Link from "next/link";
import { COUNTRY_KNOWLEDGE_AREAS } from "@/data/country-page-system";

const standards = [
  "Separate national context from city-level conditions.",
  "Treat scores as comparison signals, never universal truth.",
  "Validate changing legal, financial and mobility facts officially.",
] as const;

export default function CountriesLearningOS() {
  return (
    <section
      aria-labelledby="country-learning-os-title"
      className="mt-8 overflow-hidden rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-soft)]"
    >
      <div className="grid lg:grid-cols-[1.18fr_.82fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
            TGPI Country Learning Architecture
          </p>
          <h2
            id="country-learning-os-title"
            className="mt-3 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.55rem,4.5vw,4rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-[var(--tgpi-navy)]"
          >
            Eight domains. One language for understanding the world.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--tgpi-muted)] sm:text-base">
            Every country dossier follows the same academic architecture, so users can
            read faster, compare responsibly and transfer what they learn into action.
          </p>

          <div className="mt-7 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {COUNTRY_KNOWLEDGE_AREAS.map(([title, description], index) => (
              <article
                key={title}
                className="rounded-[18px] border border-[var(--tgpi-border)] bg-white p-4 transition hover:border-[var(--tgpi-gold)] hover:shadow-[var(--tgpi-shadow-soft)]"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--tgpi-blue-soft)] text-[9px] font-extrabold text-[var(--tgpi-blue)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-[var(--tgpi-navy)]">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[var(--tgpi-muted)]">{description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="relative overflow-hidden border-t border-white/10 bg-[var(--tgpi-navy)] p-6 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,149,54,.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(46,103,104,.28),transparent_42%)]" />
          <div className="relative">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
              Responsible intelligence standard
            </p>
            <h3 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-tight text-white">
              Explain the trade-off. Preserve the uncertainty.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#C4D0DE]">
              TGPI should make a decision clearer without pretending that one country is
              universally best or that a changing rule is permanent.
            </p>

            <ul className="mt-6 grid gap-3">
              {standards.map((standard) => (
                <li key={standard} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-[#D7E0EB]">
                  <span aria-hidden="true" className="text-[var(--tgpi-gold-light)]">✓</span>
                  {standard}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link href="/authority" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/18 bg-white/[0.055] px-5 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)]">
                Read the methodology
              </Link>
              <Link href="/courses" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:bg-[#D4AA49]">
                Continue in Learning
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
