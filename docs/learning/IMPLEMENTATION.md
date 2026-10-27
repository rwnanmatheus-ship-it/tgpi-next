# TGPI Learning — review increment, 2026-10-26

## Baseline and scope

Production baseline: `fc39e5aa3e4ef55c9e176de611f3e07cda45e621`, branch `fix-deploy-hoje`, deployment `dpl_8uig7Joi5AnTWSpi1mDN3NUkwnFS`. Isolated implementation branch: `feat/learning-mastery`. Other local worktrees contain unrelated work and were not modified.

The actual catalogue has 14 courses: one English course, three applied courses and ten series microcourses. See `catalog-matrix.md` for every course. The English service has server-scored module gates, a capstone, transaction-based idempotent issuance, signing, public verification and PDF generation. The service explicitly rejects other course IDs. Their existing labels correctly say no professional certificate is issued. This increment does not pretend otherwise.

Stack: Next.js 16.3.4 App Router, React 19, strict TypeScript, Tailwind, Clerk identity and plan metadata, Firestore through authenticated server REST, Stripe billing, Atlas via OpenAI, Vercel deployment. Current lesson and assessment routes require authentication, not Premium. Existing commercial behavior was preserved. Admin audit uses `requireAdmin`, which checks server-held Clerk private metadata. Course overview is public. Existing course progress uses the activation service and feeds Workspace; credentials use separate learning records.

## Implemented

- Fourteen original, course-specific applied workshops: prerequisites, case, conceptual explanation, worked example, independent artifact, four observable self-review criteria, transfer and recovery. Optional supplements have their own 1.0 identity and authoring date. They are not represented as independently specialist-reviewed. Estimates are broken into reading, production and review and do not inflate existing certificate hours.
- Authenticated private journals for every existing lesson: preparatory self-assessment, written practice, notes and adjustable retrieval practice date. A self-assessment is explicitly not a diagnostic score. No self-reported competency is issued.
- Journal records partition by server-authenticated user, course, version and lesson. Transactional integer revision checks return 409 for stale writes. Client fields cannot change owner, score, course version or certificate eligibility. Network failures do not show a false saved state. Unsaved navigation warns the learner. Retry loading is explicit.
- Existing formative rehearsal now uses the appropriate non-language rubric outside the English course. Next-lesson navigation is freely available; scored assessment prerequisites remain unchanged.
- Read-only authorized admin quality matrix at `/admin/learning`. Structural checks are part of prebuild and expose release blockers without presenting a checklist as academic approval.

## Storage and compatibility

Path: `tgpiLearningUsers/{sessionUid}/learningJournals/{length-prefixed-course-version-lesson}`. Requires the existing learning-storage configuration gate and existing recursive browser deny rule for `tgpiLearningUsers/{document=**}`. The deployed ruleset still needs independent verification: another broad allow rule could override a deny. No rules or indexes were changed. Notes and practice are not supplied to Atlas or public profile endpoints. No analytics contains their text.

No existing course ID, URL, curriculum version, enrolment, payment, progress, grade or credential was reset. Supplementary practice changes no certification requirement. Older journal documents are never overwritten by a new version; a curriculum-version mismatch returns 409. A historical journal reader and a complete curriculum version archive remain future work. Existing course service version migration has not been rewritten.

Review dates are saved plans, not automatic email reminders or verified retention results. Editing and saving a journal with a selected interval restarts that interval. There is no automatic AI scoring, claim of fluency, university equivalence or guaranteed learning.

## Release gates not yet met

1. All 13 non-English courses still need separate protected assessment banks, equivalent variants, practical-evidence evaluation, server certification eligibility and public credential flows. Copying public formative answers into a protected bank would be invalid.
2. The English assessment implementation also needs calibrated essential competency minima, equivalent retakes, and validation that practical performance matches claimed skills. Its current multiple-choice path must not be described as independent validation of spoken fluency. Existing earned credentials are preserved.
3. Content-level expert review is not recorded. Jurisdiction-specific professional guidance must be sourced and dated before adding such claims. Workshops use hypothetical cases and general reasoning, not determinations of legal or financial eligibility.
4. No operational responsible-review/appeals workflow exists for open assignments; no promise of immediate human review is made.
5. Atlas is not yet a curriculum-grounded tutor. Its existing privacy, quotas, authentication and provider configuration were not modified. Journals function independently of AI.
6. Full curriculum publication states/version archive, admin editing, per-competency longitudinal metrics, assessed portfolio integration and track certificates remain unimplemented.
7. Controlled disposable Preview learner accounts and live Firestore/Clerk validation are required for actual persistence across logout/devices and certificate issue/download/revocation. Unit tests with transactional mocks are not substitutes for those checks. No real learner was used or altered.

