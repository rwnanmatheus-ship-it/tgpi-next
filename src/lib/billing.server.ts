import { createHash } from "node:crypto";
import { createFirestoreUpdateWrite, getFirestoreDocument, runFirestoreTransaction } from "@/lib/firestore-admin-rest.server";
import { stripeCustomerIdempotencyKey } from "@/lib/checkout-intent.server";
import { recordFunnelEvent } from "@/lib/funnel.server";
import "server-only";
import { tryPublishNotification } from "@/lib/notifications/store.server";
import { billingEvent } from "@/lib/notifications/model";

import { clerkClient } from "@clerk/nextjs/server";
import type Stripe from "stripe";
import {
  blocksNewCheckout,
  createFreeSubscriptionRecord,
  grantsPremiumAccess,
  normalizeSubscriptionRecord,
  TGPI_BILLING_METADATA_KEY,
} from "@/lib/billing";
import { TGPI_PREMIUM_PRICE_ID, getStripeServer } from "@/lib/stripe";
import type { SubscriptionRecord, SubscriptionStatus } from "@/types";

type StripeEventReference = Pick<Stripe.Event, "created" | "id">;

function customerIdFromSubscription(subscription: Stripe.Subscription) {
  return typeof subscription.customer === "string"
    ? subscription.customer
    : subscription.customer.id;
}

function subscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const periodEnd = subscription.items.data.reduce(
    (latest, item) => Math.max(latest, item.current_period_end || 0),
    0,
  );

  return periodEnd > 0 ? new Date(periodEnd * 1000).toISOString() : "";
}

function subscriptionPriceId(subscription: Stripe.Subscription) {
  return subscription.items.data[0]?.price.id || "";
}

function toSubscriptionStatus(
  status: Stripe.Subscription.Status,
): SubscriptionStatus {
  return status;
}

function hasConfiguredPremiumPrice(priceId: string) {
  return Boolean(TGPI_PREMIUM_PRICE_ID) && priceId === TGPI_PREMIUM_PRICE_ID;
}

const billingPath = (uid: string) => `tgpiLearningUsers/${uid}/billing/subscription`;
const eventPath = (uid: string, id: string) => `tgpiLearningUsers/${uid}/billingEvents/${createHash("sha256").update(id).digest("hex")}`;

// Legacy Clerk metadata remains a compatibility mirror, never the authority
// once an atomic Firestore record exists. A failed mirror must not undo billing.
async function mirrorBillingRecord(record: SubscriptionRecord) {
  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(record.uid, {
      privateMetadata: { [TGPI_BILLING_METADATA_KEY]: record, plan: record.plan },
    });
  } catch {
    console.error("TGPI billing mirror unavailable; authoritative record retained.");
  }
}

async function legacyBillingRecord(uid: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(uid);
  return normalizeSubscriptionRecord(user.privateMetadata[TGPI_BILLING_METADATA_KEY], uid);
}

export async function getUserBillingRecord(uid: string) {
  // Only absence allows legacy fallback. A storage failure must not revive stale
  // privileges from Clerk after cancellation or failed payment.
  const document = await getFirestoreDocument<SubscriptionRecord>(billingPath(uid));
  return document ? normalizeSubscriptionRecord(document.data, uid) : legacyBillingRecord(uid);
}

export async function getOrCreateStripeCustomer(uid: string) {
  const billing = await getUserBillingRecord(uid);
  if (billing.stripeCustomerId) return billing.stripeCustomerId;

  const stripe = getStripeServer();
  const customer = await stripe.customers.create({
    metadata: {
      tgpiPlan: "premium",
      tgpiUserId: uid,
    },
  }, { idempotencyKey: stripeCustomerIdempotencyKey(uid) });

  const record = await runFirestoreTransaction(async ({ getDocuments }) => {
    const path = billingPath(uid);
    const document = (await getDocuments<SubscriptionRecord>([path])).get(path);
    const current = document ? normalizeSubscriptionRecord(document.data, uid) : billing;
    if (current.stripeCustomerId) return { result: current, writes: [] };
    const next = { ...current, stripeCustomerId: customer.id, updatedAt: new Date().toISOString() };
    return { result: next, writes: [createFirestoreUpdateWrite(path, { ...next }, document?.updateTime ? { updateTime: document.updateTime } : { exists: false })] };
  });
  await mirrorBillingRecord(record);

  return record.stripeCustomerId;
}

export async function findLatestStripeSubscription(customerId: string) {
  const stripe = getStripeServer();
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 100,
    status: "all",
  });
  if (subscriptions.has_more) throw new Error("Stripe subscription history requires reconciliation.");
  const premiumSubscriptions = subscriptions.data.filter((subscription) =>
    hasConfiguredPremiumPrice(subscriptionPriceId(subscription)),
  );

  return (
    premiumSubscriptions.find((subscription) => grantsPremiumAccess(toSubscriptionStatus(subscription.status))) ||
    premiumSubscriptions.find((subscription) =>
      blocksNewCheckout(toSubscriptionStatus(subscription.status)),
    ) || premiumSubscriptions[0] || null
  );
}

