export type MemberIdentity = { handle: string; number: string; changedAt: string };
export const HANDLE_CHANGE_INTERVAL = 30 * 24 * 60 * 60 * 1000;
const reserved = new Set(['admin', 'administrator', 'support', 'suporte', 'tgpi', 'security', 'billing', 'official', 'system', 'help', 'moderator', 'root', 'api', 'www', 'theglobalpolymath']);
export function normalizeHandle(value: unknown) {
  return typeof value === 'string' ? value.trim().replace(/^@/, '').toLowerCase() : '';
}
export function handleError(value: string) {
  if (!/^[a-z][a-z0-9_]{2,29}$/.test(value)) return 'Use 3–30 ASCII characters, starting with a letter; letters, numbers and underscores only.';
  if (reserved.has(value) || /^(tgpi_|admin_|support_)/.test(value)) return 'This ID is reserved for TGPI.';
  return '';
}
export function memberLookup(value: string): { kind: 'handles' | 'numbers'; key: string } | null {
  const input = value.trim();
  if (/^TGPI-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/i.test(input)) return { kind: 'numbers', key: input.toUpperCase() };
  const handle = normalizeHandle(input);
  return handleError(handle) ? null : { kind: 'handles', key: handle };
}
export function memberPath(number: string) { return `/member/${encodeURIComponent(number)}`; }
