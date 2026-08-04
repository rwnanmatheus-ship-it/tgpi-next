import type { UserData } from "@/types";

type SmartRecommendationMemory = Pick<UserData, "favoriteCountries">;

export function getSmartSuggestions(
  memory: SmartRecommendationMemory | null | undefined
): string[] {
  return memory?.favoriteCountries || [];
}
