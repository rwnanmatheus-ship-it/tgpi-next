import { comparisonPath } from "./comparison-state.ts";
import type { ComparisonGoal } from "./tgpi-comparison.ts";

export const briefCriteria = ["budget", "documents", "language", "fit"] as const;
export type BriefCriterion = (typeof briefCriteria)[number];
export type BriefStatus = "open" | "suitable" | "concern";
export type BriefCountry = { slug: string; name: string };
type Assessment = Partial<Record<BriefCriterion, Exclude<BriefStatus, "open">>>;
export type BriefDraft = { finalists: string[]; reviews: Record<string, Assessment> };
export const finalistLimit = 5;
export const blankBrief = (): BriefDraft => ({ finalists: [], reviews: {} });

export type BriefCopy = {
  title: string; intro: string; open: string; country: string;
  criteria: Record<BriefCriterion, string>; statuses: Record<BriefStatus, string>;
  next: string; complete: string; select: string; shortlist: string; limit: string;
  export: string; plan: string; compare: string; goal: string; full: string;
};

export function restoreBrief(raw: unknown, allowed: readonly BriefCountry[]): BriefDraft {
  const draft = blankBrief();
  if (!raw || typeof raw !== "object") return draft;
  const input = raw as Record<string, unknown>;
  const slugs = new Set(allowed.map(country => country.slug));
  if (Array.isArray(input.finalists)) {
    draft.finalists = [...new Set(input.finalists.filter((slug): slug is string =>
      typeof slug === "string" && slugs.has(slug)))].slice(0, finalistLimit);
  }
  if (input.reviews && typeof input.reviews === "object") {
    const reviews = input.reviews as Record<string, unknown>;
    for (const slug of slugs) {
      const value = reviews[slug];
      if (!value || typeof value !== "object") continue;
      const assessment: Assessment = {};
      for (const key of briefCriteria) {
        const status = (value as Record<string, unknown>)[key];
        if (status === "suitable" || status === "concern") assessment[key] = status;
      }
      if (Object.keys(assessment).length) draft.reviews[slug] = assessment;
    }
  }
  return draft;
}

export function nextBriefCriterion(assessment: Assessment = {}): BriefCriterion | undefined {
  return briefCriteria.find(key => assessment[key] === "concern")
    ?? briefCriteria.find(key => !assessment[key]);
}

export function briefResearchPath(slug: string, key: BriefCriterion): string {
  const anchors = { budget: "country-budget", documents: "country-preparation", language: "country-learning", fit: "country-research" };
  return `/countries/${encodeURIComponent(slug)}#${anchors[key]}`;
}

export function buildBriefText(countries: readonly BriefCountry[], goal: ComparisonGoal, goalLabel: string, draft: BriefDraft, copy: BriefCopy): string {
  const origin = "https://www.theglobalpolymath.com";
  const finalists = new Set(draft.finalists);
  const selected = countries.filter(country => finalists.has(country.slug));
  const lines = [`TGPI · ${copy.title}`, `${copy.goal}: ${goalLabel}`,
    `${copy.shortlist}: ${selected.map(country => country.name).join(", ") || "—"}`,
    `${copy.compare}: ${origin}${comparisonPath(countries.map(country => country.slug), goal)}`];
  for (const country of countries) {
    const review = draft.reviews[country.slug];
    if (!review && !finalists.has(country.slug)) continue;
    lines.push("", country.name);
    for (const key of briefCriteria) {
      lines.push(`${copy.criteria[key]}: ${copy.statuses[review?.[key] ?? "open"]}`);
    }
    const next = nextBriefCriterion(review);
    if (next) lines.push(`${copy.next}: ${copy.criteria[next]}`, origin + briefResearchPath(country.slug, next));
    else lines.push(copy.complete);
  }
  return lines.join("\n") + "\n";
}
