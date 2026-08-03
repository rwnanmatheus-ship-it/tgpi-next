export type RankingEntry = {
  id: string;
  name: string;
  xp: number;
  level: number;
  photoURL?: string;
  rank?: number;
};

export type RankingPeriod = "daily" | "weekly" | "monthly" | "all-time";

export type RankingSnapshot = {
  period: RankingPeriod;
  generatedAt: string;
  entries: RankingEntry[];
};
