import type { UserData } from "@/types";

type ReputationUser = Pick<
  UserData,
  "xp" | "completedCourses" | "referrals" | "badges"
>;

function getCompletedCoursesCount(value: string[] | number | undefined): number {
  return Array.isArray(value) ? value.length : Number(value || 0);
}

export function calculateReputation(user: ReputationUser | null | undefined): number {
  let score = 0;

  score += Number(user?.xp || 0) * 0.1;
  score += getCompletedCoursesCount(user?.completedCourses) * 10;
  score += Number(user?.referrals || 0) * 20;
  score += (user?.badges?.length || 0) * 15;

  return Math.min(100, Math.floor(score));
}
