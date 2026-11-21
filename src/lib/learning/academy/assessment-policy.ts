import type { AcademyCourse } from './types';

/** One policy drives challenge generation, advertised criteria and signed evidence. */
export function academyAssessmentRequirements(course: Pick<AcademyCourse, 'targetLanguage'>) {
  return course.targetLanguage ? {
    requiresCalculation: false,
    journey: 'Pass the objective language-comprehension checks.',
    minimum: 'Pass the final assessment with at least 80% and all essential language checks correct.',
    explanation: 'At least 80% is required, including every essential language question. Answers are scored on the server. There is no answering time limit.',
    evidence: 'Final assessment and spaced review: at least 80%, including all essential language-comprehension checks.',
  } : {
    requiresCalculation: true,
    journey: 'Pass the objective checks and a numerical case.',
    minimum: 'Pass the final assessment with at least 80%, all essential checks and the numerical case correct.',
    explanation: 'At least 80% is required, including every essential question and the fresh numerical case. Answers are scored on the server. There is no answering time limit.',
    evidence: 'Final assessment and spaced review: at least 80%, including all essential checks and a fresh numerical case.',
  };
}
