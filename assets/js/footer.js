/* ============================================================
   AQUAPURE — footer.js
   Reusable footer for every page.
   Call: renderFooter() after loading this file.
   ============================================================ */

const FOOTER_MARKUP = `
  <div class="container-x">
    <div class="footer-grid">
      <div>
        <a class="logo" href="index.html" style="margin-bottom:1rem;">
          <span class="logo-badge"><i data-lucide="droplet"></i></span>
          <span>Aqua<span class="text-grad">Pure</span></span>
        </a>
        <p class="text-muted" style="font-size:.94rem;max-width:300px;">
          Pure water, pure living. We design, sell and service RO, UV and gravity
          purifiers with honest pricing, same-day service and lifetime support.
        </p>
        <div class="social-row" style="margin-top:1.1rem;">
          <a class="icon-btn" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><i data-lucide="facebook"></i></a>
          <a class="icon-btn" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><i data-lucide="instagram"></i></a>
          <a class="icon-btn" href="https://x.com" target="_blank" rel="noopener" aria-label="Twitter / X"><i data-lucide="twitter"></i></a>
          <a class="icon-btn" href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube"><i data-lucide="youtube"></i></a>
        </div>
      </div>
      <div>
        <h5 class="footer-title">Quick Links</h5>
        <div class="footer-links">
          <a href="index.html"><i data-lucide="chevron-right"></i> Home</a>
          <a href="home-water.html"><i data-lucide="chevron-right"></i> Water Purifiers</a>
          <a href="about.html"><i data-lucide="chevron-right"></i> About Us</a>
          <a href="products.html"><i data-lucide="chevron-right"></i> Products</a>
          <a href="blog.html"><i data-lucide="chevron-right"></i> Blog</a>
          <a href="pricing.html"><i data-lucide="chevron-right"></i> Pricing</a>
        </div>
      </div>
      <div>
        <h5 class="footer-title">Our Services</h5>
        <div class="footer-links">
          <a href="amc-plans.html"><i data-lucide="chevron-right"></i> AMC Plans</a>
          <a href="installation.html"><i data-lucide="chevron-right"></i> Installation</a>
          <a href="service-details.html"><i data-lucide="chevron-right"></i> Repairs &amp; Service</a>
          <a href="contact.html"><i data-lucide="chevron-right"></i> Service Centers</a>
          <a href="service-details.html"><i data-lucide="chevron-right"></i> Water Testing</a>
          <a href="contact.html"><i data-lucide="chevron-right"></i> Emergency Visit</a>
        </div>
      </div>
      <div>
        <h5 class="footer-title">Newsletter</h5>
        <p class="text-muted" style="font-size:.92rem;">Water quality tips, offers and maintenance reminders. No spam.</p>
        <form class="search-box" style="margin-top:.9rem;display:flex;gap:.5rem;align-items:stretch;" onsubmit="return handleSubscribe(this);">
          <i data-lucide="mail"></i>
          <input class="input" type="email" placeholder="Your email address" aria-label="Email" style="border-radius:999px;min-width:0;flex:1;" required>
          <button type="submit" class="btn btn-primary btn-sm" style="border-radius:999px;white-space:nowrap;">Subscribe</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 AquaPure. All rights reserved.</span>
      <span style="display:flex;gap:1.2rem;flex-wrap:wrap;">
        <a href="#" role="button" data-policy="privacy">Privacy Policy</a>
        <a href="#" role="button" data-policy="terms">Terms of Service</a>
        <a href="#" role="button" data-policy="refund">Refund Policy</a>
      </span>
    </div>
  </div>`;

const POLICY_TEXT = {
  privacy: {
    title: 'Privacy Policy',
    body: 'Your privacy matters to AquaPure. We collect only the information you provide (name, contact, water-test results and service history) to deliver and maintain our products and services. We never sell your personal data to third parties.'
  },
  terms: {
    title: 'Terms of Service',
    body: 'AquaPure products come with a 1-year standard warranty and a 30-day workmanship guarantee on all services. AMC plans are annual subscriptions and can be cancelled anytime before renewal. Prices shown are inclusive of GST.'
  },
  refund: {
    title: 'Refund Policy',
    body: 'If you are not satisfied with a new purifier, you can return it within 7 days of delivery for a full refund, provided it is unused and in its original packaging. Service and AMC fees are non-refundable once work has been scheduled or completed, but may be credited to future service if cancelled before the visit.'
  }
};

function handlePolicy(open) {
  const close = function () {
    open.remove();
  };
  open.addEventListener('click', function (e) {
    if (e.target === open || e.target.classList.contains('popup-close')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  const btn = open.querySelector('[data-popup-ok]');
  btn && btn.addEventListener('click', close);
}

function showPolicyPopup(key) {
  const data = POLICY_TEXT[key];
  if (!data) return;
  let host = document.querySelector('.popup-backdrop');
  if (host) host.remove();
  const popup = document.createElement('div');
  popup.className = 'popup-backdrop';
  popup.innerHTML =
    '<div class="popup-card" role="dialog" aria-modal="true" aria-label="' + data.title + '">' +
    '<div class="popup-head"><h3 class="font-extrabold">' + data.title + '</h3>' +
    '<button type="button" class="icon-btn icon-btn-sm popup-close" aria-label="Close"><i data-lucide="x"></i></button></div>' +
    '<p class="text-muted text-sm" style="line-height:1.7;">' + data.body + '</p>' +
    '<button type="button" class="btn btn-primary btn-sm mt-4" data-popup-ok>Got it</button>' +
    '</div>';
  document.body.appendChild(popup);
  if (window.lucide) lucide.createIcons();
  handlePolicy(popup);
}

function handleSubscribe(form) {
  const email = form.querySelector('input[type="email"]');
  if (!email || !email.value.trim()) {
    alert('Please enter your email address first.');
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    alert('Please enter a valid email address.');
    return false;
  }
  alert('Thanks for subscribing!');
  form.reset();
  return false;
}

function renderFooter() {
  const host = document.getElementById('site-footer');
  if (!host) return;
  host.innerHTML = FOOTER_MARKUP;
  if (window.lucide) lucide.createIcons();
  host.querySelectorAll('[data-policy]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showPolicyPopup(a.getAttribute('data-policy'));
    });
  });
}
