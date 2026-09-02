import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import postcss from "postcss";
import { MOBILE_MAX_WIDTH, normalizeMobileSearch, searchMobileCountries, isMobileRouteActive, isFocusedMobileRoute } from "../src/lib/mobile-experience.ts";

const countries = [
  { slug: "portugal", name: "Portugal", capital: "Lisbon", region: "Europe", emoji: "🇵🇹" },
  { slug: "japan", name: "Japan", capital: "Tokyo", region: "Asia", emoji: "🇯🇵" },
  { slug: "spain", name: "Spain", capital: "Madrid", region: "Europe", emoji: "🇪🇸" },
];

test("mobile breakpoint does not include tablets or desktop", () => assert.equal(MOBILE_MAX_WIDTH, 767));
test("search handles accents, case and whitespace", () => assert.equal(normalizeMobileSearch("  TÓKYO  "), "tokyo"));
test("country name leads to the correct destination", () => assert.deepEqual(searchMobileCountries(countries, "Portu").map(({slug})=>slug), ["portugal"]));
test("capital search works", () => assert.equal(searchMobileCountries(countries, "Tokyo")[0].slug, "japan"));
test("region search filters countries", () => assert.equal(searchMobileCountries(countries, "Europe").length, 2));
test("empty and unknown searches do not invent results", () => { assert.deepEqual(searchMobileCountries(countries,""), []); assert.deepEqual(searchMobileCountries(countries,"unmatchedzzz"), []); });
test("search leaves the shared dataset unchanged", () => { const before=JSON.stringify(countries); searchMobileCountries(countries,"Europe"); assert.equal(JSON.stringify(countries),before); });
test("active navigation respects route boundaries", () => { assert.equal(isMobileRouteActive("/countries/portugal", "/countries"),true); assert.equal(isMobileRouteActive("/countries", "/"),false); assert.equal(isMobileRouteActive("/courses-other", "/courses"),false); });
test("workspace includes onboarding and nested profile routes", () => { assert.equal(isMobileRouteActive("/onboarding", "/profile"),true); assert.equal(isMobileRouteActive("/profile/security", "/profile"),true); });
test("auth, checkout and lessons have focused navigation", () => { for (const path of ["/sign-in","/sign-up","/login","/upgrade","/courses/english-abroad/lessons/arrival"]) assert.equal(isFocusedMobileRoute(path),true); assert.equal(isFocusedMobileRoute("/courses"),false); });
test("all visual overrides are scoped below 768px", () => {
  const root=postcss.parse(readFileSync(new URL("../src/app/mobile.css",import.meta.url),"utf8"));
  for(const node of root.nodes){
    if(node.type==="comment") continue;
    if(node.type==="rule") { assert.ok([".tgpi-mobile, .mobile-sheet", ".mobile-desktop-home"].includes(node.selector),`Unexpected global rule: ${node.selector}`); continue; }
    assert.equal(node.type,"atrule"); assert.equal(node.name,"media"); assert.match(node.params,/max-width: (767|359)px/);
  }
});
test("mobile directory is requested on demand, without shipping full country data",()=>{
  const component=readFileSync(new URL("../src/components/mobile/MobileNavigation.tsx",import.meta.url),"utf8");
  assert.match(component,/mode !== "search"/); assert.match(component,/AbortController/); assert.doesNotMatch(component,/from ["']@\/data\/countries/);
});
test("QA preview cannot be accessed in production",()=>{
  const source=readFileSync(new URL("../src/app/mobile-preview/page.tsx",import.meta.url),"utf8");
  assert.match(source,/process\.env\.VERCEL_ENV !== "preview"\) notFound/); assert.match(source,/index: false/);
});
test("phone country lenses keep their own horizontal rail",()=>{
  const css=readFileSync(new URL("../src/app/mobile.css",import.meta.url),"utf8");
  assert.match(css,/\.mobile-explorer-lenses > button \{ flex: 0 0 72%/);
  assert.match(css,/\.mobile-explorer-toolbar \{ position: relative; top: auto/);
});
test("country filter focus containment is mobile-only",()=>{
  const source=readFileSync(new URL("../src/components/countries/CountriesExplorerV3.tsx",import.meta.url),"utf8");
  assert.match(source,/event\.key !== "Tab" \|\| !window\.matchMedia\("\(max-width: 767px\)"\)/);
  assert.match(source,/previousFocus\?\.focus\(\{ preventScroll: true \}\)/);
});
