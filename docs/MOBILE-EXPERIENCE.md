# TGPI Mobile Experience V1

## Scope and desktop contract

Built from production commit `9caa9add003262f6ffdda676bbee34d922a08444`, independently of `feat/global-seo-engine-v1`. Do not merge or publish the pending SEO branch as part of this release.

- Dedicated phone experience: viewport width <= 767 CSS pixels.
- Existing tablet and desktop layout: >= 768 CSS pixels.
- The original desktop components, brand tokens, metadata, routes, data, authentication and billing contracts remain intact.
- `src/app/mobile.css` contains all visual overrides, under explicit max-width media queries. Only hiding mobile-only components and a layout-neutral `display: contents` wrapper are global.
- Same URLs and backend on mobile and desktop; no mobile subdomain, user-agent routing or duplicate account system.

## Components

- `MobileNavigation`: phone header, five-destination bottom navigation, native modal menu, on-demand country search, keyboard-aware dock and safe-area spacing.
- `MobileContentFrame`: existing main-content wrapper with route-aware attributes for scoped CSS.
- `MobileHome`: compact home experience with the existing TGPI art, six working decision presets, country cards, connected product routes and account entry.
- `MobileMicroLesson`: three educational scenarios with answer feedback and an explicit practice-only label. It does not invent course progress, XP or certificates.
- `MobilePageGuide`: reusable contextual shortcuts for longer research tools.
- `mobile-experience.ts`: pure, tested search and route helpers.
- `/api/mobile/countries`: static, public, minimal index derived from the existing country dataset. Loaded only when search opens. No private data.

## UX and accessibility

Native `dialog.showModal()` supplies focus containment, background inertness and Escape support. Closing restores the initiating control; navigation remounts the mobile shell to close open panels. Opening a panel locks background scrolling. Resizing to desktop closes it.

Country search handles loading, failure/retry, no matches, capital names and accent normalization. The search index is not bundled into every route. Reduced-motion settings are respected. Form inputs use at least 16px to avoid iOS input zoom. The comparison tray sits above the bottom navigation. The dock is absent from sign-in, sign-up, checkout and lesson routes.

Countries brings search and filtering ahead of the map on phones while preserving desktop order. Country dossiers retain chapter navigation. Compare preserves horizontal data-table scrolling and labels it. Learn includes a no-account practice preview; course access still follows the existing authorization flow.

## Verification

Run `npm run test:mobile`, `npm run typecheck`, `npm run lint`, and `npm run build`.

`/mobile-preview` is an internal responsive QA harness, available only in development or Vercel Preview. It emits noindex and returns 404 in production. It must never be added to the sitemap. Use it to check 320, 375, 390, 430, 768, 1280 and 1440px widths when direct browser viewport controls are unavailable.

Verify home, countries, Portugal, compare, courses, documents, pricing and sign-in. Test search, empty results, goal selection, country comparison tray, menu focus/Escape, exercise answers and navigation. Do not create real accounts, make purchases or mutate existing member data during QA.

Before production: compare visible desktop content and geometry with the current public release; check the remote production branch has not advanced; use a fresh production build so Preview environment variables are not promoted into Production.

## Out of scope

No SEO release, editorial/factual corrections, pricing changes, new payment behavior, service worker/offline caching of private data or changes to Vercel configuration.
