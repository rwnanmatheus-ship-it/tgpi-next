import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { countrySuggestions, localizedCountryName, localizedCountryScore, normalizeCountrySearch, rankCountryMatches } from '../src/lib/country-search.ts';
import { explorerFiltersFromSearch, explorerFiltersToSearch, normalizeExplorerFilters } from '../src/lib/explorer-filters.ts';
const countries = JSON.parse(readFileSync(new URL('../src/data/intelligence/identities.json',import.meta.url))).countries;
const find = slug => countries.find(c=>c.slug===slug);
test('first-letter discovery uses the active language, not English aliases or ISO codes',()=>{
 assert.ok(countrySuggestions(countries,'A','pt-BR',195).some(c=>c.slug==='germany'));
 assert.ok(!countrySuggestions(countries,'G','pt-BR',195).some(c=>c.slug==='germany'));
 assert.equal(localizedCountryScore(find('germany'),'G','pt-BR'),0);
 assert.ok(localizedCountryScore(find('germany'),'A','pt-BR')>0);
 assert.ok(countrySuggestions(countries,'D','de',195).some(c=>c.slug==='germany'));
 assert.ok(countrySuggestions(countries,'G','en',195).some(c=>c.slug==='germany'));
});
test('all six interfaces use their displayed names for exact search and accent-insensitive suggestions',()=>{
 for(const locale of ['en','pt-BR','es','fr','de','it']) for(const c of countries){
  const name=localizedCountryName(c,locale);
  assert.equal(localizedCountryScore(c,name,locale),140,`${locale}: ${c.slug}`);
  const prefix=normalizeCountrySearch(name).slice(0,2);
  assert.ok(countrySuggestions(countries,prefix,locale,195).some(v=>v.slug===c.slug),`${locale}: ${c.slug}`);
 }
 assert.equal(countrySuggestions(countries,'Suí','pt-BR')[0].slug,'switzerland');
});
test('longer search preserves multilingual, ISO and typo recovery',()=>{
 assert.ok(localizedCountryScore(find('germany'),'Germany','pt-BR')>0);
 assert.ok(localizedCountryScore(find('brazil'),'BR','en')>0);
 assert.ok(localizedCountryScore(find('portugal'),'portugl','fr')>0);
 assert.equal(countrySuggestions(countries,'','en').length,0);
 assert.equal(localizedCountryScore(find('portugal'),'zzzzzz','en'),0);
});
test('explorer selection supports all 195 destinations and rejects duplicate or unknown slugs',()=>{
 const selected=[...countries.map(c=>c.slug),'portugal','not-a-country'];
 const state=normalizeExplorerFilters({selected,q:'a'.repeat(200),limit:'999',region:'invented'},countries);
 assert.equal(state.selection.length,195); assert.equal(state.query.length,120);assert.equal(state.limit,195);assert.equal(state.region,'all');
});

test('ranked autocomplete finds localized names, ISO codes and a misspelled destination', () => {
  for (const [query, expected] of [['Suí', 'switzerland'], ['DEU', 'germany'], ['EUA', 'united-states'], ['Portugl', 'portugal']]) {
    assert.equal(rankCountryMatches(countries, query, 'pt-BR')[0]?.slug, expected);
  }
  assert.ok(!rankCountryMatches(countries, 'G', 'pt-BR').some(country => country.slug === 'germany'));
});

test('atlas mode, presentation, coverage and sorting survive a shared directory URL', () => {
  const link = '?q=DEU&region=Europe&coverage=dossiers&sort=coverage&view=list&mode=atlas&selected=germany';
  const result = normalizeExplorerFilters(explorerFiltersFromSearch(link), countries);
  assert.equal(result.mode, 'atlas');
  assert.equal(result.coverage, 'dossiers');
  assert.equal(result.sort, 'coverage');
  assert.equal(result.view, 'list');
  assert.deepEqual(result.selection, ['germany']);
  assert.deepEqual(normalizeExplorerFilters(explorerFiltersFromSearch(explorerFiltersToSearch(explorerFiltersFromSearch(link))), countries), result);
  const invalid = normalizeExplorerFilters(explorerFiltersFromSearch('?mode=bad&sort=bad&coverage=bad&view=bad'), countries);
  assert.deepEqual([invalid.mode, invalid.sort, invalid.coverage, invalid.view], ['catalog', 'relevance', 'all', 'gallery']);
});
