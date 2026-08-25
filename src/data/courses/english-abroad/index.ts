import { arrivalModule } from "@/data/courses/english-abroad/arrival";
import { careerModule } from "@/data/courses/english-abroad/career";
import { dailyIndependenceModule } from "@/data/courses/english-abroad/daily-independence";
import { globalActionModule } from "@/data/courses/english-abroad/global-action";
import { housingModule } from "@/data/courses/english-abroad/housing";
import { safetyCultureModule } from "@/data/courses/english-abroad/safety-culture";
import { assertCourseLearningReady } from "@/lib/learning-standard";
import type { Course } from "@/types/course";

function validateEnglishAbroadCourse(course: Course) {
  const lessons = course.modules.flatMap((courseModule) => courseModule.lessons);
  const totalMinutes = lessons.reduce(
    (total, lesson) => total + lesson.durationMinutes,
    0,
  );
  const lessonIds = lessons.map((lesson) => lesson.id);
  const uniqueLessonIds = new Set(lessonIds);
  const invalidCheckpoint = lessons.find(
    (lesson) =>
      !lesson.checkpoint.options.some(
        (option) => option.id === lesson.checkpoint.correctOptionId,
      ),
  );
  const incompleteLesson = lessons.find(
    (lesson) =>
      lesson.keyPhrases.length !== 4 ||
      lesson.dialogue.length < 4 ||
      lesson.coachNotes.length < 3 ||
      lesson.checkpoint.options.length !== 3,
  );

  if (course.modules.length !== 6 || lessons.length !== 18) {
    throw new Error(
      "Global English must contain 6 modules and 18 lessons.",
    );
  }
  if (course.estimatedMinutes !== totalMinutes) {
    throw new Error(
      "Global English estimated time must match its lessons.",
    );
  }
  if (uniqueLessonIds.size !== lessonIds.length) {
    throw new Error("Global English lesson IDs must be unique.");
  }
  if (invalidCheckpoint) {
    throw new Error(
      `Lesson ${invalidCheckpoint.id} has an invalid checkpoint answer.`,
    );
  }
  if (incompleteLesson) {
    throw new Error(
      `Lesson ${incompleteLesson.id} does not meet the TGPI content standard.`,
    );
  }

  return assertCourseLearningReady(course);
}

