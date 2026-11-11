export const displayStorageKey = 'tgpi.display.v1';
export const displayEvent = 'tgpi-display-change';
export type DisplayPreferences = { reducedMotion: boolean; largerText: boolean; strongerFocus: boolean };
export const defaultDisplayPreferences: DisplayPreferences = { reducedMotion: false, largerText: false, strongerFocus: false };
export function normalizeDisplayPreferences(value: unknown): DisplayPreferences {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return { reducedMotion: input.reducedMotion === true, largerText: input.largerText === true, strongerFocus: input.strongerFocus === true };
}
export function readDisplayPreferences(): DisplayPreferences {
  try { return normalizeDisplayPreferences(JSON.parse(localStorage.getItem(displayStorageKey) || '{}')); }
  catch { return { ...defaultDisplayPreferences }; }
}
