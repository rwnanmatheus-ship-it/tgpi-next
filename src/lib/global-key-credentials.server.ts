import "server-only";

import { normalizeCertificateId } from "@/lib/certificate-reference";
import { verifyLearningCredentialIntegrity } from "@/lib/credential-signing.server";
import {
  createFirestoreUpdateWrite,
  getFirestoreDocument,
  isLearningStorageConfigured,
  runFirestoreTransaction,
} from "@/lib/firestore-admin-rest.server";
import { GlobalKeyIntegrityError } from "@/lib/global-key-crypto";
import { listUserLearningCredentials } from "@/lib/learning-records.server";
import type { TgpiLearningCredential } from "@/types/learning";

function showcasePath(uid: string) {
  return `tgpiLearningUsers/${uid}/globalIdentity/credentialShowcase`;
}

export function canShowcaseCredential(credential: TgpiLearningCredential) {
  return credential.status === "active" && verifyLearningCredentialIntegrity(credential) &&
    (!credential.professionalEvidence || credential.professionalEvidence.sharing === true);
}

export async function getCredentialShowcase(uid: string) {
  if (!isLearningStorageConfigured()) return null;
  const snapshot = await getFirestoreDocument<{ ids: string[] }>(showcasePath(uid));
  return snapshot ? snapshot.data.ids.filter(id => normalizeCertificateId(id) === id).slice(0, 50) : null;
}

export async function saveCredentialShowcase(uid: string, value: unknown) {
  if (!Array.isArray(value) || value.length > 50 || value.some(id => typeof id !== "string" || normalizeCertificateId(id) !== id)) {
    throw new GlobalKeyIntegrityError("Invalid credential selection.");
  }
  const ids: string[] = [...new Set<string>(value)];
  const credentials = await listUserLearningCredentials(uid);
  const allowed = new Set(credentials.filter(canShowcaseCredential).map(credential => credential.id));
  if (ids.some(id => !allowed.has(id))) {
    throw new GlobalKeyIntegrityError("Only active, shareable certificates can appear on your profile.");
  }
  const path = showcasePath(uid);
  await runFirestoreTransaction(async () => ({
    result: null,
    writes: [createFirestoreUpdateWrite(path, { ids })],
  }));
  return ids;
}
