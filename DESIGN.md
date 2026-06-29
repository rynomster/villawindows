# Villa Windows — Design System

Based on the reference design system. A sophisticated, heritage-modern aesthetic — quiet elegance with craft at the centre.

---

## Brand Personality

- **Craft-led** — quiet confidence, not loud salesmanship
- **Heritage modern** — respects tradition, feels contemporary
- **Warm & understated** — inviting, trustworthy, refined

---

## Color Palette

| Token               | Hex       | Usage                                            |
|---------------------|-----------|--------------------------------------------------|
| `--color-bg`        | `#faf9f5` | Page background (warm off-white)                  |
| `--color-bg-card`   | `#ffffff` | Card / container backgrounds                      |
| `--color-bg-dark`   | `#0e1b25` | Dark sections (Why Us, footer)                    |
| `--color-bg-darker` | `#0a151d` | Footer background                                 |
| `--color-primary`   | `#3d6d8c` | Muted slate blue — CTAs, accents, section labels  |
| `--color-primary-light` | `#9fc0d4` | Light blue-grey — secondary labels, lines       |
| `--color-text`      | `#12222e` | Primary heading / body text (very dark navy)      |
| `--color-text-body` | `#5a666e` | Body text (medium grey)                           |
| `--color-text-muted`| `#bcc8ce` | Faded text, step numbers, metadata                |
| `--color-text-inverse` | `#ffffff` | Text on dark backgrounds                        |
| `--color-text-inverse-muted` | `rgba(255,255,255,0.66)` | Muted text on dark bg           |
| `--color-border`    | `rgba(18,34,46,0.12)` | Subtle borders (light)                |
| `--color-border-grid` | `rgba(255,255,255,0.12)` | Grid borders on dark bg        |

---

## Typography

| Token              | Font                                     | Weight | Usage                  |
|--------------------|------------------------------------------|--------|------------------------|
| `--font-heading`   | `'Spectral', Georgia, 'Times New Roman', serif` | 400–500 | All headings (H1–H3) |
| `--font-body`      | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | 400–600 | Body, navigation |
| `--font-mono`      | `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` | 400–500 | Labels, section numbers, metadata |

### Size Scale

```
--text-xs:   0.75rem  (12px) — mono labels
--text-sm:   0.875rem (14px) — body small
--text-base: 1rem     (16px) — body
--text-lg:   1.0625rem (17px) — CTA body text
--text-xl:   1.25rem  (20px) — project titles (image overlays)
--text-2xl:  1.375rem (22px) — H3, feature titles
--text-3xl:  clamp(1.875rem, 4vw, 3.25rem) — H2
--text-4xl:  clamp(2.125rem, 5.5vw, 4.25rem) — H1 (CTA heading)
```

### Line Height
- Body: `1.65`
- Headings: `1.04–1.06` (tight, elegant)

---

## Spacing

```
--space-2:   0.125rem (2px)
--space-4:   0.25rem  (4px)
--space-8:   0.5rem   (8px)
--space-12:  0.75rem  (12px)
--space-16:  1rem     (16px)
--space-20:  1.25rem  (20px)
--space-24:  1.5rem   (24px)
--space-32:  2rem     (32px)
--space-36:  2.25rem  (36px)
--space-40:  2.5rem   (40px)
--space-48:  3rem     (48px)
--space-56:  3.5rem   (56px)
--space-64:  4rem     (64px)
--space-80:  5rem     (80px)
```

---

## Components

### Buttons
- Background filled `--color-primary` or white on dark sections
- `border-radius: 2px` (very subtle)
- Uppercase, 14px, 0.04em letter-spacing, weight 600
- Padding: 17px 30px (tall buttons)
- Hover: `translateY(-2px)` + deeper shadow
- No bold box-shadows — just clean lift

### Service Items (Homepage numbered list)
- Numbered list with step numbers in `--color-text-muted` or `--color-primary-light`
- Each item separated by `1px solid rgba(18,34,46,.12)` borders
- Clean grid layout, no card backgrounds
- Step number: Spectral serif, 30px, color #bcc8ce or #3d6d8c

### Feature Items (Why Us)
- Grid layout with 1px borders between items
- Dark background (`#0e1b25`)
- Numbered (01–06) in JetBrains Mono, `#9fc0d4`
- Title in Spectral 22px, color white
- Description in 14.5px, `rgba(255,255,255,0.66)`
- Grid border: `1px solid rgba(255,255,255,0.12)`

### Project Gallery
- Grid with `repeat(auto-fit, minmax(260px, 1fr))`, gap 18px
- Images with `object-fit: cover`
- Hover: scale 1.06 over 1.2s, smooth cubic-bezier
- Overlay: `linear-gradient(180deg, transparent 40%, rgba(10,22,31,.78))`
- Overlay labels: JetBrains Mono uppercase label + Spectral title

### Hero
- Full-width dark sections with monospace labels + large Spectral headings
- No background images with overlays — simpler, text-driven approach
- Large headings with thin weight (400), tight line-height (1.06)

---

## Responsive Breakpoints

```
--bp-sm:  480px
--bp-md:  768px
--bp-lg:  1024px
--bp-xl:  1280px
```

### Mobile-First
- Padding: `clamp(20px, 5vw, 64px)` on sections
- Section vertical padding: `clamp(70px, 10vw, 130px)`

---

## Animations

- **Scroll reveal**: opacity 0→1, translateY(24-30px)→0
- **Timing**: `.85s` to `.9s` cubic-bezier(.16,1,.3,1)
- **Stagger**: Sequential items offset by `0.08s`–`0.16s` increments
- **Hover (images)**: scale(1.06) over 1.2s cubic-bezier(.16,1,.3,1)

---

## Borders & Radius

- `border-radius: 2px` for all cards/buttons
- `border-radius: 3px` for image containers
- Borders are `1px solid rgba(...)` — very subtle
- No heavy shadows — favour clean lines

---

## Accessibility

- All interactive elements require visible `:focus-visible` states
- Contrast ratio minimum 4.5:1 for normal text
- Semantic HTML5 throughout
- Proper heading hierarchy (one H1 per page)
- Alt text on all images
- `aria-label` on navigation toggle
