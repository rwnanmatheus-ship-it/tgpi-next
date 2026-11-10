import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { buildGlobalWorkspaceModel } from "../src/lib/global-workspace.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");

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

test("action labels match saved destinations when the plan has changed", () => {
  const model = buildGlobalWorkspaceModel(onboarding, countries, {
    ...activation,
    comparisons: [{ ...activation.comparisons[0], countrySlugs: ["spain", "portugal"], goal: "study" }],
    documentReviews: { spain: activation.documentReviews.portugal },
    costEstimates: { spain: { updatedAt: activation.updatedAt } },
  });
  const documents = model.actions.find(action => action.id === "documents");
  assert.equal(documents.action, "Review Spain");
  assert.equal(documents.href, "/countries/spain#documents-to-verify");
  assert.match(documents.description, /Spain/);
  assert.doesNotMatch(documents.description, /strongest current fit/);
  const cost = model.actions.find(action => action.id === "cost");
  assert.equal(cost.href, "/countries/spain#cost-of-living");
  assert.match(cost.description, /Spain/);
  assert.doesNotMatch(cost.description, /Portugal/);
  const comparison = model.actions.find(action => action.id === "compare");
  assert.match(comparison.description, /Spain & Portugal/);
  assert.match(comparison.description, /study/);
  assert.match(comparison.href, /goal=study/);
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

test("Command Center preserves shared navigation and direct module links", () => {
  const workspace = readFileSync(
    new URL("../src/components/profile/GlobalWorkspaceOS.tsx", import.meta.url),
    "utf8",
  );
  const command = readFileSync(
    new URL("../src/components/profile/WorkspaceCommandButton.tsx", import.meta.url),
    "utf8",
  );

  assert.match(workspace, /Global Command Center/);
  assert.match(workspace, /SUPER_APP_MODULES\.filter/);
  assert.match(workspace, /WorkspacePersonalSpace/);
  assert.match(workspace, /WorkspaceCertificates/);
  assert.match(workspace, /href="\/notifications"/);
  assert.doesNotMatch(workspace, /workspaceNav/);
  assert.doesNotMatch(workspace, /action="\/search"/);
  assert.doesNotMatch(workspace, /href="\/documents"/);
  assert.match(command, /SUPER_APP_OPEN_EVENT/);
  assert.match(command, /aria-haspopup="dialog"/);
  assert.match(command, /Control\+K Meta\+K/);
});

test("workspace membership displays confirmed plans and stays neutral during a billing outage", async () => {
  const source = readFileSync(new URL("../src/lib/account-membership.server.ts", import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  const identity = { uid: "workspace-member" };
  let accessMode = null;
  let plan = "free";
  let billingError = null;
  const reads = [];
  const warnings = [];
  const dependencies = {
    "server-only": {},
    "@/lib/billing.server": {
      getUserBillingRecord: async (uid) => {
        reads.push(uid);
        if (billingError) throw billingError;
        return { plan };
      },
    },
    "@/lib/firestore-admin-rest.server": {
      isFirestoreQuotaError: (error) => error.code === "RESOURCE_EXHAUSTED",
    },
    "@/lib/premium-access.server": {
      getControlledPremiumAccessMode: async (member) => {
        assert.equal(member, identity);
        return accessMode;
      },
    },
  };
  new Function("require", "exports", "console", outputText)((id) => {
    assert.ok(Object.hasOwn(dependencies, id), `Unexpected import: ${id}`);
    return dependencies[id];
  }, exports, { warn: (...args) => warnings.push(args) });

  const { getAccountMembershipLabel } = exports;
  assert.equal(await getAccountMembershipLabel(identity), "TGPI Free");
  plan = "premium";
  assert.equal(await getAccountMembershipLabel(identity), "TGPI Premium");

  billingError = Object.assign(new Error("Quota exceeded."), { code: "RESOURCE_EXHAUSTED", status: 429 });
  assert.equal(await getAccountMembershipLabel(identity), "Could not verify membership status.");
  assert.equal(warnings.at(-1)[1], "firestore_quota");

  billingError = new TypeError("fetch failed");
  assert.equal(await getAccountMembershipLabel(identity), "Could not verify membership status.");
  assert.equal(warnings.at(-1)[1], "billing_lookup_failed");

  accessMode = "founder";
  assert.equal(await getAccountMembershipLabel(identity), "TGPI Founder");
  accessMode = "preview";
  assert.equal(await getAccountMembershipLabel(identity), "Premium Preview");
  assert.deepEqual(reads, Array(4).fill(identity.uid));
});

function loadWorkspaceComponent(path, dependencies, browserWindow) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });
  const exports = {};
  new Function("require", "exports", "window", outputText)((id) => {
    if (id === "react/jsx-runtime") return require(id);
    assert.ok(Object.hasOwn(dependencies, id), `Unexpected import: ${id}`);
    return dependencies[id];
  }, exports, browserWindow);
  return exports.default;
}

test("workspace entries request a fresh document and keep link attributes", () => {
  const NextLink = () => null;
  const NavigationLink = loadWorkspaceComponent("../src/components/navigation/NavigationLink.tsx", {
    "next/link": NextLink,
  });
  const onClick = () => {};
  for (const href of ["/profile", "/profile/?onboarding=completed", "/profile/security#settings-identity", "/dashboard"]) {
    const link = NavigationLink({ href, "aria-current": "page", onClick, prefetch: false });
    assert.equal(link.type, "a", href);
    assert.equal(link.props.href, href);
    assert.equal(link.props.onClick, onClick);
    assert.equal(link.props["aria-current"], "page");
    assert.equal(Object.hasOwn(link.props, "prefetch"), false);
  }
  for (const href of ["/countries?return_to=/profile", "/profiles", "/sign-up"]) {
    const link = NavigationLink({ href, prefetch: false });
    assert.equal(link.type, NextLink, href);
    assert.equal(link.props.prefetch, false);
  }
});

test("workspace recovery reloads the current document instead of retrying the failed server render", () => {
  let reloads = 0;
  const WorkspaceError = loadWorkspaceComponent("../src/app/profile/error.tsx", {
    "@/components/localization/LocaleProvider": { useLocale: () => ({ t: (key) => key }) },
  }, { location: { reload: () => { reloads += 1; } } });

  const error = WorkspaceError();
  const button = error.props.children.find((element) => element.type === "button");
  assert.equal(button.props.children, "Retry workspace");
  button.props.onClick();
  assert.equal(reloads, 1);
});
