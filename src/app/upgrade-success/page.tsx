"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const MAX_ATTEMPTS = 12;
const RETRY_DELAY_MS = 2500;

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export default function UpgradeSuccessPage() {
  const [status, setStatus] = useState("Confirming your subscription securely...");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function confirmUpgrade() {
      const currentUser = await new Promise<typeof auth.currentUser>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user);
        });
      });

      if (!currentUser) {
        setStatus("Log in to check your subscription status.");
        return;
      }

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
        if (cancelled) return;

        try {
          const snapshot = await getDoc(doc(db, "users", currentUser.uid));
          const userData = snapshot.exists() ? snapshot.data() : null;
          const hasPremiumAccess =
            userData?.plan === "premium" &&
            ["active", "trialing"].includes(String(userData?.subscriptionStatus || "active"));

          if (hasPremiumAccess) {
            setStatus("Premium activated successfully.");
            setDone(true);
            return;
          }
        } catch (error) {
          console.error("Subscription status check error:", error);
        }

        if (attempt < MAX_ATTEMPTS - 1) {
          setStatus("Payment received. Waiting for secure subscription synchronization...");
          await wait(RETRY_DELAY_MS);
        }
      }

      setStatus(
        "Your payment may still be synchronizing. Refresh this page shortly or open your dashboard."
      );
    }

    confirmUpgrade();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-10 text-center">
        <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
          Premium Activation
        </p>

        <h1 className="text-4xl font-bold text-yellow-400">
          Subscription Status
        </h1>

        <p className="mt-6 text-lg text-slate-300">{status}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black transition hover:bg-yellow-400"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/premium"
            className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-bold text-white transition hover:border-yellow-500"
          >
            Back to Premium
          </Link>
        </div>

        {done ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <p className="font-semibold text-emerald-300">
              Your TGPI account now has premium access.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
