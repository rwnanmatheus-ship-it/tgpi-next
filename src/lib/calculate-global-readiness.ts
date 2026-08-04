import type { UserData } from "@/types";

type ReadinessUser = Pick<
  UserData,
  | "xp"
  | "countriesExplored"
  | "completedCourses"
  | "certificatesEarned"
  | "profileCompleted"
  | "completedProfile"
>;

function getCollectionCount(value: string[] | number | undefined): number {
  return Array.isArray(value) ? value.length : Number(value || 0);
}

export function calculateGlobalReadiness(user: ReadinessUser | null | undefined): number {
  const xp = Number(user?.xp || 0);
  const countries = getCollectionCount(user?.countriesExplored);
  const completedCourses = getCollectionCount(user?.completedCourses);
  const certificatesEarned = Number(
    user?.certificatesEarned || completedCourses || 0
  );
  const profileCompleted = Boolean(
    user?.profileCompleted || user?.completedProfile
  );

  const xpScore = Math.min(30, Math.floor(xp / 100));
  const countriesScore = Math.min(25, countries * 5);
  const coursesScore = Math.min(20, completedCourses * 5);
  const certificatesScore = Math.min(15, certificatesEarned * 5);
  const profileScore = profileCompleted ? 10 : 0;

  const total =
    xpScore +
    countriesScore +
    coursesScore +
    certificatesScore +
    profileScore;

  return Math.max(0, Math.min(100, total));
}

export function getReadinessTier(score: number): string {
  if (score >= 85) return "Elite Global Readiness";
  if (score >= 70) return "Advanced Global Readiness";
  if (score >= 50) return "Strong Global Readiness";
  if (score >= 30) return "Emerging Global Readiness";
  return "Early Global Readiness";
}
