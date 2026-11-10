import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { countrySuggestions, localizedCountryName, localizedCountryScore, normalizeCountrySearch } from '../src/lib/country-search.ts';
import { normalizeExplorerFilters } from '../src/lib/explorer-filters.ts';
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
