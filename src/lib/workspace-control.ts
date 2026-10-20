import type { TgpiActivationProgress } from './activation-progress.ts';
import type { Course } from '../types/course.ts';
import { getLearningContinuation } from './learning-continuity.ts';

export const WORKSPACE_MODULES = ['journey', 'library', 'history'] as const;
export type WorkspaceModule = typeof WORKSPACE_MODULES[number];
export type WorkspacePreferences = { version: 1; density: 'comfortable' | 'compact'; hidden: WorkspaceModule[]; dismissed: string[] };
export const defaultWorkspacePreferences = (): WorkspacePreferences => ({ version: 1, density: 'comfortable', hidden: [], dismissed: [] });
export function normalizeWorkspacePreferences(raw: unknown): WorkspacePreferences {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return defaultWorkspacePreferences();
  const value = raw as Record<string, unknown>;
  return { version: 1, density: value.density === 'compact' ? 'compact' : 'comfortable', hidden: Array.isArray(value.hidden) ? WORKSPACE_MODULES.filter(id => value.hidden instanceof Array && value.hidden.includes(id)) : [], dismissed: Array.isArray(value.dismissed) ? [...new Set(value.dismissed.filter((id): id is string => typeof id === 'string' && /^[a-z_]+$/.test(id)))].slice(0, 8) : [] };
}
export function parseWorkspacePreferences(raw: unknown): WorkspacePreferences | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const v = raw as Record<string, unknown>;
  if (v.version !== 1 || !['comfortable','compact'].includes(String(v.density)) || !Array.isArray(v.hidden) || v.hidden.length > 3 || v.hidden.some(id => !WORKSPACE_MODULES.includes(id as WorkspaceModule)) || !Array.isArray(v.dismissed) || v.dismissed.length > 8 || v.dismissed.some(id => typeof id !== 'string' || !/^[a-z_]+$/.test(id))) return null;
  return normalizeWorkspacePreferences(v);
}
export type WorkspaceResource = { id: string; title: string; kind: 'country' | 'comparison' | 'course' | 'documents'; href: string; detail: string; updatedAt?: string; status?: 'in_progress' | 'completed' | 'edition_changed' };
export function buildWorkspaceResources(progress: TgpiActivationProgress, catalogue: readonly Course[], countries: readonly { slug: string; name: string }[]): WorkspaceResource[] {
  const resources: WorkspaceResource[] = [];
  for (const slug of progress.savedCountries) {
    const country = countries.find(c => c.slug === slug);
    if (country) resources.push({ id: `country-${slug}`, title: country.name, kind: 'country', href: `/countries/${slug}`, detail: 'Saved destination' });
  }
  for (const comparison of progress.comparisons) {
    const selected = comparison.countrySlugs.flatMap(slug => countries.filter(c => c.slug === slug));
    if (selected.length < 2) continue;
    const params = new URLSearchParams({ goal: comparison.goal });
    selected.forEach(c => params.append('country', c.slug));
    resources.push({ id: comparison.id, title: selected.map(c => c.name).join(' / '), kind: 'comparison', href: `/compare?${params}`, detail: `${comparison.goal} comparison`, updatedAt: comparison.updatedAt });
  }
  for (const [id, record] of Object.entries(progress.courseProgress)) {
    const continuation = getLearningContinuation(catalogue, { [id]: record });
    if (!continuation || id === 'english-abroad' && progress.courseProgress['global-english-2026']) continue;
    const course = catalogue.find(c => c.id === continuation.courseId)!;
    const current = record.courseVersion === course.version;
    const valid = new Set(course.modules.flatMap(m => m.lessons.map(l => l.id)));
    const completed = current ? new Set(record.completedLessonIds.filter(id => valid.has(id))).size : 0;
    resources.push({ id: `course-${course.id}`, title: course.title, kind: 'course', href: continuation.href, detail: current ? `${completed} / ${valid.size} lessons · ${continuation.complete ? 'Completed' : 'In progress'}` : 'New edition available · review course', updatedAt: record.updatedAt, status: current ? continuation.complete ? 'completed' : 'in_progress' : 'edition_changed' });
  }
  for (const [slug, review] of Object.entries(progress.documentReviews)) {
    const country = countries.find(c => c.slug === slug);
    if (country) resources.push({ id: `documents-${slug}`, title: `${country.name} preparation`, kind: 'documents', href: `/countries/${slug}#documents-to-verify`, detail: `${review.completedItemIds.length} / ${review.totalItems} checklist items`, updatedAt: review.updatedAt, status: review.totalItems > 0 && review.completedItemIds.length >= review.totalItems ? 'completed' : 'in_progress' });
  }
  return resources.sort((a,b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
}
/** Source events only. No synthetic activity is generated from current state. */
export function workspaceHistory(progress: TgpiActivationProgress) {
  return [...new Map(progress.activities.filter(a => a.href.startsWith('/') && !a.href.startsWith('//') && Number.isFinite(Date.parse(a.occurredAt))).map(a => [a.id, a])).values()].sort((a,b) => b.occurredAt.localeCompare(a.occurredAt));
}
