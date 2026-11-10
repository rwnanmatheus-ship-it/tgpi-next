import "server-only";
import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";
import identityData from "@/data/intelligence/identities.json";
import bundledSnapshot from "@/data/intelligence/snapshot.json";
import { INDICATOR_IDS, METHODOLOGY_VERSION, parseWorldBankResponse, sourceApiUrl, mergeValidatedSeries, allSeriesRecent, type IntelligenceSnapshot, type IntelligenceState, type SeriesAudit } from "./core";

export const identities = identityData.countries;
export const identitySource = { url: identityData.source, retrievedAt: identityData.retrievedAt };
const fallback = bundledSnapshot as IntelligenceSnapshot;
const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");
let inFlight: Promise<{ snapshot: IntelligenceSnapshot; accepted: number }> | null = null;
let retryAfter = 0;
let lastValidated = fallback;

type CachedCollection = {
  attemptedAt: string;
  message: string | null;
  snapshot: IntelligenceSnapshot;
  sourceStatus: "fresh" | "retained";
};

const RETAINED_MESSAGE = "The statistical source refresh was deferred. TGPI is serving the last validated snapshot with its original collection date.";

// Fixed URLs only: no user parameters, redirects, credentials, HTML scraping or arbitrary fetch proxy.
async function fetchSeries(indicator: (typeof INDICATOR_IDS)[number]) {
  const url = sourceApiUrl(indicator);
  const maxBytes = indicator === "SE.TER.ENRR" ? 2_000_000 : 1_000_000;
  const response = await fetch(url, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(6_000), headers: { Accept: "application/json" } });
  if ([401, 403].includes(response.status)) throw new Error("Source access restricted");
  if (!response.ok) throw new Error(`Source HTTP ${response.status}`);
  if (!response.headers.get("content-type")?.includes("json")) throw new Error("Unexpected source content type");
  if (Number(response.headers.get("content-length")) > maxBytes) throw new Error("Source response too large");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Empty source body");
  const parts: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    bytes += part.value.byteLength;
    if (bytes > maxBytes) { await reader.cancel(); throw new Error("Source response too large"); }
    parts.push(part.value);
  }
  const raw = Buffer.concat(parts).toString("utf8");
  const retrievedAt = new Date().toISOString();
  const observations = parseWorldBankResponse(JSON.parse(raw), indicator, identities, retrievedAt);
  const audit: SeriesAudit = { indicator, url, retrievedAt, sourceUpdatedAt: observations[0]?.sourceUpdatedAt ?? null, responseSha256: sha256(raw), observations: observations.length };
  return { observations, audit };
}

// Refresh each series independently. A failed publisher retains its original values and dates.
async function collectFresh(): Promise<{ snapshot: IntelligenceSnapshot; accepted: number }> {
  const results = await Promise.allSettled(INDICATOR_IDS.map(fetchSeries));
  const updates = results.flatMap(result => result.status === "fulfilled" ? [result.value] : []);
  const merged = mergeValidatedSeries(lastValidated, updates);
  if (!merged.accepted) return { snapshot: lastValidated, accepted: 0 };
  const signature = JSON.stringify(merged.observations.map(({ country, indicator, value, year }) => ({ country, indicator, value, year })));
  const snapshot: IntelligenceSnapshot = { schemaVersion: 1, methodologyVersion: METHODOLOGY_VERSION, revision: sha256(signature).slice(0, 16), retrievedAt: merged.series.map(series => series.retrievedAt).sort().at(-1) ?? null, observations: merged.observations, series: merged.series };
  return { snapshot, accepted: merged.accepted };
}
function retainedCollection(attemptedAt: string): CachedCollection {
  const retained = lastValidated.observations.length ? lastValidated : fallback;
  return { attemptedAt, message: RETAINED_MESSAGE, snapshot: retained, sourceStatus: "retained" };
}

async function collectWithResilience(): Promise<CachedCollection> {
  const attemptedAt = new Date().toISOString();
  if (Date.now() < retryAfter) return retainedCollection(attemptedAt);

  try {
    if (!inFlight) inFlight = collectFresh().finally(() => { inFlight = null; });
    const { snapshot, accepted } = await inFlight;
    lastValidated = snapshot;
    retryAfter = accepted === INDICATOR_IDS.length ? 0 : Date.now() + 5 * 60_000;
    return { attemptedAt, message: accepted === INDICATOR_IDS.length ? null : RETAINED_MESSAGE, snapshot, sourceStatus: accepted === INDICATOR_IDS.length ? "fresh" : "retained" };
  } catch (error) {
    retryAfter = Date.now() + 5 * 60_000;
    console.warn("TGPI intelligence refresh deferred", error instanceof Error ? error.message.slice(0, 180) : "Unknown source error");
    return retainedCollection(attemptedAt);
  }
}

// World Bank observations are historical rather than real-time. A six-hour refresh window
// keeps requests bounded, while a failed refresh becomes a degraded cached result instead of
// an exception. This preserves the last validated snapshot and prevents user requests from
// being reported as runtime failures when the upstream source is temporarily slow.
const collect = unstable_cache(collectWithResilience, ["tgpi-intelligence-graph", METHODOLOGY_VERSION, "independent-series-v3"], {
  revalidate: 21_600,
  tags: ["tgpi-intelligence-graph"],
});

export async function getIntelligence(): Promise<IntelligenceState> {
  // A recent validated bundle avoids network latency during cold starts.
  if (allSeriesRecent(lastValidated, 21_600_000)) return { snapshot: lastValidated, status: "available", message: null };
  try {
    const collection = await collect();
    lastValidated = collection.snapshot;
    const stale = !allSeriesRecent(collection.snapshot, 7 * 86_400_000);
    const unavailable = collection.snapshot.observations.length === 0;
    return {
      snapshot: collection.snapshot,
      status: unavailable ? "unavailable" : collection.sourceStatus === "retained" || stale ? "degraded" : "available",
      message: unavailable
        ? "The statistical source is temporarily unavailable and no validated observations are stored."
        : collection.message ?? (stale ? "The source refresh is overdue. Previously collected observations remain visible with their original dates." : null),
    };
  } catch (error) {
    console.warn("TGPI intelligence cache unavailable", error instanceof Error ? error.message.slice(0, 180) : "Unknown cache error");
    const retained = lastValidated.observations.length ? lastValidated : fallback;
    return { snapshot: retained, status: retained.observations.length ? "degraded" : "unavailable", message: "The statistical source could not be validated. No values have been invented. Any retained observations show their original collection dates." };
  }
}
