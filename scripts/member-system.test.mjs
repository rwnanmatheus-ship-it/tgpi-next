import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { PDFDocument } from 'pdf-lib';
import { normalizeTgpiAccountProfile, canViewTgpiProfile } from '../src/lib/account-profile.ts';
import { normalizeHandle, handleError, memberLookup, HANDLE_CHANGE_INTERVAL } from '../src/lib/members/identity.ts';
import { projectPublicMember } from '../src/lib/members/public-profile.ts';
import { selectMemberExport } from '../src/lib/members/export-selection.ts';
import { createMemberPdf } from '../src/lib/members/member-pdf.ts';
function loadModule(path, services) {
  const testModule = { exports: {} };
  runInNewContext(ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText,
    { module: testModule, exports: testModule.exports, require: name => { if (!(name in services)) throw new Error(`Unexpected dependency ${name}`); return services[name]; }, Response, Request, URL, Buffer, TextEncoder, console: { error() {} }, Date, Set });
  return testModule.exports;
}
const base = { profile: normalizeTgpiAccountProfile({ displayName: 'José François da Silva Fernandes — Member Test', bio: 'A public biography.', legalFullName: 'PRIVATE_LEGAL_NAME', dateOfBirth: '2001-02-11', currentCity: 'PRIVATE_CITY', profession: 'Engineer', languages: ['Portuguese'], website: 'https://example.com', privacy: { visibility: 'public' } }), identity: { number: 'TGPI-AAAA-BBBB-CCCC', handle: 'member_test', changedAt: '' }, fallbackNumber: 'TGPI-AAAA-BBBB-CCCC', name: 'Test member', avatar: '', country: 'Brazil', goal: 'Study abroad', countries: [{ name: 'Portugal', path: '/countries/portugal' }], rank: { name: 'Explorer', points: 800 }, courses: [{ title: 'Completed course', path: '/courses/course' }], certificates: [{ title: 'Real credential', path: '/verify/credentials/test' }] };
test('legacy profiles default to no discovery, no indexing and no optional public fields', () => {
  const p = normalizeTgpiAccountProfile({});
  for (const key of ['discoverable', 'allowIndexing', 'showCareer', 'showLanguages', 'showLinks']) assert.equal(p.privacy[key], false);
  assert.equal(p.privacy.visibility, 'private');
});
test('identity normalization excludes unicode confusables and reserved names', () => {
  assert.equal(normalizeHandle(' @MEMBER_Test '), 'member_test');
  for (const value of ['a', 'admin', 'suporte', 'tgpi_staff', 'аdmin', 'hello.world', 'a'.repeat(31)]) assert.ok(handleError(value));
  assert.equal(handleError('member_123'), '');
  assert.deepEqual(memberLookup('tgpi-aaaa-bbbb-cccc'), { kind: 'numbers', key: 'TGPI-AAAA-BBBB-CCCC' });
  assert.equal(memberLookup('private@email.com'), null);
});
test('public projection cannot serialize private fields or infer absent declarations', () => {
  const projected = projectPublicMember(base); const json = JSON.stringify(projected);
  for (const key of ['PRIVATE_CITY', 'PRIVATE_LEGAL_NAME', '2001-02-11', 'email', 'ownerUid', 'budgetRange']) assert.equal(json.includes(key), false);
  assert.deepEqual(projected.career, []); assert.deepEqual(projected.languages, []); assert.deepEqual(projected.links, []); assert.deepEqual(projected.courses, []); assert.equal(projected.rank, null); assert.equal(projected.goal, '');
  assert.equal(projected.indexable, false);
});
test('public and export group choices intersect, never expand publication permissions', () => {
  const member = projectPublicMember({ ...base, profile: normalizeTgpiAccountProfile({ ...base.profile, privacy: { ...base.profile.privacy, showCareer: true, showGoals: true, allowIndexing: true } }) });
  assert.deepEqual(member.career, ['Engineer']); assert.equal(member.indexable, true);
  const none = selectMemberExport(member, []); assert.deepEqual(none.career, []); assert.equal(none.goal, '');
  const chosen = selectMemberExport(member, ['career', 'progress', 'goals']); assert.deepEqual(chosen.career, ['Engineer']); assert.equal(chosen.rank, null); assert.equal(chosen.goal, 'Study abroad'); assert.equal(chosen.country, '');
  const membersOnly = projectPublicMember({ ...base, profile: normalizeTgpiAccountProfile({ privacy: { visibility: 'members', allowIndexing: true } }) }); assert.equal(membersOnly.indexable, false);
});
function registry() {
  const docs = new Map(); let queue = Promise.resolve();
  const services = {
    'server-only': {},
    '@/lib/auth/guards': { formatTgpiGlobalId: uid => `TGPI-${uid.padEnd(12, '0').slice(0,12)}` },
    './identity': { HANDLE_CHANGE_INTERVAL, handleError, normalizeHandle },
    '@/lib/firestore-admin-rest.server': {
      isLearningStorageConfigured: () => true,
      createFirestoreUpdateWrite: (path, data) => ({ path, data }),
      getFirestoreDocument: async path => docs.has(path) ? { data: structuredClone(docs.get(path)) } : null,
      runFirestoreTransaction: build => {
        const result = queue.then(async () => { const plan = await build({ getDocuments: async paths => new Map(paths.map(path => [path, docs.has(path) ? { data: structuredClone(docs.get(path)) } : null])) });
          for (const write of plan.writes) docs.set(write.path, structuredClone(write.data)); return plan.result; });
        queue = result.catch(() => {}); return result;
      },
    },
  };
  return { api: loadModule('../src/lib/members/identity.server.ts', services), docs };
}
test('two concurrent claims have one winner; case variants cannot bypass uniqueness (transactional storage fixture)', async () => {
  const { api } = registry();
  const results = await Promise.allSettled([api.claimMemberIdentity('owner1','Shared_ID'), api.claimMemberIdentity('owner2','shared_id')]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length,1);
  assert.equal(results.find(r => r.status === 'rejected').reason.status,409);
});
test('number creation preserves current identity and old handles remain reserved after rename', async () => {
  const { api, docs } = registry();
  const first = await api.ensureMemberNumber('owner1'); assert.equal(first.handle, '');
  const created = await api.claimMemberIdentity('owner1','first_id'); assert.equal(created.number, first.number);
  await assert.rejects(api.claimMemberIdentity('owner1','second_id'), e => e.status === 429);
  docs.get('tgpiLearningUsers/owner1/memberIdentity/current').changedAt = '2020-01-01T00:00:00Z';
  await api.claimMemberIdentity('owner1','second_id');
  assert.equal(await api.resolveMember('handles','first_id'), 'owner1');
  await assert.rejects(api.claimMemberIdentity('owner2','first_id'), e => e.status === 409);
});
test('search frequency limits are shared through storage transactions', async () => {
  const { api } = registry();
  await Promise.all(Array.from({ length: 15 }, () => api.consumeMemberLookup('owner')));
  await assert.rejects(api.consumeMemberLookup('owner'), e => e.status === 429);
});
function searchRoute({ signedIn = true, discoverable = true, visibility = 'members' } = {}) {
  return loadModule('../src/app/api/members/route.ts', {
    '@clerk/nextjs/server': { auth: async () => ({ userId: signedIn ? 'viewer' : null }), clerkClient: async () => ({ users: { getUser: async () => ({ id: 'PRIVATE_UID', fullName: 'Public name', imageUrl: '', email: 'PRIVATE_EMAIL', unsafeMetadata: { tgpiAccountProfile: { privacy: { discoverable, visibility } } } }) } }) },
    '@/lib/account-profile': { normalizeTgpiAccountProfile, canViewTgpiProfile },
    '@/lib/members/identity': { memberLookup },
    '@/lib/members/identity.server': { consumeMemberLookup: async () => {}, resolveMember: async () => 'PRIVATE_UID', getMemberIdentity: async () => base.identity, MemberInputError: class extends Error {} },
  });
}
test('member search rejects visitors and returns no private identifiers or hidden profiles', async () => {
  const req = new Request('https://tgpi.test/api/members?q=@member_test');
  assert.equal((await searchRoute({ signedIn: false }).GET(req)).status,401);
  for (const options of [{ discoverable: false }, { visibility: 'private' }]) assert.deepEqual(await (await searchRoute(options).GET(req)).json(), { members: [] });
  const response = await searchRoute().GET(req); const text = await response.text();
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.ok(text.includes('Public name')); assert.equal(text.includes('PRIVATE_UID'), false); assert.equal(text.includes('PRIVATE_EMAIL'), false);
});
test('PDF embeds fonts, logo and QR, and grows to additional pages for long content', async () => {
  const member = projectPublicMember({ ...base, profile: normalizeTgpiAccountProfile({ ...base.profile, privacy: { ...base.profile.privacy, showCareer: true, showGoals: true } }) });
  const bytes = await createMemberPdf(member); const pdf = await PDFDocument.load(bytes);
  assert.equal(pdf.getPageCount(),1); assert.equal(pdf.getTitle(), `${member.name} — TGPI Member Profile`); assert.ok(bytes.length > 10_000);
  const long = await PDFDocument.load(await createMemberPdf({ ...member, name: 'José '.repeat(80), bio: 'Long multilingual profile. '.repeat(250) }));
  assert.ok(long.getPageCount() > 1);
});
test('profile export rejects anonymous and private profiles (real route, isolated services)', async () => {
  let signedIn = false; let visibility = 'public'; let currentReads = 0;
  const route = loadModule('../src/app/api/member-export/route.ts', {
    '@clerk/nextjs/server': { auth: async () => ({ userId: signedIn ? 'owner' : null }), currentUser: async () => { currentReads++; return {}; } },
    'node:fs/promises': { readFile: async () => Buffer.from('crest') }, 'node:path': { default: {} },
    qrcode: { toDataURL: async () => 'data:image/png;base64,test' },
    '@/lib/members/public-profile.server': { buildPublicMember: async () => ({ ...projectPublicMember(base), visibility }) },
    '@/lib/members/export-selection': { selectMemberExport },
    '@/lib/members/member-pdf': { createMemberPdf },
  });
  const request = () => new Request('https://tgpi.test/api/member-export', { method: 'POST', body: JSON.stringify({ format: 'pdf', selected: [] }) });
  assert.equal((await route.POST(request())).status,401); assert.equal(currentReads,0);
  signedIn = true; visibility = 'private'; assert.equal((await route.POST(request())).status,409);
  visibility = 'public'; const response = await route.POST(request()); assert.equal(response.status,200); assert.equal(response.headers.get('content-type'),'application/pdf'); assert.equal(response.headers.get('cache-control'),'private, no-store');
  assert.equal((await PDFDocument.load(await response.arrayBuffer())).getPageCount(),1);
});
