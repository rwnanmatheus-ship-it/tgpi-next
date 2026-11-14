'use client';

import { useLocale } from '@/components/localization/LocaleProvider';
import { appearanceModes, type AppearanceMode } from '@/lib/appearance';
import { useId } from 'react';
import { useAppearance } from './AppearanceProvider';
import styles from './appearance.module.css';

const modeLabels = { light: 'Light theme', dark: 'Dark theme', system: 'Follow device' } as const;
const modeDescriptions = {
  light: 'Warm paper, deep navy and gold.',
  dark: 'Midnight surfaces with blue and gold accents.',
  system: 'Changes automatically with your device.',
} as const;

export default function AppearanceControl({ variant = 'full' }: { variant?: 'full' | 'quick' | 'compact' }) {
  const { t } = useLocale();
  const { mode, scheme, ready, persisted, changeMode } = useAppearance();
  const id = useId();
  const activeTheme = scheme ? t(modeLabels[scheme]) : '';
  const status = !persisted
    ? t('Theme applied for this visit. Browser storage is unavailable.')
    : activeTheme ? t('Active now: {theme}', { theme: activeTheme }) : '';

  if (variant === 'compact') return (
    <div className={styles.compact}>
      <label htmlFor={id}>{t('Appearance')}</label>
      <select id={id} value={mode} disabled={!ready} onChange={event => changeMode(event.target.value as AppearanceMode)}>
        {appearanceModes.map(option => <option key={option} value={option}>{t(modeLabels[option])}</option>)}
      </select>
      {!persisted && <p role="status">{status}</p>}
    </div>
  );

  const quick = variant === 'quick';

  return (
    <div className={quick ? styles.quick : styles.panel}>
      <fieldset disabled={!ready} aria-describedby={quick ? undefined : id}>
        <legend>{t('Interface theme')}</legend>
        {!quick && <p id={id} className={styles.help}>{t('Applies immediately across TGPI and is saved in this browser.')}</p>}
        <div className={styles.options}>
          {appearanceModes.map(option => (
            <label key={option} className={styles.option}>
              <input type="radio" name={id} value={option} checked={mode === option} onChange={() => changeMode(option)} />
              <span className={styles.optionBody}>
                {!quick && <span className={styles.preview} data-mode={option} aria-hidden="true"><i /><i /><i /></span>}
                <strong>{t(modeLabels[option])}</strong>
                {!quick && <small>{t(modeDescriptions[option])}</small>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className={styles.status} role="status">{status}</p>
    </div>
  );
}
