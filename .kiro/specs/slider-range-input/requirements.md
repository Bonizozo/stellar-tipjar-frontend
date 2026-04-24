# Requirements Document

## Introduction

This feature adds a fully accessible, fully styled Slider and Range input component suite to the open-source React component library. The suite supports single-handle and dual-handle (range) modes, custom marks, tooltips, horizontal and vertical orientations, step snapping, and keyboard navigation — all implemented from scratch using React and pointer events, with no external slider dependencies. Styling follows the project's existing Tailwind CSS v4 + CSS custom-property conventions.

## Glossary

- **Slider**: The top-level React component that orchestrates all sub-components and exposes the public API.
- **SliderTrack**: The sub-component that renders the base track rail, the filled range segment, and handles click/drag targeting.
- **SliderThumb**: The draggable handle element rendered inside the track. A single-handle Slider has one Thumb; a range Slider has two.
- **SliderTooltip**: The sub-component that renders the current value above (or below) a Thumb.
- **SliderMarks**: The sub-component that renders tick marks and optional labels along the track.
- **Single_Mode**: The operating mode when `value` is a `number`. One Thumb is rendered.
- **Range_Mode**: The operating mode when `value` is `[number, number]`. Two Thumbs are rendered — a minimum Thumb and a maximum Thumb.
- **Step**: The discrete interval between valid values. All snapping is relative to `min`.
- **Active_Range**: In Single_Mode, the filled segment from `min` to the current value. In Range_Mode, the filled segment between the two Thumb values.
- **Pointer_Events**: The browser's unified pointer event API (`onPointerDown`, `onPointerMove`, `onPointerUp`) used for all drag interactions.
- **CSS_Variable**: A CSS custom property defined in `:root` or `.dark` (e.g. `--accent`, `--wave`) used for design-system colours.

---

## Requirements

### Requirement 1: Single-Handle Mode

**User Story:** As a developer, I want to render a single-handle slider bound to a numeric value, so that users can select a single point on a continuous or stepped range.

#### Acceptance Criteria

1. WHEN `value` is a `number`, THE Slider SHALL render exactly one SliderThumb.
2. WHEN the SliderThumb is dragged to a new position, THE Slider SHALL call `onChange` with the snapped `number` value nearest to the pointer position.
3. WHEN `min` and `max` are not provided, THE Slider SHALL default `min` to `0` and `max` to `100`.
4. WHEN `step` is not provided, THE Slider SHALL default `step` to `1`.
5. THE Slider SHALL clamp all computed values to the range `[min, max]` inclusive.

---

### Requirement 2: Dual-Handle (Range) Mode

**User Story:** As a developer, I want to render a dual-handle range slider bound to a `[number, number]` tuple, so that users can select a minimum and maximum value simultaneously.

#### Acceptance Criteria

1. WHEN `value` is `[number, number]`, THE Slider SHALL render exactly two SliderThumbs — one for the minimum value and one for the maximum value.
2. WHEN the minimum Thumb is dragged, THE Slider SHALL call `onChange` with a `[number, number]` tuple where the first element is the new snapped value and the second element is unchanged.
3. WHEN the maximum Thumb is dragged, THE Slider SHALL call `onChange` with a `[number, number]` tuple where the first element is unchanged and the second element is the new snapped value.
4. WHILE the minimum Thumb is being dragged, THE Slider SHALL prevent the minimum value from exceeding the current maximum value.
5. WHILE the maximum Thumb is being dragged, THE Slider SHALL prevent the maximum value from falling below the current minimum value.
6. WHEN a click occurs on the SliderTrack, THE Slider SHALL move the Thumb whose current value is nearest to the clicked position.

---

### Requirement 3: Step Snapping

**User Story:** As a developer, I want all value changes to snap to valid step intervals, so that the slider always produces clean, predictable values.

#### Acceptance Criteria

