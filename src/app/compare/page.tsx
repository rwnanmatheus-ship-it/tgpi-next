// src/app/compare/page.tsx

import Link from "next/link";
import {
  formatCurrencyAmount,
  getAllCountries,
  getCountry,
  getCountryCostLabel,
  getCountryDecisionLabel,
  getCountryGoalLabel,
  getCountryRiskLabel,
  type Country,
} from "@/lib/countries";

type ComparePageProps = {
  searchParams?: Promise<{
    country?: string | string[];
  }>;
};

export const metadata = {
  title: "Compare Countries | TGPI",
  description:
    "Compare countries by cost, safety, English access, adaptation difficulty, quality of life and TGPI strategic fit.",
};

const MAX_COUNTRIES_TO_COMPARE = 3;

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedSlugs = normalizeCountryParams(resolvedSearchParams?.country);
  const selectedCountries = selectedSlugs
    .map((slug) => getCountry(slug))
    .filter((country): country is Country => Boolean(country))
    .slice(0, MAX_COUNTRIES_TO_COMPARE);

  const fallbackCountries = getDefaultComparisonCountries();
  const countriesToCompare =
    selectedCountries.length > 0 ? selectedCountries : fallbackCountries;

  const verdict = getComparisonVerdict(countriesToCompare);
  const allCountries = getAllCountries();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Link
            href="/countries"
            className="inline-flex w-fit rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-[#D4AF37]/60 hover:text-white"
          >
            ← Back to countries
          </Link>

          <Link
            href="/countries#country-list"
            className="inline-flex w-fit rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-sm font-bold text-[#F5D76E] transition hover:border-[#F5D76E]/60"
          >
            Select countries
          </Link>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 bg-gradient-to-br from-[#111118] via-[#080B14] to-black">
          <div className="relative p-6 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.18),transparent_34%)]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                  TGPI Country Comparator
                </p>
                <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                  Compare countries before choosing your next move.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                  Use this page to compare cost, safety, language access,
                  adaptation friction and strategic fit. A country should be a
                  decision, not a guess.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-[#F5D76E]">
                  Current comparison
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {countriesToCompare.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/countries/${country.slug}`}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-[#D4AF37]/60"
                    >
                      {country.emoji} {country.name}
                    </Link>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {selectedCountries.length > 0
                    ? "Loaded from the countries selection tray."
                    : "Showing a default strategic comparison. Select countries from the explorer to customize it."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {countriesToCompare.map((country) => (
            <CompareCountryCard key={country.slug} country={country} />
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/20 bg-[#111118]">
          <div className="border-b border-white/10 bg-black/25 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              TGPI Verdict
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {verdict.title}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
              {verdict.text}
            </p>
          </div>

          <div className="grid gap-3 p-5 md:grid-cols-3">
            <VerdictPick label="Best overall" country={verdict.bestOverall} />
            <VerdictPick label="Lowest budget" country={verdict.lowestBudget} />
            <VerdictPick label="Safest option" country={verdict.safest} />
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111118]">
          <div className="border-b border-white/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Comparison Matrix
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Side-by-side decision signals
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/30">
                  <th className="p-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Signal
                  </th>
                  {countriesToCompare.map((country) => (
                    <th
                      key={country.slug}
                      className="p-4 text-xs uppercase tracking-[0.2em] text-slate-300"
                    >
                      {country.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <ComparisonRow
                  label="TGPI score"
                  countries={countriesToCompare}
                  render={(country) => `${country.tgpiScore}/100`}
                />
                <ComparisonRow
                  label="Monthly budget"
                  countries={countriesToCompare}
                  render={(country) =>
                    `${formatCurrencyAmount(
                      country,
                      country.intelligence.averageMonthlyBudget,
                    )} ${country.currencyCode}`
                  }
                />
                <ComparisonRow
                  label="Safety"
                  countries={countriesToCompare}
                  render={(country) => `${country.intelligence.safetyScore}/100`}
                />
                <ComparisonRow
                  label="English access"
                  countries={countriesToCompare}
                  render={(country) =>
                    `${country.intelligence.englishFriendliness}/100`
                  }
                />
                <ComparisonRow
                  label="Quality of life"
                  countries={countriesToCompare}
                  render={(country) =>
                    `${country.intelligence.qualityOfLifeScore}/100`
                  }
                />
                <ComparisonRow
                  label="Cost profile"
                  countries={countriesToCompare}
                  render={(country) => getCountryCostLabel(country)}
                />
                <ComparisonRow
                  label="Adaptation"
                  countries={countriesToCompare}
                  render={(country) => getCountryRiskLabel(country)}
                />
                <ComparisonRow
                  label="Language"
                  countries={countriesToCompare}
                  render={(country) => country.language}
                />
                <ComparisonRow
                  label="Currency"
                  countries={countriesToCompare}
                  render={(country) => country.currency}
                />
                <ComparisonRow
                  label="Best goals"
                  countries={countriesToCompare}
                  render={(country) =>
                    country.idealFor.map((goal) => getCountryGoalLabel(goal)).join(", ")
                  }
                />
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Decision Rule
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Do not compare only by popularity.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Famous countries are not automatically better. Compare by your
              objective, budget, language ability, safety expectation and
              adaptation tolerance.
            </p>

            <div className="mt-5 space-y-3">
              <RuleCard
                title="Budget first"
                text="A country that breaks your monthly budget is not a smart option, even if it looks attractive."
              />
              <RuleCard
                title="Language is infrastructure"
                text="Language affects documents, housing, jobs, friendships, confidence and long-term integration."
              />
              <RuleCard
                title="Safety must be local"
                text="National averages are useful, but city and neighborhood validation are mandatory."
              />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Customize comparison
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Choose up to three countries from the explorer.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Use the compact country grid to scan faster, select countries and
              send them directly into this comparator.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/countries#country-list"
                className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-center text-sm font-black text-black transition hover:bg-[#F5D76E]"
              >
                Open country explorer
              </Link>

              <Link
                href="/countries#country-presets"
                className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37]/60"
              >
                Use guided presets
              </Link>
            </div>

            <div className="mt-5 rounded-2xl border border-[#2563EB]/25 bg-[#2563EB]/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[#93C5FD]">
                Available country database
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {allCountries.length} countries are currently available in the
                TGPI country system.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#0B0F19] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Data note
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            TGPI comparison data is educational and strategic. Costs, salaries,
            safety, visas, immigration rules, taxes and local conditions vary by
            city, time and official source. Validate legal, financial and
            relocation decisions with official sources.
          </p>
        </section>
      </section>
    </main>
  );
}

function normalizeCountryParams(countryParam?: string | string[]) {
  if (!countryParam) return [];

  const rawValues = Array.isArray(countryParam) ? countryParam : [countryParam];

  return Array.from(
    new Set(
      rawValues
        .flatMap((value) => value.split(","))
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean),
    ),
  ).slice(0, MAX_COUNTRIES_TO_COMPARE);
}

function getDefaultComparisonCountries() {
  return ["japan", "canada", "portugal"]
    .map((slug) => getCountry(slug))
    .filter((country): country is Country => Boolean(country));
}

function getComparisonVerdict(countries: Country[]) {
  const bestOverall = [...countries].sort((a, b) => b.tgpiScore - a.tgpiScore)[0];
  const lowestBudget = [...countries].sort(
    (a, b) =>
      a.intelligence.averageMonthlyBudget -
      b.intelligence.averageMonthlyBudget,
  )[0];
  const safest = [...countries].sort(
    (a, b) => b.intelligence.safetyScore - a.intelligence.safetyScore,
  )[0];

  if (!bestOverall || !lowestBudget || !safest) {
    return {
      title: "No comparison available.",
      text: "Select at least one country from the explorer to generate a comparison.",
      bestOverall,
      lowestBudget,
      safest,
    };
  }

  return {
    title: `${bestOverall.name} has the strongest overall TGPI signal.`,
    text: `${bestOverall.name} leads this comparison by TGPI score. ${lowestBudget.name} has the lowest estimated monthly budget. ${safest.name} has the strongest safety signal. Use this as a decision shortlist, then validate city-level cost, legal requirements and personal fit.`,
    bestOverall,
    lowestBudget,
    safest,
  };
}

type CompareCountryCardProps = {
  country: Country;
};

function CompareCountryCard({ country }: CompareCountryCardProps) {
  const budget = `${formatCurrencyAmount(
    country,
    country.intelligence.averageMonthlyBudget,
  )} ${country.currencyCode}`;

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group rounded-[1.5rem] border border-white/10 bg-[#111118] p-5 transition hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:bg-white/[0.03]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-5xl">{country.emoji}</div>
          <h2 className="mt-3 truncate text-2xl font-black text-white">
            {country.name}
          </h2>
          <p className="mt-1 truncate text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {country.region} • {country.capital}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5D76E]">
            TGPI
          </p>
          <p className="text-2xl font-black text-[#D4AF37]">
            {country.tgpiScore}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
        {country.shortDescription}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <MiniMetric label="Budget" value={budget} tone="gold" />
        <MiniMetric
          label="Safety"
          value={`${country.intelligence.safetyScore}/100`}
          tone="blue"
        />
        <MiniMetric
          label="English"
          value={`${country.intelligence.englishFriendliness}/100`}
          tone="white"
        />
        <MiniMetric
          label="Quality"
          value={`${country.intelligence.qualityOfLifeScore}/100`}
          tone="white"
        />
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-xs text-slate-500">Decision signal</p>
        <p className="mt-1 text-sm font-black text-[#F5D76E]">
          {getCountryDecisionLabel(country)}
        </p>
      </div>
    </Link>
  );
}

type MiniMetricProps = {
  label: string;
  value: string;
  tone: "gold" | "blue" | "white";
};

function MiniMetric({ label, value, tone }: MiniMetricProps) {
  const valueClass =
    tone === "gold"
      ? "text-[#D4AF37]"
      : tone === "blue"
        ? "text-[#38BDF8]"
        : "text-white";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 truncate text-sm font-black ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

type VerdictPickProps = {
  label: string;
  country?: Country;
};

function VerdictPick({ label, country }: VerdictPickProps) {
  if (!country) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-bold text-slate-400">No country</p>
      </div>
    );
  }

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-[#D4AF37]/60"
    >
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-black text-white">{country.name}</p>
      <p className="mt-1 text-sm font-bold text-[#D4AF37]">
        TGPI {country.tgpiScore}/100
      </p>
    </Link>
  );
}

type ComparisonRowProps = {
  label: string;
  countries: Country[];
  render: (country: Country) => string;
};

function ComparisonRow({ label, countries, render }: ComparisonRowProps) {
  return (
    <tr className="border-b border-white/10 last:border-b-0">
      <td className="p-4 font-bold text-slate-300">{label}</td>
      {countries.map((country) => (
        <td key={country.slug} className="p-4 text-slate-400">
          {render(country)}
        </td>
      ))}
    </tr>
  );
}

type RuleCardProps = {
  title: string;
  text: string;
};

function RuleCard({ title, text }: RuleCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="font-black text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}