import type { AcademyCourse } from '@/lib/learning/academy/types';
import type { Locale } from './config';
import { fullyLocalizedAcademyCourses } from './academy-coverage';
import { translate } from './messages';

/** Localizes authored course copy while preserving its structure and language exercises. */
export function localizeAcademyCourse(source: AcademyCourse, locale: Locale): AcademyCourse {
  const complete = fullyLocalizedAcademyCourses.has(source.id);
  if (source.language === 'pt-BR' && !complete) return source;
  const t = (text: string) => translate(locale, text);
  return {
    ...source,
    title: t(source.title),
    description: source.descriptionParts?.map(t).join(' ') ?? t(source.description),
    outcomes: source.outcomes.map(t),
    projectBrief: source.projectBrief && t(source.projectBrief),
    prerequisite: source.prerequisite && t(source.prerequisite),
    scopeNotice: source.scopeNotice && t(source.scopeNotice),
    lessons: source.lessons.map(lesson => {
      if (lesson.language && !complete) return lesson;
      return {
        ...lesson,
        title: t(lesson.title),
        objective: t(lesson.objective),
        practice: lesson.practice.map(t),
        deliverable: t(lesson.deliverable),
        language: complete ? locale : lesson.language,
        sections: lesson.sections.map(section => {
          const bodyParts = section.bodyParts?.map(part => part.preserve ? part : { ...part, text: t(part.text) });
          return {
            ...section,
            title: section.preserveTitle ? section.title : t(section.title),
            bodyParts,
            body: bodyParts ? bodyParts.map(part => part.text).join('\n')
              : section.preserveBody ? section.body : t(section.body),
          };
        }),
      };
    }),
  };
}
