import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getSuperAppModule, SUPER_APP_MODULES } from "../src/lib/super-app.ts";

test("personal plan has one canonical protected route", () => {
  const planModule = SUPER_APP_MODULES.find(({ id }) => id === "plan");
  assert.equal(planModule?.href, "/plan");
  assert.equal(getSuperAppModule("/plan")?.id, "plan");
  assert.equal(getSuperAppModule("/onboarding")?.id, "plan");

  const page = readFileSync(new URL("../src/app/plan/page.tsx", import.meta.url), "utf8");
  assert.match(page, /requireUser\(\)/);
  assert.match(page, /normalizeOnboardingData/);
  assert.match(page, /normalizeActivationProgress/);
  assert.match(page, /buildGlobalWorkspaceModel/);
});

test("personal plan connects the core TGPI decision modules", () => {
  const dashboard = readFileSync(new URL("../src/components/plan/PersonalPlanDashboard.tsx", import.meta.url), "utf8");
  assert.match(dashboard, /Your global decision journey/);
  assert.match(dashboard, /Best next actions/);
  assert.match(dashboard, /Countries in your plan/);
  assert.match(dashboard, /href="\/country-fit"/);
  assert.match(dashboard, /href="\/onboarding"/);

  const fit = readFileSync(new URL("../src/components/intelligence/CountryFitWorkspace.tsx", import.meta.url), "utf8");
  assert.match(fit, /href="\/plan"/);
});
