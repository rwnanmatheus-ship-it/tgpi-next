export type MembershipPlan = "Free" | "Premium";

export type SubscriptionStatus =
  | "inactive"
  | "active"
  | "canceled"
  | "trial";

export type UserProfile = {
  email: string;
  fullName: string;

  membershipPlan: MembershipPlan;
  subscriptionStatus?: SubscriptionStatus;

  countryInterest: string;
  mainGoal: string;

  preferredLanguage: string;
  preferredCurrency: string;

  weeklyFocus: string;
  bio: string;

  xp: number;
  level: number;
  streak: number;

  favorites: string[];

  lastVisitedCountry: string;
  lastCurrencyTarget: string;
  lastConvertedAmount: number;

  onboardingCompleted: boolean;
  completedActions?: string[];

  createdAt?: string;
  updatedAt?: string;
};

export function defaultUserProfile(email = ""): UserProfile {
  return {
    email,
    fullName: "",

    membershipPlan: "Free",
    subscriptionStatus: "inactive",

    countryInterest: "Japan",
    mainGoal: "Work abroad",

    preferredLanguage: "English",
    preferredCurrency: "USD",

    weeklyFocus: "Global Path",
    bio: "",

    xp: 0,
    level: 1,
    streak: 1,

    favorites: [],

    lastVisitedCountry: "",
    lastCurrencyTarget: "USD",
    lastConvertedAmount: 100,

    onboardingCompleted: false,
    completedActions: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}