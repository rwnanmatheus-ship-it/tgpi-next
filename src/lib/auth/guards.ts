import { PREMIUM_REQUIRED, premiumUpgradeHref } from "@/lib/premium-upgrade";
import { safeReturnTo } from "@/lib/auth/return-to";
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

export async function requireUser(returnTo?: string) {
  const session = await auth();

  if (!session.userId || !session.sessionId) {
    redirect(returnTo ? `/sign-in?next=${encodeURIComponent(safeReturnTo(returnTo, "/profile"))}` : "/sign-in");
  }

  return {
    userId: session.userId,
    sessionId: session.sessionId,
  };
}

export async function requireApiUser(request?: Request) {
  const session = await auth();

  if (!session.userId || !session.sessionId) {
    throw new TgpiAuthenticationError();
  }

  if (request && request.headers.get("x-tgpi-session") !== session.sessionId) {
    throw new TgpiAuthenticationError();
  }
  const user = await currentUser();
  if (!user || user.id !== session.userId) throw new TgpiAuthenticationError();

  return {
    uid: session.userId,
    email: user?.primaryEmailAddress?.emailAddress || "",
    emailVerified:
      user?.primaryEmailAddress?.verification?.status === "verified",
    publicName: getCertificateName(
      normalizeAccountIdentity(user),
      normalizeTgpiAccountProfile(user?.unsafeMetadata.tgpiAccountProfile),
    ),
  };
}

export class TgpiPremiumRequiredError extends Error {
  readonly status = 403;
  constructor() { super('Subscribe to TGPI Premium to continue.'); }
}

export function premiumRequiredBody(returnTo?: string) {
  return { error: new TgpiPremiumRequiredError().message, code: PREMIUM_REQUIRED, upgradeHref: premiumUpgradeHref(returnTo) };
}

export function featureAccessError(error: unknown, headers: HeadersInit, returnTo: string) {
  if (error instanceof TgpiAuthenticationError) return Response.json({ error: 'Sign in to continue.' }, { status: 401, headers });
  if (error instanceof TgpiPremiumRequiredError) return Response.json(premiumRequiredBody(returnTo), { status: 403, headers });
  return Response.json({ error: 'Membership verification is temporarily unavailable. Please try again.' }, { status: 503, headers });
}

/** API entitlement matches the protected page and never trusts editable user metadata. */
export async function requirePremiumApiUser(request?: Request) {
  const user = await requireApiUser(request);
  const [billing, controlled] = await Promise.all([
    getUserBillingRecord(user.uid), getControlledPremiumAccessMode(user),
  ]);
  if (billing.plan !== 'premium' && !controlled) throw new TgpiPremiumRequiredError();
  return user;
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

export async function requirePremium(returnTo?: string) {
  const { userId, sessionId } = await auth();
  if (!userId || !sessionId) redirect(returnTo ? premiumUpgradeHref(returnTo) : "/sign-in");
  const session = { userId, sessionId };
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
    redirect(premiumUpgradeHref(returnTo));
  }

  return {
    ...session,
    accessMode: controlledAccessMode || ("subscription" as const),
    billing,
    plan: "premium" as const,
    user,
  };
}
