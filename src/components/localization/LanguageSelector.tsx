'use client';

import { useId } from 'react';
import { localeOptions, isLocale } from '@/lib/localization/config';
import { useLocale } from './LocaleProvider';

export default function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const { locale, pending, error, changeLocale, t } = useLocale();
  return <div className="tgpi-language-control">
    <label htmlFor={id} className={compact ? 'sr-only' : 'tgpi-language-label'}>{t('Interface language')}</label>
    <select id={id} className="tgpi-language-select" aria-describedby={error ? `${id}-error` : undefined} aria-busy={pending} disabled={pending} value={locale}
      onChange={event => { if (isLocale(event.target.value)) void changeLocale(event.target.value); }}>
      {localeOptions.map(option => <option key={option.code} value={option.code} lang={option.code}>{compact ? option.code === 'pt-BR' ? 'PT' : option.code.toUpperCase() : option.name}</option>)}
    </select>
    {!compact && <p className="tgpi-language-note">{t("Some content is still displayed in its original language.")}</p>}
    {error && <span role="alert" id={`${id}-error`} className="tgpi-language-error">{t('Unable to save language. Please try again.')}</span>}
    <span role="status" className="sr-only">{pending ? t('Saving…') : ''}</span>
  </div>;
}
