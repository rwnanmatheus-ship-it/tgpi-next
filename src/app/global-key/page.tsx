import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import GlobalKeyCenter from "@/components/profile/GlobalKeyCenter";
import { requireUser } from "@/lib/auth/guards";
import { getOrCreateGlobalKey } from "@/lib/global-key.server";

export const metadata: Metadata = {
  title: "Global ID — TGPI",
  description:
    "Your permanent TGPI identity, learning credentials, verification and account security.",
  robots: { follow: false, index: false },
};

function getRequestOrigin(requestHeaders: Headers) {
  if (process.env.VERCEL_ENV === "production") {
    return "https://www.theglobalpolymath.com";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const host = requestHeaders.get("host") || "";
  return /^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host)
    ? `http://${host}`
    : "https://www.theglobalpolymath.com";
}

export default async function GlobalKeyPage() {
  const [session, requestHeaders] = await Promise.all([
    requireUser(),
    headers(),
  ]);
  const [key, member] = await Promise.all([
    getOrCreateGlobalKey(session.userId),
    currentUser(),
  ]);

  return (
    <GlobalKeyCenter
      initialKey={key}
      memberName={member?.fullName || member?.username || "TGPI Member"}
      verifyOrigin={getRequestOrigin(requestHeaders)}
    />
  );
}
