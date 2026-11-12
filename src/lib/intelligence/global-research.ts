import sourceData from "../../data/intelligence/research-sources.json" with { type: "json" };
import countryLinks from "../../data/intelligence/research-country-links.json" with { type: "json" };
import identityData from "../../data/intelligence/identities.json" with { type: "json" };
import { DOSSIER_SOURCES, dossierFor, reviewState } from "./dossiers.ts";

export const RESEARCH_VERSION = "3.1.0";
export const RESEARCH_RELEASE = "2026-11-11";
export const RESEARCH_TOPICS = ["identity", "entry", "education", "work", "cost", "housing", "health", "safety", "digital", "economy", "documents", "climate"] as const;
export type ResearchTopic = typeof RESEARCH_TOPICS[number];
export type ResearchSource = {
  id: string; country: string | null; title: string; publisher: string; url: string;
  kind: string; topics: ResearchTopic[]; scope: string; reviewedAt: string | null;
  reviewScope: "publisher-and-portal" | "selected-guidance" | "legacy-summary";
  authorityUrl: string;
  diagnosticNote?: string;
  supportingReference?: { url: string; reviewedAt: string; scope: string };
  access: { status: "retrieved" | "restricted" | "manual"; checkedAt: string | null; httpStatus: number | null; pageTitle: string; responseSha256: string | null };
};
// Accessible official descriptions help inspect scope; they do not replace database records.
const supportingReferences: Record<string, string> = {
  "whed": "https://www.unesco.org/sdg4education2030/en/knowledge-hub/world-higher-education-database",
  "itu-data": "https://www.itu.int/en/ITU-D/Statistics/Pages/stat/default.aspx",
  "unhcr-data": "https://refugeedata.unhcr.org/en/documentation/start-here/how-to-use/",
};
const international = (sourceData as ResearchSource[]).map(source => ({ ...source, ...(supportingReferences[source.id] ? { supportingReference: { url: supportingReferences[source.id], reviewedAt: RESEARCH_RELEASE, scope: "Publisher scope and methodology" } } : {}) }));
const legacy: ResearchSource[] = DOSSIER_SOURCES.map(s => ({
  id: s.id, country: s.country, title: s.title, publisher: s.publisher, url: s.url, kind: s.kind,
  topics: [...new Set(dossierFor(s.country).claims.filter(c => c.sourceId === s.id).map(c => c.layer))],
  scope: s.note, diagnosticNote: s.diagnosticNote, reviewedAt: s.reviewedAt, reviewScope: "legacy-summary", authorityUrl: s.url,
  access: { status: "manual", checkedAt: null, httpStatus: null, pageTitle: "", responseSha256: null },
}));
// Count a shared resource once, even when it is useful in all 195 dossiers.
export const RESEARCH_SOURCES = [...new Map([...international, ...legacy].map(s => [s.url.replace(/\/$/, ""), s])).values()];
export const RESEARCH_COUNTRIES = identityData.countries;
export const RESEARCH_SOURCE_DOMAINS = new Set(RESEARCH_SOURCES.map(s => new URL(s.url).hostname.replace(/^www\./, ""))).size;
const regionSources = new Set(["eures", "eurostat", "eu-immigration"]);
const eu = new Set(["austria", "belgium", "bulgaria", "croatia", "cyprus", "czechia", "denmark", "estonia", "finland", "france", "germany", "greece", "hungary", "ireland", "italy", "latvia", "lithuania", "luxembourg", "malta", "netherlands", "poland", "portugal", "romania", "slovakia", "slovenia", "spain", "sweden"]);

export function researchSourcesFor(country: string) {
  const identity = RESEARCH_COUNTRIES.find(c => c.slug === country);
  if (!identity) return [];
  return RESEARCH_SOURCES.filter(s => {
    if (s.country) return s.country === country;
    if (regionSources.has(s.id)) return eu.has(country);
    if (s.id === "spc-data") return identity.region === "Oceania";
    if (s.id === "enic-naric") return Boolean((countryLinks as Record<string, Record<string, string>>)[country]?.[s.id]);
    return true;
  });
}
export function researchSourceUrl(source: ResearchSource, country: string) {
  return (countryLinks as Record<string, Record<string, string>>)[country]?.[source.id] ?? source.url;
}
export function researchCoverage(country: string, now = new Date()) {
  const identity = RESEARCH_COUNTRIES.find(c => c.slug === country);
  if (!identity) return null;
  const legacyDossier = dossierFor(country);
  const sources = researchSourcesFor(country);
  return {
    ...identity, chapters: RESEARCH_TOPICS.length, sources: sources.length,
    nationalSources: sources.filter(s => s.country === country).length,
    summaries: legacyDossier.claims.length,
    due: legacyDossier.claims.filter(c => reviewState(c, now) !== "reviewed").length,
  };
}
export function researchSearchText(text: string) { return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().trim(); }
