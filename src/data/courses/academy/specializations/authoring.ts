type Lab = readonly [
  title: string, method: string, example: string, practice: string,
  correct: string, wrong: string, tradeoff: string,
];

export type SpecializationCurriculum = {
  sources: readonly [string, ...string[]];
  project: string;
  scenario: string;
  changedConstraint: string;
  evidence: string;
  calculation: readonly [total: string, subset: string];
  labs: readonly [Lab, Lab, Lab, Lab, Lab, Lab];
};
