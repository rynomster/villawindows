/**
 * Villa Windows - Production-Quality Google Analytics 4 Lead Tracking
 * Reusable analytics module designed for static sites.
 */

(function () {
    if (typeof window === 'undefined') return;

    // Deduplication cache and state
    const dedupeCache = new Map();
    let formStartFired = false;
    let viewFormFired = false;

    // Keys that may contain PII to be completely removed
    const PII_KEYS = ['name', 'phone', 'email', 'message', 'text', 'body', 'subject', 'address', 'street', 'details', 'tel'];

    /**
     * Sanitizes and normalizes event parameters to prevent PII leakage and clean up inputs.
     * @param {Object} params - Raw event parameters
     * @returns {Object} Cleaned parameters
     */
    function sanitizeParams(params) {
        if (!params) return {};
        const clean = {};
        for (const [key, val] of Object.entries(params)) {
            const keyLower = key.toLowerCase();

            // 1. Skip if the key is/contains a PII field name (except for safe parameter 'form_name')
            if (keyLower !== 'form_name' && PII_KEYS.some(pii => keyLower.includes(pii))) {
                continue;
            }

            // 2. Skip null, undefined, or empty values
            if (val === undefined || val === null || val === '') {
                continue;
            }

            // 3. Process string values
            if (typeof val === 'string') {
                const trimmed = val.trim();

                // Skip if the value contains an email address
                if (trimmed.includes('@')) {
                    continue;
                }

                // Skip if the value matches a phone number structure (7-20 digits, spaces, hyphens, plus)
                if (/^\+?[0-9\s-]{7,20}$/.test(trimmed)) {
                    continue;
                }

                clean[key] = trimmed;
            } else {
                clean[key] = val;
            }
        }
        return clean;
    }

    /**
     * Checks if the event-parameter combination is a duplicate within the last 3 seconds.
     * @param {string} eventName
     * @param {Object} params
     * @returns {boolean}
     */
    function isDuplicate(eventName, params) {
        const key = eventName + '_' + JSON.stringify(params);
        const now = Date.now();
        if (dedupeCache.has(key)) {
            const lastFired = dedupeCache.get(key);
            if (now - lastFired < 3000) { // 3-second deduplication window
                return true;
            }
        }
        dedupeCache.set(key, now);

        // Periodically clean cache to prevent memory footprint growth
        if (dedupeCache.size > 100) {
            for (const [k, t] of dedupeCache.entries()) {
                if (now - t > 10000) {
                    dedupeCache.delete(k);
                }
            }
        }
        return false;
    }

    /**
     * Resolves the link location of a DOM element based on its ancestors.
     * @param {HTMLElement} element
     * @returns {string}
     */
    function getLinkLocation(element) {
        if (!element) return 'body';

        const path = window.location.pathname;
        if (path.includes('/free-estimate') || path.includes('free-estimate')) {
            if (element.closest('.sidebar-card') || element.closest('.sidebar')) {
                return 'free_estimate_sidebar';
            }
            if (element.closest('#estimate-form')) {
                return 'free_estimate_form';
            }
            return 'free_estimate_page';
        }
        if (element.closest('#site-header') || element.closest('nav')) {
            return 'header';
        }
        if (element.closest('footer')) {
            return 'footer';
        }
        if (element.closest('.cta-box') || element.closest('.hero-actions')) {
            return 'cta_section';
        }
        if (element.closest('.sidebar')) {
            return 'sidebar';
        }
        if (element.closest('.contact-methods') || element.closest('.contact-links')) {
            return 'contact_section';
        }
        return 'body';
    }

    /**
     * Main event tracking function.
     * @param {string} eventName - GA4 event name
     * @param {Object} parameters - Parameters to track
     */
    window.trackEvent = function (eventName, parameters) {
        try {
            const cleanParams = sanitizeParams(parameters);

            // Prevent duplicate firings (e.g. from rapid double-clicks, React Strict Mode, rerenders)
            if (isDuplicate(eventName, cleanParams)) {
                return;
            }

            // Fire to GA4 if available
            if (window.gtag) {
                window.gtag('event', eventName, cleanParams);
            } else {
                console.warn(`GA4 trackEvent: window.gtag is unavailable. Event '${eventName}' not sent but safely caught.`, cleanParams);
            }
        } catch (e) {
            console.error('Error in trackEvent:', e);
        }
    };

    /**
     * Specialized lead tracking helper.
     * @param {string} method - 'whatsapp' or 'email'
     * @param {Object} parameters - Parameters describing the lead
     */
    window.trackLead = function (method, parameters) {
        try {
            const normalizedMethod = (method || '').toLowerCase();
            const baseParams = Object.assign({
                lead_method: normalizedMethod,
                page_path: window.location.pathname
            }, parameters);

            // 1. Fire primary key event: generate_lead
            window.trackEvent('generate_lead', baseParams);

            // 2. Fire supporting method-specific event
            if (normalizedMethod === 'whatsapp') {
                window.trackEvent('lead_whatsapp', baseParams);
            } else if (normalizedMethod === 'email') {
                window.trackEvent('lead_email', baseParams);
            }
        } catch (e) {
            console.error('Error in trackLead:', e);
        }
    };

    // --- DOM Event Interceptors ---
    document.addEventListener('DOMContentLoaded', function () {
        const path = window.location.pathname;

        // 1. Track view_estimate_form when the estimate page is viewed
        if ((path.includes('/free-estimate') || path.includes('free-estimate')) && !viewFormFired) {
            viewFormFired = true;
            window.trackEvent('view_estimate_form', {
                form_name: 'free_estimate',
                page_path: path
            });
        }

        // 2. Track estimate_form_start on first interaction with the estimate form
        const form = document.getElementById('estimate-form');
        if (form) {
            const handleFormStart = function () {
                if (!formStartFired) {
                    formStartFired = true;
                    window.trackEvent('estimate_form_start', {
                        form_name: 'free_estimate',
                        page_path: path
                    });
                    // Remove listeners to ensure it only fires once per page view
                    form.removeEventListener('input', handleFormStart);
                    form.removeEventListener('change', handleFormStart);
                }
            };
            form.addEventListener('input', handleFormStart);
            form.addEventListener('change', handleFormStart);
        }

        // 3. Track click_to_call for all tel: links globally
        document.body.addEventListener('click', function (e) {
            const telLink = e.target.closest('a[href^="tel:"]');
            if (telLink) {
                const linkLocation = getLinkLocation(telLink);
                window.trackEvent('click_to_call', {
                    link_location: linkLocation,
                    page_path: window.location.pathname
                });
            }
        });
    });

    // For testing/mocking accessibility
    window.__analyticsModule = {
        sanitizeParams,
        isDuplicate,
        getLinkLocation,
        clearDedupeCache: () => {
            dedupeCache.clear();
            formStartFired = false;
            viewFormFired = false;
        }
    };
})();
