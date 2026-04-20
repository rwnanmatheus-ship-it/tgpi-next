export type UserGameStats = {
  countriesExplored: number;
  coursesInProgress: number;
  certificatesEarned: number;
  countriesSaved: number;
  profileCompleted: boolean;
};

export type GamificationResult = {
  xp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  rankTitle: string;
};

const rankTitles = [
  "Starter Explorer",
  "Curious Traveler",
  "Global Pathfinder",
  "Cultural Navigator",
  "International Strategist",
  "Polymath Explorer",
  "Global Thinker",
  "World Builder",
  "Elite Pathfinder",
  "TGPI Polymath Elite",
];

export function calculateGamification(
  stats: UserGameStats
): GamificationResult {
  const xp =
    stats.countriesExplored * 40 +
    stats.coursesInProgress * 80 +
    stats.certificatesEarned * 200 +
    stats.countriesSaved * 25 +
    (stats.profileCompleted ? 100 : 0);

  const level = Math.max(1, Math.floor(xp / 200) + 1);
  const currentLevelXp = (level - 1) * 200;
  const nextLevelXp = level * 200;
  const progressPercent = Math.min(
    100,
    Math.round(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  const rankTitle =
    rankTitles[Math.min(level - 1, rankTitles.length - 1)] ||
    "TGPI Member";

  return {
    xp,
    level,
    currentLevelXp,
    nextLevelXp,
    progressPercent,
    rankTitle,
  };
}