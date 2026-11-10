import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import GlobalKeyCenter from "@/components/profile/GlobalKeyCenter";
import GlobalKeyQuotaState from "@/components/profile/GlobalKeyQuotaState";
import { normalizeTgpiAccountProfile } from "@/lib/account-profile";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";
import { CERTIFICATE_ORIGIN } from "@/lib/certificate-presentation";
import { verifyLearningCredentialIntegrity } from "@/lib/credential-signing.server";
import { isFirestoreQuotaError, isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import { getCredentialShowcase } from "@/lib/global-key-credentials.server";
import { canMutateGlobalKey } from "@/lib/global-key-ledger.server";
import { listGlobalKeyShares } from "@/lib/global-key-share.server";
import { getOrCreateGlobalKey } from "@/lib/global-key.server";
import { listUserLearningCredentials } from "@/lib/learning-records.server";
import { loadLearningSummary } from "@/lib/learning/unified-progress.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { getMemberIdentity } from "@/lib/members/identity.server";

const sourceMetadata: Metadata = {
  title: "TGPI Global ID",
  description: "Your permanent TGPI identity, learning credentials, verification and account security.",
  robots: { follow: false, index: false },
};

function getRequestOrigin(requestHeaders: Headers) {
  if (process.env.VERCEL_ENV === "production") return CERTIFICATE_ORIGIN;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  const host = requestHeaders.get("host") || "";
  return /^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host) ? `http://${host}` : CERTIFICATE_ORIGIN;
}

export default async function GlobalKeyPage() {
  const [{ userId }, requestHeaders] = await Promise.all([requireUser(), headers()]);
  const key = await getOrCreateGlobalKey(userId).catch((error: unknown) => {
    if (isFirestoreQuotaError(error)) return null;
    throw error;
  });
  if (!key) return <GlobalKeyQuotaState keyId={formatTgpiGlobalId(userId)} />;

  const storage = isLearningStorageConfigured();
  const canManage = canMutateGlobalKey();
  const [member, [records, progress, links, showcase, profileIdentity]] = await Promise.all([
    currentUser(),
    Promise.allSettled([
      storage ? listUserLearningCredentials(userId) : Promise.resolve(null),
      loadLearningSummary(userId),
      canManage ? listGlobalKeyShares(userId) : Promise.resolve(null),
      getCredentialShowcase(userId),
      getMemberIdentity(userId),
    ]),
  ]);

  const credentials = records.status === "fulfilled" && records.value ? records.value
    .filter(record => record.status === "active" && record.identityEvidence.globalKeyId === key.keyId &&
      verifyLearningCredentialIntegrity(record))
    .map(record => ({
      id: record.id,
      courseTitle: record.courseTitle,
      issuedAt: record.issuedAt,
      skills: record.skills.slice(0, 3).map(skill => skill.name),
      shareable: !record.professionalEvidence || record.professionalEvidence.sharing === true,
    })) : null;
  const profile = normalizeTgpiAccountProfile(member?.unsafeMetadata.tgpiAccountProfile);
  const selection = canManage && showcase.status === "fulfilled" ? showcase.value ??
    (profile.privacy.showProgress ? credentials?.filter(item => item.shareable).map(item => item.id) ?? [] : [])
    : null;

  const learning = progress.status === "fulfilled" ? progress.value.items : [];
  const nextLearning = learning.find(item => item.status === "certificate_pending" || item.status === "approved") ??
    learning.find(item => item.status !== "completed") ?? null;
  const memberNumber = profileIdentity.status === "fulfilled" ? profileIdentity.value?.number : undefined;

  return (
    <GlobalKeyCenter
      initialKey={key}
      memberName={member?.fullName || member?.username || "TGPI Member"}
      verifyOrigin={getRequestOrigin(requestHeaders)}
      canRotate={canManage}
      credentials={credentials}
      selection={selection}
      nextLearning={nextLearning}
      initialShares={links.status === "fulfilled" ? links.value : null}
      profilePreviewUrl={memberNumber ? `/member/${encodeURIComponent(memberNumber)}?preview=1` : null}
    />
  );
}

export async function generateMetadata() {
  return localizeMetadata(sourceMetadata);
}
