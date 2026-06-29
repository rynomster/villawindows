# Villa Windows — Modern Design System

This design system defines the visual language for Villa Windows. It balances heritage character (timber joinery, craftsmanship) with a clean, modern, fully responsive web experience.

---

## Brand Personality

- **Heritage-rooted** – respects the craft of timber windows
- **Modern & trustworthy** – clean, confident, professional
- **Warm & approachable** – a family business you can trust

---

## Color Palette

| Token             | Hex       | Usage                                           |
|-------------------|-----------|--------------------------------------------------|
| `--color-primary` | `#0056b3` | Main brand colour, primary buttons, key links    |
| `--color-primary-dark` | `#003d80` | Hover states for primary elements             |
| `--color-accent`  | `#C8962E` | Warm accent — secondary CTAs, highlights, badges |
| `--color-accent-dark` | `#A87A1E` | Hover for accent elements                     |
| `--color-bg`      | `#ffffff` | Page background                                  |
| `--color-bg-alt`  | `#f7f8fa` | Alternating section backgrounds (light grey)     |
| `--color-bg-dark` | `#1a1d23` | Footer and dark sections                         |
| `--color-text`    | `#2d3436` | Primary body text                                |
| `--color-text-light` | `#636e72` | Secondary text                               |
| `--color-text-inverse` | `#ffffff` | Text on dark backgrounds                    |
| `--color-border`  | `#e1e4e8` | Card borders, dividers                           |
| `--color-success` | `#27ae60` | Success states, guarantees                       |
| `--color-whatsapp` | `#25D366` | WhatsApp brand colour                          |

---

## Typography

| Token                  | Font                            | Weight     | Usage                     |
|------------------------|---------------------------------|------------|---------------------------|
| `--font-heading`       | `'Playfair Display', serif`     | 600–700    | H1–H3 headings            |
| `--font-body`          | `'Inter', system-ui, sans-serif` | 400–600    | Body text, navigation     |
| `--font-mono`          | `'JetBrains Mono', monospace`   | 400        | Technical content (rare)  |

### Size Scale (mobile → desktop)

```
--text-xs:   0.75rem  (12px)
--text-sm:   0.875rem (14px)
--text-base: 1rem     (16px)
--text-lg:   1.125rem (18px)
--text-xl:   1.25rem  (20px)
--text-2xl:  1.5rem   (24px)
--text-3xl:  1.875rem (30px)
--text-4xl:  2.25rem  (36px) → 3rem (48px) on desktop
```

### Line Height
- Body: `1.7` for readability
- Headings: `1.2` for tight, impactful headers

---

## Spacing

Based on a 4px grid. Core scale:

```
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-10: 2.5rem   (40px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-20: 5rem     (80px)
```

---

## Components

### Buttons

```css
.btn {
  --btn-bg: var(--color-primary);
  --btn-color: white;
  background: var(--btn-bg);
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,86,179,0.25);
}
.btn--accent {
  --btn-bg: var(--color-accent);
}
.btn--outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}
```

### Cards
- White background, `--color-border` border
- `border-radius: 12px`
- Subtle shadow (`0 2px 8px rgba(0,0,0,0.06)`)
- Hover: lift 4px with deeper shadow
- Image at top with `object-fit: cover`, `aspect-ratio: 4/3`

### Feature Items
- Clean grid layout, 3-column on desktop, 2 on tablet, 1 on mobile
- Icon or emoji accent at top
- Heading in accent colour with subtle underline

### Project Gallery
- Masonry-style or uniform grid
- Lightbox on click with smooth overlay
- Subtle zoom effect on hover

### Hero Sections
- Full-width background image with gradient overlay (not flat rgba)
- Gradient: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)`
- Centred content with max-width constraint
- CTA button prominently displayed

---

## Responsive Breakpoints

```
--bp-sm:  480px   (small phones)
--bp-md:  768px   (tablets)
--bp-lg:  1024px  (small desktops)
--bp-xl:  1280px  (large desktops)
```

### Mobile-First Approach
- Default styles target mobile (360px+)
- `@media (min-width: 768px)` for tablet
- `@media (min-width: 1024px)` for desktop

---

## Shadows

```
--shadow-sm:   0 1px 3px rgba(0,0,0,0.08)
--shadow-md:   0 4px 12px rgba(0,0,0,0.1)
--shadow-lg:   0 8px 30px rgba(0,0,0,0.12)
--shadow-xl:   0 20px 60px rgba(0,0,0,0.15)
```

---

## Animations

- **Reveal on scroll**: elements fade in + translateY(20px) → translateY(0) over 0.6s
- **Button hover**: lift + shadow deepen over 0.25s
- **Card hover**: lift 4px + shadow grow over 0.3s
- **Navigation**: smooth transition, mobile menu slides in from right
- **Page transitions**: subtle fade on load

---

## Accessibility

- All interactive elements must have visible focus states (`:focus-visible`)
- Minimum colour contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Skip-to-content link (hidden until focused)
- Proper ARIA labels on navigation toggle
- All images require descriptive `alt` text
- Semantic HTML5 elements throughout

---

## SEO & LLM Considerations

- Structured data (JSON-LD) for LocalBusiness, Service, FAQ
- `jekyll-seo-tag` handles meta — don't duplicate
- Heading hierarchy: exactly one H1 per page, logical H2/H3 nesting
- Descriptive title tags (60 chars) and meta descriptions (160 chars)
- Open Graph tags for social sharing

---

## Image Standards

- Max width: 1920px
- Format: JPEG (photos) or WebP with JPEG fallback
- Descriptive `alt` text required
- Optimised for web (< 200KB per image where possible)
- Aspect ratio maintained with `object-fit: cover`
