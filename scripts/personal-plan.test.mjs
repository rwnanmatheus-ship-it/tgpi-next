import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getSuperAppModule, SUPER_APP_MODULES } from "../src/lib/super-app.ts";

test("personal plan has one canonical protected route", () => {
  const planModule = SUPER_APP_MODULES.find(({ id }) => id === "plan");
  assert.equal(planModule?.href, "/plan");
  assert.equal(getSuperAppModule("/plan")?.id, "plan");
  assert.equal(getSuperAppModule("/onboarding")?.id, "plan");

  const page = readFileSync(new URL("../src/app/plan/page.tsx", import.meta.url), "utf8");
  assert.match(page, /requireUser\("\/plan"\)/);
  assert.match(page, /normalizeOnboardingData/);
  assert.match(page, /getUserActivationView\(session.userId/);
  assert.match(page, /buildPersonalPlan/);
});

test("personal plan connects the core TGPI decision modules", () => {
  const dashboard = readFileSync(new URL("../src/components/plan/PersonalPlanDashboard.tsx", import.meta.url), "utf8");
  assert.match(dashboard, /Your global decision journey/);
  assert.match(dashboard, /Best next actions/);
  assert.match(dashboard, /Countries in your plan/);
  assert.match(dashboard, /href="\/country-fit"/);
  assert.match(dashboard, /href="\/onboarding"/);

  const fit = readFileSync(new URL("../src/components/intelligence/CountryFitWorkspace.tsx", import.meta.url), "utf8");
  assert.match(fit, /href="\/plan"/);
});

const { emptyExecution, isPlanDate, parsePlanExecutionMutation, planCalendar, rankMilestones, reserveProjection, updatePlanExecution } = await import('../src/lib/plan-execution.ts');
const id = '2e8dba00-9737-4436-ada6-cde65faa12bc';
const baseMilestone = { id, title: 'Recordar matrícula', category: 'documents', status: 'open', due: '2027-02-10', next: '' };

test('milestones validate dates, require a way to unblock and preserve private drafts on stale edits', () => {
  assert.equal(isPlanDate('2027-02-29'), false);
  assert.equal(isPlanDate('2028-02-29'), true);
  assert.equal(parsePlanExecutionMutation({ revision: 0, type: 'milestone', milestone: { ...baseMilestone, status: 'blocked' } }), null);
  const create = parsePlanExecutionMutation({ revision: 0, type: 'milestone', milestone: { ...baseMilestone, title: '  Recordar matrícula  ' } });
  const first = updatePlanExecution(emptyExecution(), create);
  const stale = updatePlanExecution(first.state, { revision: 0, type: 'remove', id });
  assert.equal(first.state.revision, 1);
  assert.equal(first.state.milestones[0].title, baseMilestone.title);
  assert.deepEqual(stale, { state: first.state, result: 'conflict' });
  assert.equal(updatePlanExecution(first.state, { revision: 1, type: 'remove', id }).state.milestones.length, 0);
  const full = { revision: 0, reserve: null, milestones: Array.from({ length: 30 }, (_, i) => ({ ...baseMilestone, id: String(i) })) };
  assert.equal(updatePlanExecution(full, create).result, 'limit');
});

test('overdue milestones precede blockers and scheduled work', () => {
  const list = [
    { ...baseMilestone, title: 'scheduled' },
    { ...baseMilestone, title: 'done', status: 'done', due: '2026-09-01' },
    { ...baseMilestone, title: 'blocked', status: 'blocked', next: 'Find the original', due: '' },
    { ...baseMilestone, title: 'overdue', due: '2026-10-01' },
  ];
  assert.deepEqual(rankMilestones(list, '2026-11-15').map(item => item.title), ['overdue', 'blocked', 'scheduled', 'done']);
});

test('reserve rounds up in the scenario currency and never shows a weekly target past the deadline', () => {
  const reserve = { country: 'japan', slot: '1', currency: 'JPY', saved: 300, due: '2026-11-30' };
  assert.deepEqual(reserveProjection(1000, reserve, '2026-11-15'), { remaining: 700, weekly: 234 });
  assert.deepEqual(reserveProjection(1000, reserve, '2026-11-30'), { remaining: 700, weekly: null });
  assert.deepEqual(reserveProjection(100, reserve, '2026-12-05'), { remaining: 0, weekly: 0 });
  assert.equal(parsePlanExecutionMutation({ revision: 0, type: 'reserve', reserve: { ...reserve, saved: 300.01 } }), null);
});

test('calendar folds UTF-8 lines, escapes delimiters and exports pending dates only', () => {
  const title = 'Decisão, inscrição; ' + '保'.repeat(31) + '\nEND:VEVENT';
  const calendar = planCalendar([{ ...baseMilestone, title }, { ...baseMilestone, status: 'done' }, { ...baseMilestone, due: '' }], new Date('2026-11-15T15:00:00Z'));
  assert.ok(calendar.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
  assert.equal(calendar.match(/BEGIN:VEVENT/g)?.length, 1);
  assert.match(calendar, /DTSTART;VALUE=DATE:20270210/);
  assert.match(calendar, /DTSTAMP:20261115T150000Z/);
  const unfolded = calendar.replaceAll('\r\n ', '');
  assert.ok(unfolded.includes('SUMMARY:' + title.replace(',', '\\,').replace(';', '\\;').replace('\n', ' ')));
});
