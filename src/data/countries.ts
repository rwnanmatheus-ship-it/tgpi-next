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
  region: string;
  mainGoal: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  costOfLife: CostItem[];
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
    region: "Asia",
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
  },
  {
    slug: "brazil",
    name: "Brazil",
    emoji: "🇧🇷",
    language: "Brazilian Portuguese",
    currency: "Brazilian Real (BRL)",
    currencyCode: "BRL",
    capital: "Brasília",
    region: "South America",
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
  },
  {
    slug: "egypt",
    name: "Egypt",
    emoji: "🇪🇬",
    language: "Arabic",
    currency: "Egyptian Pound (EGP)",
    currencyCode: "EGP",
    capital: "Cairo",
    region: "Africa",
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
  },
  {
    slug: "united-states",
    name: "United States",
    emoji: "🇺🇸",
    language: "English",
    currency: "US Dollar (USD)",
    currencyCode: "USD",
    capital: "Washington, D.C.",
    region: "North America",
    mainGoal: "Work abroad",
    shortDescription:
      "Career growth, innovation, large-scale markets, and international opportunity.",
    longDescription:
      "Build readiness for the United States through work culture, communication style, mobility, major-city cost awareness, and global professional positioning.",
    tags: ["Career", "Innovation", "Opportunity"],
    costOfLife: [
      { label: "Coffee", amount: 5 },
      { label: "Metro Ticket", amount: 3 },
      { label: "Casual Meal", amount: 18 },
      { label: "Museum Ticket", amount: 25 },
      { label: "Monthly Mobile Plan", amount: 60 },
      { label: "Shared Rent Estimate", amount: 1400 },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    emoji: "🇨🇦",
    language: "English / French",
    currency: "Canadian Dollar (CAD)",
    currencyCode: "CAD",
    capital: "Ottawa",
    region: "North America",
    mainGoal: "Live abroad",
    shortDescription:
      "Quality of life, multicultural environment, and long-term international living.",
    longDescription:
      "Build readiness for Canada through multicultural integration, everyday life understanding, language awareness, and modern global living conditions.",
    tags: ["Quality of Life", "Multicultural", "Relocation"],
    costOfLife: [
      { label: "Coffee", amount: 4.5 },
      { label: "Metro Ticket", amount: 3.5 },
      { label: "Casual Meal", amount: 20 },
      { label: "Museum Ticket", amount: 22 },
      { label: "Monthly Mobile Plan", amount: 55 },
      { label: "Shared Rent Estimate", amount: 1200 },
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    emoji: "🇬🇧",
    language: "English",
    currency: "Pound Sterling (GBP)",
    currencyCode: "GBP",
    capital: "London",
    region: "Europe",
    mainGoal: "Study abroad",
    shortDescription:
      "Academic prestige, international mobility, and global cultural literacy.",
    longDescription:
      "Build readiness for the United Kingdom through academic culture, professional communication, urban adaptation, and international educational pathways.",
    tags: ["Study Abroad", "Academic Prestige", "English"],
    costOfLife: [
      { label: "Coffee", amount: 4 },
      { label: "Metro Ticket", amount: 3 },
      { label: "Casual Meal", amount: 16 },
      { label: "Museum Ticket", amount: 18 },
      { label: "Monthly Mobile Plan", amount: 30 },
      { label: "Shared Rent Estimate", amount: 1100 },
    ],
  },
  {
    slug: "france",
    name: "France",
    emoji: "🇫🇷",
    language: "French",
    currency: "Euro (EUR)",
    currencyCode: "EUR",
    capital: "Paris",
    region: "Europe",
    mainGoal: "Cultural learning",
    shortDescription:
      "Language, art, society, refinement, and deep European cultural context.",
    longDescription:
      "Build readiness for France through French language, social etiquette, intellectual tradition, urban life, and deep cultural immersion.",
    tags: ["French", "Culture", "Europe"],
    costOfLife: [
      { label: "Coffee", amount: 3.5 },
      { label: "Metro Ticket", amount: 2.5 },
      { label: "Casual Meal", amount: 17 },
      { label: "Museum Ticket", amount: 16 },
      { label: "Monthly Mobile Plan", amount: 25 },
      { label: "Shared Rent Estimate", amount: 950 },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    emoji: "🇩🇪",
    language: "German",
    currency: "Euro (EUR)",
    currencyCode: "EUR",
    capital: "Berlin",
    region: "Europe",
    mainGoal: "Work abroad",
    shortDescription:
      "Structure, engineering, European access, and strong professional pathways.",
    longDescription:
      "Build readiness for Germany through professional discipline, language foundations, cost awareness, and one of Europe’s strongest work ecosystems.",
    tags: ["Engineering", "Europe", "Work Abroad"],
    costOfLife: [
      { label: "Coffee", amount: 3.2 },
      { label: "Metro Ticket", amount: 3.2 },
      { label: "Casual Meal", amount: 15 },
      { label: "Museum Ticket", amount: 15 },
      { label: "Monthly Mobile Plan", amount: 20 },
      { label: "Shared Rent Estimate", amount: 850 },
    ],
  },
  {
    slug: "portugal",
    name: "Portugal",
    emoji: "🇵🇹",
    language: "Portuguese",
    currency: "Euro (EUR)",
    currencyCode: "EUR",
    capital: "Lisbon",
    region: "Europe",
    mainGoal: "Live abroad",
    shortDescription:
      "European gateway, Portuguese language continuity, and lifestyle transition.",
    longDescription:
      "Build readiness for Portugal through daily-life adaptation, cost expectations, language continuity, and one of the most relevant European relocation pathways for Brazilians.",
    tags: ["Europe", "Portuguese", "Relocation"],
    costOfLife: [
      { label: "Coffee", amount: 1.8 },
      { label: "Metro Ticket", amount: 1.8 },
      { label: "Casual Meal", amount: 12 },
      { label: "Museum Ticket", amount: 12 },
      { label: "Monthly Mobile Plan", amount: 20 },
      { label: "Shared Rent Estimate", amount: 700 },
    ],
  },
  {
    slug: "spain",
    name: "Spain",
    emoji: "🇪🇸",
    language: "Spanish",
    currency: "Euro (EUR)",
    currencyCode: "EUR",
    capital: "Madrid",
    region: "Europe",
    mainGoal: "Live abroad",
    shortDescription:
      "Language expansion, lifestyle, mobility, and accessible European integration.",
    longDescription:
      "Build readiness for Spain through language growth, urban daily life, social adaptation, and practical European living context.",
    tags: ["Spanish", "Lifestyle", "Europe"],
    costOfLife: [
      { label: "Coffee", amount: 2 },
      { label: "Metro Ticket", amount: 1.7 },
      { label: "Casual Meal", amount: 13 },
      { label: "Museum Ticket", amount: 14 },
      { label: "Monthly Mobile Plan", amount: 18 },
      { label: "Shared Rent Estimate", amount: 750 },
    ],
  },
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    emoji: "🇦🇪",
    language: "Arabic / English",
    currency: "UAE Dirham (AED)",
    currencyCode: "AED",
    capital: "Abu Dhabi",
    region: "Middle East",
    mainGoal: "Business expansion",
    shortDescription:
      "Global business hub, mobility, prestige, and premium international positioning.",
    longDescription:
      "Build readiness for the United Arab Emirates through business culture, expatriate context, luxury-market awareness, and strategic international expansion.",
    tags: ["Business", "Prestige", "Global Hub"],
    costOfLife: [
      { label: "Coffee", amount: 18 },
      { label: "Metro Ticket", amount: 6 },
      { label: "Casual Meal", amount: 40 },
      { label: "Museum Ticket", amount: 65 },
      { label: "Monthly Mobile Plan", amount: 150 },
      { label: "Shared Rent Estimate", amount: 3500 },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    emoji: "🇦🇺",
    language: "English",
    currency: "Australian Dollar (AUD)",
    currencyCode: "AUD",
    capital: "Canberra",
    region: "Oceania",
    mainGoal: "Digital nomad",
    shortDescription:
      "Mobility, quality of life, English environment, and international flexibility.",
    longDescription:
      "Build readiness for Australia through English-speaking integration, urban lifestyle, professional mobility, and modern global living conditions.",
    tags: ["English", "Mobility", "Digital Nomad"],
    costOfLife: [
      { label: "Coffee", amount: 5 },
      { label: "Metro Ticket", amount: 4.5 },
      { label: "Casual Meal", amount: 22 },
      { label: "Museum Ticket", amount: 20 },
      { label: "Monthly Mobile Plan", amount: 40 },
      { label: "Shared Rent Estimate", amount: 1300 },
    ],
  },
  {
    slug: "south-korea",
    name: "South Korea",
    emoji: "🇰🇷",
    language: "Korean",
    currency: "South Korean Won (KRW)",
    currencyCode: "KRW",
    capital: "Seoul",
    region: "Asia",
    mainGoal: "Study abroad",
    shortDescription:
      "Technology, education, discipline, and advanced modern Asian context.",
    longDescription:
      "Build readiness for South Korea through language foundations, academic structure, social adaptation, and one of Asia’s most advanced environments.",
    tags: ["Technology", "Education", "Asia"],
    costOfLife: [
      { label: "Coffee", amount: 5500 },
      { label: "Metro Ticket", amount: 1500 },
      { label: "Casual Meal", amount: 11000 },
      { label: "Museum Ticket", amount: 5000 },
      { label: "Monthly Mobile Plan", amount: 55000 },
      { label: "Shared Rent Estimate", amount: 650000 },
    ],
  },
];