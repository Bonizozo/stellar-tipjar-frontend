# Requirements Document

## Introduction

The User Settings feature adds a comprehensive settings page to Stellar Tip Jar, accessible at `/settings`. It allows authenticated users (wallet-connected) to manage their public creator profile, upload an avatar, configure display preferences (theme, currency), and control notification settings. All settings are persisted via the backend API and validated client-side with Zod schemas before submission.

## Glossary

- **Settings_Page**: The Next.js page rendered at `/settings` that hosts all settings sections.
- **Profile_Form**: The form component responsible for editing display name, bio, username, and preferred asset.
- **Avatar_Uploader**: The component that handles image file selection, preview, and upload to the backend.
- **Preferences_Form**: The form component for UI preferences such as theme and default currency display.
- **Notification_Form**: The form component for toggling notification channels and event types.
- **Settings_Service**: The API service module that handles all settings-related HTTP requests.
- **Settings_Schema**: The Zod validation schema for all settings form inputs.
- **User**: An authenticated visitor whose wallet is connected via Freighter.
- **Wallet**: The Freighter browser extension providing the user's Stellar public key.
- **Public_Key**: The Stellar account address used as the unique user identifier.

---

## Requirements

### Requirement 1: Access Control

**User Story:** As a visitor, I want the settings page to be protected, so that only wallet-connected users can view or modify settings.

#### Acceptance Criteria

1. WHEN a user navigates to `/settings` without a connected wallet, THE Settings_Page SHALL redirect the user to the home page (`/`).
2. WHEN a user connects their wallet, THE Settings_Page SHALL load and display the settings interface.
3. WHILE the wallet connection status is being determined, THE Settings_Page SHALL display a loading indicator instead of the settings content.

---

### Requirement 2: Profile Editing

**User Story:** As a creator, I want to edit my public profile, so that supporters can find and recognize me.

#### Acceptance Criteria

1. THE Profile_Form SHALL provide input fields for: display name (max 50 characters), username (max 30 characters, alphanumeric and hyphens only), bio (max 300 characters), and preferred Stellar asset code (max 12 characters, alphanumeric only).
2. WHEN a user submits the Profile_Form with valid data, THE Settings_Service SHALL send a PATCH request to `/users/profile` with the updated fields.
3. WHEN the Profile_Form is first rendered, THE Profile_Form SHALL pre-populate all fields with the user's current profile data fetched from `/users/profile`.
4. IF the Profile_Form submission fails due to a network or API error, THEN THE Profile_Form SHALL display a descriptive error message without clearing the form fields.
5. WHEN the Profile_Form submission succeeds, THE Profile_Form SHALL display a success confirmation message.
6. WHEN a user enters a username that is already taken, THE Settings_Service SHALL return a 409 conflict response, and THE Profile_Form SHALL display a "Username already taken" error on the username field.

---

### Requirement 3: Avatar Upload

**User Story:** As a creator, I want to upload a profile avatar, so that my profile is visually identifiable.

#### Acceptance Criteria

1. THE Avatar_Uploader SHALL accept image files of type JPEG, PNG, or WebP with a maximum file size of 2 MB.
2. WHEN a user selects a valid image file, THE Avatar_Uploader SHALL display a preview of the selected image before upload.
3. WHEN a user confirms the upload, THE Avatar_Uploader SHALL send a multipart POST request to `/users/avatar`.
4. IF a user selects a file exceeding 2 MB or of an unsupported type, THEN THE Avatar_Uploader SHALL display a validation error and SHALL NOT initiate an upload request.
5. WHILE an avatar upload is in progress, THE Avatar_Uploader SHALL display an upload progress indicator and disable the upload button.
6. WHEN an avatar upload succeeds, THE Avatar_Uploader SHALL update the displayed avatar image to the newly uploaded image URL returned by the API.

---

### Requirement 4: Display Preferences

**User Story:** As a user, I want to configure display preferences, so that the app matches my personal workflow.

#### Acceptance Criteria

1. THE Preferences_Form SHALL provide a theme selector with options: "light", "dark", and "system".
2. THE Preferences_Form SHALL provide a default currency display selector with options: "XLM", "USD", and "EUR".
3. WHEN a user saves preferences, THE Settings_Service SHALL send a PATCH request to `/users/preferences` with the selected values.
4. WHEN the Preferences_Form is first rendered, THE Preferences_Form SHALL pre-populate all fields with the user's current preferences fetched from `/users/preferences`.
5. WHEN a user selects the "dark" or "light" theme and saves, THE Settings_Page SHALL apply the selected theme to the application immediately without requiring a page reload.
6. IF the preferences save request fails, THEN THE Preferences_Form SHALL display a descriptive error message and SHALL retain the previously saved preference values.

---

### Requirement 5: Notification Settings

**User Story:** As a creator, I want to control which notifications I receive, so that I am only alerted about events that matter to me.

#### Acceptance Criteria

1. THE Notification_Form SHALL provide toggle controls for the following notification types: "New tip received", "Tip milestone reached", and "Weekly summary".
2. THE Notification_Form SHALL provide toggle controls for the following notification channels: "Email" and "In-app".
3. WHEN a user saves notification settings, THE Settings_Service SHALL send a PATCH request to `/users/notifications` with the updated toggle states.
4. WHEN the Notification_Form is first rendered, THE Notification_Form SHALL pre-populate all toggles with the user's current notification settings fetched from `/users/notifications`.
5. IF the notification settings save request fails, THEN THE Notification_Form SHALL display a descriptive error message and SHALL revert the toggles to their last successfully saved state.

---

### Requirement 6: Account Actions

**User Story:** As a user, I want access to account-level actions, so that I can manage my account lifecycle.

#### Acceptance Criteria

1. THE Settings_Page SHALL display the user's connected Stellar Public_Key in a read-only field.
2. THE Settings_Page SHALL provide a "Disconnect Wallet" button that, when clicked, calls the wallet disconnect function from WalletContext and redirects the user to the home page.
3. THE Settings_Page SHALL provide a "Delete Account" button that, when clicked, displays a confirmation dialog before proceeding.
4. WHEN a user confirms account deletion, THE Settings_Service SHALL send a DELETE request to `/users/account`, and THE Settings_Page SHALL disconnect the wallet and redirect the user to the home page.
5. IF the account deletion request fails, THEN THE Settings_Page SHALL display a descriptive error message and SHALL NOT disconnect the wallet or redirect the user.

---

### Requirement 7: Form Validation

**User Story:** As a user, I want immediate feedback on invalid inputs, so that I can correct mistakes before submitting.

#### Acceptance Criteria

1. THE Settings_Schema SHALL define validation rules for all Profile_Form fields using Zod, consistent with the constraints defined in Requirement 2.
2. WHEN a user submits any settings form with invalid data, THE Settings_Schema SHALL surface field-level error messages inline beneath each invalid field.
3. WHEN a user corrects a previously invalid field, THE Settings_Schema SHALL clear the error for that field upon the next validation pass.
4. THE Settings_Schema SHALL validate the avatar file type and size client-side before any upload request is initiated, consistent with the constraints defined in Requirement 3.

---

### Requirement 8: Settings Navigation

**User Story:** As a user, I want to navigate between settings sections easily, so that I can find and update specific settings without scrolling through the entire page.

#### Acceptance Criteria

1. THE Settings_Page SHALL render a sidebar or tab navigation with links to each section: "Profile", "Preferences", "Notifications", and "Account".
2. WHEN a user clicks a section link, THE Settings_Page SHALL scroll to or display the corresponding settings section.
3. THE Navbar SHALL include a link to `/settings` that is visible only WHILE a wallet is connected.
