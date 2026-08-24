import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  resolveSubscriptionUserId,
  syncUserBillingFromSubscription,
} from "@/lib/billing.server";
import { getStripeServer } from "@/lib/stripe";

async function syncCheckoutSubscription(
  session: Stripe.Checkout.Session,
  event: Stripe.Event,
) {
  if (session.mode !== "subscription" || !session.subscription) return;

  const stripe = getStripeServer();
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription.id;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const metadataUserId = await resolveSubscriptionUserId(subscription);
  const sessionUserId = session.client_reference_id?.trim() || "";

  if (metadataUserId && sessionUserId && metadataUserId !== sessionUserId) {
    throw new Error("Stripe subscription ownership mismatch.");
  }

  const uid = sessionUserId || metadataUserId;
  if (!uid) {
    console.warn("Stripe checkout has no TGPI user reference:", session.id);
    return;
  }

  await syncUserBillingFromSubscription({ event, subscription, uid });
}

async function syncSubscription(
  subscription: Stripe.Subscription,
  event: Stripe.Event,
) {
  const uid = await resolveSubscriptionUserId(subscription);

  if (!uid) {
    console.warn("Stripe subscription has no TGPI user reference:", subscription.id);
    return;
  }

  await syncUserBillingFromSubscription({ event, subscription, uid });
}

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
      case "checkout.session.async_payment_succeeded":
        await syncCheckoutSubscription(
          event.data.object as Stripe.Checkout.Session,
          event,
        );
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "customer.subscription.paused":
      case "customer.subscription.resumed":
        await syncSubscription(
          event.data.object as Stripe.Subscription,
          event,
        );
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const signatureError =
      error instanceof Stripe.errors.StripeSignatureVerificationError;
    const message = signatureError
      ? "Invalid Stripe signature."
      : "Webhook processing failed.";

    console.error("Stripe webhook error:", error);

    return NextResponse.json(
      { error: message },
      { status: signatureError ? 400 : 500 },
    );
  }
}
