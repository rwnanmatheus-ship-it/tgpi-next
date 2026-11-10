'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import { localizeAcademyCourse } from '@/lib/localization/academy-content';
import type { AcademyCourse, AcademyStatus } from '@/lib/learning/academy/types';
import styles from './academy.module.css';

export default function AcademyStudy({ course }: { course: AcademyCourse }) {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user) return null;
  return <StudySession key={`${user.id}:${course.id}:${course.version}`} course={course} />;
}
function StudySession({ course: original }: { course: AcademyCourse }) {
  const { locale, t } = useLocale();
  const course = useMemo(() => localizeAcademyCourse(original, locale), [original, locale]);
  const [status, setStatus] = useState<AcademyStatus | null>(null), [selected, setSelected] = useState(course.lessons[0].id);
  const [note, setNote] = useState(''), [portfolio, setPortfolio] = useState(''), [diagnostic, setDiagnostic] = useState(''), [consent, setConsent] = useState(false);
  const [answers, setAnswers] = useState<Record<string,string>>({}), [calculation, setCalculation] = useState('');
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [loaded, setLoaded] = useState(false);
  const inFlight = useRef(false), alive = useRef(true), stateRef = useRef(status); stateRef.current = status;
  const endpoint = `/api/learning/academy/${course.id}`;
  const record = status?.record, lesson = course.lessons.find(l => l.id === selected);
  const dirty = Boolean(record && (lesson ? note !== (record.notes[selected] ?? '') : selected === 'portfolio' ? portfolio !== record.portfolio : false));
  const dirtyRef = useRef(dirty); dirtyRef.current = dirty;
  const load = useCallback(async () => {
    setError('');
    try {
      const response = await fetch(endpoint, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to load learning.');
      if (!alive.current) return;
      const next = data as AcademyStatus; setStatus(next);
      const first = next.challenge?.target ?? course.lessons.find(l => !next.record?.completed[l.id])?.id ?? 'portfolio';
      setSelected(first); setNote(next.record?.notes[first] ?? ''); setPortfolio(next.record?.portfolio ?? ''); setLoaded(true);
    } catch (e) { if (alive.current) setError(e instanceof Error ? e.message : 'Unable to load learning.'); }
  }, [endpoint, course.lessons]);
  // The edition is immutable for this mounted session; language changes only affect presentation.
  useEffect(() => { alive.current = true; void load(); return () => { alive.current = false; }; }, [endpoint]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (dirtyRef.current) { event.preventDefault(); event.returnValue = ''; } }; window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn); }, []);
  async function mutate(input: Record<string, unknown>): Promise<boolean> {
    if (inFlight.current) return false;
    inFlight.current = true; setBusy(true); setError('');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...input, version: course.version }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Unable to save learning.');
      if (!alive.current) return false;
      setStatus(data as AcademyStatus);
      if (input.action === 'enrol') { setNote(data.record?.notes[selected] ?? ''); setPortfolio(data.record?.portfolio ?? ''); }
      if (input.action === 'begin' || input.action === 'submit') { setAnswers({}); setCalculation(''); }
      return true;
    } catch (e) { if (alive.current) setError(e instanceof Error ? e.message : 'Unable to save learning.'); return false; }
    finally { inFlight.current = false; if (alive.current) setBusy(false); }
  }
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
  }
  const completed = course.lessons.filter(l => record?.completed[l.id]).length, allComplete = completed === course.lessons.length;
  const challenge = status?.challenge, result = status?.lastResult;
  const reviewOpen = Boolean(record?.reviewAvailableAt && Date.now() >= Date.parse(record.reviewAvailableAt));
  const button = (label: string, onClick: () => void, disabled = false, secondary = false) => <button type="button" className={`${styles.button} ${secondary ? styles.secondary : ''}`} onClick={onClick} disabled={busy || disabled}>{t(label)}</button>;
  return <main className={styles.page} lang={locale}>
    <div className={styles.topline}><Link className={styles.breadcrumb} href={`/courses/${course.id}`}>{t('Course overview')}</Link><Link className={styles.breadcrumb} href="/certificates">{t('My certificates')}</Link></div>
    <p className={styles.eyebrow}>{t('TGPI Learning · Expanded edition')}</p><h1 className={styles.title}>{course.title}</h1>
    <p className={styles.subtitle}>{t('Learn actively. Keep your evidence. Verify what you can apply.')}</p>
    {error && <div role="alert" className={styles.error}>{t(error)}{button('Reload confirmed progress', () => { if (!dirty || window.confirm(t('Your local unsaved draft will be replaced by the last confirmed version. Continue?'))) void load(); }, false, true)}</div>}
    {!loaded && !error && <p role="status">{t('Loading your learning record…')}</p>}
    {loaded && !record && <section className={styles.card}><h2>{t('Set your starting point')}</h2><p>{t('Describe what you already know, one situation you want to handle and one uncertainty. This diagnostic is saved, not graded.')}</p><label className={styles.label}>{t('My starting point')}<textarea className={styles.field} value={diagnostic} onChange={e => setDiagnostic(e.target.value)} minLength={30} maxLength={3000} /></label><label className={styles.check}><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /><span>{t('I agree to automatic certificate issuance after completion using this account name:')} <strong>{status?.publicName}</strong>. {t('The certificate starts private. I understand that open projects and oral fluency are not independently graded.')}</span></label><p className={styles.muted}>{t('The required spaced review opens 24 hours after the final assessment. Waiting time is not counted in the workload.')}</p>{button('Start this edition', () => void mutate({ action: 'enrol', diagnostic, nameConsent: true }), !consent || diagnostic.trim().length < 30)}</section>}
    {record && <>
      <div className={styles.topline}><span className={styles.badge}>{completed}/{course.lessons.length} {t('lesson checks passed')}</span><span className={styles.muted}>{t('Edition')} {course.version}</span></div><progress className={styles.progress} max={course.lessons.length + 2} value={completed + Number(Boolean(record.final)) + Number(Boolean(record.retention))} aria-label={t('Course progress')} />
      {record.legacy && <p className={styles.notice}>{t('Previous learning is preserved. Imported notes are available; this edition has new assessment requirements.')} {course.legacyHref && <Link className={styles.link} href={course.legacyHref}>{t('Open previous learning records')}</Link>}</p>}
      {record.credentialId && <section className={styles.success}><h2>{t('Your certificate is ready')}</h2><p>{t('You completed all required checks, the final assessment and the spaced review.')}</p><div className={styles.actions}><Link className={styles.button} href={`/certificates/${record.credentialId}`}>{t('View and download certificate')}</Link>{button(record.sharing ? 'Make certificate private' : 'Enable public verification', () => void mutate({ action: 'sharing', sharing: !record.sharing }), false, true)}</div><p className={styles.muted}>{record.sharing ? t('Anyone with the verification link can view the shared certificate name and results.') : t('The certificate is private. Public verification becomes available only when you enable sharing.')}</p></section>}
      <div className={styles.study}><nav className={styles.nav} aria-label={t('Course sections')}>{course.lessons.map((l,i) => <button key={l.id} type="button" className={styles.navButton} aria-current={selected === l.id ? 'step' : undefined} onClick={() => select(l.id)} disabled={busy}>{record.completed[l.id] ? '✓' : String(i + 1).padStart(2, '0')} · {l.title}</button>)}{['portfolio','final','retention'].map(id => <button key={id} type="button" className={styles.navButton} aria-current={selected === id ? 'step' : undefined} onClick={() => select(id)} disabled={busy}>{t(id === 'portfolio' ? 'Practice portfolio' : id === 'final' ? 'Final assessment' : 'Spaced review')}</button>)}</nav>
      <div>
        {lesson && <article className={styles.card}><span className={styles.badge}>{lesson.minutes} {t("min ·")} {lesson.foundation ? t('Foundation') : t('Advanced laboratory')}</span><h2 className={styles.title}>{lesson.title}</h2><p>{lesson.objective}</p>{lesson.sections.map((section,i) => <section key={i}><h3>{section.title}</h3><p className={styles.sectionBody}>{section.body}</p></section>)}<h3>{t('Practice and transfer')}</h3><ol>{lesson.practice.map((step,i) => <li key={i}>{step}</li>)}</ol><p className={styles.notice}>{lesson.deliverable}</p>{lesson.references.length > 0 && <><h3>{t('Primary references')}</h3><ul>{lesson.references.map(url => <li key={url}><a className={styles.link} href={url} target="_blank" rel="noreferrer">{new URL(url).hostname} ↗</a></li>)}</ul></>}<label className={styles.label}>{t('My practice evidence')}<textarea className={styles.field} value={note} onChange={e => setNote(e.target.value)} maxLength={6000} /></label><p className={styles.muted}>{t('Record your result, correction and limitation. Use fictional or redacted information. Text length is a completion check, not a quality score.')}</p><p className={styles.saved} role="status">{busy ? t('Saving or checking…') : dirty ? t('Unsaved changes') : t('Confirmed on the server')}</p><div className={styles.actions}>{button('Save now', () => void mutate({ action: 'save', revision: record.revision, lessonId: lesson.id, text: note }), !dirty, true)}{record.completed[lesson.id] ? <span className={styles.badge}>{t('Lesson check passed')}</span> : button('Open lesson check', () => void mutate({ action: 'begin', revision: record.revision, target: lesson.id }), dirty || note.trim().length < 80 || Boolean(challenge))}</div>{record.completed[lesson.id] && course.lessons[course.lessons.findIndex(l => l.id === lesson.id)+1] && button('Continue to next lesson', () => select(course.lessons[course.lessons.findIndex(l => l.id === lesson.id)+1].id), dirty)}</article>}
        {selected === 'portfolio' && <section className={styles.card}><h2>{t('Practice portfolio')}</h2><p>{t('Combine your work into a decision-ready artifact: describe the situation, the method, the result, a failed assumption, your correction and how you would adapt it to a new case. Include an honest statement of any AI assistance.')}</p><p className={styles.notice}>{t('This portfolio supports practice and reflection. It is not scored by text length or presented as an independently approved professional project.')}</p><label className={styles.label}>{t('My portfolio and transfer reflection')}<textarea className={styles.field} rows={12} maxLength={12000} value={portfolio} onChange={e => setPortfolio(e.target.value)} /></label><p role="status" className={styles.saved}>{busy ? t('Saving or checking…') : dirty ? t('Unsaved changes') : t('Confirmed on the server')}</p><div className={styles.actions}>{button('Save now', () => void mutate({ action: 'portfolio', revision: record.revision, text: portfolio }), !dirty, true)}{button('Go to final assessment', () => select('final'), dirty || !allComplete || portfolio.trim().length < 200)}</div></section>}
        {(selected === 'final' || selected === 'retention') && <section className={styles.card}><h2>{t(selected === 'final' ? 'Final assessment' : 'Spaced review')}</h2><p>{t('At least 80% is required, including every essential question and the fresh numerical case. Answers are scored on the server. There is no answering time limit.')}</p>{!allComplete && <p className={styles.notice}>{t('Complete all lesson checks and save your portfolio before the final assessment.')}</p>}{record.reviewAvailableAt && <p className={styles.notice}>{t('Spaced review available from:')} <time className={styles.time} dateTime={record.reviewAvailableAt}>{new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(record.reviewAvailableAt))}</time></p>}{selected === 'final' && record.final ? <p className={styles.success}>{t('Final assessment passed')} · {record.final.score}%</p> : selected === 'retention' && record.retention ? <p className={styles.success}>{t('Spaced review passed')} · {record.retention.score}%</p> : button(selected === 'final' ? 'Start final assessment' : 'Start spaced review', () => void mutate({ action: 'begin', revision: record.revision, target: selected }), Boolean(challenge) || !allComplete || record.portfolio.trim().length < 200 || selected === 'retention' && !reviewOpen)}{record.completedAt && !record.credentialId && <div className={styles.notice}><p>{t('Completion is saved. Verify your email if needed, then retry secure automatic issuance.')}</p>{button('Retry certificate issuance', () => void mutate({ action: 'issue' }))}</div>}</section>}
        {challenge && <section className={styles.card} aria-label={t('Active assessment')}><h2>{t('Your active assessment')}</h2><p className={styles.muted}>{t('This attempt is saved to your account. You can return without losing the question set. Answers are submitted together.')}</p>{challenge.questions.map((q,index) => <fieldset key={q.id} className={styles.checkpoint}><legend>{index+1}. {q.translations?.[locale] ?? t(q.prompt)} {q.essential && <span className={styles.badge}>{t('Essential')}</span>}</legend>{q.options.map(option => <label key={option.id} className={styles.option}><input type="radio" name={q.id} value={option.id} checked={answers[q.id] === option.id} onChange={() => setAnswers(previous => ({ ...previous, [q.id]: option.id }))} disabled={busy} /><span>{option.translations?.[locale] ?? option.label}</span></label>)}</fieldset>)}{challenge.calculation && <label className={styles.label}>{challenge.calculation.translations?.[locale] ?? t(challenge.calculation.prompt)}<input className={`${styles.field} ${styles.input}`} type="text" inputMode="decimal" value={calculation} onChange={e => setCalculation(e.target.value)} maxLength={40} /><span className={styles.muted}>{challenge.calculation.unitTranslations?.[locale] ?? t(challenge.calculation.unit)} · {t('Use a dot or comma for decimals; do not include units.')}</span></label>}<div className={styles.actions}>{button('Submit answers', () => void mutate({ action: 'submit', challengeId: challenge.id, answers: Object.entries(answers).map(([questionId,optionId]) => ({ questionId, optionId })), ...(challenge.calculation ? { calculation } : {}) }), dirty || Object.keys(answers).length !== challenge.questions.length || Boolean(challenge.calculation && !calculation.trim()))}</div></section>}
        {result && !challenge && <section className={styles.card}><h2>{t('Feedback and recovery')}</h2><p className={result.passed ? styles.success : styles.notice}>{result.score}% · {t(result.passed ? 'Passed' : 'Review and try again')}</p>{result.feedback.map(item => <div key={item.questionId} className={styles.feedback}><strong>{t(item.correct ? 'Correct' : 'Needs review')}</strong><p>{item.translations?.[locale] ?? t(item.explanation)}</p>{course.lessons.some(l => l.id === item.lessonId) && !item.correct && button('Review this lesson', () => select(item.lessonId), dirty, true)}</div>)}</section>}
      </div></div>
    </>}
  </main>;
}
