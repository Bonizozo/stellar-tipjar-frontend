# Requirements Document

## Introduction

This feature adds a Skeleton shimmer loading component suite to the open-source React component library. The suite replaces ad-hoc `animate-pulse` placeholders with a cohesive set of layout-accurate skeleton variants — card, list, profile, and table — each animated with a directional shimmer sweep. Skeletons match the real content's dimensions, support configurable animation speed, respect the user's reduced-motion preference, announce loading state to screen readers, and transition smoothly to real content via a fade-in. Styling follows the project's existing Tailwind CSS v4 + CSS custom-property conventions.

## Glossary

- **Skeleton**: The top-level React component that renders a single placeholder block with a shimmer animation.
- **SkeletonCard**: A pre-composed variant that mirrors the layout of a `SectionCard` — a square image placeholder, a title line, and two body lines.
- **SkeletonList**: A pre-composed variant that renders a configurable number of list-row placeholders, each with a leading avatar circle and two text lines.
- **SkeletonProfile**: A pre-composed variant that mirrors a creator profile header — a large avatar circle, a name line, a handle line, and a short bio block.
- **SkeletonTable**: A pre-composed variant that renders a header row and a configurable number of data rows, each with column-width placeholders matching a typical data table.
- **ShimmerEffect**: The CSS animation — a diagonal highlight sweep from left to right — applied to every Skeleton block.
- **Shimmer_Speed**: The duration of one full ShimmerEffect cycle, expressed in milliseconds. Configurable via the `speed` prop.
- **FadeIn_Transition**: The opacity transition applied to real content when it replaces a Skeleton, implemented using the existing `FadeIn` animation component.
- **Reduced_Motion**: The operating mode when the user's OS preference is `prefers-reduced-motion: reduce`, detected via the existing `useReducedMotion` hook.
- **CSS_Variable**: A CSS custom property defined in `:root` or `.dark` (e.g. `--surface`, `--muted`, `--foreground`) used for design-system colours.
- **Dark_Mode**: The operating mode when the `.dark` class is present on the `<html>` element, as managed by the existing `ThemeContext`.

---

## Requirements

### Requirement 1: Shimmer Animation

**User Story:** As a user, I want skeleton placeholders to display a moving shimmer highlight, so that the loading state feels dynamic and premium rather than static.

#### Acceptance Criteria

1. THE Skeleton SHALL apply a ShimmerEffect — a linear-gradient highlight that sweeps from left to right — to every rendered placeholder block.
2. THE ShimmerEffect SHALL animate continuously using a CSS `@keyframes` animation defined in `globals.css`.
3. WHEN `speed` is provided, THE Skeleton SHALL set the animation duration to the `speed` value in milliseconds.
4. WHEN `speed` is not provided, THE Skeleton SHALL default the animation duration to `1500ms`.
5. WHILE Reduced_Motion is active, THE Skeleton SHALL disable the ShimmerEffect animation and render a static placeholder without movement.
6. THE ShimmerEffect gradient SHALL use CSS_Variables (`--surface`, `--muted`) so that the shimmer colours adapt automatically to light and dark themes.

---

### Requirement 2: Skeleton Base Component

**User Story:** As a developer, I want a primitive Skeleton block component, so that I can compose custom skeleton layouts for any content shape.

#### Acceptance Criteria

1. THE Skeleton SHALL accept `width` and `height` props of type `string | number` and apply them as inline styles.
2. WHEN `width` is not provided, THE Skeleton SHALL default to `width: "100%"`.
3. WHEN `height` is not provided, THE Skeleton SHALL default to `height: "1rem"`.
4. THE Skeleton SHALL accept a `rounded` prop of type `'none' | 'sm' | 'md' | 'lg' | 'full'` and apply the corresponding Tailwind border-radius class.
5. WHEN `rounded` is not provided, THE Skeleton SHALL default to `'md'`.
6. THE Skeleton SHALL accept a `className` prop and apply it to the root element.
7. THE Skeleton SHALL use `bg-[color:var(--muted)]/20` as its base background colour so that it is visible in both light and Dark_Mode.

---

### Requirement 3: SkeletonCard Variant

**User Story:** As a developer, I want a pre-composed card skeleton that matches the SectionCard layout, so that I can drop it in wherever a SectionCard is loading without manually composing blocks.

#### Acceptance Criteria

1. THE SkeletonCard SHALL render a square image placeholder with `rounded-xl` and dimensions matching the `SectionCard` image area (`h-12 w-12`).
2. THE SkeletonCard SHALL render a title placeholder line at `h-5` width `60%` below the image placeholder.
3. THE SkeletonCard SHALL render two body text placeholder lines at `h-4` width `100%` and `80%` respectively below the title.
4. THE SkeletonCard SHALL wrap all placeholder blocks in a container styled with `rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6` to match the `SectionCard` outer shell.
5. THE SkeletonCard SHALL accept a `className` prop and apply it to the root container.

