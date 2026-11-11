'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { defaultDisplayPreferences, displayEvent, displayStorageKey, readDisplayPreferences, type DisplayPreferences } from '@/lib/display-preferences';
import styles from './settings.module.css';

const choices = [
  { key: 'reducedMotion', label: 'Reduce interface motion', text: 'Limit decorative CSS animations and transitions across TGPI.' },
  { key: 'largerText', label: 'Larger reading text', text: 'Increase the base text size while keeping responsive layouts.' },
  { key: 'strongerFocus', label: 'Stronger keyboard focus', text: 'Highlight links, buttons and fields when navigating with the keyboard.' },
] as const;

export default function SettingsAccessibility() {
  const { t } = useLocale();
  const [preferences, setPreferences] = useState<DisplayPreferences>(defaultDisplayPreferences);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const sync = () => setPreferences(readDisplayPreferences());
    sync(); window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  function save(next: DisplayPreferences) {
    try {
      localStorage.setItem(displayStorageKey, JSON.stringify(next));
      setPreferences(next);
      window.dispatchEvent(new Event(displayEvent));
      setNotice('Display preferences applied to this browser.');
    } catch { setNotice('Your browser could not save this preference.'); }
  }
  return <div className={styles.stack}>
    <p className={styles.notice}>{t('Applies immediately in this browser. Your operating system’s reduced-motion preference remains respected.')}</p>
    <div className={styles.card}>{choices.map(choice => <label className={styles.toggle} key={choice.key}>
      <span><strong>{t(choice.label)}</strong><small>{t(choice.text)}</small></span>
      <input role="switch" type="checkbox" checked={preferences[choice.key]} onChange={event => save({ ...preferences, [choice.key]: event.target.checked })} />
    </label>)}</div>
    <div className={styles.readingSample}><span className={styles.eyebrow}>{t('Reading preview')}</span><h3>{t('Your experience, at your pace.')}</h3><p>{t('Clear text, visible controls and movement that respects your preferences.')}</p></div>
    <button className={styles.secondary} type="button" onClick={() => save({ ...defaultDisplayPreferences })}>{t('Restore display defaults')}</button>
    <p role="status">{t(notice)}</p>
  </div>;
}
