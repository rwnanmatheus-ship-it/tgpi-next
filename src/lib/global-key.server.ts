import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { formatTgpiGlobalId } from "@/lib/auth/guards";
import {
  createGlobalKeyProof,
  getGlobalKeyFingerprint,
  getGlobalKeyProofStatus,
  getGlobalKeySlotFromProof,
  GlobalKeyIntegrityError,
  issueGlobalKey,
  readGlobalKeyProof,
  rotateGlobalKey,
  verifyGlobalKeyChain,
} from "@/lib/global-key-crypto";
import { createBaseAnchorExplorerUrl, createGlobalKeyAnchorLeaf } from "@/lib/global-key-anchor";
import { isBaseMainnetAnchorConfigured, verifyGlobalKeyBaseAnchor } from "@/lib/global-key-anchor.server";
import {
  canMutateGlobalKey,
  loadGlobalKeyLedger,
  loadGlobalKeyReceipt,
  updateGlobalKeyLedger,
  type GlobalKeyLedger,
} from "@/lib/global-key-ledger.server";
import { getGlobalKeySecretForSlot, getPrimaryGlobalKeyMaterial } from "@/lib/global-key-secrets.server";
import { ensureMemberNumber } from "@/lib/members/identity.server";
import type { GlobalKeyVerification, TgpiGlobalKeyAnchorView, TgpiGlobalKeyView } from "@/lib/global-key";

function buildView({ record, anchor }: GlobalKeyLedger, userId: string): TgpiGlobalKeyView {
  const secret = getGlobalKeySecretForSlot(record.keySlot);
  if (!verifyGlobalKeyChain({ expectedKeyId: formatTgpiGlobalId(userId), record, secret })) {
    throw new GlobalKeyIntegrityError("The Global Key integrity chain requires review.");
  }
  const currentHash = record.events.at(-1)?.hash;
  const currentAnchor = anchor && currentHash && anchor.revision === record.revision &&
    anchor.eventHash === currentHash && anchor.leaf === createGlobalKeyAnchorLeaf({
      batchId: anchor.batchId,
      eventHash: currentHash,
      keyId: record.keyId,
      revision: record.revision,
    }) ? anchor : null;
  const explorerUrl = currentAnchor && createBaseAnchorExplorerUrl(currentAnchor.transactionHash);
  const anchorView: TgpiGlobalKeyAnchorView = currentAnchor && explorerUrl
    ? { ...currentAnchor, explorerUrl }
    : { status: isBaseMainnetAnchorConfigured() ? "awaiting_anchor" : "activation_pending" };
  const proof = createGlobalKeyProof({
    ...(currentAnchor ? { anchor: currentAnchor } : {}),
    record,
    secret,
    userId,
  });
  return {
    anchor: anchorView,
    blocks: record.events.map(({ hash, previousHash, sequence, timestamp, type }) =>
      ({ hash, previousHash, sequence, timestamp, type })),
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
  const user = await (await clerkClient()).users.getUser(userId);
  if (user.banned || user.locked) {
    throw new GlobalKeyIntegrityError("This identity requires account review.");
  }
  const existing = await loadGlobalKeyLedger(userId, user.privateMetadata);
  if (existing) return buildView(existing, userId);

  if (!canMutateGlobalKey()) {
    throw new GlobalKeyIntegrityError("Identity storage is temporarily unavailable.");
  }
  await ensureMemberNumber(userId);
  const ledger = await updateGlobalKeyLedger(userId, user.privateMetadata, current => {
    if (current) return { result: current };
    const { secret, slot } = getPrimaryGlobalKeyMaterial();
    const next = {
      record: issueGlobalKey({ keyId: formatTgpiGlobalId(userId), keySlot: slot, secret }),
      anchor: null,
    };
    return { next, result: next };
  });
  return buildView(ledger, userId);
}

export async function rotateUserGlobalKey(userId: string, expectedRevision: number) {
  const user = await (await clerkClient()).users.getUser(userId);
  if (user.banned || user.locked) {
    throw new GlobalKeyIntegrityError("This identity requires account review.");
  }
  const next = await updateGlobalKeyLedger(userId, user.privateMetadata, ledger => {
    const record = ledger?.record;
    if (!record || record.keyId !== formatTgpiGlobalId(userId) || record.revision !== expectedRevision) {
      throw new GlobalKeyIntegrityError("The identity revision changed. Refresh before rotating.");
    }
    const secret = getGlobalKeySecretForSlot(record.keySlot);
    const rotated = { record: rotateGlobalKey({ record, secret }), anchor: null };
    return { next: rotated, result: rotated };
  });
  return buildView(next, userId);
}

export async function verifyPublicGlobalKey(
  proof: string,
  mode: "portable" | "temporary" = "portable",
): Promise<GlobalKeyVerification> {
  const slot = getGlobalKeySlotFromProof(proof);
  if (!slot) return { status: "invalid" };
  let secret: string;
  try {
    secret = getGlobalKeySecretForSlot(slot);
  } catch {
    return { status: "unavailable" };
  }
  const payload = readGlobalKeyProof({ proof, secret });
  if (!payload) return { status: "invalid" };

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(payload.userId);
    if (user.banned || user.locked) return { status: "invalid" };
    const ledger = await loadGlobalKeyLedger(payload.userId, user.privateMetadata);
    if (
      !ledger || ledger.record.keySlot !== slot ||
      !verifyGlobalKeyChain({ expectedKeyId: formatTgpiGlobalId(payload.userId), record: ledger.record, secret })
    ) return { status: "invalid" };

    const { record } = ledger;
    const status = getGlobalKeyProofStatus(record, payload);
    if (status === "invalid") return { status };
    if (mode === "temporary" && status === "historical") return { status: "superseded" };

    const storedAnchor = ledger.anchor?.revision === payload.revision
      ? ledger.anchor
      : await loadGlobalKeyReceipt(payload.userId, payload.revision);
    const anchor = await verifyGlobalKeyBaseAnchor({
      anchorValue: storedAnchor || payload.anchor,
      eventHash: payload.currentHash,
      keyId: payload.keyId,
      revision: payload.revision,
    });
    return {
      anchor,
      currentRevision: record.revision,
      fingerprint: getGlobalKeyFingerprint(record, payload.revision),
      issuedAt: record.issuedAt,
      keyId: record.keyId,
      revision: payload.revision,
      status,
    };
  } catch (error) {
    if (typeof error === "object" && error !== null && "status" in error && error.status === 404) {
      return { status: "invalid" };
    }
    console.error("Unable to complete Global Key verification", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return { status: "unavailable" };
  }
}
