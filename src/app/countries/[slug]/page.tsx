"use client";

import CostOfLifeExplorer from "@/components/CostOfLifeExplorer";
import CurrencyExplorer from "@/components/CurrencyExplorer";
import { countries } from "@/data/countries";
import { auth, db } from "@/lib/firebase";
import {
  getUserMemory,
  saveLastVisitedCountry,
  toggleFavoriteCountry,
} from "@/lib/user-memory";
import { setCountryGoal } from "@/lib/set-country-goal";
import { trackCountryVisit } from "@/lib/user-stats";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CountryDynamicPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [currentTargetCurrency, setCurrentTargetCurrency] = useState("USD");
  const [userId, setUserId] = useState("");
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  const country = useMemo(() => {
    return countries.find((item) => item.slug === params?.slug);
  }, [params]);

  useEffect(() => {
    if (!country) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      setUserId(user.uid);

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data?.preferredCurrency) {
            setPreferredCurrency(data.preferredCurrency);
            setCurrentTargetCurrency(data.preferredCurrency);
          }
        }

        const memory = await getUserMemory(user.uid);
        setFavoriteCountries(memory.favoriteCountries || []);
        await saveLastVisitedCountry(user.uid, country.slug);
        await trackCountryVisit(user.uid, country.slug);
      } catch (error) {
        console.error("Could not load user memory:", error);
      }
    });

    return () => unsubscribe();
  }, [country]);

  if (!country) {
    notFound();
  }

  const safeCountry = country;
  const isFavorite = favoriteCountries.includes(safeCountry.slug);

  async function handleSetGoal() {
    await setCountryGoal(safeCountry.name, safeCountry.mainGoal);
    router.push("/dashboard");
  }

  async function handleToggleFavorite() {
    if (!userId) {
      setFavoriteMessage("Sign in to save favorites.");
      return;
    }

    try {
      setFavoriteLoading(true);
      setFavoriteMessage("");

      const result = await toggleFavoriteCountry(userId, safeCountry.slug);
      setFavoriteCountries(result.favorites);

      if (result.limitReached) {
        setFavoriteMessage("Free plan limit reached (3 favorites).");
        return;
      }

      setFavoriteMessage(
        result.isFavorite
          ? `${safeCountry.name} added to favorites.`
          : `${safeCountry.name} removed from favorites.`
      );
    } catch (error) {
      console.error(error);
      setFavoriteMessage("Could not update favorite.");
    } finally {
      setFavoriteLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <Link href="/" className="hover:text-yellow-300">
              Home
            </Link>
            <span>•</span>
            <Link href="/countries" className="hover:text-yellow-300">
              Countries
            </Link>
            <span>•</span>
            <span className="text-yellow-300">{safeCountry.name}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-start">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                {safeCountry.region} • {safeCountry.mainGoal}
              </p>

              <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                {safeCountry.emoji} {safeCountry.name}
              </h1>

              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {safeCountry.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleSetGoal}
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Set as Goal
                </button>

                <button
                  onClick={handleToggleFavorite}
                  disabled={favoriteLoading}
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10 disabled:opacity-60"
                >
                  {isFavorite ? "Remove Favorite" : "Save Favorite"}
                </button>

                <Link
                  href="/countries"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500"
                >
                  Back to Countries
                </Link>
              </div>

              {favoriteMessage ? (
                <p className="mt-4 text-sm text-yellow-300">{favoriteMessage}</p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {safeCountry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-5 text-2xl font-bold text-yellow-400">
                Country Snapshot
              </h2>

              <div className="space-y-4">
                <InfoCard label="Language" value={safeCountry.language} />
                <InfoCard label="Currency" value={safeCountry.currency} />
                <InfoCard label="Capital" value={safeCountry.capital} />
                <InfoCard label="Main Goal" value={safeCountry.mainGoal} />
                <InfoCard label="Region" value={safeCountry.region} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-yellow-400">
              Why this country matters
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              {safeCountry.name} is part of the TGPI global pathway system because
              it combines culture, opportunity, and strategic international
              relevance.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-yellow-400">Best for</h2>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>• Users exploring {safeCountry.mainGoal.toLowerCase()} opportunities</li>
              <li>• Users who want stronger cultural and practical readiness</li>
              <li>• People comparing cost, language, and everyday life</li>
              <li>• Building a premium international shortlist</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-yellow-400">Culture</h2>
            <p className="mt-4 leading-8 text-slate-300">{safeCountry.culture}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-yellow-400">Visa / Entry</h2>
            <p className="mt-4 leading-8 text-slate-300">{safeCountry.visa}</p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-3xl font-bold text-yellow-400">
            Famous Places
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {safeCountry.tourism.map((place) => (
              <span
                key={place}
                className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300"
              >
                {place}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <CurrencyExplorer
            countryName={safeCountry.name}
            baseCurrency={safeCountry.currencyCode}
            userPreferredCurrency={preferredCurrency}
            onRateLoaded={({ rate, targetCurrency }) => {
              setCurrentRate(rate);
              setCurrentTargetCurrency(targetCurrency);
            }}
          />
        </section>

        <section className="mb-8">
          <CostOfLifeExplorer
            countryName={safeCountry.name}
            baseCurrency={safeCountry.currencyCode}
            targetCurrency={currentTargetCurrency}
            rate={currentRate}
            items={safeCountry.costOfLife}
          />
        </section>

        <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Premium Preview
              </p>

              <h2 className="text-3xl font-bold text-yellow-400">
                Go deeper into {safeCountry.name}
              </h2>

              <p className="mt-4 max-w-3xl text-slate-300">
                Unlock a more advanced layer of country intelligence with deeper
                pathway guidance, expanded comparisons, and a stronger strategic
                shortlist experience.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-bold text-yellow-400">
                Premium unlocks
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• Expanded country comparison</li>
                <li>• Stronger personalization</li>
                <li>• More advanced pathway insights</li>
                <li>• Premium shortlist evolution</li>
              </ul>

              <Link
                href="/premium"
                className="mt-6 inline-block rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Unlock Premium
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}