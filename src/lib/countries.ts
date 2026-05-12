// src/lib/countries.ts

import {
  countries,
  getCountryBySlug,
  getCountrySlugs,
  type Country,
  type CountryCostLevel,
  type CountryDifficulty,
  type CountryGoal,
} from "@/data/countries";

export type {
  Country,
  CountryCostLevel,
  CountryDifficulty,
  CountryGoal,
};

export function getAllCountries(): Country[] {
  return countries;
}

export function getAllCountrySlugs(): string[] {
  return getCountrySlugs();
}

export function getCountry(slug: string): Country | undefined {
  return getCountryBySlug(slug);
}

export function getAllRegions(): string[] {
  return Array.from(new Set(countries.map((country) => country.region))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function getAllGoals(): CountryGoal[] {
  const goals = countries.flatMap((country) => country.idealFor);
  return Array.from(new Set(goals));
}

export function formatCurrencyAmount(country: Country, amount: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCountryEstimatedBudget(country: Country): number {
  return country.intelligence.averageMonthlyBudget;
}

export function getCountryDecisionLabel(country: Country): string {
  if (country.tgpiScore >= 90) return "Elite strategic fit";
  if (country.tgpiScore >= 80) return "Strong global option";
  if (country.tgpiScore >= 70) return "Promising but requires planning";
  return "Needs deeper comparison";
}

export function getCountryRiskLabel(country: Country): string {
  if (country.difficulty === "easy") return "Low adaptation friction";
  if (country.difficulty === "medium") return "Moderate adaptation friction";
  return "High adaptation discipline required";
}

export function getCountryCostLabel(country: Country): string {
  if (country.costLevel === "low") return "Accessible cost profile";
  if (country.costLevel === "medium") return "Balanced cost profile";
  return "Premium cost profile";
}

export function getCountryGoalLabel(goal: CountryGoal): string {
  const labels: Record<CountryGoal, string> = {
    work: "Work",
    study: "Study",
    live: "Live",
    travel: "Travel",
    cultural: "Culture",
  };

  return labels[goal];
}

export function getTopCountriesByScore(limit = 5): Country[] {
  return [...countries]
    .sort((a, b) => b.tgpiScore - a.tgpiScore)
    .slice(0, limit);
}

export function getLowestBudgetCountries(limit = 5): Country[] {
  return [...countries]
    .sort(
      (a, b) =>
        a.intelligence.averageMonthlyBudget -
        b.intelligence.averageMonthlyBudget,
    )
    .slice(0, limit);
}

export function getHighestSafetyCountries(limit = 5): Country[] {
  return [...countries]
    .sort((a, b) => b.intelligence.safetyScore - a.intelligence.safetyScore)
    .slice(0, limit);
}

export function getCountrySearchText(country: Country): string {
  return [
    country.slug,
    country.name,
    country.region,
    country.language,
    country.currency,
    country.currencyCode,
    country.capital,
    country.mainGoal,
    country.shortDescription,
    ...country.tags,
    ...country.idealFor,
  ]
    .join(" ")
    .toLowerCase();
}

export function getRelatedCountries(country: Country, limit = 3): Country[] {
  return countries
    .filter((candidate) => candidate.slug !== country.slug)
    .map((candidate) => {
      let score = 0;

      if (candidate.region === country.region) score += 35;
      if (candidate.costLevel === country.costLevel) score += 20;
      if (candidate.difficulty === country.difficulty) score += 15;

      const sharedGoals = candidate.idealFor.filter((goal) =>
        country.idealFor.includes(goal),
      );

      score += sharedGoals.length * 10;

      const scoreDistance = Math.abs(candidate.tgpiScore - country.tgpiScore);
      score += Math.max(0, 20 - scoreDistance);

      return {
        country: candidate,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.country);
}

export function getCountryPrimaryDecision(country: Country): string {
  if (country.tgpiScore >= 88) {
    return `${country.name} is a high-priority country to compare seriously, especially if your goals match its cost, language and adaptation profile.`;
  }

  if (country.tgpiScore >= 78) {
    return `${country.name} is a strong option, but it should be compared against countries with similar cost and adaptation signals.`;
  }

  return `${country.name} may be useful for a specific profile, but it requires deeper validation before becoming a primary option.`;
}
