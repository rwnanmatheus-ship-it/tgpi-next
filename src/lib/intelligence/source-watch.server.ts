import "server-only";
import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";
import { DOSSIER_VERSION, dossierFor, sourceFor } from "./dossiers";
import { inspectSourceText, normalizeSourceText, type SourceCheck } from "./source-checks";

const pending = new Map<string, Promise<SourceCheck>>();
async function checkRegisteredSource(id: string): Promise<SourceCheck> {
  const source = sourceFor(id);
  if (!source) throw new Error("Unknown source identifier");
  const base: SourceCheck = { sourceId: id, checkedAt: null, httpStatus: null, status: "not-checked", matchedMarkers: 0, expectedMarkers: source.markers.length, contentSha256: null, message: "Automatic retrieval is disabled for this source. Check the public link directly." };
  if (!source.automaticCheck) return base;
  // Exact registry URLs only. No caller-supplied URLs, credentials, cookies or profile data.
  const checkedAt = new Date().toISOString();
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(source.url, { redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(8000), headers: { Accept: "text/html,application/xhtml+xml", "User-Agent": "TGPI-SourceWatch/2.0 (+https://www.theglobalpolymath.com/intelligence)" } });
      const result = { ...base, checkedAt, httpStatus: response.status };
      if ([401, 403].includes(response.status)) { await response.body?.cancel(); return { ...result, status: "restricted", message: "Source access is restricted for this checker. No retry or bypass was attempted; this does not establish that the public site is down." }; }
      if (response.status >= 300 && response.status < 400) { await response.body?.cancel(); return { ...result, status: "redirect", message: "The registered address redirects. Review the public destination before updating the registry; no redirect was followed automatically." }; }
      if (!response.ok) { await response.body?.cancel(); if (attempt === 0 && (response.status >= 500 || response.status === 429)) continue; return { ...result, status: "unreachable", message: `The checker received HTTP ${response.status}. The editorial review date has not changed.` }; }
      if (!response.headers.get("content-type")?.includes("html")) { await response.body?.cancel(); return { ...result, status: "review-needed", message: "Unexpected content type. No source text was accepted." }; }
      if (Number(response.headers.get("content-length")) > 1_500_000) { await response.body?.cancel(); return { ...result, status: "review-needed", message: "Response exceeds the source-check size limit." }; }
      const reader = response.body?.getReader();
      if (!reader) return { ...result, status: "review-needed", message: "The source returned an empty body." };
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > 1_500_000) { await reader.cancel(); return { ...result, status: "review-needed", message: "Response exceeds the source-check size limit." }; } chunks.push(part.value); }
      const html = Buffer.concat(chunks).toString("utf8");
      const checked = inspectSourceText(source, html);
      return { ...result, ...checked, contentSha256: createHash("sha256").update(normalizeSourceText(html)).digest("hex") };
    } catch {
      if (attempt === 1) return { ...base, checkedAt, status: "unreachable", message: "The checker could not complete the connection within its limits. This is an inconclusive check, not proof of a site outage." };
    }
  }
  return { ...base, checkedAt, status: "unreachable", message: "Source check did not complete." };
}
const cachedSourceCheck = unstable_cache(async (id: string) => {
  if (!pending.has(id)) pending.set(id, checkRegisteredSource(id).finally(() => pending.delete(id)));
  return pending.get(id)!;
}, ["tgpi-dossier-source-watch", DOSSIER_VERSION], { revalidate: 21600 });
export async function checkCountrySources(country: string) { return Promise.all(dossierFor(country).sources.map(s => cachedSourceCheck(s.id))); }
