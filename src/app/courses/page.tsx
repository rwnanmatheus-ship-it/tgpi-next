import { getLocale } from '@/lib/localization/server';
import { translate } from '@/lib/localization/messages';
import type { Metadata } from 'next';
import CapabilitySystemRail from '@/components/capability/CapabilitySystemRail';
import Image from 'next/image';
import Link from 'next/link';
import LearningPathExplorer from '@/components/courses/LearningPathExplorer';
import { professionalCatalog } from '@/lib/learning/professional-catalog';
import TGPIPageShell from '@/components/TGPIPageShell';
import { coursesOverview } from '@/data/courses-overview';
import { parseCatalogFilters } from '@/lib/learning/catalog-filters';

export const metadata: Metadata = {
  alternates: { canonical: "/courses" },
  title: 'TGPI Learning — Practical Skills for a Global Life',
  description: 'Explore practical learning, resume your courses and understand the assessment and credential requirements for each pathway.',
};

export default async function CoursesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const locale = await getLocale();
  const t = (text: string) => translate(locale, text);
  const catalog = [...professionalCatalog(process.env.VERCEL_ENV || process.env.NODE_ENV), ...coursesOverview]
    .sort((a,b) => Number(b.id === 'global-english-2026') - Number(a.id === 'global-english-2026'));
  const raw = await searchParams;
  const params = new URLSearchParams(Object.entries(raw).flatMap(([key,value]) => typeof value === 'string' ? [[key,value]] : []));
  return <TGPIPageShell width="capability">
    <header className="product-page-heading"><div><p className="product-kicker">TGPI / {t('Learning')}</p><h1>{t('Search your next skill')}</h1><p>{t('Choose a useful outcome. Practice it. Keep the evidence.')}</p></div><nav className="product-page-links" aria-label={t('Learning navigation')}><Link href="/profile">{t('My workspace')} ↗</Link><Link href="/certificates">{t('Certificates')} ↗</Link></nav></header>
    <LearningPathExplorer courses={catalog} initialFilters={parseCatalogFilters(params)} />
    <section className="product-catalog-art" aria-label={t('Put learning to work')}>
      <Image src="/images/learning/tgpi-applied-learning-v3.webp" alt="" fill sizes="(min-width: 1024px) 80vw, 100vw" />
      <div><p>{t('Put learning to work')}</p><h2>{t('One course. One concrete next step.')}</h2></div>
    </section>
    <CapabilitySystemRail active="learning" />
  </TGPIPageShell>;
}
