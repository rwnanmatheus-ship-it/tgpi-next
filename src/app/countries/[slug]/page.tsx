"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import CostOfLifeExplorer from "@/components/CostOfLifeExplorer";
import CurrencyExplorer from "@/components/CurrencyExplorer";
import LifeSimulator from "@/components/LifeSimulator";
import { getCountryBySlug } from "@/data/countries";
import { auth, db } from "@/lib/firebase";
import { setCountryGoal } from "@/lib/set-country-goal";

type CountryPageProps = {
  params: {
    slug: string;
  };
};

function difficultyLabel(value?: "easy" | "medium" | "hard") {
  if (!value) return "Not defined";
  if (value === "easy") return "Easy";
  if (value === "medium") return "Medium";
  return "Hard";
}

function scoreLabel(value?: number) {
  if (typeof value !== "number") return "—";
  return `${value}/10`;
}

export default function CountryDynamicPage({ params }: CountryPageProps) {
  const router = useRouter();
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [currentTargetCurrency, setCurrentTargetCurrency] = useState("USD");

  const country = getCountryBySlug(params.slug);

  if (!country) {
    notFound();
  }

  const safeCountry = country;

  useEffect(() => {
    async function loadPreferredCurrency() {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists()) return;

        const data = snap.data();
        if (typeof data?.preferredCurrency === "string" && data.preferredCurrency) {
          setPreferredCurrency(data.preferredCurrency);
          setCurrentTargetCurrency(data.preferredCurrency);
        }
      } catch (error) {
        console.error("Could not load preferred currency:", error);
      }
    }

    loadPreferredCurrency();
  }, []);

  async function handleSetGoal() {
    try {
      await setCountryGoal(safeCountry.name, safeCountry.mainGoal);
      router.push("/dashboard");
    } catch (error) {
      console.error("Could not set country goal:", error);
    }
  }

  const intelligence = safeCountry.intelligence;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                Country Pathway • {safeCountry.name} • {safeCountry.mainGoal}
              </p>

              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {safeCountry.emoji} {safeCountry.name} Global Pathway
              </h1>

              <p className="max-w-3xl text-slate-300">
                {safeCountry.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleSetGoal}
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Set {safeCountry.name} as Your Goal
                </button>

                <a
                  href="/countries"
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Back to Countries
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Language
                </strong>
                <p className="text-sm text-slate-300">{safeCountry.language}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Currency
                </strong>
                <p className="text-sm text-slate-300">{safeCountry.currency}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Capital
                </strong>
                <p className="text-sm text-slate-300">{safeCountry.capital}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Main Goal
                </strong>
                <p className="text-sm text-slate-300">{safeCountry.mainGoal}</p>
              </div>
            </div>
          </div>
        </section>

        <CurrencyExplorer
          countryName={safeCountry.name}
          baseCurrency={safeCountry.currencyCode}
          userPreferredCurrency={preferredCurrency}
          onRateLoaded={({ rate, targetCurrency }) => {
            setCurrentRate(rate);
            setCurrentTargetCurrency(targetCurrency);
          }}
        />

        <CostOfLifeExplorer
          countryName={safeCountry.name}
          baseCurrency={safeCountry.currencyCode}
          targetCurrency={currentTargetCurrency}
          rate={currentRate}
          items={safeCountry.costOfLife}
        />

        <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
          <div className="mb-6">
            <h2 className="mb-2 text-3xl font-bold text-yellow-400">
              Country Intelligence
            </h2>
            <p className="max-w-3xl text-slate-300">
              Strategic reference indicators to help users understand the
              environment, adaptation context, and practical accessibility of{" "}
              {safeCountry.name}.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                Immigration Difficulty
              </strong>
              <p className="text-sm text-slate-300">
                {difficultyLabel(intelligence?.immigrationDifficulty)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                Quality of Life
              </strong>
              <p className="text-sm text-slate-300">
                {scoreLabel(intelligence?.qualityOfLifeScore)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                English Friendliness
              </strong>
              <p className="text-sm text-slate-300">
                {scoreLabel(intelligence?.englishFriendliness)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                Safety
              </strong>
              <p className="text-sm text-slate-300">
                {scoreLabel(intelligence?.safetyScore)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                Avg. Budget
              </strong>
              <p className="text-sm text-slate-300">
                {typeof intelligence?.averageMonthlyBudget === "number"
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: safeCountry.currencyCode,
                      maximumFractionDigits: 0,
                    }).format(intelligence.averageMonthlyBudget)
                  : "—"}
              </p>
            </div>
          </div>
        </section>

        <LifeSimulator
          countryName={safeCountry.name}
          currencyCode={safeCountry.currencyCode}
          items={safeCountry.costOfLife}
        />

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <div className="mb-5">
            <h2 className="text-3xl font-bold text-yellow-400">
              Country Highlights
            </h2>
            <p className="text-sm text-slate-400">
              Key elements of the {safeCountry.name} pathway.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {safeCountry.tags.map((tag) => (
              <div
                key={tag}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  {tag}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  This learning dimension helps users understand and prepare for{" "}
                  {safeCountry.name} through focused international readiness.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
            <h3 className="mb-3 text-2xl font-bold text-yellow-400">
              Why {safeCountry.name} Matters
            </h3>
            <p className="text-sm leading-7 text-slate-300">
              {safeCountry.name} offers a powerful pathway for international growth,
              cultural learning, and practical preparation through structured
              language and integration-focused education.
            </p>
          </div>

          <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
            <h3 className="mb-3 text-2xl font-bold text-yellow-400">
              Who This Pathway Is For
            </h3>
            <p className="text-sm leading-7 text-slate-300">
              Ideal for learners, professionals, expats, travelers, and anyone
              seeking meaningful country-specific readiness through TGPI.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}