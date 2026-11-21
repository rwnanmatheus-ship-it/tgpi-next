"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useLocale, LocalizedText } from '@/components/localization/LocaleProvider';
import { LocalizedElement } from '@/components/localization/LocalizedElement';
import AreaHero from '@/components/ui/AreaHero';
import GlobalRankBadge from '@/components/profile/GlobalRankBadge';
import { GLOBAL_RANKS, GLOBAL_RANK_DISCLAIMER, GLOBAL_RANK_MAX_POINTS, type GlobalRank } from '@/lib/global-ranks';
import { getRankReadiness } from '@/lib/global-rank-progress';
import styles from './GlobalProgressPanel.module.css';

type Filter = 'all' | 'achieved' | 'upcoming';

function Meter({ value, label, inverse = false }: { value: number; label: string; inverse?: boolean }) {
  return <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} className={`${styles.meter} ${inverse ? styles.inverseMeter : ''}`}><span style={{ width: `${value}%` }} /></div>;
}

export default function GlobalProgressPanel({ rank, headingLevel = 1 }: { rank: GlobalRank; headingLevel?: 1 | 2 }) {
  const { locale, t } = useLocale();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const currentIndex = Math.max(0, GLOBAL_RANKS.findIndex(item => item.id === rank.id));
  const selected = GLOBAL_RANKS.find(item => item.id === selectedId) ?? rank.nextRank ?? rank;
  const selectedIndex = GLOBAL_RANKS.findIndex(item => item.id === selected.id);
  const selectedProgress = getRankReadiness(rank, selected);
  const next = rank.nextRank ? getRankReadiness(rank, rank.nextRank) : null;
  const n = (value: number) => value.toLocaleString(locale, { maximumFractionDigits: 0 });
  const nextTask = next?.requirements.find(item => item.id === 'courses' && !item.met)
    ?? next?.requirements.find(item => item.id === 'plan' && !item.met)
    ?? next?.requirements.find(item => !item.met);
  const taskTitle = nextTask?.id === 'courses' ? 'Complete your next course' : nextTask?.id === 'plan' ? 'Strengthen your personal plan' : 'Expand your country research';
  const pillars = [
    { title: 'Personal plan', points: rank.breakdown.plan, max: 500, href: '/plan', detail: 'Define your priorities and destination strategy.', icon: '◎' },
    { title: 'Preparation', points: rank.breakdown.readiness, max: 500, href: '/profile', detail: 'Connect research, costs, documents and learning.', icon: '◇' },
    { title: 'Learning & research', points: rank.breakdown.activity, max: 9000, href: '/courses', detail: 'Up to 8,000 from twelve completed courses. Research adds up to 1,000. Optional personal information earns no rank points.', icon: '✧' },
  ];
  const visibleRanks = GLOBAL_RANKS.filter((_, index) => filter === 'all' || (filter === 'achieved' ? index <= currentIndex : index > currentIndex));
  async function copyProgress() {
    try {
      await navigator.clipboard.writeText(`TGPI · ${t(rank.name)}\n${n(rank.points)} / ${n(GLOBAL_RANK_MAX_POINTS)} ${t('Points')}\n${n(rank.completedCourses)} ${t('Completed courses')}\n${t(GLOBAL_RANK_DISCLAIMER)}`);
      setCopyState('copied');
    } catch { setCopyState('error'); }
  }

  return <div className={styles.root}>
    <AreaHero headingLevel={headingLevel} id="progress-title" eyebrow="TGPI / Earned progress" title={<><LocalizedText text="Build capability." /><br /><LocalizedText text="Earn your next rank." /></>} description="Ten ranks connect your completed learning, country research and personal plan. Inspect each requirement and choose the work that moves you forward." image="/images/progress/global-progress-observatory-v3.webp" actions={[{ href: '/courses', label: 'Develop my skills' }, { href: '/plan', label: 'Review my plan' }]} />

    <div className={styles.overview}>
      <section className={styles.current} aria-labelledby="current-rank-title">
        <div className={styles.rankIdentity}><GlobalRankBadge rank={rank} size="large" /><div><p className={styles.eyebrow}><LocalizedText text="Your current rank ·" /> {currentIndex + 1} / {GLOBAL_RANKS.length}</p><h2 id="current-rank-title">{t(rank.name)}</h2><p className={styles.currentMeta}>{n(rank.points)} / {n(GLOBAL_RANK_MAX_POINTS)} {t('Points')}</p></div></div>
        <div className={styles.statRow}><div><strong>{n(rank.completedCourses)}</strong><span>{t('Completed courses')}</span></div><div><strong>{n(rank.planCompletion)}%</strong><span>{t('Personal plan')}</span></div><div><strong>{currentIndex + 1} / 10</strong><span>{t('Stages unlocked')}</span></div></div>
        <div className={styles.currentFooter}><span>{rank.nextRank ? t('Next: {value0}', { value0: t(rank.nextRank.name) }) : t('Highest rank achieved')}</span><strong>{next ? t('{count} of 3 requirements met', { count: next.met }) : '100%'}</strong></div>
        <Meter value={next?.percent ?? 100} label={t('Readiness for next rank')} inverse />
        <p className={styles.currentHint}>{t('Points, completed courses and your plan are evaluated together.')}</p>
      </section>

      <section className={styles.nextAction} aria-labelledby="next-action-title"><p className={styles.eyebrow}>{t('Your next best action')}</p><span className={styles.actionIcon} aria-hidden="true">{nextTask?.id === 'courses' ? '✧' : '◎'}</span><h2 id="next-action-title">{t(nextTask ? taskTitle : 'Keep building your capabilities')}</h2><p>{nextTask ? t(nextTask.id === 'courses' ? '{count} completed courses still needed for your next rank.' : nextTask.id === 'plan' ? '{count}% of your plan still needed for your next rank.' : '{count} points still needed for your next rank.', { count: n(nextTask.remaining) }) : t('You have reached the highest rank. Continue learning and discover new fields.')}</p><Link href={nextTask?.href ?? '/courses'} className={styles.primary}>{t(nextTask?.id === 'plan' ? 'Review my plan' : nextTask?.id === 'points' ? 'Explore countries' : 'Develop my skills')}</Link><button type="button" className={styles.textButton} onClick={() => { setSelectedId(rank.nextRank?.id ?? rank.id); document.getElementById('rank-requirements')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }); }}>{t('Inspect next rank requirements')}</button></section>
    </div>

    <section aria-labelledby="progress-sources-title"><div className={styles.sectionHeading}><div><p className={styles.kicker}>{t('Every step counts')}</p><h2 id="progress-sources-title">{t('Where your progress comes from')}</h2></div><span className={styles.total}>{n(rank.points)} {t('Points')}</span></div><div className={styles.pillars}>{pillars.map(pillar => <Link key={pillar.title} href={pillar.href} className={styles.pillar}><div className={styles.pillarTop}><span className={styles.pillarIcon} aria-hidden="true">{pillar.icon}</span><strong>{n(pillar.points)} <span>/ {n(pillar.max)}</span></strong></div><h3>{t(pillar.title)}</h3><Meter value={Math.min(100, Math.floor(pillar.points / pillar.max * 100))} label={t(pillar.title)} /><p>{t(pillar.detail)}</p><span className={styles.pillarLink}>{t('Continue')}</span></Link>)}</div></section>

    <section className={styles.journey} aria-labelledby="rank-journey-title"><div className={styles.sectionHeading}><div><p className={styles.kicker}>{t('Ten stages. One journey.')}</p><h2 id="rank-journey-title">{t('The TGPI rank journey')}</h2></div><div className={styles.filters} role="group" aria-label={t('Filter ranks')}>{(['all', 'achieved', 'upcoming'] as const).map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{t(item === 'all' ? 'All ranks' : item === 'achieved' ? 'Achieved' : 'Upcoming')}</button>)}</div></div><p className={styles.intro}>{t('Select an emblem to inspect its requirements. Previous activity is recalculated under this stricter system; learning records remain intact.')}</p>
      <div className={styles.rankGrid}>{visibleRanks.map(item => { const index = GLOBAL_RANKS.findIndex(candidate => candidate.id === item.id); const status = index < currentIndex ? 'Achieved' : index === currentIndex ? 'Current' : 'Locked'; return <button type="button" key={item.id} className={`${styles.rankCard} ${index === currentIndex ? styles.currentCard : ''} ${index > currentIndex ? styles.lockedCard : ''}`} aria-pressed={selected.id === item.id} aria-controls="rank-requirements" onClick={() => setSelectedId(item.id)}><span className={styles.stage}>{t('Stage')} {index + 1}</span><GlobalRankBadge rank={item} /><strong>{t(item.name)}</strong><span className={styles.threshold}>{n(item.threshold)} {t('Points')}</span><span className={styles.status}>{index <= currentIndex ? <span aria-hidden="true">✓ </span> : null}{t(status)}</span></button>; })}</div>
      {visibleRanks.length === 0 ? <p className={styles.empty}>{t('All ten stages are unlocked. Keep exploring new knowledge.')}</p> : null}

      <section id="rank-requirements" className={styles.requirements} aria-labelledby="selected-rank-title"><div className={styles.requirementHeader}><GlobalRankBadge rank={selected} size="small" /><div><p className={styles.kicker}>{t('Stage')} {selectedIndex + 1} · {t('Requirements')}</p><h3 id="selected-rank-title">{t(selected.name)}</h3></div><span className={styles.requirementCount}>{t('{count} of 3 requirements met', { count: selectedProgress.met })}</span></div><div className={styles.requirementGrid}>{selectedProgress.requirements.map(item => <div key={item.id} className={styles.requirement}><div><strong>{t(item.label)}</strong><span className={item.met ? styles.met : styles.pending}>{t(item.met ? 'Met' : 'In progress')}</span></div><p>{n(Math.min(item.actual, item.target))}{item.id === 'plan' ? '%' : ''} <span>/ {n(item.target)}{item.id === 'plan' ? '%' : ''}</span></p><Meter value={item.percent} label={`${t(selected.name)} · ${t(item.label)}`} />{!item.met ? <Link href={item.href}>{t(item.id === 'courses' ? 'Develop my skills' : item.id === 'plan' ? 'Review my plan' : 'Explore countries')}</Link> : <span className={styles.done}>{t('Requirement complete')}</span>}</div>)}</div><p className={styles.ruleNote}>{t('All three requirements must be met. Points alone never unlock a rank.')}</p></section>
    </section>

    <section className={styles.integrity}><div><p className={styles.kicker}>{'TGPI · '}{t('Progress integrity')}</p><h2>{t('Earned through work. Never purchased.')}</h2><p>{t('Membership does not multiply your score. Saved countries, comparisons and completed checklists have fixed caps. Repeating clicks earns no extra points. Points are a product activity signal, not independent verification of expertise.')}</p><details><LocalizedElement as="summary" aria-label="How points are calculated"><LocalizedText text="How points are calculated" /></LocalizedElement><p>{t('Plan: up to 500. Preparation: up to 500. Completed courses: up to 8,000 across twelve courses. Research: up to 1,000 from eight saved countries, four comparisons and four completed document checklists.')}</p></details><p className={styles.disclaimer}>{t(GLOBAL_RANK_DISCLAIMER)}</p></div><div className={styles.share}><button type="button" onClick={copyProgress}>{t('Copy progress summary')}</button><p role="status" aria-live="polite">{copyState === 'copied' ? t('Progress summary copied.') : copyState === 'error' ? t('Copy unavailable. Try again in a supported browser.') : t('Share your rank without private account information.')}</p></div></section>
  </div>;
}
