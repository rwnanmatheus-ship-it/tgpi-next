import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { countries as catalog } from '../src/data/countries.ts';
import { countrySearchTerms, localizedCountryScore, rankCountryMatches } from '../src/lib/country-search.ts';

const identities = JSON.parse(readFileSync(new URL('../src/data/intelligence/identities.json', import.meta.url))).countries;
const metadata = new Map(catalog.map(country => [country.slug, country]));
const countries = identities.map(identity => ({ ...identity, capital: metadata.get(identity.slug)?.capital, language: metadata.get(identity.slug)?.language }));
const terms = new Map(countries.map(country => [country.slug, countrySearchTerms(country)]));
const search = (query, locale = 'pt-BR') => rankCountryMatches(countries, query, locale, terms);
const slugs = query => search(query).map(country => country.slug);

test('language discovery is multilingual and constrained to existing country metadata', () => {
  for (const query of ['English', 'inglês', 'anglais', 'inglés', 'Englisch', 'inglese']) {
    const result = search(query);
    assert.ok(result.length > 10, query);
    assert.ok(result.some(country => country.slug === 'united-kingdom'), query);
    assert.ok(!result.some(country => country.slug === 'japan'), query);
  }
  assert.ok(slugs('mandarim').includes('china'));
  assert.ok(slugs('francês').includes('france'));
});

test('cross-field intent requires each meaningful token and supports bounded spelling recovery', () => {
  assert.ok(slugs('idioma inglês na Europa').includes('united-kingdom'));
  assert.ok(!slugs('idioma inglês na Europa').includes('australia'));
  assert.ok(slugs('francês África').includes('senegal'));
  assert.ok(!slugs('francês África').includes('france'));
  assert.ok(slugs('francês Eurpa').includes('france'));
  assert.equal(search('inglês continenteinventado').length, 0);
});

test('capital and translated regional discovery return the actual destination', () => {
  assert.equal(search('Tokyo')[0]?.slug, 'japan');
  assert.equal(search('Londres')[0]?.slug, 'united-kingdom');
  assert.equal(search('Viena')[0]?.slug, 'austria');
  assert.equal(search('Pequim')[0]?.slug, 'china');
  assert.equal(search('Buenos Aires')[0]?.slug, 'argentina');
  assert.equal(search('capital Kabul')[0]?.slug, 'afghanistan');
  assert.ok(slugs('Oceania').includes('new-zealand'));
  assert.ok(slugs('África').includes('ghana'));
  assert.ok(!slugs('África').includes('germany'));
});

test('exact localized names and country codes retain priority over geographic metadata', () => {
  for (const [query, slug] of [['DEU', 'germany'], ['EUA', 'united-states'], ['GB', 'united-kingdom'], ['NE', 'niger'], ['IN', 'india'], ['Alemanha', 'germany']]) {
    assert.equal(search(query)[0]?.slug, slug, query);
  }
  assert.equal(localizedCountryScore(countries.find(country => country.slug === 'germany'), 'G', 'pt-BR'), 0);
  assert.ok(slugs('Suí').includes('switzerland'));
});

test('identity-only consumers remain compatible and cannot fabricate language or capital matches', () => {
  assert.ok(rankCountryMatches(identities, 'Europe', 'en').length > 20);
  assert.equal(rankCountryMatches(identities, 'inglês', 'pt-BR').length, 0);
  assert.equal(rankCountryMatches(identities, 'Tokyo', 'en').length, 0);
});

test('localities from photographs and translated UNSD subregions can lead to a country profile', () => {
  const country = countries.find(item => item.slug === 'australia');
  const destination = { ...country, places: ['Sydney Harbour', 'Melbourne'] };
  assert.equal(rankCountryMatches([destination], 'Sydney', 'en')[0]?.slug, 'australia');
  assert.equal(rankCountryMatches([destination], 'Melbourne', 'pt-BR')[0]?.slug, 'australia');
  assert.equal(rankCountryMatches([country], 'Melbourne', 'pt-BR').length, 0);
  assert.ok(search('Europa Ocidental').some(item => item.slug === 'france'));
});
