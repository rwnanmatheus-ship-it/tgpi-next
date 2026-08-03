import type { Country, CountryDifficulty, CountryGoal } from "./country";

export type RecommendationPreferences = {
  goal?: CountryGoal | string;
  region?: string;
  favorites?: string[];
  preferredRegions?: string[];
  costLevel?: number;
  difficulty?: number | CountryDifficulty;
};

export type ScoredCountry = Country & {
  score: number;
  reasons?: string[];
};

export type RecommendationResult = {
  generatedAt: string;
  countries: ScoredCountry[];
};
