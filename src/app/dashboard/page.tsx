"use client";

import { countries } from "@/data/countries";
import { auth } from "@/lib/firebase";
import { getUserMemory, type UserMemory } from "@/lib/user-memory";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [memory, setMemory] = useState<UserMemory | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setMemory(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getUserMemory(user.uid);
        setMemory(data);
      } catch (error) {
        console.error("Could not load dashboard memory:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const favoriteCountries = useMemo(() => {
    if (!memory?.favoriteCountries?.length) return [];
    return countries.filter((country) =>
      memory.favoriteCountries?.includes(country.slug)
    );
  }, [memory]);

  const lastVisitedCountry = useMemo(() => {
    if (!memory?.lastVisitedCountry) return null;
    return countries.find((country) => country.slug === memory.lastVisitedCountry) || null;
  }, [memory]);

  const recentCountries = useMemo(() => {
    if (!memory?.recentCountryViews?.length) return [];
    return memory.recentCountryViews
      .map((item) => countries.find((country) => country.slug === item.slug))
      .filter(Boolean);
  }, [memory]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
          <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Dashboard
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Your global journey, organized.
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Continue your pathway, revisit countries, and build a more structured
            TGPI experience.
          </p>
        </section>

        <section className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/countries"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Explore Countries</h2>
            <p className="mt-2 text-sm text-slate-300">
              Open the country system and continue exploring.
            </p>
          </Link>

          <Link
            href="/upgrade"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Upgrade</h2>
            <p className="mt-2 text-sm text-slate-300">
              Unlock deeper personalization and premium pathways.
            </p>
          </Link>

          <Link
            href="/profile"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Profile</h2>
            <p className="mt-2 text-sm text-slate-300">
              Manage account preferences and personal data.
            </p>
          </Link>

          <Link
            href="/countries"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Compare Paths</h2>
            <p className="mt-2 text-sm text-slate-300">
              Explore new directions through the country interface.
            </p>
          </Link>
        </section>

        {loading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            Loading dashboard...
          </div>
        ) : !memory ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">Sign in required</h2>
            <p className="mt-3 text-slate-300">
              Sign in to access your personal TGPI dashboard.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-3 text-2xl font-bold text-yellow-400">
                  Last Country
                </h2>
                {lastVisitedCountry ? (
                  <>
                    <p className="text-lg text-white">
                      {lastVisitedCountry.emoji} {lastVisitedCountry.name}
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      Continue from your latest country interaction.
                    </p>
                    <Link
                      href={`/countries/${lastVisitedCountry.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-yellow-300"
                    >
                      Open country →
                    </Link>
                  </>
                ) : (
                  <p className="text-slate-400">No recent country yet.</p>
                )}
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-3 text-2xl font-bold text-yellow-400">
                  Your Plan
                </h2>
                <p className="text-lg text-white">
                  {memory.plan === "premium" ? "Premium Access" : "Free Access"}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Preferred currency: {memory.preferredCurrency || "USD"}
                </p>
                <Link
                  href="/upgrade"
                  className="mt-5 inline-block text-sm font-semibold text-yellow-300"
                >
                  Manage upgrade →
                </Link>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-3 text-2xl font-bold text-yellow-400">
                  Saved Favorites
                </h2>
                <p className="text-lg text-white">
                  {favoriteCountries.length} country saved
                  {favoriteCountries.length === 1 ? "" : "ies"}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Build your own global shortlist.
                </p>
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-5 text-2xl font-bold text-yellow-400">
                  Favorites
                </h2>

                {favoriteCountries.length ? (
                  <div className="space-y-3">
                    {favoriteCountries.map((country) => (
                      <Link
                        key={country.slug}
                        href={`/countries/${country.slug}`}
                        className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:border-yellow-500"
                      >
                        <span className="text-slate-200">
                          {country.emoji} {country.name}
                        </span>
                        <span className="text-sm text-yellow-300">Open →</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No favorites saved yet.</p>
                )}
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-5 text-2xl font-bold text-yellow-400">
                  Recent Countries
                </h2>

                {recentCountries.length ? (
                  <div className="space-y-3">
                    {recentCountries.map((country) => {
                      if (!country) return null;

                      return (
                        <Link
                          key={country.slug}
                          href={`/countries/${country.slug}`}
                          className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:border-yellow-500"
                        >
                          <span className="text-slate-200">
                            {country.emoji} {country.name}
                          </span>
                          <span className="text-sm text-yellow-300">Return →</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-400">No recent countries yet.</p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}