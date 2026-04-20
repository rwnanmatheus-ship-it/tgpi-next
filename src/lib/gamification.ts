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
  streak: number;
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

export function calculateLevel(xp: number) {
  return Math.floor(xp / 100) + 1;
}

export function getProgressToNextLevel(xp: number) {
  return xp % 100;
}

export function getNextLevelXP() {
  return 100;
}

export function updateStreak(lastLogin?: number) {
  const today = new Date().toDateString();
  const last = lastLogin ? new Date(lastLogin).toDateString() : null;

  if (!last) return 1;
  if (last === today) return null;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (new Date(lastLogin!).toDateString() === yesterday.toDateString()) {
    return "increment";
  }

  return 1;
}

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
    streak: 1,
  };
}