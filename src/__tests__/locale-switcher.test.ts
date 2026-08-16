import { describe, expect, it } from 'vitest';
import { getLocalizedPath } from '@/components/LocaleSwitcher';

describe('getLocalizedPath', () => {
  it('keeps the current non-root route when adding a locale prefix', () => {
    expect(getLocalizedPath('/creator/alice', 'es')).toBe('/es/creator/alice');
  });

  it('keeps the current non-root route when replacing an existing locale prefix', () => {
    expect(getLocalizedPath('/fr/creator/alice', 'ar')).toBe('/ar/creator/alice');
  });

  it('returns the unprefixed equivalent route when switching back to English', () => {
    expect(getLocalizedPath('/es/creator/alice', 'en')).toBe('/creator/alice');
  });

  it('preserves query strings and hash fragments on the equivalent localized route', () => {
    expect(getLocalizedPath('/creator/alice', 'zh', 'tab=tips', '#supporters')).toBe(
      '/zh/creator/alice?tab=tips#supporters',
    );
  });
});
