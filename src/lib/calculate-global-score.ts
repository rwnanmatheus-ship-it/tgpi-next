import type { UserData } from "@/types";

type GlobalScoreUser = Pick<UserData, "xp" | "countriesExplored" | "completedCourses">;

function getCollectionCount(value: string[] | number | undefined): number {
  return Array.isArray(value) ? value.length : Number(value || 0);
}

export function calculateGlobalScore(user: GlobalScoreUser | null | undefined): number {
  const xp = Number(user?.xp || 0);
  const countries = getCollectionCount(user?.countriesExplored) * 200;
  const courses = getCollectionCount(user?.completedCourses) * 500;

  return xp + countries + courses;
}
