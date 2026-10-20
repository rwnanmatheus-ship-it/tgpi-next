# TGPI Global Command Center V5

## Diagnosis and decision

Inspected repository revision `60b51af2d9952ed32eda833a03d42f250c2b4616` on `fix-deploy-hoje`. No AGENTS.md exists in this checkout or its parent. Read the installed Next.js client-component guidance. `/profile` is the real protected Workspace; `/dashboard` redirects there. Root layout owns Navbar, institutional navigation, mobile navigation, footer and app launcher. These shared components and approved fonts/crest remain unchanged.

The original Workspace mixed repeated action queues, rank cards and a five-event timeline with an oversized mission panel. Its model uses private Clerk activation metadata and editable onboarding metadata. Country Fit is an evidence research tool, not a persisted ranking service. Six activity records, four comparisons, eight saved countries and bounded country checklists are retained in activation V1. The current state cannot reconstruct a lifetime history.

## Source and validation matrix

| Module | Source | Available state | Permission | Workspace action | Validation |
| --- | --- | --- | --- | --- | --- |
| Identity | Clerk account; Firestore member identity | Name, @handle, stable number, profile completion | Signed-in owner; public-profile policy separate | Edit identity / Global Key / public profile | Typecheck; member endpoints unchanged; live login unexecuted |
| Subscription | Private tgpiBilling; controlled premium access server | Normalized paid/trial entitlement, founder/preview | Existing server guards | Display reliable membership | Existing billing normalization preserved; live Free/Premium unexecuted |
| Countries | Private tgpiActivationV1 + canonical catalogue | Retained saved slugs | Owner | Country detail / library search | Missing country resolution tested |
| Comparisons | Private activation comparisons | Retained selections, goal, timestamp | Owner; target route retains gates | Reopen exact country/goal query | Existing workspace model tests |
| Learning | Private activation courseProgress + versioned course catalogue | Checkpoints, recorded lesson, course version | Owner; lesson route keeps entitlement enforcement | Resume valid lesson; edition-change review | Checkpoint, stale edition, removed course and legacy alias tests |
| Certificates | Firestore tgpiLearningUsers/{uid}/credentials | Active issued records, bounded 50-row source | Owner; existing credential routes | Private certificate detail / portfolio | Independent suspended fetch; unavailable distinct from zero; live storage unexecuted |
| Preparation | Private activation documentReviews | Checked IDs, total, timestamp | Owner | Open actual country checklist | Source model tests and typed library |
| Country Fit | Onboarding context + current evidence engine | Saved preferences and shortlist; no stored last score/date | Existing Country Fit access | Reopen selected country against live evidence | No invented fit score; last-analysis limitation explicit |
| History | New Firestore workspaceHistory archive; activation fallback | Versioned source events, coverage start, opaque cursor | Auth-derived owner only | Filter loaded events; incremental archive fetch | Archive idempotence, source timestamps, isolation and non-inference unit tests |
| Personalization | New private Firestore workspace/preferences | Density, optional hidden modules, dismissed rules | Auth-derived owner; strict origin | Save / restore | Route authentication, origin, ownership, size, schema and failure tests |
| Notifications | Existing notification center | Source remains in existing provider | Existing owner rules | Open notifications | Navigation preserved; unread count not fabricated |
| Community | Existing global module registry | Existing destination only | Existing community rules | Navigate to community | Registry link preserved; social backend unchanged |
| Personal plan | Existing /plan and onboarding | Existing goal, destinations and preparation | Existing owner rules | Open plan / edit context | Existing personal plan tests |

## Implemented scope

Compact cinematic hero, contextual continuation, four source-backed metrics, explanatory preparation stages, preference disclosure, searchable personal library, filtered/incremental history, live Country Fit entry points, streamed certificate panel, verified rank progression, shared tools, account identity, loading and retry boundary. Keyboard focus and touch sizing are explicit. Motion uses transforms and respects reduced motion. Financial estimates and document details are not exposed in overview cards.

Optional personal tasks, decision-board stages and module reordering were not added. Existing plan remains the canonical entry point. No decorative task or drag controls were introduced.

## Data and compatibility

