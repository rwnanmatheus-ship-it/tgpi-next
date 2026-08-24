"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { blocksNewCheckout } from "@/lib/billing";
import type { BillingStatusResponse } from "@/types";

export default function PremiumActionButton({
  billingEnabled,
}: {
  billingEnabled: boolean;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [billing, setBilling] = useState<BillingStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!billingEnabled || !isLoaded || !isSignedIn) {
      setCheckingStatus(false);
      return;
    }

    let active = true;

    async function loadBillingStatus() {
      try {
        const response = await fetch("/api/billing/status", {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Could not verify membership status.");
        const data = (await response.json()) as BillingStatusResponse;
        if (active) setBilling(data);
      } catch (statusError) {
        if (active) {
          setError(
            statusError instanceof Error
              ? statusError.message
              : "Could not verify membership status.",
          );
        }
      } finally {
        if (active) setCheckingStatus(false);
      }
    }

    void loadBillingStatus();
    return () => {
      active = false;
    };
  }, [billingEnabled, isLoaded, isSignedIn]);

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

  async function openBillingPortal() {
    const response = await fetch("/api/stripe/create-portal-session", {
      method: "POST",
    });
    const data = (await response.json()) as { error?: string; url?: string };

    if (!response.ok || !data.url) {
      throw new Error(data.error || "Could not open billing management.");
    }

    window.location.href = data.url;
  }

  async function startCheckout() {
    setLoading(true);
    setError(null);

    try {
      if (!isLoaded || !isSignedIn) {
        window.location.href = "/sign-in?redirect_url=%2Fpricing";
        return;
      }

      if (
        billing?.portalAvailable &&
        blocksNewCheckout(billing.status)
      ) {
        await openBillingPortal();
        return;
      }

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
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

      if (
        response.status === 409 &&
        (data.code === "ALREADY_PREMIUM" ||
          data.code === "SUBSCRIPTION_EXISTS")
      ) {
        await openBillingPortal();
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

  const shouldManageBilling = Boolean(
    billing?.portalAvailable && blocksNewCheckout(billing.status),
  );

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading || checkingStatus}
        className="w-full rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? shouldManageBilling
            ? "Opening billing management..."
            : "Opening secure checkout..."
          : checkingStatus
            ? "Checking membership..."
            : billing?.plan === "premium" || shouldManageBilling
              ? "Manage TGPI Premium"
              : "Start TGPI Premium"}
      </button>

      {error && (
        <p className="mt-3 text-sm font-semibold text-[#8B1E1E]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
