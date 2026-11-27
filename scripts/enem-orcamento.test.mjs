import assert from "node:assert/strict";
import test from "node:test";
import { budgetTotals, readBudgetField } from "../src/app/guides/enem-portugal-espanha/calcular-orcamento.ts";

const coimbra = { tuition: "2.000,30", living: "500,01", months: "10", years: "3", initial: "70,50" };

test("tuition repeats every year, monthly expenses repeat only for selected months, startup costs occur once", () => {
  assert.deepEqual(budgetTotals(coimbra), { recurringAnnualCents: 700040, fullCourseCents: 2107170 });
  assert.equal(budgetTotals({ ...coimbra, years: "4" }).fullCourseCents, 2807210);
});

test("missing estimates and invalid periods never silently turn into zero; an explicit zero is valid", () => {
  for (const invalid of [{ living: "" }, { initial: "-1" }, { months: "13" }, { months: "0" }, { years: "2,5" }, { tuition: "1e4" }]) {
    assert.equal(budgetTotals({ ...coimbra, ...invalid }), null);
  }
  assert.deepEqual(budgetTotals({ ...coimbra, living: "0", initial: "0", tuition: "0" }), { recurringAnnualCents: 0, fullCourseCents: 0 });
});

test("Portuguese decimal and grouping separators preserve cents; unsafe or malformed amounts are rejected", () => {
  for (const input of ["1.234,56", "1234,56", "1234.56"]) assert.equal(readBudgetField("living", input), 123456);
  assert.equal(readBudgetField("living", "1.000"), 100000);
  assert.equal(readBudgetField("living", "1.2.34"), null);
  assert.equal(budgetTotals({ ...coimbra, tuition: "90071992547409,91" }), null);
});
