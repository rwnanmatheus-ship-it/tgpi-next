import "server-only";

import {
  hasFounderAccess,
  type FounderIdentity,
} from "@/lib/founder-access.server";
import { hasPremiumPreviewAccess } from "@/lib/premium-preview.server";
import type { PremiumAccessMode } from "@/types";

export type ControlledPremiumAccessMode = Extract<
  PremiumAccessMode,
  "founder" | "preview"
>;

export async function getControlledPremiumAccessMode(
  identity: FounderIdentity,
): Promise<ControlledPremiumAccessMode | null> {
  if (await hasFounderAccess(identity)) return "founder";
  if (await hasPremiumPreviewAccess(identity.uid)) return "preview";

  return null;
}
