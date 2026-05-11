import type { UserPreferences } from "@/types/user-preferences";
import type { Country } from "@/data/countries";

/*
 * Recommend countries based on multiple user preferences.
 * Scores are calculated using goal alignment, region match, cost and difficulty proximity,
 * favorite countries and normalized TGPI score. Higher score indicates a better match.
 */
export function recommendCountries(
  countries: Country[],
  prefs: UserPreferences
) {
  const scored = countries.map((c) => {
    let score = 0;

    // Goal match: check if any of the user goals align with the country's idealFor or main goal
    if (prefs.goals && prefs.goals.length > 0) {
      const goalMatch = prefs.goals.some((goal) => {
        return (
          (c.idealFor && c.idealFor.includes(goal)) ||
          (c.mainGoal && c.mainGoal.toLowerCase().includes(goal.toLowerCase()))
        );
      });
      if (goalMatch) score += 5;
    }

    // Region match
    if (prefs.preferredRegions && prefs.preferredRegions.includes(c.region)) {
      score += 2;
    }

    // Cost level proximity: prefer countries with similar cost level
    if (prefs.costLevel) {
      const costRank: Record<string, number> = { low: 1, medium: 2, high: 3 };
      const userLevel = costRank[prefs.costLevel] ?? 2;
      const countryLevel = costRank[c.costLevel] ?? 2;
      const diff = Math.abs(countryLevel - userLevel);
      if (diff === 0) score += 3;
      else if (diff === 1) score += 1;
    }

    // Difficulty proximity: prefer countries with similar difficulty
    if (prefs.difficulty) {
      const diffRank: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
      const userDiff = diffRank[prefs.difficulty] ?? 2;
      const countryDiff = diffRank[c.difficulty] ?? 2;
      const diffLevel = Math.abs(countryDiff - userDiff);
      if (diffLevel === 0) score += 2;
      else if (diffLevel === 1) score += 1;
    }

    // Favorite countries get a boost
    if (prefs.favorites && prefs.favorites.includes(c.slug)) {
      score += 4;
    }

    // Add normalized TGPI score (0-1) to fine tune ranking
    score += c.tgpiScore / 100;

    return { ...c, score };
  });

  // Sort by descending score and return top recommendations (default 5)
  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}
}
