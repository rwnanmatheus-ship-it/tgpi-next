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
      "Portugal is one of the easiest entry points into Europe, offering safety, culture and a strong expat community.",
    tags: ["Europe", "Expat", "Quality of Life"],
    costOfLife: [
      { label: "Rent", amount: 900 },
      { label: "Food", amount: 300 },
    ],
    culture:
      "Rich maritime history, relaxed lifestyle and strong family values.",
    tourism: ["Lisbon", "Porto", "Algarve beaches"],
    visa: "D7 visa, digital nomad visa and work visa available",
  },

  {
    slug: "united-states",
    name: "United States",
    emoji: "🇺🇸",
    region: "North America",
    language: "English",
    currency: "Dollar",
    currencyCode: "USD",
    capital: "Washington DC",
    mainGoal: "Work abroad",
    shortDescription: "Global economic powerhouse",
    longDescription:
      "The United States offers massive career opportunities across many industries.",
    tags: ["Work", "Economy", "Opportunity"],
    costOfLife: [
      { label: "Rent", amount: 1500 },
      { label: "Food", amount: 400 },
    ],
    culture:
      "Fast-paced, individualistic culture with strong innovation mindset.",
    tourism: ["New York", "Los Angeles", "National Parks"],
    visa: "Work visa (H1B), student visa (F1), tourist visa",
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
    shortDescription: "High quality of life",
    longDescription:
      "Canada is known for welcoming immigrants and offering structured residency pathways.",
    tags: ["Immigration", "Safety", "Quality"],
    costOfLife: [
      { label: "Rent", amount: 1200 },
      { label: "Food", amount: 350 },
    ],
    culture: "Multicultural society with strong safety and services.",
    tourism: ["Toronto", "Vancouver", "Rocky Mountains"],
    visa: "Express Entry, work permit, study visa",
  },

  {
    slug: "united-kingdom",
    name: "United Kingdom",
    emoji: "🇬🇧",
    region: "Europe",
    language: "English",
    currency: "Pound",
    currencyCode: "GBP",
    capital: "London",
    mainGoal: "Study abroad",
    shortDescription: "Global education hub",
    longDescription:
      "The UK offers world-class education and strong job opportunities.",
    tags: ["Education", "Global", "Career"],
    costOfLife: [
      { label: "Rent", amount: 1400 },
      { label: "Food", amount: 400 },
    ],
    culture: "Historic and modern blend with strong academic tradition.",
    tourism: ["London", "Oxford", "Edinburgh"],
    visa: "Student visa, skilled worker visa",
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
    shortDescription: "Strong economy",
    longDescription:
      "Germany is one of the best countries for engineers and professionals.",
    tags: ["Engineering", "Industry", "EU"],
    costOfLife: [
      { label: "Rent", amount: 1000 },
      { label: "Food", amount: 300 },
    ],
    culture: "Efficient and structured society.",
    tourism: ["Berlin", "Munich", "Black Forest"],
    visa: "EU Blue Card, work visa",
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
    shortDescription: "Global culture center",
    longDescription:
      "France is known worldwide for art, cuisine and culture.",
    tags: ["Culture", "Art", "Lifestyle"],
    costOfLife: [
      { label: "Rent", amount: 1300 },
      { label: "Food", amount: 350 },
    ],
    culture: "Deep cultural heritage and gastronomy.",
    tourism: ["Paris", "Lyon", "French Riviera"],
    visa: "Student visa, work visa",
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
    shortDescription: "Warm lifestyle",
    longDescription:
      "Spain offers a balanced lifestyle with strong social culture.",
    tags: ["Lifestyle", "Climate", "Culture"],
    costOfLife: [
      { label: "Rent", amount: 900 },
      { label: "Food", amount: 300 },
    ],
    culture: "Vibrant and social culture.",
    tourism: ["Barcelona", "Madrid", "Ibiza"],
    visa: "Digital nomad visa",
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
    shortDescription: "Technology + tradition",
    longDescription:
      "Japan blends advanced technology with deep tradition.",
    tags: ["Technology", "Culture", "Asia"],
    costOfLife: [
      { label: "Rent", amount: 1100 },
      { label: "Food", amount: 300 },
    ],
    culture: "Respect, discipline and tradition.",
    tourism: ["Tokyo", "Kyoto", "Osaka"],
    visa: "Work visa, student visa",
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
    shortDescription: "High salary + lifestyle",
    longDescription:
      "Australia offers strong job opportunities and high quality of life.",
    tags: ["Work", "Lifestyle"],
    costOfLife: [
      { label: "Rent", amount: 1400 },
      { label: "Food", amount: 400 },
    ],
    culture: "Outdoor lifestyle and balance.",
    tourism: ["Sydney", "Melbourne"],
    visa: "Working holiday visa",
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
    shortDescription: "Tax-free income hub",
    longDescription:
      "UAE is one of the best places for business and high income.",
    tags: ["Business", "Tax Free"],
    costOfLife: [
      { label: "Rent", amount: 1300 },
      { label: "Food", amount: 350 },
    ],
    culture: "Luxury meets tradition.",
    tourism: ["Dubai", "Abu Dhabi"],
    visa: "Work visa, investor visa",
  },
];