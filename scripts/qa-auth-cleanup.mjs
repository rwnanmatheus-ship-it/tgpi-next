import assert from 'node:assert/strict';
import { createInterface } from 'node:readline';
import { createClerkClient } from '@clerk/backend';
import { isQaRunId } from './helpers/qa-auth-runs.mjs';

const lines = createInterface({ input: process.stdin });
const config = JSON.parse(await new Promise(resolve => lines.once('line', resolve)));
lines.close();
assert.ok(config.secretKey?.startsWith('sk_test_'), 'Development instance required.');
assert.ok(Array.isArray(config.runs) && config.runs.length && config.runs.every(isQaRunId));
const client = createClerkClient({ secretKey: config.secretKey });
let removed = 0;
for (const run of config.runs) {
  const { data } = await client.users.getUserList({ query: run, limit: 100 });
  for (const user of data) {
    if (user.privateMetadata.tgpiQa?.run !== run) continue;
    assert.equal(user.privateMetadata.tgpiQa.synthetic, true);
    assert.ok(user.emailAddresses.every(email => email.emailAddress.endsWith('+clerk_test@example.com')));
    await client.users.deleteUser(user.id);
    removed++;
  }
}
for (const run of config.runs) {
  const { data } = await client.users.getUserList({ query: run, limit: 100 });
  assert.equal(data.filter(user => user.privateMetadata.tgpiQa?.run === run).length, 0);
}
console.log(JSON.stringify({ result: 'passed', environment: 'development', removed, remainingTestAccounts: 0, preexistingAccounts: 'untouched' }));
