import { localizeMetadata } from "@/lib/localization/metadata.server";

import { getLocale } from "@/lib/localization/server";
import { catalogVariantNeedsNoindex } from "@/lib/seo/course-directory";
import CourseDiscoveryLinks from "@/components/courses/CourseDiscoveryLinks";
import LearningHero from '@/components/courses/LearningHero';
import type { Metadata } from 'next';
import CapabilitySystemRail from '@/components/capability/CapabilitySystemRail';
import LearningPathExplorer from '@/components/courses/LearningPathExplorer';
import { professionalCatalog } from '@/lib/learning/professional-catalog';
import TGPIPageShell from '@/components/TGPIPageShell';
import { coursesOverview } from '@/data/courses-overview';
import { parseCatalogFilters } from '@/lib/learning/catalog-filters';

const featuredCourses = [
  'global-english-2026',
  'avaliacao-produtos-ia',
  'ingles-escrita-executiva-b2',
  'unit-economics-saas',
  'inferencia-causal-negocios',
  'continuidade-negocios-desastres',
];
const coursePriority = new Map(featuredCourses.map((id, index) => [id, index]));

const sourceMetadata: Metadata = {
  alternates: { canonical: "/courses", types: { "application/rss+xml": "/courses/feed.xml" } },
  title: 'TGPI Learning — Practical Skills for a Global Life',
  description: 'Explore practical learning, resume your courses and understand the assessment and credential requirements for each pathway.',
};

export default async function CoursesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const locale = await getLocale();
  const catalog = [...professionalCatalog(process.env.VERCEL_ENV || process.env.NODE_ENV), ...coursesOverview]
    .sort((a, b) => (coursePriority.get(a.id) ?? featuredCourses.length) - (coursePriority.get(b.id) ?? featuredCourses.length));
  const raw = await searchParams;
  const params = new URLSearchParams(Object.entries(raw).flatMap(([key,value]) => typeof value === 'string' ? [[key,value]] : []));
  return <TGPIPageShell width="capability">
    <LearningHero count={catalog.filter(course => course.status === 'available').length} />
    <LearningPathExplorer key={params.toString()} courses={catalog} initialFilters={parseCatalogFilters(params)} />
    <CourseDiscoveryLinks locale={locale} />
    <CapabilitySystemRail active="learning" />
  </TGPIPageShell>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const variants = catalogVariantNeedsNoindex(await searchParams);
  return localizeMetadata({...sourceMetadata, ...(variants ? {robots:{index:false,follow:true}} : {})});
}
