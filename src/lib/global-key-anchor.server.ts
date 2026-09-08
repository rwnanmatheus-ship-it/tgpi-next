import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import {
  createPublicClient,
  createWalletClient,
  getAddress,
  http,
  isAddress,
  type Address,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import {
  buildGlobalKeyAnchorBatch,
  createBaseAnchorExplorerUrl,
  createGlobalKeyAnchorBatchId,
  createGlobalKeyAnchorLeaf,
  decodeBaseAnchorPayload,
  encodeBaseAnchorPayload,
  hashGlobalKeyAnchorBatchId,
  normalizeGlobalKeyAnchorRecord,
  TGPI_BASE_CHAIN_ID,
  TGPI_BASE_NETWORK,
  verifyGlobalKeyMerkleProof,
  type GlobalKeyAnchorCandidate,
} from "@/lib/global-key-anchor";
import {
  normalizeGlobalKeyRecord,
  verifyGlobalKeyChain,
} from "@/lib/global-key-crypto";
import { getGlobalKeySecretForSlot } from "@/lib/global-key-secrets.server";
import {
  TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY,
  TGPI_GLOBAL_KEY_ANCHOR_SCHEMA_VERSION,
  TGPI_GLOBAL_KEY_METADATA_KEY,
  type TgpiGlobalKeyAnchorRecord,
  type TgpiGlobalKeyAnchorView,
} from "@/lib/global-key";

const DEFAULT_BATCH_SIZE = 100;
const MAX_BATCH_SIZE = 250;
const DEFAULT_SCAN_LIMIT = 5_000;
const MAX_SCAN_LIMIT = 20_000;
const CLERK_PAGE_SIZE = 500;
const MAX_PRIVATE_METADATA_BYTES = 7_500;
const DEFAULT_MAX_EXECUTION_COST_WEI = BigInt("100000000000000");
const ABSOLUTE_MAX_EXECUTION_COST_WEI = BigInt("1000000000000000");
const BASE_PUBLIC_RPC_URL = "https://mainnet.base.org";

type AnchorCandidate = GlobalKeyAnchorCandidate;

export type BaseAnchorRunResult =
  | {
      anchored: 0;
      integrityFailures: number;
      scanned: number;
      status: "no_changes";
    }
  | {
      anchored: number;
      batchId: string;
      blockNumber: string;
      failedMetadataWrites: number;
      integrityFailures: number;
      root: string;
      scanned: number;
      skippedAfterRotation: number;
      status: "anchored";
      transactionHash: string;
    };

export class GlobalKeyAnchorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GlobalKeyAnchorError";
  }
}

function parseBoundedInteger(
  value: string | undefined,
  fallback: number,
  maximum: number,
) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, maximum)
    : fallback;
}

function getAnchorPrivateKey() {
  const value = process.env.TGPI_BASE_ANCHOR_PRIVATE_KEY?.trim();
  if (!value || !/^0x[a-fA-F0-9]{64}$/.test(value)) {
    throw new GlobalKeyAnchorError(
      "The dedicated Base Mainnet anchor signer is not configured.",
    );
  }
  return value as Hex;
}

function getWriteRpcUrl() {
  const value = process.env.TGPI_BASE_RPC_URL?.trim();
  if (!value || !/^https:\/\//i.test(value)) {
    throw new GlobalKeyAnchorError(
      "The production Base Mainnet RPC endpoint is not configured.",
    );
  }
  return value;
}

function getPublicClient(rpcUrl = process.env.TGPI_BASE_RPC_URL?.trim()) {
  return createPublicClient({
    chain: base,
    transport: http(rpcUrl || BASE_PUBLIC_RPC_URL, {
      retryCount: 1,
      timeout: 8_000,
    }),
  });
}

