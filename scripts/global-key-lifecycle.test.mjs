import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import * as anchor from "../src/lib/global-key-anchor.ts";
import * as crypto from "../src/lib/global-key-crypto.ts";
import * as model from "../src/lib/global-key.ts";
import * as references from "../src/lib/certificate-reference.ts";
import * as shares from "../src/lib/global-key-share.ts";

const uid = "user_global_key_fixture";
const keyId = "TGPI-0000-0000-0001";
const secret = "a dedicated global identity fixture key";
const issuedAt = "2026-09-08T10:00:00.000Z";

function loadServer(name, services, environment, clock) {
  const source = readFileSync(new URL(`../src/lib/${name}.ts`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  new Function("require", "exports", "process", "Date", "console", code)(dependency => {
    assert.ok(dependency in services, `Unexpected dependency ${dependency}`);
    return services[dependency];
  }, exports, { env: environment }, clock, { error() {} });
  return exports;
}

function setup({ legacy, environment = {} } = {}) {
  const docs = new Map();
  const user = { privateMetadata: legacy ? { [model.TGPI_GLOBAL_KEY_METADATA_KEY]: legacy } : {} };
  let queue = Promise.resolve();
  let configured = true;
  let now = Date.parse("2026-11-10T12:00:00.000Z");
  class TestClock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const getDocument = async path => docs.has(path) ? { data: structuredClone(docs.get(path)) } : null;
  const getDocuments = async paths => new Map(await Promise.all(paths.map(async path => [path, await getDocument(path)])));
  const services = {
    "server-only": {},
    "node:crypto": { createHash, randomBytes },
    "@/lib/auth/guards": { formatTgpiGlobalId: () => keyId },
    "@/lib/certificate-reference": references,
    "@/lib/firestore-admin-rest.server": {
      isLearningStorageConfigured: () => configured,
      getFirestoreDocument: getDocument,
      getFirestoreDocuments: getDocuments,
      createFirestoreUpdateWrite: (path, data, condition) => ({ path, data, condition }),
      createFirestoreDeleteWrite: path => ({ path, delete: true }),
      runFirestoreTransaction: build => {
        const result = queue.then(async () => {
          const plan = await build({ getDocuments });
          for (const write of plan.writes) {
            if (write.condition?.exists === false) assert.equal(docs.has(write.path), false);
          }
          for (const write of plan.writes) {
            if (write.delete) docs.delete(write.path);
            else docs.set(write.path, structuredClone(write.data));
          }
          return plan.result;
        });
        queue = result.catch(() => {});
        return result;
      },
    },
    "@/lib/global-key": model,
    "@/lib/global-key-crypto": crypto,
    "@/lib/global-key-anchor": anchor,
    "@/lib/global-key-anchor.server": {
      isBaseMainnetAnchorConfigured: () => false,
      verifyGlobalKeyBaseAnchor: async () => ({ status: "awaiting_anchor" }),
    },
    "@/lib/global-key-secrets.server": {
      getGlobalKeySecretForSlot: () => secret,
      getPrimaryGlobalKeyMaterial: () => ({ slot: "a", secret }),
    },
    "@/lib/global-key-share": shares,
    "@/lib/members/identity.server": { ensureMemberNumber: async () => ({ number: keyId }) },
    "@clerk/nextjs/server": { clerkClient: async () => ({ users: { getUser: async () => user } }) },
  };

  const load = name => loadServer(name, services, environment, TestClock);
  services["@/lib/global-key-ledger.server"] = load("global-key-ledger.server");
  const identity = services["@/lib/global-key.server"] = load("global-key.server");
  const grants = load("global-key-share.server");
  return { identity, grants, docs, user, advance(ms) { now += ms; }, disconnect() { configured = false; } };
}

test("concurrent issuance produces one canonical chain and no Clerk metadata rewrite", async () => {
  const { identity, user } = setup();
  const [first, second] = await Promise.all([
    identity.getOrCreateGlobalKey(uid),
    identity.getOrCreateGlobalKey(uid),
  ]);
  assert.equal(first.fingerprint, second.fingerprint);
  assert.equal((await identity.verifyPublicGlobalKey(first.proof)).status, "verified");
  assert.deepEqual(user.privateMetadata, {});
});

test("one of two concurrent rotations wins and legacy proofs remain exact historical records", async () => {
  const legacy = crypto.issueGlobalKey({ keyId, keySlot: "b", secret, now: issuedAt });
  const { identity, disconnect, user } = setup({ legacy });
  const old = await identity.getOrCreateGlobalKey(uid);
  const rotations = await Promise.allSettled([
    identity.rotateUserGlobalKey(uid, old.revision),
    identity.rotateUserGlobalKey(uid, old.revision),
  ]);
  assert.equal(rotations.filter(item => item.status === "fulfilled").length, 1);
  const result = await identity.verifyPublicGlobalKey(old.proof);
  assert.equal(result.status, "historical");
  assert.equal(result.fingerprint, old.fingerprint);
  assert.equal(result.revision, 1);
  assert.equal(result.currentRevision, 2);
  assert.equal(user.privateMetadata[model.TGPI_GLOBAL_KEY_METADATA_KEY].revision, 1);
  disconnect();
  assert.equal((await identity.verifyPublicGlobalKey(old.proof)).status, "unavailable");
});

test("temporary grants enforce ownership, revocation, expiry and exact revision without persisting bearer tokens", async () => {
  const legacy = crypto.issueGlobalKey({ keyId, keySlot: "b", secret, now: issuedAt });
  const { identity, grants, docs, advance } = setup({ legacy });
  const first = await grants.createGlobalKeyShare(uid, 1, 1);
  assert.ok(!JSON.stringify([...docs]).includes(first.token));
  assert.equal((await grants.verifyGlobalKeyShare(first.token)).status, "verified");
  await assert.rejects(grants.revokeGlobalKeyShare("other_member", first.id), /Invalid verification link/);
  await grants.revokeGlobalKeyShare(uid, first.id);
  assert.equal((await grants.verifyGlobalKeyShare(first.token)).status, "revoked");

  advance(30_000);
  const second = await grants.createGlobalKeyShare(uid, 1, 1);
  advance(86_400_000);
  assert.equal((await grants.verifyGlobalKeyShare(second.token)).status, "expired");

  const third = await grants.createGlobalKeyShare(uid, 7, 1);
  await identity.rotateUserGlobalKey(uid, 1);
  assert.equal((await grants.verifyGlobalKeyShare(third.token)).status, "superseded");
});

test("preview cannot issue or rotate live identity ledger records", async () => {
  const legacy = crypto.issueGlobalKey({ keyId, keySlot: "b", secret, now: issuedAt });
  const { identity, grants, docs } = setup({ legacy, environment: { VERCEL_ENV: "preview" } });
  const read = await identity.getOrCreateGlobalKey(uid);
  assert.equal(read.revision, 1);
  await assert.rejects(identity.rotateUserGlobalKey(uid, 1), /temporarily unavailable/);
  await assert.rejects(grants.createGlobalKeyShare(uid, 1, 1), /temporarily unavailable/);
  assert.equal(docs.size, 0);
});
