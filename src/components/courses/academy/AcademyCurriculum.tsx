'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import { localizeAcademyCourse } from '@/lib/localization/academy-content';
import type { AcademyCourse } from '@/lib/learning/academy/types';
import AcademyIcon from './AcademyIcon';
import styles from './academy.module.css';

export default function AcademyCurriculum({ course: original }: { course: AcademyCourse }) {
  const { t, locale } = useLocale();
  const course = useMemo(() => localizeAcademyCourse(original, locale), [original, locale]);
  const [query, setQuery] = useState('');
  const [projectsOnly, setProjectsOnly] = useState(false);
  const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const lessons = course.lessons.filter(lesson => (!projectsOnly || lesson.project)
    && normalize(`${lesson.title} ${lesson.objective}`).includes(normalize(query)));
  return <section id="curriculum" className={styles.card}>
    <span className={styles.sectionKicker}>{t('A clear path from understanding to application')}</span>
    <h2>{t('Your expanded curriculum')}</h2>
    <div className={styles.curriculumTools}>
      <label className={styles.navSearch}><AcademyIcon name="search" size={18} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Find a lesson')} aria-label={t('Find a lesson')} /></label>
      <button type="button" aria-pressed={projectsOnly} onClick={() => setProjectsOnly(value => !value)}><AcademyIcon name="grid" size={16} />{t('Applied project')}</button>
      <span aria-live="polite">{lessons.length}/{course.lessons.length} {t('lessons and laboratories')}</span>
    </div>
    {lessons.length ? <ol className={styles.curriculum}>{lessons.map(lesson => <li key={lesson.id}>
      <span className={styles.muted}>{String(course.lessons.indexOf(lesson) + 1).padStart(2, '0')} · {lesson.minutes} {t('min ·')} {lesson.project ? t('Applied project') : lesson.foundation ? t('Foundation') : t('Advanced laboratory')}</span>
      <details><summary><strong>{lesson.title}</strong></summary><p>{lesson.objective}</p><p className={styles.muted}>{lesson.deliverable}</p><Link className={styles.link} href={`/courses/${course.id}/study?edition=current&lesson=${lesson.id}`}>{t('Open course workspace')} →</Link></details>
    </li>)}</ol> : <p className={styles.notice} role="status">{t('No lessons match this view.')}</p>}
  </section>;
}
