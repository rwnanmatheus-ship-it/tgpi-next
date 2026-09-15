import type { SuperAppModuleId } from "@/lib/super-app";

export type NavigationIconName =
  | "apps"
  | "arrow"
  | "bell"
  | "book"
  | "certificate"
  | "check"
  | "chevron"
  | "close"
  | "compare"
  | "compass"
  | "file"
  | "globe"
  | "graph"
  | "home"
  | "key"
  | "menu"
  | "search"
  | "settings"
  | "shield"
  | "spark"
  | "target";

export type NavigationDestination = {
  href: string;
  icon: NavigationIconName;
  id: string;
  label: string;
  matchPrefixes: readonly string[];
  shortLabel: string;
};

export const COMPACT_NAV_MAX_WIDTH = 1023;

export const PRIMARY_NAVIGATION: readonly NavigationDestination[] = [
  {
    id: "countries",
    href: "/countries",
    icon: "globe",
    label: "Countries",
    shortLabel: "Explore",
    matchPrefixes: ["/countries", "/intelligence"],
  },
  {
    id: "country-fit",
    href: "/country-fit",
    icon: "compass",
    label: "Country Fit",
    shortLabel: "Fit",
    matchPrefixes: ["/country-fit"],
  },
  {
    id: "compare",
    href: "/compare",
    icon: "compare",
    label: "Compare",
    shortLabel: "Compare",
    matchPrefixes: ["/compare"],
  },
  {
    id: "documents",
    href: "/passport",
    icon: "file",
    label: "Documents",
    shortLabel: "Prepare",
    matchPrefixes: ["/passport", "/documents"],
  },
  {
    id: "learning",
    href: "/courses",
    icon: "book",
    label: "Learn",
    shortLabel: "Learn",
    matchPrefixes: ["/courses", "/certificates", "/certificate", "/verify/credentials"],
  },
] as const;

export const COMPACT_NAVIGATION: readonly NavigationDestination[] = [
  PRIMARY_NAVIGATION[0],
  PRIMARY_NAVIGATION[1],
  PRIMARY_NAVIGATION[2],
  PRIMARY_NAVIGATION[4],
  {
    id: "workspace",
    href: "/profile",
    icon: "key",
    label: "My TGPI",
    shortLabel: "My TGPI",
    matchPrefixes: [
      "/profile",
      "/dashboard",
      "/onboarding",
      "/global-key",
      "/notifications",
    ],
  },
] as const;

const MODULE_ICONS: Record<SuperAppModuleId, NavigationIconName> = {
  workspace: "home",
  "global-key": "key",
  "country-fit": "compass",
  countries: "globe",
  compare: "compare",
  plan: "target",
  documents: "file",
  learning: "book",
  credentials: "certificate",
  intelligence: "graph",
  settings: "settings",
};

function routeMatches(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isNavigationDestinationActive(
  pathname: string,
  destination: NavigationDestination,
) {
  return destination.matchPrefixes.some((prefix) => routeMatches(pathname, prefix));
}

export function getActiveNavigationDestination(
  pathname: string,
  destinations: readonly NavigationDestination[] = PRIMARY_NAVIGATION,
) {
  return destinations
    .flatMap((destination) =>
      destination.matchPrefixes.map((prefix) => ({ destination, prefix })),
    )
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(({ prefix }) => routeMatches(pathname, prefix))?.destination;
}

export function getSuperAppIconName(moduleId: SuperAppModuleId) {
  return MODULE_ICONS[moduleId];
}
