"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { saveCredentialShowcase } from "@/lib/global-key-credentials.server";
import { GlobalKeyIntegrityError } from "@/lib/global-key-crypto";
import { canMutateGlobalKey } from "@/lib/global-key-ledger.server";
import { createGlobalKeyShare, revokeGlobalKeyShare } from "@/lib/global-key-share.server";
import { GLOBAL_KEY_SHARE_DAYS, type GlobalKeyShareDays } from "@/lib/global-key-share";
import { rotateUserGlobalKey } from "@/lib/global-key.server";

async function withIdentityOwner<T>(operation: (uid: string) => Promise<T>) {
  const { userId } = await auth();
  if (!userId) return { ok: false as const, error: "Your session has expired. Sign in again." };
  if (!canMutateGlobalKey()) return { ok: false as const, error: "Identity storage is temporarily unavailable." };

  try {
    return { ok: true as const, value: await operation(userId) };
  } catch (error) {
    if (error instanceof GlobalKeyIntegrityError) return { ok: false as const, error: error.message };
    console.error("Global ID operation failed", { errorName: error instanceof Error ? error.name : "UnknownError" });
    return { ok: false as const, error: "The identity update could not be completed." };
  }
}

export async function rotateGlobalKeyAction(revision: number) {
  return withIdentityOwner(async uid => {
    if (!Number.isSafeInteger(revision) || revision < 1) {
      throw new GlobalKeyIntegrityError("Invalid identity revision.");
    }
    const key = await rotateUserGlobalKey(uid, revision);
    revalidatePath("/global-key");
    return key;
  });
}

export async function createGlobalKeyShareAction(days: number, revision: number) {
  return withIdentityOwner(uid => {
    const duration: GlobalKeyShareDays | undefined = GLOBAL_KEY_SHARE_DAYS.find(item => item === days);
    if (!duration) throw new GlobalKeyIntegrityError("Invalid link duration.");
    return createGlobalKeyShare(uid, duration, revision);
  });
}

export async function revokeGlobalKeyShareAction(id: string) {
  return withIdentityOwner(uid => revokeGlobalKeyShare(uid, id));
}

export async function saveCredentialShowcaseAction(ids: string[]) {
  return withIdentityOwner(async uid => {
    const selection = await saveCredentialShowcase(uid, ids);
    revalidatePath("/member/[userId]", "page");
    return selection;
  });
}
