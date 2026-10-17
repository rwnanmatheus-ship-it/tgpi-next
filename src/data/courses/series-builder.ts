import type { Course, CourseLesson } from "@/types/course";
import type { CourseGoal, CourseOverview, CourseSeries } from "@/types/course-overview";
import { assertCourseLearningReady } from "@/lib/learning-standard";

export type SeriesLesson = {
  title: string;
  objective: string;
  scenario: string;
  explanation: string;
  steps: [string, string, string];
  question: string;
  answers: [string, string, string]; // Correct answer first in the authoring source; rotated for delivery.
  feedback: string;
  output: string;
};
export type SeriesCourseDefinition = {
  id: string;
  title: string;
  description: string;
  series: CourseSeries;
  chapter: number;
  goal: CourseGoal;
  category: string;
  imageAlt: string;
  lessons: [SeriesLesson, SeriesLesson, SeriesLesson];
};

export function createSeriesCourse(definition: SeriesCourseDefinition): Course {
  const modules = definition.lessons.map((item, index) => {
    const id = `${definition.id}-${index + 1}`;
    const options = item.answers.map((label, option) => ({ id: `choice-${option}`, label }));
    const offset = (index + definition.chapter) % options.length;
    const lesson: CourseLesson = {
      id, title: item.title, objective: item.objective, scenario: item.scenario,
      summary: item.explanation, durationMinutes: 15, coachNotes: item.steps,
      checkpoint: { prompt: item.question, options: [...options.slice(offset), ...options.slice(0, offset)], correctOptionId: "choice-0", explanation: item.feedback },
      commonMistake: { avoid: item.answers[1], reason: item.feedback, useInstead: item.answers[0] },
      dialogue: [
        { speaker: "Learner", line: item.scenario },
        { speaker: "TGPI coach", line: item.explanation },
        { speaker: "Learner", line: "How can I apply this to my own situation?" },
        { speaker: "TGPI coach", line: item.output },
      ],
      keyPhrases: [
        { phrase: "Start with the facts", meaning: "Distinguish what you know from what you assume.", example: item.steps[0] },
        { phrase: "Check the constraints", meaning: "Identify conditions that limit the available options.", example: item.steps[1] },
        { phrase: "Choose the next action", meaning: "Make the next step concrete and reviewable.", example: item.steps[2] },
        { phrase: "Create useful evidence", meaning: "Produce something you can inspect and improve.", example: item.output },
      ],
      practiceTask: { title: "Your applied project", prompt: item.output, instruction: "Write the output using your own situation. Check it against the lesson guidance. Keep a private copy: this work is self-reviewed, not uploaded or professionally assessed." },
    };
    return { id: `${id}-module`, title: item.title, description: item.objective, outcome: item.output, competencyIds: [`${id}-skill`], lessons: [lesson] };
  });
  return assertCourseLearningReady({
    id: definition.id, version: "1.0.0", title: definition.title, description: definition.description,
    category: definition.category, level: "Practical Foundation", audience: "People preparing for international life, study or work.",
    estimatedMinutes: 45, modules, outcomes: definition.lessons.map(item => item.objective),
    completionRequirements: ["Complete the three applied lessons.", "Pass all three formative checkpoints.", "Create and self-review the practical outputs."],
    competencies: definition.lessons.map((item,index) => ({ id: `${definition.id}-${index+1}-skill`, title: item.title, description: item.objective, canDoStatement: item.objective, level: "foundation", evidence: [item.output] })),
    assessment: { masteryThreshold: 80, retakePolicy: "Review the feedback and retry the formative checkpoint. This short course does not issue a professional certificate.", components: [{ id: "applied-checkpoints", title: "Applied checkpoints", count: 3, description: "Three formative decisions with feedback. Practical outputs are self-reviewed, not graded.", status: "live", weight: 100 }], rubric: [{ id: "application", title: "Evidence and application", description: "Review your evidence, constraints and next action.", weight: 100 }] },
    credential: { title: "Applied learning record", type: "Professional Certificate", issuer: "TGPI — The Global Polymath Institute", status: "planned", verification: "Account-based lesson progress only. No professional certificate is issued for this short course.", evidenceRequired: [], includes: ["Course version", "Completed lessons", "Formative checkpoints", "Practical output guidance"], frameworkTargets: [] },
    learningStandard: { version: "1.0", title: "TGPI Applied Learning", description: "Learn through a realistic situation, create a practical output and check your reasoning.", frameworkAlignments: [], phases: [
      { id: "orient", title: "Orient", description: "Understand the scenario and its constraints." },
      { id: "learn", title: "Learn", description: "Study the worked explanation and decision rules." },
      { id: "rehearse", title: "Rehearse", description: "Build an output for your own situation." },
      { id: "prove", title: "Check", description: "Pass the formative checkpoint and review feedback." },
      { id: "reflect", title: "Reflect", description: "Record what to verify and do next." },
    ] },
  });
}
export function createSeriesOverview(definition: SeriesCourseDefinition): CourseOverview {
  return { id: definition.id, title: definition.title, desc: definition.description, category: definition.category,
    audience: "For people building a practical international plan.", benefits: definition.lessons.map(item => item.objective),
    duration: "45m", format: "3 applied lessons", level: "Practical Foundation", goal: definition.goal,
    goalLabel: definition.series, href: `/courses/${definition.id}`, image: `/images/courses/${definition.id}.webp`,
    imageAlt: definition.imageAlt, status: "available", releaseLabel: "Available now", series: definition.series, seriesOrder: definition.chapter };
}