function getTrustedSigners() {
  const signers = new Set<string>();
  for (const candidate of (
    process.env.TGPI_BASE_ANCHOR_TRUSTED_SIGNERS || ""
  ).split(",")) {
    const value = candidate.trim();
    if (isAddress(value)) signers.add(getAddress(value).toLowerCase());
  }

  try {
    signers.add(privateKeyToAccount(getAnchorPrivateKey()).address.toLowerCase());
  } catch {
    // Read-only verification can use explicitly configured historical signers.
  }
  return signers;
}

function getMaximumExecutionCost() {
  const value =
    process.env.TGPI_BASE_ANCHOR_MAX_EXECUTION_COST_WEI?.trim() ||
    DEFAULT_MAX_EXECUTION_COST_WEI.toString();
  if (!/^[1-9][0-9]{0,18}$/.test(value)) {
    throw new GlobalKeyAnchorError(
      "The Base Mainnet transaction safety ceiling is invalid.",
    );
  }
  const maximum = BigInt(value);
  if (maximum > ABSOLUTE_MAX_EXECUTION_COST_WEI) {
    throw new GlobalKeyAnchorError(
      "The Base Mainnet transaction safety ceiling exceeds the hard limit.",
    );
  }
  return maximum;
}

function isCurrentAnchor(
  anchorValue: unknown,
  revision: number,
  eventHash: string,
) {
  const anchor = normalizeGlobalKeyAnchorRecord(anchorValue);
  return Boolean(
    anchor && anchor.revision === revision && anchor.eventHash === eventHash,
  );
}

async function collectAnchorCandidates() {
  const client = await clerkClient();
  const batchSize = parseBoundedInteger(
    process.env.TGPI_BASE_ANCHOR_BATCH_SIZE,
    DEFAULT_BATCH_SIZE,
    MAX_BATCH_SIZE,
  );
  const scanLimit = parseBoundedInteger(
    process.env.TGPI_BASE_ANCHOR_SCAN_LIMIT,
    DEFAULT_SCAN_LIMIT,
    MAX_SCAN_LIMIT,
  );
  const candidates: AnchorCandidate[] = [];
  let integrityFailures = 0;
  let scanned = 0;

  for (
    let offset = 0;
    offset < scanLimit && candidates.length < batchSize;
    offset += CLERK_PAGE_SIZE
  ) {
    const page = await client.users.getUserList({
      limit: Math.min(CLERK_PAGE_SIZE, scanLimit - offset),
      offset,
      orderBy: "+created_at",
    });

    for (const user of page.data) {
      scanned += 1;
      const record = normalizeGlobalKeyRecord(
        user.privateMetadata[TGPI_GLOBAL_KEY_METADATA_KEY],
      );
      if (!record) continue;

      let secret: string;
      try {
        secret = getGlobalKeySecretForSlot(record.keySlot);
      } catch {
        integrityFailures += 1;
        continue;
      }
      if (
        !verifyGlobalKeyChain({
          expectedKeyId: record.keyId,
          record,
          secret,
        })
      ) {
        integrityFailures += 1;
        continue;
      }

      const eventHash = record.events.at(-1)?.hash;
      if (!eventHash) {
        integrityFailures += 1;
        continue;
      }
      if (
        isCurrentAnchor(
          user.privateMetadata[TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY],
          record.revision,
          eventHash,
        )
      ) {
        continue;
      }

      candidates.push({
        eventHash,
        keyId: record.keyId,
        reference: user.id,
        revision: record.revision,
      });
      if (candidates.length >= batchSize) break;
    }

    if (page.data.length === 0 || offset + page.data.length >= page.totalCount) {
      break;
    }
  }

  return { candidates, client, integrityFailures, scanned };
}

function withAnchorMetadata(
  privateMetadata: Record<string, unknown>,
  anchor: TgpiGlobalKeyAnchorRecord,
) {
  const nextMetadata = {
    ...privateMetadata,
    [TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY]: anchor,
  };
  if (
    Buffer.byteLength(JSON.stringify(nextMetadata), "utf8") >
    MAX_PRIVATE_METADATA_BYTES
  ) {
    throw new GlobalKeyAnchorError(
      "A member record exceeded the safe private metadata limit.",
    );
  }
  return nextMetadata;
}

