import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildGlobalWorkspaceModel } from "../src/lib/global-workspace.ts";

const countries = [
  { slug: "portugal", name: "Portugal", emoji: "🇵🇹" },
  { slug: "spain", name: "Spain", emoji: "🇪🇸" },
];

const onboarding = {
  schemaVersion: 1,
  completed: true,
  currentStep: 7,
  primaryGoal: "work",
  targetCountries: ["portugal", "spain"],
  timeHorizon: "6-months",
  budgetRange: "1500-3000",
  languages: ["Portuguese", "English"],
  profession: "Designer",
  educationLevel: "Bachelor's degree",
  internationalExperience: "short-trips",
  priorities: ["career", "cost", "quality-of-life"],
  updatedAt: "2026-09-08T10:00:00.000Z",
};

const activation = {
  version: 1,
  updatedAt: "2026-09-08T12:00:00.000Z",
  savedCountries: ["spain", "portugal"],
  comparisons: [
    {
      countrySlugs: ["portugal", "spain"],
      goal: "work",
      id: "comparison-1",
      updatedAt: "2026-09-08T11:00:00.000Z",
    },
  ],
  costEstimates: {},
  documentReviews: {
    portugal: {
      completedItemIds: ["passport"],
      totalItems: 4,
      updatedAt: "2026-09-08T11:30:00.000Z",
    },
  },
  courseProgress: {
    "english-abroad": {
      completedLessonIds: ["arrival"],
      courseVersion: "1",
      startedAt: "2026-09-08T09:00:00.000Z",
      totalLessons: 4,
      updatedAt: "2026-09-08T11:45:00.000Z",
    },
  },
  activities: [],
};

test("workspace journey is calculated from real plan and activation data", () => {
  const model = buildGlobalWorkspaceModel(onboarding, countries, activation);

  assert.deepEqual(model.journey.map(({ id }) => id), ["discover", "decide", "prepare", "develop"]);
  assert.deepEqual(model.journey.map(({ progress }) => progress), [100, 50, 25, 25]);
  assert.equal(model.currentStageId, "decide");
  assert.equal(model.lastSyncedAt, activation.updatedAt);
  assert.deepEqual(model.savedCountries.map(({ slug }) => slug), ["spain", "portugal"]);
});

test("action pulse reconciles every action without inventing activity", () => {
  const model = buildGlobalWorkspaceModel(onboarding, countries, activation);
  const total = Object.values(model.actionSummary).reduce((sum, value) => sum + value, 0);

  assert.equal(total, model.actions.length);
  assert.equal(model.actionSummary.completed, 2);
  assert.equal(model.actionSummary.inProgress, 2);
  assert.equal(model.actionSummary.ready, 1);
  assert.ok(model.countryFits.every(({ score }) => score === null));
});

test("empty context directs the journey to canonical TGPI modules", () => {
  const model = buildGlobalWorkspaceModel(
    {
      ...onboarding,
      completed: false,
      primaryGoal: "",
      targetCountries: [],
      timeHorizon: "",
      budgetRange: "",
      languages: [],
      internationalExperience: "",
      priorities: [],
    },
    countries,
  );

  assert.equal(model.currentStageId, "discover");
  assert.equal(model.journey.find(({ id }) => id === "decide")?.href, "/country-fit");
  assert.equal(model.journey.find(({ id }) => id === "prepare")?.href, "/passport");
});

test("Workspace V3 uses the shared Super App navigation and live command center", () => {
  const workspace = readFileSync(
    new URL("../src/components/profile/GlobalWorkspaceOS.tsx", import.meta.url),
    "utf8",
  );
  const command = readFileSync(
    new URL("../src/components/profile/WorkspaceCommandButton.tsx", import.meta.url),
    "utf8",
  );

  assert.match(workspace, /Workspace Intelligence Home · V3/);
  assert.match(workspace, /SUPER_APP_MODULES\.map/);
  assert.match(workspace, /Global decision journey/);
  assert.match(workspace, /Decision pulse/);
  assert.match(workspace, /href="\/notifications"[\s\S]*?🔔/);
  assert.doesNotMatch(workspace, /workspaceNav/);
  assert.doesNotMatch(workspace, /action="\/search"/);
  assert.doesNotMatch(workspace, /href="\/documents"/);
  assert.match(command, /SUPER_APP_OPEN_EVENT/);
  assert.match(command, /aria-haspopup="dialog"/);
  assert.match(command, /Control\+K Meta\+K/);
});
