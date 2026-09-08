import { createHash, randomBytes } from "node:crypto";
import {
  TGPI_GLOBAL_KEY_ANCHOR_SCHEMA_VERSION,
  type TgpiGlobalKeyAnchorProofStep,
  type TgpiGlobalKeyAnchorRecord,
} from "./global-key.ts";

export const TGPI_BASE_CHAIN_ID = 8453 as const;
export const TGPI_BASE_NETWORK = "base-mainnet" as const;
export const TGPI_BASE_EXPLORER_URL = "https://basescan.org";

const ANCHOR_LEAF_CONTEXT = "tgpi-global-key-anchor-leaf-v1";
const ANCHOR_NODE_CONTEXT = "tgpi-global-key-anchor-node-v1";
const ANCHOR_PAYLOAD_MAGIC = "54475049"; // TGPI
const ANCHOR_PAYLOAD_VERSION = "01";
const ANCHOR_PAYLOAD_HEX_LENGTH = 2 + (4 + 1 + 32 + 32 + 4 + 8) * 2;
const MAX_MERKLE_PROOF_DEPTH = 32;
const SAFE_ADDRESS = /^0x[a-fA-F0-9]{40}$/;
const SAFE_BATCH_ID = /^TGPI-[0-9]{8}-[A-F0-9]{12}$/;
const SAFE_EVENT_HASH = /^[A-Za-z0-9_-]{43}$/;
const SAFE_GLOBAL_ID = /^TGPI-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/;
const SAFE_HEX_32 = /^0x[a-fA-F0-9]{64}$/;
const SAFE_TRANSACTION_HASH = /^0x[a-fA-F0-9]{64}$/;

export type GlobalKeyAnchorCandidate = {
  eventHash: string;
  keyId: string;
  reference: string;
  revision: number;
};

export type GlobalKeyAnchorBatchMember = GlobalKeyAnchorCandidate & {
  leaf: string;
  merkleProof: TgpiGlobalKeyAnchorProofStep[];
};

export type GlobalKeyAnchorBatch = {
  batchId: string;
  members: GlobalKeyAnchorBatchMember[];
  root: string;
};

export type DecodedBaseAnchorPayload = {
  anchoredAt: string;
  batchIdHash: string;
  memberCount: number;
  root: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isIsoDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 40 &&
    !Number.isNaN(Date.parse(value))
  );
}

function normalizeHex32(value: string) {
  if (!SAFE_HEX_32.test(value)) {
    throw new Error("The anchor hash is not a valid 32-byte value.");
  }
  return value.toLowerCase();
}

function hashBytes(...values: Buffer[]) {
  return `0x${createHash("sha256").update(Buffer.concat(values)).digest("hex")}`;
}

function hashMerkleNode(first: string, second: string) {
  const ordered = [normalizeHex32(first), normalizeHex32(second)].sort();
  return hashBytes(
    Buffer.from(ANCHOR_NODE_CONTEXT, "utf8"),
    Buffer.from(ordered[0].slice(2), "hex"),
    Buffer.from(ordered[1].slice(2), "hex"),
  );
}

export function createGlobalKeyAnchorBatchId(now = new Date()) {
  if (Number.isNaN(now.getTime())) {
    throw new Error("The anchor batch time is invalid.");
  }
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  return `TGPI-${date}-${randomBytes(6).toString("hex").toUpperCase()}`;
}

export function hashGlobalKeyAnchorBatchId(batchId: string) {
  if (!SAFE_BATCH_ID.test(batchId)) {
    throw new Error("The anchor batch identifier is invalid.");
  }
  return `0x${createHash("sha256").update(batchId, "utf8").digest("hex")}`;
}

export function createGlobalKeyAnchorLeaf({
  batchId,
  eventHash,
  keyId,
  revision,
}: Omit<GlobalKeyAnchorCandidate, "reference"> & { batchId: string }) {
  if (
    !SAFE_BATCH_ID.test(batchId) ||
    !SAFE_EVENT_HASH.test(eventHash) ||
    !SAFE_GLOBAL_ID.test(keyId) ||
    !Number.isInteger(revision) ||
    revision < 1
  ) {
    throw new Error("The Global Key anchor member is invalid.");
  }

  return hashBytes(
    Buffer.from(
      [ANCHOR_LEAF_CONTEXT, batchId, keyId, revision, eventHash].join("|"),
      "utf8",
    ),
  );
}

