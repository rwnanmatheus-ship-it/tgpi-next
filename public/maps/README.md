# TGPI world map data

`tgpi-world-countries-50m.json` contains SVG path geometry generated from Natural Earth Admin 0 Countries at 1:50m scale.

- Source: https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/
- Projection: equirectangular, `0 0 1000 500`
- License: Natural Earth public domain
- Generated fields: country name, ADM0 alpha-3 code, continent, label point, small-territory marker flag and SVG path

The browser loads this file locally. No third-party map request is made in production.

## Physical Earth imagery

`earth-blue-marble-4k.webp` is a locally hosted 4096 × 2048 WebP derivative of NASA Blue Marble imagery with topography and bathymetry. This historical composite is not live satellite imagery. Its equirectangular bounds (-180..180°, -90..90°) match the vector map; do not crop or reproject either layer independently.

- Image distribution: https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg
- Scientific reference and credit: NASA Earth Observatory / NASA Blue Marble, https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/
- Terrain labels are geographic context, not surveyed locations or elevation measurements.
- Country coordinates use the existing TGPI country focus points, not capital coordinates.

`src/data/world-physical.json` supplies actual Natural Earth 1:110m capital locations, 13 major rivers and 24 lakes. Capital labels use the source's localized names. Selected capital reference timezones are descriptive IANA identifiers; the map makes no claim of live conditions. Generate with `scripts/generate-atlas-physical.mjs` from the documented public-domain GeoJSON files. This generalized layer is designed for a world atlas, not street navigation.
