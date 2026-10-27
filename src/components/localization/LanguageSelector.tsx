'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { localeOptions, type Locale } from '@/lib/localization/config';
import { useLocale } from './LocaleProvider';

export default function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const { locale, pending, error, changeLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = localeOptions.find(option => option.code === locale)!;
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !control.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  function choose(next: Locale) {
    setOpen(false);
    trigger.current?.focus();
    if (next !== locale) void changeLocale(next);
  }
  return <div ref={control} className="tgpi-language-control" onKeyDown={event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
  }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    {!compact && <span id={`${id}-label`} className="tgpi-language-label">{t('Interface language')}</span>}
    <button ref={trigger} id={id} type="button" className="tgpi-language-trigger" aria-label={`${t('Interface language')}: ${selected.name}`}
      aria-expanded={open} aria-controls={`${id}-choices`} aria-describedby={error ? `${id}-error` : undefined}
      aria-busy={pending} disabled={pending} onClick={() => setOpen(value => !value)}>
      <Image src={selected.flag} alt="" aria-hidden="true" width={24} height={16} className="tgpi-language-flag" />
      <span lang={locale}>{compact ? locale === 'pt-BR' ? 'PT' : locale.toUpperCase() : selected.name}</span>
      <span aria-hidden="true" className="tgpi-language-chevron">⌄</span>
    </button>
    {open && <div id={`${id}-choices`} className="tgpi-language-options" role="group" aria-label={t('Interface language')}>
      {localeOptions.map(option => <button key={option.code} type="button" className="tgpi-language-option" lang={option.code}
        aria-pressed={option.code === locale} disabled={pending} onClick={() => choose(option.code)}>
        <Image src={option.flag} alt="" aria-hidden="true" width={24} height={16} className="tgpi-language-flag" />
        <span>{option.name}</span><span className="tgpi-language-check" aria-hidden="true">{option.code === locale ? '✓' : ''}</span>
      </button>)}
    </div>}
    {!compact && <p className="tgpi-language-note">{t('Some content is still displayed in its original language.')}</p>}
    {error && <span role="alert" id={`${id}-error`} className="tgpi-language-error">{t('Unable to save language. Please try again.')}</span>}
    <span role="status" className="sr-only">{pending ? t('Saving…') : ''}</span>
  </div>;
}
