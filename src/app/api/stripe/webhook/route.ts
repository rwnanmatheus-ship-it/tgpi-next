import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeServer } from "@/lib/stripe";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET." },
      { status: 500 }
    );
  }

  try {
    const stripe = getStripeServer();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header." },
        { status: 400 }
      );
    }

    const body = await request.text();

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        console.log("Stripe webhook event:", event.type);
        break;
      default:
        console.log("Unhandled Stripe event:", event.type);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Stripe.errors.StripeSignatureVerificationError
        ? "Invalid Stripe signature."
        : "Webhook processing failed.";

    console.error("Stripe webhook error:", error);

    return NextResponse.json({ error: message }, { status: 400 });
  }
}