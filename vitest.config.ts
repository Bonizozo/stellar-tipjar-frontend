import { defineConfig, configDefaults } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Exclude Playwright E2E specs — they share the *.spec.ts naming convention
    // but are only meant to run under `playwright test` (see `test:e2e` in
    // package.json). Without this exclusion vitest picks up all 8 files under
    // tests/e2e/ and fails them immediately because it has no `page` fixture.
    exclude: ['tests/e2e/**', ...configDefaults.exclude],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'coverage/',
      ],
    },
    server: {
      deps: {
        inline: ['next-intl'],
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'next/server': resolve(__dirname, './node_modules/next/server.js'),
    },
  },
})
