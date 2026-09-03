export const COST_CATEGORIES = ["housing", "food", "transport", "health", "other"] as const;
export const PLAN_CURRENCIES = ["EUR", "GBP", "CAD", "USD", "JPY", "AUD", "NZD"] as const;
export type PlanningCurrency = (typeof PLAN_CURRENCIES)[number];
export type CostCategory = (typeof COST_CATEGORIES)[number];
export type ResearchWorksheet = {
  version: 2; country: string; currency: PlanningCurrency; city: string; months: number;
  monthly: Record<CostCategory, number | null>; tuition: number | null; arrival: number | null;
  bufferPercent: number; quoteDate: string; sourceNote: string; completed: string[]; updatedAt?: string;
};
export function emptyWorksheet(country: string, currency: PlanningCurrency = "USD"): ResearchWorksheet { return { version: 2, country, currency, city: "", months: 12, monthly: { housing: null, food: null, transport: null, health: null, other: null }, tuition: null, arrival: null, bufferPercent: 10, quoteDate: "", sourceNote: "", completed: [] }; }
function amount(value: unknown): value is number | null { return value === null || typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100_000_000; }
export function validateWorksheet(raw: unknown, countries: readonly string[], taskIds: readonly string[], now = new Date()): ResearchWorksheet | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const v = raw as Record<string, unknown>;
  if (v.version !== 2 || typeof v.country !== "string" || !countries.includes(v.country) || !PLAN_CURRENCIES.includes(v.currency as PlanningCurrency) || typeof v.city !== "string" || v.city.length > 80 || typeof v.months !== "number" || !Number.isInteger(v.months) || v.months < 1 || v.months > 60 || typeof v.bufferPercent !== "number" || !Number.isFinite(v.bufferPercent) || v.bufferPercent < 0 || v.bufferPercent > 50 || !amount(v.tuition) || !amount(v.arrival)) return null;
  if (!v.monthly || typeof v.monthly !== "object" || Array.isArray(v.monthly)) return null;
  const m = v.monthly as Record<string, unknown>;
  if (!COST_CATEGORIES.every(k => amount(m[k]))) return null;
  const scale = v.currency === "JPY" ? 1 : 100;
  if ([...COST_CATEGORIES.map(k => m[k]), v.tuition, v.arrival].some(n => typeof n === "number" && Math.abs(n * scale - Math.round(n * scale)) > 0.000001)) return null;
  if (typeof v.quoteDate !== "string" || typeof v.sourceNote !== "string" || v.sourceNote.length > 240 || !Array.isArray(v.completed) || v.completed.length > 12 || !v.completed.every(id => typeof id === "string" && taskIds.includes(id))) return null;
  if (v.quoteDate && (!/^\d{4}-\d{2}-\d{2}$/.test(v.quoteDate) || !Number.isFinite(Date.parse(v.quoteDate)) || new Date(v.quoteDate).toISOString().slice(0, 10) !== v.quoteDate || v.quoteDate > now.toISOString().slice(0, 10))) return null;
  return { version: 2, country: v.country, currency: v.currency as PlanningCurrency, city: v.city.trim(), months: v.months, monthly: Object.fromEntries(COST_CATEGORIES.map(k => [k, m[k]])) as ResearchWorksheet["monthly"], tuition: v.tuition, arrival: v.arrival, bufferPercent: v.bufferPercent, quoteDate: v.quoteDate, sourceNote: v.sourceNote.trim(), completed: [...new Set(v.completed as string[])] };
}
export function worksheetTotals(plan: ResearchWorksheet) {
  const scale = plan.currency === "JPY" ? 1 : 100;
  const minor = (amount: number | null) => Math.round((amount ?? 0) * scale);
  const monthlyUnits = COST_CATEGORIES.reduce((sum, k) => sum + minor(plan.monthly[k]), 0);
  const missing = [...COST_CATEGORIES.filter(k => plan.monthly[k] === null), ...(plan.tuition === null ? ["tuition"] : []), ...(plan.arrival === null ? ["arrival"] : [])];
  const baseUnits = monthlyUnits * plan.months + minor(plan.tuition) + minor(plan.arrival);
  const bufferUnits = Math.round(baseUnits * plan.bufferPercent / 100);
  return { knownMonthly: monthlyUnits / scale, missing, base: baseUnits / scale, buffer: bufferUnits / scale, total: (baseUnits + bufferUnits) / scale, complete: missing.length === 0 };
}
export const RESEARCH_TASKS = [
  { id: "route", title: "Confirm the route for your passport and residence", detail: "Identify the competent authority and applicable route. School admission is not entry permission.", layer: "entry" },
  { id: "programme", title: "Check the exact institution, campus and programme", detail: "Verify the awarding body, programme recognition, language and admission terms. If your goal is work, check the profession’s regulator separately.", layer: "education" },
  { id: "funds", title: "Separate required evidence from expected spending", detail: "Check the correct application date, household size and jurisdiction. Financial thresholds are not local spending estimates.", layer: "entry" },
  { id: "quotes", title: "Obtain dated local quotes", detail: "Document housing, food, health, transport, tuition and arrival costs in one currency. Do not assume a scholarship or future job income is guaranteed.", layer: "cost" },
  { id: "confirmation", title: "Reconfirm before committing money or travelling", detail: "Check the authority and institution again before paying non-refundable fees. A checked task records your research, not legal approval.", layer: "entry" },
] as const;
