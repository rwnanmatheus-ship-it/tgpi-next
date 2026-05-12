// src/app/countries/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatCurrencyAmount,
  getAllCountrySlugs,
  getCountry,
  getCountryCostLabel,
  getCountryDecisionLabel,
  getCountryGoalLabel,
  getCountryImageAlt,
  getCountryImageUrl,
  getCountryPrimaryDecision,
  getCountryRiskLabel,
  getRelatedCountries,
  type Country,
} from "@/lib/countries";

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getCountry(slug);

  if (!country) {
    return {
      title: "Country not found | TGPI",
    };
  }

  return {
    title: `${country.name} | TGPI Country Intelligence Report`,
    description: `${country.name} country intelligence report: cost, safety, language, adaptation, quality of life and TGPI strategic readiness.`,
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getCountry(slug);

  if (!country) notFound();

  const relatedCountries = getRelatedCountries(country, 3);
  const imageUrl = getCountryImageUrl(country);
  const imageAlt = getCountryImageAlt(country);

  const budget = `${formatCurrencyAmount(
    country,
    country.intelligence.averageMonthlyBudget,
  )} ${country.currencyCode}`;

  const scoreSignals = [
    {
      label: "TGPI score",
      value: country.tgpiScore,
      description: getCountryDecisionLabel(country),
    },
    {
      label: "Quality of life",
      value: country.intelligence.qualityOfLifeScore,
      description: "Lifestyle, infrastructure and daily-life signal.",
    },
    {
      label: "Safety",
      value: country.intelligence.safetyScore,
      description: "Risk awareness and general stability signal.",
    },
    {
      label: "English access",
      value: country.intelligence.englishFriendliness,
      description: "Ease of navigation for English speakers.",
    },
  ];

  const snapshot = [
    { label: "Region", value: country.region },
    { label: "Capital", value: country.capital },
    { label: "Language", value: country.language },
    { label: "Currency", value: country.currency },
    { label: "Cost profile", value: getCountryCostLabel(country) },
    { label: "Adaptation", value: getCountryRiskLabel(country) },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <Link
            href="/countries"
            className="inline-flex w-fit rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-[#D4AF37]/60 hover:text-white"
          >
            ← Back to countries
          </Link>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/compare"
              className="rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-2 text-sm font-bold text-[#BFDBFE] transition hover:border-[#38BDF8]/60"
            >
              Compare country
            </Link>
            <Link
              href="/ranking"
              className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-sm font-bold text-[#F5D76E] transition hover:border-[#F5D76E]/60"
            >
              View rankings
            </Link>
          </div>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 bg-gradient-to-br from-[#111118] via-[#080B14] to-black shadow-2xl shadow-black/50">
          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#050505]/85 to-[#050505]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.24),transparent_36%)]" />

            <div className="relative p-6 md:p-10">
              <div className="mb-5 inline-flex rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#F5D76E]">
                TGPI Country Intelligence Report
              </div>

              <div className="flex items-start gap-5">
                <span className="text-6xl md:text-8xl">{country.emoji}</span>

                <div className="min-w-0">
                  <h1 className="text-4xl font-black tracking-tight md:text-6xl lg:text-7xl">
                    {country.name}
                  </h1>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {country.region} • {country.capital}
                  </p>
                </div>
              </div>

              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300">
                {country.longDescription}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <SignalCard label="Main goal" value={country.mainGoal} />
                <SignalCard label="Monthly budget" value={budget} />
                <SignalCard label="Currency" value={country.currencyCode} />
              </div>
            </div>

            <div className="relative border-t border-white/10 bg-black/25 p-6 lg:border-l lg:border-t-0 md:p-10">
              <div className="rounded-[1.75rem] border border-[#D4AF37]/25 bg-[#D4AF37]/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-[#F5D76E]">
                  TGPI Verdict
                </p>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-6xl font-black text-[#D4AF37]">
                      {country.tgpiScore}
                    </p>
                    <p className="mt-2 text-lg font-black text-white">
                      {getCountryDecisionLabel(country)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-right">
                    <p className="text-xs text-slate-500">Adaptation</p>
                    <p className="mt-1 font-black text-white">
                      {country.difficulty}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {country.intelligence.summary}
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                {scoreSignals.slice(1).map((signal) => (
                  <ScoreBar
                    key={signal.label}
                    label={signal.label}
                    value={signal.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Country snapshot
            </p>
            <h2 className="mt-2 text-2xl font-black">Core facts</h2>

            <div className="mt-6 space-y-3">
              {snapshot.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm font-black text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Score breakdown
            </p>
            <h2 className="mt-2 text-2xl font-black">Decision signals</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {scoreSignals.map((signal) => (
                <ScorePanel
                  key={signal.label}
                  label={signal.label}
                  value={signal.value}
                  description={signal.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Cost intelligence
            </p>
            <h2 className="mt-2 text-2xl font-black">Cost of life</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Local estimates in {country.currencyCode}. Values are educational
              and should be validated before financial decisions.
            </p>

            <div className="mt-6 space-y-4">
              {country.costOfLife.map((item) => (
                <CostRow
                  key={item.label}
                  label={item.label}
                  value={`${formatCurrencyAmount(country, item.amount)} ${
                    country.currencyCode
                  }`}
                  percentage={getCostPercentage(
                    item.amount,
                    country.intelligence.averageMonthlyBudget,
                  )}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <InsightGrid
              title="Strengths"
              items={country.intelligence.strengths}
              tone="positive"
            />

            <InsightGrid
              title="Warnings"
              items={country.intelligence.warnings}
              tone="warning"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <InsightGrid
            title="Best for"
            items={country.intelligence.bestFor}
            tone="blue"
          />

          <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Fit profile
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Ideal goals and tags
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {country.idealFor.map((goal) => (
                <Badge key={goal}>{getCountryGoalLabel(goal)}</Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {country.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#2563EB]/25 bg-[#2563EB]/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-[#93C5FD]">
                TGPI Decision Rule
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Do not choose {country.name} because it looks attractive. Choose
                it only if cost, language, safety, adaptation and long-term
                direction match your current profile.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
          <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Related countries
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Compare similar strategic environments.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {getCountryPrimaryDecision(country)}
              </p>
            </div>

            <div className="grid gap-3">
              {relatedCountries.map((related) => (
                <RelatedCountryCard key={related.slug} country={related} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5D76E]">
                Strategic next step
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Compare {country.name} before making a decision.
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                A country profile gives context. A comparison reveals trade-offs.
                Use TGPI to compare this country against another destination by
                cost, safety, language and strategic fit.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/compare"
                className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-center text-sm font-black text-black transition hover:bg-[#F5D76E]"
              >
                Compare now
              </Link>

              <Link
                href="/countries"
                className="rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37]/60"
              >
                Explore more countries
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#0B0F19] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Data note
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            TGPI country intelligence is educational and strategic. Cost, safety,
            immigration, tax, salary and local conditions vary by city, source
            and time. Validate official sources before legal, financial or
            relocation decisions.
          </p>
        </section>
      </section>
    </main>
  );
}

function getCostPercentage(amount: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.min(Math.max(Math.round((amount / total) * 100), 4), 100);
}

type SignalCardProps = {
  label: string;
  value: string;
};

function SignalCard({ label, value }: SignalCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 truncate font-black text-white">{value}</p>
    </div>
  );
}

type ScoreBarProps = {
  label: string;
  value: number;
};

function ScoreBar({ label, value }: ScoreBarProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-200">{label}</p>
        <p className="text-sm font-black text-[#D4AF37]">{value}/100</p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#38BDF8]"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

type ScorePanelProps = {
  label: string;
  value: number;
  description: string;
};

function ScorePanel({ label, value, description }: ScorePanelProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-black text-white">{label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>

        <p className="shrink-0 text-2xl font-black text-[#D4AF37]">
          {value}
        </p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#2563EB]"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

type CostRowProps = {
  label: string;
  value: string;
  percentage: number;
};

function CostRow({ label, value, percentage }: CostRowProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-slate-200">{label}</p>
        <p className="text-sm font-black text-white">{value}</p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#38BDF8]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

type BadgeProps = {
  children: React.ReactNode;
};

function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F5D76E]">
      {children}
    </span>
  );
}

type InsightGridProps = {
  title: string;
  items: string[];
  tone: "positive" | "warning" | "blue";
};

function InsightGrid({ title, items, tone }: InsightGridProps) {
  const toneClass =
    tone === "warning"
      ? "border-red-500/20 bg-red-500/5"
      : tone === "blue"
        ? "border-[#2563EB]/25 bg-[#2563EB]/10"
        : "border-[#D4AF37]/20 bg-[#D4AF37]/10";

  return (
    <div className={`rounded-[1.5rem] border p-6 ${toneClass}`}>
      <h2 className="text-2xl font-black text-white">{title}</h2>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

type RelatedCountryCardProps = {
  country: Country;
};

function RelatedCountryCard({ country }: RelatedCountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-[#D4AF37]/60"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="text-3xl">{country.emoji}</span>

        <div className="min-w-0">
          <p className="truncate font-black text-white">{country.name}</p>
          <p className="mt-1 truncate text-xs text-slate-500">
            {country.region} • {country.capital}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-xs text-slate-500">TGPI</p>
        <p className="text-lg font-black text-[#D4AF37]">
          {country.tgpiScore}
        </p>
      </div>
    </Link>
  );
}