export const appearanceModes = ['light', 'dark', 'system'] as const;
export type AppearanceMode = (typeof appearanceModes)[number];
export type ColorScheme = Exclude<AppearanceMode, 'system'>;

export const appearanceStorageKey = 'tgpi.appearance.v1';
export const colorSchemeQuery = '(prefers-color-scheme: dark)';
export const themeColors = { light: '#f7f3ea', dark: '#080f1c' } as const;

export function normalizeAppearance(value: unknown): AppearanceMode {
  return value === 'light' || value === 'dark' ? value : 'system';
}

export function resolveAppearance(mode: AppearanceMode, prefersDark: boolean): ColorScheme {
  return mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
}

// Runs from the initial HTML before the body is painted.
export const appearanceBootstrap = `(() => {
  let mode = 'system';
  try {
    const saved = localStorage.getItem(${JSON.stringify(appearanceStorageKey)});
    if (saved === 'light' || saved === 'dark') mode = saved;
  } catch {}
  const scheme = mode === 'system'
    ? (matchMedia(${JSON.stringify(colorSchemeQuery)}).matches ? 'dark' : 'light')
    : mode;
  document.documentElement.dataset.tgpiTheme = scheme;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.content = ${JSON.stringify(themeColors)}[scheme];
  }
})();`;
