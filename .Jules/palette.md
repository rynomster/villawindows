## 2026-06-29 - [Custom Lightbox Accessibility]
**Learning:** Custom lightboxes often neglect keyboard navigation and focus management. Simply showing an overlay is not enough; it must behave like a modal dialog (Escape to close, focus trapping, and restoring focus to the trigger).
**Action:** When implementing or fixing lightboxes, always ensure they have a `role="dialog"`, `aria-modal="true"`, and a script to handle focus and keyboard events.

## 2026-06-29 - [Accessible Checkbox Toggles]
**Learning:** Using `display: none` on a checkbox-based toggle (like a hamburger menu) removes it from the keyboard tab order, making it impossible for keyboard users to open the menu.
**Action:** Use a visually hidden pattern (sr-only) for the checkbox to keep it focusable, and use the `:focus-visible` pseudo-class on the checkbox to apply a visible focus indicator to the associated label.
