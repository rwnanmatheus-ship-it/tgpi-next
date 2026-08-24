import type { UserPlan } from "./user";

export type SubscriptionStatus =
  | "inactive"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

export type SubscriptionRecord = {
  version: 1;
  uid: string;
  plan: UserPlan;
  status: SubscriptionStatus;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  lastStripeEventId: string;
  lastStripeEventCreated: number;
  updatedAt: string;
};

export type CheckoutSessionSummary = {
  id: string;
  paymentStatus: string | null;
  status: string | null;
  subscriptionId: string;
};

export type BillingStatusResponse = {
  plan: UserPlan;
  status: SubscriptionStatus;
  portalAvailable: boolean;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string;
};
