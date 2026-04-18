import { UserProfile } from "./profile";
import { isPremium } from "./plan";

export function canAddFavorite(profile: UserProfile) {
  if (isPremium(profile.membershipPlan)) return true;

  const maxFree = 3;
  return (profile.favorites?.length || 0) < maxFree;
}

export function getRemainingFavorites(profile: UserProfile) {
  if (isPremium(profile.membershipPlan)) return "Unlimited";

  const maxFree = 3;
  const current = profile.favorites?.length || 0;
  return maxFree - current;
}