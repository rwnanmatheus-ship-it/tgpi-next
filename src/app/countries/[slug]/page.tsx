"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import CostOfLifeExplorer from "@/components/CostOfLifeExplorer";
import CurrencyExplorer from "@/components/CurrencyExplorer";
import { getCountryBySlug } from "@/data/countries";
import { auth, db } from "@/lib/firebase";
import { setCountryGoal } from "@/lib/set-country-goal";

type CountryPageProps = {
  params: {
    slug: string;
  };
};

export default function CountryDynamicPage({ params }: CountryPageProps) {
  const router = useRouter();
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [currentTargetCurrency, setCurrentTargetCurrency] = useState("USD");
  const [savingGoal, setSavingGoal] = useState(false);

  const countryData = getCountryBySlug(params.slug);

  useEffect(() => {
    async function loadPreferredCurrency() {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data?.preferredCurrency) {
            setPreferredCurrency(data.preferredCurrency);
            setCurrentTargetCurrency(data.preferredCurrency);
          }
        }
      } catch (error) {
        console.error("Could not load preferred currency:", error);
      }
    }

    loadPreferredCurrency();
  }, []);

  if (!countryData) {
    notFound();
  }

  const country = countryData;

  async function handleSetGoal() {
    try {
      setSavingGoal(true);
      await setCountryGoal(country.name, country.mainGoal);
      router.push("/dashboard");
    } catch (error) {
      console.error("Could not save country goal:", error);
    } finally {
      setSavingGoal(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="border-b border-yellow-700/10 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_35%),linear-gradient(to_bottom,#071021,#050816)]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-[1.45fr_.95fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-yellow-500/25 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                TGPI Country Pathway
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                {country.emoji} {country.name}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {country.longDescription}
              </p>

              <div className="mt-5 rounded-3xl border border-yellow-600/15 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  TGPI positioning
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  {country.heroNote}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleSetGoal}
                  disabled={savingGoal}
                  className="rounded-2xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {savingGoal ? "Saving..." : `Set ${country.name} as Your Goal`}
                </button>

                <Link
                  href="/countries"
                  className="rounded-2xl border border-yellow-500/40 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Back to Countries
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Region
                </div>
                <div className="mt-2 text-lg font-semibold text-yellow-400">
                  {country.region}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Main goal
                </div>
                <div className="mt-2 text-lg font-semibold text-yellow-400">
                  {country.mainGoal}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Language
                </div>
                <div className="mt-2 text-lg font-semibold text-yellow-400">
                  {country.language}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Currency
                </div>
                <div className="mt-2 text-lg font-semibold text-yellow-400">
                  {country.currencyCode}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 sm:col-span-2">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Capital
                </div>
                <div className="mt-2 text-lg font-semibold text-yellow-400">
                  {country.capital}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {country.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7 xl:col-span-1">
            <h2 className="text-2xl font-bold text-yellow-400">
              Country Overview
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {country.shortDescription}
            </p>

            <div className="mt-6 grid gap-3">
              {country.quickFacts.map((fact) => (
                <div
                  key={fact}
                  className="rounded-2xl border border-slate-800 bg-black/20 p-4 text-sm leading-7 text-slate-300"
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7 xl:col-span-2">
            <h2 className="text-2xl font-bold text-yellow-400">
              Cultural Signals
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {country.culturalSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-black/20 p-5"
                >
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h2 className="text-2xl font-bold text-yellow-400">
              Tourism & Discovery
            </h2>
            <div className="mt-6 grid gap-4">
              {country.tourismHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-black/20 p-5"
                >
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h2 className="text-2xl font-bold text-yellow-400">
              Documents & Preparation Advisory
            </h2>
            <div className="mt-6 grid gap-4">
              {country.documentsAdvisory.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-black/20 p-5"
                >
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-[28px] border border-yellow-700/15 bg-[linear-gradient(to_bottom,rgba(234,179,8,0.06),rgba(2,6,23,0.92))] p-7">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-yellow-400">
              TGPI Pathways for {country.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              These pathway blocks turn a country page into a premium product
              layer. They help users understand what kind of preparation matches
              their international objective.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {country.pathways.map((pathway) => (
              <div
                key={pathway.title}
                className="rounded-[24px] border border-slate-800 bg-slate-950 p-6"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {pathway.audience}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-yellow-400">
                  {pathway.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {pathway.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <CurrencyExplorer
          countryName={country.name}
          baseCurrency={country.currencyCode}
          userPreferredCurrency={preferredCurrency}
          onRateLoaded={({ rate, targetCurrency }) => {
            setCurrentRate(rate);
            setCurrentTargetCurrency(targetCurrency);
          }}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <CostOfLifeExplorer
          countryName={country.name}
          baseCurrency={country.currencyCode}
          targetCurrency={currentTargetCurrency}
          rate={currentRate}
          items={country.costOfLife}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
          <h2 className="text-3xl font-bold text-yellow-400">
            Related TGPI Courses
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This block prepares COUNTRIES for future monetization by linking
            each country to course pathways, completion systems, and premium
            progression logic.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {country.relatedCourses.map((course) => (
              <div
                key={course.title}
                className="rounded-[24px] border border-slate-800 bg-black/20 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-300">
                    {course.level}
                  </span>

                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {course.duration}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {course.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Designed to connect country-specific readiness with future
                  lessons, premium modules, and learner progression.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              Premium content base
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The country page now acts as a premium preparation environment,
              not just a destination card.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              Monetization ready
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Each country can evolve into paid pathways, locked modules,
              premium cultural intelligence, and guided preparation products.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              Safe expansion
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The architecture is now stronger for adding more countries without
              forcing visual overlap with Dashboard or other TGPI pages.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}