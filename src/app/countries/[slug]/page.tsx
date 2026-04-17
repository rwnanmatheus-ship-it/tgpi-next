"use client";

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
import { doc, getDoc } from "firebase/firestore";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

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

  const country = countries.find((item) => item.slug === slug);

if (!country) {
  notFound();
  return null; // 👈 ESSA LINHA RESOLVE O ERRO
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setAuthReady(true);

      if (!user || !country) return;

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();

          if (data?.preferredCurrency) {
            setPreferredCurrency(data.preferredCurrency);
            setCurrentTargetCurrency(data.preferredCurrency);
          }
        }

        const nextFavorites = await getFavoriteCountries();
        setFavorites(nextFavorites);

        await saveLastVisitedCountry(country.name);
      } catch (error) {
        console.error("Could not load user data:", error);
      }
    });

    return () => unsubscribe();
  }, [country]);

  if (!country) {
    notFound();
  }

  const isFavorite = favorites.includes(country.name);

  async function handleSetGoal() {
  if (!firebaseUser) {
    router.push("/login");
    return;
  }

  if (!country) return;

  try {
    setStatus("Salvando sua meta de país...");
    await setCountryGoal(country.name, country.mainGoal);
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
      const nextFavorites = await toggleFavoriteCountry(country.name);
      setFavorites(nextFavorites);
      setStatus(isFavorite ? "Favorite removed." : "Favorite added.");
    } catch (error) {
      console.error(error);
      setStatus("Could not update favorites.");
    }
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                Country Pathway • {country.name} • {country.mainGoal}
              </p>

              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {country.emoji} {country.name} Global Pathway
              </h1>

              <p className="max-w-3xl text-slate-300">
                {country.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleSetGoal}
                  disabled={!authReady}
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60"
                >
                  Set {country.name} as Your Goal
                </button>

                <button
                  onClick={handleFavoriteToggle}
                  disabled={!authReady}
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10 disabled:opacity-60"
                >
                  {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                </button>

                <a
                  href="/countries"
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Back to Countries
                </a>
              </div>

              {status ? (
                <p className="mt-4 text-sm text-yellow-300">{status}</p>
              ) : null}

              {!firebaseUser && authReady ? (
                <p className="mt-3 text-sm text-slate-400">
                  Log in to save favorites, goals, and personalized country actions.
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Language
                </strong>
                <p className="text-sm text-slate-300">{country.language}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Currency
                </strong>
                <p className="text-sm text-slate-300">{country.currency}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Capital
                </strong>
                <p className="text-sm text-slate-300">{country.capital}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="mb-1 block text-lg text-yellow-400">
                  Main Goal
                </strong>
                <p className="text-sm text-slate-300">{country.mainGoal}</p>
              </div>
            </div>
          </div>
        </section>

        <CurrencyExplorer
          countryName={country.name}
          baseCurrency={country.currencyCode}
          userPreferredCurrency={preferredCurrency}
          onRateLoaded={({ rate, targetCurrency }) => {
            setCurrentRate(rate);
            setCurrentTargetCurrency(targetCurrency);
          }}
        />

        <CostOfLifeExplorer
          countryName={country.name}
          baseCurrency={country.currencyCode}
          targetCurrency={currentTargetCurrency}
          rate={currentRate}
          items={country.costOfLife}
        />

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <div className="mb-5">
            <h2 className="text-3xl font-bold text-yellow-400">
              Country Highlights
            </h2>
            <p className="text-sm text-slate-400">
              Key elements of the {country.name} pathway.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {country.tags.map((tag) => (
              <div
                key={tag}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  {tag}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  This learning dimension helps users understand and prepare for{" "}
                  {country.name} through focused international readiness.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
            <h3 className="mb-3 text-2xl font-bold text-yellow-400">
              Why {country.name} Matters
            </h3>
            <p className="text-sm leading-7 text-slate-300">
              {country.name} offers a powerful pathway for international growth,
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