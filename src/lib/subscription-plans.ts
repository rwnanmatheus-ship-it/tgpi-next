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
    "Create your Global Profile",
    "Explore basic country intelligence",
    "Save up to 3 countries",
    "Run 1 country comparison",
    "See a preliminary Country Fit",
    "Access introductory learning paths",
  ],
};

export const TGPI_PREMIUM_PLAN: SubscriptionPlan = {
  name: "TGPI Premium",
  slug: "premium",
  price: "US$ 19.99",
  cadence: "/month",
  description: "A complete decision system for planning an international life with clarity.",
  features: [
    "Unlimited country comparisons",
    "Complete Country Fit analysis",
    "Global Readiness Score",
    "Personal international dashboard",
    "Unlimited saved countries and goals",
    "Document and mobility checklists",
    "Full premium learning library",
    "Certificates and progress history",
    "Premium country intelligence updates",
    "New decision tools as they launch",
  ],
};
