import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { blocksNewCheckout } from "@/lib/billing";
import { findLatestStripeSubscription, getOrCreateStripeCustomer, getUserBillingRecord } from "@/lib/billing.server";
import { assertBillingMode, getBillingCustomer, getBillingSubscription } from "@/lib/billing-overview.server";
import { isFirestoreQuotaError } from "@/lib/firestore-admin-rest.server";
import { isLocale } from "@/lib/localization/config";
import { billingReturnHref } from "@/lib/settings-navigation";
import { getBaseUrl, getStripeServer } from "@/lib/stripe";

const headers = { "Cache-Control": "private, no-store, max-age=0" };
const json = (data: object, status = 200) => NextResponse.json(data, { headers, status });

export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== getBaseUrl(request)) {
      return json({ error: "Billing request could not be verified." }, 403);
    }

    const user = await requireApiUser();
    const params = new URL(request.url).searchParams;
    const action = params.get("action");
    if (action !== null && action !== "card" && action !== "manage") {
      return json({ error: "Invalid billing action." }, 400);
    }

    if (action === "card") assertBillingMode();
    const billing = await getUserBillingRecord(user.uid);
    const customerId = billing.stripeCustomerId || (action === "card" ? await getOrCreateStripeCustomer(user.uid) : "");
    if (!customerId) return json({ error: "No billing account was found." }, 409);

    const stripe = getStripeServer();
    await getBillingCustomer(user.uid, customerId);
    const returnUrl = `${getBaseUrl(request)}${action ? billingReturnHref : "/pricing"}`;
    const locale = params.get("locale");
    const subscriptionId = action === "card" && (billing.stripeSubscriptionId
      || (await findLatestStripeSubscription(customerId))?.id);
    const subscription = subscriptionId ? await getBillingSubscription(customerId, subscriptionId, user.uid) : null;

    // The focused flow updates the customer default only. The full portal also
    // lets subscribers replace a payment method overridden on their subscription.
    const hasOverride = subscription && blocksNewCheckout(subscription.status)
      && (subscription.default_payment_method || subscription.default_source);
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
      locale: isLocale(locale) ? locale : "auto",
      ...(action === "card" && !hasOverride ? {
        flow_data: {
          type: "payment_method_update",
          after_completion: { type: "redirect", redirect: { return_url: returnUrl } },
        },
      } : {}),
    });

    return json({ url: session.url });
  } catch (error) {
    const status = error instanceof TgpiAuthenticationError ? 401 : isFirestoreQuotaError(error) ? 503 : 500;
    if (status !== 401) console.error("Stripe customer portal error", { status });
    return json({ error: status === 401 ? "Authentication required." : "Could not open billing management." }, status);
  }
}
