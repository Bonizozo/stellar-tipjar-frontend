# Implementation Plan: User Settings

## Overview

Implement the `/settings` page for Stellar Tip Jar. The work is broken into discrete steps: schemas and service first, then each UI section, then navigation wiring. Each step builds on the previous so there is no orphaned code.

## Tasks

- [ ] 1. Create settings schema and service
  - [ ] 1.1 Create `src/schemas/settingsSchema.ts` with Zod schemas for profile, avatar file, preferences, and notifications, plus exported TypeScript types
    - Define `profileSchema`, `avatarFileSchema`, `preferencesSchema`, `notificationsSchema`
    - Export `ProfileValues`, `AvatarFileInput`, `PreferencesValues`, `NotificationsValues`
    - _Requirements: 2.1, 3.1, 4.1, 4.2, 5.1, 5.2, 7.1, 7.4_

  - [ ]* 1.2 Write property test for profile schema validation (Property 2)
    - **Property 2: Profile field validation**
    - **Validates: Requirements 2.1, 7.1, 7.2**

  - [ ]* 1.3 Write property test for avatar file schema validation (Property 4)
    - **Property 4: Avatar file validation**
    - **Validates: Requirements 3.1, 3.4, 7.4**

  - [ ] 1.4 Create `src/services/settingsService.ts` with all HTTP methods delegating to the `request` helper from `api.ts`
    - Implement `getProfile`, `updateProfile`, `getPreferences`, `updatePreferences`, `getNotifications`, `updateNotifications`, `uploadAvatar`, `deleteAccount`
    - Define and export `UsernameConflictError` class
    - Handle `409 Conflict` in `updateProfile` by throwing `UsernameConflictError`
    - For `uploadAvatar`, omit `Content-Type` header so the browser sets the multipart boundary
    - _Requirements: 2.2, 2.6, 3.3, 4.3, 5.3, 6.4_

- [ ] 2. Create settings page shell and layout
  - [ ] 2.1 Create `src/app/settings/page.tsx` as a `"use client"` component
    - Read `isConnected` and `isConnecting` from `useWalletContext`
    - Render a loading spinner while `isConnecting` is true
    - Redirect to `/` via `useRouter` when `isConnected` is false and `isConnecting` is false
    - Render `SettingsLayout` when connected
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ]* 2.2 Write property test for unauthenticated redirect (Property 1)
    - **Property 1: Unauthenticated redirect**
    - **Validates: Requirements 1.1**

  - [ ] 2.3 Create `src/components/settings/SettingsLayout.tsx`
    - Accept four section components as children or render them directly
    - Render `SettingsSidebar` (visible `md+`) and `SettingsTabs` (visible mobile) for navigation
    - _Requirements: 8.1, 8.2_

  - [ ] 2.4 Create `src/components/settings/SettingsSidebar.tsx`
    - Render a sticky vertical `<nav>` with anchor links: `#profile`, `#preferences`, `#notifications`, `#account`
    - _Requirements: 8.1, 8.2_

  - [ ] 2.5 Create `src/components/settings/SettingsTabs.tsx`
    - Render a horizontal scrollable tab strip with the same four section links
    - _Requirements: 8.1, 8.2_

- [ ] 3. Implement ProfileForm and AvatarUploader
  - [ ] 3.1 Create `src/components/settings/ProfileForm.tsx`
    - Use `react-hook-form` with `zodResolver(profileSchema)`
    - On mount, call `settingsService.getProfile()` and reset form with returned data
    - On submit, call `settingsService.updateProfile()`; show success banner on resolve
    - On `UsernameConflictError`, set field-level error on `username`
    - On other errors, show error banner without clearing fields
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 7.1, 7.2, 7.3_

  - [ ]* 3.2 Write property test for form pre-population round-trip (Property 3)
    - **Property 3: Form pre-population round-trip**
    - **Validates: Requirements 2.3, 4.4, 5.4**

  - [ ]* 3.3 Write unit tests for ProfileForm
    - Test pre-population from fetched data
    - Test success banner on save
    - Test error banner without field clearing on API failure
    - Test field-level "Username already taken" on 409
    - _Requirements: 2.3, 2.4, 2.5, 2.6_

  - [ ] 3.4 Create `src/components/settings/AvatarUploader.tsx`
    - Validate selected file with `avatarFileSchema`; show inline error and skip upload on failure
    - On valid selection, render preview via `URL.createObjectURL`
    - On confirm, call `settingsService.uploadAvatar(file)` with `FormData`
    - Show indeterminate spinner and disable button during upload
    - On success, replace preview `src` with returned `avatarUrl`
    - On failure, show error banner and re-enable button
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 7.4_

  - [ ]* 3.5 Write property test for avatar URL display after upload (Property 5)
    - **Property 5: Avatar URL display after upload**
    - **Validates: Requirements 3.6**

  - [ ]* 3.6 Write unit tests for AvatarUploader
    - Test preview shown after valid file selection
    - Test disabled button and spinner during upload
    - Test displayed image updated to returned URL on success
    - _Requirements: 3.2, 3.5, 3.6_

