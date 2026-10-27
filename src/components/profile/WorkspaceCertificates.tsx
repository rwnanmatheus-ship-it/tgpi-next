import Link from 'next/link';
import { isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { listUserLearningCredentials } from '@/lib/learning-records.server';
import styles from './WorkspaceCommandCenter.module.css';
import { LocalizedText } from "@/components/localization/LocaleProvider";

export default async function WorkspaceCertificates({ userId }: { userId: string }) {
  if (!isLearningStorageConfigured()) return <section className={styles.panel}><h2><LocalizedText text="Certificates" /></h2><p>Certificate storage is currently unavailable. This does not mean you have no certificates.</p><Link href="/certificates">Open certificate center ↗</Link></section>;
  const [result] = await Promise.allSettled([listUserLearningCredentials(userId)]);
  if (result.status === 'rejected') return <section className={styles.panel} role="status"><h2>Certificates could not be loaded.</h2><p>Your other workspace modules are available.</p><Link href="/certificates">Retry in certificate center ↗</Link></section>;
  const records = result.value.filter(r => r.status === 'active');
    return <section className={styles.panel} aria-labelledby="workspace-certificates-title"><p className={styles.eyebrow}>Verified milestones</p><h2 id="workspace-certificates-title">{records.length} issued {records.length === 1 ? 'certificate' : 'certificates'}</h2><p>Active records from your private credential portfolio · up to 50 records.</p>{records.slice(0,3).map(r => <p key={r.id}><Link href={`/certificates/${encodeURIComponent(r.id)}`}>{r.courseTitle} ↗</Link></p>)}{!records.length && <p>No active certificates in your portfolio yet. Course completion and certification requirements are separate.</p>}<Link href="/certificates">Open certificate center ↗</Link></section>;
}
