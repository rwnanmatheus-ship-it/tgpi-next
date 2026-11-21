import { languageProfiles } from './profiles.ts';
import { languageTopics } from './topics.ts';

export const languageWorkload = { lessons:8, lessonMinutes:30, portfolioMinutes:90, assessmentMinutes:30, minutes:360 } as const;
export const languageCatalog = languageProfiles.flatMap(profile => languageTopics.map((topic, index) => ({
  id:`idiomas-${profile.code}-${topic.id}`, targetCode:profile.code, languageName:profile.name,
  title:`${profile.name}: ${topic.title}`, topicId:topic.id, order:index+1, outcome:topic.outcome,
  image:`/images/courses/language-covers-2026/idiomas-${profile.code}-${topic.id}.webp`,
})));
/** Exact lookup prevents unrelated or malformed IDs from resolving as language courses. */
export const languageCourseById = new Map(languageCatalog.map(course => [course.id,course]));
export const targetLanguageOptions = languageProfiles.map(({code,name,native}) => ({code,name,native}));
