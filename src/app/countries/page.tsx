import Link from "next/link";
import CountriesHeroV3 from "@/components/countries/CountriesHeroV3";
import { CountriesExplorer } from "@/components/countries/CountriesExplorer";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";
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
    "Explore 195 countries by cost, safety, language, culture, adaptation difficulty and TGPI strategic readiness.",
};

export default function CountriesPage() {
  const countries = getAllCountries();
  const regions = getAllRegions();
  const topScoreCountries = getTopCountriesByScore(5);
  const lowestBudgetCountries = getLowestBudgetCountries(5);
  const safestCountries = getHighestSafetyCountries(5);
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
  const lowCostCount = countries.filter((country) => country.costLevel === "low").length;
  const highScoreCount = countries.filter((country) => country.tgpiScore >= 85).length;
  const easyAdaptationCount = countries.filter(
    (country) => country.difficulty === "easy",
  ).length;
  const regionDistribution = regions
    .map((region) => ({
      region,
      count: countries.filter((country) => country.region === region).length,
    }))
    .sort((a, b) => b.count - a.count);

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

        <section className="mt-8 grid gap-5 lg:grid-cols-3" aria-label="Country intelligence rankings">
          <RankingCard title="Highest TGPI score" countries={topScoreCountries} />
          <RankingCard title="Lowest monthly budget" countries={lowestBudgetCountries} mode="budget" />
          <RankingCard title="Highest safety" countries={safestCountries} mode="safety" />
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[28px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Decision framework</p>
            <h2 className="mt-3 font-[var(--tgpi-font-display)] text-[clamp(2.3rem,4vw,3.6rem)] font-semibold leading-[0.95] text-[var(--tgpi-navy)]">
              Choose countries by system, not emotion.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)]">
              The goal is not to find a perfect place. It is to understand fit, friction,
              cost, language access, risk and long-term potential.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <FrameworkItem title="Cost pressure" text="Monthly budget and cost level." />
              <FrameworkItem title="Adaptation" text="Language, difficulty and friction." />
              <FrameworkItem title="Safety" text="Risk awareness and stability signal." />
              <FrameworkItem title="Strategic fit" text="TGPI score and goal alignment." />
            </div>
          </article>

          <article className="overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)]">
            <TGPIEditorialVisual
              variant="compare"
              id="countries-framework"
              ariaLabel="Authorial TGPI comparison framework illustration"
              className="aspect-[16/9] w-full"
            />
            <div className="grid grid-cols-3 gap-3 p-5 sm:p-6">
              <SignalStat value={highScoreCount} label="TGPI score 85+" />
              <SignalStat value={lowCostCount} label="Low-cost profiles" />
              <SignalStat value={easyAdaptationCount} label="Easy adaptation" />
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[28px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)]">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Global coverage</p>
          <h2 className="mt-3 font-[var(--tgpi-font-display)] text-[clamp(2.3rem,4vw,3.6rem)] font-semibold text-[var(--tgpi-navy)]">Regions inside one intelligence system.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {regionDistribution.map((item) => (
              <RegionRow key={item.region} region={item.region} count={item.count} total={countries.length} />
            ))}
          </div>
        </section>

        <section
          id="country-explorer"
          className="mt-10 scroll-mt-24 rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-4 shadow-[var(--tgpi-shadow-premium)] sm:p-6 lg:p-8"
        >
          <div className="flex flex-col justify-between gap-5 border-b border-[var(--tgpi-border)] pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Country Explorer</p>
              <h2 className="mt-3 font-[var(--tgpi-font-display)] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-[var(--tgpi-navy)]">
                Search, filter and compare countries.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--tgpi-muted)]">
              Use the explorer as the first layer of international planning. Validate visa,
              tax, legal and financial information with official sources before acting.
            </p>
          </div>
          <CountriesExplorer countries={countries} />
        </section>

        <section className="mt-8 rounded-[28px] border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold-soft)] p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <p className="text-sm leading-7 text-[#4A3B1B]">
              TGPI country intelligence is educational and comparative. Costs, safety,
              rules, salaries and local conditions change by city, source and time.
            </p>
            <Link href="/onboarding" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)]">
              Find your country fit
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function RankingCard({
  title,
  countries,
  mode = "score",
}: {
  title: string;
  countries: Country[];
  mode?: "score" | "budget" | "safety";
}) {
  return (
    <article className="rounded-[28px] border border-[var(--tgpi-border)] bg-white p-5 shadow-[var(--tgpi-shadow-soft)]">
      <h2 className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]">{title}</h2>
      <div className="mt-5 space-y-3">
        {countries.map((country, index) => {
          const value =
            mode === "budget"
              ? `${formatCurrencyAmount(country, country.intelligence.averageMonthlyBudget)} ${country.currencyCode}`
              : mode === "safety"
                ? `${country.intelligence.safetyScore}/100`
                : `${country.tgpiScore}/100`;

          return (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-xs font-bold text-[var(--tgpi-muted)]">#{index + 1}</span>
                <span className="text-2xl" aria-hidden="true">{country.emoji}</span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-[var(--tgpi-navy)]">{country.name}</p>
                  <p className="truncate text-xs text-[var(--tgpi-muted)]">{country.region}</p>
                </div>
              </div>
              <p className="shrink-0 text-sm font-extrabold text-[var(--tgpi-gold-strong)]">{value}</p>
            </Link>
          );
        })}
      </div>
    </article>
  );
}

function FrameworkItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-4">
      <p className="font-extrabold text-[var(--tgpi-navy)]">{title}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--tgpi-muted)]">{text}</p>
    </div>
  );
}

function SignalStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-4">
      <p className="font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-gold-strong)]">{value}</p>
      <p className="mt-1 text-xs font-bold text-[var(--tgpi-navy)]">{label}</p>
    </div>
  );
}

function RegionRow({
  region,
  count,
  total,
}: {
  region: string;
  count: number;
  total: number;
}) {
  const width = `${Math.round((count / total) * 100)}%`;
  return (
    <div className="rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-bold text-[var(--tgpi-navy)]">{region}</p>
        <p className="text-sm font-extrabold text-[var(--tgpi-gold-strong)]">{count} countries</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E7E0D3]">
        <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--tgpi-gold),var(--tgpi-navy))]" style={{ width }} />
      </div>
    </div>
  );
}
