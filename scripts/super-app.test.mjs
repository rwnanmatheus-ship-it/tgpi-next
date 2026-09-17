import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  getNextSuperAppModule,
  getSuperAppModule,
  isSuperAppRouteActive,
  searchSuperAppModules,
  SUPER_APP_MODULES,
} from "../src/lib/super-app.ts";

test("super app exposes one unique route for every core module", () => {
  assert.equal(SUPER_APP_MODULES.length, 11);
  assert.equal(new Set(SUPER_APP_MODULES.map(({ id }) => id)).size, 11);
  assert.equal(new Set(SUPER_APP_MODULES.map(({ href }) => href)).size, 11);
  assert.ok(SUPER_APP_MODULES.every(({ href, icon }) => href.startsWith("/") && icon.length > 0));
});

test("route matching gives specific settings routes priority over workspace", () => {
  assert.equal(getSuperAppModule("/profile")?.id, "workspace");
  assert.equal(getSuperAppModule("/global-key")?.id, "global-key");
  assert.equal(getSuperAppModule("/verify/global-key")?.id, "global-key");
  assert.equal(getSuperAppModule("/profile/security")?.id, "settings");
  assert.equal(getSuperAppModule("/plan")?.id, "plan");
  assert.equal(getSuperAppModule("/onboarding")?.id, "plan");
  assert.equal(getSuperAppModule("/notifications")?.id, "settings");
  assert.equal(getSuperAppModule("/countries/portugal")?.id, "countries");
  assert.equal(getSuperAppModule("/certificates")?.id, "credentials");
  assert.equal(getSuperAppModule("/verify/TGPI-TEST")?.id, "credentials");
  assert.equal(getSuperAppModule("/pricing"), undefined);
});

test("active route checks respect path boundaries", () => {
  const countries = SUPER_APP_MODULES.find(({ id }) => id === "countries");
  assert.ok(countries);
  assert.equal(isSuperAppRouteActive("/countries/japan", countries), true);
  assert.equal(isSuperAppRouteActive("/countries-other", countries), false);
});

test("recommended flow keeps the decision journey connected", () => {
  assert.equal(getNextSuperAppModule("workspace").id, "global-key");
  assert.equal(getNextSuperAppModule("global-key").id, "country-fit");
  assert.equal(getNextSuperAppModule("country-fit").id, "compare");
  assert.equal(getNextSuperAppModule("compare").id, "plan");
  assert.equal(getNextSuperAppModule("plan").id, "documents");
  assert.equal(getNextSuperAppModule("documents").id, "learning");
  assert.equal(getNextSuperAppModule("learning").id, "credentials");
  assert.equal(getNextSuperAppModule("credentials").id, "workspace");
});

test("module search resolves labels, descriptions and action keywords", () => {
  assert.deepEqual(searchSuperAppModules("visa").map(({ id }) => id), ["documents"]);
  assert.deepEqual(searchSuperAppModules("privacy").map(({ id }) => id), ["settings"]);
  assert.deepEqual(searchSuperAppModules("fingerprint").map(({ id }) => id), ["global-key"]);
  assert.deepEqual(searchSuperAppModules("credential").map(({ id }) => id), ["credentials"]);
  assert.deepEqual(searchSuperAppModules("shortlist").map(({ id }) => id), ["country-fit"]);
  assert.equal(searchSuperAppModules("  ").length, SUPER_APP_MODULES.length);
});

test("desktop launcher uses a native modal dialog with global keyboard access", () => {
  const source = readFileSync(new URL("../src/components/super-app/SuperAppLauncher.tsx", import.meta.url), "utf8");
  assert.match(source, /showModal\(\)/);
  assert.match(source, /TGPI Super App modules/);
  assert.match(source, /SUPER_APP_OPEN_EVENT/);
  assert.match(source, /event\.metaKey \|\| event\.ctrlKey/);
  assert.match(source, /Find an app, action or destination/);
  assert.match(source, /tgpi-intelligence-network-v1\.webp/);
});

test("desktop navbar exposes the same global app launcher", () => {
  const source = readFileSync(new URL("../src/components/Navbar.tsx", import.meta.url), "utf8");
  assert.match(source, /aria-label="Open TGPI apps"/);
  assert.match(source, /aria-keyshortcuts="Control\+K Meta\+K"/);
  assert.match(source, /SUPER_APP_OPEN_EVENT/);
});

test("mobile navigation consumes the same shared module registry", () => {
  const source = readFileSync(new URL("../src/components/mobile/MobileNavigation.tsx", import.meta.url), "utf8");
  assert.match(source, /searchSuperAppModules/);
  assert.match(source, /SUPER_APP_OPEN_EVENT/);
  assert.match(source, /COMPACT_NAVIGATION\.map/);
  assert.doesNotMatch(source, /mobile-dock-emoji/);
});
