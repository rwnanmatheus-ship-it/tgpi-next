'use client';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import AcademyIcon from './AcademyIcon';
import styles from './academy.module.css';

export default function AcademyFocusTimer() {
  const { t } = useLocale();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const next = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setSeconds(next);
      if (next === 0) setRunning(false);
    };
    const timer = window.setInterval(tick, 1000);
    window.addEventListener('focus', tick);
    document.addEventListener('visibilitychange', tick);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', tick); document.removeEventListener('visibilitychange', tick); };
  }, [running]);
  const reset = (value: number) => { setRunning(false); setMinutes(value); setSeconds(value * 60); };
  return <section className={styles.toolCard} aria-label={t('Focus timer')}>
    <div className={styles.toolHeading}><AcademyIcon name="clock" /><h3>{t('Focus timer')}</h3></div>
    <div className={styles.timerFace} role="timer" aria-live="off">{String(Math.floor(seconds / 60)).padStart(2, '0')}<span>:</span>{String(seconds % 60).padStart(2, '0')}</div>
    <label className={styles.timerSelect}>{t('Session length')}<select value={minutes} onChange={event => reset(Number(event.target.value))}>{[15, 25, 45].map(value => <option key={value} value={value}>{value} {t('min')}</option>)}</select></label>
    <div className={styles.timerActions}><button type="button" disabled={seconds === 0} onClick={() => { if (!running) deadline.current = Date.now() + seconds * 1000; setRunning(value => !value); }}><AcademyIcon name={running ? 'pause' : 'play'} size={15} />{t(running ? 'Pause session' : 'Start session')}</button><button type="button" aria-label={t('Reset timer')} onClick={() => reset(minutes)}><AcademyIcon name="reset" size={17} /></button></div>
    <p className={styles.muted}>{t('A focus aid. This timer does not award course progress.')}</p>
    {seconds === 0 && <p role="status" className={styles.timerDone}>{t('Session complete. Take a short break.')}</p>}
  </section>;
}
