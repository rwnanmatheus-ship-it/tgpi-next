import { localizeMetadata } from "@/lib/localization/metadata.server";
import { isSponsoredAtlas } from '@/lib/atlas/sponsored.server';
import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth/guards';
import AtlasChat from '@/components/atlas/AtlasChat';
import AtlasStudio from '@/components/atlas/AtlasStudio';
import { getAcademyCourse } from '@/data/courses/academy/catalog.server';
import { requireAtlasGeneration } from '@/lib/atlas/http.server';

const sourceMetadata: Metadata = {
  title: 'Atlas AI | TGPI',
  description: 'Intelligence for your global life.',
  robots: { index: false, follow: false },
};
export default async function AtlasPage({ searchParams }: {
  searchParams: Promise<{ guide?: string | string[]; mode?: string | string[]; course?: string | string[] }>;
}) {
  const { guide, mode, course } = await searchParams;
  const learningCourse = guide === 'learning' && typeof course === 'string' ? getAcademyCourse(course) : undefined;
  const query = new URLSearchParams();
  if (guide === 'learning' || guide === 'evidence') query.set('guide', guide);
  if (learningCourse) query.set('course', learningCourse.id);
  if (mode === 'account') query.set('mode', mode);
  const { userId } = await requireUser(`/atlas${query.size ? `?${query}` : ''}`);
  let enabled = false;
  try { requireAtlasGeneration(userId); enabled = true; } catch { /* The browser guide remains available. */ }
  const sponsored = isSponsoredAtlas();
  if (mode === 'account') {
    return <AtlasChat key={userId} userId={userId} enabled={enabled && !sponsored} archive />;
  }
  const context = guide === 'learning' ? {
    topic: 'learning' as const,
    ...(learningCourse ? { learningCourse: { id: learningCourse.id, title: learningCourse.title, projectBrief: learningCourse.projectBrief } } : {}),
  } : guide === 'evidence' ? { topic: 'intelligence' as const } : undefined;
  return <main>
    <AtlasStudio key={userId} userId={userId} onlineAvailable={enabled && sponsored}
      context={context} />
  </main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
