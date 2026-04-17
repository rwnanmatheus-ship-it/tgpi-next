export type UserProfile = {
  email: string;
  fullName: string;
  membershipPlan: "Free" | "Premium";
  countryInterest: string;
  mainGoal: string;
  preferredLanguage: string;
  preferredCurrency: string;
  weeklyFocus: string;
  bio: string;
  xp: number;
  level: number;
  streak: number;
  onboardingCompleted: boolean;
  favorites: string[];
  lastVisitedCountry: string;
  lastCurrencyTarget: string;
  lastConvertedAmount: number;
  completedActions?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export const defaultUserProfile = (email = ""): UserProfile => ({
  email,
  fullName: "",
  membershipPlan: "Free",
  countryInterest: "Japan",
  mainGoal: "Work abroad",
  preferredLanguage: "English",
  preferredCurrency: "USD",
  weeklyFocus: "Global Path",
  bio: "",
  xp: 0,
  level: 1,
  streak: 1,
  onboardingCompleted: false,
  favorites: [],
  lastVisitedCountry: "",
  lastCurrencyTarget: "USD",
  lastConvertedAmount: 100,
  completedActions: [],
});