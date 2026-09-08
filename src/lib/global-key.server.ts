import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { formatTgpiGlobalId } from "@/lib/auth/guards";
import {
  createGlobalKeyProof,
  getGlobalKeyFingerprint,
  getGlobalKeySlotFromProof,
  GlobalKeyIntegrityError,
  issueGlobalKey,
  normalizeGlobalKeyRecord,
  readGlobalKeyProof,
  rotateGlobalKey,
  verifyGlobalKeyChain,
} from "@/lib/global-key-crypto";
import {
  TGPI_GLOBAL_KEY_METADATA_KEY,
  type GlobalKeySlot,
  type GlobalKeyVerification,
  type TgpiGlobalKeyRecord,
  type TgpiGlobalKeyView,
} from "@/lib/global-key";

const MAX_GLOBAL_KEY_METADATA_BYTES = 4_000;
const MAX_PRIVATE_METADATA_BYTES = 7_500;

function getSecretForSlot(slot: GlobalKeySlot) {
  const secret =
    slot === "a"
      ? process.env.TGPI_GLOBAL_KEY_SECRET?.trim()
      : process.env.CLERK_SECRET_KEY?.trim();

  if (!secret) {
    throw new GlobalKeyIntegrityError(
      "Global Key signing material is unavailable.",
    );
  }
  return secret;
}

function getPrimaryKeyMaterial() {
  const dedicatedSecret = process.env.TGPI_GLOBAL_KEY_SECRET?.trim();
  if (dedicatedSecret) {
    return { secret: dedicatedSecret, slot: "a" as const };
  }
  return { secret: getSecretForSlot("b"), slot: "b" as const };
}

function ensureMetadataLimit(record: TgpiGlobalKeyRecord) {
  if (
    Buffer.byteLength(JSON.stringify(record), "utf8") >
    MAX_GLOBAL_KEY_METADATA_BYTES
  ) {
    throw new GlobalKeyIntegrityError(
      "The Global Key record exceeds its safe storage limit.",
    );
  }
  return record;
}

function withGlobalKeyMetadata(
  privateMetadata: Record<string, unknown>,
  record: TgpiGlobalKeyRecord,
) {
  const nextMetadata = {
    ...privateMetadata,
    [TGPI_GLOBAL_KEY_METADATA_KEY]: record,
  };
  if (
    Buffer.byteLength(JSON.stringify(nextMetadata), "utf8") >
    MAX_PRIVATE_METADATA_BYTES
  ) {
    throw new GlobalKeyIntegrityError(
      "Your private TGPI record has reached the safe V1 storage limit.",
    );
  }
  return nextMetadata;
}

function buildView(
  record: TgpiGlobalKeyRecord,
  userId: string,
): TgpiGlobalKeyView {
  const secret = getSecretForSlot(record.keySlot);
  if (!verifyGlobalKeyChain({ expectedKeyId: record.keyId, record, secret })) {
    throw new GlobalKeyIntegrityError(
      "The Global Key integrity chain requires review.",
    );
  }
  const proof = createGlobalKeyProof({ record, secret, userId });

  return {
    blocks: record.events.map((event) => ({
      hash: event.hash,
      previousHash: event.previousHash,
      sequence: event.sequence,
      timestamp: event.timestamp,
      type: event.type,
    })),
    fingerprint: getGlobalKeyFingerprint(record),
    integrity: "verified",
    issuedAt: record.issuedAt,
    keyId: record.keyId,
    proof,
    revision: record.revision,
    status: "active",
    verifyPath: `/verify/global-key?proof=${encodeURIComponent(proof)}`,
  };
}

export async function getOrCreateGlobalKey(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const existingValue = user.privateMetadata[TGPI_GLOBAL_KEY_METADATA_KEY];
  const keyId = formatTgpiGlobalId(userId);

  if (existingValue !== undefined) {
    const existing = normalizeGlobalKeyRecord(existingValue);
    if (!existing) {
      throw new GlobalKeyIntegrityError(
        "The existing Global Key record requires an integrity review.",
      );
    }
    if (existing.keyId !== keyId) {
      throw new GlobalKeyIntegrityError(
        "The existing Global Key identity requires an integrity review.",
      );
    }
    return buildView(existing, userId);
  }

  const keyMaterial = getPrimaryKeyMaterial();
  const record = ensureMetadataLimit(
    issueGlobalKey({
      keyId,
      keySlot: keyMaterial.slot,
      secret: keyMaterial.secret,
    }),
  );

  await client.users.updateUserMetadata(userId, {
    privateMetadata: withGlobalKeyMetadata(user.privateMetadata, record),
  });

  return buildView(record, userId);
}

export async function rotateUserGlobalKey(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const record = normalizeGlobalKeyRecord(
    user.privateMetadata[TGPI_GLOBAL_KEY_METADATA_KEY],
  );
  if (!record) {
    throw new GlobalKeyIntegrityError(
      "Open your Global Key before rotating its proof.",
    );
  }

  const secret = getSecretForSlot(record.keySlot);
  const rotated = ensureMetadataLimit(rotateGlobalKey({ record, secret }));

  await client.users.updateUserMetadata(userId, {
    privateMetadata: withGlobalKeyMetadata(user.privateMetadata, rotated),
  });

  return buildView(rotated, userId);
}

export async function verifyPublicGlobalKey(
  proof: string,
): Promise<GlobalKeyVerification> {
  const slot = getGlobalKeySlotFromProof(proof);
  if (!slot) return { status: "invalid" };

  let secret: string;
  try {
    secret = getSecretForSlot(slot);
  } catch {
    return { status: "invalid" };
  }
  const payload = readGlobalKeyProof({ proof, secret });
  if (!payload) return { status: "invalid" };

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(payload.userId);
    const record = normalizeGlobalKeyRecord(
      user.privateMetadata[TGPI_GLOBAL_KEY_METADATA_KEY],
    );
    if (
      !record ||
      record.keySlot !== slot ||
      record.keyId !== payload.keyId ||
      !verifyGlobalKeyChain({
        expectedKeyId: formatTgpiGlobalId(payload.userId),
        record,
        secret,
      })
    ) {
      return { status: "invalid" };
    }

    const currentHash = record.events.at(-1)?.hash;
    const status =
      record.revision === payload.revision && currentHash === payload.currentHash
        ? "verified"
        : "historical";

    return {
      fingerprint: getGlobalKeyFingerprint(record),
      issuedAt: record.issuedAt,
      keyId: record.keyId,
      revision: record.revision,
      status,
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      error.status === 404
    ) {
      return { status: "invalid" };
    }
    console.error("Unable to complete Global Key verification", error);
    return { status: "unavailable" };
  }
}
