# Instructions for AI Agents

Welcome! This repository is a Jekyll-based static site ported from WordPress for **Villa Windows**. To ensure consistency, SEO, and AI optimization, please follow these guidelines:

## Architecture & Technology
- **Jekyll**: The site is built with Jekyll. All content is in `.md` files with YAML front matter.
- **GitHub Pages**: Deployed via GitHub Pages. The `baseurl` in `_config.yml` is set to `""` (empty string) because the site uses a custom domain (`villawindows.co.nz`). Always use the `relative_url` filter for internal links and assets: `{{ '/path' | relative_url }}`.
- **Styling**: All styles are in `assets/css/style.css`. Avoid inline styles unless necessary for specific hero sections.

## Content Management
- **Front Matter**: Every page must have `layout`, `title`, and `description`.
- **SEO**: The `jekyll-seo-tag` plugin is used. Do not manually add meta tags to layouts; let the plugin handle them.
- **AI Optimization**: We use `LocalBusiness` JSON-LD schema in `_layouts/default.html`. If adding new services, consider updating the schema or adding page-specific `Service` schema.

## Image Standards
- **Localization**: All images must be stored in `assets/images/`.
- **Optimization**: Before adding new images, normalize them:
    - Max width: 1920px.
    - Format: JPEG (for photos) or PNG (for graphics).
    - Compression: Use `optimize: True` or equivalent Pillow/ImageMagick settings.
- **Alt Text**: Always provide descriptive `alt` text for images.

## Development Workflow
- **Local Testing**: You can test the site structure using `python3 -m http.server 8000`. Note that Liquid tags won't render in the Python server; they require a Jekyll build.
- **Verification**: Use Playwright scripts to take screenshots of changes for visual confirmation.

## Coding Conventions
- Use semantic HTML5 elements (`<header>`, `<main>`, `<footer>`, `<section>`).
- Maintain a consistent tone: professional, heritage-focused, and reliable.
