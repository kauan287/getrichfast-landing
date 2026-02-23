/* ═══════════════════════════════════════════
   SCRIPT.JS — Wishlist Landing Page
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Scroll Reveal ───────────────────────
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));

    // ─── Form ────────────────────────────────
    const form = document.getElementById('wishlist-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.wishlist__btn-text');
    const btnLoading = submitBtn.querySelector('.wishlist__btn-loading');
    const successMsg = document.getElementById('success-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('#email').value.trim();
        if (!email) return;

        btnText.hidden = true;
        btnLoading.hidden = false;
        submitBtn.disabled = true;

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok || form.action.includes('YOUR_FORM_ID')) {
                form.hidden = true;
                successMsg.hidden = false;
            } else {
                throw new Error();
            }
        } catch {
            // Demo fallback — remove once Formspree is configured
            if (form.action.includes('YOUR_FORM_ID')) {
                form.hidden = true;
                successMsg.hidden = false;
                return;
            }
            btnText.hidden = false;
            btnLoading.hidden = true;
            submitBtn.disabled = false;
        }
    });

    // ─── Smooth anchor scroll ────────────────
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
