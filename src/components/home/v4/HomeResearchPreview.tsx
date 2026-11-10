'use client';

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import { personalResearchPlan } from '@/lib/intelligence/core';
import styles from './home.module.css';

const destinations = [{ slug:'portugal', name:'Portugal' }, { slug:'canada', name:'Canada' }, { slug:'japan', name:'Japan' }] as const;
/** A live, explicitly labelled sample of the same planner used in Country Fit. */
export default function HomeResearchPreview() {
  const { t } = useLocale();
  const [slug, setSlug] = useState<string>('portugal');
  const country = destinations.find(item => item.slug === slug) ?? destinations[0];
  const tasks = personalResearchPlan({ primaryGoal:'work', budgetRange:'undecided', timeHorizon:'exploring', languages:[], profession:'', priorities:[] },country.name).slice(0,2);
  return <aside className={styles.researchPreview} aria-label={t('Example Country Fit research plan')}>
    <div className={styles.previewTop}><span>{t('Country Fit')}</span><span className={styles.exampleBadge}>{t('Example plan')}</span></div>
    <p className={styles.previewTitle}>{t('A move starts with better questions.')}</p>
    <label className={styles.previewDestination} htmlFor="home-preview-country"><span>{t('Work abroad')}</span><select id="home-preview-country" aria-label={t('Choose a country')} value={country.slug} onChange={event => setSlug(event.target.value)}>{destinations.map(item => <option key={item.slug} value={item.slug}><LocalizedText text={t(item.name)} /></option>)}</select></label>
    <ol>{tasks.map((task,index) => <li key={task.id}><span aria-hidden="true">0{index+1}</span><Link href={task.href.startsWith('#') ? `/countries/${country.slug}${task.href}` : task.href}>{t(task.title)}<span aria-hidden="true">↗</span></Link></li>)}</ol>
    <Link className={styles.previewLink} href={`/country-fit?country=${country.slug}&goal=work`}>{t('Try this research plan')} <span aria-hidden="true">→</span></Link>
  </aside>;
}
