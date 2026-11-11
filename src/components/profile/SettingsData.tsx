'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import styles from './settings.module.css';

export default function SettingsData() {
  const { t } = useLocale();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  async function download() {
    if (busy) return;
    setBusy(true); setNotice('');
    try {
      const response = await fetch('/api/account-data', { cache: 'no-store', signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'tgpi-account-data.json'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      setNotice('Your private account export is ready.');
    } catch { setNotice('Unable to export account data. Please retry.'); }
    finally { setBusy(false); }
  }
  return <div className={styles.stack}>
    <article className={styles.card}><span className={styles.eyebrow}>{t('Your data, under your control')}</span><h3>{t('Download your saved account data')}</h3><p>{t('Includes your profile, personal plan, member identity and platform progress. Keep this file private. Billing and certificates have their own centers.')}</p><button className={styles.primary} type="button" disabled={busy} onClick={() => void download()}>{t(busy ? 'Preparing export…' : 'Download account JSON')}</button><p role="status">{t(notice)}</p></article>
    <div className={styles.statusGrid}><Link href="/certificates" className={styles.card}><h3>{t('My credentials →')}</h3><p>{t('Issued records and milestones to earn.')}</p></Link><Link href="/privacy" className={styles.card}><h3>{t('Privacy policy')}</h3><p>{t('Review how TGPI handles your information.')}</p></Link></div>
    <p className={styles.notice}>{t('Exports contain saved data. Save pending profile edits before downloading.')}</p>
  </div>;
}
