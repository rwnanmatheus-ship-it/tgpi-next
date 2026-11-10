import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const locales = ['en', 'pt-BR', 'es', 'fr', 'de', 'it'];
const properNameCharacter = 'ʻ'; // Tongan place and currency names, e.g. Nukuʻalofa and Paʻanga.

test('published Latin-language catalogs contain no accidental foreign-script words', () => {
  for (const locale of locales) {
    const dictionary = JSON.parse(readFileSync(new URL(`../public/locales/${locale}.json`, import.meta.url), 'utf8'));
    const malformed = Object.entries(dictionary).flatMap(([key, value]) => {
      const letters = [...value].filter(char => /\p{L}/u.test(char) && !/\p{Script=Latin}/u.test(char) && char !== properNameCharacter);
      return letters.length ? [{ key, letters: [...new Set(letters)].join('') }] : [];
    });
    assert.deepEqual(malformed, [], `${locale}: foreign-script letters embedded in translated copy`);
  }
});

test('the Portuguese country research guidance reads naturally', () => {
  const dictionary = JSON.parse(readFileSync(new URL('../public/locales/pt-BR.json', import.meta.url), 'utf8'));
  const key = Object.keys(dictionary).find(value => value.startsWith('Use the dossier’s source links where available'));
  assert.ok(key);
  assert.ok(dictionary[key].includes('quando disponíveis'));
});
