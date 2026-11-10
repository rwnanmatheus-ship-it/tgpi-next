# TGPI cinematic collection · 9 November 2026

30 new AI-generated photographic illustrations, produced with the built-in image generation tool. The prompts are retained in `prompts.json` and `continuation-prompts.json`. The imagery is conceptual: it does not depict an actual TGPI campus, students, faculty, endorsements or verified destination evidence.

The collection uses editorial cream, deep navy and restrained brass, natural light and physically plausible work/learning scenes. Each subject has a central composition that stays readable on a mobile card. Native originals are 1672 × 941; delivery variants are 480, 800, 1200 and 1600 px wide, in AVIF and WebP. These are not marketed as 4K originals.

## Placement

- Home: global-horizon hero, research, evidence, preparation and learning cards, English and budget course previews.
- Course catalogue/detail/dashboard: 27 course identities use the shared mapping in `src/lib/cinematic-art.ts`, including all ten professional pathways. Planned courses retain their planned status.
- Countries: research image in the discovery header. Destination-specific evidence, maps and flags are preserved.
- Documents/passport: document preparation imagery.
- Workspace, personal plan, certificates and institutional templates: shared responsive image primitives.
- About, Resources, Premium/Pricing and authentication: the new library, learning and preparation scenes.
- Community: conversation, arrival and shared learning. User-uploaded pictures are preserved.
- Compare: a dedicated comparison scene in the heading, separate from factual country records.
- Atlas: a dedicated intelligence scene in the empty full-page conversation only. The embedded support widget retains its compact form and official owl.

The exact static replacements are in `replacement-map.json`. `asset-manifest.json` records dimensions and file sizes. Original image URLs remain available for compatibility; code and image discovery reference the new versioned assets.

## Delivery and review

`CinematicImage` emits native AVIF/WebP picture sources with accurate sizes, stable dimensions, eager loading only when requested, and lazy secondary media. Home and course cards no longer wait for an on-demand image conversion. The versioned asset folder has immutable caching. No image-loading library, scroll animation or new browser dependency is introduced.

`/internal/art-direction` provides the complete gallery in preview/development only; production returns 404. The generation/encoding workflow uses `scripts/encode-cinematic-art.mjs` with an explicit source manifest.

This image release does not claim to complete every privileged state of the broader design audit or certify WCAG across the entire platform. Payment, identity, enrollment and approval rules are unchanged. Final verification and publication evidence will be recorded with the release.

## Completion batch

Four additional scenes are delivered with distinct URLs to preserve immutable cache correctness:

| Scene | Placement |
| --- | --- |
| community-global-exchange | Default Community hero; uploaded community covers retain precedence. |
| global-documents-precision | Public and signed-in Documents preparation workspace (`/passport`; `/documents` redirects there). |
| workspace-global-focus | Signed-in Global Workspace mission header. |
| learning-achievement | Progress header and next-certificate illustration; official crest and credential data are preserved. |

All 30 scenes have 240 encoded variants. The complete collection is 15,054,675 bytes on disk across all sizes/formats; each device downloads its selected variants. The picture wrapper does not add grid/flex items when used as a fill background.

Local release validation: 469 automated tests passed, TypeScript passed, optimized Next.js production build passed. Browser and production observations are recorded separately; private member state requires a real authenticated session and is not inferred from a public page.
