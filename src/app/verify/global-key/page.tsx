import type { Metadata } from "next";
import GlobalKeyVerificationResult from "@/components/profile/GlobalKeyVerificationResult";
import TemporaryGlobalIdVerification from "@/components/profile/TemporaryGlobalIdVerification";
import { isGlobalKeyProofReference } from "@/lib/certificate-reference";
import { verifyPublicGlobalKey } from "@/lib/global-key.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";

export const dynamic = "force-dynamic";

const sourceMetadata: Metadata = {
  title: "Verify a TGPI Global ID",
  description: "Check the live issuer record for a TGPI Global ID.",
  robots: { follow: false, index: false },
  referrer: "no-referrer",
};

export default async function VerifyGlobalKeyPage({
  searchParams,
}: {
  searchParams: Promise<{ proof?: string | string[] }>;
}) {
  const { proof } = await searchParams;
  if (proof === undefined) return <TemporaryGlobalIdVerification />;

  const result = typeof proof === "string" && isGlobalKeyProofReference(proof)
    ? await verifyPublicGlobalKey(proof)
    : { status: "invalid" as const };
  return <GlobalKeyVerificationResult result={result} />;
}

export async function generateMetadata() {
  return localizeMetadata(sourceMetadata);
}
