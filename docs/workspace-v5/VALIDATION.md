# Workspace release validation — 2026-10-20 UTC

## Observed checks

- 109 prebuild checks passed: learning/credentials 17, intelligence 72, Workspace 18, personal plan 2.
- Additional regression suites passed: navigation 7, mobile 19, platform/persistence 12. Together with prebuild: 147 automated checks passed. The persistence suite includes a simulated archive outage without losing authoritative course/country progress.
- TypeScript, scoped ESLint and git diff whitespace checks passed.
- Optimized Webpack production compilation passed. The original external-dependency symlink still prevents local Turbopack from resolving node_modules; Vercel's normal preview build is READY.
- Real Chromium component fixtures at 360, 390, 768, 1024, 1440 and 1920 pixels: no horizontal document overflow, broken images or JavaScript page errors.
- 200% CSS zoom exposed a header overflow; fixed with bounded controls and narrow-container metric layout, then retested without document overflow.
- Search/empty results, loaded-event filters, archive pagination, density persistence, hidden-module persistence, default restoration, dismissal and failed-save rollback passed using synthetic isolated HTTP storage. Fixtures do not simulate a live Clerk account or real Firestore transaction.
- Preview GET /api/workspace/history returned application HTTP 401 without a user session. /profile renders the sign-in redirect for unsigned requests.
- Vercel preview dpl_C4ukrz2oLPd5BxUGtyHK9p24mFCp is READY. Runtime error query returned no matching records in the checked 50-minute interval; that is not proof of exercised authenticated flows.

## Remaining external verification limits

No disposable authenticated Clerk account or Firebase administration session is available. Live two-account isolation, actual Firestore preference/history writes, real course checkpoint mutation, credential issuance and deployed deny-rule inspection were not executed. Existing billing, course and credential guards are preserved. No real member data, authentication protection, environment settings or database rules were modified to manufacture test activity.

The source-backed archive has the cross-provider outage limitation described in IMPLEMENTATION.md. No Core Web Vitals field metric or full WCAG conformance score is claimed.

## Reproduce browser fixtures

`scripts/workspace-browser-qa.cjs` uses the actual Workspace components and CSS, explicit Next service stubs, synthetic data and an isolated temporary HTTP server. It requires optional local Playwright/esbuild and a Chromium executable; these are not application runtime dependencies. Run after a completed build:

```bash
WORKSPACE_QA_ESBUILD_MODULE=/absolute/path/to/esbuild WORKSPACE_QA_CHROMIUM=/absolute/path/to/chromium node scripts/workspace-browser-qa.cjs
```

The script writes screenshots and a machine-readable result into docs/workspace-v5/evidence. These are explicitly marked synthetic fixtures.

## Publication

The user explicitly requested production publication after validation. The feature branch is being updated for PR #81. Final production deployment and commit are reported in the release response after the Vercel deployment reaches READY and its public/authentication checks finish.
