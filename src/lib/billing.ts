import type { UserData, UserPlan } from "@/types";

export function getUserPlan(user: Pick<UserData, "plan"> | null | undefined): UserPlan {
  return user?.plan === "premium" ? "premium" : "free";
}
