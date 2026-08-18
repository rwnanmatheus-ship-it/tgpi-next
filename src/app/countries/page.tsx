import Link from "next/link";
import CountriesExplorerV3 from "@/components/countries/CountriesExplorerV3";
import CountriesHeroV3 from "@/components/countries/CountriesHeroV3";
import CountriesLearningOS from "@/components/countries/CountriesLearningOS";
import CountriesWorldJourney from "@/components/countries/CountriesWorldJourney";
import {
  getAllGoals,
  getAllRegions,
  getCountryExplorerItems,
} from "@/lib/countries";

export const metadata = {
  title: "Countries | TGPI Country Intelligence",
  description:
    "Explore 195 countries by cost, safety, language, culture, adaptation difficulty and TGPI strategic readiness.",
};

export default function CountriesPage() {
  const countries = getCountryExplorerItems();
  const regions = getAllRegions();
  const goals = getAllGoals();

  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <CountriesHeroV3
          countryCount={countries.length}
          regionCount={regions.length}
        />

        <CountriesWorldJourney countries={countries} />

        <CountriesLearningOS />

        <section
          id="country-explorer"
          className="mt-10 scroll-mt-24 rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-4 shadow-[var(--tgpi-shadow-premium)] sm:p-6 lg:p-8"
        >
          <div className="grid gap-5 border-b border-[var(--tgpi-border)] pb-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
                TGPI Country Explorer
              </p>
              <h2 className="mt-3 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.92] text-[var(--tgpi-navy)]">
                Find the right country for the life you want to build.
              </h2>
            </div>
            <p className="text-sm leading-7 text-[var(--tgpi-muted)]">
              Start with an objective, refine the signals that matter and compare up to
              three profiles. Cost levels are compared as categories because nominal
              values in different currencies cannot be ranked directly.
            </p>
          </div>

          <CountriesExplorerV3 countries={countries} goals={goals} regions={regions} />
        </section>

        <section aria-labelledby="country-research-standard" className="mt-8 rounded-[28px] border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold-soft)] p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
                Responsible country research
              </p>
              <h2 id="country-research-standard" className="mt-2 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]">
                Use every profile as a research map, not as legal advice.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#4A3B1B]">
                Costs, safety, entry rules, salaries and local conditions change by city,
                personal profile and time. TGPI should show sources and review dates before
                a detail is used for a legal, financial or mobility decision.
              </p>
            </div>
            <div className="grid gap-3 sm:flex">
              <Link href="/authority" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#8A641F]/30 bg-white/65 px-5 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)]">
                View methodology
              </Link>
              <Link href="/onboarding" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)]">
                Find your country fit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
