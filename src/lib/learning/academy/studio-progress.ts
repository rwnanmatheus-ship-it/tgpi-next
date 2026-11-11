import type { AcademyCourse, AcademyRecord, AcademyStatus } from './types';

/** Only confirmed, current-edition records contribute to the roadmap. */
export function studioProgress(course: AcademyCourse, record?: AcademyRecord | null) {
  const confirmed = record?.courseId === course.id && record.version === course.version ? record : null;
  const completed = course.lessons.filter(lesson => confirmed?.completed[lesson.id]).length;
  const portfolioReady = Boolean(confirmed && confirmed.portfolio.trim().length >= 200);
  const requirements = course.lessons.length + 3;
  const fulfilled = completed + Number(portfolioReady) + Number(Boolean(confirmed?.final)) + Number(Boolean(confirmed?.retention));
  const remainingLessonMinutes = course.lessons.reduce((total, lesson) => total + (confirmed?.completed[lesson.id] ? 0 : lesson.minutes), 0);
  const remainingMinutes = remainingLessonMinutes + (portfolioReady ? 0 : course.portfolioMinutes)
    + (confirmed?.final ? 0 : Math.ceil(course.assessmentMinutes / 2))
    + (confirmed?.retention ? 0 : Math.floor(course.assessmentMinutes / 2));
  return { completed, portfolioReady, requirements, fulfilled, percent: Math.floor(fulfilled / requirements * 100), remainingMinutes };
}

export function nextStudioTarget(course: AcademyCourse, status: AcademyStatus) {
  const record = status.record;
  return status.challenge?.target
    ?? course.lessons.find(lesson => !record?.completed[lesson.id])?.id
    ?? (record?.final ? 'retention' : (record?.portfolio.trim().length ?? 0) >= 200 ? 'final' : 'portfolio');
}

/** Plain text, deliberately excluding identity, internal IDs and assessment answers. */
export function studioNotebook(course: AcademyCourse, record: AcademyRecord, labels: { edition: string; portfolio: string; saved: string }) {
  return [course.title, `${labels.edition}: ${course.version}`, `${labels.saved}: ${record.updatedAt}`, '',
    ...course.lessons.flatMap((lesson, index) => record.notes[lesson.id]?.trim()
      ? [`${String(index + 1).padStart(2, '0')}. ${lesson.title}`, record.notes[lesson.id], ''] : []),
    labels.portfolio, record.portfolio,
  ].join('\n');
}
