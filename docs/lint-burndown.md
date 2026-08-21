# Lint burn-down plan

Tracks progress on driving `@typescript-eslint/no-explicit-any` (and the wider
lint warning count) to zero, directory by directory, instead of leaving the
whole category as a single undifferentiated pile. See [#563](https://github.com/Bonizozo/stellar-tipjar-frontend/issues/563).

## Why this order

`any` disables the type checker exactly where a bad shape is most likely to
slip through silently. The directories that move real request/response and
persisted-state data — `src/services/` and `src/store/` — carry the highest
risk per occurrence, so they are burned down and locked first. Presentational
code, then tests/stories, follow: a wrong prop type is far more likely to be
caught by a code reviewer or a snapshot than a wrong shape flowing through an
API client.

## Priority order

1. **`src/services/`, `src/store/`** — core request/response handling and
   persisted app state. **Enforced as `error`** via a scoped override in
   [`eslint.config.mjs`](../eslint.config.mjs) (test files excluded for now).
2. `src/hooks/`, `src/lib/`, `src/utils/`, `src/schemas/`, `src/i18n*` —
   shared logic consumed by many components.
3. `src/app/`, `src/components/` — presentational/UI code.
4. `src/**/__tests__/**`, `**/*.test.ts(x)`, `src/stories/` — lowest risk;
   cleaned up last.

## Status

Counts are occurrences of `@typescript-eslint/no-explicit-any` reported by
`npm run lint`.

| Phase | Scope | Status | Remaining `any` |
| --- | --- | --- | --- |
| 1 | `src/services/`, `src/store/` (non-test) | ✅ Done — enforced as `error` | 0 |
| 2 | `src/hooks/`, `src/lib/`, `src/utils/`, `src/schemas/`, `src/i18n*` | Not started | 25 |
| 3 | `src/app/`, `src/components/` | Not started | 74 |
| 4 | Tests, `src/stories/` (incl. `src/services/`/`src/store/` test files) | Not started | 27 |

Re-run `npm run lint` and update this table's counts whenever a phase is
worked on. When a phase's count reaches 0, flip its scope to `"error"` in
`eslint.config.mjs` (following the pattern of the phase 1 override) so it
stays regression-free going forward.
