import { PLAN_CURRENCIES, type PlanningCurrency } from './intelligence/research-plan.ts';

export const milestoneCategories = ['profile', 'compare', 'documents', 'cost', 'learning', 'personal'] as const;
export const milestoneStatuses = ['open', 'blocked', 'done'] as const;
export const milestoneLimit = 30;
export type Milestone = {
  id: string;
  title: string;
  country?: string;
  category: typeof milestoneCategories[number];
  status: typeof milestoneStatuses[number];
  due: string;
  next: string;
};
export type Reserve = { country: string; slot: '1' | '2' | '3'; currency: PlanningCurrency; saved: number; due: string };
export type PlanExecution = { revision: number; milestones: Milestone[]; reserve: Reserve | null };
export type PlanExecutionMutation = { revision: number } & (
  { type: 'milestone'; milestone: Milestone } |
  { type: 'remove'; id: string } |
  { type: 'reserve'; reserve: Reserve | null }
);

export function emptyExecution(): PlanExecution {
  return { revision: 0, milestones: [], reserve: null };
}

export function isPlanDate(value: unknown): value is string {
  return typeof value === 'string' && /^[2-9]\d{3}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

function isMilestoneId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(value);
}

function isMember<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && list.includes(value as T);
}

export function parsePlanExecutionMutation(raw: unknown): PlanExecutionMutation | null {
  if (!raw || typeof raw !== 'object') return null;
  const input = raw as Record<string, unknown>;
  const { revision, type } = input;
  if (typeof revision !== 'number' || !Number.isSafeInteger(revision) || revision < 0) return null;
  if (type === 'remove') return isMilestoneId(input.id) ? { type, revision, id: input.id } : null;
  if (type === 'reserve') {
    if (input.reserve === null) return { type, revision, reserve: null };
    if (!input.reserve || typeof input.reserve !== 'object') return null;
    const { country, slot, currency, saved, due } = input.reserve as Record<string, unknown>;
    if (typeof country !== 'string' || !/^[a-z][a-z0-9-]{1,63}$/.test(country) || !isMember(['1', '2', '3'] as const, slot)
      || !isMember(PLAN_CURRENCIES, currency) || typeof saved !== 'number' || !Number.isFinite(saved)
      || saved < 0 || saved > 100_000_000 || !isPlanDate(due)) return null;
    const scale = currency === 'JPY' ? 1 : 100;
    const units = Math.round(saved * scale);
    if (Math.abs(saved * scale - units) > 0.00001) return null;
    return { type, revision, reserve: { country, slot, currency, saved: units / scale, due } };
  }
  if (type !== 'milestone' || !input.milestone || typeof input.milestone !== 'object') return null;
  const { id, title, category, status, due, next, country } = input.milestone as Record<string, unknown>;
  if (!isMilestoneId(id) || typeof title !== 'string' || !title.trim() || title.length > 120
    || !isMember(milestoneCategories, category) || !isMember(milestoneStatuses, status)
    || !(due === '' || isPlanDate(due)) || typeof next !== 'string' || next.length > 240
    || (country !== undefined && (typeof country !== 'string' || !/^[a-z][a-z0-9-]{1,63}$/.test(country)))
    || (status === 'blocked' && !next.trim())) return null;
  return { type, revision, milestone: { id, title: title.trim(), category, status, due, next: next.trim(), ...(country ? { country } : {}) } };
}

export function updatePlanExecution(current: PlanExecution, mutation: PlanExecutionMutation):
  { state: PlanExecution; result: 'saved' | 'conflict' | 'limit' } {
  if (current.revision !== mutation.revision) return { state: current, result: 'conflict' };
  const milestones = current.milestones;
  const revision = current.revision + 1;
  if (mutation.type === 'reserve') return { state: { ...current, revision, reserve: mutation.reserve }, result: 'saved' };
  if (mutation.type === 'remove') return { state: { ...current, revision, milestones: milestones.filter(item => item.id !== mutation.id) }, result: 'saved' };
  const existed = milestones.some(item => item.id === mutation.milestone.id);
  if (!existed && milestones.length >= milestoneLimit) return { state: current, result: 'limit' };
  return { state: { ...current, revision, milestones: existed
    ? milestones.map(item => item.id === mutation.milestone.id ? mutation.milestone : item)
    : [...milestones, mutation.milestone] }, result: 'saved' };
}

export function localPlanDate(now = new Date()) {
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
}

export function rankMilestones(items: Milestone[], today: string) {
  const priority = (item: Milestone) => item.status === 'done' ? 4
    : item.due && item.due < today ? 0 : item.status === 'blocked' ? 1 : item.due ? 2 : 3;
  return [...items].sort((a, b) => priority(a) - priority(b) || (a.due || '9999').localeCompare(b.due || '9999'));
}

export function reserveProjection(total: number, reserve: Reserve, today: string) {
  const scale = reserve.currency === 'JPY' ? 1 : 100;
  const gap = Math.max(0, Math.round(total * scale) - Math.round(reserve.saved * scale));
  const days = (Date.parse(reserve.due) - Date.parse(today)) / 86_400_000;
  const weeks = Math.max(1, Math.ceil(days / 7));
  return { remaining: gap / scale, weekly: days <= 0 && gap ? null : Math.ceil(gap / weeks) / scale };
}

const escapeText = (value: string) => value.replace(/[\\;,\r\n]/g, char => /[\r\n]/.test(char) ? ' ' : '\\' + char);
function foldLine(line: string) {
  const encoder = new TextEncoder();
  let bytes = 0;
  let output = '';
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > 75) {
      output += '\r\n ';
      bytes = 1;
    }
    output += char;
    bytes += size;
  }
  return output;
}

export function planCalendar(items: Milestone[], now = new Date()) {
  const stamp = now.toISOString().replace(/[-:]|\.\d{3}/g, '');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TGPI//Personal Global Plan//EN', 'CALSCALE:GREGORIAN',
    ...items.filter(item => item.status !== 'done' && isPlanDate(item.due)).flatMap(item => [
      'BEGIN:VEVENT', `UID:${item.id}@theglobalpolymath.com`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${item.due.replaceAll('-', '')}`, `SUMMARY:${escapeText(item.title)}`, 'END:VEVENT',
    ]), 'END:VCALENDAR', '',
  ].map(foldLine).join('\r\n');
}
