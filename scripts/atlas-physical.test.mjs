import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import sharp from 'sharp';
import {COUNTRY_MAP_REGIONS} from '../src/lib/country-map.ts';
const geography = JSON.parse(readFileSync('src/data/world-physical.json', 'utf8'));
const borders = JSON.parse(readFileSync('public/maps/tgpi-world-countries-50m.json', 'utf8'));
const identities = JSON.parse(readFileSync('src/data/intelligence/identities.json', 'utf8')).countries;

test('physical imagery and country geometry share an uncropped 2:1 equirectangular extent', async () => {
  const image = await sharp('public/maps/earth-blue-marble-4k.webp').metadata();
  assert.equal(image.width, 4096);
  assert.equal(image.height, 2048);
  assert.deepEqual(borders.viewBox, [0, 0, 1000, 500]);
  assert.equal(borders.projection, 'Equirectangular');
});

test('capital coordinates are valid geographic locations, distinct from country centroids', () => {
  const london = geography.capitals.find(capital => capital.name === 'London');
  assert.ok(Math.abs(london.point[0] - 500) < 2);
  assert.ok(Math.abs(london.point[1] - (90 - 51.5) / 180 * 500) < 1);
  assert.equal(london.timezone, 'Europe/London');
  const brasilia = geography.capitals.find(capital => capital.iso3 === 'BRA');
  assert.ok(brasilia.point[0] > 365 && brasilia.point[0] < 370);
  assert.ok(brasilia.point[1] > 290 && brasilia.point[1] < 300);
  for (const capital of geography.capitals) {
    assert.ok(capital.point.every(Number.isFinite));
    assert.ok(capital.point[0] >= 0 && capital.point[0] <= 1000);
    assert.ok(capital.point[1] >= 0 && capital.point[1] <= 500);
    for (const locale of ['en','pt-BR','es','fr','de','it']) assert.ok(capital.names[locale]);
  }
  assert.ok(geography.capitals.filter(capital => identities.some(country => country.iso3 === capital.iso3)).length > 170);
});

test('hydrology contains real major rivers and lakes with finite projected geometry', () => {
  assert.equal(geography.water.filter(feature => feature.type === 'rivers').length, 13);
  assert.equal(geography.water.filter(feature => feature.type === 'lakes').length, 24);
  assert.ok(geography.water.some(feature => feature.name === 'Nile'));
  assert.ok(geography.water.some(feature => feature.name === 'Amazonas'));
  for (const feature of geography.water) {
    assert.match(feature.path, /^M/);
    assert.doesNotMatch(feature.path, /NaN|Infinity|undefined/);
  }
});


test('regional zoom centers stay inside their continent rather than adjacent oceans or continents', () => {
  const bounds = {
    'north-america': [-130, -60, 30, 65],
    'south-america': [-70, -40, -30, -5],
    europe: [-10, 40, 40, 65],
    africa: [10, 35, -10, 15],
    asia: [65, 130, 25, 50],
    oceania: [120, 180, -30, -5],
  };
  for (const region of COUNTRY_MAP_REGIONS.filter(region => region.id !== 'world')) {
    const [x,y,width,height] = region.viewport;
    const lng = (x + width / 2) / 1000 * 360 - 180;
    const lat = 90 - (y + height / 2) / 500 * 180;
    const [west,east,south,north] = bounds[region.id];
    assert.ok(lng >= west && lng <= east, `${region.id} longitude ${lng}`);
    assert.ok(lat >= south && lat <= north, `${region.id} latitude ${lat}`);
  }
});
