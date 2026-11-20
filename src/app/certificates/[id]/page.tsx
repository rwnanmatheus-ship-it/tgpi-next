import { currentUser } from "@clerk/nextjs/server";
import { getCertificateName, mergeAccountProfileWithOnboarding, normalizeAccountIdentity } from "@/lib/account-profile";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CredentialRecordView from "@/components/credentials/CredentialRecordView";
import { requireUser } from "@/lib/auth/guards";
import {
  getPublicLearningCredential,
  getUserLearningCredential,
} from "@/lib/learning-records.server";

const sourceMetadata: Metadata = {
  title: "My verified certificate — TGPI",
  description:
    "View your achievement, download the latest certificate PDF and share its live verification record.",
  robots: { follow: false, index: false },
};
export const dynamic = "force-dynamic";

export default async function CredentialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireUser();
  const { id } = await params;
  if (!/^TGPI-[A-Z0-9_-]{8,90}$/.test(id)) notFound();
  const owned = await getUserLearningCredential(session.userId, id);
  if (!owned) notFound();
  const credential = await getPublicLearningCredential(id, session.userId);
  if (!credential) notFound();
  const user = await currentUser();
  const currentCertificateName = user?.id === session.userId
    ? getCertificateName(
      normalizeAccountIdentity(user),
      mergeAccountProfileWithOnboarding(user.unsafeMetadata.tgpiAccountProfile, user.unsafeMetadata.tgpiOnboarding),
    )
    : "";
  return <CredentialRecordView credential={credential} owner currentCertificateName={currentCertificateName} />;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
