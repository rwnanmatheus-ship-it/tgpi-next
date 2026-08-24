import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CompareCountryPicker from "@/components/compare/CompareCountryPicker";
import {
  formatCurrencyAmount,
  getAllCountries,
  getCountry,
  getCountryCostLabel,
  getCountryDecisionLabel,
  getCountryGoalLabel,
  getCountryImageAlt,
  getCountryImageUrl,
  getCountryRiskLabel,
  type Country,
} from "@/lib/countries";
import {
  getComparisonGoalConfig,
  getComparisonVerdict,
  getCountryComparisonScore,
  getSignalLabel,
  isComparisonGoal,
  type ComparisonGoal,
  type ComparisonSignal,
} from "@/lib/tgpi-comparison";

type ComparePageProps = {
  searchParams?: Promise<{
    country?: string | string[];
    goal?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Compare Countries | TGPI Global Decision Workspace",
  description:
    "Compare countries through transparent TGPI decision lenses for cost, safety, language access, quality of life and international readiness.",
  alternates: { canonical: "/compare" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Compare Countries | TGPI",
    description:
      "Build a transparent country shortlist around cost, safety, language, quality of life and your international objective.",
    url: "/compare",
    siteName: "TGPI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Countries | TGPI",
    description:
      "Compare international options through one transparent TGPI decision workspace.",
  },
};

const MAX_COUNTRIES_TO_COMPARE = 3;
const DEFAULT_COUNTRY_SLUGS = ["japan", "canada", "portugal"] as const;

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedSearchParams = await searchParams;
  const normalizedSlugs = normalizeCountryParams(resolvedSearchParams?.country);
  const requestedSlugs = normalizedSlugs.slice(0, MAX_COUNTRIES_TO_COMPARE);
  const invalidSlugs = normalizedSlugs.filter((slug) => !getCountry(slug));
  const selectedCountries = requestedSlugs
    .map((slug) => getCountry(slug))
    .filter((country): country is Country => Boolean(country));
  const hasExplicitSelection = normalizedSlugs.length > 0;
  const countriesToCompare = hasExplicitSelection
    ? selectedCountries
    : getDefaultComparisonCountries();
  const goal = normalizeComparisonGoal(resolvedSearchParams?.goal);
  const goalConfig = getComparisonGoalConfig(goal);
  const verdict = getComparisonVerdict(countriesToCompare, goal);
  const canCompare = countriesToCompare.length >= 2;
  const pickerCountries = getAllCountries()
    .map(({ slug, name, emoji, region }) => ({ slug, name, emoji, region }))
    .sort((first, second) => first.name.localeCompare(second.name));
  const comparisonScores = Object.fromEntries(
    countriesToCompare.map((country) => [
      country.slug,
      getCountryComparisonScore(country, goal),
    ]),
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TGPI Country Comparator",
    url: "https://theglobalpolymath.com/compare",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description:
      "A transparent country comparison workspace for international education, mobility and life decisions.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Compare up to three countries",
      "Switch between international decision lenses",
      "Review cost bands, safety, language and quality of life",
      "Create shareable comparison URLs",
    ],
  };

  return (
    <ActivationProgressProvider>
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/countries"
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--tgpi-border)] bg-white px-4 text-sm font-extrabold text-[var(--tgpi-navy)] shadow-sm transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            ← Back to countries
          </Link>
          <Link
            href="/authority"
            className="inline-flex min-h-11 items-center text-sm font-extrabold text-[var(--tgpi-gold-strong)] underline decoration-[var(--tgpi-gold)]/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            Review TGPI methodology
          </Link>
        </div>

        <CompareCountryPicker
          key={`${goal}:${countriesToCompare.map((country) => country.slug).join(",")}`}
          countries={pickerCountries}
          initialSlugs={countriesToCompare.map((country) => country.slug)}
          initialGoal={goal}
          hasExplicitSelection={hasExplicitSelection}
        />

        {invalidSlugs.length > 0 ? (
          <ComparisonNotice tone="warning">
            {invalidSlugs.length === 1 ? "This country" : "These countries"} could
            not be loaded: {invalidSlugs.join(", ")}. Choose a valid TGPI country
            profile above.
          </ComparisonNotice>
        ) : null}

        {normalizedSlugs.length > MAX_COUNTRIES_TO_COMPARE ? (
          <ComparisonNotice tone="information">
            TGPI compares a maximum of three countries at once. The additional
            selection was not added; replace one of the active countries to include it.
          </ComparisonNotice>
        ) : null}

        <section className="relative mt-6 overflow-hidden rounded-[36px] border border-[var(--tgpi-gold)]/55 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)]">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative z-10 flex flex-col justify-center p-7 sm:p-9 lg:p-12">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--tgpi-gold-light)]">
                TGPI Global Decision Workspace
              </p>
              <h1 className="mt-4 max-w-3xl font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[0.91]">
                Compare trade-offs before committing to a country.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#D7E0EB] sm:text-base sm:leading-8">
                Use one transparent decision lens to compare readiness, safety,
                language access, quality of life and relative cost context.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--tgpi-gold-light)]/35 bg-white/5 px-4 py-2 text-xs font-extrabold text-[var(--tgpi-gold-light)]">
                  Lens · {goalConfig.label}
                </span>
                <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-extrabold text-white">
                  {countriesToCompare.length} of 3 countries selected
                </span>
              </div>
            </div>

            <ComparisonHeroVisual countries={countriesToCompare} />
          </div>
        </section>

        {countriesToCompare.length > 0 ? (
          <section
            aria-label="Selected country summaries"
            className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {countriesToCompare.map((country) => (
              <CompareCountryCard
                key={country.slug}
                country={country}
                comparisonScore={comparisonScores[country.slug]}
                goal={goal}
              />
            ))}
          </section>
        ) : null}

        {!canCompare ? (
          <IncompleteComparisonState hasCountry={countriesToCompare.length === 1} />
        ) : verdict ? (
          <>
            <section className="mt-6 overflow-hidden rounded-[30px] border border-[var(--tgpi-gold)]/55 bg-white shadow-[var(--tgpi-shadow-soft)]">
              <div className="grid gap-6 border-b border-[var(--tgpi-border-soft)] bg-[linear-gradient(135deg,#071A32,#102D50)] p-6 text-white lg:grid-cols-[1fr_0.56fr] lg:items-end lg:p-8">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
                    TGPI Verdict · {goalConfig.label}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold lg:text-4xl">
                    {verdict.title}
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D7E0EB]">
                    {verdict.text}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                    Decision lens confidence
                  </p>
                  <p className="mt-2 text-4xl font-extrabold">Transparent</p>
                  <p className="mt-2 text-xs leading-6 text-[#D7E0EB]">
                    Every weight used by this educational model is visible below.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 p-5 md:grid-cols-3 lg:p-6">
                <VerdictPick
                  label="Strongest decision score"
                  countries={verdict.bestOverall}
                  value={`${verdict.topScore}/100 lens score`}
                />
                <VerdictPick
                  label="Most accessible cost band"
                  countries={verdict.lowestCostProfile}
                  value={getCountryCostLabel(verdict.lowestCostProfile[0])}
                />
                <VerdictPick
                  label="Strongest safety signal"
                  countries={verdict.safest}
                  value={`${verdict.safest[0].intelligence.safetyScore}/100 safety`}
                />
              </div>
            </section>

            <ComparisonMatrix
              countries={countriesToCompare}
              goal={goal}
              comparisonScores={comparisonScores}
            />

            <DecisionLensPanel goal={goal} />

            <section className="mt-6 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="rounded-[28px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
                  Decision standard
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--tgpi-navy)]">
                  A score creates a shortlist. Evidence creates a decision.
                </h2>
                <div className="mt-5 grid gap-3">
                  <RuleCard
                    title="Cost must use comparable units"
                    text="TGPI ranks cost bands, never nominal values from unrelated currencies. Local budgets remain reference estimates."
                  />
                  <RuleCard
                    title="Safety must become local"
                    text="Country averages are only the beginning. Validate city, neighborhood, time and personal profile."
                  />
                  <RuleCard
                    title="Language is infrastructure"
                    text="Language affects documents, housing, work, study, community and long-term integration."
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold-soft)] p-6 shadow-[var(--tgpi-shadow-soft)]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
                  Turn comparison into progress
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--tgpi-navy)]">
                  Move from country interest to practical readiness.
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A3B1B]">
                  Connect the shortlist to your fit profile, document preparation and
                  the skills required to perform well in the selected environment.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <ActionLink href="/onboarding" label="Build my country fit" />
                  <ActionLink href="/passport" label="Prepare documents" />
                  <ActionLink href="/courses" label="Develop skills" />
                </div>
              </div>
            </section>
          </>
        ) : null}

        <section className="mt-6 rounded-[24px] border border-[var(--tgpi-border)] bg-[#ECE6DA] p-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-muted)]">
            Responsible data note
          </p>
          <p className="mt-2 max-w-5xl text-sm leading-7 text-[var(--tgpi-muted)]">
            TGPI comparison data is educational and strategic. Budgets are static
            local-currency estimates and are not live exchange-rate quotes. Safety,
            visas, taxes, salaries, immigration rules and local conditions vary by
            city, personal profile and time. Validate official sources before legal,
            financial or mobility decisions.
          </p>
        </section>
      </div>
    </main>
    </ActivationProgressProvider>
  );
}

