import test from "node:test";
import assert from "node:assert/strict";
import { buildBriefText, nextBriefCriterion, restoreBrief } from "../src/lib/comparison-brief.ts";
import { comparisonPlanPath } from "../src/lib/comparison-state.ts";
import { briefCopy } from "../src/components/compare/decision-brief-copy.ts";

const countries = ["portugal", "canada", "japan", "spain", "brazil", "france"].map(slug => ({ slug, name: slug.toUpperCase() }));

test("restored shortlist excludes stale, duplicate and excess destinations", () => {
  const draft = restoreBrief({ finalists: ["x", "spain", "spain", ...countries.map(c => c.slug)], reviews: {
    portugal: { budget: "suitable", language: "pending", fake: "concern" }, japan: null, x: { fit: "concern" },
  } }, countries);
  assert.deepEqual(draft.finalists, ["spain", "portugal", "canada", "japan", "brazil"]);
  assert.deepEqual(draft.reviews, { portugal: { budget: "suitable" } });
  const plan = new URL(comparisonPlanPath(draft.finalists, "study"), "https://example.org");
  assert.deepEqual(plan.searchParams.getAll("country"), draft.finalists);
  assert.equal(plan.searchParams.get("goal"), "study");
});

test("concerns take priority, then unreviewed criteria, then completion", () => {
  assert.equal(nextBriefCriterion({ language: "concern" }), "language");
  assert.equal(nextBriefCriterion({ budget: "suitable" }), "documents");
  assert.equal(nextBriefCriterion({ budget: "suitable", documents: "suitable", language: "suitable", fit: "suitable" }), undefined);
});

test("all six exports retain the full comparison, personal reviews and the appropriate next action", () => {
  assert.deepEqual(Object.keys(briefCopy).sort(), ["de", "en", "es", "fr", "it", "pt-BR"]);
  for (const copy of Object.values(briefCopy)) {
    const draft = restoreBrief({ finalists: ["portugal", "japan"], reviews: { japan: { language: "concern" }, brazil: { budget: "suitable" } } }, countries);
    const result = buildBriefText(countries, "work", "Career", draft, copy);
    assert.ok(result.includes(copy.title) && result.includes(copy.statuses.concern));
    assert.ok(result.includes("PORTUGAL, JAPAN") && result.includes("BRAZIL"));
    const link = new URL(result.match(/https:\/\/[^\n]+/)[0]);
    assert.deepEqual(link.searchParams.getAll("country"), countries.map(c => c.slug));
    assert.equal(link.searchParams.get("goal"), "work");
    assert.deepEqual([...new Set(link.searchParams.keys())], ["country", "goal"]);
    assert.ok(result.includes("/countries/japan#country-learning"));
  }
});
