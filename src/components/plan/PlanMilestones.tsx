'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import type { WorkspaceAction } from '@/lib/global-workspace';
import {
  isPlanDate, milestoneCategories, milestoneLimit, milestoneStatuses, planCalendar, rankMilestones,
  type Milestone, type PlanExecutionMutation,
} from '@/lib/plan-execution';
import { PlanActionLink } from './PlanExecution';

const categories: Record<Milestone['category'], string> = {
  profile: 'Plan profile', compare: 'Destinations', documents: 'Documents', cost: 'Budget & scenarios',
  learning: 'Learning', personal: 'Personal',
};
const statuses: Record<Milestone['status'], string> = { open: 'To do', blocked: 'Blocked', done: 'Completed' };
type Save = (mutation: PlanExecutionMutation) => Promise<boolean>;

export default function PlanMilestones({ milestones, actions, countries, revision, today, busy, save }: {
  milestones: Milestone[]; actions: WorkspaceAction[]; countries: { slug: string; name: string }[]; revision: number; today: string; busy: boolean; save: Save;
}) {
  const { locale, t } = useLocale();
  const [filter, setFilter] = useState<'all' | Milestone['status']>('all');
  const [draft, setDraft] = useState<Milestone | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const draftId = draft?.id;
  useEffect(() => { if (draftId) titleInput.current?.focus(); }, [draftId]);
  const ranked = rankMilestones(milestones, today).filter(item => filter === 'all' || item.status === filter);
  const pendingActions = actions.filter(action => action.status !== 'completed');
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  function start(action?: WorkspaceAction) {
    setRemoving(null);
    setDraft({ id: crypto.randomUUID(), title: action ? t(action.title) : '', category: action?.id ?? 'personal', status: 'open', due: '', next: '' });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || !draft.title.trim() || (draft.status === 'blocked' && !draft.next.trim())) return;
    if (await save({ type: 'milestone', revision, milestone: draft })) {
      setFilter('all');
      setDraft(null);
    }
  }
  function downloadCalendar() {
    const url = URL.createObjectURL(new Blob([planCalendar(milestones)], { type: 'text/calendar;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tgpi-plan.ics';
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const canAdd = !busy && !draft && milestones.length < milestoneLimit;
  return <section className="plan-panel plan-timeline" aria-labelledby="plan-milestones-title">
    <header className="plan-execution-heading">
      <div><h2 id="plan-milestones-title">{t('Milestones and deadlines')}</h2><p>{t('Turn your next steps into tasks you can track. Overdue tasks and blockers rise to the top.')}</p></div>
      <div className="plan-execution-buttons">
        <button type="button" className="plan-button primary" disabled={!canAdd} onClick={() => start()}>{t('Add milestone')}</button>
        <button type="button" className="plan-button" disabled={!milestones.some(item => isPlanDate(item.due) && item.status !== 'done')} onClick={downloadCalendar}>{t('Download calendar (.ics)')}</button>
      </div>
    </header>
    {draft && <form onSubmit={submit} className="plan-execution-form">
      <fieldset disabled={busy} className="plan-form-fields">
        <legend>{t(milestones.some(item => item.id === draft.id) ? 'Edit milestone' : 'Add milestone')}</legend>
        <div className="plan-execution-fields">
          <label className="plan-field-wide">{t('Milestone name')}<input ref={titleInput} required maxLength={120} value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} /></label>
          <label>{t('Category')}<select value={draft.category} onChange={event => setDraft({ ...draft, category: event.target.value as Milestone['category'] })}>{milestoneCategories.map(value => <option key={value} value={value}>{t(categories[value])}</option>)}</select></label>
          <label>{t('Status')}<select value={draft.status} onChange={event => setDraft({ ...draft, status: event.target.value as Milestone['status'] })}>{milestoneStatuses.map(value => <option key={value} value={value}>{t(statuses[value])}</option>)}</select></label>
          {(countries.length > 0 || draft.country) && <label>{t('Country')}<select value={draft.country ?? ''} onChange={event => setDraft({ ...draft, country: event.target.value || undefined })}>
            <option value="">{t('Any destination')}</option>
            {draft.country && !countries.some(country => country.slug === draft.country) && <option value={draft.country}>{t(draft.country)}</option>}
            {countries.map(country => <option key={country.slug} value={country.slug}>{t(country.name)}</option>)}
          </select></label>}
          <label>{t('Due date')}<input type="date" min="2000-01-01" max="9999-12-31" value={draft.due} onChange={event => setDraft({ ...draft, due: event.target.value })} /></label>
          <label>{t(draft.status === 'blocked' ? 'How will you unblock it?' : 'Next step or note')}<input required={draft.status === 'blocked'} maxLength={240} value={draft.next} onChange={event => setDraft({ ...draft, next: event.target.value })} /></label>
        </div>
        <div className="plan-execution-buttons">
          <button type="submit" className="plan-button primary" disabled={!draft.title.trim() || (draft.status === 'blocked' && !draft.next.trim())}>{t('Save milestone')}</button>
          <button type="button" className="plan-button" onClick={() => setDraft(null)}>{t('Cancel')}</button>
        </div>
      </fieldset>
    </form>}
    {pendingActions.length > 0 && <details className="plan-suggestions">
      <summary>{t('Use a TGPI recommendation')}</summary>
      <div className="plan-execution-buttons">{pendingActions.map(action => <button key={action.id} type="button" className="plan-button" disabled={!canAdd} onClick={() => start(action)}>{t(action.title)}</button>)}</div>
    </details>}
    <div className="plan-timeline-filter">
      <label>{t('Filter milestones')}<select value={filter} onChange={event => setFilter(event.target.value as typeof filter)}>
        <option value="all">{t('All milestones')}</option>
        {milestoneStatuses.map(status => <option key={status} value={status}>{t(statuses[status])}</option>)}
      </select></label>
      <span className="plan-badge">{milestones.length}/{milestoneLimit}</span>
    </div>
    {!ranked.length && <p className="plan-callout">{t(milestones.length ? 'No milestones match this filter.' : 'Add a milestone or start from a TGPI recommendation.')}</p>}
    <ul className="plan-milestone-list">{ranked.map(item => {
      const overdue = item.status !== 'done' && item.due && item.due < today;
      const action = actions.find(action => action.id === item.category);
      const country = countries.find(country => country.slug === item.country);
      const href = item.country && item.category === 'documents' ? `/countries/${item.country}#documents-to-verify`
        : country && item.category === 'cost' ? `/plan?country=${country.slug}#budget`
        : item.country && item.category === 'compare' && !action ? `/countries/${item.country}` : action?.href;
      return <li key={item.id}>
        <div className="plan-milestone-copy">
          <div className="plan-milestone-meta"><span className="plan-badge" data-status={item.status === 'done' ? 'completed' : overdue || item.status === 'blocked' ? 'needs_attention' : undefined}>{t(statuses[item.status])}</span><span>{t(categories[item.category])}</span>{item.country && <span>{t(country?.name ?? item.country)}</span>}{item.due && <time dateTime={item.due}>{dateFormat.format(new Date(item.due))}</time>}{overdue && <strong>{t('Overdue')}</strong>}</div>
          <h3>{item.title}</h3>{item.next && <p>{item.next}</p>}
        </div>
        {removing === item.id ? <div className="plan-execution-buttons">
          <button type="button" className="plan-button" disabled={busy} onClick={async () => { if (await save({ type: 'remove', revision, id: item.id })) setRemoving(null); }}>{t('Confirm removal')}</button>
          <button type="button" className="plan-button" disabled={busy} onClick={() => setRemoving(null)}>{t('Cancel')}</button>
        </div> : <div className="plan-execution-buttons">
          {href && <PlanActionLink href={href}>{t('Open TGPI tool')} ↗</PlanActionLink>}
          <button type="button" className="plan-button" disabled={busy || Boolean(draft)} onClick={() => void save({ type: 'milestone', revision, milestone: { ...item, status: item.status === 'done' ? 'open' : 'done' } })}>{t(item.status === 'done' ? 'Reopen milestone' : 'Complete milestone')}</button>
          <button type="button" className="plan-button" disabled={busy || Boolean(draft)} onClick={() => { setRemoving(null); setDraft(item); }}>{t('Edit milestone')}</button>
          <button type="button" className="plan-button" disabled={busy || Boolean(draft)} onClick={() => setRemoving(item.id)}>{t('Remove')}</button>
        </div>}
      </li>;
    })}</ul>
  </section>;
}