---

### Requirement 4: SkeletonList Variant

**User Story:** As a developer, I want a pre-composed list skeleton that renders multiple row placeholders, so that I can represent a loading list without manually repeating row markup.

#### Acceptance Criteria

1. THE SkeletonList SHALL accept a `rows` prop of type `number` and render that many list-row placeholders.
2. WHEN `rows` is not provided, THE SkeletonList SHALL default to `3` rows.
3. EACH list-row placeholder SHALL contain a leading avatar circle placeholder with `rounded-full h-10 w-10` and two text line placeholders at `h-4` width `50%` and `h-3` width `35%`.
4. THE SkeletonList SHALL accept a `className` prop and apply it to the root container.
5. THE SkeletonList SHALL space rows with `gap-4` between each row.

---

### Requirement 5: SkeletonProfile Variant

**User Story:** As a developer, I want a pre-composed profile skeleton that mirrors the creator profile header layout, so that the loading state matches the real content structure.

#### Acceptance Criteria

1. THE SkeletonProfile SHALL render a large avatar circle placeholder with `rounded-full h-20 w-20`.
2. THE SkeletonProfile SHALL render a name line placeholder at `h-6` width `40%` below the avatar.
3. THE SkeletonProfile SHALL render a handle line placeholder at `h-4` width `25%` below the name line.
4. THE SkeletonProfile SHALL render a bio block placeholder consisting of three lines at `h-4` width `100%`, `90%`, and `70%` below the handle line.
5. THE SkeletonProfile SHALL accept a `className` prop and apply it to the root container.

---

### Requirement 6: SkeletonTable Variant

**User Story:** As a developer, I want a pre-composed table skeleton that mirrors the TipHistoryTable layout, so that the loading state matches the real table structure.

#### Acceptance Criteria

1. THE SkeletonTable SHALL render a header row containing four column header placeholders at `h-4` with widths `20%`, `30%`, `25%`, and `15%`.
2. THE SkeletonTable SHALL accept a `rows` prop of type `number` and render that many data row placeholders below the header.
3. WHEN `rows` is not provided, THE SkeletonTable SHALL default to `5` data rows.
4. EACH data row SHALL contain four cell placeholders at `h-4` with widths `20%`, `30%`, `25%`, and `15%` matching the header columns.
5. THE SkeletonTable SHALL render a `1px` divider line between the header row and the first data row using `border-b border-ink/10`.
6. THE SkeletonTable SHALL accept a `className` prop and apply it to the root container.

---

### Requirement 7: Content Fade-In Transition

**User Story:** As a user, I want real content to fade in smoothly when it replaces a skeleton, so that the transition feels polished rather than abrupt.

#### Acceptance Criteria

1. THE SkeletonWrapper component SHALL accept an `isLoading` prop of type `boolean`, a `skeleton` prop of type `ReactNode`, and a `children` prop of type `ReactNode`.
2. WHEN `isLoading` is `true`, THE SkeletonWrapper SHALL render the `skeleton` node.
3. WHEN `isLoading` transitions from `true` to `false`, THE SkeletonWrapper SHALL render `children` wrapped in the existing `FadeIn` animation component.
4. WHILE Reduced_Motion is active, THE SkeletonWrapper SHALL render `children` without the `FadeIn` animation when `isLoading` becomes `false`.
5. THE SkeletonWrapper SHALL accept a `className` prop and apply it to the root container.

---

### Requirement 8: Dark Mode Support

**User Story:** As a user in dark mode, I want skeleton placeholders to use appropriate dark-theme colours, so that the loading state is visually consistent with the rest of the dark UI.

#### Acceptance Criteria

1. THE Skeleton SHALL use CSS_Variables for all colours so that no additional dark-mode class overrides are required in component code.
2. THE ShimmerEffect gradient SHALL reference `--surface` for the base colour and `--muted` for the highlight colour, which are already remapped in the `.dark` class in `globals.css`.
3. WHEN Dark_Mode is active, THE Skeleton background SHALL visually contrast against the dark `--background` colour without any additional prop or class.

---

### Requirement 9: Accessible Loading Announcements

**User Story:** As a screen-reader user, I want loading states to be announced, so that I know content is being fetched even when I cannot see the visual skeleton.

#### Acceptance Criteria

