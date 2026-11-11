export const settingsKeys = ['overview', 'identity', 'global', 'public-profile', 'global-key', 'billing', 'preferences', 'notifications', 'privacy', 'security', 'accessibility', 'data', 'diagnostics', 'progress'] as const;
export type SettingsSection = typeof settingsKeys[number];

export function resolveSettingsSection(pathname: string, hash: string): SettingsSection {
  const section = hash.replace(/^#settings-/, '');
  if (settingsKeys.includes(section as SettingsSection)) return section as SettingsSection;
  return pathname.replace(/\/+$/, '') === '/profile/security' ? 'overview' : 'security';
}

export function settingsHref(section: SettingsSection, pathname = '/profile/security') {
  // Clerk owns its nested routes. Other sections always return to the canonical page.
  const path = section === 'security' && pathname.startsWith('/profile/security/') ? pathname : '/profile/security';
  return `${path}#settings-${section}`;
}

export function normalizeSettingsSearch(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}