1. WHEN a Thumb is dragged to any position, THE Slider SHALL snap the resulting value to the nearest multiple of `step` offset from `min`.
2. WHEN a keyboard event moves a Thumb, THE Slider SHALL snap the resulting value to the nearest valid step.
3. THE Slider SHALL ensure that `max` is always reachable as a valid snapped value regardless of whether `(max - min)` is evenly divisible by `step`.
4. FOR ALL valid step-snapped values `v`, THE Slider SHALL satisfy `min <= v <= max`.

---

### Requirement 4: Keyboard Navigation

**User Story:** As a keyboard user, I want to control the focused thumb using standard keyboard shortcuts, so that I can operate the slider without a pointer device.

#### Acceptance Criteria

1. WHEN the `ArrowRight` or `ArrowUp` key is pressed while a Thumb has focus and `orientation` is `'horizontal'`, THE Slider SHALL increment the focused Thumb's value by one `step`.
2. WHEN the `ArrowLeft` or `ArrowDown` key is pressed while a Thumb has focus and `orientation` is `'horizontal'`, THE Slider SHALL decrement the focused Thumb's value by one `step`.
3. WHEN the `ArrowUp` key is pressed while a Thumb has focus and `orientation` is `'vertical'`, THE Slider SHALL increment the focused Thumb's value by one `step`.
4. WHEN the `ArrowDown` key is pressed while a Thumb has focus and `orientation` is `'vertical'`, THE Slider SHALL decrement the focused Thumb's value by one `step`.
5. WHEN the `Home` key is pressed while a Thumb has focus, THE Slider SHALL set the focused Thumb's value to `min`.
6. WHEN the `End` key is pressed while a Thumb has focus, THE Slider SHALL set the focused Thumb's value to `max`.
7. WHEN any keyboard navigation key is handled, THE Slider SHALL call `preventDefault` on the keyboard event to suppress page scrolling.
8. IF `disabled` is `true`, THEN THE Slider SHALL ignore all keyboard events on every Thumb.

---

### Requirement 5: Pointer-Event Drag Interaction

**User Story:** As a user, I want smooth, responsive drag behaviour across mouse, touch, and stylus inputs, so that the slider works reliably on all devices.

#### Acceptance Criteria

1. WHEN `onPointerDown` fires on a Thumb, THE Slider SHALL call `setPointerCapture` on that Thumb element so that subsequent pointer events are routed to it even if the pointer leaves the element.
2. WHILE pointer capture is active, THE Slider SHALL update the Thumb's value on every `onPointerMove` event.
3. WHEN `onPointerUp` fires, THE Slider SHALL release pointer capture and stop updating the value.
4. THE Slider SHALL use `onPointerDown`, `onPointerMove`, and `onPointerUp` exclusively — THE Slider SHALL NOT attach separate mouse or touch event listeners.
5. IF `disabled` is `true`, THEN THE Slider SHALL call `preventDefault` on `onPointerDown` and SHALL NOT initiate drag tracking.

---

### Requirement 6: Track Rendering and Fill

**User Story:** As a user, I want the filled portion of the track to visually reflect the current value or range, so that I can understand the selected value at a glance.

#### Acceptance Criteria

1. THE SliderTrack SHALL render a base rail spanning the full length of the slider.
2. THE SliderTrack SHALL render a filled segment covering the Active_Range.
3. WHEN `trackColor` is provided, THE SliderTrack SHALL apply that colour to the filled segment.
4. WHEN `trackColor` is not provided, THE SliderTrack SHALL apply the design-system primary colour via the CSS_Variable `--accent`.
5. WHEN a value changes via keyboard navigation, THE SliderTrack SHALL apply a CSS transition to the fill width or height change.
6. WHILE a Thumb is being dragged, THE SliderTrack SHALL NOT apply a CSS transition to the fill, to prevent visual lag.

---

### Requirement 7: Tooltip Display

**User Story:** As a user, I want to see the current value displayed near the thumb, so that I know the exact value I am selecting.

#### Acceptance Criteria

