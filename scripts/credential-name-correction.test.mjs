import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import * as account from "../src/lib/account-profile.ts";
import * as reference from "../src/lib/certificate-reference.ts";
import * as presentation from "../src/lib/certificate-presentation.ts";

const nativeRequire = createRequire(import.meta.url);
const previousSecret = process.env.TGPI_CREDENTIAL_SIGNING_SECRET;
process.env.TGPI_CREDENTIAL_SIGNING_SECRET = "name-correction-test-signing-material-never-used-in-production";
test.after(() => {
  if (previousSecret === undefined) delete process.env.TGPI_CREDENTIAL_SIGNING_SECRET;
  else process.env.TGPI_CREDENTIAL_SIGNING_SECRET = previousSecret;
});

function loadFile(file, dependencies = {}) {
  const source = readFileSync(new URL("../src/" + file, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  });
  const exports = {};
  new Function("require", "exports", outputText)(
    (name) => Object.hasOwn(dependencies, name) ? dependencies[name] : nativeRequire(name),
    exports,
  );
  return exports;
}
const signing = loadFile("lib/credential-signing.server.ts", {
  "server-only": {},
  "@/lib/certificate-presentation": presentation,
});
const initial = {
  id: "TGPI-GLOENG202-NAMETEST123",
  achievementType: "Professional Certificate",
  courseId: "global-english-2026",
  courseVersion: "2.0.0",
  courseTitle: "Global English",
  publicName: "Amina Ferreira",
  issuedAt: "2026-10-17T12:00:00Z",
  completedAt: "2026-10-16T12:00:00Z",
  ownerUid: "user-test-owner",
  assessmentScore: 95,
  learningHours: 6.2,
  masteryThreshold: 80,
  skills: [{ id: "communication", level: "applied", name: "Communication" }],
  evidenceSummary: ["All assessments completed"],
  identityEvidence: { globalKeyId: "TGPI-AAAA-BBBB-CCCC", revision: 1, fingerprint: "identity", anchor: { status: "activation_pending" } },
  status: "active",
  issuer: "TGPI — The Global Polymath Institute",
  keyId: "tgpi-learning-hmac-v2",
};
const currentIdentity = { uid: initial.ownerUid, publicName: "Amina Solène Ferreira", emailVerified: true };
const confirmation = { expectedName: initial.publicName, confirmedName: currentIdentity.publicName, consent: true };
const signed = (changes = {}) => {
  const claims = { ...initial, ...changes };
  return { ...claims, verificationHash: signing.signLearningCredential(claims) };
};

function storeFixture({ publicCredential = signed(), ownerCredential = structuredClone(publicCredential), configured = true } = {}) {
  const publicPath = `tgpiLearningCredentials/${initial.id}`;
  const ownerPath = `tgpiLearningUsers/${initial.ownerUid}/credentials/${initial.id}`;
  const documents = new Map([
    [publicPath, { data: publicCredential, updateTime: "issuer-version-1" }],
    [ownerPath, { data: ownerCredential, updateTime: "owner-version-1" }],
  ]);
  const committed = [];
  const service = loadFile("lib/credential-name-correction.server.ts", {
    "server-only": {},
    "@/lib/account-profile": account,
    "@/lib/certificate-reference": reference,
    "@/lib/credential-signing.server": signing,
    "@/lib/firestore-admin-rest.server": {
      isLearningStorageConfigured: () => configured,
      createFirestoreUpdateWrite: (path, data, currentDocument) => ({ path, data, currentDocument }),
      runFirestoreTransaction: async (buildPlan) => {
        const plan = await buildPlan({ getDocuments: async (paths) => new Map(paths.map((path) => [path, documents.get(path) ?? null])) });
        for (const write of plan.writes) {
          const existing = documents.get(write.path);
          if (write.currentDocument.exists === false) assert.equal(existing, undefined);
          if (write.currentDocument.updateTime) assert.equal(write.currentDocument.updateTime, existing?.updateTime);
          documents.set(write.path, { data: structuredClone(write.data), updateTime: "committed-version" });
          committed.push(write);
        }
        return plan.result;
      },
    },
  });
  return {
    service, documents, committed, publicPath, ownerPath,
    correct: (identity = currentIdentity, input = confirmation) => service.correctOwnedCredentialName(identity, initial.id, input),
  };
}

