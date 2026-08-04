import type { UserData, UserPlan } from "@/types";

export type PremiumFeature =
  | "ranking_full"
  | "advanced_matching"
  | "certificate_elite"
  | "passport_elite"
  | "community_pro"
  | "recruiter_visibility";

type FeatureAccessUser = Pick<UserData, "plan">;

export function getUserPlan(
  user: FeatureAccessUser | null | undefined
): UserPlan {
  return user?.plan === "premium" ? "premium" : "free";
}

export function hasAccess(
  user: FeatureAccessUser | null | undefined,
  feature: PremiumFeature
): boolean {
  const plan = getUserPlan(user);

  if (plan === "premium") return true;

  const freeAllowedFeatures: PremiumFeature[] = [];
  return freeAllowedFeatures.includes(feature);
}

export function getPremiumFeatureLabel(feature: PremiumFeature): string {
  const labels: Record<PremiumFeature, string> = {
    ranking_full: "Full Global Ranking",
    advanced_matching: "Advanced Matching",
    certificate_elite: "Elite Certificate Layer",
    passport_elite: "Elite Passport Layer",
    community_pro: "Community Pro",
    recruiter_visibility: "Recruiter Visibility",
  };

  return labels[feature];
}
