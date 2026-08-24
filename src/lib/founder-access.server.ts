import "server-only";

import { headers } from "next/headers";
import { canGrantFounderAccess } from "@/lib/founder-access";

export async function hasFounderAccess(uid: string) {
  const requestHeaders = await headers();
  const requestHost =
    requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");

  return canGrantFounderAccess({
    allowedUserIds: process.env.TGPI_FOUNDER_USER_IDS,
    requestHost,
    uid,
    vercelEnvironment: process.env.VERCEL_ENV,
  });
}
