import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { getUserBillingRecord } from "@/lib/billing.server";

export async function GET() {
  try {
    const user = await requireApiUser();
    const billing = await getUserBillingRecord(user.uid);

    return NextResponse.json(
      {
        plan: billing.plan,
        status: billing.status,
        portalAvailable: Boolean(billing.stripeCustomerId),
        cancelAtPeriodEnd: billing.cancelAtPeriodEnd,
        currentPeriodEnd: billing.currentPeriodEnd,
      },
      {
        headers: { "Cache-Control": "private, no-store, max-age=0" },
      },
    );
  } catch (error) {
    const status = error instanceof TgpiAuthenticationError ? 401 : 500;

    if (status === 500) {
      console.error("Could not load TGPI billing status:", error);
    }

    return NextResponse.json(
      {
        error:
          status === 401
            ? "Authentication required."
            : "Could not load billing status.",
      },
      { status },
    );
  }
}
