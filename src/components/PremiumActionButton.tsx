"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function PremiumActionButton({
  billingEnabled,
}: {
  billingEnabled: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!billingEnabled) {
    return (
      <Link
        href="/premium-waitlist"
        className="block w-full rounded-2xl bg-[#B58A2A] px-6 py-4 text-center text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36]"
      >
        Join Premium Waitlist
      </Link>
    );
  }

  async function startCheckout() {
    setLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;

      if (!user) {
        window.location.href = "/login?next=/pricing";
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = (await response.json()) as {
        url?: string;
        error?: string;
        code?: string;
      };

      if (response.status === 503 || data.code === "BILLING_DISABLED") {
        window.location.href = "/premium-waitlist";
        return;
      }

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Could not start checkout."
      );
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="w-full rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening secure checkout..." : "Start TGPI Premium"}
      </button>

      {error && (
        <p className="mt-3 text-sm font-semibold text-[#8B1E1E]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
