import { localizeMetadata } from "@/lib/localization/metadata.server";
import { isSponsoredAtlas } from '@/lib/atlas/sponsored.server';
import type { Metadata } from 'next';
import { requirePremium, requireUser } from '@/lib/auth/guards';
import AtlasChat from '@/components/atlas/AtlasChat';
import AtlasStudio from '@/components/atlas/AtlasStudio';
import { restoreComparison } from "@/lib/comparison-state";
import { COMPARISON_CATALOG } from "@/lib/comparison-catalog";
import { COMPARISON_GOALS } from "@/lib/tgpi-comparison";
import { isPremiumAcademyCourse } from '@/data/courses/academy/premium-policy';
import { getAcademyCourse } from '@/data/courses/academy/catalog.server';
import { requireAtlasGeneration } from '@/lib/atlas/http.server';

const countrySlugs = new Set<string>(COMPARISON_CATALOG);

const sourceMetadata: Metadata = {
  title: 'Atlas AI | TGPI',
  description: 'Intelligence for your global life.',
  robots: { index: false, follow: false },
};
export default async function AtlasPage({ searchParams }: {
  searchParams: Promise<{ guide?: string | string[]; mode?: string | string[]; course?: string | string[]; support?: string | string[]; country?: string | string[]; goal?: string | string[] }>;
}) {
  const { guide, mode, course, support, country, goal } = await searchParams;
  const learningCourse = guide === 'learning' && typeof course === 'string' ? getAcademyCourse(course) : undefined;
  const comparison = guide === 'compare' && Array.isArray(country)
    ? restoreComparison({ countrySlugs: country, goal }, countrySlugs, COMPARISON_GOALS)
    : null;
  const query = new URLSearchParams();
  if (comparison) {
    query.set('guide', 'compare');
    comparison.countrySlugs.forEach(slug => query.append('country', slug));
    query.set('goal', comparison.goal);
  }
  if (guide === 'learning' || guide === 'evidence') query.set('guide', guide);
  if (learningCourse) query.set('course', learningCourse.id);
  const studySupport = guide === 'learning' && support === 'plain-language';
  if (studySupport) query.set('support', 'plain-language');
  if (mode === 'account') query.set('mode', mode);
  const path = `/atlas${query.size ? `?${query}` : ''}`;
  const { userId } = await (learningCourse && isPremiumAcademyCourse(learningCourse.id) ? requirePremium(path) : requireUser(path));
  let enabled = false;
  try { requireAtlasGeneration(userId); enabled = true; } catch { /* The browser guide remains available. */ }
  const sponsored = isSponsoredAtlas();
  if (mode === 'account') {
    return <AtlasChat key={userId} userId={userId} enabled={enabled && !sponsored} archive />;
  }
  const context = guide === 'learning' ? {
    topic: 'learning' as const,
    ...(learningCourse ? { learningCourse: { id: learningCourse.id, title: learningCourse.title, projectBrief: learningCourse.projectBrief } } : {}),
  } : comparison ? { topic: 'compare' as const, countries: comparison.countrySlugs, goal: comparison.goal }
    : guide === 'evidence' ? { topic: 'intelligence' as const } : undefined;
  return <main>
    <AtlasStudio key={userId} userId={userId} onlineAvailable={enabled && sponsored}
      context={context} studySupport={studySupport} />
  </main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
