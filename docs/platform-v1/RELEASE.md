# TGPI integrated platform release — 2026-10-19

The user explicitly authorized completing the reconstruction and publishing to production on 2026-10-19. This supersedes the release hold in the increment-1 review. The deployment target is Vercel project `tgpi-next` (`prj_h2jvhmmxV4MGyvdTWEjcqO4rxdIk`), team `team_BWajFMOKTF5waYCr84DUVIjJ`, production branch `fix-deploy-hoje`, domains `theglobalpolymath.com` and `www.theglobalpolymath.com`.

## Implemented experience

The application uses one shared viewport shell, journey registry, responsive navigation, spatial material family and footer composition. Existing healthy area-specific layouts, the crest, identity, billing, storage and data contracts remain intact. This is an integrated evolution of the existing platform, not a replacement of every existing component.

| Area | Release scope |
| --- | --- |
| All routes | Shared shell owns viewport height; one focusable skip destination; consistent spacing and reduced motion; footer owns mobile dock clearance. |
| Home, About, Resources | Preserve the recent cinematic editorial layouts and apply shared shell, accessibility and footer fixes. |
| Countries and country dossiers | New country exploration banner; source collection streams behind the page presentation; single-pass observation indexing; URL-persisted query, region, selection and result limit; shortlist saving directly from cards; existing dossiers and atlas remain compatible. |
| Comparison | Shared cinematic banner, direct builder anchor, streamed statistical evidence, optional browser storage cannot prevent comparing/saving. |
| Country Fit and Intelligence | Area-specific institutional banners, same hierarchy and materials as the other research tools; existing evidence and personal-context logic retained. |
| Workspace, Plan, Premium, Settings, Ranking and member models | All consumers now receive the real course catalogue for learning continuity. The latest unfinished real course and remaining lesson replace the old fixed English-course link. Retained legacy records cannot override canonical current records. |
| Plan | New responsive editorial artwork, clearer product copy and corrected end spacing. |
| Progress and Account | Shared cinematic rank presentation; appropriate h1/h2 level when embedded in settings; existing ten-rank rules, limits and earned progress retained. |
| Learning, lessons and assessments | Existing recent catalogue and learning surfaces retained; focused lessons/certification omit extra journey rails and mobile dock. Progress synchronization belongs to the client provider; redundant server polling and Workspace focus listener removed. |
| Documents and certificates | Existing recent layouts and eligibility rules retained; global journey/continuation, spacing, focus and synchronization integrated. No new documents or certificates are fabricated. |
| Notifications and account | Existing inbox/profile workflows retained; one skip target, shared continuation and matching typography/materials. Email delivery remains explicitly unconnected. |
| Header and footer | Existing responsive institutional navigation, official crest and legal links retained; matching shared palette and corrected clearance. No silent brand replacement. |
| Global continuation | In-flow related next step on core areas, with a real link back to Workspace; no fixed extra header or fabricated personal recommendation. |

## Reliability and compatibility

- Progress writes send only `tgpiActivationV1`, rather than a stale copy of unrelated private metadata. Clerk's documented deep-merge semantics preserve unrelated fields. No historical record is deliberately deleted.
- Client progress providers reconcile same-tab saves, sibling-tab messages, reconnect and foreground checks while rejecting snapshots invalidated by local mutations.
- Server-rendered account areas reconcile with debouncing; client learning/research pages do not also poll server-rendered payloads.
- Storage-denied PWA and comparison flows retain essential functionality.
- Saving a country provides visible feedback and recoverable failure messaging.
- Existing URL aliases, identifiers, free/Premium guards, price validation, Stripe signatures, assessments and signed-credential criteria are preserved.
- `TGPICard` exposes compatible institutional/content/action/indicator variants and semantic material/interaction props while preserving its legacy default.
- No WebGL dependency or AI service was added. No private data was added to PWA caches.

## Imagery and performance

The new original photograph and responsive crops are documented in `REVIEW.md` with exact prompt, dimensions and byte sizes. They are used in Workspace, launcher, country exploration and Plan. Other areas use their existing exclusive local artwork. Images keep responsive dimensions and actual interface text stays in HTML.

Country and comparison presentation no longer waits for the statistical collection before it can stream. This is an architectural improvement, not a measured LCP claim. No field p75 LCP/INP/CLS values are asserted.

## Evidence and limitations

- Entire script suite: 224 tests passed, zero failed. Includes real reducer/persistence functions with only infrastructure replaced for isolated tests.
- TypeScript and production build are required before release; deployment readiness and commit are checked through Vercel after merge.
- ESLint: zero errors; one pre-existing legacy Firebase document-navigation warning remains.
- `git diff --check` passed.
- The earlier failures in two Workspace source assertions were reproduced on the base and updated to its actual CSS-module grid. Duplicate skip IDs were corrected rather than excluded from tests.
- A fresh local Turbopack build was required after a local generated-cache database error. No application data was involved.
- Hosted Preview read through Vercel authenticated fetch returned 200. Direct browser Preview access encountered Vercel Authentication. Production public browser baseline at 1363 × 936 had no horizontal overflow and one skip target.
- No claim of full browser coverage at 360, 390, 768, 1024 and 1440 px, WCAG certification, or measured field vitals is made. The browser available here exposes no viewport emulation API.
- No authenticated Free/Premium test identity was available in the browser; real Stripe Test Mode checkout, cross-device persistence, profile mutation and certificate issuance were not executed. Automated logic tests do not replace these real service checks. No live financial transaction was attempted.
- Full atomic coordination of concurrent progress writes across Vercel instances remains a storage architecture limitation. Removing unrelated metadata from the update reduces cross-domain overwrite risk but is not a cross-instance transaction.

## Release and rollback

Release through PR #75 into the existing production branch. Verify Vercel READY, exact Git SHA and public domain rendering. Keep service errors distinct from deployment protection. Revert the release commits or restore the prior production deployment if a regression is observed. This release has no schema migration, user deletion, subscription change or credential rotation.

Next verification work, when test access is available: five-width browser matrix, actual Free/Premium journeys, Stripe test checkout → webhook → access/revocation, assessed learning → signed certificate → verification/PDF, two-device concurrent writes, keyboard/zoom/contrast and field-vitals instrumentation. These unexecuted checks remain disclosed after publication.
