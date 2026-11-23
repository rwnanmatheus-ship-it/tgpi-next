import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const identities = JSON.parse(readFileSync(new URL('src/data/intelligence/identities.json', root))).countries;
const map = JSON.parse(readFileSync(new URL('public/maps/tgpi-world-countries-50m.json', root)));
const countries = identities.map(country => ({ ...country, emoji: '🇧🇷', visual: { url: '/example.webp' } }));
function load(file, imports) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(new URL(file, root), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(source, {
    exports, require: key => { if (key in imports) return imports[key]; throw Error(key); },
    window: { requestAnimationFrame: callback => callback() }, Map, Set, Math, Number,
  });
  return exports;
}
const regionModule = load('src/lib/country-map.ts', {});
const flatten = tree => !tree || typeof tree !== 'object' ? []
  : [tree, ...[tree.props?.children].flat(Infinity).flatMap(flatten)];
function harness(options = {}) {
  let hook = 0;
  const region = options.region ?? 'world';
  const navigation = options.navigation ?? { region, scale: 1, x: 0, y: 0 };
  const states = [navigation, map, false, false, '', false];
  const pushes = [], prefetches = [], previews = [], regions = [];
  const imports = {
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    react: {
      useEffect: () => {}, useId: () => ':atlas-test:', useRef: value => ({ current: value }), useMemo: callback => callback(),
      useState: initial => { const index = hook++; return [states[index] ?? initial, next => { states[index] = typeof next === 'function' ? next(states[index] ?? initial) : next; }]; },
      startTransition: callback => callback(),
    },
    'next/link': { default: 'a' },
    'next/navigation': { useRouter: () => ({ push: path => pushes.push(path), prefetch: path => prefetches.push(path) }) },
    '@/components/localization/LocalizedImage': { default: 'img' },
    '@/components/ui/CountryFlag': { default: 'flag' },
    '@/components/localization/LocalizedElement': { LocalizedElement: 'LocalizedElement' },
    '@/components/localization/LocaleProvider': { LocalizedText: 'LocalizedText', useLocale: () => ({ locale: 'en', t: (key, values = {}) => key.replace(/\{([^}]+)\}/g, (_, name) => values[name] ?? '') }) },
    '@/lib/country-flag': { countryFlagCode: () => 'BR' },
    '@/lib/country-map': regionModule,
    './CountriesWorldMap.module.css': new Proxy({}, { get: (_target, key) => key }),
  };
  const Component = load('src/components/countries/CountriesWorldMap.tsx', imports).default;
  const nodes = flatten(Component({
    countries: options.countries ?? countries, activeRegionId: region, selectedSlug: options.selectedSlug ?? 'portugal',
    onCountryPreview: slug => previews.push(slug), onRegionChange: id => regions.push(id),
  }));
  return { nodes, states, pushes, prefetches, previews, regions,
    paths: nodes.filter(node => node.props?.['data-country-slug']),
    button: label => nodes.find(node => node.type === 'button' && node.props['aria-label'] === label),
  };
}

test('cartography resolves all 195 TGPI destinations through ISO identities and legacy name fallback', () => {
  for (const catalog of [countries, countries.map(country => { const legacy = { ...country }; delete legacy.iso3; return legacy; })]) {
    const h = harness({ countries: catalog });
    assert.equal(new Set(h.paths.map(path => path.props['data-country-slug'])).size, 195);
    for (const identity of identities) assert.ok(h.paths.some(path => path.props['data-country-slug'] === identity.slug), identity.slug);
  }
});

test('map provides a single keyboard entry for every continent, including an empty selected destination', () => {
  for (const region of regionModule.COUNTRY_MAP_REGIONS) {
    const h = harness({ region: region.id, selectedSlug: '' });
    const focusable = h.paths.filter(path => path.props.tabIndex === 0);
    assert.equal(focusable.length, 1, region.id);
    if (region.id !== 'world') {
      const identity = identities.find(country => country.slug === focusable[0].props['data-country-slug']);
      const feature = map.features.find(feature => feature.isoA3 === identity.iso3 || feature.name === identity.name);
      assert.ok(region.sourceRegions.includes(feature.continent), `${region.id}: ${identity.slug}`);
    }
  }
});

test('hover avoids route prefetch, explicit selection deduplicates prefetch and Enter opens instantly', () => {
  const h = harness();
  const portugal = h.paths.find(path => path.props['data-country-slug'] === 'portugal');
  portugal.props.onMouseEnter();
  assert.equal(h.prefetches.length, 0);
  assert.equal(h.previews.length, 0);
  portugal.props.onClick();
  portugal.props.onClick();
  assert.deepEqual(h.prefetches, ['/countries/portugal']);
  portugal.props.onKeyDown({ key: 'Enter', preventDefault() {} });
  assert.deepEqual(h.pushes, ['/countries/portugal']);
  assert.equal(portugal.props['aria-label'], 'Preview Portugal on the map');
});

test('an externally selected region discards stale local zoom and pan', () => {
  const h = harness({ region: 'europe', navigation: { region: 'world', scale: 5, x: 100, y: 200 } });
  const output = h.nodes.find(node => node.type === 'output');
  assert.equal(output.props.children[0], 100);
  assert.equal(h.button('Zoom out').props.disabled, true);
});

test('dragged territory does not activate a country and fit control centers the selected vector coordinates', () => {
  const h = harness({ navigation: { region: 'world', scale: 2, x: 0, y: 0 } });
  const svg = h.nodes.find(node => node.type === 'svg');
  svg.props.onPointerDown({ clientX: 100, clientY: 100 });
  svg.props.onPointerMove({ clientX: 120, clientY: 110, pointerId: 1,
    currentTarget: { setPointerCapture() {}, getBoundingClientRect: () => ({ width: 1000, height: 500 }) } });
  assert.equal(h.states[0].x, 20);
  assert.equal(h.states[0].y, 10);
  h.paths.find(path => path.props['data-country-slug'] === 'portugal').props.onClick();
  assert.equal(h.previews.length, 0);
  const focus = h.nodes.find(node => node.type === 'button' && node.props.children === 'Focus destination');
  focus.props.onClick();
  const feature = map.features.find(feature => feature.isoA3 === 'PRT');
  const [x, y, width, height] = regionModule.COUNTRY_MAP_REGIONS[0].viewport;
  const base = Math.min(1000 / width, 500 / height) * .96;
  const baseX = (1000 - width * base) / 2 - x * base, baseY = (500 - height * base) / 2 - y * base;
  const nav = h.states[0], scale = base * nav.scale;
  assert.ok(Math.abs(feature.label[0] * scale + 500 + (baseX - 500) * nav.scale + nav.x - 500) < .001);
  assert.ok(Math.abs(feature.label[1] * scale + 250 + (baseY - 250) * nav.scale + nav.y - 250) < .001);
});