1. WHEN `tooltip` is `'always'`, THE SliderTooltip SHALL be visible at all times.
2. WHEN `tooltip` is `'hover'` and the pointer enters a Thumb, THE SliderTooltip SHALL become visible.
3. WHEN `tooltip` is `'hover'` and the pointer leaves a Thumb and no drag is active, THE SliderTooltip SHALL become hidden.
4. WHEN `tooltip` is `'drag'` and a drag interaction begins on a Thumb, THE SliderTooltip SHALL become visible.
5. WHEN `tooltip` is `'drag'` and the drag interaction ends, THE SliderTooltip SHALL become hidden.
6. WHEN `tooltip` is `'never'`, THE SliderTooltip SHALL not be rendered in the DOM.
7. THE SliderTooltip SHALL transition opacity smoothly between visible and hidden states without causing layout shift.
8. WHEN the SliderTooltip would overflow the viewport top edge, THE SliderTooltip SHALL reposition below the Thumb instead of above.
9. WHEN `formatValue` is provided, THE SliderTooltip SHALL display the result of `formatValue(currentValue)` instead of the raw number.
10. WHEN `formatValue` is not provided, THE SliderTooltip SHALL display the raw numeric value as a string.

---

### Requirement 8: Marks Rendering

**User Story:** As a developer, I want to display tick marks along the track with optional labels, so that users can identify key values on the slider.

#### Acceptance Criteria

1. WHEN `marks` is `true`, THE SliderMarks SHALL auto-generate one mark at every valid step interval between `min` and `max` inclusive.
2. WHEN `marks` is an array, THE SliderMarks SHALL render exactly the marks specified in the array, each at its given `value` position.
3. WHEN a mark's `value` falls within the Active_Range, THE SliderMarks SHALL render that mark dot with a filled style.
4. WHEN a mark's `value` falls outside the Active_Range, THE SliderMarks SHALL render that mark dot with an unfilled style.
5. WHEN a mark entry includes a `label` string and `orientation` is `'horizontal'`, THE SliderMarks SHALL render the label below the track.
6. WHEN a mark entry includes a `label` string and `orientation` is `'vertical'`, THE SliderMarks SHALL render the label to the right of the track.
7. WHEN a mark label overflows its allocated space, THE SliderMarks SHALL truncate the label with an ellipsis.
8. WHEN `marks` is `false` or not provided, THE SliderMarks SHALL not be rendered.

---

### Requirement 9: Orientation

**User Story:** As a developer, I want to render the slider in either horizontal or vertical orientation, so that I can integrate it into layouts that require a vertical control.

#### Acceptance Criteria

1. WHEN `orientation` is `'horizontal'` or not provided, THE Slider SHALL lay out the track and Thumbs along the horizontal axis.
2. WHEN `orientation` is `'vertical'`, THE Slider SHALL lay out the track and Thumbs along the vertical axis.
3. WHEN `orientation` is `'vertical'`, THE Slider SHALL map pointer Y-axis movement to value changes, with upward movement increasing the value.
4. WHEN `orientation` is `'vertical'`, THE SliderMarks SHALL render labels to the right of the track.
5. WHEN `orientation` is `'vertical'`, THE SliderTooltip SHALL position itself to the right of the Thumb.
6. THE Slider SHALL expose `aria-orientation` on every Thumb reflecting the current orientation value.

---

### Requirement 10: Accessibility (ARIA)

**User Story:** As a screen-reader user, I want the slider to expose correct ARIA attributes, so that I can understand and operate the control using assistive technology.

#### Acceptance Criteria

1. THE Slider SHALL set `role="slider"` on every SliderThumb element.
2. THE Slider SHALL set `aria-valuemin` to `min` on every SliderThumb element.
3. THE Slider SHALL set `aria-valuemax` to `max` on every SliderThumb element.
4. WHEN the value changes, THE Slider SHALL update `aria-valuenow` on the affected SliderThumb to reflect the new value.
5. THE Slider SHALL set `aria-orientation` on every SliderThumb to `'horizontal'` or `'vertical'` matching the `orientation` prop.
6. WHEN `disabled` is `true`, THE Slider SHALL set `aria-disabled="true"` on every SliderThumb.
7. WHEN `value` is `[number, number]`, THE Slider SHALL set `aria-label="Minimum value"` on the minimum SliderThumb.
8. WHEN `value` is `[number, number]`, THE Slider SHALL set `aria-label="Maximum value"` on the maximum SliderThumb.
9. WHEN `formatValue` is provided, THE Slider SHALL set `aria-valuetext` on each SliderThumb to the result of `formatValue(currentValue)`.

