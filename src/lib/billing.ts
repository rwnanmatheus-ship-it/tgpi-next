export function getUserPlan(user: any) {
  return user?.plan || "FREE";
}