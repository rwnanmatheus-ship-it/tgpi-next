import { UserMemory } from "@/lib/user-memory";

export function buildRecommendationSignals(memory: UserMemory | null) {
  return {
    preferredCurrency: memory?.preferredCurrency || null,
    favoriteCountries: memory?.favoriteCountries || [],
    lastVisitedCountry: memory?.lastVisitedCountry || null,
    countryGoals: memory?.countryGoals || [],
  };
}