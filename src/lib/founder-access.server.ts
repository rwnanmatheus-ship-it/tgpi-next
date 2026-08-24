import "server-only";

import { headers } from "next/headers";
import { canGrantFounderAccess } from "@/lib/founder-access";

export type FounderIdentity = {
  email?: string | null;
  emailVerified?: boolean;
  uid: string;
};

export async function hasFounderAccess({
  email,
  emailVerified = false,
  uid,
}: FounderIdentity) {
  const requestHeaders = await headers();
  const requestHost =
    requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");

  return canGrantFounderAccess({
    allowedEmails: process.env.TGPI_FOUNDER_EMAILS,
    allowedUserIds: process.env.TGPI_FOUNDER_USER_IDS,
    email,
    emailVerified,
    requestHost,
    uid,
    vercelEnvironment: process.env.VERCEL_ENV,
  });
}
