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
};