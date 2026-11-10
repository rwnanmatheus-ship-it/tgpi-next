import { localizeMetadata } from "@/lib/localization/metadata.server";

import LearningHero from '@/components/courses/LearningHero';
import type { Metadata } from 'next';
import CapabilitySystemRail from '@/components/capability/CapabilitySystemRail';
import LearningPathExplorer from '@/components/courses/LearningPathExplorer';
import { professionalCatalog } from '@/lib/learning/professional-catalog';
import TGPIPageShell from '@/components/TGPIPageShell';
import { coursesOverview } from '@/data/courses-overview';
import { parseCatalogFilters } from '@/lib/learning/catalog-filters';

const sourceMetadata: Metadata = {
  alternates: { canonical: "/courses" },
  title: 'TGPI Learning — Practical Skills for a Global Life',
  description: 'Explore practical learning, resume your courses and understand the assessment and credential requirements for each pathway.',
};

export default async function CoursesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const catalog = [...professionalCatalog(process.env.VERCEL_ENV || process.env.NODE_ENV), ...coursesOverview]
    .sort((a,b) => Number(b.id === 'global-english-2026') - Number(a.id === 'global-english-2026'));
  const raw = await searchParams;
  const params = new URLSearchParams(Object.entries(raw).flatMap(([key,value]) => typeof value === 'string' ? [[key,value]] : []));
  return <TGPIPageShell width="capability">
    <LearningHero count={catalog.filter(course => course.status === 'available').length} />
    <LearningPathExplorer courses={catalog} initialFilters={parseCatalogFilters(params)} />
    <CapabilitySystemRail active="learning" />
  </TGPIPageShell>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
