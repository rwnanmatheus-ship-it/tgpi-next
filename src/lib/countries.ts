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

const COUNTRY_IMAGE_OVERRIDES: Record<string, string> = {
  japan:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  singapore:
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
  canada:
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
  portugal:
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
  "united-states":
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
  "united-kingdom":
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
  france:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  germany:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
  italy:
    "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80",
  spain:
    "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1200&q=80",
  australia:
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
  brazil:
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
  egypt:
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80",
  india:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  china:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
  "south-korea":
    "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80",
  thailand:
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
  mexico:
    "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=80",
};

const REGION_IMAGE_FALLBACKS: Record<string, string> = {
  Europe:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
  Asia:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
  "Asia / Europe":
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
  "Europe / Asia":
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
  Africa:
    "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1200&q=80",
  "Africa / Middle East":
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80",
  "North America":
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
  "South America":
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
  Oceania:
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
};

const GLOBAL_COUNTRY_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80";

export function getCountryImageQuery(country: Country): string {
  return `${country.name} ${country.capital} landmark skyline`;
}

export function getCountryImageAlt(country: Country): string {
  return `Imagem de inteligência do país ${country.name} mostrando ${country.capital} ou um marco nacional reconhecível.`;
}

export function getCountryImageUrl(country: Country): string {
  return (
    COUNTRY_IMAGE_OVERRIDES[country.slug] ??
    REGION_IMAGE_FALLBACKS[country.region] ??
    GLOBAL_COUNTRY_IMAGE_FALLBACK
  );
}