export type UserData = {
  uid: string;
  name?: string;
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

  plan?: "free" | "premium";
  upgradedAt?: string;

  followers?: string[];
  following?: string[];
};