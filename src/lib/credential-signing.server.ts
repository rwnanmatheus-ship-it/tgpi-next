import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { TgpiLearningCredential } from "@/types/learning";

export const TGPI_CREDENTIAL_KEY_ID = "tgpi-learning-hmac-v2";

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

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return "[" + value.map(canonicalize).join(",") + "]";
  }
  const record = value as Record<string, unknown>;
  return (
    "{" +
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => JSON.stringify(key) + ":" + canonicalize(record[key]))
      .join(",") +
    "}"
  );
}

export function createCredentialId(courseId: string) {
  const courseCode = courseId
    .split("-")
    .map((part) => part.slice(0, 3))
    .join("")
    .toUpperCase();
  const reference = randomBytes(9).toString("base64url").toUpperCase();
  return "TGPI-" + courseCode + "-" + reference;
}

export function signLearningCredential(payload: CredentialSignaturePayload) {
  return createHmac("sha256", getSigningSecret())
    .update(canonicalize(payload))
    .digest("hex");
}

export function verifyLearningCredentialIntegrity(
  credential: TgpiLearningCredential,
) {
  if (!isCredentialSigningConfigured()) return false;
  const { verificationHash, ...payload } = credential;
  if (!/^[a-f0-9]{64}$/i.test(verificationHash)) return false;
  const expected = signLearningCredential(payload);
  const receivedBuffer = Buffer.from(verificationHash, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}
