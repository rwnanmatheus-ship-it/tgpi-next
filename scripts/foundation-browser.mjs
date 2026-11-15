import assert from "node:assert/strict";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const origin = new URL(process.env.TGPI_QA_ORIGIN ?? "https://www.theglobalpolymath.com").origin;
const canonical = "https://www.theglobalpolymath.com";
const skipSelector = ".tgpi-content-skip";
const browser = await chromium.launch({ executablePath: process.env.TGPI_QA_CHROMIUM });
const paths = ["/", "/countries", "/compare", "/courses", "/about", "/accessibility"];

async function verifyMetadata(request) {
  for (const path of paths) {
    const response = await request.get(path, { maxRedirects: 0 });
    assert.equal(response.status(), 200, path);
    const html = await response.text();
    const tags = [...html.matchAll(/<(?:link|meta)\b[^>]+>/gi)].map(([tag]) => tag);
    const canonicalTag = tags.find(tag => tag.includes('rel="canonical"'));
    const socialTag = tags.find(tag => tag.includes('property="og:url"'));
    const expected = new URL(path, canonical).href.replace(/\/$/, "");
    const href = canonicalTag?.match(/href="([^"]+)"/)?.[1];
    const social = socialTag?.match(/content="([^"]+)"/)?.[1];
    assert.equal(href?.replace(/\/$/, ""), expected, `${path}: canonical`);
    assert.equal(social?.replace(/\/$/, ""), expected, `${path}: Open Graph URL`);
  }
}

async function verifyKeyboard(page) {
  await page.locator("h1").first().waitFor();
  await page.waitForFunction(() => Boolean(localStorage.getItem("tgpi:locale:offline")));
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(skipSelector).evaluate(link => link === document.activeElement), true);
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.matches("main, [role=main]")), true);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
}

async function verifyOffline(context, page, locale, heading) {
  await page.waitForFunction(language => localStorage.getItem("tgpi:locale:offline") === language, locale);
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  await page.waitForFunction(async () => {
    const cache = await caches.open("tgpi-public-shell-v3");
    return Boolean(await cache.match("/pwa/offline.js"));
  });
  await context.setOffline(true);
  const destination = new URL("/compare?country=portugal", origin).href;
  try {
    await page.goto(destination);
    await page.getByRole("heading", { name: heading }).waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), locale);
    assert.equal(await page.locator("#retry").getAttribute("href"), destination);
    const cachedPaths = await page.evaluate(async () => {
      const owned = (await caches.keys()).filter(key => key.startsWith("tgpi-public-shell-"));
      const entries = await Promise.all(owned.map(async key => (await caches.open(key)).keys()));
      return entries.flat().map(({ url }) => new URL(url).pathname);
    });
    assert.ok(cachedPaths.every(path => path === "/offline.html" || path.startsWith("/pwa/") || path.startsWith("/_next/static/")), cachedPaths.join(", "));
  } finally {
    await context.setOffline(false);
  }
  await page.locator("#retry").click();
  await page.locator(skipSelector).waitFor({ state: "attached" });
  assert.equal(page.url(), destination);
}

async function verifySpecimen(page) {
  await page.goto("/internal/design-system");
  const tabs = page.getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
  await page.keyboard.press("Home");
  assert.equal(await tabs.first().getAttribute("aria-selected"), "true");

  const open = page.getByRole("button", { name: "Open dialog" });
  await open.click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  assert.equal(await open.evaluate(button => button === document.activeElement), true);

  for (const theme of ["light", "dark"]) {
    await page.evaluate(value => { document.documentElement.dataset.tgpiTheme = value; }, theme);
    const { violations } = await new AxeBuilder({ page })
      .include(".ds-tabs, .ds-button, .ds-field, .ds-badge, .ds-table")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.deepEqual(violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) })), [], theme);
  }
}

try {
  const desktop = await browser.newContext({ baseURL: origin, locale: "en-US", viewport: { width: 1440, height: 900 } });
  await verifyMetadata(desktop.request);
  const desktopPage = await desktop.newPage();
  desktopPage.setDefaultTimeout(20_000);
  await desktopPage.goto("/accessibility");
  await verifyKeyboard(desktopPage);
  if (process.argv.includes("--specimen")) await verifySpecimen(desktopPage);
  await desktop.close();

  const mobile = await browser.newContext({
    baseURL: origin,
    locale: "pt-BR",
    viewport: { width: 360, height: 640 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const mobilePage = await mobile.newPage();
  mobilePage.setDefaultTimeout(20_000);
  await mobilePage.goto("/accessibility");
  assert.equal(await mobilePage.locator("html").getAttribute("lang"), "pt-BR");
  await verifyKeyboard(mobilePage);
  await verifyOffline(mobile, mobilePage, "pt-BR", "Você está offline");
  console.log("Foundation verified: page metadata, keyboard navigation, responsive reflow, offline locale, private cache boundaries and online recovery.");
} finally {
  await browser.close();
}
