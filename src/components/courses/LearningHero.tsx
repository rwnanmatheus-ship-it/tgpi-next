'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import styles from './learning-hero.module.css';
export default function LearningHero({ count }: { count: number }) {
  const { t } = useLocale();
  return <header className={styles.hero}><div className={styles.copy}><p className={styles.kicker}>TGPI <span> / {t('Learning')}</span></p><h1>{t('Build skills for a world without borders.')}</h1><p className={styles.intro}>{t('Turn your next ambition into something you can practice, apply and prove.')}</p><div className={styles.actions}><a href="#learning-paths">{t('Explore courses')} <span aria-hidden="true">↓</span></a><Link href="/certificates">{t('My certificates')} <span aria-hidden="true">↗</span></Link></div><dl><div><dt>{count}</dt><dd>{t('Available courses')}</dd></div><div><dt>{t('Practice')}</dt><dd>{t('Real situations')}</dd></div><div><dt>{t('Certificate')}</dt><dd>{t('Clear completion criteria')}</dd></div></dl></div><div className={styles.art}><Image src="/images/courses/learning-2026/learning-global.webp" alt="" fill preload sizes="(max-width: 700px) 100vw, 50vw" /><div className={styles.imageCaption}><span>{t('Learn. Apply. Grow.')}</span><small>{t('Your next capability starts here.')}</small></div></div></header>;
}
