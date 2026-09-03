import type { RegisteredSource } from "./dossiers";

export type SourceCheck = {
  sourceId: string; checkedAt: string | null; httpStatus: number | null;
  status: "markers-present" | "review-needed" | "restricted" | "unreachable" | "redirect" | "not-checked";
  matchedMarkers: number; expectedMarkers: number; contentSha256: string | null; message: string;
};
export function normalizeSourceText(html: string): string {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return main.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n: string) => { const value = n.toLowerCase().startsWith("x") ? parseInt(n.slice(1), 16) : Number(n); return value > 0 && value <= 0x10ffff && !(value >= 0xd800 && value <= 0xdfff) ? String.fromCodePoint(value) : " "; })
    .replace(/&(?:nbsp|amp|quot|apos|pound|yen|euro);/gi, " ").normalize("NFKC").replace(/[\u200b-\u200d\ufeff]/g, "").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim().toLowerCase();
}

/** Server calls supply the fixed registry. The caller can select an ID, never a URL. */
export async function retrieveRegisteredSource(id: string, registry: readonly RegisteredSource[], fetcher: typeof fetch = fetch): Promise<SourceCheck> {
  const source = registry.find(s => s.id === id);
  if (!source) throw new Error("Unknown source identifier");
  const base: SourceCheck = { sourceId: id, checkedAt: null, httpStatus: null, status: "not-checked", matchedMarkers: 0, expectedMarkers: source.markers.length, contentSha256: null, message: source.reviewIssue ? `Manual queue — observed ${source.reviewIssue.observedAt}: ${source.reviewIssue.observation} Review by ${source.reviewIssue.reviewBy}. ${source.reviewIssue.action}` : "Automatic retrieval is disabled. Check the public source directly." };
  if (!source.automaticCheck) return base;
  const checkedAt = new Date().toISOString();
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetcher(source.url, { redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(8000), headers: { Accept: "text/html,application/xhtml+xml", "User-Agent": "TGPI-SourceWatch/2.1 (+https://www.theglobalpolymath.com/intelligence)" } });
      const result = { ...base, checkedAt, httpStatus: response.status };
      if ([401, 403].includes(response.status)) { await response.body?.cancel(); return { ...result, status: "restricted", message: "Source access is restricted for this checker. No retry or bypass was attempted; this does not establish that the public site is down." }; }
      if (response.status >= 300 && response.status < 400) { await response.body?.cancel(); return { ...result, status: "redirect", message: "The registered address redirects. Review the public destination before updating the registry; no redirect was followed automatically." }; }
      if (!response.ok) { await response.body?.cancel(); if (attempt === 0 && (response.status >= 500 || response.status === 429)) continue; return { ...result, status: "unreachable", message: `The checker received HTTP ${response.status}. The editorial review date has not changed.` }; }
      if (!response.headers.get("content-type")?.toLowerCase().includes("html")) { await response.body?.cancel(); return { ...result, status: "review-needed", message: "Unexpected content type. No source text was accepted." }; }
      if (Number(response.headers.get("content-length")) > 1_500_000) { await response.body?.cancel(); return { ...result, status: "review-needed", message: "Response exceeds the source-check size limit." }; }
      const reader = response.body?.getReader();
      if (!reader) return { ...result, status: "review-needed", message: "The source returned an empty body." };
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > 1_500_000) { await reader.cancel(); return { ...result, status: "review-needed", message: "Response exceeds the source-check size limit." }; } chunks.push(part.value); }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      const html = new TextDecoder().decode(bytes);
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalizeSourceText(html)));
      return { ...result, ...inspectSourceText(source, html), contentSha256: Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("") };
    } catch {
      if (attempt === 1) return { ...base, checkedAt, status: "unreachable", message: "The checker could not complete the connection within its limits. This is an inconclusive check, not proof of a site outage." };
    }
  }
  return { ...base, checkedAt, status: "unreachable", message: "Source check did not complete." };
}

const STATUSES = ["markers-present", "review-needed", "restricted", "unreachable", "redirect", "not-checked"];
export function validateSourceChecks(raw: unknown, sources: readonly RegisteredSource[]): raw is SourceCheck[] {
  if (!Array.isArray(raw) || raw.length !== sources.length || new Set(raw.map(c => c?.sourceId)).size !== sources.length) return false;
  return raw.every(check => {
    const source = sources.find(s => s.id === check?.sourceId);
    if (!source || !STATUSES.includes(check.status) || typeof check.message !== "string" || check.message.length > 2000 || !Number.isInteger(check.matchedMarkers) || check.matchedMarkers < 0 || check.expectedMarkers !== source.markers.length || check.matchedMarkers > check.expectedMarkers) return false;
    if (check.checkedAt !== null && (typeof check.checkedAt !== "string" || !Number.isFinite(Date.parse(check.checkedAt)))) return false;
    if (check.httpStatus !== null && (!Number.isInteger(check.httpStatus) || check.httpStatus < 100 || check.httpStatus > 599)) return false;
    if (check.contentSha256 !== null && (typeof check.contentSha256 !== "string" || !/^[a-f0-9]{64}$/.test(check.contentSha256))) return false;
    if (check.status === "not-checked") return !source.automaticCheck && check.checkedAt === null && check.httpStatus === null && check.contentSha256 === null;
    if (!source.automaticCheck || !check.checkedAt) return false;
    return check.status !== "markers-present" || check.httpStatus === 200 && check.expectedMarkers > 0 && check.matchedMarkers === check.expectedMarkers && check.contentSha256 !== null;
  });
}
export function sourceCheckIsStale(check: SourceCheck, now = Date.now()) {
  if (check.status === "not-checked") return false;
  const time = check.checkedAt ? Date.parse(check.checkedAt) : NaN;
  return !Number.isFinite(time) || time > now + 300000 || now - time > 48 * 3600000;
}
export function inspectSourceText(source: RegisteredSource, html: string): Pick<SourceCheck, "status" | "matchedMarkers" | "message"> {
  const text = normalizeSourceText(html);
  if (text.length < 100 || /^(?:.{0,100})(?:just a moment|access denied|verify you are human|robot check)/i.test(text)) return { status: "review-needed", matchedMarkers: 0, message: "The response may be empty or an access-challenge page. It was not accepted as evidence." };
  const matchedMarkers = source.markers.filter(marker => text.includes(normalizeSourceText(marker))).length;
  return { status: source.markers.length > 0 && matchedMarkers === source.markers.length ? "markers-present" : "review-needed", matchedMarkers, message: matchedMarkers === source.markers.length && source.markers.length > 0 ? "Selected reference markers are present. This is an automated content check, not a legal or factual re-review." : "One or more selected reference markers are absent. Review the source; no claim has been automatically rewritten." };
}
