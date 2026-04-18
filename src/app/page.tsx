"use client";

import { countries } from "@/data/countries";
import { auth } from "@/lib/firebase";
import { getUserMemory, type UserMemory } from "@/lib/user-memory";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
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
        console.error("Could not load homepage memory:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const featuredCountries = useMemo(() => countries.slice(0, 3), []);
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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                The Global Polymath Institute
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Build global readiness across countries, culture, currency, and
                opportunity.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                TGPI combines country discovery, practical comparison, and
                premium global learning into one structured platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore Countries
                </Link>

                <Link
                  href="/premium"
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  View Premium
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="block text-3xl text-yellow-400">195</strong>
                <p className="mt-2 text-sm text-slate-300">Country vision</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="block text-3xl text-yellow-400">Free + Premium</strong>
                <p className="mt-2 text-sm text-slate-300">Clear product structure</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="block text-3xl text-yellow-400">Live</strong>
                <p className="mt-2 text-sm text-slate-300">Currency and cost context</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <strong className="block text-3xl text-yellow-400">Global</strong>
                <p className="mt-2 text-sm text-slate-300">Premium UX direction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { title: "Countries", text: "Explore country pathways", href: "/countries" },
              { title: "Cost of Life", text: "See everyday reference prices", href: "/countries" },
              { title: "Currency", text: "Compare practical value", href: "/countries" },
              { title: "Dashboard", text: "Track your global journey", href: "/dashboard" },
              { title: "Premium", text: "Unlock advanced access", href: "/premium" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-yellow-500"
              >
                <h2 className="text-lg font-semibold text-yellow-400">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-300">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-yellow-400">How TGPI Works</h2>
            <p className="mt-2 text-slate-300">
              Explore countries, compare practical realities, save your path, and
              evolve into a premium global experience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Choose a country",
              "Understand language, culture, and costs",
              "Save your favorites and continue later",
              "Unlock premium depth and personalization",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <p className="mb-3 text-sm text-yellow-300">Step {index + 1}</p>
                <h3 className="text-lg font-semibold text-white">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!loading && memory ? (
        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-yellow-400">Continue Your Journey</h2>
              <p className="mt-2 text-slate-300">
                Your personal TGPI layer based on saved activity.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Last Country
                </h3>
                {lastVisitedCountry ? (
                  <>
                    <p className="text-slate-300">
                      {lastVisitedCountry.emoji} {lastVisitedCountry.name}
                    </p>
                    <Link
                      href={`/countries/${lastVisitedCountry.slug}`}
                      className="mt-4 inline-block text-sm font-semibold text-yellow-300"
                    >
                      Continue →
                    </Link>
                  </>
                ) : (
                  <p className="text-slate-400">No recent country yet.</p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Favorites
                </h3>
                {favoriteCountries.length ? (
                  <div className="space-y-2">
                    {favoriteCountries.slice(0, 3).map((country) => (
                      <p key={country.slug} className="text-slate-300">
                        {country.emoji} {country.name}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No favorites saved yet.</p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Your Plan
                </h3>
                <p className="text-slate-300">
                  {memory.plan === "premium" ? "Premium Access" : "Free Access"}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Preferred currency: {memory.preferredCurrency || "USD"}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-yellow-400">
              Featured Pathways
            </h2>
            <p className="mt-2 text-slate-300">
              Early TGPI country experiences with practical value.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500"
              >
                <h3 className="text-2xl font-bold text-yellow-400">
                  {country.emoji} {country.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {country.shortDescription}
                </p>
                <p className="mt-4 text-sm text-slate-400">
                  {country.language} • {country.currencyCode}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-3xl font-bold text-yellow-400">Free</h2>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>Explore countries</li>
                <li>View core country data</li>
                <li>Basic currency exploration</li>
                <li>Up to 3 favorites</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
              <h2 className="text-3xl font-bold text-yellow-400">Premium</h2>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>Unlimited favorites</li>
                <li>Deeper personalization</li>
                <li>Advanced country comparison</li>
                <li>Expanded premium pathways</li>
              </ul>
              <Link
                href="/premium"
                className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Unlock Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-3xl border border-yellow-700/20 bg-gradient-to-r from-yellow-500/10 to-slate-900 p-10 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 md:text-4xl">
            A premium global platform in construction.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-300">
            TGPI is being built to combine country intelligence, cultural depth,
            and structured global readiness in one scalable experience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/countries"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Start Exploring
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}