1. THE SkeletonWrapper SHALL render a visually hidden `<span>` with `role="status"` and `aria-live="polite"` that contains the text `"Loading…"` while `isLoading` is `true`.
2. WHEN `isLoading` transitions to `false`, THE SkeletonWrapper SHALL update the `aria-live` region text to an empty string so that screen readers do not re-announce stale content.
3. THE Skeleton base component SHALL set `aria-hidden="true"` on its root element so that individual placeholder blocks are not announced by screen readers.
4. WHEN `loadingLabel` is provided to SkeletonWrapper, THE SkeletonWrapper SHALL use that string instead of `"Loading…"` in the `aria-live` region.

---

### Requirement 10: Configurable Animation Speed

**User Story:** As a developer, I want to control the shimmer animation speed, so that I can tune the loading feel to match the expected data-fetch duration.

#### Acceptance Criteria

1. THE Skeleton SHALL accept a `speed` prop of type `number` representing the animation duration in milliseconds.
2. WHEN `speed` is provided, THE Skeleton SHALL apply it as an inline `animationDuration` style on the shimmer element.
3. WHEN `speed` is less than `200`, THE Skeleton SHALL clamp the duration to `200ms` to prevent imperceptibly fast animations.
4. WHEN `speed` is greater than `5000`, THE Skeleton SHALL clamp the duration to `5000ms` to prevent imperceptibly slow animations.
5. THE SkeletonCard, SkeletonList, SkeletonProfile, and SkeletonTable variants SHALL each accept a `speed` prop and forward it to every Skeleton block they render.

---

### Requirement 11: Styling Conventions

**User Story:** As a contributor, I want the Skeleton components to follow the project's existing styling conventions, so that they integrate consistently with the rest of the library.

#### Acceptance Criteria

1. THE Skeleton SHALL use Tailwind CSS utility classes for all static styles.
2. THE Skeleton SHALL use inline `style` props only for dynamic values — specifically `width`, `height`, and `animationDuration`.
3. THE Skeleton SHALL use CSS_Variables (`--surface`, `--muted`, `--foreground`) for all design-system colour references.
4. THE Skeleton SHALL use `"use client"` directive at the top of every component file, consistent with other interactive components in the library.
5. THE Skeleton SHALL use the existing `useReducedMotion` hook to detect the user's motion preference, consistent with `FadeIn`, `Button`, and `SectionCard`.

---

### Requirement 12: Barrel Export and Types

**User Story:** As a library consumer, I want to import all Skeleton components and their TypeScript types from a single entry point, so that my imports stay clean and consistent.

#### Acceptance Criteria

1. THE `src/components/Skeleton/index.ts` file SHALL export `Skeleton`, `SkeletonCard`, `SkeletonList`, `SkeletonProfile`, `SkeletonTable`, and `SkeletonWrapper`.
2. THE `src/components/Skeleton/index.ts` file SHALL export the `SkeletonProps`, `SkeletonCardProps`, `SkeletonListProps`, `SkeletonProfileProps`, `SkeletonTableProps`, and `SkeletonWrapperProps` TypeScript interfaces.

---

### Requirement 13: Test Coverage

**User Story:** As a contributor, I want a comprehensive test suite for the Skeleton components, so that regressions are caught automatically.

#### Acceptance Criteria

1. THE test suite SHALL assert that the Skeleton renders with default `width`, `height`, and `rounded` values when no props are provided.
2. THE test suite SHALL assert that the Skeleton applies the correct `animationDuration` inline style when `speed` is provided.
3. THE test suite SHALL assert that the Skeleton clamps `speed` to `200` when a value below `200` is passed.
4. THE test suite SHALL assert that the Skeleton clamps `speed` to `5000` when a value above `5000` is passed.
5. THE test suite SHALL assert that the Skeleton does not apply the shimmer animation class when Reduced_Motion is active.
6. THE test suite SHALL assert that the SkeletonCard renders the correct number of placeholder blocks.
7. THE test suite SHALL assert that the SkeletonList renders the correct number of row placeholders for a given `rows` prop.
8. THE test suite SHALL assert that the SkeletonTable renders the correct number of data rows for a given `rows` prop.
9. THE test suite SHALL assert that the SkeletonWrapper renders the `skeleton` node when `isLoading` is `true`.
10. THE test suite SHALL assert that the SkeletonWrapper renders `children` when `isLoading` is `false`.
11. THE test suite SHALL assert that the SkeletonWrapper renders an `aria-live="polite"` region containing `"Loading…"` while `isLoading` is `true`.
12. THE test suite SHALL assert that the `aria-live` region text is empty when `isLoading` is `false`.
13. THE test suite SHALL assert that every Skeleton block has `aria-hidden="true"`.
14. FOR ALL `rows` values between `1` and `20`, THE test suite SHALL assert that SkeletonList renders exactly `rows` row elements (metamorphic property).
