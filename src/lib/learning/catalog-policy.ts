import type { CourseOverview } from '../../types/course-overview.ts';

export type CourseLearningPolicy = {
  kind: 'professional' | 'flagship' | 'practice';
  publicationStatus: 'early_access' | 'published' | 'planned';
  accessPolicy: 'free_account';
  assessmentPolicy: 'practice' | 'verified_assessment' | 'quiz_project_review';
  credentialStatus: 'none' | 'criteria_available';
  instructionLanguage: 'en' | 'pt-BR';
};

/** Display policy only. Issuance eligibility is always evaluated by the server. */
export function courseLearningPolicy(course: CourseOverview): CourseLearningPolicy {
  if (course.learningPolicy) return course.learningPolicy;
  const flagship = course.id === 'global-english-2026';
  return {
    kind: flagship ? 'flagship' : 'practice',
    publicationStatus: course.status === 'planned' ? 'planned' : 'published',
    accessPolicy: 'free_account',
    assessmentPolicy: flagship ? 'verified_assessment' : 'practice',
    credentialStatus: flagship ? 'criteria_available' : 'none',
    instructionLanguage: 'en',
  };
}

export function credentialLabel(policy: CourseLearningPolicy) {
  if (policy.publicationStatus === 'planned') return 'Planned curriculum';
  if (policy.assessmentPolicy === 'quiz_project_review') return 'Certificate criteria · Quiz, project and human review';
  return policy.credentialStatus === 'criteria_available' ? 'Verified certification pathway' : 'Applied practice · No certificate';
}
