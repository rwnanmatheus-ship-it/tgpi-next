'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/components/localization/LocaleProvider';
import { catalogCopy } from '@/lib/localization/catalog-copy';
import { courseSalesCopy } from '@/lib/localization/course-sales-copy';
import { TGPI_PREMIUM_PLAN } from '@/lib/subscription-plans';
import styles from './learning-hero.module.css';

export default function LearningHero({ count }: { count: number }) {
  const { locale, t } = useLocale();
  const copy = courseSalesCopy(locale);

  return <header data-tgpi-edition="" className={styles.hero}>
    <div className={styles.copy}>
      <p className={styles.kicker}>{catalogCopy(locale).eyebrow}</p>
      <h1>{copy.title}<em>{copy.emphasis}</em></h1>
      <p className={styles.intro}>{copy.intro}</p>
      <div className={styles.actions}>
        <a href="#learning-paths">{copy.explore}</a>
        <Link href="/courses?access=free_account#learning-paths">{copy.free}</Link>
      </div>
      <ul className={styles.proof}>{copy.proof.map(label => <li key={label}><span aria-hidden="true">✓</span>{label}</li>)}</ul>
    </div>
    <div className={styles.art}>
      <Image src="/images/courses/learning-2026/learning-global.webp" alt="" fill quality={88} preload sizes="(max-width: 700px) 100vw, 40vw" />
      <span className={styles.collection}><strong>{count.toLocaleString(locale)}</strong> {t('Available courses')}</span>
      <div className={styles.offer}>
        <p className={styles.offerLabel}>{TGPI_PREMIUM_PLAN.name}</p>
        <h2>{copy.premiumTitle}</h2>
        <p>{copy.premiumDescription}</p>
        <div className={styles.offerAction}><span className={styles.price}>{TGPI_PREMIUM_PLAN.price}<small>{copy.month}</small></span><Link href="/pricing?next=%2Fcourses">{copy.premium}</Link></div>
        <small className={styles.billing}>{copy.billing}</small>
      </div>
    </div>
  </header>;
}
