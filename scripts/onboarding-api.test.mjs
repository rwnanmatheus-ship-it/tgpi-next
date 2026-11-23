import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import ts from 'typescript';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const { load } = academyLocalizationFixture();
const onboarding = load(resolve('src/lib/onboarding.ts'));
const input = load(resolve('src/lib/onboarding-input.ts'));
const source = process.env.TGPI_QA_BASELINE === '1'
  ? execFileSync('git', ['show', 'HEAD:src/app/api/onboarding/route.ts'], { encoding: 'utf8' })
  : readFileSync('src/app/api/onboarding/route.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const plan = () => ({ ...structuredClone(onboarding.emptyOnboardingData), primaryGoal: 'study', targetCountries: ['portugal'], timeHorizon: '6-months', budgetRange: '1500-3000', languages: ['Portuguese'], internationalExperience: 'first-step', priorities: ['safety', 'cost', 'education'], profession: 'Engineer', educationLevel: 'University', currentStep: 5, completed: true });

function fixture({ userId = 'synthetic-a', sessionId = 'session-a', previous = plan(), storageError } = {}) {
  const stored = { unsafeMetadata: { unrelated: { keep: true }, tgpiOnboarding: previous, tgpiAccountProfile: { legalFullName: 'QA Synthetic Learner', privacy: { visibility: 'private' } } } };
  const writes = [], api = {};
  new Function('exports', 'require', compiled)(api, name => {
    if (name === 'next/server') return { NextResponse: { json: (...args) => Response.json(...args) } };
    if (name === '@/lib/onboarding') return onboarding;
    if (name === '@/lib/onboarding-input') return input;
    if (name === '@/lib/account-profile') return load(resolve('src/lib/account-profile.ts'));
    if (name === '@/lib/funnel.server') return { recordFunnelEvent() {}, requestFunnelConsent() { return false; } };
    if (name === '@/lib/notifications/schedule.server') return { scheduleNotificationReconciliation() {} };
    if (name === '@clerk/nextjs/server') return { auth: async () => ({ userId, sessionId }), clerkClient: async () => ({ users: {
      getUser: async () => structuredClone(stored),
      updateUserMetadata: async (uid, patch) => {
        if (storageError) throw storageError;
        assert.equal(uid, userId);
        writes.push(structuredClone(patch));
        for (const [key, value] of Object.entries(patch.unsafeMetadata)) stored.unsafeMetadata[key] = { ...stored.unsafeMetadata[key], ...value };
      },
    } }) };
    throw new Error(`Unexpected dependency ${name}`);
  });
  const request = (body, headers = {}) => new Request('https://tgpi.test/api/onboarding', { method: 'PATCH', headers: { Origin: 'https://tgpi.test', 'Content-Type': 'application/json', 'X-TGPI-Session': sessionId || '', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  return { api, stored, writes, request };
}

test('onboarding writes require a complete matching session', async () => {
  for (const credentials of [{ userId: null }, { sessionId: null }]) {
    const f = fixture(credentials);
    assert.equal((await f.api.PATCH(f.request(plan()))).status, 401);
    assert.equal(f.writes.length, 0);
  }
  const f = fixture();
  assert.equal((await f.api.PATCH(f.request(plan(), { 'X-TGPI-Session': 'session-b' }))).status, 401);
  assert.equal(f.writes.length, 0);
});

test('cross-origin and non-JSON submissions cannot modify the saved plan', async () => {
  const f = fixture();
  assert.equal((await f.api.PATCH(f.request(plan(), { Origin: 'https://other.test' }))).status, 403);
  assert.equal((await f.api.PATCH(f.request(plan(), { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal(f.writes.length, 0);
});

test('malformed and partial payloads cannot erase a previously saved plan', async () => {
  for (const value of ['{broken', 'null', '[]', '{}', JSON.stringify({ ...plan(), languages: 'English' }), JSON.stringify({ ...plan(), currentStep: 99 }), JSON.stringify({ ...plan(), priorities: [] }), JSON.stringify({ ...plan(), profession: '<script>' })]) {
    const f = fixture();
    assert.equal((await f.api.PATCH(f.request(value))).status, 400, value);
    assert.equal(f.writes.length, 0);
    assert.deepEqual(f.stored.unsafeMetadata.tgpiOnboarding, plan());
  }
});

test('oversized streamed bodies are cancelled before storage access', async () => {
  const f = fixture();
  let cancelled = false, chunksRead = 0;
  const body = new ReadableStream({ pull(controller) { if (chunksRead === 3) { controller.close(); return; } chunksRead++; controller.enqueue(new Uint8Array(24_001)); }, cancel() { cancelled = true; } });
  const request = new Request('https://tgpi.test/api/onboarding', { method: 'PATCH', headers: { Origin: 'https://tgpi.test', 'Content-Type': 'application/json', 'X-TGPI-Session': 'session-a' }, body, duplex: 'half' });
  assert.equal((await f.api.PATCH(request)).status, 413);
  assert.equal(cancelled, true);
  assert.ok(chunksRead <= 2);
  assert.equal(f.writes.length, 0);
});

test('an older browser draft cannot overwrite a more recent version', async () => {
  const f = fixture({ previous: { ...plan(), updatedAt: '2026-11-23T12:00:00.000Z' } });
  assert.equal((await f.api.PATCH(f.request(plan()))).status, 409);
  assert.equal(f.writes.length, 0);
});

test('valid saves preserve certificate identity, privacy, unrelated metadata and completion time', async () => {
  const completedAt = '2026-11-20T12:00:00.000Z';
  const f = fixture({ previous: { ...plan(), completedAt } });
  const response = await f.api.PATCH(f.request({ ...plan(), profession: 'Designer' }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  const data = await response.json();
  assert.equal(data.onboarding.completedAt, completedAt);
  assert.equal(f.stored.unsafeMetadata.tgpiAccountProfile.profession, 'Designer');
  assert.equal(f.stored.unsafeMetadata.tgpiAccountProfile.legalFullName, 'QA Synthetic Learner');
  assert.equal(f.stored.unsafeMetadata.tgpiAccountProfile.privacy.visibility, 'private');
  assert.equal(f.stored.unsafeMetadata.unrelated.keep, true);
  const second = await f.api.PATCH(f.request({ ...data.onboarding, profession: 'Researcher' }));
  assert.equal(second.status, 200);
  assert.ok((await second.json()).onboarding.updatedAt > data.onboarding.updatedAt);
});

test('100 independent user fixtures retain their own plans across successive saves', async () => {
  for (let index = 1; index <= 100; index++) {
    const f = fixture({ userId: `synthetic-${index}`, sessionId: `session-${index}`, previous: {} });
    let response = await f.api.PATCH(f.request({ ...plan(), profession: `Profession ${index}` }));
    assert.equal(response.status, 200);
    const saved = (await response.json()).onboarding;
    response = await f.api.PATCH(f.request({ ...saved, educationLevel: `Education ${index}` }));
    assert.equal(response.status, 200);
    assert.equal(f.stored.unsafeMetadata.tgpiOnboarding.profession, `Profession ${index}`);
    assert.equal(f.stored.unsafeMetadata.tgpiAccountProfile.educationLevel, `Education ${index}`);
  }
});

test('Clerk throttling returns a retryable response without changing stored data', async () => {
  const f = fixture({ storageError: { status: 429, retryAfter: 8 } });
  const response = await f.api.PATCH(f.request({ ...plan(), profession: 'New draft' }));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('retry-after'), '8');
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.equal(f.writes.length, 0);
  assert.equal(f.stored.unsafeMetadata.tgpiOnboarding.profession, 'Engineer');
});
