const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('path');

// Read and prepare the analytics module code
const analyticsCode = fs.readFileSync(path.join(__dirname, '../assets/js/analytics.js'), 'utf8');

// Global mock objects that remain active throughout the test suite
const dataLayer = [];
let gtagCalls = [];
const documentListeners = {};
const bodyListeners = {};
const formListeners = {};

const mockWindow = {
    location: {
        pathname: '/some-page'
    },
    dataLayer: dataLayer,
    gtag: function (type, eventName, parameters) {
        gtagCalls.push({ type, eventName, parameters: JSON.parse(JSON.stringify(parameters || {})) });
    },
    console: {
        log: () => {},
        warn: () => {},
        error: () => {}
    }
};

const mockDocument = {
    addEventListener: function (event, callback) {
        documentListeners[event] = callback;
    },
    getElementById: function (id) {
        if (id === 'estimate-form') {
            return {
                addEventListener: function (event, callback) {
                    if (!formListeners[event]) {
                        formListeners[event] = [];
                    }
                    formListeners[event].push(callback);
                },
                removeEventListener: function (event, callback) {
                    if (formListeners[event]) {
                        formListeners[event] = formListeners[event].filter(cb => cb !== callback);
                    }
                }
            };
        }
        return null;
    },
    body: {
        addEventListener: function (event, callback) {
            bodyListeners[event] = callback;
        }
    }
};

// Expose these as global variables so bare references like `window` and `document` work flawlessly in eval and callbacks
global.window = mockWindow;
global.document = mockDocument;

// Helper to run script initialization
function initializeAnalytics() {
    eval(analyticsCode);
}

// Helper to reset state between tests
function resetTestState() {
    gtagCalls.length = 0;
    mockWindow.location.pathname = '/some-page';

    // Clear listeners to prevent bleed-over between tests
    for (const key of Object.keys(documentListeners)) delete documentListeners[key];
    for (const key of Object.keys(bodyListeners)) delete bodyListeners[key];
    for (const key of Object.keys(formListeners)) delete formListeners[key];

    // Re-initialize to register listeners freshly on mock window/document
    initializeAnalytics();

    if (mockWindow.__analyticsModule) {
        mockWindow.__analyticsModule.clearDedupeCache();
    }
}

// --- TEST SUITE ---

test('Analytics Module - Initialization & Basics', async (t) => {
    t.beforeEach(resetTestState);

    await t.test('Safe helper functions are exposed on window and do not throw when window.gtag is missing', () => {
        const originalGtag = mockWindow.gtag;
        delete mockWindow.gtag; // Temporarily remove gtag

        assert.equal(typeof mockWindow.trackEvent, 'function');
        assert.equal(typeof mockWindow.trackLead, 'function');

        // This should not throw
        assert.doesNotThrow(() => {
            mockWindow.trackEvent('test_event', { key: 'val' });
        });

        // Restore gtag
        mockWindow.gtag = originalGtag;
    });

    await t.test('trackEvent successfully routes to window.gtag when defined', () => {
        mockWindow.trackEvent('test_event_gtag', { key: 'value' });

        assert.equal(gtagCalls.length, 1);
        assert.equal(gtagCalls[0].eventName, 'test_event_gtag');
        assert.equal(gtagCalls[0].parameters.key, 'value');
    });
});

test('Analytics Module - Sanitization & Privacy (PII Protection)', async (t) => {
    t.beforeEach(resetTestState);

    await t.test('Removes PII keys and empty/null parameters', () => {
        const rawParams = {
            name: 'John Doe',
            customer_email: 'john@example.com',
            phone_number: '021 887 934',
            message: 'Hello!',
            suburb: 'Ponsonby',
            window_type: 'Sash',
            empty_val: '',
            null_val: null,
            undefined_val: undefined,
            valid_param: 'Excellent'
        };

        const clean = mockWindow.__analyticsModule.sanitizeParams(rawParams);

        // Verify keys removed
        assert.equal(clean.name, undefined);
        assert.equal(clean.customer_email, undefined);
        assert.equal(clean.phone_number, undefined);
        assert.equal(clean.message, undefined);
        assert.equal(clean.empty_val, undefined);
        assert.equal(clean.null_val, undefined);
        assert.equal(clean.undefined_val, undefined);

        // Verify allowed keys retained
        assert.equal(clean.suburb, 'Ponsonby');
        assert.equal(clean.window_type, 'Sash');
        assert.equal(clean.valid_param, 'Excellent');
    });

    await t.test('Scrubs values that appear to be emails or phone numbers, even in non-blacklisted keys', () => {
        const rawParams = {
            custom_field_1: 'user@domain.nz', // email structure
            custom_field_2: '+64 21 887 934', // phone structure
            custom_field_3: '021-887-934', // phone structure
            custom_field_4: 'Ponsonby', // regular value
            custom_field_5: '123' // too short to be phone
        };

        const clean = mockWindow.__analyticsModule.sanitizeParams(rawParams);

        assert.equal(clean.custom_field_1, undefined, 'Should filter out custom parameter containing email value');
        assert.equal(clean.custom_field_2, undefined, 'Should filter out custom parameter containing phone number');
        assert.equal(clean.custom_field_3, undefined, 'Should filter out custom parameter containing hyphenated phone number');
        assert.equal(clean.custom_field_4, 'Ponsonby');
        assert.equal(clean.custom_field_5, '123');
    });
});