export function buildGlobalKeyAnchorBatch({
  batchId,
  candidates,
}: {
  batchId: string;
  candidates: GlobalKeyAnchorCandidate[];
}): GlobalKeyAnchorBatch {
  if (!SAFE_BATCH_ID.test(batchId) || candidates.length < 1) {
    throw new Error("The anchor batch requires at least one valid member.");
  }

  const references = new Set<string>();
  const leaves = candidates
    .map((candidate) => {
      if (!candidate.reference || references.has(candidate.reference)) {
        throw new Error("Anchor batch member references must be unique.");
      }
      references.add(candidate.reference);
      return {
        hash: createGlobalKeyAnchorLeaf({ batchId, ...candidate }),
        references: [candidate.reference],
      };
    })
    .sort((first, second) => first.hash.localeCompare(second.hash));

  if (new Set(leaves.map((leaf) => leaf.hash)).size !== leaves.length) {
    throw new Error("Anchor batch leaves must be unique.");
  }

  const proofs = new Map<string, TgpiGlobalKeyAnchorProofStep[]>();
  for (const reference of references) proofs.set(reference, []);

  let level = leaves;
  while (level.length > 1) {
    const nextLevel: typeof level = [];
    for (let index = 0; index < level.length; index += 2) {
      const left = level[index];
      const right = level[index + 1] || left;

      for (const reference of left.references) {
        proofs.get(reference)?.push({ hash: right.hash });
      }
      if (right !== left) {
        for (const reference of right.references) {
          proofs.get(reference)?.push({ hash: left.hash });
        }
      }

      nextLevel.push({
        hash: hashMerkleNode(left.hash, right.hash),
        references:
          right === left
            ? left.references
            : [...left.references, ...right.references],
      });
    }
    level = nextLevel;
  }

  return {
    batchId,
    members: candidates.map((candidate) => ({
      ...candidate,
      leaf: createGlobalKeyAnchorLeaf({ batchId, ...candidate }),
      merkleProof: proofs.get(candidate.reference) || [],
    })),
    root: level[0].hash,
  };
}

export function verifyGlobalKeyMerkleProof({
  leaf,
  merkleProof,
  root,
}: {
  leaf: string;
  merkleProof: TgpiGlobalKeyAnchorProofStep[];
  root: string;
}) {
  if (
    !SAFE_HEX_32.test(leaf) ||
    !SAFE_HEX_32.test(root) ||
    !Array.isArray(merkleProof) ||
    merkleProof.length > MAX_MERKLE_PROOF_DEPTH ||
    merkleProof.some((step) => !SAFE_HEX_32.test(step.hash))
  ) {
    return false;
  }

  let current = leaf;
  for (const step of merkleProof) {
    current = hashMerkleNode(current, step.hash);
  }
  return current.toLowerCase() === root.toLowerCase();
}

export function encodeBaseAnchorPayload({
  anchoredAt,
  batchId,
  memberCount,
  root,
}: {
  anchoredAt: string;
  batchId: string;
  memberCount: number;
  root: string;
}) {
  if (
    !isIsoDate(anchoredAt) ||
    !Number.isInteger(memberCount) ||
    memberCount < 1 ||
    memberCount > 0xffff_ffff
  ) {
    throw new Error("The Base anchor payload is invalid.");
  }

  const timestamp = BigInt(Math.floor(Date.parse(anchoredAt) / 1_000));
  return `0x${ANCHOR_PAYLOAD_MAGIC}${ANCHOR_PAYLOAD_VERSION}${hashGlobalKeyAnchorBatchId(batchId).slice(2)}${normalizeHex32(root).slice(2)}${memberCount.toString(16).padStart(8, "0")}${timestamp.toString(16).padStart(16, "0")}` as `0x${string}`;
}

