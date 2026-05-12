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
    "slug": "afghanistan",
    "name": "Afghanistan",
    "emoji": "🇦🇫",
    "region": "Asia",
    "language": "Dari / Pashto",
    "currency": "Afghan Afghani (AFN)",
    "currencyCode": "AFN",
    "capital": "Kabul",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Dari / Pashto access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Afghanistan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Dari",
      "Asia",
      "Work, culture and adaptation",
      "AFN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Afghanistan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Dari / Pashto creates a clear language and integration profile.",
        "Kabul works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 64,
      "englishFriendliness": 40,
      "safetyScore": 61,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "albania",
    "name": "Albania",
    "emoji": "🇦🇱",
    "region": "Europe",
    "language": "Albanian",
    "currency": "Albanian Lek (ALL)",
    "currencyCode": "ALL",
    "capital": "Tirana",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Albanian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Albania through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Albanian",
      "Europe",
      "Study and live abroad",
      "ALL"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 96
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1238
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2750
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 79,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Albania is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Albanian creates a clear language and integration profile.",
        "Tirana works as the main reference point for national orientation and mobility planning.",
        "TGPI score 79/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 91,
      "englishFriendliness": 73,
      "safetyScore": 89,
      "averageMonthlyBudget": 2750
    }
  },
  {
    "slug": "algeria",
    "name": "Algeria",
    "emoji": "🇩🇿",
    "region": "Africa",
    "language": "Arabic / Tamazight",
    "currency": "Algerian Dinar (DZD)",
    "currencyCode": "DZD",
    "capital": "Algiers",
    "mainGoal": "Cultural learning",
    "shortDescription": "Arabic / Tamazight access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Algeria through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Africa",
      "Cultural learning",
      "DZD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Algeria is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic / Tamazight creates a clear language and integration profile.",
        "Algiers works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 63,
      "englishFriendliness": 51,
      "safetyScore": 59,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "andorra",
    "name": "Andorra",
    "emoji": "🇦🇩",
    "region": "Europe",
    "language": "Catalan",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Andorra la Vella",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Catalan access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Andorra through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Catalan",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 47
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 91
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1170
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2600
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 76,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Andorra is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Catalan creates a clear language and integration profile.",
        "Andorra la Vella works as the main reference point for national orientation and mobility planning.",
        "TGPI score 76/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 88,
      "englishFriendliness": 70,
      "safetyScore": 86,
      "averageMonthlyBudget": 2600
    }
  },
  {
    "slug": "angola",
    "name": "Angola",
    "emoji": "🇦🇴",
    "region": "Africa",
    "language": "Portuguese",
    "currency": "Angolan Kwanza (AOA)",
    "currencyCode": "AOA",
    "capital": "Luanda",
    "mainGoal": "Language and cultural integration",
    "shortDescription": "Portuguese access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Angola through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Portuguese",
      "Africa",
      "Language and cultural integration",
      "AOA"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Angola is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Portuguese creates a clear language and integration profile.",
        "Luanda works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 54,
      "safetyScore": 62,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "antigua-and-barbuda",
    "name": "Antigua and Barbuda",
    "emoji": "🇦🇬",
    "region": "North America",
    "language": "English",
    "currency": "East Caribbean Dollar (XCD)",
    "currencyCode": "XCD",
    "capital": "Saint John's",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Antigua and Barbuda through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "XCD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Antigua and Barbuda is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Saint John's works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 74,
      "safetyScore": 72,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "argentina",
    "name": "Argentina",
    "emoji": "🇦🇷",
    "region": "South America",
    "language": "Spanish",
    "currency": "Argentine Peso (ARS)",
    "currencyCode": "ARS",
    "capital": "Buenos Aires",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Argentina through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "ARS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 21
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 40
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 518
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1150
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Argentina is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Buenos Aires works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 61,
      "englishFriendliness": 36,
      "safetyScore": 54,
      "averageMonthlyBudget": 1150
    }
  },
  {
    "slug": "armenia",
    "name": "Armenia",
    "emoji": "🇦🇲",
    "region": "Asia",
    "language": "Armenian",
    "currency": "Armenian Dram (AMD)",
    "currencyCode": "AMD",
    "capital": "Yerevan",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Armenian access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Armenia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Armenian",
      "Asia",
      "Work, culture and adaptation",
      "AMD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Armenia is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Armenian creates a clear language and integration profile.",
        "Yerevan works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 42,
      "safetyScore": 63,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "australia",
    "name": "Australia",
    "emoji": "🇦🇺",
    "region": "Oceania",
    "language": "English",
    "currency": "Australian Dollar (AUD)",
    "currencyCode": "AUD",
    "capital": "Canberra",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Australia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Oceania",
      "Study, work and lifestyle",
      "AUD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 50
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 98
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1260
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2800
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 90,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Australia is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Canberra works as the main reference point for national orientation and mobility planning.",
        "TGPI score 90/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 88,
      "englishFriendliness": 94,
      "safetyScore": 86,
      "averageMonthlyBudget": 2800
    }
  },
  {
    "slug": "austria",
    "name": "Austria",
    "emoji": "🇦🇹",
    "region": "Europe",
    "language": "German",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Vienna",
    "mainGoal": "Study and live abroad",
    "shortDescription": "German access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Austria through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "German",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 48
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 93
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1193
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2650
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 77,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Austria is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "German creates a clear language and integration profile.",
        "Vienna works as the main reference point for national orientation and mobility planning.",
        "TGPI score 77/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 89,
      "englishFriendliness": 71,
      "safetyScore": 87,
      "averageMonthlyBudget": 2650
    }
  },
  {
    "slug": "azerbaijan",
    "name": "Azerbaijan",
    "emoji": "🇦🇿",
    "region": "Asia",
    "language": "Azerbaijani",
    "currency": "Azerbaijani Manat (AZN)",
    "currencyCode": "AZN",
    "capital": "Baku",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Azerbaijani access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Azerbaijan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Azerbaijani",
      "Asia",
      "Work, culture and adaptation",
      "AZN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 61
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 788
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1750
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Azerbaijan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Azerbaijani creates a clear language and integration profile.",
        "Baku works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 74,
      "englishFriendliness": 50,
      "safetyScore": 71,
      "averageMonthlyBudget": 1750
    }
  },
  {
    "slug": "bahamas",
    "name": "Bahamas",
    "emoji": "🇧🇸",
    "region": "North America",
    "language": "English",
    "currency": "Bahamian Dollar (BSD)",
    "currencyCode": "BSD",
    "capital": "Nassau",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Bahamas through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "BSD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 36
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 70
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 900
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2000
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Bahamas is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Nassau works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 71,
      "englishFriendliness": 67,
      "safetyScore": 65,
      "averageMonthlyBudget": 2000
    }
  },
  {
    "slug": "bahrain",
    "name": "Bahrain",
    "emoji": "🇧🇭",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Bahraini Dinar (BHD)",
    "currencyCode": "BHD",
    "capital": "Manama",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Bahrain through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "BHD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 32
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 63
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 810
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1800
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Bahrain is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Manama works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 75,
      "englishFriendliness": 51,
      "safetyScore": 72,
      "averageMonthlyBudget": 1800
    }
  },
  {
    "slug": "bangladesh",
    "name": "Bangladesh",
    "emoji": "🇧🇩",
    "region": "Asia",
    "language": "Bengali",
    "currency": "Bangladeshi Taka (BDT)",
    "currencyCode": "BDT",
    "capital": "Dhaka",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Bengali access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Bangladesh through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Bengali",
      "Asia",
      "Work, culture and adaptation",
      "BDT"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 33
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 65
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 833
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1850
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Bangladesh is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Bengali creates a clear language and integration profile.",
        "Dhaka works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 53,
      "safetyScore": 74,
      "averageMonthlyBudget": 1850
    }
  },
  {
    "slug": "barbados",
    "name": "Barbados",
    "emoji": "🇧🇧",
    "region": "North America",
    "language": "English",
    "currency": "Barbadian Dollar (BBD)",
    "currencyCode": "BBD",
    "capital": "Bridgetown",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Barbados through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "BBD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 43
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 84
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1080
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2400
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 77,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Barbados is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Bridgetown works as the main reference point for national orientation and mobility planning.",
        "TGPI score 77/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 78,
      "safetyScore": 76,
      "averageMonthlyBudget": 2400
    }
  },
  {
    "slug": "belarus",
    "name": "Belarus",
    "emoji": "🇧🇾",
    "region": "Europe",
    "language": "Belarusian / Russian",
    "currency": "Belarusian Ruble (BYN)",
    "currencyCode": "BYN",
    "capital": "Minsk",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Belarusian / Russian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Belarus through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Belarusian",
      "Europe",
      "Study and live abroad",
      "BYN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Belarus is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Belarusian / Russian creates a clear language and integration profile.",
        "Minsk works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 60,
      "safetyScore": 76,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "belgium",
    "name": "Belgium",
    "emoji": "🇧🇪",
    "region": "Europe",
    "language": "Dutch / French / German",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Brussels",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Dutch / French / German access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Belgium through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Dutch",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 46
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 89
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1148
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2550
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 75,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Belgium is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Dutch / French / German creates a clear language and integration profile.",
        "Brussels works as the main reference point for national orientation and mobility planning.",
        "TGPI score 75/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 86,
      "englishFriendliness": 68,
      "safetyScore": 84,
      "averageMonthlyBudget": 2550
    }
  },
  {
    "slug": "belize",
    "name": "Belize",
    "emoji": "🇧🇿",
    "region": "North America",
    "language": "English",
    "currency": "Belize Dollar (BZD)",
    "currencyCode": "BZD",
    "capital": "Belmopan",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Belize through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "BZD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 38
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 74
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 945
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2100
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 71,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Belize is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Belmopan works as the main reference point for national orientation and mobility planning.",
        "TGPI score 71/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 74,
      "englishFriendliness": 70,
      "safetyScore": 68,
      "averageMonthlyBudget": 2100
    }
  },
  {
    "slug": "benin",
    "name": "Benin",
    "emoji": "🇧🇯",
    "region": "Africa",
    "language": "French",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Porto-Novo",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Benin through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Benin is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Porto-Novo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 54,
      "safetyScore": 62,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "bhutan",
    "name": "Bhutan",
    "emoji": "🇧🇹",
    "region": "Asia",
    "language": "Dzongkha",
    "currency": "Bhutanese Ngultrum (BTN)",
    "currencyCode": "BTN",
    "capital": "Thimphu",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Dzongkha access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Bhutan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Dzongkha",
      "Asia",
      "Work, culture and adaptation",
      "BTN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 33
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 65
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 833
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1850
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Bhutan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Dzongkha creates a clear language and integration profile.",
        "Thimphu works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 53,
      "safetyScore": 74,
      "averageMonthlyBudget": 1850
    }
  },
  {
    "slug": "bolivia",
    "name": "Bolivia",
    "emoji": "🇧🇴",
    "region": "South America",
    "language": "Spanish",
    "currency": "Boliviano (BOB)",
    "currencyCode": "BOB",
    "capital": "Sucre",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Bolivia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "BOB"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 27
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 53
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 675
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1500
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 65,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Bolivia is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Sucre works as the main reference point for national orientation and mobility planning.",
        "TGPI score 65/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 71,
      "englishFriendliness": 46,
      "safetyScore": 64,
      "averageMonthlyBudget": 1500
    }
  },
  {
    "slug": "bosnia-and-herzegovina",
    "name": "Bosnia and Herzegovina",
    "emoji": "🇧🇦",
    "region": "Europe",
    "language": "Bosnian / Croatian / Serbian",
    "currency": "Convertible Mark (BAM)",
    "currencyCode": "BAM",
    "capital": "Sarajevo",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Bosnian / Croatian / Serbian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Bosnia and Herzegovina through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Bosnian",
      "Europe",
      "Study and live abroad",
      "BAM"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 45
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 88
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1125
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2500
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Bosnia and Herzegovina is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Bosnian / Croatian / Serbian creates a clear language and integration profile.",
        "Sarajevo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 85,
      "englishFriendliness": 67,
      "safetyScore": 83,
      "averageMonthlyBudget": 2500
    }
  },
  {
    "slug": "botswana",
    "name": "Botswana",
    "emoji": "🇧🇼",
    "region": "Africa",
    "language": "English / Setswana",
    "currency": "Botswana Pula (BWP)",
    "currencyCode": "BWP",
    "capital": "Gaborone",
    "mainGoal": "Cultural learning",
    "shortDescription": "English / Setswana access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Botswana through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "BWP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 24
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 47
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 608
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1350
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Botswana is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Setswana creates a clear language and integration profile.",
        "Gaborone works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 53,
      "safetyScore": 61,
      "averageMonthlyBudget": 1350
    }
  },
  {
    "slug": "brazil",
    "name": "Brazil",
    "emoji": "🇧🇷",
    "region": "South America",
    "language": "Portuguese",
    "currency": "Brazilian Real (BRL)",
    "currencyCode": "BRL",
    "capital": "Brasília",
    "mainGoal": "Language and cultural integration",
    "shortDescription": "Portuguese access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Brazil through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Portuguese",
      "South America",
      "Language and cultural integration",
      "BRL"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 11
      },
      {
        "label": "Local Transport Ticket",
        "amount": 14
      },
      {
        "label": "Casual Meal",
        "amount": 63
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 123
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1575
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 3500
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 80,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Brazil is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Portuguese creates a clear language and integration profile.",
        "Brasília works as the main reference point for national orientation and mobility planning.",
        "TGPI score 80/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 74,
      "englishFriendliness": 48,
      "safetyScore": 58,
      "averageMonthlyBudget": 3500
    }
  },
  {
    "slug": "brunei",
    "name": "Brunei",
    "emoji": "🇧🇳",
    "region": "Asia",
    "language": "Malay",
    "currency": "Brunei Dollar (BND)",
    "currencyCode": "BND",
    "capital": "Bandar Seri Begawan",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Malay access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Brunei through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Malay",
      "Asia",
      "Work, culture and adaptation",
      "BND"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Brunei is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Malay creates a clear language and integration profile.",
        "Bandar Seri Begawan works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 80,
      "englishFriendliness": 56,
      "safetyScore": 77,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "bulgaria",
    "name": "Bulgaria",
    "emoji": "🇧🇬",
    "region": "Europe",
    "language": "Bulgarian",
    "currency": "Bulgarian Lev (BGN)",
    "currencyCode": "BGN",
    "capital": "Sofia",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Bulgarian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Bulgaria through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Bulgarian",
      "Europe",
      "Study and live abroad",
      "BGN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 43
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 84
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1080
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2400
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 72,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Bulgaria is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Bulgarian creates a clear language and integration profile.",
        "Sofia works as the main reference point for national orientation and mobility planning.",
        "TGPI score 72/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 64,
      "safetyScore": 80,
      "averageMonthlyBudget": 2400
    }
  },
  {
    "slug": "burkina-faso",
    "name": "Burkina Faso",
    "emoji": "🇧🇫",
    "region": "Africa",
    "language": "French",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Ouagadougou",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Burkina Faso through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Burkina Faso is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Ouagadougou works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 63,
      "englishFriendliness": 51,
      "safetyScore": 59,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "burundi",
    "name": "Burundi",
    "emoji": "🇧🇮",
    "region": "Africa",
    "language": "Kirundi / French / English",
    "currency": "Burundian Franc (BIF)",
    "currencyCode": "BIF",
    "capital": "Gitega",
    "mainGoal": "Cultural learning",
    "shortDescription": "Kirundi / French / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Burundi through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Kirundi",
      "Africa",
      "Cultural learning",
      "BIF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 24
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 47
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 608
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1350
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Burundi is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Kirundi / French / English creates a clear language and integration profile.",
        "Gitega works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 53,
      "safetyScore": 61,
      "averageMonthlyBudget": 1350
    }
  },
  {
    "slug": "cabo-verde",
    "name": "Cabo Verde",
    "emoji": "🇨🇻",
    "region": "Africa",
    "language": "Portuguese",
    "currency": "Cape Verdean Escudo (CVE)",
    "currencyCode": "CVE",
    "capital": "Praia",
    "mainGoal": "Language and cultural integration",
    "shortDescription": "Portuguese access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Cabo Verde through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Portuguese",
      "Africa",
      "Language and cultural integration",
      "CVE"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Cabo Verde is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Portuguese creates a clear language and integration profile.",
        "Praia works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 67,
      "englishFriendliness": 55,
      "safetyScore": 63,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "cambodia",
    "name": "Cambodia",
    "emoji": "🇰🇭",
    "region": "Asia",
    "language": "Khmer",
    "currency": "Cambodian Riel (KHR)",
    "currencyCode": "KHR",
    "capital": "Phnom Penh",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Khmer access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Cambodia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Khmer",
      "Asia",
      "Work, culture and adaptation",
      "KHR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Cambodia is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Khmer creates a clear language and integration profile.",
        "Phnom Penh works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 64,
      "englishFriendliness": 40,
      "safetyScore": 61,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "cameroon",
    "name": "Cameroon",
    "emoji": "🇨🇲",
    "region": "Africa",
    "language": "French / English",
    "currency": "Central African CFA Franc (XAF)",
    "currencyCode": "XAF",
    "capital": "Yaoundé",
    "mainGoal": "Cultural learning",
    "shortDescription": "French / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Cameroon through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XAF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 17
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 33
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 428
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 950
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 59,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Cameroon is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French / English creates a clear language and integration profile.",
        "Yaoundé works as the main reference point for national orientation and mobility planning.",
        "TGPI score 59/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 54,
      "englishFriendliness": 42,
      "safetyScore": 50,
      "averageMonthlyBudget": 950
    }
  },
  {
    "slug": "canada",
    "name": "Canada",
    "emoji": "🇨🇦",
    "region": "North America",
    "language": "English / French",
    "currency": "Canadian Dollar (CAD)",
    "currencyCode": "CAD",
    "capital": "Ottawa",
    "mainGoal": "Work and mobility",
    "shortDescription": "English / French access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Canada through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "CAD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 47
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 91
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1170
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2600
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 91,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Canada is a high-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / French creates a clear language and integration profile.",
        "Ottawa works as the main reference point for national orientation and mobility planning.",
        "TGPI score 91/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 89,
      "englishFriendliness": 92,
      "safetyScore": 88,
      "averageMonthlyBudget": 2600
    }
  },
  {
    "slug": "central-african-republic",
    "name": "Central African Republic",
    "emoji": "🇨🇫",
    "region": "Africa",
    "language": "French / Sango",
    "currency": "Central African CFA Franc (XAF)",
    "currencyCode": "XAF",
    "capital": "Bangui",
    "mainGoal": "Cultural learning",
    "shortDescription": "French / Sango access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Central African Republic through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XAF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Central African Republic is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French / Sango creates a clear language and integration profile.",
        "Bangui works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 56,
      "safetyScore": 64,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "chad",
    "name": "Chad",
    "emoji": "🇹🇩",
    "region": "Africa",
    "language": "French / Arabic",
    "currency": "Central African CFA Franc (XAF)",
    "currencyCode": "XAF",
    "capital": "N'Djamena",
    "mainGoal": "Cultural learning",
    "shortDescription": "French / Arabic access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Chad through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XAF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Chad is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French / Arabic creates a clear language and integration profile.",
        "N'Djamena works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 61,
      "englishFriendliness": 49,
      "safetyScore": 57,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "chile",
    "name": "Chile",
    "emoji": "🇨🇱",
    "region": "South America",
    "language": "Spanish",
    "currency": "Chilean Peso (CLP)",
    "currencyCode": "CLP",
    "capital": "Santiago",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Chile through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "CLP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 24
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 47
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 608
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1350
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 62,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Chile is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Santiago works as the main reference point for national orientation and mobility planning.",
        "TGPI score 62/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 67,
      "englishFriendliness": 42,
      "safetyScore": 60,
      "averageMonthlyBudget": 1350
    }
  },
  {
    "slug": "china",
    "name": "China",
    "emoji": "🇨🇳",
    "region": "Asia",
    "language": "Mandarin Chinese",
    "currency": "Chinese Yuan (CNY)",
    "currencyCode": "CNY",
    "capital": "Beijing",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Mandarin Chinese access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for China through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Mandarin Chinese",
      "Asia",
      "Work, culture and adaptation",
      "CNY"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 29
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 56
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 720
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1600
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 62,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "China is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Mandarin Chinese creates a clear language and integration profile.",
        "Beijing works as the main reference point for national orientation and mobility planning.",
        "TGPI score 62/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 69,
      "englishFriendliness": 45,
      "safetyScore": 66,
      "averageMonthlyBudget": 1600
    }
  },
  {
    "slug": "colombia",
    "name": "Colombia",
    "emoji": "🇨🇴",
    "region": "South America",
    "language": "Spanish",
    "currency": "Colombian Peso (COP)",
    "currencyCode": "COP",
    "capital": "Bogotá",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Colombia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "COP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Colombia is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Bogotá works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 40,
      "safetyScore": 58,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "comoros",
    "name": "Comoros",
    "emoji": "🇰🇲",
    "region": "Africa",
    "language": "Comorian / Arabic / French",
    "currency": "Comorian Franc (KMF)",
    "currencyCode": "KMF",
    "capital": "Moroni",
    "mainGoal": "Cultural learning",
    "shortDescription": "Comorian / Arabic / French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Comoros through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Comorian",
      "Africa",
      "Cultural learning",
      "KMF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 20
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 39
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 495
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1100
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Comoros is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Comorian / Arabic / French creates a clear language and integration profile.",
        "Moroni works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 57,
      "englishFriendliness": 45,
      "safetyScore": 53,
      "averageMonthlyBudget": 1100
    }
  },
  {
    "slug": "congo",
    "name": "Congo",
    "emoji": "🇨🇬",
    "region": "Africa",
    "language": "French",
    "currency": "Central African CFA Franc (XAF)",
    "currencyCode": "XAF",
    "capital": "Brazzaville",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Congo through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XAF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 21
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 40
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 518
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1150
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 63,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Congo is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Brazzaville works as the main reference point for national orientation and mobility planning.",
        "TGPI score 63/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 59,
      "englishFriendliness": 47,
      "safetyScore": 55,
      "averageMonthlyBudget": 1150
    }
  },
  {
    "slug": "costa-rica",
    "name": "Costa Rica",
    "emoji": "🇨🇷",
    "region": "North America",
    "language": "Spanish",
    "currency": "Costa Rican Colón (CRC)",
    "currencyCode": "CRC",
    "capital": "San José",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Costa Rica through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "CRC"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 81
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1035
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2300
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 76,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Costa Rica is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "San José works as the main reference point for national orientation and mobility planning.",
        "TGPI score 76/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 80,
      "englishFriendliness": 76,
      "safetyScore": 74,
      "averageMonthlyBudget": 2300
    }
  },
  {
    "slug": "croatia",
    "name": "Croatia",
    "emoji": "🇭🇷",
    "region": "Europe",
    "language": "Croatian",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Zagreb",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Croatian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Croatia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Croatian",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 45
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 88
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1125
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2500
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Croatia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Croatian creates a clear language and integration profile.",
        "Zagreb works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 84,
      "englishFriendliness": 66,
      "safetyScore": 82,
      "averageMonthlyBudget": 2500
    }
  },
  {
    "slug": "cuba",
    "name": "Cuba",
    "emoji": "🇨🇺",
    "region": "North America",
    "language": "Spanish",
    "currency": "Cuban Peso (CUP)",
    "currencyCode": "CUP",
    "capital": "Havana",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Cuba through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "CUP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 36
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 70
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 900
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2000
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Cuba is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Havana works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 71,
      "englishFriendliness": 67,
      "safetyScore": 65,
      "averageMonthlyBudget": 2000
    }
  },
  {
    "slug": "cyprus",
    "name": "Cyprus",
    "emoji": "🇨🇾",
    "region": "Europe",
    "language": "Greek / Turkish",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Nicosia",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Greek / Turkish access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Cyprus through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Greek",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 96
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1238
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2750
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 79,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Cyprus is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Greek / Turkish creates a clear language and integration profile.",
        "Nicosia works as the main reference point for national orientation and mobility planning.",
        "TGPI score 79/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 91,
      "englishFriendliness": 73,
      "safetyScore": 89,
      "averageMonthlyBudget": 2750
    }
  },
  {
    "slug": "czechia",
    "name": "Czechia",
    "emoji": "🇨🇿",
    "region": "Europe",
    "language": "Czech",
    "currency": "Czech Koruna (CZK)",
    "currencyCode": "CZK",
    "capital": "Prague",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Czech access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Czechia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Czech",
      "Europe",
      "Study and live abroad",
      "CZK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 48
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 93
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1193
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2650
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 77,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Czechia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Czech creates a clear language and integration profile.",
        "Prague works as the main reference point for national orientation and mobility planning.",
        "TGPI score 77/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 89,
      "englishFriendliness": 71,
      "safetyScore": 87,
      "averageMonthlyBudget": 2650
    }
  },
  {
    "slug": "democratic-republic-of-the-congo",
    "name": "Democratic Republic of the Congo",
    "emoji": "🇨🇩",
    "region": "Africa",
    "language": "French",
    "currency": "Congolese Franc (CDF)",
    "currencyCode": "CDF",
    "capital": "Kinshasa",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Democratic Republic of the Congo through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "CDF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Democratic Republic of the Congo is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Kinshasa works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 60,
      "englishFriendliness": 48,
      "safetyScore": 56,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "denmark",
    "name": "Denmark",
    "emoji": "🇩🇰",
    "region": "Europe",
    "language": "Danish",
    "currency": "Danish Krone (DKK)",
    "currencyCode": "DKK",
    "capital": "Copenhagen",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Danish access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Denmark through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Danish",
      "Europe",
      "Study and live abroad",
      "DKK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 44
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 86
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1103
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2450
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Denmark is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Danish creates a clear language and integration profile.",
        "Copenhagen works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 83,
      "englishFriendliness": 65,
      "safetyScore": 81,
      "averageMonthlyBudget": 2450
    }
  },
  {
    "slug": "djibouti",
    "name": "Djibouti",
    "emoji": "🇩🇯",
    "region": "Africa",
    "language": "French / Arabic",
    "currency": "Djiboutian Franc (DJF)",
    "currencyCode": "DJF",
    "capital": "Djibouti",
    "mainGoal": "Cultural learning",
    "shortDescription": "French / Arabic access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Djibouti through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "DJF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Djibouti is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French / Arabic creates a clear language and integration profile.",
        "Djibouti works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 60,
      "englishFriendliness": 48,
      "safetyScore": 56,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "dominica",
    "name": "Dominica",
    "emoji": "🇩🇲",
    "region": "North America",
    "language": "English",
    "currency": "East Caribbean Dollar (XCD)",
    "currencyCode": "XCD",
    "capital": "Roseau",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Dominica through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "XCD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 36
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 70
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 900
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2000
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Dominica is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Roseau works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 71,
      "englishFriendliness": 67,
      "safetyScore": 65,
      "averageMonthlyBudget": 2000
    }
  },
  {
    "slug": "dominican-republic",
    "name": "Dominican Republic",
    "emoji": "🇩🇴",
    "region": "North America",
    "language": "Spanish",
    "currency": "Dominican Peso (DOP)",
    "currencyCode": "DOP",
    "capital": "Santo Domingo",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Dominican Republic through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "DOP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 40
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 77
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 990
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2200
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Dominican Republic is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Santo Domingo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 73,
      "safetyScore": 71,
      "averageMonthlyBudget": 2200
    }
  },
  {
    "slug": "ecuador",
    "name": "Ecuador",
    "emoji": "🇪🇨",
    "region": "South America",
    "language": "Spanish",
    "currency": "United States Dollar (USD)",
    "currencyCode": "USD",
    "capital": "Quito",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Ecuador through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "USD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 63,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Ecuador is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Quito works as the main reference point for national orientation and mobility planning.",
        "TGPI score 63/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 43,
      "safetyScore": 61,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "egypt",
    "name": "Egypt",
    "emoji": "🇪🇬",
    "region": "Africa / Middle East",
    "language": "Arabic",
    "currency": "Egyptian Pound (EGP)",
    "currencyCode": "EGP",
    "capital": "Cairo",
    "mainGoal": "Cultural learning",
    "shortDescription": "Arabic access, Africa / Middle East context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Egypt through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Africa / Middle East",
      "Cultural learning",
      "EGP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 36
      },
      {
        "label": "Local Transport Ticket",
        "amount": 48
      },
      {
        "label": "Casual Meal",
        "amount": 216
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 420
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 5400
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 12000
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 76,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Egypt is a low-cost Africa / Middle East country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Cairo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 76/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 52,
      "safetyScore": 64,
      "averageMonthlyBudget": 12000
    }
  },
  {
    "slug": "el-salvador",
    "name": "El Salvador",
    "emoji": "🇸🇻",
    "region": "North America",
    "language": "Spanish",
    "currency": "United States Dollar (USD)",
    "currencyCode": "USD",
    "capital": "San Salvador",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for El Salvador through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "USD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 40
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 77
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 990
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2200
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "El Salvador is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "San Salvador works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 73,
      "safetyScore": 71,
      "averageMonthlyBudget": 2200
    }
  },
  {
    "slug": "equatorial-guinea",
    "name": "Equatorial Guinea",
    "emoji": "🇬🇶",
    "region": "Africa",
    "language": "Spanish / French / Portuguese",
    "currency": "Central African CFA Franc (XAF)",
    "currencyCode": "XAF",
    "capital": "Malabo",
    "mainGoal": "Language and cultural integration",
    "shortDescription": "Spanish / French / Portuguese access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Equatorial Guinea through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "Africa",
      "Language and cultural integration",
      "XAF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 20
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 39
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 495
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1100
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 62,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Equatorial Guinea is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish / French / Portuguese creates a clear language and integration profile.",
        "Malabo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 62/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 58,
      "englishFriendliness": 46,
      "safetyScore": 54,
      "averageMonthlyBudget": 1100
    }
  },
  {
    "slug": "eritrea",
    "name": "Eritrea",
    "emoji": "🇪🇷",
    "region": "Africa",
    "language": "Tigrinya / Arabic / English",
    "currency": "Eritrean Nakfa (ERN)",
    "currencyCode": "ERN",
    "capital": "Asmara",
    "mainGoal": "Cultural learning",
    "shortDescription": "Tigrinya / Arabic / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Eritrea through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Tigrinya",
      "Africa",
      "Cultural learning",
      "ERN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 16
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 32
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 405
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 900
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Eritrea is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Tigrinya / Arabic / English creates a clear language and integration profile.",
        "Asmara works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 52,
      "englishFriendliness": 40,
      "safetyScore": 48,
      "averageMonthlyBudget": 900
    }
  },
  {
    "slug": "estonia",
    "name": "Estonia",
    "emoji": "🇪🇪",
    "region": "Europe",
    "language": "Estonian",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Tallinn",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Estonian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Estonia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Estonian",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 44
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 86
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1103
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2450
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Estonia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Estonian creates a clear language and integration profile.",
        "Tallinn works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 83,
      "englishFriendliness": 65,
      "safetyScore": 81,
      "averageMonthlyBudget": 2450
    }
  },
  {
    "slug": "eswatini",
    "name": "Eswatini",
    "emoji": "🇸🇿",
    "region": "Africa",
    "language": "Swazi / English",
    "currency": "Swazi Lilangeni (SZL)",
    "currencyCode": "SZL",
    "capital": "Mbabane",
    "mainGoal": "Cultural learning",
    "shortDescription": "Swazi / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Eswatini through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Swazi",
      "Africa",
      "Cultural learning",
      "SZL"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 17
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 33
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 428
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 950
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Eswatini is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Swazi / English creates a clear language and integration profile.",
        "Mbabane works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 53,
      "englishFriendliness": 41,
      "safetyScore": 49,
      "averageMonthlyBudget": 950
    }
  },
  {
    "slug": "ethiopia",
    "name": "Ethiopia",
    "emoji": "🇪🇹",
    "region": "Africa",
    "language": "Amharic",
    "currency": "Ethiopian Birr (ETB)",
    "currencyCode": "ETB",
    "capital": "Addis Ababa",
    "mainGoal": "Cultural learning",
    "shortDescription": "Amharic access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Ethiopia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Amharic",
      "Africa",
      "Cultural learning",
      "ETB"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 17
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 33
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 428
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 950
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Ethiopia is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Amharic creates a clear language and integration profile.",
        "Addis Ababa works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 53,
      "englishFriendliness": 41,
      "safetyScore": 49,
      "averageMonthlyBudget": 950
    }
  },
  {
    "slug": "fiji",
    "name": "Fiji",
    "emoji": "🇫🇯",
    "region": "Oceania",
    "language": "English / Fijian / Hindi",
    "currency": "Fijian Dollar (FJD)",
    "currencyCode": "FJD",
    "capital": "Suva",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "English / Fijian / Hindi access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Fiji through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Oceania",
      "Study, work and lifestyle",
      "FJD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 48
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 93
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1193
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2650
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Fiji is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Fijian / Hindi creates a clear language and integration profile.",
        "Suva works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 77,
      "safetyScore": 80,
      "averageMonthlyBudget": 2650
    }
  },
  {
    "slug": "finland",
    "name": "Finland",
    "emoji": "🇫🇮",
    "region": "Europe",
    "language": "Finnish / Swedish",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Helsinki",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Finnish / Swedish access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Finland through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Finnish",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Finland is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Finnish / Swedish creates a clear language and integration profile.",
        "Helsinki works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 59,
      "safetyScore": 75,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "france",
    "name": "France",
    "emoji": "🇫🇷",
    "region": "Europe",
    "language": "French",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Paris",
    "mainGoal": "Study and live abroad",
    "shortDescription": "French access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for France through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 81
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1035
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2300
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 86,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "France is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Paris works as the main reference point for national orientation and mobility planning.",
        "TGPI score 86/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 86,
      "englishFriendliness": 60,
      "safetyScore": 76,
      "averageMonthlyBudget": 2300
    }
  },
  {
    "slug": "gabon",
    "name": "Gabon",
    "emoji": "🇬🇦",
    "region": "Africa",
    "language": "French",
    "currency": "Central African CFA Franc (XAF)",
    "currencyCode": "XAF",
    "capital": "Libreville",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Gabon through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XAF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Gabon is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Libreville works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 61,
      "englishFriendliness": 49,
      "safetyScore": 57,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "gambia",
    "name": "Gambia",
    "emoji": "🇬🇲",
    "region": "Africa",
    "language": "English",
    "currency": "Gambian Dalasi (GMD)",
    "currencyCode": "GMD",
    "capital": "Banjul",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Gambia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "GMD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Gambia is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Banjul works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 54,
      "safetyScore": 62,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "georgia",
    "name": "Georgia",
    "emoji": "🇬🇪",
    "region": "Asia / Europe",
    "language": "Georgian",
    "currency": "Georgian Lari (GEL)",
    "currencyCode": "GEL",
    "capital": "Tbilisi",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Georgian access, Asia / Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Georgia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Georgian",
      "Asia / Europe",
      "Study and live abroad",
      "GEL"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 63,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Georgia is a medium-cost Asia / Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Georgian creates a clear language and integration profile.",
        "Tbilisi works as the main reference point for national orientation and mobility planning.",
        "TGPI score 63/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 67,
      "englishFriendliness": 43,
      "safetyScore": 62,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "germany",
    "name": "Germany",
    "emoji": "🇩🇪",
    "region": "Europe",
    "language": "German",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Berlin",
    "mainGoal": "Study and live abroad",
    "shortDescription": "German access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Germany through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "German",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 81
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1035
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2300
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 89,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Germany is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "German creates a clear language and integration profile.",
        "Berlin works as the main reference point for national orientation and mobility planning.",
        "TGPI score 89/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 88,
      "englishFriendliness": 76,
      "safetyScore": 84,
      "averageMonthlyBudget": 2300
    }
  },
  {
    "slug": "ghana",
    "name": "Ghana",
    "emoji": "🇬🇭",
    "region": "Africa",
    "language": "English",
    "currency": "Ghanaian Cedi (GHS)",
    "currencyCode": "GHS",
    "capital": "Accra",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Ghana through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "GHS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 17
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 33
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 428
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 950
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Ghana is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Accra works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 53,
      "englishFriendliness": 41,
      "safetyScore": 49,
      "averageMonthlyBudget": 950
    }
  },
  {
    "slug": "greece",
    "name": "Greece",
    "emoji": "🇬🇷",
    "region": "Europe",
    "language": "Greek",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Athens",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Greek access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Greece through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Greek",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 44
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 86
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1103
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2450
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Greece is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Greek creates a clear language and integration profile.",
        "Athens works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 83,
      "englishFriendliness": 65,
      "safetyScore": 81,
      "averageMonthlyBudget": 2450
    }
  },
  {
    "slug": "grenada",
    "name": "Grenada",
    "emoji": "🇬🇩",
    "region": "North America",
    "language": "English",
    "currency": "East Caribbean Dollar (XCD)",
    "currencyCode": "XCD",
    "capital": "St. George's",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Grenada through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "XCD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 40
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 77
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 990
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2200
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Grenada is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "St. George's works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 76,
      "englishFriendliness": 72,
      "safetyScore": 70,
      "averageMonthlyBudget": 2200
    }
  },
  {
    "slug": "guatemala",
    "name": "Guatemala",
    "emoji": "🇬🇹",
    "region": "North America",
    "language": "Spanish",
    "currency": "Guatemalan Quetzal (GTQ)",
    "currencyCode": "GTQ",
    "capital": "Guatemala City",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Guatemala through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "GTQ"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Guatemala is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Guatemala City works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 74,
      "safetyScore": 72,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "guinea",
    "name": "Guinea",
    "emoji": "🇬🇳",
    "region": "Africa",
    "language": "French",
    "currency": "Guinean Franc (GNF)",
    "currencyCode": "GNF",
    "capital": "Conakry",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Guinea through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "GNF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 19
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 37
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 473
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1050
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Guinea is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Conakry works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 56,
      "englishFriendliness": 44,
      "safetyScore": 52,
      "averageMonthlyBudget": 1050
    }
  },
  {
    "slug": "guinea-bissau",
    "name": "Guinea-Bissau",
    "emoji": "🇬🇼",
    "region": "Africa",
    "language": "Portuguese",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Bissau",
    "mainGoal": "Language and cultural integration",
    "shortDescription": "Portuguese access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Guinea-Bissau through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Portuguese",
      "Africa",
      "Language and cultural integration",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Guinea-Bissau is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Portuguese creates a clear language and integration profile.",
        "Bissau works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 56,
      "safetyScore": 64,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "guyana",
    "name": "Guyana",
    "emoji": "🇬🇾",
    "region": "South America",
    "language": "English",
    "currency": "Guyanese Dollar (GYD)",
    "currencyCode": "GYD",
    "capital": "Georgetown",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Guyana through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "South America",
      "Cultural learning",
      "GYD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 30
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 58
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 743
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1650
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Guyana is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Georgetown works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 76,
      "englishFriendliness": 51,
      "safetyScore": 69,
      "averageMonthlyBudget": 1650
    }
  },
  {
    "slug": "haiti",
    "name": "Haiti",
    "emoji": "🇭🇹",
    "region": "North America",
    "language": "Haitian Creole / French",
    "currency": "Haitian Gourde (HTG)",
    "currencyCode": "HTG",
    "capital": "Port-au-Prince",
    "mainGoal": "Work and mobility",
    "shortDescription": "Haitian Creole / French access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Haiti through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Haitian Creole",
      "North America",
      "Work and mobility",
      "HTG"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 34
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 67
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 855
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1900
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Haiti is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Haitian Creole / French creates a clear language and integration profile.",
        "Port-au-Prince works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 64,
      "safetyScore": 62,
      "averageMonthlyBudget": 1900
    }
  },
  {
    "slug": "honduras",
    "name": "Honduras",
    "emoji": "🇭🇳",
    "region": "North America",
    "language": "Spanish",
    "currency": "Honduran Lempira (HNL)",
    "currencyCode": "HNL",
    "capital": "Tegucigalpa",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Honduras through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "HNL"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Honduras is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Tegucigalpa works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 69,
      "englishFriendliness": 65,
      "safetyScore": 63,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "hungary",
    "name": "Hungary",
    "emoji": "🇭🇺",
    "region": "Europe",
    "language": "Hungarian",
    "currency": "Hungarian Forint (HUF)",
    "currencyCode": "HUF",
    "capital": "Budapest",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Hungarian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Hungary through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Hungarian",
      "Europe",
      "Study and live abroad",
      "HUF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Hungary is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Hungarian creates a clear language and integration profile.",
        "Budapest works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 59,
      "safetyScore": 75,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "iceland",
    "name": "Iceland",
    "emoji": "🇮🇸",
    "region": "Europe",
    "language": "Icelandic",
    "currency": "Icelandic Króna (ISK)",
    "currencyCode": "ISK",
    "capital": "Reykjavík",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Icelandic access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Iceland through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Icelandic",
      "Europe",
      "Study and live abroad",
      "ISK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 43
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 84
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1080
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2400
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 72,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Iceland is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Icelandic creates a clear language and integration profile.",
        "Reykjavík works as the main reference point for national orientation and mobility planning.",
        "TGPI score 72/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 64,
      "safetyScore": 80,
      "averageMonthlyBudget": 2400
    }
  },
  {
    "slug": "india",
    "name": "India",
    "emoji": "🇮🇳",
    "region": "Asia",
    "language": "Hindi / English",
    "currency": "Indian Rupee (INR)",
    "currencyCode": "INR",
    "capital": "New Delhi",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Hindi / English access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for India through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Hindi",
      "Asia",
      "Work, culture and adaptation",
      "INR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 30
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 58
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 743
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1650
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 63,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study",
      "live"
    ],
    "intelligence": {
      "summary": "India is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Hindi / English creates a clear language and integration profile.",
        "New Delhi works as the main reference point for national orientation and mobility planning.",
        "TGPI score 63/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 71,
      "englishFriendliness": 47,
      "safetyScore": 68,
      "averageMonthlyBudget": 1650
    }
  },
  {
    "slug": "indonesia",
    "name": "Indonesia",
    "emoji": "🇮🇩",
    "region": "Asia",
    "language": "Indonesian",
    "currency": "Indonesian Rupiah (IDR)",
    "currencyCode": "IDR",
    "capital": "Jakarta",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Indonesian access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Indonesia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Indonesian",
      "Asia",
      "Work, culture and adaptation",
      "IDR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Indonesia is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Indonesian creates a clear language and integration profile.",
        "Jakarta works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 42,
      "safetyScore": 63,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "iran",
    "name": "Iran",
    "emoji": "🇮🇷",
    "region": "Asia",
    "language": "Persian",
    "currency": "Iranian Rial (IRR)",
    "currencyCode": "IRR",
    "capital": "Tehran",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Persian access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Iran through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Persian",
      "Asia",
      "Work, culture and adaptation",
      "IRR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 59,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Iran is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Persian creates a clear language and integration profile.",
        "Tehran works as the main reference point for national orientation and mobility planning.",
        "TGPI score 59/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 41,
      "safetyScore": 62,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "iraq",
    "name": "Iraq",
    "emoji": "🇮🇶",
    "region": "Asia",
    "language": "Arabic / Kurdish",
    "currency": "Iraqi Dinar (IQD)",
    "currencyCode": "IQD",
    "capital": "Baghdad",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic / Kurdish access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Iraq through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "IQD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 28
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 54
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 698
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1550
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Iraq is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic / Kurdish creates a clear language and integration profile.",
        "Baghdad works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 44,
      "safetyScore": 65,
      "averageMonthlyBudget": 1550
    }
  },
  {
    "slug": "ireland",
    "name": "Ireland",
    "emoji": "🇮🇪",
    "region": "Europe",
    "language": "English / Irish",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Dublin",
    "mainGoal": "Study and live abroad",
    "shortDescription": "English / Irish access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Ireland through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 42
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 82
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1058
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2350
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Ireland is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Irish creates a clear language and integration profile.",
        "Dublin works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 80,
      "englishFriendliness": 62,
      "safetyScore": 78,
      "averageMonthlyBudget": 2350
    }
  },
  {
    "slug": "israel",
    "name": "Israel",
    "emoji": "🇮🇱",
    "region": "Asia",
    "language": "Hebrew / Arabic",
    "currency": "Israeli New Shekel (ILS)",
    "currencyCode": "ILS",
    "capital": "Jerusalem",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Hebrew / Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Israel through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Hebrew",
      "Asia",
      "Work, culture and adaptation",
      "ILS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 32
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 63
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 810
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1800
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Israel is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Hebrew / Arabic creates a clear language and integration profile.",
        "Jerusalem works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 75,
      "englishFriendliness": 51,
      "safetyScore": 72,
      "averageMonthlyBudget": 1800
    }
  },
  {
    "slug": "italy",
    "name": "Italy",
    "emoji": "🇮🇹",
    "region": "Europe",
    "language": "Italian",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Rome",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Italian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Italy through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Italian",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 81
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1035
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2300
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Italy is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Italian creates a clear language and integration profile.",
        "Rome works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 79,
      "englishFriendliness": 61,
      "safetyScore": 77,
      "averageMonthlyBudget": 2300
    }
  },
  {
    "slug": "ivory-coast",
    "name": "Ivory Coast",
    "emoji": "🇨🇮",
    "region": "Africa",
    "language": "French",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Yamoussoukro",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Ivory Coast through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 24
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 47
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 608
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1350
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Ivory Coast is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Yamoussoukro works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 53,
      "safetyScore": 61,
      "averageMonthlyBudget": 1350
    }
  },
  {
    "slug": "jamaica",
    "name": "Jamaica",
    "emoji": "🇯🇲",
    "region": "North America",
    "language": "English",
    "currency": "Jamaican Dollar (JMD)",
    "currencyCode": "JMD",
    "capital": "Kingston",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Jamaica through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "JMD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 42
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 82
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1058
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2350
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 76,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Jamaica is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Kingston works as the main reference point for national orientation and mobility planning.",
        "TGPI score 76/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 81,
      "englishFriendliness": 77,
      "safetyScore": 75,
      "averageMonthlyBudget": 2350
    }
  },
  {
    "slug": "japan",
    "name": "Japan",
    "emoji": "🇯🇵",
    "region": "Asia",
    "language": "Japanese",
    "currency": "Japanese Yen (JPY)",
    "currencyCode": "JPY",
    "capital": "Tokyo",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Japanese access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Japan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Japanese",
      "Asia",
      "Work, culture and adaptation",
      "JPY"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 540
      },
      {
        "label": "Local Transport Ticket",
        "amount": 720
      },
      {
        "label": "Casual Meal",
        "amount": 3240
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 6300
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 81000
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 180000
      }
    ],
    "costLevel": "high",
    "difficulty": "hard",
    "tgpiScore": 91,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Japan is a high-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Japanese creates a clear language and integration profile.",
        "Tokyo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 91/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 92,
      "englishFriendliness": 55,
      "safetyScore": 94,
      "averageMonthlyBudget": 180000
    }
  },
  {
    "slug": "jordan",
    "name": "Jordan",
    "emoji": "🇯🇴",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Jordanian Dinar (JOD)",
    "currencyCode": "JOD",
    "capital": "Amman",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Jordan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "JOD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 65,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Jordan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Amman works as the main reference point for national orientation and mobility planning.",
        "TGPI score 65/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 73,
      "englishFriendliness": 49,
      "safetyScore": 70,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "kazakhstan",
    "name": "Kazakhstan",
    "emoji": "🇰🇿",
    "region": "Asia",
    "language": "Kazakh / Russian",
    "currency": "Kazakhstani Tenge (KZT)",
    "currencyCode": "KZT",
    "capital": "Astana",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Kazakh / Russian access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Kazakhstan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Kazakh",
      "Asia",
      "Work, culture and adaptation",
      "KZT"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 59,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Kazakhstan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Kazakh / Russian creates a clear language and integration profile.",
        "Astana works as the main reference point for national orientation and mobility planning.",
        "TGPI score 59/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 41,
      "safetyScore": 62,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "kenya",
    "name": "Kenya",
    "emoji": "🇰🇪",
    "region": "Africa",
    "language": "Swahili / English",
    "currency": "Kenyan Shilling (KES)",
    "currencyCode": "KES",
    "capital": "Nairobi",
    "mainGoal": "Cultural learning",
    "shortDescription": "Swahili / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Kenya through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Swahili",
      "Africa",
      "Cultural learning",
      "KES"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Kenya is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Swahili / English creates a clear language and integration profile.",
        "Nairobi works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 61,
      "englishFriendliness": 49,
      "safetyScore": 57,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "kiribati",
    "name": "Kiribati",
    "emoji": "🇰🇮",
    "region": "Oceania",
    "language": "English / Gilbertese",
    "currency": "Australian Dollar (AUD)",
    "currencyCode": "AUD",
    "capital": "Tarawa",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "English / Gilbertese access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Kiribati through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Oceania",
      "Study, work and lifestyle",
      "AUD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 50
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 98
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1260
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2800
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 77,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Kiribati is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Gilbertese creates a clear language and integration profile.",
        "Tarawa works as the main reference point for national orientation and mobility planning.",
        "TGPI score 77/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 86,
      "englishFriendliness": 81,
      "safetyScore": 84,
      "averageMonthlyBudget": 2800
    }
  },
  {
    "slug": "kuwait",
    "name": "Kuwait",
    "emoji": "🇰🇼",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Kuwaiti Dinar (KWD)",
    "currencyCode": "KWD",
    "capital": "Kuwait City",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Kuwait through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "KWD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Kuwait is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Kuwait City works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 79,
      "englishFriendliness": 55,
      "safetyScore": 76,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "kyrgyzstan",
    "name": "Kyrgyzstan",
    "emoji": "🇰🇬",
    "region": "Asia",
    "language": "Kyrgyz / Russian",
    "currency": "Kyrgyzstani Som (KGS)",
    "currencyCode": "KGS",
    "capital": "Bishkek",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Kyrgyz / Russian access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Kyrgyzstan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Kyrgyz",
      "Asia",
      "Work, culture and adaptation",
      "KGS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 28
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 54
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 698
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1550
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Kyrgyzstan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Kyrgyz / Russian creates a clear language and integration profile.",
        "Bishkek works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 44,
      "safetyScore": 65,
      "averageMonthlyBudget": 1550
    }
  },
  {
    "slug": "laos",
    "name": "Laos",
    "emoji": "🇱🇦",
    "region": "Asia",
    "language": "Lao",
    "currency": "Lao Kip (LAK)",
    "currencyCode": "LAK",
    "capital": "Vientiane",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Lao access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Laos through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Lao",
      "Asia",
      "Work, culture and adaptation",
      "LAK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 29
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 56
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 720
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1600
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 63,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Laos is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Lao creates a clear language and integration profile.",
        "Vientiane works as the main reference point for national orientation and mobility planning.",
        "TGPI score 63/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 70,
      "englishFriendliness": 46,
      "safetyScore": 67,
      "averageMonthlyBudget": 1600
    }
  },
  {
    "slug": "latvia",
    "name": "Latvia",
    "emoji": "🇱🇻",
    "region": "Europe",
    "language": "Latvian",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Riga",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Latvian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Latvia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Latvian",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 47
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 91
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1170
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2600
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 76,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Latvia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Latvian creates a clear language and integration profile.",
        "Riga works as the main reference point for national orientation and mobility planning.",
        "TGPI score 76/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 88,
      "englishFriendliness": 70,
      "safetyScore": 86,
      "averageMonthlyBudget": 2600
    }
  },
  {
    "slug": "lebanon",
    "name": "Lebanon",
    "emoji": "🇱🇧",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Lebanese Pound (LBP)",
    "currencyCode": "LBP",
    "capital": "Beirut",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Lebanon through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "LBP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 28
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 54
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 698
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1550
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Lebanon is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Beirut works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 44,
      "safetyScore": 65,
      "averageMonthlyBudget": 1550
    }
  },
  {
    "slug": "lesotho",
    "name": "Lesotho",
    "emoji": "🇱🇸",
    "region": "Africa",
    "language": "Sesotho / English",
    "currency": "Lesotho Loti (LSL)",
    "currencyCode": "LSL",
    "capital": "Maseru",
    "mainGoal": "Cultural learning",
    "shortDescription": "Sesotho / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Lesotho through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Sesotho",
      "Africa",
      "Cultural learning",
      "LSL"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 17
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 33
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 428
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 950
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Lesotho is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Sesotho / English creates a clear language and integration profile.",
        "Maseru works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 53,
      "englishFriendliness": 41,
      "safetyScore": 49,
      "averageMonthlyBudget": 950
    }
  },
  {
    "slug": "liberia",
    "name": "Liberia",
    "emoji": "🇱🇷",
    "region": "Africa",
    "language": "English",
    "currency": "Liberian Dollar (LRD)",
    "currencyCode": "LRD",
    "capital": "Monrovia",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Liberia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "LRD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Liberia is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Monrovia works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 54,
      "safetyScore": 62,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "libya",
    "name": "Libya",
    "emoji": "🇱🇾",
    "region": "Africa",
    "language": "Arabic",
    "currency": "Libyan Dinar (LYD)",
    "currencyCode": "LYD",
    "capital": "Tripoli",
    "mainGoal": "Cultural learning",
    "shortDescription": "Arabic access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Libya through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Africa",
      "Cultural learning",
      "LYD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 17
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 33
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 428
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 950
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 59,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Libya is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Tripoli works as the main reference point for national orientation and mobility planning.",
        "TGPI score 59/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 54,
      "englishFriendliness": 42,
      "safetyScore": 50,
      "averageMonthlyBudget": 950
    }
  },
  {
    "slug": "liechtenstein",
    "name": "Liechtenstein",
    "emoji": "🇱🇮",
    "region": "Europe",
    "language": "German",
    "currency": "Swiss Franc (CHF)",
    "currencyCode": "CHF",
    "capital": "Vaduz",
    "mainGoal": "Study and live abroad",
    "shortDescription": "German access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Liechtenstein through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "German",
      "Europe",
      "Study and live abroad",
      "CHF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 95
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1215
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2700
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 78,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Liechtenstein is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "German creates a clear language and integration profile.",
        "Vaduz works as the main reference point for national orientation and mobility planning.",
        "TGPI score 78/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 90,
      "englishFriendliness": 72,
      "safetyScore": 88,
      "averageMonthlyBudget": 2700
    }
  },
  {
    "slug": "lithuania",
    "name": "Lithuania",
    "emoji": "🇱🇹",
    "region": "Europe",
    "language": "Lithuanian",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Vilnius",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Lithuanian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Lithuania through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Lithuanian",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 44
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 86
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1103
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2450
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Lithuania is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Lithuanian creates a clear language and integration profile.",
        "Vilnius works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 83,
      "englishFriendliness": 65,
      "safetyScore": 81,
      "averageMonthlyBudget": 2450
    }
  },
  {
    "slug": "luxembourg",
    "name": "Luxembourg",
    "emoji": "🇱🇺",
    "region": "Europe",
    "language": "Luxembourgish / French / German",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Luxembourg",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Luxembourgish / French / German access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Luxembourg through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Luxembourgish",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 46
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 89
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1148
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2550
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 75,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Luxembourg is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Luxembourgish / French / German creates a clear language and integration profile.",
        "Luxembourg works as the main reference point for national orientation and mobility planning.",
        "TGPI score 75/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 86,
      "englishFriendliness": 68,
      "safetyScore": 84,
      "averageMonthlyBudget": 2550
    }
  },
  {
    "slug": "madagascar",
    "name": "Madagascar",
    "emoji": "🇲🇬",
    "region": "Africa",
    "language": "Malagasy / French",
    "currency": "Malagasy Ariary (MGA)",
    "currencyCode": "MGA",
    "capital": "Antananarivo",
    "mainGoal": "Cultural learning",
    "shortDescription": "Malagasy / French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Madagascar through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Malagasy",
      "Africa",
      "Cultural learning",
      "MGA"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Madagascar is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Malagasy / French creates a clear language and integration profile.",
        "Antananarivo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 60,
      "englishFriendliness": 48,
      "safetyScore": 56,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "malawi",
    "name": "Malawi",
    "emoji": "🇲🇼",
    "region": "Africa",
    "language": "English / Chichewa",
    "currency": "Malawian Kwacha (MWK)",
    "currencyCode": "MWK",
    "capital": "Lilongwe",
    "mainGoal": "Cultural learning",
    "shortDescription": "English / Chichewa access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Malawi through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "MWK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 20
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 39
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 495
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1100
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 62,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Malawi is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Chichewa creates a clear language and integration profile.",
        "Lilongwe works as the main reference point for national orientation and mobility planning.",
        "TGPI score 62/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 58,
      "englishFriendliness": 46,
      "safetyScore": 54,
      "averageMonthlyBudget": 1100
    }
  },
  {
    "slug": "malaysia",
    "name": "Malaysia",
    "emoji": "🇲🇾",
    "region": "Asia",
    "language": "Malay",
    "currency": "Malaysian Ringgit (MYR)",
    "currencyCode": "MYR",
    "capital": "Kuala Lumpur",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Malay access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Malaysia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Malay",
      "Asia",
      "Work, culture and adaptation",
      "MYR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Malaysia is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Malay creates a clear language and integration profile.",
        "Kuala Lumpur works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 80,
      "englishFriendliness": 56,
      "safetyScore": 77,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "maldives",
    "name": "Maldives",
    "emoji": "🇲🇻",
    "region": "Asia",
    "language": "Dhivehi",
    "currency": "Maldivian Rufiyaa (MVR)",
    "currencyCode": "MVR",
    "capital": "Malé",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Dhivehi access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Maldives through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Dhivehi",
      "Asia",
      "Work, culture and adaptation",
      "MVR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 27
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 53
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 675
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1500
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Maldives is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Dhivehi creates a clear language and integration profile.",
        "Malé works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 67,
      "englishFriendliness": 43,
      "safetyScore": 64,
      "averageMonthlyBudget": 1500
    }
  },
  {
    "slug": "mali",
    "name": "Mali",
    "emoji": "🇲🇱",
    "region": "Africa",
    "language": "French",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Bamako",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Mali through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Mali is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Bamako works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 63,
      "englishFriendliness": 51,
      "safetyScore": 59,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "malta",
    "name": "Malta",
    "emoji": "🇲🇹",
    "region": "Europe",
    "language": "Maltese / English",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Valletta",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Maltese / English access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Malta through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Maltese",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 40
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 77
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 990
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2200
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Malta is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Maltese / English creates a clear language and integration profile.",
        "Valletta works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 76,
      "englishFriendliness": 58,
      "safetyScore": 74,
      "averageMonthlyBudget": 2200
    }
  },
  {
    "slug": "marshall-islands",
    "name": "Marshall Islands",
    "emoji": "🇲🇭",
    "region": "Oceania",
    "language": "Marshallese / English",
    "currency": "United States Dollar (USD)",
    "currencyCode": "USD",
    "capital": "Majuro",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "Marshallese / English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Marshall Islands through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Marshallese",
      "Oceania",
      "Study, work and lifestyle",
      "USD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 9
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 51
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 100
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1283
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2850
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 78,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Marshall Islands is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Marshallese / English creates a clear language and integration profile.",
        "Majuro works as the main reference point for national orientation and mobility planning.",
        "TGPI score 78/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 87,
      "englishFriendliness": 82,
      "safetyScore": 85,
      "averageMonthlyBudget": 2850
    }
  },
  {
    "slug": "mauritania",
    "name": "Mauritania",
    "emoji": "🇲🇷",
    "region": "Africa",
    "language": "Arabic",
    "currency": "Mauritanian Ouguiya (MRU)",
    "currencyCode": "MRU",
    "capital": "Nouakchott",
    "mainGoal": "Cultural learning",
    "shortDescription": "Arabic access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Mauritania through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Africa",
      "Cultural learning",
      "MRU"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 24
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 47
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 608
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1350
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Mauritania is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Nouakchott works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 53,
      "safetyScore": 61,
      "averageMonthlyBudget": 1350
    }
  },
  {
    "slug": "mauritius",
    "name": "Mauritius",
    "emoji": "🇲🇺",
    "region": "Africa",
    "language": "English / French",
    "currency": "Mauritian Rupee (MUR)",
    "currencyCode": "MUR",
    "capital": "Port Louis",
    "mainGoal": "Cultural learning",
    "shortDescription": "English / French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Mauritius through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "MUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Mauritius is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / French creates a clear language and integration profile.",
        "Port Louis works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 61,
      "englishFriendliness": 49,
      "safetyScore": 57,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "mexico",
    "name": "Mexico",
    "emoji": "🇲🇽",
    "region": "North America",
    "language": "Spanish",
    "currency": "Mexican Peso (MXN)",
    "currencyCode": "MXN",
    "capital": "Mexico City",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Mexico through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "MXN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 44
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 86
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1103
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2450
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 79,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Mexico is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Mexico City works as the main reference point for national orientation and mobility planning.",
        "TGPI score 79/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 84,
      "englishFriendliness": 80,
      "safetyScore": 78,
      "averageMonthlyBudget": 2450
    }
  },
  {
    "slug": "micronesia",
    "name": "Micronesia",
    "emoji": "🇫🇲",
    "region": "Oceania",
    "language": "English",
    "currency": "United States Dollar (USD)",
    "currencyCode": "USD",
    "capital": "Palikir",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Micronesia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Oceania",
      "Study, work and lifestyle",
      "USD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 95
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1215
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2700
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 76,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Micronesia is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Palikir works as the main reference point for national orientation and mobility planning.",
        "TGPI score 76/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 84,
      "englishFriendliness": 79,
      "safetyScore": 82,
      "averageMonthlyBudget": 2700
    }
  },
  {
    "slug": "moldova",
    "name": "Moldova",
    "emoji": "🇲🇩",
    "region": "Europe",
    "language": "Romanian",
    "currency": "Moldovan Leu (MDL)",
    "currencyCode": "MDL",
    "capital": "Chișinău",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Romanian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Moldova through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Romanian",
      "Europe",
      "Study and live abroad",
      "MDL"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 43
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 84
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1080
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2400
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 72,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Moldova is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Romanian creates a clear language and integration profile.",
        "Chișinău works as the main reference point for national orientation and mobility planning.",
        "TGPI score 72/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 64,
      "safetyScore": 80,
      "averageMonthlyBudget": 2400
    }
  },
  {
    "slug": "monaco",
    "name": "Monaco",
    "emoji": "🇲🇨",
    "region": "Europe",
    "language": "French",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Monaco",
    "mainGoal": "Study and live abroad",
    "shortDescription": "French access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Monaco through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 45
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 88
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1125
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2500
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Monaco is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Monaco works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 84,
      "englishFriendliness": 66,
      "safetyScore": 82,
      "averageMonthlyBudget": 2500
    }
  },
  {
    "slug": "mongolia",
    "name": "Mongolia",
    "emoji": "🇲🇳",
    "region": "Asia",
    "language": "Mongolian",
    "currency": "Mongolian Tögrög (MNT)",
    "currencyCode": "MNT",
    "capital": "Ulaanbaatar",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Mongolian access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Mongolia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Mongolian",
      "Asia",
      "Work, culture and adaptation",
      "MNT"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 28
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 54
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 698
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1550
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Mongolia is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Mongolian creates a clear language and integration profile.",
        "Ulaanbaatar works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 44,
      "safetyScore": 65,
      "averageMonthlyBudget": 1550
    }
  },
  {
    "slug": "montenegro",
    "name": "Montenegro",
    "emoji": "🇲🇪",
    "region": "Europe",
    "language": "Montenegrin",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Podgorica",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Montenegrin access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Montenegro through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Montenegrin",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 96
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1238
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2750
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 79,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Montenegro is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Montenegrin creates a clear language and integration profile.",
        "Podgorica works as the main reference point for national orientation and mobility planning.",
        "TGPI score 79/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 91,
      "englishFriendliness": 73,
      "safetyScore": 89,
      "averageMonthlyBudget": 2750
    }
  },
  {
    "slug": "morocco",
    "name": "Morocco",
    "emoji": "🇲🇦",
    "region": "Africa",
    "language": "Arabic / Tamazight",
    "currency": "Moroccan Dirham (MAD)",
    "currencyCode": "MAD",
    "capital": "Rabat",
    "mainGoal": "Cultural learning",
    "shortDescription": "Arabic / Tamazight access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Morocco through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Africa",
      "Cultural learning",
      "MAD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 20
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 39
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 495
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1100
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 62,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Morocco is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic / Tamazight creates a clear language and integration profile.",
        "Rabat works as the main reference point for national orientation and mobility planning.",
        "TGPI score 62/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 58,
      "englishFriendliness": 46,
      "safetyScore": 54,
      "averageMonthlyBudget": 1100
    }
  },
  {
    "slug": "mozambique",
    "name": "Mozambique",
    "emoji": "🇲🇿",
    "region": "Africa",
    "language": "Portuguese",
    "currency": "Mozambican Metical (MZN)",
    "currencyCode": "MZN",
    "capital": "Maputo",
    "mainGoal": "Language and cultural integration",
    "shortDescription": "Portuguese access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Mozambique through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Portuguese",
      "Africa",
      "Language and cultural integration",
      "MZN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Mozambique is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Portuguese creates a clear language and integration profile.",
        "Maputo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 63,
      "englishFriendliness": 51,
      "safetyScore": 59,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "myanmar",
    "name": "Myanmar",
    "emoji": "🇲🇲",
    "region": "Asia",
    "language": "Burmese",
    "currency": "Myanmar Kyat (MMK)",
    "currencyCode": "MMK",
    "capital": "Naypyidaw",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Burmese access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Myanmar through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Burmese",
      "Asia",
      "Work, culture and adaptation",
      "MMK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 65,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Myanmar is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Burmese creates a clear language and integration profile.",
        "Naypyidaw works as the main reference point for national orientation and mobility planning.",
        "TGPI score 65/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 73,
      "englishFriendliness": 49,
      "safetyScore": 70,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "namibia",
    "name": "Namibia",
    "emoji": "🇳🇦",
    "region": "Africa",
    "language": "English",
    "currency": "Namibian Dollar (NAD)",
    "currencyCode": "NAD",
    "capital": "Windhoek",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Namibia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "NAD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 21
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 40
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 518
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1150
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 63,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Namibia is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Windhoek works as the main reference point for national orientation and mobility planning.",
        "TGPI score 63/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 59,
      "englishFriendliness": 47,
      "safetyScore": 55,
      "averageMonthlyBudget": 1150
    }
  },
  {
    "slug": "nauru",
    "name": "Nauru",
    "emoji": "🇳🇷",
    "region": "Oceania",
    "language": "Nauruan / English",
    "currency": "Australian Dollar (AUD)",
    "currencyCode": "AUD",
    "capital": "Yaren",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "Nauruan / English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Nauru through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Nauruan",
      "Oceania",
      "Study, work and lifestyle",
      "AUD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 95
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1215
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2700
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 75,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Nauru is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Nauruan / English creates a clear language and integration profile.",
        "Yaren works as the main reference point for national orientation and mobility planning.",
        "TGPI score 75/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 83,
      "englishFriendliness": 78,
      "safetyScore": 81,
      "averageMonthlyBudget": 2700
    }
  },
  {
    "slug": "nepal",
    "name": "Nepal",
    "emoji": "🇳🇵",
    "region": "Asia",
    "language": "Nepali",
    "currency": "Nepalese Rupee (NPR)",
    "currencyCode": "NPR",
    "capital": "Kathmandu",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Nepali access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Nepal through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Nepali",
      "Asia",
      "Work, culture and adaptation",
      "NPR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 59,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Nepal is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Nepali creates a clear language and integration profile.",
        "Kathmandu works as the main reference point for national orientation and mobility planning.",
        "TGPI score 59/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 65,
      "englishFriendliness": 41,
      "safetyScore": 62,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "netherlands",
    "name": "Netherlands",
    "emoji": "🇳🇱",
    "region": "Europe",
    "language": "Dutch",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Amsterdam",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Dutch access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Netherlands through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Dutch",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 81
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1035
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2300
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Netherlands is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Dutch creates a clear language and integration profile.",
        "Amsterdam works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 79,
      "englishFriendliness": 61,
      "safetyScore": 77,
      "averageMonthlyBudget": 2300
    }
  },
  {
    "slug": "new-zealand",
    "name": "New Zealand",
    "emoji": "🇳🇿",
    "region": "Oceania",
    "language": "English / Māori",
    "currency": "New Zealand Dollar (NZD)",
    "currencyCode": "NZD",
    "capital": "Wellington",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "English / Māori access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for New Zealand through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Oceania",
      "Study, work and lifestyle",
      "NZD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 47
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 91
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1170
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2600
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 90,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "New Zealand is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Māori creates a clear language and integration profile.",
        "Wellington works as the main reference point for national orientation and mobility planning.",
        "TGPI score 90/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 88,
      "englishFriendliness": 94,
      "safetyScore": 90,
      "averageMonthlyBudget": 2600
    }
  },
  {
    "slug": "nicaragua",
    "name": "Nicaragua",
    "emoji": "🇳🇮",
    "region": "North America",
    "language": "Spanish",
    "currency": "Nicaraguan Córdoba (NIO)",
    "currencyCode": "NIO",
    "capital": "Managua",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Nicaragua through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "NIO"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 37
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 72
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 923
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2050
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Nicaragua is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Managua works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 72,
      "englishFriendliness": 68,
      "safetyScore": 66,
      "averageMonthlyBudget": 2050
    }
  },
  {
    "slug": "niger",
    "name": "Niger",
    "emoji": "🇳🇪",
    "region": "Africa",
    "language": "French",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Niamey",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Niger through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 20
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 39
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 495
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1100
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 62,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Niger is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Niamey works as the main reference point for national orientation and mobility planning.",
        "TGPI score 62/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 58,
      "englishFriendliness": 46,
      "safetyScore": 54,
      "averageMonthlyBudget": 1100
    }
  },
  {
    "slug": "nigeria",
    "name": "Nigeria",
    "emoji": "🇳🇬",
    "region": "Africa",
    "language": "English",
    "currency": "Nigerian Naira (NGN)",
    "currencyCode": "NGN",
    "capital": "Abuja",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Nigeria through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "NGN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 19
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 37
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 473
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1050
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Nigeria is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Abuja works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 56,
      "englishFriendliness": 44,
      "safetyScore": 52,
      "averageMonthlyBudget": 1050
    }
  },
  {
    "slug": "north-korea",
    "name": "North Korea",
    "emoji": "🇰🇵",
    "region": "Asia",
    "language": "Korean",
    "currency": "North Korean Won (KPW)",
    "currencyCode": "KPW",
    "capital": "Pyongyang",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Korean access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for North Korea through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Korean",
      "Asia",
      "Work, culture and adaptation",
      "KPW"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "North Korea is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Korean creates a clear language and integration profile.",
        "Pyongyang works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 72,
      "englishFriendliness": 48,
      "safetyScore": 69,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "north-macedonia",
    "name": "North Macedonia",
    "emoji": "🇲🇰",
    "region": "Europe",
    "language": "Macedonian",
    "currency": "Macedonian Denar (MKD)",
    "currencyCode": "MKD",
    "capital": "Skopje",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Macedonian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for North Macedonia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Macedonian",
      "Europe",
      "Study and live abroad",
      "MKD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 96
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1238
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2750
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 80,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "North Macedonia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Macedonian creates a clear language and integration profile.",
        "Skopje works as the main reference point for national orientation and mobility planning.",
        "TGPI score 80/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 92,
      "englishFriendliness": 74,
      "safetyScore": 90,
      "averageMonthlyBudget": 2750
    }
  },
  {
    "slug": "norway",
    "name": "Norway",
    "emoji": "🇳🇴",
    "region": "Europe",
    "language": "Norwegian",
    "currency": "Norwegian Krone (NOK)",
    "currencyCode": "NOK",
    "capital": "Oslo",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Norwegian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Norway through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Norwegian",
      "Europe",
      "Study and live abroad",
      "NOK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 45
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 88
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1125
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2500
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Norway is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Norwegian creates a clear language and integration profile.",
        "Oslo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 85,
      "englishFriendliness": 67,
      "safetyScore": 83,
      "averageMonthlyBudget": 2500
    }
  },
  {
    "slug": "oman",
    "name": "Oman",
    "emoji": "🇴🇲",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Omani Rial (OMR)",
    "currencyCode": "OMR",
    "capital": "Muscat",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Oman through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "OMR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Oman is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Muscat works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 42,
      "safetyScore": 63,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "pakistan",
    "name": "Pakistan",
    "emoji": "🇵🇰",
    "region": "Asia",
    "language": "Urdu / English",
    "currency": "Pakistani Rupee (PKR)",
    "currencyCode": "PKR",
    "capital": "Islamabad",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Urdu / English access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Pakistan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Urdu",
      "Asia",
      "Work, culture and adaptation",
      "PKR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 65,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study",
      "live"
    ],
    "intelligence": {
      "summary": "Pakistan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Urdu / English creates a clear language and integration profile.",
        "Islamabad works as the main reference point for national orientation and mobility planning.",
        "TGPI score 65/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 73,
      "englishFriendliness": 49,
      "safetyScore": 70,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "palau",
    "name": "Palau",
    "emoji": "🇵🇼",
    "region": "Oceania",
    "language": "Palauan / English",
    "currency": "United States Dollar (USD)",
    "currencyCode": "USD",
    "capital": "Ngerulmud",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "Palauan / English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Palau through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Palauan",
      "Oceania",
      "Study, work and lifestyle",
      "USD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 44
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 86
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1103
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2450
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Palau is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Palauan / English creates a clear language and integration profile.",
        "Ngerulmud works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 76,
      "englishFriendliness": 71,
      "safetyScore": 74,
      "averageMonthlyBudget": 2450
    }
  },
  {
    "slug": "palestine",
    "name": "Palestine",
    "emoji": "🇵🇸",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Israeli New Shekel (ILS)",
    "currencyCode": "ILS",
    "capital": "Ramallah",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Palestine through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "ILS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 33
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 65
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 833
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1850
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Palestine is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Ramallah works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 53,
      "safetyScore": 74,
      "averageMonthlyBudget": 1850
    }
  },
  {
    "slug": "panama",
    "name": "Panama",
    "emoji": "🇵🇦",
    "region": "North America",
    "language": "Spanish",
    "currency": "Balboa / United States Dollar (PAB/USD)",
    "currencyCode": "PAB",
    "capital": "Panama City",
    "mainGoal": "Work and mobility",
    "shortDescription": "Spanish access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Panama through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "North America",
      "Work and mobility",
      "PAB"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Panama is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Panama City works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 74,
      "safetyScore": 72,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "papua-new-guinea",
    "name": "Papua New Guinea",
    "emoji": "🇵🇬",
    "region": "Oceania",
    "language": "English / Tok Pisin / Hiri Motu",
    "currency": "Papua New Guinean Kina (PGK)",
    "currencyCode": "PGK",
    "capital": "Port Moresby",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "English / Tok Pisin / Hiri Motu access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Papua New Guinea through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Oceania",
      "Study, work and lifestyle",
      "PGK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 46
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 89
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1148
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2550
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 72,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Papua New Guinea is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Tok Pisin / Hiri Motu creates a clear language and integration profile.",
        "Port Moresby works as the main reference point for national orientation and mobility planning.",
        "TGPI score 72/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 79,
      "englishFriendliness": 74,
      "safetyScore": 77,
      "averageMonthlyBudget": 2550
    }
  },
  {
    "slug": "paraguay",
    "name": "Paraguay",
    "emoji": "🇵🇾",
    "region": "South America",
    "language": "Spanish / Guaraní",
    "currency": "Paraguayan Guaraní (PYG)",
    "currencyCode": "PYG",
    "capital": "Asunción",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish / Guaraní access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Paraguay through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "PYG"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 63,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Paraguay is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish / Guaraní creates a clear language and integration profile.",
        "Asunción works as the main reference point for national orientation and mobility planning.",
        "TGPI score 63/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 43,
      "safetyScore": 61,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "peru",
    "name": "Peru",
    "emoji": "🇵🇪",
    "region": "South America",
    "language": "Spanish",
    "currency": "Peruvian Sol (PEN)",
    "currencyCode": "PEN",
    "capital": "Lima",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Peru through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "PEN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 21
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 40
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 518
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1150
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Peru is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Lima works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 62,
      "englishFriendliness": 37,
      "safetyScore": 55,
      "averageMonthlyBudget": 1150
    }
  },
  {
    "slug": "philippines",
    "name": "Philippines",
    "emoji": "🇵🇭",
    "region": "Asia",
    "language": "Filipino / English",
    "currency": "Philippine Peso (PHP)",
    "currencyCode": "PHP",
    "capital": "Manila",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Filipino / English access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Philippines through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Filipino",
      "Asia",
      "Work, culture and adaptation",
      "PHP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study",
      "live"
    ],
    "intelligence": {
      "summary": "Philippines is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Filipino / English creates a clear language and integration profile.",
        "Manila works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 80,
      "englishFriendliness": 56,
      "safetyScore": 77,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "poland",
    "name": "Poland",
    "emoji": "🇵🇱",
    "region": "Europe",
    "language": "Polish",
    "currency": "Polish Złoty (PLN)",
    "currencyCode": "PLN",
    "capital": "Warsaw",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Polish access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Poland through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Polish",
      "Europe",
      "Study and live abroad",
      "PLN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 45
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 88
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1125
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2500
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Poland is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Polish creates a clear language and integration profile.",
        "Warsaw works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 85,
      "englishFriendliness": 67,
      "safetyScore": 83,
      "averageMonthlyBudget": 2500
    }
  },
  {
    "slug": "portugal",
    "name": "Portugal",
    "emoji": "🇵🇹",
    "region": "Europe",
    "language": "Portuguese",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Lisbon",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Portuguese access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Portugal through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Portuguese",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 29
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 56
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 720
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1600
      }
    ],
    "costLevel": "medium",
    "difficulty": "easy",
    "tgpiScore": 88,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Portugal is a medium-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Portuguese creates a clear language and integration profile.",
        "Lisbon works as the main reference point for national orientation and mobility planning.",
        "TGPI score 88/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "easy",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 68,
      "safetyScore": 85,
      "averageMonthlyBudget": 1600
    }
  },
  {
    "slug": "qatar",
    "name": "Qatar",
    "emoji": "🇶🇦",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Qatari Riyal (QAR)",
    "currencyCode": "QAR",
    "capital": "Doha",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Qatar through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "QAR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 61
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 788
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1750
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Qatar is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Doha works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 74,
      "englishFriendliness": 50,
      "safetyScore": 71,
      "averageMonthlyBudget": 1750
    }
  },
  {
    "slug": "romania",
    "name": "Romania",
    "emoji": "🇷🇴",
    "region": "Europe",
    "language": "Romanian",
    "currency": "Romanian Leu (RON)",
    "currencyCode": "RON",
    "capital": "Bucharest",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Romanian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Romania through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Romanian",
      "Europe",
      "Study and live abroad",
      "RON"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 47
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 91
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1170
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2600
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 76,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Romania is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Romanian creates a clear language and integration profile.",
        "Bucharest works as the main reference point for national orientation and mobility planning.",
        "TGPI score 76/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 88,
      "englishFriendliness": 70,
      "safetyScore": 86,
      "averageMonthlyBudget": 2600
    }
  },
  {
    "slug": "russia",
    "name": "Russia",
    "emoji": "🇷🇺",
    "region": "Europe / Asia",
    "language": "Russian",
    "currency": "Russian Ruble (RUB)",
    "currencyCode": "RUB",
    "capital": "Moscow",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Russian access, Europe / Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Russia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Russian",
      "Europe / Asia",
      "Study and live abroad",
      "RUB"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 24
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 47
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 608
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1350
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 56,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Russia is a medium-cost Europe / Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Russian creates a clear language and integration profile.",
        "Moscow works as the main reference point for national orientation and mobility planning.",
        "TGPI score 56/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 62,
      "englishFriendliness": 37,
      "safetyScore": 57,
      "averageMonthlyBudget": 1350
    }
  },
  {
    "slug": "rwanda",
    "name": "Rwanda",
    "emoji": "🇷🇼",
    "region": "Africa",
    "language": "Kinyarwanda / English / French",
    "currency": "Rwandan Franc (RWF)",
    "currencyCode": "RWF",
    "capital": "Kigali",
    "mainGoal": "Cultural learning",
    "shortDescription": "Kinyarwanda / English / French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Rwanda through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Kinyarwanda",
      "Africa",
      "Cultural learning",
      "RWF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Rwanda is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Kinyarwanda / English / French creates a clear language and integration profile.",
        "Kigali works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 60,
      "englishFriendliness": 48,
      "safetyScore": 56,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "saint-kitts-and-nevis",
    "name": "Saint Kitts and Nevis",
    "emoji": "🇰🇳",
    "region": "North America",
    "language": "English",
    "currency": "East Caribbean Dollar (XCD)",
    "currencyCode": "XCD",
    "capital": "Basseterre",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Saint Kitts and Nevis through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "XCD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Saint Kitts and Nevis is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Basseterre works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 70,
      "englishFriendliness": 66,
      "safetyScore": 64,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "saint-lucia",
    "name": "Saint Lucia",
    "emoji": "🇱🇨",
    "region": "North America",
    "language": "English",
    "currency": "East Caribbean Dollar (XCD)",
    "currencyCode": "XCD",
    "capital": "Castries",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Saint Lucia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "XCD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 40
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 77
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 990
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2200
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Saint Lucia is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Castries works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 73,
      "safetyScore": 71,
      "averageMonthlyBudget": 2200
    }
  },
  {
    "slug": "saint-vincent-and-the-grenadines",
    "name": "Saint Vincent and the Grenadines",
    "emoji": "🇻🇨",
    "region": "North America",
    "language": "English",
    "currency": "East Caribbean Dollar (XCD)",
    "currencyCode": "XCD",
    "capital": "Kingstown",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Saint Vincent and the Grenadines through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "XCD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 37
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 72
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 923
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2050
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Saint Vincent and the Grenadines is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Kingstown works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 72,
      "englishFriendliness": 68,
      "safetyScore": 66,
      "averageMonthlyBudget": 2050
    }
  },
  {
    "slug": "samoa",
    "name": "Samoa",
    "emoji": "🇼🇸",
    "region": "Oceania",
    "language": "Samoan / English",
    "currency": "Samoan Tala (WST)",
    "currencyCode": "WST",
    "capital": "Apia",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "Samoan / English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Samoa through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Samoan",
      "Oceania",
      "Study, work and lifestyle",
      "WST"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 42
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 82
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1058
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2350
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Samoa is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Samoan / English creates a clear language and integration profile.",
        "Apia works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 74,
      "englishFriendliness": 69,
      "safetyScore": 72,
      "averageMonthlyBudget": 2350
    }
  },
  {
    "slug": "san-marino",
    "name": "San Marino",
    "emoji": "🇸🇲",
    "region": "Europe",
    "language": "Italian",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "San Marino",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Italian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for San Marino through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Italian",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 46
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 89
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1148
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2550
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 75,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "San Marino is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Italian creates a clear language and integration profile.",
        "San Marino works as the main reference point for national orientation and mobility planning.",
        "TGPI score 75/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 86,
      "englishFriendliness": 68,
      "safetyScore": 84,
      "averageMonthlyBudget": 2550
    }
  },
  {
    "slug": "sao-tome-and-principe",
    "name": "São Tomé and Príncipe",
    "emoji": "🇸🇹",
    "region": "Africa",
    "language": "Portuguese",
    "currency": "São Tomé and Príncipe Dobra (STN)",
    "currencyCode": "STN",
    "capital": "São Tomé",
    "mainGoal": "Language and cultural integration",
    "shortDescription": "Portuguese access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for São Tomé and Príncipe through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Portuguese",
      "Africa",
      "Language and cultural integration",
      "STN"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 18
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 35
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 450
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1000
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "São Tomé and Príncipe is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Portuguese creates a clear language and integration profile.",
        "São Tomé works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 55,
      "englishFriendliness": 43,
      "safetyScore": 51,
      "averageMonthlyBudget": 1000
    }
  },
  {
    "slug": "saudi-arabia",
    "name": "Saudi Arabia",
    "emoji": "🇸🇦",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Saudi Riyal (SAR)",
    "currencyCode": "SAR",
    "capital": "Riyadh",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Saudi Arabia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "SAR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 34
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 67
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 855
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1900
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Saudi Arabia is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Riyadh works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 54,
      "safetyScore": 75,
      "averageMonthlyBudget": 1900
    }
  },
  {
    "slug": "senegal",
    "name": "Senegal",
    "emoji": "🇸🇳",
    "region": "Africa",
    "language": "French",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Dakar",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Senegal through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 19
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 37
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 473
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1050
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Senegal is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Dakar works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 56,
      "englishFriendliness": 44,
      "safetyScore": 52,
      "averageMonthlyBudget": 1050
    }
  },
  {
    "slug": "serbia",
    "name": "Serbia",
    "emoji": "🇷🇸",
    "region": "Europe",
    "language": "Serbian",
    "currency": "Serbian Dinar (RSD)",
    "currencyCode": "RSD",
    "capital": "Belgrade",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Serbian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Serbia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Serbian",
      "Europe",
      "Study and live abroad",
      "RSD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 68,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Serbia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Serbian creates a clear language and integration profile.",
        "Belgrade works as the main reference point for national orientation and mobility planning.",
        "TGPI score 68/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 59,
      "safetyScore": 75,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "seychelles",
    "name": "Seychelles",
    "emoji": "🇸🇨",
    "region": "Africa",
    "language": "Seychellois Creole / English / French",
    "currency": "Seychellois Rupee (SCR)",
    "currencyCode": "SCR",
    "capital": "Victoria",
    "mainGoal": "Cultural learning",
    "shortDescription": "Seychellois Creole / English / French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Seychelles through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Seychellois Creole",
      "Africa",
      "Cultural learning",
      "SCR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 17
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 33
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 428
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 950
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 59,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Seychelles is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Seychellois Creole / English / French creates a clear language and integration profile.",
        "Victoria works as the main reference point for national orientation and mobility planning.",
        "TGPI score 59/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 54,
      "englishFriendliness": 42,
      "safetyScore": 50,
      "averageMonthlyBudget": 950
    }
  },
  {
    "slug": "sierra-leone",
    "name": "Sierra Leone",
    "emoji": "🇸🇱",
    "region": "Africa",
    "language": "English",
    "currency": "Sierra Leonean Leone (SLE)",
    "currencyCode": "SLE",
    "capital": "Freetown",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Sierra Leone through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "SLE"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Sierra Leone is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Freetown works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 67,
      "englishFriendliness": 55,
      "safetyScore": 63,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "singapore",
    "name": "Singapore",
    "emoji": "🇸🇬",
    "region": "Asia",
    "language": "English / Malay / Mandarin / Tamil",
    "currency": "Singapore Dollar (SGD)",
    "currencyCode": "SGD",
    "capital": "Singapore",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "English / Malay / Mandarin / Tamil access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Singapore through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Asia",
      "Work, culture and adaptation",
      "SGD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 9
      },
      {
        "label": "Local Transport Ticket",
        "amount": 12
      },
      {
        "label": "Casual Meal",
        "amount": 54
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 105
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1350
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 3000
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 92,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study",
      "live"
    ],
    "intelligence": {
      "summary": "Singapore is a high-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Malay / Mandarin / Tamil creates a clear language and integration profile.",
        "Singapore works as the main reference point for national orientation and mobility planning.",
        "TGPI score 92/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 90,
      "englishFriendliness": 90,
      "safetyScore": 95,
      "averageMonthlyBudget": 3000
    }
  },
  {
    "slug": "slovakia",
    "name": "Slovakia",
    "emoji": "🇸🇰",
    "region": "Europe",
    "language": "Slovak",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Bratislava",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Slovak access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Slovakia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Slovak",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 45
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 88
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1125
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2500
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 73,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Slovakia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Slovak creates a clear language and integration profile.",
        "Bratislava works as the main reference point for national orientation and mobility planning.",
        "TGPI score 73/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 84,
      "englishFriendliness": 66,
      "safetyScore": 82,
      "averageMonthlyBudget": 2500
    }
  },
  {
    "slug": "slovenia",
    "name": "Slovenia",
    "emoji": "🇸🇮",
    "region": "Europe",
    "language": "Slovene",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Ljubljana",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Slovene access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Slovenia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Slovene",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 96
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1238
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2750
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 79,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Slovenia is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Slovene creates a clear language and integration profile.",
        "Ljubljana works as the main reference point for national orientation and mobility planning.",
        "TGPI score 79/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 91,
      "englishFriendliness": 73,
      "safetyScore": 89,
      "averageMonthlyBudget": 2750
    }
  },
  {
    "slug": "solomon-islands",
    "name": "Solomon Islands",
    "emoji": "🇸🇧",
    "region": "Oceania",
    "language": "English",
    "currency": "Solomon Islands Dollar (SBD)",
    "currencyCode": "SBD",
    "capital": "Honiara",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Solomon Islands through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Oceania",
      "Study, work and lifestyle",
      "SBD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 45
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 88
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1125
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2500
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 71,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Solomon Islands is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Honiara works as the main reference point for national orientation and mobility planning.",
        "TGPI score 71/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 73,
      "safetyScore": 76,
      "averageMonthlyBudget": 2500
    }
  },
  {
    "slug": "somalia",
    "name": "Somalia",
    "emoji": "🇸🇴",
    "region": "Africa",
    "language": "Somali / Arabic",
    "currency": "Somali Shilling (SOS)",
    "currencyCode": "SOS",
    "capital": "Mogadishu",
    "mainGoal": "Cultural learning",
    "shortDescription": "Somali / Arabic access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Somalia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Somali",
      "Africa",
      "Cultural learning",
      "SOS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 66,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Somalia is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Somali / Arabic creates a clear language and integration profile.",
        "Mogadishu works as the main reference point for national orientation and mobility planning.",
        "TGPI score 66/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 63,
      "englishFriendliness": 51,
      "safetyScore": 59,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "south-africa",
    "name": "South Africa",
    "emoji": "🇿🇦",
    "region": "Africa",
    "language": "Multiple official languages",
    "currency": "South African Rand (ZAR)",
    "currencyCode": "ZAR",
    "capital": "Pretoria",
    "mainGoal": "Cultural learning",
    "shortDescription": "Multiple official languages access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for South Africa through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Multiple official languages",
      "Africa",
      "Cultural learning",
      "ZAR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "South Africa is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Multiple official languages creates a clear language and integration profile.",
        "Pretoria works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 67,
      "englishFriendliness": 55,
      "safetyScore": 63,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "south-korea",
    "name": "South Korea",
    "emoji": "🇰🇷",
    "region": "Asia",
    "language": "Korean",
    "currency": "South Korean Won (KRW)",
    "currencyCode": "KRW",
    "capital": "Seoul",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Korean access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for South Korea through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Korean",
      "Asia",
      "Work, culture and adaptation",
      "KRW"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "South Korea is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Korean creates a clear language and integration profile.",
        "Seoul works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 80,
      "englishFriendliness": 56,
      "safetyScore": 77,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "south-sudan",
    "name": "South Sudan",
    "emoji": "🇸🇸",
    "region": "Africa",
    "language": "English",
    "currency": "South Sudanese Pound (SSP)",
    "currencyCode": "SSP",
    "capital": "Juba",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for South Sudan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "SSP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 22
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 42
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 540
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1200
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "South Sudan is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Juba works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 60,
      "englishFriendliness": 48,
      "safetyScore": 56,
      "averageMonthlyBudget": 1200
    }
  },
  {
    "slug": "spain",
    "name": "Spain",
    "emoji": "🇪🇸",
    "region": "Europe",
    "language": "Spanish",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Madrid",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Spanish access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Spain through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "easy",
    "tgpiScore": 87,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Spain is a medium-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Madrid works as the main reference point for national orientation and mobility planning.",
        "TGPI score 87/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "easy",
      "qualityOfLifeScore": 84,
      "englishFriendliness": 62,
      "safetyScore": 82,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "sri-lanka",
    "name": "Sri Lanka",
    "emoji": "🇱🇰",
    "region": "Asia",
    "language": "Sinhala / Tamil",
    "currency": "Sri Lankan Rupee (LKR)",
    "currencyCode": "LKR",
    "capital": "Sri Jayawardenepura Kotte",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Sinhala / Tamil access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Sri Lanka through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Sinhala",
      "Asia",
      "Work, culture and adaptation",
      "LKR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 34
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 67
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 855
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1900
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Sri Lanka is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Sinhala / Tamil creates a clear language and integration profile.",
        "Sri Jayawardenepura Kotte works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 54,
      "safetyScore": 75,
      "averageMonthlyBudget": 1900
    }
  },
  {
    "slug": "sudan",
    "name": "Sudan",
    "emoji": "🇸🇩",
    "region": "Africa",
    "language": "Arabic / English",
    "currency": "Sudanese Pound (SDG)",
    "currencyCode": "SDG",
    "capital": "Khartoum",
    "mainGoal": "Cultural learning",
    "shortDescription": "Arabic / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Sudan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Africa",
      "Cultural learning",
      "SDG"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Sudan is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic / English creates a clear language and integration profile.",
        "Khartoum works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 64,
      "englishFriendliness": 52,
      "safetyScore": 60,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "suriname",
    "name": "Suriname",
    "emoji": "🇸🇷",
    "region": "South America",
    "language": "Dutch",
    "currency": "Surinamese Dollar (SRD)",
    "currencyCode": "SRD",
    "capital": "Paramaribo",
    "mainGoal": "Cultural learning",
    "shortDescription": "Dutch access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Suriname through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Dutch",
      "South America",
      "Cultural learning",
      "SRD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 21
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 40
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 518
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1150
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Suriname is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Dutch creates a clear language and integration profile.",
        "Paramaribo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 61,
      "englishFriendliness": 36,
      "safetyScore": 54,
      "averageMonthlyBudget": 1150
    }
  },
  {
    "slug": "sweden",
    "name": "Sweden",
    "emoji": "🇸🇪",
    "region": "Europe",
    "language": "Swedish",
    "currency": "Swedish Krona (SEK)",
    "currencyCode": "SEK",
    "capital": "Stockholm",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Swedish access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Sweden through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Swedish",
      "Europe",
      "Study and live abroad",
      "SEK"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 40
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 77
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 990
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2200
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Sweden is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Swedish creates a clear language and integration profile.",
        "Stockholm works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 76,
      "englishFriendliness": 58,
      "safetyScore": 74,
      "averageMonthlyBudget": 2200
    }
  },
  {
    "slug": "switzerland",
    "name": "Switzerland",
    "emoji": "🇨🇭",
    "region": "Europe",
    "language": "German / French / Italian / Romansh",
    "currency": "Swiss Franc (CHF)",
    "currencyCode": "CHF",
    "capital": "Bern",
    "mainGoal": "Study and live abroad",
    "shortDescription": "German / French / Italian / Romansh access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Switzerland through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "German",
      "Europe",
      "Study and live abroad",
      "CHF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 40
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 77
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 990
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2200
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Switzerland is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "German / French / Italian / Romansh creates a clear language and integration profile.",
        "Bern works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 76,
      "englishFriendliness": 58,
      "safetyScore": 74,
      "averageMonthlyBudget": 2200
    }
  },
  {
    "slug": "syria",
    "name": "Syria",
    "emoji": "🇸🇾",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Syrian Pound (SYP)",
    "currencyCode": "SYP",
    "capital": "Damascus",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Syria through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "SYP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Syria is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Damascus works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 72,
      "englishFriendliness": 48,
      "safetyScore": 69,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "tajikistan",
    "name": "Tajikistan",
    "emoji": "🇹🇯",
    "region": "Asia",
    "language": "Tajik",
    "currency": "Tajikistani Somoni (TJS)",
    "currencyCode": "TJS",
    "capital": "Dushanbe",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Tajik access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Tajikistan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Tajik",
      "Asia",
      "Work, culture and adaptation",
      "TJS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 27
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 53
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 675
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1500
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Tajikistan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Tajik creates a clear language and integration profile.",
        "Dushanbe works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 67,
      "englishFriendliness": 43,
      "safetyScore": 64,
      "averageMonthlyBudget": 1500
    }
  },
  {
    "slug": "tanzania",
    "name": "Tanzania",
    "emoji": "🇹🇿",
    "region": "Africa",
    "language": "Swahili / English",
    "currency": "Tanzanian Shilling (TZS)",
    "currencyCode": "TZS",
    "capital": "Dodoma",
    "mainGoal": "Cultural learning",
    "shortDescription": "Swahili / English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Tanzania through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Swahili",
      "Africa",
      "Cultural learning",
      "TZS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 19
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 37
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 473
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1050
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Tanzania is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Swahili / English creates a clear language and integration profile.",
        "Dodoma works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 56,
      "englishFriendliness": 44,
      "safetyScore": 52,
      "averageMonthlyBudget": 1050
    }
  },
  {
    "slug": "thailand",
    "name": "Thailand",
    "emoji": "🇹🇭",
    "region": "Asia",
    "language": "Thai",
    "currency": "Thai Baht (THB)",
    "currencyCode": "THB",
    "capital": "Bangkok",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Thai access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Thailand through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Thai",
      "Asia",
      "Work, culture and adaptation",
      "THB"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 28
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 54
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 698
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1550
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Thailand is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Thai creates a clear language and integration profile.",
        "Bangkok works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 44,
      "safetyScore": 65,
      "averageMonthlyBudget": 1550
    }
  },
  {
    "slug": "timor-leste",
    "name": "Timor-Leste",
    "emoji": "🇹🇱",
    "region": "Asia",
    "language": "Tetum / Portuguese",
    "currency": "United States Dollar (USD)",
    "currencyCode": "USD",
    "capital": "Dili",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Tetum / Portuguese access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Timor-Leste through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Tetum",
      "Asia",
      "Work, culture and adaptation",
      "USD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study",
      "live"
    ],
    "intelligence": {
      "summary": "Timor-Leste is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Tetum / Portuguese creates a clear language and integration profile.",
        "Dili works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 42,
      "safetyScore": 63,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "togo",
    "name": "Togo",
    "emoji": "🇹🇬",
    "region": "Africa",
    "language": "French",
    "currency": "West African CFA Franc (XOF)",
    "currencyCode": "XOF",
    "capital": "Lomé",
    "mainGoal": "Cultural learning",
    "shortDescription": "French access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Togo through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "French",
      "Africa",
      "Cultural learning",
      "XOF"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Togo is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "French creates a clear language and integration profile.",
        "Lomé works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 56,
      "safetyScore": 64,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "tonga",
    "name": "Tonga",
    "emoji": "🇹🇴",
    "region": "Oceania",
    "language": "Tongan / English",
    "currency": "Tongan Paʻanga (TOP)",
    "currencyCode": "TOP",
    "capital": "Nukuʻalofa",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "Tongan / English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Tonga through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Tongan",
      "Oceania",
      "Study, work and lifestyle",
      "TOP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 48
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 93
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1193
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2650
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Tonga is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Tongan / English creates a clear language and integration profile.",
        "Nukuʻalofa works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 77,
      "safetyScore": 80,
      "averageMonthlyBudget": 2650
    }
  },
  {
    "slug": "trinidad-and-tobago",
    "name": "Trinidad and Tobago",
    "emoji": "🇹🇹",
    "region": "North America",
    "language": "English",
    "currency": "Trinidad and Tobago Dollar (TTD)",
    "currencyCode": "TTD",
    "capital": "Port of Spain",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Trinidad and Tobago through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "TTD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 79
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1013
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2250
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Trinidad and Tobago is a medium-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Port of Spain works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 74,
      "safetyScore": 72,
      "averageMonthlyBudget": 2250
    }
  },
  {
    "slug": "tunisia",
    "name": "Tunisia",
    "emoji": "🇹🇳",
    "region": "Africa",
    "language": "Arabic",
    "currency": "Tunisian Dinar (TND)",
    "currencyCode": "TND",
    "capital": "Tunis",
    "mainGoal": "Cultural learning",
    "shortDescription": "Arabic access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Tunisia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Africa",
      "Cultural learning",
      "TND"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 3
      },
      {
        "label": "Local Transport Ticket",
        "amount": 4
      },
      {
        "label": "Casual Meal",
        "amount": 16
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 32
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 405
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 900
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural"
    ],
    "intelligence": {
      "summary": "Tunisia is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Tunis works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 52,
      "englishFriendliness": 40,
      "safetyScore": 48,
      "averageMonthlyBudget": 900
    }
  },
  {
    "slug": "turkey",
    "name": "Turkey",
    "emoji": "🇹🇷",
    "region": "Asia / Europe",
    "language": "Turkish",
    "currency": "Turkish Lira (TRY)",
    "currencyCode": "TRY",
    "capital": "Ankara",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Turkish access, Asia / Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Turkey through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Turkish",
      "Asia / Europe",
      "Study and live abroad",
      "TRY"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 61
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 788
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1750
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Turkey is a medium-cost Asia / Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Turkish creates a clear language and integration profile.",
        "Ankara works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 77,
      "englishFriendliness": 53,
      "safetyScore": 72,
      "averageMonthlyBudget": 1750
    }
  },
  {
    "slug": "turkmenistan",
    "name": "Turkmenistan",
    "emoji": "🇹🇲",
    "region": "Asia",
    "language": "Turkmen",
    "currency": "Turkmenistan Manat (TMT)",
    "currencyCode": "TMT",
    "capital": "Ashgabat",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Turkmen access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Turkmenistan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Turkmen",
      "Asia",
      "Work, culture and adaptation",
      "TMT"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Turkmenistan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Turkmen creates a clear language and integration profile.",
        "Ashgabat works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 72,
      "englishFriendliness": 48,
      "safetyScore": 69,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "tuvalu",
    "name": "Tuvalu",
    "emoji": "🇹🇻",
    "region": "Oceania",
    "language": "Tuvaluan / English",
    "currency": "Australian Dollar (AUD)",
    "currencyCode": "AUD",
    "capital": "Funafuti",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "Tuvaluan / English access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Tuvalu through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Tuvaluan",
      "Oceania",
      "Study, work and lifestyle",
      "AUD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 48
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 93
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1193
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2650
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 74,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Tuvalu is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Tuvaluan / English creates a clear language and integration profile.",
        "Funafuti works as the main reference point for national orientation and mobility planning.",
        "TGPI score 74/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 82,
      "englishFriendliness": 77,
      "safetyScore": 80,
      "averageMonthlyBudget": 2650
    }
  },
  {
    "slug": "uganda",
    "name": "Uganda",
    "emoji": "🇺🇬",
    "region": "Africa",
    "language": "English / Swahili",
    "currency": "Ugandan Shilling (UGX)",
    "currencyCode": "UGX",
    "capital": "Kampala",
    "mainGoal": "Cultural learning",
    "shortDescription": "English / Swahili access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Uganda through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "UGX"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 67,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Uganda is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Swahili creates a clear language and integration profile.",
        "Kampala works as the main reference point for national orientation and mobility planning.",
        "TGPI score 67/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 64,
      "englishFriendliness": 52,
      "safetyScore": 60,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "ukraine",
    "name": "Ukraine",
    "emoji": "🇺🇦",
    "region": "Europe",
    "language": "Ukrainian",
    "currency": "Ukrainian Hryvnia (UAH)",
    "currencyCode": "UAH",
    "capital": "Kyiv",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Ukrainian access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Ukraine through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Ukrainian",
      "Europe",
      "Study and live abroad",
      "UAH"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 41
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 81
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1035
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2300
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Ukraine is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Ukrainian creates a clear language and integration profile.",
        "Kyiv works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 79,
      "englishFriendliness": 61,
      "safetyScore": 77,
      "averageMonthlyBudget": 2300
    }
  },
  {
    "slug": "united-arab-emirates",
    "name": "United Arab Emirates",
    "emoji": "🇦🇪",
    "region": "Asia",
    "language": "Arabic",
    "currency": "UAE Dirham (AED)",
    "currencyCode": "AED",
    "capital": "Abu Dhabi",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for United Arab Emirates through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "AED"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 34
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 67
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 855
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1900
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "United Arab Emirates is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Abu Dhabi works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 78,
      "englishFriendliness": 54,
      "safetyScore": 75,
      "averageMonthlyBudget": 1900
    }
  },
  {
    "slug": "united-kingdom",
    "name": "United Kingdom",
    "emoji": "🇬🇧",
    "region": "Europe",
    "language": "English",
    "currency": "Pound Sterling (GBP)",
    "currencyCode": "GBP",
    "capital": "London",
    "mainGoal": "Study and live abroad",
    "shortDescription": "English access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for United Kingdom through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Europe",
      "Study and live abroad",
      "GBP"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 49
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 95
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1215
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2700
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 88,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "United Kingdom is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "London works as the main reference point for national orientation and mobility planning.",
        "TGPI score 88/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 85,
      "englishFriendliness": 96,
      "safetyScore": 78,
      "averageMonthlyBudget": 2700
    }
  },
  {
    "slug": "united-states",
    "name": "United States",
    "emoji": "🇺🇸",
    "region": "North America",
    "language": "English",
    "currency": "United States Dollar (USD)",
    "currencyCode": "USD",
    "capital": "Washington, D.C.",
    "mainGoal": "Work and mobility",
    "shortDescription": "English access, North America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for United States through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "North America",
      "Work and mobility",
      "USD"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 11
      },
      {
        "label": "Casual Meal",
        "amount": 50
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 98
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1260
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2800
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 90,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "United States is a high-cost North America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Washington, D.C. works as the main reference point for national orientation and mobility planning.",
        "TGPI score 90/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 86,
      "englishFriendliness": 95,
      "safetyScore": 70,
      "averageMonthlyBudget": 2800
    }
  },
  {
    "slug": "uruguay",
    "name": "Uruguay",
    "emoji": "🇺🇾",
    "region": "South America",
    "language": "Spanish",
    "currency": "Uruguayan Peso (UYU)",
    "currencyCode": "UYU",
    "capital": "Montevideo",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Uruguay through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "UYU"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 44
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 563
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1250
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 60,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Uruguay is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Montevideo works as the main reference point for national orientation and mobility planning.",
        "TGPI score 60/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 64,
      "englishFriendliness": 39,
      "safetyScore": 57,
      "averageMonthlyBudget": 1250
    }
  },
  {
    "slug": "uzbekistan",
    "name": "Uzbekistan",
    "emoji": "🇺🇿",
    "region": "Asia",
    "language": "Uzbek",
    "currency": "Uzbekistani Som (UZS)",
    "currencyCode": "UZS",
    "capital": "Tashkent",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Uzbek access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Uzbekistan through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Uzbek",
      "Asia",
      "Work, culture and adaptation",
      "UZS"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 25
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 49
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 630
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1400
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 58,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Uzbekistan is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Uzbek creates a clear language and integration profile.",
        "Tashkent works as the main reference point for national orientation and mobility planning.",
        "TGPI score 58/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 64,
      "englishFriendliness": 40,
      "safetyScore": 61,
      "averageMonthlyBudget": 1400
    }
  },
  {
    "slug": "vanuatu",
    "name": "Vanuatu",
    "emoji": "🇻🇺",
    "region": "Oceania",
    "language": "Bislama / English / French",
    "currency": "Vanuatu Vatu (VUV)",
    "currencyCode": "VUV",
    "capital": "Port Vila",
    "mainGoal": "Study, work and lifestyle",
    "shortDescription": "Bislama / English / French access, Oceania context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Vanuatu through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Bislama",
      "Oceania",
      "Study, work and lifestyle",
      "VUV"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 8
      },
      {
        "label": "Local Transport Ticket",
        "amount": 10
      },
      {
        "label": "Casual Meal",
        "amount": 46
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 89
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1148
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2550
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 72,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Vanuatu is a high-cost Oceania country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Bislama / English / French creates a clear language and integration profile.",
        "Port Vila works as the main reference point for national orientation and mobility planning.",
        "TGPI score 72/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 79,
      "englishFriendliness": 74,
      "safetyScore": 77,
      "averageMonthlyBudget": 2550
    }
  },
  {
    "slug": "vatican-city",
    "name": "Vatican City",
    "emoji": "🇻🇦",
    "region": "Europe",
    "language": "Italian / Latin",
    "currency": "Euro (EUR)",
    "currencyCode": "EUR",
    "capital": "Vatican City",
    "mainGoal": "Study and live abroad",
    "shortDescription": "Italian / Latin access, Europe context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Vatican City through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Italian",
      "Europe",
      "Study and live abroad",
      "EUR"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 7
      },
      {
        "label": "Local Transport Ticket",
        "amount": 9
      },
      {
        "label": "Casual Meal",
        "amount": 42
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 82
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 1058
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 2350
      }
    ],
    "costLevel": "high",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "study",
      "work",
      "live"
    ],
    "intelligence": {
      "summary": "Vatican City is a high-cost Europe country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Italian / Latin creates a clear language and integration profile.",
        "Vatican City works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 80,
      "englishFriendliness": 62,
      "safetyScore": 78,
      "averageMonthlyBudget": 2350
    }
  },
  {
    "slug": "venezuela",
    "name": "Venezuela",
    "emoji": "🇻🇪",
    "region": "South America",
    "language": "Spanish",
    "currency": "Venezuelan Bolívar (VES)",
    "currencyCode": "VES",
    "capital": "Caracas",
    "mainGoal": "Cultural learning",
    "shortDescription": "Spanish access, South America context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Venezuela through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Spanish",
      "South America",
      "Cultural learning",
      "VES"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 5
      },
      {
        "label": "Casual Meal",
        "amount": 23
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 46
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 585
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1300
      }
    ],
    "costLevel": "medium",
    "difficulty": "medium",
    "tgpiScore": 61,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Venezuela is a medium-cost South America country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Spanish creates a clear language and integration profile.",
        "Caracas works as the main reference point for national orientation and mobility planning.",
        "TGPI score 61/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 66,
      "englishFriendliness": 41,
      "safetyScore": 59,
      "averageMonthlyBudget": 1300
    }
  },
  {
    "slug": "vietnam",
    "name": "Vietnam",
    "emoji": "🇻🇳",
    "region": "Asia",
    "language": "Vietnamese",
    "currency": "Vietnamese Đồng (VND)",
    "currencyCode": "VND",
    "capital": "Hanoi",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Vietnamese access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Vietnam through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Vietnamese",
      "Asia",
      "Work, culture and adaptation",
      "VND"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 5
      },
      {
        "label": "Local Transport Ticket",
        "amount": 7
      },
      {
        "label": "Casual Meal",
        "amount": 31
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 60
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 765
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1700
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 64,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Vietnam is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Vietnamese creates a clear language and integration profile.",
        "Hanoi works as the main reference point for national orientation and mobility planning.",
        "TGPI score 64/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 72,
      "englishFriendliness": 48,
      "safetyScore": 69,
      "averageMonthlyBudget": 1700
    }
  },
  {
    "slug": "yemen",
    "name": "Yemen",
    "emoji": "🇾🇪",
    "region": "Asia",
    "language": "Arabic",
    "currency": "Yemeni Rial (YER)",
    "currencyCode": "YER",
    "capital": "Sana'a",
    "mainGoal": "Work, culture and adaptation",
    "shortDescription": "Arabic access, Asia context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Yemen through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "Arabic",
      "Asia",
      "Work, culture and adaptation",
      "YER"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 6
      },
      {
        "label": "Local Transport Ticket",
        "amount": 8
      },
      {
        "label": "Casual Meal",
        "amount": 35
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 68
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 878
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1950
      }
    ],
    "costLevel": "medium",
    "difficulty": "hard",
    "tgpiScore": 69,
    "idealFor": [
      "travel",
      "cultural",
      "work",
      "study"
    ],
    "intelligence": {
      "summary": "Yemen is a medium-cost Asia country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "Arabic creates a clear language and integration profile.",
        "Sana'a works as the main reference point for national orientation and mobility planning.",
        "TGPI score 69/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "hard",
      "qualityOfLifeScore": 79,
      "englishFriendliness": 55,
      "safetyScore": 76,
      "averageMonthlyBudget": 1950
    }
  },
  {
    "slug": "zambia",
    "name": "Zambia",
    "emoji": "🇿🇲",
    "region": "Africa",
    "language": "English",
    "currency": "Zambian Kwacha (ZMW)",
    "currencyCode": "ZMW",
    "capital": "Lusaka",
    "mainGoal": "Cultural learning",
    "shortDescription": "English access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Zambia through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "ZMW"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Zambia is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English creates a clear language and integration profile.",
        "Lusaka works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 56,
      "safetyScore": 64,
      "averageMonthlyBudget": 1450
    }
  },
  {
    "slug": "zimbabwe",
    "name": "Zimbabwe",
    "emoji": "🇿🇼",
    "region": "Africa",
    "language": "English / Shona / Ndebele",
    "currency": "Zimbabwe Gold (ZWG)",
    "currencyCode": "ZWG",
    "capital": "Harare",
    "mainGoal": "Cultural learning",
    "shortDescription": "English / Shona / Ndebele access, Africa context, cost profile, adaptation signals, and TGPI readiness for international decisions.",
    "longDescription": "Build readiness for Zimbabwe through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.",
    "tags": [
      "English",
      "Africa",
      "Cultural learning",
      "ZWG"
    ],
    "costOfLife": [
      {
        "label": "Coffee",
        "amount": 4
      },
      {
        "label": "Local Transport Ticket",
        "amount": 6
      },
      {
        "label": "Casual Meal",
        "amount": 26
      },
      {
        "label": "Monthly Mobile Plan",
        "amount": 51
      },
      {
        "label": "Shared Rent Estimate",
        "amount": 653
      },
      {
        "label": "Estimated Monthly Budget",
        "amount": 1450
      }
    ],
    "costLevel": "low",
    "difficulty": "medium",
    "tgpiScore": 70,
    "idealFor": [
      "travel",
      "cultural",
      "live",
      "work"
    ],
    "intelligence": {
      "summary": "Zimbabwe is a low-cost Africa country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.",
      "strengths": [
        "English / Shona / Ndebele creates a clear language and integration profile.",
        "Harare works as the main reference point for national orientation and mobility planning.",
        "TGPI score 70/100 indicates the current strategic readiness signal for comparison."
      ],
      "warnings": [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions."
      ],
      "bestFor": [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism"
      ],
      "immigrationDifficulty": "medium",
      "qualityOfLifeScore": 68,
      "englishFriendliness": 56,
      "safetyScore": 64,
      "averageMonthlyBudget": 1450
    }
  }
];

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getCountrySlugs() {
  return countries.map((country) => country.slug);
}