- Existing Clerk metadata schemas, billing, course guards and learning checkpoints are unchanged.
- `tgpiLearningUsers/{uid}/workspace/preferences`: `{ version: 1, density: comfortable|compact, hidden: [journey|library|history], dismissed: [actionId] }`. Validated maximum 2 KB request. Server chooses uid. Failures do not replace the last confirmed client state.
- `tgpiLearningUsers/{uid}/workspace/historyCoverage`: `{ version: 1, startedAt: ISO timestamp }`.
- `tgpiLearningUsers/{uid}/workspaceHistory/{sortableTimestamp}-{digest}`: actual activation event plus `{ version: 1, source: activation_v1, archivedAt }`. Digest deduplicates the identical source event in a transaction. Source occurredAt is retained.
- No destructive migration. Existing recent events are reconciled on first workspace access. No activity inferred from current state.
- Archive is written after authoritative Clerk progress and reconciled on workspace access. These two providers cannot commit atomically. During a prolonged Firestore outage, events evicted from the six-event Clerk window before reconciliation can be lost. This is a known coverage limit, not an exactly-once guarantee.
- Archive document-name ordering and a 12-row cursor page avoid composite indexes. Filters apply to loaded records and the UI states that scope.
- New paths inherit existing recursive deny rules for `tgpiLearningUsers/{document=**}` and the existing learning-storage configuration gate. No rules, indexes or environment configuration were deployed. Their deployed state could not be audited here.
- Private APIs use `private, no-store`. Anonymous requests are rejected; preference writes require exact same origin. Read/write ownership derives from Clerk, ignoring payload user IDs.
- Shared Firestore helper adds a document-page function without changing existing helpers.
- History does not yet ingest issued certificate events or onboarding changes; certificates are read directly from their real portfolio.

## Validation observed

- `npm run typecheck`: PASS.
- ESLint for every changed TS/TSX application file: PASS.
- `npm run test:workspace`: 18 PASS, 0 FAIL (domain, API-handler mocks, archive transaction mocks and existing workspace checks).
- `npm run prebuild`: 109 PASS, 0 FAIL across learning/credentials, intelligence, workspace and personal plan.
- `next build --webpack`: PASS before final history integration; final verification recorded in VALIDATION.md.
- Standard Turbopack build was blocked by the external node_modules symlink used by this runtime. Webpack resolves the same dependencies successfully. A pre-existing viem/ox dynamic dependency warning remains outside Workspace.
- Authenticated end-to-end login, real Firestore writes/pagination, two-account isolation, paid access, course mutation and certificate issuance have NOT been executed. Unit handler/transaction tests do not establish live service correctness.
- Chromium component-fixture QA executed at 360/390/768/1024/1440/1920, 200% CSS zoom, reduced motion and keyboard focus. No horizontal document overflow, broken images or JavaScript page errors were observed. Search, empty results, history filtering/pagination, preference persistence, restore defaults, dismissals and failed-save rollback passed against isolated synthetic test storage. Evidence is in evidence/browser-qa.json. This is not live Clerk/Firestore E2E.
- No Lighthouse, Core Web Vitals or WCAG conformance score is claimed.

## Artwork

Built-in imagegen, inspected then optimized to `public/images/workspace/command-center-v1.webp`, 1800 × 600, 120,332 bytes. Next Image supplies responsive widths. Decorative alt text is empty; all copy is live HTML.

Prompt: “Sophisticated photorealistic architectural global education observatory, fifty years in the future, restrained institutional design. Deep midnight navy and black, brushed dark metal, fine gold light accents, luminous blue atmospheric edge lighting. Glass globe installation on far right in a panoramic futuristic library looking over Earth at dawn. Left sixty percent dark quiet negative space for interface text. Wide 3:1 composition, cinematic realism, tactile materials, no people, lettering, logos or UI.”

## Files

- `src/app/profile/page.tsx`, `loading.tsx`, `error.tsx`
- `src/components/profile/GlobalWorkspaceOS.tsx`
- `src/components/profile/WorkspacePersonalSpace.tsx`
- `src/components/profile/WorkspaceCertificates.tsx`
- `src/components/profile/WorkspaceCommandCenter.module.css`
- `src/lib/workspace-control.ts`, `workspace-history.server.ts`
- `src/lib/activation-store.server.ts`, `firestore-admin-rest.server.ts`
- `src/app/api/workspace/preferences/route.ts`, `history/route.ts`
- `scripts/workspace-{home,control,api,history}.test.mjs`, `package.json`
- `public/images/workspace/command-center-v1.webp`

## Release gate

Production release is explicitly authorized. Build, domain tests, handler/transaction tests and component-browser fixtures passed. Preview private history rejects unsigned requests with HTTP 401. Real authenticated Clerk/Firestore journeys and deployed deny rules remain unexecuted/uninspected because no disposable authenticated account or Firebase administrator session is available. No protection settings or real member data were changed for testing. Release monitoring and final deployment status are recorded in VALIDATION.md.
