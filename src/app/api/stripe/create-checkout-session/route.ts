import { NextResponse } from "next/server";
import { requireFirebaseUser } from "@/lib/firebase-auth-server";
import { TGPI_PREMIUM_PRICE_ID, getBaseUrl, getStripeServer } from "@/lib/stripe";

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

    const user = await requireFirebaseUser(request);

    if (!TGPI_PREMIUM_PRICE_ID) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_ID_PREMIUM." },
        { status: 500 }
      );
    }

    const stripe = getStripeServer();
    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: TGPI_PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: user.email || undefined,
      client_reference_id: user.uid,
      metadata: {
        uid: user.uid,
        plan: "premium",
        source: "tgpi_premium_page",
      },
      subscription_data: {
        metadata: {
          uid: user.uid,
          plan: "premium",
        },
      },
      success_url: `${baseUrl}/upgrade-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/premium?canceled=1`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create checkout session.";
    const status = message.includes("Firebase ID token") || message.includes("INVALID_ID_TOKEN")
      ? 401
      : 500;

    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      { error: status === 401 ? "Authentication required." : "Could not create checkout session." },
      { status }
    );
  }
}
