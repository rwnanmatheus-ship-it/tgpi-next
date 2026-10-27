import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const url = source => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString('base64');
const configUrl = url(fs.readFileSync('src/lib/localization/config.ts', 'utf8'));
const { locales, resolveLocale, negotiateLocale, isLocale } = await import(configUrl);
const { messages, translate } = await import(url(fs.readFileSync('src/lib/localization/messages.ts', 'utf8')));
test('locale validation never accepts arbitrary cookie or metadata values', () => {
  for (const value of [null, {}, '__proto__', '<script>', 'zh', 'pt']) assert.equal(isLocale(value), false);
  assert.equal(resolveLocale('Portuguese'), 'pt-BR');
  assert.equal(resolveLocale('pt-PT'), 'pt-BR');
  assert.equal(resolveLocale('Deutsch'), 'de');
  assert.equal(resolveLocale('fr-CA'), 'fr');
});
test('language negotiation respects weights, unsupported choices, and exclusions', () => {
  assert.equal(negotiateLocale('ja,fr-CA;q=0.8,en;q=0.3'), 'fr');
  assert.equal(negotiateLocale('de;q=0,it;q=0.5'), 'it');
  assert.equal(negotiateLocale('es;q=broken,pt-BR;q=0.9'), 'pt-BR');
  assert.equal(negotiateLocale(null), 'en');
  assert.equal(negotiateLocale('*'), 'en');
});
test('every registered message has all six translations and matching placeholders', () => {
  for (const [key, translations] of Object.entries(messages)) {
    const placeholders = key.match(/\{\w+\}/g)?.sort() ?? [];
    assert.deepEqual(Object.keys(translations), [...locales]);
    for (const locale of locales) {
      assert.ok(translations[locale].trim(), key + ':' + locale);
      assert.deepEqual(translations[locale].match(/\{\w+\}/g)?.sort() ?? [], placeholders);
    }
  }
  assert.equal(translate('pt-BR', 'Countries'), 'Países');
  assert.equal(translate('fr', 'Account settings for {name}', { name: '<Renan>' }), 'Paramètres du compte de <Renan>');
  assert.equal(translate('de', 'An unknown message'), 'An unknown message');
  assert.equal(translate('de', '__proto__'), '__proto__');
});
let userId = null, writes = [], fail = false;
globalThis.__localeApi = {
  auth: async () => ({ userId }),
  clerkClient: async () => ({ users: { updateUserMetadata: async (...args) => { if (fail) throw new Error('offline'); writes.push(args); } } }),
  NextResponse: { json: (body, init) => { const response = Response.json(body, init); response.cookies = { set: (name, value, options) => response.headers.set('set-cookie', `${name}=${value}; Path=${options.path}; HttpOnly; SameSite=${options.sameSite}`) }; return response; } },
};
const routeSource = fs.readFileSync('src/app/api/preferences/locale/route.ts','utf8')
  .replace(/import\s*\{([^}]+)\}\s*from\s*['"](?:@clerk\/nextjs\/server|next\/server)['"];?/g, (_, names) => `const {${names}}=globalThis.__localeApi;`)
  .replace("'@/lib/localization/config'", JSON.stringify(configUrl));
const { POST } = await import(url(routeSource));
const request = (body, origin = 'https://tgpi.test') => new Request('https://tgpi.test/api/preferences/locale', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) });
test('locale API validates origin, size and locale before writing', async () => {
  assert.equal((await POST(request({ locale: 'de' }, 'https://other.test'))).status, 403);
  assert.equal((await POST(request('{'))).status, 400);
  assert.equal((await POST(request({ locale: 'zh' }))).status, 400);
  assert.equal((await POST(request('x'.repeat(129)))).status, 413);
  assert.equal(writes.length, 0);
});
test('guest preference uses a cookie; signed-in preference merges only its own metadata key', async () => {
  let response = await POST(request({ locale: 'pt-BR' }));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie'), /tgpi_locale=pt-BR/);
  assert.equal(writes.length, 0);
  userId = 'member_1';
  response = await POST(request({ locale: 'fr', userId: 'someone_else' }));
  assert.equal(response.status, 200);
  assert.deepEqual(writes, [['member_1', { unsafeMetadata: { tgpiLocale: 'fr' } }]]);
  fail = true;
  response = await POST(request({ locale: 'de' }));
  assert.equal(response.status, 503);
  assert.equal(response.headers.has('set-cookie'), false);
});
