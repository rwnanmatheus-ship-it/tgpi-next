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
    const baseUrl = getBaseUrl(request);
    const customerId = await getOrCreateStripeCustomer(user.uid, user.email);
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

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
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
        },
      },
      success_url: `${baseUrl}/upgrade-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      allow_promotion_codes: true,
      locale: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const status = error instanceof TgpiAuthenticationError ? 401 : 500;

    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      { error: status === 401 ? "Authentication required." : "Could not create checkout session." },
      { status }
    );
  }
}
