import { coursesOverview } from "@/data/courses-overview";
import { getAllCountries, type Country } from "@/lib/countries";
import {
  rankTgpiSearchDocuments,
  type TgpiSearchDocument,
  type TgpiSearchResult,
} from "@/lib/tgpi-search-ranking";

export type {
  TgpiSearchDocument,
  TgpiSearchDocumentType,
  TgpiSearchResult,
} from "@/lib/tgpi-search-ranking";

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

const countryAliases: Readonly<Record<string, readonly string[]>> = {
  "united-states": ["USA", "US", "United States of America"],
  "united-kingdom": ["UK", "Britain", "Great Britain"],
  "united-arab-emirates": ["UAE"],
};

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
    aliases: [country.slug, country.capital, ...(countryAliases[country.slug] ?? [])],
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

export function searchTgpi(query: string, limit = 24): TgpiSearchResult[] {
  return rankTgpiSearchDocuments(getTgpiSearchDocuments(), query, limit);
}
