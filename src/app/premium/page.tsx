"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { upgradeUserToPremium } from "@/lib/upgrade-user";

const freeFeatures = [
  "Country exploration",
  "Basic community access",
  "Profile creation",
  "Dashboard and progression",
  "Readiness visibility",
];

const premiumFeatures = [
  "Full global ranking access",
  "Elite passport layer",
  "Advanced matching and deeper connections",
  "Recruiter-facing credibility signals",
  "Stronger certificate trust layer",
  "Premium growth and visibility tools",
];

export default function PremiumPage() {
  const [user, setUser] = useState<User | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleUpgrade() {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setUpgrading(true);
      await upgradeUserToPremium(user.uid);
      setSuccess(true);
    } catch (error) {
      console.error("Could not upgrade user:", error);
    } finally {
      setUpgrading(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10 text-center">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Premium Access
          </p>

          <h1 className="text-5xl font-bold text-yellow-400">
            Unlock the Next Level of Global Readiness
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-slate-300">
            The free experience is designed to be useful and valuable. Premium
            is designed to give serious users deeper visibility, stronger
            positioning, higher trust, and better international networking.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="rounded-2xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {upgrading ? "Unlocking..." : "Upgrade to Premium"}
            </button>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-bold text-white transition hover:border-yellow-500"
            >
              Continue Free
            </Link>
          </div>

          {success ? (
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="font-semibold text-emerald-300">
                Premium activated successfully.
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Your account now has access to premium layers and advanced TGPI
                features.
              </p>
            </div>
          ) : null}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <PlanCard
            title="Free"
            subtitle="Useful, informative, and intentionally valuable"
            features={freeFeatures}
            tone="free"
          />

          <PlanCard
            title="Premium"
            subtitle="For users who want stronger growth, visibility, and trust"
            features={premiumFeatures}
            tone="premium"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <ValueCard
            title="Strong Free Experience"
            text="Users can already explore countries, build readiness, and begin their global identity journey before paying."
          />
          <ValueCard
            title="Preview-Driven Upgrade Desire"
            text="Premium features are introduced through previews and partial access so users understand the value before upgrading."
          />
          <ValueCard
            title="Positioning Upgrade"
            text="Premium is not just extra content. It improves visibility, credibility, matching quality, and perceived status."
          />
        </section>
      </div>
    </div>
  );
}

function PlanCard({
  title,
  subtitle,
  features,
  tone,
}: {
  title: string;
  subtitle: string;
  features: string[];
  tone: "free" | "premium";
}) {
  const isPremium = tone === "premium";

  return (
    <section
      className={`rounded-3xl border p-8 ${
        isPremium
          ? "border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <h2
        className={`text-3xl font-bold ${
          isPremium ? "text-yellow-400" : "text-white"
        }`}
      >
        {title}
      </h2>

      <p className="mt-3 text-slate-300">{subtitle}</p>

      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="text-sm leading-7 text-slate-300">✔ {feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ValueCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h3 className="text-2xl font-bold text-yellow-400">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
    </section>
  );
}