'use client';
import CourseArrow from './CourseArrow';
import CourseCoverBadges from './CourseCoverBadges';
import { academyPracticeCopy } from '@/lib/localization/academy-practice-copy';
import { fullyLocalizedAcademyCourses } from '@/lib/localization/academy-coverage';
import { localeOptions } from '@/lib/localization/config';
import { useLocale } from '@/components/localization/LocaleProvider';
import Image from 'next/image';
import { courseArtwork } from '@/lib/cinematic-art';
import { courseSectors, courseSector, courseSectorCopy } from '@/lib/learning/international-covers';
import Link from 'next/link';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { catalogCopy } from '@/lib/localization/catalog-copy';
import ContinueLearning from './ContinueLearning';
import CourseSearch from './CourseSearch';
import { courseLearningPolicy, credentialLabel } from '@/lib/learning/catalog-policy';
import { parseCatalogFilters, catalogFilterParams, defaultCatalogFilters, type CatalogFilters } from '@/lib/learning/catalog-filters';
import { courseMinutes, courseSearchScore } from '@/lib/learning/catalog-search';
import { courseRegions } from '@/lib/learning/course-regions';
import { professionalAreas } from '@/lib/learning/professional-areas';
import type { CourseOverview } from '@/types/course-overview';
import styles from './learning-catalog.module.css';

