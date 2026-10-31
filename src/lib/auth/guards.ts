import { getUserBillingRecord } from "@/lib/billing.server";
import "server-only";
import { getCertificateName, normalizeAccountIdentity, normalizeTgpiAccountProfile } from "@/lib/account-profile";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { createHash } from "node:crypto";
import { notFound, redirect } from "next/navigation";
import { getControlledPremiumAccessMode } from "@/lib/premium-access.server";

export type TgpiPlan = "free" | "premium";
export type TgpiRole = "member" | "admin";

export class TgpiAuthenticationError extends Error {
  readonly status = 401;

  constructor() {
    super("Authentication required.");
    this.name = "TgpiAuthenticationError";
  }
}

export function formatTgpiGlobalId(userId: string) {
  const digest = createHash("sha256")
    .update(`tgpi-global-id:${userId}`)
    .digest("hex")
    .slice(0, 12)
    .toUpperCase();
  const groups = digest.match(/.{1,4}/g)?.join("-") || "PENDING";
  return `TGPI-${groups}`;
}

export async function requireUser() {
  const session = await auth();

  if (!session.userId) {
    redirect("/sign-in");
  }

  return {
    userId: session.userId,
    sessionId: session.sessionId,
  };
}

export async function requireApiUser() {
  const session = await auth();

  if (!session.userId) {
    throw new TgpiAuthenticationError();
  }

  const user = await currentUser();

  return {
    uid: session.userId,
    email: user?.primaryEmailAddress?.emailAddress || "",
    emailVerified:
      user?.primaryEmailAddress?.verification?.status === "verified",
    publicName: getCertificateName(normalizeAccountIdentity(user), normalizeTgpiAccountProfile(user?.unsafeMetadata.tgpiAccountProfile)) || user?.fullName || "TGPI Member",
  };
}

export async function requireAdmin() {
  const session = await requireUser();
  const client = await clerkClient();
  const user = await client.users.getUser(session.userId);

  if (user.privateMetadata.role !== "admin") {
    notFound();
  }

  return { ...session, role: "admin" as const };
}

export async function requirePremium() {
  const session = await requireUser();
  const client = await clerkClient();
  const user = await client.users.getUser(session.userId);
  const billing = await getUserBillingRecord(session.userId);
  const controlledAccessMode = await getControlledPremiumAccessMode(
    {
      uid: session.userId,
      email: user.primaryEmailAddress?.emailAddress,
      emailVerified:
        user.primaryEmailAddress?.verification?.status === "verified",
    },
  );

  if (billing.plan !== "premium" && !controlledAccessMode) {
    redirect("/pricing");
  }

  return {
    ...session,
    accessMode: controlledAccessMode || ("subscription" as const),
    billing,
    plan: "premium" as const,
    user,
  };
}
