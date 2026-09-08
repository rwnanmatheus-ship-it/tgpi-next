export type GlobalRankId =
  | "global-initiate"
  | "pathfinder"
  | "explorer"
  | "navigator"
  | "global-strategist"
  | "global-polymath";

export type GlobalRankDefinition = {
  description: string;
  id: GlobalRankId;
  image: string;
  name: string;
  threshold: number;
};

export type GlobalRankInput = {
  activationCompletion: number;
  comparisons: number;
  documentReviews: number;
  learningPaths: number;
  planCompletion: number;
  profileCompletion: number;
  savedCountries: number;
};

export type GlobalRankBreakdown = {
  activity: number;
  identity: number;
  plan: number;
  readiness: number;
};

export type GlobalRank = GlobalRankDefinition & {
  breakdown: GlobalRankBreakdown;
  nextRank: GlobalRankDefinition | null;
  points: number;
  pointsToNext: number;
  progressWithinRank: number;
};

export const GLOBAL_RANK_DISCLAIMER =
  "Your TGPI rank reflects progress inside the product. It is not immigration eligibility, an academic qualification or a professional credential.";

export const GLOBAL_RANKS: readonly GlobalRankDefinition[] = [
  {
    description: "Build the identity and context that power your global journey.",
    id: "global-initiate",
    image: "/images/ranks/global-initiate.webp",
    name: "Global Initiate",
    threshold: 0,
  },
  {
    description: "Define a direction and begin connecting countries to your priorities.",
    id: "pathfinder",
    image: "/images/ranks/pathfinder.webp",
    name: "Pathfinder",
    threshold: 150,
  },
  {
    description: "Explore evidence, comparisons and learning with consistent intent.",
    id: "explorer",
    image: "/images/ranks/explorer.webp",
    name: "Explorer",
    threshold: 320,
  },
  {
    description: "Navigate a connected plan through verified product activity.",
    id: "navigator",
    image: "/images/ranks/navigator.webp",
    name: "Navigator",
    threshold: 500,
  },
  {
    description: "Turn global research into a deliberate and structured strategy.",
    id: "global-strategist",
    image: "/images/ranks/global-strategist.webp",
    name: "Global Strategist",
    threshold: 700,
  },
  {
    description: "Connect identity, evidence, decisions and multidisciplinary learning.",
    id: "global-polymath",
    image: "/images/ranks/global-polymath.webp",
    name: "Global Polymath",
    threshold: 850,
  },
] as const;

function clamp(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) return minimum;
  return Math.min(Math.max(value, minimum), maximum);
}

function whole(value: number) {
  return Math.floor(clamp(value, 0, Number.MAX_SAFE_INTEGER));
}

export function getGlobalRank(input: GlobalRankInput): GlobalRank {
  const breakdown: GlobalRankBreakdown = {
    identity: Math.round(clamp(input.profileCompletion, 0, 100) * 2),
    plan: Math.round(clamp(input.planCompletion, 0, 100) * 2.5),
    readiness: Math.round(clamp(input.activationCompletion, 0, 100) * 2.5),
    activity: Math.min(whole(input.savedCountries), 5) * 20
      + Math.min(whole(input.comparisons), 3) * 25
      + Math.min(whole(input.documentReviews), 3) * 25
      + Math.min(whole(input.learningPaths), 1) * 50,
  };
  const points = Math.round(
    clamp(
      breakdown.identity
        + breakdown.plan
        + breakdown.readiness
        + breakdown.activity,
      0,
      1000,
    ),
  );
  const currentIndex = GLOBAL_RANKS.reduce(
    (index, rank, candidateIndex) =>
      points >= rank.threshold ? candidateIndex : index,
    0,
  );
  const current = GLOBAL_RANKS[currentIndex];
  const nextRank = GLOBAL_RANKS[currentIndex + 1] ?? null;
  const rankCeiling = nextRank?.threshold ?? 1000;
  const progressWithinRank = Math.round(
    clamp(
      ((points - current.threshold) /
        Math.max(rankCeiling - current.threshold, 1))
        * 100,
      0,
      100,
    ),
  );

  return {
    ...current,
    breakdown,
    nextRank,
    points,
    pointsToNext: nextRank ? Math.max(nextRank.threshold - points, 0) : 0,
    progressWithinRank,
  };
}
