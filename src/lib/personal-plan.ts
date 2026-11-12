import { buildGlobalWorkspaceModel, type GlobalWorkspaceModel, type WorkspaceAction, type WorkspaceJourneyStageId } from './global-workspace.ts';
import { summarizeDocumentReview } from './document-review.ts';
import type { TgpiActivationProgress } from './activation-progress.ts';
import type { Country } from './countries.ts';
import type { LearningProgressItem, LearningSummary } from './learning/unified-progress.ts';
import type { TgpiOnboardingData } from '../types/onboarding.ts';
import type { Course } from '../types/course.ts';
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

export type PlanScenarioSlot = '1' | '2' | '3';
export type PlanBudgetEvidence = { status: 'complete' | 'partial'; slot: PlanScenarioSlot };
export type PlanPreparation = {
  slug: string;
  name: string;
  documents: ReturnType<typeof summarizeDocumentReview>;
  budget: 'ready' | 'partial' | 'estimate' | 'missing' | 'unavailable';
  budgetHref: string;
};

const coursesByGoal = {
  study: ['study-abroad-planning', 'global-english-2026'],
  work: ['international-career', 'global-english-2026'],
  live: ['arrival-playbook', 'relocation-budget'],
  travel: ['digital-safety-abroad', 'cross-cultural-confidence'],
  learn: ['evidence-literacy', 'country-fit'],
} satisfies Record<Exclude<TgpiOnboardingData['primaryGoal'], ''>, string[]>;

export function planCourseRecommendations(goal: TgpiOnboardingData['primaryGoal'], catalogue: readonly Pick<Course, 'id' | 'title'>[]) {
  if (!goal) return [];
  return coursesByGoal[goal].flatMap(id => {
    const course = catalogue.find(item => item.id === id);
    return course ? [{ id: course.id, title: course.title, href: `/courses/${course.id}` }] : [];
  });
}

type PlanCourse = ReturnType<typeof planCourseRecommendations>[number];
export type PlanLearningPath = { course: PlanCourse; progress?: LearningProgressItem };

export function connectPlanLearning(model: GlobalWorkspaceModel, summary: LearningSummary, path: PlanLearningPath[] = []): GlobalWorkspaceModel {
  const relevant = path.length
    ? path.flatMap(entry => entry.progress ? [entry.progress] : [])
    : summary.items;
  const open = path.find(entry => entry.progress?.status === 'review_due')
    ?? path.find(entry => entry.progress?.status === 'revision_requested')
    ?? path.find(entry => entry.progress?.status === 'in_progress')
    ?? path.find(entry => entry.progress?.status !== 'completed');
  const next = path.length ? (open ? open.progress : relevant[0])
    : relevant.find(item => item.status === 'review_due' || item.status === 'revision_requested')
      ?? relevant.find(item => item.status !== 'completed')
      ?? relevant[0];
  const href = next?.href ?? open?.course.href ?? '/courses';
  const complete = relevant.length > 0 && (!path.length || path.length === relevant.length)
    && relevant.every(item => item.status === 'completed') && summary.unavailable.length === 0;
  const status = complete ? 'completed' : summary.unavailable.length ? 'needs_attention'
    : relevant.some(item => item.status !== 'edition_changed') ? 'in_progress' : 'not_started';
  const action = complete ? 'Review completed path' : next?.status === 'review_due' ? 'Open course review'
    : next && next.status !== 'completed' && next.status !== 'edition_changed' ? 'Continue learning'
    : open || next ? 'Open course' : 'Explore learning paths';
  const currentItems = relevant.filter(item => item.status !== 'edition_changed');
  const progress = path.length
    ? Math.floor(path.reduce((sum, entry) => sum + (entry.progress?.status === 'completed' ? 100 : entry.progress?.status === 'edition_changed' || !entry.progress?.total ? 0 : Math.min(100, entry.progress.completed / entry.progress.total * 100)), 0) / path.length)
    : Math.floor(currentItems.reduce((sum, item) => sum + Math.min(item.completed, item.total), 0) / (currentItems.reduce((sum, item) => sum + item.total, 0) || 1) * 100);

  return {
    ...model,
    actions: model.actions.map(item => item.id === 'learning' ? { ...item, status, href, action } : item),
    journey: model.journey.map(stage => stage.id === 'develop'
      ? { ...stage, status, href, progress: complete ? 100 : Math.min(99, progress) }
      : stage),
  };
}

const actionStages: Record<WorkspaceAction['id'], WorkspaceJourneyStageId> = {
  profile: 'discover', compare: 'decide', cost: 'decide', documents: 'prepare', learning: 'develop',
};

