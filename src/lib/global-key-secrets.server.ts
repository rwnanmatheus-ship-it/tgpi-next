import "server-only";

import { GlobalKeyIntegrityError } from "@/lib/global-key-crypto";
import type { GlobalKeySlot } from "@/lib/global-key";

export function getGlobalKeySecretForSlot(slot: GlobalKeySlot) {
  const secret =
    slot === "a"
      ? process.env.TGPI_GLOBAL_KEY_SECRET?.trim()
      : process.env.CLERK_SECRET_KEY?.trim();

  if (!secret) {
    throw new GlobalKeyIntegrityError(
      "Global Key signing material is unavailable.",
    );
  }
  return secret;
}

export function getPrimaryGlobalKeyMaterial() {
  const dedicatedSecret = process.env.TGPI_GLOBAL_KEY_SECRET?.trim();
  if (dedicatedSecret) {
    return { secret: dedicatedSecret, slot: "a" as const };
  }
  return { secret: getGlobalKeySecretForSlot("b"), slot: "b" as const };
}
