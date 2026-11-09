# TGPI Design System 2 · 9 November 2026

## Reconciliation

Baseline production: `7b922d7`. Implementation starts at its documentation-only descendant `f418528`. The existing Atlas wallet, payment isolation, learning records and translations are retained.

The inventory contains 72 page templates including dynamic routes, redirects and internal QA. The starting code already had Manrope, Cormorant, the approved crest, a product sidebar and a five-item mobile dock. The main inconsistencies were overlapping palette definitions, inflated surface effects, separate mobile/desktop search, oversized app-launcher artwork and page-specific visual constants.

## Decisions

- Canonical tokens: `src/app/design-tokens.css`. Existing variable names remain compatible. Color, text, spacing, radius, elevation, movement, density and layering share this contract.
- Official cream canvas, navy operational surfaces and gold accents. Small gold text uses the high-contrast gold token. Palette migration replaces 568 CSS colors and 626 utility colors across existing templates.
- Cormorant for acquisition storytelling; Manrope for controls, data and operational headings. No font dependencies added.
- Home uses an editorial canvas and existing art-directed WebP photography. Its visible research sample now selects Portugal, Canada or Japan and links to the same Country Fit planner. It does not fabricate user progress or suitability scores.
- One native command dialog for desktop/mobile with translated tool matching and on-demand country search. Ctrl/Cmd+K opens it; arrows navigate results; Tab stays in the dialog; Escape closes it and restores focus. Country API failure leaves tool search available.
- Existing fixed mobile navigation retains five destinations. Study routes suppress the dock. Admin and evidence tools adopt the same operational shell.
- Strongly typed primitives preserve native attributes: Button, Field, Badge, StatePanel, TableFrame, Tabs and Dialog/Drawer. Existing Surface3D and EditorialCard remain compatibility wrappers with restrained materials.
- Native full-document View Transitions are a progressive enhancement. Next client routing stays unchanged. No WebGL, scroll hijacking, animation library or custom cursor.
- Controls use 140–180 ms motion; navigation uses 300 ms. Reduced-motion styles apply platform-wide. Resting decorative float animation is removed.

## Application

Import primitives from `@/components/design-system`, or the individual component. Use semantic tokens rather than adding a page palette. Native input attributes, validation associations, button form attributes and accessible names must reach the DOM. Dialogs require a localized title and close label. Tabs support arrows, Home and End. TableFrame provides a labelled keyboard-scrollable region; its table must provide real headers and a caption.

`/internal/design-system` provides an interactive specimen in development and Vercel preview only; production returns not found. `/mobile-preview` is the existing internal responsive inspector.

Module CSS still owns page composition. Legacy features retain their data and interaction implementations; the migration is not a rewrite of billing, account permissions or education logic. Remaining legacy color values outside the migrated families should be reviewed by visual role before replacement.

## Art direction

Reuse the approved crest and existing editorial/country imagery. Maintain physical lighting, photographic materiality and negative space. Home uses existing mobile/desktop crops, Next image optimization, eager hero delivery and lazy secondary images. No invented institutional photography, fabricated partnerships or brand imitation.

## Reference principles reviewed

- [Linear](https://linear.app): product-led hierarchy, progressive density, compact operational controls.
- [Stripe](https://stripe.com), [Notion](https://www.notion.com), [Figma](https://www.figma.com), [Apple](https://www.apple.com): direct actions, concise labels, visible product value, controlled depth.
- [Scout Motors](https://www.scoutmotors.com): photographic object treatment and structured product exploration.
- [Pluralsight](https://www.pluralsight.com), [ClassDojo](https://www.classdojo.com): task-led discovery and clear audience entry points.
- [Igloo](https://www.igloo.inc), [By-Kin](https://www.by-kin.com), [Uncommon](https://www.uncommon.nl/studio): continuity and restraint are direction references; their motion-heavy interactions were not copied. Automated retrieval could not establish a full interactive audit of every requested reference, including Lando Norris, Iventions and Mat Voyce.

## Verification

- TypeScript: passed.
- Focused ESLint: passed for changed interaction components.
- Final full test suite: 460/460 passed, including 13 design checks for canonical AA text contrast, token alias integrity and stylesheet parsing.
- Production compilation: passed with Next.js 16.3.4.
- Browser matrix and release evidence: see `coverage.md`, `coverage-matrix.csv`, `browser-metrics.json`, `expanded-production-metrics.json`, `finalization.md` and `evidence/`.
- Follow-up review corrected the compact desktop search control and localized command descriptions, country discovery and save actions in six languages.

Contrast-token checks are not an exhaustive WCAG certification. Authenticated, destructive and payment states require their own fixtures; no real payment is created for a visual release. Independent Lighthouse lab measurements and the publication record are in `finalization.md`; no field Core Web Vitals claim is made.
