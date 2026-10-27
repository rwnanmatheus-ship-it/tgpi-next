import type { Course } from "@/types/course";
/** Adds the optional reviewed-project route without resetting enrolments or formative progress. */
export function withAppliedCertification(course: Course): Course {
  if (course.id === "global-english-2026") return course;
  return {
    ...course,
    completionRequirements: ["Complete every formative lesson checkpoint.", "Submit an original applied project, transfer response and evidence for every competency.", `Receive at least ${course.assessment.masteryThreshold}% for each competency from an authorized TGPI reviewer.`, "Confirm your verified account name and consent to public credential verification."],
    assessment: { ...course.assessment, retakePolicy: "Read the review feedback, improve the project and submit a new revision. Every competency must independently meet the threshold. Review is asynchronous with no promised response time.", components: [
      { id: "formative-checkpoints", title: "Lesson checkpoints", description: "Required preparation; not a measure of independent practical performance.", count: course.modules.flatMap(item => item.lessons).length, status: "live", weight: 0 },
      { id: "reviewed-project", title: "Reviewed project and transfer", description: "An authorized reviewer assesses the submitted evidence using the course criteria. Each essential competency needs its own passing score.", count: 1, status: "live", weight: 100 },
    ] },
    credential: { ...course.credential, status: "live", title: "TGPI Applied Course Certificate", verification: "Server-authorized issuance after all required lesson checkpoints and a reviewed practical project. Public verification and PDF download use the TGPI credential service.", evidenceRequired: ["Completed formative lesson checkpoints", "Original practical project and transfer task", "Reviewer-approved evidence for every essential competency"], includes: ["Course and curriculum version", "Assessed competencies", "Estimated learning hours including 30 minutes of project practice", "Unique identifier and public verification"], frameworkTargets: [] },
  };
}
