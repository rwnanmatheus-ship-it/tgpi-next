"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const freeFeatures = [
  "Country exploration",
  "Interactive readiness layers",
  "Basic community access",
  "Passport and profile foundation",
  "Useful free global preparation",
];

const premiumFeatures = [
  "Full global ranking visibility",
  "Advanced social matching",
  "Elite certificate trust layer",
  "Stronger recruiter-facing signals",
  "Premium passport layer",
  "Higher-value identity and positioning",
];

export default function PremiumPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [error, setError] = useState("");
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const params = new URLSearchParams(window.location.search);
    if (params.get("canceled") === "1") {
      setCanceled(true);
    }

    return () => unsubscribe();
  }, []);

  async function handleCheckout() {
    setError("");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setLoadingCheckout(true);

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email || "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Could not start checkout.");
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error("Checkout start error:", err);
      setError(err?.message || "Could not start checkout.");
    } finally {
      setLoadingCheckout(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10 text-center">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Premium Subscription
          </p>

          <h1 className="text-5xl font-bold text-yellow-400">
            Unlock the Full TGPI Layer
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-slate-300">
            The free experience is intentionally strong, useful, and interactive.
            Premium is for users who want stronger visibility, higher trust,
            deeper access, and a more powerful international identity.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleCheckout}
              disabled={loadingCheckout}
              className="rounded-2xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingCheckout ? "Redirecting..." : "Start Premium Subscription"}
            </button>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-bold text-white transition hover:border-yellow-500"
            >
              Keep Exploring Free
            </Link>
          </div>

          {canceled ? (
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="font-semibold text-amber-300">
                Your checkout was canceled.
              </p>
              <p className="mt-2 text-sm text-slate-200">
                You can continue exploring TGPI for free and upgrade whenever you
                are ready.
              </p>
            </div>
          ) : null}

          {error ? (
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="font-semibold text-red-300">{error}</p>
            </div>
          ) : null}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <PlanCard
            title="Free"
            subtitle="High-value free experience that builds trust and momentum"
            features={freeFeatures}
            tone="free"
          />

          <PlanCard
            title="Premium"
            subtitle="For serious users who want stronger positioning and access"
            features={premiumFeatures}
            tone="premium"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <ValueCard
            title="Useful Before Payment"
            text="Free users can already explore countries, build identity, and understand the value of TGPI before subscribing."
          />
          <ValueCard
            title="Premium Feels Like an Upgrade"
            text="Instead of punishing the free user, TGPI lets them experience real value and then offers a more powerful next level."
          />
          <ValueCard
            title="Subscription With Clear ROI"
            text="Premium improves visibility, trust, social matching quality, and the strength of the user's global positioning."
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