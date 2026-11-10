import "server-only";
import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";
import identityData from "@/data/intelligence/identities.json";
import bundled from "@/data/intelligence/country-context.json";
import { CONTEXT_VERSION, CONTEXT_INDICATOR_IDS, contextApiUrl, mergeContextSeries, parseContextResponse, type ContextIndicatorId, type ContextSnapshot, type ContextState } from "./country-context";

const fingerprint = (text: string) => createHash("sha256").update(text).digest("hex");
let lastValidated = bundled as ContextSnapshot;
let pending: Promise<ContextState> | null = null;
const RETAINED = "Some context sources could not be refreshed. Retained observations keep their original collection dates.";

async function retrieve(indicator: ContextIndicatorId) {
  const url = contextApiUrl(indicator);
  const response = await fetch(url, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(6_000), headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Context source HTTP ${response.status}`);
  if (!response.headers.get("content-type")?.includes("json")) throw new Error("Unexpected context source content type");
  if (Number(response.headers.get("content-length")) > 1_000_000) throw new Error("Context response too large");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Empty context response");
  const parts: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    bytes += part.value.byteLength;
    if (bytes > 1_000_000) { await reader.cancel(); throw new Error("Context response too large"); }
    parts.push(part.value);
  }
  const raw = Buffer.concat(parts).toString("utf8");
  const retrievedAt = new Date().toISOString();
  const observations = parseContextResponse(JSON.parse(raw), indicator, identityData.countries, retrievedAt);
  return { observations, audit: { indicator, url, retrievedAt, sourceUpdatedAt: observations[0]?.sourceUpdatedAt ?? null, responseSha256: fingerprint(raw), observations: observations.length } };
}

async function refresh(): Promise<ContextState> {
  const results = await Promise.allSettled(CONTEXT_INDICATOR_IDS.map(retrieve));
  const updates = results.flatMap(result => result.status === "fulfilled" ? [result.value] : []);
  const snapshot = mergeContextSeries(lastValidated, updates, "");
  snapshot.revision = fingerprint(JSON.stringify(snapshot.observations.map(({ country, indicator, value, year }) => ({ country, indicator, value, year })))).slice(0, 16);
  const current = snapshot.series.filter(series => Date.now() - Date.parse(series.retrievedAt) < 60_000).length;
  lastValidated = snapshot;
  return { snapshot, status: !snapshot.observations.length ? "unavailable" : current === CONTEXT_INDICATOR_IDS.length ? "available" : "degraded", message: current === CONTEXT_INDICATOR_IDS.length ? null : RETAINED };
}
const collect = unstable_cache(async () => {
  if (!pending) pending = refresh().finally(() => { pending = null; });
  return pending;
}, ["tgpi-country-context", CONTEXT_VERSION], { revalidate: 21_600, tags: ["tgpi-country-context"] });

export async function getCountryContext(): Promise<ContextState> {
  // A newly collected bundle is already validated, so cold starts do not repeat the same five queries.
  if (lastValidated.series.length === CONTEXT_INDICATOR_IDS.length && lastValidated.series.every(series => {
    const age = Date.now() - Date.parse(series.retrievedAt);
    return age >= 0 && age < 21_600_000;
  })) return { snapshot: lastValidated, status: "available", message: null };
  try {
    const collection = await collect();
    // Restore the durable cache into this worker before a later refresh or outage.
    // Otherwise a cold worker would retain the deployment bundle, losing newer evidence.
    lastValidated = collection.snapshot;
    const overdue = collection.snapshot.series.some(series => Date.now() - Date.parse(series.retrievedAt) > 7 * 86_400_000);
    return overdue && collection.status === "available"
      ? { ...collection, status: "degraded", message: RETAINED }
      : collection;
  }
  catch { return { snapshot: lastValidated, status: lastValidated.observations.length ? "degraded" : "unavailable", message: RETAINED }; }
}
