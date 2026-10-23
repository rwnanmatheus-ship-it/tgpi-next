# Country intelligence: satellite and image layout release

## Behavior
- All 195 destination cards span their image container at 16:9. Native 1600×900 assets are served through Next Image at quality 88 with responsive sizes. No synthetic resolution increase is claimed.
- Mobile country heroes place the image above the readable content rather than cropping it behind a long heading.
- The lazy satellite explorer is available in Countries and each country dossier. Leaflet implements touch pinch, drag, keyboard pan/zoom, expanded height and resize handling.
- NASA GIBS supplies Suomi NPP/VIIRS and Terra/MODIS corrected reflectance. A server endpoint reads the advertised dates from the exact registered WMTS layers and caches the small parsed result for 15 minutes. No API keys or user details are sent by the application to NASA. Tile loading connects directly to NASA, which receives ordinary request metadata.
- Default view requests the previous source day for broader coverage. Latest available follows the source-advertised latest day. Observation date, source and catalog check time remain distinct. Images can be missing, cloudy or black. They are not live video, street-level imagery or evidence of legal/financial suitability.
- Historical Blue Marble terrain is a separate, explicitly labelled mode. It never silently replaces recent observations.
- Country markers use Natural Earth's approximate label coordinates, converted from the existing equirectangular dataset. They do not define borders or represent city locations.
- Export from country search lets authenticated users select saved scenario 1–3. An upstream error does not silently produce an empty report. Unsaved drafts remain exportable from the Decision Lab itself.

## Sources
- https://nasa-gibs.github.io/gibs-api-docs/access-basics/
- https://nasa-gibs.github.io/gibs-api-docs/available-visualizations/
- https://leafletjs.com/reference
- https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/

## QA
`npm run prebuild`, `npx tsc --noEmit`, focused ESLint and `git diff --check`.
The `/internal/country-qa` page exists only on Vercel Preview, returns 404 in production, and provides same-origin iframe viewports at 360, 390, 768 and 1280 CSS pixels. This checks responsive layout and touch-sized controls; it does not replace physical-device testing.
