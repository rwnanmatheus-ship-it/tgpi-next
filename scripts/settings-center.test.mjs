import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import * as profile from '../src/lib/account-profile.ts';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';
import { resolve } from 'node:path';
const { normalizeOnboardingData } = academyLocalizationFixture().load(resolve('src/lib/onboarding.ts'));
import { resolveSettingsSection, settingsHref, normalizeSettingsSearch } from '../src/lib/settings-navigation.ts';
import { normalizeDisplayPreferences } from '../src/lib/display-preferences.ts';

test('settings routes preserve deep links, reload state and Clerk security routes', () => {
  assert.equal(resolveSettingsSection('/profile/security/security', '#settings-preferences'), 'preferences');
  assert.equal(resolveSettingsSection('/profile/security/security', ''), 'security');
  assert.equal(resolveSettingsSection('/profile/security/', '#invalid'), 'overview');
  assert.equal(settingsHref('identity', '/profile/security/security'), '/profile/security#settings-identity');
  assert.equal(settingsHref('security', '/profile/security/security'), '/profile/security/security#settings-security');
  assert.equal(resolveSettingsSection('/profile/security', '#settings-data'), 'data');
  assert.equal(resolveSettingsSection('/profile/security', '#settings-progress'), 'progress');
  assert.equal(normalizeSettingsSearch('  CONEXÃO  '), 'conexao');
});

test('partial profile updates preserve existing nested privacy choices', () => {
  const existing = profile.normalizeTgpiAccountProfile({ privacy: { visibility: 'members', showLinks: true, showCareer: true }, notifications: { productNews: true }, legalFullName: 'Alex Learner' });
  const merged = profile.mergeAccountProfilePatch(existing, { privacy: { showLocation: true }, notifications: { learningUpdates: false } });
  assert.equal(merged.privacy.visibility, 'members');
  assert.equal(merged.privacy.showLinks, true);
  assert.equal(merged.privacy.showLocation, true);
  assert.equal(merged.notifications.productNews, true);
  assert.equal(merged.notifications.learningUpdates, false);
  assert.equal(merged.legalFullName, 'Alex Learner');
  assert.equal(existing.privacy.showLocation, false);
});

test('invalid URLs and timezones are rejected rather than silently clearing data', () => {
  for (const input of [null, [], { website: 1 }, { linkedin: 'example.com' }, { website: 'javascript:alert(1)' }, { instagram: 'instagram.com.evil.test' }, { timezone: 'Brazilian time' }, { preferredCurrency: 'dollars' }, { privacy: null }]) assert.ok(profile.validateAccountProfileInput(input));
  assert.equal(profile.validateAccountProfileInput({ website: '', timezone: 'America/Sao_Paulo', linkedin: 'linkedin.com/in/learner', preferredCurrency: 'BRL' }), null);
});

test('display preferences ignore malformed flags and personal data', () => {
  assert.deepEqual(normalizeDisplayPreferences({ reducedMotion: 'true', largerText: true, strongerFocus: false, email: 'private@example.test' }), { reducedMotion: false, largerText: true, strongerFocus: false });
  assert.deepEqual(normalizeDisplayPreferences(null), { reducedMotion: false, largerText: false, strongerFocus: false });
});

