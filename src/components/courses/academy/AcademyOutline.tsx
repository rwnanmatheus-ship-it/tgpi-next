'use client';
import { useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import type { AcademyCourse, AcademyRecord } from '@/lib/learning/academy/types';
import AcademyIcon from './AcademyIcon';
import styles from './academy.module.css';

export default function AcademyOutline({ course, record, selected, disabled, onSelect }: {
  course: AcademyCourse; record: AcademyRecord; selected: string; disabled: boolean; onSelect: (id: string) => void;
}) {
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const normalize = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const visible = course.lessons.filter(lesson => normalize(`${lesson.title} ${lesson.objective}`).includes(normalize(query))
    && (filter === 'all' || (filter === 'completed' ? Boolean(record.completed[lesson.id]) : !record.completed[lesson.id])));
  return <nav className={styles.nav} aria-label={t('Course sections')}>
    <button className={styles.outlineToggle} type="button" aria-expanded={open} aria-controls="studio-outline" onClick={() => setOpen(value => !value)}><AcademyIcon name="book" />{t('Your learning path')}<AcademyIcon name="chevron" /></button>
    <div id="studio-outline" className={styles.outlineBody} data-open={open}>
      <div className={styles.navHeading}><AcademyIcon name="book" size={17} />{t('Your learning path')}<span>{course.lessons.length}</span></div>
      <label className={styles.navSearch}><AcademyIcon name="search" size={17} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Find a lesson')} aria-label={t('Find a lesson')} /></label>
      <div className={styles.filters} role="group" aria-label={t('Filter lessons')}>
        {([['all', 'All lessons'], ['pending', 'To complete'], ['completed', 'Completed lessons']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{t(label)}</button>)}
      </div>
      <div className={styles.outlineLessons}>
        {visible.map(lesson => {
          const passed = Boolean(record.completed[lesson.id]);
          return <button key={lesson.id} type="button" className={styles.navButton} data-complete={passed} aria-current={selected === lesson.id ? 'step' : undefined} onClick={() => { onSelect(lesson.id); }} disabled={disabled}>
            <span className={styles.lessonNumber}>{passed ? <AcademyIcon name="check" size={16} /> : String(course.lessons.indexOf(lesson) + 1).padStart(2, '0')}</span>
            <span><strong>{lesson.title}</strong><small>{lesson.minutes} {t('min')} · {passed ? t('Lesson check passed') : lesson.project ? t('Applied project') : lesson.foundation ? t('Foundation') : t('Advanced laboratory')}</small></span>
          </button>;
        })}
        {visible.length === 0 && <p className={styles.muted} role="status">{t('No lessons match this view.')}</p>}
      </div>
      <div className={styles.navMilestones}>
        {(['portfolio', 'final', 'retention'] as const).map((id, index) => <button key={id} type="button" className={styles.navButton} aria-current={selected === id ? 'step' : undefined} onClick={() => onSelect(id)} disabled={disabled}><AcademyIcon name={index === 0 ? 'grid' : index === 1 ? 'shield' : 'clock'} size={18} /><span><strong>{t(id === 'portfolio' ? 'Practice portfolio' : id === 'final' ? 'Final assessment' : 'Spaced review')}</strong></span></button>)}
      </div>
    </div>
  </nav>;
}
