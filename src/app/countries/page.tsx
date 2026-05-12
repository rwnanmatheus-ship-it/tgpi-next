// src/app/countries/page.tsx

import Link from "next/link";
import { CountriesExplorer } from "@/components/countries/CountriesExplorer";
import {
  formatCurrencyAmount,
  getAllCountries,
  getAllRegions,
  getHighestSafetyCountries,
  getLowestBudgetCountries,
  getTopCountriesByScore,
  type Country,
} from "@/lib/countries";

export const metadata = {
  title: "Countries | TGPI Country Intelligence",
  description:
    "Explore countries by cost, language, culture, safety, readiness and TGPI strategic intelligence.",
};

export default function CountriesPage() {
  const countries = getAllCountries();
  const regions = getAllRegions();

  const topScoreCountries = getTopCountriesByScore(3);
  const lowestBudgetCountries = getLowestBudgetCountries(3);
  const safestCountries = getHighestSafetyCountries(3);

  const averageScore = Math.round(
    countries.reduce((sum, country) => sum + country.tgpiScore, 0) /
      countries.length,
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <section className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 bg-gradient-to-br from-[#111118] via-[#080B14] to-[#050505] shadow-2xl">
          <div className="relative p-6 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.24),transparent_38%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                  TGPI Country Intelligence
                </p>

                <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                  Explore countries through practical global intelligence.
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                  Compare countries by language, culture, cost profile,
                  adaptation difficulty, safety and TGPI strategic readiness.
                  This page is the foundation for the future 195-country
                  explorer, ranking system and SaaS decision layer.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#country-explorer"
                    className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-center text-sm font-black text-black transition hover:bg-[#F5D76E]"
                  >
                    Explore countries
                  </a>

                  <Link
                    href="/ranking"
                    className="rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37]/60"
                  >
                    View rankings
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <HeroMetric label="Countries" value={String(countries.length)} />
                <HeroMetric label="Regions" value={String(regions.length)} />
                <HeroMetric label="Average score" value={`${averageScore}/100`} />
                <HeroMetric label="Model" value="TGPI" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <RankingCard title="Highest TGPI score" countries={topScoreCountries} />
          <RankingCard
            title="Lowest monthly budget"
            countries={lowestBudgetCountries}
            mode="budget"
          />
          <RankingCard title="Highest safety" countries={safestCountries} mode="safety" />
        </section>

        <section id="country-explorer" className="mt-12 scroll-mt-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Country Explorer
              </p>
              <h2 className="mt-2 text-3xl font-black md:text-5xl">
                Country profiles
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Current data layer uses the active TGPI country file. Next phase:
              expand this same structure to 195 countries with verified images,
              richer cost intelligence and comparison pages.
            </p>
          </div>

          <CountriesExplorer countries={countries} />
        </section>
      </section>
    </main>
  );
}

type HeroMetricProps = {
  label: string;
  value: string;
};

function HeroMetric({ label, value }: HeroMetricProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-[#D4AF37]">{value}</p>
    </div>
  );
}

type RankingCardProps = {
  title: string;
  countries: Country[];
  mode?: "score" | "budget" | "safety";
};

function RankingCard({ title, countries, mode = "score" }: RankingCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-5">
      <h2 className="text-lg font-black text-[#D4AF37]">{title}</h2>

      <div className="mt-5 space-y-3">
        {countries.map((country, index) => {
          const value =
            mode === "budget"
              ? `${formatCurrencyAmount(
                  country,
                  country.intelligence.averageMonthlyBudget,
                )} ${country.currencyCode}`
              : mode === "safety"
                ? `${country.intelligence.safetyScore}/100`
                : `${country.tgpiScore}/100`;

          return (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-[#D4AF37]/60"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-xs font-bold text-slate-500">
                  #{index + 1}
                </span>
                <span className="text-2xl">{country.emoji}</span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-white">{country.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {country.region}
                  </p>
                </div>
              </div>

              <p className="shrink-0 text-sm font-black text-[#D4AF37]">
                {value}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}