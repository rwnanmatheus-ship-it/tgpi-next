import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const page = read("src/app/page.tsx");
const homeFiles = [
  "HomeHeroV3",
  "HomeDecisionEntry",
  "HomeDecisionLab",
  "HomePortal",
  "HomeCountryCardsV2",
  "HomeEcosystem",
  "HomeLearningPortal",
  "HomeCommandCenter",
  "HomeInstagramContinuity",
  "HomeAuthorityLayer",
  "HomeLaunchClose",
].map((name) => read(`src/components/home/${name}.tsx`));

test("home uses one responsive experience instead of separate mobile and desktop trees", () => {
  assert.doesNotMatch(page, /MobileHome|mobile-desktop-home/);
  assert.match(page, /<HomeHeroV3 \/>/);
  assert.match(page, /<HomeDecisionEntry \/>/);
});

test("home has one H1 and a semantic section hierarchy", () => {
  const allHome = homeFiles.join("\n");
  assert.equal((allHome.match(/<h1\b/g) ?? []).length, 1);
  assert.ok((allHome.match(/<h2\b/g) ?? []).length >= 8);
  assert.ok((allHome.match(/aria-labelledby=/g) ?? []).length >= 8);
});

test("conversion story connects the core TGPI product loop", () => {
  const expectedOrder = [
    "HomeHeroV3",
    "HomeDecisionEntry",
    "HomeDecisionLab",
    "HomePortal",
    "HomeCountryCardsV2",
    "HomeEcosystem",
    "HomeLearningPortal",
    "HomeCommandCenter",
    "HomeLaunchClose",
  ];
  let previous = -1;
  for (const component of expectedOrder) {
    const current = page.indexOf(`<${component} />`);
    assert.ok(current > previous, `${component} must appear in the connected product order`);
    previous = current;
  }
});

test("decision entry passes a real intent into Country Fit", () => {
  const decisionEntry = read("src/components/home/HomeDecisionEntry.tsx");
  assert.match(decisionEntry, /COUNTRY_DECISION_PRESETS/);
  assert.match(decisionEntry, /country-fit\?goal=\$\{goal\}/);
  assert.match(decisionEntry, /aria-pressed=/);
});

test("primary home destinations resolve to implemented application routes", () => {
  const routes = [
    "country-fit",
    "compare",
    "countries",
    "courses",
    "passport",
    "certificates",
    "global-key",
    "verify",
    "profile",
    "pricing",
    "intelligence",
    "resources",
    "why",
    "authority",
    "sign-in/[[...sign-in]]",
    "sign-up/[[...sign-up]]",
  ];
  for (const route of routes) {
    assert.doesNotThrow(() => read(`src/app/${route}/page.tsx`), `Missing route /${route}`);
  }
});

test("home metadata provides canonical and social preview imagery", () => {
  assert.match(page, /alternates: \{ canonical: "https:\/\/theglobalpolymath\.com" \}/);
  assert.match(page, /images: \[/);
  assert.match(page, /tgpi-home-global-knowledge-meridian-v1\.webp/);
});
