// Usage: node scripts/generate-atlas-physical.mjs <Natural Earth GeoJSON directory>
// Expected files: places.json, rivers.json, lakes.json. Sources: nvkelso/natural-earth-vector,
// geojson/ne_110m_{populated_places,rivers_lake_centerlines,lakes}.geojson (public domain).
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
const directory = process.argv[2];
if (!directory) throw Error('Provide the source GeoJSON directory');
const read = name => JSON.parse(readFileSync(join(directory, `${name}.json`), 'utf8')).features;
const point = ([lng, lat]) => [Number(((lng + 180) / 360 * 1000).toFixed(3)), Number(((90 - lat) / 180 * 500).toFixed(3))];
const line = coords => coords.map((coords, index) => `${index ? 'L' : 'M'}${point(coords).join(',')}`).join('');
const path = geometry => {
  switch (geometry.type) {
    case 'LineString': return line(geometry.coordinates);
    case 'MultiLineString': return geometry.coordinates.map(line).join('');
    case 'Polygon': return geometry.coordinates.map(coords => line(coords) + 'Z').join('');
    case 'MultiPolygon': return geometry.coordinates.flatMap(polygon => polygon.map(coords => line(coords) + 'Z')).join('');
    default: throw Error(`Unsupported geometry ${geometry.type}`);
  }
};
const result = {
  source: 'Natural Earth 1:110m physical geography and populated places',
  sourceUrl: 'https://www.naturalearthdata.com/',
  capitals: read('places').filter(feature => feature.properties.ADM0CAP === 1).map(feature => ({
    name: feature.properties.NAME, iso3: feature.properties.ADM0_A3,
    point: point(feature.geometry.coordinates), timezone: feature.properties.TIMEZONE,
    names: Object.fromEntries(['en', 'pt', 'es', 'fr', 'de', 'it'].map(locale => [locale === 'pt' ? 'pt-BR' : locale, feature.properties[`NAME_${locale.toUpperCase()}`] || feature.properties.NAME])),
  })),
  water: ['rivers', 'lakes'].flatMap(type => read(type).map(feature => ({type, name: feature.properties.name, path: path(feature.geometry)}))),
};
writeFileSync('src/data/world-physical.json', JSON.stringify(result));
console.log(`${result.capitals.length} capital references; ${result.water.length} water features`);
