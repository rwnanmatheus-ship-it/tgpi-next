export type TGPIPlan = "FREE" | "PREMIUM" | "ELITE";

export function hasPremiumAccess(plan: TGPIPlan) {
  return plan === "PREMIUM" || plan === "ELITE";
}

export function hasEliteAccess(plan: TGPIPlan) {
  return plan === "ELITE";
}