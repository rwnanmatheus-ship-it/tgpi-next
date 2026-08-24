import type {
  SubscriptionRecord,
  SubscriptionStatus,
  UserData,
  UserPlan,
} from "@/types";

export const TGPI_BILLING_METADATA_KEY = "tgpiBilling";

const subscriptionStatuses = new Set<SubscriptionStatus>([
  "inactive",
  "trialing",
  "active",
  "past_due",
  "canceled",
  "unpaid",
  "incomplete",
  "incomplete_expired",
  "paused",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readStatus(value: unknown): SubscriptionStatus {
  return typeof value === "string" &&
    subscriptionStatuses.has(value as SubscriptionStatus)
    ? (value as SubscriptionStatus)
    : "inactive";
}

export function grantsPremiumAccess(status: SubscriptionStatus) {
  return status === "active" || status === "trialing";
}

export function blocksNewCheckout(status: SubscriptionStatus) {
  return ![
    "inactive",
    "canceled",
    "incomplete_expired",
  ].includes(status);
}

export function createFreeSubscriptionRecord(
  uid: string,
  now = new Date().toISOString(),
): SubscriptionRecord {
  return {
    version: 1,
    uid,
    plan: "free",
    status: "inactive",
    stripeCustomerId: "",
    stripeSubscriptionId: "",
    stripePriceId: "",
    currentPeriodEnd: "",
    cancelAtPeriodEnd: false,
    lastStripeEventId: "",
    lastStripeEventCreated: 0,
    updatedAt: now,
  };
}

export function normalizeSubscriptionRecord(
  value: unknown,
  uid: string,
): SubscriptionRecord {
  const fallback = createFreeSubscriptionRecord(uid);
  if (!isRecord(value)) return fallback;

  const status = readStatus(value.status);
  const storedPlan = value.plan === "premium" ? "premium" : "free";

  return {
    version: 1,
    uid,
    plan:
      storedPlan === "premium" && grantsPremiumAccess(status)
        ? "premium"
        : "free",
    status,
    stripeCustomerId: readString(value.stripeCustomerId),
    stripeSubscriptionId: readString(value.stripeSubscriptionId),
    stripePriceId: readString(value.stripePriceId),
    currentPeriodEnd: readString(value.currentPeriodEnd),
    cancelAtPeriodEnd: value.cancelAtPeriodEnd === true,
    lastStripeEventId: readString(value.lastStripeEventId),
    lastStripeEventCreated:
      typeof value.lastStripeEventCreated === "number" &&
      Number.isFinite(value.lastStripeEventCreated)
        ? Math.max(0, Math.floor(value.lastStripeEventCreated))
        : 0,
    updatedAt: readString(value.updatedAt) || fallback.updatedAt,
  };
}

export function getUserPlan(user: Pick<UserData, "plan"> | null | undefined): UserPlan {
  return user?.plan === "premium" ? "premium" : "free";
}
