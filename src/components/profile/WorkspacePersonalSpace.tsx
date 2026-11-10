'use client';
import { planCopy, planActivityCopy, workspaceResourceCopy, workspaceKindLabels } from '@/lib/localization/workspace-copy';
import { useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import type { ActivationActivity } from '@/lib/activation-progress';
import { defaultWorkspacePreferences, parseWorkspaceHistoryPage, type WorkspacePreferences, type WorkspaceModule, type WorkspaceResource } from '@/lib/workspace-control';
import { matchesWorkspaceSearch } from '@/lib/workspace-intelligence';
import styles from './WorkspaceCommandCenter.module.css';
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";

const names: Record<WorkspaceModule, string> = { journey: 'My journey', library: 'Personal library', history: 'My history' };
export default function WorkspacePersonalSpace({ resources, history, initialCursor, historyCoverage, historyAvailable, historyPending, initialPreferences, storageAvailable, journey, suggestions, learning, tools }: {
  resources: WorkspaceResource[]; history: ActivationActivity[]; initialCursor: string | null; historyCoverage: string | null; historyAvailable: boolean; historyPending: boolean; initialPreferences: WorkspacePreferences; storageAvailable: boolean; journey: ReactNode; learning?: ReactNode; tools?: ReactNode;
  suggestions: { id: string; title: string; href: string; description: string; action: string }[];
}) {
  const { locale, t } = useLocale();
  const historyDate = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  const [preferences, setPreferences] = useState(initialPreferences);
  const [busy, setBusy] = useState(false);
  const saving = useRef(false);
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('recent');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('all');
  const [resourceLimit, setResourceLimit] = useState(8);
  const [resourceView, setResourceView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [loadedHistory, setLoadedHistory] = useState(history);
  const [cursor, setCursor] = useState(initialCursor);
  const [historyBusy, setHistoryBusy] = useState(false);
  const [historyError, setHistoryError] = useState('');
  async function loadHistory() {
    if (!cursor || historyBusy) return;
    setHistoryBusy(true); setHistoryError('');
    try {
      const response = await fetch(`/api/workspace/history?cursor=${encodeURIComponent(cursor)}`);
      if (!response.ok) throw new Error('History could not be loaded. Retry when connected.');
      const result = parseWorkspaceHistoryPage(await response.json());
      if (!result) throw new Error('History response was not valid. Please retry.');
      setLoadedHistory(previous => [...new Map([...previous, ...result.events].map(event => [event.id, event])).values()].sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt)));
      setCursor(result.cursor); setPage(previous => previous + 4);
    } catch (error) { setHistoryError(error instanceof Error ? error.message : 'Unable to load history.'); }
    finally { setHistoryBusy(false); }
  }
  async function save(next: WorkspacePreferences) {
    if (saving.current || !storageAvailable) return;
    saving.current = true;
    setBusy(true); setMessage('Saving preferences…');
    try {
      const response = await fetch('/api/workspace/preferences', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
      if (!response.ok) throw new Error('Could not save your preferences. Retry when your connection is available.');
      setPreferences(next); setMessage('Workspace preferences saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save. Please retry.'); }
    finally { saving.current = false; setBusy(false); }
  }
  const copy = (value: string) => planCopy(value, t, locale);
  const localizedResources = resources.map(resource => ({ ...resource, ...workspaceResourceCopy(resource, t, locale), searchSource: `${resource.title} ${resource.detail}` }));
  const pinned = preferences.pinned ?? [];
  const pinnedResources = pinned.flatMap(id => localizedResources.find(resource => resource.id === id) ?? []);
  const found = localizedResources.filter(r => (kind === 'all' || r.kind === kind) && (status === 'all' || (status === 'pinned' ? pinned.includes(r.id) : r.status === status)) && matchesWorkspaceSearch(`${r.title} ${r.detail} ${r.searchSource}`, query)).sort((a, b) => Number(pinned.includes(b.id)) - Number(pinned.includes(a.id)) || (sort === 'title' ? a.title.localeCompare(b.title, locale) : (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')));
  function togglePin(id: string) {
    if (!pinned.includes(id) && pinned.length >= 8) { setMessage('You can pin up to eight resources. Unpin one to make room.'); return; }
    void save({ ...preferences, pinned: pinned.includes(id) ? pinned.filter(item => item !== id) : [...pinned, id] });
  }
  const events = loadedHistory.filter(e => filter === 'all' || e.type === filter);
  const nextActions = suggestions.filter(s => !preferences.dismissed.includes(s.id));
  const nextAction = nextActions[0];
  return <div id="workspace-personal" className={styles.personal} data-density={preferences.density} aria-busy={busy}>
    <section className={`${styles.panel} ${styles.next}`} aria-labelledby="next-step-title">
      <div><p className={styles.eyebrow}><LocalizedText text="Your next useful step" /></p><h2 id="next-step-title">{t(nextAction?.title ?? 'Choose your next step.')}</h2><p>{copy(nextAction?.description ?? 'Explore your saved resources or choose a new learning path.')}</p></div>
      <div className={styles.actions}><Link className={styles.primary} href={nextAction?.href ?? '/courses'}>{copy(nextAction?.action ?? 'Explore learning')} <span aria-hidden="true">↗</span></Link>{nextAction && storageAvailable && <button disabled={busy} className={styles.quiet} onClick={() => save({ ...preferences, dismissed: [...preferences.dismissed, nextAction.id].slice(-8) })}><LocalizedText text="Dismiss suggestion" /></button>}</div>
    </section>
    {nextActions.length > 1 && <nav className={styles.priorityQueue} aria-label={t('Next priorities')}>{nextActions.slice(1, 3).map((action, index) => <Link key={action.id} href={action.href}><span className={styles.queueNumber}>0{index + 2}</span><span><small>{t('Next priorities')}</small><strong>{t(action.title)}</strong></span><span aria-hidden="true">↗</span></Link>)}</nav>}
    <section className={styles.pinnedShelf} aria-labelledby="workspace-pinned-title">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{t('Keep your next steps within reach.')}</p><h2 id="workspace-pinned-title">{t('Pinned resources')} <span>{pinnedResources.length} / 8</span></h2></div><a href="#workspace-library">{t('Personal library')} <span aria-hidden="true">↗</span></a></div>
      {pinnedResources.length ? <nav className={styles.pinnedGrid} aria-label={t('Pinned resources')}>{pinnedResources.map(resource => <Link key={resource.id} href={resource.href} data-kind={resource.kind}><span className={styles.pinnedIcon}><NavigationIcon name={resource.kind === 'country' ? 'globe' : resource.kind === 'comparison' ? 'compare' : resource.kind === 'course' ? 'book' : 'file'} width={21} height={21} /></span><span><small>{t(workspaceKindLabels[resource.kind])}</small><strong>{resource.title}</strong></span><span aria-hidden="true">↗</span></Link>)}</nav> : <p>{t('Pin a resource in your library to access it here.')}</p>}
    </section>
    {learning}
    {tools}
    <details className={styles.customize}>
      <summary><LocalizedText text="Organize this workspace" /></summary>
      {!storageAvailable && <p><LocalizedText text="Personalization storage is unavailable. Your resources remain accessible." /></p>}
      <fieldset disabled={busy || !storageAvailable}><legend><LocalizedText text="Display preferences · saved to your account" /></legend>
        <label>{t("Density")} <select value={preferences.density} onChange={e => save({ ...preferences, density: e.target.value as WorkspacePreferences['density'] })}><option value="comfortable"><LocalizedText text="Comfortable" /></option><option value="compact"><LocalizedText text="Compact" /></option></select></label>
        {(['journey','library','history'] as const).map(id => <label key={id}><input type="checkbox" checked={!preferences.hidden.includes(id)} onChange={e => save({ ...preferences, hidden: e.target.checked ? preferences.hidden.filter(x => x !== id) : [...preferences.hidden, id] })} />{t(names[id])}</label>)}
        <button className={styles.quiet} onClick={() => save(defaultWorkspacePreferences())}><LocalizedText text="Restore defaults and suggestions" /></button>
      </fieldset>
    </details>
    <p className={styles.feedback} role="status" aria-live="polite">{t(message)}</p>
    <div id="workspace-journey">{preferences.hidden.includes('journey') ? <p><LocalizedText text="Hidden section. Restore it in “Organize this workspace”." /></p> : journey}</div>
    <div id="workspace-library">{!preferences.hidden.includes('library') ? <section className={styles.panel} aria-labelledby="library-title">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}><LocalizedText text="Your reference shelf" /></p><h2 id="library-title"><LocalizedText text="Personal library" /></h2></div><Link href="/plan"><LocalizedText text="Open personal plan ↗" /></Link></div>
      <p><LocalizedText text="Search your saved destinations, comparisons, course records and preparation checklists." /></p>
      <div className={styles.search}><label><LocalizedText text="Find a personal resource" /><input type="search" value={query} onChange={e => { setQuery(e.target.value); setResourceLimit(8); }} placeholder={t("Country, course or comparison…")} /></label><label><LocalizedText text="Resource type" /><select value={kind} onChange={e => { setKind(e.target.value); setResourceLimit(8); }}><option value="all"><LocalizedText text="All resources" /></option><option value="country"><LocalizedText text="Countries" /></option><option value="comparison"><LocalizedText text="Comparisons" /></option><option value="course"><LocalizedText text="Learning" /></option><option value="documents"><LocalizedText text="Preparation" /></option></select></label></div>
      <div className={styles.libraryFilters}><div className={styles.filterChips} role="group" aria-label={t('Resource status')}>{[['all','All resources'],['pinned','Pinned'],['in_progress','In progress'],['completed','Completed'],['edition_changed','New edition']].map(([value, label]) => <button type="button" key={value} aria-pressed={status === value} onClick={() => { setStatus(value); setResourceLimit(8); }}>{t(label)}</button>)}</div><label>{t('Sort resources')}<select value={sort} onChange={event => setSort(event.target.value)}><option value="recent">{t('Most recent')}</option><option value="title">{t('Alphabetical')}</option></select></label></div>
      <div className={styles.libraryToolbar}><p role="status">{t("{count} resources in this library", { count: found.length })}</p><div className={styles.viewSwitch} role="group" aria-label={t('Resource layout')}>{(['grid', 'list'] as const).map(view => <button key={view} type="button" aria-pressed={resourceView === view} onClick={() => setResourceView(view)}><NavigationIcon name={view === 'grid' ? 'apps' : 'file'} width={17} height={17} />{t(view === 'grid' ? 'Grid view' : 'List view')}</button>)}</div></div>
      <div className={styles.resourceGrid} data-view={resourceView}>{found.slice(0, resourceLimit).map(r => <article className={styles.resource} key={r.id} data-pinned={pinned.includes(r.id)} data-kind={r.kind}><Link href={r.href}><span className={styles.eyebrow}>{t(workspaceKindLabels[r.kind])}</span><strong>{r.title}</strong><span>{r.detail}</span><span className={styles.resourceOpen}>{t('Open ↗')}</span></Link><div className={styles.resourceFooter}>{r.status && <span className={styles.statusBadge} data-status={r.status}>{t(r.statusLabel ?? (r.status === 'completed' ? 'Completed' : r.status === 'edition_changed' ? 'New edition' : 'In progress'))}</span>}<button type="button" disabled={busy || !storageAvailable} aria-pressed={pinned.includes(r.id)} aria-label={t(pinned.includes(r.id) ? 'Unpin {title}' : 'Pin {title}', { title: r.title })} onClick={() => togglePin(r.id)}>{t(pinned.includes(r.id) ? 'Pinned' : 'Pin resource')} <span aria-hidden="true">{pinned.includes(r.id) ? '★' : '☆'}</span></button></div></article>)}</div>
      {found.length > resourceLimit && <button className={styles.quiet} onClick={() => setResourceLimit(previous => previous + 8)}><LocalizedText text="Show more resources" /></button>}
      {!found.length && <div className={styles.empty}><h3>{t(resources.length ? 'No matching resources.' : 'Your library starts with your first saved resource.')}</h3><p>{t(resources.length ? 'Try a different term or resource type.' : 'Save a destination or begin a learning path to see it here.')}</p><div className={styles.actions}><button type="button" className={styles.quiet} onClick={() => { setQuery(''); setKind('all'); setStatus('all'); }}>{t('Clear filters')}</button><Link href="/countries"><LocalizedText text="Explore countries ↗" /></Link></div></div>}
    </section> : <p><LocalizedText text="Hidden section. Restore it in “Organize this workspace”." /></p>}</div>
    <div id="workspace-history">{!preferences.hidden.includes('history') ? <section className={styles.panel} aria-labelledby="history-title">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}><LocalizedText text="Recorded activity" /></p><h2 id="history-title"><LocalizedText text="My history" /></h2></div><label><LocalizedText text="Activity type" /><select value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}><option value="all"><LocalizedText text="All activity" /></option><option value="course"><LocalizedText text="Learning" /></option><option value="comparison"><LocalizedText text="Comparisons" /></option><option value="saved_country"><LocalizedText text="Countries" /></option><option value="documents"><LocalizedText text="Preparation" /></option><option value="cost"><LocalizedText text="Budget research" /></option></select></label></div>
      <p>{historyAvailable ? historyCoverage ? t('Archive since {date}. Earlier source-backed records may be included. Filters apply to loaded events.', { date: historyDate.format(new Date(historyCoverage)) }) : t('Recorded activity') : t('The archive is unavailable. Showing up to six retained recent events from your progress store.')}</p>
      {historyPending && <p role="status">{t("Some activity is awaiting confirmation. Pending records are preserved and are not shown as completed actions.")}</p>}
      <ol className={styles.timeline}>{events.slice(0, page * 3).map(e => <li key={e.id}><span className={styles.dot} aria-hidden="true" /><div><span className={styles.eyebrow}>{t(workspaceKindLabels[e.type])}</span><Link href={e.href}>{planActivityCopy(e.title, t, locale)} ↗</Link><time dateTime={e.occurredAt}>{historyDate.format(new Date(e.occurredAt))}{" "}<LocalizedText text={"· UTC"} /></time></div></li>)}</ol>
      {!events.length && <p><LocalizedText text="No matching activity in the loaded records. Load earlier activity or choose another category." /></p>}
      {events.length > page * 3 && <button className={styles.quiet} onClick={() => setPage(page + 1)}><LocalizedText text="Show more loaded activity" /></button>}
      {cursor && <button disabled={historyBusy} className={styles.quiet} onClick={loadHistory}>{t(historyBusy ? 'Loading history…' : 'Load earlier activity')}</button>}
      {historyError && <p role="alert">{t(historyError)}</p>}
    </section> : <p><LocalizedText text="Hidden section. Restore it in “Organize this workspace”." /></p>}</div>
  </div>;
}
