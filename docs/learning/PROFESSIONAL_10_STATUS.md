# TGPI Professional Learning — candidate, 29 October 2026

> Historical editorial diagnosis. Runtime implementation has since advanced; see [current runtime status](PROFESSIONAL_RUNTIME_STATUS.md). The editorial expansion and real learning validation below remain release requirements.

## Actual delivery status at initial draft

This candidate is **not a completed or published ten-course release**. It contains an initial Portuguese editorial draft of eight lessons for each of ten proposed courses (80 lessons), ten diagnostics, ten project briefs and course-specific weighted rubrics. Lessons include an explanation, worked example, guided task, independent task, success criteria, common errors and recovery. The current short lessons require substantive expansion and subject review before they can support the requested professional courses.

The authoring schema distinguishes instruction language and certificate language. Interface and studied-language selection still require runtime integration. The new registry is intentionally not imported by the live catalogue. No enrolments, prices, progress, certificates, database rules or production environment values are changed. No new course is commercially available.

## Diagnosis

- Production source baseline: `6da2e087cb94e325acbb3371d8cc9495e9d108ac`, branch `fix-deploy-hoje`.
- Production observed at start: deployment `dpl_4xDaQ6gBvJkSq7KkwL861ZvrKeMt`, state READY, target production.
- Stack: Next.js 16.3.4, React 19.2.4, TypeScript strict, Tailwind 4, Clerk and Firebase REST service-account storage.
- Existing catalogue: one English pathway plus thirteen short applied courses. Their identifiers and records are preserved.
- `learning-records.server.ts` currently supports scored credential eligibility only for `global-english-2026`. It is not a generic project certification service.
- The separate `feat/learning-mastery` branch contains prior project-review code. Its release record explicitly leaves authenticated learner/reviewer acceptance pending. It was inspected, not merged wholesale: doing so would also replace unrelated production localization/comparison changes.
- Existing progress lives in the activation service; secure assessment records use denied-to-browser Firestore collections and service-account requests.
- Existing PDF and public verifier are reusable, but must be tested against any new credential schema before release.

## Drafts and overlap

| Proposed course ID | Existing complementary pathway | Draft modules | Current estimate |
| --- | --- | --- | --- |
| ia-trabalho-global | ai-workflow-foundations | 8 | provisional only |
| ingles-carreira-internacional | global-english-2026 | 8 | provisional only |
| planilhas-decisoes-profissionais | relocation-budget, cost-of-living-lab | 8 | provisional only |
| carreira-internacional-profissional | international-career, career-networking | 8 | provisional only |
| analise-dados-power-bi-ia | none required | 8 | provisional only |
| gestao-projetos-equipes-globais | remote-work-systems | 8 | provisional only |
| marketing-mercados-internacionais | none required | 8 | provisional only |
| ciberseguranca-vida-trabalho | digital-safety-abroad | 8 | provisional only |
| python-automacao-profissionais | none required | 8 | provisional only |
| comunicacao-negociacao-pensamento-critico | cross-cultural-confidence, evidence-literacy | 8 | provisional only |

New pathways are designed as complementary specializations. Existing completions must not be erased or silently converted into completion of these courses. `buildsOn` is an editorial relationship, not an enforced prerequisite or migration.

Each draft currently budgets 10 minutes study + 30 minutes practice + 5 minutes assessment per module and 120 minutes project: 480 minutes total. This is an untested task budget, **not a final 8-hour professional course or certificate load**. It does not substantiate the requested 15–50-hour planning ranges. Expansion and representative learning trials are still required. No certificate uses these values.

## Implemented policy foundation

`professional-policy.ts` implements pure, tested decisions; it is not an HTTP or database boundary:

- Exact question/answer mapping; no missing, duplicate or foreign selections.
- Default quiz minimum 80%; essential question failures veto passage even at 90%.
- Course and rubric version binding for project review.
- Independent reviewer, explained feedback and exact rubric mapping.
- Finite scores within 0–100; weighted project minimum 70%.
- Every essential rubric minimum must pass independently.
- Eligibility requires activities, all declared assessments, reviewed project, identity and sharing consent.
- Release fails closed for draft status, unresolved access and missing/stale acceptance evidence.

Required activity IDs, assessments, attempts and reviewer identity must come from authoritative server records when integrated. Never accept these decisions or their inputs from a browser as proof of approval. Persist issuance and eligibility transactionally; the pure policy alone does not prevent tampering, races, duplicate issuance or cross-user access.

