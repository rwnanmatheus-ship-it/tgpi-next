'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import { learningStatusLabels } from '@/lib/learning/unified-progress';
import type { WorkspaceAction } from '@/lib/global-workspace';
import type { PlanLearningPath, PlanPreparation } from '@/lib/personal-plan';

const firstSteps: Record<WorkspaceAction['id'], string> = {
  profile: 'Save one decision about your goal, timeline or priorities.',
  documents: 'Find the official authority and record one requirement to verify.',
  compare: 'Compare two destinations against your most important criterion.',
  cost: 'Add one dated local quote to your city scenario.',
  learning: 'Complete one activity, then recall the main idea without looking at the lesson.',
};

const fallbackActions = {
  time: 'If time runs short, do the first step now and schedule the rest for another day.',
  evidence: 'If you cannot verify a detail, write down the question and the official source that can answer it.',
  clarity: 'If the next step feels too broad, define one result you can finish in this session.',
};

export function PlanActionLink({ href, children, className = 'plan-button' }: { href: string; children: React.ReactNode; className?: string }) {
  return href.startsWith('/plan?') || href.startsWith('#')
    ? <a href={href} className={className}>{children}</a>
    : <Link href={href} className={className}>{children}</Link>;
}

export function PlanFocus({ action }: { action: WorkspaceAction }) {
  const { t } = useLocale();
  const [obstacle, setObstacle] = useState<keyof typeof fallbackActions>('time');
  return <section className="plan-panel plan-focus" aria-labelledby="plan-focus-title">
    <div>
      <p className="plan-kicker">{t('This week')}</p>
      <h2 id="plan-focus-title">{t('Make the next step manageable')}</h2>
      <p>{t(firstSteps[action.id])}</p>
    </div>
    <div>
      <label htmlFor="plan-obstacle">{t('What might get in the way?')}</label>
      <select id="plan-obstacle" value={obstacle} onChange={event => setObstacle(event.target.value as keyof typeof fallbackActions)}>
        <option value="time">{t('Limited time')}</option>
        <option value="evidence">{t('Missing information')}</option>
        <option value="clarity">{t('Unclear next step')}</option>
      </select>
      <p className="plan-footnote" aria-live="polite">{t(fallbackActions[obstacle])}</p>
    </div>
  </section>;
}

const budgetLabels: Record<PlanPreparation['budget'], string> = {
  ready: 'Scenario documented',
  partial: 'Partial scenario',
  estimate: 'Monthly estimate only',
  missing: 'No saved scenario',
  unavailable: 'Scenarios temporarily unavailable',
};

export function PlanPreparationPanel({ preparation, readOnly }: { preparation: PlanPreparation[]; readOnly: boolean }) {
  const { t } = useLocale();
  return <>
    <div className="plan-section-head"><h2>{t('Preparation by destination')}</h2></div>
    {preparation.length ? <div className="plan-prep-grid">{preparation.map(item => <article className="plan-panel plan-prep-card" key={item.slug}>
      <h3>{t(item.name)}</h3>
      <dl>
        <div><dt>{t('Document checklist')}</dt><dd>{readOnly ? t('Saved progress unavailable') : `${item.documents.completedItems}/${item.documents.totalItems}`}</dd></div>
        <div><dt>{t('City budget')}</dt><dd>{t(budgetLabels[item.budget])}</dd></div>
      </dl>
      <div className="plan-links">
        <Link className="plan-button" href={`/countries/${item.slug}#documents-to-verify`}>{t('Document checklist')} ↗</Link>
        <PlanActionLink href={item.budgetHref}>{t('Open budget scenarios')} ↗</PlanActionLink>
      </div>
    </article>)}</div> : <div className="plan-panel"><p>{t('Choose a destination to open your three private budget scenarios.')}</p><Link className="plan-button primary" href="/country-fit">{t('Build my Country Fit')} ↗</Link></div>}
  </>;
}

export function PlanCoursePath({ path, goalLabel, unavailable }: { path: PlanLearningPath[]; goalLabel: string; unavailable: boolean }) {
  const { t } = useLocale();
  if (!path.length) return null;
  return <>
    <div className="plan-section-head"><h2>{t('Courses for your goal')}</h2><span className="plan-badge">{t(goalLabel)}</span></div>
    <div className="plan-prep-grid">{path.map(({ course, progress }) => <article className="plan-panel plan-prep-card" key={course.id}>
      <span className="plan-badge" data-status={progress?.status}>{t(progress ? learningStatusLabels[progress.status] : unavailable ? 'Saved progress unavailable' : 'Ready to start')}</span>
      <h3>{t(course.title)}</h3>
      {progress && progress.status !== 'edition_changed' && <p className="plan-footnote">{progress.completed}/{progress.total} {t('Activities recorded')}</p>}
      <Link className="plan-button" href={progress?.href ?? course.href}>{t(progress?.status === 'completed' ? 'Review completed path' : progress?.status === 'review_due' ? 'Open course review' : progress && progress.status !== 'edition_changed' ? 'Continue learning' : 'Open course')} ↗</Link>
    </article>)}</div>
  </>;
}
