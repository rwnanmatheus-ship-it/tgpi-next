import "server-only";
import { createHmac } from "node:crypto";
import { getFirestoreDocument } from "@/lib/firestore-admin-rest.server";
import { CommunityError } from "./model";
export const communityRoot = "tgpiLearningUsers/_community";
export function privacyKey(uid: string) {
  const key =
    process.env.TGPI_COMMUNITY_MEDIA_KEY ||
    process.env.TGPI_FIREBASE_PRIVATE_KEY;
  if (!key) throw new CommunityError("Community privacy is unavailable.", 503);
  return createHmac("sha256", key)
    .update(`tgpi-community-privacy:v1:${uid}`)
    .digest("hex");
}
export function privacyPath(uid: string) {
  return `${communityRoot}/erasureJobs/${privacyKey(uid)}`;
}
export type PrivacyFlag = {
  state: "queued" | "processing" | "complete";
  accountDeleted: boolean;
};
export function privacyBlocked(flag?: PrivacyFlag | null) {
  return Boolean(flag && (flag.state !== "complete" || flag.accountDeleted));
}
export async function assertCommunityAvailable(uid: string) {
  if (
    uid &&
    privacyBlocked(
      (await getFirestoreDocument<PrivacyFlag>(privacyPath(uid)))?.data,
    )
  )
    throw new CommunityError(
      "Community data removal is in progress. Review Data & privacy in My interests.",
      423,
    );
}
export async function authorAvailable(uid: string) {
  return (
    !uid.startsWith("user_") ||
    !privacyBlocked(
      (await getFirestoreDocument<PrivacyFlag>(privacyPath(uid)))?.data,
    )
  );
}
