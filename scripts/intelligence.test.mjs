import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { INDICATOR_IDS, parseWorldBankResponse, evidenceStatus, comparisonCaveat, personalResearchPlan, sourceApiUrl, formatObservation } from "../src/lib/intelligence/core.ts";
const identities = JSON.parse(readFileSync(new URL("../src/data/intelligence/identities.json", import.meta.url), "utf8")).countries;
const legacy = readFileSync(new URL("../src/data/countries.ts", import.meta.url), "utf8");
const NOW = "2026-09-02T18:00:00.000Z";
// Deliberately synthetic parser fixtures; never exported to production data.
function fixture(indicator = "IT.NET.USER.ZS") {
  return [{ page: 1, pages: 1, total: 195, lastupdated: "2026-08-01" }, identities.map(c => ({ countryiso3code: c.iso3, indicator: { id: indicator }, date: "2025", value: 80 }))];
}
test("195 country IDs map uniquely to all existing country slugs", () => {
  assert.equal(identities.length, 195);
  for (const key of ["slug", "iso2", "iso3", "m49"]) assert.equal(new Set(identities.map(c => c[key])).size, 195);
  for (const c of identities) { assert.match(c.iso3, /^[A-Z]{3}$/); assert.match(c.m49, /^\d{3}$/); assert.ok(legacy.includes(`"slug": "${c.slug}"`)); }
  assert.equal(identities.find(c => c.slug === "vatican-city").iso3, "VAT");
  assert.equal(identities.find(c => c.slug === "palestine").iso3, "PSE");
});
test("registered query URLs are fixed HTTPS World Bank requests", () => {
  for (const id of INDICATOR_IDS) { const url = new URL(sourceApiUrl(id)); assert.equal(url.origin, "https://api.worldbank.org"); assert.equal(url.searchParams.get("source"), "2"); }
  assert.throws(() => sourceApiUrl("https://127.0.0.1/secret"));
});
test("bundled fallback is complete, source-linked and matches its content revision", () => {
  const snapshot = JSON.parse(readFileSync(new URL("../src/data/intelligence/snapshot.json", import.meta.url), "utf8"));
  assert.equal(snapshot.schemaVersion, 1); assert.equal(snapshot.methodologyVersion, "1.0.0"); assert.equal(snapshot.series.length, 4);
  assert.ok(snapshot.observations.length >= 700);
  const slugs = new Set(identities.map(c => c.slug)); const keys = new Set();
  for (const row of snapshot.observations) {
    assert.ok(slugs.has(row.country)); assert.ok(INDICATOR_IDS.includes(row.indicator));
    assert.ok(Number.isFinite(row.value) && row.value >= 0); assert.ok(row.year >= 1960 && row.year <= new Date(row.retrievedAt).getUTCFullYear());
    assert.ok(Number.isFinite(Date.parse(row.retrievedAt))); assert.ok(row.retrievedAt <= snapshot.retrievedAt);
    const key = `${row.country}:${row.indicator}`; assert.ok(!keys.has(key)); keys.add(key);
  }
  for (const series of snapshot.series) { assert.equal(series.url, sourceApiUrl(series.indicator)); assert.match(series.responseSha256, /^[a-f0-9]{64}$/); assert.equal(series.observations, snapshot.observations.filter(o => o.indicator === series.indicator).length); }
  const signature = JSON.stringify(snapshot.observations.map(({country,indicator,value,year}) => ({country,indicator,value,year})));
  assert.equal(snapshot.revision, createHash("sha256").update(signature).digest("hex").slice(0,16));
});
test("valid observations retain reference year and collection date separately", () => {
  const result = parseWorldBankResponse(fixture(), "IT.NET.USER.ZS", identities, NOW);
  assert.equal(result.length, 195); assert.equal(result[0].year, 2025); assert.equal(result[0].retrievedAt, NOW); assert.equal(result[0].sourceUpdatedAt, "2026-08-01");
});
test("null is missing, not zero", () => { const f = fixture(); f[1][0].value = null; assert.equal(parseWorldBankResponse(f, "IT.NET.USER.ZS", identities, NOW).length, 194); });
test("real zero is retained", () => { const f = fixture(); f[1][0].value = 0; assert.equal(parseWorldBankResponse(f, "IT.NET.USER.ZS", identities, NOW).find(r => r.country === identities[0].slug).value, 0); });
test("aggregates are excluded", () => { const f = fixture(); f[1][0].countryiso3code = "WLD"; assert.equal(parseWorldBankResponse(f, "IT.NET.USER.ZS", identities, NOW).length, 194); });
for (const [name, change] of [
  ["future observation", f => { f[1][0].date = "2027"; }],
  ["negative value", f => { f[1][0].value = -1; }],
  ["infinite value", f => { f[1][0].value = Infinity; }],
  ["string value", f => { f[1][0].value = "80"; }],
  ["out of range", f => { f[1][0].value = 101; }],
  ["indicator mismatch", f => { f[1][0].indicator.id = "SP.POP.TOTL"; }],
  ["duplicate", f => { f[1][1].countryiso3code = f[1][0].countryiso3code; }],
  ["incomplete pagination", f => { f[0].pages = 2; }],
  ["wrong total", f => { f[0].total = 196; }],
  ["future source update", f => { f[0].lastupdated = "2027-01-01"; }],
  ["coverage collapse", f => { f[1].forEach((r, i) => { if (i < 100) r.value = null; }); }],
]) test(`publication rejects ${name}`, () => { const f = fixture(); change(f); assert.throws(() => parseWorldBankResponse(f, "IT.NET.USER.ZS", identities, NOW)); });
test("gross enrollment can legitimately exceed 100", () => { const f = fixture("SE.TER.ENRR"); f[1][0].value = 125; assert.equal(parseWorldBankResponse(f, "SE.TER.ENRR", identities, NOW).length, 195); });
test("error payload and HTML cannot become evidence", () => { for (const payload of [null, {}, "<html>503</html>", [{ message: "error" }]]) assert.throws(() => parseWorldBankResponse(payload, "IT.NET.USER.ZS", identities, NOW)); });
const observation = { country: "portugal", indicator: "IT.NET.USER.ZS", value: 80, year: 2025, retrievedAt: NOW, sourceUpdatedAt: null };
test("freshness distinguishes current, historical, stale and missing", () => {
  assert.equal(evidenceStatus(observation, new Date(NOW)), "current");
  assert.equal(evidenceStatus({ ...observation, year: 2010 }, new Date(NOW)), "historical");
  assert.equal(evidenceStatus(observation, new Date("2026-09-11")), "stale");
  assert.equal(evidenceStatus(undefined), "missing");
  assert.equal(formatObservation(undefined), "Not available");
});
test("comparison warns on mismatched years and missing values", () => { assert.match(comparisonCaveat([observation, undefined]), /Incomplete/); assert.match(comparisonCaveat([observation, { ...observation, year: 2024 }]), /Different reference years/); assert.match(comparisonCaveat([observation, observation]), /Same reference year/); });
test("personal plan responds to goal, budget, timeline, profession and languages", () => {
  const c = { primaryGoal: "work", budgetRange: "1500-3000", timeHorizon: "now", languages: ["Portuguese"], profession: "Engineering", priorities: [] };
  const p = personalResearchPlan(c, "Portugal");
  assert.match(p[0].detail, /near-term.*work authorization/);
  assert.match(p[1].detail, /1500-3000/); assert.match(p[2].detail, /Engineering/); assert.match(p[3].detail, /Portuguese/);
  assert.match(personalResearchPlan({ ...c, primaryGoal: "study" }, "Canada")[2].title, /institution/);
});
test("new core and public evidence pages do not read synthetic country ratings", () => {
  for (const path of ["src/lib/global-workspace.ts", "src/lib/tgpi-comparison.ts", "src/lib/premium-command-center.ts", "src/app/compare/page.tsx", "src/app/countries/[slug]/page.tsx", "src/app/countries/page.tsx"]) {
    const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /\.tgpiScore|\.safetyScore|\.averageMonthlyBudget|\.englishFriendliness|\.qualityOfLifeScore/);
  }
});
test("source retrieval forbids redirects and does not accept user URLs", () => {
  const source = readFileSync(new URL("../src/lib/intelligence/server.ts", import.meta.url), "utf8");
  assert.match(source, /redirect: "error"/); assert.match(source, /AbortSignal.timeout/); assert.match(source, /bytes > 1_000_000/); assert.doesNotMatch(source, /request\.url|searchParams/);
});
test("saving a plan is authenticated, same-origin, bounded and preserves unrelated profile fields", () => {
  const source = readFileSync(new URL("../src/app/api/intelligence/plan/route.ts", import.meta.url), "utf8");
  assert.match(source, /if \(!session\.userId\)/);
  assert.match(source, /origin !== new URL\(request.url\).origin/);
  assert.match(source, /length > 8000/);
  assert.match(source, /\.\.\.previous, primaryGoal/);
  assert.match(source, /targetCountries.length >= 5/);
  assert.match(source, /updateUserMetadata\(session.userId/);
  assert.doesNotMatch(source, /payload\.userId|payload\.uid|privateMetadata/);
});
test("atlas keyboard regions use cartography instead of the statistical Americas grouping", () => {
  const source = readFileSync(new URL("../src/components/countries/CountriesWorldMap.tsx", import.meta.url), "utf8");
  assert.match(source, /continents.get\(country.slug\) \?\? country.region/);
  const map = JSON.parse(readFileSync(new URL("../public/maps/tgpi-world-countries-50m.json", import.meta.url), "utf8"));
  assert.equal(map.features.find(f => f.isoA3 === "CAN").continent, "North America");
  assert.equal(map.features.find(f => f.isoA3 === "BRA").continent, "South America");
  assert.equal(identities.find(c => c.iso3 === "CAN").region, "Americas");
});
