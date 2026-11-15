'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from '@/components/localization/LocalizedImage';
import { LocalizedText, useLocale } from '@/components/localization/LocaleProvider';
import { learningStatusLabels, type LearningSummary } from '@/lib/learning/unified-progress';
import type { GlobalWorkspaceModel, WorkspaceAction, WorkspaceActionStatus } from '@/lib/global-workspace';
import type { PlanFundScenario, PlanLearningPath, PlanPreparation, PlanScenarioSlot } from '@/lib/personal-plan';
import { PlanActionLink, PlanCoursePath, PlanFocus, PlanPreparationPanel } from './PlanExecution';
import { PROGRESS_SYNC_CHANNEL, PROGRESS_SYNC_EVENT } from '@/lib/progress-sync';
import PlanHero from './PlanHero';
import { planActivityCopy, planCopy } from './plan-copy';
import PlanTabs from './PlanTabs';
import PlanBudget from './PlanBudget';
import PlanMilestones from './PlanMilestones';
import PlanReserve from './PlanReserve';
import { usePlanExecution } from './usePlanExecution';
import { rankMilestones, type PlanExecution } from '@/lib/plan-execution';
import './plan.css';

const statusLabels: Record<WorkspaceActionStatus, string> = { completed: 'Completed', in_progress: 'In progress', needs_attention: 'Context needed', not_started: 'Ready to start' };

type Props = {
  firstName: string;
  model: GlobalWorkspaceModel;
  learning: LearningSummary;
  path: PlanLearningPath[];
  preparation: PlanPreparation[];
  execution: PlanExecution | null;
  initialDate: string;
  fundingScenarios: PlanFundScenario[];
  fundingUnavailable: boolean;
  budgetCountry?: string;
  budgetSlot?: PlanScenarioSlot;
  activationReadOnly: boolean;
};

