"use client";

import { useEffect } from "react";
import Link from "next/link";
import { activatePremium } from "@/lib/subscription";

export default function UpgradeSuccessPage() {
  useEffect(() => {
    activatePremium();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-6 text-white">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">
          Welcome to Premium 🚀
        </h1>

        <p className="text-lg text-slate-300 mb-8">
          Your account has been upgraded. You now have access to deeper global
          insights, advanced tools, and the full TGPI experience.
        </p>

        <Link
          href="/dashboard"
          className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}