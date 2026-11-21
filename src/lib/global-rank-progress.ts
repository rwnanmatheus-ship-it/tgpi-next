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

/** Recommend only scoring sources which have not reached their fixed caps. */
export function getNextRankAction(rank: GlobalRank) {
  if (!rank.nextRank) return null;
  const requirements = getRankRequirements(rank, rank.nextRank);
  const requirement = requirements.find(item => item.id === 'courses' && !item.met)
    ?? requirements.find(item => item.id === 'plan' && !item.met)
    ?? requirements.find(item => !item.met);
  if (!requirement) return null;
  const courseAction = { href: '/courses', title: 'Complete your next course', label: 'Develop my skills' };
  const planAction = { href: '/plan', title: 'Strengthen your personal plan', label: 'Review my plan' };
  if (requirement.id === 'courses') return { ...requirement, ...courseAction };
  if (requirement.id === 'plan' || rank.breakdown.plan < 500) return { ...requirement, ...planAction };
  if (rank.breakdown.readiness < 500) {
    return { ...requirement, href: '/profile', title: 'Complete your preparation', label: 'Open workspace' };
  }
  const learningPoints = rank.completedCourses * 650 + Math.round(rank.completedCourses * 200 / 12);
  const researchPoints = rank.breakdown.activity - learningPoints;
  if (researchPoints < 1000) return { ...requirement, href: '/countries', title: 'Expand your country research', label: 'Explore countries' };
  return { ...requirement, ...courseAction };
}
