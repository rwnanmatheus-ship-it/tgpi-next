import { worksheetTotals, type ResearchWorksheet } from "./research-plan.ts";

/** Keep one-time costs fixed. Round the revised monthly rent in the planning currency. */
export function simulateBudget(plan: ResearchWorksheet, rentIncrease: number, extraMonths: number) {
  const baseline = worksheetTotals(plan);
  if (!baseline.complete || plan.monthly.housing === null) return null;
  if (!Number.isInteger(rentIncrease) || rentIncrease < 0 || rentIncrease > 50 ||
      !Number.isInteger(extraMonths) || extraMonths < 0 || plan.months + extraMonths > 60) return null;
  const scale = plan.currency === "JPY" ? 1 : 100;
  const rentUnits = Math.round(plan.monthly.housing * scale);
  const housing = Math.round(rentUnits * (100 + rentIncrease) / 100) / scale;
  const revised = worksheetTotals({
    ...plan,
    months: plan.months + extraMonths,
    monthly: { ...plan.monthly, housing },
  });
  return {
    baseline: baseline.total,
    revised: revised.total,
    difference: (Math.round(revised.total * scale) - Math.round(baseline.total * scale)) / scale,
  };
}
