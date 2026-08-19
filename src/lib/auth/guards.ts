import "server-only";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { createHash } from "node:crypto";
import { notFound, redirect } from "next/navigation";

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

  if (user.privateMetadata.plan !== "premium") {
    redirect("/pricing");
  }

  return { ...session, plan: "premium" as const };
}
