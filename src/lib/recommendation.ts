import type { Country } from "@/data/countries";

type UserPreferences = {
  goal?: string;
  region?: string;
  favorites?: string[];
};

export function recommendCountries(
  countries: Country[],
  prefs: UserPreferences
) {
  const scored = countries.map((country) => {
    let score = 0;

    if (prefs.goal && country.mainGoal === prefs.goal) score += 3;
    if (prefs.region && country.region === prefs.region) score += 2;
    if (prefs.favorites?.includes(country.slug)) score += 4;

    return { ...country, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}
