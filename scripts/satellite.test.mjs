import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {academyLocalizationFixture} from './helpers/academy-localization.mjs';
import {parseSatelliteCatalog, satelliteTileUrl, isSatelliteDate, SATELLITE_LAYERS} from '../src/lib/satellite.ts';
const fixture = Object.values(SATELLITE_LAYERS).map(layer => `<Layer><ows:Identifier>${layer.id}</ows:Identifier><Dimension><Default>2026-10-23</Default><Value>2015-11-24/2026-10-23/P1D</Value></Dimension></Layer>`).join('');
test('NASA catalog dates come from the exact registered layer, never the current clock or a granule layer', () => {
  const granule = '<Layer><ows:Identifier>VIIRS_SNPP_CorrectedReflectance_TrueColor_Granule</ows:Identifier><Dimension><Default>2026-10-24</Default><Value>2026-01-01</Value></Dimension></Layer>';
  const result = parseSatelliteCatalog(granule + fixture, '2026-10-24T12:00:00Z');
  assert.equal(result.layers.viirs.latest, '2026-10-23');
  assert.equal(result.layers.terra.earliest, '2015-11-24');
  assert.throws(() => parseSatelliteCatalog(granule));
});
test('invalid source dates and missing layers fail closed', () => {
  assert.throws(() => parseSatelliteCatalog(fixture.replaceAll('2026-10-23', '2026-02-30')));
  assert.throws(() => parseSatelliteCatalog('<html>upstream error</html>'));
  assert.equal(isSatelliteDate('2026-02-30'), false);
  assert.equal(isSatelliteDate('2026-10-23'), true);
  assert.throws(() => satelliteTileUrl('viirs', '../../private'));
  assert.match(satelliteTileUrl('terra', '2026-10-22'), /MODIS_Terra.*\/2026-10-22\/GoogleMapsCompatible_Level9\/\{z\}\/\{y\}\/\{x\}\.jpeg$/);
});
test('every TGPI destination has a valid geographic focus point', () => {
  const countries=JSON.parse(readFileSync(new URL('../src/data/intelligence/identities.json',import.meta.url))).countries;
  const locations=JSON.parse(readFileSync(new URL('../src/data/country-map-locations.json',import.meta.url)));
  assert.equal(countries.length,195);
  for(const country of countries){
    const point=locations[country.slug];assert.ok(point,country.slug);
    assert.ok(Number.isFinite(point.lat)&&Math.abs(point.lat)<=85.051129,country.slug);
    assert.ok(Number.isFinite(point.lng)&&Math.abs(point.lng)<=180,country.slug);
    assert.ok(Number.isInteger(point.zoom)&&point.zoom>=1&&point.zoom<=9,country.slug);
  }
  assert.ok(locations.portugal.lat>36&&locations.portugal.lat<43);
  assert.ok(locations.portugal.lng>-10&&locations.portugal.lng<-6);
});

test('satellite status, map accessibility and country tooltips follow all six languages without changing map selection', () => {
  const {messages, locales} = academyLocalizationFixture();
  const originalDocument = globalThis.document;
  try {
    for (const locale of locales) {
      const t = (key, values) => messages.translate(locale, key, values);
      let stateIndex = 0, refIndex = 0;
      const effects = [], tooltips = [];
      const map = {};
      const group = {addTo() {return this;}, remove() {}};
      const leaflet = {
        layerGroup: () => group,
        circleMarker: () => ({
          bindTooltip(label) {tooltips.push(label); return this;},
          on() {return this;}, addTo() {return this;},
        }),
      };
      globalThis.document = {createElement: () => ({textContent: ''})};
      const localeProvider = {
        useLocale: () => ({locale, t}),
        LocalizedText: ({text, values}) => typeof text === 'string' ? t(text, values) : text,
      };
      const fixture = academyLocalizationFixture({
        react: {
          ...React,
          useRef(value) {return {current: refIndex++ === 1 ? leaflet : value};},
          useEffect(callback) {effects.push(callback);},
          useState(initial) {
            const current = stateIndex++;
            if (current === 0) return [map, () => {}];
            if (current === 8) return [{text: 'Imagery tiles loaded for {date} UTC · Coverage may be incomplete or obscured by clouds.', date: '2026-11-10'}, () => {}];
            return [initial, () => {}];
          },
        },
        'next/link': {__esModule: true, default: props => React.createElement('a', props)},
        '@/components/localization/LocalizedElement': {LocalizedElement: ({as, ...props}) => React.createElement(as, props)},
        '@/components/localization/LocaleProvider': localeProvider,
        './LocaleProvider': localeProvider,
      });
      const Atlas = fixture.load(resolve('src/components/countries/SatelliteAtlas.tsx')).default;
      const html = renderToStaticMarkup(React.createElement(Atlas, {countries: [{slug: 'united-states', name: 'United States'}], selectedSlug: 'united-states', onCountryPreview() {}}));
      const country = t('United States');
      const date = new Intl.DateTimeFormat(locale, {dateStyle: 'medium', timeZone: 'UTC'}).format(new Date('2026-11-10T12:00:00Z'));
      assert.ok(html.includes(t('Imagery tiles loaded for {date} UTC · Coverage may be incomplete or obscured by clouds.', {date})), locale);
      assert.ok(html.includes(t('Satellite imagery: {country}. Use arrow keys to pan and plus or minus to zoom.', {country})), locale);
      assert.ok(html.includes('value="united-states"'), locale);
      effects[4]();
      assert.deepEqual(tooltips.map(label => label.textContent), [country], locale);
    }
  } finally {globalThis.document = originalDocument;}
});
