export type CostItem = {
  label: string;
  amount: number;
};

export type CountryPathway = {
  title: string;
  audience: string;
  summary: string;
};

export type RelatedCourse = {
  title: string;
  level: string;
  duration: string;
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
  mainGoal: "Study" | "Work" | "Tourism" | "Move" | "Culture";
  shortDescription: string;
  longDescription: string;
  heroNote: string;
  tags: string[];
  quickFacts: string[];
  culturalSignals: string[];
  tourismHighlights: string[];
  documentsAdvisory: string[];
  pathways: CountryPathway[];
  relatedCourses: RelatedCourse[];
  costOfLife: CostItem[];
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
    mainGoal: "Work",
    shortDescription:
      "High-context communication, discipline, safety, advanced infrastructure, and strong cultural identity.",
    longDescription:
      "Japan is one of the most structured and culturally distinct destinations in the world. TGPI positions Japan not only as a place to visit or work, but as a country that rewards preparation, etiquette awareness, language discipline, and respect for systems. This pathway helps the user understand real integration patterns instead of superficial travel-only content.",
    heroNote:
      "Best for users who value structure, precision, etiquette, and long-term international readiness.",
    tags: ["Etiquette", "Work Culture", "Language", "Daily Life", "Integration"],
    quickFacts: [
      "Extremely strong public order and social norms",
      "Language preparation creates a major integration advantage",
      "Excellent destination for discipline-driven learners",
      "High value for etiquette, punctuality, and respect",
    ],
    culturalSignals: [
      "Indirect communication is often more effective than confrontation",
      "Politeness and consideration are visible in everyday routines",
      "Public behavior matters as much as private preparation",
      "Understanding silence and context improves interaction quality",
    ],
    tourismHighlights: [
      "Tokyo urban systems and innovation culture",
      "Kyoto heritage, temples, and traditional aesthetics",
      "Osaka food culture and social energy",
      "Seasonal tourism tied to nature and ceremony",
    ],
    documentsAdvisory: [
      "Always verify entry, study, and work requirements through official government and consular sources",
      "Prepare identity, education, and financial documents in organized international format",
      "Language proof and purpose clarity can improve readiness",
      "Use TGPI pathways to understand practical adaptation before formal steps",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Students and language learners",
        summary:
          "Focuses on language foundations, classroom culture, application discipline, and academic adaptation.",
      },
      {
        title: "Work Path",
        audience: "Professionals and career-transition users",
        summary:
          "Focuses on corporate etiquette, reliability, communication style, and workplace expectations.",
      },
      {
        title: "Tourism Path",
        audience: "Travelers seeking meaningful immersion",
        summary:
          "Focuses on navigation, etiquette, social rules, transport logic, and culturally respectful travel.",
      },
      {
        title: "Move Path",
        audience: "Users considering medium or long-term relocation",
        summary:
          "Focuses on daily life systems, adaptation pressure, housing logic, and cultural integration habits.",
      },
    ],
    relatedCourses: [
      {
        title: "Japanese Foundations for Daily Life",
        level: "Starter",
        duration: "4 weeks",
      },
      {
        title: "Japanese Work Culture Readiness",
        level: "Intermediate",
        duration: "6 weeks",
      },
      {
        title: "Tokyo Integration Essentials",
        level: "Premium",
        duration: "3 weeks",
      },
    ],
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
    region: "South America",
    language: "Brazilian Portuguese",
    currency: "Brazilian Real (BRL)",
    currencyCode: "BRL",
    capital: "Brasília",
    mainGoal: "Move",
    shortDescription:
      "Regional diversity, social warmth, informal communication, and strong cultural plurality.",
    longDescription:
      "Brazil is not a one-style country. It is continental, socially layered, and culturally diverse. TGPI treats Brazil as a serious adaptation environment where language, social reading, regional behavior, and practical local awareness matter. This pathway helps users understand Brazil beyond stereotypes and prepares them for communication, movement, and lifestyle integration.",
    heroNote:
      "Best for users who want social adaptation, language immersion, and regional cultural intelligence.",
    tags: ["Portuguese", "Regional Diversity", "Social Life", "Integration", "Culture"],
    quickFacts: [
      "Regional variation changes language rhythm and lifestyle experience",
      "Social warmth can coexist with practical complexity",
      "Portuguese improves access to trust and daily navigation",
      "Preparation matters for both major cities and slower regions",
    ],
    culturalSignals: [
      "Relationships strongly influence everyday life and opportunity access",
      "Communication can be warm, expressive, and context-dependent",
      "Regional identity affects habits, tone, and expectations",
      "Adaptation improves when users understand informal norms",
    ],
    tourismHighlights: [
      "Rio de Janeiro lifestyle, scenery, and iconic identity",
      "São Paulo scale, business energy, and cultural variety",
      "Bahia heritage, rhythm, and local traditions",
      "Southern and northeastern contrasts for lifestyle exploration",
    ],
    documentsAdvisory: [
      "Always verify stay, residency, study, or work rules through official authorities",
      "Organize translated or internationally readable records when relevant",
      "Financial planning and city-level research are essential",
      "TGPI pathways should be used before making lifestyle assumptions",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Students, exchange learners, and language users",
        summary:
          "Focuses on Portuguese readiness, communication, classroom adaptation, and local interaction confidence.",
      },
      {
        title: "Work Path",
        audience: "Professionals entering the Brazilian market",
        summary:
          "Focuses on communication culture, relationship-building, and urban professional adaptation.",
      },
      {
        title: "Tourism Path",
        audience: "Travelers wanting more than surface tourism",
        summary:
          "Focuses on regions, practical mobility, cultural respect, and real-life navigation.",
      },
      {
        title: "Move Path",
        audience: "Users planning medium or long-term living",
        summary:
          "Focuses on daily systems, regional fit, language immersion, and social adaptation habits.",
      },
    ],
    relatedCourses: [
      {
        title: "Brazilian Portuguese for Real Life",
        level: "Starter",
        duration: "5 weeks",
      },
      {
        title: "Brazil Cultural Integration",
        level: "Intermediate",
        duration: "4 weeks",
      },
      {
        title: "Living in Brazil Preparation",
        level: "Premium",
        duration: "3 weeks",
      },
    ],
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
    region: "Africa / Middle East",
    language: "Arabic",
    currency: "Egyptian Pound (EGP)",
    currencyCode: "EGP",
    capital: "Cairo",
    mainGoal: "Culture",
    shortDescription:
      "Civilizational depth, Arabic foundations, heritage immersion, and high-value cultural learning.",
    longDescription:
      "Egypt offers a rare combination of civilizational importance, living cultural intensity, and language value. TGPI frames Egypt as a destination for users who want deep cultural context, practical exposure to Arabic, and stronger historical awareness. This is a pathway for intelligent preparation, not just tourism imagery.",
    heroNote:
      "Best for users seeking cultural depth, historical awareness, and Arabic exposure.",
    tags: ["Arabic", "Civilization", "Heritage", "Cultural Learning", "History"],
    quickFacts: [
      "One of the most historically significant countries in the world",
      "Arabic foundations increase cultural and regional understanding",
      "Urban energy and heritage depth coexist strongly",
      "Preparation improves confidence and interpretation quality",
    ],
    culturalSignals: [
      "Historical awareness enriches present-day experience",
      "Respectful behavior and cultural curiosity improve access",
      "Language basics can transform ordinary interactions",
      "Context matters when reading social and public dynamics",
    ],
    tourismHighlights: [
      "Cairo museums, memory, and urban scale",
      "Ancient sites with global historical significance",
      "Nile-centered travel and layered geography",
      "Religious, cultural, and civilizational landmarks",
    ],
    documentsAdvisory: [
      "Always verify travel and documentation requirements through official sources",
      "Keep itinerary clarity and identity records organized",
      "For study or extended stay, prepare purpose-based document structure",
      "TGPI helps turn curiosity into more informed cultural preparation",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Learners interested in Arabic and historical context",
        summary:
          "Focuses on Arabic exposure, heritage interpretation, and educational readiness.",
      },
      {
        title: "Work Path",
        audience: "Professionals exploring regional understanding",
        summary:
          "Focuses on cultural context, communication awareness, and structured preparation.",
      },
      {
        title: "Tourism Path",
        audience: "Travelers wanting more than iconic photos",
        summary:
          "Focuses on contextual tourism, respectful presence, and deeper understanding.",
      },
      {
        title: "Move Path",
        audience: "Users exploring longer local experience",
        summary:
          "Focuses on adaptation, systems awareness, and practical cultural learning.",
      },
    ],
    relatedCourses: [
      {
        title: "Arabic Foundations for Travelers",
        level: "Starter",
        duration: "4 weeks",
      },
      {
        title: "Egypt Cultural Intelligence",
        level: "Intermediate",
        duration: "4 weeks",
      },
      {
        title: "Ancient Egypt to Modern Context",
        level: "Premium",
        duration: "3 weeks",
      },
    ],
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
    slug: "canada",
    name: "Canada",
    emoji: "🇨🇦",
    region: "North America",
    language: "English / French",
    currency: "Canadian Dollar (CAD)",
    currencyCode: "CAD",
    capital: "Ottawa",
    mainGoal: "Study",
    shortDescription:
      "Structured systems, multicultural environment, academic pathways, and quality-of-life focus.",
    longDescription:
      "Canada is one of TGPI’s strongest countries for study-centered readiness and structured relocation planning. The country combines multicultural exposure, practical systems, and broad international appeal. This pathway helps users prepare for language, academic expectations, climate adaptation, and real-life organization.",
    heroNote:
      "Best for users prioritizing education, structure, and quality-of-life planning.",
    tags: ["Study Abroad", "English", "French", "Multicultural", "Planning"],
    quickFacts: [
      "Strong destination for academic and structured preparation",
      "Multicultural environments can ease global adaptation",
      "Climate readiness is part of serious planning",
      "Organization and long-term thinking matter",
    ],
    culturalSignals: [
      "Respect, clarity, and personal space are often valued",
      "Multicultural awareness improves social adaptation",
      "Preparedness and punctuality support smoother transitions",
      "Communication can be friendly but structured",
    ],
    tourismHighlights: [
      "Major cities with strong global accessibility",
      "Nature, parks, and seasonal lifestyle variety",
      "Urban-rural contrasts useful for lifestyle discovery",
      "High-value exploration for study and living research",
    ],
    documentsAdvisory: [
      "Always verify official study, entry, and residency requirements",
      "Prepare education, identity, and financial records clearly",
      "Purpose-driven planning is essential before formal application stages",
      "Use TGPI to compare lifestyle expectations before choosing a path",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Students, academic planners, and language users",
        summary:
          "Focuses on application mindset, language readiness, adaptation, and education-aligned planning.",
      },
      {
        title: "Work Path",
        audience: "Professionals considering structured transition",
        summary:
          "Focuses on communication norms, reliability, and work environment expectations.",
      },
      {
        title: "Tourism Path",
        audience: "Users exploring country fit before larger decisions",
        summary:
          "Focuses on cities, mobility, climate awareness, and quality-of-life observation.",
      },
      {
        title: "Move Path",
        audience: "Long-term planners",
        summary:
          "Focuses on systems, housing logic, adaptation routines, and personal fit.",
      },
    ],
    relatedCourses: [
      {
        title: "Canada Study Readiness",
        level: "Starter",
        duration: "4 weeks",
      },
      {
        title: "Academic English for Canada",
        level: "Intermediate",
        duration: "6 weeks",
      },
      {
        title: "Canada Relocation Preparation",
        level: "Premium",
        duration: "4 weeks",
      },
    ],
    costOfLife: [
      { label: "Coffee", amount: 4.5 },
      { label: "Metro Ticket", amount: 3.75 },
      { label: "Casual Meal", amount: 22 },
      { label: "Museum Ticket", amount: 18 },
      { label: "Monthly Mobile Plan", amount: 55 },
      { label: "Shared Rent Estimate", amount: 1200 },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    emoji: "🇩🇪",
    region: "Europe",
    language: "German",
    currency: "Euro (EUR)",
    currencyCode: "EUR",
    capital: "Berlin",
    mainGoal: "Work",
    shortDescription:
      "Systems, industrial strength, discipline, practical planning, and high-value European positioning.",
    longDescription:
      "Germany is one of TGPI’s strongest countries for work-oriented and study-adjacent readiness in Europe. It rewards structure, language commitment, planning discipline, and operational thinking. This pathway helps users understand how to prepare for professional environments, practical life systems, and stronger long-term positioning.",
    heroNote:
      "Best for users who want Europe with structure, credibility, and practical preparation.",
    tags: ["German", "Europe", "Work Abroad", "Systems", "Planning"],
    quickFacts: [
      "Strong fit for users who value order and practical organization",
      "Language preparation increases confidence and opportunity quality",
      "Professional environments reward clarity and reliability",
      "A strong country for long-term European positioning",
    ],
    culturalSignals: [
      "Directness is often more normal than in many other cultures",
      "Preparation and punctuality carry visible weight",
      "Structure can reduce friction in daily life",
      "Users adapt better when expectations are understood early",
    ],
    tourismHighlights: [
      "Berlin modern identity and global energy",
      "Historical cities and regional contrasts",
      "Efficient transport and high discoverability",
      "Strong base for broader European exploration",
    ],
    documentsAdvisory: [
      "Always verify official study, work, and residency rules",
      "Prepare identity, education, and financial records carefully",
      "Language preparation can improve real adaptation capacity",
      "TGPI helps the user assess fit before taking formal steps",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Students and structured academic planners",
        summary:
          "Focuses on education mindset, language readiness, and practical academic adaptation.",
      },
      {
        title: "Work Path",
        audience: "Professionals and career builders",
        summary:
          "Focuses on professional culture, reliability, communication, and preparation discipline.",
      },
      {
        title: "Tourism Path",
        audience: "Users evaluating lifestyle and regional fit",
        summary:
          "Focuses on transport, city logic, cultural reading, and local experience quality.",
      },
      {
        title: "Move Path",
        audience: "Long-term European planners",
        summary:
          "Focuses on housing mindset, daily systems, and practical integration patterns.",
      },
    ],
    relatedCourses: [
      {
        title: "German for Everyday Integration",
        level: "Starter",
        duration: "5 weeks",
      },
      {
        title: "Germany Work Readiness",
        level: "Intermediate",
        duration: "5 weeks",
      },
      {
        title: "European Transition via Germany",
        level: "Premium",
        duration: "4 weeks",
      },
    ],
    costOfLife: [
      { label: "Coffee", amount: 3.8 },
      { label: "Metro Ticket", amount: 3.5 },
      { label: "Casual Meal", amount: 16 },
      { label: "Museum Ticket", amount: 15 },
      { label: "Monthly Mobile Plan", amount: 25 },
      { label: "Shared Rent Estimate", amount: 850 },
    ],
  },
  {
    slug: "portugal",
    name: "Portugal",
    emoji: "🇵🇹",
    region: "Europe",
    language: "Portuguese",
    currency: "Euro (EUR)",
    currencyCode: "EUR",
    capital: "Lisbon",
    mainGoal: "Move",
    shortDescription:
      "Accessible cultural transition, European context, Portuguese language, and lifestyle-driven adaptation.",
    longDescription:
      "Portugal is one of TGPI’s most strategic countries for users who want Europe with lower cultural friction and high lifestyle appeal. This pathway helps users prepare for language adaptation, regional differences, urban lifestyle, and medium-term living decisions with better clarity.",
    heroNote:
      "Best for users seeking Europe through a softer cultural transition and practical preparation.",
    tags: ["Portuguese", "Europe", "Lifestyle", "Relocation", "Integration"],
    quickFacts: [
      "Strong entry point for Europe-focused users",
      "Language and cultural familiarity can reduce adaptation friction",
      "City choice affects lifestyle and budget strongly",
      "Preparation still matters despite perceived accessibility",
    ],
    culturalSignals: [
      "Politeness, rhythm, and lifestyle reading improve integration",
      "Local pace may differ from more high-pressure environments",
      "Regional identity shapes experience quality",
      "Adaptation improves when expectations are realistic",
    ],
    tourismHighlights: [
      "Lisbon urban appeal and international visibility",
      "Porto identity, scenery, and cultural style",
      "Coastal and interior lifestyle contrasts",
      "Useful country for pre-relocation exploration",
    ],
    documentsAdvisory: [
      "Always verify official entry, residence, study, and work routes",
      "Prepare personal, academic, and financial records with clarity",
      "City-level planning is essential before formal decisions",
      "TGPI helps convert interest into structured country preparation",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Students and language-transition users",
        summary:
          "Focuses on adaptation, communication, and practical study-oriented planning.",
      },
      {
        title: "Work Path",
        audience: "Professionals exploring Portugal or Europe",
        summary:
          "Focuses on workplace adjustment, communication style, and regional fit.",
      },
      {
        title: "Tourism Path",
        audience: "Users researching future relocation through travel",
        summary:
          "Focuses on urban feel, transport, pace, and local lifestyle observation.",
      },
      {
        title: "Move Path",
        audience: "Relocation-minded users",
        summary:
          "Focuses on cost perception, city fit, culture, and daily life structure.",
      },
    ],
    relatedCourses: [
      {
        title: "Portuguese for Portugal Essentials",
        level: "Starter",
        duration: "4 weeks",
      },
      {
        title: "Portugal Relocation Readiness",
        level: "Intermediate",
        duration: "5 weeks",
      },
      {
        title: "European Living via Portugal",
        level: "Premium",
        duration: "3 weeks",
      },
    ],
    costOfLife: [
      { label: "Coffee", amount: 1.5 },
      { label: "Metro Ticket", amount: 1.8 },
      { label: "Casual Meal", amount: 12 },
      { label: "Museum Ticket", amount: 10 },
      { label: "Monthly Mobile Plan", amount: 20 },
      { label: "Shared Rent Estimate", amount: 650 },
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    emoji: "🇸🇬",
    region: "Asia",
    language: "English / Mandarin / Malay / Tamil",
    currency: "Singapore Dollar (SGD)",
    currencyCode: "SGD",
    capital: "Singapore",
    mainGoal: "Work",
    shortDescription:
      "Efficiency, global connectivity, premium urban systems, and high-function international readiness.",
    longDescription:
      "Singapore is one of TGPI’s strongest premium countries for users who value efficiency, cleanliness, strategic positioning, and global connectivity. This pathway helps users read a highly organized urban environment where precision, conduct, and practical readiness shape the experience.",
    heroNote:
      "Best for users pursuing premium urban preparedness and global gateway positioning.",
    tags: ["Global City", "Efficiency", "Work", "Urban Systems", "Asia"],
    quickFacts: [
      "Highly efficient and structured urban environment",
      "Strong value for users with precision-oriented habits",
      "Excellent for global exposure and strategic positioning",
      "Preparation helps users interpret rules and expectations quickly",
    ],
    culturalSignals: [
      "Systems literacy improves experience quality immediately",
      "Public order and respect for rules are highly visible",
      "Professional presentation matters in many environments",
      "Users benefit from observing multi-cultural dynamics carefully",
    ],
    tourismHighlights: [
      "Premium city infrastructure and discoverability",
      "Global-food, business, and mobility experience",
      "Compact geography with high access efficiency",
      "Useful hub for broader Asia planning",
    ],
    documentsAdvisory: [
      "Always verify official entry and purpose-based requirements",
      "Keep travel, identity, and financial records well organized",
      "Professional users should prepare with clarity and structure",
      "TGPI helps translate country interest into operational readiness",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Students and ambitious learners",
        summary:
          "Focuses on high-standard adaptation, systems awareness, and communication readiness.",
      },
      {
        title: "Work Path",
        audience: "Professionals and globally minded users",
        summary:
          "Focuses on professional presentation, urban systems, and disciplined adaptation.",
      },
      {
        title: "Tourism Path",
        audience: "Travelers using Singapore strategically",
        summary:
          "Focuses on navigation, value perception, and practical city use.",
      },
      {
        title: "Move Path",
        audience: "Users exploring premium long-term positioning",
        summary:
          "Focuses on adaptation logic, systems, lifestyle expectations, and fit.",
      },
    ],
    relatedCourses: [
      {
        title: "Singapore City Readiness",
        level: "Starter",
        duration: "3 weeks",
      },
      {
        title: "Professional English for Global Cities",
        level: "Intermediate",
        duration: "5 weeks",
      },
      {
        title: "Asia Premium Gateway Strategy",
        level: "Premium",
        duration: "3 weeks",
      },
    ],
    costOfLife: [
      { label: "Coffee", amount: 3.2 },
      { label: "Metro Ticket", amount: 1.9 },
      { label: "Casual Meal", amount: 9 },
      { label: "Museum Ticket", amount: 20 },
      { label: "Monthly Mobile Plan", amount: 30 },
      { label: "Shared Rent Estimate", amount: 1400 },
    ],
  },
  {
    slug: "united-states",
    name: "United States",
    emoji: "🇺🇸",
    region: "North America",
    language: "English",
    currency: "US Dollar (USD)",
    currencyCode: "USD",
    capital: "Washington, D.C.",
    mainGoal: "Work",
    shortDescription:
      "Scale, opportunity, regional diversity, professional ambition, and strong market-oriented culture.",
    longDescription:
      "The United States remains one of the most strategic countries in TGPI for users seeking work, global exposure, scale, and market-driven opportunity. This pathway helps users understand that the country is not a single experience: region, city, cost structure, and personal profile change outcomes dramatically. TGPI turns broad interest into more disciplined readiness.",
    heroNote:
      "Best for users pursuing scale, opportunity, and serious professional preparation.",
    tags: ["English", "Opportunity", "Professional Growth", "Scale", "Regional Fit"],
    quickFacts: [
      "Country scale changes adaptation realities from one city to another",
      "Professional ambition and self-positioning often matter strongly",
      "Practical systems vary by state and city context",
      "Preparation improves decision quality and country fit",
    ],
    culturalSignals: [
      "Communication is often more direct and self-driven",
      "Personal initiative can shape opportunities",
      "Regional culture changes lifestyle and interaction patterns",
      "Users benefit from understanding local context before commitment",
    ],
    tourismHighlights: [
      "Global cities with very different profiles",
      "Strong national variety for exploration and fit assessment",
      "Useful destination for both short-term exposure and longer planning",
      "High-value country for strategic comparison inside TGPI",
    ],
    documentsAdvisory: [
      "Always verify official entry, study, and work requirements",
      "Prepare identity, academic, and financial records in organized format",
      "City and state research are essential before decisions",
      "TGPI helps users compare goals before selecting a deeper pathway",
    ],
    pathways: [
      {
        title: "Study Path",
        audience: "Students and structured opportunity-seekers",
        summary:
          "Focuses on language, academic positioning, and real preparation mindset.",
      },
      {
        title: "Work Path",
        audience: "Professionals and growth-driven users",
        summary:
          "Focuses on communication, market culture, and professional readiness.",
      },
      {
        title: "Tourism Path",
        audience: "Travelers exploring country fit and exposure",
        summary:
          "Focuses on regional comparison, practical use, and strategic observation.",
      },
      {
        title: "Move Path",
        audience: "Long-term planners",
        summary:
          "Focuses on lifestyle tradeoffs, cost logic, and location-based adaptation.",
      },
    ],
    relatedCourses: [
      {
        title: "American English for Real Contexts",
        level: "Starter",
        duration: "5 weeks",
      },
      {
        title: "US Work and Communication Readiness",
        level: "Intermediate",
        duration: "6 weeks",
      },
      {
        title: "Strategic Relocation to the US",
        level: "Premium",
        duration: "4 weeks",
      },
    ],
    costOfLife: [
      { label: "Coffee", amount: 4.5 },
      { label: "Metro Ticket", amount: 3 },
      { label: "Casual Meal", amount: 18 },
      { label: "Museum Ticket", amount: 20 },
      { label: "Monthly Mobile Plan", amount: 60 },
      { label: "Shared Rent Estimate", amount: 1300 },
    ],
  },
];

export const countryGoals = ["All", "Study", "Work", "Tourism", "Move", "Culture"] as const;

export const countryRegions = [
  "All",
  "Asia",
  "South America",
  "Africa / Middle East",
  "North America",
  "Europe",
] as const;

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((country) => country.slug === slug);
}