export function buildPersonalPlan(
  onboarding: TgpiOnboardingData,
  countries: Country[],
  activation: TgpiActivationProgress,
  learning: LearningSummary,
  catalogue: readonly Course[],
  budgetEvidence: Record<string, PlanBudgetEvidence> | null,
  activationReadOnly: boolean,
) {
  const learningOnly = onboarding.primaryGoal === 'learn';
  const destinations = onboarding.targetCountries.filter(slug => countries.some(country => country.slug === slug));
  const comparisons = activation.comparisons.filter(comparison =>
    comparison.goal === onboarding.primaryGoal
    && comparison.countrySlugs.length === destinations.length
    && new Set(comparison.countrySlugs).size === destinations.length
    && destinations.every(slug => comparison.countrySlugs.includes(slug)));
  const scoped = {
    ...activation,
    comparisons,
    costEstimates: Object.fromEntries(destinations.flatMap(slug => activation.costEstimates[slug] ? [[slug, activation.costEstimates[slug]]] : [])),
    documentReviews: Object.fromEntries(destinations.flatMap(slug => activation.documentReviews[slug] ? [[slug, activation.documentReviews[slug]]] : [])),
  };
  const path = planCourseRecommendations(onboarding.primaryGoal, catalogue).map(course => ({
    course,
    progress: learning.items.find(item => item.courseId === course.id),
  }));
  const model = connectPlanLearning(buildGlobalWorkspaceModel(onboarding, countries, scoped, catalogue), learning, path);
  const preparation: PlanPreparation[] = model.countryFits.map(({ country }) => ({
    slug: country.slug,
    name: country.name,
    documents: summarizeDocumentReview(scoped.documentReviews[country.slug]),
    budget: budgetEvidence?.[country.slug]?.status === 'complete' ? 'ready'
      : budgetEvidence?.[country.slug]?.status === 'partial' ? 'partial'
      : scoped.costEstimates[country.slug] ? 'estimate'
      : budgetEvidence === null ? 'unavailable' : 'missing',
    budgetHref: `/plan?country=${country.slug}${budgetEvidence?.[country.slug] ? `&scenario=${budgetEvidence[country.slug].slot}` : ''}#budget`,
  }));
  const documentTarget = preparation.find(item => item.documents.status !== 'completed') ?? preparation[0];
  const budgetTarget = preparation.find(item => item.budget !== 'ready') ?? preparation[0];
  const docCount = preparation.reduce((sum, item) => sum + item.documents.completedItems, 0);
  const docTotal = preparation.reduce((sum, item) => sum + item.documents.totalItems, 0);
  const budgetCount = preparation.filter(item => item.budget === 'ready').length;
  const documents = model.actions.find(item => item.id === 'documents')!;
  const cost = model.actions.find(item => item.id === 'cost')!;
  const profile = model.actions.find(item => item.id === 'profile')!;
  if (documentTarget) {
    documents.status = activationReadOnly ? 'needs_attention' : docCount === docTotal ? 'completed' : docCount ? 'in_progress' : 'not_started';
    documents.description = 'Record the official source and the date you checked the requirements for your route.';
    documents.href = `/countries/${documentTarget.slug}#documents-to-verify`;
    documents.action = `Review ${documentTarget.name}`;
  }
  if (budgetTarget) {
    cost.status = budgetEvidence === null ? 'needs_attention' : budgetCount === preparation.length ? 'completed'
      : preparation.some(item => item.budget === 'partial' || item.budget === 'estimate' || item.budget === 'ready') ? 'in_progress' : 'not_started';
    cost.title = 'Build a city-level budget';
    cost.description = 'Save a city scenario with all cost fields, a quote date and a source note.';
    cost.action = 'Open budget scenarios';
    cost.href = budgetTarget.budgetHref;
  }
  if (activationReadOnly && destinations.length > 1) {
    const compare = model.actions.find(item => item.id === 'compare');
    if (compare) compare.status = 'needs_attention';
  }
  if (learningOnly) {
    model.progress = model.progress.filter(item => !['Country shortlist', 'Timeline and budget'].includes(item.label));
    model.completion = Math.round(model.progress.filter(item => item.complete).length / model.progress.length * 100);
    profile.status = model.completion === 100 ? 'completed' : 'in_progress';
    profile.description = 'Save your learning goal, priorities and personal context.';
  }
  model.actions = model.actions.filter(item => learningOnly
    ? item.id === 'profile' || item.id === 'learning'
    : item.id !== 'compare' || destinations.length > 1);
  model.journey = model.journey
    .filter(stage => !learningOnly || stage.id === 'discover' || stage.id === 'develop')
    .map(stage => {
      if (stage.id === 'discover' && learningOnly) return { ...stage, description: profile.description, progress: model.completion, status: profile.status };
      if (stage.id === 'prepare') return { ...stage, href: documents.href, status: documents.status, progress: docTotal ? Math.floor(docCount / docTotal * 100) : 0 };
      if (stage.id !== 'decide') return stage;
      const signals = model.actions.filter(item => actionStages[item.id] === 'decide');
      const units = signals.reduce((sum, item) => sum + (item.id === 'cost'
        ? budgetCount / (preparation.length || 1)
        : Number(item.status === 'completed')), 0);
      return { ...stage, href: destinations.length > 1 && signals.some(item => item.id === 'compare' && item.status !== 'completed') ? model.compareHref : cost.href,
        progress: Math.floor(units / signals.length * 100),
        status: signals.every(item => item.status === 'completed') ? 'completed' as const
          : signals.some(item => item.status === 'needs_attention') ? 'needs_attention' as const
          : signals.some(item => item.status === 'in_progress' || item.status === 'completed') ? 'in_progress' as const : 'not_started' as const };
    });

  const actions = prioritizePlanActions(model, onboarding.timeHorizon);
  // A known goal and destination are enough to act on a near-term checklist.
  // Learning can also begin while a learner adds optional planning context.
  const urgent = onboarding.timeHorizon === 'now' || onboarding.timeHorizon === '3-months';
  const focus = learningOnly ? 'learning' : urgent && onboarding.primaryGoal && destinations.length ? 'documents' : null;
  const focusIndex = actions.findIndex(item => item.id === focus && item.status !== 'completed' && item.status !== 'needs_attention');
  if (focusIndex > 0) actions.unshift(...actions.splice(focusIndex, 1));
  const next = actions.find(item => item.status !== 'completed');
  const count = (status: WorkspaceAction['status']) => actions.filter(item => item.status === status).length;
  const completed = count('completed');
  model.actionSummary = { completed, inProgress: count('in_progress'), needsContext: count('needs_attention'), ready: count('not_started') };
  model.activationCompletion = Math.round(completed / actions.length * 100);
  model.currentStageId = next ? actionStages[next.id] : model.journey.at(-1)!.id;
  model.actions = actions;
  return { model, preparation, path };
}
