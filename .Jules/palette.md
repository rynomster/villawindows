## 2026-06-29 - [Custom Lightbox Accessibility]
**Learning:** Custom lightboxes often neglect keyboard navigation and focus management. Simply showing an overlay is not enough; it must behave like a modal dialog (Escape to close, focus trapping, and restoring focus to the trigger).
**Action:** When implementing or fixing lightboxes, always ensure they have a `role="dialog"`, `aria-modal="true"`, and a script to handle focus and keyboard events.

## 2026-06-29 - [Accessible Checkbox Toggles]
**Learning:** Using `display: none` on a checkbox-based toggle (like a hamburger menu) removes it from the keyboard tab order, making it impossible for keyboard users to open the menu.
**Action:** Use a visually hidden pattern (sr-only) for the checkbox to keep it focusable, and use the `:focus-visible` pseudo-class on the checkbox to apply a visible focus indicator to the associated label.

## 2026-06-30 - [Gallery Progress Indicators]
**Learning:** In large image galleries, users can lose sense of their position. Providing a visual position indicator (e.g., "3 / 23") improves orientation and sets expectations for total content.
**Action:** Always include a dynamic counter or progress indicator in lightbox galleries to enhance user navigation and spatial awareness.

## 2026-07-03 - [Safe Global Event Listeners]
**Learning:** In multi-page static sites like Jekyll, global event listeners (e.g., for navigation Escape keys) in the main layout must be safely guarded with null checks. Attempting to access properties of elements that might not exist on every page (like a mobile nav toggle) will cause a TypeError and potentially break all other site scripts.
**Action:** Always check for element existence before accessing properties in global listeners: `if (el && el.property)`.
