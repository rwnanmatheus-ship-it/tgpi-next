import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  getNextSuperAppModule,
  getSuperAppModule,
  isSuperAppRouteActive,
  SUPER_APP_MODULES,
} from "../src/lib/super-app.ts";

test("super app exposes one unique route for every core module", () => {
  assert.equal(SUPER_APP_MODULES.length, 9);
  assert.equal(new Set(SUPER_APP_MODULES.map(({ id }) => id)).size, 9);
  assert.equal(new Set(SUPER_APP_MODULES.map(({ href }) => href)).size, 9);
  assert.ok(SUPER_APP_MODULES.every(({ href, icon }) => href.startsWith("/") && icon.length > 0));
});

test("route matching gives specific settings routes priority over workspace", () => {
  assert.equal(getSuperAppModule("/profile")?.id, "workspace");
  assert.equal(getSuperAppModule("/profile/security")?.id, "settings");
  assert.equal(getSuperAppModule("/notifications")?.id, "settings");
  assert.equal(getSuperAppModule("/countries/portugal")?.id, "countries");
  assert.equal(getSuperAppModule("/pricing"), undefined);
});

test("active route checks respect path boundaries", () => {
  const countries = SUPER_APP_MODULES.find(({ id }) => id === "countries");
  assert.ok(countries);
  assert.equal(isSuperAppRouteActive("/countries/japan", countries), true);
  assert.equal(isSuperAppRouteActive("/countries-other", countries), false);
});

test("recommended flow keeps the decision journey connected", () => {
  assert.equal(getNextSuperAppModule("workspace").id, "country-fit");
  assert.equal(getNextSuperAppModule("country-fit").id, "compare");
  assert.equal(getNextSuperAppModule("compare").id, "plan");
  assert.equal(getNextSuperAppModule("plan").id, "documents");
  assert.equal(getNextSuperAppModule("documents").id, "learning");
});

test("desktop launcher uses a native modal dialog and restores a visible system entry point", () => {
  const source = readFileSync(new URL("../src/components/super-app/SuperAppLauncher.tsx", import.meta.url), "utf8");
  assert.match(source, /showModal\(\)/);
  assert.match(source, /aria-haspopup="dialog"/);
  assert.match(source, /TGPI Super App modules/);
  assert.match(source, /tgpi-intelligence-network-v1\.webp/);
});

test("mobile navigation consumes the same shared module registry", () => {
  const source = readFileSync(new URL("../src/components/mobile/MobileNavigation.tsx", import.meta.url), "utf8");
  assert.match(source, /SUPER_APP_MODULES\.map/);
  assert.match(source, /mobile-super-app-grid/);
  assert.match(source, /mobile-dock-emoji/);
});
