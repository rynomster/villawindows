# Villa Windows — Design System (v2, Premium Refresh)

> **For AI agents (e.g. reasonix):** This document is the single source of truth for the
> visual refresh. It is written so you can implement it **without seeing the site**. Every
> value below is concrete (hex, px, rem, seconds, easing). Apply it by editing
> `assets/css/style.css` (design tokens + component rules), `_layouts/default.html`
> (fonts, sticky-nav markup, scroll scripts), and the page `.md` files (hero markup).
> Read `AGENTS.md` first — Jekyll conventions, `relative_url`, image standards and the
> "professional, heritage-focused, reliable" tone still apply.

A sophisticated, **heritage-modern** aesthetic: quiet elegance with craft at the centre.
The refresh keeps the existing palette and serif identity but moves the site from flat and
static to a **layered, photographic, gently animated** experience — full-bleed image heroes,
a condensing sticky navigation, scroll-reveal motion, hover-zoom imagery, and a refined
type system.

---

## 0. What changed from v1 (apply these)

| Area | v1 (old) | v2 (this spec) |
|------|----------|----------------|
| Page background | warm off-white `#faf9f5` | clean white `#ffffff`, alternating with `#f2f5f6` |
| Body font | system sans (`-apple-system…`) | **Hanken Grotesk** (Google Font) |
| Hero | dark text-only block, no image | **full-bleed photo** + gradient overlay + ken-burns zoom + breadcrumb |
| Navigation | static bar | **fixed, transparent-over-hero → frosted-white on scroll**, + scroll-progress bar |
| Motion | basic reveal | reveal + stagger + hero parallax + image hover-zoom + FAQ accordion |
| Project gallery | fixed grid | responsive **masonry** (CSS columns), all 23 projects |
| Forms | N/A | Removed per latest instruction; replaced by direct contact methods. |

If a value here conflicts with the old CSS, **this document wins**.

---

## 1. Brand Personality

- **Craft-led** — quiet confidence, not loud salesmanship.
- **Heritage modern** — respects tradition, feels contemporary.
- **Warm & understated** — inviting, trustworthy, refined.
- **Premium restoration** — the feeling to leave a visitor with is *"these are high-end
  specialists I can trust with my villa."*

---

## 2. Colour Palette

Define these as CSS custom properties on `:root` in `assets/css/style.css`.

| Token | Hex / value | Usage |
|-------|-------------|-------|
| `--color-bg` | `#ffffff` | Default page / section background |
| `--color-bg-alt` | `#f2f5f6` | Alternating section background (cool light grey) |
| `--color-bg-card` | `#ffffff` | Card / container backgrounds |
| `--color-bg-dark` | `#0e1b25` | Dark sections (Why Us, hero base, dark CTA) |
| `--color-bg-darker` | `#0a151d` | Footer background |
| `--color-primary` | `#3d6d8c` | Muted slate-blue — CTAs, accents, mono labels, CTA band |
| `--color-primary-hover` | `#2d556e` | Primary button hover |
| `--color-primary-light` | `#9fc0d4` | Light blue-grey — labels/lines on dark, hero eyebrow |
| `--color-text` | `#12222e` | Headings & primary text (very dark navy) |
| `--color-text-body` | `#46535d` | Body copy on light backgrounds |
| `--color-text-soft` | `#5a666e` | Secondary body copy |
| `--color-text-muted` | `#bcc8ce` | Step numbers, metadata, faded text |
| `--color-text-inverse` | `#ffffff` | Text on dark backgrounds |
| `--color-text-inverse-muted` | `rgba(255,255,255,0.66)` | Muted text on dark |
| `--color-border` | `rgba(18,34,46,0.12)` | Subtle borders on light |
| `--color-border-grid` | `rgba(255,255,255,0.12)` | Grid borders on dark |
| `--overlay-image` | `linear-gradient(180deg, rgba(10,22,31,.55) 0%, rgba(10,22,31,.12) 30%, rgba(10,22,31,.35) 62%, rgba(10,22,31,.85) 100%)` | Hero photo overlay |
| `--overlay-card` | `linear-gradient(180deg, transparent 45%, rgba(10,22,31,.82))` | Gallery caption overlay |

**Selection:** `::selection { background:#3d6d8c; color:#fff; }`

