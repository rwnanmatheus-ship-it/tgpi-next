"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { GlobalKeyIntegrityError } from "@/lib/global-key-crypto";
import { rotateUserGlobalKey } from "@/lib/global-key.server";
import type { TgpiGlobalKeyView } from "@/lib/global-key";

export type RotateGlobalKeyResult =
  | { key: TgpiGlobalKeyView; ok: true }
  | { error: string; ok: false };

export async function rotateGlobalKeyAction(): Promise<RotateGlobalKeyResult> {
  const session = await auth();
  if (!session.userId) {
    return { error: "Your session has expired. Sign in again.", ok: false };
  }

  try {
    const key = await rotateUserGlobalKey(session.userId);
    revalidatePath("/global-key");
    revalidatePath("/profile");
    return { key, ok: true };
  } catch (error) {
    if (error instanceof GlobalKeyIntegrityError) {
      return { error: error.message, ok: false };
    }
    console.error("Unable to rotate TGPI Global Key", error);
    return {
      error: "The cryptographic proof could not be rotated right now.",
      ok: false,
    };
  }
}
