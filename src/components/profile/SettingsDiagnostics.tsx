'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import styles from './settings.module.css';

export default function SettingsDiagnostics({ updatedAt }: { updatedAt?: string }) {
  const { t, locale } = useLocale();
  const [online, setOnline] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ status: 'ok' | 'changed' | 'error'; checkedAt: string } | null>(null);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync(); window.addEventListener('online', sync); window.addEventListener('offline', sync);
    return () => { window.removeEventListener('online', sync); window.removeEventListener('offline', sync); controller.current?.abort(); };
  }, []);
  async function check() {
    if (checking) return;
    const request = new AbortController(); controller.current = request;
    const timeout = setTimeout(() => request.abort(), 12000);
    setChecking(true); setResult(null);
    try {
      const response = await fetch('/api/account-profile', { cache: 'no-store', signal: request.signal });
      const data = await response.json();
      if (!response.ok || !data.profile) throw new Error();
      setResult({ status: data.profile.updatedAt === updatedAt ? 'ok' : 'changed', checkedAt: new Date().toISOString() });
    } catch { setResult({ status: 'error', checkedAt: new Date().toISOString() }); }
    finally { clearTimeout(timeout); setChecking(false); }
  }
  return <div className={styles.stack}>
    <div className={styles.statusGrid}>
      <article className={styles.card}><span className={styles.eyebrow}>{t('Browser connection')}</span><strong>{t(online === null ? 'Checking…' : online ? 'Online' : 'Offline')}</strong><p>{t('The browser signal alone does not confirm that your account can synchronize.')}</p></article>
      <article className={styles.card}><span className={styles.eyebrow}>{t('Last saved profile')}</span><strong>{updatedAt && Number.isFinite(Date.parse(updatedAt)) ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(updatedAt)) : t('Not saved yet')}</strong><p>{t('This timestamp refers to profile settings, not course progress.')}</p></article>
    </div>
    <div className={styles.card}><h3>{t('Check account connection')}</h3><p>{t('Test the signed-in session and compare the saved profile version without changing your data.')}</p><button className={styles.primary} disabled={checking || online === false} type="button" onClick={() => void check()}>{t(checking ? 'Checking…' : 'Run connection check')}</button>
      {result && <div role="status" className={styles.notice}><strong>{t(result.status === 'ok' ? 'Account reachable. Profile version matches.' : result.status === 'changed' ? 'A newer profile version is available. Review it before saving.' : 'Account connection could not be confirmed. Check your connection or sign in again.')}</strong><small>{new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(new Date(result.checkedAt))}</small></div>}
    </div>
  </div>;
}
