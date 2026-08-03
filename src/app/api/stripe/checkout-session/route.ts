import { NextResponse } from "next/server";
import { requireFirebaseUser } from "@/lib/firebase-auth-server";
import { getStripeServer } from "@/lib/stripe";

function isAuthenticationError(message: string) {
  return (
    message.includes("Firebase ID token") ||
    message.includes("INVALID_ID_TOKEN") ||
    message.includes("Invalid Firebase ID token")
  );
}

export async function GET(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id")?.trim();

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

    if (session.client_reference_id !== user.uid) {
      return NextResponse.json(
        { error: "Checkout session not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: session.id,
      paymentStatus: session.payment_status,
      status: session.status,
      subscriptionId:
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id || "",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not fetch checkout session.";

    if (isAuthenticationError(message)) {
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
