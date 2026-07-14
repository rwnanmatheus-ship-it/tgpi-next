// src/app/countries/page.tsx

import Link from "next/link";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";
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
    "Explore 195 countries by cost, safety, language, culture, adaptation difficulty and TGPI strategic readiness.",
};

export default function CountriesPage() {
  const countries = getAllCountries();
  const regions = getAllRegions();
  const topScoreCountries = getTopCountriesByScore(5);
  const lowestBudgetCountries = getLowestBudgetCountries(5);
  const safestCountries = getHighestSafetyCountries(5);
  const averageScore = Math.round(countries.reduce((sum, country) => sum + country.tgpiScore, 0) / countries.length);
  const averageSafety = Math.round(countries.reduce((sum, country) => sum + country.intelligence.safetyScore, 0) / countries.length);
  const averageEnglish = Math.round(countries.reduce((sum, country) => sum + country.intelligence.englishFriendliness, 0) / countries.length);
  const lowCostCount = countries.filter((country) => country.costLevel === "low").length;
  const highScoreCount = countries.filter((country) => country.tgpiScore >= 85).length;
  const easyAdaptationCount = countries.filter((country) => country.difficulty === "easy").length;
  const regionDistribution = regions
    .map((region) => ({ region, count: countries.filter((country) => country.region === region).length }))
    .sort((a, b) => b.count - a.count);
  const strategicSignals = [
    { label: "High-score countries", value: highScoreCount, detail: "TGPI score 85+" },
    { label: "Low-cost profiles", value: lowCostCount, detail: "Lower estimated cost pressure" },
    { label: "Easy adaptation", value: easyAdaptationCount, detail: "Lower friction entry" },
  ];

  return (
    <main className="min-h-screen bg-[#F8F5EE] text-[#0B0B0B]">
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <section className="overflow-hidden rounded-[2.5rem] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_45px_120px_rgba(11,31,58,0.12)]">
          <div className="grid lg:grid-cols-[1fr_0.92fr]">
            <div className="relative flex flex-col justify-center p-7 md:p-10 lg:p-14">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(181,138,42,0.16),transparent_35%),linear-gradient(180deg,#FFFDF8_0%,#F8F5EE_100%)]" />
              <div className="mb-5 w-fit rounded-full border border-[#D9BD70] bg-[#FFF7DE] px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#8A5B09]">
                TGPI Country Intelligence
              </div>
              <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#0B0B0B] md:text-7xl">
                Compare the world before you choose your next country.
              </h1>
              <p className="mt-6 max-w-3xl text-sm leading-7 text-[#566070] md:text-base">
                Explore 195 country profiles through TGPI decision signals: cost pressure, safety, language access, adaptation difficulty, quality of life and strategic readiness.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
                <HeroMetric label="Countries" value={String(countries.length)} />
                <HeroMetric label="Regions" value={String(regions.length)} />
                <HeroMetric label="Avg TGPI score" value={`${averageScore}/100`} />
                <HeroMetric label="Avg safety" value={`${averageSafety}/100`} />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#country-explorer" className="rounded-2xl bg-[#0B1F3A] px-5 py-3 text-center text-sm font-black text-white shadow-[0_18px_45px_rgba(11,31,58,0.18)] transition hover:bg-[#132B4C]">
                  Explore 195 countries
                </a>
                <Link href="/compare" className="rounded-2xl border border-[#D9BD70] bg-[#FFF7DE] px-5 py-3 text-center text-sm font-black text-[#8A5B09] transition hover:bg-[#F8E7B4]">
                  Compare countries
                </Link>
              </div>
            </div>

            <div className="relative min-h-[560px]">
              <TGPIEditorialVisual
                variant="hero"
                id="countries-hero"
                ariaLabel="Authorial TGPI global country intelligence illustration"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/72 via-[#0B1F3A]/8 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-[28px] border border-white/20 bg-[#FFFDF8]/94 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl md:inset-x-7 md:bottom-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.23em] text-[#9A6A12]">Global decision signals</p>
                    <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0B1F3A]">A system, not a destination list.</h2>
                  </div>
                  <span className="rounded-full bg-[#0B1F3A] px-3 py-1 text-xs font-black text-white">195 profiles</span>
                </div>
                <div className="mt-5 space-y-3">
                  <SignalBar label="Strategic readiness" value={averageScore} suffix="/100" />
                  <SignalBar label="Safety average" value={averageSafety} suffix="/100" />
                  <SignalBar label="English access" value={averageEnglish} suffix="/100" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <RankingCard title="Highest TGPI score" countries={topScoreCountries} />
          <RankingCard title="Lowest monthly budget" countries={lowestBudgetCountries} mode="budget" />
          <RankingCard title="Highest safety" countries={safestCountries} mode="safety" />
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-[#D8D2C4] bg-white p-6 shadow-[0_24px_70px_rgba(11,31,58,0.07)]">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9A6A12]">Decision framework</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-[#0B0B0B]">Choose countries by system, not emotion.</h2>
            <p className="mt-4 text-sm leading-7 text-[#566070]">TGPI evaluates countries as decision environments. The goal is not to find a perfect place. The goal is to understand fit, friction, cost, language access, risk and long-term potential.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <FrameworkItem title="Cost pressure" text="Monthly budget and cost level." />
              <FrameworkItem title="Adaptation" text="Language, difficulty and friction." />
              <FrameworkItem title="Safety" text="Risk awareness and stability signal." />
              <FrameworkItem title="Strategic fit" text="TGPI score and goal alignment." />
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.07)]">
            <TGPIEditorialVisual
              variant="compare"
              id="countries-framework"
              ariaLabel="Authorial TGPI comparison framework illustration"
              className="aspect-[16/9] w-full"
            />
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9A6A12]">Strategic signals</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {strategicSignals.map((signal) => (
                  <div key={signal.label} className="rounded-2xl border border-[#D8D2C4] bg-[#FBF8F1] p-4">
                    <p className="text-2xl font-black text-[#9A6A12]">{signal.value}</p>
                    <p className="mt-1 text-xs font-bold text-[#0B1F3A]">{signal.label}</p>
                    <p className="mt-1 text-[11px] leading-4 text-[#64748B]">{signal.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-[#D8D2C4] bg-white p-6 shadow-[0_24px_70px_rgba(11,31,58,0.07)]">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9A6A12]">Region distribution</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#0B0B0B]">Global coverage map</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">{regionDistribution.map((item) => <RegionRow key={item.region} region={item.region} count={item.count} total={countries.length} />)}</div>
        </section>

        <section id="country-explorer" className="mt-12 scroll-mt-24 rounded-[2.25rem] border border-[#D8D2C4] bg-[#FFFDF8] p-5 shadow-[0_35px_100px_rgba(11,31,58,0.1)] md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9A6A12]">Country Explorer</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.04em] text-[#0B0B0B] md:text-6xl">Search, filter and compare 195 countries.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#566070]">Use this explorer as the first layer of international planning. Data is educational and estimated. Always validate official legal, visa, tax and financial information before making decisions.</p>
          </div>
          <CountriesExplorer countries={countries} />
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-[#D9BD70] bg-[#FFF7DE] p-6 shadow-[0_24px_70px_rgba(154,106,18,0.1)]">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9A6A12]">Data note</p>
              <p className="mt-2 text-sm leading-7 text-[#4A3B1B]">TGPI country intelligence is designed for strategic education. Costs, safety, immigration rules, salaries and local conditions can change by city, source and time. Use this system to compare, not to make blind decisions.</p>
            </div>
            <Link href="/compare" className="rounded-2xl bg-[#0B1F3A] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#132B4C]">Start comparison</Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[#D8D2C4] bg-white p-5 shadow-sm"><p className="text-xs text-[#64748B]">{label}</p><p className="mt-2 text-3xl font-black text-[#9A6A12]">{value}</p></div>;
}

function SignalBar({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return <div className="rounded-2xl border border-[#D8D2C4] bg-[#FBF8F1] p-4"><div className="flex items-center justify-between gap-4"><p className="text-sm font-bold text-[#0B1F3A]">{label}</p><p className="text-sm font-black text-[#9A6A12]">{value}{suffix}</p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E7E0D3]"><div className="h-full rounded-full bg-gradient-to-r from-[#C8A24A] to-[#0B1F3A]" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} /></div></div>;
}

function RankingCard({ title, countries, mode = "score" }: { title: string; countries: Country[]; mode?: "score" | "budget" | "safety" }) {
  return <div className="rounded-[1.75rem] border border-[#D8D2C4] bg-white p-5 shadow-[0_24px_70px_rgba(11,31,58,0.07)]"><h2 className="font-serif text-2xl font-semibold text-[#0B1F3A]">{title}</h2><div className="mt-5 space-y-3">{countries.map((country, index) => { const value = mode === "budget" ? `${formatCurrencyAmount(country, country.intelligence.averageMonthlyBudget)} ${country.currencyCode}` : mode === "safety" ? `${country.intelligence.safetyScore}/100` : `${country.tgpiScore}/100`; return <Link key={country.slug} href={`/countries/${country.slug}`} className="flex items-center justify-between gap-4 rounded-2xl border border-[#D8D2C4] bg-[#FBF8F1] p-4 transition hover:border-[#C8A24A]"><div className="flex min-w-0 items-center gap-3"><span className="text-xs font-bold text-[#64748B]">#{index + 1}</span><span className="text-2xl">{country.emoji}</span><div className="min-w-0"><p className="truncate font-bold text-[#0B1F3A]">{country.name}</p><p className="truncate text-xs text-[#64748B]">{country.region}</p></div></div><p className="shrink-0 text-sm font-black text-[#9A6A12]">{value}</p></Link>; })}</div></div>;
}

function FrameworkItem({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-[#D8D2C4] bg-[#FBF8F1] p-4"><p className="font-black text-[#0B1F3A]">{title}</p><p className="mt-1 text-sm leading-6 text-[#566070]">{text}</p></div>;
}

function RegionRow({ region, count, total }: { region: string; count: number; total: number }) {
  const percentage = Math.round((count / total) * 100);
  return <div className="rounded-2xl border border-[#D8D2C4] bg-[#FBF8F1] p-4"><div className="flex items-center justify-between gap-4"><p className="font-bold text-[#0B1F3A]">{region}</p><p className="text-sm font-black text-[#9A6A12]">{count} countries</p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E7E0D3]"><div className="h-full rounded-full bg-gradient-to-r from-[#C8A24A] to-[#0B1F3A]" style={{ width: `${percentage}%` }} /></div></div></div>;
}
