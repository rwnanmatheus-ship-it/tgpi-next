import 'server-only';

import type { AcademyCourse, AcademyLesson, AcademyPrivateQuestion, CaseSpec } from '@/lib/learning/academy/types';
import { courseArtwork } from '@/lib/cinematic-art';
import { projectLessonsInPortuguese } from '../expansion/curricula.server';
import { practiceLabs } from '../practice/labs.server';
import { practiceWorkload } from '../practice/workload';
import { specializations, type SpecializationId } from './listing';
import type { SpecializationCurriculum } from './authoring';
import { dataCurricula } from './data.server';
import { engineeringCurricula } from './engineering.server';
import { businessCurricula } from './business.server';
import { operationsCurricula } from './operations.server';

const content: Record<SpecializationId, SpecializationCurriculum> = {
  ...dataCurricula, ...engineeringCurricula, ...businessCurricula, ...operationsCurricula,
};

const labMinutes = 120;
const portfolioMinutes = 180;
const assessmentMinutes = 90;

export function specializationAcademy(version: string) {
  return specializations.map(([id, , title, hours, description, prerequisite]) => {
    const item = content[id];
    const minutes = hours * 60;
    const references = [...item.sources];
    const questions: AcademyPrivateQuestion[] = [];
    const lessons: AcademyLesson[] = item.labs.map(([topic, method, example, practice, correct, wrong, tradeoff], index) => {
      const lessonId = `${id}-specialization-${index + 1}`;
      questions.push({
        id: `${lessonId}-check`, lessonId, essential: true, correctOptionId: 'option-0', language: 'pt-BR',
        prompt: `${example} Qual procedimento você adotaria para verificar o resultado ou tomar a próxima decisão?`,
        options: [correct, wrong, tradeoff].map((label, option) => ({ id: `option-${option}`, label })),
        explanation: `${method} Neste caso: ${correct}`,
      });
      return {
        id: lessonId, title: topic, objective: practice, minutes: labMinutes, references, foundation: false, language: 'pt-BR',
        sections: [
          { title: 'Método', body: method },
          { title: 'Caso para resolver', body: example },
          { title: 'Solução comentada', body: correct, workedExample: true },
          { title: 'Roteiro de prática', body: '20 min para estudar o método e resolver o caso. 65 min para elaborar a entrega. 25 min para testar, comparar e revisar. 10 min para registrar a evidência e responder à checagem.' },
        ],
        practice: [practice, 'Varie um insumo ou uma restrição. Antecipe o resultado, execute a verificação novamente e explique o que mudou.'],
        deliverable: `${practice} Inclua insumos, resultado verificável, revisão e limite de aplicação.`,
      };
    });

    // Derive the applicable practice block from the baseline, including the
    // transition from the 150-minute block to the 180-minute block at 25 hours.
    const standardBlock = practiceWorkload(minutes - 180);
    const baselineMinutes = minutes - standardBlock[0] - standardBlock[1];
    const projectMinutes = baselineMinutes - lessons.length * labMinutes - portfolioMinutes - assessmentMinutes;
    const projectBrief = `${item.project} ${item.evidence}`;
    for (const { lesson, question } of projectLessonsInPortuguese(id, projectBrief, projectMinutes, references, item.scenario)) {
      lessons.push({ ...lesson, language: 'pt-BR' });
      questions.push({ ...question, language: 'pt-BR' });
    }
    const baseline: AcademyCourse = {
      id, version, title, description, minutes: baselineMinutes, portfolioMinutes, assessmentMinutes, lessons,
      projectBrief, prerequisite: `Preparação recomendada: ${prerequisite}`, language: 'pt-BR', image: courseArtwork(id), outcomes: item.labs.map(lab => lab[3]),
    };
    const firstLab = item.labs[0];
    const applied = practiceLabs(baseline, [firstLab[2], firstLab[4], item.changedConstraint, item.evidence]);
    const [total, subset] = item.calculation;
    const calculation: CaseSpec = {
      prompt: `Em um caso simulado, foram registrados {a} ${total}. Desse total, {b} ${subset}. Qual percentual isso representa? Arredonde para duas casas decimais.`,
      unit: '%', operation: 'percent',
      explanation: 'Divida o número de ocorrências pelo total e multiplique por 100.',
    };
    return {
      course: { ...baseline, minutes, lessons: [...lessons, ...applied.lessons] },
      questions: [...questions, ...applied.questions], calculation,
    };
  });
}
