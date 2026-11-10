/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser smoke test. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { createRequire } = require('node:module');

const root = process.cwd();
const qaRequire = process.env.ATLAS_QA_MODULES
  ? createRequire(path.join(process.env.ATLAS_QA_MODULES, 'package.json')) : require;
const assets = fs.mkdtempSync(path.join(os.tmpdir(), 'tgpi-atlas-studio-'));
const output = process.env.ATLAS_QA_OUTPUT;

const nextMocks = {
  'next/image': 'export default function Image({priority,fill,sizes,...props}){return <img {...props}/>;}',
  'next/link': 'export default function Link({prefetch,...props}){return <a {...props}/>;}',
  'next/navigation': 'export const usePathname=()=>window.location.pathname;',
  'next/dynamic': `import {lazy,Suspense} from "react";
    export default function dynamic(load,options){const Component=lazy(load);return props=>
      <Suspense fallback={options?.loading?.()||null}><Component {...props}/></Suspense>;}`,
  '@clerk/nextjs': `const params=new URLSearchParams(location.search);
    export const useAuth=()=>({isLoaded:true,userId:params.has("guest")?null:params.get("account")||"fixture-renan"});
    export const useUser=()=>({user:{id:useAuth().userId,firstName:params.get("account")?"Outro":"Renan"}});`,
  '@/components/localization/LocaleProvider': `import {translate,registerSupplementalMessages} from "@/lib/localization/messages";
    import portuguese from "./public/locales/pt-BR.json";
    registerSupplementalMessages("pt-BR",portuguese);
    const locale=new URLSearchParams(location.search).get("locale")||"en";
    const t=(key,values)=>translate(locale,key,values);
    export const useLocale=()=>({locale,t});
    export function LocalizedText({text}){return t(text);}`,
};

async function buildFixture() {
  await qaRequire('esbuild').build({
    stdin: {
      contents: `import {createRoot} from 'react-dom/client';
        import AtlasStudio from './src/components/atlas/AtlasStudio';
        import AtlasWidget from './src/components/atlas/AtlasWidget';
        import {useAuth} from '@clerk/nextjs';
        const full=location.pathname==='/atlas';
        createRoot(document.getElementById('root')).render(
          <main>{full?<AtlasStudio userId={useAuth().userId} onlineAvailable={location.search.includes('online')}/>:<AtlasWidget/>}</main>
        );`,
      resolveDir: root, loader: 'tsx',
    },
    bundle: true,
    outfile: path.join(assets, 'app.js'),
    jsx: 'automatic',
    plugins: [{
      name: 'atlas-fixture',
      setup(build) {
        build.onResolve({ filter: /^(next\/(image|link|dynamic|navigation)|@clerk\/nextjs|@\/components\/localization\/LocaleProvider|\.\/LocaleProvider)$/ },
          args => ({ path: args.path, namespace: 'fixture' }));
        build.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path }) => ({
          contents: nextMocks[path === './LocaleProvider' ? '@/components/localization/LocaleProvider' : path], loader: 'jsx', resolveDir: root,
        }));
      },
    }],
  });
}

