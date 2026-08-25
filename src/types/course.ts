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
  description: string;
  id: string;
  lessons: CourseLesson[];
  outcome: string;
  title: string;
};

export type Course = {
  audience: string;
  category: string;
  completionRequirements: string[];
  description: string;
  estimatedMinutes: number;
  id: string;
  level: string;
  modules: CourseModule[];
  outcomes: string[];
  title: string;
  version: string;
};
