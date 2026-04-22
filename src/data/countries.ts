export type CostItem = {
  label: string;
  amount: number;
};

export type CountryGoal = "work" | "study" | "live" | "travel" | "cultural";

export type CountryCostLevel = "low" | "medium" | "high";
export type CountryDifficulty = "easy" | "medium" | "hard";

export type CountryIntelligence = {
  summary: string;
  strengths: string[];
  warnings: string[];
  bestFor: string[];
  immigrationDifficulty: CountryDifficulty;
  qualityOfLifeScore: number;
  englishFriendliness: number;
  safetyScore: number;
  averageMonthlyBudget: number;
};

export type Country = {
  slug: string;
  name: string;
  emoji: string;
  region: string;
  language: string;
  currency: string;
  currencyCode: string;
  capital: string;
  mainGoal: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  costOfLife: CostItem[];
  costLevel: CountryCostLevel;
  difficulty: CountryDifficulty;
  tgpiScore: number;
  idealFor: CountryGoal[];
  intelligence: CountryIntelligence;
};

export const countries: Country[] = [
  {
    slug: "japan",
    name: "Japan",
    emoji: "🇯🇵",
    region: "Asia",
    language: "Japanese",
    currency: "Japanese Yen (JPY)",
    currencyCode: "JPY",
    capital: "Tokyo",
    mainGoal: "Work abroad",
    shortDescription:
      "Language, etiquette, work culture, modern life, and intercultural readiness.",
    longDescription:
      "Build readiness for Japan through language foundations, etiquette, social structure, public behavior, work expectations, and cultural integration.",
    tags: ["Japanese", "Etiquette", "Work Abroad"],
    costOfLife: [
      { label: "Coffee", amount: 450 },
      { label: "Metro Ticket", amount: 220 },
      { label: "Casual Meal", amount: 1200 },
      { label: "Museum Ticket", amount: 1800 },
      { label: "Monthly Mobile Plan", amount: 4000 },
      { label: "Shared Rent Estimate", amount: 80000 },
    ],
    costLevel: "high",
    difficulty: "hard",
    tgpiScore: 91,
    idealFor: ["work", "study", "travel", "cultural"],
    intelligence: {
      summary:
        "Japan is a high-value destination for disciplined learners, professionals, and people seeking structure, safety, and advanced cultural depth.",
      strengths: [
        "High safety and public order",
        "Strong work and study reputation",
        "Excellent infrastructure and transport",
      ],
      warnings: [
        "Higher adaptation difficulty for foreigners",
        "Language barrier can be significant",
        "Cost of living can be high in major cities",
      ],
      bestFor: [
        "Structured professionals",
        "Serious students",
        "Cultural deep-divers",
      ],
      immigrationDifficulty: "hard",
      qualityOfLifeScore: 92,
      englishFriendliness: 55,
      safetyScore: 94,
      averageMonthlyBudget: 180000,
    },
  },
  {
    slug: "brazil",
    name: "Brazil",
    emoji: "🇧🇷",
    region: "South America",
    language: "Brazilian Portuguese",
    currency: "Brazilian Real (BRL)",
    currencyCode: "BRL",
    capital: "Brasília",
    mainGoal: "Live abroad",
    shortDescription:
      "Brazilian Portuguese, society, regional identity, and real-life integration.",
    longDescription:
      "Build readiness for Brazil through Brazilian Portuguese, social interaction, regional diversity, daily life, and the cultural intelligence needed to live abroad with confidence.",
    tags: ["Portuguese", "Culture", "Live Abroad"],
    costOfLife: [
      { label: "Coffee", amount: 6 },
      { label: "Bus Ticket", amount: 5.5 },
      { label: "Casual Meal", amount: 35 },
      { label: "Museum Ticket", amount: 30 },
      { label: "Monthly Mobile Plan", amount: 55 },
      { label: "Shared Rent Estimate", amount: 1800 },
    ],
    costLevel: "medium",
    difficulty: "medium",
    tgpiScore: 80,
    idealFor: ["live", "work", "travel", "cultural"],
    intelligence: {
      summary:
        "Brazil is strong for social integration, cultural immersion, and people seeking a dynamic lifestyle with broad regional diversity.",
      strengths: [
        "Warm social interaction and community culture",
        "Broad cultural richness and regional variety",
        "Balanced value in many cities",
      ],
      warnings: [
        "Quality of life varies by city",
        "Security conditions require local awareness",
        "Bureaucracy can be inconsistent",
      ],
      bestFor: [
        "Expats seeking lifestyle integration",
        "Portuguese learners",
        "Cultural explorers",
      ],
      immigrationDifficulty: "medium",
      qualityOfLifeScore: 74,
      englishFriendliness: 48,
      safetyScore: 58,
      averageMonthlyBudget: 3500,
    },
  },
  {
    slug: "egypt",
    name: "Egypt",
    emoji: "🇪🇬",
    region: "Africa / Middle East",
    language: "Arabic",
    currency: "Egyptian Pound (EGP)",
    currencyCode: "EGP",
    capital: "Cairo",
    mainGoal: "Cultural learning",
    shortDescription:
      "Arabic foundations, heritage, civilization, and cultural learning at global depth.",
    longDescription:
      "Build readiness for Egypt through Arabic foundations, cultural understanding, daily life, social context, and the civilizational depth that makes Egypt one of the most important places in human history.",
    tags: ["Arabic", "Heritage", "Cultural Learning"],
    costOfLife: [
      { label: "Coffee", amount: 40 },
      { label: "Metro Ticket", amount: 10 },
      { label: "Casual Meal", amount: 180 },
      { label: "Museum Ticket", amount: 200 },
      { label: "Monthly Mobile Plan", amount: 250 },
      { label: "Shared Rent Estimate", amount: 5000 },
    ],
    costLevel: "low",
    difficulty: "medium",
    tgpiScore: 76,
    idealFor: ["study", "travel", "cultural"],
    intelligence: {
      summary:
        "Egypt is powerful for historical depth, Arabic exposure, and people seeking civilizational understanding with relatively accessible living costs.",
      strengths: [
        "Deep historical and cultural significance",
        "Accessible daily costs compared to many markets",
        "Strong Arabic immersion potential",
      ],
      warnings: [
        "Urban intensity may be challenging",
        "Adaptation can require cultural sensitivity",
        "Infrastructure experience varies by area",
      ],
      bestFor: [
        "Arabic learners",
        "History-focused travelers",
        "Cultural researchers",
      ],
      immigrationDifficulty: "medium",
      qualityOfLifeScore: 68,
      englishFriendliness: 52,
      safetyScore: 64,
      averageMonthlyBudget: 12000,
    },
  },
];

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getCountrySlugs() {
  return countries.map((country) => country.slug);
}