---

### Requirement 11: Disabled State

**User Story:** As a developer, I want to render the slider in a disabled state, so that users cannot interact with it when the control is not applicable.

#### Acceptance Criteria

1. WHEN `disabled` is `true`, THE Slider SHALL render all Thumbs at 40% opacity via a CSS class.
2. WHEN `disabled` is `true`, THE Slider SHALL block all pointer interactions on every Thumb and the SliderTrack.
3. WHEN `disabled` is `true`, THE Slider SHALL block all keyboard interactions on every Thumb.
4. WHEN `disabled` is `true`, THE Slider SHALL never call `onChange`.
5. WHEN `disabled` is `true`, THE Slider SHALL set `tabIndex={-1}` on every Thumb to remove it from the tab order.

---

### Requirement 12: Styling Conventions

**User Story:** As a contributor, I want the component to follow the project's existing styling conventions, so that it integrates consistently with the rest of the library.

#### Acceptance Criteria

1. THE Slider SHALL use Tailwind CSS utility classes for all static styles.
2. THE Slider SHALL use inline `style` props only for dynamic values — specifically Thumb position and fill segment dimensions.
3. THE Slider SHALL use CSS_Variables (`--accent`, `--wave`, `--foreground`, `--muted`) for all design-system colour references.
4. THE Slider SHALL accept a `className` prop and apply it to the root container element.
5. WHEN `thumbColor` is provided, THE Slider SHALL apply that colour to every SliderThumb.
6. WHEN `thumbColor` is not provided, THE Slider SHALL apply the CSS_Variable `--accent` colour to every SliderThumb.

---

### Requirement 13: Barrel Export and Types

**User Story:** As a library consumer, I want to import the Slider components and their TypeScript types from a single entry point, so that my imports stay clean and consistent.

#### Acceptance Criteria

1. THE `src/components/Slider/index.ts` file SHALL export the `Slider`, `SliderTrack`, `SliderTooltip`, and `SliderMarks` components.
2. THE `src/components/Slider/index.ts` file SHALL export the `SliderProps` TypeScript interface.
3. THE Slider SHALL export all sub-component prop interfaces from `index.ts`.

---

### Requirement 14: Test Coverage

**User Story:** As a contributor, I want a comprehensive test suite for the Slider component, so that regressions are caught automatically.

#### Acceptance Criteria

1. THE test suite SHALL assert that the Slider renders correctly in Single_Mode with default props.
2. THE test suite SHALL assert that the Slider renders correctly in Range_Mode with default props.
3. THE test suite SHALL assert that dragging a Thumb calls `onChange` with the correct snapped value.
4. THE test suite SHALL assert that in Range_Mode, the minimum Thumb cannot be dragged past the maximum Thumb.
5. THE test suite SHALL assert that pressing `ArrowRight` increments the focused Thumb's value by one `step`.
6. THE test suite SHALL assert that pressing `End` sets the focused Thumb's value to `max`.
7. THE test suite SHALL assert that when `marks={true}`, the correct number of mark elements is rendered for a given `min`, `max`, and `step` combination.
8. THE test suite SHALL assert that the SliderTooltip is visible when `tooltip='hover'` and the pointer enters the Thumb.
9. THE test suite SHALL assert that the SliderTooltip is absent from the DOM when `tooltip='never'`.
10. WHEN `disabled={true}`, THE test suite SHALL assert that `onChange` is never called regardless of pointer or keyboard interaction.
11. THE test suite SHALL assert that `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-orientation` are present on every Thumb.
12. THE test suite SHALL assert that `aria-valuenow` updates to the new value after a value change.
