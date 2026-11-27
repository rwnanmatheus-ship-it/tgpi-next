import test from "node:test";
import assert from "node:assert/strict";
import { emptyWorksheet, validateWorksheet } from "../src/lib/intelligence/research-plan.ts";
import { simulateBudget } from "../src/lib/intelligence/budget-stress.ts";

function worksheet(currency = "BRL") {
  return { ...emptyWorksheet("brazil", currency), months: 2, tuition: 200, arrival: 100,
    monthly: { housing: 1000, food: 200, transport: 0, health: 0, other: 0 } };
}

test("rent and duration change recurring costs while keeping one-time fees fixed", () => {
  const plan = worksheet();
  assert.ok(validateWorksheet(plan, ["brazil"], []));
  assert.deepEqual(simulateBudget(plan, 10, 1), { baseline: 2970, revised: 4620, difference: 1650 });
  assert.equal(plan.monthly.housing, 1000);
  assert.equal(plan.months, 2);
});

test("incomplete inputs and unsupported durations produce no estimate", () => {
  assert.equal(simulateBudget(emptyWorksheet("japan"), 10, 1), null);
  assert.equal(simulateBudget(worksheet(), 10, 59), null);
  assert.equal(simulateBudget(worksheet(), -1, 0), null);
});

test("respects whole yen and preserves the baseline without adjustments", () => {
  const plan = worksheet("JPY");
  plan.monthly.housing = 101;
  plan.bufferPercent = 0;
  assert.equal(simulateBudget(plan, 5, 0).difference, 10);
  assert.equal(simulateBudget(plan, 0, 0).difference, 0);
});
