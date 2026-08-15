/* ============================================================
   AQUAPURE — main.js
   Shared interactions for the front-end.
   1. Reveal on scroll (variants + stagger)
   2. Animated counters
   3. Accordion
   4. Tabs
   5. Blog filter & search
   6. Back to top
   7. Dropdowns on touch
   8. Scroll progress + nav elevation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initAccordions();
  initTabs();
  initBlog();
  initBackToTop();
  initTouchDropdowns();
  initScrollChrome();
  initAmbientBubbles();
  initAmbientOrbs();
  initAmbientDrops();
  initCursorGlow();
  initButtonRipple();
  initSlider();
});

/* 1. Reveal on scroll */
function initReveal() {
  const sel = '.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-flip, [data-stagger]';
  const els = document.querySelectorAll(sel);
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => {
      e.classList.add('visible');
      if (e.hasAttribute('data-stagger')) Array.prototype.forEach.call(e.children, (k) => { k.style.transitionDelay = '0ms'; });
    });
    return;
  }
  els.forEach((el) => {
    if (el.hasAttribute('data-stagger')) {
      Array.prototype.forEach.call(el.children, (k, i) => { k.style.transitionDelay = (i * 70) + 'ms'; });
    }
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

/* 2. Animated counters — <span class="counter" data-target="250">0</span> */
function initCounters() {
  const els = document.querySelectorAll('.counter[data-target]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach((el) => io.observe(el));
}

/* 3. Accordion */
function initAccordions() {
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const head = item.querySelector('.accordion-head');
    const body = item.querySelector('.accordion-body');
    if (!head || !body) return;
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.accordion')?.querySelectorAll('.accordion-item.open').forEach((o) => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.accordion-body').style.maxHeight = '0px'; }
      });
      item.classList.toggle('open', !isOpen);
      body.style.maxHeight = !isOpen ? body.scrollHeight + 'px' : '0px';
    });
  });
}

/* 4. Tabs */
function initTabs() {
  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabTarget;
        group.querySelectorAll('[data-tab-target]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll(`[data-tab-panel="${target}"]`).forEach((p) => p.classList.remove('active'));
        document.querySelectorAll(`[data-tab-panel="${target}"]`).forEach((p) => p.classList.add('active'));
      });
    });
  });
}

/* 5. Blog filter & live search */
function initBlog() {
  const filters = document.querySelectorAll('[data-blog-filter]');
  const cards = document.querySelectorAll('[data-blog-card]');
  const search = document.getElementById('blogSearch');

  const apply = (cat, q) => {
    cards.forEach((card) => {
      const catMatch = cat === 'all' || card.dataset.cat === cat;
      const text = card.textContent.toLowerCase();
      const qMatch = !q || text.includes(q.toLowerCase());
      card.style.display = catMatch && qMatch ? '' : 'none';
    });
  };

  filters.forEach((f) => f.addEventListener('click', () => {
    filters.forEach((x) => x.classList.remove('active'));
    f.classList.add('active');
    apply(f.dataset.blogFilter, search ? search.value : '');
  }));

  search && search.addEventListener('input', () => {
    const active = document.querySelector('[data-blog-filter].active');
    apply(active ? active.dataset.blogFilter : 'all', search.value);
  });
}

/* 6. Back to top */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const toggle = () => btn.style.display = window.scrollY > 600 ? 'grid' : 'none';
  window.addEventListener('scroll', toggle);
  toggle();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* 7. Dropdowns on touch devices */
function initTouchDropdowns() {
  document.querySelectorAll('.dropdown > .nav-link').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth > 1024 && matchMedia('(hover: none)').matches) {
        e.preventDefault();
        const dd = btn.closest('.dropdown');
        const open = dd.classList.contains('open');
        document.querySelectorAll('.dropdown.open').forEach((d) => d.classList.remove('open'));
        dd.classList.toggle('open', !open);
      }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) document.querySelectorAll('.dropdown.open').forEach((d) => d.classList.remove('open'));
  });
}

/* 8. Scroll progress bar + sticky nav elevation */
function initScrollChrome() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

