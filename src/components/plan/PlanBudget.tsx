'use client';
import { useState } from 'react';
import Link from 'next/link';
import ResearchWorkbench from '@/components/intelligence/ResearchWorkbench';
import type { PlanScenarioSlot } from '@/lib/personal-plan';
import { useLocale } from '@/components/localization/LocaleProvider';
export default function PlanBudget({ countries, initialCountry, initialSlot }: { countries: { slug: string; name: string }[]; initialCountry?: string; initialSlot?: PlanScenarioSlot }) {
  const { t } = useLocale();
  const [selected, setSelected] = useState(initialCountry ?? countries[0]?.slug ?? '');
  const country = countries.find(c => c.slug === selected) ?? countries[0];
  if (!country) return <div className="plan-panel plan-empty"><h2>{t('Build a city-level budget')}</h2><p>{t('Choose a destination to open your three private budget scenarios.')}</p><Link className="plan-button primary" href="/country-fit">{t('Build my Country Fit')} ↗</Link></div>;
  return <><div className="plan-panel plan-budget-heading"><div><p className="plan-kicker">{t('Decision Lab')}</p><h2>{t('Your budget, connected.')}</h2><p>{t('The same country scenarios are available here, in Country Fit and in comparison.')}</p></div><label>{t('Country')}<select value={country.slug} onChange={e => setSelected(e.target.value)}>{countries.map(c => <option value={c.slug} key={c.slug}>{t(c.name)}</option>)}</select></label></div><ResearchWorkbench key={country.slug} initialSlot={country.slug === initialCountry ? initialSlot : undefined} country={country.slug} countryName={t(country.name)} /></>;
}
