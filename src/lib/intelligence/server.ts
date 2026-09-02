import "server-only";
import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";
import identityData from "@/data/intelligence/identities.json";
import bundledSnapshot from "@/data/intelligence/snapshot.json";
import { INDICATOR_IDS, METHODOLOGY_VERSION, parseWorldBankResponse, sourceApiUrl, type IntelligenceSnapshot, type IntelligenceState, type SeriesAudit } from "./core";

export const identities = identityData.countries;
export const identitySource = { url: identityData.source, retrievedAt: identityData.retrievedAt };
const fallback = bundledSnapshot as IntelligenceSnapshot;
const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");

// Fixed URLs only: no user parameters, redirects, credentials, HTML scraping or arbitrary fetch proxy.
async function fetchSeries(indicator: (typeof INDICATOR_IDS)[number]) {
  const url = sourceApiUrl(indicator);
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(12_000), headers: { Accept: "application/json" } });
      if ([401, 403].includes(response.status)) throw new Error("Source access restricted");
      if (!response.ok) throw new Error(`Source HTTP ${response.status}`);
      if (!response.headers.get("content-type")?.includes("json")) throw new Error("Unexpected source content type");
      if (Number(response.headers.get("content-length")) > 1_000_000) throw new Error("Source response too large");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Empty source body");
      const parts: Uint8Array[] = [];
      let bytes = 0;
      while (true) {
        const part = await reader.read();
        if (part.done) break;
        bytes += part.value.byteLength;
        if (bytes > 1_000_000) { await reader.cancel(); throw new Error("Source response too large"); }
        parts.push(part.value);
      }
      const raw = Buffer.concat(parts).toString("utf8");
      const retrievedAt = new Date().toISOString();
      const observations = parseWorldBankResponse(JSON.parse(raw), indicator, identities, retrievedAt);
      const audit: SeriesAudit = { indicator, url, retrievedAt, sourceUpdatedAt: observations[0]?.sourceUpdatedAt ?? null, responseSha256: sha256(raw), observations: observations.length };
      return { observations, audit };
    } catch (error) {
      lastError = error;
      if (error instanceof Error && /restricted|Invalid|Incomplete|mismatch|Duplicate|coverage|Unexpected|too large|redirect/i.test(error.message)) break;
    }
  }
  throw lastError;
}

// A successful, validated collection is cached as a unit. Throwing preserves Next's last successful
// entry during background revalidation. Bundled last-known-good snapshot survives cold starts.
const collect = unstable_cache(async (): Promise<IntelligenceSnapshot> => {
  const results = await Promise.all(INDICATOR_IDS.map(fetchSeries));
  const observations = results.flatMap(result => result.observations);
  const signature = JSON.stringify(observations.map(({ country, indicator, value, year }) => ({ country, indicator, value, year })));
  return { schemaVersion: 1, methodologyVersion: METHODOLOGY_VERSION, revision: sha256(signature).slice(0, 16), retrievedAt: new Date().toISOString(), observations, series: results.map(result => result.audit) };
}, ["tgpi-intelligence-graph", METHODOLOGY_VERSION], { revalidate: 3600 });

export async function getIntelligence(): Promise<IntelligenceState> {
  try {
    const snapshot = await collect();
    const stale = !snapshot.retrievedAt || Date.now() - Date.parse(snapshot.retrievedAt) > 7 * 86_400_000;
    return { snapshot, status: stale ? "degraded" : "available", message: stale ? "The source refresh is overdue. Previously collected observations remain visible with their original dates." : null };
  } catch (error) {
    console.warn("TGPI intelligence collection rejected", error instanceof Error ? error.message.slice(0, 180) : "Unknown collection error");
    return { snapshot: fallback, status: fallback.observations.length ? "degraded" : "unavailable", message: "The statistical source could not be validated. No values have been invented. Any retained observations show their original collection dates." };
  }
}
