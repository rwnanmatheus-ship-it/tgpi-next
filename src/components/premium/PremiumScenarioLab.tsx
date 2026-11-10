'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale , LocalizedText } from '@/components/localization/LocaleProvider';
import { COST_CATEGORIES, worksheetTotals } from '@/lib/intelligence/research-plan';
import { exportScenarioComparison, parsePremiumScenarioPage, scenarioComparisonReadiness, scenarioTotalDifference, type SavedPremiumScenario } from '@/lib/premium-scenarios';
import styles from './PremiumScenarioLab.module.css';

const categories = { housing:'Housing',food:'Food',transport:'Transport',health:'Health',other:'Other',tuition:'Tuition',arrival:'Arrival' };
const reasons = { selection:'Select two or three scenarios to compare.',currency:'Different currencies: totals stay separate. No exchange rate is assumed.',period:'Different durations: align the number of months to compare total budgets.',incomplete:'Complete all cost fields before comparing budget differences.',ready:'Same currency and duration. Differences use the first selected scenario as the baseline.' };

export default function PremiumScenarioLab() {
  const {user,isLoaded} = useUser();
  return isLoaded && user ? <ScenarioLibrary key={user.id} /> : null;
}

function ScenarioLibrary() {
  const {t} = useLocale();
  const [scenarios,setScenarios] = useState<SavedPremiumScenario[]>([]);
  const [selected,setSelected] = useState<string[]>([]);
  const [cursor,setCursor] = useState<string | null>(null);
  const [omitted,setOmitted] = useState(0);
  const [busy,setBusy] = useState(true);
  const [error,setError] = useState('');
  const [attempt,setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/premium/scenarios',{cache:'no-store',signal:controller.signal})
      .then(async response => { if (!response.ok) throw new Error(); const page=parsePremiumScenarioPage(await response.json());if (!page) throw new Error();return page; })
      .then(page => { setScenarios(page.scenarios);setCursor(page.cursor);setOmitted(page.omitted); })
      .catch(() => { if (!controller.signal.aborted) setError('Saved scenarios are temporarily unavailable. Please retry.'); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  },[attempt]);
  async function loadMore() {
    if (!cursor || busy) return;
    setBusy(true);setError('');
    try {
      const response = await fetch(`/api/premium/scenarios?cursor=${encodeURIComponent(cursor)}`,{cache:'no-store'});
      if (!response.ok) throw new Error();
      const page = parsePremiumScenarioPage(await response.json());
      if (!page) throw new Error();
      setScenarios(current => [...new Map([...current,...page.scenarios].map(s => [s.id,s])).values()]);
      setCursor(page.cursor);setOmitted(count => count+page.omitted);
    } catch { setError('Saved scenarios are temporarily unavailable. Please retry.'); }
    finally { setBusy(false); }
  }
  return <section id="premium-scenarios" className={styles.lab} aria-labelledby="scenario-lab-title" aria-busy={busy}>
    <div className={styles.heading}><div><p className={styles.eyebrow}>{t('Premium · Decision lab')}</p><h2 id="scenario-lab-title">{t('Compare your saved scenarios')}</h2><p>{t('Bring your country budgets together, check missing evidence and export a private decision snapshot.')}</p></div><Link className={styles.secondary} href="/country-fit#research-workbench">{t('Create a scenario')} ↗</Link></div>
    {busy && <p role="status">{t('Loading scenarios…')}</p>}
    {error && <div role="alert"><p>{t(error)}</p><button className={styles.secondary} disabled={busy} onClick={() => { if(cursor) void loadMore(); else { setError('');setBusy(true);setAttempt(a => a+1); } }}>{t('Try again')}</button></div>}
    {!busy && !error && !scenarios.length && <div className={styles.empty}><h3>{t('Your first comparison starts with saved research.')}</h3><p>{t('Save a worksheet in Country Fit, then return here. The three scenario slots and individual reports remain available on Free.')}</p></div>}
    {scenarios.length > 0 && <>
      <fieldset className={styles.picker}><legend>{t('Select up to three saved scenarios')}</legend>{scenarios.map(s => <ScenarioOption key={s.id} scenario={s} checked={selected.includes(s.id)} disabled={!selected.includes(s.id) && selected.length >= 3} onChange={checked => setSelected(current => checked ? [...current,s.id].slice(0,3) : current.filter(id => id !== s.id))} />)}</fieldset>
      <ScenarioComparison scenarios={selected.flatMap(id => { const s = scenarios.find(s => s.id === id);return s ? [s] : []; })} />
    </>}
    {cursor && <button className={styles.secondary} disabled={busy} onClick={loadMore}>{t('Load more saved scenarios')}</button>}
    {omitted > 0 && <p role="status">{t('Some saved records could not be validated and were excluded. Your original records were preserved.')}</p>}
  </section>;
}

function ScenarioOption({scenario:s,checked,disabled,onChange}:{scenario:SavedPremiumScenario;checked:boolean;disabled:boolean;onChange:(checked:boolean)=>void}) {
  const {locale,t} = useLocale();
  const name = new Intl.DisplayNames([locale],{type:'region'}).of(s.iso2) ?? s.countryName;
  return <label className={styles.option}><input type="checkbox" checked={checked} disabled={disabled} onChange={e => onChange(e.target.checked)} /><span><strong>{name}{s.worksheet.city ? <LocalizedText text={" · {value0}"} values={{value0: String(s.worksheet.city)}} /> : ''}</strong><small>{t('Scenario')} {s.slot} · <LocalizedText text={s.worksheet.currency} /> · {t('{count} months',{count:s.worksheet.months})}</small></span></label>;
}

export function ScenarioComparison({scenarios,example=false}:{scenarios:SavedPremiumScenario[];example?:boolean}) {
  const {locale,t} = useLocale();
  const readiness = scenarioComparisonReadiness(scenarios);
  function download() {
    const url = URL.createObjectURL(new Blob([exportScenarioComparison(scenarios,new Date(),example ? 'illustrative_examples' : 'member_saved_worksheets')],{type:'application/json'}));
    const link = document.createElement('a');link.href=url;link.download='tgpi-scenario-comparison.json';link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  }
  return <div className={styles.comparison}>
    <p className={styles.notice} role="status">{t(reasons[readiness])}</p>
    <div className={styles.cards}>{scenarios.map((s,index) => {
      const w=s.worksheet,totals=worksheetTotals(w),difference=scenarios[0] ? scenarioTotalDifference(s,scenarios[0]) : null;
      const money=(amount:number|null) => amount === null ? t('Missing') : new Intl.NumberFormat(locale,{style:'currency',currency:w.currency}).format(amount);
      const country=new Intl.DisplayNames([locale],{type:'region'}).of(s.iso2) ?? s.countryName;
      return <article key={s.id} className={styles.card}>
        <div className={styles.cardHead}><span>{index === 0 ? t('Baseline') : t('Alternative {number}',{number:index})}</span><span><LocalizedText text={w.currency} /></span></div>
        <h3>{country}{w.city ? <LocalizedText text={" · {value0}"} values={{value0: String(w.city)}} /> : ''}</h3><p>{example ? t('Example {number}',{number:s.slot}) : <LocalizedText text={"{value0} {value1}"} values={{value0: String(t('Scenario')), value1: String(s.slot)}} />} · {t('{count} months',{count:w.months})}</p>
        <dl>{COST_CATEGORIES.map(category => <div key={category}><dt>{t(categories[category])}</dt><dd>{money(w.monthly[category])}</dd></div>)}<div className={styles.subtotal}><dt>{t('Known monthly costs')}</dt><dd>{money(totals.knownMonthly)}</dd></div><div><dt>{t('Tuition')}</dt><dd>{money(w.tuition)}</dd></div><div><dt>{t('Arrival')}</dt><dd>{money(w.arrival)}</dd></div><div><dt>{t('Contingency')} ({new Intl.NumberFormat(locale).format(w.bufferPercent)}%)</dt><dd>{money(totals.buffer)}</dd></div></dl>
        <div className={styles.total}><span>{t(totals.complete ? 'Total planned budget' : 'Known subtotal · incomplete')}</span><strong>{money(totals.total)}</strong></div>
        {index > 0 && readiness === 'ready' && difference !== null && <p>{t('Difference from baseline')}: <strong>{difference > 0 ? '+' : ''}{money(difference)}</strong></p>}
        {!totals.complete && <p className={styles.warning}>{t('Missing')}: {totals.missing.map(key => t(categories[key as keyof typeof categories])).join(', ')}</p>}
        <p className={styles.meta}>{t('Quote date')}: {w.quoteDate ? new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeZone:'UTC'}).format(new Date(`${w.quoteDate}T00:00:00Z`)) : t('Not recorded')}</p>
        <p className={styles.meta}>{t('Source notes')}: {w.sourceNote || t('Not recorded')}</p>
        <Link href={`/country-fit?country=${encodeURIComponent(w.country)}#research-workbench`}>{example ? t('Start with my own research') : <LocalizedText text={"{value0} · {value1} {value2}"} values={{value0: String(t('Review worksheet')), value1: String(t('Scenario')), value2: String(s.slot)}} />} ↗</Link>
      </article>;
    })}</div>
    {scenarios.length > 0 && <div className={styles.export}><button className={styles.primary} onClick={download}>{t('Export comparison · JSON')} ↓</button><p>{t(example ? 'Illustrative examples only. These amounts are fictional and are not saved to your account.' : 'Your estimates are not verified quotes. This snapshot contains only the selected saved scenarios and their source notes.')}</p></div>}
  </div>;
}
