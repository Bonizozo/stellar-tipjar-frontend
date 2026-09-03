import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { routing } from '@/i18n/routing';

const messagesDir = resolve(process.cwd(), 'messages');

describe('i18n configuration — single source of truth', () => {
  it('has a non-empty, unique locale list that includes the default locale', () => {
    const { locales, defaultLocale } = routing;

    expect(locales.length).toBeGreaterThan(0);
    expect(new Set(locales).size).toBe(locales.length);
    expect(locales).toContain(defaultLocale);
  });

  it('provides a message file for every routing locale', () => {
    for (const locale of routing.locales) {
      expect(existsSync(resolve(messagesDir, `${locale}.json`)), `missing messages/${locale}.json`).toBe(true);
    }
  });

  it('contains no message files for locales outside the routing config', () => {
    const messageLocales = readdirSync(messagesDir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => basename(file, '.json'));

    for (const locale of messageLocales) {
      expect(routing.locales, `orphaned messages/${locale}.json without a routing entry`).toContain(locale);
    }
  });
});