import { learningStatusLabels } from './learning/unified-progress.ts';
import type { LearningSummary } from './learning/unified-progress.ts';
import type { WorkspaceResource } from './workspace-control.ts';

/** The unified learning service owns continuation links and current-edition status. */
export function reconcileWorkspaceLearning(resources: readonly WorkspaceResource[], learning: LearningSummary): WorkspaceResource[] {
  const byId = new Map(resources.filter(resource => resource.kind !== 'course' || learning.unavailable.includes('legacy')).map(resource => [resource.id, resource]));
  for (const item of learning.items) {
    byId.set(`course-${item.courseId}`, {
      id: `course-${item.courseId}`, title: item.title, kind: 'course', href: item.href, updatedAt: item.updatedAt,
      status: item.status === 'completed' ? 'completed' : item.status === 'edition_changed' ? 'edition_changed' : 'in_progress',
      statusLabel: learningStatusLabels[item.status],
      detail: item.status === 'edition_changed' ? 'New edition available · review course' : item.kind === 'professional' ? `${item.completed} / ${item.total} practice records` : `${item.completed} / ${item.total} lessons · ${item.status === 'completed' ? 'Completed' : 'In progress'}`,
    });
  }
  return [...byId.values()].sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
}

export function workspaceSearchText(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();
}

export function matchesWorkspaceSearch(value: string, query: string): boolean {
  const haystack = workspaceSearchText(value);
  return workspaceSearchText(query).split(/\s+/).every(word => haystack.includes(word));
}

/** Do not turn missing learning sources into a claim of zero or completed progress. */
export function workspaceLearningProgress(learning: LearningSummary): number | null {
  if (learning.unavailable.length) return null;
  const current = learning.items.filter(item => item.status !== 'edition_changed');
  const total = current.reduce((sum, item) => sum + Math.max(0, item.total), 0);
  if (!total) return 0;
  return Math.round(current.reduce((sum, item) => sum + Math.max(0, Math.min(item.completed, item.total)), 0) / total * 100);
}
