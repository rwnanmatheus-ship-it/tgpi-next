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
  getCountryRiskLabel,
} from "@/lib/countries";

type CountryPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: CountryPageProps) {
  const country = getCountry(params.slug);

  if (!country) {
    return {
      title: "Country not found | TGPI",
    };
  }

  return {
    title: `${country.name} | TGPI Country Intelligence`,
    description: country.shortDescription,
  };
}

export default function CountryPage({ params }: CountryPageProps) {
  const country = getCountry(params.slug);

  if (!country) notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <Link
          href="/countries"
          className="mb-6 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-[#D4AF37]/60 hover:text-white"
        >
          ← Back to countries
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 bg-gradient-to-br from-[#111118] via-[#080B14] to-black">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative p-6 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.15),transparent_35%)]" />

              <div className="relative">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                  TGPI Country Profile
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-6xl md:text-7xl">{country.emoji}</span>

                  <div>
                    <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                      {country.name}
                    </h1>
                    <p className="mt-2 text-slate-400">
                      {country.region} • {country.capital}
                    </p>
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                  {country.longDescription}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <SignalCard label="Language" value={country.language} />
                  <SignalCard label="Currency" value={country.currencyCode} />
                  <SignalCard label="Main goal" value={country.mainGoal} />
                </div>
              </div>
            </div>

            <div className="relative min-h-[360px] border-t border-white/10 bg-[#080B14] p-6 lg:border-l lg:border-t-0 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.28),transparent_38%)]" />

              <div className="relative grid gap-4">
                <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#F5D76E]">
                    TGPI Score
                  </p>
                  <p className="mt-2 text-5xl font-black text-[#D4AF37]">
                    {country.tgpiScore}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    {getCountryDecisionLabel(country)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    label="Quality of life"
                    value={`${country.intelligence.qualityOfLifeScore}/100`}
                  />
                  <MetricCard
                    label="Safety"
                    value={`${country.intelligence.safetyScore}/100`}
                  />
                  <MetricCard
                    label="English access"
                    value={`${country.intelligence.englishFriendliness}/100`}
                  />
                  <MetricCard
                    label="Monthly budget"
                    value={`${formatCurrencyAmount(
                      country,
                      country.intelligence.averageMonthlyBudget,
                    )} ${country.currencyCode}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
            <h2 className="text-2xl font-black text-[#D4AF37]">
              Cost of life
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Local estimates in {country.currencyCode}. Values are educational
              and should be validated before financial decisions.
            </p>

            <div className="mt-6 space-y-3">
              {country.costOfLife.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-sm font-bold text-slate-200">
                    {item.label}
                  </p>
                  <p className="font-black text-white">
                    {formatCurrencyAmount(country, item.amount)}{" "}
                    {country.currencyCode}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
              <h2 className="text-2xl font-black text-[#D4AF37]">
                Intelligence summary
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {country.intelligence.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>{getCountryCostLabel(country)}</Badge>
                <Badge>{getCountryRiskLabel(country)}</Badge>
                <Badge>{country.currency}</Badge>
              </div>
            </div>

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
            <h2 className="text-2xl font-black text-[#D4AF37]">
              Ideal goals
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
          </div>
        </section>
      </section>
    </main>
  );
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

type MetricCardProps = {
  label: string;
  value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
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