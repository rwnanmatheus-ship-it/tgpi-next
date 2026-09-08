import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import manifest from "../src/app/manifest.ts";

const readSource = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("manifest installs TGPI as one standalone application", () => {
  const value = manifest();

  assert.equal(value.id, "/");
  assert.equal(value.scope, "/");
  assert.equal(value.start_url, "/profile?source=pwa");
  assert.equal(value.display, "standalone");
  assert.equal(value.theme_color, "#04101B");
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
  assert.match(source, /tgpi-public-shell-v1/);
  assert.match(source, /MAX_STATIC_ASSETS = 80/);
  assert.match(source, /request\.mode === "navigate"/);
  assert.match(source, /fetch\(request\)\.catch/);
  assert.match(source, /url\.pathname\.startsWith\("\/api\/"\)/);
  assert.match(source, /url\.pathname\.startsWith\("\/profile"\)/);
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
