## 2026-06-29 - [Custom Lightbox Accessibility]
**Learning:** Custom lightboxes often neglect keyboard navigation and focus management. Simply showing an overlay is not enough; it must behave like a modal dialog (Escape to close, focus trapping, and restoring focus to the trigger).
**Action:** When implementing or fixing lightboxes, always ensure they have a `role="dialog"`, `aria-modal="true"`, and a script to handle focus and keyboard events.

## 2026-06-29 - [Accessible Checkbox Toggles]
**Learning:** Using `display: none` on a checkbox-based toggle (like a hamburger menu) removes it from the keyboard tab order, making it impossible for keyboard users to open the menu.
**Action:** Use a visually hidden pattern (sr-only) for the checkbox to keep it focusable, and use the `:focus-visible` pseudo-class on the checkbox to apply a visible focus indicator to the associated label.

## 2026-07-30 - [Gallery Progress Indicators]
**Learning:** In large image galleries, users can lose sense of their position. Providing a visual position indicator (e.g., "3 / 23") improves orientation and sets expectations for total content.
**Action:** Always include a dynamic counter or progress indicator in lightbox galleries to enhance user navigation and spatial awareness.

## 2026-07-01 - [Non-blocking Gallery Overlays]
**Learning:** Absolute-positioned overlays (like project captions) can unintentionally block mouse interactions with underlying elements, even when they appear visually transparent.
**Action:** Apply `pointer-events: none` to hover overlays to ensure clicks and touch events pass through to the primary interactive element (e.g., a lightbox trigger) underneath.

## 2026-07-03 - [Safe Global Event Listeners]
**Learning:** In multi-page static sites like Jekyll, global event listeners (e.g., for navigation Escape keys) in the main layout must be safely guarded with null checks. Attempting to access properties of elements that might not exist on every page (like a mobile nav toggle) will cause a TypeError and potentially break all other site scripts.
**Action:** Always check for element existence before accessing properties in global listeners: `if (el && el.property)`.

## 2026-07-05 - [Accessible Gallery Tiles]
**Learning:** Image tiles with hover-only captions are inaccessible to keyboard users. Using `:focus-within` on the tile container allows keyboard users to reveal captions and trigger scaling effects when they tab to the underlying link or button.
**Action:** Always pair `:hover` styles with `:focus-within` for interactive content overlays to maintain parity between mouse and keyboard experiences.

## 2026-07-05 - [Smooth Modal Transitions]
**Learning:** The `display` property cannot be animated. To achieve smooth entrance/exit animations for modals or lightboxes, use a combination of `opacity`, `visibility`, and `transition`.
**Action:** For accessible and smooth modals, toggle a class that sets `opacity: 1` and `visibility: visible` instead of switching `display: flex` to `none`.

## 2025-05-14 - Success Feedback for External Form Actions
**Learning:** For forms that transition to external apps (e.g., WhatsApp or Email), providing an immediate, accessible "Request Prepared" success state within the web app is critical. It eliminates the "did it work?" uncertainty if the external app is slow to open or opens in the background. Using `role="alert"`, focus management, and `scrollIntoView` ensures all users, including those using screen readers, receive this confirmation.
**Action:** Always implement a terminal success state for lead-gen forms, even if the primary action happens in an external client. Ensure the confirmation is programmatically focused and visually prominent.

## 2025-05-15 - [High-Contrast Focus Indicators for Dark Backgrounds]
**Learning:** A single global focus ring color rarely works across both light and dark backgrounds. On dark heritage-themed sites, standard primary brand colors (like muted slate-blue) often lack the 3:1 or 4.5:1 contrast ratio required for accessibility.
**Action:** Always define context-aware focus indicators. Use lighter variants of the brand palette for dark sections (`.bg-dark`, `.hero`, `footer`) to ensure the focus state is clearly visible to keyboard users.

## 2025-05-16 - [Contextual Scroll Locking for Mobile Menus]
**Learning:** Global scroll locking (e.g., `overflow: hidden` on the body) for mobile menus must be viewport-aware. Applying it unconditionally when the menu is 'open' can break desktop layouts if a user resizes their browser while the mobile menu state is technically still active.
**Action:** Restrict scroll-lock classes (`.nav-open`) to mobile-specific media queries in CSS to ensure the body remains scrollable if the viewport expands, even if the toggle state hasn't been manually cleared.

## 2025-05-16 - [Descriptive Context for Repetitive Call-to-Actions]
**Learning:** Call-to-action links with generic text like "Learn More" or "Read More" create a poor experience for screen reader users when multiple instances exist on a single page. Screen readers often present links in a list, where identical text provides zero context about the destination.
**Action:** Always augment repetitive "Learn More" links with `aria-label` attributes that provide specific context (e.g., "Learn more about [Service Name]") to meet WCAG 2.4.4 (Link Purpose).

## 2025-05-17 - [Visual Parity for Keyboard Users via :focus-within]
**Learning:** Visual feedback on hover (like card elevation or shadows) is often lost for keyboard users. Using `:focus-within` on the parent container ensures that when a user tabs into a child link, the entire component provides the same interactive feedback as a mouse hover.
**Action:** Always pair `:hover` effects on interactive cards with `:focus-within` to maintain visual and state parity across input methods.

## 2025-05-18 - [Dynamic Lightbox Captions with Live Region Synchronization]
**Learning:** When displaying visual media in a lightbox, visual and non-visual context must remain fully synchronized. Relying solely on a numeric progress counter (e.g., "3 / 23") fails to explain the context of what is being viewed. Dynamically mirroring the source image's `alt` text to a visible, high-contrast overlay that uses `aria-live="polite"` satisfies both sighted and assistive technology users simultaneously.
**Action:** When implementing interactive galleries, map existing semantic image data (like `alt` text) to a visible caption overlay, and ensure it is marked as an ARIA live region so dynamic content updates are announced seamlessly.

## 2026-07-10 - [Off-screen Mobile Menu Focus Leak]
**Learning:** Fixed-position mobile menus styled with off-screen positioning (e.g., `right: -100%`) can still receive focus and be navigated by keyboard users via the Tab key when closed. This creates a confusing experience as the page's focus indicator disappears into the invisible sidebar.
**Action:** Apply `visibility: hidden` and a transition on the visibility property to off-screen elements when closed, and switch to `visibility: visible` when open, effectively removing off-screen links from the tab order.

## 2026-07-12 - [Backup Copy Action for Form Redirects]
**Learning:** When forms redirect users to external protocols (like `wa.me` WhatsApp links or `mailto:` mail clients), there is an inherent risk that the native app fails to launch or launch blocker settings disrupt the workflow. Providing a copy-to-clipboard fallback button on the terminal success screen allows users to preserve and manually send their prepared request details easily.
**Action:** Always complement external protocol redirects on forms with a styled copy backup button on the success panel, utilizing appropriate ARIA labels and visual state resets to ensure accessible success feedback.
