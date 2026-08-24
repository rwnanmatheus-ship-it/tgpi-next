import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { getUserBillingRecord } from "@/lib/billing.server";
import {
  getBaseUrl,
  getStripeServer,
  isSameOriginRequest,
} from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { error: "Billing request could not be verified." },
        { status: 403 },
      );
    }

    const user = await requireApiUser();
    const billing = await getUserBillingRecord(user.uid);

    if (!billing.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account was found." },
        { status: 409 },
      );
    }

    const stripe = getStripeServer();
    const session = await stripe.billingPortal.sessions.create({
      customer: billing.stripeCustomerId,
      return_url: `${getBaseUrl(request)}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const status = error instanceof TgpiAuthenticationError ? 401 : 500;

    console.error("Stripe customer portal error:", error);
    return NextResponse.json(
      {
        error:
          status === 401
            ? "Authentication required."
            : "Could not open billing management.",
      },
      { status },
    );
  }
}
