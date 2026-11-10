import { createProgressItemId, type ActivationStatus, type DocumentReviewProgress } from './activation-progress.ts';

// Keep the existing source titles and order. They are part of the persisted checkpoint IDs.
export const documentReviewItems = [
  { title: 'Evidence v1 — nationality and route', text: "Use the destination government's or consulate's official service to establish the correct route for your nationality, purpose and duration." },
  { title: 'Evidence v1 — institution or profession', text: 'Confirm accreditation, admission or professional licensing with the responsible institution or regulator. Do not infer eligibility from country statistics.' },
  { title: 'Evidence v1 — current requirements', text: 'Record the official source URL, its effective date and the date you reviewed it. Confirm required documents and fees directly before applying.' },
  { title: 'Evidence v1 — independent confirmation', text: 'Resolve ambiguous or conflicting requirements with the competent authority or a qualified professional. A checked box records your research, not legal approval.' },
].map((item, index) => ({ ...item, id: createProgressItemId(item.title, index) }));

export function summarizeDocumentReview(review?: DocumentReviewProgress) {
  const completedIds = new Set(review?.completedItemIds);
  const totalItems = documentReviewItems.length;
  const completedItems = documentReviewItems.filter(item => completedIds.has(item.id)).length;
  const status: ActivationStatus = completedItems === totalItems ? 'completed' : completedItems ? 'in_progress' : 'not_started';
  return {
    completedItems,
    totalItems,
    status,
    percentage: Math.round(completedItems / totalItems * 100),
    hasLegacyItems: completedIds.size > completedItems || Boolean(review?.legacyCompletedItemIds?.length),
  };
}

export function updateDocumentReview(previous: DocumentReviewProgress | undefined, itemId: string, complete: boolean, updatedAt: string): DocumentReviewProgress {
  const previousIds = new Set(previous?.completedItemIds);
  const legacyCompletedItemIds = [...new Set([
    ...(previous?.legacyCompletedItemIds ?? []),
    ...[...previousIds].filter(id => !documentReviewItems.some(item => item.id === id)),
  ])].slice(0, 12);
  if (complete) previousIds.add(itemId);
  else previousIds.delete(itemId);
  return {
    completedItemIds: documentReviewItems.filter(item => previousIds.has(item.id)).map(item => item.id),
    totalItems: documentReviewItems.length,
    updatedAt,
    ...(legacyCompletedItemIds.length ? { legacyCompletedItemIds } : {}),
  };
}