function fixture({ authenticated = true } = {}) {
  const stored = { firstName: 'Alex', lastName: 'Learner', unsafeMetadata: { unrelated: { preserved: true }, tgpiAccountProfile: profile.normalizeTgpiAccountProfile({ updatedAt: '2026-11-10T00:00:00.000Z', privacy: { showLinks: true }, profession: 'Engineer' }), tgpiOnboarding: { primaryGoal: 'study', targetCountries: ['portugal'], profession: 'Engineer' } } };
  const writes = [];
  const api = {};
  function deepMerge(target, patch) { for (const [key,value] of Object.entries(patch)) { if (value && typeof value === 'object' && !Array.isArray(value)) { target[key] ??= {}; deepMerge(target[key], value); } else target[key] = value; } }
  const compiled = ts.transpileModule(readFileSync(new URL('../src/app/api/account-profile/route.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('exports', 'require', compiled)(api, name => {
    if (name === 'next/server') return { NextResponse: { json: (...args) => Response.json(...args) } };
    if (name === '@/lib/account-profile') return profile;
    if (name === '@/lib/onboarding') return { normalizeOnboardingData };
    if (name === '@/lib/members/identity.server') return { getMemberIdentity: async () => ({ handle: 'alex' }) };
    if (name === '@clerk/nextjs/server') return { auth: async () => authenticated ? { userId: 'user_a', sessionId: 'session_a' } : {}, clerkClient: async () => ({ users: { getUser: async () => structuredClone(stored), updateUser: async (_, input) => { writes.push(input); Object.assign(stored, input); }, updateUserMetadata: async (_, input) => { writes.push(input); deepMerge(stored, input); } } }) };
    throw new Error(`Unexpected dependency ${name}`);
  });
  const payload = () => ({ identity: { firstName: 'Alex', lastName: 'Learner' }, profile: structuredClone(stored.unsafeMetadata.tgpiAccountProfile) });
  const request = (body, headers = {}) => new Request('https://tgpi.test/api/account-profile', { method: 'PATCH', headers: { Origin: 'https://tgpi.test', 'Content-Type': 'application/json', 'X-TGPI-Session': 'session_a', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  return { api, stored, writes, payload, request };
}

test('account read requires a session and never exposes unrelated metadata', async () => {
  const denied = fixture({ authenticated: false }); assert.equal((await denied.api.GET()).status, 401);
  const f = fixture(); const response = await f.api.GET();
  assert.equal(response.status, 200); assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  const data = await response.json(); assert.deepEqual(Object.keys(data), ['profile']); assert.equal(data.profile.profession, 'Engineer'); assert.equal(f.writes.length, 0);
});

test('account writes reject wrong session, cross-origin and invalid JSON', async () => {
  const f = fixture();
  assert.equal((await f.api.PATCH(f.request(f.payload(), { 'X-TGPI-Session': 'other' }))).status, 401);
  assert.equal((await f.api.PATCH(f.request(f.payload(), { Origin: 'https://other.test' }))).status, 403);
  assert.equal((await f.api.PATCH(f.request('{broken'))).status, 400);
  assert.equal((await f.api.PATCH(f.request(f.payload(), { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal(f.writes.length, 0);
});

test('stale profile cannot overwrite a newer saved version', async () => {
  const f = fixture(); const body = f.payload(); body.profile.updatedAt = '2026-11-01T00:00:00Z'; body.profile.bio = 'stale edit';
  assert.equal((await f.api.PATCH(f.request(body))).status, 409); assert.equal(f.writes.length, 0); assert.equal(f.stored.unsafeMetadata.tgpiAccountProfile.bio, '');
});

test('partial account save preserves privacy, plan targets and unrelated metadata', async () => {
  const f = fixture(); const body = f.payload(); body.profile = { updatedAt: body.profile.updatedAt, profession: 'Designer', privacy: { showGoals: true } };
  const response = await f.api.PATCH(f.request(body)); assert.equal(response.status, 200);
  const data = await response.json(); assert.equal(data.profile.privacy.showLinks, true); assert.equal(data.profile.privacy.showGoals, true); assert.ok(Date.parse(data.profile.updatedAt) > Date.parse(body.profile.updatedAt));
  assert.deepEqual(f.stored.unsafeMetadata.tgpiOnboarding.targetCountries, ['portugal']); assert.equal(f.stored.unsafeMetadata.tgpiOnboarding.profession, 'Designer'); assert.equal(f.stored.unsafeMetadata.unrelated.preserved, true);
});

test('invalid link fails before changing identity or metadata', async () => {
  const f = fixture(); const body = f.payload(); body.identity.firstName = 'Changed'; body.profile.linkedin = 'https://wrong.example';
  assert.equal((await f.api.PATCH(f.request(body))).status, 400); assert.equal(f.writes.length, 0); assert.equal(f.stored.firstName, 'Alex');
});
