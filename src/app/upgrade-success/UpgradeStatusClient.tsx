"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_ATTEMPTS = 8;
const RETRY_DELAY_MS = 2000;

type CheckoutStatus = {
  paymentStatus?: string;
  status?: string | null;
  error?: string;
};

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export default function UpgradeStatusClient({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState(
    sessionId ? "Confirming your checkout securely…" : "No checkout session was provided."
  );
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;

    async function confirmCheckout() {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
        if (cancelled) return;

        const response = await fetch(
          `/api/stripe/checkout-session?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" }
        );
        const data = (await response.json()) as CheckoutStatus;

        if (response.ok && data.status === "complete") {
          setConfirmed(true);
          setStatus(
            data.paymentStatus === "paid" || data.paymentStatus === "no_payment_required"
              ? "Checkout confirmed. Your payment was verified securely."
              : "Checkout completed. Payment confirmation is still processing."
          );
          return;
        }

        if (response.status === 401) {
          setStatus("Your session expired. Sign in again to verify this checkout.");
          return;
        }

        if (response.status === 404) {
          setStatus("This checkout does not belong to the active TGPI account.");
          return;
        }

        if (attempt < MAX_ATTEMPTS - 1) {
          setStatus("Checkout received. Waiting for secure confirmation…");
          await wait(RETRY_DELAY_MS);
        } else {
          setStatus(data.error || "Confirmation is taking longer than expected. Try again shortly.");
        }
      }
    }

    void confirmCheckout();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <main className="min-h-[75vh] bg-[#F5F1E8] px-4 py-12 text-[#0B1F3A] sm:px-6">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_28px_80px_rgba(11,31,58,0.11)]">
        <div className="bg-[#0B1F3A] p-8 text-center text-white sm:p-12">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#F0D58C]">Secure checkout verification</p>
          <h1 className="mt-4 font-[var(--tgpi-font-display)] text-5xl font-semibold tracking-[-0.04em]">Subscription status</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#C7D0DC]" role="status">{status}</p>
        </div>
        <div className="p-8 text-center sm:p-10">
          {confirmed ? (
            <p className="mx-auto max-w-2xl rounded-2xl border border-[#A7D8C2] bg-[#EEF8F3] p-4 text-sm font-bold leading-6 text-[#236147]">
              The payment reference is tied to your authenticated TGPI Global Key. Access entitlements are granted only by the server.
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/profile" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white">Go to workspace</Link>
            <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D8D2C4] bg-white px-6 text-sm font-extrabold">Back to pricing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
