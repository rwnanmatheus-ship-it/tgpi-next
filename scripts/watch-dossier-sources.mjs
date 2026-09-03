import { readFile, writeFile, mkdir } from "node:fs/promises";
import { DOSSIER_COUNTRIES, DOSSIER_VERSION, dossierFor, reviewState } from "../src/lib/intelligence/dossiers.ts";
import { validateSourceChecks, sourceCheckIsStale } from "../src/lib/intelligence/source-checks.ts";

// Scheduled server-side diagnostics: public sources only, never private worksheets or account APIs.
const countries = DOSSIER_COUNTRIES;
let previous = {};
try { previous = JSON.parse(await readFile("evidence-history/previous.json", "utf8")); } catch { /* First run, no historical baseline. */ }
const next = { ...previous }; const reports = []; let failures = 0; let manualOnly = 0; let markersPresent = 0;
for (const country of countries) {
  try {
    const response = await fetch(`https://www.theglobalpolymath.com/api/intelligence/sources/${country}`, { signal: AbortSignal.timeout(55000), redirect: "error" });
    if (!response.ok) throw new Error(`Source-check API HTTP ${response.status}`);
    const report = await response.json();
    const dossier = dossierFor(country);
    if (report.country !== country || report.version !== DOSSIER_VERSION || !validateSourceChecks(report.checks, dossier.sources)) throw new Error("Invalid or incomplete source-check report");
    report.reviewQueue = dossier.sources.filter(s => s.reviewIssue).map(s => ({ sourceId: s.id, ...s.reviewIssue }));
    report.editorialReviewDue = dossier.claims.filter(c => reviewState(c) !== "reviewed").map(c => ({ claimId: c.id, state: reviewState(c) }));
    failures += report.editorialReviewDue.length;
    for (const issue of report.reviewQueue) if (issue.reviewBy < new Date().toISOString().slice(0, 10)) { failures++; console.warn(`::warning::Review deadline passed: ${issue.sourceId}; due=${issue.reviewBy}`); }
    for (const check of report.checks) {
      const prior = previous[check.sourceId];
      const changed = Boolean(prior?.contentSha256 && check.contentSha256 && prior.contentSha256 !== check.contentSha256);
      check.previousCheckedAt = prior?.checkedAt ?? null; check.contentChanged = prior?.contentSha256 && check.contentSha256 ? changed : null;
      const stale = sourceCheckIsStale(check);
      if (check.status === "not-checked") manualOnly++;
      if (check.status === "markers-present") markersPresent++;
      if (changed || stale || !["markers-present", "not-checked"].includes(check.status)) { failures++; console.warn(`::warning::Source review needed: ${check.sourceId}; status=${check.status}; changed=${changed}; stale=${stale}`); }
      if (check.contentSha256) next[check.sourceId] = { checkedAt: check.checkedAt, contentSha256: check.contentSha256 };
    }
    reports.push(report);
  } catch (error) { failures++; reports.push({ country, error: error.message }); console.warn(`::warning::Source-check service inconclusive for ${country}`); }
}
await mkdir("evidence-history", { recursive: true });
await writeFile("dossier-source-report.json", JSON.stringify({ version: DOSSIER_VERSION, checkedAt: new Date().toISOString(), failures, manualOnly, markersPresent, semantics: "Operational review signals, not automatic legal interpretation. Manual-only sources are not counted as successful checks. Review dates and unresolved issues are never automatically cleared.", reports }, null, 2));
await writeFile("evidence-history/previous.json", JSON.stringify(next));
console.log(JSON.stringify({ countries: countries.length, markersPresent, manualOnly, reviewSignals: failures }));
if (failures) process.exitCode = 1;
