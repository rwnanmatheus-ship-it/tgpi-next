export type ExpansionCurriculum = {
  project: string;
  labs: readonly [ExpansionLab, ExpansionLab, ExpansionLab];
};

type ExpansionLab = readonly [
  title: string, method: string, example: string, practice: string,
  question: string, correct: string, distractor: string, alternative: string,
];
