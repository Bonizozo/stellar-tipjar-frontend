# Design Document: Creator QR Code

## Overview

This feature adds a QR code panel to creator profile pages. The QR code encodes the creator's
canonical profile URL so visitors can scan it to open the profile on another device or share it
offline. The panel also exposes size controls (128 / 256 / 512 px) and a one-click PNG download.

All QR rendering happens entirely in the browser via a lightweight client-side component so that
server-side rendering of the profile page is never blocked.

### Technology Choice

QR generation is handled by **`qrcode`** (npm: `qrcode`), a well-maintained, zero-dependency
library that runs in both Node and the browser. It exposes a `toDataURL` API that returns a
base64-encoded PNG — exactly what we need for both `<img>` rendering and the download flow.
No canvas manipulation or third-party service is required.

---

## Architecture

```mermaid
graph TD
    A[CreatorPage (Server Component)] -->|renders| B[QRCodePanel (Client Component)]
    B -->|calls| C[qrcode.toDataURL]
    C -->|returns base64 PNG| B
    B -->|renders| D[<img> element]
    B -->|on download click| E[Download Handler]
    E -->|creates <a> with href=dataURL| F[Browser file download]
```

The `CreatorPage` server component passes `username` and `displayName` as props to `QRCodePanel`.
`QRCodePanel` is a `"use client"` component that owns all QR state (selected size, data URL,
loading/error). The server component is never re-rendered by QR interactions.

---

## Components and Interfaces

### `QRCodePanel` — `src/components/QRCodePanel.tsx`

```ts
interface QRCodePanelProps {
  username: string;       // raw username, e.g. "alice"
  displayName: string;    // creator's display name
  profileUrl: string;     // absolute URL, e.g. "https://example.com/creator/alice"
}
```

Internal state:

| State field  | Type                        | Default  |
|--------------|-----------------------------|----------|
| `size`       | `128 \| 256 \| 512`         | `256`    |
| `dataUrl`    | `string \| null`            | `null`   |
| `isLoading`  | `boolean`                   | `true`   |
| `error`      | `string \| null`            | `null`   |

Lifecycle:
- On mount and whenever `size` or `profileUrl` changes, call `qrcode.toDataURL(profileUrl, { width: size, margin: 2 })`.
- Set `isLoading = true` before the call, `isLoading = false` after.
- On success store the result in `dataUrl`; on failure store a message in `error`.

### Size selector

Three `<button>` elements labelled "S", "M", "L" (128 / 256 / 512). The active size gets a
`ring-2 ring-wave` highlight. Clicking a button updates `size` state.

### Download handler

```ts
function handleDownload(dataUrl: string, username: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `qr-${username}.png`;
  if (link.download !== undefined) {
    link.click();
  } else {
    window.open(dataUrl, "_blank");
  }
}
```

The `link.download !== undefined` guard covers the fallback for browsers that do not support the
`download` attribute (Requirement 3.4).

### Integration into `CreatorPage`

`CreatorPage` constructs the absolute profile URL using the `NEXT_PUBLIC_SITE_URL` environment
variable (falling back to `""` so the component can show an error gracefully):

```ts
const profileUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/creator/${profile.username}`
  : "";
```

`QRCodePanel` is rendered inside the existing profile card `<div>`, below the action buttons and
above the tip form section.

---

## Data Models

No new server-side data models are required. All state is ephemeral and lives inside
`QRCodePanel`.

### Size type

```ts
type QRSize = 128 | 256 | 512;

const SIZE_LABELS: Record<QRSize, string> = {
  128: "S",
  256: "M",
  512: "L",
};
```

### Environment variable

| Variable                | Required | Purpose                                      |
|-------------------------|----------|----------------------------------------------|
| `NEXT_PUBLIC_SITE_URL`  | No       | Base URL used to build the Creator_Profile_URL. Falls back to empty string, which causes `QRCodePanel` to display an error. |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a
system — essentially, a formal statement about what the system should do. Properties serve as the
bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: QR data encodes the full absolute profile URL

*For any* valid username and site URL, the data URL produced by `qrcode.toDataURL` must decode
back to the exact `${siteUrl}/creator/${username}` string — full scheme, host, and path with no
truncation or relative path.

**Validates: Requirements 1.1, 1.2, 1.3**

---

### Property 2: Size selection produces correct square pixel dimensions

*For any* selected `QRSize` value (128, 256, or 512), the PNG image encoded in the resulting data
URL must have width equal to that size and height equal to that size (1:1 aspect ratio enforced).

**Validates: Requirements 2.1, 2.2, 2.4**

---

### Property 3: Download filename matches username

*For any* username string, `handleDownload` must set the `<a>` element's `download` attribute to
exactly `qr-${username}.png`.

**Validates: Requirements 3.2**

---

### Property 4: Empty or invalid profile URL triggers error state

*For any* `QRCodePanel` rendered with an empty or otherwise invalid `profileUrl`, the component
must set `error` to a non-null string and must not render the QR `<img>` element.

**Validates: Requirements 1.4**

---

### Property 5: Creator info is always displayed alongside the QR code

*For any* `displayName` and `username` passed to `QRCodePanel`, the rendered output must contain
the display name text and the `@`-prefixed username text adjacent to the QR code area.

**Validates: Requirements 4.1, 4.2**

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| `NEXT_PUBLIC_SITE_URL` not set | `profileUrl` is `""`. `qrcode.toDataURL("")` rejects; component shows inline error message. |
| `qrcode.toDataURL` rejects for any reason | `error` state is set; `<img>` is replaced by an error message paragraph. |
| Browser lacks `download` attribute support | `handleDownload` falls back to `window.open(dataUrl, "_blank")`. |
| Profile data unavailable (API error) | Handled upstream by `CreatorPage`; `QRCodePanel` is not rendered. |

---

## Testing Strategy

### Unit tests (Vitest + React Testing Library)

- Render `QRCodePanel` with a valid `profileUrl` and assert the `<img>` appears after async generation.
- Assert the default selected size button is "M" on first render (Requirement 2.3).
- Click the download button and assert an `<a>` with the correct `download` attribute is triggered (Requirement 3.1, 3.3).
- Stub an anchor without `download` support and assert `window.open` is called as fallback (Requirement 3.4).
- Assert a loading indicator is shown while QR generation is in progress (Requirement 4.3).
- Assert `QRCodePanel` is rendered inside the profile card section of `CreatorPage` (Requirement 5.1).

### Property-based tests (fast-check)

Each property test runs a minimum of **100 iterations**.
Each test is tagged with a comment in the format:
`// Feature: creator-qr-code, Property <N>: <property_text>`

| Property | Test description |
|---|---|
| P1 — QR encodes full absolute URL | For any `(username, siteUrl)` pair, call `qrcode.toDataURL` and decode the resulting PNG; assert the embedded string equals `${siteUrl}/creator/${username}`. |
| P2 — Size matches selection | For any `QRSize` in `{128, 256, 512}`, generate a QR and parse the PNG IHDR chunk to assert width === height === size. |
| P3 — Download filename matches username | For any username string, call `handleDownload` with a stub anchor and assert `anchor.download === \`qr-${username}.png\``. |
| P4 — Empty URL → error state | For any empty or blank `profileUrl`, render `QRCodePanel` and assert `error` text is visible and no `<img>` is present. |
| P5 — Creator info displayed | For any `(displayName, username)` pair, render `QRCodePanel` and assert both the display name and `@username` appear in the output. |

**Library**: `fast-check` (install as dev dependency alongside `vitest`).
