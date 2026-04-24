# Requirements Document

## Introduction

This feature adds an AdvancedSearch component suite to the open-source React component library. The suite replaces the existing `SearchBar` component with a richer experience: autocomplete suggestions fetched asynchronously, a persisted recent-searches history, full keyboard navigation, category/filter chips, highlighted match text, loading and empty states, and a mobile-optimised full-screen overlay. All sub-components are implemented from scratch using React, framer-motion, and the project's existing `useDebounce`, `useKeyboardNav`, `useFocusTrap`, and `useReducedMotion` hooks. Styling follows the Tailwind CSS v4 + CSS custom-property conventions already established in the library.

## Glossary

- **AdvancedSearch**: The top-level React component that composes all sub-components and exposes the public API.
- **SearchInput**: The sub-component that renders the text input field, the leading search icon, and the trailing clear button.
- **SuggestionDropdown**: The sub-component that renders the floating panel containing autocomplete suggestions, recent searches, and category filters.
- **SuggestionItem**: A single row inside SuggestionDropdown representing one autocomplete suggestion or recent search entry.
- **CategoryChip**: A toggleable pill inside SuggestionDropdown representing one search category or filter.
- **HighlightMatch**: The inline sub-component that wraps matched substrings in a `<mark>` element to visually highlight them.
- **RecentSearches**: The section inside SuggestionDropdown that lists previously submitted queries stored in `localStorage`.
- **ActiveIndex**: The zero-based index of the currently keyboard-focused SuggestionItem, or `-1` when no item is focused.
- **Query**: The current text value of the SearchInput.
- **Suggestion**: A data object `{ id: string; label: string; category?: string; meta?: string }` returned by the `onFetch` callback.
- **CSS_Variable**: A CSS custom property defined in `:root` or `.dark` (e.g. `--accent`, `--wave`, `--surface`) used for design-system colours.
- **Reduced_Motion**: The operating mode when the user's OS preference is `prefers-reduced-motion: reduce`, detected via `useReducedMotion`.

---

## Requirements

### Requirement 1: Controlled Query Input

**User Story:** As a developer, I want to bind the search input to a controlled value, so that I can manage query state from outside the component.

#### Acceptance Criteria

1. THE AdvancedSearch SHALL accept a `query` prop of type `string` and render it as the SearchInput value.
2. WHEN the user types in the SearchInput, THE AdvancedSearch SHALL call `onQueryChange` with the updated string.
3. WHEN the user activates the clear button, THE AdvancedSearch SHALL call `onQueryChange` with an empty string and SHALL close the SuggestionDropdown.
4. THE SearchInput SHALL display a placeholder string supplied via the `placeholder` prop, defaulting to `"Search…"` when not provided.
5. THE AdvancedSearch SHALL accept a `className` prop and apply it to the root container element.

---

### Requirement 2: Autocomplete Suggestions

**User Story:** As a user, I want to see relevant suggestions as I type, so that I can find what I'm looking for faster.

#### Acceptance Criteria

1. WHEN `query` has at least 1 character and `onFetch` is provided, THE AdvancedSearch SHALL call `onFetch` with the debounced query after a 300 ms delay.
2. WHEN `onFetch` resolves with a non-empty array of Suggestions, THE SuggestionDropdown SHALL render one SuggestionItem per Suggestion.
3. WHEN `onFetch` resolves with an empty array and `query` is non-empty, THE SuggestionDropdown SHALL render the empty state.
4. WHEN `query` is empty, THE SuggestionDropdown SHALL render the RecentSearches section instead of autocomplete Suggestions.
5. THE AdvancedSearch SHALL debounce calls to `onFetch` using the existing `useDebounce` hook with a 300 ms delay.
6. WHEN a new `query` value is set, THE AdvancedSearch SHALL discard any in-flight `onFetch` result that was initiated for a previous query value.

---

### Requirement 3: Recent Searches History

**User Story:** As a user, I want to see my recent searches when I focus the input, so that I can quickly repeat a previous query.

#### Acceptance Criteria

1. WHEN the user submits a query (via `Enter` key or selecting a SuggestionItem), THE AdvancedSearch SHALL prepend the query string to the RecentSearches list stored in `localStorage` under the key `"advancedSearch.recentSearches"`.
2. THE AdvancedSearch SHALL store at most 8 recent search entries; WHEN a new entry would exceed this limit, THE AdvancedSearch SHALL remove the oldest entry.
3. WHEN a query string already exists in the RecentSearches list, THE AdvancedSearch SHALL move it to the front of the list rather than adding a duplicate.
4. WHEN the user activates the delete button on a RecentSearches entry, THE AdvancedSearch SHALL remove that entry from the list and update `localStorage`.
5. WHEN the user activates the "Clear all" control in the RecentSearches section, THE AdvancedSearch SHALL remove all entries from the list and update `localStorage`.
6. THE AdvancedSearch SHALL read the initial RecentSearches list from `localStorage` on mount; IF `localStorage` is unavailable, THEN THE AdvancedSearch SHALL initialise with an empty list.

