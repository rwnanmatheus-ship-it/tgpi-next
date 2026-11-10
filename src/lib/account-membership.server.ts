import "server-only";

import { getUserBillingRecord } from "@/lib/billing.server";
import { isFirestoreQuotaError } from "@/lib/firestore-admin-rest.server";
import type { FounderIdentity } from "@/lib/founder-access.server";
import { getControlledPremiumAccessMode } from "@/lib/premium-access.server";

/** Display label for account pages. Access checks use the authoritative billing service. */
export async function getAccountMembershipLabel(identity: FounderIdentity) {
  const accessMode = await getControlledPremiumAccessMode(identity);
  if (accessMode === "founder") return "TGPI Founder";
  if (accessMode === "preview") return "Premium Preview";

  try {
    const billing = await getUserBillingRecord(identity.uid);
    return billing.plan === "premium" ? "TGPI Premium" : "TGPI Free";
  } catch (error) {
    console.warn(
      "TGPI account plan status unavailable.",
      isFirestoreQuotaError(error) ? "firestore_quota" : "billing_lookup_failed",
    );
    return "Could not verify membership status.";
  }
}
