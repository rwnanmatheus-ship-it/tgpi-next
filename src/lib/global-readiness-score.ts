import { UserMemory } from "@/lib/user-memory";

export function calculateGlobalReadinessScore(memory: UserMemory | null) {
  if (!memory) return 5;

  let score = 5;

  if (memory.preferredCurrency) score += 15;
  if (memory.favoriteCountries?.length) score += 20;
  if (memory.lastVisitedCountry) score += 15;
  if (memory.recentConversions?.length) score += 15;
  if (memory.countryGoals?.length) score += 15;
  if (memory.activity?.length) score += 15;

  return Math.max(0, Math.min(score, 100));
}

export function getReadinessLevel(score: number) {
  if (score >= 85) return "Elite";
  if (score >= 65) return "Advanced";
  if (score >= 40) return "Growing";
  return "Starting";
}