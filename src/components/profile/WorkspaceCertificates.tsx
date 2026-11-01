import { getLocale } from '@/lib/localization/server';
import { translate } from '@/lib/localization/messages';
import Link from 'next/link';
import { isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { listUserLearningCredentials } from '@/lib/learning-records.server';
import styles from './WorkspaceCommandCenter.module.css';
import { LocalizedText } from "@/components/localization/LocaleProvider";

export default async function WorkspaceCertificates({ userId }: { userId: string }) {
  const locale = await getLocale();
  const t = (key: string, values?: Record<string, string | number>) => translate(locale, key, values);
  if (!isLearningStorageConfigured()) return <section className={styles.panel}><h2><LocalizedText text="Certificates" /></h2><p><LocalizedText text="Certificate storage is currently unavailable. This does not mean you have no certificates." /></p><Link href="/certificates"><LocalizedText text="Open certificate center ↗" /></Link></section>;
  const [result] = await Promise.allSettled([listUserLearningCredentials(userId)]);
  if (result.status === 'rejected') return <section className={styles.panel} role="status"><h2><LocalizedText text="Certificates could not be loaded." /></h2><p><LocalizedText text="Your other workspace modules are available." /></p><Link href="/certificates"><LocalizedText text="Retry in certificate center ↗" /></Link></section>;
  const records = result.value.filter(r => r.status === 'active');
    return <section className={styles.panel} aria-labelledby="workspace-certificates-title"><p className={styles.eyebrow}><LocalizedText text="Verified milestones" /></p><h2 id="workspace-certificates-title">{t(records.length === 1 ? "{count} issued certificate" : "{count} issued certificates", { count: records.length })}</h2><p><LocalizedText text="Active records from your private credential portfolio · up to 50 records." /></p>{records.slice(0,3).map(r => <p key={r.id}><Link href={`/certificates/${encodeURIComponent(r.id)}`}>{r.courseTitle} ↗</Link></p>)}{!records.length && <p><LocalizedText text="No active certificates in your portfolio yet. Course completion and certification requirements are separate." /></p>}<Link href="/certificates"><LocalizedText text="Open certificate center ↗" /></Link></section>;
}
