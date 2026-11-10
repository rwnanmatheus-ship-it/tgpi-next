'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import { announceProgressSaved } from '@/lib/progress-sync';
import { normalizeOnboardingData } from '@/lib/onboarding';
import { comparisonPath } from '@/lib/comparison-state';
import { fitContextSignals, fitGoalLabels, fitPriorityLabels, fitRoadmap } from '@/lib/personal-plan';
import { INDICATOR_IDS, findObservation, type CountryIdentity, type IntelligenceSnapshot, type ResearchContext } from '@/lib/intelligence/core';
import { dossierFor, sourceFor } from '@/lib/intelligence/dossiers';
import { EvidenceCard } from './Evidence';
import ResearchWorkbench from './ResearchWorkbench';
import SourceReviewNotice from './SourceReviewNotice';
import PlanTabs from '@/components/plan/PlanTabs';

const EMPTY: ResearchContext = { primaryGoal: 'study', budgetRange: 'undecided', timeHorizon: 'exploring', languages: [], profession: '', priorities: [] };
type Props = { countries: CountryIdentity[]; snapshot: IntelligenceSnapshot; initialContext?: ResearchContext; initialCountry?: string; ownerId?: string; shortlist?: string[] };
export default function CountryFitWorkspace(props: Props) {
  return <FitEditor key={props.ownerId ?? 'guest'} {...props} />;
}
function FitEditor({ countries, snapshot, initialContext = EMPTY, initialCountry = 'portugal', ownerId = 'guest', shortlist = [] }: Props) {
  const { t, locale } = useLocale();
  const { isSignedIn, user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const saving = useRef(false);
  const [saveNotice, setSaveNotice] = useState('');
  const [slug, setSlug] = useState(countries.some(c => c.slug === initialCountry) ? initialCountry : countries[0]?.slug ?? '');
  const [context, setContext] = useState<ResearchContext>({ ...initialContext, primaryGoal: initialContext.primaryGoal || 'study', budgetRange: initialContext.budgetRange || 'undecided', timeHorizon: initialContext.timeHorizon || 'exploring' });
  const signature = JSON.stringify({ slug, context });
  const [savedSignature, setSavedSignature] = useState(signature);
  const [draftReady, setDraftReady] = useState(false);
  const dirty = signature !== savedSignature;
  const draftKey = `tgpi:fit:v1:${ownerId}:${initialCountry}`;
  const knownSlugs = countries.map(c => c.slug).join('|');
  useEffect(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey) || 'null');
      if (draft?.version === 1 && knownSlugs.split('|').includes(draft.slug) && draft.context && typeof draft.context === 'object') {
        const normalized = normalizeOnboardingData(draft.context);
        if (normalized.primaryGoal && normalized.timeHorizon && normalized.budgetRange) {
          setSlug(draft.slug); setContext({ primaryGoal: normalized.primaryGoal, budgetRange: normalized.budgetRange, timeHorizon: normalized.timeHorizon, languages: normalized.languages, profession: normalized.profession, priorities: normalized.priorities });
          setSaveNotice('Your private tab draft has been restored. Save to sync across devices.');
        }
      }
    } catch { /* Storage may be disabled; explicit account saving remains available. */ }
    setDraftReady(true);
  }, [draftKey, knownSlugs]);
  useEffect(() => {
    if (!draftReady || !dirty) return;
    try { sessionStorage.setItem(draftKey, JSON.stringify({ version: 1, slug, context })); } catch { /* Optional draft storage. */ }
  }, [context, dirty, draftKey, draftReady, slug]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function update(patch: Partial<ResearchContext>) { setContext(previous => ({ ...previous, ...patch })); setSaveNotice(''); }
  function selectCountry(value: string) { setSlug(value); setSaveNotice(''); }
  const country = countries.find(c => c.slug === slug);
  const signals = fitContextSignals(context);
  const coverage = signals.filter(signal => signal.complete).length;
  const tasks = fitRoadmap(context);
  const dossier = dossierFor(slug);
  const available = INDICATOR_IDS.filter(id => findObservation(snapshot, slug, id)).length;
  const compareHref = comparisonPath([slug, ...shortlist], context.primaryGoal);
  async function savePlan() {
    if (!isSignedIn || saving.current || !country) return;
    saving.current = true; setIsSaving(true); setSaveNotice('');
    try {
      const response = await fetch('/api/intelligence/plan', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ countrySlug: slug, context }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save your plan.');
      setSavedSignature(signature);
      try { sessionStorage.removeItem(draftKey); } catch { /* Cloud save already succeeded. */ }
      setSaveNotice('Saved to your private TGPI profile. Your other profile fields and existing shortlist are preserved.');
      announceProgressSaved();
      try { await user?.reload(); } catch { /* Server confirmed persistence. */ }
    } catch (error) { setSaveNotice(error instanceof Error ? error.message : 'Unable to save. Please try again.'); }
    finally { saving.current = false; setIsSaving(false); }
  }
  if (!country) return <div className="plan-panel" role="status">{t('No countries available. Please try again later.')}</div>;
  return <section aria-label={t('Country Fit and personal research plan')}>
    <div className="plan-fit-header"><div><p className="plan-kicker">{t('Your research destination')}</p><strong>{t(country.name)}</strong><p>{t(fitGoalLabels[context.primaryGoal] ?? 'Primary goal')}</p></div><span className="plan-badge">{t(dirty ? 'Unsaved changes' : 'Your context')} · {coverage}/{signals.length}</span></div>
    <PlanTabs id="country-fit" tabs={[
      { id: 'context', label: 'Your context', content: <div className="plan-grid">
        <section className="plan-panel"><p className="plan-kicker">{t('01 / Your context')}</p><h2>{t('A plan that starts with you.')}</h2><p>{t('Set your direction, then use the roadmap and budget tabs to test your next move.')}</p>
          <fieldset className="plan-form-fields" disabled={isSaving || !draftReady}><legend className="sr-only">{t('Plan profile')}</legend><div className="ig-form-grid">
            <label>{t('Country')}<select value={slug} onChange={e => selectCountry(e.target.value)}>{[...countries].sort((a,b) => t(a.name).localeCompare(t(b.name), locale)).map(c => <option value={c.slug} key={c.slug}>{t(c.name)}</option>)}</select></label>
            <label>{t('Your goal')}<select value={context.primaryGoal} onChange={e => update({ primaryGoal: e.target.value })}>{Object.entries(fitGoalLabels).map(([value, label]) => <option key={value} value={value}>{t(label)}</option>)}</select></label>
            <label>{t('Monthly budget, USD')}<select value={context.budgetRange} onChange={e => update({ budgetRange: e.target.value })}>{[['undecided','Not defined yet'],['under-1500','Under $1,500'],['1500-3000','$1,500–3,000'],['3000-5000','$3,000–5,000'],['5000-plus','Over $5,000']].map(([value,label]) => <option key={value} value={value}>{t(label)}</option>)}</select></label>
            <label>{t('Time horizon')}<select value={context.timeHorizon} onChange={e => update({ timeHorizon: e.target.value })}>{[['exploring','Still exploring'],['now','Within 30 days'],['3-months','Within 3 months'],['6-months','Within 6 months'],['12-months','Within 12 months']].map(([value,label]) => <option key={value} value={value}>{t(label)}</option>)}</select></label>
            <label>{t('Profession or field')}<input value={context.profession} maxLength={100} onChange={e => update({ profession: e.target.value })} placeholder={t('e.g. Engineering')} /></label>
            <label>{t('Languages, separated by commas')}<input value={context.languages.join(',')} maxLength={160} onChange={e => update({ languages: e.target.value.split(',').slice(0,8) })} placeholder={t('e.g. Portuguese, English')} /></label>
          </div><fieldset className="plan-priorities"><legend>{t('Decision priorities')} · {context.priorities.length}/5</legend><div>{Object.entries(fitPriorityLabels).map(([value,label]) => <button key={value} type="button" aria-pressed={context.priorities.includes(value)} disabled={context.priorities.length >= 5 && !context.priorities.includes(value)} onClick={() => update({ priorities: context.priorities.includes(value) ? context.priorities.filter(p => p !== value) : [...context.priorities,value] })}>{t(label)}</button>)}</div><p className="plan-footnote">{t('Choose three to five priorities to focus your research.')}</p></fieldset></fieldset>
          <div className="plan-save-bar">{isSignedIn ? <button type="button" className="plan-button primary" disabled={isSaving || !draftReady} onClick={savePlan}>{t(isSaving ? 'Saving…' : 'Save this research plan')}</button> : <Link className="plan-button primary" href={`/sign-in?redirect_url=${encodeURIComponent(`/country-fit?country=${slug}&goal=${context.primaryGoal}`)}`}>{t('Sign in to save a plan')}</Link>}<Link href="/plan" className="plan-button">{t('Open my connected plan')} ↗</Link><p role="status">{t(saveNotice)}</p></div>
          <p className="plan-footnote">{t('Drafts stay in this browser tab when storage is available. Save to connect your plan across devices.')}</p>
        </section>
        <aside className="plan-fit-sidebar"><section className="plan-panel accent"><p className="plan-kicker">{t('Context completeness')}</p><h2>{coverage}/{signals.length}</h2><p>{t('Profile completeness, not permission to travel.')}</p><div className="plan-progress" role="progressbar" aria-label={t('Context completeness')} aria-valuenow={coverage} aria-valuemin={0} aria-valuemax={signals.length}><span style={{ width: `${coverage / signals.length * 100}%`, background: '#e3c17b' }} /></div><div className="plan-fit-summary">{signals.filter(s => !s.complete).map(s => <span className="plan-badge" key={s.label}>{t(s.label)}</span>)}</div><a className="plan-button" href="#roadmap">{t('Explore my roadmap')} ↓</a></section><section className="plan-panel"><p className="plan-kicker">{t('Evidence, not a promise')}</p><h3>{t('Check before you commit.')}</h3><p>{t('Visa eligibility, safety and affordability require separate evidence. No compatibility score is invented.')}</p><Link className="plan-button" href={compareHref}>{t('Compare shortlist')} ↗</Link><div className="plan-links"><Link href="/onboarding" className="ig-link">{t('Edit plan context')} ↗</Link></div></section></aside>
      </div> },
      { id: 'roadmap', label: 'Action plan', content: <><div className="plan-section-head"><div><p className="plan-kicker">{t('Your goal')} / {t(country.name)}</p><h2>{t('Turn uncertainty into useful work.')}</h2></div><Link href="/plan">{t('Open my connected plan')} ↗</Link></div>{['now','3-months'].includes(context.timeHorizon) && <p className="plan-callout">{t('Your timeline is near. Verify requirements and costs before committing to a date.')}</p>}<div className="plan-fit-summary">{context.priorities.map(priority => <span className="plan-badge" key={priority}>{t(fitPriorityLabels[priority] ?? priority)}</span>)}</div><div className="plan-action-list">{tasks.map((task,index) => <article className="plan-panel plan-action" key={task.id}><span className="plan-action-number">0{index+1}</span><div className="plan-action-body"><h3>{t(task.title)}</h3><p>{t(task.detail)}</p>{task.href === '#research-workbench' ? <a className="plan-button" href="#budget">{t('Open budget scenarios')} ↓</a> : <Link className="plan-button" href={task.href.startsWith('#') ? `/countries/${slug}${task.href}` : task.href}>{t('Take the next step →')}</Link>}</div></article>)}</div></> },
      { id: 'evidence', label: 'Evidence', content: <><section className="plan-panel"><p className="plan-kicker">{t('Evidence, not a promise')}</p><h2>{t(country.name)}</h2><SourceReviewNotice country={slug} /><p>{available}/{INDICATOR_IDS.length} {t('National indicators available')}</p><p>{t('Visa eligibility, safety and affordability require separate evidence. No compatibility score is invented.')}</p><div className="plan-links"><Link href={`/countries/${slug}#research-dossier`} className="plan-button primary">{t('Open evidence dossier →')}</Link><Link href={compareHref} className="plan-button">{t('Compare shortlist')} ↗</Link></div></section><div className="plan-evidence-grid" style={{ marginTop: 20 }}>{INDICATOR_IDS.map(indicator => <EvidenceCard key={indicator} indicator={indicator} observation={findObservation(snapshot, slug, indicator)} countryCode={country.iso2} />)}</div><section className="plan-panel" style={{ marginTop: 20 }}><h3>{t('Source-linked summaries')} · {dossier.claims.length}</h3>{dossier.claims.length ? dossier.claims.map(claim => { const source = sourceFor(claim.sourceId); return source ? <p key={claim.id}><a className="ig-link" href={source.url} target="_blank" rel="noreferrer">{t(claim.title)} ↗</a></p> : null; }) : <p>{t('A destination-specific source for this step is still missing in this release. Verify directly with the competent authority.')}</p>}</section></> },
      { id: 'budget', label: 'Budget & scenarios', content: <ResearchWorkbench country={slug} countryName={t(country.name)} /> },
    ]} />
  </section>;
}
