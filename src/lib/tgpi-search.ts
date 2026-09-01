import { coursesOverview } from "@/data/courses-overview";
import { getAllCountries, type Country } from "@/lib/countries";
import { isCountryIndexable } from "@/seo/countries";

export type TgpiSearchDocumentType =
  | "compare"
  | "country"
  | "documents"
  | "institute"
  | "learn"
  | "methodology";

export type TgpiSearchDocument = {
  description: string;
  keywords: readonly string[];
  title: string;
  type: TgpiSearchDocumentType;
  url: string;
};

export type TgpiSearchResult = TgpiSearchDocument & {
  score: number;
};

let searchDocumentCache: TgpiSearchDocument[] | undefined;

const staticDocuments: readonly TgpiSearchDocument[] = [
  {
    type: "compare",
    title: "Compare countries",
    description:
      "Compare cost, lifestyle, language, safety, work, study and adaptation trade-offs through the TGPI decision system.",
    url: "/compare",
    keywords: ["versus", "vs", "comparison", "which country", "decision"],
  },
  {
    type: "documents",
    title: "International documents and moving checklist",
    description:
      "Organize document readiness for living, working, studying or moving abroad.",
    url: "/passport",
    keywords: ["visa", "passport", "immigration", "relocation", "moving", "checklist"],
  },
  {
    type: "learn",
    title: "TGPI Learning",
    description:
      "Build practical skills for language, international work, decision intelligence and global adaptability.",
    url: "/courses",
    keywords: ["course", "study", "skills", "education", "english", "career"],
  },
  {
    type: "methodology",
    title: "TGPI country intelligence methodology",
    description:
      "Understand TGPI scores, decision signals, sources, uncertainty and responsible country comparison.",
    url: "/authority",
    keywords: ["sources", "method", "score", "ranking", "data", "trust"],
  },
  {
    type: "institute",
    title: "About The Global Polymath Institute",
    description:
      "Learn what TGPI is, who it serves and how the platform connects education, mobility and global decisions.",
    url: "/about",
    keywords: ["tgpi", "institute", "company", "mission", "global polymath"],
  },
] as const;

const synonymGroups = [
  ["cheap", "affordable", "low cost", "cost of living", "budget"],
  ["work", "job", "jobs", "career", "employment"],
  ["study", "student", "university", "education", "school"],
  ["move", "moving", "relocate", "relocation", "immigration"],
  ["documents", "document", "visa", "passport", "requirements"],
  ["compare", "comparison", "versus", "vs"],
] as const;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function expandQuery(query: string): string[] {
  const normalizedQuery = normalize(query);
  const terms = new Set(normalizedQuery.split(" ").filter(Boolean));

  for (const group of synonymGroups) {
    if (group.some((synonym) => normalizedQuery.includes(normalize(synonym)))) {
      group.forEach((synonym) => terms.add(normalize(synonym)));
    }
  }

  return Array.from(terms);
}

function buildCountryDocument(country: Country): TgpiSearchDocument {
  const costKeywords =
    country.costLevel === "low"
      ? ["cheap", "affordable", "low cost"]
      : country.costLevel === "high"
        ? ["premium cost", "high cost"]
        : ["balanced cost", "medium cost"];

  return {
    type: "country",
    title: country.name,
    description: `${country.name} country intelligence for cost, life in ${country.capital}, ${country.language}, work, study, documents and relocation.`,
    url: `/countries/${country.slug}`,
    keywords: [
      country.slug,
      country.capital,
      country.region,
      country.language,
      country.currency,
      country.currencyCode,
      country.mainGoal,
      ...country.tags,
      ...country.idealFor,
      ...costKeywords,
      "living abroad",
      "moving abroad",
    ],
  };
}

export function getTgpiSearchDocuments(): TgpiSearchDocument[] {
  if (searchDocumentCache) return searchDocumentCache;

  const countryDocuments = getAllCountries().map(buildCountryDocument);
  const courseDocuments: TgpiSearchDocument[] = coursesOverview.map((course) => ({
    type: "learn",
    title: course.title,
    description: course.desc,
    url: course.href,
    keywords: [
      course.category,
      course.goal,
      course.goalLabel,
      course.level,
      course.audience,
      ...course.benefits,
    ],
  }));

  searchDocumentCache = [
    ...staticDocuments,
    ...countryDocuments,
    ...courseDocuments,
  ];

  return searchDocumentCache;
}

function scoreDocument(
  document: TgpiSearchDocument,
  normalizedQuery: string,
  terms: readonly string[],
): number {
  const title = normalize(document.title);
  const description = normalize(document.description);
  const keywords = normalize(document.keywords.join(" "));
  let score = 0;

  if (title === normalizedQuery) score += 160;
  if (title.startsWith(normalizedQuery)) score += 90;
  if (title.includes(normalizedQuery)) score += 65;
  if (keywords.includes(normalizedQuery)) score += 35;
  if (description.includes(normalizedQuery)) score += 22;

  for (const term of terms) {
    if (title.split(" ").includes(term)) score += 20;
    else if (title.includes(term)) score += 12;
    if (keywords.includes(term)) score += 8;
    if (description.includes(term)) score += 4;
  }

  if (document.type === "country") {
    const slug = document.url.split("/").pop() ?? "";
    if (isCountryIndexable({ slug })) score += 3;
  }

  return score;
}

export function searchTgpi(query: string, limit = 24): TgpiSearchResult[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const terms = expandQuery(query);

  return getTgpiSearchDocuments()
    .map((document) => ({
      ...document,
      score: scoreDocument(document, normalizedQuery, terms),
    }))
    .filter((document) => document.score > 0)
    .sort((first, second) => {
      if (second.score !== first.score) return second.score - first.score;
      return first.title.localeCompare(second.title);
    })
    .slice(0, limit);
}
