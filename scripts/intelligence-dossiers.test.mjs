import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DOSSIER_CLAIMS, DOSSIER_COUNTRIES, DOSSIER_SOURCES, COST_REFERENCES, COUNTRY_CURRENCIES, dossierFor, reviewState } from "../src/lib/intelligence/dossiers.ts";
import { normalizeSourceText, inspectSourceText, retrieveRegisteredSource, validateSourceChecks, sourceCheckIsStale } from "../src/lib/intelligence/source-checks.ts";
import { COST_CATEGORIES, RESEARCH_TASKS, emptyWorksheet, validateWorksheet, worksheetTotals } from "../src/lib/intelligence/research-plan.ts";
const NOW = new Date("2026-09-03T12:00:00Z");
const slugs = JSON.parse(readFileSync(new URL("../src/data/intelligence/identities.json", import.meta.url), "utf8")).countries.map(c => c.slug);
const tasks = RESEARCH_TASKS.map(t => t.id);
test("dossier sources and claims have unique identities and known country links", () => {
  for (const rows of [DOSSIER_SOURCES, DOSSIER_CLAIMS, COST_REFERENCES]) { assert.equal(new Set(rows.map(r => r.id)).size, rows.length); for (const row of rows) assert.ok(slugs.includes(row.country)); }
  assert.equal(DOSSIER_COUNTRIES.length, 12);
  for (const claim of DOSSIER_CLAIMS) { const source = DOSSIER_SOURCES.find(s => s.id === claim.sourceId); assert.equal(source.country, claim.country); assert.ok(source.reviewedAt); assert.notEqual(source.status, "unconfirmed"); for (const key of ["audience", "limits", "referencePeriod", "reviewedAt"]) assert.ok(claim[key]); assert.ok(claim.questions.length >= 2); }
});
test("registered sources use fixed public HTTPS URLs with no credentials or fragments", () => { for (const source of DOSSIER_SOURCES) { const url = new URL(source.url); assert.equal(url.protocol, "https:"); assert.equal(url.username, ""); assert.equal(url.password, ""); assert.equal(url.hash, ""); if (source.automaticCheck) assert.ok(source.markers.length); if (!source.reviewedAt) assert.equal(source.automaticCheck, false); } });
test("a country outside the editorial wave has explicit missing layers", () => { const dossier = dossierFor("vatican-city"); assert.deepEqual(dossier, { claims: [], sources: [], costs: [] }); assert.deepEqual(dossierFor("__proto__"), dossier); });
test("review dates cannot be renewed by availability checks", () => { const c = DOSSIER_CLAIMS.find(c => c.id === "ca-funding-2026"); assert.equal(reviewState(c, NOW), "reviewed"); assert.equal(reviewState(c, new Date("2026-10-04")), "review-due"); assert.equal(reviewState(c, new Date("2026-08-31")), "not-effective"); const de = DOSSIER_CLAIMS.find(c => c.id === "de-study-route"); assert.equal(reviewState(de, new Date("2027-01-01")), "expired"); });
test("Canada’s dated funds threshold is not promoted to a living-cost estimate", () => { const c = DOSSIER_CLAIMS.find(c => c.id === "ca-funding-2026"); assert.equal(c.kind, "requirement"); assert.equal(c.effectiveFrom, "2026-09-01"); assert.match(c.summary, /23,448/); assert.match(c.limits, /Quebec/); assert.equal(dossierFor("canada").costs.length, 0); });
test("cost references retain distinct currencies, periods, categories and source years", () => { const ox = COST_REFERENCES.find(c => c.id === "oxford-2026"); const mit = COST_REFERENCES.find(c => c.id === "mit-2026"); const jp = COST_REFERENCES.find(c => c.id === "japan-jasso-2023"); assert.deepEqual([ox.low, ox.high, ox.currency, ox.periodMonths, ox.category], [1405, 2105, "GBP", 1, "living"]); assert.deepEqual([mit.low, mit.currency, mit.periodMonths, mit.category], [109017, "USD", 9, "total-study"]); assert.equal(jp.historical, true); assert.match(jp.referencePeriod, /2023/); });
test("source normalization ignores scripts and preserves inspectable text", () => { assert.equal(normalizeSourceText('<main>2026–27&nbsp;<b>£1,405</b><script>ignore()</script></main>'), '2026-27 £1,405'); });
test("source marker success is not labelled legal or factual verification", () => { const s = DOSSIER_SOURCES.find(s => s.id === "uk-oxford"); const r = inspectSourceText(s, `<main>${"Context ".repeat(20)}2026-27 £1,405 £2,105</main>`); assert.equal(r.status, "markers-present"); assert.equal(r.matchedMarkers, 3); assert.match(r.message, /not a legal or factual/); });
test("missing markers, empty pages and access challenges require review", () => { const s = DOSSIER_SOURCES[0]; for (const body of ["", "<html><h1>Just a moment</h1></html>", `<main>${"Unexpected content ".repeat(30)}</main>`]) assert.equal(inspectSourceText(s, body).status, "review-needed"); });
test("null costs remain unknown and are not marked as a complete budget", () => { const p = emptyWorksheet("portugal", "EUR"); assert.ok(validateWorksheet(p, slugs, tasks, NOW)); assert.equal(worksheetTotals(p).missing.length, 7); assert.equal(worksheetTotals(p).complete, false); });
test("explicit zero is allowed without inventing missing values", () => { const p = emptyWorksheet("portugal", "EUR"); p.monthly.housing = 0; assert.equal(worksheetTotals(p).missing.length, 6); assert.equal(p.monthly.food, null); });
test("worksheet arithmetic includes period costs once and computes the declared contingency", () => { const p = emptyWorksheet("portugal", "EUR"); p.monthly = { housing: 1000, food: 300, transport: 100, health: 100, other: 100 }; p.tuition = 6000; p.arrival = 2000; const t = worksheetTotals(p); assert.equal(t.knownMonthly, 1600); assert.equal(t.base, 27200); assert.equal(t.total, 29920); assert.equal(t.complete, true); });
test("worksheet schema rejects hostile or impossible values", () => { const p = emptyWorksheet("portugal", "EUR"); for (const patch of [{ country: "unknown" }, { currency: "BTC" }, { months: 0 }, { months: 1.5 }, { months: 61 }, { bufferPercent: -1 }, { bufferPercent: Infinity }, { tuition: -1 }, { arrival: "2000" }, { quoteDate: "2026-02-31" }, { quoteDate: "2027-01-01" }, { quoteDate: "tomorrow" }, { completed: ["legally-approved"] }, { city: "x".repeat(81) }, { sourceNote: "x".repeat(241) }, { monthly: { ...p.monthly, housing: NaN } }]) assert.equal(validateWorksheet({ ...p, ...patch }, slugs, tasks, NOW), null, JSON.stringify(patch)); });
test("worksheet normalization strips caller-provided identity and authority claims", () => { const p = validateWorksheet({ ...emptyWorksheet("japan", "JPY"), userId: "someone-else", approved: true, completed: ["route", "route"] }, slugs, tasks, NOW); assert.equal(p.userId, undefined); assert.equal(p.approved, undefined); assert.deepEqual(p.completed, ["route"]); });
test("all cost category inputs are represented once", () => { assert.equal(new Set(COST_CATEGORIES).size, 5); const p = emptyWorksheet("canada", "CAD"); assert.deepEqual(Object.keys(p.monthly), [...COST_CATEGORIES]); });
test("new source retrieval is bounded and never accepts a caller URL", () => { const source = readFileSync(new URL("../src/lib/intelligence/source-checks.ts", import.meta.url), "utf8"); const cache = readFileSync(new URL("../src/lib/intelligence/source-watch.server.ts", import.meta.url), "utf8"); assert.match(source, /fetcher\(source.url/); assert.match(source, /redirect: "manual"/); assert.match(source, /AbortSignal.timeout\(8000\)/); assert.match(source, /1_500_000/); assert.match(source, /\[401, 403\]/); assert.match(cache, /revalidate: 21600/); assert.match(cache, /slice\(i, i \+ 3\)/); });
test("currency changes clear values and asynchronous reads preserve newer edits", () => { const source = readFileSync(new URL("../src/components/intelligence/ResearchWorkbench.tsx", import.meta.url), "utf8"); assert.match(source, /emptyWorksheet\(country, currency\)/); assert.match(source, /revision.current !== loadingRevision/); assert.match(source, /revision.current === savingRevision/); assert.match(source, /user\?\.id \?\? "guest"/); assert.doesNotMatch(source, /localStorage|sessionStorage/); });

const fixtureSource = { ...DOSSIER_SOURCES[0], id: "fixture", automaticCheck: true, markers: ["verified fixture"], reviewIssue: undefined };
const fixtureHtml = `<main>${"Public contextual text. ".repeat(12)}Verified fixture</main>`;
const htmlResponse = (text = fixtureHtml, status = 200) => new Response(text, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
test("unknown identifiers and manual-only sources never initiate retrieval", async () => {
  let calls = 0; const fetcher = async () => { calls++; throw new Error("must not fetch"); };
  await assert.rejects(retrieveRegisteredSource("https://127.0.0.1/", DOSSIER_SOURCES, fetcher), /Unknown/);
  for (const source of DOSSIER_SOURCES.filter(s => !s.automaticCheck)) { const result = await retrieveRegisteredSource(source.id, DOSSIER_SOURCES, fetcher); assert.equal(result.status, "not-checked"); assert.equal(result.checkedAt, null); assert.equal(result.httpStatus, null); assert.match(result.message, /Manual queue/); }
  assert.equal(calls, 0);
});
test("restricted, redirect and nontransient HTTP results stop after one attempt", async () => {
  for (const [status, expected] of [[401, "restricted"], [403, "restricted"], [302, "redirect"], [404, "unreachable"]]) {
    let calls = 0; const r = await retrieveRegisteredSource("fixture", [fixtureSource], async (url, options) => { calls++; assert.equal(url, fixtureSource.url); assert.equal(options.redirect, "manual"); assert.equal(options.headers.Cookie, undefined); return htmlResponse("Unavailable", status); });
    assert.equal(calls, 1); assert.equal(r.status, expected); assert.equal(r.httpStatus, status);
  }
});
test("transient HTTP and connection errors retry at most once", async () => {
  for (const status of [429, 500, 503]) { let calls = 0; const r = await retrieveRegisteredSource("fixture", [fixtureSource], async () => ++calls === 1 ? htmlResponse("Temporary", status) : htmlResponse()); assert.equal(calls, 2); assert.equal(r.status, "markers-present"); }
  let calls = 0; const failed = await retrieveRegisteredSource("fixture", [fixtureSource], async () => { calls++; throw new Error("offline"); }); assert.equal(calls, 2); assert.equal(failed.status, "unreachable"); assert.equal(failed.httpStatus, null); assert.match(failed.message, /not proof of a site outage/);
});
test("empty, non-HTML, oversized and challenge responses cannot become successful checks", async () => {
  for (const response of [new Response(null, { headers: { "Content-Type": "text/html" } }), new Response("{}", { headers: { "Content-Type": "application/json" } }), new Response("small", { headers: { "Content-Type": "text/html", "Content-Length": "1500001" } }), htmlResponse("x".repeat(1_500_001)), htmlResponse(`<main>Just a moment ${fixtureHtml}</main>`)]) {
    let calls = 0; const r = await retrieveRegisteredSource("fixture", [fixtureSource], async () => { calls++; return response; }); assert.equal(r.status, "review-needed"); assert.equal(calls, 1);
  }
});
test("hashes represent normalized content, not editorial approval or mutation", async () => {
  const before = JSON.stringify(fixtureSource); const a = await retrieveRegisteredSource("fixture", [fixtureSource], async () => htmlResponse()); const b = await retrieveRegisteredSource("fixture", [fixtureSource], async () => htmlResponse(fixtureHtml.replace("Verified fixture", "Verified <b>fixture</b>")));
  assert.match(a.contentSha256, /^[a-f0-9]{64}$/); assert.equal(a.contentSha256, b.contentSha256); assert.equal(JSON.stringify(fixtureSource), before); assert.ok(validateSourceChecks([a], [fixtureSource]));
});
test("partial, duplicate, foreign and malformed source reports are rejected", async () => {
  const check = await retrieveRegisteredSource("fixture", [fixtureSource], async () => htmlResponse());
  for (const report of [[], [check, check], [null], [{ ...check, sourceId: "elsewhere" }], [{ ...check, checkedAt: "invalid" }], [{ ...check, contentSha256: "fake" }], [{ ...check, status: "approved" }], [{ ...check, matchedMarkers: 0 }], [{ ...check, httpStatus: 403 }], [{ ...check, expectedMarkers: 0 }]]) assert.equal(validateSourceChecks(report, [fixtureSource]), false);
});
test("invalid, old and future timestamps are not treated as fresh evidence", () => {
  for (const checkedAt of [null, "invalid", "2026-08-30T12:00:00Z", "2026-09-04T12:00:00Z"]) assert.equal(sourceCheckIsStale({ status: "review-needed", checkedAt }, NOW.getTime()), true);
  assert.equal(sourceCheckIsStale({ status: "markers-present", checkedAt: NOW.toISOString() }, NOW.getTime()), false);
  assert.equal(sourceCheckIsStale({ status: "not-checked", checkedAt: null }, NOW.getTime()), false);
});
test("all open gaps retain explicit observation, action and deadline", () => {
  const issues = DOSSIER_SOURCES.filter(s => s.reviewIssue); assert.equal(issues.length, 7); assert.equal(DOSSIER_SOURCES.filter(s => !s.automaticCheck).length, 6);
  for (const source of issues) { const issue = source.reviewIssue; assert.ok(issue.action); assert.ok(issue.observation); assert.ok(issue.reviewBy > issue.observedAt); if (issue.reason === "access-restricted") { assert.equal(source.automaticCheck, false); assert.ok(source.reviewedAt); } }
  assert.equal(DOSSIER_SOURCES.find(s => s.id === "de-visa").automaticCheck, true);
});
test("expanded coverage uses real layer-specific guidance without inventing local cost estimates", () => {
  assert.equal(DOSSIER_CLAIMS.length, 29); assert.equal(DOSSIER_SOURCES.length, 29);
  for (const country of ["netherlands", "ireland", "australia", "new-zealand"]) { const d = dossierFor(country); assert.ok(d.claims.some(c => c.layer === "entry")); assert.ok(d.claims.some(c => c.layer === "education")); assert.equal(d.costs.length, 0); }
  assert.match(DOSSIER_CLAIMS.find(c => c.id === "ie-course-route").summary, /TrustEd/);
  assert.equal(DOSSIER_CLAIMS.find(c => c.id === "pt-consular-orientation").kind, "guidance");
});
test("AUD and NZD scenarios use exact cents and keep the version-2 worksheet contract", () => {
  for (const country of ["australia", "new-zealand"]) { const p = emptyWorksheet(country, COUNTRY_CURRENCIES[country]); p.monthly.housing = 1234.56; assert.ok(validateWorksheet(p, slugs, tasks, NOW)); assert.equal(p.version, 2); assert.equal(worksheetTotals(p).base, 14814.72); assert.equal(validateWorksheet({ ...p, tuition: 1.001 }, slugs, tasks, NOW), null); }
});
test("hex entities and typographic separators preserve markers without exposing scripts", () => { assert.equal(normalizeSourceText('<main>&#x31;1,904\u200b&nbsp;2026<script>fake</script>&#x110000;</main>'), "11,904 2026"); });