export default function PersonalPlanDashboard({ firstName, model, learning: learningSummary, path, preparation, execution, initialDate, fundingScenarios, fundingUnavailable, budgetCountry, budgetSlot, activationReadOnly }: Props) {
  const { t, locale } = useLocale();
  const router = useRouter();
  const copy = (value: string) => planCopy(value, t, locale);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let pending = false;
    const refresh = () => {
      pending = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (document.visibilityState !== 'visible') return;
        pending = false;
        router.refresh();
      }, 400);
    };
    const refreshWhenVisible = () => {
      if (pending && document.visibilityState === 'visible') refresh();
    };
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(PROGRESS_SYNC_CHANNEL) : null;
    if (channel) channel.onmessage = refresh;
    window.addEventListener(PROGRESS_SYNC_EVENT, refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refreshWhenVisible);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    return () => {
      clearTimeout(timer);
      channel?.close();
      window.removeEventListener(PROGRESS_SYNC_EVENT, refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('pageshow', refreshWhenVisible);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, [router]);
  const plan = usePlanExecution(execution, initialDate);
  const milestones = plan.state?.milestones ?? [];
  const countries = model.countryFits.map(fit => ({ slug: fit.country.slug, name: fit.country.name }));
  const nextMilestone = rankMilestones(milestones, plan.today).find(item => item.status !== 'done');
  const overdueCount = milestones.filter(item => item.status !== 'done' && item.due && item.due < plan.today).length;
  const blockedCount = milestones.filter(item => item.status === 'blocked').length;
  const feedbackCopy = {
    saved: 'Plan saved.', ready: 'Plan loaded.',
    conflict: 'Your plan changed on another device. The latest version is visible below. Review your edits before saving again.',
    authentication: 'Sign in again to save your personal plan.',
    storage: 'Your plan could not be saved or loaded. Try again.',
    input: 'Check the details and date before saving.',
    limit: 'You have reached the milestone limit.',
  };
  const actions = model.actions;
  const nextAction = actions.find(action => action.status !== 'completed');
  const learning = actions.find(action => action.id === 'learning');
  const otherLearning = learningSummary.items.filter(item => !path.some(entry => entry.course.id === item.courseId));
  const currentStage = model.journey.find(stage => stage.id === model.currentStageId);
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' });
  const date = (value: string) => Number.isFinite(Date.parse(value)) ? `${dateFormatter.format(new Date(value))} UTC` : t('Not available');
  function actionCard(action: WorkspaceAction) {
    return <article className="plan-panel plan-action" key={action.id}>
      <div className="plan-action-body"><span className="plan-badge" data-status={action.status}>{t(statusLabels[action.status])}</span><h3>{t(action.title)}</h3><p>{copy(action.description)}</p><PlanActionLink href={action.href}>{copy(action.action)} <span aria-hidden="true">↗</span></PlanActionLink></div>
    </article>;
  }
  return <main className="plan-shell plan-dashboard"><div className="plan-container">
    <PlanHero eyebrow="TGPI / Personal Global Plan" title="From decision" accent="to action." description="Track your next step, prepare each destination and fund your move from one private plan." asset="workspace-global-focus" framing="learning">
      <div className="plan-actions"><a className="plan-button primary" href="#execution">{t('Open my roadmap')} <span aria-hidden="true">↓</span></a><Link className="plan-button" href="/country-fit">{t('Refine Country Fit')} ↗</Link></div>
    </PlanHero>
    <div className="plan-stats">{[
      ['Plan foundation', `${model.completion}%`], ['Countries in your plan', String(model.selectedCountryCount)], ['Recorded actions', `${model.actionSummary.completed}/${model.actions.length}`], ['Current stage', t(currentStage?.label ?? 'Discover')],
    ].map(([label, value]) => <div className="plan-stat" key={label}><span>{t(label)}</span><strong style={label === 'Current stage' ? { fontSize: 17 } : undefined}>{value}</strong></div>)}</div>
    <PlanTabs id="personal-plan" tabs={[
      { id: 'overview', label: 'Overview', content: <>
        <section className="plan-panel plan-execution-summary" aria-labelledby="plan-next-milestone">
          <div>
            <p className="plan-kicker">{t('Your roadmap')}</p>
            <h2 id="plan-next-milestone">{nextMilestone?.title ?? t('What will you do next?')}</h2>
            <p>{nextMilestone?.next || (nextMilestone?.due ? new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(nextMilestone.due)) : t('Choose a milestone, set a date and connect it to a TGPI tool.'))}</p>
          </div>
          <div className="plan-summary-metrics">
            <div><strong>{overdueCount}</strong><span>{t('Overdue')}</span></div>
            <div><strong>{blockedCount}</strong><span>{t('Blocked')}</span></div>
            <PlanActionLink href="#execution" className="plan-button primary">{t('Open my roadmap')} ↗</PlanActionLink>
          </div>
        </section>
        <div className="plan-grid"><section className="plan-panel accent"><p className="plan-kicker">{t('Priority engine')}</p><p className="plan-person">{firstName} · {t(model.goalLabel)}</p><h2>{t(nextAction?.title ?? 'Review your next move')}</h2><p>{copy(nextAction?.description ?? 'Your recorded actions are complete. Revisit your evidence whenever your plans change.')}</p><div className="plan-actions"><PlanActionLink href={nextAction?.href ?? '/onboarding'}>{copy(nextAction?.action ?? 'Edit plan context')} ↗</PlanActionLink></div><p className="plan-footnote">{t('Ordered by missing context, timeline and recorded progress.')}</p></section>
        <section className="plan-panel"><div className="plan-ring-row"><div className="plan-ring" role="img" aria-label={t('Plan foundation') + `: ${model.completion}%`} style={{ background: `conic-gradient(#c5a05b ${model.completion}%, #e8edf4 0)` }}><span>{model.completion}%</span></div><div><p className="plan-kicker">{t('Plan foundation')}</p><h3>{t('What is ready?')}</h3><p className="plan-footnote">{t('Profile completeness, not permission to travel.')}</p></div></div><ul className="plan-checklist">{model.progress.map(item => <li key={item.label} data-complete={item.complete}><span aria-hidden="true">{item.complete ? '✓' : '○'}</span><span>{t(item.label)}</span><span className="sr-only">{t(item.complete ? 'Completed' : 'Context needed')}</span></li>)}</ul></section></div>
        {nextAction && <PlanFocus action={nextAction} />}
        <div className="plan-section-head"><h2><LocalizedText text="Your global decision journey" /></h2><Link href="/onboarding">{t('Edit plan context')} ↗</Link></div>
        <div className="plan-journey">{model.journey.map(stage => <PlanActionLink key={stage.id} href={stage.href} className={`plan-stage ${stage.id === model.currentStageId ? 'active' : ''}`}><p className="plan-kicker">{t(statusLabels[stage.status])}</p><h3>{t(stage.label)}</h3><p>{t(stage.description)}</p><div className="plan-progress" role="progressbar" aria-label={t(stage.label)} aria-valuenow={stage.progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${stage.progress}%` }} /></div><small>{stage.progress}%</small></PlanActionLink>)}</div>
        <div className="plan-section-head"><h2>{t('Plan profile')}</h2></div><div className="plan-grid"><section className="plan-panel"><dl className="plan-profile">{model.planSummary.map(item => <div key={item.label}><dt>{t(item.label)}</dt><dd>{copy(item.value)}</dd></div>)}</dl></section><section className="plan-panel"><p className="plan-kicker">{t('Connected decision system')}</p><h2>{t('Keep your next step in reach.')}</h2><p>{t('Move between research, documents, learning and Atlas with your TGPI profile connected.')}</p><div className="plan-links"><Link className="plan-button" href="/atlas">{t('Ask Atlas')} ↗</Link><Link className="plan-button" href="/passport">{t('Documents')} ↗</Link><Link className="plan-button" href="/profile">{t('My space')} ↗</Link></div></section></div>
      </> },
      { id: 'execution', label: 'Roadmap', content: <>
        <div className="plan-execution-status">
          <p role="status" className={plan.feedback ? 'plan-callout' : undefined}>{plan.feedback ? t(feedbackCopy[plan.feedback]) : plan.busy ? t('Saving your plan…') : null}</p>
          {plan.feedback === 'authentication' && <Link className="plan-button" href="/sign-in?next=%2Fplan%23execution">{t('Sign in')} ↗</Link>}
        </div>
        {plan.state ? <div className="plan-execution-grid">
          <PlanMilestones milestones={milestones} actions={actions} countries={countries} revision={plan.state.revision} today={plan.today} busy={plan.busy} save={plan.request} />
          <PlanReserve reserve={plan.state.reserve} scenarios={fundingScenarios} countries={countries} revision={plan.state.revision} today={plan.today} busy={plan.busy} unavailable={fundingUnavailable} save={plan.request} />
        </div> : <section className="plan-panel">
          <h2>{t('Roadmap')}</h2><p>{t('Your saved roadmap is temporarily unavailable.')}</p>
          <button className="plan-button primary" type="button" disabled={plan.busy} onClick={() => void plan.request()}>{t('Try again')}</button>
        </section>}
      </> },
      { id: 'actions', label: 'Action plan', content: <><div className="plan-section-head"><div><p className="plan-kicker">{t('Priority engine')}</p><h2><LocalizedText text="Best next actions" /></h2></div><span className="plan-badge">{model.actionSummary.completed}/{model.actions.length} {t('Completed')}</span></div><p className="plan-footnote">{t('Ordered by missing context, timeline and recorded progress.')}</p><div className="plan-action-list">{actions.map(actionCard)}</div></> },
      { id: 'destinations', label: 'Destinations', content: <><div className="plan-section-head"><h2><LocalizedText text="Countries in your plan" /></h2><div className="plan-links"><Link className="plan-button" href="/onboarding">{t('Edit plan context')}</Link>{model.selectedCountryCount >= 2 && <Link className="plan-button primary" href={model.compareHref}>{t('Compare shortlist')} ↗</Link>}</div></div>{model.countryFits.length ? <div className="plan-destinations">{model.countryFits.map(({ country, reasons, warning }) => <article className="plan-panel plan-destination" key={country.slug}><div className="plan-country-art"><Image src={`/images/countries/identity/${country.slug}.webp`} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" className="object-cover" /><span aria-hidden="true">{country.emoji}</span></div><div className="plan-country-body"><p className="plan-kicker">{t(country.region)}</p><h3>{t(country.name)}</h3><ul>{(reasons.length ? reasons : ['Add priorities to personalize your research questions.']).map(reason => <li key={reason}>{copy(reason)}</li>)}</ul><p>{t(warning)}</p><Link className="plan-button primary" href={`/country-fit?country=${country.slug}`}>{t('Refine Country Fit')} ↗</Link><Link className="plan-button" href={`/countries/${country.slug}`}>{t('Open evidence dossier →')}</Link></div></article>)}</div> : <div className="plan-panel plan-empty"><h3>{t('Your shortlist is empty.')}</h3><p>{t('Choose a destination to open your three private budget scenarios.')}</p><Link className="plan-button primary" href="/country-fit">{t('Build my Country Fit')} ↗</Link></div>}</> },
      { id: 'preparation', label: 'Prepare', content: <PlanPreparationPanel preparation={preparation} readOnly={activationReadOnly} /> },
      { id: 'budget', label: 'Budget & scenarios', content: <PlanBudget key={`${budgetCountry ?? 'default'}:${budgetSlot ?? '1'}`} initialCountry={budgetCountry} initialSlot={budgetSlot} countries={countries} /> },
      { id: 'learning', label: 'Learning', content: <><PlanCoursePath path={path} goalLabel={model.goalLabel} unavailable={learningSummary.unavailable.length > 0} /><div className="plan-grid plan-learning-details"><div>{learning && !path.length && actionCard(learning)}{learningSummary.unavailable.length > 0 && <p className="plan-callout" role="status">{t('Some learning progress is temporarily unavailable. Try again shortly.')}</p>}<div className="plan-action-list" style={{ marginTop: 16 }}>{otherLearning.map(item => <article className="plan-panel" key={item.courseId}><span className="plan-badge">{t(learningStatusLabels[item.status])}</span><h3 style={{ marginTop: 14 }}>{t(item.title)}</h3><p className="plan-footnote">{item.status === 'edition_changed' ? t('New edition · Review your course') : `${item.completed}/${item.total}`}</p><Link className="plan-button" href={item.href}>{t(item.status === 'completed' ? 'Review completed path' : 'Continue learning')} ↗</Link></article>)}</div></div><section className="plan-panel"><p className="plan-kicker">{t('Develop')}</p><h2>{t('Skills for your next chapter.')}</h2><p>{t('Your saved course activity determines where you resume. Certificates remain connected to completed learning requirements.')}</p><div className="plan-links"><Link className="plan-button primary" href="/courses">{t('Explore learning paths')} ↗</Link><Link className="plan-button" href="/certificates">{t('Certificates')} ↗</Link></div></section></div></> },
      { id: 'activity', label: 'Activity', content: <section className="plan-panel"><p className="plan-kicker">{t('Connected decision system')}</p><h2>{t('Your latest progress')}</h2><p>{t('Saved comparisons, document reviews and learning activity appear here.')}</p>{model.recentActivities.length ? <ul className="plan-history">{model.recentActivities.map(item => <li key={item.id}><Link href={item.href}>{planActivityCopy(item.title, t, locale)} ↗</Link><time dateTime={item.occurredAt}>{date(item.occurredAt)}</time></li>)}</ul> : <p className="plan-callout">{t('No recorded activity yet. Complete your first action to start your history.')}</p>}{model.lastSyncedAt && <p className="plan-footnote">{t('Last saved activity')}: {date(model.lastSyncedAt)}</p>}</section> },
    ]} />
    <p className="plan-footnote">{t('Every stage uses your saved context and real TGPI activity. Progress is never invented.')}</p>
  </div></main>;
}
