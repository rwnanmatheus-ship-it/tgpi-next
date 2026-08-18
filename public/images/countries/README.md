# TGPI country identity visuals

The country pages use one local WebP identity visual per country. The system
combines real geographic silhouettes from the bundled Natural Earth dataset
with vivid, region-aware palettes and a consistent TGPI composition.

- Generate or refresh the WebP collection from the bundled geographic data with
  `npm run generate:country-visuals`.
- Keep the left side calm enough for accessible hero copy.
- Keep the geographic shape on the right as the main country-specific signature.
- Replace the corresponding local `.webp` file when a country receives a
  reviewed cinematic editorial artwork. Japan is the first reviewed override.
- Do not add political propaganda, military imagery, sacred symbols used as
  decoration, or visual stereotypes.

All generated vector visuals are original TGPI assets. Geographic outlines are
derived from the public-domain Natural Earth 1:50m Admin 0 Countries dataset.
