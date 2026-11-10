import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireApiUser } from '@/lib/auth/guards';
import { getProfessionalRecord } from '@/lib/learning/professional-records.server';
import { getProfessionalCourse } from '@/lib/learning/professional-runtime';
import { getLocale } from '@/lib/localization/server';
import { translate } from '@/lib/localization/messages';
import styles from '@/components/courses/academy/academy.module.css';
export const metadata = { title: 'Learning history | TGPI', robots: { index: false, follow: false } };
export default async function CourseHistory({ params }: { params: Promise<{ id: string }> }) {
  const identity = await requireApiUser(), { id } = await params, course = getProfessionalCourse(id);
  if (!course) notFound();
  const record = await getProfessionalRecord(identity.uid, id), locale = await getLocale(), t = (text: string) => translate(locale, text);
  return <main className={styles.page}><Link className={styles.breadcrumb} href={`/courses/${id}/study`}>{t('Continue in the expanded edition')}</Link><h1 className={styles.title}>{t('Previous learning records')}</h1><p className={styles.notice}>{t('This archive preserves your previous work. New learning and automatic certification are available in the expanded edition.')}</p>{record ? <><p>{course.title} · {record.version}</p>{Object.entries(record.activities).map(([lessonId,text]) => <section key={lessonId} className={styles.card}><h2>{course.modules.flatMap(m => m.lessons).find(l => l.id === lessonId)?.title ?? lessonId}</h2><p className={styles.sectionBody}>{text}</p></section>)}{record.draft && <section className={styles.card}><h2>{t('Previous project draft')}</h2><p className={styles.sectionBody}>{record.draft.project}</p><p className={styles.sectionBody}>{record.draft.transfer}</p></section>}{record.credentialId && <Link className={styles.button} href={`/certificates/${record.credentialId}`}>{t('View certificate')}</Link>}</> : <p>{t('No previous record for this course.')}</p>}</main>;
}
