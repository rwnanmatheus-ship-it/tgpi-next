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
    return (
      countries.find((country) => country.slug === memory.lastVisitedCountry) ||
      null
    );
  }, [memory]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800 px-6 py-28">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.14),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(234,179,8,0.08),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.04),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                The Global Polymath Institute • Premium Global Readiness
              </p>

              <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] md:text-7xl">
                Prepare to live, study, work, and integrate
                <span className="block text-yellow-400">
                  anywhere in the world.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                TGPI brings together country discovery, practical global
                intelligence, cultural integration, premium learning pathways,
                and future-ready international preparation in one scalable
                platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-7 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore Countries
                </Link>

                <Link
                  href="/upgrade"
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-7 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Unlock Premium
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3 font-semibold text-white transition hover:border-yellow-500/40 hover:bg-slate-900"
                >
                  Open Dashboard
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Global Vision",
                    value: "195+",
                    text: "country pathways ahead",
                  },
                  {
                    label: "Practical Value",
                    value: "Live",
                    text: "cost and currency context",
                  },
                  {
                    label: "Structured Growth",
                    value: "Learn",
                    text: "courses and skill preparation",
                  },
                  {
                    label: "Premium Layer",
                    value: "Elite",
                    text: "upgrade-ready ecosystem",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-yellow-400">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-yellow-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-slate-900/75 p-8 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.12),transparent_40%)]" />

                <div className="relative z-10">
                  <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-yellow-500/20 bg-[radial-gradient(circle,rgba(234,179,8,0.16),rgba(15,23,42,0.2),transparent_72%)] shadow-[0_0_120px_rgba(234,179,8,0.12)]">
                    <img
                      src="/brand/logo.png"
                      alt="TGPI Seal"
                      className="w-40 md:w-48"
                    />
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      TGPI Global System
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">
                      Where Knowledge Meets Global Recognition
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-300">
                      A premium platform designed to help people navigate real
                      international pathways with more clarity, structure, and
                      ambition.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-sm font-semibold text-yellow-400">
                        Countries
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Explore real-world pathways by nation, language,
                        culture, and opportunity.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-sm font-semibold text-yellow-400">
                        Premium
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Unlock deeper access, better personalization, and a more
                        advanced TGPI journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                {
                  title: "Countries",
                  text: "Explore country pathways with practical context.",
                  href: "/countries",
                },
                {
                  title: "Cost of Life",
                  text: "Understand daily prices and financial reality.",
                  href: "/countries",
                },
                {
                  title: "Currency",
                  text: "Compare value across multiple currencies.",
                  href: "/countries",
                },
                {
                  title: "Dashboard",
                  text: "Track your journey and saved activity.",
                  href: "/dashboard",
                },
                {
                  title: "Premium",
                  text: "Access the advanced TGPI layer in USD.",
                  href: "/upgrade",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-yellow-500/50 hover:bg-slate-900"
                >
                  <p className="text-lg font-semibold text-yellow-400 transition group-hover:text-yellow-300">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!loading && memory ? (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Personalized Layer
                </p>
                <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                  Continue Your Journey
                </h2>
                <p className="mt-2 max-w-2xl text-slate-300">
                  Your homepage adapts to saved TGPI activity so you can return
                  with more continuity, clarity, and direction.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-5 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
              >
                Open Dashboard
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Last Country
                </h3>

                {lastVisitedCountry ? (
                  <>
                    <p className="text-lg text-slate-200">
                      {lastVisitedCountry.emoji} {lastVisitedCountry.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Return to your most recent country pathway and keep your
                      exploration moving forward.
                    </p>
                    <Link
                      href={`/countries/${lastVisitedCountry.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-yellow-300"
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
                  <div className="space-y-3">
                    {favoriteCountries.slice(0, 3).map((country) => (
                      <div
                        key={country.slug}
                        className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                      >
                        <p className="text-slate-200">
                          {country.emoji} {country.name}
                        </p>
                      </div>
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
                <p className="text-lg text-slate-200">
                  {memory.plan === "premium" ? "Premium Access" : "Free Access"}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Preferred currency: {memory.preferredCurrency || "USD"}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your TGPI plan shapes how much personalization and depth you
                  can unlock across the platform.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Featured Country Pathways
              </p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                Start with practical global entry points
              </h2>
              <p className="mt-2 max-w-2xl text-slate-300">
                Discover early TGPI country experiences built to combine
                language, cultural intelligence, and real-world relevance.
              </p>
            </div>

            <Link
              href="/countries"
              className="inline-flex rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-5 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
            >
              View All Countries
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 transition hover:border-yellow-500/50"
              >
                <div className="h-2 bg-gradient-to-r from-yellow-500/80 via-yellow-300/50 to-transparent" />

                <div className="p-7">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                    TGPI Pathway
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-yellow-400 transition group-hover:text-yellow-300">
                    {country.emoji} {country.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {country.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {country.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-sm text-slate-400">
                    {country.language} • {country.currencyCode}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-yellow-300">
                    Explore pathway →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Free Access
              </p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-400">Free</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Start exploring the TGPI ecosystem with essential country access
                and foundational global preparation tools.
              </p>

              <ul className="mt-6 space-y-3 text-slate-300">
                <li>Explore countries</li>
                <li>View core country data</li>
                <li>Basic currency exploration</li>
                <li>Up to 3 favorites</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Premium Access
              </p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-400">
                Premium
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Unlock the advanced TGPI layer with deeper personalization,
                broader comparison tools, and a more elite international journey.
              </p>

              <ul className="mt-6 space-y-3 text-slate-300">
                <li>Unlimited favorites</li>
                <li>Deeper personalization</li>
                <li>Advanced country comparison</li>
                <li>Expanded premium pathways</li>
              </ul>

              <Link
                href="/upgrade"
                className="mt-7 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Unlock Premium
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}