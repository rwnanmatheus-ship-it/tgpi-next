import 'server-only';
import type { AcademyCourse, AcademyLesson, AcademyPrivateQuestion, CaseSpec } from '@/lib/learning/academy/types';
import { adult } from '../emergency/adult';
import { bleeding } from '../emergency/bleeding';
import { disasters } from '../emergency/disasters';
import { english } from '../emergency/english';
import { pediatric } from '../emergency/pediatric';
import { psychological } from '../emergency/psychological';
import { emergencyCover, emergencyCourses, practicalScope } from '../emergency/catalog';
import type { EmergencyCurriculum } from '../emergency/lesson-types';

const curricula: Record<(typeof emergencyCourses)[number]['id'], EmergencyCurriculum> = {
  'primeiros-socorros-rcp-dea': adult,
  'preparacao-desastres': disasters,
  'ingles-emergencias': english,
  'primeiros-socorros-pediatricos': pediatric,
  'controle-hemorragias': bleeding,
  'primeiros-socorros-psicologicos': psychological,
};

export function emergencyAcademy(version: string) {
  return emergencyCourses.map(entry => {
    const curriculum = curricula[entry.id];
    if (curriculum.lessons.length !== entry.lessons) throw new Error(`Emergency course workload mismatch: ${entry.id}`);
    const minutes = entry.hours * 60;
    const portfolioMinutes = entry.hours >= 15 ? 180 : entry.hours >= 12 ? 150 : 90;
    const assessmentMinutes = entry.hours >= 12 ? 90 : 60;
    const lessonBudget = minutes - portfolioMinutes - assessmentMinutes;
    const questions: AcademyPrivateQuestion[] = [];
    const lessons: AcademyLesson[] = curriculum.lessons.map((source, index) => {
      const id = `${entry.id}-${index + 1}`;
      const lessonMinutes = Math.floor(lessonBudget / entry.lessons) + Number(index < lessonBudget % entry.lessons);
      source.decisions.forEach(([prompt, correct, distractor, alternative, explanation], questionIndex) => {
        questions.push({
          id: `${id}-q${questionIndex + 1}`, lessonId: id, prompt, essential: questionIndex === 0,
          options: [correct, distractor, alternative].map((label, optionIndex) => ({ id: `option-${optionIndex}`, label })),
          correctOptionId: 'option-0', explanation,
        });
      });
      return {
        id, title: source.title, objective: source.evidence, minutes: lessonMinutes,
        foundation: false, project: index === curriculum.lessons.length - 1,
        sections: [
          { title: 'Conceito', body: source.concept },
          { title: 'Caso resolvido', body: source.scenario },
          { title: 'Plano de trabalho', body: `Estudo e consulta à fonte: 15 min. Resolva o cenário e faça o exercício: ${lessonMinutes - 35} min. Compare sua decisão com o caso resolvido, registre uma correção e faça a checagem: 20 min.` },
        ],
        practice: [source.exercise, 'Antes de finalizar, anote a fonte consultada, uma decisão que mudaria em outro contexto e o que você corrigiu após revisar. Use dados fictícios.'],
        deliverable: source.evidence,
        references: curriculum.references,
      };
    });
    const [prompt, unit, explanation] = curriculum.assessment;
    const calculation: CaseSpec = { prompt, unit, explanation, operation: entry.id === 'preparacao-desastres' ? 'percent' : 'sum' };
    const course: AcademyCourse = {
      id: entry.id, version, title: entry.title, description: entry.description, outcomes: [...entry.outcomes],
      lessons, minutes, portfolioMinutes, assessmentMinutes, language: 'pt-BR', image: emergencyCover(entry.id),
      projectBrief: curriculum.portfolio, ...(entry.practicalTraining ? { scopeNotice: practicalScope } : {}),
    };
    return { course, questions, calculation };
  });
}
