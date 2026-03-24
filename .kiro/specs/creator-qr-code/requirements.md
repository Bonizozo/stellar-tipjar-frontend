# Requirements Document

## Introduction

This feature adds QR code generation to creator profile pages in the Stellar Tip Jar frontend.
Each creator gets a QR code that encodes their profile URL, enabling visitors to scan and share
the profile on mobile devices or initiate tipping flows quickly. QR codes are rendered in the
browser, support configurable sizes, and can be downloaded as PNG images.

## Glossary

- **QR_Generator**: The client-side component responsible for generating and rendering QR code images from a creator profile URL.
- **Creator_Profile_URL**: The canonical URL of a creator's profile page, e.g. `https://<host>/creator/<username>`.
- **QR_Code_Image**: The visual QR code artifact rendered on screen and available for download.
- **Download_Handler**: The browser-side logic that converts the rendered QR code into a downloadable PNG file.
- **Size_Option**: A discrete pixel dimension (small: 128px, medium: 256px, large: 512px) the user may select for the QR code.
- **Creator_Profile_Page**: The Next.js page at `src/app/creator/[username]/page.tsx` that displays creator information and tipping UI.

---

## Requirements

### Requirement 1: QR Code Generation

**User Story:** As a visitor, I want to see a QR code on a creator's profile page, so that I can scan it with my phone to quickly open the profile or start a tip.

#### Acceptance Criteria

1. WHEN a creator profile page loads, THE QR_Generator SHALL render a QR_Code_Image encoding the Creator_Profile_URL for that creator.
2. THE QR_Generator SHALL embed the full absolute Creator_Profile_URL (scheme + host + path) in the QR code data.
3. WHEN the Creator_Profile_URL is scanned, THE resulting navigation SHALL open the correct creator profile page.
4. IF the Creator_Profile_URL cannot be determined, THEN THE QR_Generator SHALL display an error message in place of the QR_Code_Image.

---

### Requirement 2: Configurable QR Code Size

**User Story:** As a visitor, I want to choose the size of the QR code, so that I can get a version suitable for sharing or printing.

#### Acceptance Criteria

1. THE QR_Generator SHALL support three Size_Options: 128px (small), 256px (medium), and 512px (large).
2. WHEN a user selects a Size_Option, THE QR_Generator SHALL re-render the QR_Code_Image at the selected pixel dimension within 300ms.
3. THE QR_Generator SHALL default to the medium (256px) Size_Option on initial render.
4. THE QR_Code_Image SHALL maintain a 1:1 aspect ratio at all Size_Options.

---

### Requirement 3: QR Code Download

**User Story:** As a visitor, I want to download the QR code as an image file, so that I can share it offline or embed it in other materials.

#### Acceptance Criteria

1. WHEN a user activates the download control, THE Download_Handler SHALL initiate a browser file download of the QR_Code_Image as a PNG file.
2. THE Download_Handler SHALL name the downloaded file `qr-<username>.png` where `<username>` is the creator's username.
3. THE Download_Handler SHALL export the QR_Code_Image at the currently selected Size_Option resolution.
4. IF the browser does not support the download API, THEN THE Download_Handler SHALL open the QR_Code_Image in a new browser tab as a fallback.

---

### Requirement 4: Creator Info Overlay

**User Story:** As a visitor, I want the QR code display to show the creator's name alongside the code, so that I know whose profile the QR code belongs to.

#### Acceptance Criteria

1. THE QR_Generator SHALL display the creator's display name adjacent to the QR_Code_Image.
2. THE QR_Generator SHALL display the creator's username (formatted with `@` prefix) adjacent to the QR_Code_Image.
3. WHILE the QR_Code_Image is rendering, THE QR_Generator SHALL display a loading indicator in place of the QR_Code_Image.

---

### Requirement 5: Integration with Creator Profile Page

**User Story:** As a visitor, I want the QR code to appear naturally within the creator profile page, so that it is easy to find without disrupting the existing layout.

#### Acceptance Criteria

1. THE Creator_Profile_Page SHALL render the QR_Generator component within the existing profile card section.
2. THE QR_Generator SHALL be a client-side component and SHALL NOT block server-side rendering of the Creator_Profile_Page.
3. WHERE the application is accessed on a mobile viewport (width < 640px), THE QR_Generator SHALL stack its controls vertically to remain usable.
