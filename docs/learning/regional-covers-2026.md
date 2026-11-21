# Dedicated photography for the 500 regional Academy courses

The regional catalogue previously reused ten broad category illustrations. Each of its 500 courses now resolves to its own subject-specific illustrative photograph through the shared `courseArtwork` function. Existing Academy, occupational-market and international-expansion covers retain their URLs.

## Asset contract

- One WebP per exact course ID in `public/images/courses/regional-covers-2026/`.
- Landscape 1536 × 1024 pixels; maximum 420,000 bytes per image.
- Original generated illustrations of the course's professional activity, not photographs of TGPI campuses, actual students or real partner institutions.
- Images contain no added TGPI logo, certification claim or university affiliation.
- The regional listing provides descriptive alternative text.
- The existing catalogue continues to combine search, region, professional area and access filters.

## Validation

Run `node scripts/regional-covers-manifest.mjs` after any asset replacement to verify coverage, dimensions, file size and unique image hashes and refresh the manifest. The manifest records course title, region, professional area, dimensions, byte count, SHA-256 and generated-image provenance for every file.

Run `node --experimental-strip-types --test scripts/regional-covers.test.mjs` to verify that the catalogue, image resolver, filesystem and manifest agree and that previous catalogue artwork and unknown-ID fallbacks remain compatible.

The prompt inventory in `regional-cover-prompts-2026.json` records the precise course topic, role, regional context and composition/lighting variation used to brief the photographs. Every brief asks for a realistic subject-specific workplace or academic laboratory, professional activity, plausible equipment and materials, and no logos or watermark.
