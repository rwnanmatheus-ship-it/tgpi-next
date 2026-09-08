export type SuperAppModuleId =
  | "workspace"
  | "global-key"
  | "country-fit"
  | "countries"
  | "compare"
  | "plan"
  | "documents"
  | "learning"
  | "intelligence"
  | "settings";

export type SuperAppModule = {
  description: string;
  href: string;
  icon: string;
  id: SuperAppModuleId;
  keywords: readonly string[];
  label: string;
  matchPrefixes: readonly string[];
  shortLabel: string;
};

export const SUPER_APP_OPEN_EVENT = "tgpi:open-super-app";

export const SUPER_APP_MODULES: readonly SuperAppModule[] = [
  {
    id: "workspace",
    href: "/profile",
    icon: "✦",
    label: "Global Workspace",
    shortLabel: "Workspace",
    description: "Your decisions, progress and global identity.",
    keywords: ["dashboard", "profile", "progress", "identity", "rank"],
    matchPrefixes: ["/profile"],
  },
  {
    id: "global-key",
    href: "/global-key",
    icon: "🗝️",
    label: "Global Key",
    shortLabel: "Global Key",
    description: "Verify your cryptographic identity and integrity chain.",
    keywords: ["identity", "cryptographic", "proof", "fingerprint", "verify"],
    matchPrefixes: ["/global-key"],
  },
  {
    id: "country-fit",
    href: "/country-fit",
    icon: "🧭",
    label: "Country Fit",
    shortLabel: "Country Fit",
    description: "Connect destinations to your real priorities.",
    keywords: ["match", "recommendation", "priorities", "shortlist"],
    matchPrefixes: ["/country-fit"],
  },
  {
    id: "countries",
    href: "/countries",
    icon: "🌍",
    label: "Country Intelligence",
    shortLabel: "Countries",
    description: "Explore 195 countries with evidence attached.",
    keywords: ["world", "destinations", "map", "research", "country"],
    matchPrefixes: ["/countries"],
  },
  {
    id: "compare",
    href: "/compare",
    icon: "⚖️",
    label: "Compare",
    shortLabel: "Compare",
    description: "Expose trade-offs before choosing a path.",
    keywords: ["comparison", "cost", "trade-offs", "decision"],
    matchPrefixes: ["/compare"],
  },
  {
    id: "plan",
    href: "/onboarding",
    icon: "🎯",
    label: "Personal Plan",
    shortLabel: "My Plan",
    description: "Turn your context into an actionable sequence.",
    keywords: ["goal", "onboarding", "timeline", "budget", "actions"],
    matchPrefixes: ["/onboarding"],
  },
  {
    id: "documents",
    href: "/passport",
    icon: "🛂",
    label: "Documents OS",
    shortLabel: "Documents",
    description: "Organize research and preparation signals.",
    keywords: ["passport", "visa", "checklist", "preparation"],
    matchPrefixes: ["/passport"],
  },
  {
    id: "learning",
    href: "/courses",
    icon: "🎓",
    label: "TGPI Learning",
    shortLabel: "Learning",
    description: "Build the capabilities your objective requires.",
    keywords: ["courses", "lessons", "certificate", "education"],
    matchPrefixes: ["/courses"],
  },
  {
    id: "intelligence",
    href: "/intelligence",
    icon: "🔎",
    label: "Intelligence Graph",
    shortLabel: "Evidence",
    description: "Inspect sources, coverage and confidence.",
    keywords: ["sources", "confidence", "methodology", "research"],
    matchPrefixes: ["/intelligence"],
  },
  {
    id: "settings",
    href: "/profile/security",
    icon: "⚙️",
    label: "Account & Privacy",
    shortLabel: "Settings",
    description: "Control identity, preferences and security.",
    keywords: ["account", "privacy", "notifications", "login", "security"],
    matchPrefixes: ["/profile/security", "/notifications"],
  },
] as const;

const NEXT_MODULE: Record<SuperAppModuleId, SuperAppModuleId> = {
  workspace: "global-key",
  "global-key": "country-fit",
  "country-fit": "compare",
  countries: "country-fit",
  compare: "plan",
  plan: "documents",
  documents: "learning",
  learning: "workspace",
  intelligence: "countries",
  settings: "workspace",
};

function routeMatches(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function getSuperAppModule(pathname: string) {
  return SUPER_APP_MODULES
    .flatMap((module) =>
      module.matchPrefixes.map((prefix) => ({ module, prefix })),
    )
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(({ prefix }) => routeMatches(pathname, prefix))?.module;
}

export function getNextSuperAppModule(moduleId: SuperAppModuleId) {
  const nextId = NEXT_MODULE[moduleId];
  return SUPER_APP_MODULES.find((module) => module.id === nextId)!;
}

export function isSuperAppRouteActive(pathname: string, module: SuperAppModule) {
  return module.matchPrefixes.some((prefix) => routeMatches(pathname, prefix));
}

export function searchSuperAppModules(query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase("en");
  if (!normalizedQuery) return SUPER_APP_MODULES;

  return SUPER_APP_MODULES.filter((module) =>
    [module.label, module.shortLabel, module.description, ...module.keywords]
      .join(" ")
      .toLocaleLowerCase("en")
      .includes(normalizedQuery),
  );
}
