# TGPI Home — guided journey V5

## Scope and evidence

Base: production commit `0eb353fc10c875af2a74fe4bfa38492ad7c5f27f` (Home V4). The supplied screenshots show the approved editorial direction. Preserve it, the official crest, the shared header/footer, English source language, existing authentication, billing, access permissions, course catalogue and consent logic.

Reproduced in source: V4 mobile `<source>` specifies one 720px WebP without density or width descriptors, overriding Next's responsive desktop image candidates. On high-density mobile screens this limits detail. Default quality 75 further compresses the already compressed source. This is a concrete delivery issue; the screenshots alone do not establish a network or rendering bug.

## Changes

- Seven newly generated editorial photographs, reviewed for faces, hands, objects and perspective. No stock photos, generated interface text, official documents or testimonials. Illustrative assets; no legal-exclusivity claim.
- Native output actually delivered: **1536×1024**, despite requesting a larger useful size. No artificial upscaling or 4K claim. Mobile: **1280×960** hero and **1280×800** other scenes, cropped without enlarging the source. `images.json` records dimensions, source provenance and file sizes.
- WebP master quality 94 desktop / 92 mobile. Runtime Next optimization quality 88, already allowed by the project. `EditorialImage` uses server-side `getImageProps`, responsive `srcset` for both crops, accurate `sizes`, reserved aspect ratios and lazy loading except the hero.
- Chapter navigation sticks below the measured shared header. ResizeObserver tracks the actual header height; IntersectionObserver follows the visible chapter. Native anchors on desktop and a labelled select on mobile. Short landscape viewports use a static index. No scroll hijacking, forced snapping, autoplay or full-screen overlays.
- Goal explorer: supported study/work/live/learn choices produce different practical preparation guidance. Choice is held in the Home URL (`?goal=...`) and restored after reload/back navigation. A native GET form transfers `country` and `goal` to the existing Country Fit route. This temporary choice does not overwrite the member's saved profile. Country Fit retains explicit authenticated saving.
- Four capabilities retain their real destinations, with clickable images and native expandable first questions. Courses and comparison still use the real catalogue/evidence components.
- Dynamic controls have labels, visible focus and sufficient touch targets. Reduced-motion preferences are respected. No additional libraries or analytics introduced.

## Image generation

Built-in image generation; one independent photograph per scene. Shared direction: realistic editorial photography; navy, ivory and restrained warm brass; controlled cinematic window light; natural skin/materials; no words/logos/watermarks/UI/official documents. Requested target 3072×2048; delivered resolution above is authoritative.

Prompts by scene:

1. Hero: adult woman at a contemporary oak desk planning international life, navy blouse, blank notebook, neutral folder, laptop facing away, plausible city apartment window. Full head and natural resting hands, crisp fine detail.
2. Decision: overhead research desk with unlabeled world atlas, blank ivory option cards, navy notebook and pencil; organized evaluation of destinations.
3. Country: navy/ivory terrestrial globe on brass stand, map and neutral reference books, contemporary research room and angled daylight.
4. Preparation: open navy planning folder with blank checklist, notebook, pencil and ceramic cup; personal organization without official documents or data.
5. Learning: three adult peers in a contemporary learning studio, candid intercultural discussion around a table with notebooks and laptop; plausible gestures and natural expressions.
6. English: two adults of different backgrounds communicating naturally outside a contemporary café, everyday practical language context, no signage.
7. Budget: overhead relocation planning desk, blank calculator, blank notebook, folder, pencil and apartment keys; no personal or financial data.

Runtime paths: `public/images/home/editorial-v5/{hero,decision,country,preparation,learning,english,budget}-{desktop,mobile}.webp`.

## Verification

See `VALIDATION.md` for completed checks and remaining limits. This revision does not create accounts, subscriptions, charges or change saved member plans during testing.
