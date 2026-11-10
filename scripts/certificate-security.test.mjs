import assert from "node:assert/strict";
import { createPublicKey, verify } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

import * as account from "../src/lib/account-profile.ts";
import * as presentation from "../src/lib/certificate-presentation.ts";
import * as standard from "../src/lib/credential-standard.ts";

const nativeRequire = createRequire(import.meta.url);
const env = {
  secret: process.env.TGPI_CREDENTIAL_SIGNING_SECRET,
  vercel: process.env.VERCEL_ENV,
};
const testSecret = "fixture-credential-signing-secret-never-used-in-production";
process.env.TGPI_CREDENTIAL_SIGNING_SECRET = testSecret;
process.env.VERCEL_ENV = "production";
test.after(() => {
  if (env.secret === undefined) delete process.env.TGPI_CREDENTIAL_SIGNING_SECRET;
  else process.env.TGPI_CREDENTIAL_SIGNING_SECRET = env.secret;
  if (env.vercel === undefined) delete process.env.VERCEL_ENV;
  else process.env.VERCEL_ENV = env.vercel;
});

function loadServerFile(path, dependencies = {}) {
  const source = readFileSync(new URL("../src/" + path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const exports = {};
  new Function("require", "exports", outputText)(
    (name) => Object.hasOwn(dependencies, name) ? dependencies[name] : nativeRequire(name),
    exports,
  );
  return exports;
}

const signing = loadServerFile("lib/credential-signing.server.ts", {
  "server-only": {},
  "@/lib/certificate-presentation": presentation,
});
const fixture = {
  achievementType: "Professional Certificate",
  assessmentScore: 93,
  completedAt: "2026-09-13T12:00:00.000Z",
  competencyIds: ["mobility"],
  courseId: "english-abroad",
  courseTitle: "Global English — applied mobility",
  courseVersion: "1.0.0",
  credentialProfile: "TGPI Verified Learning Credential",
  credentialSchemaVersion: 2,
  credentialStandardVersion: "2.0",
  criteriaUrl: "/courses/english-abroad/certification",
  evidenceSummary: ["18 checkpoints completed"],
  id: "TGPI-ENGABR-TEST123",
  identityEvidence: {
    anchor: { status: "awaiting_anchor" },
    fingerprint: "TEST-IDENTITY",
    globalKeyId: "TGPI-AAAA-BBBB-CCCC",
    revision: 1,
  },
  issuedAt: "2026-09-14T12:00:00.000Z",
  issuer: "TGPI — The Global Polymath Institute",
  keyId: "tgpi-learning-hmac-v2",
  learningHours: 12.5,
  masteryThreshold: 80,
  ownerUid: "private-owner-uid",
  professionalEvidence: {
    certificateLanguage: "en",
    instructionLanguage: "en",
    rubricVersion: "1.0.0",
    sharing: true,
  },
  publicName: "Test Learner",
  skills: [{ id: "mobility", level: "applied", name: "Mobility" }],
  standardsAlignment: [...standard.TGPI_CREDENTIAL_ALIGNMENT_TARGETS],
  status: "active",
};

function signStoredRecord(changes = {}) {
  const payload = { ...fixture, ...changes };
  return { ...payload, verificationHash: signing.signLearningCredential(payload) };
}

function setup(storedCredential, authenticatedUid) {
  const publicPath = "tgpiLearningCredentials/" + fixture.id;
  const ownerPath = (uid) => `tgpiLearningUsers/${uid}/credentials/${fixture.id}`;
  const documents = new Map([
    [publicPath, { data: storedCredential }],
    [ownerPath(fixture.ownerUid), { data: storedCredential }],
  ]);
  const records = loadServerFile("lib/learning-records.server.ts", {
    "server-only": {},
    "@/data/courses/english-abroad/assessment-bank.server": {},
    "@/data/courses": {},
    "@/lib/account-profile": account,
    "@/lib/activation-store.server": {},
    "@/lib/global-key.server": {},
    "@/lib/credential-standard": standard,
    "@/lib/credential-signing.server": signing,
    "@/lib/firestore-admin-rest.server": {
      getFirestoreDocument: async (path) => documents.get(path),
      isLearningStorageConfigured: () => true,
    },
  });
  const api = loadServerFile("app/api/credentials/[id]/route.ts", {
    "next/server": { NextResponse: Response },
    "@/lib/credential-standard": standard,
    "@/lib/credential-signing.server": signing,
    "@/lib/certificate-presentation": presentation,
    "@/lib/learning-records.server": records,
    "@/lib/auth/guards": {
      requireApiUser: async () => {
        if (!authenticatedUid) throw new Error("Unauthenticated");
        return { uid: authenticatedUid };
      },
    },
  });
  return {
    documents,
    get: (download = false) => api.GET(
      new Request(`https://www.theglobalpolymath.com/api/credentials/${fixture.id}${download ? "?download=1" : ""}`),
      { params: Promise.resolve({ id: fixture.id }) },
    ),
    ownerPath,
    records,
  };
}

const keys = loadServerFile("app/api/credentials/keys/route.ts", {
  "@/lib/credential-signing.server": signing,
});

test("HMAC credentials preserve their datastore signature and print code across visibility and lifecycle changes", () => {
  const original = signStoredRecord();
  assert.equal(signing.verifyLearningCredentialIntegrity(original), true);
  const samePayloadReordered = Object.fromEntries(Object.entries(original).reverse());
  assert.equal(signing.verifyLearningCredentialIntegrity(samePayloadReordered), true);
  assert.equal(signing.verifyLearningCredentialIntegrity({ ...original, verificationHash: [] }), false);
  const fingerprint = signing.createCredentialDocumentFingerprint(original);
  assert.match(fingerprint, /^(?:[A-F0-9]{4}-){3}[A-F0-9]{4}$/);
  assert.equal(signing.createCredentialDocumentFingerprint(signStoredRecord({
    professionalEvidence: { ...fixture.professionalEvidence, sharing: false },
    status: "revoked",
  })), fingerprint);
  assert.notEqual(signing.createCredentialDocumentFingerprint(signStoredRecord({
    publicName: "Altered Learner",
  })), fingerprint);
  assert.equal(signing.verifyLearningCredentialIntegrity({ ...original, publicName: "Altered Learner" }), false);
});

test("the issuer public key verifies exact signed evidence and an altered snapshot fails", async () => {
  const response = await setup(signStoredRecord()).get();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /no-store/);
  const { proof, ...snapshot } = await response.json();
  const publicResponse = keys.GET();
  assert.equal(publicResponse.status, 200);
  assert.equal(publicResponse.headers.get("access-control-allow-origin"), "*");
  const { keys: [jwk] } = await publicResponse.json();
  assert.equal(jwk.kty, "OKP");
  assert.equal(jwk.crv, "Ed25519");
  assert.equal(jwk.d, undefined);
  assert.equal(jwk.kid, proof.keyId);
  assert.equal(proof.publicKeyUrl, "https://www.theglobalpolymath.com/api/credentials/keys");
  const [header, payload, signature] = proof.jws.split(".");
  const protectedHeader = JSON.parse(Buffer.from(header, "base64url"));
  assert.equal(protectedHeader.alg, "Ed25519");
  assert.equal(protectedHeader.kid, proof.keyId);
  assert.deepEqual(JSON.parse(Buffer.from(payload, "base64url")), snapshot);
  assert.ok(Number.isFinite(Date.parse(snapshot.statusCheckedAt)));
  assert.equal(snapshot.completedAt, fixture.completedAt);
  assert.equal(snapshot.integrity.verified, true);
  const decodedProof = JSON.stringify(snapshot);
  assert.ok(!decodedProof.includes(fixture.ownerUid));
  assert.ok(!decodedProof.includes("verificationHash"));
  const publicKey = createPublicKey({ key: jwk, format: "jwk" });
  const sig = Buffer.from(signature, "base64url");
  assert.equal(verify(null, Buffer.from(`${header}.${payload}`), publicKey, sig), true);
  const altered = Buffer.from(JSON.stringify({ ...snapshot, status: "revoked" })).toString("base64url");
  assert.equal(verify(null, Buffer.from(`${header}.${altered}`), publicKey, sig), false);
});

test("privacy is fail-closed for forged visibility and private evidence is downloadable only by its owner", async () => {
  const privateCredential = signStoredRecord({
    professionalEvidence: { ...fixture.professionalEvidence, sharing: false },
  });
  assert.equal((await setup(privateCredential).get()).status, 404);
  assert.equal((await setup(privateCredential, "unrelated-user").get(true)).status, 404);
  const mismatchedIndex = setup(privateCredential, "unrelated-user");
  mismatchedIndex.documents.set(mismatchedIndex.ownerPath("unrelated-user"), { data: privateCredential });
  assert.equal((await mismatchedIndex.get(true)).status, 404);

  const forgedSharing = {
    ...privateCredential,
    professionalEvidence: { ...fixture.professionalEvidence, sharing: true },
  };
  assert.equal((await setup(forgedSharing).get()).status, 404);
  const forgedOwnerResponse = await setup(forgedSharing, fixture.ownerUid).get(true);
  const forgedOwnerRecord = await forgedOwnerResponse.json();
  assert.equal(forgedOwnerResponse.status, 200);
  assert.equal(forgedOwnerRecord.integrity.verified, false);
  assert.equal(forgedOwnerRecord.proof, undefined);

  const owner = setup(privateCredential, fixture.ownerUid);
  assert.equal((await owner.get()).status, 404);
  const response = await owner.get(true);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-disposition"), /attachment/);
  assert.equal((await response.json()).proof.algorithm, "Ed25519");
});

test("the foundation credential issued with public-name consent remains verifiable without a sharing field", async () => {
  const legacy = signStoredRecord({ completedAt: undefined, professionalEvidence: undefined });
  const { records, get } = setup(legacy);
  const owned = await records.getUserLearningCredential(fixture.ownerUid, fixture.id);
  assert.equal(owned.id, fixture.id);
  const response = await get();
  assert.equal(response.status, 200);
  const exported = await response.json();
  assert.equal(exported.completedAt, undefined);
  assert.equal(exported.proof.algorithm, "Ed25519");
});

test("the issuer signs current revocation status and separates preview keys", async () => {
  const response = await setup(signStoredRecord({ status: "revoked" })).get();
  const { proof, status } = await response.json();
  assert.equal(status, "revoked");
  assert.equal(JSON.parse(Buffer.from(proof.jws.split(".")[1], "base64url")).status, "revoked");

  const signed = signStoredRecord();
  try {
    process.env.VERCEL_ENV = "preview";
    assert.notEqual(signing.getCredentialIssuerPublicKey().kid, proof.keyId);
    delete process.env.TGPI_CREDENTIAL_SIGNING_SECRET;
    assert.equal(keys.GET().status, 503);
    assert.equal(signing.verifyLearningCredentialIntegrity(signed), false);
  } finally {
    process.env.VERCEL_ENV = "production";
    process.env.TGPI_CREDENTIAL_SIGNING_SECRET = testSecret;
  }
});
