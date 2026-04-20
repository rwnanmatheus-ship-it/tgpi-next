export type CostItem = {
  label: string;
  amount: number;
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
  culture: string;
  tourism: string[];
  visa: string;
};

export const countries: Country[] = [
  {
    slug: "portugal",
    name: "Portugal",
    emoji: "🇵🇹",
    region: "Europe",
    language: "Portuguese",
    currency: "Euro",
    currencyCode: "EUR",
    capital: "Lisbon",
    mainGoal: "Live abroad",
    shortDescription: "Gateway to Europe with strong quality of life",
    longDescription:
      "Portugal is one of the easiest entry points into Europe, offering safety, culture, lifestyle quality, and a strong expat community.",
    tags: ["Europe", "Expat", "Quality of Life"],
    costOfLife: [
      { label: "Rent", amount: 900 },
      { label: "Food", amount: 300 },
      { label: "Transport", amount: 45 },
      { label: "Utilities", amount: 110 },
    ],
    culture:
      "Portugal combines rich maritime history, warm hospitality, slower living rhythms, strong family values, and a highly social lifestyle centered around food, conversation, and local tradition.",
    tourism: ["Lisbon", "Porto", "Algarve Beaches", "Sintra", "Madeira"],
    visa:
      "D7 visa, digital nomad visa, student visa, and work visa pathways are available depending on purpose and eligibility.",
  },
  {
    slug: "canada",
    name: "Canada",
    emoji: "🇨🇦",
    region: "North America",
    language: "English / French",
    currency: "Canadian Dollar",
    currencyCode: "CAD",
    capital: "Ottawa",
    mainGoal: "Live abroad",
    shortDescription: "High quality of life with strong immigration pathways",
    longDescription:
      "Canada is known for welcoming immigration systems, safety, multicultural society, and structured long-term residency opportunities.",
    tags: ["Immigration", "Safety", "Quality"],
    costOfLife: [
      { label: "Rent", amount: 1200 },
      { label: "Food", amount: 350 },
      { label: "Transport", amount: 90 },
      { label: "Utilities", amount: 140 },
    ],
    culture:
      "Canada is multicultural, respectful, organized, and strongly centered around inclusion, civic trust, and public services.",
    tourism: ["Toronto", "Vancouver", "Montreal", "Banff", "Niagara Falls"],
    visa:
      "Express Entry, work permit, study permit, visitor visa, and provincial pathways are common immigration routes.",
  },
  {
    slug: "germany",
    name: "Germany",
    emoji: "🇩🇪",
    region: "Europe",
    language: "German",
    currency: "Euro",
    currencyCode: "EUR",
    capital: "Berlin",
    mainGoal: "Work abroad",
    shortDescription: "Strong economy with excellent career opportunities",
    longDescription:
      "Germany offers one of the strongest economies in Europe, especially for engineering, technical careers, and long-term professional growth.",
    tags: ["Engineering", "Industry", "EU"],
    costOfLife: [
      { label: "Rent", amount: 1000 },
      { label: "Food", amount: 300 },
      { label: "Transport", amount: 70 },
      { label: "Utilities", amount: 160 },
    ],
    culture:
      "Germany values efficiency, reliability, structure, punctuality, and long-term planning, with a strong respect for systems and quality.",
    tourism: ["Berlin", "Munich", "Hamburg", "Cologne", "Black Forest"],
    visa:
      "EU Blue Card, work visa, student visa, job seeker visa, and family reunification routes are common options.",
  },
  {
    slug: "united-states",
    name: "United States",
    emoji: "🇺🇸",
    region: "North America",
    language: "English",
    currency: "Dollar",
    currencyCode: "USD",
    capital: "Washington, D.C.",
    mainGoal: "Work abroad",
    shortDescription: "Massive opportunity market with global influence",
    longDescription:
      "The United States offers strong opportunities in business, technology, education, media, and entrepreneurship with high global relevance.",
    tags: ["Work", "Economy", "Opportunity"],
    costOfLife: [
      { label: "Rent", amount: 1500 },
      { label: "Food", amount: 400 },
      { label: "Transport", amount: 120 },
      { label: "Utilities", amount: 180 },
    ],
    culture:
      "The U.S. is ambitious, fast-moving, individualistic, and innovation-driven, with high variation between states and cities.",
    tourism: ["New York", "Los Angeles", "Miami", "Chicago", "National Parks"],
    visa:
      "Tourist visa, student visa, work visas such as H-1B, and other specific immigration categories may apply.",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    emoji: "🇬🇧",
    region: "Europe",
    language: "English",
    currency: "Pound Sterling",
    currencyCode: "GBP",
    capital: "London",
    mainGoal: "Study abroad",
    shortDescription: "Global education hub with elite institutions",
    longDescription:
      "The UK is one of the most recognized study destinations in the world, combining prestige, global networks, and cultural influence.",
    tags: ["Education", "Global", "Career"],
    costOfLife: [
      { label: "Rent", amount: 1400 },
      { label: "Food", amount: 400 },
      { label: "Transport", amount: 110 },
      { label: "Utilities", amount: 170 },
    ],
    culture:
      "The UK blends tradition and modernity, with strong academic culture, professional formality, and international diversity in major cities.",
    tourism: ["London", "Edinburgh", "Oxford", "Manchester", "Bath"],
    visa:
      "Student visas, skilled worker visas, visitor routes, and graduate routes are among the main pathways.",
  },
  {
    slug: "france",
    name: "France",
    emoji: "🇫🇷",
    region: "Europe",
    language: "French",
    currency: "Euro",
    currencyCode: "EUR",
    capital: "Paris",
    mainGoal: "Cultural learning",
    shortDescription: "Global center of culture, art, and lifestyle",
    longDescription:
      "France is a cultural powerhouse known for art, cuisine, fashion, language, and intellectual influence.",
    tags: ["Culture", "Art", "Lifestyle"],
    costOfLife: [
      { label: "Rent", amount: 1300 },
      { label: "Food", amount: 350 },
      { label: "Transport", amount: 75 },
      { label: "Utilities", amount: 150 },
    ],
    culture:
      "French culture strongly values language, aesthetics, cuisine, history, art, and social sophistication.",
    tourism: ["Paris", "Lyon", "Nice", "Bordeaux", "French Riviera"],
    visa:
      "Long-stay visas, student visas, visitor visas, and work pathways are available depending on the case.",
  },
  {
    slug: "spain",
    name: "Spain",
    emoji: "🇪🇸",
    region: "Europe",
    language: "Spanish",
    currency: "Euro",
    currencyCode: "EUR",
    capital: "Madrid",
    mainGoal: "Live abroad",
    shortDescription: "Warm lifestyle with strong social culture",
    longDescription:
      "Spain offers a relaxed but vibrant lifestyle, excellent weather in many regions, and a highly social day-to-day culture.",
    tags: ["Lifestyle", "Climate", "Culture"],
    costOfLife: [
      { label: "Rent", amount: 900 },
      { label: "Food", amount: 300 },
      { label: "Transport", amount: 50 },
      { label: "Utilities", amount: 120 },
    ],
    culture:
      "Spain is expressive, social, family-oriented, and deeply influenced by regional identities, food culture, and street life.",
    tourism: ["Barcelona", "Madrid", "Seville", "Valencia", "Ibiza"],
    visa:
      "Digital nomad visa, student visas, residence routes, and work pathways may be available depending on profile.",
  },
  {
    slug: "japan",
    name: "Japan",
    emoji: "🇯🇵",
    region: "Asia",
    language: "Japanese",
    currency: "Yen",
    currencyCode: "JPY",
    capital: "Tokyo",
    mainGoal: "Cultural learning",
    shortDescription: "Advanced technology with deep cultural tradition",
    longDescription:
      "Japan combines advanced modern infrastructure with a strong sense of tradition, discipline, and cultural identity.",
    tags: ["Technology", "Culture", "Asia"],
    costOfLife: [
      { label: "Rent", amount: 1100 },
      { label: "Food", amount: 300 },
      { label: "Transport", amount: 85 },
      { label: "Utilities", amount: 130 },
    ],
    culture:
      "Japanese culture emphasizes respect, discipline, order, refinement, and a strong balance between modernity and heritage.",
    tourism: ["Tokyo", "Kyoto", "Osaka", "Nara", "Mount Fuji"],
    visa:
      "Student visas, work visas, and temporary visitor routes are common depending on the goal.",
  },
  {
    slug: "australia",
    name: "Australia",
    emoji: "🇦🇺",
    region: "Oceania",
    language: "English",
    currency: "Australian Dollar",
    currencyCode: "AUD",
    capital: "Canberra",
    mainGoal: "Work abroad",
    shortDescription: "High wages with strong quality of life",
    longDescription:
      "Australia combines high earning potential, strong work-life balance, and a lifestyle centered on quality, outdoors, and mobility.",
    tags: ["Work", "Lifestyle", "Salary"],
    costOfLife: [
      { label: "Rent", amount: 1400 },
      { label: "Food", amount: 400 },
      { label: "Transport", amount: 100 },
      { label: "Utilities", amount: 160 },
    ],
    culture:
      "Australian culture is informal, practical, outdoors-oriented, and strongly tied to balance, openness, and mobility.",
    tourism: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Gold Coast",
      "Great Barrier Reef",
    ],
    visa:
      "Working holiday, student visas, skilled migration, and employer-sponsored visas are common routes.",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    emoji: "🇦🇪",
    region: "Middle East",
    language: "Arabic / English",
    currency: "Dirham",
    currencyCode: "AED",
    capital: "Abu Dhabi",
    mainGoal: "Business expansion",
    shortDescription: "Tax-advantaged global hub for business and lifestyle",
    longDescription:
      "The UAE is one of the most strategic regions for international business, high-income careers, luxury services, and global connectivity.",
    tags: ["Business", "Tax Free", "Global"],
    costOfLife: [
      { label: "Rent", amount: 1300 },
      { label: "Food", amount: 350 },
      { label: "Transport", amount: 80 },
      { label: "Utilities", amount: 170 },
    ],
    culture:
      "The UAE blends global modern luxury with traditional Arab values, creating a highly international but culturally distinct environment.",
    tourism: [
      "Dubai",
      "Abu Dhabi",
      "Desert Safari",
      "Palm Jumeirah",
      "Burj Khalifa",
    ],
    visa:
      "Work visas, investor routes, company-linked residency, and other residency pathways are common.",
  },
];

export const countryGoals = [
  "All",
  ...Array.from(new Set(countries.map((country) => country.mainGoal))),
];

export const countryRegions = [
  "All",
  ...Array.from(new Set(countries.map((country) => country.region))),
];