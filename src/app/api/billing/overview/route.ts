import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { findLatestStripeSubscription, getUserBillingRecord } from "@/lib/billing.server";
import { describePaymentMethod, getBillingCustomer, getBillingSchedule, getBillingSubscription, listBillingInvoices } from "@/lib/billing-overview.server";
import { isFirestoreQuotaError } from "@/lib/firestore-admin-rest.server";
import { getControlledPremiumAccessMode } from "@/lib/premium-access.server";
import type { BillingOverview } from "@/types/billing";

const emptyHistory = { invoices: [], nextCursor: null };
const headers = { "Cache-Control": "private, no-store, max-age=0" };

export async function GET(request: Request) {
  try {
    const user = await requireApiUser();
    const cursor = new URL(request.url).searchParams.get("cursor");
    if (cursor !== null && !/^in_[a-zA-Z0-9]{1,64}$/.test(cursor)) {
      return NextResponse.json({ code: "INVALID_CURSOR" }, { status: 400, headers });
    }

    const billing = await getUserBillingRecord(user.uid);
    if (cursor) {
      if (!billing.stripeCustomerId) return NextResponse.json(emptyHistory, { headers });
      await getBillingCustomer(user.uid, billing.stripeCustomerId);
      return NextResponse.json(await listBillingInvoices(billing.stripeCustomerId, cursor), { headers });
    }

    const controlled = await getControlledPremiumAccessMode(user);
    const overview: BillingOverview = {
      accessMode: controlled || (billing.plan === "premium" ? "subscription" : "none"),
      plan: controlled ? "premium" : billing.plan,
      status: billing.status,
      hasBillingAccount: Boolean(billing.stripeCustomerId),
      ...getBillingSchedule(null),
      paymentMethod: null,
      history: emptyHistory,
    };

    if (billing.stripeCustomerId) {
      const customer = await getBillingCustomer(user.uid, billing.stripeCustomerId);
      const subscriptionId = billing.stripeSubscriptionId
        || (await findLatestStripeSubscription(customer.id))?.id;
      const [subscription, history] = await Promise.all([
        subscriptionId ? getBillingSubscription(customer.id, subscriptionId, user.uid) : null,
        listBillingInvoices(customer.id).catch(() => {
          console.error("Could not load Stripe billing history");
          return null;
        }),
      ]);
      Object.assign(overview, getBillingSchedule(subscription), {
        status: subscription?.status ?? billing.status,
        paymentMethod: describePaymentMethod(customer, subscription),
        history,
      });
    }
    return NextResponse.json(overview, { headers });
  } catch (error) {
    const status = error instanceof TgpiAuthenticationError ? 401 : isFirestoreQuotaError(error) ? 503 : 500;
    if (status !== 401) console.error("Could not load billing overview", { status });
    return NextResponse.json({ code: status === 401 ? "AUTH_REQUIRED" : "BILLING_UNAVAILABLE" }, { status, headers });
  }
}
