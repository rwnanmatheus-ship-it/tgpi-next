"use server";

import { verifyGlobalKeyShare } from "@/lib/global-key-share.server";

export async function verifyTemporaryGlobalId(token: string) {
  return typeof token === "string" ? verifyGlobalKeyShare(token) : { status: "invalid" as const };
}
