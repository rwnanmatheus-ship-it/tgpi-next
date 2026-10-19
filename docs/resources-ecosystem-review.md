# TGPI Resources ecosystem — implementation review

## Diagnosis

- Route: `src/app/resources/page.tsx`, inherited header/footer, Manrope/Cormorant Garamond and TGPI CSS tokens from the root layout.
- Previous content looked like articles with reading durations but linked to tools. Documents linked to `/premium-waitlist` despite the existing `/passport` experience.
- Confirmed routes: `/countries`, `/compare`, `/country-fit`, `/courses`, `/certificates`, `/passport`, `/profile`, `/global-key`.
- `/dashboard` redirects to `/profile`. `/profile` and `/global-key` require a user. `/passport` has guest and member experiences. `/premium` uses `requirePremium`; `/pricing` is the membership presentation.
- Plan copy and price reuse `src/lib/subscription-plans.ts`. Billing and access guards are unchanged.

## Product and architecture

Server-rendered page, five editorial objectives, one small client interaction module, native anchors, desktop objective navigation with active-section observation, native FAQ disclosures, guest/member primary CTA, central plan data, metadata and a single H1. Essential resource links and copy remain server rendered. English copy follows the site's existing language.

No new analytics claims, invented usage metrics, article reading times, country scores or additional dependencies. Interface previews are explicitly workflow overviews. Catalogue availability and certificate conditions are qualified.

## Original assets

Built-in image generation; WebP quality 90, no upscaling:

- `public/images/resources/tgpi-resources-library-v1.webp`: 1774 × 887, 272216 bytes. Cinematic contemporary university reading room overlooking a coastal international city at blue hour; two adults studying, navy upholstery, brass and stone; no text, logos or screens.
- `public/images/resources/tgpi-resources-city-v1.webp`: 1983 × 793, 377126 bytes. Contemporary university terrace overlooking a plausible coastal city at morning; researcher from behind, brass railing, navy lounge chair; no text, logos or collaged landmarks.

Both prompts requested at least 2560 px or the highest native resolution supported. The tool returned the dimensions above. Original PNGs remain in the session's generated images folder. Official crest reused from `/brand/tgpi-crest-metal-v3-256.png`.

Only the hero is priority loaded. Other editorial images use Next Image fill, reserved containers and responsive sizes. Assets total about 634 KiB before Next optimization.

## Validation

- `npm run typecheck`: passed.
- ESLint for both changed TSX modules: passed.
- `npm run build`: passed; production compile and static generation completed. Required prebuild suites: learning credentials 17/17, intelligence 72/72, workspace 4/4, personal plan 2/2.
- Full-project lint: passed with zero errors and one existing warning. Existing `src/lib/authGuard.ts` navigation warning is unrelated.
- Real browser rendering of an isolated component preview: Chromium headless, 320/390/768/1440/1920 px. Zero horizontal overflow, zero broken images, one H1, valid anchor targets, zero page errors. Selector and FAQ opened correctly. Visitor/member CTA fixture and reduced-motion scroll behavior checked. Keyboard focus reached a link. Desktop/mobile screenshots visually inspected.

## Limits and release state

The isolated review preview uses the same page and interaction source with lightweight Link/Image/auth adapters and embedded images/fonts. It excludes the shared application chrome, live authentication, live Next image delivery and payments. The member state is a labelled fixture; it is not an authenticated account or Premium test.

The full local production route returned HTTP 500 with Clerk's `Missing secretKey`. No server key or authenticated account is available. Root layout, shared header/footer, auth, billing and guards were not modified; their end-to-end behavior has not been verified in this environment. Contrast is based on existing tokens and reviewed colors, not a formal automated WCAG audit. No Lighthouse or measured CLS/LCP claim is made.

Changes are committed locally on `feat/resources-ecosystem-v4`. Automatic approval review rejected the remote branch push because repository upload was not considered authorized. No remote branch, PR, hosted preview or production deployment was created. Remote preview requires an approved branch upload followed by Vercel validation.