/* 9. Ambient background bubbles */
function initAmbientBubbles() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  let wrap = document.querySelector('.ambient-bubbles');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'ambient-bubbles'; document.body.prepend(wrap); }
  const count = 14;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('span');
    const size = 6 + Math.random() * 26;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = (Math.random() * 100) + '%';
    b.style.setProperty('--sway', ((Math.random() - 0.5) * 90).toFixed(0) + 'px');
    b.style.animationDuration = (12 + Math.random() * 18) + 's';
    b.style.animationDelay = (-Math.random() * 24) + 's';
    wrap.appendChild(b);
  }
}

/* 9b. Floating soft water orbs */
function initAmbientOrbs() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  let wrap = document.querySelector('.bg-orbs');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'bg-orbs'; document.body.prepend(wrap); }
  const colors = ['rgba(6, 182, 212, 0.28)', 'rgba(14, 116, 144, 0.26)', 'rgba(56, 189, 248, 0.24)'];
  const spots = [
    { top: '-8%', left: '-10%', w: 420 },
    { top: '26%', left: '72%', w: 360 },
    { top: '60%', left: '-6%', w: 380 },
    { top: '80%', left: '66%', w: 330 }
  ];
  spots.forEach((s, i) => {
    const o = document.createElement('span');
    o.style.width = o.style.height = s.w + 'px';
    o.style.top = s.top;
    o.style.left = s.left;
    o.style.background = colors[i % colors.length];
    o.style.animationDelay = (-i * 9) + 's';
    wrap.appendChild(o);
  });
}

/* 9c. Twinkling water droplets */
function initAmbientDrops() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  let wrap = document.querySelector('.bg-drops');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'bg-drops'; document.body.prepend(wrap); }
  const count = 150;
  for (let i = 0; i < count; i++) {
    const d = document.createElement('span');
    const size = 3 + Math.random() * 5;
    d.style.width = size + 'px';
    d.style.height = size + 'px';
    d.style.left = (Math.random() * 100) + '%';
    d.style.top = (Math.random() * 100) + '%';
    d.style.setProperty('--sway', ((Math.random() - 0.5) * 30).toFixed(0) + 'px');
    d.style.animationDuration = (8 + Math.random() * 10) + 's';
    d.style.animationDelay = (-Math.random() * 18) + 's';
    wrap.appendChild(d);
  }
}

/* 10. Cursor spotlight glow */
function initCursorGlow() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  document.body.classList.add('has-cursor-glow');
  let raf = null;
  const move = (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      raf = null;
    });
  };
  window.addEventListener('mousemove', move, { passive: true });
}

/* 11. Button click ripple */
function initButtonRipple() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const d = Math.max(rect.width, rect.height);
      const r = document.createElement('span');
      r.className = 'btn-ripple';
      r.style.width = r.style.height = d + 'px';
      r.style.left = (e.clientX - rect.left - d / 2) + 'px';
      r.style.top = (e.clientY - rect.top - d / 2) + 'px';
      btn.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });
}

/* 12. Card slider (testimonials) */
function initSlider() {
  document.querySelectorAll('[data-slider]').forEach(initSliderInstance);
}

function initSliderInstance(wrap) {
  const track = wrap.querySelector('[data-slider-track]');
  const prev = wrap.querySelector('[data-slider-prev]');
  const next = wrap.querySelector('[data-slider-next]');
  const dotsBox = wrap.querySelector('[data-slider-dots]');
  if (!track) return;
  const slides = Array.from(track.children);
  const count = slides.length;
  if (count < 2) return;

  const dots = [];
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', 'Go to review ' + (i + 1));
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => go(i));
    dotsBox && dotsBox.appendChild(d);
    dots.push(d);
  });

  let current = 0;
  function go(i) {
    current = (i + count) % count;
    track.scrollTo({ left: track.clientWidth * current, behavior: 'smooth' });
    dots.forEach((d, k) => d.classList.toggle('active', k === current));
  }
  function nextFn() { go(current + 1); }
  function prevFn() { go(current - 1); }
  prev && prev.addEventListener('click', prevFn);
  next && next.addEventListener('click', nextFn);

  let timer = setInterval(nextFn, 6000);
  const reset = () => { clearInterval(timer); timer = setInterval(nextFn, 6000); };
  wrap.addEventListener('mouseenter', () => clearInterval(timer));
  wrap.addEventListener('mouseleave', reset);
  track.addEventListener('scroll', () => reset());
}
