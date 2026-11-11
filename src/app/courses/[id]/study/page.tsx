import { localizeMetadata } from '@/lib/localization/metadata.server';
import { notFound, redirect } from 'next/navigation';
import AcademyStudy from '@/components/courses/academy/AcademyStudy';
import { getAcademyCourse, PREVIOUS_ACADEMY_VERSION } from '@/data/courses/academy/catalog.server';
import { academyStudyCourse } from '@/lib/learning/academy/service.server';
import { requireUser } from '@/lib/auth/guards';

const sourceMetadata = { title: 'Meu percurso profissional | TGPI', robots: { index: false, follow: false } };

export default async function AcademyStudyPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edition?: string; lesson?: string }>;
}) {
  const [{ id }, { edition, lesson }] = await Promise.all([params, searchParams]);
  const latest = getAcademyCourse(id);
  if (!latest) notFound();

  const query = new URLSearchParams();
  if (edition === 'current' || edition === 'previous') query.set('edition', edition);
  if (latest.lessons.some(item => item.id === lesson) && lesson) query.set('lesson', lesson);
  const path = `/courses/${latest.id}/study${query.size ? `?${query}` : ''}`;
  if (id !== latest.id) redirect(path);
  const { userId } = await requireUser(path);

  const course = await academyStudyCourse(userId, latest, edition === 'current', edition === 'previous' ? PREVIOUS_ACADEMY_VERSION : undefined);
  return <AcademyStudy course={course} initialLesson={query.get('lesson') ?? undefined} />;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
