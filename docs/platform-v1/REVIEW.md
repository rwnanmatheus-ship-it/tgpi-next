# TGPI integrated application — review increment 1

Date: 2026-10-19. Base: `6e1211d79deac1aa22bf960feea2c28d45ccf739` (`fix-deploy-hoje`).
Status: implementation for review, not production release or completion of the full reconstruction brief.

## Diagnosis and decisions

Static inspection covered 60 page entry files, shared layouts, navigation, Workspace model, progress API, billing, learning credentials, notifications, telemetry and PWA runtime. No repository AGENTS.md exists in this checkout. Stack: Next.js 16.3.4 App Router, React 19.2.4, TypeScript strict, Tailwind 4, Clerk, Stripe and Firebase 12. Existing domains and services remain in place. `docs/PROJECT_STATE.md` is a historical snapshot; its July infrastructure and subscription findings are not evidence of the current deployment.

| Priority | Route/component | Confirmed source evidence and impact | Implemented correction |
| --- | --- | --- | --- |
| P1 | `/profile`, `global-workspace.ts` | Any saved learning progress linked to `/courses/global-english-2026`, including other courses. | Resolve against actual catalogue, prefer unfinished learning, resume remaining lesson, fall back to overview after version changes; do not generate links for removed courses. |
| P2 | Global mobile chrome, `navigation-system.css` | Dock clearance was added to both last page child and every footer, including nested footers. Creates excess spacing and unintended padding. | Reserve dock clearance at shared global footer only. Keep local content spacing. |
| P2 | Global shell and `TGPIPageShell` | Full viewport minimum heights nested under external chrome. | Flex shell owns viewport height; shared shell and direct page minimum heights no longer add another viewport. Remove Workspace sidebar viewport minimum. |
| P2 | `/about`, `/resources`, `/admin/notifications`, `/notifications` | Four page-level `main-content` IDs duplicate the frame ID. Reproduced by original mobile test in detached base checkout. | One focusable skip target owned by frame. |
| P2 | App launcher, `/profile/security` and `/verify/global-key` | Per-module prefix checks can activate two modules although lookup resolves one. | Active state uses the single most specific module resolver; regression tests cover overlaps. |
| P2 | PWA runtime | Unprotected localStorage reads occur before runtime listeners are attached. Storage denial can abort connectivity setup. | Storage failure preserves runtime and in-memory dismissal. |
| P3 | Premium telemetry | Only `/pricing` generated visit event; `/premium` and `/upgrade` omitted. | Cover all three existing commercial routes. |

These are confirmed code defects and automated reproductions, not claims of observed production UI behavior. No P0 issue was reproduced. Visual hypotheses still need browser confirmation.

## Architecture and integration

The shared composition is `AccessAwareChrome → MobileContentFrame → JourneyNavigation + existing page → GlobalFooter`. Auth routes retain focused composition. The journey registry maps Explore → Compare → Plan → Learn → Prove → Advance; it represents navigation, never inferred completion or permission. No forced sequence or local browser history containing private activity is added.

| Domain | Existing source of truth retained | Scope and verification boundary |
| --- | --- | --- |
| Identity and profile | Clerk identity and normalized account/onboarding metadata | Profile remains server-rendered; no identity migration. |
| Subscription and access | Server billing record in Clerk private metadata, Stripe lifecycle, server guards | No price, entitlement, webhook or checkout changes. Live subscription and test purchase not exercised. |
| Favorites, comparisons, document checkpoints, course progress | `tgpiActivationV1` private metadata via authenticated `/api/progress` | Existing mutation and sync contracts preserved. Workspace continuation reads existing records and real course catalogue. |
| Learning assessment and credentials | Firestore REST transaction storage and server signing | No eligibility criteria relaxed; lesson completion is not certificate eligibility. |
| Notifications | Existing Firestore inbox or account fallback, reconciliation | No delivery provider added. Email delivery is not claimed to be connected. |
| Workspace and ranks | Derived models and existing progress synchronization | No artificial scores, achievements or simulated activity. |
| PWA | Existing public shell service worker | No private or billing data added to offline caches. |

Existing progress sync uses same-tab events, BroadcastChannel, focus refresh and periodic reconciliation; this is not guaranteed instantaneous synchronization between devices. The 6,000-byte metadata budget and read-modify-write semantics in activation storage deserve load/concurrent-session tests before a storage migration. Concurrent lost writes are a risk hypothesis, not a reproduced incident here.

## Visual system and imagery

