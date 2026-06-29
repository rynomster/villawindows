## 2026-06-29 - [Custom Lightbox Accessibility]
**Learning:** Custom lightboxes often neglect keyboard navigation and focus management. Simply showing an overlay is not enough; it must behave like a modal dialog (Escape to close, focus trapping, and restoring focus to the trigger).
**Action:** When implementing or fixing lightboxes, always ensure they have a `role="dialog"`, `aria-modal="true"`, and a script to handle focus and keyboard events.
