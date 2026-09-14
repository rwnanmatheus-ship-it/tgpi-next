export type CourseCheckpointOption = {
  id: string;
  label: string;
};

export type CourseCheckpoint = {
  correctOptionId: string;
  explanation: string;
  options: CourseCheckpointOption[];
  prompt: string;
};

export type CourseDialogueLine = {
  line: string;
  speaker: string;
};

export type CourseKeyPhrase = {
  example: string;
  meaning: string;
  phrase: string;
};

export type CoursePracticeTask = {
  instruction: string;
  prompt: string;
  title: string;
};

export type CourseDeliveryStatus = "live" | "planned" | "preview";

export type CourseCompetencyLevel =
  | "foundation"
  | "applied"
  | "independent";

export type CourseCompetency = {
  canDoStatement: string;
  description: string;
  evidence: string[];
  id: string;
  level: CourseCompetencyLevel;
  title: string;
};

export type CourseLearningPhase = {
  description: string;
  id: "orient" | "learn" | "rehearse" | "prove" | "reflect";
  title: string;
};

export type CourseAssessmentComponent = {
  count: number;
  description: string;
  id: string;
  status: CourseDeliveryStatus;
  title: string;
  weight: number;
};

export type CourseRubricDimension = {
  description: string;
  id: string;
  title: string;
  weight: number;
};

export type CourseAssessmentStandard = {
  components: CourseAssessmentComponent[];
  masteryThreshold: number;
  retakePolicy: string;
  rubric: CourseRubricDimension[];
};

export type CourseFrameworkAlignment = {
  disclaimer: string;
  framework: string;
  level: string;
};

export type CourseCredentialStandard = {
  evidenceRequired: string[];
  frameworkTargets: string[];
  includes: string[];
  issuer: "TGPI — The Global Polymath Institute";
  status: CourseDeliveryStatus;
  title: string;
  type: "Professional Certificate";
  verification: string;
};

export type CourseLearningStandard = {
  description: string;
  frameworkAlignments: CourseFrameworkAlignment[];
  phases: CourseLearningPhase[];
  title: string;
  version: string;
};

export type CourseLesson = {
  checkpoint: CourseCheckpoint;
  coachNotes: string[];
  commonMistake: {
    avoid: string;
    reason: string;
    useInstead: string;
  };
  dialogue: CourseDialogueLine[];
  durationMinutes: number;
  id: string;
  keyPhrases: CourseKeyPhrase[];
  objective: string;
  practiceTask: CoursePracticeTask;
  scenario: string;
  summary: string;
  title: string;
};

export type CourseModule = {
  competencyIds: string[];
  description: string;
  id: string;
  lessons: CourseLesson[];
  outcome: string;
  title: string;
};

export type Course = {
  assessment: CourseAssessmentStandard;
  audience: string;
  category: string;
  completionRequirements: string[];
  competencies: CourseCompetency[];
  credential: CourseCredentialStandard;
  description: string;
  estimatedMinutes: number;
  id: string;
  learningStandard: CourseLearningStandard;
  level: string;
  modules: CourseModule[];
  outcomes: string[];
  title: string;
  version: string;
};
