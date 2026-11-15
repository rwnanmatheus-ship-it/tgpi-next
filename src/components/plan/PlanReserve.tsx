'use client';

import { useState, type FormEvent } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { isPlanDate, reserveProjection, type Reserve, type PlanExecutionMutation } from '@/lib/plan-execution';
import type { PlanFundScenario } from '@/lib/personal-plan';
import { PlanActionLink } from './PlanExecution';

const scenarioKey = (scenario: Pick<PlanFundScenario, 'country' | 'slot' | 'currency'>) =>
  `${scenario.country}:${scenario.slot}:${scenario.currency}`;

export default function PlanReserve({ reserve, scenarios, countries, revision, today, busy, unavailable, save }: {
  reserve: Reserve | null;
  scenarios: PlanFundScenario[];
  countries: { slug: string; name: string }[];
  revision: number;
  today: string;
  busy: boolean;
  unavailable: boolean;
  save: (mutation: PlanExecutionMutation) => Promise<boolean>;
}) {
  const { locale, t } = useLocale();
  const [confirmation, setConfirmation] = useState(false);
  const [draft, setDraft] = useState<{ key: string; due: string; amount: string } | null>(null);
  const storedKey = reserve ? scenarioKey(reserve) : undefined;
  const chosen = scenarios.find(scenario => scenarioKey(scenario) === (draft?.key ?? storedKey)) ?? scenarios[0];
  const key = chosen ? scenarioKey(chosen) : '';
  const amount = draft && draft.key === key ? draft.amount : storedKey === key && reserve ? String(reserve.saved) : '';
  const due = draft && draft.key === key ? draft.due : storedKey === key && reserve ? reserve.due : '';
  const saved = amount.trim() ? Number(amount) : NaN;
  const precision = chosen?.currency === 'JPY' ? 1 : 100;
  const valid = Number.isFinite(saved) && saved >= 0 && saved <= 100_000_000
    && Math.abs(saved * precision - Math.round(saved * precision)) <= 0.00001 && isPlanDate(due);
  const projection = chosen && valid ? reserveProjection(chosen.total, { ...chosen, saved, due }, today) : null;
  const money = (value: number) => chosen ? new Intl.NumberFormat(locale, { style: 'currency', currency: chosen.currency }).format(value) : '';
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!chosen || !valid) return;
    const { country, slot, currency } = chosen;
    if (await save({ type: 'reserve', revision, reserve: { country, slot, currency, due, saved } })) {
      setDraft(null);
      setConfirmation(false);
    }
  }
  return <section className="plan-panel plan-reserve" aria-labelledby="plan-reserve-title">
    <h2 id="plan-reserve-title">{t('Savings target')}</h2>
    <p>{t('Use a documented city budget to calculate what remains and how much to save each week.')}</p>
    {unavailable ? <p className="plan-callout">{t('Scenarios temporarily unavailable')}</p>
      : reserve && !scenarios.some(scenario => scenarioKey(scenario) === storedKey) && <p className="plan-callout">{t('The saved scenario or its currency changed. Choose an available scenario and re-enter your savings.')}</p>}
    {!chosen && !unavailable && <p className="plan-callout">{t('Complete a budget scenario with a city, quote date and source to calculate a savings target.')}</p>}
    {chosen && <form onSubmit={submit}>
      <fieldset disabled={busy} className="plan-form-fields">
        <div className="plan-execution-fields">
          <label className="plan-field-wide">{t('Budget scenario')}<select value={key} onChange={event => setDraft({ key: event.target.value, due: '', amount: '' })}>
            {scenarios.map(scenario => <option key={scenarioKey(scenario)} value={scenarioKey(scenario)}>
              {[t(countries.find(country => country.slug === scenario.country)?.name ?? scenario.country), scenario.city, scenario.currency, `#${scenario.slot}`].join(' · ')}
            </option>)}
          </select></label>
          <label>{t('Already saved')} · {chosen.currency}<input type="number" min={0} max={100_000_000} step={1 / precision} required value={amount} onChange={event => setDraft({ key, due, amount: event.target.value })} /></label>
          <label>{t('Savings deadline')}<input type="date" required min="2000-01-01" max="9999-12-31" value={due} onChange={event => setDraft({ key, due: event.target.value, amount })} /></label>
        </div>
        <dl className="plan-reserve-metrics">
          <div><dt>{t('Scenario total')}</dt><dd>{money(chosen.total)}</dd></div>
          <div><dt>{t('Still to save')}</dt><dd>{projection ? money(projection.remaining) : '—'}</dd></div>
          <div><dt>{t('Weekly target')}</dt><dd>{projection?.weekly == null ? '—' : money(projection.weekly)}</dd></div>
        </dl>
        {projection?.weekly === null && <p className="plan-callout">{t('The savings deadline has arrived or passed. Set a new date to calculate a weekly target.')}</p>}
        <p className="plan-footnote">{t('Quote date')} · <time dateTime={chosen.quoteDate}>{dateFormat.format(new Date(chosen.quoteDate))}</time></p>
        <div className="plan-execution-buttons">
          <button type="submit" className="plan-button primary" disabled={!valid || !draft}>{t('Save target')}</button>
          <PlanActionLink href={`/plan?country=${chosen.country}&scenario=${chosen.slot}#budget`}>{t('Review this scenario')} ↗</PlanActionLink>
        </div>
      </fieldset>
    </form>}
    {!chosen && <div className="plan-execution-buttons"><PlanActionLink href="#budget">{t('Open budget scenarios')} ↗</PlanActionLink></div>}
    {reserve && <div className="plan-execution-buttons plan-reserve-remove">
      {confirmation ? <>
        <button type="button" className="plan-button" disabled={busy} onClick={async () => {
          if (await save({ type: 'reserve', revision, reserve: null })) { setConfirmation(false); setDraft(null); }
        }}>{t('Confirm removal')}</button>
        <button type="button" className="plan-button" disabled={busy} onClick={() => setConfirmation(false)}>{t('Cancel')}</button>
      </> : <button type="button" className="plan-button" disabled={busy} onClick={() => setConfirmation(true)}>{t('Remove saved target')}</button>}
    </div>}
  </section>;
}
