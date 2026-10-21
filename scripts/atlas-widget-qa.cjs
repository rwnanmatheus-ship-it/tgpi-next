/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs'), http = require('node:http'), assert = require('node:assert/strict');
const root = process.cwd(), dir = fs.mkdtempSync('/tmp/atlas-widget-'), modules = '/tmp/atlas-qa/node_modules';
async function run() {
  await require(modules + '/esbuild').build({ stdin: { contents: `import React from 'react';import{createRoot}from 'react-dom/client';import Widget from './src/components/atlas/AtlasWidget';createRoot(document.getElementById('root')).render(<Widget/>);`, resolveDir: root, loader: 'tsx' }, bundle: true, outfile: dir + '/app.js', jsx: 'automatic', nodePaths: [root + '/node_modules'], plugins: [{ name: 'fixtures', setup(build) {
    build.onResolve({ filter: /^(next\/(image|link|dynamic|navigation)|@clerk\/nextjs)$/ }, args => ({ path: args.path, namespace: 'fixture' }));
    build.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path }) => ({ loader: 'jsx', resolveDir: root, contents: path === 'next/image' ? 'export default function Image({priority,...props}){return <img {...props}/>;}' : path === 'next/link' ? 'export default function Link(props){return <a {...props}/>;}' : path === 'next/navigation' ? 'export const usePathname=()=>"/countries";' : path === '@clerk/nextjs' ? 'export const useAuth=()=>({isLoaded:true,userId:location.search.includes("guest")?null:"fixture-user"});' : 'import{lazy,Suspense}from"react";export default function dynamic(load){const C=lazy(load);return props=><Suspense fallback={<p>Loading…</p>}><C {...props}/></Suspense>;}' }));
  } }] });
  const requests = [];
  const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api/')) { requests.push(req.url); res.setHeader('Content-Type', 'application/json'); res.end('{"enabled":false}'); return; }
    const file = req.url.startsWith('/brand/atlas/') ? root + '/public' + req.url : ['/app.js', '/app.css'].includes(req.url) ? dir + req.url : null;
    if (file) { res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'image/webp'); res.end(fs.readFileSync(file)); return; }
    res.setHeader('Content-Type', 'text/html'); res.end('<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/app.css"><style>*{box-sizing:border-box}body{margin:0}button{font:inherit}</style></head><body><div id="root"></div><script src="/app.js"></script></body></html>');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { default: chromium } = await import(modules + '/@sparticuz/chromium/build/index.js');
  const browser = await require('playwright').chromium.launch({ executablePath: await chromium.executablePath(), args: chromium.args });
  try {
    const page = await browser.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
    const url = 'http://127.0.0.1:' + server.address().port;
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 }); await page.goto(url);
      await page.getByRole('button', { name: 'Ask TGPI Atlas AI' }).click();
      await page.getByText('Atlas preview', { exact: true }).waitFor();
      const box = await page.getByRole('dialog').boundingBox(); assert.ok(box.x >= 0 && box.x + box.width <= width + 1);
      await page.getByRole('textbox', { name: 'Message Atlas' }).fill('Draft preserved');
      assert.ok(await page.getByRole('button', { name: 'Send message' }).isDisabled());
      await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').count(), 0);
      await page.getByRole('button', { name: 'Ask TGPI Atlas AI' }).click();
      assert.equal(await page.getByRole('textbox', { name: 'Message Atlas' }).inputValue(), 'Draft preserved');
      await page.getByRole('button', { name: 'Minimize Atlas' }).click();
    }
    await page.goto(url + '?guest'); await page.getByRole('button', { name: 'Ask TGPI Atlas AI' }).click();
    await page.getByRole('link', { name: 'Sign in to TGPI' }).waitFor();
    assert.deepEqual(errors, []); assert.ok(requests.every(path => path === '/api/atlas/status'));
    console.log(JSON.stringify({ passed: true, widths: [360,390,768,1440], checks: ['dialog bounds', 'preview send disabled', 'Escape', 'draft preserved on minimize', 'guest sign-in', 'no history or chat calls in preview'] }));
  } finally { await browser.close(); server.close(); }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
