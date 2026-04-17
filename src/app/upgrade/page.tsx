"use client";

import { useState } from "react";
import Link from "next/link";
import { activatePremium } from "@/lib/subscription";
import { createCheckoutSession } from "@/lib/stripe";

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleUpgrade() {
    try {
      setLoading(true);
      setStatus("Redirecting to secure checkout...");

      const session = await createCheckoutSession();

      await activatePremium();

      window.location.href = session.url;
    } catch (error: any) {
      setStatus(error?.message || "Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Upgrade to Premium Global Access
        </h1>

        <p className="mb-10 text-lg text-slate-300">
          Transform your global future with deeper insights, advanced tools,
          and a structured pathway designed for real international readiness.
        </p>

        <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-10">
          <p className="mb-4 text-4xl font-bold">$9.90 / month</p>

          <ul className="mb-8 space-y-3 text-slate-300">
            <li>✔ Unlimited country exploration</li>
            <li>✔ Premium cost-of-life tools</li>
            <li>✔ Advanced global readiness system</li>
            <li>✔ Future AI-powered recommendations</li>
          </ul>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="rounded-xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black hover:bg-yellow-400"
          >
            {loading ? "Processing..." : "Go Premium Now"}
          </button>

          {status && <p className="mt-4 text-yellow-300">{status}</p>}
        </div>

        <div className="mt-8">
          <Link href="/dashboard" className="text-slate-400 hover:text-white">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}