import type { NavigationIconName } from "./navigation-system";
import { HOME_ROUTES } from "./home-content.ts";

export const HOME_ART_ROOT = "/images/home/showcase-v2";

export const HOME_PRODUCT_GROUPS = [
  { id: "decide", label: "Explore & decide" },
  { id: "prepare", label: "Learn & prepare" },
  { id: "connect", label: "Your TGPI" },
] as const;

type HomeProduct = {
  name: string;
  href: string;
  icon: NavigationIconName;
  tone: "gold" | "blue" | "silver";
  category: typeof HOME_PRODUCT_GROUPS[number]["id"];
  description: string;
  access?: string;
};

export const HOME_PRODUCTS = {
  atlas: {
    name: "TGPI Atlas AI", href: "/atlas", icon: "spark", tone: "blue", category: "decide",
    description: "An AI assistant for exploring ideas, organizing questions and finding your next step in TGPI.",
    access: "Controlled access",
  },
  integrity: {
    name: "TGPI Integrity Chain", href: "/verify/global-key", icon: "shield", tone: "silver", category: "connect",
    description: "The cryptographic verification layer for TGPI Global ID. Check the status of a shared proof when its record is available.",
    access: "Verification portal",
  },
  learning: {
    name: "TGPI Academy", href: HOME_ROUTES.learning, icon: "book", tone: "blue", category: "prepare",
    description: "Practical courses in languages, global mobility, careers and technology, with exercises and assessments.",
  },
  certificates: {
    name: "TGPI Certification", href: "/certificates", icon: "certificate", tone: "gold", category: "prepare",
    description: "Document assessed learning with a TGPI certificate when you meet the course and identity requirements.",
  },
  countries: {
    name: "Country Intelligence", href: HOME_ROUTES.countries, icon: "globe", tone: "blue", category: "decide",
    description: "Explore country profiles, reference dates and the sources behind the data.",
  },
  compare: {
    name: "TGPI Compare", href: "/compare", icon: "compare", tone: "blue", category: "decide",
    description: "Compare up to three destinations side by side and see where the evidence differs.",
  },
  fit: {
    name: "Country Fit", href: HOME_ROUTES.fit, icon: "compass", tone: "gold", category: "decide",
    description: "Turn your goals, budget and languages into questions for researching destinations.",
  },
  plan: {
    name: "My Global Plan", href: "/plan", icon: "target", tone: "gold", category: "prepare",
    description: "Organize your research priorities, shortlisted countries and next actions.",
  },
  documents: {
    name: "TGPI Global Documents", href: HOME_ROUTES.documents, icon: "file", tone: "gold", category: "prepare",
    description: "Organize document preparation and consult the sources for official requirements.",
  },
  "global-id": {
    name: "TGPI Global ID", href: "/global-key", icon: "key", tone: "silver", category: "connect",
    description: "Open your TGPI identity hub and see the credential and sharing tools available to your account.",
  },
  workspace: {
    name: "Global Workspace", href: HOME_ROUTES.workspace, icon: "apps", tone: "blue", category: "connect",
    description: "Continue your plan, learning progress and preparation from your personal workspace.",
  },
  community: {
    name: "TGPI Community", href: "/community", icon: "home", tone: "blue", category: "connect",
    description: "Connect with people researching, studying and preparing for international life.",
  },
  evidence: {
    name: "Sources & methodology", href: HOME_ROUTES.methodology, icon: "search", tone: "silver", category: "decide",
    description: "Review publishers, coverage and how TGPI checks the evidence behind its tools.",
  },
  premium: {
    name: "TGPI Premium", href: HOME_ROUTES.pricing, icon: "graph", tone: "gold", category: "connect",
    description: "Bring destinations, readiness, preparation and learning together in the Premium Command Center.",
  },
} as const satisfies Record<string, HomeProduct>;

export type HomeProductId = keyof typeof HOME_PRODUCTS;

export const HOME_LIBRARY = Object.keys(HOME_PRODUCTS) as HomeProductId[];

export function homeProductArt(product: HomeProductId | "hero") {
  return `${HOME_ART_ROOT}/${product}.webp`;
}
