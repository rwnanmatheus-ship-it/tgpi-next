import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  createPortableLearningRecord,
  getCredentialTrustState,
  TGPI_CREDENTIAL_ALIGNMENT_TARGETS,
  TGPI_VERIFIED_LEARNING_SCHEMA_VERSION,
} from "../src/lib/credential-standard.ts";

const credential = {
  achievementType: "Professional Certificate",
  assessmentScore: 91,
  courseId: "english-abroad",
  courseTitle: "Global English",
  courseVersion: "1.0.0",
  credentialProfile: "TGPI Verified Learning Credential",
  credentialSchemaVersion: 2,
  credentialStandardVersion: "2.0",
  criteriaUrl: "/courses/english-abroad/certification",
  evidenceSummary: ["18/18 checkpoints", "6/6 gates"],
  id: "TGPI-ENGABR-TEST123",
  identityEvidence: {
    anchor: { status: "awaiting_anchor" },
    fingerprint: "ABCD1234",
    globalKeyId: "TGPI-AAAA-BBBB-CCCC",
    revision: 1,
  },
  integrityFingerprint: "credential-fingerprint",
  integrityVerified: true,
  issuedAt: "2026-09-14T12:00:00.000Z",
  issuer: "TGPI — The Global Polymath Institute",
  learningHours: 6.2,
  masteryThreshold: 80,
  publicName: "Verified Learner",
  skills: [{ id: "mobility", level: "applied", name: "Mobility" }],
  standardsAlignment: [...TGPI_CREDENTIAL_ALIGNMENT_TARGETS],
  status: "active",
};

test("builds a privacy-safe portable learning record", () => {
  const record = createPortableLearningRecord(
    credential,
    "https://www.theglobalpolymath.com/",
  );
  const serialized = JSON.stringify(record);

  assert.equal(record.formatVersion, "2.0");
  assert.equal(record.profile.schemaVersion, TGPI_VERIFIED_LEARNING_SCHEMA_VERSION);
  assert.equal(
    record.verificationUrl,
    "https://www.theglobalpolymath.com/verify/credentials/TGPI-ENGABR-TEST123",
  );
  assert.equal(serialized.includes("ownerUid"), false);
  assert.equal(serialized.includes("verificationHash"), false);
});

test("exposes standards as targets without claiming external certification", () => {
  const record = createPortableLearningRecord(
    credential,
    "https://www.theglobalpolymath.com",
  );

  assert.equal(
    record.profile.alignmentTargets.every(
      (item) => item.status === "implementation-target",
    ),
    true,
  );
  assert.match(record.disclaimer, /1EdTech\/W3C product certification/);
  assert.match(record.disclaimer, /not a government degree/);
});

test("trust state never presents revoked or altered records as verified", () => {
  assert.equal(
    getCredentialTrustState({ integrityVerified: true, status: "active" }),
    "active_verified",
  );
  assert.equal(
    getCredentialTrustState({ integrityVerified: true, status: "revoked" }),
    "revoked",
  );
  assert.equal(
    getCredentialTrustState({ integrityVerified: false, status: "active" }),
    "integrity_review",
  );
});

const legacyCertificateSource = readFileSync(
  new URL("../src/app/certificate/[id]/page.tsx", import.meta.url),
  "utf8",
);
const legacyVerificationSource = readFileSync(
  new URL("../src/app/verify/[id]/page.tsx", import.meta.url),
  "utf8",
);
const certificationPageSource = readFileSync(
  new URL(
    "../src/app/courses/[id]/certification/[assessmentId]/page.tsx",
    import.meta.url,
  ),
  "utf8",
);
const learningRecordsSource = readFileSync(
  new URL("../src/lib/learning-records.server.ts", import.meta.url),
  "utf8",
);

test("removes client-side legacy credential trust paths", () => {
  assert.doesNotMatch(legacyCertificateSource, /firebase\/firestore/);
  assert.doesNotMatch(legacyVerificationSource, /getDocs|collection\(/);
  assert.match(legacyCertificateSource, /redirect\("\/certificates\//);
});

test("protects assessment access and failed-answer feedback", () => {
  assert.match(certificationPageSource, /await requireUser\(\)/);
  assert.match(
    learningRecordsSource,
    /result\.passed \? result : \{ \.\.\.result, feedback: \[\] \}/,
  );
  assert.match(learningRecordsSource, /Wait 30 seconds/);
});
