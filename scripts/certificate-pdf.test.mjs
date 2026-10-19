import assert from "node:assert/strict";
import test from "node:test";
import { PDFDocument } from "pdf-lib";
import { normalizeTgpiAccountProfile } from "../src/lib/account-profile.ts";
import { createCertificatePdf } from "../src/lib/certificate-pdf.server.ts";

const credential = {
  id: "TGPI-GLOBAL-TEST123456",
  publicName: "Renan Matheus — José François",
  courseTitle: "Global English: Live, Work and Feel at Home Abroad",
  assessmentScore: 93,
  learningHours: 12.5,
  issuedAt: "2026-10-17T12:00:00Z",
  identityEvidence: { globalKeyId: "TGPI-AAAA-BBBB-CCCC" },
  skills: [{ name: "Practical English" }],
  status: "active",
  integrityVerified: true,
};

test("generates a valid single-page A4 landscape certificate with embedded assets", async () => {
  const bytes = await createCertificatePdf(credential);
  const pdf = await PDFDocument.load(bytes);
  assert.equal(pdf.getPageCount(), 1);
  assert.equal(pdf.getTitle(), `${credential.courseTitle} — TGPI Certificate`);
  const { width, height } = pdf.getPage(0).getSize();
  assert.ok(Math.abs(width - 841.89) < 0.1);
  assert.ok(Math.abs(height - 595.28) < 0.1);
  assert.ok(bytes.length > 10_000);
});

test("long names, long course titles, unsupported glyphs and invalid dates do not break PDF generation", async () => {
  const bytes = await createCertificatePdf({
    ...credential,
    publicName: "長い名前 José ".repeat(20),
    courseTitle: credential.courseTitle.repeat(5),
    issuedAt: "invalid date",
  });
  const pdf = await PDFDocument.load(bytes);
  assert.equal(pdf.getPageCount(), 1);
});

// Execute the route with isolated service boundaries to exercise access control.
const { readFileSync } = await import("node:fs");
const { runInNewContext } = await import("node:vm");
const { default: ts } = await import("typescript");
class AuthenticationError extends Error {}
function routeFixture({
  authenticated = true,
  owned = true,
  status = "active",
  integrity = true,
  fail = false,
  birthDateConsent = false,
} = {}) {
  let publicReads = 0;
  let renderOptions;
  const testModule = { exports: {} };
  const source = readFileSync(
    new URL("../src/app/api/credentials/[id]/pdf/route.ts", import.meta.url),
    "utf8",
  );
  const services = {
    "@clerk/nextjs/server": { currentUser: async () => ({ unsafeMetadata: { tgpiAccountProfile: { dateOfBirth: "2001-02-11", certificateBirthDateConsent: birthDateConsent } } }) },
    "@/lib/account-profile": { normalizeTgpiAccountProfile },
    "next/server": { NextResponse: Response },
    "@/lib/auth/guards": {
      TgpiAuthenticationError: AuthenticationError,
      requireApiUser: async () => {
        if (!authenticated) throw new AuthenticationError();
        return { uid: "owner" };
      },
    },
    "@/lib/learning-records.server": {
      getUserLearningCredential: async () => {
        if (fail) throw new Error("storage offline");
        return owned ? credential : null;
      },
      getPublicLearningCredential: async () => {
        publicReads++;
        return { ...credential, status, integrityVerified: integrity };
      },
    },
    "@/lib/credential-standard": {
      getCredentialTrustState: (value) =>
        value.status === "revoked"
          ? "revoked"
          : value.integrityVerified
            ? "active_verified"
            : "integrity_review",
    },
    "@/lib/certificate-pdf.server": {
      createCertificatePdf: async (_credential, options) => { renderOptions = options; return Buffer.from("%PDF-1.7 fixture"); },
    },
  };
  runInNewContext(
    ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    {
      module: testModule,
      exports: testModule.exports,
      require: (name) => services[name],
      Buffer,
      console: { error() {} },
    },
  );
  return {
    get: (id = credential.id) =>
      testModule.exports.GET(
        new Request("https://example.test/api/credentials/test/pdf"),
        { params: Promise.resolve({ id }) },
      ),
    publicReads: () => publicReads,
    renderOptions: () => renderOptions,
  };
}

test("PDF download rejects unauthenticated requests, malformed IDs and non-owners", async () => {
  assert.equal(
    (await routeFixture({ authenticated: false }).get()).status,
    401,
  );
  assert.equal((await routeFixture().get("../private")).status, 400);
  const nonOwner = routeFixture({ owned: false });
  assert.equal((await nonOwner.get()).status, 404);
  assert.equal(nonOwner.publicReads(), 0);
});

test("PDF download rejects revoked and integrity-review credentials", async () => {
  assert.equal((await routeFixture({ status: "revoked" }).get()).status, 409);
  assert.equal((await routeFixture({ integrity: false }).get()).status, 409);
});

test("verified owner receives an uncached PDF attachment; service failure is recoverable", async () => {
  const response = await routeFixture().get();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "application/pdf");
  assert.match(
    response.headers.get("Content-Disposition"),
    /attachment; filename="TGPI-/,
  );
  assert.match(response.headers.get("Cache-Control"), /private, no-store/);
  assert.match(await response.text(), /^%PDF/);
  assert.equal((await routeFixture({ fail: true }).get()).status, 500);
});

test("renderer rejects revoked or unverified records even outside the download route", async () => {
  await assert.rejects(() =>
    createCertificatePdf({ ...credential, status: "revoked" }),
  );
  await assert.rejects(() =>
    createCertificatePdf({ ...credential, integrityVerified: false }),
  );
});

test("PDF contains a clickable QR verification target and preserves the original issuance snapshot", async () => {
  const bytes = await createCertificatePdf(credential);
  const pdf = await PDFDocument.load(bytes);
  assert.match(pdf.getSubject(), /document design 2026\.2/);
  const annotations = pdf.getPage(0).node.Annots();
  assert.equal(annotations.size(), 1);
  const { PDFDict, PDFName, PDFString } = await import("pdf-lib");
  const annotation = annotations.lookup(0, PDFDict);
  const action = annotation.lookup(PDFName.of("A"), PDFDict);
  assert.equal(
    action.lookup(PDFName.of("URI"), PDFString).decodeText(),
    `https://www.theglobalpolymath.com/verify/credentials/${credential.id}`,
  );
  assert.equal(credential.issuedAt, "2026-10-17T12:00:00Z");
  assert.equal(credential.identityEvidence.globalKeyId, "TGPI-AAAA-BBBB-CCCC");
});


test("birth date is included only on the owner PDF with explicit consent", async () => {
  const privatePdf = routeFixture();
  assert.equal((await privatePdf.get()).status, 200);
  assert.equal(privatePdf.renderOptions().personalBirthDate, "");
  const optedIn = routeFixture({ birthDateConsent: true });
  assert.equal((await optedIn.get()).status, 200);
  assert.equal(optedIn.renderOptions().personalBirthDate, "2001-02-11");
  const bytes = await createCertificatePdf(credential, { personalBirthDate: "2001-02-11" });
  assert.equal((await PDFDocument.load(bytes)).getPageCount(), 1);
  assert.equal("dateOfBirth" in credential, false);
});