async function mapWithConcurrency<T>(
  values: T[],
  concurrency: number,
  work: (value: T) => Promise<"anchored" | "failed" | "rotated">,
) {
  const results: Array<"anchored" | "failed" | "rotated"> = [];
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await work(values[index]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, () => worker()),
  );
  return results;
}

export function isBaseMainnetAnchorConfigured() {
  if (
    process.env.VERCEL_ENV !== "production" ||
    process.env.TGPI_BASE_ANCHOR_ENABLED !== "true" ||
    (process.env.CRON_SECRET?.trim().length || 0) < 32
  ) {
    return false;
  }
  try {
    getAnchorPrivateKey();
    getWriteRpcUrl();
    getMaximumExecutionCost();
    return true;
  } catch {
    return false;
  }
}

export async function anchorPendingGlobalKeys(): Promise<BaseAnchorRunResult> {
  if (
    process.env.VERCEL_ENV !== "production" ||
    process.env.TGPI_BASE_ANCHOR_ENABLED !== "true"
  ) {
    throw new GlobalKeyAnchorError(
      "Base Mainnet anchoring is not enabled for this production runtime.",
    );
  }

  const privateKey = getAnchorPrivateKey();
  const rpcUrl = getWriteRpcUrl();
  const { candidates, client, integrityFailures, scanned } =
    await collectAnchorCandidates();
  if (candidates.length === 0) {
    return { anchored: 0, integrityFailures, scanned, status: "no_changes" };
  }

  const account = privateKeyToAccount(privateKey);
  const batchId = createGlobalKeyAnchorBatchId();
  const batch = buildGlobalKeyAnchorBatch({ batchId, candidates });
  const anchoredAt = new Date(
    Math.floor(Date.now() / 1_000) * 1_000,
  ).toISOString();
  const data = encodeBaseAnchorPayload({
    anchoredAt,
    batchId,
    memberCount: batch.members.length,
    root: batch.root,
  });
  const publicClient = getPublicClient(rpcUrl);
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(rpcUrl, { retryCount: 1, timeout: 10_000 }),
  });

  const [fees, gas] = await Promise.all([
    publicClient.estimateFeesPerGas(),
    publicClient.estimateGas({
      account: account.address,
      data,
      to: account.address,
      value: BigInt(0),
    }),
  ]);
  const executionCost = gas * fees.maxFeePerGas;
  const maximumCost = getMaximumExecutionCost();
  if (executionCost > maximumCost) {
    throw new GlobalKeyAnchorError(
      "Base Mainnet fees exceeded the configured transaction safety ceiling.",
    );
  }

  const transactionHash = await walletClient.sendTransaction({
    account,
    data,
    gas,
    maxFeePerGas: fees.maxFeePerGas,
    maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
    to: account.address,
    value: BigInt(0),
  });
  const receipt = await publicClient.waitForTransactionReceipt({
    confirmations: 2,
    hash: transactionHash,
    timeout: 90_000,
  });
  if (receipt.status !== "success") {
    throw new GlobalKeyAnchorError(
      "The Base Mainnet anchor transaction was not successful.",
    );
  }

  const results = await mapWithConcurrency(batch.members, 3, async (member) => {
    try {
      const user = await client.users.getUser(member.reference);
      const current = normalizeGlobalKeyRecord(
        user.privateMetadata[TGPI_GLOBAL_KEY_METADATA_KEY],
      );
      const currentHash = current?.events.at(-1)?.hash;
      if (
        !current ||
        current.revision !== member.revision ||
        currentHash !== member.eventHash
      ) {
        return "rotated";
      }

      const anchor: TgpiGlobalKeyAnchorRecord = {
        anchoredAt,
        batchId,
        blockNumber: receipt.blockNumber.toString(),
        chainId: TGPI_BASE_CHAIN_ID,
        eventHash: member.eventHash,
        leaf: member.leaf,
        memberCount: batch.members.length,
        merkleProof: member.merkleProof,
        network: TGPI_BASE_NETWORK,
        revision: member.revision,
        root: batch.root,
        schemaVersion: TGPI_GLOBAL_KEY_ANCHOR_SCHEMA_VERSION,
        signerAddress: account.address.toLowerCase(),
        status: "confirmed",
        transactionHash: transactionHash.toLowerCase(),
      };
      await client.users.updateUserMetadata(member.reference, {
        privateMetadata: withAnchorMetadata(user.privateMetadata, anchor),
      });
      return "anchored";
    } catch (error) {
      console.error("Unable to persist a Global Key anchor receipt", {
        errorName: error instanceof Error ? error.name : "UnknownError",
        transactionHash,
      });
      return "failed";
    }
  });

  return {
    anchored: results.filter((result) => result === "anchored").length,
    batchId,
    blockNumber: receipt.blockNumber.toString(),
    failedMetadataWrites: results.filter((result) => result === "failed").length,
    integrityFailures,
    root: batch.root,
    scanned,
    skippedAfterRotation: results.filter((result) => result === "rotated").length,
    status: "anchored",
    transactionHash,
  };
}

