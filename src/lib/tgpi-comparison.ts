import type { Country, CountryCostLevel } from "@/lib/countries";

export const COMPARISON_GOALS = [
  "overall",
  "study",
  "work",
  "live",
  "travel",
] as const;

export type ComparisonGoal = (typeof COMPARISON_GOALS)[number];

export type ComparisonSignal =
  | "tgpi"
  | "safety"
  | "english"
  | "quality"
  | "cost";

export type ComparisonGoalConfig = {
  label: string;
  shortLabel: string;
  description: string;
  weights: Record<ComparisonSignal, number>;
};

const GOAL_CONFIGS: Record<ComparisonGoal, ComparisonGoalConfig> = {
  overall: {
    label: "Overall strategic fit",
    shortLabel: "Overall",
    description:
      "Balances TGPI readiness, safety, English access, quality of life and the relative cost band.",
    weights: { tgpi: 30, safety: 20, english: 15, quality: 20, cost: 15 },
  },
  study: {
    label: "Study abroad",
    shortLabel: "Study",
    description:
      "Prioritizes language access, safety and the conditions that support a stable learning experience.",
    weights: { tgpi: 20, safety: 20, english: 30, quality: 15, cost: 15 },
  },
  work: {
    label: "International career",
    shortLabel: "Work",
    description:
      "Prioritizes strategic readiness and language access while preserving safety, quality and cost context.",
    weights: { tgpi: 30, safety: 15, english: 30, quality: 15, cost: 10 },
  },
  live: {
    label: "Long-term life",
    shortLabel: "Live",
    description:
      "Prioritizes quality of life and safety for people evaluating a longer international transition.",
    weights: { tgpi: 20, safety: 25, english: 15, quality: 25, cost: 15 },
  },
  travel: {
    label: "Travel readiness",
    shortLabel: "Travel",
    description:
      "Prioritizes safety, language usability and cost context for practical travel decisions.",
    weights: { tgpi: 15, safety: 35, english: 20, quality: 10, cost: 20 },
  },
};

const COST_BAND_SCORES: Record<CountryCostLevel, number> = {
  low: 100,
  medium: 65,
  high: 35,
};

const COST_BAND_ORDER: Record<CountryCostLevel, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

export type ComparisonVerdict = {
  title: string;
  text: string;
  bestOverall: Country[];
  lowestCostProfile: Country[];
  safest: Country[];
  topScore: number;
};

export type ComparisonDecisionBrief = {
  alternative: Country | null;
  decisiveSignal: ComparisonSignal;
  decisiveSignalSpread: number;
  leaders: Country[];
  margin: number;
  state: "close" | "directional" | "strong" | "tied";
  stateLabel: string;
  summary: string;
};

export function isComparisonGoal(value: string | undefined): value is ComparisonGoal {
  return COMPARISON_GOALS.includes(value as ComparisonGoal);
}

export function getComparisonGoalConfig(goal: ComparisonGoal): ComparisonGoalConfig {
  return GOAL_CONFIGS[goal];
}

export function getCountryCostBandScore(country: Country): number {
  return COST_BAND_SCORES[country.costLevel];
}

export function getCountrySignalScore(
  country: Country,
  signal: ComparisonSignal,
): number {
  const signalScores: Record<ComparisonSignal, number> = {
    tgpi: country.tgpiScore,
    safety: country.intelligence.safetyScore,
    english: country.intelligence.englishFriendliness,
    quality: country.intelligence.qualityOfLifeScore,
    cost: getCountryCostBandScore(country),
  };

  return signalScores[signal];
}

export function getCountryComparisonScore(
  country: Country,
  goal: ComparisonGoal,
): number {
  const { weights } = getComparisonGoalConfig(goal);
  const weightedTotal =
    country.tgpiScore * weights.tgpi +
    country.intelligence.safetyScore * weights.safety +
    country.intelligence.englishFriendliness * weights.english +
    country.intelligence.qualityOfLifeScore * weights.quality +
    getCountryCostBandScore(country) * weights.cost;

  return Math.round(weightedTotal / 100);
}

