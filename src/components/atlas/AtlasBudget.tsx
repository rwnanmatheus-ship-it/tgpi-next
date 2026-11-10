'use client';

import { useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { estimateAtlasBudget } from '@/lib/atlas/guide';
import { atlasCopy } from '@/lib/atlas/studio-copy';
import styles from './studio.module.css';

export default function AtlasBudget() {
  const { locale } = useLocale();
  const [monthly, setMonthly] = useState('');
  const [initial, setInitial] = useState('');
  const [months, setMonths] = useState('3');
  const [reserve, setReserve] = useState('15');
  const [currency, setCurrency] = useState(locale === 'pt-BR' ? 'BRL' : locale === 'en' ? 'USD' : 'EUR');
  const total = monthly && months && reserve
    ? estimateAtlasBudget(Number(monthly), Number(initial), Number(months), Number(reserve))
    : null;

  return <details open className={styles.calculator}>
    <summary>{atlasCopy(locale, 'calculator')}</summary>
    <div className={styles.budgetFields}>
      <label>{atlasCopy(locale, 'currency')}
        <select value={currency} onChange={event => setCurrency(event.target.value)}>
          {['BRL', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY'].map(code => <option key={code}>{code}</option>)}
        </select>
      </label>
      <label>{atlasCopy(locale, 'monthly')}<input inputMode="decimal" type="number" min="0" max="10000000" step="0.01" value={monthly} onChange={event => setMonthly(event.target.value)} /></label>
      <label>{atlasCopy(locale, 'setup')}<input inputMode="decimal" type="number" min="0" max="10000000" step="0.01" value={initial} onChange={event => setInitial(event.target.value)} /></label>
      <label>{atlasCopy(locale, 'months')}<input inputMode="numeric" type="number" min="1" max="60" value={months} onChange={event => setMonths(event.target.value)} /></label>
      <label>{atlasCopy(locale, 'reserve')}<input inputMode="decimal" type="number" min="0" max="100" value={reserve} onChange={event => setReserve(event.target.value)} /></label>
    </div>
    <div className={styles.budgetResult}>
      <p>{atlasCopy(locale, 'budgetNote')}</p>
      {total !== null && <output>{atlasCopy(locale, 'estimate')} <strong>{new Intl.NumberFormat(locale, { style: 'currency', currency }).format(total)}</strong></output>}
    </div>
  </details>;
}
