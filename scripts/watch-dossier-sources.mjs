import { readFile, writeFile, mkdir } from "node:fs/promises";

// Scheduled server-side diagnostics: public sources only, never private worksheets or account APIs.
const countries = ["portugal", "spain", "france", "germany", "united-kingdom", "canada", "united-states", "japan"];
let previous = {};
try { previous = JSON.parse(await readFile("evidence-history/previous.json", "utf8")); } catch { /* First run, no historical baseline. */ }
const next = { ...previous }; const reports = []; let failures = 0;
for (const country of countries) {
  try {
    const response = await fetch(`https://www.theglobalpolymath.com/api/intelligence/sources?country=${country}`, { signal: AbortSignal.timeout(55000), redirect: "error" });
    if (!response.ok) throw new Error(`Source-check API HTTP ${response.status}`);
    const report = await response.json();
    if (report.country !== country || report.version !== "2.0.0" || !Array.isArray(report.checks) || !report.checks.length) throw new Error("Invalid source-check report");
    for (const check of report.checks) {
      const prior = previous[check.sourceId];
      const changed = Boolean(prior?.contentSha256 && check.contentSha256 && prior.contentSha256 !== check.contentSha256);
      check.previousCheckedAt = prior?.checkedAt ?? null; check.contentChanged = prior?.contentSha256 && check.contentSha256 ? changed : null;
      const stale = check.status !== "not-checked" && (!check.checkedAt || Date.now() - Date.parse(check.checkedAt) > 48 * 3600000);
      if (changed || stale || !["markers-present", "not-checked"].includes(check.status)) { failures++; console.warn(`::warning::Source review needed: ${check.sourceId}; status=${check.status}; changed=${changed}; stale=${stale}`); }
      if (check.contentSha256) next[check.sourceId] = { checkedAt: check.checkedAt, contentSha256: check.contentSha256 };
    }
    reports.push(report);
  } catch (error) { failures++; reports.push({ country, error: error.message }); console.warn(`::warning::Source-check service inconclusive for ${country}`); }
}
await mkdir("evidence-history", { recursive: true });
await writeFile("dossier-source-report.json", JSON.stringify({ checkedAt: new Date().toISOString(), failures, semantics: "Operational review signals, not automatic legal interpretation", reports }, null, 2));
await writeFile("evidence-history/previous.json", JSON.stringify(next));
console.log(JSON.stringify({ countries: countries.length, reviewSignals: failures }));
if (failures) process.exitCode = 1;
