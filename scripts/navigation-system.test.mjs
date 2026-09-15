import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import postcss from "postcss";
import {
  COMPACT_NAV_MAX_WIDTH,
  COMPACT_NAVIGATION,
  getActiveNavigationDestination,
  getSuperAppIconName,
  isNavigationDestinationActive,
  PRIMARY_NAVIGATION,
} from "../src/lib/navigation-system.ts";

test("navigation v2 uses one responsive compact boundary", () => {
  assert.equal(COMPACT_NAV_MAX_WIDTH, 1023);
  assert.equal(PRIMARY_NAVIGATION.length, 5);
  assert.equal(COMPACT_NAVIGATION.length, 5);
});

test("primary navigation maps the complete decision journey", () => {
  assert.deepEqual(
    PRIMARY_NAVIGATION.map(({ id }) => id),
    ["countries", "country-fit", "compare", "documents", "learning"],
  );
  assert.equal(getActiveNavigationDestination("/countries/japan")?.id, "countries");
  assert.equal(getActiveNavigationDestination("/documents")?.id, "documents");
  assert.equal(getActiveNavigationDestination("/certificates")?.id, "learning");
});

test("active destinations respect route boundaries", () => {
  const countries = PRIMARY_NAVIGATION[0];
  assert.equal(isNavigationDestinationActive("/countries", countries), true);
  assert.equal(isNavigationDestinationActive("/countries/japan", countries), true);
  assert.equal(isNavigationDestinationActive("/countries-other", countries), false);
});

test("every Super App module resolves to a vector icon", () => {
  for (const id of [
    "workspace", "global-key", "country-fit", "countries", "compare", "plan",
    "documents", "learning", "credentials", "intelligence", "settings",
  ]) {
    assert.equal(typeof getSuperAppIconName(id), "string");
  }
});

test("navigation CSS bridges phone, tablet and desktop without overlap", () => {
  const css = readFileSync(new URL("../src/app/navigation-system.css", import.meta.url), "utf8");
  const root = postcss.parse(css);
  assert.ok(root.nodes.length > 0);
  assert.match(css, /@media \(max-width: 1023px\)/);
  assert.match(css, /@media \(max-width: 1220px\) and \(min-width: 1024px\)/);
  assert.match(css, /body:has\(\.tgpi-compact-dock\)/);
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("desktop and compact navigation share the typed registry", () => {
  const desktop = readFileSync(new URL("../src/components/Navbar.tsx", import.meta.url), "utf8");
  const compact = readFileSync(new URL("../src/components/mobile/MobileNavigation.tsx", import.meta.url), "utf8");
  assert.match(desktop, /PRIMARY_NAVIGATION\.map/);
  assert.match(compact, /COMPACT_NAVIGATION\.map/);
  assert.match(desktop, /data-navigation-version="2"/);
  assert.match(compact, /data-navigation-version="2"/);
});

test("navigation surfaces use vector icons instead of decorative emoji", () => {
  const desktop = readFileSync(new URL("../src/components/Navbar.tsx", import.meta.url), "utf8");
  const compact = readFileSync(new URL("../src/components/mobile/MobileNavigation.tsx", import.meta.url), "utf8");
  const launcher = readFileSync(new URL("../src/components/super-app/SuperAppLauncher.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(`${desktop}\n${compact}\n${launcher}`, /mobile-dock-emoji|module\.icon|nextModule\.icon/);
  assert.match(`${desktop}\n${compact}\n${launcher}`, /NavigationIcon/);
});
