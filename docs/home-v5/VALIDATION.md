# Home V5 validation — 19 October 2026

Code commit tested: `c79877c341f805835b3a922d0b1c9265a3e32ea3`.

- TypeScript strict: pass.
- Full ESLint: zero errors; one pre-existing warning in `src/lib/authGuard.ts` (internal navigation through location.assign).
- Home and shared navigation: 16 tests passed, zero failed. Includes supported goal vocabulary, safe defaults, valid focusable chapter targets, existing auth-return and commercial-offer contracts.
- Production build: pass, including 95 prebuild tests (learning credentials 17, intelligence 72, workspace 4, personal plan 2). Home remains static.
- Vercel preview `dpl_GJFrMkRtaRCQPZmcEtgefoTZdUw6`: READY, commit verified, GitHub Vercel status success. Hosted Next build is the authoritative clean release build. Local incremental Turbopack cache reload failed and was recovered using a clean output directory; one local build scanned an untracked cache backup and emitted malformed-utility warnings. The backup is excluded locally and is not committed.

Hosted-browser checks at 1363px viewport:

- One H1, no horizontal overflow (scrollWidth 1348px), no broken visible images.
- Hero uses new editorial V5 asset through Next image optimizer at configured quality 88.
- Work goal updates actual content and URL to `?goal=work`; restored after browser back and full reload.
- Selecting Canada and submitting the native GET form opens `/country-fit?goal=work&country=canada`. Real Country Fit controls show Canada and Work.
- Chapter navigation scrolls to Explore; observer reports chapter 03; section top ~160.6px, index bottom 143px, header bottom 83px. Content is not hidden by either navigation layer.
- Native capability disclosure opens by keyboard Enter and reveals its preparation guidance.
- No application errors observed. Preview has expected Clerk development-key warning, existing Clerk structural-CSS warning and unrelated browser-extension metadata errors.

## Explicit limits

The current browser control does not expose viewport resizing. A local SSR harness was prepared for the seven requested widths, but its local-file navigation was rejected by browser URL policy. No alternate surface or policy workaround was attempted. **New visual mobile/tablet/1920px screenshots, native 200% zoom and automated axe results were not obtained for V5.** Responsive source/CSS contracts were reviewed, but that is not equivalent to device testing. V4's earlier seven-width evidence must not be presented as V5 validation.

No authenticated free/Premium sessions, account creation, saved-plan writes, payments or subscriptions were exercised. Existing access/billing behavior is unchanged. No new field LCP, CLS or INP evidence is available; no performance guarantee is made.
