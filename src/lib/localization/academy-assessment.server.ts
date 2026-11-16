import 'server-only';
import { academyCase, getAcademyCourse } from '@/data/courses/academy/catalog.server';
import type { AcademyStatus, AcademyTranslations } from '@/lib/learning/academy/types';
import { fullyLocalizedAcademyCourses, academyAnswerLanguage } from './academy-coverage';
import { locales } from './config';
import { assessmentTranslations } from './assessment.server';
import curriculumEntries from './academy-curriculum-assessment.json';

const curriculumCatalog: Readonly<Record<string, AcademyTranslations>> = curriculumEntries;
function academyAssessmentTranslations(source: string): AcademyTranslations {
  const key = source.replace(/\s+/g, ' ').trim();
  return Object.hasOwn(curriculumCatalog, key) ? curriculumCatalog[key] : assessmentTranslations(source);
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Matches the persisted, already disclosed case, including attempts created before localization. */
export function academyCaseTranslations(courseId: string, source: string): AcademyTranslations {
  const template = academyCase(courseId).prompt;
  const names = [...template.matchAll(/\{(\w+)\}/g)].map(match => match[1]);
  const pattern = template.split(/\{\w+\}/g).map(escapeRegExp).join('(-?\\d+(?:\\.\\d+)?)');
  const match = new RegExp(`^${pattern}$`).exec(source);
  if (!match) return academyAssessmentTranslations(source);
  const values = Object.fromEntries(names.map((name, index) => [name, match[index + 1]]));
  const translations = academyAssessmentTranslations(template);
  return Object.fromEntries(locales.map(locale => [locale, translations[locale].replace(/\{(\w+)\}/g, (placeholder, name: string) => values[name] ?? placeholder)])) as AcademyTranslations;
}

/** Called after authorization. Only currently disclosed questions/feedback are localized. */
export function withAcademyTranslations(status: AcademyStatus, courseId: string): AcademyStatus {
  const complete = fullyLocalizedAcademyCourses.has(courseId);
  if (getAcademyCourse(courseId)?.language === 'pt-BR' && !complete) return status;
  return {
    ...status,
    challenge: status.challenge ? {
      ...status.challenge,
      questions: status.challenge.questions.map(question => {
        if (question.language && !complete) return question;
        const { language, ...disclosed } = question;
        const answerLanguage = academyAnswerLanguage(courseId, question.lessonId, language);
        return {
          ...disclosed,
          translations: academyAssessmentTranslations(question.prompt),
          options: answerLanguage
            ? question.options.map(option => ({ ...option, language: answerLanguage }))
            : question.options.map(option => ({
              ...option, translations: academyAssessmentTranslations(option.label),
            })),
        };
      }),
      ...(status.challenge.calculation ? { calculation: {
        ...status.challenge.calculation,
        translations: academyCaseTranslations(courseId, status.challenge.calculation.prompt),
        unitTranslations: academyAssessmentTranslations(status.challenge.calculation.unit),
      } } : {}),
    } : null,
    lastResult: status.lastResult ? {
      ...status.lastResult,
      feedback: status.lastResult.feedback.map(item => item.language && !complete ? item : ({
        ...item, language: undefined, translations: academyAssessmentTranslations(item.explanation),
      })),
    } : null,
  };
}

