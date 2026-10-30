import type { ProfessionalCourseDraft, ProfessionalLesson, ProfessionalRubricCriterion } from "../../../types/professional-learning";

export type ModuleDraft = {
  title: string;
  objective: string;
  explanation: string;
  example: string;
  guided: string;
  independent: string;
  criteria: string[];
  errors: string[];
  recovery: string;
  references?: string[];
};
export type CourseDraftInput = {
  id: string;
  title: string;
  prerequisites: string[];
  tools: string[];
  outcomes: string[];
  buildsOn: string[];
  diagnostic: string;
  modules: ModuleDraft[];
  project: { brief: string; deliverables: string[]; transfer: string; rubric: ProfessionalRubricCriterion[] };
  continuation: string;
};

/** Versioned release candidate. Production availability is controlled separately. */
export function defineProfessionalDraft(input: CourseDraftInput): ProfessionalCourseDraft {
  return {
    ...input,
    version: "1.0.0",
    status: "review",
    instructionLanguage: "pt-BR",
    certificateLanguage: "pt-BR",
    // Existing TGPI Free terms include current courses and account-based progress.
    access: "free",
    approval: { quizMinimum: 80, projectMinimum: 70, rubricVersion: "professional-1.0" },
    modules: input.modules.map((module, index) => {
      const id = `${input.id}-m${index + 1}`;
      const lesson: ProfessionalLesson = {
        id: `${id}-l1`, title: module.title, objective: module.objective,
        explanation: module.explanation, workedExample: module.example,
        guidedPractice: module.guided, independentPractice: module.independent,
        successCriteria: module.criteria, commonErrors: module.errors,
        recovery: module.recovery, referenceUrls: module.references ?? [],
        // Provisional task budget. Never represented as final certificate hours.
        minutes: { study: 10, practice: 30, assessment: 5 },
      };
      return { id, title: module.title, lessons: [lesson] };
    }),
    project: { ...input.project, reviewMode: "human", minutes: 120 },
  };
}

export function criterion(id: string, title: string, description: string, weight: number, essential = false): ProfessionalRubricCriterion {
  return { id, title, description, weight, essential, minimum: 70 };
}
