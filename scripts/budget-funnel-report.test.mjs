import test from "node:test";
import assert from "node:assert/strict";
import { summarizeBudgetFunnel } from "./budget-funnel-report.mjs";

test("funnel report counts direct and nested log lines and ignores other channels", async () => {
  const event = { channel: "tgpi_funnel_v1", event: "budget_simulation_viewed", at: "2026-11-24T22:00:00Z" };
  const inputs = [JSON.stringify(event), JSON.stringify({ message: JSON.stringify({ ...event, event: "budget_scenario_created", at: "2026-11-25T00:00:00Z" }) }),
    JSON.stringify({ ...event, channel: "other" }), JSON.stringify({ ...event, at: "invalid" }), "garbage"];
  const result = await summarizeBudgetFunnel(inputs);
  assert.equal(result.firstEventAt, "2026-11-24T22:00:00.000Z");
  assert.equal(result.lastEventAt, "2026-11-25T00:00:00.000Z");
  assert.equal(result.counts.budget_simulation_viewed, 1);
  assert.equal(result.counts.budget_scenario_created, 1);
  assert.equal(result.counts.subscription_confirmed, 0);
});
