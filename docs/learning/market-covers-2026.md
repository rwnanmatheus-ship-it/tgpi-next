# Market course cover release

This release adds one individually generated editorial cover for each of the 100 market courses introduced in November 2026. Each composition follows the course's occupational activity and avoids titles, logos and watermarks inside the artwork.

## Assets and rendering

- Native generation and deployed WebP dimensions: 1536 × 1024 pixels, landscape 3:2.
- Deployed directory: `public/images/courses/market-covers-2026/`.
- Stable filename: the exact course ID, with a `.webp` extension.
- Maximum deployed file size: 420,000 bytes per cover.
- `courseArtwork()` resolves these dedicated files before older fallback artwork. The original 100 Academy covers retain their paths.
- Existing responsive Next Image rendering and lazy loading remain in use. Card headings provide the accessible course name; their decorative photographs use empty alt text.
- The illustrations are AI-generated representations of occupations, not photographs of TGPI students, instructors, facilities or partners.

## Discovery

The visible professional-area selector groups the new courses into ten areas with ten courses each. It combines with existing search, access, series, language and learning-goal filters. Area selections persist in shareable URLs and reset alongside the other filters. Labels are provided in all six interface locales.

## Verification

The discovery tests enforce complete coverage, distinct file hashes across both cover collections, dimensions, WebP format, file-size budgets and topic badges. Catalogue tests enforce course-to-area mapping and URL round trips with combined filters. The existing production quality workflow remains required before merge.

Art direction is recorded in `market-cover-prompts-2026.json`; final asset metadata is recorded in `market-cover-manifest-2026.json`.
