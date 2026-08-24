import "server-only";

import { headers } from "next/headers";
import { canGrantPremiumPreviewAccess } from "@/lib/premium-preview";

export async function hasPremiumPreviewAccess(uid: string) {
  const requestHeaders = await headers();
  const requestHost =
    requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");

  return canGrantPremiumPreviewAccess({
    allowedUserIds: process.env.TGPI_PREMIUM_PREVIEW_USER_IDS,
    requestHost,
    uid,
    vercelEnvironment: process.env.VERCEL_ENV,
  });
}
