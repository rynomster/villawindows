---
layout: default
title: Free Estimate: Retrofit Double Glazing Auckland — Villa Windows
description: Request a free estimate for retrofit double glazing, sash window repairs, or timber joinery maintenance in Auckland. Serving since 2010.
---

<section class="hero hero--inner">
    <div class="hero-media">
        <img src="{{ '/assets/images/casement-window-button.png' | relative_url }}" alt="Get a Free Estimate" fetchpriority="high" loading="eager">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-inner">
        <nav class="breadcrumb">
            <a href="{{ '/' | relative_url }}">Home</a> / Estimate
        </nav>
        <h1>Request a Free Estimate</h1>
        <p>Get in touch for expert advice and a detailed quote for your timber joinery project. We service the greater Auckland area.</p>
    </div>
</section>

<section class="reveal">
    <div class="estimate-grid">
        <div class="contact-methods">
            <div class="label-mono">Request an estimate</div>
            <h2 class="contact-heading">Project Details</h2>
            <p>Please provide some details about your project below. This helps us provide a more accurate initial assessment.</p>

            <form id="estimate-form" class="estimate-form" style="margin-top: 32px;">
                <div id="error-card" role="alert" tabindex="-1" style="display: none; background: #fff5f5; border: 1px solid #fc8181; color: #c53030; padding: 20px; border-radius: 3px; margin-bottom: 24px; font-size: 15px; outline: none;">
                    <strong style="display: block; font-size: 16px; margin-bottom: 8px;">Submission Failed</strong>
                    <p style="margin: 0; color: #9b2c2c; font-size: 14.5px; line-height: 1.5;">
                        There was an error submitting your request. Please check your connection and try again, or email us directly at
                        <a href="mailto:trevor@villawindows.co.nz" style="text-decoration: underline; color: inherit; font-weight: 600;">trevor@villawindows.co.nz</a>.
                    </p>
                </div>

                <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" required placeholder="Your name">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label for="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required placeholder="021 000 0000">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required placeholder="email@example.com">
                    </div>
                </div>

                <div class="form-group">
                    <label for="suburb">Auckland Suburb *</label>
                    <select id="suburb" name="suburb" required>
                        <option value="" disabled selected>Select your suburb...</option>
                        <option value="Ponsonby">Ponsonby</option>
                        <option value="Grey Lynn">Grey Lynn</option>
                        <option value="Remuera">Remuera</option>
                        <option value="Mount Eden">Mount Eden</option>
                        <option value="Epsom">Epsom</option>
                        <option value="Sandringham">Sandringham</option>
                        <option value="Kingsland">Kingsland</option>
                        <option value="Devonport">Devonport</option>
                        <option value="North Shore">North Shore</option>
                        <option value="East Auckland">East Auckland</option>
                        <option value="West Auckland">West Auckland</option>
                        <option value="South Auckland">South Auckland</option>
                        <option value="Other">Other (please specify in message)</option>
                    </select>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label for="num-windows">Approx. Number of Windows</label>
                        <input type="number" id="num-windows" name="num-windows" placeholder="e.g. 5">
                    </div>
                    <div class="form-group">
                        <label for="window-type">Window Type</label>
                        <select id="window-type" name="window-type">
                            <option value="Sash">Sash</option>
                            <option value="Casement">Casement</option>
                            <option value="Mixed">Mixed / Other</option>
                            <option value="Unsure">Unsure</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="service">Service Needed</label>
                    <select id="service" name="service">
                        <option value="Retrofit Double Glazing">Retrofit Double Glazing</option>
                        <option value="Repair & Maintenance">Repair & Maintenance</option>
                        <option value="Full Assessment">Full Assessment / Unsure</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">Message / Project Details</label>
                    <textarea id="message" name="message" rows="4" placeholder="Tell us more about what you need..."></textarea>
                </div>

                <p style="font-size: 14px; color: var(--color-text-soft); margin-bottom: 24px;">
                    <strong>Note:</strong> Please email any photos of your windows separately to <a href="mailto:trevor@villawindows.co.nz" style="text-decoration: underline; color: var(--color-primary);">trevor@villawindows.co.nz</a> as they are very helpful for estimates.
                </p>

                <div class="hero-actions" style="margin-top: 32px; animation: none;">
                    <button type="submit" id="submit-btn" class="btn" style="width: 100%;" aria-label="Submit Free Estimate Request">Submit Request</button>
                </div>
            </form>

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const form = document.getElementById('estimate-form');
                    const submitBtn = document.getElementById('submit-btn');
                    const errorCard = document.getElementById('error-card');

                    form.addEventListener('submit', function(e) {
                        e.preventDefault();

                        if (!form.reportValidity()) return;

                        // Hide any existing error card
                        if (errorCard) {
                            errorCard.style.display = 'none';
                        }

                        // Disable button to prevent duplicate submissions
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Sending...';

                        const formData = new FormData(form);
                        const data = {};
                        formData.forEach((value, key) => {
                            data[key] = value;
                        });

                        // Track the lead in GA4
                        if (window.trackLead) {
                            window.trackLead('form', {
                                service_type: data.service,
                                window_type: data['window-type'],
                                suburb: data.suburb,
                                form_name: 'free_estimate'
                            });
                        }

                        // Send to FormSubmit via AJAX
                        fetch('https://formsubmit.co/ajax/trevor@villawindows.co.nz', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                _subject: `New Estimate Request: ${data.name} - ${data.suburb}`,
                                _captcha: "false",
                                name: data.name,
                                phone: data.phone,
                                email: data.email,
                                suburb: data.suburb,
                                "approx-windows": data['num-windows'] || 'Not specified',
                                "window-type": data['window-type'],
                                service: data.service,
                                message: data.message || 'No details provided.'
                            })
                        })
                        .then(response => {
                            if (response.ok) {
                                // Redirect to Thank You page
                                window.location.href = "{{ '/thank-you/' | relative_url }}";
                            } else {
                                throw new Error('Form submission failed');
                            }
                        })
                        .catch(error => {
                            console.error('Error submitting form:', error);

                            // Show error card instead of disruptive browser alert()
                            if (errorCard) {
                                errorCard.style.display = 'block';
                                errorCard.focus();
                                errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }

                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Submit Request';
                        });
                    });
                });
            </script>
        </div>

        <div class="sidebar">
            <div class="sidebar-card" style="margin-bottom: 24px; background: var(--color-bg-alt); color: var(--color-text); border: 1px solid var(--color-border);">
                <h3 style="color: var(--color-primary);">Fast Contact</h3>
                <div class="contact-links" style="margin-top: 24px;">
                    <div class="contact-item" style="margin-bottom: 20px;">
                        <span class="label-mono" style="font-size: 9px;">Call Trevor Directly</span>
                        <div class="contact-phone" style="font-size: 24px;">
                            <a href="tel:+6421887934">021 887 934</a>
                        </div>
                    </div>
                    <div class="contact-item" style="margin-bottom: 20px;">
                        <span class="label-mono" style="font-size: 9px;">Email Us</span>
                        <div class="contact-email" style="font-size: 16px;">
                            <a href="mailto:trevor@villawindows.co.nz">trevor@villawindows.co.nz</a>
                        </div>
                    </div>
                </div>
                <div class="review-cta" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--color-border);">
                    <span class="label-mono" style="font-size: 9px;">Customer Feedback</span>
                    <p style="font-size: 14px; margin: 12px 0;">Proudly serving Auckland since 2010.</p>
                    <a href="https://www.google.com/search?q=Villa+Windows+%26+Sash+window+repairs+Auckland#lrd=0x6d0d4967396783d7:0xb79768b75c8797b7,1" target="_blank" rel="noopener noreferrer" style="font-size: 13px; text-decoration: underline;" aria-label="Read our Google Reviews (opens in a new tab)">Read our Google Reviews</a>
                </div>
            </div>

            <div class="sidebar-card">
                <h3>Workshop & Hours</h3>
                <div class="info-box">
                    <p><strong>Workshop Location:</strong><br>East Tamaki, Auckland</p>
                    <p><strong>Business Hours:</strong><br>Monday – Friday: 8am – 5pm<br>Saturday – Sunday: Closed</p>
                </div>
                <div class="info-box" style="margin-top: 24px;">
                    <p><strong>Service Area:</strong><br>We provide on-site assessments and installations across the greater Auckland area.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="bg-alt full-width">
    <div class="reveal quality-reveal">
        <div class="label-mono label-mono--center">Quality assured</div>
        <h2>A decade of expertise</h2>
        <p class="quality-text">Every project we undertake is completed to the highest standards, ensuring your heritage villa remains a beautiful and comfortable place to live.</p>
        <img src="{{ '/assets/images/double-glazed-villa-1.png' | relative_url }}" alt="Villa Windows Quality Workmanship" class="quality-image" loading="lazy" decoding="async">
    </div>
</section>
