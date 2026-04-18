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

  const exploredCount = recentCountries.length;
  const favoriteCount = favoriteCountries.length;
  const totalCountries = countries.length;
  const progressPercent =
    totalCountries > 0 ? Math.min(100, Math.round((exploredCount / totalCountries) * 100)) : 0;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Dashboard
              </p>

              <h1 className="text-4xl font-bold md:text-5xl">
                Your global progress, organized in one place.
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Track your pathway, continue where you stopped, and build a more
                intentional international journey.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore More Countries
                </Link>

                <Link
                  href="/onboarding"
                  className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Return to Discovery
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm font-semibold text-yellow-300">
                Exploration Progress
              </p>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-yellow-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-4 text-3xl font-bold text-white">
                {progressPercent}%
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {exploredCount} of {totalCountries} countries explored in your recent journey
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Recent exploration</p>
            <p className="mt-3 text-4xl font-bold text-yellow-400">{exploredCount}</p>
            <p className="mt-2 text-sm text-slate-300">Countries visited recently</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Favorites</p>
            <p className="mt-3 text-4xl font-bold text-yellow-400">{favoriteCount}</p>
            <p className="mt-2 text-sm text-slate-300">Countries saved in your shortlist</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Current plan</p>
            <p className="mt-3 text-2xl font-bold text-yellow-400">
              {memory?.plan === "premium" ? "Premium" : "Free"}
            </p>
            <p className="mt-2 text-sm text-slate-300">Your active TGPI access tier</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Preferred currency</p>
            <p className="mt-3 text-2xl font-bold text-yellow-400">
              {memory?.preferredCurrency || "USD"}
            </p>
            <p className="mt-2 text-sm text-slate-300">Applied in your exploration flow</p>
          </div>
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
            <section className="grid gap-5 xl:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 text-2xl font-bold text-yellow-400">
                  Current Focus
                </h2>
                {lastVisitedCountry ? (
                  <>
                    <p className="text-lg text-white">
                      {lastVisitedCountry.emoji} {lastVisitedCountry.name}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      This is your most recent country interaction and the best
                      place to continue now.
                    </p>
                    <Link
                      href={`/countries/${lastVisitedCountry.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-yellow-300"
                    >
                      Continue this country →
                    </Link>
                  </>
                ) : (
                  <p className="text-slate-400">No current focus yet.</p>
                )}
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 text-2xl font-bold text-yellow-400">
                  Next Move
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  Expand your shortlist, compare new regions, and keep building
                  a more intentional global direction.
                </p>
                <div className="mt-5 space-y-3">
                  <Link
                    href="/countries"
                    className="block rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-yellow-500"
                  >
                    Explore more countries
                  </Link>
                  <Link
                    href="/onboarding"
                    className="block rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-yellow-500"
                  >
                    Revisit onboarding discovery
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 text-2xl font-bold text-yellow-400">
                  Shortlist Status
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  You currently have {favoriteCount} saved countr
                  {favoriteCount === 1 ? "y" : "ies"} in your active shortlist.
                </p>
                <p className="mt-4 text-sm text-slate-400">
                  Strong shortlists create better decisions.
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
                  Recent Exploration
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