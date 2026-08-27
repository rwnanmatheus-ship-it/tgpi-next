import type { Metadata } from "next";
import Link from "next/link";
import CountriesExplorerV3 from "@/components/countries/CountriesExplorerV3";
import CountriesHero from "@/components/countries/CountriesHero";
import CountriesLearningOS from "@/components/countries/CountriesLearningOS";
import CountriesStructuredData from "@/components/countries/CountriesStructuredData";
import CountriesSystemRail from "@/components/countries/CountriesSystemRail";
import CountriesWorldJourney from "@/components/countries/CountriesWorldJourney";
import {
  getAllGoals,
  getAllRegions,
  getCountryExplorerItems,
} from "@/lib/countries";

export const metadata: Metadata = {
  title: "Country Intelligence — Compare 195 Countries | TGPI",
  description:
    "Explore and compare 195 countries through cost, safety, language, education, careers, culture and mobility with TGPI Country Intelligence.",
  alternates: {
    canonical: "/countries",
  },
  openGraph: {
    title: "TGPI Country Intelligence — Understand a Country Before You Choose",
    description:
      "Build a global shortlist through 195 connected country profiles, an interactive world atlas and a consistent decision framework.",
    url: "/countries",
    type: "website",
    images: [
      {
        url: "/images/countries/tgpi-country-intelligence-observatory-v1.webp",
        width: 1983,
        height: 793,
        alt: "TGPI Global Country Intelligence Observatory",
      },
    ],
  },
};

export default function CountriesPage() {
  const countries = getCountryExplorerItems();
  const regions = getAllRegions();
  const goals = getAllGoals();

  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <CountriesStructuredData countries={countries} />

      <div className="mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <CountriesHero
          countryCount={countries.length}
          regionCount={regions.length}
        />

        <CountriesSystemRail />

        <CountriesWorldJourney countries={countries} />

        <section
          id="country-explorer"
          className="mt-8 scroll-mt-24 rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-4 shadow-[var(--tgpi-shadow-premium)] sm:p-6 lg:p-8"
        >
          <div className="grid gap-5 border-b border-[var(--tgpi-border)] pb-6 lg:grid-cols-[1fr_.64fr] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
                TGPI Academic Country Index
              </p>
              <h2 className="mt-3 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.65rem,5vw,4.45rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[var(--tgpi-navy)]">
                Build a shortlist you can explain.
              </h2>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--tgpi-blue-soft)] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-blue)]">195 profiles</span>
                <span className="rounded-full bg-[var(--tgpi-teal-soft)] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-teal)]">6 decision lenses</span>
                <span className="rounded-full bg-[var(--tgpi-gold-soft)] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-gold-strong)]">3-country comparison</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">
                Search visually or scan the compact index. Cost is treated as a profile,
                because nominal values across currencies are not directly comparable.
              </p>
            </div>
          </div>

          <CountriesExplorerV3 countries={countries} goals={goals} regions={regions} />
        </section>

        <CountriesLearningOS />

        <section aria-labelledby="country-research-standard" className="mt-8 rounded-[28px] border border-[var(--tgpi-gold)]/45 bg-[linear-gradient(110deg,var(--tgpi-gold-soft),var(--tgpi-surface))] p-6">
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
