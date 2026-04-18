"use client";

import { use, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";

import CostOfLifeExplorer from "@/components/CostOfLifeExplorer";
import CurrencyExplorer from "@/components/CurrencyExplorer";
import { countries } from "@/data/countries";
import { auth, db } from "@/lib/firebase";
import { setCountryGoal } from "@/lib/set-country-goal";
import {
  getFavoriteCountries,
  saveLastVisitedCountry,
  toggleFavoriteCountry,
} from "@/lib/user-profile-actions";
import { defaultUserProfile, UserProfile } from "@/lib/profile";
import { isPremium } from "@/lib/plan";

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function CountryDynamicPage({ params }: CountryPageProps) {
  const router = useRouter();
  const { slug } = use(params);

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [currentTargetCurrency, setCurrentTargetCurrency] = useState("USD");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile());

  const country = countries.find((item) => item.slug === slug);

  if (!country) {
    notFound();
    return null;
  }

  const safeCountry = country;
  const isFavorite = favorites.includes(safeCountry.name);
  const premiumActive = isPremium(profile.membershipPlan);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setAuthReady(true);

      if (!user) return;

      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          const data = snap.data() as UserProfile;
          setProfile(data);

          if (data?.preferredCurrency) {
            setPreferredCurrency(data.preferredCurrency);
            setCurrentTargetCurrency(data.preferredCurrency);
          }
        }

        const nextFavorites = await getFavoriteCountries();
        setFavorites(nextFavorites);

        await saveLastVisitedCountry(safeCountry.name);
      } catch (error) {
        console.error("Could not load user data:", error);
      }
    });

    return () => unsubscribe();
  }, [safeCountry.name]);

  async function handleSetGoal() {
    if (!firebaseUser) {
      router.push("/login");
      return;
    }

    try {
      setStatus("Saving your country goal...");
      await setCountryGoal(safeCountry.name, safeCountry.mainGoal);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setStatus("Could not save your goal.");
    }
  }

  async function handleFavoriteToggle() {
    if (!firebaseUser) {
      router.push("/login");
      return;
    }

    try {
      setStatus(isFavorite ? "Removing favorite..." : "Adding favorite...");
      const nextFavorites = await toggleFavoriteCountry(safeCountry.name);
      setFavorites(nextFavorites);
      setStatus(isFavorite ? "Favorite removed." : "Favorite added.");
    } catch (error) {
      console.error(error);
      setStatus("Could not update favorites.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        {!premiumActive ? (
          <section className="mb-8 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-white/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Unlock Premium Global Access
                </h2>
                <p className="mt-2 max-w-2xl text-slate-300">
                  Premium users unlock deeper country intelligence, stronger
                  comparison tools, and richer long-term global preparation.
                </p>
              </div>

              <Link
                href="/upgrade"
                className="inline-flex w-fit items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Upgrade Now
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8 md:p-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
              Country Pathway
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {safeCountry.mainGoal}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {safeCountry.difficultyLevel}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {safeCountry.continent}
            </span>

            {premiumActive ? (
              <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-300">
                Premium Active
              </span>
            ) : (
              <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm text-yellow-300">
                Free Plan
              </span>
            )}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-start">
            <div>
              <div className="mb-4 text-5xl">{safeCountry.emoji}</div>

              <h1 className="mb-5 text-4xl font-bold md:text-5xl">
                {safeCountry.name} Global Pathway
              </h1>

              <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
                {safeCountry.longDescription}
              </p>

              <div className="mb-6 flex flex-wrap gap-3">
                {safeCountry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Best For
                </p>

                <div className="flex flex-wrap gap-3">
                  {safeCountry.bestFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSetGoal}
                  disabled={!authReady}
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60"
                >
                  Set {safeCountry.name} as Your Goal
                </button>

                <button
                  onClick={handleFavoriteToggle}
                  disabled={!authReady}
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
                >
                  {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                </button>

                <Link
                  href="/countries"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Back to Countries
                </Link>
              </div>

              {status ? (
                <p className="mt-4 text-sm text-yellow-300">{status}</p>
              ) : null}

              {!firebaseUser && authReady ? (
                <p className="mt-3 text-sm text-slate-400">
                  Log in to save goals, favorites, and personalized country
                  actions.
                </p>
              ) : null}
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Language
                </p>
                <p className="text-xl font-semibold text-white">
                  {safeCountry.language}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Currency
                </p>
                <p className="text-xl font-semibold text-white">
                  {safeCountry.currency}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Capital
                </p>
                <p className="text-xl font-semibold text-white">
                  {safeCountry.capital}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Main Goal
                </p>
                <p className="text-xl font-semibold text-white">
                  {safeCountry.mainGoal}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-2xl font-bold text-yellow-400">
              Work Market Positioning
            </h2>
            <p className="leading-8 text-slate-300">
              {safeCountry.workMarket}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-2xl font-bold text-yellow-400">
              Integration Style
            </h2>
            <p className="leading-8 text-slate-300">
              {safeCountry.integrationStyle}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-2xl font-bold text-yellow-400">
              Language Difficulty
            </h2>
            <p className="leading-8 text-slate-300">
              {safeCountry.languageDifficulty}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-2xl font-bold text-yellow-400">
              Premium Insight
            </h2>
            <p className="leading-8 text-slate-300">
              {safeCountry.premiumInsight}
            </p>

            {!premiumActive ? (
              <Link
                href="/upgrade"
                className="mt-6 inline-flex rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/20"
              >
                Unlock Premium Insight
              </Link>
            ) : null}
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Why Users Choose {safeCountry.name}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {safeCountry.topReasons.map((reason) => (
              <div
                key={reason}
                className="rounded-2xl border border-white/10 bg-black/10 p-5"
              >
                <p className="font-medium text-white">{reason}</p>
              </div>
            ))}
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

        <div className="mt-8">
          {premiumActive ? (
            <CostOfLifeExplorer
              countryName={safeCountry.name}
              baseCurrency={safeCountry.currencyCode}
              targetCurrency={currentTargetCurrency}
              rate={currentRate}
              items={safeCountry.costOfLife}
            />
          ) : (
            <section className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-white">
                Premium Feature Locked
              </h2>

              <p className="mb-6 max-w-3xl leading-8 text-slate-300">
                Detailed cost-of-life intelligence is part of Premium Global
                Access. Upgrade to unlock deeper planning tools and stronger
                country comparison insights.
              </p>

              <Link
                href="/upgrade"
                className="inline-flex rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Upgrade to Unlock
              </Link>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}