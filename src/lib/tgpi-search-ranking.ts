export type TgpiSearchDocumentType =
  | "compare"
  | "country"
  | "documents"
  | "institute"
  | "learn"
  | "methodology";

export type TgpiSearchDocument = {
  aliases?: readonly string[];
  description: string;
  keywords: readonly string[];
  title: string;
  type: TgpiSearchDocumentType;
  url: string;
};

export type TgpiSearchResult = TgpiSearchDocument & { score: number };

const stopWords = new Set([
  "a", "an", "and", "are", "can", "do", "for", "how", "i", "in", "is",
  "it", "my", "of", "on", "or", "the", "to", "what", "where", "which", "with",
]);

// General cost intent must not imply that the visitor wants a cheap country.
const synonymGroups = [
  ["cheap", "affordable", "low cost", "budget"],
  ["cost of living", "living costs", "living expenses", "expenses", "cost"],
  ["work", "job", "jobs", "career", "employment"],
  ["study", "student", "university", "education", "school"],
  ["move", "moving", "relocate", "relocation", "immigration"],
  ["documents", "document", "visa", "passport", "requirements"],
  ["compare", "comparison", "versus", "vs"],
] as const;

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function containsPhrase(text: string, phrase: string): boolean {
  return phrase.length > 0 && ` ${text} `.includes(` ${phrase} `);
}

function entityMatch(document: TgpiSearchDocument, query: string): number {
  if (document.type !== "country") return 0;
  return Math.max(0, ...[document.title, ...(document.aliases ?? [])]
    .map(normalize)
    .filter((alias) => containsPhrase(query, alias))
    .map((alias) => alias.split(" ").length));
}

export function rankTgpiSearchDocuments(
  documents: readonly TgpiSearchDocument[],
  query: string,
  limit = 24,
): TgpiSearchResult[] {
  const normalizedQuery = normalize(query).slice(0, 300);
  const terms = [...new Set(normalizedQuery.split(" ").filter(
    (term) => term && !stopWords.has(term),
  ))];
  if (terms.length === 0 || !Number.isFinite(limit) || limit <= 0) return [];

  const activeGroups = synonymGroups.filter((group) => group.some(
    (term) => containsPhrase(normalizedQuery, term),
  ));
  const hasNamedCountry = documents.some((document) => entityMatch(document, normalizedQuery) > 0);

  return documents.map((document) => {
    const entity = entityMatch(document, normalizedQuery);
    // Keep named destinations in focus; general product tools can still help.
    if (hasNamedCountry && document.type === "country" && entity === 0) {
      return { ...document, score: 0 };
    }

    const title = normalize(document.title);
    const description = normalize(document.description);
    const keywords = document.keywords.map(normalize);
    let score = entity > 0 ? 600 + entity * 20 : 0;

    if (title === normalizedQuery) score += 160;
    else if (containsPhrase(title, normalizedQuery)) score += 65;
    else if (title.startsWith(normalizedQuery)) score += 30;

    for (const term of terms) {
      // In a specific query, "countries" is context, not the main intent.
      const weight = terms.length > 1 && (term === "country" || term === "countries") ? 0.1 : 1;
      if (containsPhrase(title, term)) score += 20 * weight;
      if (keywords.some((keyword) => containsPhrase(keyword, term))) score += 8 * weight;
      if (containsPhrase(description, term)) score += 4 * weight;
    }

    // One bounded bonus per intent, not one bonus for every expanded synonym.
    for (const group of activeGroups) {
      if (group.some((term) => containsPhrase(title, term))) score += 6;
      else if (group.some((term) => keywords.some((keyword) => containsPhrase(keyword, term)))) score += 3;
      else if (group.some((term) => containsPhrase(description, term))) score += 1;
    }

    return { ...document, score };
  })
    .filter((document) => document.score > 0)
    .sort((first, second) => second.score - first.score
      || first.title.localeCompare(second.title)
      || first.url.localeCompare(second.url))
    .slice(0, Math.floor(limit));
}