export async function verifyGlobalKeyBaseAnchor({
  anchorValue,
  eventHash,
  keyId,
  revision,
}: {
  anchorValue: unknown;
  eventHash: string;
  keyId: string;
  revision: number;
}): Promise<TgpiGlobalKeyAnchorView | { status: "invalid" | "unavailable" }> {
  const anchor = normalizeGlobalKeyAnchorRecord(anchorValue);
  if (!anchor || anchor.eventHash !== eventHash || anchor.revision !== revision) {
    return { status: "awaiting_anchor" };
  }

  const expectedLeaf = createGlobalKeyAnchorLeaf({
    batchId: anchor.batchId,
    eventHash,
    keyId,
    revision,
  });
  if (
    expectedLeaf !== anchor.leaf ||
    !verifyGlobalKeyMerkleProof(anchor) ||
    !getTrustedSigners().has(anchor.signerAddress.toLowerCase())
  ) {
    return { status: "invalid" };
  }

  try {
    const publicClient = getPublicClient();
    const [transaction, receipt] = await Promise.all([
      publicClient.getTransaction({
        hash: anchor.transactionHash as Hex,
      }),
      publicClient.getTransactionReceipt({
        hash: anchor.transactionHash as Hex,
      }),
    ]);
    const decoded = decodeBaseAnchorPayload(transaction.input);
    const explorerUrl = createBaseAnchorExplorerUrl(anchor.transactionHash);
    const expectedSigner = getAddress(anchor.signerAddress as Address).toLowerCase();
    if (
      receipt.status !== "success" ||
      receipt.blockNumber.toString() !== anchor.blockNumber ||
      transaction.from.toLowerCase() !== expectedSigner ||
      transaction.to?.toLowerCase() !== expectedSigner ||
      !decoded ||
      decoded.batchIdHash !== hashGlobalKeyAnchorBatchId(anchor.batchId) ||
      decoded.root !== anchor.root ||
      decoded.memberCount !== anchor.memberCount ||
      decoded.anchoredAt !== anchor.anchoredAt ||
      !explorerUrl
    ) {
      return { status: "invalid" };
    }

    return {
      anchoredAt: anchor.anchoredAt,
      batchId: anchor.batchId,
      blockNumber: anchor.blockNumber,
      chainId: anchor.chainId,
      explorerUrl,
      leaf: anchor.leaf,
      memberCount: anchor.memberCount,
      merkleProof: anchor.merkleProof,
      network: anchor.network,
      root: anchor.root,
      signerAddress: anchor.signerAddress,
      status: "confirmed",
      transactionHash: anchor.transactionHash,
    };
  } catch (error) {
    console.error("Unable to verify a Base Mainnet anchor receipt", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return { status: "unavailable" };
  }
}
