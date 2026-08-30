import { describe, it, expect } from 'vitest';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing, isRTL, getDirection } from '@/i18n/routing';

/**
 * Matcher patterns from src/middleware.ts — kept in sync manually.
 * These mirror the `config.matcher` export so that changes to one
 * must be reflected in the other.
 */
const MATCHER = [
  '/',
  '/(en|es|fr|zh|ar)/:path*',
  '/((?!api|_next|_vercel|.*\\..*).*)',
];

/**
 * Replicate how Next.js evaluates middleware matcher entries (logical OR).
 */
function matchesMatcher(pathname: string): boolean {
  return MATCHER.some((pattern) => {
    if (pattern === '/') {
      return pathname === '/';
    }
    if (pattern === '/(en|es|fr|zh|ar)/:path*') {
      return /^\/(en|es|fr|zh|ar)(\/.*)?$/.test(pathname);
    }
    if (pattern === '/((?!api|_next|_vercel|.*\\..*).*)') {
      return /^\/((?!api|_next|_vercel|.*\..*).*)$/.test(pathname);
    }
    return false;
  });
}

describe('middleware matcher', () => {
  describe('root', () => {
    it('matches /', () => {
      expect(matchesMatcher('/')).toBe(true);
    });
  });

  describe('locale-prefixed routes', () => {
    const testLocales = ['en', 'es', 'fr', 'zh', 'ar'] as const;

    it.each(testLocales)('matches /%s', (locale) => {
      expect(matchesMatcher(`/${locale}`)).toBe(true);
    });

    it.each(testLocales)('matches /%s/explore', (locale) => {
      expect(matchesMatcher(`/${locale}/explore`)).toBe(true);
    });

    it.each(testLocales)('matches /%s/creator/alice', (locale) => {
      expect(matchesMatcher(`/${locale}/creator/alice`)).toBe(true);
    });

    it.each(testLocales)('matches /%s/dashboard/marketplace', (locale) => {
      expect(matchesMatcher(`/${locale}/dashboard/marketplace`)).toBe(true);
    });
  });

  describe('un-prefixed page routes', () => {
    it('matches /explore', () => {
      expect(matchesMatcher('/explore')).toBe(true);
    });

    it('matches /creator/alice', () => {
      expect(matchesMatcher('/creator/alice')).toBe(true);
    });

    it('matches /creator/some-other-user', () => {
      expect(matchesMatcher('/creator/some-other-user')).toBe(true);
    });

    it('matches /marketplace', () => {
      expect(matchesMatcher('/marketplace')).toBe(true);
    });

    it('matches /dashboard/marketplace', () => {
      expect(matchesMatcher('/dashboard/marketplace')).toBe(true);
    });

    it('matches /tips', () => {
      expect(matchesMatcher('/tips')).toBe(true);
    });

    it('matches /settings/notifications', () => {
      expect(matchesMatcher('/settings/notifications')).toBe(true);
    });

    it('matches /discover/category-name', () => {
      expect(matchesMatcher('/discover/category-name')).toBe(true);
    });

    it('matches /mentorship/chat/some-id', () => {
      expect(matchesMatcher('/mentorship/chat/some-id')).toBe(true);
    });

    it('matches /certification/courses/123', () => {
      expect(matchesMatcher('/certification/courses/123')).toBe(true);
    });

    it('matches /store/username', () => {
      expect(matchesMatcher('/store/username')).toBe(true);
    });

    it('matches /team/teamname', () => {
      expect(matchesMatcher('/team/teamname')).toBe(true);
    });
  });

  describe('API routes are excluded', () => {
    it('does not match /api/foo', () => {
      expect(matchesMatcher('/api/foo')).toBe(false);
    });

    it('does not match /api/marketplace/orders', () => {
      expect(matchesMatcher('/api/marketplace/orders')).toBe(false);
    });

    it('does not match /api/marketplace/orders/123', () => {
      expect(matchesMatcher('/api/marketplace/orders/123')).toBe(false);
    });

    it('does not match /api/tips/schedule', () => {
      expect(matchesMatcher('/api/tips/schedule')).toBe(false);
    });

    it('does not match /api/tips/abc/comments', () => {
      expect(matchesMatcher('/api/tips/abc/comments')).toBe(false);
    });

    it('does not match /api/notifications/preferences', () => {
      expect(matchesMatcher('/api/notifications/preferences')).toBe(false);
    });

    it('does not match /api/moderation', () => {
      expect(matchesMatcher('/api/moderation')).toBe(false);
    });

    it('does not match /api/creators/discover', () => {
      expect(matchesMatcher('/api/creators/discover')).toBe(false);
    });
  });

  describe('internal Next.js paths are excluded', () => {
    it('does not match /_next/static/chunks/main.js', () => {
      expect(matchesMatcher('/_next/static/chunks/main.js')).toBe(false);
    });

    it('does not match /_next/data/build-id/page.json', () => {
      expect(matchesMatcher('/_next/data/build-id/page.json')).toBe(false);
    });

    it('does not match /_next/webpack-hmr', () => {
      expect(matchesMatcher('/_next/webpack-hmr')).toBe(false);
    });
  });

  describe('static assets are excluded', () => {
    it('does not match /favicon.ico', () => {
      expect(matchesMatcher('/favicon.ico')).toBe(false);
    });

    it('does not match /image.png', () => {
      expect(matchesMatcher('/image.png')).toBe(false);
    });

    it('does not match /logo.svg', () => {
      expect(matchesMatcher('/logo.svg')).toBe(false);
    });

    it('does not match /photo.jpg', () => {
      expect(matchesMatcher('/photo.jpg')).toBe(false);
    });

    it('does not match /banner.webp', () => {
      expect(matchesMatcher('/banner.webp')).toBe(false);
    });

    it('does not match /robots.txt', () => {
      expect(matchesMatcher('/robots.txt')).toBe(false);
    });

    it('does not match /sitemap.xml', () => {
      expect(matchesMatcher('/sitemap.xml')).toBe(false);
    });

    it('does not match /manifest.json', () => {
      expect(matchesMatcher('/manifest.json')).toBe(false);
    });
  });

  describe('Vercel internal paths are excluded', () => {
    it('does not match /_vercel/insights/view', () => {
      expect(matchesMatcher('/_vercel/insights/view')).toBe(false);
    });

    it('does not match /_vercel/speed-insights/view', () => {
      expect(matchesMatcher('/_vercel/speed-insights/view')).toBe(false);
    });
  });
});

