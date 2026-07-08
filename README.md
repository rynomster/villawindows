# Villa Windows

Villa Windows is a Jekyll-based static website for a specialist timber joinery company in Auckland, New Zealand. The site focuses on sash windows, retrofit double-glazing, and general timber window maintenance.

This project was ported from an original WordPress site to a Jekyll-based static site for better performance, security, and hosting on GitHub Pages.

## URL
- **Live Site:** [https://www.villawindows.co.nz](https://www.villawindows.co.nz)

## Features
- **Jekyll Static Site:** Fast, secure, and easy to maintain.
- **SEO Optimized:** Uses `jekyll-seo-tag` and includes LocalBusiness and Service JSON-LD schemas for better search engine and AI visibility.
- **Mobile Responsive:** Modern, CSS-only responsive design.
- **Clean URLs:** Pretty permalinks for a professional appearance.
- **Asset Localization:** All images and styles are hosted locally within the repository.

## Development

### Prerequisites
- Ruby and Bundler (for running Jekyll)
- Python (optional, for simple local previewing of the file structure)

### Local Development
To run the site locally with Jekyll:
1. Install dependencies:
   ```bash
   bundle install
   ```
2. Build and serve:
   ```bash
   bundle exec jekyll serve
   ```
The site will be available at `http://localhost:4000`.

Alternatively, for quick structural verification without Liquid rendering:
```bash
python3 -m http.server 8000
```

### AI Agent Instructions
For AI agents working on this repository, please refer to [AGENTS.md](AGENTS.md) for specific coding conventions, image standards, and workflow instructions.

## Project Structure
- `_layouts/`: Jekyll layouts (e.g., `default.html`).
- `assets/`: Images (`assets/images/`) and stylesheets (`assets/css/`).
- `_config.yml`: Site-wide configuration and metadata.
- `CNAME`: Custom domain configuration for GitHub Pages.
- Markdown files (`.md`): Content pages (index, services, FAQs, etc.).

## License
&copy; 2026 Villa Windows. All rights reserved.
