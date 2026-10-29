# Public practice release — 29 October 2026

This independently releasable increment is based on production a80743e. It adds all fourteen original, complete optional workshops from the learning candidate, rendered on each existing course page. Every workshop includes prerequisites, a fictional case, explanation, worked example, independent task, four self-review criteria, transfer and recovery. Reading, producing and self-review estimates total 25–40 additional minutes; this is not verified attendance or certificate hours.

Only public curriculum presentation changes. Authentication, enrolment, database writes, payments, progress, assessment banks and certificate eligibility remain the production implementation. No migration is necessary. Workshop responses are not submitted or graded; the interface instructs learners to keep their own private draft. Self-review does not confer a competency or credential. Independent subject review is explicitly pending. No licensed external lesson text is copied.

The complete learning branch remains feat/learning-mastery. Its private journals, project-review and new certificate issuance routes are not included in this release because controlled authenticated end-to-end acceptance is still pending. The shared authentication session was no longer available on 29 October. Atlas activation is also not part of this release.

Rollback: redeploy the preceding production commit a80743e798d9e8f592615c0e05b77dff73ab92e1 or restore the previous production deployment dpl_6eucdfqDkJZmDsgbEtT1WfTx8323. No student records or certificate records are changed by the workshop release.

Validation: structural coverage for every actual catalogue ID, existing prebuild suites, localization, lint, TypeScript, optimized build, Preview and production HTTP content checks. Deployment results are recorded in the delivery response. Structural and rendering checks do not constitute expert pedagogical approval.
