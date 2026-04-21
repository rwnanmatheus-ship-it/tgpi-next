"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function UpgradeSuccessPage() {
  const [status, setStatus] = useState("Checking your subscription...");
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function finalizeUpgrade() {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) {
        setStatus("Missing Stripe session ID.");
        return;
      }

      const currentUser = await new Promise<any>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user);
        });
      });

      if (!currentUser) {
        setStatus("You need to be logged in to finalize the upgrade.");
        return;
      }

      try {
        const response = await fetch(
          `/api/stripe/checkout-session?session_id=${encodeURIComponent(sessionId)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Could not verify Stripe session.");
        }

        const success =
          data?.payment_status === "paid" || data?.status === "complete";

        if (!success) {
          setStatus("Your subscription is not confirmed yet.");
          return;
        }

        await setDoc(
          doc(db, "users", currentUser.uid),
          {
            plan: "premium",
            upgradedAt: new Date().toISOString(),
            stripeCustomerEmail: data?.customer_email || "",
            stripeSubscriptionId: data?.subscriptionId || "",
          },
          { merge: true }
        );

        setStatus("Premium activated successfully.");
        setDone(true);
      } catch (error) {
        console.error("Upgrade success error:", error);
        setStatus("Could not confirm your premium activation.");
      }
    }

    finalizeUpgrade();
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