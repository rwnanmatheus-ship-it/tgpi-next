import type { GlobalWorkspaceModel, WorkspaceAction } from './global-workspace.ts';
import type { ResearchContext } from './intelligence/core.ts';

export const fitGoalLabels: Record<string, string> = { study: 'Study abroad', work: 'Work globally', live: 'Live in another country', travel: 'Travel smarter', learn: 'Expand global knowledge' };
export const fitPriorityLabels: Record<string, string> = { safety: 'Safety', cost: 'Cost of living', career: 'Career', 'quality-of-life': 'Quality of life', documentation: 'Documentation', education: 'Education', language: 'Language', culture: 'Culture' };

/** User input coverage is never a destination compatibility or eligibility score. */
export function fitContextSignals(context: ResearchContext) {
  return [
    { label: 'Primary goal', complete: Boolean(fitGoalLabels[context.primaryGoal]) },
    { label: 'Monthly budget, USD', complete: Boolean(context.budgetRange && context.budgetRange !== 'undecided') },
    { label: 'Time horizon', complete: Boolean(context.timeHorizon && context.timeHorizon !== 'exploring') },
    { label: 'Languages', complete: context.languages.some(language => language.trim().length > 0) },
    { label: 'Decision priorities', complete: context.priorities.filter(p => p in fitPriorityLabels).length >= 3 },
  ];
}

export function prioritizePlanActions(model: Pick<GlobalWorkspaceModel, 'actions' | 'completion'>, horizon: string): WorkspaceAction[] {
  const urgent = horizon === 'now' || horizon === '3-months';
  const order: Record<WorkspaceAction['id'], number> = { profile: model.completion < 100 ? 0 : 6, documents: urgent ? 1 : 3, cost: 2, compare: 4, learning: 5 };
  return [...model.actions].sort((a, b) => Number(a.status === 'completed') - Number(b.status === 'completed') || order[a.id] - order[b.id]);
}

/** Localizable instructions, with personal answers displayed separately rather than embedded in English. */
export function fitRoadmap(context: ResearchContext) {
  const goal = context.primaryGoal;
  return [
    { id: 'route', title: 'Verify your legal route', detail: 'Check destination entry and permitted activities for your citizenship before committing to dates or payments.', href: '#documents-to-verify' },
    { id: 'budget', title: 'Build a city-level budget', detail: 'Collect dated local quotes, include arrival costs and test a contingency in your scenario.', href: '#research-workbench' },
    goal === 'study'
      ? { id: 'pathway', title: 'Check the institution and program', detail: 'Verify accreditation, admission criteria, language requirements, tuition and deadlines with the institution and competent authority.', href: '#documents-to-verify' }
      : goal === 'work'
        ? { id: 'pathway', title: 'Validate your professional pathway', detail: 'Check qualification recognition, professional licensing, language requirements and work authorization separately.', href: '#documents-to-verify' }
        : goal === 'travel'
          ? { id: 'pathway', title: 'Prepare your arrival', detail: 'Check travel documents, insurance, accommodation and local transport for your actual itinerary.', href: '/passport' }
          : goal === 'learn'
            ? { id: 'pathway', title: 'Choose your learning path', detail: 'Choose a course that supports your goal and continue from your saved learning progress.', href: '/courses' }
            : { id: 'pathway', title: 'Prepare your arrival', detail: 'Research housing, healthcare, local registration and the practical steps for settling in.', href: '#documents-to-verify' },
    { id: 'learning', title: 'Prepare your learning plan', detail: 'Compare your language skills with your destination requirements and build a practical study routine.', href: '/courses' },
  ];
}

/** Academy, professional and legacy editions share the account's canonical learning projection. */
export function connectPlanLearning(model: GlobalWorkspaceModel, summary: import('./learning/unified-progress.ts').LearningSummary): GlobalWorkspaceModel {
  const next = summary.items.find(item => item.status !== 'completed') ?? summary.items[0];
  const complete = summary.items.length > 0 && summary.items.every(item => item.status === 'completed') && summary.unavailable.length === 0;
  const status = complete ? 'completed' : next ? 'in_progress' : summary.unavailable.length ? 'needs_attention' : 'not_started';
  const actions = model.actions.map(action => action.id !== 'learning' ? action : { ...action, status, href: next?.href ?? '/courses', action: next ? complete ? 'Review completed path' : 'Continue learning' : 'Explore learning paths' } as WorkspaceAction);
  const currentItems = summary.items.filter(item => item.status !== 'edition_changed');
  const total = currentItems.reduce((sum, item) => sum + item.total, 0);
  const done = currentItems.reduce((sum, item) => sum + Math.min(item.completed, item.total), 0);
  const journey = model.journey.map(stage => stage.id !== 'develop' ? stage : { ...stage, status, href: next?.href ?? '/courses', progress: total ? Math.min(100, Math.round(done / total * 100)) : 0 } as typeof stage);
  const completed = actions.filter(action => action.status === 'completed').length;
  return { ...model, actions, journey, currentStageId: (journey.find(stage => stage.status !== 'completed') ?? journey[journey.length - 1]).id,
    activationCompletion: completed * 20,
    actionSummary: { completed, inProgress: actions.filter(a => a.status === 'in_progress').length, needsContext: actions.filter(a => a.status === 'needs_attention').length, ready: actions.filter(a => a.status === 'not_started').length },
  };
}