export const englishAbroadCourse = validateEnglishAbroadCourse({
  id: "english-abroad",
  version: "1.0.0",
  title: "Global English: Live, Work & Belong Abroad",
  description:
    "Build the practical English required to arrive, settle, work and act independently in another country through 18 real-world simulations.",
  category: "Language & Mobility",
  level: "A2–B1 Foundation",
  learningStandard: {
    version: "1.0",
    title: "TGPI Applied Mastery Standard",
    description:
      "A five-phase learning system that turns knowledge into observable action, feedback and evidence.",
    frameworkAlignments: [
      {
        framework: "CEFR",
        level: "A2–B1 reference",
        disclaimer:
          "TGPI uses CEFR descriptors as a design reference. This course is not an official CEFR examination.",
      },
    ],
    phases: [
      {
        id: "orient",
        title: "Orient",
        description:
          "Enter a realistic situation and understand the decision that matters.",
      },
      {
        id: "learn",
        title: "Learn",
        description:
          "Acquire the smallest set of language patterns needed to act clearly.",
      },
      {
        id: "rehearse",
        title: "Rehearse",
        description:
          "Retrieve and use the skill aloud under controlled pressure.",
      },
      {
        id: "prove",
        title: "Prove",
        description:
          "Make a decision, receive feedback and demonstrate the target skill.",
      },
      {
        id: "reflect",
        title: "Reflect",
        description:
          "Identify the next correction and connect the skill to a real goal.",
      },
    ],
  },
  competencies: [
    {
      id: "first-contact-communication",
      title: "First-contact communication",
      description:
        "Create clarity and trust during arrival, introductions and border conversations.",
      canDoStatement:
        "I can introduce myself, explain my purpose and recover when I do not understand.",
      level: "foundation",
      evidence: [
        "20-second personal introduction",
        "Structured border-control response",
        "Clarification and repair language",
      ],
    },
    {
      id: "housing-navigation",
      title: "Housing navigation",
      description:
        "Protect time, money and personal information in essential housing interactions.",
      canDoStatement:
        "I can screen accommodation, clarify responsibilities and report a problem in writing.",
      level: "applied",
      evidence: [
        "Housing enquiry",
        "Lease clarification",
        "Written maintenance report",
      ],
    },
    {
      id: "everyday-independence",
      title: "Everyday independence",
      description:
        "Complete daily transactions without depending on another person to translate.",
      canDoStatement:
        "I can navigate transport, correct a purchase and communicate essential health information.",
      level: "applied",
      evidence: [
        "Route recovery dialogue",
        "Transaction correction",
        "Healthcare intake response",
      ],
    },
    {
      id: "professional-communication",
      title: "Professional communication",
      description:
        "Present relevant value and participate clearly in interviews and workplace situations.",
      canDoStatement:
        "I can present my experience, answer a competency question and clarify expectations.",
      level: "applied",
      evidence: [
        "30-second professional introduction",
        "Structured interview answer",
        "Workplace clarification",
      ],
    },
    {
      id: "safety-cultural-confidence",
      title: "Safety and cultural confidence",
      description:
        "Use calm, direct language when safety, boundaries or cultural differences raise the stakes.",
      canDoStatement:
        "I can request urgent help, protect a boundary and repair a misunderstanding respectfully.",
      level: "applied",
      evidence: [
        "Emergency information sequence",
        "Boundary-setting response",
        "Cultural repair dialogue",
      ],
    },
    {
      id: "integrated-global-action",
      title: "Integrated global action",
      description:
        "Combine language, planning and judgment across a realistic multi-step day abroad.",
      canDoStatement:
        "I can complete connected tasks, manage uncertainty and move an international plan forward.",
      level: "independent",
      evidence: [
        "Phone appointment",
        "Local relationship-building exchange",
        "24-hour abroad simulation",
      ],
    },
  ],
  assessment: {
    masteryThreshold: 80,
    retakePolicy:
      "Learners receive targeted feedback and may retry with a new scenario after review.",
    components: [
      {
        id: "lesson-checkpoints",
        title: "Scenario checkpoints",
        description:
          "Eighteen decision checks confirm understanding throughout the course.",
        count: 18,
        status: "preview",
        weight: 20,
      },
      {
        id: "module-performance-gates",
        title: "Module performance gates",
        description:
          "Six applied responses demonstrate each capability beyond recognition.",
        count: 6,
        status: "preview",
        weight: 30,
      },
      {
        id: "integrated-capstone",
        title: "Integrated global simulation",
        description:
          "One multi-step performance task combines the six course capabilities.",
        count: 1,
        status: "preview",
        weight: 40,
      },
      {
        id: "transfer-reflection",
        title: "Transfer reflection",
        description:
          "A concise action review connects demonstrated skill to the learner's real plan.",
        count: 1,
        status: "live",
        weight: 10,
      },
    ],
    rubric: [
      {
        id: "clarity",
        title: "Clarity",
        description: "The message is understandable and appropriately structured.",
        weight: 25,
      },
      {
        id: "accuracy",
        title: "Accuracy",
        description: "Language choices convey the intended facts without material ambiguity.",
        weight: 25,
      },
      {
        id: "judgment",
        title: "Judgment",
        description: "The response fits the situation, stakes and social context.",
        weight: 25,
      },
      {
        id: "recovery",
        title: "Recovery",
        description: "The learner can clarify, correct and continue when communication breaks down.",
        weight: 25,
      },
    ],
  },
  credential: {
    title: "TGPI Global English Applied Skills Certificate",
    type: "Professional Certificate",
    issuer: "TGPI — The Global Polymath Institute",
    status: "preview",
    verification:
      "Public verification URL with issuer, learner-approved identity, course version, status and evidence summary.",
    evidenceRequired: [
      "All 18 scenario checkpoints",
      "All six module performance gates",
      "Integrated global simulation at 80% or higher",
      "Authenticated TGPI Global Key",
    ],
    includes: [
      "Course title and version",
      "Six demonstrated capabilities",
      "Assessment result and study volume",
      "Issue date and revocation status",
      "Public verification reference",
    ],
    frameworkTargets: [
      "1EdTech Open Badges 3.0",
      "W3C Verifiable Credentials 2.0",
      "1EdTech Comprehensive Learner Record 2.0",
    ],
  },
  audience:
    "International learners preparing to travel, study, work or build a life abroad.",
  estimatedMinutes: 370,
  outcomes: [
    "Navigate airports, border control and local transport with clarity.",
    "Handle housing, healthcare, shopping and everyday service conversations.",
    "Present yourself professionally in interviews and workplace situations.",
    "Respond to emergencies, misunderstandings and high-pressure conversations.",
  ],
  completionRequirements: [
    "Complete all 18 scenario-based lessons.",
    "Pass the practical checkpoint in every lesson.",
    "Finish the final 24-hour abroad simulation.",
  ],
  modules: [
    arrivalModule,
    housingModule,
    dailyIndependenceModule,
    careerModule,
    safetyCultureModule,
    globalActionModule,
  ],
} satisfies Course);
