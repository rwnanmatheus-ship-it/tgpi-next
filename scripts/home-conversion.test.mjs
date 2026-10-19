import { matchesPremiumOffer } from "../src/lib/commercial-offer.ts";
import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { safeReturnTo } from "../src/lib/auth/return-to.ts";
import { hasFunnelConsent } from "../src/lib/funnel.ts";
import { HOME_ROUTES, HOME_COURSES, HOME_FAQ } from "../src/lib/home-content.ts";
import { HOME_GOALS, HOME_SECTIONS, homeGoal } from "../src/lib/home-journey.ts";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
test("authentication preserves allowed local intent including country goal and membership anchor", () => {
  for (const path of ["/country-fit?country=portugal&goal=work", "/pricing#membership", "/onboarding", "/compare?country=canada&country=portugal"]) assert.equal(safeReturnTo(path), path);
});
test("authentication rejects external, malformed and privileged redirect targets", () => {
  for (const path of ["https://evil.example", "//evil.example", "/\\evil.example", "/admin", "/api/stripe/create-checkout-session", "/%2f%2fevil.example", "/profile\n", "javascript:alert(1)", null, { next: "/profile" }, "/profile/../admin"]) assert.equal(safeReturnTo(path), "/onboarding");
});
test("conversion measurement requires exact consent and respects GPC", () => {
  assert.equal(hasFunnelConsent(null), false);
  assert.equal(hasFunnelConsent("tgpi_analytics_consent=denied"), false);
  assert.equal(hasFunnelConsent("x_tgpi_analytics_consent=granted"), false);
  assert.equal(hasFunnelConsent("foo=bar; tgpi_analytics_consent=granted"), true);
  assert.equal(hasFunnelConsent("tgpi_analytics_consent=granted", "1"), false);
});
test("every central Home destination resolves to a route", () => {
  for (const value of Object.values(HOME_ROUTES)) {
    const pathname = new URL(value, "https://tgpi.invalid").pathname;
    assert.ok(existsSync(new URL(`../src/app${pathname === "/sign-up" ? "/sign-up/[[...sign-up]]" : pathname}/page.tsx`, import.meta.url)), pathname);
  }
});
test("featured course ids exist in the published catalogue and all generated crops exist", () => {
  const catalog = read("src/data/courses-overview.ts");
  for (const { id } of HOME_COURSES) assert.ok(catalog.includes(`"${id}"`), id);
  for (const asset of ["hero", "decision", "preparation", "learning", ...HOME_COURSES.map(c => c.asset)]) for (const crop of ["desktop", "mobile"]) assert.ok(existsSync(new URL(`../public/images/home/editorial-v5/${asset}-${crop}.webp`, import.meta.url)));
});
test("Home provides one H1 and FAQ structured data uses the same answers", () => {
  const home = read("src/components/home/v4/InstitutionalHome.tsx");
  assert.equal((home.match(/<h1\b/g) ?? []).length, 1);
  assert.equal(HOME_FAQ.length, 6);
  assert.match(read("src/app/page.tsx"), /faq=\{HOME_FAQ\}/);
});

test("checkout price guard rejects wrong amounts, currency, cadence and inactive offers", () => {
  const price = { active: true, currency: "usd", unit_amount: 1990, recurring: { interval: "month", interval_count: 1 } };
  assert.equal(matchesPremiumOffer(price), true);
  for (const patch of [{ active: false }, { currency: "brl" }, { unit_amount: 2990 }, { unit_amount: null }, { recurring: null }, { recurring: { interval: "year", interval_count: 1 } }, { recurring: { interval: "month", interval_count: 2 } }]) assert.equal(matchesPremiumOffer({ ...price, ...patch }), false);
});

// Integration contract: every Home choice must remain accepted by the real destination.
test("Home goals use the Country Fit route's supported vocabulary and safe defaults", () => {
  const route = read("src/app/country-fit/page.tsx");
  for (const goal of HOME_GOALS) {
    assert.ok(route.includes(`"${goal.id}"`), goal.id);
    assert.equal(homeGoal(goal.id), goal.id);
  }
  for (const invalid of [undefined, null, "<script>", "admin", [], {}]) assert.equal(homeGoal(invalid), "study");
});
test("chapter index targets real focusable Home sections", () => {
  const home = read("src/components/home/v4/InstitutionalHome.tsx");
  for (const { id } of HOME_SECTIONS) assert.ok(home.includes(`id="${id}" tabIndex={-1}`), id);
});
