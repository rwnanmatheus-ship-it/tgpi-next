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

test('all four home goals have complete translated guidance without changing route values', async () => {
  const { HOME_GOALS, homeGoal } = await import(url(fs.readFileSync('src/lib/home-journey.ts', 'utf8')));
  assert.deepEqual(HOME_GOALS.map(goal => goal.id), ['study', 'work', 'live', 'learn']);
  for (const goal of HOME_GOALS) {
    assert.equal(homeGoal(goal.id), goal.id);
    for (const source of [goal.label, goal.heading, goal.copy, goal.outcome, ...goal.checks]) {
      for (const locale of locales.filter(locale => locale !== 'en')) {
        assert.notEqual(translate(locale, source), source, `${locale}: ${source}`);
      }
    }
  }
});

test('home FAQ translates questions and complete answers in every supported language', async () => {
  const { HOME_FAQ } = await import(url(fs.readFileSync('src/lib/home-content.ts', 'utf8')));
  for (const item of HOME_FAQ) {
    for (const source of [item.question, item.answer]) {
      for (const locale of locales.filter(locale => locale !== 'en')) {
        assert.notEqual(translate(locale, source), source, `${locale}: ${source}`);
      }
    }
  }
});

// Resolve the actual catalogue and its dependencies, so newly added courses cannot silently fall back to English.
async function localModuleUrl(path) {
  let compiled = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const imports = [...compiled.matchAll(/from\s+["'](@\/[^"']+)["']/g)];
  for (const match of imports) compiled = compiled.replace(match[0], `from ${JSON.stringify(await localModuleUrl(`src/${match[1].slice(2)}.ts`))}`);
  return 'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64');
}
test('course catalogue cards and global journey have complete translations', async () => {
  const { coursesOverview } = await import(await localModuleUrl('src/data/courses-overview.ts'));
  const { PLATFORM_JOURNEY } = await import(await localModuleUrl('src/lib/platform-journey.ts'));
  const keys = new Set([
    ...coursesOverview.flatMap(course => [course.title, course.category, course.desc, course.format, course.series, ...course.benefits.slice(0, 2)]).filter(Boolean),
    ...PLATFORM_JOURNEY.flatMap(stage => [stage.label, stage.description]),
  ]);
  for (const key of keys) {
    assert.ok(Object.hasOwn(messages, key), `Missing catalogue entry: ${key}`);
    for (const locale of locales) assert.ok(messages[key][locale]?.trim(), `${locale}: ${key}`);
  }
});
test('all language options ship self-contained vector flags with no remote dependencies', async () => {
  const { localeOptions } = await import(configUrl);
  assert.deepEqual(localeOptions.map(option => option.code), [...locales]);
  for (const option of localeOptions) {
    const svg = fs.readFileSync(`public${option.flag}`, 'utf8');
    assert.match(svg, /<svg\b/);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["']https?:/i);
  }
});

test('home and access presentation copy cannot silently bypass the translation catalog', () => {
  const brandCopy = new Set(['TGPI', 'TGPI Premium', 'The Global Polymath Institute', 'US$ 0']);
  for (const path of ['src/components/home/v4/InstitutionalHome.tsx', 'src/components/auth/TGPIAuthShell.tsx']) {
    const source = ts.createSourceFile(path, fs.readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function registered(key) { assert.ok(Object.hasOwn(messages, key), `${path}: missing ${key}`); }
    function visit(node) {
      if (ts.isJsxText(node)) {
        const value = node.text.replace(/\s+/g, ' ').trim();
        assert.ok(!/[A-Za-z]{2}/.test(value) || brandCopy.has(value), `${path}: unlocalized visible copy: ${value}`);
      }
      if (ts.isCallExpression(node) && node.expression.getText(source) === 't' && ts.isStringLiteral(node.arguments[0])) registered(node.arguments[0].text);
      if (ts.isPropertyAssignment(node) && ['title','copy','question','text'].includes(node.name.getText(source)) && ts.isStringLiteral(node.initializer)) registered(node.initializer.text);
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
});
test('evidence labels are translated and locale formatting never changes the source value', async () => {
  const { INDICATORS, formatObservation } = await import(await localModuleUrl('src/lib/intelligence/core.ts'));
  for (const indicator of Object.values(INDICATORS)) {
    for (const key of [indicator.label, indicator.unit, indicator.explanation]) assert.ok(Object.hasOwn(messages,key), `Missing indicator copy: ${key}`);
  }
  const observation = { indicator: 'SE.TER.ENRR', value: 77.7 };
  assert.equal(formatObservation(observation, 'pt-BR'), '77,7');
  assert.equal(formatObservation(observation, 'en'), '77.7');
  assert.equal(observation.value, 77.7);
  assert.equal(formatObservation(undefined, 'pt-BR'), 'Not available');
});

test('Atlas and recovery copy, accessible labels, and known service errors have six-language coverage', () => {
  const paths = [
    'src/components/navigation/JourneyContinuation.tsx', 'src/app/error.tsx', 'src/app/profile/error.tsx', 'src/app/profile/loading.tsx',
    'src/app/loading.tsx', 'src/app/global-key/error.tsx', 'src/app/global-key/loading.tsx',
    'src/app/countries/[slug]/not-found.tsx', 'src/components/atlas/AtlasChat.tsx',
    'src/components/atlas/AtlasWidget.tsx', 'src/lib/atlas/contracts.ts',
    'src/lib/atlas/http.server.ts', 'src/lib/atlas/store.server.ts',
    'src/lib/atlas/context.ts', 'src/app/api/atlas/chat/route.ts',
    'src/app/api/atlas/conversations/route.ts',
  ];
  const brands = new Set(['TGPI Global ID', 'TGPI ATLAS AI', 'TGPI Atlas AI', 'Atlas', 'AI']);
  for (const path of paths) {
    const source = ts.createSourceFile(path, fs.readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function registered(key) {
      assert.ok(Object.hasOwn(messages, key), `${path}: missing ${key}`);
      for (const locale of locales) assert.ok(messages[key][locale]?.trim(), `${locale}: ${key}`);
    }
    function visit(node) {
      if (ts.isJsxText(node)) {
        const value = node.text.replace(/\s+/g, ' ').trim();
        assert.ok(!/[A-Za-z]{2}/.test(value) || brands.has(value), `${path}: untranslated copy: ${value}`);
      }
      if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
        if (['text', 'alt', 'aria-label', 'placeholder'].includes(node.name.text) && node.initializer.text) registered(node.initializer.text);
      }
      if (ts.isNewExpression(node) && node.expression.getText(source) === 'AtlasError' && ts.isStringLiteral(node.arguments?.[0])) registered(node.arguments[0].text);
      if (ts.isCallExpression(node) && ['t', 'setError', 'setNotice'].includes(node.expression.getText(source)) && ts.isStringLiteral(node.arguments[0]) && node.arguments[0].text) registered(node.arguments[0].text);
      // Public stream failures and profile-sharing factors must not bypass the catalog.
      if (path.endsWith('/api/atlas/chat/route.ts') && ts.isStringLiteral(node) && /(?:reply|retrying)\.$/.test(node.text)) registered(node.text);
      if (path.endsWith('/atlas/context.ts') && ts.isCallExpression(node) && node.expression.getText(source) === 'factors.push') registered(node.arguments[0].text);
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
});

test('Atlas preview renders in all six locales without enabling sending or making API requests', async () => {
  const React = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const code = ts.transpileModule(fs.readFileSync('src/components/atlas/AtlasChat.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const runtime = await import('react/jsx-runtime');
  const realFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('Rendering must not issue an API request'); };
  try {
    for (const locale of locales) {
      const exports = {};
      const t = key => translate(locale, key);
      new Function('require', 'exports', code)(name => {
        if (name === 'react') return React;
        if (name === 'react/jsx-runtime') return runtime;
        if (name === '@/components/localization/LocaleProvider') return { useLocale: () => ({ locale, t }), LocalizedText: ({ text }) => t(text) };
        if (name === 'next/image') return { __esModule: true, default: ({ alt }) => React.createElement('span', { 'data-alt': alt }) };
        if (name === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
        if (name === 'react-markdown') return { __esModule: true, default: ({ children }) => children };
        if (name === 'remark-gfm') return { __esModule: true, default: () => {} };
        if (name.endsWith('.module.css')) return { __esModule: true, default: {} };
        if (name === '@/lib/atlas/contracts') return { safeAtlasLink: value => value };
        throw new Error(`Unexpected import: ${name}`);
      }, exports);
      const html = renderToStaticMarkup(React.createElement(exports.default, { userId: 'localization-test', enabled: false }));
      const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
      for (const key of ['New conversation', 'Help me compare two destinations.', 'Atlas preview', 'Message Atlas', 'Ask Atlas anything…', 'For your next question, share selected fields from your TGPI profile with OpenAI. Unchecking a category stops future retrieval; previous replies may still contain it. Start a new conversation for a fresh context.']) assert.ok(html.includes(escape(t(key))), `${locale}: ${key}`);
      assert.match(html, /<button type="submit" disabled=""/);
      assert.match(html, /maxLength="4000"/);
    }
  } finally { globalThis.fetch = realFetch; }
});

test('cookies and refund policies translate every paragraph without changing links or consent defaults', async () => {
  const React = await import('react');
  const runtime = await import('react/jsx-runtime');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
  for (const locale of locales) {
    function load(path) {
      const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
      const exports = {};
      new Function('require', 'exports', code)(name => {
        if (name === 'react') return React;
        if (name === 'react/jsx-runtime') return runtime;
        if (name === '@/lib/localization/server') return { getLocale: async () => locale };
        if (name === '@/lib/localization/messages') return { translate };
        if (name === '@/components/localization/LocaleProvider') return { useLocale: () => ({ t: (key, values) => translate(locale, key, values) }), LocalizedText: ({ text }) => translate(locale, text) };
        if (name === '@/lib/funnel') return { FUNNEL_CONSENT_COOKIE: 'tgpi_analytics_consent', hasFunnelConsent: () => false };
        if (name === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
        if (name === '@/components/legal/LegalDocument') return { __esModule: true, default: () => null };
        if (name === '@/components/analytics/AnalyticsPreferences') return { __esModule: true, default: load('src/components/analytics/AnalyticsPreferences.tsx').default };
        throw new Error(`Unexpected import: ${name}`);
      }, exports);
      return exports;
    }
    for (const route of ['cookies', 'refunds', 'privacy']) {
      const path = `src/app/${route}/page.tsx`;
      const sourceText = fs.readFileSync(path, 'utf8');
      const source = ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const keys = [];
      function visit(node) {
        if (ts.isJsxText(node)) {
          const text = node.text.replace(/\s+/g, ' ').trim();
          assert.ok(!/[a-z]{2}/i.test(text) || text === 'contact@theglobalpolymath.com', `Untranslated policy text: ${text}`);
        }
        if (ts.isCallExpression(node) && node.expression.getText(source) === 't' && ts.isStringLiteral(node.arguments[0])) {
          const key = node.arguments[0].text;
          assert.ok(Object.hasOwn(messages, key), `Missing legal translation: ${key}`);
          keys.push(key);
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
      const page = load(path);
      const element = await page.default();
      const shell = await load('src/components/legal/LegalDocument.tsx').default(element.props);
      const html = renderToStaticMarkup(shell);
      const metadata = await page.generateMetadata();
      for (const key of keys) assert.ok((html + metadata.title + metadata.description).includes(escape(translate(locale, key))) || (metadata.title + metadata.description).includes(translate(locale, key)), `${locale}: ${key}`);
      assert.ok(html.includes('mailto:contact@theglobalpolymath.com'));
      assert.ok(html.includes('CNPJ 49.709.438/0001-32'));
      assert.ok(html.includes(escape(new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.parse('October 13, 2026')))));
      if (route === 'cookies') {
        assert.match(html, /aria-pressed="false"[^>]*>/);
        assert.match(html, /aria-pressed="true"[^>]*>/);
        assert.ok(html.includes(escape(translate(locale, 'Keep measurement off'))));
        assert.ok(html.includes(escape(translate(locale, 'Your preference: {status}. You can change it here at any time. Changes apply to future browser events; previously recorded aggregate counts cannot identify you.', { status: translate(locale, 'off') }))));
      }
    }
  }
});

test('account language is resolved on the server; stale browser state cannot overwrite it', async () => {
  const source = fs.readFileSync('src/lib/localization/preference.ts', 'utf8').replace("'./config'", JSON.stringify(configUrl));
  const { preferredLocale, readLocaleSignal } = await import(url(source));
  assert.equal(preferredLocale('Deutsch', 'pt-BR', 'en'), 'de');
  assert.equal(preferredLocale('French', 'en', 'pt-BR'), 'fr');
  assert.equal(preferredLocale('unsupported', 'it', 'en'), 'it');
  assert.equal(preferredLocale(null, '<script>', 'es'), 'es');
  assert.equal(readLocaleSignal(JSON.stringify({ locale: 'pt-BR', at: 123 })), 'pt-BR');
  for (const raw of [null, '{', JSON.stringify({ locale: 'zh' }), JSON.stringify({ locale: {} }), ' '.repeat(129)]) assert.equal(readLocaleSignal(raw), undefined);
  const provider = fs.readFileSync('src/components/localization/LocaleProvider.tsx', 'utf8');
  assert.doesNotMatch(provider, /user\.unsafeMetadata|changeLocale\(saved\)/, 'Signing in must not POST a stale account language');
});

test('English can translate Portuguese source copy, without changing identifiers or placeholders', () => {
  assert.equal(translate('en', 'Países'), 'Countries');
  assert.equal(translate('en', 'Falha no envio.'), 'Upload failed.');
  assert.equal(translate('en', ' · essencial, mínimo {minimum}%', { minimum: 80 }), ' · essential, minimum 80%');
  assert.equal(translate('pt-BR', 'Falha no envio.'), 'Falha no envio.');
  assert.equal(translate('fr', 'stable-course-id'), 'stable-course-id');
});

test('practice interface follows all six locales while English rehearsal input keeps its learning language', async () => {
  const React = await import('react');
  const runtime = await import('react/jsx-runtime');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const code = ts.transpileModule(fs.readFileSync('src/components/courses/ActiveRecallPractice.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
  for (const locale of locales) {
    const exports = {};
    const t = (key, values) => translate(locale, key, values);
    new Function('require', 'exports', code)(name => {
      if (name === 'react') return React;
      if (name === 'react/jsx-runtime') return runtime;
      if (name === '@/components/localization/LocaleProvider') return { useLocale: () => ({ locale, t }), LocalizedText: ({ text }) => t(text) };
      throw Error(name);
    }, exports);
    for (const applied of [false, true]) {
      const html = renderToStaticMarkup(React.createElement(exports.default, { lesson: { id: 'unchanged-lesson-id', dialogue: [] }, applied }));
      assert.ok(html.includes(escape(t('Your real-world rehearsal'))), locale);
      assert.ok(html.includes(escape(t('Start with your purpose. Add the essential detail. Confirm the next step.'))), locale);
      assert.ok(html.includes(`lang="${applied ? locale : 'en'}"`), locale);
      assert.ok(html.includes('id="rehearsal-unchanged-lesson-id"'));
      assert.equal((html.match(/type="checkbox"/g) || []).length, 4);
      assert.ok(html.includes(escape(t(applied ? 'I used traceable evidence and stated uncertainty.' : 'I stated the purpose before adding details.'))));
    }
  }
});

test('global installation, offline and update notices have six-language copy', () => {
  const path = 'src/components/app-runtime/TgpiAppRuntime.tsx';
  const source = ts.createSourceFile(path, fs.readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const keys = [];
  function visit(node) {
    if (ts.isPropertyAssignment(node) && ['eyebrow', 'title', 'description'].includes(node.name.getText(source)) && ts.isStringLiteral(node.initializer)) keys.push(node.initializer.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.equal(keys.length, 12);
  for (const key of keys) for (const locale of locales) assert.ok(messages[key]?.[locale]?.trim(), `${locale}: ${key}`);
});