---

## 3. Typography

Load via Google Fonts in `<head>` of `_layouts/default.html` (single `<link>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Token | Stack | Weights | Usage |
|-------|-------|---------|-------|
| `--font-heading` | `'Spectral', Georgia, 'Times New Roman', serif` | 400–500 (use 400 for large display) | All headings H1–H3, large numerals |
| `--font-body` | `'Hanken Grotesk', system-ui, -apple-system, sans-serif` | 400–700 | Body, navigation, buttons |
| `--font-mono` | `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` | 400–500 | Eyebrow labels, step numbers, breadcrumbs, metadata |

Set on body: `-webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;`
Headings: `letter-spacing:-.01em` (display H1 `-.015em`); `text-wrap:balance` on large headings.

### Size scale

```
--text-xs:    0.75rem   (12px)  mono labels, breadcrumb
--text-sm:    0.875rem  (14px)  body small, nav links (13.5px ok)
--text-base:  1rem      (16px)  body
--text-lg:    1.0625rem (17px)  intro / CTA body
--text-xl:    1.25rem   (20px)  project titles on overlays
--text-2xl:   1.375rem  (22px)  H3, feature/process titles
--text-3xl:   clamp(1.875rem, 4vw, 3.25rem)    H2 section headings
--text-4xl:   clamp(2.625rem, 7vw, 6rem)        H1 hero headings
--text-cta:   clamp(2.125rem, 5.5vw, 4.25rem)   CTA-band heading
```

### Line height
- Body: `1.65–1.7`
- Headings: `1.02–1.08` (tight, elegant)

### Eyebrow label pattern (`.label-mono`)
A short mono, uppercase, letter-spaced label preceded by a 30px rule. Reuse everywhere a
section is introduced:
```
font: var(--font-mono); font-size:12px; letter-spacing:.24em; text-transform:uppercase;
color: var(--color-primary);   /* on dark: var(--color-primary-light) */
/* preceding rule: 30px × 1px line in the same colour, 14px gap */
```

---

## 4. Spacing scale

```
--space-2:2px  --space-4:4px  --space-8:8px  --space-12:12px --space-16:16px
--space-20:20px --space-24:24px --space-32:32px --space-40:40px --space-48:48px
--space-56:56px --space-64:64px --space-80:80px
```

- **Section horizontal padding:** `clamp(20px, 5vw, 64px)`
- **Section vertical padding:** `clamp(70px, 10vw, 130px)`
- **Content max-width:** `1280px`, centred (`margin:0 auto`). Gallery may go to `1320px`.

---

## 5. Layout primitives

- **Two-column editorial blocks** (intro, service detail): CSS grid
  `repeat(auto-fit, minmax(320px, 1fr))`, gap `clamp(40px, 6vw, 90px)`, `align-items:center`.
  Alternate image/text side per block (use `order` to flip).
- **Card grids** (services, why-us): `repeat(auto-fit, minmax(260px, 1fr))`, gap 18–24px.
- Prefer **flex/grid with `gap`** over inline-block + margins.

---

## 6. Components

### 6.1 Sticky navigation (`<header>` in `default.html`)
- `position:fixed; top:0; left/right:0; z-index:120;` full-width, space-between layout.
- **Over the hero (scroll = 0):** transparent background; logo + links in **white**.
- **After scrolling > 60px:** background `rgba(255,255,255,0.92)`,
  `backdrop-filter:saturate(140%) blur(12px)`, `box-shadow:0 1px 0 rgba(18,34,46,.08)`;
  links switch to **`#12222e`**; vertical padding shrinks `22px → 14px`.
  Transition all of this with `.4s ease`.
- **Scroll-progress bar:** a 3px fixed bar at the very top, `background:var(--color-primary)`,
  width = scroll percentage, `z-index:200`.
- **Active page** link: `font-weight:700` + 2px bottom border in current colour.
- Implement the colour/condense swap with a small scroll listener (see §7) — toggling a
  `.is-scrolled` class on `<header>` is the cleanest Jekyll-friendly approach, with all the
  above expressed as CSS on `header.is-scrolled`.
- Keep the existing checkbox hamburger for mobile; ensure the toggle is visible in both
  transparent and frosted states (use `currentColor`).

### 6.2 Hero (`.hero`) — full-bleed photographic
Replace the old text-only hero. Structure per page:
```
section.hero (position:relative; min-height:100svh on home, clamp(380px,54vh,540px) on inner;
              display:flex; align-items:flex-end; overflow:hidden; background:#0e1b25)
  > div.hero-media (position:absolute; inset:-6% 0)  img object-fit:cover
  > div.hero-overlay (position:absolute; inset:0; background:var(--overlay-image))
  > div.hero-inner (position:relative; z-index:3; max-width:1280px; padding-bottom:clamp(70px,11vh,130px))
      .label-mono (eyebrow / breadcrumb)
      h1
      p (max-width:46–52ch; color:rgba(255,255,255,.84))
      .hero-actions (primary + outline button)
```
- **Ken-burns:** animate the `img` `transform: scale(1.05) → scale(1.14)` over `22s ease-in-out
  infinite alternate`.
- **Parallax (home only):** translate `.hero-media` by `scrollY * 0.14px` in the scroll handler.
- **Entrance:** stagger eyebrow → h1 lines → p → buttons with a `rise` keyframe
  (`opacity:0; translateY(34px)` → `0`), `cubic-bezier(.16,1,.3,1)`, delays `.35s, .5s, .66s,
  .85s, 1s`.
- Inner pages use a shorter hero with a **breadcrumb** in `.label-mono`
  (`Home / Services`), Home link at 70% opacity.
- Home hero image: `assets/images/adobe-stock-sash-repair.jpg`. Inner-page heroes pick a
  relevant image (Services → `screenshot-retrofit-double-glazing.png` or the sash-repair shot;
  Projects → `grange.jpg`; FAQ → `screenshot-service-maintenance.png`; Estimate →
  `casement-window-button.png`). Always set descriptive `alt`.

### 6.3 Buttons (`.btn`)
- Primary: `background:var(--color-primary); color:#fff;` `border-radius:2px;`
  padding `16px 28px` (hero/CTA `17px 30px`); `font:600 14px var(--font-body);`
  `letter-spacing:.05em; text-transform:uppercase;`
  hover → `background:var(--color-primary-hover); transform:translateY(-2px);` (transition `.3s`).
- `.btn--outline`: `1px solid rgba(255,255,255,.5); color:#fff; background:transparent;`
  hover → `background:rgba(255,255,255,.12)`.
- `.btn--white` (on coloured bands): `background:#fff; color:#12222e;`
  hover → `translateY(-2px)` + `box-shadow:0 20px 40px -20px rgba(0,0,0,.5)`.
- **No heavy shadows** — favour the clean lift.

### 6.4 Homepage services list (`.service-items`)
Keep the existing numbered-list pattern but as a refined process list:
- Each `.service-item` separated by `1px solid var(--color-border)` top borders.
- `.service-step`: Spectral 30px, `color:var(--color-text-muted)` (last/active item
  `var(--color-primary)`), min-width 54px.
- Title Spectral 22px `#12222e`; body 15px `var(--color-text-soft)`, max-width ~48ch.
- Left column (intro + CTA) may be `position:sticky; top:110px` on wide screens.

### 6.5 Service cards (Services page / Home "what we do" grid)
- `background:#fff; border-radius:3px; overflow:hidden;` photo on top (`aspect-ratio:4/3`,
  `object-fit:cover`), text body below.
- Mono index label (`SASH · 01`), Spectral 21px title, soft body, "Learn more →" in
  `var(--color-primary)` uppercase 13px.
- **Hover:** card `translateY(-8px)` + `box-shadow:0 30px 60px -34px rgba(14,27,37,.45)`;
  inner image `scale(1.07)` over `1.1s cubic-bezier(.16,1,.3,1)`.

### 6.6 Feature grid — "Why Us" (`.features-grid` / `.feature-item`)
- Dark section `background:var(--color-bg-dark)`.
- Grid with 1px hairlines between cells: wrap in a container with
  `background:var(--color-border-grid)` and `gap:1px`, each `.feature-item` solid `#0e1b25`,
  padding `36px 32px`.
- `.feature-num`: JetBrains Mono 12px `var(--color-primary-light)`.
- Title Spectral 22px white; body 14.5px `var(--color-text-inverse-muted)`.

### 6.7 Project gallery (`our-projects.md`) — masonry, all projects
- **All 23 projects** must render (see image list §9). Use a CSS **columns** masonry so
  varied photo heights pack naturally:
  `column-width:320px; column-gap:18px;` and each tile
  `break-inside:avoid; -webkit-column-break-inside:avoid; margin:0 0 18px;`
  `border-radius:3px; overflow:hidden; position:relative;`
- `img { width:100%; height:auto; }`, `loading="lazy"`.
- **Caption overlay:** `var(--overlay-card)`, content bottom-left — mono category tag in
  `var(--color-primary-light)` + Spectral 20px white title.
- **Hover:** image `scale(1.06)` over `1.2s cubic-bezier(.16,1,.3,1)`.
- Keep the existing lightbox script working (add `.lightbox-trigger` to gallery imgs if desired).

### 6.8 FAQ accordion (`faqs.md`)
- Single-column, max-width 880px. Each item separated by `1px solid var(--color-border)` top rule.
- Button row: Spectral 18–23px question (left) + a 34px circular `+` icon (right).
  - Closed: circle `1px solid rgba(18,34,46,.2)`, `+` in `#12222e`.
  - Open: circle filled `var(--color-primary)`, icon white, **rotate 135°** (becomes ×),
    transition `.4s cubic-bezier(.16,1,.3,1)`.
- Answer panel animates `max-height 0 → ~320px` + `opacity 0 → 1` over `.5s`. One open at a time.
- Implement with minimal JS (toggle an `.open` class) — no framework.

### 6.9 Free-estimate form (`free-estimate.md`)
- Two-column: form (1.4fr) + contact sidebar (1fr), gap `clamp(36px,5vw,72px)`.
- Fields: `border:1px solid rgba(18,34,46,.18); border-radius:2px; padding:14px 16px;`
  focus → `border-color:var(--color-primary); box-shadow:0 0 0 3px rgba(61,109,140,.12);`
  Style the `<select>` with a custom SVG chevron.
- Sidebar: a dark `#0e1b25` card with the phone number in Spectral 34px, plus a bordered card
  with email / area / guarantee.
- On submit, show an **animated success card** (check icon in a `var(--color-primary)` circle,
  `pop` keyframe `scale(.85)→1`). If kept static (no JS), at minimum style a thank-you state.

### 6.10 CTA band (`.cta-box`)
- Two variants: `var(--color-primary)` (slate-blue) or `var(--color-bg-dark)`.
- Faint vertical **pane grid** motif overlay (`repeat(4,1fr)` columns with
  `1px rgba(255,255,255,.1)` right borders, `opacity:.5`).
- Centred eyebrow + Spectral CTA heading (`--text-cta`) + body + two buttons.

### 6.11 Footer
- `background:var(--color-bg-darker)`; 4-column grid (brand, quick links, explore, contact).
- Links hover → `var(--color-primary-light)`. Bottom row: copyright + mono tagline,
  separated by `1px solid rgba(255,255,255,.1)`.

---

## 7. Motion & interaction

Add to the existing script block in `_layouts/default.html`. Respect
`@media (prefers-reduced-motion: reduce)` by skipping transforms.

- **Scroll reveal** (reuse existing `.reveal` mechanism): start
  `opacity:0; transform:translateY(24–30px)`; on enter add `.active` →
  `opacity:1; transform:none`. Transition `.85–.9s cubic-bezier(.16,1,.3,1)`.
  Prefer `IntersectionObserver` (threshold ~0.12, `rootMargin:0 0 -6% 0`) over scroll math
  for performance; keep the current scroll fallback if simpler.
- **Stagger:** sequential children offset by `0.08–0.16s` (set `transition-delay` inline or via
  `:nth-child`).
- **Sticky-nav condense + colour swap + progress bar + hero parallax:** one passive
  `scroll` listener toggling `header.is-scrolled`, setting the progress-bar width, and (home
  only) translating `.hero-media`. Throttle is unnecessary if it only writes a class + two
  style props.
- **Image hover-zoom:** `transform:scale(1.06–1.07)` over `1.1–1.2s cubic-bezier(.16,1,.3,1)`
  inside an `overflow:hidden` parent.
- **Standard easing everywhere:** `cubic-bezier(.16,1,.3,1)`.
- **Keyframes to define:** `kb` (ken-burns), `rise` (entrance), `floatY` (scroll cue),
  `pop` (form success), `paneIn` (overlay fade).

---

## 8. Borders, radius, elevation

- `border-radius:2px` for cards/buttons/inputs; `3px` for image containers.
- Borders `1px solid rgba(...)` — hairline, never heavy.
- Shadows only on hover lift: `0 30px 60px -34px rgba(14,27,37,.45)` (cards),
  `0 20px 40px -20px rgba(0,0,0,.5)` (white button on colour).

---

## 9. Imagery

All images already live in `assets/images/` (per `AGENTS.md`: max 1920px, JPEG photos / PNG
graphics, descriptive alt). Reference with `{{ '/assets/images/NAME' | relative_url }}`.

**Projects gallery — render all 23** (filename → suggested title → category tag):

```
villa-street.png                  Villa Street                   RESTORATION
liv2.png                          Living Room Double Glazing      DOUBLE-GLAZING
double-glazed-villa-1-tall.png    Double Glazed Villa             DOUBLE-GLAZING
23-john.png                       23 John Street                  RESTORATION
thi.png                           Timber Window Restoration       RESTORATION
liz-house.png                     Liz's House                     DOUBLE-GLAZING
simon-peat.png                    Simon Peat Project              RESTORATION
liz-loft.png                      Liz's Loft                      RESTORATION
casement-win-2.png                Casement Window Retrofit        CASEMENT
dgu-1.png                         DGU Installation                DOUBLE-GLAZING
grange.jpg                        The Grange Restoration          RESTORATION
french-doors.png                  Custom French Doors             JOINERY
andy-lamb.png                     Andy Lamb Joinery               JOINERY
cathedral-glass.png               Cathedral Glass Feature         GLASS FEATURE
etchlite.png                      Etchlite Glass Installation     GLASS FEATURE
project-detail-1.png              Sash Component Detail           DETAIL
project-detail-2.png              Window Frame Restoration        RESTORATION
project-detail-3.png              Joinery Craftsmanship           JOINERY
project-detail-4.png              Double Glazing Seal             DETAIL
project-detail-5.png              Workshop Progress               WORKSHOP
project-detail-6.png              Heritage Window Profile         DETAIL
project-detail-7.png              Finished Timber Joinery         JOINERY
project-detail-8.png              Sash Window Install             SASH
```

(Titles/tags are editorial suggestions — confirm with the client where a real project name exists.)

---

## 10. Responsive breakpoints

```
--bp-sm:480px  --bp-md:768px  --bp-lg:1024px  --bp-xl:1280px
```
Mobile-first. Two-column blocks collapse to one column (auto-fit handles this). Hero text
scales via the `clamp()` sizes above. Nav collapses to the existing hamburger below `--bp-md`.

---

## 11. Accessibility

- Visible `:focus-visible` on all interactive elements (2–3px ring in `var(--color-primary)`).
- Contrast ≥ 4.5:1 for body text (white-on-`#0e1b25` and `#12222e`-on-white both pass).
- One `<h1>` per page; semantic `header/main/section/footer`.
- `alt` on every image; `aria-label` on the nav toggle.
- Honour `prefers-reduced-motion: reduce` — disable ken-burns, parallax, reveal transforms.

---

## 12. Implementation checklist (for reasonix)

1. Add the Google Fonts `<link>` to `_layouts/default.html` `<head>`.
2. Update `:root` tokens in `assets/css/style.css` to §2 / §3 / §4.
3. Rework `<header>` markup + add `.is-scrolled` styles, scroll-progress bar, active-link state.
4. Rebuild `.hero` as the photographic layout (§6.2); update each page's hero markup in its `.md`.
5. Restyle buttons, service list, service cards, why-us grid, CTA band, footer (§6).
6. Convert `our-projects.md` to the masonry gallery with all 23 images (§6.7 / §9).
7. Build the FAQ accordion (§6.8) and the estimate form styles + success state (§6.9).
8. Extend the script block: IntersectionObserver reveals, sticky-nav condense, parallax,
   keyframes (§7).
9. Verify with Playwright screenshots (per `AGENTS.md`); check reduced-motion and mobile.

---

*Heritage modern. Quiet elegance. Craft at the centre.*
