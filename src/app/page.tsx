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
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800 px-6 py-28">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(234,179,8,0.16),transparent_24%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(234,179,8,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_20%)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="pointer-events-none absolute left-[-8%] top-16 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-6%] top-24 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-8%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200 shadow-[0_0_20px_rgba(234,179,8,0.08)]">
                The Global Polymath Institute • Elite Global Readiness
              </p>

              <h1 className="max-w-5xl text-5xl font-bold leading-[1.02] md:text-7xl">
                Build a future with the power to move
                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                  across countries, cultures, and opportunities.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                TGPI helps people prepare to live, study, work, and integrate
                anywhere in the world through country discovery, global
                intelligence, premium learning, and scalable international
                pathways.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-7 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(234,179,8,0.18)] transition hover:-translate-y-0.5 hover:bg-yellow-400"
                >
                  Explore Countries
                </Link>

                <Link
                  href="/upgrade"
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-7 py-3 font-semibold text-yellow-300 transition hover:-translate-y-0.5 hover:bg-yellow-500/10"
                >
                  Unlock Premium
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-yellow-500/40 hover:bg-slate-900"
                >
                  Open Dashboard
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Global Scope",
                    value: "195+",
                    text: "country pathways ahead",
                  },
                  {
                    label: "Real Utility",
                    value: "Live",
                    text: "cost, value, comparison",
                  },
                  {
                    label: "Preparation",
                    value: "Learn",
                    text: "skills, culture, readiness",
                  },
                  {
                    label: "Positioning",
                    value: "Premium",
                    text: "elite long-term ecosystem",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-yellow-500/30"
                  >
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
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
              <div className="absolute -inset-8 rounded-[2.5rem] bg-yellow-500/10 blur-3xl" />
              <div className="absolute right-10 top-8 h-28 w-28 rounded-full border border-yellow-400/20 bg-yellow-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-slate-900/70 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_32%,transparent_68%,rgba(255,255,255,0.04))]" />

                <div className="relative z-10">
                  <div className="relative mx-auto flex h-[22rem] w-[22rem] max-w-full items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-yellow-500/8 blur-3xl" />
                    <div className="absolute inset-[10%] rounded-full border border-yellow-400/15 bg-[radial-gradient(circle,rgba(234,179,8,0.2),rgba(15,23,42,0.35),transparent_72%)] shadow-[0_0_100px_rgba(234,179,8,0.14)]" />
                    <div className="absolute inset-[20%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),rgba(234,179,8,0.08),rgba(15,23,42,0.55))]" />
                    <div className="absolute left-[28%] top-[22%] h-12 w-12 rounded-full bg-white/20 blur-xl" />
                    <div className="absolute bottom-[22%] right-[24%] h-14 w-14 rounded-full bg-yellow-300/10 blur-xl" />

                    <div className="relative z-10 rounded-full border border-yellow-400/15 bg-slate-950/50 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.38)]">
                      <img
                        src="/brand/logo.png"
                        alt="TGPI Seal"
                        className="w-36 md:w-44"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      TGPI Global System
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">
                      Where Knowledge Meets Global Recognition
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-300">
                      A premium digital institution designed to transform
                      curiosity into structured international preparation.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                      <p className="text-sm font-semibold text-yellow-400">
                        Global Pathways
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Discover countries through language, cost, culture,
                        mobility, and long-term relevance.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                      <p className="text-sm font-semibold text-yellow-400">
                        Premium Layer
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Unlock deeper personalization, stronger comparison, and
                        a more advanced TGPI experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                {
                  title: "Countries",
                  text: "Explore country pathways with practical international context.",
                  href: "/countries",
                },
                {
                  title: "Cost of Life",
                  text: "See reference prices and understand everyday local reality.",
                  href: "/countries",
                },
                {
                  title: "Currency",
                  text: "Compare value across currencies with clearer financial perspective.",
                  href: "/countries",
                },
                {
                  title: "Dashboard",
                  text: "Track saved activity, memory, and personal TGPI continuity.",
                  href: "/dashboard",
                },
                {
                  title: "Premium",
                  text: "Unlock the advanced experience with premium access in USD.",
                  href: "/upgrade",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-yellow-500/40 hover:bg-slate-900"
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

      <section className="border-b border-slate-800 bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                How TGPI Works
              </p>
              <h2 className="mt-3 text-4xl font-bold leading-tight">
                A premium system built to make global preparation more practical,
                structured, and memorable.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                TGPI is not only about discovering countries. It is about
                turning global curiosity into readiness, confidence, and
                long-term international direction.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  step: "01",
                  title: "Explore Countries",
                  text: "Understand different national pathways through language, lifestyle, and real-world context.",
                },
                {
                  step: "02",
                  title: "Compare Reality",
                  text: "Use value, cost, and currency signals to understand how each destination feels in practice.",
                },
                {
                  step: "03",
                  title: "Build Readiness",
                  text: "Prepare through premium learning, cultural intelligence, and country-specific direction.",
                },
                {
                  step: "04",
                  title: "Scale Your Path",
                  text: "Return through dashboard memory, saved goals, and future premium progression.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Step {item.step}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!loading && memory ? (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Personalized Layer
                </p>
                <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                  Continue Your Journey
                </h2>
                <p className="mt-2 max-w-2xl text-slate-300">
                  Your TGPI homepage reflects saved activity, making the return
                  experience more personal, continuous, and valuable.
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
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Last Country
                </h3>

                {lastVisitedCountry ? (
                  <>
                    <p className="text-lg text-slate-200">
                      {lastVisitedCountry.emoji} {lastVisitedCountry.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Return to your latest pathway and keep building your global
                      direction with more continuity.
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

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
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

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
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
                  Your plan determines how much depth and personalization you can
                  unlock across the TGPI system.
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
                Featured Pathways
              </p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                Start with stronger global entry points
              </h2>
              <p className="mt-2 max-w-2xl text-slate-300">
                Early TGPI country experiences built to connect practical
                context, cultural readiness, and long-term international value.
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
                className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-yellow-500/40"
              >
                <div className="h-2 bg-gradient-to-r from-yellow-500/90 via-yellow-300/60 to-transparent" />

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
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Free Access
              </p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-400">Free</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Enter the TGPI ecosystem through essential country access and
                foundational tools for global exploration.
              </p>

              <ul className="mt-6 space-y-3 text-slate-300">
                <li>Explore countries</li>
                <li>View core country data</li>
                <li>Basic currency exploration</li>
                <li>Up to 3 favorites</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Premium Access
              </p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-400">
                Premium
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Unlock the advanced TGPI layer with deeper personalization,
                broader comparison power, and a stronger international journey.
              </p>

              <ul className="mt-6 space-y-3 text-slate-300">
                <li>Unlimited favorites</li>
                <li>Deeper personalization</li>
                <li>Advanced country comparison</li>
                <li>Expanded premium pathways</li>
              </ul>

              <Link
                href="/upgrade"
                className="mt-7 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(234,179,8,0.18)] transition hover:bg-yellow-400"
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