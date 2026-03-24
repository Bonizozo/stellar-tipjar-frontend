# Styling Conventions

## Stack

- Tailwind CSS (`tailwind.config.ts`)
- Global CSS in `src/styles/globals.css`

## Theme Tokens

Tailwind custom colors:

- `canvas`
- `ink`
- `sunrise`
- `wave`
- `moss`
- `error`
- `success`

Global CSS variables:

- `--background`
- `--surface`
- `--foreground`
- `--muted`
- `--accent`
- `--accent-alt`

## Styling Principles

- Prefer utility classes over custom CSS for one-off layout/spacing.
- Use shared tokens/colors, avoid ad-hoc hex values in new components.
- Keep component class lists readable (group spacing, layout, typography).
- Use semantic HTML and visible focus states by default.

## Layout Patterns

- App shell max width: `max-w-6xl`
- Rounded cards: `rounded-2xl` / `rounded-3xl`
- Surface style: `bg-[color:var(--surface)]`
- Card shadow token: `shadow-card`

## Accessibility and Visual Quality

- Ensure interactive elements have `focus-visible` styles.
- Keep contrast acceptable for text over surface backgrounds.
- Preserve hover/active/disabled states for all controls.

## Example Pattern

```tsx
<button className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2">
  Action
</button>
```

## When to Add CSS

Add to `globals.css` only when:

- a style is reused across many pages/components
- utilities become noisy for complex decorative effects (example: `.soft-grid`)
- browser-specific normalization is needed
