import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  getNextCapabilityArea,
  TGPI_CAPABILITY_AREAS,
} from "../src/lib/capability-system.ts";

const source = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("capability system exposes four unique connected product layers", () => {
  assert.equal(TGPI_CAPABILITY_AREAS.length, 4);
  assert.equal(new Set(TGPI_CAPABILITY_AREAS.map(({ id }) => id)).size, 4);
  assert.equal(new Set(TGPI_CAPABILITY_AREAS.map(({ href }) => href)).size, 4);
  assert.equal(getNextCapabilityArea("learning").id, "documents");
  assert.equal(getNextCapabilityArea("documents").id, "credentials");
  assert.equal(getNextCapabilityArea("credentials").id, "global-key");
  assert.equal(getNextCapabilityArea("global-key").id, "learning");
});

test("every capability experience renders the shared system rail", () => {
  const targets = [
    ["src/app/courses/page.tsx", 'active="learning"'],
    ["src/app/certificates/page.tsx", 'active="credentials"'],
    ["src/components/documents/DocumentsGuestExperience.tsx", 'active="documents"'],
    ["src/components/documents/DocumentsMemberExperience.tsx", 'active="documents"'],
    ["src/components/profile/GlobalKeyCenter.tsx", 'active="global-key"'],
  ];

  for (const [path, marker] of targets) {
    const file = source(path);
    assert.match(file, /CapabilitySystemRail/);
    assert.ok(file.includes(marker), `${path} is missing ${marker}`);
  }
});

test("documents compatibility route preserves the established Passport URL", () => {
  const route = source("src/app/documents/page.tsx");
  assert.match(route, /permanentRedirect\("\/passport"\)/);
});

test("capability layout protects 100 percent zoom and narrow screens", () => {
  const css = source("src/app/capability-system.css");
  const layout = source("src/app/layout.tsx");
  assert.match(css, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 68rem\)/);
  assert.match(css, /@media \(max-width: 42rem\)/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(layout, /import "\.\/capability-system\.css"/);
});
