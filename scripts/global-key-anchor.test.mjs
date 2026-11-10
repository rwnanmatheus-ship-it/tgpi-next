import assert from "node:assert/strict";
import { createHash, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { getAddress, isAddress } from "viem";
import {
  buildGlobalKeyAnchorBatch,
  createBaseAnchorExplorerUrl,
  createGlobalKeyAnchorLeaf,
  decodeBaseAnchorPayload,
  encodeBaseAnchorPayload,
  hashGlobalKeyAnchorBatchId,
  normalizeGlobalKeyAnchorRecord,
  TGPI_BASE_CHAIN_ID,
  verifyGlobalKeyMerkleProof,
} from "../src/lib/global-key-anchor.ts";
import {
  createGlobalKeyProof,
  issueGlobalKey,
  readGlobalKeyProof,
} from "../src/lib/global-key-crypto.ts";

const batchId = "TGPI-20260908-A1B2C3D4E5F6";
const anchoredAt = "2026-09-08T15:00:00.000Z";
const cronRouteSource = readFileSync(
  new URL("../src/app/api/cron/global-key-anchor/route.ts", import.meta.url),
  "utf8",
);
const anchorServerSource = readFileSync(
  new URL("../src/lib/global-key-anchor.server.ts", import.meta.url),
  "utf8",
);
const vercelConfig = JSON.parse(
  readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
);

function eventHash(value) {
  return createHash("sha256").update(value).digest("base64url");
}

const candidates = [
  {
    eventHash: eventHash("member-a"),
    keyId: "TGPI-A1B2-C3D4-E5F6",
    reference: "user_private_a",
    revision: 1,
  },
  {
    eventHash: eventHash("member-b"),
    keyId: "TGPI-1122-3344-5566",
    reference: "user_private_b",
    revision: 2,
  },
  {
    eventHash: eventHash("member-c"),
    keyId: "TGPI-ABCD-EF12-3456",
    reference: "user_private_c",
    revision: 3,
  },
];

test("builds an order-independent Merkle root with a valid proof per member", () => {
  const first = buildGlobalKeyAnchorBatch({ batchId, candidates });
  const reversed = buildGlobalKeyAnchorBatch({
    batchId,
    candidates: [...candidates].reverse(),
  });

  assert.equal(first.root, reversed.root);
  assert.equal(first.members.length, candidates.length);
  for (const member of first.members) {
    assert.equal(
      verifyGlobalKeyMerkleProof({
        leaf: member.leaf,
        merkleProof: member.merkleProof,
        root: first.root,
      }),
      true,
    );
  }
});

test("binds every Merkle leaf to its batch and current Global Key revision", () => {
  const candidate = candidates[0];
  const original = createGlobalKeyAnchorLeaf({ batchId, ...candidate });
  const nextRevision = createGlobalKeyAnchorLeaf({
    batchId,
    ...candidate,
    revision: candidate.revision + 1,
  });
  const nextBatch = createGlobalKeyAnchorLeaf({
    batchId: "TGPI-20260909-A1B2C3D4E5F6",
    ...candidate,
  });

  assert.notEqual(original, nextRevision);
  assert.notEqual(original, nextBatch);
});

test("rejects a mutated Merkle inclusion path", () => {
  const batch = buildGlobalKeyAnchorBatch({ batchId, candidates });
  const member = batch.members[0];
  const corrupted = structuredClone(member.merkleProof);
  corrupted[0].hash = `0x${"00".repeat(32)}`;
  assert.equal(
    verifyGlobalKeyMerkleProof({
      leaf: member.leaf,
      merkleProof: corrupted,
      root: batch.root,
    }),
    false,
  );
});

test("supports a privacy-safe single-member anchor batch", () => {
  const batch = buildGlobalKeyAnchorBatch({
    batchId,
    candidates: [candidates[0]],
  });
  assert.equal(batch.members[0].merkleProof.length, 0);
  assert.equal(batch.members[0].leaf, batch.root);
  assert.equal(
    verifyGlobalKeyMerkleProof({
      leaf: batch.members[0].leaf,
      merkleProof: batch.members[0].merkleProof,
      root: batch.root,
    }),
    true,
  );
});

test("encodes and decodes the fixed Base Mainnet anchor payload", () => {
  const batch = buildGlobalKeyAnchorBatch({ batchId, candidates });
  const payload = encodeBaseAnchorPayload({
    anchoredAt,
    batchId,
    memberCount: batch.members.length,
    root: batch.root,
  });
  assert.deepEqual(decodeBaseAnchorPayload(payload), {
    anchoredAt,
    batchIdHash: hashGlobalKeyAnchorBatchId(batchId),
    memberCount: candidates.length,
    root: batch.root,
  });
});

test("on-chain payload contains no member identifier or private event hash", () => {
  const batch = buildGlobalKeyAnchorBatch({ batchId, candidates });
  const payload = encodeBaseAnchorPayload({
    anchoredAt,
    batchId,
    memberCount: batch.members.length,
    root: batch.root,
  }).toLowerCase();

  for (const candidate of candidates) {
    assert.equal(
      payload.includes(Buffer.from(candidate.reference).toString("hex")),
      false,
    );
    assert.equal(
      payload.includes(Buffer.from(candidate.keyId).toString("hex").toLowerCase()),
      false,
    );
    assert.equal(
      payload.includes(Buffer.from(candidate.eventHash).toString("hex")),
      false,
    );
  }
});

test("normalizes only confirmed anchor records with a valid Merkle proof", () => {
  const batch = buildGlobalKeyAnchorBatch({ batchId, candidates });
  const member = batch.members[0];
  const record = {
    anchoredAt,
    batchId,
    blockNumber: "35000123",
    chainId: 8453,
    eventHash: member.eventHash,
    leaf: member.leaf,
    memberCount: batch.members.length,
    merkleProof: member.merkleProof,
    network: "base-mainnet",
    revision: member.revision,
    root: batch.root,
    schemaVersion: 1,
    signerAddress: "0x1234567890abcdef1234567890abcdef12345678",
    status: "confirmed",
    transactionHash: `0x${"ab".repeat(32)}`,
  };

  assert.deepEqual(normalizeGlobalKeyAnchorRecord(record), record);
  assert.equal(
    normalizeGlobalKeyAnchorRecord({ ...record, root: `0x${"ff".repeat(32)}` }),
    null,
  );
});

test("portable proof keeps a confirmed maximum-size batch receipt under the QR limit", () => {
  const secret = "tgpi-anchor-proof-secret-with-more-than-24-characters";
  const record = issueGlobalKey({
    keyId: candidates[0].keyId,
    keySlot: "b",
    now: anchoredAt,
    secret,
  });
  const currentHash = record.events[0].hash;
  const maximumBatch = Array.from({ length: 250 }, (_, index) => ({
    eventHash: index === 0 ? currentHash : eventHash(`maximum-member-${index}`),
    keyId:
      index === 0
        ? record.keyId
        : `TGPI-${index.toString(16).padStart(12, "0").toUpperCase().match(/.{4}/g).join("-")}`,
    reference: `private-reference-${index}`,
    revision: 1,
  }));
  const batch = buildGlobalKeyAnchorBatch({ batchId, candidates: maximumBatch });
  const member = batch.members[0];
  const anchor = {
    anchoredAt,
    batchId,
    blockNumber: "35000123",
    chainId: 8453,
    eventHash: member.eventHash,
    leaf: member.leaf,
    memberCount: batch.members.length,
    merkleProof: member.merkleProof,
    network: "base-mainnet",
    revision: member.revision,
    root: batch.root,
    schemaVersion: 1,
    signerAddress: "0x1234567890abcdef1234567890abcdef12345678",
    status: "confirmed",
    transactionHash: `0x${"ab".repeat(32)}`,
  };
  const proof = createGlobalKeyProof({
    anchor,
    record,
    secret,
    userId: "user_portable_anchor_subject",
  });

  assert.equal(proof.length <= 2_048, true);
  assert.deepEqual(
    normalizeGlobalKeyAnchorRecord(readGlobalKeyProof({ proof, secret })?.anchor),
    anchor,
  );
});

test("production anchor runtime has authentication, environment and spend guards", () => {
  assert.match(cronRouteSource, /CRON_SECRET/);
  assert.match(cronRouteSource, /VERCEL_ENV !== "production"/);
  assert.match(anchorServerSource, /TGPI_BASE_ANCHOR_ENABLED/);
  assert.match(anchorServerSource, /ABSOLUTE_MAX_EXECUTION_COST_WEI/);
  assert.match(anchorServerSource, /value: BigInt\(0\)/);
});

function loadServerModule(source, dependencies, env) {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  new Function("require", "exports", "process", "console", outputText)(name => {
    assert.ok(name in dependencies, `Unexpected dependency ${name}`);
    return dependencies[name];
  }, exports, { env }, { error() {} });
  return exports;
}

test("an authorized production cron skips disabled anchoring without calling the signer", async () => {
  const secret = "cron-fixture-secret-never-used-in-production";
  let attempted = 0;
  const dependencies = {
    "node:crypto": { timingSafeEqual },
    "@/lib/global-key-anchor.server": {
      GlobalKeyAnchorError: class extends Error {},
      anchorPendingGlobalKeys: async () => { attempted += 1; return { status: "no_changes" }; },
    },
  };
  const { GET } = loadServerModule(cronRouteSource, dependencies, { CRON_SECRET: secret, VERCEL_ENV: "production" });
  const url = "https://www.theglobalpolymath.com/api/cron/global-key-anchor";
  assert.equal((await GET(new Request(url))).status, 401);
  const response = await GET(new Request(url, { headers: { Authorization: `Bearer ${secret}` } }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), { status: "disabled", anchored: 0 });
  assert.equal(attempted, 0);
});

test("the server verifies Base receipts against their actual transaction, block and chain", async () => {
  const batch = buildGlobalKeyAnchorBatch({ batchId, candidates });
  const member = batch.members[0];
  const signerAddress = "0x1234567890abcdef1234567890abcdef12345678";
  const hash = `0x${"ab".repeat(32)}`;
  const blockHash = `0x${"cd".repeat(32)}`;
  const anchorValue = {
    anchoredAt, batchId, blockNumber: "35000123", chainId: TGPI_BASE_CHAIN_ID,
    eventHash: member.eventHash, leaf: member.leaf, memberCount: batch.members.length,
    merkleProof: member.merkleProof, network: "base-mainnet", revision: member.revision,
    root: batch.root, schemaVersion: 1, signerAddress, status: "confirmed", transactionHash: hash,
  };
  const transaction = {
    hash, blockHash, chainId: TGPI_BASE_CHAIN_ID, from: signerAddress, to: signerAddress,
    input: encodeBaseAnchorPayload(anchorValue),
  };
  const receipt = { transactionHash: hash, blockHash, blockNumber: 35000123n, status: "success" };
  const { verifyGlobalKeyBaseAnchor } = loadServerModule(anchorServerSource, {
    "server-only": {},
    "@clerk/nextjs/server": {},
    "viem": {
      getAddress, isAddress, http: () => ({}),
      createPublicClient: () => ({ getTransaction: async () => transaction, getTransactionReceipt: async () => receipt }),
    },
    "viem/accounts": {},
    "viem/chains": { base: { id: TGPI_BASE_CHAIN_ID } },
    "@/lib/auth/guards": {},
    "@/lib/firestore-admin-rest.server": {},
    "@/lib/global-key-anchor": {
      createBaseAnchorExplorerUrl, createGlobalKeyAnchorLeaf, decodeBaseAnchorPayload,
      hashGlobalKeyAnchorBatchId, normalizeGlobalKeyAnchorRecord, TGPI_BASE_CHAIN_ID, verifyGlobalKeyMerkleProof,
    },
    "@/lib/global-key-crypto": {},
    "@/lib/global-key-ledger.server": {},
    "@/lib/global-key-secrets.server": {},
    "@/lib/global-key": {},
  }, { TGPI_BASE_ANCHOR_TRUSTED_SIGNERS: signerAddress });
  const check = () => verifyGlobalKeyBaseAnchor({ anchorValue, eventHash: member.eventHash, keyId: member.keyId, revision: member.revision });
  assert.equal((await check()).status, "confirmed");
  transaction.chainId = 1;
  assert.equal((await check()).status, "invalid");
  transaction.chainId = TGPI_BASE_CHAIN_ID;
  receipt.blockHash = `0x${"ef".repeat(32)}`;
  assert.equal((await check()).status, "invalid");
});

test("Vercel schedules one daily production anchor batch", () => {
  assert.deepEqual(vercelConfig.crons.filter(cron => cron.path === "/api/cron/global-key-anchor"), [
    {
      path: "/api/cron/global-key-anchor",
      schedule: "17 3 * * *",
    },
  ]);
});
