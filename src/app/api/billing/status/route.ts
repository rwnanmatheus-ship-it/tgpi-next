import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { getUserBillingRecord } from "@/lib/billing.server";
import { getControlledPremiumAccessMode } from "@/lib/premium-access.server";

const PRIVATE_NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
} as const;

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    headers: PRIVATE_NO_STORE_HEADERS,
    status,
  });
}

export async function GET() {
  try {
    const user = await requireApiUser();
    const [billing, controlledAccessMode] = await Promise.all([
      getUserBillingRecord(user.uid),
      getControlledPremiumAccessMode(user),
    ]);
    const hasControlledAccess = Boolean(controlledAccessMode);

    return json(
      {
        accessMode: controlledAccessMode
          ? controlledAccessMode
          : billing.plan === "premium"
            ? "subscription"
            : "none",
        plan: hasControlledAccess ? "premium" : billing.plan,
        status: hasControlledAccess ? "active" : billing.status,
        portalAvailable: Boolean(billing.stripeCustomerId),
        cancelAtPeriodEnd: billing.cancelAtPeriodEnd,
        currentPeriodEnd: billing.currentPeriodEnd,
      },
    );
  } catch (error) {
    const status = error instanceof TgpiAuthenticationError ? 401 : 500;

    if (status === 500) {
      console.error("Could not load TGPI billing status:", error);
    }

    return json(
      {
        error:
          status === 401
            ? "Authentication required."
            : "Could not load billing status.",
      },
      status,
    );
  }
}