export function decodeBaseAnchorPayload(
  payload: string,
): DecodedBaseAnchorPayload | null {
  if (
    payload.length !== ANCHOR_PAYLOAD_HEX_LENGTH ||
    !/^0x[a-fA-F0-9]+$/.test(payload) ||
    payload.slice(2, 10).toLowerCase() !== ANCHOR_PAYLOAD_MAGIC ||
    payload.slice(10, 12).toLowerCase() !== ANCHOR_PAYLOAD_VERSION
  ) {
    return null;
  }

  try {
    const batchIdHash = `0x${payload.slice(12, 76).toLowerCase()}`;
    const root = `0x${payload.slice(76, 140).toLowerCase()}`;
    const memberCount = Number.parseInt(payload.slice(140, 148), 16);
    const timestamp = Number(BigInt(`0x${payload.slice(148, 164)}`));
    const anchoredAt = new Date(timestamp * 1_000).toISOString();
    if (
      !SAFE_HEX_32.test(batchIdHash) ||
      !SAFE_HEX_32.test(root) ||
      memberCount < 1 ||
      Number.isNaN(Date.parse(anchoredAt))
    ) {
      return null;
    }
    return { anchoredAt, batchIdHash, memberCount, root };
  } catch {
    return null;
  }
}

export function normalizeGlobalKeyAnchorRecord(
  value: unknown,
): TgpiGlobalKeyAnchorRecord | null {
  if (!isRecord(value) || !Array.isArray(value.merkleProof)) return null;
  if (
    value.schemaVersion !== TGPI_GLOBAL_KEY_ANCHOR_SCHEMA_VERSION ||
    value.status !== "confirmed" ||
    value.network !== TGPI_BASE_NETWORK ||
    value.chainId !== TGPI_BASE_CHAIN_ID ||
    !isIsoDate(value.anchoredAt) ||
    typeof value.batchId !== "string" ||
    !SAFE_BATCH_ID.test(value.batchId) ||
    typeof value.blockNumber !== "string" ||
    !/^[1-9][0-9]{0,19}$/.test(value.blockNumber) ||
    typeof value.eventHash !== "string" ||
    !SAFE_EVENT_HASH.test(value.eventHash) ||
    typeof value.leaf !== "string" ||
    !SAFE_HEX_32.test(value.leaf) ||
    !Number.isInteger(value.memberCount) ||
    Number(value.memberCount) < 1 ||
    Number(value.memberCount) > 0xffff_ffff ||
    !Number.isInteger(value.revision) ||
    Number(value.revision) < 1 ||
    typeof value.root !== "string" ||
    !SAFE_HEX_32.test(value.root) ||
    typeof value.signerAddress !== "string" ||
    !SAFE_ADDRESS.test(value.signerAddress) ||
    typeof value.transactionHash !== "string" ||
    !SAFE_TRANSACTION_HASH.test(value.transactionHash) ||
    value.merkleProof.length > MAX_MERKLE_PROOF_DEPTH
  ) {
    return null;
  }

  const merkleProof: TgpiGlobalKeyAnchorProofStep[] = [];
  for (const step of value.merkleProof) {
    if (!isRecord(step) || typeof step.hash !== "string" || !SAFE_HEX_32.test(step.hash)) {
      return null;
    }
    merkleProof.push({ hash: step.hash.toLowerCase() });
  }

  const record: TgpiGlobalKeyAnchorRecord = {
    anchoredAt: value.anchoredAt,
    batchId: value.batchId,
    blockNumber: value.blockNumber,
    chainId: TGPI_BASE_CHAIN_ID,
    eventHash: value.eventHash,
    leaf: value.leaf.toLowerCase(),
    memberCount: Number(value.memberCount),
    merkleProof,
    network: TGPI_BASE_NETWORK,
    revision: Number(value.revision),
    root: value.root.toLowerCase(),
    schemaVersion: TGPI_GLOBAL_KEY_ANCHOR_SCHEMA_VERSION,
    signerAddress: value.signerAddress.toLowerCase(),
    status: "confirmed",
    transactionHash: value.transactionHash.toLowerCase(),
  };

  return verifyGlobalKeyMerkleProof(record) ? record : null;
}

export function createBaseAnchorExplorerUrl(transactionHash: string) {
  if (!SAFE_TRANSACTION_HASH.test(transactionHash)) return null;
  return `${TGPI_BASE_EXPLORER_URL}/tx/${transactionHash}`;
}
