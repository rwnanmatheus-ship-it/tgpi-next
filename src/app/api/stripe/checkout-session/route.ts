import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { getUserBillingRecord } from "@/lib/billing.server";
import { getStripeServer } from "@/lib/stripe";

const CHECKOUT_SESSION_ID = /^cs_(?:test_|live_)?[A-Za-z0-9]+$/;

export async function GET(request: Request) {
  try {
    const user = await requireApiUser();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id")?.trim();

    if (
      !sessionId ||
      sessionId.length > 255 ||
      !CHECKOUT_SESSION_ID.test(sessionId)
    ) {
      return NextResponse.json(
        { error: "Invalid session_id." },
        { status: 400 }
      );
    }

    const stripe = getStripeServer();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    if (session.client_reference_id !== user.uid) {
      return NextResponse.json(
        { error: "Checkout session not found." },
        { status: 404 }
      );
    }

    const billing = await getUserBillingRecord(user.uid);

    return NextResponse.json({
      id: session.id,
      paymentStatus: session.payment_status,
      status: session.status,
      plan: billing.plan,
      subscriptionStatus: billing.status,
      subscriptionId:
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id || "",
    });
  } catch (error) {
    if (error instanceof TgpiAuthenticationError) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    console.error("Stripe session fetch error:", error);
    return NextResponse.json(
      { error: "Could not fetch checkout session." },
      { status: 500 }
    );
  }
}
