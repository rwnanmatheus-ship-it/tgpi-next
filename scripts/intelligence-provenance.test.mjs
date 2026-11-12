import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { DOSSIER_SOURCES, DOSSIER_CLAIMS } from "../src/lib/intelligence/dossiers.ts";
import { buildSourceRecords, evidenceSearchText, sourceRegisterHref, summarizeCoverage } from "../src/lib/intelligence/provenance.ts";
import { safeReturnTo } from "../src/lib/auth/return-to.ts";

const { countries } = JSON.parse(readFileSync(new URL("../src/data/intelligence/identities.json", import.meta.url), "utf8"));

test("registry keeps provenance, content review and review issues separate", () => {
  const date = new Date("2026-11-12T14:00:00Z");
  const records = buildSourceRecords(countries, date);
  assert.equal(records.length, DOSSIER_SOURCES.length);
  assert.equal(records.reduce((count, record) => count + record.summaries.length, 0), DOSSIER_CLAIMS.length);
  assert.ok(records.every(record => /^[A-Z]{2}$/.test(record.iso2) && record.countryName));
  const unconfirmed = records.find(record => record.id === "pt-aima");
  assert.equal(unconfirmed.iso2, "PT");
  assert.equal(unconfirmed.reviewedAt, "2026-11-11");
  assert.equal(unconfirmed.status, "limited");
  assert.equal(unconfirmed.automaticCheck, false);
  assert.equal(unconfirmed.needsReview, false);
  const requirement = records.find(record => record.id === "uk-funds");
  assert.equal(requirement.status, "reviewed");
  assert.equal(requirement.summaries[0].state, "reviewed");
  assert.equal(requirement.needsReview, false);
  assert.equal(buildSourceRecords(countries, new Date("2026-12-12")).find(record => record.id === "uk-funds").needsReview, true);
  const stable = records.find(record => record.id === "uk-degree");
  assert.equal(stable.summaries[0].state, "reviewed");
  assert.equal(stable.needsReview, false);
});

test("search normalizes accents and punctuation and registry links stay internal", () => {
  assert.equal(evidenceSearchText("  Université — ESTATÍSTICA  "), "universite estatistica");
  assert.equal(sourceRegisterHref({ country: "portugal" }), "/intelligence?country=portugal#source-register");
  assert.equal(sourceRegisterHref({ source: "pt-aima" }), "/intelligence?source=pt-aima#source-register");
  assert.equal(safeReturnTo("/atlas?guide=evidence"), "/atlas?guide=evidence");
  assert.equal(safeReturnTo("//example.com/atlas?guide=evidence"), "/onboarding");
});

test("statistical coverage accounts for all destinations and keeps absent values separate", () => {
  assert.deepEqual(summarizeCoverage(["current", "historical", "stale"], 195), {
    current: 1, historical: 1, stale: 1, missing: 192,
  });
  assert.deepEqual(summarizeCoverage([], 195), { current: 0, historical: 0, stale: 0, missing: 195 });
});
