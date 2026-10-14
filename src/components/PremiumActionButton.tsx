"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { blocksNewCheckout } from "@/lib/billing";
import type { BillingStatusResponse } from "@/types";

const billingStatusRequests = new Map<string, Promise<BillingStatusResponse>>();

function getBillingStatus(userId: string) {
  const existingRequest = billingStatusRequests.get(userId);
  if (existingRequest) return existingRequest;

  const request = fetch("/api/billing/status", {
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("Could not verify membership status.");
      return (await response.json()) as BillingStatusResponse;
    })
    .finally(() => {
      billingStatusRequests.delete(userId);
    });

  billingStatusRequests.set(userId, request);
  return request;
}

export default function PremiumActionButton({
  billingEnabled,
  showMembershipStatus = false,
}: {
  billingEnabled: boolean;
  showMembershipStatus?: boolean;
}) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const router = useRouter();
  const requestInFlight = useRef(false);
  const [retryCount, setRetryCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [billing, setBilling] = useState<BillingStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBilling(null);
    setError(null);
    setCheckingStatus(true);
    if (!isLoaded) return;
    if (!isSignedIn || !userId) {
      setCheckingStatus(false);
      return;
    }

    const authenticatedUserId = userId;
    let active = true;

    async function loadBillingStatus() {
      try {
        const data = await getBillingStatus(authenticatedUserId);
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
  }, [isLoaded, isSignedIn, userId, retryCount]);

  const hasFounderAccess = billing?.accessMode === "founder";
  const hasPreviewAccess = billing?.accessMode === "preview";
  const hasControlledAccess = hasFounderAccess || hasPreviewAccess;

  const hasPremiumAccess = billing?.plan === "premium";

  if (!billingEnabled && !hasControlledAccess && !hasPremiumAccess) {
    if (isLoaded && isSignedIn && checkingStatus) {
      return (
        <button
          type="button"
          disabled
          className="w-full rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] opacity-60"
        >
          Checking Premium access...
        </button>
      );
    }

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
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setLoading(true);
    setError(null);

    try {
      if (!isLoaded || !isSignedIn) {
        router.push("/sign-in?redirect_url=%2Fpricing%23membership");
        return;
      }

      if (hasControlledAccess || hasPremiumAccess) {
        router.push("/premium");
        return;
      }

      if (billing?.portalAvailable && blocksNewCheckout(billing.status)) {
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
        router.push("/premium-waitlist");
        return;
      }

      if (response.status === 401) {
        router.push("/sign-in?redirect_url=%2Fpricing%23membership");
        return;
      }

      if (response.status === 409 && data.code === "ALREADY_PREMIUM") {
        router.push("/premium");
        return;
      }

      if (response.status === 409 && data.code === "SUBSCRIPTION_EXISTS") {
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
          : "Could not start checkout.",
      );
      setLoading(false);
    } finally {
      requestInFlight.current = false;
      setLoading(false);
    }
  }

  async function manageSubscription() {
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setLoading(true);
    setError(null);
    try {
      await openBillingPortal();
    } catch (portalError) {
      setError(
        portalError instanceof Error
          ? portalError.message
          : "Could not open billing management.",
      );
    } finally {
      requestInFlight.current = false;
      setLoading(false);
    }
  }

  const shouldManageBilling = Boolean(
    billing?.portalAvailable && blocksNewCheckout(billing.status),
  );

  return (
    <div className="text-white">
      {showMembershipStatus && !checkingStatus && billing && (
        <div
          role="status"
          className="mb-4 rounded-xl border border-white/20 bg-[#07172B] p-4 text-sm leading-6 text-white"
        >
          <p className="font-bold text-[#F0D58C]">
            {hasFounderAccess
              ? "Founder access enabled"
              : hasPreviewAccess
                ? "Preview access enabled"
                : hasPremiumAccess
                  ? "Your Premium membership is active"
                  : shouldManageBilling
                    ? "Your subscription needs attention"
                    : "Ready for your Premium next step"}
          </p>
          {hasPremiumAccess &&
            billing.accessMode === "subscription" &&
            billing.currentPeriodEnd &&
            !Number.isNaN(Date.parse(billing.currentPeriodEnd)) && (
              <p className="mt-1 text-xs text-white/80">
                {billing.cancelAtPeriodEnd ? "Access until" : "Next renewal"}:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeZone: "UTC",
                }).format(new Date(billing.currentPeriodEnd))}
              </p>
            )}
          {hasControlledAccess && (
            <p className="mt-1 text-xs text-white/80">
              Authorized access. No paid subscription is implied.
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={
          isSignedIn && !billing
            ? () => setRetryCount((count) => count + 1)
            : startCheckout
        }
        disabled={loading || checkingStatus}
        className="w-full rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F0D58C] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? shouldManageBilling
            ? "Opening billing management..."
            : "Opening secure checkout..."
          : checkingStatus
            ? "Checking membership..."
            : hasFounderAccess
              ? "Open TGPI Founder Access"
              : hasPreviewAccess
                ? "Open TGPI Premium Preview"
                : hasPremiumAccess
                  ? "Open Premium workspace"
                  : isSignedIn && !billing
                    ? "Retry membership check"
                    : shouldManageBilling
                      ? "Manage subscription"
                      : isSignedIn
                        ? "Continue to secure checkout"
                        : "Sign in to subscribe"}
      </button>

      {hasPremiumAccess && billing?.portalAvailable && !hasControlledAccess && (
        <button
          type="button"
          onClick={manageSubscription}
          disabled={loading || checkingStatus}
          className="mt-3 min-h-11 w-full rounded-xl border border-white/30 bg-[#07172B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#142D4C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F0D58C] disabled:opacity-60"
        >
          Manage subscription
        </button>
      )}
      {error && (
        <p
          className="mt-3 rounded-xl border border-[#D8D2C4] bg-[#FFFDF8] p-3 text-sm font-semibold text-[#8B1E1E]"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
