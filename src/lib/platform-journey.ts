/** Navigation describes capabilities, never inferred completion or entitlement. */
export const PLATFORM_JOURNEY = [
  { id: "explore", label: "Explore", href: "/countries", description: "Research destinations", prefixes: ["/countries", "/country-fit", "/intelligence"] },
  { id: "compare", label: "Compare", href: "/compare", description: "Understand trade-offs", prefixes: ["/compare"] },
  { id: "plan", label: "Plan", href: "/plan", description: "Organize your preparation", prefixes: ["/plan", "/onboarding", "/passport", "/documents"] },
  { id: "learn", label: "Learn", href: "/courses", description: "Develop practical skills", prefixes: ["/courses"] },
  { id: "prove", label: "Prove", href: "/certificates", description: "Review learning evidence", prefixes: ["/certificates", "/certificate", "/verify/credentials"] },
  { id: "advance", label: "Advance", href: "/profile", description: "Continue in your workspace", prefixes: ["/profile", "/dashboard", "/global-key", "/notifications", "/ranking", "/premium"] },
] as const;

export function getJourneyStage(pathname: string) {
  return PLATFORM_JOURNEY.find(stage => stage.prefixes.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)));
}

export function isImmersiveLearningRoute(pathname: string) {
  return /^\/courses\/[^/]+\/(lessons|certification)(\/|$)/.test(pathname);
}
