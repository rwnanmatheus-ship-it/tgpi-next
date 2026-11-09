# Evolution release validation — 9 November 2026

## Scope and decision

This release delivers the operational navigation, catalogue policy correction and read-only learning continuity described in IMPLEMENTATION.md. It is an incremental release, not completion of the full master prompt. Existing early-access learning disclosures, certificate review gates, billing entitlements and data ownership remain in force.

Final inspection also fixed a reproduced PWA dismissal bug: subsequent `beforeinstallprompt` events could override a stored dismissal. The handler now respects both persisted and in-memory dismissal, including when browser storage is unavailable. Comparison headings, source caveats and geographic regions received localized copy, and the builder heading was shortened for mobile. Clerk's sign-in presentation substitutes TGPI for the provider's technical application name.

## Automated evidence

Environment: isolated checkout of production, installed Next.js 16.3.4, existing dependency lockfile. No dependency upgrades.

| Check | Result | Scope |
| --- | --- | --- |
| Baseline TypeScript and tests | PASS, 390 tests | Before implementation |
| `node --experimental-strip-types --test scripts/*.test.mjs` | PASS, 399 tests, zero failures/skips | Final implementation |
| `npm run typecheck` | PASS | Final implementation |
| ESLint for changed application files | PASS | New modules and final changed TS/TSX files |
| `git diff --check` | PASS | Final implementation |
| `npm run build -- --webpack` | PASS | First release candidate, including all page generation |
| Vercel staging build | READY | 63a6abfdaaa74973c739cf103db6ed352de11b71; final corrections receive another deployment |

Nine added tests cover the unified projection/API (8) and repeated PWA install prompts, reload and unavailable browser storage (1). Existing locale rendering tests exercise the actual new continuation component in six locales. No release gate was removed or disabled.

The standard local Turbopack build cannot follow this runtime's external node_modules symlink. Webpack compiled successfully; Vercel uses a normal installation. Existing optional viem/ox dependency warnings were observed. Neither warning is represented as a test failure or silently suppressed.

## Browser evidence

Initial staging deployment: `dpl_7Xn3Q86mMpoxgJNwdBcq1N2wfZZF`, https://tgpi-next-7fiy0ncqx-rwnanmatheus-ship-its-projects.vercel.app.

- Chromium desktop and mobile, catalogue at 320/360/390/768/1024/1440/1920 px: document scroll width equalled client width at every size. Screenshots inspected at desktop and 390 px.
- Searching Power BI yielded its single professional course. Portuguese instruction-language selection and search persisted after reload in the URL.
- Desktop sidebar collapsed and reopened; its command button opened the real app launcher and focused its search.
- Comparison selector changed Portugal to Germany; the resulting URL retained Germany, Canada and Japan.
- Comparison at 390 px: no document overflow; the initial verbose heading and reappearing install prompt motivated the final corrections above.
- No Vercel error-level runtime logs were returned for the initial staging deployment in the 30-minute inspection window.
- Connected browser reports include extension errors and an unrelated instant-preview origin hydration error. These were not classified as TGPI application errors. Browser translation overlays also alter displayed text; source-level six-locale rendering tests remain the controlled locale check.

## Data, security and compatibility

The new summary API derives uid from Clerk's server session, returns only projected learning metadata, excludes submitted answers and uses private/no-store caching. Tests cover unauthenticated rejection, request-owner isolation and partial source availability. No migration, real charge, new subscription, changed free access, rewritten progress, course approval or credential issuance was performed. Existing records remain authoritative.

Production base: `ccb9ff5617d0dca2d494ca07893ccc20607919f9`; previous deployment: `dpl_2SUnba6ugDNL5utUqZKtvgrP8TFs`. Publish with a fast-forward lease against the observed branch head. Rollback uses the previous Vercel production deployment or an additive revert commit; never force-reset concurrent work. No data rollback is required.

## Explicit remaining acceptance

The full programme remains open. All-route manual acceptance, controlled Free/Premium/reviewer/moderator E2E accounts, human pedagogical review, ten complete professional certification journeys, Stripe sandbox lifecycle, deployed Firestore policy inspection, Atlas live generation/budget verification, durable cross-provider history redesign, remaining art families and complete editorial localization are not established by this release. Screen-reader, WebKit/Firefox and field p75 performance checks were not run. The route CSV is an inventory and must not be presented as completed route acceptance.

Production deployment and authenticated read-only smoke results are recorded separately after the release is live.
