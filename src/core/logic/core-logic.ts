export const CORE_LOGIC = {
  user: {
    maxUsernameChanges: 2,
    requireProfileCompletion: true,
    enablePublicProfile: true,
  },

  premium: {
    enabled: true,
    plans: ["FREE", "PREMIUM", "ELITE"],
    lockedFeatures: [
      "advanced-ai",
      "verified-certificates",
      "global-identity-card",
      "premium-readiness-report",
    ],
  },

  credentials: {
    enabled: true,
    verifyPath: "/verify",
    publicProfilePath: "/p",
  },

  dashboard: {
    modules: [
      "stats",
      "world-map",
      "ai-advisor",
      "courses",
      "identity",
      "certificates",
      "premium",
    ],
  },
};