export function getComparisonVerdict(
  countries: Country[],
  goal: ComparisonGoal,
): ComparisonVerdict | null {
  if (countries.length < 2) return null;

  const scores = countries.map((country) => ({
    country,
    score: getCountryComparisonScore(country, goal),
  }));
  const topScore = Math.max(...scores.map((item) => item.score));
  const bestOverall = scores
    .filter((item) => item.score === topScore)
    .map((item) => item.country);
  const lowestCostOrder = Math.min(
    ...countries.map((country) => COST_BAND_ORDER[country.costLevel]),
  );
  const lowestCostProfile = countries.filter(
    (country) => COST_BAND_ORDER[country.costLevel] === lowestCostOrder,
  );
  const highestSafety = Math.max(
    ...countries.map((country) => country.intelligence.safetyScore),
  );
  const safest = countries.filter(
    (country) => country.intelligence.safetyScore === highestSafety,
  );
  const goalConfig = getComparisonGoalConfig(goal);
  const bestNames = formatCountryNames(bestOverall);

  return {
    title:
      bestOverall.length === 1
        ? `${bestNames} leads the ${goalConfig.shortLabel.toLowerCase()} decision lens.`
        : `${bestNames} share the strongest ${goalConfig.shortLabel.toLowerCase()} decision signal.`,
    text: `${bestNames} ${bestOverall.length === 1 ? "reaches" : "reach"} ${topScore}/100 in this transparent TGPI lens. ${formatCountryNames(lowestCostProfile)} ${lowestCostProfile.length === 1 ? "has" : "share"} the most accessible relative cost band, while ${formatCountryNames(safest)} ${safest.length === 1 ? "has" : "share"} the strongest safety signal. Local-currency budgets are displayed as reference values and are never ranked directly.`,
    bestOverall,
    lowestCostProfile,
    safest,
    topScore,
  };
}

export function getComparisonDecisionBrief(
  countries: Country[],
  goal: ComparisonGoal,
): ComparisonDecisionBrief | null {
  if (countries.length < 2) return null;

  const ranked = countries
    .map((country) => ({
      country,
      score: getCountryComparisonScore(country, goal),
    }))
    .sort((first, second) => second.score - first.score);
  const topScore = ranked[0]?.score ?? 0;
  const leaders = ranked
    .filter((item) => item.score === topScore)
    .map((item) => item.country);
  const alternative = ranked.find((item) => item.score < topScore)?.country ?? null;
  const nextScore = ranked.find((item) => item.score < topScore)?.score ?? topScore;
  const margin = topScore - nextScore;
  const signals = Object.keys(
    getComparisonGoalConfig(goal).weights,
  ) as ComparisonSignal[];
  const signalSpreads = signals.map((signal) => {
    const values = countries.map((country) =>
      getCountrySignalScore(country, signal),
    );
    return {
      signal,
      spread: Math.max(...values) - Math.min(...values),
    };
  });
  const decisive = signalSpreads.sort(
    (first, second) => second.spread - first.spread,
  )[0] ?? { signal: "tgpi" as const, spread: 0 };
  const state =
    leaders.length > 1
      ? "tied"
      : margin >= 8
        ? "strong"
        : margin >= 4
          ? "directional"
          : "close";
  const stateLabels: Record<ComparisonDecisionBrief["state"], string> = {
    tied: "Shared lead",
    strong: "Strong directional lead",
    directional: "Meaningful directional lead",
    close: "Close decision",
  };
  const leaderNames = formatCountryNames(leaders);
  const signalLabel = getSignalLabel(decisive.signal).toLowerCase();
  const summary =
    state === "tied"
      ? `${leaderNames} remain level under this lens. The comparison should now be resolved through city-level evidence, personal constraints and official requirements.`
      : state === "close"
        ? `${leaderNames} leads by only ${margin} points. Treat this as a shortlist signal, not a final answer; the largest separation appears in ${signalLabel}.`
        : `${leaderNames} creates a ${margin}-point lead under this lens. The largest separation appears in ${signalLabel}, which should be validated against your personal constraints.`;

  return {
    alternative,
    decisiveSignal: decisive.signal,
    decisiveSignalSpread: decisive.spread,
    leaders,
    margin,
    state,
    stateLabel: stateLabels[state],
    summary,
  };
}

export function formatCountryNames(countries: Country[]): string {
  const names = countries.map((country) => country.name);
  if (names.length <= 1) return names[0] ?? "No country";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
}

export function getSignalLabel(signal: ComparisonSignal): string {
  const labels: Record<ComparisonSignal, string> = {
    tgpi: "TGPI readiness",
    safety: "Safety",
    english: "English access",
    quality: "Quality of life",
    cost: "Relative cost band",
  };
  return labels[signal];
}
