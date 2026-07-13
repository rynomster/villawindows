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

## Google Analytics 4 (GA4) Tracking Setup

The website has a production-quality, privacy-safe, and fully-deduplicated Google Analytics 4 lead tracking implementation in `assets/js/analytics.js`.

### Configuration & Measurement ID
Since the site runs as a static Jekyll site hosted on GitHub Pages, GA4 configuration is managed globally via `_layouts/default.html` using the site's GA4 measurement ID: `G-M11MLN4ESE`.
If you need to customize or override the measurement ID based on environment variables or configuration files, update the Google Tag script block in `_layouts/default.html` or configure the measurement ID in `_config.yml`.

### Implemented Events

#### 1. Primary Key Event
- **`generate_lead`**: Fired only on genuine lead submission actions (immediately before opening WhatsApp or Email, after successful form validation).
  - *Parameters*:
    - `lead_method`: `'whatsapp'` or `'email'`
    - `service_type`: Service requested from form
    - `window_type`: Window type from form
    - `suburb`: Selected Auckland suburb
    - `form_name`: Name of the form (e.g. `'free_estimate'`)
    - `page_path`: Path of the page where the lead occurred

#### 2. Supporting Events
- **`lead_whatsapp`**: Fired simultaneously with a WhatsApp lead action.
- **`lead_email`**: Fired simultaneously with an Email lead action.
- **`click_to_call`**: Fired automatically on any telephone link click (`href^="tel:"`).
  - *Parameters*:
    - `link_location`: Dynamic identifier resolving to `'header'`, `'footer'`, `'free_estimate_sidebar'`, `'free_estimate_form'`, `'free_estimate_page'`, `'contact_section'`, `'cta_section'`, etc.
    - `page_path`: Current page pathname
- **`estimate_form_start`**: Fired on the first meaningful interaction (first keypress or dropdown change) on the estimate form. Fired only once per page view.
  - *Parameters*: `form_name`, `page_path`
- **`view_estimate_form`**: Fired automatically when the free estimate page is loaded.
  - *Parameters*: `form_name`, `page_path`

### Privacy & Safeguards (PII Protection)
To comply with global privacy rules, strict PII (Personally Identifiable Information) safeguards are implemented directly inside the sanitization layer of the analytics module:
1. **Key Filtering**: Any event parameter key containing blacklisted terms like `name`, `email`, `phone`, `tel`, `message`, `subject`, `text`, `body`, `address`, `street`, or `details` is completely excluded from being sent. (The only exception allowed is the safe structural key `form_name`).
2. **Value Filtering**: Any parameter value containing an `@` symbol (potential email) or structured like a phone number (7-20 digits with spaces/hyphens) is scrubbed and excluded.
3. **Value Normalization**: Empty strings, `null`, and `undefined` properties are systematically omitted to keep payloads clean.

### Deduplication Mechanism
Accidental double-counting of conversions (e.g. from rapid double-clicks, repeated event handlers, React Strict Mode, page re-renders, or event bubbling) is prevented:
- **Event Signature Debounce**: The script keeps a temporary signature cache of event-parameter hashes. If the exact same event and values are sent within 3 seconds, they are silently ignored.
- **State-based One-time Triggers**: Lifecycle events like `estimate_form_start` and `view_estimate_form` utilize dedicated state flags that ensure they fire exactly once per page view. When triggered, the form listeners are immediately detached.

### How to Verify & Test

#### 1. Google Tag Assistant
1. Visit [Google Tag Assistant](https://tagassistant.google.com/).
2. Enter the website URL: `https://www.villawindows.co.nz` (or your local testing address `http://localhost:4000` or similar).
3. Complete the form or click on a telephone link, and verify that the events (e.g. `view_estimate_form`, `estimate_form_start`, `click_to_call`, `generate_lead`) register in the Tag Assistant debug stream with the correct sanitized parameters.

#### 2. GA4 DebugView
1. Open Google Analytics 4 and go to **Admin > DebugView**.
2. Run the website with Google Tag Assistant or with the GA4 Chrome debugger extension active.
3. In GA4 DebugView, you will see a real-time stream of all user events. Look for the key event `generate_lead` and verify that the parameters (such as `suburb`, `service_type`, `window_type`, `lead_method`) appear correctly and contain absolutely no customer names, email addresses, or phone numbers.

#### 3. GA4 Realtime Report
1. In GA4, go to **Reports > Realtime**.
2. Perform interactions on the live site (e.g., click a phone number link).
3. Under the **Event count by Event name** card, check for the occurrence of `click_to_call` or `generate_lead` within a few minutes of your action.

## License
&copy; 2026 Villa Windows. All rights reserved.
