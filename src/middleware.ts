import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'fr', 'zh', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(en|es|fr|zh|ar)/:path*']
};
}

export const config = {
  // Apply to all routes except Next.js internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/).*)"],
};
