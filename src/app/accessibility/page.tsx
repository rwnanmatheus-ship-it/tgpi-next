import Link from 'next/link';
import type { Metadata } from 'next';
import StudyReader from '@/components/accessibility/StudyReader';
import styles from '@/components/accessibility/study-reader.module.css';
import SettingsAccessibility from '@/components/profile/SettingsAccessibility';
import { getLocale } from '@/lib/localization/server';
import { studyCopy } from '@/lib/localization/study-accessibility';
import { translate } from '@/lib/localization/messages';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: `${studyCopy(locale, 'center')} | TGPI`, description: studyCopy(locale, 'intro') };
}

export default async function AccessibilityPage() {
  const locale = await getLocale();
  return <main className={styles.page}>
    <h1>{studyCopy(locale, 'center')}</h1>
    <p>{studyCopy(locale, 'intro')}</p>
    <Link className={styles.link} href="/courses">{translate(locale, 'All courses')}</Link>
    <section>
      <h2>{studyCopy(locale, 'sample')}</h2>
      <p>{studyCopy(locale, 'sampleBody')}</p>
      <StudyReader key={locale} title={studyCopy(locale, 'sample')} language={locale} sections={[
        { title: studyCopy(locale, 'sampleTitle'), passages: [{ text: studyCopy(locale, 'sampleBody') }] },
        { title: translate(locale, 'Practice and transfer'), passages: [{ text: studyCopy(locale, 'samplePractice') }] },
      ]} atlas />
    </section>
    <section>
      <h2>{studyCopy(locale, 'settings')}</h2>
      <SettingsAccessibility />
    </section>
    <section>
      <h2>{studyCopy(locale, 'navigation')}</h2>
      <p>{studyCopy(locale, 'keys')}</p>
      <a className={styles.link} href="mailto:contact@theglobalpolymath.com?subject=TGPI%20Accessibility">{studyCopy(locale, 'report')}</a>
    </section>
  </main>;
}
