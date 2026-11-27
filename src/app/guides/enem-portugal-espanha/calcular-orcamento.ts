export type BudgetDraft = {
  tuition: string;
  living: string;
  months: string;
  years: string;
  initial: string;
};

export type BudgetKey = keyof BudgetDraft;

export function readBudgetField(key: BudgetKey, raw: string): number | null {
  const value = raw.trim();
  if (key === "months" || key === "years") {
    if (!/^\d+$/.test(value)) return null;
    const count = Number(value);
    return count >= 1 && count <= (key === "months" ? 12 : 20) ? count : null;
  }

  // Accept BR currency formatting, or a decimal point from a numeric keyboard.
  let normalized: string;
  if (/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(value)) {
    normalized = value.replaceAll(".", "").replace(",", ".");
  } else if (/^\d+\.\d{1,2}$/.test(value)) {
    normalized = value;
  } else {
    return null;
  }
  const [euros, fraction = ""] = normalized.split(".");
  const cents = Number(euros + fraction.padEnd(2, "0"));
  return Number.isSafeInteger(cents) ? cents : null;
}

export function budgetTotals(draft: BudgetDraft) {
  const tuition = readBudgetField("tuition", draft.tuition);
  const living = readBudgetField("living", draft.living);
  const months = readBudgetField("months", draft.months);
  const years = readBudgetField("years", draft.years);
  const initial = readBudgetField("initial", draft.initial);
  if (tuition === null || living === null || months === null || years === null || initial === null) return null;
  const recurringAnnualCents = tuition + living * months;
  const fullCourseCents = recurringAnnualCents * years + initial;
  return Number.isSafeInteger(fullCourseCents) ? { recurringAnnualCents, fullCourseCents } : null;
}
