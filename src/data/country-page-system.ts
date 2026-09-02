import type { CountryGoal } from "@/lib/countries";

export type CountrySortOption =
  | "score"
  | "cost"
  | "safety"
  | "english"
  | "quality"
  | "name";

export type CountryCostFilter = "all" | "low" | "medium" | "high";
export type CountryDifficultyFilter = "all" | "easy" | "medium" | "hard";
export type CountryIntentId =
  | "study"
  | "career"
  | "remote"
  | "cost"
  | "quality"
  | "mobility";

export type CountryDecisionPreset = {
  id: CountryIntentId;
  label: string;
  summary: string;
  goal?: CountryGoal;
  cost?: CountryCostFilter;
  difficulty?: CountryDifficultyFilter;
  sort: CountrySortOption;
  minSafety?: number;
  minEnglish?: number;
};

export const COUNTRY_DECISION_PRESETS: readonly CountryDecisionPreset[] = [
  {
    id: "study",
    label: "Study abroad",
    summary: "Research programs, accreditation, language requirements and study authorization.",
    goal: "study",
    sort: "score",
    minSafety: 70,
  },
  {
    id: "career",
    label: "Build a career",
    summary: "Research work authorization, licensing and actual opportunities.",
    goal: "work",
    sort: "score",
    minSafety: 65,
  },
  {
    id: "remote",
    label: "Remote work",
    summary: "Verify permitted remote activities, tax obligations and local connectivity.",
    goal: "work",
    sort: "quality",
    minEnglish: 60,
  },
  {
    id: "cost",
    label: "Lower cost",
    summary: "Build a city-level budget using your own dated housing and living-cost quotes.",
    cost: "low",
    sort: "cost",
  },
  {
    id: "quality",
    label: "Quality of life",
    summary: "Research housing, healthcare access, language and current local conditions.",
    sort: "quality",
    minSafety: 75,
  },
  {
    id: "mobility",
    label: "Long-term mobility",
    summary: "Verify the legal route, duration of stay and requirements for your nationality.",
    goal: "travel",
    sort: "score",
    difficulty: "easy",
  },
] as const;

export const COUNTRY_SYSTEM_PATH = [
  {
    number: "01",
    label: "Explore",
    title: "Country Intelligence",
    description: "Map the full country system through consistent evidence.",
    href: "#country-explorer",
  },
  {
    number: "02",
    label: "Compare",
    title: "Decision Intelligence",
    description: "Place up to three futures inside the same framework.",
    href: "/compare",
  },
  {
    number: "03",
    label: "Prepare",
    title: "Documents OS",
    description: "Translate a destination into evidence and readiness.",
    href: "/passport",
  },
  {
    number: "04",
    label: "Learn",
    title: "TGPI Learning",
    description: "Build the capabilities required for international life.",
    href: "/courses",
  },
  {
    number: "05",
    label: "Prove",
    title: "Global Key",
    description: "Keep goals, progress and evidence in one global identity.",
    href: "/profile",
  },
] as const;

export const COUNTRY_KNOWLEDGE_AREAS = [
  ["Culture & etiquette", "Communication, norms and daily behaviour"],
  ["Money & daily life", "Currency, housing and cost profiles"],
  ["Work & careers", "Labour context and professional expectations"],
  ["Study & recognition", "Education routes and credential questions"],
  ["Entry & documents", "Identity, visas and verification paths"],
  ["Family & pets", "Dependants, minors and household mobility"],
  ["Law & safety", "Local rules, risks and responsible preparation"],
  ["Mobility & services", "Transport, health and essential systems"],
] as const;
