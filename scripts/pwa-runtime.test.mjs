import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";
import manifest from "../src/app/manifest.ts";

const readSource = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("manifest installs TGPI as one standalone application", () => {
  const value = manifest();

  assert.equal(value.id, "/");
  assert.equal(value.scope, "/");
  assert.equal(value.start_url, "/profile?source=pwa");
  assert.equal(value.display, "standalone");
  assert.equal(value.theme_color, "#061B33");
  assert.deepEqual(
    value.shortcuts?.map(({ url }) => url),
    [
      "/profile?source=pwa-shortcut",
      "/country-fit?source=pwa-shortcut",
      "/compare?source=pwa-shortcut",
      "/passport?source=pwa-shortcut",
    ],
  );
  assert.ok(value.icons?.some(({ purpose }) => purpose === "maskable"));
});

test("PWA icons have exact install and Apple dimensions", () => {
  const expected = new Map([
    ["public/pwa/apple-touch-icon.png", [180, 180]],
    ["public/pwa/icon-192.png", [192, 192]],
    ["public/pwa/icon-512.png", [512, 512]],
    ["public/pwa/icon-maskable-512.png", [512, 512]],
  ]);

  for (const [path, [width, height]] of expected) {
    const image = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(image.subarray(1, 4).toString(), "PNG");
    assert.equal(image.readUInt32BE(16), width);
    assert.equal(image.readUInt32BE(20), height);
  }
});

test("service worker caches only the public shell and hashed build assets", () => {
  const source = readSource("public/sw.js");
  const syntax = spawnSync(
    process.execPath,
    ["--check", fileURLToPath(new URL("../public/sw.js", import.meta.url))],
    { encoding: "utf8" },
  );

  assert.equal(syntax.status, 0, syntax.stderr);
  assert.match(source, /tgpi-public-shell-v\d+/);
  assert.match(source, /MAX_STATIC_ASSETS = 80/);
  assert.match(source, /request\.mode === "navigate"/);
  assert.match(source, /fetch\(request\)\.catch/);
  assert.match(source, /url\.pathname\.startsWith\("\/api\/"\)/);
  assert.match(source, /url\.pathname\.startsWith\("\/profile"\)/);
  assert.match(source, /url\.pathname\.startsWith\("\/global-key"\)/);
  assert.match(source, /url\.pathname\.startsWith\("\/_next\/image"\)/);
  assert.match(source, /url\.pathname\.startsWith\("\/_next\/static\/"\)/);
  assert.doesNotMatch(source, /cache\.put\([^)]*\/api\//);
});

test("runtime exposes installation, connection and controlled-update states", () => {
  const source = readSource("src/components/app-runtime/TgpiAppRuntime.tsx");

  assert.match(source, /beforeinstallprompt/);
  assert.match(source, /display-mode: standalone/);
  assert.match(source, /navigator\.serviceWorker\.register\("\/sw\.js"/);
  assert.match(source, /updateViaCache: "none"/);
  assert.match(source, /SKIP_WAITING/);
  assert.match(source, /Private workspace data was not cached/);
  assert.match(source, /Tap Share, then choose Add to Home Screen/);
  assert.match(source, /aria-live="polite"/);
});

test("root metadata and response headers expose the PWA safely", () => {
  const layout = readSource("src/app/layout.tsx");
  const config = readSource("next.config.ts");
  const offline = readSource("public/offline.html");

  assert.match(layout, /manifest: "\/manifest\.webmanifest"/);
  assert.match(layout, /appleWebApp/);
  assert.match(layout, /<TgpiAppRuntime \/>/);
  assert.match(config, /Service-Worker-Allowed/);
  assert.match(config, /source: "\/offline\.html"/);
  assert.match(config, /X-Robots-Tag/);
  assert.match(offline, /does not store private workspace pages/);
  assert.match(offline, /noindex,nofollow/);
});

test("dismissed installation stays hidden across repeated browser events and reloads", async () => {
  const state = [], effects = [], listeners = new Map(), storage = new Map();
  let cursor = 0, blockStorage = false, pathname = '/';
  const hooks = {
    useState(initial) { const index = cursor++; if (!(index in state)) state[index] = initial; return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value; }]; },
    useRef(initial) { const index = cursor++; return state[index] ??= { current: initial }; },
    useEffect(effect) { const index = cursor++; if (!(index in state)) { state[index] = true; effects.push(effect); } },
    LocalizedText: ({ text }) => text,
    usePathname: () => pathname,
    jsx: (type, props) => ({ type, props }),
  };
  const browserWindow = {
    localStorage: { getItem(key) { if (blockStorage) throw new Error('blocked'); return storage.get(key); }, setItem(key, value) { if (blockStorage) throw new Error('blocked'); storage.set(key, value); }, removeItem(key) { storage.delete(key); } },
    matchMedia: () => ({ matches: false }), setTimeout: callback => { callback(); return 1; }, clearTimeout() {},
    addEventListener: (name, handler) => listeners.set(name, handler), removeEventListener: name => listeners.delete(name),
  };
  globalThis.__pwaFixture = { ...hooks, window: browserWindow, navigator: { userAgent: 'test', platform: 'test', maxTouchPoints: 0, onLine: true } };
  const source = readSource('src/components/app-runtime/TgpiAppRuntime.tsx')
    .replace(/import[^;]+from "next\/navigation";/, 'const {usePathname}=globalThis.__pwaFixture;')
    .replace(/import[^;]+from "react";/, 'const {useState,useRef,useEffect}=globalThis.__pwaFixture;')
    .replace(/import[^;]+from "@\/components\/localization\/LocaleProvider";/, 'const {LocalizedText,window,navigator}=globalThis.__pwaFixture;');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText
    .replace(/import[^;]+from "react\/jsx-runtime";/, 'const {jsx:_jsx,jsx:_jsxs}=globalThis.__pwaFixture;');
  const { default: Runtime } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
  const render = () => { cursor = 0; const result = Runtime(); while (effects.length) effects.shift()(); return result; };
  const installEvent = () => { let prevented = false; listeners.get('beforeinstallprompt')({ preventDefault() { prevented = true; } }); assert.equal(prevented, true); };
  const findDismissal = node => {
    if (!node || typeof node !== 'object') return null;
    if (node.type === 'button' && node.props.children?.props?.text === 'Not now') return node;
    const children = [node.props?.children].flat(Infinity);
    return children.map(findDismissal).find(Boolean);
  };
  assert.equal(render(), null);
  installEvent();
  assert.equal(render(), null, 'acquisition must remain unobstructed by installation');
  pathname = '/courses/ia-trabalho-global/study';
  assert.equal(render(), null, 'study must remain unobstructed by installation');
  pathname = '/profile';
  let notice = render();
  assert.equal(notice.props['data-pwa-runtime'], 'install');
  findDismissal(notice).props.onClick();
  installEvent();
  assert.equal(render(), null, 'a repeated event must respect in-memory dismissal');
  state.length = 0; listeners.clear();
  render(); installEvent();
  assert.equal(render(), null, 'a reload must respect persisted dismissal');
  storage.clear(); state.length = 0; listeners.clear(); blockStorage = true;
  render(); installEvent(); notice = render();
  findDismissal(notice).props.onClick(); installEvent();
  assert.equal(render(), null, 'denied storage must still respect dismissal during the visit');
  delete globalThis.__pwaFixture;
});
