'use client';
import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLocale } from '@/components/localization/LocaleProvider';
import type { CourseOverview } from '@/types/course-overview';
import { courseArtwork } from '@/lib/cinematic-art';
import { courseSearchScore } from '@/lib/learning/catalog-search';
import styles from './learning-catalog.module.css';

export default function CourseSearch({ courses, query, onChange }: { courses: CourseOverview[]; query: string; onChange: (value: string) => void }) {
  const { t } = useLocale(), router = useRouter(), listId = useId();
  const [open, setOpen] = useState(false), [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const matches = courses.map(course => ({ course, score: courseSearchScore(course, query, t) })).filter(item => item.score > 0).sort((a,b) => b.score-a.score).slice(0,5).map(item => item.course);
  const choose = (course: CourseOverview) => { setOpen(false); router.push(course.href); };
  return <div ref={root} className={styles.searchBox} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <label htmlFor={`${listId}-input`} className={styles.searchLabel}>{t('What would you like to learn?')}</label>
    <div className={styles.searchInput}><span aria-hidden="true">⌕</span><input id={`${listId}-input`} role="combobox" type="search" autoComplete="off" maxLength={160} aria-autocomplete="list" aria-controls={listId} aria-expanded={open} aria-activedescendant={open && active >= 0 && matches[active] ? `${listId}-${active}` : undefined} value={query} placeholder={t('Try English, career or budget')} onFocus={() => setOpen(true)} onChange={event => { onChange(event.target.value); setActive(-1); setOpen(true); }} onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); setActive(-1); }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActive(previous => matches.length ? (previous + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length : -1); }
      if (event.key === 'Enter') { event.preventDefault(); if (open && active >= 0 && matches[active]) choose(matches[active]); else setOpen(false); }
    }} />{query && <button type="button" aria-label={t('Clear search')} onClick={() => { onChange(''); setActive(-1); root.current?.querySelector('input')?.focus(); }}>×</button>}</div>
    {open && <div className={styles.suggestions}><p className={styles.suggestionHeading}>{t(query ? 'Matching courses' : 'Explore a new skill')}</p><ul id={listId} role="listbox" aria-label={t('Course suggestions')}>{matches.map((course,index) => <li key={course.id} id={`${listId}-${index}`} role="option" aria-selected={active === index} onMouseDown={event => event.preventDefault()} onClick={() => choose(course)} onMouseMove={() => setActive(index)}><Image src={courseArtwork(course.id, course.image)} alt="" width={72} height={48} sizes="72px" /><span><strong>{t(course.title)}</strong><small>{t(course.category)} · {course.duration}</small></span><span aria-hidden="true">↗</span></li>)}</ul>{!matches.length && <p className={styles.suggestionHeading}>{t('No courses match these filters.')}</p>}<p className={styles.searchHint}>{t('Use arrow keys to explore. Enter opens a course.')}</p></div>}
  </div>;
}
