import type { GlobalRank, GlobalRankDefinition } from './global-ranks';

const courseAction = { href: '/courses', title: 'Complete your next course', actionLabel: 'Develop my skills' };
const planAction = { href: '/plan', title: 'Strengthen your personal plan', actionLabel: 'Review my plan' };

/** Every action points at a scoring source which has not reached its fixed cap. */
function getPointsAction(rank: GlobalRank) {
  if (rank.breakdown.plan < 500) return planAction;
  if (rank.breakdown.readiness < 500) return { href: '/profile', title: 'Complete your preparation', actionLabel: 'Open workspace' };
  const coursePoints = rank.completedCourses * 650 + Math.round(rank.completedCourses * 200 / 12);
  const researchPoints = Math.max(0, rank.breakdown.activity - coursePoints);
  return researchPoints < 1000
    ? { href: '/countries', title: 'Expand your country research', actionLabel: 'Explore countries' }
    : courseAction;
}

export function getRankRequirements(rank: GlobalRank, target: GlobalRankDefinition) {
  return [
    { ...getPointsAction(rank), id: 'points', label: 'Points', actual: rank.points, target: target.threshold },
    { ...courseAction, id: 'courses', label: 'Completed courses', actual: rank.completedCourses, target: target.courses },
    { ...planAction, id: 'plan', label: 'Personal plan', actual: rank.planCompletion, target: target.plan },
  ].map(item => ({
    ...item,
    remaining: Math.max(0, item.target - item.actual),
    met: item.actual >= item.target,
    percent: item.target === 0 ? 100 : Math.min(100, Math.max(0, Math.floor(item.actual / item.target * 100))),
  }));
}

/** Points can be complete while a course or plan gate still blocks promotion. */
export function getRankReadiness(rank: GlobalRank, target: GlobalRankDefinition) {
  const requirements = getRankRequirements(rank, target);
  const met = requirements.filter(item => item.met).length;
  const percent = Math.floor(requirements.reduce((sum, item) => sum + item.percent, 0) / requirements.length);
  return { requirements, met, percent, eligible: met === requirements.length };
}

export function getNextRankAction(rank: GlobalRank) {
  if (!rank.nextRank) return null;
  const requirements = getRankRequirements(rank, rank.nextRank);
  return requirements.find(item => item.id === 'courses' && !item.met)
    ?? requirements.find(item => item.id === 'plan' && !item.met)
    ?? requirements.find(item => !item.met)
    ?? null;
}
