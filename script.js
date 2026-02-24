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

    // ─── Netlify Form ────────────────────────
    const form = document.getElementById('wishlist-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('success-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.querySelector('#email').value.trim();
        if (!email) return;

        submitBtn.disabled = true;
        submitBtn.textContent = '...';

        try {
            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(form)).toString(),
            });

            if (res.ok) {
                form.hidden = true;
                successMsg.hidden = false;
            } else {
                throw new Error();
            }
        } catch {
            submitBtn.disabled = false;
            submitBtn.textContent = 'I want to be first';

            const emailInput = form.querySelector('#email');
            emailInput.style.borderColor = '#ef4444';
            emailInput.value = '';
            emailInput.placeholder = 'Something went wrong. Try again.';
            setTimeout(() => {
                emailInput.style.borderColor = '';
                emailInput.placeholder = 'you@email.com';
            }, 3000);
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
