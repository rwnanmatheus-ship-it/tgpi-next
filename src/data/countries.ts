export type CostItem = {
  label: string;
  amount: number;
};

export type CountryDifficulty = "easy" | "medium" | "hard";

export type CountryIntelligence = {
  immigrationDifficulty?: CountryDifficulty;
  qualityOfLifeScore?: number;
  englishFriendliness?: number;
  safetyScore?: number;
  averageMonthlyBudget?: number;
};

export type Country = {
  slug: string;
  name: string;
  emoji: string;
  language: string;
  currency: string;
  currencyCode: string;
  capital: string;
  mainGoal: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  region: string;
  goals: string[];
  featured?: boolean;
  costOfLife: CostItem[];
  intelligence?: CountryIntelligence;
};

export const countries: Country[] = [
  {
    slug: "japan",
    name: "Japan",
    emoji: "🇯🇵",
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
    region: "Asia",
    goals: ["Work abroad", "Study abroad", "Cultural learning"],
    featured: true,
    costOfLife: [
      { label: "Coffee", amount: 450 },
      { label: "Metro Ticket", amount: 220 },
      { label: "Casual Meal", amount: 1200 },
      { label: "Museum Ticket", amount: 1800 },
      { label: "Monthly Mobile Plan", amount: 4000 },
      { label: "Shared Rent Estimate", amount: 80000 },
    ],
    intelligence: {
      immigrationDifficulty: "hard",
      qualityOfLifeScore: 9,
      englishFriendliness: 6,
      safetyScore: 9,
      averageMonthlyBudget: 140000,
    },
  },
  {
    slug: "brazil",
    name: "Brazil",
    emoji: "🇧🇷",
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
    region: "South America",
    goals: ["Live abroad", "Cultural learning", "Travel better"],
    featured: true,
    costOfLife: [
      { label: "Coffee", amount: 6 },
      { label: "Bus Ticket", amount: 5.5 },
      { label: "Casual Meal", amount: 35 },
      { label: "Museum Ticket", amount: 30 },
      { label: "Monthly Mobile Plan", amount: 55 },
      { label: "Shared Rent Estimate", amount: 1800 },
    ],
    intelligence: {
      immigrationDifficulty: "medium",
      qualityOfLifeScore: 7,
      englishFriendliness: 5,
      safetyScore: 5,
      averageMonthlyBudget: 3200,
    },
  },
  {
    slug: "egypt",
    name: "Egypt",
    emoji: "🇪🇬",
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
    region: "Africa",
    goals: ["Cultural learning", "Travel better", "Language learning"],
    featured: true,
    costOfLife: [
      { label: "Coffee", amount: 40 },
      { label: "Metro Ticket", amount: 10 },
      { label: "Casual Meal", amount: 180 },
      { label: "Museum Ticket", amount: 200 },
      { label: "Monthly Mobile Plan", amount: 250 },
      { label: "Shared Rent Estimate", amount: 5000 },
    ],
    intelligence: {
      immigrationDifficulty: "medium",
      qualityOfLifeScore: 6,
      englishFriendliness: 5,
      safetyScore: 6,
      averageMonthlyBudget: 9000,
    },
  },
];

export const countryGoals: string[] = [
  "All Goals",
  "Work abroad",
  "Study abroad",
  "Live abroad",
  "Cultural learning",
  "Travel better",
  "Language learning",
];

export const countryRegions: string[] = [
  "All Regions",
  "Asia",
  "Africa",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Middle East",
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((country) => country.slug === slug);
}