test('Analytics Module - Deduplication', async (t) => {
    t.beforeEach(resetTestState);

    await t.test('Prevents rapid duplicate tracking for identical events', () => {
        const params = { suburb: 'Grey Lynn', service_type: 'Maintenance' };

        // Send same event twice
        mockWindow.trackEvent('test_dup', params);
        mockWindow.trackEvent('test_dup', params);

        assert.equal(gtagCalls.length, 1, 'Only the first event should fire');
    });

    await t.test('Allows identical events after the deduplication window', () => {
        const params = { suburb: 'Grey Lynn' };

        mockWindow.trackEvent('test_time', params);

        // Manually clear cache to simulate time passage
        mockWindow.__analyticsModule.clearDedupeCache();

        mockWindow.trackEvent('test_time', params);

        assert.equal(gtagCalls.length, 2, 'Should allow event after dedupe cache clear');
    });
});

test('Analytics Module - Lead Tracking', async (t) => {
    t.beforeEach(resetTestState);

    await t.test('trackLead fires both generate_lead and specific method events', () => {
        mockWindow.trackLead('whatsapp', {
            suburb: 'Devonport',
            service_type: 'Retrofit Double Glazing'
        });

        // Should fire 2 events: generate_lead, lead_whatsapp
        assert.equal(gtagCalls.length, 2);

        assert.equal(gtagCalls[0].eventName, 'generate_lead');
        assert.equal(gtagCalls[0].parameters.lead_method, 'whatsapp');
        assert.equal(gtagCalls[0].parameters.suburb, 'Devonport');

        assert.equal(gtagCalls[1].eventName, 'lead_whatsapp');
        assert.equal(gtagCalls[1].parameters.lead_method, 'whatsapp');
        assert.equal(gtagCalls[1].parameters.suburb, 'Devonport');
    });
});

test('Analytics Module - Link Location Mapping', async (t) => {
    t.beforeEach(resetTestState);

    const getLinkLocation = mockWindow.__analyticsModule.getLinkLocation;

    await t.test('Correctly maps header ancestors', () => {
        const mockElement = {
            closest: (selector) => {
                if (selector === '#site-header' || selector === 'nav') return {};
                return null;
            }
        };
        assert.equal(getLinkLocation(mockElement), 'header');
    });

    await t.test('Correctly maps footer ancestors', () => {
        const mockElement = {
            closest: (selector) => {
                if (selector === 'footer') return {};
                return null;
            }
        };
        assert.equal(getLinkLocation(mockElement), 'footer');
    });

    await t.test('Correctly maps free-estimate sidebar and form elements on free estimate page', () => {
        mockWindow.location.pathname = '/free-estimate';

        const sidebarElement = {
            closest: (selector) => {
                if (selector === '.sidebar-card' || selector === '.sidebar') return {};
                return null;
            }
        };
        assert.equal(getLinkLocation(sidebarElement), 'free_estimate_sidebar');

        const formElement = {
            closest: (selector) => {
                if (selector === '#estimate-form') return {};
                return null;
            }
        };
        assert.equal(getLinkLocation(formElement), 'free_estimate_form');
    });
});

test('Analytics Module - DOM Event Handlers', async (t) => {
    t.beforeEach(resetTestState);

    await t.test('Automatically tracks view_estimate_form on DOMContentLoaded for free estimate page', () => {
        mockWindow.location.pathname = '/free-estimate';

        // Fire DOMContentLoaded
        assert.equal(typeof documentListeners['DOMContentLoaded'], 'function');
        documentListeners['DOMContentLoaded']();

        assert.equal(gtagCalls.length, 1);
        assert.equal(gtagCalls[0].eventName, 'view_estimate_form');
        assert.equal(gtagCalls[0].parameters.form_name, 'free_estimate');
    });

    await t.test('Automatically tracks estimate_form_start on first interaction and only once', () => {
        mockWindow.location.pathname = '/free-estimate';

        // Initialize DOMContentLoaded
        documentListeners['DOMContentLoaded']();

        // Check if listeners are added to form
        assert.ok(formListeners['input'] && formListeners['input'].length > 0);

        // Trigger input interaction
        const handler = formListeners['input'][0];
        handler();

        // Total gtag calls: 1 (view_estimate_form) + 1 (estimate_form_start) = 2
        assert.equal(gtagCalls.length, 2);
        assert.equal(gtagCalls[1].eventName, 'estimate_form_start');
        assert.equal(gtagCalls[1].parameters.form_name, 'free_estimate');

        // Check that listeners were removed to prevent duplicate firing
        assert.equal(formListeners['input'].length, 0);
    });

    await t.test('Automatically tracks click_to_call on tel: links', () => {
        documentListeners['DOMContentLoaded']();

        // Trigger global body click listener for tel link
        assert.ok(bodyListeners['click']);

        const mockEvent = {
            target: {
                closest: (selector) => {
                    if (selector === 'a[href^="tel:"]') {
                        return {
                            closest: (sel) => {
                                if (sel === 'footer') return {};
                                return null;
                            }
                        };
                    }
                    return null;
                }
            }
        };

        bodyListeners['click'](mockEvent);

        assert.equal(gtagCalls.length, 1);
        assert.equal(gtagCalls[0].eventName, 'click_to_call');
        assert.equal(gtagCalls[0].parameters.link_location, 'footer');
    });
});
