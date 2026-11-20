import "server-only";

import { randomUUID } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import { isCertificateName } from "@/lib/account-profile";
import { normalizeCertificateId } from "@/lib/certificate-reference";
import {
  createCredentialDocumentFingerprint,
  isCredentialSigningConfigured,
  signLearningCredential,
  verifyLearningCredentialIntegrity,
} from "@/lib/credential-signing.server";
import {
  createFirestoreUpdateWrite,
  isLearningStorageConfigured,
  runFirestoreTransaction,
  type JsonValue,
} from "@/lib/firestore-admin-rest.server";
import type { TgpiLearningCredential } from "@/types/learning";

export class CredentialNameCorrectionError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
    this.name = "CredentialNameCorrectionError";
  }
}

type CurrentCertificateIdentity = {
  uid: string;
  publicName: string;
  emailVerified: boolean;
};
type NameConfirmation = { expectedName: string; confirmedName: string; consent: true };
const json = (value: unknown) => JSON.parse(JSON.stringify(value)) as Record<string, JsonValue>;

/** Correct a self-declared holder name; never changes achievement, identity or issuance evidence. */
export async function correctOwnedCredentialName(
  identity: CurrentCertificateIdentity,
  credentialId: string,
  confirmation: NameConfirmation,
) {
  if (!identity.uid || !/^[A-Za-z0-9_-]{1,160}$/.test(identity.uid)) {
    throw new CredentialNameCorrectionError("Sign in to correct your certificate name.", 401);
  }
  if (!identity.emailVerified) {
    throw new CredentialNameCorrectionError("Verify your account email before correcting a certificate.", 403);
  }
  const name = identity.publicName;
  if (!isCertificateName(name) || name !== name.trim()
    || /^(?:TGPI(?:\s|$)|The Global Polymath Institute$)/iu.test(name)) {
    throw new CredentialNameCorrectionError("Enter your complete real name in account settings before correcting a certificate.", 409);
  }
  if (confirmation.consent !== true || confirmation.confirmedName !== name) {
    throw new CredentialNameCorrectionError("Your account name changed. Reload and confirm the current certificate name.", 409);
  }
  if (normalizeCertificateId(credentialId) !== credentialId) {
    throw new CredentialNameCorrectionError("Invalid certificate reference.", 400);
  }
  if (!isLearningStorageConfigured() || !isCredentialSigningConfigured()) {
    throw new CredentialNameCorrectionError("Secure certificate correction is temporarily unavailable.", 503);
  }

  const publicPath = `tgpiLearningCredentials/${credentialId}`;
  const ownerPath = `tgpiLearningUsers/${identity.uid}/credentials/${credentialId}`;
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const documents = await getDocuments<TgpiLearningCredential>([publicPath, ownerPath]);
    const issuerDocument = documents.get(publicPath);
    const ownerDocument = documents.get(ownerPath);
    const credential = issuerDocument?.data;
    const owned = ownerDocument?.data;
    if (!issuerDocument || !ownerDocument || !credential || !owned || credential.id !== credentialId || owned.id !== credentialId
      || credential.ownerUid !== identity.uid || owned.ownerUid !== identity.uid) {
      throw new CredentialNameCorrectionError("Certificate not found in your account.", 404);
    }
    if (!issuerDocument.updateTime || !ownerDocument.updateTime
      || !verifyLearningCredentialIntegrity(credential) || !verifyLearningCredentialIntegrity(owned)
      || !isDeepStrictEqual(credential, owned)) {
      throw new CredentialNameCorrectionError("Certificate integrity requires review before a name correction.", 409);
    }
    if (credential.status !== "active") {
      throw new CredentialNameCorrectionError("Only an active certificate can receive a name correction.", 409);
    }
    // Duplicate confirmations are safe: the existing correction needs no new signature or audit event.
    if (credential.publicName === name) {
      return {
        result: { credentialId, publicName: name, changed: false, documentFingerprint: createCredentialDocumentFingerprint(credential) },
        writes: [],
      };
    }
    if (confirmation.expectedName !== credential.publicName) {
      throw new CredentialNameCorrectionError("This certificate changed. Reload its current record before correcting the name.", 409);
    }

    const { verificationHash: previousVerificationHash, ...previousClaims } = credential;
    const correctedClaims = { ...previousClaims, publicName: name };
    const corrected: TgpiLearningCredential = {
      ...correctedClaims,
      verificationHash: signLearningCredential(correctedClaims),
    };
    const previousDocumentFingerprint = createCredentialDocumentFingerprint(credential);
    const documentFingerprint = createCredentialDocumentFingerprint(corrected);
    const changedAt = new Date().toISOString();
    // The history lives only in the owner's private namespace, with create-only preconditions.
    const historyPath = `tgpiLearningUsers/${identity.uid}/credentialNameHistory/${randomUUID()}`;
    return {
      result: { credentialId, publicName: name, changed: true, documentFingerprint },
      writes: [
        createFirestoreUpdateWrite(publicPath, json(corrected), { updateTime: issuerDocument.updateTime }),
        createFirestoreUpdateWrite(ownerPath, json(corrected), { updateTime: ownerDocument.updateTime }),
        createFirestoreUpdateWrite(historyPath, json({
          schemaVersion: 1,
          event: "holder-name-correction",
          credentialId,
          ownerUid: identity.uid,
          changedAt,
          consent: true,
          nameSource: "current-account-certificate-name",
          previousCredential: credential,
          previousDocumentFingerprint,
          previousVerificationHash,
          correctedName: name,
          documentFingerprint,
          verificationHash: corrected.verificationHash,
        }), { exists: false }),
      ],
    };
  });
}
