import type { AcademyLesson, AcademyPrivateQuestion } from '@/lib/learning/academy/types';

const stages = [
  {
    id: 'scope', weight: 15, title: 'Project lab · Scope and baseline',
    objective: 'Define what a usable result looks like and collect the inputs needed to build it.',
    practice: [
      'Break the project brief into deliverables. For each one, write a success criterion that someone else can inspect.',
      'Prepare fictional inputs or use public sources. Keep a log of assumptions, dates and missing information.',
      'Build a small baseline using one method from the course. Save it so you can compare it with the next version.',
    ],
    deliverable: 'Save the brief, input log, acceptance criteria and baseline.',
    question: 'What makes the baseline useful for evaluating your later work?',
    choices: ['A recorded result with explicit inputs and criteria.', 'A polished result with undocumented assumptions.', 'A success criterion chosen after seeing the result.'],
    feedback: 'A baseline with documented inputs and criteria makes later changes interpretable.',
  },
  {
    id: 'build', weight: 35, title: 'Project lab · Build and document',
    objective: 'Produce a complete first version and make the important decisions traceable.',
    practice: [
      'Build each deliverable from the brief using the course method. Work in small sections and keep versions.',
      'Check each section against its criterion before integrating it. Record the input, action and observed output for at least one check per deliverable.',
      'Make an alternative for one important design or communication decision. Explain the trade-off and keep the version that best meets your criteria.',
    ],
    deliverable: 'Save a complete first version, its verification log and one comparison.',
    question: 'Which record makes your work reproducible by another learner?',
    choices: ['The inputs, the steps and the observed outputs.', 'A description of the final appearance only.', 'A list of tools with no record of decisions.'],
    feedback: 'Recording inputs, steps and outputs lets another learner reproduce and check the result.',
  },
  {
    id: 'test', weight: 30, title: 'Project lab · Test and revise',
    objective: 'Find a meaningful weakness, revise the work and check whether the revision helped.',
    practice: [
      'Run a normal case, a boundary case and a case with missing or contradictory information. Define the expected outcome before each test.',
      'Compare expected and observed outcomes. Classify the differences and revise the most consequential weakness.',
      'Repeat the failing case after revision and rerun the baseline. Keep both versions and document any remaining limitation.',
    ],
    deliverable: 'Save the three test cases, before-and-after evidence and a remaining limitation.',
    question: 'What is the strongest check that your revision addressed the observed weakness?',
    choices: ['Rerun the failing case and the baseline with documented expectations.', 'Test only a new case that is likely to pass.', 'Replace the original result with the revised one.'],
    feedback: 'Repeating the failing case checks the repair, and repeating the baseline checks for regression.',
  },
  {
    id: 'transfer', weight: 20, title: 'Project lab · Transfer and hand over',
    objective: 'Apply the method in a new situation and explain what someone else needs to reuse it.',
    practice: [
      'Change one constraint from the original brief. Predict what should carry over and what needs to change.',
      'Rebuild the affected part using the new constraint. Compare both results and record where the method stops being reliable.',
      'Prepare a handover with the final result, evidence, limitations and next action. Walk through it without referring to your notes, then revise unclear steps.',
    ],
    deliverable: 'Save a transfer example and a handover another learner can follow.',
    question: 'What is evidence that the method transfers to a new situation?',
    choices: ['A changed constraint, a new result and a documented comparison.', 'The same result with a different project title.', 'A claim of general usefulness without a new test.'],
    feedback: 'Transfer is demonstrated by applying the method under a changed constraint and explaining the result.',
  },
] as const;

export const projectStageCount = stages.length;

export function projectWorkload(hours: number, previousMinutes: number) {
  const extraPortfolioMinutes = hours >= 26 ? 150 : hours >= 20 ? 90 : 60;
  const extraAssessmentMinutes = hours >= 26 ? 30 : 0;
  return { extraPortfolioMinutes, extraAssessmentMinutes, projectMinutes: hours * 60 - previousMinutes - extraPortfolioMinutes - extraAssessmentMinutes };
}

export function projectLessons(courseId: string, brief: string, minutes: number, references: string[]) {
  let remaining = minutes;
  return stages.map((stage, index) => {
    const id = `${courseId}-project-${stage.id}`;
    const duration = index === stages.length - 1 ? remaining : Math.round(minutes * stage.weight / 500) * 5;
    remaining -= duration;
    const lesson: AcademyLesson = {
      id, title: stage.title, objective: stage.objective, minutes: duration, foundation: false, project: true,
      sections: [{ title: 'Applied project brief', body: brief }],
      practice: [...stage.practice], deliverable: stage.deliverable, references,
    };
    const question: AcademyPrivateQuestion = {
      id: `${id}-check`, lessonId: id, prompt: stage.question, essential: true,
      options: stage.choices.map((label, option) => ({ id: `option-${option}`, label })),
      correctOptionId: 'option-0', explanation: stage.feedback,
    };
    return { lesson, question };
  });
}
