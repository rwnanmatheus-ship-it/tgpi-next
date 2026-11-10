import "server-only";

import {
  createHash,
  createHmac,
  createPrivateKey,
  createPublicKey,
  hkdfSync,
  randomBytes,
  sign,
  timingSafeEqual,
} from "node:crypto";
import type {
  PublicTgpiLearningCredential,
  TgpiLearningCredential,
} from "@/types/learning";
import type { createPortableLearningRecord } from "@/lib/credential-standard";
import { CERTIFICATE_ORIGIN } from "@/lib/certificate-presentation";

export const TGPI_CREDENTIAL_KEY_ID = "tgpi-learning-hmac-v2";
const PROOF_ALGORITHM = "Ed25519" as const;
const PROOF_CONTEXT = "TGPI Learning Evidence Record / issuer proof / v1";
const PROOF_KEY_URL = `${CERTIFICATE_ORIGIN}/api/credentials/keys`;
// RFC 8410 PKCS#8 envelope for a 32-byte Ed25519 seed.
const ED25519_PKCS8_SEED_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex");

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
  if (typeof verificationHash !== "string" || !/^[a-f0-9]{64}$/i.test(verificationHash)) {
    return false;
  }
  const expected = signLearningCredential(payload);
  const receivedBuffer = Buffer.from(verificationHash, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export function createCredentialDocumentFingerprint(credential: TgpiLearningCredential) {
  // Include issuance claims, leaving sharing and lifecycle changes independent of the printed code.
  const claims = {
    achievementType: credential.achievementType,
    assessmentScore: credential.assessmentScore,
    automatedEvidence: credential.automatedEvidence,
    completedAt: credential.completedAt,
    courseId: credential.courseId,
    courseTitle: credential.courseTitle,
    courseVersion: credential.courseVersion,
    documentNature: credential.documentNature,
    globalKeyId: credential.identityEvidence.globalKeyId,
    id: credential.id,
    issuedAt: credential.issuedAt,
    issuer: credential.issuer,
    learningHours: credential.learningHours,
    masteryThreshold: credential.masteryThreshold,
    publicName: credential.publicName,
    skills: credential.skills,
  };
  return createHash("sha256")
    .update("TGPI certificate document claims v1\n")
    .update(canonicalize(claims))
    .digest("hex")
    .slice(0, 16)
    .toUpperCase()
    .replace(/(.{4})(?=.)/g, "$1-");
}

function createIssuerProofKey() {
  if (!isCredentialSigningConfigured()) return null;

  // Separate portable proof keys from stored HMAC records and isolate preview signers.
  const environment = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
  const seed = Buffer.from(hkdfSync(
    "sha256",
    getSigningSecret(),
    CERTIFICATE_ORIGIN,
    `${PROOF_CONTEXT} / ${environment}`,
    32,
  ));
  const der = Buffer.concat([ED25519_PKCS8_SEED_PREFIX, seed]);
  try {
    const privateKey = createPrivateKey({ key: der, format: "der", type: "pkcs8" });
    const publicKey = createPublicKey(privateKey);
    const { x } = publicKey.export({ format: "jwk" });
    if (!x) throw new Error("Unable to export the TGPI credential proof key.");
    const fingerprint = createHash("sha256")
      .update(publicKey.export({ format: "der", type: "spki" }))
      .digest("base64url");
    const jwk = {
      alg: PROOF_ALGORITHM,
      crv: PROOF_ALGORITHM,
      kid: `tgpi-learning-ed25519-${fingerprint}`,
      kty: "OKP" as const,
      use: "sig" as const,
      x,
    };
    return { jwk, privateKey };
  } finally {
    seed.fill(0);
    der.fill(0);
  }
}

export function getCredentialIssuerPublicKey() {
  return createIssuerProofKey()?.jwk ?? null;
}

export function getCredentialPortableProofMetadata(): PublicTgpiLearningCredential["portableProof"] {
  const publicKey = getCredentialIssuerPublicKey();
  if (!publicKey) return undefined;
  return {
    algorithm: publicKey.alg,
    keyId: publicKey.kid,
    publicKeyUrl: PROOF_KEY_URL,
  };
}

type PortableRecordSnapshot = ReturnType<typeof createPortableLearningRecord> & {
  statusCheckedAt: string;
};

export function signPortableLearningRecord(record: PortableRecordSnapshot) {
  if (!record.integrity.verified) return null;
  const key = createIssuerProofKey();
  if (!key) return null;

  const protectedHeader = Buffer.from(JSON.stringify({
    alg: key.jwk.alg,
    kid: key.jwk.kid,
    typ: "tgpi-learning-evidence+jws",
  })).toString("base64url");
  const payload = Buffer.from(JSON.stringify(record)).toString("base64url");
  const signingInput = `${protectedHeader}.${payload}`;
  const signature = sign(null, Buffer.from(signingInput, "ascii"), key.privateKey).toString("base64url");
  return {
    algorithm: key.jwk.alg,
    keyId: key.jwk.kid,
    publicKeyUrl: PROOF_KEY_URL,
    jws: `${signingInput}.${signature}`,
  };
}