function normalizeCountryParams(countryParam?: string | string[]): string[] {
  if (!countryParam) return [];
  const rawValues = Array.isArray(countryParam) ? countryParam : [countryParam];
  return Array.from(
    new Set(
      rawValues
        .flatMap((value) => value.split(","))
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

function normalizeComparisonGoal(value?: string): ComparisonGoal {
  return isComparisonGoal(value) ? value : "overall";
}

function getDefaultComparisonCountries(): Country[] {
  return DEFAULT_COUNTRY_SLUGS.map((slug) => getCountry(slug)).filter(
    (country): country is Country => Boolean(country),
  );
}

function ComparisonHeroVisual({ countries }: { countries: Country[] }) {
  if (!countries.length) {
    return (
      <div className="relative min-h-[320px] overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(197,150,50,0.32),transparent_28%),linear-gradient(135deg,#102D50,#041426)] lg:min-h-[500px]">
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <div>
            <p className="font-[var(--tgpi-font-display)] text-5xl font-semibold text-white/90">
              Your next decision starts here.
            </p>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#D7E0EB]">
              Choose at least two valid countries to reveal the comparison workspace.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid min-h-[360px] gap-px bg-white/10 lg:min-h-[500px] ${
        countries.length === 1 ? "grid-cols-1" : "grid-cols-2"
      }`}
    >
      {countries.map((country, index) => (
        <div
          key={country.slug}
          className={`relative min-h-[240px] overflow-hidden ${
            countries.length === 3 && index === 0 ? "col-span-2" : ""
          }`}
        >
          <Image
            src={getCountryImageUrl(country)}
            alt={getCountryImageAlt(country)}
            fill
            priority={index === 0}
            sizes={
              countries.length === 1
                ? "(max-width: 1024px) 100vw, 56vw"
                : "(max-width: 1024px) 50vw, 28vw"
            }
            className="object-cover saturate-[1.08] contrast-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--tgpi-navy-deep)]/90 via-transparent to-black/5" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-3xl">{country.emoji}</p>
            <p className="mt-1 font-[var(--tgpi-font-display)] text-2xl font-semibold text-white">
              {country.name}
            </p>
            <p className="text-xs font-bold text-[#D7E0EB]">
              {country.region} · {country.capital}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompareCountryCard({ country, comparisonScore, goal }: {
  country: Country;
  comparisonScore: number;
  goal: ComparisonGoal;
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)]">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={getCountryImageUrl(country)}
          alt={getCountryImageAlt(country)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--tgpi-navy-deep)]/85 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
          <div>
            <p className="text-3xl">{country.emoji}</p>
            <h2 className="mt-1 text-3xl font-semibold">{country.name}</h2>
            <p className="text-xs font-bold text-[#D7E0EB]">
              {country.region} · {country.capital}
            </p>
          </div>
          <div className="rounded-2xl border border-white/25 bg-[rgba(4,20,38,0.82)] px-4 py-3 text-center backdrop-blur">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]">
              {getComparisonGoalConfig(goal).shortLabel}
            </p>
            <p className="text-2xl font-extrabold">{comparisonScore}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-7 text-[var(--tgpi-muted)]">
          {country.shortDescription}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-3">
          <MiniMetric label="Cost band" value={getCountryCostLabel(country)} />
          <MiniMetric label="Safety" value={`${country.intelligence.safetyScore}/100`} />
          <MiniMetric label="English access" value={`${country.intelligence.englishFriendliness}/100`} />
          <MiniMetric label="Quality of life" value={`${country.intelligence.qualityOfLifeScore}/100`} />
        </dl>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--tgpi-border-soft)] pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--tgpi-muted)]">
              Decision signal
            </p>
            <p className="mt-1 text-sm font-extrabold text-[var(--tgpi-gold-strong)]">
              {getCountryDecisionLabel(country)}
            </p>
          </div>
          <Link
            href={`/countries/${country.slug}`}
            className="inline-flex min-h-11 shrink-0 items-center rounded-xl border border-[var(--tgpi-border)] px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            Open profile →
          </Link>
        </div>
      </div>
    </article>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] p-3">
      <dt className="text-[11px] font-bold text-[var(--tgpi-muted)]">{label}</dt>
      <dd className="mt-1 text-sm font-extrabold text-[var(--tgpi-navy)]">{value}</dd>
    </div>
  );
}

function ComparisonMatrix({ countries, goal, comparisonScores }: {
  countries: Country[];
  goal: ComparisonGoal;
  comparisonScores: Record<string, number>;
}) {
  return (
    <section
      id="comparison-matrix"
      className="mt-6 scroll-mt-28 overflow-hidden rounded-[30px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)]"
    >
      <div className="border-b border-[var(--tgpi-border-soft)] p-6">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
          Comparison matrix
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[var(--tgpi-navy)]">
          Side-by-side decision signals
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--tgpi-muted)]">
          Gold cells mark the strongest comparable signal. Monthly budgets remain
          unranked because their currencies are different.
        </p>
      </div>

      <div className="overflow-x-auto" tabIndex={0} aria-label="Scrollable country comparison table">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparison of {countries.map((country) => country.name).join(", ")} for the {getComparisonGoalConfig(goal).label} lens.
          </caption>
          <thead>
            <tr className="border-b border-[var(--tgpi-border)] bg-[var(--tgpi-navy)] text-white">
              <th scope="col" className="sticky left-0 z-10 min-w-48 bg-[var(--tgpi-navy)] p-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]">
                Signal
              </th>
              {countries.map((country) => (
                <th key={country.slug} scope="col" className="min-w-52 p-4 text-sm font-extrabold">
                  {country.emoji} {country.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <ComparisonRow label={`${getComparisonGoalConfig(goal).shortLabel} lens score`} countries={countries} render={(country) => `${comparisonScores[country.slug]}/100`} winners={getWinnerSlugs(countries, (country) => comparisonScores[country.slug])} />
            <ComparisonRow label="TGPI readiness" countries={countries} render={(country) => `${country.tgpiScore}/100`} winners={getWinnerSlugs(countries, (country) => country.tgpiScore)} />
            <ComparisonRow label="Relative cost profile" countries={countries} render={getCountryCostLabel} winners={getWinnerSlugs(countries, (country) => ({ low: 3, medium: 2, high: 1 })[country.costLevel])} />
            <ComparisonRow label="Monthly budget · local reference" countries={countries} render={(country) => `${formatCurrencyAmount(country, country.intelligence.averageMonthlyBudget)} ${country.currencyCode}`} />
            <ComparisonRow label="Safety" countries={countries} render={(country) => `${country.intelligence.safetyScore}/100`} winners={getWinnerSlugs(countries, (country) => country.intelligence.safetyScore)} />
            <ComparisonRow label="English access" countries={countries} render={(country) => `${country.intelligence.englishFriendliness}/100`} winners={getWinnerSlugs(countries, (country) => country.intelligence.englishFriendliness)} />
            <ComparisonRow label="Quality of life" countries={countries} render={(country) => `${country.intelligence.qualityOfLifeScore}/100`} winners={getWinnerSlugs(countries, (country) => country.intelligence.qualityOfLifeScore)} />
            <ComparisonRow label="Adaptation" countries={countries} render={getCountryRiskLabel} />
            <ComparisonRow label="Language" countries={countries} render={(country) => country.language} />
            <ComparisonRow label="Currency" countries={countries} render={(country) => country.currency} />
            <ComparisonRow label="Best goals" countries={countries} render={(country) => country.idealFor.map(getCountryGoalLabel).join(", ")} />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonRow({ label, countries, render, winners = new Set<string>() }: {
  label: string;
  countries: Country[];
  render: (country: Country) => string;
  winners?: Set<string>;
}) {
  return (
    <tr className="border-b border-[var(--tgpi-border-soft)] last:border-b-0">
      <th scope="row" className="sticky left-0 z-10 bg-[#F4EFE5] p-4 font-extrabold text-[var(--tgpi-navy)]">
        {label}
      </th>
      {countries.map((country) => {
        const winner = winners.has(country.slug);
        return (
          <td key={country.slug} className={`p-4 font-semibold ${winner ? "bg-[var(--tgpi-gold-soft)] text-[#5C420F]" : "text-[var(--tgpi-muted)]"}`}>
            <span>{render(country)}</span>
            {winner ? (
              <span className="ml-2 inline-flex rounded-full border border-[var(--tgpi-gold)]/45 bg-white/55 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-gold-strong)]">
                Best signal
              </span>
            ) : null}
          </td>
        );
      })}
    </tr>
  );
}

function getWinnerSlugs(countries: Country[], getValue: (country: Country) => number): Set<string> {
  const highestValue = Math.max(...countries.map(getValue));
  return new Set(countries.filter((country) => getValue(country) === highestValue).map((country) => country.slug));
}

function VerdictPick({ label, countries, value }: {
  label: string;
  countries: Country[];
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] p-5">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-muted)]">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {countries.map((country) => (
          <Link key={country.slug} href={`/countries/${country.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-[var(--tgpi-border)] bg-white px-3 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
            {country.emoji} {country.name}
          </Link>
        ))}
      </div>
      <p className="mt-3 text-sm font-extrabold text-[var(--tgpi-gold-strong)]">
        {countries.length > 1 ? "Shared · " : ""}{value}
      </p>
    </article>
  );
}

function DecisionLensPanel({ goal }: { goal: ComparisonGoal }) {
  const config = getComparisonGoalConfig(goal);
  const entries = Object.entries(config.weights) as [ComparisonSignal, number][];
  return (
    <section className="mt-6 rounded-[28px] border border-[#B8C9DF] bg-[#EEF5FF] p-6 shadow-[var(--tgpi-shadow-soft)]">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#315F98]">Transparent scoring model</p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--tgpi-navy)]">{config.label}</h2>
          <p className="mt-3 text-sm leading-7 text-[#334A64]">{config.description}</p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-5">
          {entries.map(([signal, weight]) => (
            <div key={signal} className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm">
              <dt className="text-[11px] font-bold leading-5 text-[#52677E]">{getSignalLabel(signal)}</dt>
              <dd className="mt-2 text-2xl font-extrabold text-[var(--tgpi-navy)]">{weight}%</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function IncompleteComparisonState({ hasCountry }: { hasCountry: boolean }) {
  return (
    <section className="mt-6 rounded-[30px] border border-[var(--tgpi-gold)]/55 bg-white p-7 text-center shadow-[var(--tgpi-shadow-soft)] sm:p-10">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Comparison incomplete</p>
      <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold text-[var(--tgpi-navy)]">
        {hasCountry ? "Keep this country and choose one alternative." : "Choose at least two valid countries to begin."}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--tgpi-muted)]">
        TGPI will not declare a country the winner of a one-country comparison. Use the builder above to create a meaningful decision set.
      </p>
      <Link href="#comparison-builder-title" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
        Choose another country
      </Link>
    </section>
  );
}

function ComparisonNotice({ children, tone }: { children: ReactNode; tone: "warning" | "information" }) {
  const classes = tone === "warning" ? "border-[#E7B8B0] bg-[#FFF1EF] text-[#7F2E28]" : "border-[#B8C9DF] bg-[#EEF5FF] text-[#274968]";
  return <p role="status" className={`mt-4 rounded-2xl border px-5 py-4 text-sm font-bold leading-6 ${classes}`}>{children}</p>;
}

function RuleCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] p-4">
      <h3 className="text-lg font-semibold text-[var(--tgpi-navy)]">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-[var(--tgpi-muted)]">{text}</p>
    </article>
  );
}

function ActionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-4 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
      {label}
    </Link>
  );
}
