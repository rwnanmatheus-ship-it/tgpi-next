'use client';
import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import type { ActivationActivity } from '@/lib/activation-progress';
import { defaultWorkspacePreferences, parseWorkspaceHistoryPage, type WorkspacePreferences, type WorkspaceModule, type WorkspaceResource } from '@/lib/workspace-control';
import styles from './WorkspaceCommandCenter.module.css';
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";

const names: Record<WorkspaceModule, string> = { journey: 'My journey', library: 'Personal library', history: 'My history' };
export default function WorkspacePersonalSpace({ resources, history, initialCursor, historyCoverage, historyAvailable, historyPending, initialPreferences, storageAvailable, journey, suggestions }: {
  resources: WorkspaceResource[]; history: ActivationActivity[]; initialCursor: string | null; historyCoverage: string | null; historyAvailable: boolean; historyPending: boolean; initialPreferences: WorkspacePreferences; storageAvailable: boolean; journey: ReactNode;
  suggestions: { id: string; title: string; href: string; description: string; action: string }[];
}) {
  const { locale, t } = useLocale();
  const historyDate = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  const [preferences, setPreferences] = useState(initialPreferences);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('all');
  const [resourceLimit, setResourceLimit] = useState(8);
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
      setLoadedHistory(previous => [...new Map([...previous, ...result.events].map(event => [event.id, event])).values()]);
      setCursor(result.cursor); setPage(previous => previous + 4);
    } catch (error) { setHistoryError(error instanceof Error ? error.message : 'Unable to load history.'); }
    finally { setHistoryBusy(false); }
  }
  async function save(next: WorkspacePreferences) {
    setBusy(true); setMessage('Saving preferences…');
    try {
      const response = await fetch('/api/workspace/preferences', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
      if (!response.ok) throw new Error('Could not save your preferences. Retry when your connection is available.');
      setPreferences(next); setMessage('Workspace preferences saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save. Please retry.'); }
    finally { setBusy(false); }
  }
  const needle = query.trim().toLocaleLowerCase(locale);
  const found = resources.filter(r => (kind === 'all' || r.kind === kind) && `${r.title} ${r.detail}`.toLocaleLowerCase(locale).includes(needle));
  const events = loadedHistory.filter(e => filter === 'all' || e.type === filter);
  const nextAction = suggestions.find(s => !preferences.dismissed.includes(s.id));
  return <div id="workspace-personal" className={styles.personal} data-density={preferences.density} aria-busy={busy}>
    <section className={`${styles.panel} ${styles.next}`} aria-labelledby="next-step-title">
      <div><p className={styles.eyebrow}><LocalizedText text="Your next useful step" /></p><h2 id="next-step-title">{t(nextAction?.title ?? 'Choose your next step.')}</h2><p>{t(nextAction?.description ?? 'Explore your saved resources or choose a new learning path.')}</p></div>
      <div className={styles.actions}><Link className={styles.primary} href={nextAction?.href ?? '/courses'}>{t(nextAction?.action ?? 'Explore learning')} <span aria-hidden="true">↗</span></Link>{nextAction && storageAvailable && <button disabled={busy} className={styles.quiet} onClick={() => save({ ...preferences, dismissed: [...preferences.dismissed, nextAction.id].slice(-8) })}><LocalizedText text="Dismiss suggestion" /></button>}</div>
    </section>
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
      <p role="status">{t("{count} resources in this library", { count: found.length })}</p>
      <div className={styles.resourceGrid}>{found.slice(0, resourceLimit).map(r => <Link className={styles.resource} href={r.href} key={r.id}><span className={styles.eyebrow}>{r.kind}</span><strong>{t(r.title)}</strong><span>{t(r.detail)}</span><span aria-hidden="true"><LocalizedText text="Open ↗" /></span></Link>)}</div>
      {found.length > resourceLimit && <button className={styles.quiet} onClick={() => setResourceLimit(previous => previous + 8)}><LocalizedText text="Show more resources" /></button>}
      {!found.length && <div className={styles.empty}><h3>{t(resources.length ? 'No matching resources.' : 'Your library starts with your first saved resource.')}</h3><p>{t(resources.length ? 'Try a different term or resource type.' : 'Save a destination or begin a learning path to see it here.')}</p><Link href="/countries"><LocalizedText text="Explore countries ↗" /></Link></div>}
    </section> : <p><LocalizedText text="Hidden section. Restore it in “Organize this workspace”." /></p>}</div>
    <div id="workspace-history">{!preferences.hidden.includes('history') ? <section className={styles.panel} aria-labelledby="history-title">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}><LocalizedText text="Recorded activity" /></p><h2 id="history-title"><LocalizedText text="My history" /></h2></div><label><LocalizedText text="Activity type" /><select value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}><option value="all"><LocalizedText text="All activity" /></option><option value="course"><LocalizedText text="Learning" /></option><option value="comparison"><LocalizedText text="Comparisons" /></option><option value="saved_country"><LocalizedText text="Countries" /></option><option value="documents"><LocalizedText text="Preparation" /></option><option value="cost"><LocalizedText text="Budget research" /></option></select></label></div>
      <p>{historyAvailable ? historyCoverage ? t('Archive since {date}. Earlier source-backed records may be included. Filters apply to loaded events.', { date: historyDate.format(new Date(historyCoverage)) }) : t('Recorded activity') : t('The archive is unavailable. Showing up to six retained recent events from your progress store.')}</p>
      {historyPending && <p role="status">{t("Some activity is awaiting confirmation. Pending records are preserved and are not shown as completed actions.")}</p>}
      <ol className={styles.timeline}>{events.slice(0, page * 3).map(e => <li key={e.id}><span className={styles.dot} aria-hidden="true" /><div><span className={styles.eyebrow}>{e.type.replace('_',' ')}</span><Link href={e.href}><LocalizedText text={e.title} /> ↗</Link><time dateTime={e.occurredAt}>{historyDate.format(new Date(e.occurredAt))}{" "}<LocalizedText text={"· UTC"} /></time></div></li>)}</ol>
      {!events.length && <p><LocalizedText text="No matching activity in the loaded records. Load earlier activity or choose another category." /></p>}
      {events.length > page * 3 && <button className={styles.quiet} onClick={() => setPage(page + 1)}><LocalizedText text="Show more loaded activity" /></button>}
      {cursor && <button disabled={historyBusy} className={styles.quiet} onClick={loadHistory}>{t(historyBusy ? 'Loading history…' : 'Load earlier activity')}</button>}
      {historyError && <p role="alert">{t(historyError)}</p>}
    </section> : <p><LocalizedText text="Hidden section. Restore it in “Organize this workspace”." /></p>}</div>
  </div>;
}
