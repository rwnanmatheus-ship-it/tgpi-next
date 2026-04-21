import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id." },
        { status: 400 }
      );
    }

    const stripe = getStripeServer();

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    return NextResponse.json({
      id: session.id,
      payment_status: session.payment_status,
      status: session.status,
      customer_email: session.customer_details?.email || session.customer_email || "",
      metadata: session.metadata || {},
      subscriptionId:
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id || "",
    });
  } catch (error) {
    console.error("Stripe session fetch error:", error);
    return NextResponse.json(
      { error: "Could not fetch checkout session." },
      { status: 500 }
    );
  }
}