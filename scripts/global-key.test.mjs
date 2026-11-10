import assert from "node:assert/strict";
import test from "node:test";
import {
  createGlobalKeyProof,
  getGlobalKeyFingerprint,
  getGlobalKeyProofStatus,
  issueGlobalKey,
  normalizeGlobalKeyRecord,
  readGlobalKeyProof,
  rotateGlobalKey,
  verifyGlobalKeyChain,
} from "../src/lib/global-key-crypto.ts";
import { readVerificationReference } from "../src/lib/certificate-reference.ts";

const secret = "tgpi-test-secret-material-with-more-than-24-characters";
const keyId = "TGPI-A1B2-C3D4-E5F6";
const userId = "user_test_private_subject";
const issuedAt = "2026-09-08T10:00:00.000Z";

test("verification accepts a copied official Global ID URL, a portable proof and an expiring link", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const proof = createGlobalKeyProof({ record, secret, userId });
  const href = `/verify/global-key?proof=${proof}`;
  const share = `TGS1.${"a".repeat(43)}`;
  const shareHref = `/verify/global-key#share=${share}`;
  for (const value of [proof, `https://www.theglobalpolymath.com${href}`]) {
    assert.deepEqual(readVerificationReference(value), { kind: "proof", href });
  }
  for (const value of [share, `https://theglobalpolymath.com${shareHref}`]) {
    assert.deepEqual(readVerificationReference(value), { kind: "share", href: shareHref });
  }
  for (const value of [
    keyId,
    `http://theglobalpolymath.com${href}`,
    `https://lookalike.example${href}`,
    `https://member@theglobalpolymath.com${href}`,
    `https://theglobalpolymath.com${href}&proof=${proof}`,
    `https://theglobalpolymath.com${href}#share=${share}`,
  ]) assert.equal(readVerificationReference(value), null);
});

test("historical verification requires the exact signed revision and gives its original fingerprint", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const original = readGlobalKeyProof({ proof: createGlobalKeyProof({ record, secret, userId }), secret });
  const rotated = rotateGlobalKey({ record, secret, now: "2026-09-08T10:02:00.000Z" });
  assert.equal(getGlobalKeyProofStatus(record, original), "verified");
  assert.equal(getGlobalKeyProofStatus(rotated, original), "historical");
  assert.equal(getGlobalKeyFingerprint(rotated, original.revision), getGlobalKeyFingerprint(record));
  assert.equal(getGlobalKeyProofStatus(rotated, { ...original, revision: 3 }), "invalid");
  const fork = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const forkProof = readGlobalKeyProof({ proof: createGlobalKeyProof({ record: fork, secret, userId }), secret });
  assert.equal(getGlobalKeyProofStatus(rotated, forkProof), "invalid");
});

test("the transactional ledger supports histories beyond the original Clerk metadata limit", () => {
  let record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  for (let minute = 1; minute <= 14; minute += 1) {
    record = rotateGlobalKey({ record, secret, now: new Date(Date.parse(issuedAt) + minute * 60_000).toISOString() });
  }
  assert.equal(record.revision, 15);
  assert.ok(verifyGlobalKeyChain({ expectedKeyId: keyId, record, secret }));
});

test("issues a normalized, verifiable genesis block", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  assert.equal(record.revision, 1);
  assert.equal(record.events[0].previousHash, "GENESIS");
  assert.equal(record.events[0].type, "issued");
  assert.deepEqual(normalizeGlobalKeyRecord(record), record);
  assert.equal(verifyGlobalKeyChain({ expectedKeyId: keyId, record, secret }), true);
});

test("detects altered blocks and broken chain links", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const tampered = structuredClone(record);
  tampered.events[0].timestamp = "2026-09-08T10:01:00.000Z";
  assert.equal(verifyGlobalKeyChain({ expectedKeyId: keyId, record: tampered, secret }), false);
});

test("normalization rejects a forged issuance date", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const forged = { ...record, issuedAt: "2026-09-09T10:00:00.000Z" };
  assert.equal(normalizeGlobalKeyRecord(forged), null);
});

test("rotation appends a signed block without changing the Global ID", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const rotated = rotateGlobalKey({
    now: "2026-09-08T10:02:00.000Z",
    record,
    secret,
  });
  assert.equal(rotated.keyId, keyId);
  assert.equal(rotated.revision, 2);
  assert.equal(rotated.events[1].previousHash, record.events[0].hash);
  assert.equal(rotated.events[1].type, "rotated");
  assert.equal(verifyGlobalKeyChain({ expectedKeyId: keyId, record: rotated, secret }), true);
});

test("encrypted proof hides the Clerk subject and opens with the correct key", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const proof = createGlobalKeyProof({ record, secret, userId });
  assert.equal(proof.startsWith("TGK1.B."), true);
  assert.equal(proof.includes(userId), false);
  const payload = readGlobalKeyProof({ proof, secret });
  assert.equal(payload?.userId, userId);
  assert.equal(payload?.currentHash, record.events[0].hash);
});

test("proof rejects the wrong secret and any token mutation", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const proof = createGlobalKeyProof({ record, secret, userId });
  assert.equal(
    readGlobalKeyProof({
      proof,
      secret: "another-test-secret-material-with-more-than-24-characters",
    }),
    null,
  );
  const mutated = `${proof.slice(0, -1)}${proof.endsWith("A") ? "B" : "A"}`;
  assert.equal(readGlobalKeyProof({ proof: mutated, secret }), null);
});

test("fingerprint changes after rotation while Global ID stays stable", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  const rotated = rotateGlobalKey({
    now: "2026-09-08T10:02:00.000Z",
    record,
    secret,
  });
  assert.notEqual(getGlobalKeyFingerprint(record), getGlobalKeyFingerprint(rotated));
  assert.equal(rotated.keyId, record.keyId);
});

test("rotation cooldown blocks accidental duplicate revisions", () => {
  const record = issueGlobalKey({ keyId, keySlot: "b", now: issuedAt, secret });
  assert.throws(
    () =>
      rotateGlobalKey({
        now: "2026-09-08T10:00:30.000Z",
        record,
        secret,
      }),
    /Wait one minute/,
  );
});
