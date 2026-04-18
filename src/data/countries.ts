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
  continent: string;
  mainGoal: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  costOfLife: CostItem[];
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  bestFor: string[];
  premiumInsight: string;
  workMarket: string;
  integrationStyle: string;
  languageDifficulty: string;
  topReasons: string[];
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
    continent: "Asia",
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
      "Premium users unlock deeper guidance on integration standards, social etiquette, and long-term country adaptation strategy for Japan.",
    workMarket:
      "Japan can be attractive for users aiming at structured work culture, discipline, and long-term skill development, especially in technology, engineering, hospitality, and language-linked roles.",
    integrationStyle:
      "Integration in Japan tends to reward consistency, social awareness, punctuality, and respect for public order and collective norms.",
    languageDifficulty:
      "Japanese is usually perceived as a high-effort language for beginners due to writing systems, politeness levels, and cultural context.",
    topReasons: [
      "High-structure society",
      "Strong global cultural identity",
      "Professional discipline",
      "Deep language and etiquette ecosystem",
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
    continent: "South America",
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
      "Premium users unlock deeper practical guidance on regional differences, social adaptation, and long-term lifestyle preparation in Brazil.",
    workMarket:
      "Brazil can be relevant for users focused on Portuguese fluency, regional opportunity, service industries, digital work, and broader Latin American cultural literacy.",
    integrationStyle:
      "Integration in Brazil tends to be relational, conversational, socially warm, and highly influenced by regional cultural differences.",
    languageDifficulty:
      "Brazilian Portuguese is often approachable for Romance-language learners, but daily fluency still requires strong listening and cultural adaptation.",
    topReasons: [
      "Portuguese immersion",
      "High cultural warmth",
      "Regional diversity",
      "Accessible entry path for cultural learning",
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
    continent: "Africa",
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
      "Premium users unlock deeper country context on historical importance, practical adaptation, and how Egypt fits into a broader global readiness journey.",
    workMarket:
      "Egypt is especially relevant for users focused on Arabic exposure, civilization studies, regional understanding, tourism-linked knowledge, and cultural depth.",
    integrationStyle:
      "Integration in Egypt benefits from cultural sensitivity, respect for local norms, and stronger awareness of historical, social, and religious context.",
    languageDifficulty:
      "Arabic can present a medium-to-high adaptation curve depending on the learner’s linguistic background and target fluency level.",
    topReasons: [
      "Arabic access point",
      "Civilizational relevance",
      "Historical depth",
      "Strong cultural identity",
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
    continent: "Europe",
    mainGoal: "Work abroad",
    shortDescription:
      "Professional pathways, structure, integration, and high-value long-term planning.",
    longDescription:
      "Build readiness for Germany through language, systems awareness, work culture, public structure, and long-term integration strategy.",
    tags: ["German", "Europe", "Career"],
    costOfLife: [
      { label: "Coffee", amount: 3.8 },
      { label: "Metro Ticket", amount: 3.5 },
      { label: "Casual Meal", amount: 14 },
      { label: "Museum Ticket", amount: 16 },
      { label: "Monthly Mobile Plan", amount: 25 },
      { label: "Shared Rent Estimate", amount: 750 },
    ],
    difficultyLevel: "Intermediate",
    bestFor: ["Work abroad", "Career growth", "European integration"],
    premiumInsight:
      "Premium users unlock deeper guidance on work pathways, social systems, language progress, and long-term integration positioning in Germany.",
    workMarket:
      "Germany is frequently associated with engineering, technical skills, manufacturing, research, logistics, and structured professional environments.",
    integrationStyle:
      "Integration tends to reward structure, reliability, planning, and consistent social-system awareness.",
    languageDifficulty:
      "German can be manageable in structured learning environments, but meaningful integration usually improves a lot with stronger language commitment.",
    topReasons: [
      "Career-oriented environment",
      "Strong European positioning",
      "Structured systems",
      "Long-term professional stability",
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
    continent: "North America",
    mainGoal: "Live abroad",
    shortDescription:
      "Quality of life, multicultural integration, and balanced long-term global positioning.",
    longDescription:
      "Build readiness for Canada through language, multicultural understanding, social adaptation, and long-term planning for study, work, and life abroad.",
    tags: ["English", "French", "Live Abroad"],
    costOfLife: [
      { label: "Coffee", amount: 4.5 },
      { label: "Metro Ticket", amount: 3.4 },
      { label: "Casual Meal", amount: 18 },
      { label: "Museum Ticket", amount: 22 },
      { label: "Monthly Mobile Plan", amount: 50 },
      { label: "Shared Rent Estimate", amount: 950 },
    ],
    difficultyLevel: "Beginner",
    bestFor: ["Live abroad", "Study abroad", "Multicultural integration"],
    premiumInsight:
      "Premium users unlock deeper country guidance on adaptation style, multicultural reality, and long-term platform strategy for Canada.",
    workMarket:
      "Canada is often viewed as attractive for balanced pathways involving education, skilled work, multicultural adaptation, and long-term life planning.",
    integrationStyle:
      "Integration is often linked to multicultural awareness, communication, consistency, and day-to-day adaptability.",
    languageDifficulty:
      "English is widely accessible for many learners, while French adds strategic value depending on region and goals.",
    topReasons: [
      "High multicultural value",
      "Balanced global positioning",
      "Good long-term planning appeal",
      "Strong study-life-work ecosystem",
    ],
  },
];