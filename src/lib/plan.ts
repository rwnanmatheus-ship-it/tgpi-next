export type PlanType = "free" | "premium";

export function isPremium(plan?: string): boolean {
  return plan === "Premium";
}

export function getPlanLabel(plan?: string) {
  if (plan === "Premium") return "Premium Global Access";
  return "Free Plan";
}

export function getPlanLimits(plan?: string) {
  if (plan === "Premium") {
    return {
      maxFavorites: 50,
      advancedCountries: true,
      aiFeatures: true,
    };
  }

  return {
    maxFavorites: 3,
    advancedCountries: false,
    aiFeatures: false,
  };
}