'use client';
import CourseArrow from '../CourseArrow';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import { localizeAcademyCourse } from '@/lib/localization/academy-content';
import type { AcademyCourse, AcademyStatus, AcademyStudyPlan } from '@/lib/learning/academy/types';
import styles from './academy.module.css';
import { announceProgressSaved, PROGRESS_SYNC_CHANNEL } from '@/lib/progress-sync';
import AcademyJourney from './AcademyJourney';
import AcademyIcon from './AcademyIcon';
import AcademyStudioHeader from './AcademyStudioHeader';
import AcademyRoadmap from './AcademyRoadmap';
import AcademyOutline from './AcademyOutline';
import AcademyFocusTimer from './AcademyFocusTimer';
import StudyReader from '@/components/accessibility/StudyReader';
import { nextStudioTarget as nextTarget, studioProgress, studioNotebook } from '@/lib/learning/academy/studio-progress';

export default function AcademyStudy({ course, initialLesson }: { course: AcademyCourse; initialLesson?: string }) {
  const { t } = useLocale();
  const { sessionId, isLoaded } = useAuth();
  if (!isLoaded) return <p className={styles.page} role="status">{t('Loading your learning record…')}</p>;
  if (!sessionId) return <Link className={styles.page} href={`/sign-in?next=${encodeURIComponent(`/courses/${course.id}/study`)}`}>{t('Sign in to continue.')}</Link>;
  return <StudySession key={`${sessionId}:${course.id}:${course.version}:${initialLesson ?? ''}`} course={course} sessionId={sessionId} initialLesson={initialLesson} />;
}
function StudySession({ course: original, sessionId, initialLesson }: { course: AcademyCourse; sessionId: string; initialLesson?: string }) {
  const { locale, t } = useLocale();
  const course = useMemo(() => localizeAcademyCourse(original, locale), [original, locale]);
  const [status, setStatus] = useState<AcademyStatus | null>(null), [selected, setSelected] = useState(course.lessons[0].id);
  const [note, setNote] = useState(''), [portfolio, setPortfolio] = useState(''), [diagnostic, setDiagnostic] = useState(''), [consent, setConsent] = useState(false);
  const [answers, setAnswers] = useState<Record<string,string>>({}), [calculation, setCalculation] = useState('');
  const [focus, setFocus] = useState(false), [largeText, setLargeText] = useState(false), [now, setNow] = useState(() => Date.now());
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [loaded, setLoaded] = useState(false);
  const inFlight = useRef(false), alive = useRef(true), stateRef = useRef(status); stateRef.current = status;
  const [plan, setPlan] = useState<AcademyStudyPlan>({ goal: 'foundation', weeklyHours: 3 });
  const endpoint = `/api/learning/academy/${course.id}?edition=${course.version}`;
  const editionPath = `/courses/${course.id}/study`;
  const source = useRef(original);
  source.current = original;
  const record = status?.record, lesson = course.lessons.find(l => l.id === selected);
  const certificateName = status?.publicName ?? '';
  const requiresNameConfirmation = Boolean(record && certificateName !== record.consent.publicName);
  const dirty = Boolean(record && (lesson ? note !== (record.notes[selected] ?? '') : selected === 'portfolio' ? portfolio !== record.portfolio : false));
  const dirtyRef = useRef(dirty); dirtyRef.current = dirty || Boolean(status?.challenge && (Object.keys(answers).length || calculation));
  const load = useCallback(async () => {
    setError('');
    try {
      const response = await fetch(endpoint, { cache: 'no-store', headers: { 'X-TGPI-Session': sessionId } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to load learning.');
      if (!alive.current) return;
      const next = data as AcademyStatus; setStatus(next);
      const first = next.challenge?.target ?? (source.current.lessons.some(item => item.id === initialLesson) ? initialLesson : undefined) ?? nextTarget(source.current, next);
      setSelected(first); setNote(next.record?.notes[first] ?? ''); setPortfolio(next.record?.portfolio ?? ''); setLoaded(true);
    } catch (e) { if (alive.current) setError(e instanceof Error ? e.message : 'Unable to load learning.'); }
  }, [endpoint, initialLesson, sessionId]);
  useEffect(() => { alive.current = true; void load(); return () => { alive.current = false; }; }, [load]);
  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (dirtyRef.current) { event.preventDefault(); event.returnValue = ''; } }; window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn); }, []);
  async function mutate(input: Record<string, unknown>): Promise<boolean> {
    if (inFlight.current) return false;
    inFlight.current = true; setBusy(true); setError('');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-TGPI-Session': sessionId }, body: JSON.stringify({ ...input, version: course.version }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Unable to save learning.');
      if (!alive.current) return false;
      setStatus(data as AcademyStatus);
      announceProgressSaved();
      if (input.action === 'enrol') { setNote(data.record?.notes[selected] ?? ''); setPortfolio(data.record?.portfolio ?? ''); }
      if (input.action === 'begin' || input.action === 'submit') { setAnswers({}); setCalculation(''); }
      return true;
    } catch (e) { if (alive.current) setError(e instanceof Error ? e.message : 'Unable to save learning.'); return false; }
    finally { inFlight.current = false; if (alive.current) setBusy(false); }
  }
  useEffect(() => {
    if (!loaded) return;
    let active = true;
    let reading = false;
    const refresh = async () => {
      const current = stateRef.current;
      if (!current || current.challenge || dirtyRef.current || inFlight.current || reading ||
          !navigator.onLine || document.visibilityState !== 'visible') return;
      reading = true;
      try {
        const response = await fetch(endpoint, { cache: 'no-store', headers: { 'X-TGPI-Session': sessionId } });
        if (!response.ok) return;
        const next = await response.json() as AcademyStatus;
        if (!active || dirtyRef.current || inFlight.current || stateRef.current !== current ||
            (next.record?.revision ?? 0) <= (current.record?.revision ?? 0)) return;
        setStatus(next);
        setNote(next.record?.notes[selected] ?? '');
        setPortfolio(next.record?.portfolio ?? '');
      } catch {
        // Keep the last confirmed record on a transient refresh failure.
      } finally { reading = false; }
    };
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(PROGRESS_SYNC_CHANNEL) : null;
    if (channel) channel.onmessage = refresh;
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    document.addEventListener('visibilitychange', refresh);
    const timer = window.setInterval(refresh, 60_000);
    return () => {
      active = false;
      channel?.close();
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
      document.removeEventListener('visibilitychange', refresh);
      window.clearInterval(timer);
    };
  }, [endpoint, loaded, selected, sessionId]);
  const mutationRef = useRef(mutate); mutationRef.current = mutate;
  useEffect(() => {
    if (!dirty || !record || error || busy) return;
    const timer = window.setTimeout(() => {
      const current = stateRef.current?.record; if (!current) return;
      void mutationRef.current(lesson ? { action: 'save', revision: current.revision, lessonId: selected, text: note } : { action: 'portfolio', revision: current.revision, text: portfolio });
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [dirty, note, portfolio, selected, record, lesson, error, busy]);
  function select(id: string) {
    if (dirty || busy) { setError(t('Save your current draft before changing sections.')); return; }
    setSelected(id); setNote(record?.notes[id] ?? ''); setError('');
    requestAnimationFrame(() => { const target = document.getElementById('learning-content'); target?.focus({ preventScroll: true }); target?.scrollIntoView({ block: 'start', behavior: 'instant' }); });
  }
  const completed = course.lessons.filter(l => record?.completed[l.id]).length, allComplete = completed === course.lessons.length;
  const portfolioReady = Boolean(record && record.portfolio.trim().length >= 200);
  const challenge = status?.challenge, result = status?.lastResult;
  const focusAssessment = useRef<'begin' | 'submit' | null>(null);
  const assessmentHeading = useRef<HTMLHeadingElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const target = focusAssessment.current === 'begin' && challenge ? assessmentHeading.current
      : focusAssessment.current === 'submit' && !challenge && result ? resultHeading.current : null;
    if (target) {
      focusAssessment.current = null;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }, [challenge, result]);
  async function assessment(input: Record<string, unknown> & { action: 'begin' | 'submit' }) {
    if (inFlight.current) return;
    focusAssessment.current = input.action;
    if (!await mutate(input)) focusAssessment.current = null;
  }
  const lessonLanguage = course.language === 'pt-BR' ? 'pt-BR' : locale;
  const prerequisiteMissing = lesson ? course.lessons.slice(0, course.lessons.indexOf(lesson)).some(item => !record?.completed[item.id]) : false;
  const suggested = status ? nextTarget(original, status) : selected;
  const goals = {
    foundation: ['Build the foundations', 'Read the worked example, then reproduce it with your own inputs.'],
    application: ['Apply a skill', 'Choose a fictional situation and use it across the course activities.'],
    portfolio: ['Build portfolio evidence', 'Save a first version and document each improvement as you go.'],
  } as const;
  const reviewOpen = Boolean(record?.reviewAvailableAt && now >= Date.parse(record.reviewAvailableAt));
  useEffect(() => {
    if (!record?.reviewAvailableAt || record.retention) return;
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    const update = () => setNow(Date.now()); window.addEventListener('focus', update);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', update); };
  }, [record?.reviewAvailableAt, record?.retention]);
  useEffect(() => {
    const guard = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!target || target.getAttribute('href')?.startsWith('#') || target.getAttribute('target') === '_blank' || !dirtyRef.current || event.ctrlKey || event.metaKey) return;
      if (!window.confirm(t('You have unsaved work or assessment answers. Leave this page?'))) { event.preventDefault(); event.stopPropagation(); }
    };
    document.addEventListener('click', guard, true); return () => document.removeEventListener('click', guard, true);
  }, [t]);
  const lessonIndex = course.lessons.findIndex(item => item.id === selected);
  const progress = studioProgress(course, record);
  const nextLesson = course.lessons.find(item => item.id === suggested);
  const nextLabel = nextLesson?.title ?? t(suggested === 'portfolio' ? 'Practice portfolio' : suggested === 'final' ? 'Final assessment' : 'Spaced review');
  const savedState = busy ? t('Saving or checking…') : error ? t('Sync needs attention') : dirty ? t('Unsaved changes') : t('Confirmed on the server');
  const continueJourney = () => {
    select(suggested);
    if (challenge && !dirty && !busy) requestAnimationFrame(() => document.getElementById('active-assessment')?.scrollIntoView({ block: 'start' }));
  };
  function exportNotebook() {
    if (!record || dirty || busy) return;
    const contents = studioNotebook(course, record, { edition: t('Edition'), portfolio: t('Practice portfolio'), saved: t('Saved progress') });
    const url = URL.createObjectURL(new Blob([contents], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `TGPI-${course.id}-${course.version}.txt`; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const button = (label: string, onClick: () => void, disabled = false, secondary = false) => <button type="button" className={`${styles.button} ${secondary ? styles.secondary : ''}`} onClick={onClick} disabled={busy || disabled}>{t(label)}</button>;
  return <main className={`${styles.page} ${styles.studioPage} ${focus ? styles.focusMode : ''} ${largeText ? styles.largeText : ''}`} lang={locale}>
    <div className={styles.topline}><Link className={styles.breadcrumb} href={`/courses/${course.id}`}>← {t('Course overview')}</Link><span className={styles.edition}>{t('Edition')} {course.version}</span><Link className={styles.breadcrumb} href="/certificates"><AcademyIcon name="shield" size={16} />{t('My certificates')}</Link></div>
    <AcademyStudioHeader course={course} record={record} t={t} onContinue={continueJourney} disabled={busy || dirty} />
    {error && <div role="alert" className={styles.error}>{t(error)}{button('Reload confirmed progress', () => { if (!dirty || window.confirm(t('Your local unsaved draft will be replaced by the last confirmed version. Continue?'))) void load(); }, false, true)}</div>}
    {!loaded && !error && <p role="status">{t('Loading your learning record…')}</p>}
    {loaded && !record && <>
      <AcademyJourney course={course} t={t} />
      <section className={styles.card}>
        <h2>{t('Set your starting point')}</h2>
        <div className={styles.studyPlanControls}>
          <label className={styles.label}>{t('My learning goal')}
            <select value={plan.goal} onChange={event => setPlan({ ...plan, goal: event.target.value as AcademyStudyPlan['goal'] })}>
              {Object.entries(goals).map(([value, [label]]) => <option key={value} value={value}>{t(label)}</option>)}
            </select>
          </label>
          <label className={styles.label}>{t('Hours per week')}
            <select value={plan.weeklyHours} onChange={event => setPlan({ ...plan, weeklyHours: Number(event.target.value) })}>
              {[1, 2, 3, 5, 8, 10].map(hours => <option key={hours} value={hours}>{hours}</option>)}
            </select>
          </label>
        </div>
        <p className={styles.notice}>{t(goals[plan.goal][1])} {t('Estimated study weeks')}: <strong>{Math.ceil(course.minutes / (60 * plan.weeklyHours))}</strong>.</p>
        <p>{t('Describe what you already know, one situation you want to handle and one uncertainty. This diagnostic is saved, not graded.')}</p>
        <label className={styles.label}>{t('My starting point')}
          <textarea className={styles.field} value={diagnostic} onChange={event => setDiagnostic(event.target.value)} minLength={30} maxLength={3000} />
        </label>
        {certificateName ? <label className={styles.check}><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>{t('I agree to automatic certificate issuance after completion using this account name:')} <strong>{certificateName}</strong>. {t('The certificate starts private. I understand that open projects and oral fluency are not independently graded.')}</span></label> : <p className={styles.notice}>{t('Enter your complete real name for certificates.')} <Link className={styles.link} href="/profile/security#settings-identity">{t('Account settings')}</Link></p>}
        <p className={styles.muted}>{t('The required spaced review opens 24 hours after the final assessment. Waiting time is not counted in the workload.')}</p>
        {button('Start this edition', () => void mutate({ action: 'enrol', diagnostic, plan, nameConsent: true }), !certificateName || !consent || diagnostic.trim().length < 30)}
      </section>
    </>}
    {record && <>
      <div className={styles.studyToolbar}>
        <div className={styles.syncStatus} role="status" data-pending={dirty || busy} data-error={Boolean(error)}><span className={styles.liveDot} />{savedState}</div>
        <div className={styles.studyTools}>
          <button type="button" aria-pressed={focus} onClick={() => setFocus(value => !value)}><AcademyIcon name="focus" size={16} />{t('Focus mode')}</button>
          <button type="button" aria-pressed={largeText} onClick={() => setLargeText(value => !value)}><AcademyIcon name="text" size={16} />{t('Larger text')}</button>
          <button type="button" disabled={dirty || busy} onClick={exportNotebook}><AcademyIcon name="download" size={16} />{t('Export saved evidence')}</button>
          <a href="#learning-content">{t('Go to lesson')}<AcademyIcon name="arrow" size={16} /></a>
        </div>
      </div>
      <AcademyRoadmap course={course} record={record} selected={selected} onSelect={select} disabled={busy} t={t} />
      {course.scopeNotice && <p className={styles.notice} lang="pt-BR">{course.scopeNotice}</p>}
      {!course.projectBrief && <div className={styles.editionBanner}><div><AcademyIcon name="spark" /><span><strong>{t('Your learning record is preserved.')}</strong><small>{t('Explore the expanded edition with new applied projects.')}</small></span></div><Link href={`${editionPath}?edition=current`}>{t('Open the expanded edition')}<AcademyIcon name="arrow" size={17} /></Link></div>}
      {record.legacy?.version === '2026.11.1' && <p className={styles.muted}><Link className={styles.link} href={`${editionPath}?edition=previous`}>{t('Open previous learning records')}</Link></p>}
      {record.legacy && <p className={styles.notice}>{t('Previous learning is preserved. Imported notes are available; this edition has new assessment requirements.')} {course.legacyHref && <Link className={styles.link} href={course.legacyHref}>{t('Open previous learning records')}</Link>}</p>}
      {record.credentialId && <section className={styles.success}><h2>{t('Your certificate is ready')}</h2><p>{t('You completed all required checks, the final assessment and the spaced review.')}</p><div className={styles.actions}><Link className={styles.button} href={`/certificates/${record.credentialId}`}>{t('View and download certificate')}</Link>{button(record.sharing ? 'Make certificate private' : 'Enable public verification', () => void mutate({ action: 'sharing', sharing: !record.sharing }), false, true)}</div><p className={styles.muted}>{record.sharing ? t('Anyone with the verification link can view the shared certificate name and results.') : t('The certificate is private. Public verification becomes available only when you enable sharing.')}</p></section>}
      {record.completedAt && !record.credentialId && (
        <section className={styles.card}>
          <h2>{t('Certificate')}</h2>
          {!certificateName ? (
            <p className={styles.notice}>{t('Enter your complete real name for certificates.')} <Link className={styles.link} href="/profile/security#settings-identity">{t('Account settings')}</Link></p>
          ) : requiresNameConfirmation ? (
            <>
              <p>{t('Complete real name')} · <strong>{certificateName}</strong></p>
              {button('Consent & issue credential', () => void mutate({ action: 'issue', confirmedName: certificateName }))}
            </>
          ) : (
            <>
              <p>{t('Completion is saved. Verify your email if needed, then retry secure automatic issuance.')}</p>
              {button('Retry certificate issuance', () => void mutate({ action: 'issue' }))}
            </>
          )}
        </section>
      )}
      <div className={styles.study}>
      <AcademyOutline course={course} record={record} selected={selected} disabled={busy} onSelect={select} />
      <div id="learning-content" tabIndex={-1} className={`${styles.studyContent} ${styles.studyTitle}`}>
        {lesson && <article className={`${styles.card} ${styles.lessonCard}`}><span className={styles.badge}>{lesson.minutes} {t("min ·")} {lesson.project ? t('Applied project') : lesson.foundation ? t('Foundation') : t('Advanced laboratory')}</span><p className={styles.sectionKicker}>{t('Lesson {current} of {total}', { current: lessonIndex+1, total: course.lessons.length })}</p><h2 className={styles.title} lang={lessonLanguage}>{lesson.title}</h2><p className={styles.lessonObjective} lang={lessonLanguage}>{lesson.objective}</p>
          <StudyReader key={`${lesson.id}:${locale}`} title={lesson.title} language={lessonLanguage} atlas sections={[
            { title: t('Performance objective'), titleLang: locale, passages: [{ text: lesson.objective }] },
            ...lesson.sections.map(section => ({
              title: section.title,
              titleLang: section.preserveTitle ? 'en' : lessonLanguage,
              passages: section.bodyParts?.map(part => ({ text: part.text, lang: part.preserve ? 'en' : lessonLanguage }))
                ?? [{ text: section.body, lang: section.preserveBody ? 'en' : lessonLanguage }],
            })),
            { title: t('Practice and transfer'), titleLang: locale, passages: [...lesson.practice, lesson.deliverable].map(text => ({ text })) },
          ]} />
          <nav className={styles.lessonAnchors} aria-label={t('Inside this lesson')}><a href="#lesson-reading"><AcademyIcon name="book" size={16} />{t('Read and explore')}</a><a href="#lesson-practice"><AcademyIcon name="grid" size={16} />{t('Practice and transfer')}</a><a href="#lesson-evidence"><AcademyIcon name="shield" size={16} />{t('My practice evidence')}</a></nav><div id="lesson-reading" className={styles.readingSections}>{lesson.sections.map((section,i) => <section key={i}><span className={styles.sectionIndex} aria-hidden="true">{String(i+1).padStart(2, '0')}</span><div><h3 lang={section.preserveTitle ? 'en' : lessonLanguage}>{section.title}</h3><p className={styles.sectionBody} lang={section.preserveBody ? 'en' : lessonLanguage}>{section.bodyParts ? section.bodyParts.map((part, index) => <span key={index} lang={part.preserve ? 'en' : lessonLanguage}>{index > 0 ? '\n' : ''}{part.text}</span>) : section.body}</p></div></section>)}</div><section id="lesson-practice" className={styles.practicePanel}><span className={styles.sectionKicker}>{t('From understanding to action')}</span><h3>{t('Practice and transfer')}</h3><ol>{lesson.practice.map((step,i) => <li key={i} lang={lessonLanguage}>{step}</li>)}</ol><p className={styles.deliverable} lang={lessonLanguage}><AcademyIcon name="grid" size={19} />{lesson.deliverable}</p></section>{lesson.references.length > 0 && <><h3>{t('Primary references')}</h3><ul>{lesson.references.map(url => <li key={url}><a className={styles.link} href={url} target="_blank" rel="noreferrer">{new URL(url).hostname} <CourseArrow /></a></li>)}</ul></>}<section id="lesson-evidence" className={styles.evidencePanel}><div className={styles.evidenceHeading}><span className={styles.sectionKicker}>{t('Your evidence notebook')}</span><span>{note.trim().length}/6000</span></div><label className={styles.label}>{t('My practice evidence')}<textarea className={styles.field} value={note} onChange={e => setNote(e.target.value)} maxLength={6000} /></label><p className={styles.muted}>{t('Record your result, correction and limitation. Use fictional or redacted information. Text length is a completion check, not a quality score.')}</p><p className={styles.saved} role="status">{savedState}</p><div className={styles.actions}>{button('Save now', () => void mutate({ action: 'save', revision: record.revision, lessonId: lesson.id, text: note }), !dirty, true)}{record.completed[lesson.id] ? <span className={styles.badge}>{t('Lesson check passed')}</span> : button('Open lesson check', () => void assessment({ action: 'begin', revision: record.revision, target: lesson.id }), prerequisiteMissing || dirty || note.trim().length < 80 || Boolean(challenge))}</div><p className={styles.muted}>{t('Minimum to open the check')}: 80 {t('characters')} · {Math.min(note.trim().length, 80)}/80</p></section>{prerequisiteMissing && <p className={styles.notice}>{t('Complete the previous lesson checks before advancing.')}</p>}<div className={styles.lessonActions}>{lessonIndex > 0 && button('Previous lesson', () => select(course.lessons[lessonIndex-1].id), dirty, true)}{record.completed[lesson.id] && button(lessonIndex < course.lessons.length-1 ? 'Continue to next lesson' : 'Practice portfolio', () => select(course.lessons[lessonIndex+1]?.id ?? 'portfolio'), dirty)}</div></article>}
        {selected === 'portfolio' && <section className={styles.card}><span className={styles.sectionKicker}>{t('Your evidence notebook')}</span><h2>{t('Practice portfolio')}</h2>{course.projectBrief && course.language === 'pt-BR' && <p lang="pt-BR">{course.projectBrief}</p>}<p>{t('Combine your work into a decision-ready artifact: describe the situation, the method, the result, a failed assumption, your correction and how you would adapt it to a new case. Include an honest statement of any AI assistance.')}</p><p className={styles.notice}>{t('This portfolio supports practice and reflection. It is not scored by text length or presented as an independently approved professional project.')}</p><label className={styles.label}>{t('My portfolio and transfer reflection')}<textarea className={styles.field} rows={12} maxLength={12000} value={portfolio} onChange={e => setPortfolio(e.target.value)} /></label><p role="status" className={styles.saved}>{savedState}</p><div className={styles.actions}>{button('Save now', () => void mutate({ action: 'portfolio', revision: record.revision, text: portfolio }), !dirty, true)}{button('Go to final assessment', () => select('final'), dirty || !allComplete || portfolio.trim().length < 200)}</div></section>}
        {(selected === 'final' || selected === 'retention') && <section className={styles.card}><h2>{t(selected === 'final' ? 'Final assessment' : 'Spaced review')}</h2><p>{t('At least 80% is required, including every essential question and the fresh numerical case. Answers are scored on the server. There is no answering time limit.')}</p>{(!allComplete || !portfolioReady) && <p className={styles.notice}>{t('Complete all lesson checks and save your portfolio before the final assessment.')}</p>}{record.reviewAvailableAt && <p className={styles.notice}>{t('Spaced review available from:')} <time className={styles.time} dateTime={record.reviewAvailableAt}>{new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(record.reviewAvailableAt))}</time></p>}{selected === 'final' && record.final ? <p className={styles.success}>{t('Final assessment passed')} · {record.final.score}%</p> : selected === 'retention' && record.retention ? <p className={styles.success}>{t('Spaced review passed')} · {record.retention.score}%</p> : button(selected === 'final' ? 'Start final assessment' : 'Start spaced review', () => void assessment({ action: 'begin', revision: record.revision, target: selected }), Boolean(challenge) || !allComplete || record.portfolio.trim().length < 200 || selected === 'retention' && !reviewOpen)}</section>}
        {challenge && <section id="active-assessment" className={`${styles.card} ${styles.assessmentCard}`} aria-label={t('Active assessment')}><span className={styles.sectionKicker}>{t('Knowledge checkpoint')}</span><h2 tabIndex={-1} ref={assessmentHeading}>{t('Your active assessment')}</h2><p className={styles.answerCount} role="status">{Object.keys(answers).length}/{challenge.questions.length} {t('questions answered')}</p><p className={styles.muted}>{t('This attempt is saved to your account. You can return without losing the question set. Answers are submitted together.')}</p>{challenge.questions.map((q,index) => <fieldset key={q.id} className={styles.checkpoint}><legend>{index+1}. {q.translations?.[locale] ?? t(q.prompt)} {q.essential && <span className={styles.badge}>{t('Essential')}</span>}</legend>{q.options.map(option => <label key={option.id} className={styles.option}><input type="radio" name={q.id} value={option.id} checked={answers[q.id] === option.id} onChange={() => setAnswers(previous => ({ ...previous, [q.id]: option.id }))} disabled={busy} /><span>{option.translations?.[locale] ?? option.label}</span></label>)}</fieldset>)}{challenge.calculation && <label className={styles.label}>{challenge.calculation.translations?.[locale] ?? t(challenge.calculation.prompt)}<input className={`${styles.field} ${styles.input}`} type="text" inputMode="decimal" value={calculation} onChange={e => setCalculation(e.target.value)} maxLength={40} /><span className={styles.muted}>{challenge.calculation.unitTranslations?.[locale] ?? t(challenge.calculation.unit)} · {t('Use a dot or comma for decimals; do not include units.')}</span></label>}<div className={styles.actions}>{button('Submit answers', () => void assessment({ action: 'submit', challengeId: challenge.id, answers: Object.entries(answers).map(([questionId,optionId]) => ({ questionId, optionId })), ...(challenge.calculation ? { calculation } : {}) }), dirty || Object.keys(answers).length !== challenge.questions.length || Boolean(challenge.calculation && !calculation.trim()))}</div></section>}
        {result && !challenge && <section className={styles.card}><h2 tabIndex={-1} ref={resultHeading}>{t('Feedback and recovery')}</h2><p className={result.passed ? styles.success : styles.notice}>{result.score}% · {t(result.passed ? 'Passed' : 'Review and try again')}</p>{result.feedback.map(item => <div key={item.questionId} className={styles.feedback}><strong>{t(item.correct ? 'Correct' : 'Needs review')}</strong><p>{item.translations?.[locale] ?? t(item.explanation)}</p>{course.lessons.some(l => l.id === item.lessonId) && !item.correct && button('Review this lesson', () => select(item.lessonId), dirty, true)}</div>)}</section>}
      </div>
      <aside className={styles.supportRail} aria-label={t('Learning tools')}>
        <section className={`${styles.toolCard} ${styles.nextAction}`}>
          <span className={styles.sectionKicker}>{t(record.completedAt ? 'Course completed' : 'Your next step')}</span>
          <h3>{record.completedAt ? t('Your learning record is preserved.') : nextLabel}</h3>
          {record.completedAt ? <Link className={styles.link} href="/certificates">{t('My certificates')} →</Link> : button(challenge ? 'Resume assessment' : 'Go to my next step', continueJourney, dirty)}
          <div className={styles.forecast}><AcademyIcon name="clock" size={17} /><span><strong>{Math.floor(progress.remainingMinutes / 60)}h {progress.remainingMinutes % 60 ? `${progress.remainingMinutes % 60}m` : ''}</strong> {t('estimated work remaining')}</span></div>
          {record.plan && <p className={styles.muted}>{t(goals[record.plan.goal][0])} · {record.plan.weeklyHours}h/{t('week')} · {Math.ceil(progress.remainingMinutes / (record.plan.weeklyHours * 60))} {t('weeks estimated')}</p>}
          <p className={styles.finePrint}>{t('Planning estimate from unfinished steps; not measured study time.')}</p>
        </section>
        <section className={`${styles.toolCard} ${styles.atlasCard}`}>
          <div className={styles.toolHeading}><span className={styles.atlasMark}><AcademyIcon name="spark" /></span><h3>{t('Atlas AI')}</h3></div>
          <p>{t('Explore an example, question an assumption and connect learning to your project.')}</p>
          <Link className={`${styles.button} ${styles.secondary}`} href={`/atlas?guide=learning&course=${course.id}`}>{t('Open Atlas AI')}<AcademyIcon name="arrow" size={16} /></Link>
        </section>
        <AcademyFocusTimer />
        <section className={styles.toolCard}>
          <div className={styles.toolHeading}><AcademyIcon name="shield" /><h3>{t('Path to your certificate')}</h3></div>
          <ul className={styles.requirements}>
            {[[allComplete, 'Lessons and practice'], [portfolioReady, 'Practice portfolio'], [Boolean(record.final), 'Final assessment'], [Boolean(record.retention), 'Spaced review'], [Boolean(status?.emailVerified), 'Verified email']].map(([done, label]) => <li key={String(label)} data-complete={Boolean(done)}><span>{done ? <AcademyIcon name="check" size={14} /> : <span className={styles.pendingDot} />}</span>{t(String(label))}</li>)}
          </ul>
          <p className={styles.finePrint}>{t('The required spaced review opens 24 hours after the final assessment. Waiting time is not counted in the workload.')}</p>
          <Link className={styles.link} href="/workspace">{t('Workspace')} ↗</Link>
        </section>
      </aside>
      </div>
    </>}
  </main>;
}

