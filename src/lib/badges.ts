import { UserProfile } from "@/lib/profile";
import { isPremium } from "@/lib/plan";

export type Badge = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
};

export function getUserBadges(profile: UserProfile): Badge[] {
  return [
    {
      id: "profile-complete",
      title: "Profile Complete",
      description: "Complete your profile and activate your global identity.",
      unlocked: !!profile.completedActions?.includes("save_profile"),
    },
    {
      id: "country-focused",
      title: "Country Focused",
      description: "Choose a country goal and define your direction.",
      unlocked: !!profile.completedActions?.includes("set_country_goal"),
    },
    {
      id: "favorite-collector",
      title: "Favorite Collector",
      description: "Save at least one country to your favorites.",
      unlocked: !!profile.completedActions?.includes("toggle_favorite"),
    },
    {
      id: "currency-strategist",
      title: "Currency Strategist",
      description: "Save a currency usage action and refine planning.",
      unlocked: !!profile.completedActions?.includes("save_currency_usage"),
    },
    {
      id: "premium-member",
      title: "Premium Member",
      description: "Unlock Premium Global Access.",
      unlocked: isPremium(profile.membershipPlan),
    },
  ];
}