import { UserMemory } from "@/lib/user-memory";

export function buildDailyMissions(memory: UserMemory | null) {
  const missions: string[] = [];

  if (!memory?.favoriteCountries?.length) {
    missions.push("Favorite your first country");
  }

  if (!memory?.preferredCurrency) {
    missions.push("Set your preferred currency");
  }

  if (!memory?.countryGoals?.length) {
    missions.push("Choose a country goal");
  }

  if (!memory?.recentConversions?.length) {
    missions.push("Use the currency explorer once");
  }

  if (!memory?.lastVisitedCountry) {
    missions.push("Explore a country pathway");
  }

  return missions.slice(0, 4);
}