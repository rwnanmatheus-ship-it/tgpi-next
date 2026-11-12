import { academyProjects } from './projects.ts';
import { projectStageCount } from './project-stages.ts';
import { emergencyCourses } from '../emergency/catalog.ts';

/** Workload of the previous edition, verified against the published curriculum. */
export const previousAcademyManifest: Record<string, { minutes: number; lessons: number }> = {
  "country-fit": {
    "minutes": 390,
    "lessons": 6
  },
  "relocation-budget": {
    "minutes": 390,
    "lessons": 6
  },
  "arrival-playbook": {
    "minutes": 375,
    "lessons": 6
  },
  "housing-abroad": {
    "minutes": 375,
    "lessons": 6
  },
  "cross-cultural-confidence": {
    "minutes": 375,
    "lessons": 6
  },
  "cost-of-living-lab": {
    "minutes": 375,
    "lessons": 6
  },
  "study-abroad-planning": {
    "minutes": 375,
    "lessons": 6
  },
  "international-career": {
    "minutes": 390,
    "lessons": 6
  },
  "career-networking": {
    "minutes": 375,
    "lessons": 6
  },
  "remote-work-systems": {
    "minutes": 375,
    "lessons": 6
  },
  "carreira-internacional-profissional": {
    "minutes": 690,
    "lessons": 11
  },
  "gestao-projetos-equipes-globais": {
    "minutes": 690,
    "lessons": 11
  },
  "marketing-mercados-internacionais": {
    "minutes": 690,
    "lessons": 11
  },
  "comunicacao-negociacao-pensamento-critico": {
    "minutes": 690,
    "lessons": 11
  },
  "digital-safety-abroad": {
    "minutes": 375,
    "lessons": 6
  },
  "evidence-literacy": {
    "minutes": 375,
    "lessons": 6
  },
  "ai-workflow-foundations": {
    "minutes": 375,
    "lessons": 6
  },
  "ia-trabalho-global": {
    "minutes": 690,
    "lessons": 11
  },
  "planilhas-decisoes-profissionais": {
    "minutes": 690,
    "lessons": 11
  },
  "analise-dados-power-bi-ia": {
    "minutes": 690,
    "lessons": 11
  },
  "ciberseguranca-vida-trabalho": {
    "minutes": 690,
    "lessons": 11
  },
  "python-automacao-profissionais": {
    "minutes": 690,
    "lessons": 11
  },
  "global-english-2026": {
    "minutes": 700,
    "lessons": 21
  },
  "ingles-carreira-internacional": {
    "minutes": 690,
    "lessons": 11
  },
  "critical-thinking": {
    "minutes": 510,
    "lessons": 6
  },
  "technology-future": {
    "minutes": 510,
    "lessons": 6
  },
  "global-economics": {
    "minutes": 510,
    "lessons": 6
  }
};

export const academyManifest = Object.fromEntries([
  ...Object.entries(previousAcademyManifest).map(([id, previous]) => [
    id, { minutes: academyProjects[id][0] * 60, lessons: previous.lessons + projectStageCount },
  ] as const),
  ...emergencyCourses.map(course => [course.id, { minutes: course.hours * 60, lessons: course.lessons }] as const),
]);

