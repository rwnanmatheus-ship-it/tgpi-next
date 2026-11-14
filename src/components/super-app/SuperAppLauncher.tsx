'use client';
import Link from 'next/link';
import NavigationLink from "@/components/navigation/NavigationLink";
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLocale , LocalizedText } from '@/components/localization/LocaleProvider';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import { getSuperAppIconName } from '@/lib/navigation-system';
import { normalizeMobileSearch, searchMobileCountries, type MobileCountry } from '@/lib/mobile-experience';
import { containDialogFocus } from '@/lib/dialog-focus';
import { SUPER_APP_MODULES, SUPER_APP_OPEN_EVENT, isSuperAppRouteActive, type SuperAppModuleId } from '@/lib/super-app';
import { InstallGuideButton } from "@/components/app-runtime/TgpiInstallGuide";
import styles from './command.module.css';

const pinnedToolsKey = 'tgpi:launcher-pins:v1';
const pinLabels = {
  en: 'Pin {tool}',
  'pt-BR': 'Fixar {tool}',
  es: 'Fijar {tool}',
  fr: 'Épingler {tool}',
  de: '{tool} anheften',
  it: 'Fissa {tool}',
};

function readPinnedTools(): SuperAppModuleId[] {
  const stored: unknown = JSON.parse(window.localStorage.getItem(pinnedToolsKey) ?? '[]');
  return Array.isArray(stored)
    ? SUPER_APP_MODULES.filter(module => stored.includes(module.id)).map(module => module.id)
    : [];
}

