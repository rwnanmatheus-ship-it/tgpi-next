import { DOSSIER_CLAIMS, DOSSIER_SOURCES, reviewState, type RegisteredSource } from "./dossiers.ts";
import type { CountryIdentity, EvidenceStatus } from "./core.ts";

export const EVIDENCE_PATH = "/intelligence";
export const SOURCE_REGISTER = "#source-register";

export function sourceRegisterHref(filter?: { country: string } | { source: string }) {
  const query = filter ? new URLSearchParams(filter).toString() : "";
  return `${EVIDENCE_PATH}${query ? `?${query}` : ""}${SOURCE_REGISTER}`;
}

export function evidenceSearchText(value: string) {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function buildSourceRecords(identities: readonly Pick<CountryIdentity, "slug" | "name" | "iso2">[], now: Date) {
  const countryBySlug = new Map(identities.map(country => [country.slug, country]));
  return DOSSIER_SOURCES.map(source => {
    const { id, country, title, publisher, url, kind, reviewedAt, status, note, automaticCheck, reviewIssue } = source;
    const summaries = DOSSIER_CLAIMS.filter(claim => claim.sourceId === id).map(claim => ({
      id: claim.id,
      title: claim.title,
      topic: claim.layer,
      period: claim.referencePeriod,
      state: reviewState(claim, now),
    }));
    return {
      id, country, title, publisher, url, kind, reviewedAt, status, note, automaticCheck, reviewIssue, summaries,
      countryName: countryBySlug.get(country)?.name ?? country,
      iso2: countryBySlug.get(country)?.iso2 ?? "",
      needsReview: status === "unconfirmed" || Boolean(reviewIssue) || summaries.some(summary => summary.state === "review-due" || summary.state === "expired"),
    };
  });
}
export type SourceRecord = ReturnType<typeof buildSourceRecords>[number];

export const sourceReviewLabels: Record<RegisteredSource["status"], string> = {
  reviewed: "Content reviewed",
  limited: "Limited-scope content review",
  unconfirmed: "Content unconfirmed",
};

export function summarizeCoverage(statuses: readonly EvidenceStatus[], catalogSize: number) {
  const counts = { current: 0, historical: 0, stale: 0, missing: catalogSize - statuses.length };
  for (const status of statuses) counts[status] += 1;
  return counts;
}
