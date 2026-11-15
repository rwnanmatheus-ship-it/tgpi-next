import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runInNewContext } from "node:vm";
import {
  canInviteToInstall, detectInstallPlatform, installReminderDelay, isInstallReminderPaused,
} from "../src/lib/pwa-install.ts";
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
      "/courses?source=pwa-shortcut",
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

  const install = readSource("src/components/app-runtime/useTgpiInstall.ts");
  assert.match(install, /beforeinstallprompt/);
  assert.match(install, /display-mode: standalone/);
  assert.match(source, /navigator\.serviceWorker\.register\("\/sw\.js"/);
  assert.match(source, /updateViaCache: "none"/);
  assert.match(source, /SKIP_WAITING/);
  assert.match(source, /Private workspace data was not cached/);
  assert.match(readSource("src/lib/localization/pwa-install.ts"), /Add to Home Screen/);
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

test("installation instructions match browser and device instead of the screen size", () => {
  assert.equal(detectInstallPlatform("Mozilla/5.0 Macintosh Safari/604", "MacIntel", 5), "ios");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Macintosh Safari/604", "MacIntel", 0), "safari");
  assert.equal(detectInstallPlatform("Mozilla/5.0 iPhone CriOS/145 Safari/604", "iPhone", 5), "ios");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Android Chrome/145 SamsungBrowser/28", "", 5), "samsung");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Android; wv) Chrome/145 Instagram", "", 5), "other");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Android Firefox/145", "", 5), "firefoxAndroid");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Android Chrome/145", "", 5), "android");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Windows Chrome/145 Edg/145", "", 0), "edge");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Windows Firefox/145", "", 0), "firefoxWindows");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Linux Firefox/145", "", 0), "other");
  assert.equal(detectInstallPlatform("Mozilla/5.0 Chromebook Chrome/145", "", 0), "chromium");
});

test("reminders expire after two weeks and only appear on selected routes", () => {
  const now = 1_800_000_000_000;
  const nextReminder = String(now + installReminderDelay);
  assert.equal(installReminderDelay / 86400000, 14);
  assert.equal(isInstallReminderPaused(nextReminder, now), true);
  assert.equal(isInstallReminderPaused(nextReminder, now + installReminderDelay), false);
  assert.equal(isInstallReminderPaused(null, now), false);
  assert.equal(isInstallReminderPaused("invalid", now), false);
  for (const route of ["/profile", "/dashboard", "/plan", "/courses"]) assert.ok(canInviteToInstall(route), route);
  for (const route of ["/", "/profile/billing", "/courses/example/study", "/sign-in"]) assert.ok(!canInviteToInstall(route), route);
});

test("offline fallback supports all six locale choices and retries the original URL", () => {
  const source = readSource("public/pwa/offline.js");
  const destination = "https://www.theglobalpolymath.com/compare?country=portugal#results";
  for (const [locale, heading] of Object.entries({
    en: "You are offline",
    "pt-BR": "Você está offline",
    es: "Estás sin conexión",
    fr: "Vous êtes hors ligne",
    de: "Sie sind offline",
    it: "Sei offline",
  })) {
    const nodes = new Map([".eyebrow", "h1", ".description", ".privacy", "#retry", ".secondary"]
      .map(selector => [selector, { addEventListener() {} }]));
    const document = {
      documentElement: {},
      querySelector: selector => nodes.get(selector),
      getElementById: id => nodes.get(`#${id}`),
    };
    runInNewContext(source, {
      document,
      navigator: { languages: ["fr-CA", "en-US"] },
      localStorage: { getItem: () => locale },
      location: { pathname: "/compare", href: destination },
    });
    assert.equal(document.documentElement.lang, locale);
    assert.equal(nodes.get("h1").textContent, heading);
    assert.equal(nodes.get("#retry").href, destination);
    assert.ok(nodes.get(".privacy").textContent);
  }
});
