import type { UserData } from "@/types";

type WeeklyRankingUser = Pick<UserData, "xp" | "streak">;

export function calculateWeeklyScore(
  user: WeeklyRankingUser | null | undefined
): number {
  const base = Number(user?.xp || 0);
  const activity = Number(user?.streak || 0);

  return base * 0.7 + activity * 10;
}