describe('next-intl locale routing & direction', () => {
  const middleware = createMiddleware(routing);

  describe('RTL / LTR direction', () => {
    it('identifies Arabic (ar) as RTL', () => {
      expect(isRTL('ar')).toBe(true);
      expect(getDirection('ar')).toBe('rtl');
    });

    it('identifies Latin/CJK locales as LTR', () => {
      expect(isRTL('en')).toBe(false);
      expect(getDirection('en')).toBe('ltr');

      expect(isRTL('es')).toBe(false);
      expect(getDirection('es')).toBe('ltr');

      expect(isRTL('fr')).toBe(false);
      expect(getDirection('fr')).toBe('ltr');

      expect(isRTL('zh')).toBe(false);
      expect(getDirection('zh')).toBe('ltr');
    });
  });

  describe('Canonical URL redirect & localePrefix: "as-needed"', () => {
    it('redirects default locale prefixed URL /en to un-prefixed root /', () => {
      const req = new NextRequest('http://localhost:3000/en');
      const res = middleware(req);

      expect(res.status).toBe(307);
      expect(res.headers.get('location')).toBe('http://localhost:3000/');
    });

    it('redirects default locale prefixed URL /en/explore to un-prefixed /explore', () => {
      const req = new NextRequest('http://localhost:3000/en/explore');
      const res = middleware(req);

      expect(res.status).toBe(307);
      expect(res.headers.get('location')).toBe('http://localhost:3000/explore');
    });

    it('serves un-prefixed default locale URL / without redirecting', () => {
      const req = new NextRequest('http://localhost:3000/');
      const res = middleware(req);

      expect(res.status).toBe(200);
      expect(res.headers.get('location')).toBeNull();
    });

    it('serves non-default locale prefixed URLs with canonical alternate link headers', () => {
      const req = new NextRequest('http://localhost:3000/es/explore');
      const res = middleware(req);

      expect(res.status).toBe(200);
      const linkHeader = res.headers.get('link');
      expect(linkHeader).toBeDefined();
      expect(linkHeader).toContain('hreflang="en"');
      expect(linkHeader).toContain('hreflang="es"');
      expect(linkHeader).toContain('hreflang="ar"');
      expect(linkHeader).toContain('hreflang="x-default"');
    });
  });
});
