import type { AcademyCourse } from '@/lib/learning/academy/types';
import type { Locale } from './config';
import { localizeAuthoredContent } from './authored-content';
import { translate } from './messages';

/** Localizes authored course copy without flattening language-learning boundaries. */
export function localizeAcademyCourse(source: AcademyCourse, locale: Locale): AcademyCourse {
  if (source.language === 'pt-BR') return source;
  const localized = localizeAuthoredContent(source, locale);
  return {
    ...localized,
    description: source.descriptionParts?.map(part => translate(locale, part)).join(' ') ?? localized.description,
    lessons: localized.lessons.map((lesson, index) => ({
      ...lesson,
      sections: source.lessons[index].sections.map(section => ({
        ...section,
        title: section.preserveTitle ? section.title : translate(locale, section.title),
        body: section.bodyParts
          ? section.bodyParts.map(part => part.preserve ? part.text : translate(locale, part.text)).join('\n')
          : section.preserveBody ? section.body : translate(locale, section.body),
      })),
    })),
  };
}