export async function resolveSubscriptionUserId(
  subscription: Stripe.Subscription,
) {
  const metadataUserId = subscription.metadata.tgpiUserId?.trim();
  if (metadataUserId) return metadataUserId;

  const stripe = getStripeServer();
  const customer = await stripe.customers.retrieve(
    customerIdFromSubscription(subscription),
  );

  if (customer.deleted) return "";
  return customer.metadata.tgpiUserId?.trim() || "";
}

export async function syncUserBillingFromSubscription({
  event,
  subscription,
  uid,
}: {
  event?: StripeEventReference;
  subscription: Stripe.Subscription;
  uid: string;
}) {
  const legacy = await getUserBillingRecord(uid);
  const path = billingPath(uid);
  const processedPath = event ? eventPath(uid, event.id) : null;
  const outcome = await runFirestoreTransaction(async ({ getDocuments }) => {
    const documents = await getDocuments<SubscriptionRecord>(processedPath ? [path, processedPath] : [path]);
    const document = documents.get(path);
    const current = document ? normalizeSubscriptionRecord(document.data, uid) : legacy;
    if (processedPath && documents.get(processedPath)) return { result: { record: current, changed: false, activated: false }, writes: [] };

    const stripe = getStripeServer();
    // Re-read the provider *inside* each transaction attempt. The event body can
    // be arbitrarily old; equal-second timestamps cannot establish event order.
    const customerId = customerIdFromSubscription(subscription);
    if (current.stripeCustomerId && current.stripeCustomerId !== customerId) throw new Error("Stripe billing customer ownership mismatch.");
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted ? current.stripeCustomerId !== customerId : customer.metadata.tgpiUserId !== uid) throw new Error("Stripe billing owner could not be verified.");
    const subscriptions = customer.deleted
      ? { data: [{ ...subscription, status: "canceled" as const }], has_more: false }
      : await stripe.subscriptions.list({ customer: customerId, limit: 100, status: "all" });
    if (subscriptions.has_more) throw new Error("Stripe subscription history requires reconciliation.");
    const candidates = subscriptions.data.filter(item => hasConfiguredPremiumPrice(subscriptionPriceId(item)));
    const live = candidates.find(item => grantsPremiumAccess(toSubscriptionStatus(item.status)))
      || candidates.find(item => blocksNewCheckout(toSubscriptionStatus(item.status)))
      || candidates[0]
      || subscriptions.data.find(item => item.id === (current.stripeSubscriptionId || subscription.id));
    if (!live) throw new Error("Configured subscription was not found at Stripe.");
    if (live.metadata.tgpiUserId && live.metadata.tgpiUserId !== uid) throw new Error("Stripe subscription ownership mismatch.");
    const status = toSubscriptionStatus(live.status);
    const record: SubscriptionRecord = {
      ...createFreeSubscriptionRecord(uid),
      plan: grantsPremiumAccess(status) && hasConfiguredPremiumPrice(subscriptionPriceId(live)) ? "premium" : "free",
      status,
      stripeCustomerId: customerId,
      stripeSubscriptionId: live.id,
      stripePriceId: subscriptionPriceId(live),
      currentPeriodEnd: subscriptionPeriodEnd(live),
      cancelAtPeriodEnd: live.cancel_at_period_end,
      lastStripeEventId: event?.id || current.lastStripeEventId,
      lastStripeEventCreated: Math.max(event?.created || 0, current.lastStripeEventCreated),
      updatedAt: new Date().toISOString(),
    };
    const writes = [createFirestoreUpdateWrite(path, { ...record }, document?.updateTime ? { updateTime: document.updateTime } : { exists: false })];
    if (processedPath && event) writes.push(createFirestoreUpdateWrite(processedPath, { eventId: event.id, processedAt: record.updatedAt }, { exists: false }));
    return { result: { record, changed: true, activated: record.plan === "premium" && current.plan !== "premium" }, writes };
  });
  // All access checks and billing UI now read the canonical record. A late
  // compatibility mirror therefore cannot resurrect an old Premium entitlement.
  await mirrorBillingRecord(outcome.record);
  if (outcome.changed) {
    if (event && outcome.activated) recordFunnelEvent("subscription_confirmed", subscription.metadata.tgpiAnalyticsConsent === "granted");
    await tryPublishNotification(uid, billingEvent(outcome.record.stripeSubscriptionId, outcome.record.status, outcome.record.cancelAtPeriodEnd, outcome.record.currentPeriodEnd));
  }
  return outcome.record;
}
