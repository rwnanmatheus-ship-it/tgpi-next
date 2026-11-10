import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CredentialRecordView from "@/components/credentials/CredentialRecordView";
import CredentialVerificationProblem from "@/components/credentials/CredentialVerificationProblem";
import { normalizeCertificateId } from "@/lib/certificate-reference";
import { isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import { getPublicLearningCredential } from "@/lib/learning-records.server";

const sourceMetadata: Metadata = {
  title: "Verify a learning certificate — TGPI",
  description:
    "Check the live TGPI issuer record, learner identity, certificate status and learning evidence.",
  robots: { follow: false, index: false },
};
export const dynamic = "force-dynamic";

export default async function VerifyLearningCredentialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const normalizedId = normalizeCertificateId(id);
  if (!normalizedId) notFound();
  if (id !== normalizedId) redirect("/verify/credentials/" + encodeURIComponent(normalizedId));
  if (!isLearningStorageConfigured()) return <CredentialVerificationProblem unavailable />;
  let credential;
  try {
    credential = await getPublicLearningCredential(normalizedId);
  } catch (error) {
    console.error("Certificate registry lookup failed", error instanceof Error ? error.name : "Unknown error");
    return <CredentialVerificationProblem unavailable />;
  }
  if (!credential) notFound();
  return <CredentialRecordView credential={credential} owner={false} />;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
