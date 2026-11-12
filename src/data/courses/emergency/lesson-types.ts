import type { LabDecision } from '../../../lib/learning/academy/types';

export type EmergencyLesson = {
  title: string;
  concept: string;
  scenario: string;
  exercise: string;
  evidence: string;
  decisions: readonly LabDecision[];
};

export type EmergencyCurriculum = {
  references: string[];
  portfolio: string;
  lessons: EmergencyLesson[];
  assessment: [prompt: string, unit: string, explanation: string];
};

export const firstAid = 'https://cpr.heart.org/en/resuscitation-science/first-aid-guidelines';
export const skillsSessions = 'https://www.redcross.org/take-a-class/skills-sessions';
export const call911 = 'https://www.911.gov/calling-911/';
export const defenseAlerts = 'https://www.gov.br/pt-br/servicos/solicitar-cadastro-para-recebimento-de-avisos-e-alertas-de-desastres';
export const bleeding = 'https://www.redcross.org/take-a-class/first-aid/first-aid-training/first-aid-classes/fast-training';

export function lesson(
  title: string, concept: string, scenario: string, exercise: string,
  evidence: string, ...decisions: LabDecision[]
): EmergencyLesson {
  return { title, concept, scenario, exercise, evidence, decisions };
}
