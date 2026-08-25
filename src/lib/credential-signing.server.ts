import "server-only";

import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import type { TgpiLearningCredential } from "@/types/learning";

export const TGPI_CREDENTIAL_KEY_ID = "tgpi-learning-hmac-v1";

type CredentialSignaturePayload = Omit<
  TgpiLearningCredential,
  "verificationHash"
>;

export function isCredentialSigningConfigured() {
  return (process.env.TGPI_CREDENTIAL_SIGNING_SECRET?.trim().length || 0) >= 32;
}

function getSigningSecret() {
  const secret = process.env.TGPI_CREDENTIAL_SIGNING_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error(
      "TGPI credential signing requires a secret with at least 32 characters.",
    );
  }
  return secret;
}

function canonicalCredentialPayload(payload: CredentialSignaturePayload) {
  return JSON.stringify({
    assessmentScore: payload.assessmentScore,
    competencyIds: [...payload.competencyIds],
    courseId: payload.courseId,
    courseTitle: payload.courseTitle,
    courseVersion: payload.courseVersion,
    credentialStandardVersion: payload.credentialStandardVersion,
    evidenceSummary: [...payload.evidenceSummary],
    id: payload.id,
    issuedAt: payload.issuedAt,
    issuer: payload.issuer,
    keyId: payload.keyId,
    learningHours: payload.learningHours,
    masteryThreshold: payload.masteryThreshold,
    ownerUid: payload.ownerUid,
    publicName: payload.publicName,
    status: payload.status,
  });
}

export function createCredentialId(courseId: string) {
  const courseCode = courseId
    .split("-")
    .map((part) => part.slice(0, 3))
    .join("")
    .toUpperCase();
  const reference = randomBytes(9).toString("base64url").toUpperCase();
  return `TGPI-${courseCode}-${reference}`;
}

export function signLearningCredential(payload: CredentialSignaturePayload) {
  return createHmac("sha256", getSigningSecret())
    .update(canonicalCredentialPayload(payload))
    .digest("hex");
}

export function verifyLearningCredentialIntegrity(
  credential: TgpiLearningCredential,
) {
  if (!isCredentialSigningConfigured()) return false;
  const { verificationHash, ...payload } = credential;
  const expected = signLearningCredential(payload);
  const receivedBuffer = Buffer.from(verificationHash, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}
