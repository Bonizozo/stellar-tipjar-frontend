# Contributing Guide

Welcome to the Stellar Tip Jar Frontend project! We're excited to have you contribute. This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm or pnpm
- Git

### Setup

1. **Fork the repository**
   ```bash
   # Visit https://github.com/Bonizozo/stellar-tipjar-frontend and click "Fork"
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/stellar-tipjar-frontend.git
   cd stellar-tipjar-frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make your changes**
   ```bash
   # Edit files as needed
   ```

6. **Run tests**
   ```bash
   npm run test
   npm run test:e2e
   ```

7. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature"
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request**
   - Visit your fork on GitHub
   - Click "New Pull Request"
   - Fill in the PR template
   - Submit!

## Code Style

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types; use proper typing
- Export types from component files

### ESLint & Prettier

```bash
# Run linting
npm run lint

# Type checking
npm run typecheck
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useUserData.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding or updating tests
- `chore`: Changes to build process, dependencies, etc.

### Examples

```bash
git commit -m "feat(auth): add two-factor authentication"
git commit -m "fix(wallet): resolve connection timeout issue"
git commit -m "docs: update API integration guide"
```

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
npm run test:e2e:ui  # Interactive mode
```

### Coverage

```bash
npm run test -- --coverage
```

---

## Accessibility (a11y) Testing

This project uses [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) for automated accessibility enforcement. The a11y suite is part of `npm run test:e2e` and **must stay green on every PR**.

### Running the a11y suite

```bash
# Run all E2E tests (includes a11y suite)
npm run test:e2e

# Run only the a11y specs
npx playwright test tests/e2e/a11y.spec.ts tests/e2e/a11y-keyboard.spec.ts

# Interactive UI mode
npm run test:e2e:ui
```

### What is tested

| File | What it covers |
|------|----------------|
| `tests/e2e/a11y.spec.ts` | Axe scans of all 7 required routes in **both light and dark themes**: home, explore, creator profile, tips (including open-modal state), dashboard, settings, search |
| `tests/e2e/a11y-keyboard.spec.ts` | Keyboard-only journey: connect wallet → pick creator → send tip. All interactions use `keyboard.press()` — no mouse events. |

### Gate: zero serious/critical violations

The gate is `serious` and `critical` impact per [axe-core impact levels](https://www.deque.com/axe/core-documentation/api-documentation/#axe-core-tags). `minor` and `moderate` issues are reported but do not fail the build.

### Excluding a known-unfixable rule

If a third-party library introduces a violation you cannot fix, you may exclude the rule **only** with an inline justification in `tests/helpers/a11y.ts`:

```ts
const EXCLUDED_RULES: { id: string; reason: string }[] = [
  {
    id: 'color-contrast',
    reason: 'Third-party <Widget> uses vendor-locked colors. Tracked in #999.',
  },
];
```

Exclusions without a `reason` string will fail the TypeScript build.

### Helper API (`tests/helpers/a11y.ts`)

```ts
// Run axe and return violations at or above minImpact
runAxe(page, minImpact?, include?)

// Assert zero serious/critical violations (throws with full report on failure)
expectNoViolations(page, contextLabel?, include?)

// Force light or dark theme via classList + localStorage
forceTheme(page, 'light' | 'dark')

// Navigate and wait for networkidle before scanning
gotoAndSettle(page, '/en/explore')
```

### Accessibility primitives available in the codebase

| Hook / Component | Purpose |
|-----------------|---------|
| `useFocusTrap(active)` | Traps Tab focus inside a container while `active === true`. Used in `<Modal>`, `<MobileMenu>`, `<EmojiPicker>`. |
| `useAnnouncer()` | Returns an `announce(message, 'polite' \| 'assertive')` function that posts to a visually-hidden live region. |
| `useArrowKeyNavigation(items)` | Handles ↑↓←→ roving tabindex for custom list/grid widgets. |
| `<SkipToContent>` | Skip-to-main-content link rendered at the top of every page in the locale layout. |
| `<VisuallyHidden>` | Renders children in a screen-reader-only span (wraps `.sr-only`). |

### Keeping the gate green

1. **New interactive components** — wire `useFocusTrap` for any new modal/drawer/popover.
2. **New icon-only buttons** — always add `aria-label` describing the action.
3. **New route pages** — include a single `<h1>` with a unique `id`, and wrap the page body in `<section aria-labelledby="...">` matching that id.
4. **Color choices** — verify contrast with the [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/). WCAG AA requires 4.5:1 for normal text, 3:1 for large text and UI components.
5. **Custom widgets** (carousels, date pickers, comboboxes) — add `useArrowKeyNavigation` and ensure keyboard operability before merging.

### Before/after fix example

**Before** (color-contrast failure):  
`--muted: #7c3aed` on `--background: #f5f3ff` → contrast ratio ~4.2:1 (FAILS AA)

**After** (fixed in `src/styles/globals.css`):  
`--muted: #5b21b6` on `--background: #f5f3ff` → contrast ratio ~8.6:1 (PASSES AAA)

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Keep commits clean** and descriptive
5. **Link related issues** in PR description
6. **Request review** from maintainers

## Code Review Guidelines

When reviewing code:

- Check for TypeScript compliance
- Verify tests are included
- Ensure documentation is updated
- Look for performance issues
- Check accessibility (a11y)
- Verify security best practices

## Project Structure

```
src/
├── app/              # Next.js App Router routes
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and libraries
├── services/        # API service layer
├── contexts/        # React contexts
├── types/           # TypeScript type definitions
├── utils/           # Helper functions
└── styles/          # Global styles
```

## Common Tasks

### Adding a New Component

1. Create file in `src/components/`
2. Use TypeScript with proper types
3. Add JSDoc comments
4. Export from component index if needed
5. Add tests in `__tests__/` folder

### Adding a New Hook

1. Create file in `src/hooks/`
2. Prefix with `use`
3. Add TypeScript types
4. Document with JSDoc
5. Add tests if complex logic

### Adding a New API Endpoint

1. Add method to `src/services/api.ts`
2. Use proper error handling
3. Add TypeScript types
4. Document with JSDoc
5. Add tests

## Troubleshooting

### Build Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Type Errors

```bash
npm run typecheck
```

### Linting Issues

```bash
npm run lint -- --fix
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Questions?

- Check existing issues and discussions
- Ask in pull request comments
- Open a new discussion

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🚀
