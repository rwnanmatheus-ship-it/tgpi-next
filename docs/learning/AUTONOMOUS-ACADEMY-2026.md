# TGPI expanded learning edition — 2026.11.1

Founder-requested expansion and automatic certification for every course. The catalog now has 27 available courses, 227 lesson/laboratory units and 90 additional curriculum placements (81 distinct newly authored laboratories plus nine reused foundation laboratories in the three formerly planned courses). All 137 previous lesson IDs and their underlying records remain intact.

## Workload

| Group | Courses | Workload per course |
| --- | ---: | --- |
| Applied series | 10 | 6h15 |
| Country Fit, relocation budget, international career | 3 | 6h30 |
| Professional pathways | 10 | 11h30 |
| Global English | 1 | 11h40 |
| Strategic thinking, future of work, global economics | 3 | 8h30 |

The manifest is generated from the curriculum and tested against it. Each new laboratory budgets 60 minutes for explanation, a worked case, independent production, error correction and transfer. The portfolio budgets 90 minutes; final assessment and delayed retrieval together budget 60 minutes. These are planning estimates, not observed learner time or monitored attendance. The 24-hour spacing interval is excluded from workload.

## Completion contract

1. Explicit enrollment with a diagnostic and consent to the certificate name; private sharing by default.
2. Every lesson requires a practice record and a server-scored check with all answers correct. Notes are saved automatically with revision protection. Text length checks participation only and never becomes a quality score.
3. A practice portfolio records situation, method, result, failed assumption, correction, transfer and AI assistance. It is not independently graded.
4. The final assessment samples foundation questions, covers all advanced laboratories and creates a fresh numerical case. At least 80%, all essential questions and the numeric case must be correct.
5. A spaced retrieval review opens 24 hours after passing the final assessment. It uses a fresh attempt and numeric parameters with the same passing criteria.
6. Once complete, a verified account email and enrollment name consent allow automatic, idempotent signed certificate issuance. A failed issuance never erases completion; the learner can retry.

The certificate states course completion and objective automatic assessment. It does not certify independent review of open projects, oral fluency, CEFR attainment, real-world professional performance, external accreditation or guaranteed learning. There is no proctoring or proof that the account holder worked without assistance. The repository is public; fixed question secrecy is not an integrity guarantee. Randomized opaque choice IDs, fresh numeric cases, sequential gates, rate limits and server validation reduce simple bypasses without claiming cheating-proof assessment.

## Operational design

- New records: `tgpiLearningUsers/{uid}/academyCourses/{courseId}--{version}`. Attempts and immutable submitted evidence snapshots are subcollections of that record.
- These paths use the existing server-only recursive learning-store boundary and `TGPI_LEARNING_SECURITY_RULES_CONFIRMED` configuration gate. No new indexes, rules, credentials, providers or paid AI runtime are introduced.
- The authenticated server chooses the owner. Writes require the exact origin, JSON, a streamed 24 KB limit and strict schemas. Private responses use `private, no-store`.
- Every assessment attempt has a server-generated opaque ID, question/choice IDs and persisted scoring keys. Public DTOs exclude correct choices, expected numeric values and explanations before submission.
- Transactions protect revisions, attempt consumption, rate counters and single issuance. Replayed submissions do not regrade or issue another credential.
- Five starts per assessment per UTC day; sixty total starts per course per day. Retry cooldown: 30 seconds for lessons, five minutes for final/retrieval. No answering deadline.
- The existing signed credential collection, owner copy, verification pages, PDF downloads and lifecycle are reused. Automatic assessment metadata is covered by the existing signature. Public sharing resigns both copies atomically.
- The learning summary merges the new progress with legacy records. Existing professional notes are copied on enrollment, without inheriting approval. Archived work remains readable; new legacy professional submissions return 409 and point to the expanded edition. Previously approved legacy credentials may still be issued under their original criteria.
- Executable project uploads are not run, no audio is required for automatic approval, and no third-party model grades learner text.

## Language and content scope

Interface controls, all assembled course curricula, the 81 distinct new laboratories, assessment prompts, choice labels, feedback and numerical case instructions have six-language entries. Composite foundation sections retain separate translation boundaries. Target-language utterances and answer choices in English courses retain the language being taught. Active assessments use authorized locale maps so switching language preserves drafts, answers, attempt identifiers and generated numerical values. The localization regression suite checks all 27 assembled curricula and their assessment banks.

Fictional cases avoid asserting current destination-specific visa, tax, healthcare or employment rules. Learners are directed to verify current official requirements before real decisions. Practice documents should use fictional or redacted information.

## Validation

- Full existing regression suite plus academy tests: authentication, strict body/origin boundaries, all 27 completion paths, preservation of original IDs/notes, attempt replay, cross-account isolation, forged scores, stale revisions, duplicate/foreign choices, numerical failure despite high multiple-choice score, cooldown/daily limits, delayed review, unverified-email recovery, signing and sharing.
- Production Next.js build, TypeScript, scoped ESLint and static localization audit.
- Browser verification and deployment results are recorded in the release response. Test credentials are synthetic and exist only in isolated in-memory fixtures; no real learner was graded or certified during validation.

## Evidence-informed design references

- IES: https://ies.ed.gov/ncee/wwc/PracticeGuide/1 — retrieval and distributed study.
- OWASP ASVS: https://asvs.owasp.org/ — server-side security verification criteria; no conformance claim.
- W3C timing guidance: https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html — avoid unnecessary answering time limits.

The specific 24-hour interval and thresholds are product policy, not a universal guarantee of retention. Estimated workload and assessment discrimination should be reviewed using actual aggregated learner outcomes after release.
