import { reserveCheckoutIntent } from "@/lib/checkout-intent.server";
import { matchesPremiumOffer } from "@/lib/commercial-offer";
import { recordFunnelEvent, requestFunnelConsent } from "@/lib/funnel.server";
import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import {
  findLatestStripeSubscription,
  getOrCreateStripeCustomer,
  syncUserBillingFromSubscription,
} from "@/lib/billing.server";
import { blocksNewCheckout } from "@/lib/billing";
import {
  TGPI_PREMIUM_PRICE_ID,
  getBaseUrl,
  getStripeServer,
  isSameOriginRequest,
} from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const billingEnabled = process.env.BILLING_ENABLED === "true";

    if (!billingEnabled) {
      return NextResponse.json(
        {
          error: "Billing is temporarily unavailable.",
          code: "BILLING_DISABLED",
        },
        { status: 503 }
      );
    }

    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { error: "Checkout request could not be verified." },
        { status: 403 },
      );
    }

    const user = await requireApiUser();

    if (!TGPI_PREMIUM_PRICE_ID) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_ID_PREMIUM." },
        { status: 500 }
      );
    }

    const stripe = getStripeServer();
    // Read-only validation before customer or Checkout creation: never bill an
    // amount or cadence that differs from the advertised monthly offer.
    const price = await stripe.prices.retrieve(TGPI_PREMIUM_PRICE_ID);
    if (!matchesPremiumOffer(price)) return NextResponse.json({ error: "The membership offer is being reviewed. Please try again later.", code: "OFFER_MISMATCH" }, { status: 503 });
    const baseUrl = getBaseUrl(request);
    const customerId = await getOrCreateStripeCustomer(user.uid);
    const existingSubscription =
      await findLatestStripeSubscription(customerId);

    if (existingSubscription) {
      const billing = await syncUserBillingFromSubscription({
        subscription: existingSubscription,
        uid: user.uid,
      });

      if (blocksNewCheckout(billing.status)) {
        return NextResponse.json(
          {
            error:
              billing.plan === "premium"
                ? "TGPI Premium is already active."
                : "A subscription already exists. Open billing management to continue.",
            code:
              billing.plan === "premium"
                ? "ALREADY_PREMIUM"
                : "SUBSCRIPTION_EXISTS",
          },
          { status: 409 },
        );
      }
    }

    const intent = await reserveCheckoutIntent({
      uid: user.uid, customerId, priceId: TGPI_PREMIUM_PRICE_ID,
      baseUrl, analyticsConsent: requestFunnelConsent(request),
    });
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      expires_at: intent.expiresAt,
      line_items: [
        {
          price: TGPI_PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ],
      customer: customerId,
      client_reference_id: user.uid,
      metadata: {
        tgpiUserId: user.uid,
        plan: "premium",
        source: "tgpi_premium_page",
      },
      subscription_data: {
        metadata: {
          tgpiUserId: user.uid,
          plan: "premium",
          tgpiAnalyticsConsent: intent.analyticsConsent ? "granted" : "denied",
        },
      },
      success_url: `${baseUrl}/upgrade-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      allow_promotion_codes: true,
      locale: "auto",
    }, { idempotencyKey: `tgpi-checkout-v1-${intent.id}` });

    // Replayed requests may return a completed or expired Stripe session.
    // The redirect never grants benefits; billing synchronization remains authoritative.
    const currentSession = await stripe.checkout.sessions.retrieve(session.id);
    if (currentSession.status !== "open" || !currentSession.url) {
      return NextResponse.json({ error: "This checkout is no longer open. Check your billing status before trying again.", code: "CHECKOUT_NOT_OPEN" }, { status: 409 });
    }

    recordFunnelEvent("checkout_started", requestFunnelConsent(request));
    return NextResponse.json({ url: currentSession.url }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    const status = error instanceof TgpiAuthenticationError ? 401 : 500;

    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      { error: status === 401 ? "Authentication required." : "Could not create checkout session." },
      { status }
    );
  }
}
