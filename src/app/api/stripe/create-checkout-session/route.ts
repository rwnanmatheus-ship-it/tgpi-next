import { NextResponse } from "next/server";
import { TGPI_PREMIUM_PRICE_ID, getBaseUrl, getStripeServer } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const uid = String(body?.uid || "");
    const email = String(body?.email || "");

    if (!uid) {
      return NextResponse.json(
        { error: "Missing user uid." },
        { status: 400 }
      );
    }

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
      customer_email: email || undefined,
      metadata: {
        uid,
        plan: "premium",
        source: "tgpi_premium_page",
      },
      success_url: `${baseUrl}/upgrade-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/premium?canceled=1`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      { error: "Could not create checkout session." },
      { status: 500 }
    );
  }
}