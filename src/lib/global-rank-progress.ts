import type { GlobalRank, GlobalRankDefinition } from './global-ranks';

export function getRankRequirements(rank: GlobalRank, target: GlobalRankDefinition) {
  return [
    { id: 'points', label: 'Points', actual: rank.points, target: target.threshold, href: '/countries' },
    { id: 'courses', label: 'Completed courses', actual: rank.completedCourses, target: target.courses, href: '/courses' },
    { id: 'plan', label: 'Personal plan', actual: rank.planCompletion, target: target.plan, href: '/plan' },
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
