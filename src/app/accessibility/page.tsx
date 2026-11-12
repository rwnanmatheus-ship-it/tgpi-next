import Link from 'next/link';
import type { Metadata } from 'next';
import AccessibleMedia from '@/components/accessibility/AccessibleMedia';
import LibrasPanel from '@/components/accessibility/LibrasPanel';
import StudyReader from '@/components/accessibility/StudyReader';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import SettingsAccessibility from '@/components/profile/SettingsAccessibility';
import styles from '@/components/accessibility/accessibility-center.module.css';
import { getLocale } from '@/lib/localization/server';
import { studyCopy } from '@/lib/localization/study-accessibility';
import { accessCopy } from '@/lib/localization/accessibility-center';
import { translate } from '@/lib/localization/messages';
import { asynchronousHandover } from '@/lib/learning/accessible-media';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: `${studyCopy(locale, 'center')} | TGPI`,
    description: studyCopy(locale, 'intro'),
    alternates: { canonical: '/accessibility' },
  };
}

export default async function AccessibilityPage() {
  const locale = await getLocale();
  const shortcuts = [
    { href: '#reading', icon: 'book', title: 'read', detail: 'readBody' },
    { href: '#media', icon: 'media', title: 'media', detail: 'mediaBody' },
    { href: '#libras', icon: 'accessibility', title: 'libras', detail: 'librasBody' },
  ] as const;
  return <main className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.shell}>
        <h1>{studyCopy(locale, 'center')}</h1>
        <p>{studyCopy(locale, 'intro')}</p>
        <Link className={styles.contact} href="/courses">{translate(locale, 'All courses')}</Link>
        <nav className={styles.quick} aria-label={accessCopy(locale, 'access')}>
          {shortcuts.map(item => <a href={item.href} key={item.href}>
            <NavigationIcon name={item.icon} />
            <strong>{accessCopy(locale, item.title)}</strong>
            <span>{accessCopy(locale, item.detail)}</span>
          </a>)}
        </nav>
      </div>
    </header>
    <div className={`${styles.shell} ${styles.body}`}>
      <div className={styles.grid}>
        <section id="reading" tabIndex={-1} className={styles.card}>
          <h2>{studyCopy(locale, 'sample')}</h2>
          <p>{studyCopy(locale, 'sampleBody')}</p>
          <StudyReader key={locale} title={studyCopy(locale, 'sample')} language={locale} sections={[
            { title: studyCopy(locale, 'sampleTitle'), passages: [{ text: studyCopy(locale, 'sampleBody') }] },
            { title: translate(locale, 'Practice and transfer'), passages: [{ text: studyCopy(locale, 'samplePractice') }] },
          ]} atlas />
        </section>
        <section className={styles.card}>
          <h2>{studyCopy(locale, 'settings')}</h2>
          <div className={styles.settings}><SettingsAccessibility /></div>
        </section>
      </div>
      <section id="media" tabIndex={-1} className={styles.card}>
        <h2>{accessCopy(locale, 'media')}</h2>
        <AccessibleMedia key={locale} asset={asynchronousHandover} />
      </section>
      <section id="libras" tabIndex={-1} className={styles.card}>
        <h2>{accessCopy(locale, 'libras')}</h2>
        {locale !== 'pt-BR' && <p>{accessCopy(locale, 'librasBody')}</p>}
        <LibrasPanel text={studyCopy('pt-BR', 'sampleBody')} />
      </section>
      <section className={styles.card}>
        <h2>{studyCopy(locale, 'navigation')}</h2>
        <p>{studyCopy(locale, 'keys')}</p>
        <a className={styles.contact} href="mailto:contact@theglobalpolymath.com?subject=TGPI%20Accessibility">{studyCopy(locale, 'report')}</a>
      </section>
    </div>
  </main>;
}
