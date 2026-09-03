import type { RegisteredSource } from "./dossiers";

export type SourceCheck = {
  sourceId: string; checkedAt: string | null; httpStatus: number | null;
  status: "markers-present" | "review-needed" | "restricted" | "unreachable" | "redirect" | "not-checked";
  matchedMarkers: number; expectedMarkers: number; contentSha256: string | null; message: string;
};
export function normalizeSourceText(html: string): string {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return main.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&#(\d+);/g, (_, n: string) => Number(n) <= 0x10ffff ? String.fromCodePoint(Number(n)) : " ")
    .replace(/&(?:nbsp|amp|quot|apos|pound|yen|euro);/g, " ").normalize("NFKC").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim().toLowerCase();
}
export function inspectSourceText(source: RegisteredSource, html: string): Pick<SourceCheck, "status" | "matchedMarkers" | "message"> {
  const text = normalizeSourceText(html);
  if (text.length < 100 || /^(?:.{0,100})(?:just a moment|access denied|verify you are human|robot check)/i.test(text)) return { status: "review-needed", matchedMarkers: 0, message: "The response may be empty or an access-challenge page. It was not accepted as evidence." };
  const matchedMarkers = source.markers.filter(marker => text.includes(normalizeSourceText(marker))).length;
  return { status: source.markers.length > 0 && matchedMarkers === source.markers.length ? "markers-present" : "review-needed", matchedMarkers, message: matchedMarkers === source.markers.length && source.markers.length > 0 ? "Selected reference markers are present. This is an automated content check, not a legal or factual re-review." : "One or more selected reference markers are absent. Review the source; no claim has been automatically rewritten." };
}