async function run() {
  await buildFixture();
  const calls = [];
  const server = http.createServer(async (request, response) => {
    const { pathname } = new URL(request.url, 'http://127.0.0.1');
    if (pathname === '/api/atlas/status') {
      response.setHeader('Content-Type', 'application/json');
      response.end('{"enabled":false,"sponsored":true}');
      return;
    }
    if (pathname === '/api/atlas/chat') {
      let body = '';
      for await (const chunk of request) body += chunk;
      calls.push(JSON.parse(body));
      response.setHeader('Content-Type', 'application/x-ndjson');
      response.write(JSON.stringify({ type: 'delta', text: 'Synthetic **sponsored** reply. [Unsafe](https://invalid.test)' }) + '\n');
      response.end(JSON.stringify({ type: 'done', status: 'complete', conversation: null }));
      return;
    }
    const file = ['/app.js', '/app.css'].includes(pathname) ? path.join(assets, pathname.slice(1))
      : /^\/(brand\/atlas|images\/cinematic-2026)\/[a-z0-9.-]+$/.test(pathname) ? path.join(root, 'public', pathname) : null;
    if (file && fs.existsSync(file)) {
      const contentType = { '.js': 'text/javascript', '.css': 'text/css', '.glb': 'model/gltf-binary', '.avif': 'image/avif', '.webp': 'image/webp' };
      response.setHeader('Content-Type', contentType[path.extname(file)]);
      response.end(fs.readFileSync(file));
      return;
    }
    response.setHeader('Content-Type', 'text/html');
    response.end(`<!doctype html><html lang="en"><head><title>Atlas browser QA</title>
      <meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/app.css">
      <style>*{box-sizing:border-box}body{margin:0;background:#e7edf6}button,textarea,input,select{font:inherit}
      button{border:0;background:none;color:inherit}a{text-decoration:none}
      :root{--tgpi-gold-light:#edd29b;--tgpi-inverse:#edf3fd;--tgpi-inverse-muted:#afc0d4}</style>
      </head><body><div id="root"></div><script src="/app.js"></script></body></html>`);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const chromiumPackage = process.env.ATLAS_QA_LAMBDA_CHROMIUM
    ? qaRequire('@sparticuz/chromium').default : undefined;
  const browser = await qaRequire('playwright').chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || await chromiumPackage?.executablePath(),
    args: [...(chromiumPackage?.args ?? []), '--no-sandbox', '--disable-dev-shm-usage',
      '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(6500);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const go = (route = '/atlas') => page.goto(origin + route);
    const send = async text => {
      await page.getByRole('textbox', { name: 'Message Atlas' }).fill(text);
      await page.getByRole('button', { name: 'Send message' }).click();
      await page.getByText('Atlas replied.', { exact: true }).waitFor();
    };
    const launcher = page.getByRole('button', { name: 'Ask TGPI Atlas AI' });

    await go();
    await page.getByRole('heading', { name: 'Hello, Renan.' }).waitFor();
    assert.equal(await page.locator('canvas').count(), 0, 'Reduced motion uses the poster');
    await page.getByRole('button', { name: 'Budget calculator' }).click();
    await page.getByLabel('Monthly expenses').fill('1200');
    await page.getByLabel('One-time expenses').fill('500');
    await page.getByText('$4,715.00').waitFor();
    await page.locator('summary').filter({ hasText: 'Budget calculator' }).click();
    await send('Compare Portugal');
    await page.getByText(/which other country/i).waitFor();
    await send('And Canada for work?');
    await page.locator('a[href="/compare?country=portugal&country=canada&goal=work"]').waitFor();
    assert.equal(calls.length, 0, 'The free guide performs no inference requests');

    await page.reload();
    await page.getByText('And Canada for work?', { exact: true }).waitFor();
    const history = page.getByRole('complementary', { name: 'History on this device' });
    await history.getByRole('searchbox').fill('Canada for work');
    await history.getByRole('button', { name: /Compare Portugal/ }).waitFor();
    await history.getByRole('searchbox').clear();

    await page.getByLabel('History and privacy', { exact: true }).click();
    await page.getByRole('button', { name: 'Rename', exact: true }).click();
    await page.getByLabel('Conversation title').fill('Trip research');
    await page.getByRole('button', { name: 'Save title' }).click();
    await history.getByRole('button', { name: /Trip research/ }).waitFor();
    await page.getByLabel('History and privacy', { exact: true }).click();
    const [downloaded] = await Promise.all([
      page.waitForEvent('download'), page.getByRole('button', { name: 'Download conversation' }).click(),
    ]);
    assert.equal(downloaded.suggestedFilename(), 'atlas-conversation.md');

    await page.getByRole('button', { name: 'Temporary chat' }).click();
    await send('private-session-marker');
    await page.reload();
    await history.getByRole('button', { name: /Trip research/ }).waitFor();
    assert.equal(await page.getByText('private-session-marker', { exact: true }).count(), 0);
    await go('/atlas?account=other');
    await page.getByRole('heading', { name: 'Hello, Outro.' }).waitFor();
    assert.equal(await page.getByText('Trip research', { exact: true }).count(), 0);

    await go('/atlas?online');
    await page.getByRole('button', { name: 'Sponsored AI' }).click();
    await send('Test online transport');
    assert.equal(calls.length, 1);
    assert.equal(calls[0].access, 'sponsored');
    assert.equal(calls[0].temporary, true);
    assert.doesNotMatch(JSON.stringify(calls[0]), /Renan|Trip research/);
    assert.equal(await page.locator('a[href*="invalid.test"]').count(), 0);
    await page.reload();
    await page.getByLabel('Message history').getByText('Test online transport', { exact: true }).waitFor();
    await page.getByLabel('History and privacy', { exact: true }).click();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
    await page.getByRole('button', { name: 'Confirm deletion' }).click();
    await history.getByRole('button', { name: /Trip research/ }).waitFor();
    await history.getByText('Test online transport', { exact: true }).waitFor({ state: 'hidden' });

    await page.addInitScript(() => {
      if (!location.search.includes('device')) return;
      let available = false;
      globalThis.LanguageModel = {
        availability: async () => available ? 'available' : 'downloadable',
        create: async ({ expectedInputs, monitor }) => {
          if (expectedInputs[0].languages[0] !== 'en') throw new Error('Incorrect device language');
          if (!available) {
            if (!monitor) throw new Error('Automatic activation must be disabled');
            const target = new EventTarget();
            monitor(target);
            target.dispatchEvent(new ProgressEvent('downloadprogress', { loaded: 1 }));
            available = true;
          }
          return {
            destroy() {},
            promptStreaming: () => new ReadableStream({
              start(controller) {
                controller.enqueue('Synthetic on-device reply.');
                controller.close();
              },
            }),
          };
        },
      };
    });
    await go('/atlas?device&account=device-fixture');
    await page.getByRole('button', { name: 'On-device AI', exact: true }).click();
    await page.getByRole('button', { name: 'Enable on-device AI' }).click();
    await send('Test free on-device conversation');
    await page.getByText('Synthetic on-device reply.', { exact: true }).waitFor();
    assert.equal(calls.length, 1, 'The on-device model performs no Atlas API request');

    await go('/countries/portugal');
    const initial = await launcher.boundingBox();
    await page.mouse.move(initial.x + initial.width / 2, initial.y + initial.height / 2);
    await page.mouse.down();
    await page.mouse.move(47, 310, { steps: 9 });
    await page.mouse.up();
    assert.equal(await page.getByRole('dialog').count(), 0, 'Drag does not open the widget');
    assert.ok((await launcher.boundingBox()).x < 40, 'Launcher docked to the left');
    await page.reload();
    await page.waitForFunction(() => document.querySelector('[data-side="left"] button') !== null);
    await launcher.click();
    await page.getByRole('dialog').getByRole('textbox', { name: 'Message Atlas' }).fill('Draft preserved');
    await page.keyboard.press('Escape');
    await launcher.click();
    await page.getByRole('dialog').getByRole('textbox', { name: 'Message Atlas' }).waitFor();
    await page.waitForFunction(() => document.querySelector('dialog textarea')?.value === 'Draft preserved');

    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 820 });
      const box = await page.getByRole('dialog').boundingBox();
      assert.ok(box.x >= 0 && box.x + box.width <= width + 1);
    }
    await go('/countries?guest');
    await launcher.click();
    await page.getByRole('link', { name: /Sign in to TGPI/ }).waitFor();

    await page.setViewportSize({ width: 390, height: 844 });
    await go('/atlas?locale=pt-BR&account=mobile');
    await page.getByRole('heading', { name: 'Central de Comando Atlas' }).waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    if (output) await page.screenshot({ path: path.join(output, 'atlas-mobile.png'), fullPage: true });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await go('/atlas?locale=pt-BR&account=visual');
    await page.locator('[data-model-ready="true"]').waitFor({ timeout: 12000 });
    if (output) await page.screenshot({ path: path.join(output, 'atlas-desktop.png'), fullPage: true });
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({
      passed: true, widths: [360, 390, 768, 1440],
      checks: ['guide without provider', 'comparison memory', 'budget calculator', 'reload and search', 'rename and delete', 'temporary mode', 'account isolation',
        'sponsored transport', 'on-device opt-in and inference', 'safe markdown', 'draggable launcher', 'draft recovery', 'guest sign-in', 'reduced motion', 'articulated WebGL'],
    }));
  } finally {
    await browser.close();
    server.close();
    fs.rmSync(assets, { force: true, recursive: true });
  }
}

run().catch(error => { console.error(error); process.exit(1); });
