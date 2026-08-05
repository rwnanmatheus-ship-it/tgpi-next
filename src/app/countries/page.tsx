import Link from "next/link";
import CountriesExplorerV3 from "@/components/countries/CountriesExplorerV3";
import CountriesHeroV3 from "@/components/countries/CountriesHeroV3";
import { getAllCountries, getAllRegions } from "@/lib/countries";

export const metadata = {
  title: "Countries | TGPI Country Intelligence",
  description:
    "Explore 195 countries by cost, safety, language, culture, adaptation difficulty and TGPI strategic readiness.",
};

export default function CountriesPage() {
  const countries = getAllCountries();
  const regions = getAllRegions();
  const averageScore = Math.round(
    countries.reduce((sum, country) => sum + country.tgpiScore, 0) / countries.length,
  );
  const averageSafety = Math.round(
    countries.reduce((sum, country) => sum + country.intelligence.safetyScore, 0) /
      countries.length,
  );
  const averageEnglish = Math.round(
    countries.reduce(
      (sum, country) => sum + country.intelligence.englishFriendliness,
      0,
    ) / countries.length,
  );

  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <CountriesHeroV3
          countryCount={countries.length}
          regionCount={regions.length}
          averageScore={averageScore}
          averageSafety={averageSafety}
          averageEnglish={averageEnglish}
        />

        <section
          id="country-explorer"
          className="mt-10 scroll-mt-24 rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-4 shadow-[var(--tgpi-shadow-premium)] sm:p-6 lg:p-8"
        >
          <div className="grid gap-5 border-b border-[var(--tgpi-border)] pb-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
                Countries Explorer V3
              </p>
              <h2 className="mt-3 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.92] text-[var(--tgpi-navy)]">
                Search, filter, shortlist and compare countries in one workflow.
              </h2>
            </div>
            <p className="text-sm leading-7 text-[var(--tgpi-muted)]">
              Start with an objective, refine the signals that matter and compare up to
              three countries. Validate visa, legal, tax and financial decisions with
              official sources before acting.
            </p>
          </div>

          <CountriesExplorerV3 countries={countries} />
        </section>

        <section className="mt-8 rounded-[28px] border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold-soft)] p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
                Guided shortlist
              </p>
              <p className="mt-2 text-sm leading-7 text-[#4A3B1B]">
                TGPI country intelligence is educational and comparative. Costs, safety,
                rules, salaries and local conditions change by city, source and time.
              </p>
            </div>
            <Link
              href="/onboarding"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)]"
            >
              Find your country fit
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
