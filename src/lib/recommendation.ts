import { Country } from "@/data/countries";

type UserPreferences = {
  goal?: string;
  region?: string;
  favorites?: string[];
};

export function recommendCountries(
  countries: Country[],
  prefs: UserPreferences
) {
  let scored = countries.map((c) => {
    let score = 0;

    if (prefs.goal && c.mainGoal === prefs.goal) score += 3;
    if (prefs.region && c.region === prefs.region) score += 2;
    if (prefs.favorites?.includes(c.slug)) score += 4;

    return { ...c, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}