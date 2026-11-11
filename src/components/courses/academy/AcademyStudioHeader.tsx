import Image from 'next/image';
import Link from 'next/link';
import type { AcademyCourse, AcademyRecord } from '@/lib/learning/academy/types';
import { studioProgress } from '@/lib/learning/academy/studio-progress';
import AcademyIcon from './AcademyIcon';
import styles from './academy.module.css';

export default function AcademyStudioHeader({ course, record, t, onContinue, disabled }: {
  course: AcademyCourse; record?: AcademyRecord | null; t: (key: string) => string; onContinue: () => void; disabled: boolean;
}) {
  const progress = studioProgress(course, record);
  return <header className={styles.studioHero} data-enrolled={Boolean(record)}>
    <div className={styles.studioBackdrop}><Image src={course.image} fill preload sizes="(max-width: 760px) 100vw, 60vw" alt="" /></div>
    <div className={styles.studioHeroCopy}>
      <p className={styles.eyebrow}><span className={styles.liveDot} />TGPI <span className={styles.eyebrowDivider}>/</span> {t('Learning studio')}</p>
      <h1 className={styles.title}>{course.title}</h1>
      <p className={styles.subtitle}>{t('Learn actively. Keep your evidence. Verify what you can apply.')}</p>
      <div className={styles.heroMetrics}>
        <span><AcademyIcon name="clock" size={16} /><strong>{Math.floor(course.minutes / 60)}h {course.minutes % 60 ? `${course.minutes % 60}m` : ''}</strong>{t('estimated workload')}</span>
        <span><AcademyIcon name="book" size={16} /><strong>{course.lessons.length}</strong>{t('lessons and laboratories')}</span>
        <span><AcademyIcon name="shield" size={16} />{t('Certificate included')}</span>
      </div>
      {record && <div className={styles.actions}>
        {record.credentialId ? <Link className={styles.button} href={`/certificates/${record.credentialId}`}>{t('View and download certificate')}<AcademyIcon name="arrow" size={18} /></Link>
          : <button className={styles.button} type="button" onClick={onContinue} disabled={disabled}>{t('Continue my journey')}<AcademyIcon name="arrow" size={18} /></button>}
        <a className={styles.heroLink} href="#studio-roadmap">{t('Explore my roadmap')}<AcademyIcon name="chevron" size={16} /></a>
      </div>}
    </div>
    <div className={styles.orbitCard}>
      <div className={styles.orbitHeading}><span>{t('Course progress')}</span><AcademyIcon name="grid" size={17} /></div>
      <div className={styles.orbit}>
        <svg viewBox="0 0 160 160" aria-hidden="true"><circle className={styles.orbitTrack} cx="80" cy="80" r="65" /><circle className={styles.orbitFill} cx="80" cy="80" r="65" pathLength="100" strokeDasharray={`${progress.percent} 100`} /></svg>
        <div><strong>{progress.percent}<small>%</small></strong><span>{t('Course progress')}</span></div>
      </div>
      <progress className={styles.srOnly} max={progress.requirements} value={progress.fulfilled} aria-label={t('Course progress')} />
      <p><strong>{progress.completed}/{course.lessons.length}</strong> {t('lesson checks passed')}</p>
      <div className={styles.orbitFooter}><span className={styles.liveDot} />{record ? t('Saved progress') : t('Your next capability')}</div>
    </div>
  </header>;
}
