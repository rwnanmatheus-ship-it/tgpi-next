/* eslint-disable @typescript-eslint/no-require-imports -- Standalone synthetic browser verification. */
// Requires esbuild and @sparticuz/chromium in ATLAS_QA_MODULES (default /tmp/atlas-qa/node_modules).
const fs = require('node:fs'), http = require('node:http'), assert = require('node:assert/strict');
const root = process.cwd(), qa = '/tmp/tgpi-atlas-browser', modules = process.env.ATLAS_QA_MODULES || '/tmp/atlas-qa/node_modules';
fs.mkdirSync(qa, { recursive: true }); fs.mkdirSync(root + '/docs/atlas/evidence', { recursive: true });
fs.writeFileSync(qa + '/stub.jsx', `import React from '${root}/node_modules/react/index.js';export function Image({priority,fill,sizes,...p}){return <img {...p}/>};export function Link({children,...p}){return <a {...p}>{children}</a>}`);
fs.writeFileSync(qa + '/entry.tsx', `import React from '${root}/node_modules/react/index.js';import{createRoot}from '${root}/node_modules/react-dom/client.js';import AtlasChat from '${root}/src/components/atlas/AtlasChat.tsx';createRoot(document.getElementById('root')!).render(<><div style={{padding:8,color:'#a88c55',font:'11px sans-serif'}}>SYNTHETIC UI TEST · no live model or member data</div><AtlasChat userId="fixture_atlas"/></>);`);
const conversations = new Map(); const requests = []; let failNext = false, slowNext = false;
const answer = 'This is a **synthetic test response**, not advice.\n\n| Destination | Next step |\n| --- | --- |\n| Portugal | Confirm the budget |\n| Canada | Research the course |\n\nOpen [Countries](/countries). <script>alert(1)</script> ![tracking](https://invalid.test/track)';
async function run() {
  await require(modules + '/esbuild').build({ entryPoints: [qa + '/entry.tsx'], bundle: true, outfile: qa + '/bundle.js', format: 'esm', target: 'es2022', jsx: 'automatic', absWorkingDir: root, nodePaths: [root + '/node_modules'], plugins: [{ name: 'next-stubs', setup(build) {
    build.onResolve({ filter: /^next\/(image|link)$/ }, args => ({ path: args.path, namespace: 'stub' }));
    build.onLoad({ filter: /.*/, namespace: 'stub' }, args => ({ contents: `export {${args.path === 'next/image' ? 'Image' : 'Link'} as default} from '${qa}/stub.jsx'`, loader: 'js', resolveDir: root }));
  } }] });
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const json = (body, status = 200) => { response.statusCode = status; response.setHeader('Content-Type', 'application/json'); response.end(JSON.stringify(body)); };
    if (url.pathname.startsWith('/api/atlas/')) {
      let text = ''; for await (const chunk of request) text += chunk;
      const body = text ? JSON.parse(text) : null;
      if (url.pathname === '/api/atlas/conversations') return json({ items: [...conversations.values()].map(({ id, title, updatedAt }) => ({ id, title, updatedAt })), cursor: null });
      if (url.pathname.startsWith('/api/atlas/conversations/')) {
        const id = url.pathname.split('/').at(-1), conversation = conversations.get(id);
        if (!conversation) return json({ error: 'Conversation not found.' }, 404);
        if (request.method === 'DELETE') { conversations.delete(id); return json({ deleted: true }); }
        if (request.method === 'PATCH') {
          if (body.title) conversation.title = body.title;
          if (body.feedback) conversation.messages.find(x => x.id === body.messageId).feedback = body.feedback;
        }
        return json({ conversation });
      }
      requests.push(body);
      if (failNext) { failNext = false; return json({ error: 'Synthetic provider unavailable.' }, 503); }
      const now = new Date().toISOString(); const question = { id: body.requestId, requestId: body.requestId, role: 'user', content: body.text, createdAt: now, status: 'complete' };
      const reply = { ...question, id: crypto.randomUUID(), role: 'assistant', content: answer, factors: body.scopes, status: 'complete' };
      const current = conversations.get(body.conversationId);
      const conversation = { id: body.conversationId, title: current?.title || body.text, messages: [...(current?.messages || []), question, reply], createdAt: now, updatedAt: now, expiresAt: '2099-01-01T00:00:00Z', active: null };
      response.setHeader('Content-Type', 'application/x-ndjson');
      response.write(JSON.stringify({ type: 'context', factors: body.scopes }) + '\n');
      const delay = slowNext ? 1200 : 20; slowNext = false;
      for (const delta of answer.match(/.{1,35}/gs)) { if (response.destroyed) return; response.write(JSON.stringify({ type: 'delta', text: delta }) + '\n'); await new Promise(resolve => setTimeout(resolve, delay)); }
      if (!body.temporary) conversations.set(conversation.id, conversation);
      response.end(JSON.stringify({ type: 'done', conversation: body.temporary ? null : conversation, status: 'complete' }) + '\n'); return;
    }
    let file;
    if (url.pathname === '/bundle.js' || url.pathname === '/bundle.css') file = qa + url.pathname;
    if (url.pathname.startsWith('/brand/atlas/') && !url.pathname.includes('..')) file = root + '/public' + url.pathname;
    if (file) { response.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'image/webp'); response.end(fs.readFileSync(file)); return; }
    response.setHeader('Content-Type', 'text/html');
    response.end('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/bundle.css"><style>*{box-sizing:border-box}body{margin:0;background:#e9eef4}button,input,textarea{font-family:Arial}button{font-size:14px}</style></head><body><div id="root"></div><script type="module" src="/bundle.js"></script></body></html>');
  });
  await new Promise(resolve => server.listen(4323, '127.0.0.1', resolve));
  const { default: chromium } = await import(modules + '/@sparticuz/chromium/build/index.js');
  const browser = await require('playwright').chromium.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  const page = await browser.newPage(); const errors = [], checks = [];
  page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto('http://127.0.0.1:4323'); await page.getByRole('heading', { name: 'Atlas AI' }).waitFor();
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForFunction(() => [...document.images].every(x => x.complete && x.naturalWidth));
      const size = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
      assert.ok(size.scrollWidth <= width, `Overflow at ${width}`); checks.push(size);
      await page.screenshot({ path: `${root}/docs/atlas/evidence/welcome-${width}.png`, fullPage: true });
    }
    await page.getByText('Personalization ·', { exact: false }).click();
    await page.getByRole('checkbox', { name: 'Languages', exact: true }).check();
    await page.getByLabel('Message Atlas').fill('Synthetic destination question');
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.getByRole('status').filter({ hasText: 'Reply complete.' }).waitFor();
    assert.deepEqual(requests[0].scopes, ['languages']);
    assert.equal(await page.locator('table').count(), 1);
    assert.equal(await page.locator('img[src*="invalid.test"]').count(), 0);
    await page.screenshot({ path: `${root}/docs/atlas/evidence/conversation-1440.png`, fullPage: true });
    await page.getByRole('button', { name: 'Helpful', exact: true }).click();
    await page.getByRole('button', { name: 'Helpful', exact: true, pressed: true }).waitFor();
    await page.getByRole('button', { name: 'Rename', exact: true }).click();
    await page.getByLabel('Conversation title').fill('My test journey');
    await page.getByRole('button', { name: 'Save title' }).click();
    await page.getByRole('button', { name: 'My test journey', exact: true }).waitFor();
    await page.getByLabel('Message Atlas').fill('Unsent draft recovery'); await page.reload();
    await page.waitForFunction(() => document.querySelector('textarea')?.value === 'Unsent draft recovery');
    await page.getByRole('button', { name: 'My test journey', exact: true }).click();
    failNext = true; await page.getByLabel('Message Atlas').fill('Failure recovery');
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.getByRole('alert').filter({ hasText: 'Synthetic provider unavailable.' }).waitFor();
    assert.equal(await page.getByLabel('Message Atlas').inputValue(), 'Failure recovery');
    await page.getByRole('button', { name: 'Retry last question' }).click();
    await page.getByRole('status').filter({ hasText: 'Reply complete.' }).waitFor();
    assert.equal(requests[1].requestId, requests[2].requestId);
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
    await page.getByRole('button', { name: 'Confirm deletion' }).click();
    await page.getByRole('status').filter({ hasText: 'Conversation deleted.' }).waitFor();
    assert.equal(conversations.size, 0);
    await page.getByRole('button', { name: 'Start temporary conversation' }).click();
    await page.getByLabel('Message Atlas').fill('Temporary fixture');
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.getByRole('status').filter({ hasText: 'Reply complete.' }).waitFor();
    assert.equal(conversations.size, 0); assert.equal(requests.at(-1).temporary, true);
    slowNext = true; await page.getByLabel('Message Atlas').fill('Stop fixture');
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.getByRole('button', { name: 'Stop', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'Reply stopped.' }).waitFor();
    await page.getByRole('button', { name: 'Retry last question' }).click();
    await page.getByRole('status').filter({ hasText: 'Reply complete.' }).waitFor();
    assert.equal(await page.locator('article').filter({ has: page.getByText('You', { exact: true }) }).count(), 2);
    await page.setViewportSize({ width: 390, height: 740 });
    await page.getByRole('button', { name: 'History', exact: true }).click();
    await page.getByRole('button', { name: 'New conversation', exact: false }).first().click();
    await page.emulateMedia({ reducedMotion: 'reduce' }); await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => matchMedia('(prefers-reduced-motion:reduce)').matches), true);
    await page.screenshot({ path: `${root}/docs/atlas/evidence/mobile-390.png`, fullPage: true });
    assert.deepEqual(errors, []);
    fs.writeFileSync(root + '/docs/atlas/evidence/browser-qa.json', JSON.stringify({ synthetic: true, liveClerk: false, liveFirestore: false, liveModel: false, errors, checks, interactions: ['opt-in scopes', 'stream rendering', 'safe Markdown', 'feedback', 'rename', 'draft recovery', 'error and idempotent retry', 'delete confirmation', 'temporary history', 'stop', 'mobile drawer', 'reduced motion'] }, null, 2));
    console.log('Atlas synthetic browser checks passed.');
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
