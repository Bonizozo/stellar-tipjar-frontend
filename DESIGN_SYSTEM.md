# Design System

## Spacing Scale

All spacing is based on a 4px base unit for consistency and scalability.

### Spacing Tokens

- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `3` = 0.75rem (12px)
- `4` = 1rem (16px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)
- `24` = 6rem (96px)

## Container Max-Widths

Responsive container padding and max-widths for different breakpoints:

- **Default**: 1rem padding
- **sm (640px)**: 2rem padding
- **lg (1024px)**: 4rem padding
- **xl (1280px)**: 5rem padding
- **Max-width**: 80rem (1280px)

## Grid System

### 12-Column Grid

Use the `.grid-12` utility class for a 12-column responsive grid:

```tsx
<div className="grid-12">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">Item</div>
</div>
```

### Auto-Fit Grid

Use the `.grid-auto` utility class for auto-fitting columns:

```tsx
<div className="grid-auto">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Section Spacing

### Section Spacing Pattern

Use `.section-spacing` for consistent vertical and horizontal spacing between major sections:

- Mobile: `py-12 px-4` (48px vertical, 16px horizontal)
- Tablet: `md:py-16 md:px-6` (64px vertical, 24px horizontal)
- Desktop: `lg:py-20 lg:px-8` (80px vertical, 32px horizontal)

### Component Spacing

Use `.component-spacing` for internal component padding:

- Mobile: `p-4` (16px)
- Tablet: `md:p-6` (24px)
- Desktop: `lg:p-8` (32px)

## Layout Composition Patterns

### Main Layout Container

Use `.layout-container` to center and constrain content:

```tsx
<div className="layout-container">
  {/* Content */}
</div>
```

### Responsive Spacing Guidelines

- **Margins**: Use multiples of 4px (1, 2, 3, 4, 6, 8, 12, 16, 24)
- **Padding**: Use multiples of 4px for consistency
- **Gaps**: Use consistent gap values in grids and flexbox layouts
- **Breakpoints**: Follow Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

## Best Practices

1. Always use spacing tokens from the scale
2. Maintain consistent spacing between related elements
3. Use responsive spacing utilities for mobile-first design
4. Avoid hardcoded pixel values; use Tailwind classes
5. Test layouts at all breakpoints
