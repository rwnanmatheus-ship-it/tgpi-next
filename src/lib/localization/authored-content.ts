import type { Locale } from './config';
import { translate } from './messages';

const identityFields = new Set(['id', 'slug', 'version', 'issuer', 'url', 'href', 'src', 'image', 'imageSrc', 'code', 'sampleCode', 'formula', 'currencyCode', 'correctOptionId', 'competencyIds', 'buildsOn', 'nextCourseId', 'courseId', 'lessonId', 'audio', 'audioSrc', 'type', 'status', 'level', 'state']);

/** Only use for versioned TGPI-authored content. Never pass a user profile or submission. */
export function localizeAuthoredContent<T>(content: T, locale: Locale, options: { languagePractice?: boolean } = {}): T {
  function visit(value: unknown, field = '', path: string[] = []): unknown {
    if (identityFields.has(field)) return value;
    if (options.languagePractice && (['phrase', 'example', 'line', 'avoid', 'useInstead', 'speaker'].includes(field) || field === 'label' && path.includes('options'))) return value;
    if (typeof value === 'string') return translate(locale, value);
    if (Array.isArray(value)) return value.map(item => visit(item, field, path));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, visit(item, key, [...path, key])]));
    return value;
  }
  return visit(content) as T;
}