`src/app/app-system.css` adds semantic spacing/motion/focus tokens, shared journey surfaces and viewport composition. Existing palette, fonts, crest, responsive header and spatial CSS are preserved. Module cards adopt the existing 3D family. Native scrolling and reduced motion remain supported. The journey is in document flow and is not an additional fixed header.

New reusable files: `JourneyNavigation.tsx`, `PlatformBannerImage.tsx`, `platform-journey.ts`, `learning-continuity.ts`.

Built-in imagegen generated one exclusive atmospheric photograph for the empty-context Workspace mission and app launcher. Country-specific mission imagery remains country-specific. Text and controls are HTML. The globe is illustrative, not a geographical dataset. Original is 1536 × 1024. Repository assets:

| File | Dimensions | Bytes |
| --- | --- | --- |
| `public/images/platform/global-study-v1.webp` | 1536 × 1024 | 112490 |
| `public/images/platform/global-study-v1-768.webp` | 768 × 512 | 41076 |
| `public/images/platform/global-study-v1-mobile.webp` | 640 × 771 | 54696 |

Prompt: “Use case: photorealistic-natural. Asset type: exclusive cinematic editorial banner for TGPI global education application's workspace and app launcher, 1536x1024 landscape. Scene: an architecturally refined international study space at blue hour, a real physical brushed brass globe on a dark graphite desk on the RIGHT side, a closed deep blue notebook, subtle warm brass reflections, expansive windows overlooking a credible contemporary global city without recognizable invented landmarks. Sophisticated institutional educational atmosphere, realistic materials, subtle cinematic light, deep navy and graphite with restrained gold accents, high detail, natural photography with an architectural lens. Composition: left half dark uncluttered negative space for separately rendered accessible interface text, globe and window detail on right half, meaningful objects remain inside central safe region for mobile crops. No lettering, no logos, no UI, no holograms, no neon, no watermarks. Preserve believable globe shape; this is atmospheric illustration rather than an exact map.”

## Measurement

Existing `TGPI_FUNNEL_ANALYTICS_ENABLED` and consent/GPC gates remain authoritative. Successful progress mutations now emit aggregate comparison-saved, learning-started, learning-checkpoint and document-checkpoint events. No user ID, email, country, course, document, payment or form values are included. These are event counts, not unique users or conversion estimates. Assessment completion and retention cohorts require a separate measured specification; neither is fabricated by this increment.

## Validation and limits

- Initial typecheck passed; initial lint: zero errors and one pre-existing legacy Firebase `window.location.assign` warning.
- Complete script suite after changes: **219 passed, 0 failed** (`node --experimental-strip-types --test scripts/*.test.mjs`).
- Build passed with production compilation, TypeScript and 132 static pages. Required prebuild suites passed.
- Added regression coverage for nested journey routes, exclusive active module, actual course continuation, already-completed lessons, version changes and removed courses.
- Updated stale source assertions for the existing Workspace CSS-module grid; original failures reproduced on detached base checkout. Tests are structural/unit checks, not browser coverage.
- Image inspected visually; responsive files validated through image metadata.
- Browser inspections at 360, 390, 768, 1024 and 1440 px were **not executed**. This environment has `SITES_MANAGED_LINUX_CONTAINER=1` and no `$control-browser` capability. Sites skill explicitly says: “If `$control-browser` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.”
- No authenticated/Premium session, Stripe test payment, persisted profile update, certification issuance or cross-device synchronization was exercised. No production credentials were pulled or changed.
- No measured LCP, INP, CLS, Lighthouse or WCAG conformance claim. Responsive CSS and focus/reduced-motion implementation are not substitutes for those tests.

## Remaining work by dependency and impact

1. P1: stage authenticated Free/Premium test identities and Stripe Test Mode; verify profile persistence, comparisons → Workspace, course checkpoint → reload → continuation, assessment → signed certificate, checkout → webhook → access/revocation.
2. P1: exercise simultaneous account writes across tabs/devices and webhook ordering. Plan an additive, reversible migration only if concurrency/metadata limits require it.
3. P2: enable the supported browser controller, inspect all page endings and responsive breakpoints, keyboard/zoom/contrast, including lesson content and focused authentication pages. Resolve actual visual defects before approval.
4. P2: measure page performance with representative network/CPU settings and collect consent-compatible field vitals before expanding motion or high-resolution imagery.
5. P3: extend area-specific composition after the shared foundation is visually approved; this increment is not a redesign of all 60 pages.

## Review and rollback

Keep this branch separate from `fix-deploy-hoje`. No production publication is authorized for this reconstruction request. Revert the review commit to restore the previous UI; no data migration, schema change or credential rotation is needed. Do not merge until blocked user journeys and browser QA are complete.
