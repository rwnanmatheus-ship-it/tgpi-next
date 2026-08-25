import { arrivalModule } from "@/data/courses/english-abroad/arrival";
import { careerModule } from "@/data/courses/english-abroad/career";
import { dailyIndependenceModule } from "@/data/courses/english-abroad/daily-independence";
import { globalActionModule } from "@/data/courses/english-abroad/global-action";
import { housingModule } from "@/data/courses/english-abroad/housing";
import { safetyCultureModule } from "@/data/courses/english-abroad/safety-culture";
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
      "English for Living Abroad must contain 6 modules and 18 lessons.",
    );
  }
  if (course.estimatedMinutes !== totalMinutes) {
    throw new Error(
      "English for Living Abroad estimated time must match its lessons.",
    );
  }
  if (uniqueLessonIds.size !== lessonIds.length) {
    throw new Error("English for Living Abroad lesson IDs must be unique.");
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

  return course;
}

export const englishAbroadCourse = validateEnglishAbroadCourse({
  id: "english-abroad",
  version: "1.0.0",
  title: "English for Living Abroad",
  description:
    "Build the practical English required to arrive, settle, work and act independently in another country through 18 real-world simulations.",
  category: "Language & Mobility",
  level: "A2–B1 Foundation",
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
