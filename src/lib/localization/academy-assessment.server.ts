import 'server-only';
import { academyCase, getAcademyCourse } from '@/data/courses/academy/catalog.server';
import type { AcademyStatus, AcademyTranslations } from '@/lib/learning/academy/types';
import { fullyLocalizedAcademyCourses } from './academy-coverage';
import { locales } from './config';
import { assessmentTranslations } from './assessment.server';

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Matches the persisted, already disclosed case, including attempts created before localization. */
export function academyCaseTranslations(courseId: string, source: string): AcademyTranslations {
  const template = academyCase(courseId).prompt;
  const names = [...template.matchAll(/\{(\w+)\}/g)].map(match => match[1]);
  const pattern = template.split(/\{\w+\}/g).map(escapeRegExp).join('(-?\\d+(?:\\.\\d+)?)');
  const match = new RegExp(`^${pattern}$`).exec(source);
  if (!match) return assessmentTranslations(source);
  const values = Object.fromEntries(names.map((name, index) => [name, match[index + 1]]));
  const translations = assessmentTranslations(template);
  return Object.fromEntries(locales.map(locale => [locale, translations[locale].replace(/\{(\w+)\}/g, (placeholder, name: string) => values[name] ?? placeholder)])) as AcademyTranslations;
}

/** Called after authorization. Only currently disclosed questions/feedback are localized. */
export function withAcademyTranslations(status: AcademyStatus, courseId: string): AcademyStatus {
  const complete = fullyLocalizedAcademyCourses.has(courseId);
  if (getAcademyCourse(courseId)?.language === 'pt-BR' && !complete) return status;
  const languagePractice = ['global-english-2026', 'ingles-carreira-internacional'].includes(courseId);
  return {
    ...status,
    challenge: status.challenge ? {
      ...status.challenge,
      questions: status.challenge.questions.map(question => {
        if (question.language && !complete) return question;
        const { language, ...disclosed } = question;
        return {
          ...disclosed,
          translations: assessmentTranslations(question.prompt),
          options: languagePractice && !language ? question.options : question.options.map(option => ({
            ...option, translations: assessmentTranslations(option.label),
          })),
        };
      }),
      ...(status.challenge.calculation ? { calculation: {
        ...status.challenge.calculation,
        translations: academyCaseTranslations(courseId, status.challenge.calculation.prompt),
        unitTranslations: assessmentTranslations(status.challenge.calculation.unit),
      } } : {}),
    } : null,
    lastResult: status.lastResult ? {
      ...status.lastResult,
      feedback: status.lastResult.feedback.map(item => item.language && !complete ? item : ({
        ...item, language: undefined, translations: assessmentTranslations(item.explanation),
      })),
    } : null,
  };
}

