import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import { parsePreferences, welcomeEvent } from '../src/lib/notifications/model.ts';
const require = createRequire(import.meta.url);
function harness() {
  const users = new Map(['A','B'].map(id => [id, { createdAt: Date.now(), privateMetadata: { existing: 'preserved' } }]));
  const module = { exports: {} };
  const mockClient = { users: { updateUserMetadata: async (uid, input) => { const user = users.get(uid); Object.assign(user.privateMetadata, input.privateMetadata); } } };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL('../src/lib/notifications/account-inbox.server.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { module, exports: module.exports, Buffer, Date, console, require: name => name === 'server-only' ? {} : name.includes('clerk') ? { clerkClient: async () => mockClient } : name.includes('reconcile') ? { collectNotificationEvents: async uid => ({ events: [welcomeEvent, { ...welcomeEvent, key: "next:sample", category: "planning" }], user: users.get(uid) }) } : name === './model' ? { parsePreferences } : require(name) });
  return { api: module.exports, users };
}
test('account mode persists read and preferences without modifying other private metadata', async () => {
  const { api, users } = harness();
  const first = await api.accountInbox('A');
  await api.updateAccountInbox('A', { id: first.items[0].id, action: 'read' });
  assert.ok((await api.accountInbox('A')).items[0].readAt);
  assert.equal((await api.accountInbox('B')).items[0].readAt, null);
  assert.equal(await api.updateAccountInbox('B', { id: first.items[0].id, action: 'archive' }), false);
  await api.updateAccountInbox('A', { action: 'preferences', preferences: { emailImportant: false } });
  assert.equal((await api.accountInbox('A')).preferences.emailImportant, false);
  assert.equal(users.get('A').privateMetadata.existing, 'preserved');
  assert.equal((await api.accountInbox('A')).emailDelivery, 'not_connected');
});
test('observed timestamps survive reloads, bulk read and archive changes', async () => {
  const { api } = harness();
  const first = await api.accountInbox('A');
  const again = await api.accountInbox('A');
  assert.equal(first.items[0].createdAt, again.items[0].createdAt);
  assert.equal(first.items.find(item => item.key === 'account:welcome:v1').timestampKind, 'event');
  assert.equal(first.items.find(item => item.key === 'next:sample').timestampKind, 'observed');
  assert.equal(first.items.find(item => item.key === 'next:sample').createdAt, again.items.find(item => item.key === 'next:sample').createdAt);
  await api.updateAccountInbox('A', { action: 'read_all' });
  assert.ok((await api.accountInbox('A')).items.every(item => item.readAt));
});
