import type { UserPlan } from "./user";

export type PremiumAccessMode =
  | "none"
  | "subscription"
  | "preview"
  | "founder";

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
  accessMode: PremiumAccessMode;
  plan: UserPlan;
  status: SubscriptionStatus;
  portalAvailable: boolean;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string;
};

export type BillingInvoice = {
  id: string;
  number: string | null;
  createdAt: number;
  status: "paid" | "open" | "void" | "uncollectible";
  currency: string;
  amount: number;
  invoiceUrl: string | null;
  pdfUrl: string | null;
};

export type BillingInvoicePage = {
  invoices: BillingInvoice[];
  nextCursor: string | null;
};

export type BillingOverview = {
  accessMode: PremiumAccessMode;
  plan: UserPlan;
  status: SubscriptionStatus;
  hasBillingAccount: boolean;
  schedule: "automatic" | "manual" | "ending" | "paused" | "none";
  cycleDate: number | null;
  paymentMethod: { kind: "card"; brand: string; last4: string; expires: string } | { kind: "other" } | null;
  history: BillingInvoicePage | null;
};
