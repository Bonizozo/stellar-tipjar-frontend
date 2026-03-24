# Implementation Plan: Creator QR Code

## Overview

Add a `QRCodePanel` client component to creator profile pages that generates a QR code encoding
the creator's canonical profile URL, supports three size options, and enables PNG download.

## Tasks

- [ ] 1. Install dependencies and define shared types
  - Install `qrcode` and `@types/qrcode` as dependencies
  - Install `fast-check` as a dev dependency (for property tests)
  - Create `src/components/QRCodePanel.tsx` with the `QRSize` type, `SIZE_LABELS` constant, and `QRCodePanelProps` interface
  - _Requirements: 2.1, 2.3_

- [ ] 2. Implement the `handleDownload` utility and its tests
  - [ ] 2.1 Implement `handleDownload(dataUrl, username)` inside `QRCodePanel.tsx`
    - Create an `<a>` element, set `href` and `download`, click if supported, else `window.open` fallback
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ]* 2.2 Write property test for download filename (Property 3)
    - **Property 3: Download filename matches username**
    - **Validates: Requirements 3.2**
    - For any username string, stub an anchor and assert `anchor.download === \`qr-${username}.png\``

  - [ ]* 2.3 Write unit tests for `handleDownload`
    - Test normal download path (anchor click triggered)
    - Test fallback path when `download` attribute is unsupported (`window.open` called)
    - _Requirements: 3.1, 3.4_

- [ ] 3. Implement `QRCodePanel` component
  - [ ] 3.1 Implement core QR generation logic
    - Add `"use client"` directive
    - Declare state: `size`, `dataUrl`, `isLoading`, `error`
    - In a `useEffect` keyed on `[profileUrl, size]`, call `qrcode.toDataURL(profileUrl, { width: size, margin: 2 })`
    - Set `isLoading = true` before the call; on success set `dataUrl`; on failure set `error`
    - If `profileUrl` is empty, set `error` immediately without calling the library
    - _Requirements: 1.1, 1.2, 1.4, 2.2_

  - [ ]* 3.2 Write property test for QR data encoding (Property 1)
    - **Property 1: QR data encodes the full absolute profile URL**
    - **Validates: Requirements 1.1, 1.2, 1.3**
    - For any `(username, siteUrl)` pair, call `qrcode.toDataURL` and decode the PNG; assert embedded string equals `${siteUrl}/creator/${username}`

  - [ ]* 3.3 Write property test for empty URL error state (Property 4)
    - **Property 4: Empty or invalid profile URL triggers error state**
    - **Validates: Requirements 1.4**
    - For any empty or blank `profileUrl`, render `QRCodePanel` and assert error text is visible and no `<img>` is present

  - [ ] 3.4 Implement size selector UI
    - Render three `<button>` elements labelled "S", "M", "L" for sizes 128, 256, 512
    - Default selected size is 256 (medium)
    - Active size gets a `ring-2 ring-wave` highlight
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 3.5 Write property test for size pixel dimensions (Property 2)
    - **Property 2: Size selection produces correct square pixel dimensions**
    - **Validates: Requirements 2.1, 2.2, 2.4**
    - For any `QRSize` in `{128, 256, 512}`, generate a QR and parse the PNG IHDR chunk; assert width === height === size

  - [ ] 3.6 Implement creator info overlay and loading/error states
    - Display `displayName` and `@username` adjacent to the QR code area
    - Show a loading indicator while `isLoading` is true
    - Show an inline error message when `error` is non-null (no `<img>` rendered)
    - _Requirements: 1.4, 4.1, 4.2, 4.3_

  - [ ]* 3.7 Write property test for creator info display (Property 5)
    - **Property 5: Creator info is always displayed alongside the QR code**
    - **Validates: Requirements 4.1, 4.2**
    - For any `(displayName, username)` pair, render `QRCodePanel` and assert both display name and `@username` appear in output

  - [ ] 3.8 Implement download button
    - Add a "Download PNG" button that calls `handleDownload(dataUrl, username)` when `dataUrl` is non-null
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 3.9 Write unit tests for `QRCodePanel` rendering
    - Assert `<img>` appears after async QR generation with a valid `profileUrl`
    - Assert default selected size button is "M" on first render
    - Assert loading indicator is shown while generation is in progress
    - Assert download button triggers anchor with correct `download` attribute
    - _Requirements: 2.3, 3.1, 4.3_

- [ ] 4. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Integrate `QRCodePanel` into `CreatorPage`
  - [ ] 5.1 Update `src/app/creator/[username]/page.tsx`
    - Construct `profileUrl` using `NEXT_PUBLIC_SITE_URL` env var with empty-string fallback
    - Import and render `<QRCodePanel username={profile.username} displayName={profile.displayName} profileUrl={profileUrl} />` inside the profile card `<div>`, below the action buttons and above the tip form section
    - _Requirements: 5.1, 5.2_

  - [ ]* 5.2 Write unit test for `QRCodePanel` presence in `CreatorPage`
    - Assert `QRCodePanel` is rendered inside the profile card section
    - _Requirements: 5.1_

- [ ] 6. Add responsive layout for mobile viewports
  - Ensure `QRCodePanel` stacks its controls vertically on viewports narrower than 640px using Tailwind responsive classes
  - _Requirements: 5.3_

- [ ] 7. Add `NEXT_PUBLIC_SITE_URL` to `.env.example`
  - Document the variable with a comment explaining its purpose for QR code URL construction
  - _Requirements: 5.2_

- [ ] 8. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations each
- Unit tests use Vitest + React Testing Library
