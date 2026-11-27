export type SubscriptionPlan = {
  name: string;
  slug: "free" | "premium";
  price: string;
  cadence?: string;
  description: string;
  features: readonly string[];
};

export const TGPI_FREE_PLAN: SubscriptionPlan = {
  name: "TGPI Free",
  slug: "free",
  price: "$0",
  description: "Start building your global profile and compare your first options.",
  features: [
    "Create your Global Profile and use your Workspace",
    "Explore source-linked country information",
    "Save a research plan and up to 5 countries of interest",
    "Compare countries across the full catalog",
    "Use Country Fit research planning",
    "Selected courses with assessments and certificates · free previews",
    "One saved scenario per country and worksheet export",
  ],
};

export const TGPI_PREMIUM_PLAN: SubscriptionPlan = {
  name: "TGPI Premium",
  slug: "premium",
  price: "US$ 19.90",
  cadence: "/month",
  description: "A complete decision system for planning an international life with clarity.",
  features: [
    "Everything available with your free account",
    "Protected Premium Command Center",
    "Consolidated destination and readiness overview",
    "Full catalog with assessments and certificates",
    "Three saved scenarios per country, scenario comparison and personalized PDF reports",
    "Membership status and billing management",
  ],
};
