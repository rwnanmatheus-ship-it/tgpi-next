"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { isPremium } from "@/lib/plan";

export default function CountryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0f19] p-10 text-white">
        Loading country...
      </main>
    );
  }

  const premium = isPremium(profile?.membershipPlan);

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
          <h1 className="text-4xl font-bold capitalize">{slug}</h1>
          <p className="mt-4 text-slate-300">
            Explore culture, cost of living, opportunities, and real pathways to enter and live in {slug}.
          </p>
        </section>

        {/* FREE CONTENT */}
        <section className="mb-10 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold text-yellow-400">Overview</h2>
            <p className="mt-3 text-slate-300">
              {slug} offers unique cultural, economic, and lifestyle opportunities.
              Understanding the country is the first step to global integration.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold text-yellow-400">Culture</h2>
            <p className="mt-3 text-slate-300">
              Learn about traditions, behavior, language basics, and social norms
              that define everyday life in {slug}.
            </p>
          </div>
        </section>

        {/* PREMIUM LOCK */}
        {!premium && (
          <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-white/5 p-8">
            <h2 className="text-2xl font-bold text-white">
              Unlock Premium Insights
            </h2>

            <p className="mt-4 text-slate-300">
              Access real strategies, cost breakdowns, job pathways, visa routes,
              and insider knowledge for {slug}.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>• Real cost of living (rent, food, transport)</li>
              <li>• Best cities to live</li>
              <li>• How to get a job</li>
              <li>• Visa & legal pathways</li>
              <li>• Hidden opportunities</li>
            </ul>

            <Link
              href="/upgrade"
              className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
            >
              Upgrade to Premium
            </Link>
          </section>
        )}

        {/* PREMIUM CONTENT */}
        {premium && (
          <section className="space-y-6">

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <h2 className="text-2xl font-bold text-green-300">
                Cost of Living
              </h2>
              <p className="mt-3 text-slate-200">
                Detailed breakdown of rent, food, transportation, and daily expenses in {slug}.
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <h2 className="text-2xl font-bold text-green-300">
                Work & Opportunities
              </h2>
              <p className="mt-3 text-slate-200">
                Discover how to get a job, which sectors hire foreigners, and salary expectations.
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <h2 className="text-2xl font-bold text-green-300">
                Visa & Entry Strategy
              </h2>
              <p className="mt-3 text-slate-200">
                Learn the most realistic and effective ways to enter and stay legally in {slug}.
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <h2 className="text-2xl font-bold text-green-300">
                Insider Strategy
              </h2>
              <p className="mt-3 text-slate-200">
                Strategic insights that most people don’t know about living and growing in {slug}.
              </p>
            </div>

          </section>
        )}

      </div>
    </main>
  );
}