import type { Metadata } from "next";
import MobilePageGuide from "@/components/mobile/MobilePageGuide";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CompareCountryPicker from "@/components/compare/CompareCountryPicker";
import TGPIPageShell from "@/components/TGPIPageShell";
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
  getComparisonDecisionBrief,
  getComparisonGoalConfig,
  getComparisonVerdict,
  getCountryComparisonScore,
  getCountrySignalScore,
  getSignalLabel,
  isComparisonGoal,
  type ComparisonDecisionBrief,
  type ComparisonGoal,
  type ComparisonSignal,
  type ComparisonVerdict,
} from "@/lib/tgpi-comparison";

type ComparePageProps = {
  searchParams?: Promise<{
    country?: string | string[];
    goal?: string;
  }>;
};

export const metadata: Metadata = {
  title: "TGPI Compare — Global Decision Intelligence",
  description:
    "Compare countries through the proprietary TGPI decision framework, with transparent weights, visible trade-offs and connected next actions.",
  alternates: { canonical: "/compare" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "TGPI Compare — Compare Futures, Not Just Countries",
    description:
      "Build an international decision set, apply a transparent lens and turn country trade-offs into a connected action path.",
    url: "/compare",
    siteName: "TGPI",
    type: "website",
    images: ["/images/compare/tgpi-global-decision-observatory.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI Compare — Global Decision Intelligence",
    description:
      "Compare international futures through one transparent TGPI decision system.",
    images: ["/images/compare/tgpi-global-decision-observatory.webp"],
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
  const decisionBrief = getComparisonDecisionBrief(countriesToCompare, goal);
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
    name: "TGPI Global Decision Intelligence",
    url: "https://theglobalpolymath.com/compare",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description:
      "A transparent international decision system for comparing country trade-offs and connecting them to readiness, documents and learning.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Compare up to three countries",
      "Apply five transparent international decision lenses",
      "Inspect weighted signals and decisive trade-offs",
      "Create shareable comparison URLs",
      "Connect a shortlist to country intelligence, documents and learning",
    ],
  };

  return (
    <ActivationProgressProvider>
      <TGPIPageShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/countries"
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--tgpi-border)] bg-white px-4 text-sm font-extrabold text-[var(--tgpi-navy)] shadow-sm transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            ← Explore countries
          </Link>
          <Link
            href="/authority"
            className="inline-flex min-h-11 items-center text-sm font-extrabold text-[var(--tgpi-gold-strong)] underline decoration-[var(--tgpi-gold)]/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            Review the TGPI methodology
          </Link>
        </div>

        <CompareHero
          countryCount={countriesToCompare.length}
          goalLabel={goalConfig.label}
        />

        <ComparisonProofStrip />

        <MobilePageGuide label="COMPARE WITH CLARITY" title="One question. A clearer decision." links={[{ label: "Choose countries", href: "#comparison-builder" }, { label: "View evidence", href: "#comparison-matrix" }]}>
          Choose up to three destinations and one decision lens. Swipe the evidence table sideways to inspect each country; budgets use local currencies.
        </MobilePageGuide>

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

        {countriesToCompare.length > 0 ? (
          <section
            aria-labelledby="decision-set-title"
            className="mt-14 sm:mt-16"
          >
            <SectionHeading
              eyebrow="Your active decision set"
              title="Start with the countries. Then interrogate the differences."
              text="Each profile keeps its original context while the TGPI lens applies one comparable framework across the complete shortlist."
              id="decision-set-title"
            />
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {countriesToCompare.map((country) => (
                <CompareCountryCard
                  key={country.slug}
                  country={country}
                  comparisonScore={comparisonScores[country.slug]}
                  goal={goal}
                />
              ))}
            </div>
          </section>
        ) : null}

        {!canCompare ? (
          <IncompleteComparisonState hasCountry={countriesToCompare.length === 1} />
        ) : verdict && decisionBrief ? (
          <>
            <ExecutiveDecisionBrief
              brief={decisionBrief}
              goal={goal}
              verdict={verdict}
            />

            <DecisionLandscape countries={countriesToCompare} goal={goal} />

            <ComparisonMatrix
              countries={countriesToCompare}
              goal={goal}
              comparisonScores={comparisonScores}
            />

            <DecisionLensPanel goal={goal} />

            <ConnectedDecisionPath
              country={decisionBrief.leaders[0]}
              goal={goal}
            />

            <ComparisonStandard />
          </>
        ) : null}

        <section className="mb-8 mt-7 rounded-[24px] border border-[var(--tgpi-border)] bg-[#ECE6DA] p-5 sm:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-muted)]">
            Responsible intelligence note
          </p>
          <p className="mt-2 max-w-5xl text-sm leading-7 text-[var(--tgpi-muted)]">
            TGPI comparison data is educational and strategic. Budgets are static
            local-currency estimates and are not live exchange-rate quotes. Safety,
            visas, taxes, salaries, immigration rules and local conditions vary by
            city, personal profile and time. Validate official sources before legal,
            financial or mobility decisions.
          </p>
        </section>
      </TGPIPageShell>
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