## Work still necessary before publication

1. Expand and technically/academically review the 80 initial lessons; add module quizzes, answer explanations, equivalent recovery banks and references. Validate diagnostic placement and learning with representative tasks.
2. Expand exercise/solution files and supply public dataset provenance/license/date/dictionary. Initial Python material is delivered at `public/learning-assets/professional/python`: an original synthetic CSV, expected result, executable standard-library solution, three passing test methods and Portuguese reproduction instructions. Other course downloads and the public Power BI dataset remain pending.
3. Ten original covers are generated and included as 1600×900 WebP and 640×360 AVIF assets in `public/images/courses/professional`. Inspect responsive crops and accessibility in authenticated Preview before release. They are integrated only in the admin editorial review route, not the public catalogue.
4. Integrate enrolment, versioned private activities, authoritative server-scored assessments, resumable progress and downloads into the existing runtime.
5. Integrate project drafts, submissions, reviewer assignment, course-qualified review, revision, appeals and audit history. The existing admin role alone does not establish subject competence.
6. Implement private consented audio upload and review for oral English. Written text cannot certify pronunciation or oral interaction.
7. Select access based on existing Free/Premium contracts. Current drafts explicitly use `unresolved`; do not infer a price or plan.
8. Implement credential issuance with version snapshots, explicit document nature, completion/issue dates, minimal public data, optional sharing and valid/replaced/revoked lifecycle with audit history. Preserve old signatures and requirements.
9. Complete authenticated Preview tests using a disposable learner and a distinct legitimately authorized reviewer. Verify cross-user denial, failures, retakes, project feedback, idempotent issuance, PDF/QR, revocation/replacement and legacy compatibility.
10. Inspect desktop/mobile/keyboard UX and certificate printing; then deploy, verify actual production URLs and record rollback target.

The new read-only route `/admin/learning/professional` calls the existing `requireAdmin` guard before rendering. It allows review of all lessons, briefs, rubrics and covers. It cannot enrol, grade, approve a release or issue a credential. No user account was created, elevated, graded or impersonated. No authentication bypass was introduced. No production deployment was requested for this candidate.

## Reference review

Primary documentation checked on 29 October 2026: Microsoft Learn, “Download Power BI Desktop”; Python standard-library `csv` documentation; Google Docs Editors Help, “QUERY function”. Requirements, licensing and function compatibility must be checked for the final supported versions. A CISA page retrieval returned 403; it is not recorded as a reviewed source. These checks do not replace subject review of the full curriculum.

## Validation record

Initial checks: TypeScript passed; seven new policy/coverage tests passed; 17 existing credential/PDF tests and one workshop test passed. Existing prebuild suites and the optimized Next.js build passed before addition of the admin review route. Final route checks are recorded below. Structural tests verify draft coverage and policy behavior, not pedagogical quality or a functioning learning runtime.

Final route check: optimized Next.js build passed with 148 generated pages and `/admin/learning/professional` registered as a dynamic protected route. One intermediate rebuild failed on a corrupted local Turbopack persistence cache; moving the generated `.next` directory aside and building from a fresh cache resolved it. The latest policy suite passed all seven tests, including missing runtime release-evidence fields and essential-criterion vetoes. Python's three test methods passed (including seven invalid-amount subcases). No authenticated browser, learner/reviewer, new PDF or production acceptance is claimed. The last admin change adds ordinary download links and is checked by final TypeScript validation.

## Source publication blocker

Update, 29 October 2026: the user explicitly authorized publication to the named public repository. The terminal retry failed because no Git HTTPS write credential is configured. Publication is proceeding through the existing GitHub connector; this does not change course readiness or permit incomplete courses to be marked available.

The final TypeScript check passed. Candidate source and optimized assets are preserved in local commit `a0cba3fe8d3b0eb668ee89f794a4943fa632c5d0`, branch `feat/professional-learning-10`. A push to the existing public remote `https://github.com/rwnanmatheus-ship-it/tgpi-next.git` was rejected by automatic approval review: it identified public disclosure of potentially non-public organizational content without explicit authorization for that destination/source publication. No alternate publishing tool or workaround was attempted. Explicit user authorization for publishing this source and artwork to that public repository is required before retrying. No pull request was created and no successful remote push is claimed. This permission does not establish course readiness or authorize marking unfinished courses as available.