- [ ] 4. Checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement PreferencesForm and NotificationForm
  - [ ] 5.1 Create `src/utils/theme.ts` with `applyTheme(theme: 'light' | 'dark' | 'system')` utility
    - Set `data-theme` attribute on `<html>`
    - Read `prefers-color-scheme` when `system` is selected
    - Persist selection to `localStorage`
    - _Requirements: 4.5_

  - [ ] 5.2 Create `src/components/settings/PreferencesForm.tsx`
    - Use `react-hook-form` with `zodResolver(preferencesSchema)`
    - On mount, call `settingsService.getPreferences()` and reset form
    - On submit, call `settingsService.updatePreferences()`; call `applyTheme` on success
    - On failure, show error banner and revert displayed values to last saved snapshot
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 5.3 Write unit tests for PreferencesForm
    - Test all three theme options and all three currency options are rendered
    - Test pre-population from fetched data
    - _Requirements: 4.1, 4.2, 4.4_

  - [ ] 5.4 Create `src/components/settings/NotificationForm.tsx`
    - Use `react-hook-form` with `zodResolver(notificationsSchema)`
    - On mount, call `settingsService.getNotifications()` and reset form
    - On submit, call `settingsService.updateNotifications()`
    - On failure, show error banner and revert toggles to last saved snapshot
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 5.5 Write unit tests for NotificationForm
    - Test all five toggle controls are rendered
    - Test toggles revert to last saved state on save failure
    - _Requirements: 5.1, 5.2, 5.5_

- [ ] 6. Implement AccountSection
  - [ ] 6.1 Create `src/components/settings/AccountSection.tsx`
    - Display `publicKey` from `useWalletContext` in a read-only `<input>`
    - "Disconnect Wallet" button calls `disconnect()` then `router.push('/')`
    - "Delete Account" button opens a `<dialog>`-based confirmation modal
    - On confirm, call `settingsService.deleteAccount()`; on success call `disconnect()` and redirect
    - On deletion failure, show error banner without disconnecting or redirecting
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 6.2 Write unit tests for AccountSection
    - Test public key displayed in read-only field
    - Test confirmation dialog shown before deletion
    - Test no disconnect or redirect on deletion failure
    - _Requirements: 6.1, 6.3, 6.5_

- [ ] 7. Wire sections into SettingsLayout and update Navbar
  - [ ] 7.1 Update `src/components/settings/SettingsLayout.tsx` to render all four section components (`ProfileForm` + `AvatarUploader`, `PreferencesForm`, `NotificationForm`, `AccountSection`) with their corresponding `id` anchors
    - _Requirements: 8.1, 8.2_

  - [ ] 7.2 Extract a `NavSettingsLink` client component (`src/components/NavSettingsLink.tsx`) that reads `isConnected` from `useWalletContext` and renders a `/settings` link only when connected
    - _Requirements: 8.3_

  - [ ] 7.3 Import and render `NavSettingsLink` inside `src/components/Navbar.tsx`
    - _Requirements: 8.3_

  - [ ]* 7.4 Write property test for Settings link visibility (Property 7)
    - **Property 7: Settings link visibility matches wallet state**
    - **Validates: Requirements 8.3**

  - [ ]* 7.5 Write unit tests for Navbar settings link
    - Test Settings link visible when connected, hidden when disconnected
    - _Requirements: 8.3_

- [ ] 8. Write property test for inline validation error lifecycle (Property 6)
  - [ ]* 8.1 Write property test for inline validation error lifecycle (Property 6)
    - **Property 6: Inline validation error lifecycle**
    - **Validates: Requirements 7.2, 7.3**

- [ ] 9. Final checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` (add as dev dependency: `npm i -D fast-check`)
- `UsernameConflictError` is defined in `settingsService.ts` and caught specifically in `ProfileForm`
- Theme persistence uses `localStorage` key `"theme"` and `data-theme` on `<html>`
