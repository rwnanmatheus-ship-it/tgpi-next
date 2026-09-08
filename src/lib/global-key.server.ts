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
  createBaseAnchorExplorerUrl,
  createGlobalKeyAnchorLeaf,
  normalizeGlobalKeyAnchorRecord,
} from "@/lib/global-key-anchor";
import {
  isBaseMainnetAnchorConfigured,
  verifyGlobalKeyBaseAnchor,
} from "@/lib/global-key-anchor.server";
import {
  getGlobalKeySecretForSlot,
  getPrimaryGlobalKeyMaterial,
} from "@/lib/global-key-secrets.server";
import {
  TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY,
  TGPI_GLOBAL_KEY_METADATA_KEY,
  type GlobalKeyVerification,
  type TgpiGlobalKeyAnchorView,
  type TgpiGlobalKeyRecord,
  type TgpiGlobalKeyView,
} from "@/lib/global-key";

const MAX_GLOBAL_KEY_METADATA_BYTES = 4_000;
const MAX_PRIVATE_METADATA_BYTES = 7_500;

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
  anchorValue: unknown,
  userId: string,
): TgpiGlobalKeyView {
  const secret = getGlobalKeySecretForSlot(record.keySlot);
  if (!verifyGlobalKeyChain({ expectedKeyId: record.keyId, record, secret })) {
    throw new GlobalKeyIntegrityError(
      "The Global Key integrity chain requires review.",
    );
  }
  const currentAnchorRecord = getCurrentGlobalKeyAnchorRecord({
    anchorValue,
    record,
  });
  const proof = createGlobalKeyProof({
    ...(currentAnchorRecord ? { anchor: currentAnchorRecord } : {}),
    record,
    secret,
    userId,
  });
  const anchor = getGlobalKeyAnchorView({
    anchorRecord: currentAnchorRecord,
    configured: isBaseMainnetAnchorConfigured(),
  });

  return {
    anchor,
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

function getGlobalKeyAnchorView({
  anchorRecord,
  configured,
}: {
  anchorRecord: ReturnType<typeof normalizeGlobalKeyAnchorRecord>;
  configured: boolean;
}): TgpiGlobalKeyAnchorView {
  if (!anchorRecord) {
    return { status: configured ? "awaiting_anchor" : "activation_pending" };
  }
  const explorerUrl = createBaseAnchorExplorerUrl(anchorRecord.transactionHash);
  if (!explorerUrl) {
    return { status: configured ? "awaiting_anchor" : "activation_pending" };
  }

  return {
    anchoredAt: anchorRecord.anchoredAt,
    batchId: anchorRecord.batchId,
    blockNumber: anchorRecord.blockNumber,
    chainId: anchorRecord.chainId,
    explorerUrl,
    leaf: anchorRecord.leaf,
    memberCount: anchorRecord.memberCount,
    merkleProof: anchorRecord.merkleProof,
    network: anchorRecord.network,
    root: anchorRecord.root,
    signerAddress: anchorRecord.signerAddress,
    status: "confirmed",
    transactionHash: anchorRecord.transactionHash,
  };
}

function getCurrentGlobalKeyAnchorRecord({
  anchorValue,
  record,
}: {
  anchorValue: unknown;
  record: TgpiGlobalKeyRecord;
}) {
  const anchor = normalizeGlobalKeyAnchorRecord(anchorValue);
  const currentHash = record.events.at(-1)?.hash;
  if (
    !anchor ||
    anchor.revision !== record.revision ||
    anchor.eventHash !== currentHash
  ) {
    return null;
  }
  const expectedLeaf = createGlobalKeyAnchorLeaf({
    batchId: anchor.batchId,
    eventHash: anchor.eventHash,
    keyId: record.keyId,
    revision: anchor.revision,
  });
  return expectedLeaf === anchor.leaf ? anchor : null;
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
    return buildView(
      existing,
      user.privateMetadata[TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY],
      userId,
    );
  }

  const keyMaterial = getPrimaryGlobalKeyMaterial();
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

  return buildView(
    record,
    user.privateMetadata[TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY],
    userId,
  );
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

  const secret = getGlobalKeySecretForSlot(record.keySlot);
  const rotated = ensureMetadataLimit(rotateGlobalKey({ record, secret }));

  await client.users.updateUserMetadata(userId, {
    privateMetadata: withGlobalKeyMetadata(user.privateMetadata, rotated),
  });

  return buildView(
    rotated,
    user.privateMetadata[TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY],
    userId,
  );
}

export async function verifyPublicGlobalKey(
  proof: string,
): Promise<GlobalKeyVerification> {
  const slot = getGlobalKeySlotFromProof(proof);
  if (!slot) return { status: "invalid" };

  let secret: string;
  try {
    secret = getGlobalKeySecretForSlot(slot);
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
    const embeddedAnchor = normalizeGlobalKeyAnchorRecord(payload.anchor);
    const anchor = await verifyGlobalKeyBaseAnchor({
      anchorValue:
        embeddedAnchor ||
        user.privateMetadata[TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY],
      eventHash: payload.currentHash,
      keyId: payload.keyId,
      revision: payload.revision,
    });

    return {
      anchor,
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