---

### Requirement 4: Keyboard Navigation

**User Story:** As a keyboard user, I want to navigate suggestions and recent searches using arrow keys, so that I can operate the component without a pointer device.

#### Acceptance Criteria

1. WHEN the `ArrowDown` key is pressed while the SearchInput has focus and the SuggestionDropdown is open, THE AdvancedSearch SHALL move focus to the first SuggestionItem and set ActiveIndex to `0`.
2. WHEN the `ArrowDown` key is pressed while a SuggestionItem has focus and ActiveIndex is not the last index, THE AdvancedSearch SHALL increment ActiveIndex by `1`.
3. WHEN the `ArrowDown` key is pressed while ActiveIndex is the last index, THE AdvancedSearch SHALL wrap ActiveIndex to `0`.
4. WHEN the `ArrowUp` key is pressed while a SuggestionItem has focus and ActiveIndex is not `0`, THE AdvancedSearch SHALL decrement ActiveIndex by `1`.
5. WHEN the `ArrowUp` key is pressed while ActiveIndex is `0`, THE AdvancedSearch SHALL return focus to the SearchInput and set ActiveIndex to `-1`.
6. WHEN the `Enter` key is pressed while a SuggestionItem has focus, THE AdvancedSearch SHALL call `onSearch` with the focused item's label, save it to RecentSearches, and close the SuggestionDropdown.
7. WHEN the `Enter` key is pressed while the SearchInput has focus and `query` is non-empty, THE AdvancedSearch SHALL call `onSearch` with the current `query`, save it to RecentSearches, and close the SuggestionDropdown.
8. WHEN the `Escape` key is pressed while the SuggestionDropdown is open, THE AdvancedSearch SHALL close the SuggestionDropdown and return focus to the SearchInput.
9. THE AdvancedSearch SHALL use the existing `useKeyboardNav` hook to dispatch key events.
10. WHEN any navigation key (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`) is handled, THE AdvancedSearch SHALL call `preventDefault` on the keyboard event to suppress default browser behaviour.

---

### Requirement 5: Category Filters

**User Story:** As a user, I want to filter suggestions by category, so that I can narrow results to a specific type.

#### Acceptance Criteria

1. WHEN `categories` is provided as a non-empty array of `{ value: string; label: string }` objects, THE SuggestionDropdown SHALL render one CategoryChip per entry above the suggestion list.
2. WHEN the user activates a CategoryChip, THE AdvancedSearch SHALL toggle that category's selected state and call `onCategoryChange` with the updated array of selected category values.
3. WHEN a CategoryChip is selected, THE AdvancedSearch SHALL apply the `--wave` CSS_Variable colour to its background and a white foreground.
4. WHEN a CategoryChip is not selected, THE AdvancedSearch SHALL apply the `--surface` CSS_Variable colour to its background and the `--foreground` CSS_Variable colour to its text.
5. WHEN `categories` is not provided or is empty, THE SuggestionDropdown SHALL not render the category filter row.
6. THE AdvancedSearch SHALL accept a `selectedCategories` prop of type `string[]` and reflect the selected state of each CategoryChip accordingly.

---

### Requirement 6: Highlighted Match Text

**User Story:** As a user, I want the portion of each suggestion that matches my query to be visually highlighted, so that I can quickly identify why a result was returned.

#### Acceptance Criteria

1. WHEN a SuggestionItem is rendered and `query` is non-empty, THE HighlightMatch SHALL wrap every substring of the suggestion label that case-insensitively matches `query` in a `<mark>` element.
2. THE `<mark>` element SHALL be styled with the `--accent` CSS_Variable as its background colour and a contrasting foreground.
3. WHEN `query` is empty or no substring matches, THE HighlightMatch SHALL render the label text without any `<mark>` elements.
4. THE HighlightMatch SHALL preserve the original casing of the suggestion label text in all rendered segments.

---

### Requirement 7: Loading State

**User Story:** As a user, I want to see a loading indicator while suggestions are being fetched, so that I know the component is working.

#### Acceptance Criteria

1. WHEN `onFetch` has been called and has not yet resolved, THE SuggestionDropdown SHALL render a loading indicator in place of the suggestion list.
2. THE loading indicator SHALL consist of 3 skeleton rows styled with a pulsing animation using Tailwind's `animate-pulse` utility.
3. WHEN `onFetch` resolves or rejects, THE SuggestionDropdown SHALL replace the loading indicator with the suggestion list or empty state.
4. IF `onFetch` rejects, THEN THE SuggestionDropdown SHALL render an error message row reading `"Something went wrong. Please try again."`.

---

### Requirement 8: Empty State

**User Story:** As a user, I want to see a helpful message when no suggestions match my query, so that I understand there are no results.

#### Acceptance Criteria

1. WHEN `onFetch` resolves with an empty array and `query` is non-empty, THE SuggestionDropdown SHALL render an empty state illustration and the message `"No results for "[query]""`.
2. THE empty state SHALL display a search icon above the message text.
3. WHEN `emptyMessage` is provided, THE SuggestionDropdown SHALL render `emptyMessage` instead of the default `"No results for "[query]""` text.

---

### Requirement 9: Dropdown Open/Close Behaviour

**User Story:** As a user, I want the suggestion dropdown to open and close predictably, so that it does not obstruct the rest of the page unexpectedly.

#### Acceptance Criteria

1. WHEN the SearchInput receives focus and `query` is empty, THE AdvancedSearch SHALL open the SuggestionDropdown if the RecentSearches list is non-empty.
2. WHEN the SearchInput receives focus and `query` is non-empty, THE AdvancedSearch SHALL open the SuggestionDropdown.
3. WHEN a pointer-down event occurs outside the AdvancedSearch root element, THE AdvancedSearch SHALL close the SuggestionDropdown.
4. WHEN a SuggestionItem is selected, THE AdvancedSearch SHALL close the SuggestionDropdown.
5. WHEN the `Escape` key is pressed, THE AdvancedSearch SHALL close the SuggestionDropdown.
6. THE SuggestionDropdown SHALL be rendered in the DOM only while it is open, to avoid stale ARIA state.

---

### Requirement 10: Animations

**User Story:** As a user, I want smooth animations when the dropdown opens and closes, so that the interaction feels polished.

#### Acceptance Criteria

1. WHEN the SuggestionDropdown opens, THE AdvancedSearch SHALL animate it from `opacity: 0, y: -8` to `opacity: 1, y: 0` using framer-motion.
2. WHEN the SuggestionDropdown closes, THE AdvancedSearch SHALL animate it from `opacity: 1, y: 0` to `opacity: 0, y: -8` using framer-motion.
3. WHILE Reduced_Motion is active, THE AdvancedSearch SHALL skip translate animations and use only opacity transitions.
4. WHEN a SuggestionItem enters the list, THE AdvancedSearch SHALL stagger each item's fade-in with a 30 ms delay per index.
5. WHILE Reduced_Motion is active, THE AdvancedSearch SHALL skip the stagger animation and render all SuggestionItems without delay.
6. THE AdvancedSearch SHALL use the existing `useReducedMotion` hook to detect the user's motion preference.

---

### Requirement 11: Mobile Full-Screen Overlay

**User Story:** As a mobile user, I want the search experience to expand to full screen, so that I have enough space to read suggestions comfortably.

#### Acceptance Criteria

1. WHEN the viewport width is below `768px` and the SearchInput receives focus, THE AdvancedSearch SHALL render the SuggestionDropdown as a full-screen overlay covering the entire viewport.
2. WHEN the full-screen overlay is active, THE AdvancedSearch SHALL render a back-arrow button in the top-left corner that closes the overlay and returns focus to the SearchInput.
3. WHEN the full-screen overlay is active, THE AdvancedSearch SHALL trap focus within the overlay using the existing `useFocusTrap` hook.
4. WHEN the full-screen overlay is active, THE AdvancedSearch SHALL prevent the document body from scrolling by applying `overflow: hidden` to `document.body`.
5. WHEN the full-screen overlay is closed, THE AdvancedSearch SHALL restore `document.body` overflow to its previous value.
6. WHILE the full-screen overlay is active, THE AdvancedSearch SHALL animate the overlay in from the bottom using a `y: 100% → y: 0` framer-motion transition.

---

### Requirement 12: Accessibility (ARIA)

**User Story:** As a screen-reader user, I want the component to expose correct ARIA attributes, so that I can understand and operate the search control using assistive technology.

#### Acceptance Criteria

1. THE SearchInput SHALL have `role="combobox"`, `aria-haspopup="listbox"`, and `aria-autocomplete="list"`.
2. WHEN the SuggestionDropdown is open, THE SearchInput SHALL set `aria-expanded="true"`; WHEN closed, THE SearchInput SHALL set `aria-expanded="false"`.
3. THE SuggestionDropdown SHALL have `role="listbox"` and an `id` that is referenced by the SearchInput's `aria-controls` attribute.
4. WHEN ActiveIndex is not `-1`, THE SearchInput SHALL set `aria-activedescendant` to the `id` of the focused SuggestionItem.
5. EACH SuggestionItem SHALL have `role="option"` and a unique `id` of the form `"suggestion-{index}"`.
6. WHEN a SuggestionItem is the active item, THE SuggestionItem SHALL set `aria-selected="true"`; otherwise `aria-selected="false"`.
7. THE SearchInput SHALL have an accessible label provided via `aria-label` or an associated `<label>` element; THE AdvancedSearch SHALL accept an `inputLabel` prop (default `"Search"`) for this purpose.
8. THE back-arrow button in the mobile overlay SHALL have `aria-label="Close search"`.
9. THE clear button in the SearchInput SHALL have `aria-label="Clear search"`.

---

### Requirement 13: Styling Conventions

**User Story:** As a contributor, I want the component to follow the project's existing styling conventions, so that it integrates consistently with the rest of the library.

#### Acceptance Criteria

1. THE AdvancedSearch SHALL use Tailwind CSS utility classes for all static styles.
2. THE AdvancedSearch SHALL use inline `style` props only for dynamic values that cannot be expressed as static utility classes.
3. THE AdvancedSearch SHALL use CSS_Variables (`--accent`, `--wave`, `--surface`, `--foreground`, `--muted`) for all design-system colour references.
4. THE SuggestionDropdown SHALL use `bg-[color:var(--surface)]`, `rounded-2xl`, `border border-ink/10`, and `shadow-lg` to match the card style used by `FilterDropdown`.
5. THE SearchInput SHALL use `rounded-xl`, `border border-ink/10`, `bg-[color:var(--surface)]`, and `focus:ring-2 focus:ring-wave/20` to match the existing `SearchBar` input style.
6. WHEN a SuggestionItem is the active item, THE SuggestionItem SHALL apply `bg-wave/10` as its background.
7. THE AdvancedSearch SHALL use `focus-visible:ring-2` and `focus-visible:outline-none` on all interactive elements to match the project's focus-visible convention.

---

### Requirement 14: Barrel Export and Types

**User Story:** As a library consumer, I want to import the AdvancedSearch components and their TypeScript types from a single entry point, so that my imports stay clean and consistent.

#### Acceptance Criteria

1. THE `src/components/AdvancedSearch/index.ts` file SHALL export the `AdvancedSearch`, `SearchInput`, `SuggestionDropdown`, `SuggestionItem`, `CategoryChip`, and `HighlightMatch` components.
2. THE `src/components/AdvancedSearch/index.ts` file SHALL export the `AdvancedSearchProps`, `Suggestion`, and `CategoryOption` TypeScript interfaces.
3. THE AdvancedSearch SHALL export all sub-component prop interfaces from `index.ts`.

---

### Requirement 15: Test Coverage

**User Story:** As a contributor, I want a comprehensive test suite for the AdvancedSearch component, so that regressions are caught automatically.

#### Acceptance Criteria

1. THE test suite SHALL assert that the SuggestionDropdown opens when the SearchInput receives focus and the RecentSearches list is non-empty.
2. THE test suite SHALL assert that `onFetch` is called with the debounced query after the user types at least 1 character.
3. THE test suite SHALL assert that `onFetch` is NOT called again for a query that was already in-flight when a newer query supersedes it.
4. THE test suite SHALL assert that pressing `ArrowDown` moves focus to the first SuggestionItem.
5. THE test suite SHALL assert that pressing `ArrowUp` from the first SuggestionItem returns focus to the SearchInput.
6. THE test suite SHALL assert that pressing `Enter` on a focused SuggestionItem calls `onSearch` with the item's label and saves it to RecentSearches.
7. THE test suite SHALL assert that pressing `Escape` closes the SuggestionDropdown.
8. THE test suite SHALL assert that submitting a query that already exists in RecentSearches moves it to the front rather than duplicating it.
9. THE test suite SHALL assert that the HighlightMatch component wraps matched substrings in `<mark>` elements and preserves original casing.
10. THE test suite SHALL assert that the loading skeleton is rendered while `onFetch` is pending.
11. THE test suite SHALL assert that the empty state is rendered when `onFetch` resolves with an empty array.
12. THE test suite SHALL assert that `role="combobox"`, `aria-haspopup`, `aria-expanded`, `aria-controls`, and `aria-activedescendant` are correctly set on the SearchInput.
13. THE test suite SHALL assert that each SuggestionItem has `role="option"` and the correct `aria-selected` value.
14. FOR ALL valid Suggestion arrays, THE test suite SHALL assert that the number of rendered SuggestionItems equals the length of the array (metamorphic property).
