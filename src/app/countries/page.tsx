"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { canAddFavorite, getRemainingFavorites } from "@/lib/favorites";
import { isPremium } from "@/lib/plan";

const countries = [
  { name: "Japan", slug: "japan", flag: "🇯🇵" },
  { name: "United States", slug: "united-states", flag: "🇺🇸" },
  { name: "Germany", slug: "germany", flag: "🇩🇪" },
  { name: "Canada", slug: "canada", flag: "🇨🇦" },
  { name: "France", slug: "france", flag: "🇫🇷" },
  { name: "Portugal", slug: "portugal", flag: "🇵🇹" },
  { name: "Egypt", slug: "egypt", flag: "🇪🇬" },
  { name: "Brazil", slug: "brazil", flag: "🇧🇷" },
];

export default function CountriesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      setUid(user.uid);

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
    });

    return () => unsub();
  }, []);

  async function toggleFavorite(country: string) {
    if (!profile) return;

    let favorites = profile.favorites || [];

    const exists = favorites.includes(country);

    if (!exists && !canAddFavorite(profile)) {
      alert("Free plan limit reached. Upgrade to add more countries.");
      return;
    }

    if (exists) {
      favorites = favorites.filter((c: string) => c !== country);
    } else {
      favorites.push(country);
    }

    await updateDoc(doc(db, "users", uid), {
      favorites,
    });

    setProfile({ ...profile, favorites });
  }

  if (!profile) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
          <h1 className="text-4xl font-bold">
            Explore Countries
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Select a country, explore culture, and build your global path.
            Save favorites to track your journey.
          </p>

          <div className="mt-4 text-sm text-yellow-300">
            Remaining favorites: {getRemainingFavorites(profile)}
          </div>
        </section>

        {/* GRID */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {countries.map((country) => {
            const isFav = profile.favorites?.includes(country.name);

            return (
              <div
                key={country.slug}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {country.flag} {country.name}
                  </h2>

                  <button
                    onClick={() => toggleFavorite(country.name)}
                    className={`text-xl ${
                      isFav ? "text-yellow-400" : "text-white/40"
                    }`}
                  >
                    ★
                  </button>
                </div>

                <p className="mt-3 text-sm text-slate-300">
                  Discover opportunities, cost of living, culture and pathways
                  to live and work in {country.name}.
                </p>

                <Link
                  href={`/countries/${country.slug}`}
                  className="mt-4 inline-block text-yellow-400 hover:underline"
                >
                  Explore →
                </Link>
              </div>
            );
          })}

        </section>

        {/* PREMIUM CTA */}
        {!isPremium(profile.membershipPlan) && (
          <section className="mt-12 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-white/5 p-8">
            <h2 className="text-2xl font-bold">
              Go Unlimited with Premium
            </h2>

            <p className="mt-3 text-slate-300">
              Save unlimited countries, unlock deeper insights, and build your
              global strategy without limits.
            </p>

            <Link
              href="/upgrade"
              className="mt-4 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
            >
              Upgrade Now
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}