function CompareHero({
  countryCount,
  goalLabel,
}: {
  countryCount: number;
  goalLabel: string;
}) {
  return (
    <section className="mobile-compact-hero relative isolate min-h-[640px] overflow-hidden rounded-[30px] border border-white/10 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)] sm:min-h-[600px] sm:rounded-[36px] lg:h-[540px] lg:min-h-0">
      <Image
        src="/images/compare/tgpi-global-decision-observatory.webp"
        alt="TGPI global decision observatory comparing three international futures through an illuminated strategic atlas"
        fill
        priority
        quality={88}
        sizes="(max-width: 1024px) 100vw, 1280px"
        className="object-cover object-[69%_center] sm:object-[66%_center] lg:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,15,30,0.94)_0%,rgba(3,15,30,0.84)_62%,rgba(3,15,30,0.9)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,15,30,0.99)_0%,rgba(3,15,30,0.94)_43%,rgba(3,15,30,0.42)_70%,rgba(3,15,30,0.12)_100%)]" />

      <div className="mobile-compact-hero-content relative z-10 flex min-h-[640px] flex-col justify-between p-7 sm:min-h-[600px] sm:p-10 lg:h-full lg:min-h-0 lg:p-12">
        <div className="max-w-[690px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--tgpi-gold)]/40 bg-[var(--tgpi-gold)]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
              TGPI Decision Intelligence
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/65">
              Proprietary comparison framework
            </span>
          </div>

          <h1 className="mt-5 max-w-[680px] font-[var(--tgpi-font-display)] text-[clamp(2.75rem,4.6vw,4.35rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            Compare futures, not just countries.
          </h1>
          <p className="mt-5 max-w-[610px] text-[15px] leading-7 text-white/72 sm:text-base sm:leading-8">
            Build an international decision set, apply one transparent lens and
            expose the trade-offs that rankings, travel content and isolated data
            cannot explain.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#comparison-builder"
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Build my comparison ↓
            </Link>
            <Link
              href="#decision-standard"
              className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold)]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              See the TGPI standard
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-5">
          <dl className="grid flex-1 grid-cols-3 gap-4 border-t border-white/12 pt-5 sm:max-w-[590px]">
            {[
              ["195", "Country profiles"],
              ["05", "Decision lenses"],
              ["03", "Countries at once"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-xl font-extrabold text-[var(--tgpi-gold-light)] sm:text-2xl">
                  {value}
                </dt>
                <dd className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="hidden max-w-[275px] rounded-2xl border border-white/15 bg-[var(--tgpi-navy-deep)]/70 px-5 py-4 text-right backdrop-blur-xl xl:block">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
              Active lens · {goalLabel}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/80">
              {countryCount} of 3 countries in the current decision set.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonProofStrip() {
  const items = [
    ["Transparent weights", "See exactly why a signal changes the decision"],
    ["Shareable state", "Every country set and lens becomes a reusable URL"],
    ["Connected action", "Continue into intelligence, documents and learning"],
  ] as const;

  return (
    <section className="mt-7 overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)]">
      <div className="grid gap-px bg-[var(--tgpi-border)] sm:grid-cols-3">
        {items.map(([title, text], index) => (
          <article key={title} className="bg-white px-6 py-5">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
              0{index + 1} · {title}
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-[var(--tgpi-navy)]">
              {text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  id,
  text,
  title,
}: {
  eyebrow: string;
  id: string;
  text: string;
  title: string;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-3 max-w-3xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--tgpi-navy)] sm:text-5xl"
        >
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-sm leading-7 text-[var(--tgpi-muted)] sm:text-base sm:leading-8 lg:justify-self-end">
        {text}
      </p>
    </div>
  );
}

function CompareCountryCard({
  country,
  comparisonScore,
  goal,
}: {
  country: Country;
  comparisonScore: number;
  goal: ComparisonGoal;
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)]">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getCountryImageUrl(country)}
          alt={getCountryImageAlt(country)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--tgpi-navy-deep)]/90 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
          <div>
            <p className="text-3xl">{country.emoji}</p>
            <h3 className="mt-1 text-3xl font-semibold">{country.name}</h3>
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
          <MiniMetric
            label="Safety"
            value={`${country.intelligence.safetyScore}/100`}
          />
          <MiniMetric
            label="English access"
            value={`${country.intelligence.englishFriendliness}/100`}
          />
          <MiniMetric
            label="Quality of life"
            value={`${country.intelligence.qualityOfLifeScore}/100`}
          />
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

function ExecutiveDecisionBrief({
  brief,
  goal,
  verdict,
}: {
  brief: ComparisonDecisionBrief;
  goal: ComparisonGoal;
  verdict: ComparisonVerdict;
}) {
  return (
    <section className="mt-14 overflow-hidden rounded-[32px] border border-[var(--tgpi-gold)]/50 bg-white shadow-[var(--tgpi-shadow-premium)] sm:mt-16">
      <div className="grid gap-8 bg-[linear-gradient(135deg,#05162A,#102F52)] p-7 text-white lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:p-10">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
            TGPI Executive Decision Brief · {getComparisonGoalConfig(goal).label}
          </p>
          <h2 className="mt-4 max-w-4xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] sm:text-5xl">
            {verdict.title}
          </h2>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            {brief.summary}
          </p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <DecisionStat label="Decision state" value={brief.stateLabel} />
          <DecisionStat
            label="Lead margin"
            value={brief.margin ? `${brief.margin} points` : "Level"}
          />
          <DecisionStat
            label="Largest spread"
            value={`${getSignalLabel(brief.decisiveSignal)} · ${brief.decisiveSignalSpread}`}
          />
        </dl>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-3 lg:p-6">
        <VerdictPick
          label="Strongest lens score"
          countries={verdict.bestOverall}
          value={`${verdict.topScore}/100 decision score`}
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
  );
}

function DecisionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur">
      <dt className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-extrabold leading-6 text-white">{value}</dd>
    </div>
  );
}

function DecisionLandscape({
  countries,
  goal,
}: {
  countries: Country[];
  goal: ComparisonGoal;
}) {
  const config = getComparisonGoalConfig(goal);
  const entries = Object.entries(config.weights) as [ComparisonSignal, number][];

  return (
    <section className="mt-7 rounded-[30px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)] sm:p-8">
      <SectionHeading
        eyebrow="TGPI Decision Landscape"
        id="decision-landscape-title"
        title="See where each country creates an advantage — and a compromise."
        text="Every bar uses a comparable 0–100 TGPI signal. The percentage beside each signal shows its influence inside the active decision lens."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {entries.map(([signal, weight]) => {
          const highest = Math.max(
            ...countries.map((country) => getCountrySignalScore(country, signal)),
          );
          return (
            <article
              key={signal}
              className="rounded-[24px] border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-extrabold leading-6 text-[var(--tgpi-navy)]">
                  {getSignalLabel(signal)}
                </h3>
                <span className="rounded-full bg-[var(--tgpi-gold-soft)] px-2.5 py-1 text-[10px] font-extrabold text-[var(--tgpi-gold-strong)]">
                  {weight}%
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {countries.map((country) => {
                  const value = getCountrySignalScore(country, signal);
                  const strongest = value === highest;
                  return (
                    <div key={country.slug}>
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="truncate font-bold text-[var(--tgpi-muted)]">
                          {country.emoji} {country.name}
                        </span>
                        <span className={strongest ? "font-extrabold text-[var(--tgpi-gold-strong)]" : "font-bold text-[var(--tgpi-navy)]"}>
                          {value}
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#DED8CC]">
                        <div
                          className={strongest ? "h-full rounded-full bg-[var(--tgpi-gold)]" : "h-full rounded-full bg-[var(--tgpi-navy)]"}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ComparisonMatrix({
  countries,
  goal,
  comparisonScores,
}: {
  countries: Country[];
  goal: ComparisonGoal;
  comparisonScores: Record<string, number>;
}) {
  return (
    <section
      id="comparison-matrix"
      className="mt-7 scroll-mt-28 overflow-hidden rounded-[30px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)]"
    >
      <div className="border-b border-[var(--tgpi-border-soft)] p-6 sm:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
          Evidence matrix
        </p>
        <h2 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)] sm:text-4xl">
          Inspect every decision signal side by side.
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--tgpi-muted)]">
          Gold cells mark the strongest comparable signal. Monthly budgets remain
          unranked because their currencies are different.
        </p>
      </div>

      <div
        className="overflow-x-auto"
        tabIndex={0}
        aria-label="Scrollable country comparison table"
      >
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparison of {countries.map((country) => country.name).join(", ")} for
            the {getComparisonGoalConfig(goal).label} lens.
          </caption>
          <thead>
            <tr className="border-b border-[var(--tgpi-border)] bg-[var(--tgpi-navy)] text-white">
              <th
                scope="col"
                className="sticky left-0 z-10 min-w-48 bg-[var(--tgpi-navy)] p-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]"
              >
                Signal
              </th>
              {countries.map((country) => (
                <th
                  key={country.slug}
                  scope="col"
                  className="min-w-52 p-4 text-sm font-extrabold"
                >
                  {country.emoji} {country.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <ComparisonRow
              label={`${getComparisonGoalConfig(goal).shortLabel} lens score`}
              countries={countries}
              render={(country) => `${comparisonScores[country.slug]}/100`}
              winners={getWinnerSlugs(
                countries,
                (country) => comparisonScores[country.slug],
              )}
            />
            <ComparisonRow
              label="TGPI readiness"
              countries={countries}
              render={(country) => `${country.tgpiScore}/100`}
              winners={getWinnerSlugs(countries, (country) => country.tgpiScore)}
            />
            <ComparisonRow
              label="Relative cost profile"
              countries={countries}
              render={getCountryCostLabel}
              winners={getWinnerSlugs(
                countries,
                (country) => ({ low: 3, medium: 2, high: 1 })[country.costLevel],
              )}
            />
            <ComparisonRow
              label="Monthly budget · local reference"
              countries={countries}
              render={(country) =>
                `${formatCurrencyAmount(country, country.intelligence.averageMonthlyBudget)} ${country.currencyCode}`
              }
            />
            <ComparisonRow
              label="Safety"
              countries={countries}
              render={(country) => `${country.intelligence.safetyScore}/100`}
              winners={getWinnerSlugs(
                countries,
                (country) => country.intelligence.safetyScore,
              )}
            />
            <ComparisonRow
              label="English access"
              countries={countries}
              render={(country) =>
                `${country.intelligence.englishFriendliness}/100`
              }
              winners={getWinnerSlugs(
                countries,
                (country) => country.intelligence.englishFriendliness,
              )}
            />
            <ComparisonRow
              label="Quality of life"
              countries={countries}
              render={(country) =>
                `${country.intelligence.qualityOfLifeScore}/100`
              }
              winners={getWinnerSlugs(
                countries,
                (country) => country.intelligence.qualityOfLifeScore,
              )}
            />
            <ComparisonRow
              label="Adaptation"
              countries={countries}
              render={getCountryRiskLabel}
            />
            <ComparisonRow
              label="Language"
              countries={countries}
              render={(country) => country.language}
            />
            <ComparisonRow
              label="Currency"
              countries={countries}
              render={(country) => country.currency}
            />
            <ComparisonRow
              label="Best goals"
              countries={countries}
              render={(country) => country.idealFor.map(getCountryGoalLabel).join(", ")}
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonRow({
  label,
  countries,
  render,
  winners = new Set<string>(),
}: {
  label: string;
  countries: Country[];
  render: (country: Country) => string;
  winners?: Set<string>;
}) {
  return (
    <tr className="border-b border-[var(--tgpi-border-soft)] last:border-b-0">
      <th
        scope="row"
        className="sticky left-0 z-10 bg-[#F4EFE5] p-4 font-extrabold text-[var(--tgpi-navy)]"
      >
        {label}
      </th>
      {countries.map((country) => {
        const winner = winners.has(country.slug);
        return (
          <td
            key={country.slug}
            className={`p-4 font-semibold ${winner ? "bg-[var(--tgpi-gold-soft)] text-[#5C420F]" : "text-[var(--tgpi-muted)]"}`}
          >
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

function getWinnerSlugs(
  countries: Country[],
  getValue: (country: Country) => number,
): Set<string> {
  const highestValue = Math.max(...countries.map(getValue));
  return new Set(
    countries
      .filter((country) => getValue(country) === highestValue)
      .map((country) => country.slug),
  );
}

function VerdictPick({
  label,
  countries,
  value,
}: {
  label: string;
  countries: Country[];
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] p-5">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-muted)]">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/countries/${country.slug}`}
            className="inline-flex min-h-10 items-center rounded-full border border-[var(--tgpi-border)] bg-white px-3 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            {country.emoji} {country.name}
          </Link>
        ))}
      </div>
      <p className="mt-3 text-sm font-extrabold text-[var(--tgpi-gold-strong)]">
        {countries.length > 1 ? "Shared · " : ""}
        {value}
      </p>
    </article>
  );
}

function DecisionLensPanel({ goal }: { goal: ComparisonGoal }) {
  const config = getComparisonGoalConfig(goal);
  const entries = Object.entries(config.weights) as [ComparisonSignal, number][];
  return (
    <section
      id="decision-lens"
      className="mt-7 scroll-mt-28 rounded-[28px] border border-[#B8C9DF] bg-[#EEF5FF] p-6 shadow-[var(--tgpi-shadow-soft)] sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#315F98]">
            Transparent scoring model
          </p>
          <h2 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)] sm:text-4xl">
            {config.label}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#334A64]">
            {config.description}
          </p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-5">
          {entries.map(([signal, weight]) => (
            <div
              key={signal}
              className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm"
            >
              <dt className="text-[11px] font-bold leading-5 text-[#52677E]">
                {getSignalLabel(signal)}
              </dt>
              <dd className="mt-2 text-2xl font-extrabold text-[var(--tgpi-navy)]">
                {weight}%
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ConnectedDecisionPath({
  country,
  goal,
}: {
  country: Country;
  goal: ComparisonGoal;
}) {
  const actions = [
    {
      number: "01",
      eyebrow: "Country Intelligence",
      title: `Interrogate ${country.name}`,
      text: "Open the full country profile and validate the national signals behind the shortlist.",
      href: `/countries/${country.slug}`,
      cta: "Open country intelligence",
    },
    {
      number: "02",
      eyebrow: "Documents OS",
      title: "Prepare the evidence",
      text: "Turn the selected direction into a country-aware review of documents and official requirements.",
      href: `/countries/${country.slug}#documents-to-verify`,
      cta: "Review document readiness",
    },
    {
      number: "03",
      eyebrow: "TGPI Learning",
      title: "Build the capability",
      text: `Develop the communication, judgment and adaptability that support the ${getComparisonGoalConfig(goal).shortLabel.toLowerCase()} objective.`,
      href: "/courses#learning-paths",
      cta: "Find a learning path",
    },
    {
      number: "04",
      eyebrow: "Global Key",
      title: "Keep the decision connected",
      text: "Return to one private workspace where comparisons, preparation and progress remain visible.",
      href: "/profile",
      cta: "Open my Global Key",
    },
  ] as const;

  return (
    <section className="mt-14 sm:mt-16">
      <SectionHeading
        eyebrow="From comparison to execution"
        id="connected-decision-path-title"
        title="A country decision should activate the rest of the TGPI system."
        text={`${country.name} currently leads this lens. TGPI connects that direction to deeper intelligence, documents, capability and private continuity instead of ending at a score.`}
      />
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <article
            key={action.number}
            className="group flex min-h-[290px] flex-col rounded-[26px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)] transition hover:-translate-y-1 hover:border-[var(--tgpi-gold)]/60"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                {action.eyebrow}
              </p>
              <span className="text-xl font-extrabold text-[var(--tgpi-gold)]/65">
                {action.number}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight text-[var(--tgpi-navy)]">
              {action.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-[var(--tgpi-muted)]">
              {action.text}
            </p>
            <Link
              href={action.href}
              className="mt-6 inline-flex min-h-11 items-center border-t border-[var(--tgpi-border-soft)] pt-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition group-hover:text-[var(--tgpi-gold-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              {action.cta} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComparisonStandard() {
  return (
    <section
      id="decision-standard"
      className="mt-14 scroll-mt-28 overflow-hidden rounded-[32px] border border-[var(--tgpi-gold)]/45 bg-white shadow-[var(--tgpi-shadow-soft)] sm:mt-16"
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="bg-[var(--tgpi-navy)] p-7 text-white sm:p-9 lg:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
            The TGPI Comparison Standard
          </p>
          <h2 className="mt-5 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] sm:text-5xl">
            A score creates direction. Evidence creates a decision.
          </h2>
          <p className="mt-6 text-sm leading-7 text-white/65 sm:text-base">
            TGPI does not present one universal “best country.” The system exposes
            how a result changes when the objective changes — and what must be
            verified before acting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2">
          <StandardCard
            number="01"
            title="Comparable signals"
            text="Cost uses relative bands, scores share one scale and local currencies remain visibly separate."
          />
          <StandardCard
            number="02"
            title="Visible weights"
            text="Every decision lens reveals how readiness, safety, language, quality and cost influence the result."
          />
          <StandardCard
            number="03"
            title="Context before certainty"
            text="A country-level signal never replaces city, timeline, identity, legal or financial validation."
          />
          <StandardCard
            number="04"
            title="Connected execution"
            text="The shortlist continues into country intelligence, document readiness, learning and the Global Key."
          />
        </div>
      </div>
    </section>
  );
}

function StandardCard({
  number,
  text,
  title,
}: {
  number: string;
  text: string;
  title: string;
}) {
  return (
    <article className="border-b border-[var(--tgpi-border-soft)] p-7 sm:border-r sm:p-8 sm:odd:border-r sm:even:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
        {number}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-[var(--tgpi-navy)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">{text}</p>
    </article>
  );
}

function IncompleteComparisonState({ hasCountry }: { hasCountry: boolean }) {
  return (
    <section className="mt-7 rounded-[30px] border border-[var(--tgpi-gold)]/55 bg-white p-7 text-center shadow-[var(--tgpi-shadow-soft)] sm:p-10">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
        Comparison incomplete
      </p>
      <h2 className="mx-auto mt-3 max-w-3xl font-[var(--tgpi-font-display)] text-4xl font-semibold text-[var(--tgpi-navy)]">
        {hasCountry
          ? "Keep this country and choose one credible alternative."
          : "Choose at least two valid countries to begin."}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--tgpi-muted)]">
        TGPI will not declare a country the winner of a one-country comparison.
        Build a meaningful decision set before interpreting any score.
      </p>
      <Link
        href="#comparison-builder"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
      >
        Choose another country
      </Link>
    </section>
  );
}

function ComparisonNotice({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "warning" | "information";
}) {
  const classes =
    tone === "warning"
      ? "border-[#E7B8B0] bg-[#FFF1EF] text-[#7F2E28]"
      : "border-[#B8C9DF] bg-[#EEF5FF] text-[#274968]";
  return (
    <p
      role="status"
      className={`mt-4 rounded-2xl border px-5 py-4 text-sm font-bold leading-6 ${classes}`}
    >
      {children}
    </p>
  );
}
