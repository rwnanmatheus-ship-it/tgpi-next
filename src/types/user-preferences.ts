import type { CountryGoal, CountryCostLevel, CountryDifficulty } from "@/data/countries";

export interface UserPreferences {
  /**
   * Goals that the user is interested in (work, study, live, travel, etc.).
   */
  goals?: CountryGoal[];
  /**
   * Preferred regions or continents.
   */
  preferredRegions?: string[];
  /**
   * Preferred cost of living level (low, medium, high).
   */
  costLevel?: CountryCostLevel;
  /**
   * Preferred difficulty level for immigration and adaptation.
   */
  difficulty?: CountryDifficulty;
  /**
   * Slugs of favourite countries.
   */
  favorites?: string[];
}
