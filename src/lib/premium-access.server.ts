import "server-only";

import { hasFounderAccess } from "@/lib/founder-access.server";
import { hasPremiumPreviewAccess } from "@/lib/premium-preview.server";
import type { PremiumAccessMode } from "@/types";

export type ControlledPremiumAccessMode = Extract<
  PremiumAccessMode,
  "founder" | "preview"
>;

export async function getControlledPremiumAccessMode(
  uid: string,
): Promise<ControlledPremiumAccessMode | null> {
  if (await hasFounderAccess(uid)) return "founder";
  if (await hasPremiumPreviewAccess(uid)) return "preview";

  return null;
}
