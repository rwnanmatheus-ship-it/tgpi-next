import type { Course, CourseDeliveryStatus } from "@/types/course";

export type CourseQualityGate = {
  description: string;
  id: "catalog" | "learning" | "credential";
  label: string;
  passed: boolean;
};

export type CourseStandardAudit = {
  credentialReady: boolean;
  gates: CourseQualityGate[];
  liveAssessmentWeight: number;
  score: number;
};

function allComponentsHaveStatus(course: Course, status: CourseDeliveryStatus) {
  return course.assessment.components.every(
    (component) => component.status === status,
  );
}

export function getCourseStandardAudit(course: Course): CourseStandardAudit {
  const competencyIds = new Set(course.competencies.map((item) => item.id));
  const everyModuleMapped = course.modules.every(
    (courseModule) =>
      courseModule.competencyIds.length > 0 &&
      courseModule.competencyIds.every((id) => competencyIds.has(id)),
  );
  const outcomesAreMapped = course.competencies.every((competency) =>
    course.modules.some((courseModule) =>
      courseModule.competencyIds.includes(competency.id),
    ),
  );
  const assessmentWeight = course.assessment.components.reduce(
    (total, component) => total + component.weight,
    0,
  );
  const rubricWeight = course.assessment.rubric.reduce(
    (total, dimension) => total + dimension.weight,
    0,
  );
  const liveAssessmentWeight = course.assessment.components
    .filter((component) => component.status === "live")
    .reduce((total, component) => total + component.weight, 0);
  const catalogReady =
    course.outcomes.length >= 3 &&
    course.competencies.length >= 3 &&
    everyModuleMapped &&
    outcomesAreMapped;
  const learningReady =
    catalogReady &&
    course.learningStandard.phases.length === 5 &&
    course.modules.every((courseModule) => courseModule.lessons.length > 0) &&
    course.assessment.masteryThreshold >= 70 &&
    assessmentWeight === 100 &&
    rubricWeight === 100;
  const credentialReady =
    learningReady &&
    course.credential.status === "live" &&
    allComponentsHaveStatus(course, "live") &&
    course.credential.evidenceRequired.length >= 3 &&
    course.credential.includes.length >= 4;

  const gates: CourseQualityGate[] = [
    {
      description:
        "Clear outcomes, named competencies and complete module mapping.",
      id: "catalog",
      label: "Catalog ready",
      passed: catalogReady,
    },
    {
      description:
        "Five-phase learning model, complete assessment blueprint and weighted rubric.",
      id: "learning",
      label: "Learning ready",
      passed: learningReady,
    },
    {
      description:
        "All evidence gates are live and the verifiable credential service is active.",
      id: "credential",
      label: "Credential ready",
      passed: credentialReady,
    },
  ];

  return {
    credentialReady,
    gates,
    liveAssessmentWeight,
    score: Math.round(
      (gates.filter((gate) => gate.passed).length / gates.length) * 100,
    ),
  };
}

export function assertCourseLearningReady(course: Course) {
  const audit = getCourseStandardAudit(course);
  const failedGate = audit.gates.find(
    (gate) => gate.id !== "credential" && !gate.passed,
  );

  if (failedGate) {
    throw new Error(
      `${course.title} failed the TGPI Learning Standard: ${failedGate.label}.`,
    );
  }

  return course;
}
