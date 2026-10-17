import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CredentialRecordView from "@/components/credentials/CredentialRecordView";
import { getPublicLearningCredential } from "@/lib/learning-records.server";

export const metadata: Metadata = {
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
  if (!/^TGPI-[A-Z0-9_-]{8,90}$/.test(id)) notFound();
  const credential = await getPublicLearningCredential(id);
  if (!credential) notFound();
  return <CredentialRecordView credential={credential} owner={false} />;
}