This is a reviewable implementation increment, not the requested complete mastery-certified catalogue. Do not promote the full release until its gates pass. A deployment being READY alone does not satisfy educational or authenticated acceptance criteria.

## Verification and rollback

Automated tests cover all real catalogue entries, invalid checkpoint/mapping detection, rejected identity/score injection, path traversal, text limits, unsupported review intervals, private record isolation, concurrent stale writers, version mismatch and unavailable storage. Existing credential/PDF and prebuild regression suites also run.

Preview must be tested before any production promotion. Rollback uses the prior production deployment; journal documents are additive and need no destructive migration. Do not delete student journals to roll back UI changes.

Teaching-method references inspected 2026-10-26:
- https://bokcenter.harvard.edu/active-learning
- https://blog.coursera.org/how-to-integrate-mastery-learning-into-course-design/

These references inform active practice and feedback, and imply neither institutional affiliation nor validation of TGPI outcomes.

## Execution results

- Implementation commit: `07c907c` (local; source upload blocked).
- `npm run build`: PASS after using a local dependency directory (Turbopack rejects an external node_modules symlink). All 124 prebuild tests passed: 8 learning-mastery, 17 credential/PDF, 72 intelligence, 18 Workspace, 2 personal-plan, 7 satellite.
- `npm run typecheck`: PASS.
- `npm run lint`: 0 errors, 3 existing warnings outside this change; targeted lint for changed code: PASS.
- `git diff --check`: PASS.
- Remote Preview: NOT CREATED. Automatic approval review rejected pushing the commit to the public GitHub origin. Ownership was independently verified: the authenticated GitHub user and repository owner both identify `rwnanmatheus-ship-it`; nevertheless review requires explicit user authorization for this public source payload. No alternate upload or deployment route was used to bypass the rejection.
- Production: NOT CHANGED; no production deployment ID or URL exists for this increment.
- Browser validation: NOT COMPLETED. Playwright is installed but its Chromium executable is absent, and the attempted browser download returned an invalid/truncated archive. Authenticated live learner tests remain unexecuted.
- No live learning, certificate or payment records were changed.

## Continuation — 27 October 2026

The public-source upload was authorized and completed through the authenticated GitHub connector. Remote commit `c749b5453f97ff3d946b52cfa3ca34e1c2da0661` has exactly the same tree (`216bd910449f5c0112aa92536344ab9cda200617`) as the previously tested local implementation. Preview `dpl_5zPmE7fv88iXnFnFW4nJ8HpXgArk` is READY at https://tgpi-next-1c0ez478p-rwnanmatheus-ship-its-projects.vercel.app . All 14 course overview routes returned HTTP 200 and included their applied workshop.

The local linked worktree lost its parent Git metadata between sessions. A fresh independent checkout was recovered from the remote branch; no source work was lost.

Additional persistence corrections: exact retries of an already committed journal save return the same record without incrementing revision or moving the review date. Different stale writes still return 409. Validated owner-scoped reads can retrieve archived-version notes; writes still require a current catalogue lesson and version. Ten learning-mastery tests pass, including the new retry and archived-version isolation cases. This is an API-level archive reader; a historical-version browsing UI remains pending.

Authenticated remote verification remains blocked: the protected journal fetch returned `deployment_authentication_required` (401) through the deployment-access connector. This is not evidence of an application-level auth test passing. No disposable Clerk test-account session is available in the current tool context. Actual cross-device persistence, certificate issuance, PDF download and public verification have not been exercised as an authenticated test learner.

Production remains at `fc39e5aa3e4ef55c9e176de611f3e07cda45e621`. Do not label the entire catalogue or its certification complete. The broader editorial, assessment, Atlas and certification gates listed above remain real work, not consequences of the now-resolved GitHub upload block.
