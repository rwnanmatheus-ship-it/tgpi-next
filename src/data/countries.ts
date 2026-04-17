export type CostItem = {
  label: string;
  amount: number;
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
  costOfLife: CostItem[];
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  bestFor: string[];
  premiumInsight: string;
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
    costOfLife: [
      { label: "Coffee", amount: 450 },
      { label: "Metro Ticket", amount: 220 },
      { label: "Casual Meal", amount: 1200 },
      { label: "Museum Ticket", amount: 1800 },
      { label: "Monthly Mobile Plan", amount: 4000 },
      { label: "Shared Rent Estimate", amount: 80000 },
    ],
    difficultyLevel: "Advanced",
    bestFor: ["Work abroad", "Language mastery", "Cultural discipline"],
    premiumInsight:
      "Premium users will unlock deeper guidance on integration standards, social etiquette, and long-term country adaptation strategy for Japan.",
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
    costOfLife: [
      { label: "Coffee", amount: 6 },
      { label: "Bus Ticket", amount: 5.5 },
      { label: "Casual Meal", amount: 35 },
      { label: "Museum Ticket", amount: 30 },
      { label: "Monthly Mobile Plan", amount: 55 },
      { label: "Shared Rent Estimate", amount: 1800 },
    ],
    difficultyLevel: "Beginner",
    bestFor: ["Live abroad", "Cultural learning", "Portuguese fluency"],
    premiumInsight:
      "Premium users will unlock deeper practical guidance on regional differences, social adaptation, and long-term lifestyle preparation in Brazil.",
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
    costOfLife: [
      { label: "Coffee", amount: 40 },
      { label: "Metro Ticket", amount: 10 },
      { label: "Casual Meal", amount: 180 },
      { label: "Museum Ticket", amount: 200 },
      { label: "Monthly Mobile Plan", amount: 250 },
      { label: "Shared Rent Estimate", amount: 5000 },
    ],
    difficultyLevel: "Intermediate",
    bestFor: ["Cultural learning", "Arabic foundations", "Civilization studies"],
    premiumInsight:
      "Premium users will unlock deeper country context on historical importance, practical adaptation, and how Egypt fits into a broader global readiness journey.",
  },
];