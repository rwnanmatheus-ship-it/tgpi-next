import "server-only";

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

async function writeBillingRecord(record: SubscriptionRecord) {
  const client = await clerkClient();

  await client.users.updateUserMetadata(record.uid, {
    privateMetadata: {
      [TGPI_BILLING_METADATA_KEY]: record,
      plan: record.plan,
    },
  });

  return record;
}

export async function getUserBillingRecord(uid: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(uid);

  return normalizeSubscriptionRecord(
    user.privateMetadata[TGPI_BILLING_METADATA_KEY],
    uid,
  );
}

export async function getOrCreateStripeCustomer(uid: string, email: string) {
  const billing = await getUserBillingRecord(uid);
  if (billing.stripeCustomerId) return billing.stripeCustomerId;

  const stripe = getStripeServer();
  const customer = await stripe.customers.create({
    email: email || undefined,
    metadata: {
      tgpiPlan: "premium",
      tgpiUserId: uid,
    },
  });

  await writeBillingRecord({
    ...billing,
    stripeCustomerId: customer.id,
    updatedAt: new Date().toISOString(),
  });

  return customer.id;
}

export async function findLatestStripeSubscription(customerId: string) {
  const stripe = getStripeServer();
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 20,
    status: "all",
  });
  const premiumSubscriptions = subscriptions.data.filter((subscription) =>
    hasConfiguredPremiumPrice(subscriptionPriceId(subscription)),
  );

  return (
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
  const current = await getUserBillingRecord(uid);

  if (
    event &&
    (current.lastStripeEventId === event.id ||
      event.created < current.lastStripeEventCreated)
  ) {
    return current;
  }

  const status = toSubscriptionStatus(subscription.status);
  const stripePriceId = subscriptionPriceId(subscription);
  const plan =
    grantsPremiumAccess(status) && hasConfiguredPremiumPrice(stripePriceId)
      ? "premium"
      : "free";

  return writeBillingRecord({
    ...createFreeSubscriptionRecord(uid),
    plan,
    status,
    stripeCustomerId: customerIdFromSubscription(subscription),
    stripeSubscriptionId: subscription.id,
    stripePriceId,
    currentPeriodEnd: subscriptionPeriodEnd(subscription),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    lastStripeEventId: event?.id || current.lastStripeEventId,
    lastStripeEventCreated:
      event?.created || current.lastStripeEventCreated,
    updatedAt: new Date().toISOString(),
  });
}
