# Component Usage Guide

Quick reference for using the newly implemented design system components.

## Card Component System

The Card component system provides a versatile foundation for creating consistent, accessible, and interactive card layouts.

### Basic Card

```tsx
import { Card } from "@/components/Card";

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>

// Card with variants
<Card variant="elevated" hoverEffect="lift" size="lg">
  Content
</Card>
```

**Props:**
- `variant`: "default" | "elevated" | "outlined" | "glass"
- `hoverEffect`: "none" | "lift" | "glow" | "border"
- `size`: "sm" | "md" | "lg"
- `hoverable`: boolean
- `loading`: boolean
- `interactive`: boolean (adds keyboard navigation)

### Structured Cards

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components/Card";

<Card variant="elevated">
  <CardHeader
    title="User Profile"
    subtitle="Active since 2023"
    icon={<UserIcon />}
    actions={<Button size="sm">Edit</Button>}
    bordered
  />
  <CardBody padding="md" scrollable>
    <p>Card content with proper spacing.</p>
  </CardBody>
  <CardFooter justify="between" padding="lg">
    <span>Last updated: Today</span>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

**CardHeader Props:**
- `title`: string
- `subtitle`: string
- `icon`: ReactNode
- `avatar`: ReactNode
- `actions`: ReactNode
- `bordered`: boolean

**CardBody Props:**
- `padding`: "none" | "sm" | "md" | "lg"
- `scrollable`: boolean

**CardFooter Props:**
- `justify`: "start" | "center" | "end" | "between" | "around"
- `bordered`: boolean
- `padding`: "none" | "sm" | "md" | "lg"

### Image Cards

```tsx
import { ImageCard } from "@/components/Card";

// Basic image card
<ImageCard
  imageUrl="https://example.com/image.jpg"
  imageAlt="Description"
  title="Card Title"
  description="Card description"
  imageHeight="md"
/>

// Image card with overlay
<ImageCard
  imageUrl="https://example.com/image.jpg"
  imageAlt="Description"
  overlay
  overlayContent={
    <div>
      <h3>Overlay Title</h3>
      <p>Overlay description</p>
    </div>
  }
/>

// Side layout image card
<ImageCard
  imageUrl="https://example.com/image.jpg"
  imageAlt="Description"
  title="Side Layout"
  description="Image on the side"
  imagePosition="left"
  actions={<Button>Learn More</Button>}
/>
```

**Props:**
- `imageUrl`: string (required)
- `imageAlt`: string (required)
- `title`: string
- `subtitle`: string
- `description`: string
- `actions`: ReactNode
- `imageHeight`: "sm" | "md" | "lg" | "xl"
- `imagePosition`: "top" | "left" | "right"
- `overlay`: boolean
- `overlayContent`: ReactNode

### Interactive Cards

```tsx
import { InteractiveCard } from "@/components/Card";
import { useState } from "react";

function SelectableCards() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <InteractiveCard
      title="Selectable Option"
      description="Click to select this card"
      selectable
      selected={selected === "card-1"}
      onSelectionChange={(isSelected) => 
        setSelected(isSelected ? "card-1" : null)
      }
      status="success"
      badge={<Badge color="info">New</Badge>}
    />
  );
}

// Expandable card
<InteractiveCard
  title="Expandable Content"
  description="Click to expand"
  expandable
  expandedContent={
    <div>
      <p>This content is shown when expanded.</p>
    </div>
  }
/>
```

**Props:**
- `selectable`: boolean
- `selected`: boolean
- `onSelectionChange`: (selected: boolean) => void
- `expandable`: boolean
- `expanded`: boolean
- `onExpandChange`: (expanded: boolean) => void
- `expandedContent`: ReactNode
- `badge`: ReactNode
- `status`: "default" | "success" | "warning" | "error" | "info"

### Loading States

```tsx
import { Card, SkeletonCard } from "@/components/Card";

// Built-in loading state
<Card loading size="md" />

// Custom skeleton card
<SkeletonCard
  variant="elevated"
  size="md"
  showHeader
  showImage
  showFooter
  lines={4}
  imageHeight="lg"
/>
```

**SkeletonCard Props:**
- `variant`: CardVariant
- `size`: CardSize
- `showHeader`: boolean
- `showImage`: boolean
- `showFooter`: boolean
- `lines`: number (content lines)
- `imageHeight`: "sm" | "md" | "lg"

---

## Badge Component

```tsx
import { Badge } from "@/components/Badge";

// Basic badge
<Badge>New</Badge>

// With color and style
<Badge color="success" style="solid">Active</Badge>

// With icon
<Badge color="warning" icon={<AlertIcon />}>Warning</Badge>

// Animated badge
<Badge color="error" animated>Alert</Badge>

// All variants
<Badge color="primary" size="sm" style="outline">Small</Badge>
<Badge color="success" size="md" style="soft">Medium</Badge>
<Badge color="error" size="lg" style="solid">Large</Badge>
```

