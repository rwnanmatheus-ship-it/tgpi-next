import type { Metadata } from "next";
import { headers } from "next/headers";
import GlobalKeyCenter from "@/components/profile/GlobalKeyCenter";
import { requireUser } from "@/lib/auth/guards";
import { getOrCreateGlobalKey } from "@/lib/global-key.server";

export const metadata: Metadata = {
  title: "Global Key Public Anchor — TGPI",
  description:
    "Manage the cryptographic proof, Base Mainnet anchor and integrity history connected to your TGPI Global Key.",
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
  const [session, requestHeaders] = await Promise.all([requireUser(), headers()]);
  const key = await getOrCreateGlobalKey(session.userId);

  return (
    <GlobalKeyCenter
      initialKey={key}
      verifyOrigin={getRequestOrigin(requestHeaders)}
    />
  );
}
