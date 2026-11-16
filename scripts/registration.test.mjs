import test from 'node:test';
import assert from 'node:assert/strict';
import { registrationReturnTo, registrationUrl, safeReturnTo } from '../src/lib/auth/return-to.ts';
import { validateRegistration } from '../src/lib/auth/registration.ts';
const valid = { firstName: 'Renan', lastName: 'da Silva Fernandes', currentCountry: 'BR', preferredLanguage: 'Portuguese', acceptedTerms: true };
test('registration accepts international names and normalizes spacing', () => {
  assert.equal(validateRegistration({ ...valid, firstName: '  李  ', lastName: 'O’Connor' })?.firstName, '李');
  assert.equal(validateRegistration({ ...valid, lastName: ' da   Silva ' })?.lastName, 'da Silva');
});
test('registration rejects malformed data and missing consent', () => {
  for (const value of [null, [], {}, { ...valid, acceptedTerms: 'true' }, { ...valid, acceptedTerms: false }, { ...valid, firstName: ' ' }, { ...valid, lastName: 'a'.repeat(61) }, { ...valid, firstName: '<script>' }, { ...valid, firstName: 'a\u0000b' }, { ...valid, firstName: 'a\u202eb' }, { ...valid, currentCountry: 'ZZ' }, { ...valid, preferredLanguage: 'Invalid' }]) assert.equal(validateRegistration(value), null);
});
test('registration only returns allowlisted fields', () => {
  assert.deepEqual(validateRegistration({ ...valid, premium: true, role: 'admin', userId: 'someone-else' }), valid);
});

test('registration accepts an optional international city without erasing stored data on empty submissions', () => {
  assert.equal(validateRegistration({ ...valid, currentCity: '  São   Paulo ' })?.currentCity, 'São Paulo');
  assert.equal(validateRegistration({ ...valid, currentCity: '麗水市' })?.currentCity, '麗水市');
  assert.equal(validateRegistration({ ...valid, currentCity: '' })?.currentCity, undefined);
  for (const currentCity of [123, '123', 'a'.repeat(101), 'a\u0000b', '<b>']) {
    assert.equal(validateRegistration({ ...valid, currentCity }), null);
  }
});

test('registration preserves the protected destination when an expired session requires sign-in again', () => {
  const target = '/courses/english-abroad/study?unit=2#practice';
  const welcome = registrationUrl(target);
  assert.equal(registrationReturnTo(welcome), target);
  assert.equal(registrationUrl(welcome), welcome);
  const signIn = new URL('/sign-in', 'https://tgpi.invalid');
  signIn.searchParams.set('next', welcome);
  assert.equal(safeReturnTo(signIn.searchParams.get('next')), welcome);
  assert.equal(registrationUrl('/welcome?next=https%3A%2F%2Fexample.com'), '/welcome?next=%2Fonboarding');
  assert.equal(registrationUrl('/welcome?next=%2Fwelcome'), '/welcome?next=%2Fonboarding');
});