type Props = { courses: CourseOverview[]; initialFilters: CatalogFilters };
const goals = [['all','All subjects'],['emergency-readiness','Primeiros socorros e desastres'],['global-mobility','Language & mobility'],['decision-intelligence','Better decisions'],['global-economics','Money & opportunity'],['future-of-work','Career & technology']] as const;
export default function LearningPathExplorer({ courses, initialFilters }: Props) {
  const { t, locale } = useLocale();
  const [filters, setFilters] = useState(initialFilters), [sort, setSort] = useState('recommended');
  const [limit, setLimit] = useState(9), [comparison, setComparison] = useState<string[]>([]), [view, setView] = useState<'grid'|'list'>('grid');
  const [compareOpen, setCompareOpen] = useState(false);
  const deferredQuery = useDeferredValue(filters.query);
  const copy = catalogCopy(locale);
  const counts = useMemo(() => {
    const areas = new Map<string, number>(), sectors = new Map<string, number>(), goals = new Map<string, number>();
    for (const course of courses) {
      if (course.status !== 'available') continue;
      if (course.professionalArea) areas.set(course.professionalArea, (areas.get(course.professionalArea) ?? 0) + 1);
      const sector = courseSector(course.id);
      if (sector) sectors.set(sector, (sectors.get(sector) ?? 0) + 1);
      goals.set(course.goal, (goals.get(course.goal) ?? 0) + 1);
    }
    return { areas, sectors, goals, available: courses.filter(course => course.status === 'available').length };
  }, [courses]);
  const update = (patch: Partial<CatalogFilters>) => {
    const next = { ...filters, ...patch }; setFilters(next); setLimit(9);
    const params = catalogFilterParams(next, new URLSearchParams(window.location.search));
    window.history.replaceState(null, '', `${window.location.pathname}${params.size ? `?${params}` : ''}${window.location.hash}`);
  };
  useEffect(() => { const read = () => { setFilters(parseCatalogFilters(new URLSearchParams(window.location.search))); setLimit(9); }; window.addEventListener('popstate',read); return () => window.removeEventListener('popstate',read); }, []);
  const studyLanguage = (course: CourseOverview) => fullyLocalizedAcademyCourses.has(course.id)
    ? academyPracticeCopy(locale, 'availableLanguages')
    : t(courseLearningPolicy(course).instructionLanguage === 'pt-BR' ? 'Instruction: Portuguese' : 'Instruction: English');
  const eligible = useMemo(() => courses.filter(course => (filters.sector === 'all' || courseSector(course.id) === filters.sector) && (filters.region === 'all' || course.marketRegion === filters.region) && (filters.area === 'all' || course.professionalArea === filters.area) && (filters.goal === 'all' || course.goal === filters.goal) && (filters.series === 'all' || course.series === filters.series) && (filters.availability === 'all' || course.status === filters.availability) && (filters.credential === 'all' || courseLearningPolicy(course).credentialStatus === filters.credential) && (filters.access === 'all' || courseLearningPolicy(course).accessPolicy === filters.access) && (filters.language === 'all' || fullyLocalizedAcademyCourses.has(course.id) || courseLearningPolicy(course).instructionLanguage === filters.language)), [courses, filters.sector, filters.region, filters.area, filters.goal, filters.series, filters.availability, filters.credential, filters.access, filters.language]);
  const visible = useMemo(() => eligible.map(course => ({ course, score: courseSearchScore(course,deferredQuery,t) })).filter(item => item.score > 0).sort((a,b) => sort === 'shortest' ? courseMinutes(a.course.duration)-courseMinutes(b.course.duration) : sort === 'longest' ? courseMinutes(b.course.duration)-courseMinutes(a.course.duration) : sort === 'title' ? t(a.course.title).localeCompare(t(b.course.title),locale) : b.score-a.score).map(item => item.course), [eligible, deferredQuery, sort, t, locale]);
  const selected = courses.filter(course => comparison.includes(course.id));
  const activeFilters = Object.entries(filters).some(([key,value]) => value !== defaultCatalogFilters[key as keyof CatalogFilters]);
  return <section id="learning-paths" className={styles.catalog} aria-labelledby="learning-paths-title">
    <ContinueLearning />
    <div className={styles.heading}><div><p className={styles.eyebrow}>{t('Your next capability')}</p><h2 id="learning-paths-title">{t('Find a course. Change what you can do.')}</h2></div><p>{t('Choose by outcome, explore the curriculum and build evidence through practice.')}</p></div>
    <div className={styles.discovery}>
      <CourseSearch courses={eligible} query={filters.query} onChange={query => update({query})} />
      <div className={styles.quickSearch}><span>{copy.searchIdeas}</span>{['English', 'AI', 'Excel', 'Data', 'Career'].map(term => <button type="button" key={term} onClick={() => update({ query: t(term) })}>{t(term)}</button>)}</div>
    </div>
    <div className={styles.subjects} role="group" aria-label={t('Filter by learning goal')}>{goals.map(([value,label], index) => <button key={value} type="button" aria-pressed={filters.goal === value} onClick={() => update({goal:value})}><span className={styles.subjectIcon} aria-hidden="true">{['▦','✚','◎','◇','◈','⌘'][index]}</span><span>{t(label)}<small>{value === 'all' ? counts.available : counts.goals.get(value) ?? 0} {t('Available courses')}</small></span></button>)}</div>
    <div className={styles.catalogLayout}>
    <details className={styles.filterPanel} open>
      <summary>{t('Refine your search')}<span aria-hidden="true">＋</span></summary>
      <div className={styles.tools}>
      <div className={styles.areaFilter}>
        <label htmlFor="professional-area">{t('Professional area')}<select id="professional-area" value={filters.area} onChange={event => update({area:event.target.value,sector:'all'})}>
          <option value="all">{t('All professional areas')}</option>
          {professionalAreas.map(([id, label]) => <option key={id} value={id}>{t(label)} ({counts.areas.get(id) ?? 0})</option>)}
        </select></label>
        <label htmlFor="course-sector">{courseSectorCopy(locale, 'sector')}<select id="course-sector" value={filters.sector} onChange={event => update({sector:event.target.value,region:'all'})}>
          <option value="all">{courseSectorCopy(locale, 'allSectors')}</option>
          {[...courseSectors].sort((a,b) => a.labels[locale].localeCompare(b.labels[locale],locale)).map(sector => { const count = courses.filter(course => courseSector(course.id) === sector.id && (filters.area === 'all' || course.professionalArea === filters.area)).length; return <option key={sector.id} value={sector.id} disabled={count === 0}>{sector.labels[locale]} ({count})</option>; })}
        </select></label>
        <p>{courseSectorCopy(locale, 'expansion')}</p>
      </div>

      <div className={styles.filters} role="group" aria-label={t('Access plan')}>{([['all', 'All plans'], ['free_account', 'TGPI Free'], ['premium', 'TGPI Premium']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={filters.access === value} onClick={() => update({ access: value })}>{t(label)}</button>)}</div>
      <div className={styles.policyFilters}>
        <label>{t('Regional market')}<select value={filters.region} onChange={event => update({region:event.target.value,sector:'all'})}><option value="all">{t('All regional markets')}</option>{courseRegions.map(([id, label]) => <option key={id} value={id}>{t(label)} ({courses.filter(course => course.marketRegion === id).length})</option>)}</select></label>
        <label>{t('Course series')}<select value={filters.series} onChange={event => update({series:event.target.value})}><option value="all">{t('All series')}</option>{[...new Set(courses.flatMap(course => course.series ? [course.series] : []))].map(series => <option key={series} value={series}>{t(series)}</option>)}</select></label>
        <label>{t('Availability')}<select value={filters.availability} onChange={event => update({availability:event.target.value})}><option value="available">{t('Available now')}</option><option value="all">{t('Full library')}</option><option value="planned">{t('In development')}</option></select></label>
        <label>{t('Course language')}<select value={filters.language} onChange={event => update({language:event.target.value})}><option value="all">{t('All languages')}</option>{localeOptions.map(option => <option key={option.code} value={option.code} lang={option.code}>{option.name}</option>)}</select></label>
        <label>{t('Credential pathway')}<select value={filters.credential} onChange={event => update({credential:event.target.value})}><option value="all">{t('All credential types')}</option><option value="criteria_available">{t('Credential pathway')}</option><option value="none">{t('Practice')}</option></select></label>
      </div>
      {activeFilters && <button type="button" className={styles.textButton} onClick={() => update(defaultCatalogFilters)}>{t('Reset filters')}</button>}
    </div></details>
    <div className={styles.results} aria-busy={filters.query !== deferredQuery}>
    <div className={styles.resultRow}><p role="status" aria-live="polite">{t('Course results: {count}', {count:visible.length})}{activeFilters && <button className={styles.textButton} onClick={() => update(defaultCatalogFilters)}>{t('Reset filters')}</button>}</p><div className={styles.resultControls}><select aria-label={t('Sort courses')} value={sort} onChange={event => {setSort(event.target.value);setLimit(9);}}><option value="recommended">{t('Relevance')}</option><option value="shortest">{t('Shortest workload')}</option><option value="longest">{copy.longest}</option><option value="title">{t('Course title')}</option></select><div className={styles.viewSwitch} role="group" aria-label={t('Course layout')}><button aria-pressed={view==='grid'} aria-label={t('Grid view')} onClick={() => setView('grid')}>▦</button><button aria-pressed={view==='list'} aria-label={t('List view')} onClick={() => setView('list')}>☰</button></div></div></div>
    {activeFilters && <div className={styles.activeFilters} aria-label={t('Filters active')}>{Object.entries(filters).filter(([key,value]) => value !== defaultCatalogFilters[key as keyof CatalogFilters]).map(([key,value]) => {
      const label = key === 'query' ? value : key === 'area' ? t(professionalAreas.find(([id]) => id === value)?.[1] ?? value) : key === 'sector' ? courseSectors.find(sector => sector.id === value)?.labels[locale] ?? value : key === 'goal' ? t(goals.find(([id]) => id === value)?.[1] ?? value) : key === 'region' ? t(courseRegions.find(([id]) => id === value)?.[1] ?? value) : key === 'language' ? localeOptions.find(option => option.code === value)?.name ?? value : t(({free_account:'TGPI Free',premium:'TGPI Premium',planned:'In development',all:'Full library',criteria_available:'Credential pathway',none:'Practice'} as Record<string,string>)[value] ?? value);
      return <button type="button" key={key} onClick={() => update({[key]:defaultCatalogFilters[key as keyof CatalogFilters]})} aria-label={`${copy.removeFilter}: ${label}`}>{label}<span aria-hidden="true">×</span></button>;
    })}</div>}
    {selected.length > 0 && <aside className={styles.compareBar} aria-label={t('Course comparison')}><span>{t('Compare up to three courses')} · {selected.length}/3</span><button className={styles.primary} disabled={selected.length<2} onClick={() => {setCompareOpen(value => !value);requestAnimationFrame(() => document.getElementById('course-comparison')?.scrollIntoView({block:'start'}));}} aria-expanded={compareOpen}>{t(compareOpen ? 'Close comparison' : 'Compare courses')}</button><button className={styles.textButton} onClick={() => {setComparison([]);setCompareOpen(false);}}>{t('Clear selection')}</button></aside>}
    {compareOpen && <section id="course-comparison" className={styles.comparePanel}><h2>{t('Course comparison')}</h2><div className={styles.compareScroll} tabIndex={0} role="region" aria-label={t('Course comparison')}><table><thead><tr><th scope="col">{t('Course')}</th>{selected.map(course => <th scope="col" key={course.id}>{t(course.title)}</th>)}</tr></thead><tbody>{[['Study time', (c:CourseOverview) => c.duration], ['Level',(c:CourseOverview) => t(c.level)], ['What you will practice',(c:CourseOverview) => t(c.benefits[0] || c.desc)],['Course language',studyLanguage]].map(([label,read]) => <tr key={label as string}><th scope="row">{t(label as string)}</th>{selected.map(course => <td key={course.id}>{(read as (c:CourseOverview)=>string)(course)}</td>)}</tr>)}<tr><th scope="row">{t('Explore course')}</th>{selected.map(course => <td key={course.id}><Link className={styles.primary} href={course.href}>{t('Course overview')} <CourseArrow /></Link></td>)}</tr></tbody></table></div></section>}
    {visible.length ? <div className={`${styles.grid} ${view === 'list' ? styles.list : ''}`}>{visible.slice(0,limit).map(course => { const policy = courseLearningPolicy(course); return <article className={styles.card} data-tgpi-surface="card" data-tgpi-material="paper" data-tgpi-interactive="true" key={course.id}>
      <Link href={course.href} className={styles.cover} aria-label={t('Explore {course}',{course:t(course.title)})}><Image src={courseArtwork(course.id,course.image)} alt="" fill sizes={view === 'list' ? '(max-width: 640px) 100vw, 300px' : '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 420px'} className={styles.image} /><span className={styles.badge}>{t(course.status !== 'available' ? 'In development' : policy.accessPolicy === 'premium' ? 'TGPI Premium' : 'TGPI Free')}</span><span className={styles.coverArrow} aria-hidden="true"><CourseArrow /></span><CourseCoverBadges courseId={course.id} /></Link>
      <div className={styles.cardBody}><p className={styles.eyebrow} lang={policy.instructionLanguage === 'pt-BR' && !fullyLocalizedAcademyCourses.has(course.id) ? 'pt-BR' : undefined}>{t(course.category)}</p><h3 lang={policy.instructionLanguage === 'pt-BR' && !fullyLocalizedAcademyCourses.has(course.id) ? 'pt-BR' : undefined}><Link href={course.href}>{t(course.title)}</Link></h3><p className={styles.description} lang={policy.instructionLanguage === 'pt-BR' && !fullyLocalizedAcademyCourses.has(course.id) ? 'pt-BR' : undefined}>{policy.kind === 'professional' ? course.benefits.map(benefit => t(benefit)).join(' ') : t(course.desc)}</p><div className={styles.meta}>{course.marketRegion && <span>{t(courseRegions.find(([id]) => id === course.marketRegion)?.[1] ?? course.marketRegion)}</span>}<span>{course.duration}</span><span>{course.lessonCount ? `${course.lessonCount} ${t("lessons and laboratories")}` : t(course.format)}</span><span>{studyLanguage(course)}</span></div>{course.benefits[0] && <p className={styles.outcome}>{t(course.benefits[0])}</p>}<div className={styles.cardFooter}><span className={styles.credential}>{t(credentialLabel(policy))}</span><Link className={styles.primary} href={course.href}>{t('Explore course')} </Link><label className={styles.compareCheck}><input type="checkbox" checked={comparison.includes(course.id)} disabled={!comparison.includes(course.id) && comparison.length >= 3} onChange={() => {setComparison(previous => previous.includes(course.id) ? previous.filter(id => id !== course.id) : [...previous,course.id]);setCompareOpen(false);}} />{t('Compare course')}</label></div></div>
    </article>; })}</div> : <div className={styles.empty}><h3>{t('No courses match these filters.')}</h3><p>{t('Try a broader subject or another search term.')}</p><button className={styles.primary} onClick={() => update(defaultCatalogFilters)}>{t('Reset filters')}</button></div>}
    {visible.length > limit && <div className={styles.loadMore}><button className={styles.primary} onClick={() => setLimit(previous => previous+9)}>{t('Show more courses')} <CourseArrow direction="down" /></button><p>{t('Showing {start}–{end} of {count}',{start:1,end:Math.min(limit,visible.length),count:visible.length})}</p></div>}
    </div></div>
    <aside className={styles.connected}><div><p className={styles.eyebrow}>{t('Put learning to work')}</p><h2>{t('One course. One concrete next step.')}</h2><p>{t('Compare your destinations, turn your findings into a personal plan and keep your achievements together.')}</p></div><nav aria-label={t('Connected learning tools')}><Link href="/compare">{t('Compare countries ↗').replace('↗', '').trim()} <CourseArrow /></Link><Link href="/dashboard">{t('My workspace ↗').replace('↗', '').trim()} <CourseArrow /></Link><Link href="/certificates">{t('My achievements ↗').replace('↗', '').trim()} <CourseArrow /></Link></nav></aside>
    <details className={styles.standard}><summary>{t('How TGPI learning works')}</summary><div><p><strong>{t('Learn through situations.')}</strong>{t('Each available course includes scenarios, practical tasks and formative checkpoints with feedback.')}</p><p><strong>{t('Keep your progress.')}</strong>{t('Practice courses record checkpoints; professional courses also save activities and project submissions in your account.')}</p><p><strong>{t('Understand your credential.')}</strong>{t('Study, apply, check and revisit. Your certificate is issued automatically after all requirements are met; no human review queue is required.')}</p></div></details>
  </section>;
}

