'use client';
import { useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { studyWeeks } from '@/lib/learning/catalog-search';
import styles from './academy/academy.module.css';
export default function CourseStudyPlanner({ minutes, lessonMinutes, portfolioMinutes, assessmentMinutes }: { minutes:number; lessonMinutes:number; portfolioMinutes:number; assessmentMinutes:number }) {
  const { t } = useLocale(), [weekly,setWeekly] = useState(120);
  return <section id="study-plan" className={`${styles.card} ${styles.planner}`}><div><span className={styles.sectionKicker}>{t('Make room for your next skill')}</span><h2>{t('Your pace. A realistic plan.')}</h2><p>{t('Choose your weekly study time to estimate a comfortable learning rhythm.')}</p><label className={styles.label}>{t('Study time per week')}<select className={styles.plannerSelect} value={weekly} onChange={event => setWeekly(Number(event.target.value))}>{[60,120,180,300].map(value => <option key={value} value={value}>{value/60}h</option>)}</select></label></div><div><p className={styles.planNumber} aria-live="polite">{studyWeeks(minutes,weekly)} <span>{t('weeks estimated')}</span></p><div className={styles.workload}><span>{lessonMinutes} {t('min ·')} {t('Lessons and practice')}</span><span>{portfolioMinutes} {t('min ·')} {t('Practice portfolio')}</span><span>{assessmentMinutes} {t('min ·')} {t('Assessment and review')}</span></div><p className={styles.muted}>{t('These are planning estimates, not monitored attendance. Your pace may vary. Waiting for the spaced review is not counted as study time.')}</p></div></section>;
}
