import type { UserPlan } from "./user";

export type SubscriptionStatus =
  | "inactive"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid";

export type SubscriptionRecord = {
  uid: string;
  plan: UserPlan;
  status: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  updatedAt?: string;
};

export type CheckoutSessionSummary = {
  id: string;
  paymentStatus: string | null;
  status: string | null;
  subscriptionId: string;
};
