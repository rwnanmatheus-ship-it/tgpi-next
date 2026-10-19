export type GlobalRankId =
  | "global-initiate"
  | "pathfinder"
  | "explorer"
  | "navigator"
  | "global-strategist"
  | "global-polymath"
  | "research-fellow"
  | "global-architect"
  | "distinguished-polymath"
  | "institute-laureate";

export type GlobalRankDefinition = {
  description: string;
  id: GlobalRankId;
  image: string;
  name: string;
  threshold: number;
  courses: number;
  plan: number;
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
  completedCourses: number;
  planCompletion: number;
  breakdown: GlobalRankBreakdown;
  nextRank: GlobalRankDefinition | null;
  points: number;
  pointsToNext: number;
  progressWithinRank: number;
};

export const GLOBAL_RANK_DISCLAIMER =
  "Your TGPI rank reflects progress inside the product. It is not immigration eligibility, an academic qualification or a professional credential.";

export const GLOBAL_RANK_MAX_POINTS = 10000;
export const GLOBAL_RANK_VERSION = 2;
// Existing activity is recalculated; no learning history is deleted.
export const GLOBAL_RANKS: readonly GlobalRankDefinition[] = [
  {"id": "global-initiate", "name": "Global Initiate", "threshold": 0, "courses": 0, "plan": 0, "image": "/images/ranks/v2/global-initiate.svg", "description": "Build a focused global profile and a deliberate personal plan."},
  {"id": "pathfinder", "name": "Pathfinder", "threshold": 350, "courses": 0, "plan": 40, "image": "/images/ranks/v2/pathfinder.svg", "description": "Build a focused global profile and a deliberate personal plan."},
  {"id": "explorer", "name": "Explorer", "threshold": 800, "courses": 1, "plan": 60, "image": "/images/ranks/v2/explorer.svg", "description": "1 completed courses and 60% personal plan required. Progress through learning, research and preparation."},
  {"id": "navigator", "name": "Navigator", "threshold": 1600, "courses": 2, "plan": 70, "image": "/images/ranks/v2/navigator.svg", "description": "2 completed courses and 70% personal plan required. Progress through learning, research and preparation."},
  {"id": "global-strategist", "name": "Global Strategist", "threshold": 2600, "courses": 3, "plan": 80, "image": "/images/ranks/v2/global-strategist.svg", "description": "3 completed courses and 80% personal plan required. Progress through learning, research and preparation."},
  {"id": "research-fellow", "name": "Research Fellow", "threshold": 3800, "courses": 5, "plan": 90, "image": "/images/ranks/v2/research-fellow.svg", "description": "5 completed courses and 90% personal plan required. Progress through learning, research and preparation."},
  {"id": "global-architect", "name": "Global Architect", "threshold": 5200, "courses": 7, "plan": 90, "image": "/images/ranks/v2/global-architect.svg", "description": "7 completed courses and 90% personal plan required. Progress through learning, research and preparation."},
  {"id": "global-polymath", "name": "Global Polymath", "threshold": 6800, "courses": 9, "plan": 100, "image": "/images/ranks/v2/global-polymath.svg", "description": "9 completed courses and 100% personal plan required. Progress through learning, research and preparation."},
  {"id": "distinguished-polymath", "name": "Distinguished Polymath", "threshold": 8400, "courses": 11, "plan": 100, "image": "/images/ranks/v2/distinguished-polymath.svg", "description": "11 completed courses and 100% personal plan required. Progress through learning, research and preparation."},
  {"id": "institute-laureate", "name": "Institute Laureate", "threshold": 10000, "courses": 12, "plan": 100, "image": "/images/ranks/v2/institute-laureate.svg", "description": "12 completed courses and 100% personal plan required. Progress through learning, research and preparation."},
] as const;

function clamp(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) return minimum;
  return Math.min(Math.max(value, minimum), maximum);
}

function whole(value: number) {
  return Math.floor(clamp(value, 0, Number.MAX_SAFE_INTEGER));
}

export function getGlobalRank(input: GlobalRankInput): GlobalRank {
  const courses = Math.min(whole(input.learningPaths), 12);
  const plan = clamp(input.planCompletion, 0, 100);
  const breakdown: GlobalRankBreakdown = {
    identity: Math.round(clamp(input.profileCompletion, 0, 100) * 2),
    plan: Math.round(plan * 5),
    readiness: Math.round(clamp(input.activationCompletion, 0, 100) * 5),
    activity: Math.min(whole(input.savedCountries), 8) * 25
      + Math.min(whole(input.comparisons), 4) * 100
      + Math.min(whole(input.documentReviews), 4) * 100
      + courses * 650,
  };
  const points = Math.min(GLOBAL_RANK_MAX_POINTS, Object.values(breakdown).reduce((sum, value) => sum + value, 0));
  const currentIndex = GLOBAL_RANKS.reduce(
    (index, rank, candidateIndex) =>
      points >= rank.threshold && courses >= rank.courses && plan >= rank.plan ? candidateIndex : index,
    0,
  );
  const current = GLOBAL_RANKS[currentIndex];
  const nextRank = GLOBAL_RANKS[currentIndex + 1] ?? null;
  const rankCeiling = nextRank?.threshold ?? GLOBAL_RANK_MAX_POINTS;
  const progressWithinRank = nextRank ? Math.round(
    clamp(
      ((points - current.threshold) /
        Math.max(rankCeiling - current.threshold, 1))
        * 100,
      0,
      100,
    ),
  ) : 100;

  return {
    ...current,
    completedCourses: courses,
    planCompletion: plan,
    breakdown,
    nextRank,
    points,
    pointsToNext: nextRank ? Math.max(nextRank.threshold - points, 0) : 0,
    progressWithinRank,
  };
}