test("name correction re-signs both mirrors, preserves all other claims and archives the complete previous signed record privately", async () => {
  for (const changes of [
    {},
    { professionalEvidence: { sharing: true, certificateLanguage: "pt-BR", instructionLanguage: "pt-BR", rubricVersion: "1.0" } },
    { automatedEvidence: { method: "objective-assessment", humanReviewed: false, finalScore: 95, retentionScore: 95, lessonChecks: 10, workloadMinutes: 372 } },
  ]) {
    const previous = signed(changes);
    const store = storeFixture({ publicCredential: previous });
    const result = await store.correct();
    assert.equal(result.changed, true);
    assert.equal(result.credentialId, initial.id);
    const corrected = store.documents.get(store.publicPath).data;
    assert.deepEqual(corrected, store.documents.get(store.ownerPath).data);
    assert.equal(signing.verifyLearningCredentialIntegrity(corrected), true);
    const { publicName, verificationHash, ...remaining } = corrected;
    const { publicName: oldName, verificationHash: oldHash, ...oldRemaining } = previous;
    assert.equal(publicName, currentIdentity.publicName);
    assert.notEqual(verificationHash, oldHash);
    assert.deepEqual(remaining, oldRemaining);
    assert.equal(store.committed.length, 3);
    const history = store.committed[2];
    assert.match(history.path, /^tgpiLearningUsers\/user-test-owner\/credentialNameHistory\//);
    assert.deepEqual(history.currentDocument, { exists: false });
    assert.deepEqual(history.data.previousCredential, previous);
    assert.equal(history.data.previousVerificationHash, oldHash);
    assert.equal(history.data.previousDocumentFingerprint, signing.createCredentialDocumentFingerprint(previous));
    assert.equal(history.data.documentFingerprint, result.documentFingerprint);
    assert.notEqual(history.data.previousDocumentFingerprint, result.documentFingerprint);
    assert.ok(Number.isFinite(Date.parse(history.data.changedAt)));
  }
});

test("duplicate confirmed requests are idempotent and do not create another history event", async () => {
  const store = storeFixture();
  await store.correct();
  const repeat = await store.correct();
  assert.equal(repeat.changed, false);
  assert.equal(store.committed.length, 3);
});

test("correction rejects account-name races, stale record names, invalid identity and unavailable storage without writing", async () => {
  for (const [identity, input, status] of [
    [currentIdentity, { ...confirmation, expectedName: "Another saved name" }, 409],
    [currentIdentity, { ...confirmation, confirmedName: "Arbitrary replacement" }, 409],
    [{ ...currentIdentity, emailVerified: false }, confirmation, 403],
    [{ ...currentIdentity, uid: "another-user" }, confirmation, 404],
    [{ ...currentIdentity, publicName: "TGPI Member" }, { ...confirmation, confirmedName: "TGPI Member" }, 409],
    [{ ...currentIdentity, publicName: "Amina\u202e Ferreira" }, confirmation, 409],
  ]) {
    const store = storeFixture();
    await assert.rejects(() => store.correct(identity, input), (error) => error.status === status);
    assert.equal(store.committed.length, 0);
  }
  const unavailable = storeFixture({ configured: false });
  await assert.rejects(() => unavailable.correct(), (error) => error.status === 503);
  assert.equal(unavailable.committed.length, 0);
});

test("revoked, replaced, tampered, missing or independently signed divergent mirrors cannot be corrected", async () => {
  for (const options of [
    { publicCredential: signed({ status: "revoked" }) },
    { publicCredential: signed({ status: "replaced" }) },
    { publicCredential: { ...signed(), assessmentScore: 100 } },
    { ownerCredential: { ...signed(), publicName: "Tampered" } },
    { ownerCredential: signed({ assessmentScore: 96 }) },
    { ownerCredential: signed({ ownerUid: "another-user" }) },
  ]) {
    const store = storeFixture(options);
    await assert.rejects(() => store.correct(), (error) => error.status === 409 || error.status === 404);
    assert.equal(store.committed.length, 0);
  }
  const missing = storeFixture();
  missing.documents.delete(missing.ownerPath);
  await assert.rejects(() => missing.correct(), (error) => error.status === 404);
});

class AuthenticationError extends Error {}
function routeFixture({ authenticated = true, wrongUser = false, verified = true } = {}) {
  const store = storeFixture();
  const user = {
    id: wrongUser ? "another-user" : initial.ownerUid,
    firstName: "Amina", lastName: "Ferreira",
    primaryEmailAddress: { verification: { status: verified ? "verified" : "unverified" } },
    unsafeMetadata: { tgpiAccountProfile: { legalFullName: currentIdentity.publicName } },
  };
  const route = loadFile("app/api/credentials/[id]/name/route.ts", {
    "@clerk/nextjs/server": { currentUser: async () => user },
    "@/lib/account-profile": account,
    "@/lib/certificate-reference": reference,
    "@/lib/credential-name-correction.server": store.service,
    "@/lib/auth/guards": {
      TgpiAuthenticationError: AuthenticationError,
      requireApiUser: async (request) => {
        if (!authenticated || request.headers.get("x-tgpi-session") !== "session-test") throw new AuthenticationError();
        return { uid: initial.ownerUid, publicName: "stale guard name" };
      },
    },
  });
  return {
    store,
    post: ({ body = confirmation, headers = {}, id = initial.id } = {}) => route.POST(new Request(`https://www.theglobalpolymath.com/api/credentials/${initial.id}/name`, {
      method: "POST",
      headers: { origin: "https://www.theglobalpolymath.com", "content-type": "application/json", "x-tgpi-session": "session-test", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }), { params: Promise.resolve({ id }) }),
  };
}

test("the owner route resolves the fresh account full name and returns a private uncached correction", async () => {
  const fixture = routeFixture();
  const response = await fixture.post();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /private, no-store/);
  assert.equal(response.headers.get("vary"), "Cookie");
  const result = await response.json();
  assert.equal(result.publicName, currentIdentity.publicName);
  assert.equal(result.changed, true);
  assert.equal(fixture.store.documents.get(fixture.store.publicPath).data.publicName, currentIdentity.publicName);
});

test("the route rejects unauthenticated, wrong-session, cross-origin, wrong-user, invalid-content and arbitrary replacement requests", async () => {
  for (const [fixtureOptions, requestOptions, expectedStatus] of [
    [{ authenticated: false }, {}, 401],
    [{ wrongUser: true }, {}, 401],
    [{ verified: false }, {}, 403],
    [{}, { headers: { "x-tgpi-session": "another-session" } }, 401],
    [{}, { headers: { origin: "https://attacker.example" } }, 403],
    [{}, { headers: { "content-type": "text/plain" } }, 415],
    [{}, { body: "bad JSON" }, 400],
    [{}, { body: { ...confirmation, newName: "Injected name" } }, 400],
    [{}, { body: { ...confirmation, consent: false } }, 400],
    [{}, { body: { ...confirmation, confirmedName: "Injected name" } }, 409],
    [{}, { body: "x".repeat(2049) }, 413],
    [{}, { id: "../private" }, 400],
  ]) {
    const fixture = routeFixture(fixtureOptions);
    assert.equal((await fixture.post(requestOptions)).status, expectedStatus);
    assert.equal(fixture.store.committed.length, 0);
  }
});