export default function SuperAppLauncher() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [openRoute, setOpenRoute] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState<MobileCountry[]>([]);
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [pinnedTools, setPinnedTools] = useState<SuperAppModuleId[]>([]);
  const pinnedRef = useRef<SuperAppModuleId[]>([]);
  const pinsChangedOnDevice = useRef(false);
  const [retry, setRetry] = useState(0);
  const searchOpen = openRoute === pathname;

  useEffect(() => {
    function openLauncher() {
      try {
        if (!pinsChangedOnDevice.current) pinnedRef.current = readPinnedTools();
      } catch {
        // Keep the current session's pins when storage is unavailable.
      }
      setPinnedTools(pinnedRef.current);
      setQuery('');
      setOpenRoute(pathname);
    }
    function keydown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); openLauncher();
      }
    }
    window.addEventListener(SUPER_APP_OPEN_EVENT, openLauncher);
    window.addEventListener('keydown', keydown);
    return () => { window.removeEventListener(SUPER_APP_OPEN_EVENT, openLauncher); window.removeEventListener('keydown', keydown); };
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !searchOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    searchRef.current?.focus();
    return () => {
      dialog.close();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const controller = new AbortController();
    async function load() {
      setLoadState('loading');
      try {
        const response = await fetch('/api/mobile/countries', { signal: controller.signal });
        if (!response.ok) throw new Error('Country directory unavailable');
        const value: unknown = await response.json();
        if (!Array.isArray(value) || !value.every(item => item && typeof item === 'object' && ['slug','name','capital','region','emoji'].every(key => typeof (item as Record<string, unknown>)[key] === 'string'))) throw new Error('Invalid directory');
        setCountries(value as MobileCountry[]); setLoadState('ready');
      } catch { if (!controller.signal.aborted) setLoadState('error'); }
    }
    void load(); return () => controller.abort();
  }, [searchOpen, retry]);

  const search = normalizeMobileSearch(query);
  const modules = SUPER_APP_MODULES.filter(module => !search || search.split(/\s+/).every(word => normalizeMobileSearch([module.label, module.shortLabel, t(module.label), t(module.shortLabel), t(module.description), ...module.keywords].join(' ')).includes(word)));
  if (!search) {
    modules.sort((a, b) => Number(pinnedTools.includes(b.id)) - Number(pinnedTools.includes(a.id)));
  }
  const countryResults = searchMobileCountries(countries.map(country => ({ ...country, name: t(country.name), region: t(country.region) })), query).slice(0, 6);
  function togglePinnedTool(id: SuperAppModuleId) {
    const current = pinnedRef.current;
    const next = current.includes(id) ? current.filter(tool => tool !== id) : [...current, id];
    pinnedRef.current = next;
    setPinnedTools(next);
    try {
      window.localStorage.setItem(pinnedToolsKey, JSON.stringify(next));
      pinsChangedOnDevice.current = false;
    } catch {
      pinsChangedOnDevice.current = true;
    }
  }

  function close() { setOpenRoute(null); }
  function openInstallGuide() {
    // Close the launcher before the installation dialog takes focus.
    dialogRef.current?.close();
    close();
  }
  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    containDialogFocus(event);
    if (!['ArrowDown','ArrowUp'].includes(event.key) || (event.target !== searchRef.current && !(event.target instanceof HTMLAnchorElement))) return;
    const links = Array.from(dialogRef.current?.querySelectorAll<HTMLAnchorElement>('a[data-command-result]') ?? []);
    if (!links.length) return;
    event.preventDefault();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.key === 'ArrowDown' ? (index + 1) % links.length : index <= 0 ? links.length - 1 : index - 1;
    links[next].focus(); links[next].scrollIntoView({ block:'nearest' });
  }

  return <dialog id="tgpi-super-app-launcher" ref={dialogRef} className={styles.command} data-tgpi-surface="dialog" data-tgpi-material="adaptive" aria-labelledby="tgpi-super-app-title" onKeyDown={onKeyDown} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
    <header className={styles.header}><div><p><LocalizedText text={"TGPI"} /></p><h2 id="tgpi-super-app-title">{t('Find your next move.')}</h2></div><button type="button" aria-label={t('Close search')} onClick={close}><NavigationIcon name="close" /></button></header>
    <label className={styles.search} htmlFor="tgpi-super-app-search"><NavigationIcon name="search" /><span className="sr-only">{t('Search countries, tools or actions')}</span><input id="tgpi-super-app-search" ref={searchRef} type="search" value={query} autoComplete="off" placeholder={t('Country, capital, tool or action…')} onChange={event => setQuery(event.target.value)} /><kbd aria-hidden="true"><LocalizedText text={"Esc"} /></kbd></label>
    <div className={styles.results}>
      <p className={styles.status} role="status">{search ? t('{tools} tools · {countries} countries found', { tools: modules.length, countries: countryResults.length }) : t('Search across the connected TGPI system.')}</p>
      {modules.length > 0 && <nav aria-label={t('Tools')}>
        <h3>{t('Tools')}</h3>
        {modules.map(module => {
          const pinned = pinnedTools.includes(module.id);
          return <div className={styles.toolRow} key={module.id}>
            <NavigationLink data-command-result href={module.href} prefetch={false} aria-current={isSuperAppRouteActive(pathname, module) ? 'page' : undefined} onClick={close}>
              <span className={styles.icon}><NavigationIcon name={getSuperAppIconName(module.id)} /></span>
              <span><strong>{t(module.shortLabel)}</strong><small>{t(module.description)}</small></span>
              <NavigationIcon name="arrow" width={16} height={16} />
            </NavigationLink>
            <button type="button" aria-pressed={pinned} aria-label={pinLabels[locale].replace('{tool}', () => t(module.shortLabel))} className={styles.pin} onClick={() => togglePinnedTool(module.id)}>
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9z" />
              </svg>
            </button>
          </div>;
        })}
      </nav>}
      {countryResults.length > 0 ? <nav aria-label={t('Countries')}><h3>{t('Countries')}</h3>{countryResults.map(country => <Link key={country.slug} data-command-result href={`/countries/${country.slug}`} prefetch={false} onClick={close}><span className={styles.icon} aria-hidden="true">{country.emoji}</span><span><strong>{country.name}</strong><small><LocalizedText text={country.capital} /> · <LocalizedText text={country.region} /></small></span><NavigationIcon name="arrow" width={16} height={16} /></Link>)}</nav> : null}
      {loadState === 'loading' ? <p className={styles.status} role="status">{t('Connecting to TGPI intelligence…')}</p> : null}
      {loadState === 'error' ? <div className={styles.empty}><p>{t('Country intelligence is temporarily unavailable. App search remains active.')}</p><button type="button" onClick={() => setRetry(value => value + 1)}>{t('Reconnect country intelligence')}</button></div> : null}
      {search && loadState === 'ready' && !modules.length && !countryResults.length ? <p className={styles.empty}>{t('No match. Try another term or clear your search.')}</p> : null}
    </div>
    <footer className={styles.footer}><InstallGuideButton className={styles.installButton} onOpen={openInstallGuide} /><span><kbd>↑</kbd> <kbd>↓</kbd> {t('Explore')}</span><span><kbd>↵</kbd> {t('Open')}</span><span><LocalizedText text={"Ctrl / ⌘ K"} /></span></footer>
  </dialog>;
}
