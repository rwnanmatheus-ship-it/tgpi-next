export type UserPlan = "free" | "premium";

export type UserRole = "user" | "admin";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export type UserStats = {
  xp: number;
  level: number;
  countriesExploredCount: number;
  lessonsCompletedCount: number;
  certificatesEarnedCount: number;
};

export type UserPreferences = {
  currentCountry?: string;
  currentCity?: string;
  targetCountries: string[];
  primaryGoal?: string;
  preferredLanguage?: string;
  preferredCurrency?: string;
  travelIntent?: string;
};

export type UserRecord = {
  schemaVersion: number;
  uid: string;
  email: string;
  displayName: string;
  legalName?: string;
  photoURL?: string;
  username?: string;
  usernameLower?: string;
  bio?: string;
  role: UserRole;
  plan: UserPlan;
  verificationStatus: VerificationStatus;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
  stats: UserStats;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Compatibility shape used by the current client application while the
 * Firestore schema is migrated to UserRecord. New code should prefer the
 * canonical nested contracts above.
 */
export type UserData = {
  uid: string;
  name?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  xp?: number;
  level?: number;
  tgpiId?: string;
  isVerified?: boolean;
  countriesExplored?: string[];
  completedCourses?: string[];
  certificatesEarned?: number;
  profileCompleted?: boolean;
  globalScore?: number;
  globalReadinessScore?: number;
  legalName?: string;
  username?: string;
  usernameLower?: string;
  dateOfBirth?: string;
  sex?: string;
  nationality?: string;
  documentType?: string;
  documentNumber?: string;
  currentCountry?: string;
  currentCity?: string;
  targetCountry?: string;
  travelIntent?: string;
  bio?: string;
  plan?: UserPlan;
  upgradedAt?: string;
  followers?: string[];
  following?: string[];
};