**Props:**
- `color`: "primary" | "success" | "warning" | "error" | "info" | "neutral"
- `size`: "sm" | "md" | "lg"
- `style`: "solid" | "outline" | "soft"
- `icon`: ReactNode
- `animated`: boolean

---

## Tag Component

```tsx
import { Tag } from "@/components/Tag";
import { useState } from "react";

function TagExample() {
  const [tags, setTags] = useState(["React", "TypeScript"]);

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Tag
          key={tag}
          color="primary"
          removable
          onRemove={() => setTags(tags.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
```

**Props:**
- `color`: "primary" | "success" | "warning" | "error" | "info" | "neutral"
- `size`: "sm" | "md" | "lg"
- `style`: "solid" | "outline" | "soft"
- `icon`: ReactNode
- `removable`: boolean
- `onRemove`: () => void
- `pill`: boolean (default: true)

---

## EmptyState Component

```tsx
import { EmptyState } from "@/components/EmptyState";

// No results
<EmptyState
  variant="no-results"
  title="No creators found"
  description="Try adjusting your search filters"
  action={{
    label: "Clear filters",
    onClick: () => handleClearFilters(),
  }}
/>

// No data
<EmptyState
  variant="no-data"
  title="No tips yet"
  description="Start receiving tips to see your analytics"
/>

// Error state
<EmptyState
  variant="error"
  title="Something went wrong"
  description="We couldn't load your data. Please try again."
  action={{
    label: "Retry",
    onClick: () => window.location.reload(),
  }}
/>

// Offline state
<EmptyState
  variant="offline"
  title="You're offline"
  description="Check your internet connection and try again"
/>
```

**Props:**
- `variant`: "no-results" | "no-data" | "error" | "offline"
- `title`: string
- `description`: string
- `action`: { label: string; onClick: () => void }
- `icon`: ReactNode (optional, overrides default illustration)

---

## Dashboard Component

```tsx
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <div className="layout-container section-spacing">
      <Dashboard creatorId="user-123" />
    </div>
  );
}
```

**Features:**
- Responsive KPI cards with animated counters
- Line chart for tip trends
- Bar chart for top supporters
- Pie chart for tip distribution
- Date range selector
- CSV export functionality
- Loading and error states

---

## Layout Utilities

```tsx
// 12-column grid
<div className="grid-12">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">Item</div>
</div>

// Auto-fit grid
<div className="grid-auto">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Section spacing
<section className="section-spacing">
  Content with consistent spacing
</section>

// Component spacing
<div className="component-spacing">
  Internal padding
</div>

// Layout container
<div className="layout-container">
  Centered, max-width content
</div>
```

---

## Spacing Scale

Use these spacing values consistently throughout the app:

```
1  = 0.25rem (4px)
2  = 0.5rem  (8px)
3  = 0.75rem (12px)
4  = 1rem    (16px)
6  = 1.5rem  (24px)
8  = 2rem    (32px)
12 = 3rem    (48px)
16 = 4rem    (64px)
24 = 6rem    (96px)
```

Example:
```tsx
<div className="p-4 mb-6 gap-3">
  {/* 16px padding, 24px margin-bottom, 12px gap */}
</div>
```

---

## Dark Mode

All components automatically support dark mode. Test by:

1. Adding `dark` class to `<html>` element
2. Using the ThemeToggle component
3. System preference detection

```tsx
// Components automatically adapt
<Badge color="primary">Works in dark mode</Badge>
<EmptyState variant="no-data" title="Dark mode ready" />
<Dashboard />
```

---

## Accessibility

All components include:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Screen reader support

---

## Performance Tips

1. **Dashboard:** Use `useDashboardData` hook for data management
2. **Charts:** Recharts handles rendering optimization
3. **Animations:** Respects `prefers-reduced-motion` setting
4. **Images:** Use `OptimizedImage` component for images

---

## Common Patterns

### Status Badge
```tsx
<Badge color={status === "active" ? "success" : "error"}>
  {status}
</Badge>
```

### Tag Input
```tsx
{tags.map((tag) => (
  <Tag key={tag} removable onRemove={() => removeTag(tag)}>
    {tag}
  </Tag>
))}
```

### Empty State with Action
```tsx
<EmptyState
  variant="no-data"
  title="No data"
  description="Create your first item"
  action={{ label: "Create", onClick: handleCreate }}
/>
```

### Responsive Grid
```tsx
<div className="grid-12 gap-4">
  <div className="col-span-12 md:col-span-6 lg:col-span-3">
    {/* Responsive columns */}
  </div>
</div>
```

### Interactive Card Selection
```tsx
<InteractiveCard
  title="Option 1"
  selectable
  selected={selectedOption === "1"}
  onSelectionChange={(selected) => 
    setSelectedOption(selected ? "1" : null)
  }
/>
```

### Image Card with Actions
```tsx
<ImageCard
  imageUrl="/image.jpg"
  imageAlt="Description"
  title="Card Title"
  description="Card description"
  actions={
    <div className="flex gap-2">
      <Button size="sm" variant="outline">View</Button>
      <Button size="sm">Edit</Button>
    </div>
  }
/>
```
