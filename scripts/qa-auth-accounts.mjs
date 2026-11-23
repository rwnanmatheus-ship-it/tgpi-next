import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline';
import { createClerkClient, verifyToken } from '@clerk/backend';
import { spawn } from 'node:child_process';
import { createQaRunId } from './helpers/qa-auth-runs.mjs';

// Credentials arrive over stdin and never appear in arguments, files or reports.
const lines = createInterface({ input: process.stdin });
const config = JSON.parse(await new Promise(resolve => lines.once('line', resolve)));
lines.close();
assert.ok(config.secretKey?.startsWith('sk_test_'), 'Only a Clerk DEVELOPMENT key is permitted.');
const client = createClerkClient({ secretKey: config.secretKey });
console.log('Development credentials received; starting synthetic account checks.');
let nextRequestAt = 0;
async function call(operation) {
  for (let attempt = 0; ; attempt++) {
    const wait = Math.max(0, nextRequestAt - Date.now());
    nextRequestAt = Math.max(Date.now(), nextRequestAt) + 150;
    if (wait) await new Promise(resolve => setTimeout(resolve, wait));
    try { return await operation(); }
    catch (error) {
      if (error.status !== 429 || attempt >= 5) throw error;
      const delay = Math.max(1, error.retryAfter || 10) * 1000;
      console.log(JSON.stringify({ stage: 'respecting-rate-limit', retryAfterSeconds: delay / 1000 }));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
const run = config.run || createQaRunId();
const count = config.count ?? 100;
assert.ok(Number.isInteger(count) && count > 0 && count <= 100);
const concurrency = config.concurrency ?? 5;
assert.ok(Number.isInteger(concurrency) && concurrency >= 1 && concurrency <= 5);
let localServer;
if (config.startLocal) {
  config.origin = 'http://localhost:3100';
  const serverSource = `import next from 'next'; import { createServer } from 'node:http'; const app = next({ dev: true, hostname: 'localhost', port: 3100, dir: process.cwd(), conf: { distDir: '.next-qa-auth' } }); await app.prepare(); createServer(app.getRequestHandler()).listen(3100, '127.0.0.1', () => console.log('TGPI QA API ready'));`;
  localServer = spawn(process.execPath, ['--input-type=module', '-e', serverSource], {
    env: { ...process.env, CLERK_SECRET_KEY: config.secretKey, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: config.publishableKey },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  localServer.stdout.resume();
  localServer.stderr.on('data', data => { if (/error|failed|lock/i.test(String(data))) console.error(String(data).replace(/(?:sk|pk)_(?:test|live)_\S+/g, '[redacted]')); });
  process.on('exit', () => localServer.kill());
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { const response = await fetch(`${config.origin}/api/account-profile`, { signal: AbortSignal.timeout(3000) }); if (response.status === 401) { ready = true; break; } }
    catch { /* Server is compiling the protected route. */ }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, 'Local TGPI API did not become ready.');
  console.log('Local TGPI API ready; authenticated profile and onboarding checks enabled.');
}
if (config.origin) assert.ok(['localhost', '127.0.0.1'].includes(new URL(config.origin).hostname), 'Authenticated HTTP QA is restricted to the local test server.');
let created = 0, passwordsVerified = 0, sessionsVerified = 0, revoked = 0, httpProfiles = 0, savedPlans = 0, rejectedWrites = 0, cleaned = 0;
const existing = (await call(() => client.users.getUserList({ query: run, limit: 100 }))).data.filter(user => user.privateMetadata.tgpiQa?.run === run);
const existingByIndex = new Map(existing.map(user => [user.privateMetadata.tgpiQa.index, user]));
let cursor = 1;
async function checkAccount(index) {
  const password = randomBytes(24).toString('base64url');
  const previous = existingByIndex.get(index);
  if (previous) assert.equal(previous.privateMetadata.tgpiQa?.synthetic, true, 'Existing accounts must be tagged synthetic QA fixtures.');
  const user = previous ? await call(() => client.users.updateUser(previous.id, { password })) : await call(() => client.users.createUser({
    emailAddress: [`${run}-${String(index).padStart(3, '0')}+clerk_test@example.com`],
    firstName: 'TGPI QA', lastName: `Synthetic ${index}`,
    password,
    privateMetadata: { tgpiQa: { synthetic: true, run, index } },
  }));
  created++;
  console.log(JSON.stringify({ created, stage: 'account-created' }));
  assert.equal((await call(() => client.users.verifyPassword({ userId: user.id, password }))).verified, true);
  passwordsVerified++;
  const session = await call(() => client.sessions.createSession({ userId: user.id }));
  try {
    const token = await call(() => client.sessions.getToken(session.id));
    const claims = await verifyToken(token.jwt, { secretKey: config.secretKey });
    assert.equal(claims.sub, user.id);
    assert.equal(claims.sid, session.id);
    sessionsVerified++;
    if (config.origin) {
      const response = await fetch(new URL('/api/account-profile', config.origin), {
        headers: { Authorization: `Bearer ${token.jwt}` },
      });
      assert.equal(response.status, 200, `Account ${index}: profile HTTP status`);
      assert.ok((await response.json()).profile);
      httpProfiles++;
      const headers = { Authorization: `Bearer ${token.jwt}`, 'Content-Type': 'application/json', Origin: config.origin, 'X-TGPI-Session': session.id };
      const request = body => fetch(new URL('/api/onboarding', config.origin), { method: 'PATCH', headers, body: JSON.stringify(body) });
      const first = { schemaVersion: 1, completed: false, currentStep: 1, primaryGoal: 'study', targetCountries: ['portugal'], timeHorizon: '', budgetRange: '', languages: ['English'], profession: `QA ${index}`, educationLevel: '', internationalExperience: '', priorities: [] };
      const save = await request(first);
      assert.equal(save.status, 200, `Account ${index}: first plan save: ${await save.clone().text()}`);
      const saved = (await save.json()).onboarding;
      const second = await request({ ...saved, targetCountries: ['canada'] });
      assert.equal(second.status, 200, `Account ${index}: second plan save`);
      const invalid = await request(null);
      assert.equal(invalid.status, 400);
      const stale = await request(saved);
      assert.equal(stale.status, 409);
      const wrongSession = await fetch(new URL('/api/onboarding', config.origin), { method: 'PATCH', headers: { ...headers, 'X-TGPI-Session': 'other' }, body: JSON.stringify(saved) });
      assert.equal(wrongSession.status, 401);
      rejectedWrites += 3;
      const restored = await call(() => client.users.getUser(user.id));
      assert.deepEqual(restored.unsafeMetadata.tgpiOnboarding.targetCountries, ['canada']);
      assert.equal(restored.unsafeMetadata.tgpiAccountProfile.profession, `QA ${index}`);
      savedPlans++;
    }
  } finally {
    assert.equal((await call(() => client.sessions.revokeSession(session.id))).status, 'revoked');
    revoked++;
    if (config.cleanupAfter) {
      assert.equal(user.privateMetadata.tgpiQa?.run, run);
      assert.equal(user.privateMetadata.tgpiQa?.synthetic, true);
      await call(() => client.users.deleteUser(user.id));
      cleaned++;
    }
  }
  if (index % 10 === 0 || index === count) console.log(JSON.stringify({ run, created, passwordsVerified, sessionsVerified, revoked }));
}
const outcomes = await Promise.allSettled(Array.from({ length: concurrency }, async () => {
  while (cursor <= count) await checkAccount(cursor++);
}));
console.log(JSON.stringify({ result: outcomes.every(outcome => outcome.status === 'fulfilled') ? 'passed' : 'failed', run, environment: 'development', accountsChecked: created, passwordsVerified, sessionsVerified, revoked, browserLogins: 0, httpProfiles, savedPlans, rejectedWrites, cleaned }));
for (const outcome of outcomes) if (outcome.status === 'rejected') throw outcome.reason;
localServer?.kill();
