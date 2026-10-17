import test from 'node:test';
import assert from 'node:assert/strict';
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
