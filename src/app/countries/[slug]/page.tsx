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
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function CountryDynamicPage({ params }: CountryPageProps) {
  const router = useRouter();
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [currentTargetCurrency, setCurrentTargetCurrency] = useState("USD");
  const [userId, setUserId] = useState("");
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }

    loadParams();
  }, [params]);

  const country = useMemo(() => {
    return countries.find((item) => item.slug === slug);
  }, [slug]);

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
      } catch (error) {
        console.error("Could not load user memory:", error);
      }
    });

    return () => unsubscribe();
  }, [country]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            Loading country...
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    notFound();
  }

  const safeCountry = country;

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

  const isFavorite = favoriteCountries.includes(safeCountry.slug);

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
      </div>
    </div>
  );
}