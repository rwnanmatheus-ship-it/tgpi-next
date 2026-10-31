import "server-only";
import { createHash, randomUUID } from "node:crypto";
import {
  createFirestoreUpdateWrite,
  runFirestoreTransaction,
} from "@/lib/firestore-admin-rest.server";

// A durable, per-account intent keeps Stripe's idempotency key and parameters
// identical across concurrent requests, retries, processes and page reloads.
// Store below the existing server-only Firestore tree. Never release an intent
// on an ambiguous Stripe timeout: the remote request may already have succeeded.
export type CheckoutIntent = {
  id: string;
  customerId: string;
  priceId: string;
  baseUrl: string;
  analyticsConsent: boolean;
  expiresAt: number;
};

export async function reserveCheckoutIntent(input: {
  uid: string;
  customerId: string;
  priceId: string;
  baseUrl: string;
  analyticsConsent: boolean;
}): Promise<CheckoutIntent> {
  const path = `tgpiLearningUsers/${input.uid}/billing/checkout`;
  const now = Math.floor(Date.now() / 1000);
  const candidate: CheckoutIntent = {
    id: randomUUID(),
    customerId: input.customerId,
    priceId: input.priceId,
    baseUrl: input.baseUrl,
    analyticsConsent: input.analyticsConsent,
    expiresAt: now + 3600,
  };
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const document = (await getDocuments<CheckoutIntent>([path])).get(path);
    const previous = document?.data;
    if (previous && previous.expiresAt > now) {
      // An offer or origin change must not create a second payable session.
      // Finish or let the outstanding one expire before changing parameters.
      if (previous.customerId !== input.customerId || previous.priceId !== input.priceId || previous.baseUrl !== input.baseUrl) {
        throw new Error("An existing checkout must expire before changing the offer.");
      }
      return { result: previous, writes: [] };
    }
    return {
      result: candidate,
      writes: [createFirestoreUpdateWrite(path, candidate, document?.updateTime
        ? { updateTime: document.updateTime }
        : { exists: false })],
    };
  });
}

export function stripeCustomerIdempotencyKey(uid: string) {
  return `tgpi-customer-v1-${createHash("sha256").update(uid).digest("hex")}`;
}
