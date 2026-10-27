# Applied course certification — implementation and release record

Authoring date: 27 October 2026. This adds an optional reviewed-project certification route to the thirteen non-English courses; existing English assessment IDs and previously issued credentials remain supported.

## Student flow

1. Complete every formative lesson checkpoint for the selected course.
2. Open `/courses/{courseId}/project`. Read the original course workshop, transfer task, course competency statements and scoring anchors before submitting.
3. Submit the project, transfer response, evidence for each named competency, and AI-use disclosure. The browser cannot submit an approved state or score. Invalid submissions keep controlled text fields in the form.
4. An authenticated administrator independently inspects the evidence and records a score for every competency and explained feedback. The interface directs administrators without suitable subject competence to leave the work pending. No qualified reviewer roster, professional credentials or service-level promise is invented.
5. Every competency must meet the course threshold (currently 80). A high average does not override an essential competency below threshold. Revision feedback permits another submission; all submitted and reviewed revisions are preserved.
6. After approval, the learner confirms their account name and public-verification consent. Server eligibility checks completion, current-course version, exact competency mapping, reviewer-approved evidence, identity and signing/storage configuration before issuing a unique signed credential. Repeated or concurrent calls return the same credential ID.
7. Existing private certificate/PDF and public verification services handle the issued record. Estimated certificate hours for applied courses include the existing course estimate plus 30 minutes for the project, clearly identified as an estimate.

Each course issues independently. This implementation does not require completion of the whole catalogue or introduce certificate charges. It does not claim academic equivalence, guaranteed outcomes or independently validated fluency.

## Authorization and audit

- Project data: `tgpiLearningUsers/{uid}/learningPortfolios/{length-prefixed-course-version}`.
- Immutable application audit documents: `.../history/submission-{revision}` and `.../history/review-{revision}`; create-only writes prevent accidental replacement.
- Protected pending queue: `tgpiLearningUsers/_learningReviewQueue/items/{sha256-owner-course-path}`. A single-field server query selects submitted records; at most 100 are loaded. Reviewed records do not hide new pending work. Full queue pagination and cross-course learning analytics remain future work.
- Student identity always comes from `requireApiUser`; reviewer role is checked by `requireAdmin` against Clerk private metadata. Server actions rely on Next's origin validation and authenticate every call. Reviewers cannot assess their own work. Optimistic document preconditions protect concurrent reviews.
- Credential issuance reads portfolio approval in the same transaction as the course record and credential writes. A student's form cannot authorize a review or credential. No student project text is written to notifications or public verification.
- Review notifications use the existing private notification service. No review email-delivery promise is made.
- Existing recursive Firestore browser deny rules and learning-storage activation gate are reused; no database rules, secrets or billing configuration are modified.

## Atlas learning context

The existing Atlas chat now offers an explicit opt-in on course and lesson pages. The server validates course/lesson IDs and builds an allowlisted context from curriculum title, version, outcomes, objective, explanation, scenario and practice prompt. It includes the internal source URL. Checkpoint answer keys, scored assessment banks, notes, portfolio submissions, reviewers and other learners' records are excluded. Context is optional and scoped to the current page; existing generation quotas, cost controls and provider configuration remain in force. No live provider request was made for verification.

Tutor instructions call for understanding checks, graduated hints, alternative explanations, a different practice scenario for graded questions, uncertainty and source identification. The tutor cannot grade projects, change progress or issue certificates. Prompt-based coaching restrictions are not represented as a deterministic prevention of every model mistake.

## Validation

The prebuild suites passed 151 tests: 15 Atlas, 20 learning/journal/portfolio, 17 credentials/PDF, 72 intelligence, 18 Workspace, 2 personal-plan and 7 satellite. Targeted lint has no errors. TypeScript and optimized build passed. The portfolio suite exercises all thirteen course IDs, essential minima, no project/no issue, rejected owner/score injection, unavailable storage, curriculum mismatch, unverified identity, reviewer self-assessment, concurrent reviews, recovery history, cross-user isolation, repeated issuance and rejection of unrelated English assessment banks. Tests use deterministic transactional fixtures; they do not create real learner grades or production credentials.

Live end-to-end validation still requires a disposable authenticated learner and authorized reviewer in Preview. A test user must not be granted administrator access merely to make an acceptance test pass. Actual PDF download and public verification for a newly reviewed practical project must be recorded before describing that live flow as verified.

## Remaining limits of the broader original request

This increment implements the practical submission/review/certification service and public-curriculum tutor context. It does not establish independent academic content review, a validated automated evaluator, robust equivalent English retake banks, measured retention, a separate formal appeals operation, an editable versioned curriculum CMS, track credentials or a controlled name-correction/reissue workflow. Existing lesson text and fourteen workshops are available; no claimed university-level equivalence is made. The English bank's legacy rules are preserved, including prior earned credentials.

Deployment records and live results must be appended after Preview and production verification; a successful build alone is not evidence of these unresolved learning outcomes.
