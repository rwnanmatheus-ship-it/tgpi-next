import { countries } from "@/data/countries";
import { recommendCountries } from "./recommendation";
import type { UserPreferences } from "@/types/user-preferences";

/**
 * Get the top recommended countries for a user's profile using the advanced recommendation algorithm.
 * @param profile - Partial user preferences including goals, regions, cost level, difficulty or favorites.
 * @returns Top 3 recommended countries based on scoring.
 */
export function getBestCountries(profile: Partial<UserPreferences>) {
  const recommendations = recommendCountries(countries, profile as UserPreferences);
  return recommendations.slice(0, 3);
}
