import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { appearanceBootstrap, normalizeAppearance, resolveAppearance, themeColors } from '../src/lib/appearance.ts';
import { resolveSettingsSection, settingsHref } from '../src/lib/settings-navigation.ts';

test('the appearance settings deep link survives reload and returns from a Clerk subroute', () => {
  assert.equal(resolveSettingsSection('/profile/security', '#settings-appearance'), 'appearance');
  assert.equal(settingsHref('appearance', '/profile/security/security'), '/profile/security#settings-appearance');
});

test('the pre-paint script and hydrated theme agree for saved, invalid and inaccessible preferences', () => {
  for (const saved of ['light', 'dark', 'system', 'invalid', null, undefined]) {
    for (const prefersDark of [true, false]) {
      const root = { dataset: {} };
      const meta = { content: '' };
      runInNewContext(appearanceBootstrap, {
        localStorage: { getItem() { if (saved === undefined) throw Error('Storage unavailable'); return saved; } },
        matchMedia: () => ({ matches: prefersDark }),
        document: { documentElement: root, querySelectorAll: () => [meta] },
      });
      const expected = resolveAppearance(normalizeAppearance(saved), prefersDark);
      assert.equal(root.dataset.tgpiTheme, expected);
      assert.equal(meta.content, themeColors[expected]);
    }
  }
});
