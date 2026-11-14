import "server-only";
import type Stripe from "stripe";
import type { BillingInvoicePage, BillingOverview } from "@/types/billing";
import { blocksNewCheckout } from "@/lib/billing";
import { getStripeServer } from "@/lib/stripe";

export function assertBillingMode() {
  // Vercel separates production credentials from preview. Local development uses test keys.
  const mode = process.env.VERCEL_ENV === "production" ? "live" : "test";
  if (!new RegExp(`^(sk|rk)_${mode}_`).test(process.env.STRIPE_SECRET_KEY ?? "")) {
    throw Error("Stripe billing environment mismatch");
  }
}

const idOf = (value: string | { id: string } | null) => typeof value === "string" ? value : value?.id;

export async function getBillingCustomer(uid: string, customerId: string) {
  assertBillingMode();
  const customer = await getStripeServer().customers.retrieve(customerId, {
    expand: ["invoice_settings.default_payment_method", "default_source"],
  });
  // Older TGPI records can lack provider metadata. A conflicting owner never passes.
  if (customer.deleted || (customer.metadata.tgpiUserId && customer.metadata.tgpiUserId !== uid)
    || customer.metadata.product === "atlas-wallet") {
    throw Error("Stripe billing customer ownership mismatch");
  }
  return customer;
}

export async function getBillingSubscription(customerId: string, subscriptionId: string, uid: string) {
  const subscription = await getStripeServer().subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method", "default_source"],
  });
  if (idOf(subscription.customer) !== customerId
    || (subscription.metadata.tgpiUserId && subscription.metadata.tgpiUserId !== uid)) {
    throw Error("Stripe billing subscription ownership mismatch");
  }
  return subscription;
}

export function getBillingSchedule(subscription: Stripe.Subscription | null): Pick<BillingOverview, "schedule" | "cycleDate"> {
  if (!subscription || !blocksNewCheckout(subscription.status)) return { schedule: "none", cycleDate: null };
  const cycleDate = Math.max(0, ...subscription.items.data.map(item => item.current_period_end)) || null;
  if (subscription.cancel_at || subscription.cancel_at_period_end) {
    return { schedule: "ending", cycleDate: subscription.cancel_at || cycleDate };
  }
  if (subscription.pause_collection || subscription.status === "paused") return { schedule: "paused", cycleDate: null };
  return { schedule: subscription.collection_method === "charge_automatically" ? "automatic" : "manual", cycleDate };
}

export function describePaymentMethod(customer: Stripe.Customer, subscription: Stripe.Subscription | null): BillingOverview["paymentMethod"] {
  const current = subscription && blocksNewCheckout(subscription.status) ? subscription : null;
  const method = current?.default_payment_method || current?.default_source
    || customer.invoice_settings.default_payment_method || customer.default_source;
  if (!method) return null;
  const card = typeof method === "string" ? null
    : method.object === "payment_method" || method.object === "source" ? method.card
      : method.object === "card" ? method : null;
  if (!card?.last4 || !card.exp_year || !card.exp_month) return { kind: "other" };
  return {
    kind: "card",
    brand: card.brand || "",
    last4: card.last4,
    expires: `${String(card.exp_month).padStart(2, "0")}/${card.exp_year}`,
  };
}

function stripeInvoiceLink(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "invoice.stripe.com" && !url.username && !url.password
      ? url.href : null;
  } catch {
    return null;
  }
}

export async function listBillingInvoices(customerId: string, cursor?: string): Promise<BillingInvoicePage> {
  const stripe = getStripeServer();
  if (cursor) {
    const previous = await stripe.invoices.retrieve(cursor);
    if (idOf(previous.customer) !== customerId) throw Error("Stripe invoice ownership mismatch");
  }
  const page = await stripe.invoices.list({ customer: customerId, limit: 12, starting_after: cursor });
  return {
    invoices: page.data.flatMap(invoice => {
      const { status } = invoice;
      if (!invoice.id || !status || status === "draft") return [];
      return [{
        id: invoice.id,
        number: invoice.number,
        createdAt: invoice.status_transitions.finalized_at ?? invoice.created,
        status,
        currency: invoice.currency,
        amount: status === "paid" ? invoice.amount_paid : status === "open" ? invoice.amount_remaining : invoice.amount_due,
        invoiceUrl: stripeInvoiceLink(invoice.hosted_invoice_url),
        pdfUrl: stripeInvoiceLink(invoice.invoice_pdf),
      }];
    }),
    nextCursor: page.has_more ? page.data.at(-1)?.id ?? null : null,
  };
}
