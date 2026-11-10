import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const url = source => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString('base64');
const configUrl = url(fs.readFileSync('src/lib/localization/config.ts', 'utf8'));
const { locales, resolveLocale, negotiateLocale, isLocale } = await import(configUrl);
const { messages, translate, registerSupplementalMessages } = await import(url(fs.readFileSync('src/lib/localization/messages.ts', 'utf8')));
for (const locale of locales) registerSupplementalMessages(locale, JSON.parse(fs.readFileSync(`public/locales/${locale}.json`, 'utf8')));
const mockReact = await import('react');
function localizationDependency(name, locale) {
  const t = (text, values) => typeof text === 'string' ? translate(locale, text, values) : text;
  if (name === '@/components/localization/LocaleProvider') return { useLocale: () => ({ locale, t }), LocalizedText: ({ text, values }) => t(text, values) };
  if (name === '@/components/localization/LocalizedElement') return { LocalizedElement: ({ as, ...props }) => mockReact.createElement(as, Object.fromEntries(Object.entries(props).map(([key, value]) => [key, ['aria-label', 'title', 'placeholder', 'alt'].includes(key) ? t(value) : value]))) };
  if (name === '@/components/localization/LocalizedImage') return { __esModule: true, default: ({ fill, priority, ...props }) => mockReact.createElement('img', { ...props, alt: t(props.alt) }) };
  if (name === '@/components/localization/LocalizedLink') return { __esModule: true, default: ({ prefetch, ...props }) => mockReact.createElement('a', { ...props, 'aria-label': t(props['aria-label']) }) };
  if (name === '@/lib/localization/authored-content' || name === '@/lib/localization/metadata.server') {
    const file = name.endsWith('authored-content') ? 'authored-content.ts' : 'metadata.server.ts';
    const exports = {};
    const compiled = ts.transpileModule(fs.readFileSync('src/lib/localization/' + file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    new Function('require', 'exports', compiled)(dependency => dependency === 'server-only' ? {} : dependency === './server' ? { getLocale: async () => locale } : { translate }, exports);
    return exports;
  }
}
const { walletCopy } = await import(url(fs.readFileSync('src/lib/wallet/copy.ts', 'utf8')));
const { atlasFreeCopy } = await import(url(fs.readFileSync('src/lib/atlas/free-copy.ts', 'utf8')));
test('locale validation never accepts arbitrary cookie or metadata values', () => {
  for (const value of [null, {}, '__proto__', '<script>', 'zh', 'pt']) assert.equal(isLocale(value), false);
  assert.equal(resolveLocale('Portuguese'), 'pt-BR');
  assert.equal(resolveLocale('pt-PT'), 'pt-BR');
  assert.equal(resolveLocale('Deutsch'), 'de');
  assert.equal(resolveLocale('fr-CA'), 'fr');
  for (const value of ['__proto__', 'constructor', 'constructor-XX']) {
    assert.equal(resolveLocale(value), undefined);
    assert.equal(negotiateLocale(value + ',fr;q=0.9'), 'fr');
  }
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
  if (!fs.existsSync(path) && path.endsWith('.ts')) path = path.slice(0, -3) + '/index.ts';
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
    'src/components/navigation/PageLoading.tsx', 'src/app/global-key/error.tsx', 'src/app/global-key/loading.tsx',
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
        if (localizationDependency(name, locale)) return localizationDependency(name, locale);
        if (name === 'next/image' || name === '@/components/ui/CinematicImage') return { __esModule: true, default: ({ alt }) => React.createElement('span', { 'data-alt': alt }) };
        if (name === 'next/link') return { __esModule: true, default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
        if (name === 'react-markdown') return { __esModule: true, default: ({ children }) => children };
        if (name === 'remark-gfm') return { __esModule: true, default: () => {} };
        if (name.endsWith('.module.css')) return { __esModule: true, default: {} };
        if (name === '@/lib/wallet/copy') return { walletCopy };
        if (name === '@/lib/atlas/free-copy') return { atlasFreeCopy };
        if (name === '@/lib/atlas/contracts') return { safeAtlasLink: value => value };
        throw new Error(`Unexpected import: ${name}`);
      }, exports);
      const html = renderToStaticMarkup(React.createElement(exports.default, { userId: 'localization-test', enabled: false }));
      const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
      for (const key of ['New conversation', 'Help me compare two destinations.', 'Atlas preview', 'Message Atlas', 'Ask Atlas anything…', 'For your next question, share selected fields from your TGPI profile with OpenAI. Unchecking a category stops future retrieval; previous replies may still contain it. Start a new conversation for a fresh context.']) assert.ok(html.includes(escape(t(key))), `${locale}: ${key}`);
      assert.match(html, /<button type="submit" disabled=""/);
      assert.match(html, /maxLength="4000"/);
      assert.ok(html.includes(escape(walletCopy[locale].walletLink)));
      const freeHtml = renderToStaticMarkup(React.createElement(exports.default, { userId: 'localization-test', enabled: true, sponsored: true }));
      assert.ok(freeHtml.includes(escape(atlasFreeCopy[locale].banner)));
      assert.ok(freeHtml.includes(escape(atlasFreeCopy[locale].privacy)));
      assert.ok(!freeHtml.includes('href="/atlas/wallet"'));
      assert.ok(!freeHtml.includes(escape(t('Search loaded history'))));
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
        if (localizationDependency(name, locale)) return localizationDependency(name, locale);
        if (name === '@/lib/funnel') return { FUNNEL_CONSENT_COOKIE: 'tgpi_analytics_consent', hasFunnelConsent: () => false };
        if (name === 'next/link') return { __esModule: true, default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
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

test('explicit device language wins; account preference restores on a new device', async () => {
  const source = fs.readFileSync('src/lib/localization/preference.ts', 'utf8').replace("'./config'", JSON.stringify(configUrl));
  const { preferredLocale, readLocaleSignal } = await import(url(source));
  assert.equal(preferredLocale('Deutsch', 'pt-BR', 'en'), 'pt-BR');
  assert.equal(preferredLocale('French', 'en', 'pt-BR'), 'en');
  assert.equal(preferredLocale('unsupported', 'it', 'en'), 'it');
  assert.equal(preferredLocale('French', undefined, 'en'), 'fr');
  assert.equal(preferredLocale('Deutsch', 'invalid', 'en'), 'de');
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
      if (localizationDependency(name, locale)) return localizationDependency(name, locale);
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

test('course overview localizes controls and counts unique lessons without granting a credential', async () => {
  const React = await import('react'), runtime = await import('react/jsx-runtime');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const data = await import(await localModuleUrl('src/data/courses.ts'));
  const standards = await import(await localModuleUrl('src/lib/learning-standard.ts'));
  const original = data.courses.find(course => course.id === 'global-english-2026');
  const lesson = original.modules[0].lessons[0];
  const course = { ...original, modules: [{ ...original.modules[0], lessons: [lesson] }] };
  const code = ts.transpileModule(fs.readFileSync('src/components/courses/CourseOverviewExperience.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  for (const locale of locales) {
    const exports = {}, t = (key, values) => translate(locale, key, values);
    new Function('require', 'exports', code)(name => {
      if (name === 'react') return React;
      if (name === 'react/jsx-runtime') return runtime;
      if (name === 'next/link') return { __esModule: true, default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
      if (localizationDependency(name, locale)) return localizationDependency(name, locale);
      if (name === '@/components/activation/ActivationProgressProvider') return { __esModule: true, default: ({ children }) => children, useActivationProgress: () => ({ error: '', isAuthenticated: false, isLoading: false, mutate: () => { throw Error('Render cannot write progress'); }, progress: { courseProgress: { [course.id]: { completedLessonIds: [lesson.id, lesson.id, 'removed-lesson'] } } } }) };
      if (name === '@/data/courses') return data;
      if (name === '@/lib/learning-standard') return standards;
      throw Error(`Unexpected import: ${name}`);
    }, exports);
    const element = React.createElement(exports.default, { course });
    const html = renderToStaticMarkup(element);
    assert.ok(html.includes(`lang="${locale}"`));
    assert.match(html, /aria-valuenow="100"/);
    assert.ok(html.includes(t('Lessons completed')));
    assert.ok(html.includes(t('Assessment required')));
    assert.ok(html.includes(t('Curriculum structure')));
    for (const key of ['Modules', 'Lessons', 'Review course', 'Resume your studies', 'Start first lesson', 'Live now', 'Preview ready', 'Credential gate', 'Evidence before certification.', 'The certificate will name what you can actually do.']) assert.ok(Object.hasOwn(messages, key), key);
    assert.ok(html.includes(t('Review course')));
    assert.ok(html.includes(t('Evidence before certification.')));
    assert.ok(html.includes(`/courses/${course.id}/certification`));
    assert.doesNotMatch(html, /aria-valuenow="200"/);
    const empty = renderToStaticMarkup(React.createElement(exports.default, { course: { ...course, modules: [] } }));
    assert.match(empty, /aria-valuenow="0"/);
    assert.ok(!empty.includes(t('Lessons completed')));
  }
});

test('workspace server presentation follows locale and preserves private identity and canonical destinations', async () => {
  const React = await import('react'), runtime = await import('react/jsx-runtime');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const code = ts.transpileModule(fs.readFileSync('src/components/profile/GlobalWorkspaceOS.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const props = { identity: { fullName: 'Test <Learner>', membership: 'TGPI Free', profileCompletion: 0, globalId: 'TGPI-TEST', publicProfileUrl: '/member/TGPI-TEST' }, model: { actions: [], activationStats: [], journey: [], progress: [], planSummary: [], goalLabel: 'Goal not defined', completion: 0, countryFits: [] }, rank: { name: 'Pathfinder', points: 0 }, resources: [], history: [], preferences: {}, userId: 'synthetic-render-only', learning: { items: [], unavailable: [] } };
  for (const locale of locales) {
    const exports = {}, t = (key, values) => translate(locale, key, values);
    new Function('require', 'exports', code)(name => {
      if (name === 'react') return React;
      if (name === 'react/jsx-runtime') return runtime;
      if (name === '@/lib/localization/server') return { getLocale: async () => locale };
      if (name === '@/lib/localization/messages') return { translate };
      if (localizationDependency(name, locale)) return localizationDependency(name, locale);
      if (name === 'next/link') return { __esModule: true, default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
      if (name === 'next/image') return { __esModule: true, default: () => null };
      if (name === '@/lib/super-app') return { SUPER_APP_MODULES: [] };
      if (name === '@/lib/navigation-system') return { getSuperAppIconName: () => 'graph' };
      if (name === '@/lib/global-ranks') return { GLOBAL_RANK_DISCLAIMER: 'Test disclaimer' };
      if (name.endsWith('.module.css')) return { __esModule: true, default: {} };
      if (name === '@/components/courses/ContinueLearning') {
        const child = {}, childCode = ts.transpileModule(fs.readFileSync('src/components/courses/ContinueLearning.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
        new Function('require', 'exports', childCode)(dependency => {
          if (dependency === 'react') return React;
          if (dependency === 'react/jsx-runtime') return runtime;
          if (dependency === '@clerk/nextjs') return { useAuth: () => ({ userId: 'synthetic-render-only', isLoaded: true }) };
          if (localizationDependency(dependency, locale)) return localizationDependency(dependency, locale);
          if (dependency === '@/lib/learning/unified-progress') return { learningStatusLabels: {} };
          if (dependency === '@/lib/progress-sync') return { PROGRESS_SYNC_EVENT: 'synthetic-test' };
          if (dependency === 'next/link') return { __esModule: true, default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
          throw Error(`Unexpected continuation import: ${dependency}`);
        }, child);
        return { __esModule: true, default: child.default };
      }
      if (name === './WorkspacePersonalSpace') return { __esModule: true, default: ({ journey }) => journey };
      if (name.startsWith('./') || name.startsWith('@/components/')) return { __esModule: true, default: () => null };
      throw Error(`Unexpected import: ${name}`);
    }, exports);
    const html = renderToStaticMarkup(await exports.default(props));
    assert.ok(html.includes(`lang="${locale}"`));
    assert.ok(html.includes(t('Your world. In perspective.')));
    assert.ok(html.includes(`aria-label="${t('Workspace sections')}"`));
    assert.ok(html.includes('Test &lt;Learner&gt;'));
    assert.ok(html.includes('href="/notifications"'));
    assert.ok(html.includes('href="/profile/security"'));
    assert.ok(html.includes(t('One place to keep learning.')));
    assert.ok(html.includes(t('Choose a practical course. Your completed lessons stay connected to your account.')));
  }
});

test('member identity, directory, sharing and public profile render in all six locales', async () => {
  const React = await import('react');
  const runtime = await import('react/jsx-runtime');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const member = {
    name: 'João <Müller>', handle: 'member_test', number: 'TGPI-1234-1234-1234',
    avatar: '', headline: 'Original headline', bio: 'Original biography', country: '',
    rank: { name: 'Explorer', points: 1234 }, career: ['Original profession'],
    languages: ['English'], goal: 'Original goal', countries: [], links: [],
    courses: [{ title: 'Original course', path: '/courses/original' }],
    certificates: [{ title: 'Original credential', path: '/certificates/original' }],
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
  const files = {
    MemberIdentityEditor: ['Your name across TGPI.', 'Loading your member identity…', 'Find another member →'],
    MemberDirectory: ['Find a global perspective.', 'Enter an exact @ID or full TGPI number.', 'Find member'],
    PublicProfileShareButton: ['Share profile', 'Copy link'],
    PublicMemberView: ['Platform progression', 'Professional context', 'Verifiable credentials', 'Verify'],
  };
  for (const locale of locales) {
    const t = (key, values) => translate(locale, key, values);
    for (const [file, labels] of Object.entries(files)) {
      const exports = {};
      const code = ts.transpileModule(fs.readFileSync('src/components/profile/' + file + '.tsx', 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      }).outputText;
      new Function('require', 'exports', code)(name => {
        if (name === 'react') return React;
        if (name === 'react/jsx-runtime') return runtime;
        if (name === 'next/navigation') return { useRouter: () => ({ refresh() {} }) };
        if (name === 'next/link') return { __esModule: true, default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
        if (localizationDependency(name, locale)) return localizationDependency(name, locale);
        if (name === '@/lib/localization/server') return { getLocale: async () => locale };
        if (name === '@/lib/localization/messages') return { translate };
        if (name === '@/lib/members/identity') return {};
        throw Error('Unexpected import: ' + name);
      }, exports);
      const props = { member, title: member.name, url: '/member/' + member.number };
      const html = renderToStaticMarkup(file === 'PublicMemberView' ? await exports.default(props) : React.createElement(exports.default, props));
      for (const label of labels) {
        assert.ok(messages[label], label);
        assert.ok(html.includes(escape(t(label))), locale + ': ' + label);
      }
      if (file === 'PublicMemberView') {
        assert.ok(html.includes('João &lt;Müller&gt;'));
        assert.ok(html.includes('Original biography'));
        assert.ok(html.includes('/certificates/original'));
        assert.ok(html.includes(escape(t('{points} / {maximum} points from activity and learning inside TGPI.', { points: (1234).toLocaleString(locale), maximum: (10000).toLocaleString(locale) }))));
      }
    }
  }
});

test('billing renders localized status, access and dates, including unknown values and invalid dates', async () => {
  const React = await import('react');
  const runtime = await import('react/jsx-runtime');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const code = ts.transpileModule(fs.readFileSync('src/components/profile/AccountBillingPanel.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const cases = [
    ['past_due', 'subscription', 'Payment overdue', 'Subscription', '2026-11-15T00:00:00Z'],
    ['active', 'preview', 'Active', 'Preview access', '2026-11-15T00:00:00Z'],
    ['constructor', '__proto__', 'Unavailable', 'Unavailable', 'bad-date'],
  ];
  for (const locale of locales) for (const [status, accessMode, statusLabel, accessLabel, date] of cases) {
    const t = (key, values) => translate(locale, key, values);
    const exports = {};
    let stateIndex = 0;
    new Function('require', 'exports', code)(name => {
      if (name === 'react') return {
        ...React,
        useState(initial) {
          if (stateIndex++ === 0) return [{ plan: 'premium', status, accessMode, currentPeriodEnd: date, cancelAtPeriodEnd: true, portalAvailable: true }, () => {}];
          return React.useState(initial);
        },
      };
      if (name === 'react/jsx-runtime') return runtime;
      if (localizationDependency(name, locale)) return localizationDependency(name, locale);
      if (name === 'next/link') return { __esModule: true, default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
      throw Error('Unexpected import: ' + name);
    }, exports);
    const html = renderToStaticMarkup(React.createElement(exports.default));
    assert.ok(html.includes(t('Status: {status} · Access: {access}', { status: t(statusLabel), access: t(accessLabel) })));
    const formattedDate = date === 'bad-date' ? t('Date unavailable') : new Date(date).toLocaleDateString(locale, { timeZone: 'UTC' });
    assert.ok(html.includes(formattedDate));
    assert.ok(html.includes(t('Access scheduled until')));
    assert.ok(html.includes(t('Manage subscription securely →')));
  }
});

test('catalog resolves authored whitespace, accents and decorative labels without guessing unknown copy', () => {
  assert.equal(translate('pt-BR', '  Choose your country.\n'), 'Escolha seu país.');
  assert.equal(translate('de', '  Save   '), 'Speichern');
  assert.equal(translate('pt-BR', '01 / Our purpose'), '01 / Nosso propósito');
  assert.equal(translate('es', 'Create a free account →'), 'Crear cuenta gratuita →');
  assert.equal(translate('fr', 'Save:'), 'Enregistrer:');
  assert.equal(translate('en', 'Escolha seu país.'), 'Choose your country.');
  assert.equal(translate('de', 'Jane Smith'), 'Jane Smith');
  assert.equal(translate('it', 'user_123/US$ 19.90'), 'user_123/US$ 19.90');
  assert.equal(translate('pt-BR', 'Unregistered complete sentence.'), 'Unregistered complete sentence.');
});

test('public pricing, institute and mobile journeys render the selected language while routes and prices remain stable', async () => {
  const React = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const jsxRuntime = await import('react/jsx-runtime');
  for (const locale of locales) {
    const t = (key, values) => translate(locale, key, values);
    const cache = new Map();
    function module(file) {
      if (cache.has(file)) return cache.get(file);
      const exports = {};
      const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
      const load = name => {
        if (name === 'react') return React;
        if (name === 'react/jsx-runtime') return jsxRuntime;
        if (localizationDependency(name, locale)) return localizationDependency(name, locale);
        if (name === '@/lib/localization/server') return { getLocale: async () => locale };
        if (name === '@/lib/localization/messages') return { translate };
        if (name.endsWith('.css')) return { default: new Proxy({}, { get: (_target, key) => String(key) }) };
        if (name === 'next/link') return { default: ({ children, prefetch, ...props }) => React.createElement('a', props, children) };
        if (name === 'next/image') return { default: ({ fill, priority, sizes, ...props }) => React.createElement('img', props) };
        if (name === '@/lib/subscription-plans') return module('src/lib/subscription-plans.ts');
        if (name === '@/components/pricing/PricingOutcomeSelector') return module('src/components/pricing/PricingOutcomeSelector.tsx');
        if (name === '@/components/about/AboutNavigation') return module('src/components/about/AboutNavigation.tsx');
        if (name === '@/data/country-page-system') return module('src/data/country-page-system.ts');
        if (name === '@clerk/nextjs') return { Show: ({ children, when }) => when === 'signed-out' ? children : null };
        if (name === '@/components/TGPIPageShell') return { default: ({ children }) => React.createElement('main', {}, children) };
        if (['@/components/PremiumActionButton', './MobileMicroLesson', './MobileIcon'].includes(name)) return { default: () => null };
        throw new Error('Unmocked dependency: ' + name);
      };
      new Function('require', 'exports', compiled)(load, exports);
      cache.set(file, exports);
      return exports;
    }
    const Pricing = module('src/app/pricing/page.tsx').default;
    const pricing = renderToStaticMarkup(await Pricing({ searchParams: Promise.resolve({}) }));
    assert.ok(pricing.includes(t('Choose your country.')), locale + ': pricing hero');
    assert.ok(pricing.includes(t('Everything available with your free account')), locale + ': membership benefits');
    assert.ok(pricing.includes(t('Can I cancel my subscription?')), locale + ': billing FAQ');
    assert.ok(pricing.includes(t('What should Premium help you achieve?')), locale + ': interactive outcome selector');
    assert.ok(pricing.includes('US$ 19.90'), locale + ': currency/amount must not be converted');
    assert.ok(pricing.includes('href="/country-fit"'), locale + ': canonical navigation');
    const About = module('src/app/about/page.tsx').default;
    const about = renderToStaticMarkup(await About());
    assert.ok(about.includes(t('The world is connected.')), locale + ': institute text');
    assert.ok(about.includes(t('Understand the context.')), locale + ': data-driven pillar');
    assert.ok(about.includes(t('Our purpose')), locale + ': section navigation');
    const Mobile = module('src/components/mobile/MobileHome.tsx').default;
    const mobile = renderToStaticMarkup(React.createElement(Mobile));
    assert.ok(mobile.includes(t('Your next chapter.')), locale + ': mobile hero');
    assert.ok(mobile.includes(t('Research programs, accreditation, language requirements and study authorization.')), locale + ': dynamic mobile intent');
    if (locale !== 'en') {
      assert.ok(!pricing.includes('>Choose your country.<'), locale + ': no untranslated hero');
      assert.ok(!mobile.includes('>Your next chapter.<'), locale + ': no untranslated mobile hero');
    }
  }
});


test('supplemental catalogs have identical keys, complete values and stable placeholders in all six languages', () => {
  const dictionaries = Object.fromEntries(locales.map(locale => [locale, JSON.parse(fs.readFileSync(`public/locales/${locale}.json`, 'utf8'))]));
  const keys = Object.keys(dictionaries.en).sort();
  assert.ok(keys.length > 7900);
  for (const locale of locales) {
    assert.deepEqual(Object.keys(dictionaries[locale]).sort(), keys);
    for (const key of keys) {
      const text = dictionaries[locale][key];
      assert.ok(typeof text === 'string' && text.trim(), locale + ': ' + key);
      assert.deepEqual(text.match(/\{\w+\}/g)?.sort() ?? [], key.match(/\{\w+\}/g)?.sort() ?? [], locale + ': ' + key);
      assert.ok(!text.includes('sk-proj-'));
    }
  }
});

test('authored content translation preserves course identity, grading keys, code and target-language practice', () => {
  const source = { id: 'Save', slug: 'course-demo', title: 'Save', version: '1.0', currencyCode: 'USD', code: 'print("Save")', correctOptionId: 'Save', modules: [{ id: 'm1', title: 'Next steps', lessons: [{ id: 'l1', phrase: 'Save', example: 'Save', explanation: 'Next steps', options: [{ id: 'a', label: 'Save' }] }] }] };
  for (const locale of locales) {
    const { localizeAuthoredContent } = localizationDependency('@/lib/localization/authored-content', locale);
    const translated = localizeAuthoredContent(source, locale, { languagePractice: true });
    assert.equal(translated.title, translate(locale, source.title));
    for (const key of ['id', 'slug', 'version', 'currencyCode', 'code', 'correctOptionId']) assert.equal(translated[key], source[key]);
    assert.equal(translated.modules[0].lessons[0].phrase, 'Save');
    assert.equal(translated.modules[0].lessons[0].options[0].label, 'Save');
    assert.equal(translated.modules[0].lessons[0].explanation, translate(locale, 'Next steps'));
    assert.equal(source.title, 'Save');
  }
});

test('protected assessment translations remain server-only and complete without adding answer metadata', () => {
  const source = fs.readFileSync('src/lib/localization/assessment.server.ts', 'utf8');
  assert.match(source, /import 'server-only'/);
  const bank = JSON.parse(fs.readFileSync('src/lib/localization/assessment-messages.json', 'utf8'));
  assert.ok(Object.keys(bank).length > 500);
  for (const translations of Object.values(bank)) {
    assert.deepEqual(Object.keys(translations).sort(), [...locales].sort());
    for (const locale of locales) assert.ok(translations[locale].trim());
  }
  for (const locale of locales) assert.ok(!fs.readFileSync(`public/locales/${locale}.json`, 'utf8').includes('correctOptionId'));
  const provider = fs.readFileSync('src/components/localization/LocaleProvider.tsx', 'utf8');
  assert.ok(provider.indexOf('await ensureLocaleMessages(next)') < provider.indexOf("fetch('/api/preferences/locale'"));
  assert.match(fs.readFileSync('src/app/layout.tsx', 'utf8'), /<html lang=\{locale\} translate="no"/);
});
