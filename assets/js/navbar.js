/* ============================================================
   AQUAPURE — navbar.js
   Reusable navigation for every page.
   Call: renderNavbar('home') after loading this file.
   Active keys: home | home-water | about | products |
               product-single | amc | installation | centers |
               service-details | blog | blog-single | contact |
               pricing | login | register | coming-soon | error
   ============================================================ */

const NAV_LINKS = [
  {
    label: 'Home',
    dropdown: [
      { label: 'Home — Services', href: 'index.html', icon: 'sparkles' },
      { label: 'Home — Water Purifier', href: 'home-water.html', icon: 'droplets' }
    ],
    active: ['home', 'home-water']
  },
  {
    label: 'About',
    href: 'about.html',
    active: ['about']
  },
  {
    label: 'Products',
    href: 'products.html',
    active: ['products', 'product-single']
  },
  {
    label: 'Services',
    href: 'service-details.html',
    active: ['amc', 'installation', 'centers', 'service-details']
  },
  {
    label: 'Blog',
    href: 'blog.html',
    active: ['blog', 'blog-single']
  },
  { label: 'Pricing', href: 'pricing.html', active: ['pricing'] },
  { label: 'Contact', href: 'contact.html', active: ['contact'] }
];

let CURRENT_PAGE = 'home';

function buildNavbarMarkup() {
  return `
  <div class="site-nav">
    <div class="container-x nav-main">
    <a class="logo" href="index.html">
      <span class="logo-badge"><i data-lucide="droplet"></i></span>
      <span>Aqua<span class="text-grad">Pure</span></span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      ${NAV_LINKS.map((l) => {
        const isActive = l.active && l.active.includes(CURRENT_PAGE);
        if (l.dropdown) {
          return `
          <div class="dropdown">
            <button class="nav-link ${isActive ? 'active' : ''}" type="button">${l.label}<i data-lucide="chevron-down" style="width:15px;height:15px;"></i></button>
            <div class="dropdown-menu">
              ${l.dropdown.map((d) => `<a href="${d.href}"><i data-lucide="${d.icon}"></i>${d.label}</a>`).join('')}
            </div>
          </div>`;
        }
        return `<a class="nav-link ${isActive ? 'active' : ''}" href="${l.href}">${l.label}</a>`;
      }).join('')}
    </nav>
    <div class="nav-actions">
      <button class="icon-btn icon-btn-sm" id="rtlToggle" type="button" title="Toggle RTL / LTR" aria-label="Toggle layout direction">
        <i data-lucide="arrow-left-right"></i>
      </button>
      <button class="icon-btn icon-btn-sm" id="themeToggle" type="button" title="Toggle dark / light mode" aria-label="Toggle theme">
        <i data-lucide="moon"></i>
      </button>
      <a href="login.html" class="btn btn-ghost btn-sm nav-cta"><i data-lucide="user"></i> Login</a>
      <button class="icon-btn icon-btn-sm nav-toggle" id="navToggle" type="button" title="Menu" aria-label="Open menu"><i data-lucide="menu"></i></button>
    </div>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="mobile-menu-head">
      <a class="logo" href="index.html">
        <span class="logo-badge"><i data-lucide="droplet"></i></span>
        <span>Aqua<span class="text-grad">Pure</span></span>
      </a>
      <button class="icon-btn icon-btn-sm" id="mobileMenuClose" type="button" aria-label="Close menu"><i data-lucide="x"></i></button>
    </div>
    <nav class="mobile-links" aria-label="Mobile">
      ${NAV_LINKS.map((l) => {
        if (l.dropdown) {
          return l.dropdown.map((d) => `<a href="${d.href}"><i data-lucide="${d.icon}"></i>${d.label}</a>`).join('');
        }
        return `<a href="${l.href}">${l.label}</a>`;
      }).join('')}
    </nav>
    <a href="login.html" class="btn btn-primary btn-block" style="margin-top:auto;"><i data-lucide="user"></i> Login</a>
  </div>
  <div class="mobile-backdrop" id="mobileBackdrop"></div>`;
}

function applyTheme() {
  const saved = localStorage.getItem('ap-theme');
  const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn && window.lucide) {
    themeBtn.innerHTML = dark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    lucide.createIcons();
  }
}

function applyDirection() {
  const dir = localStorage.getItem('ap-dir') || 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
}

function wireNavActions() {
  const themeBtn = document.getElementById('themeToggle');
  const rtlBtn = document.getElementById('rtlToggle');

  themeBtn && themeBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ap-theme', next);
    const icon = themeBtn.querySelector('svg');
    if (window.lucide) {
      themeBtn.innerHTML = next === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      lucide.createIcons({ attrs: { width: 16, height: 16 } });
    } else if (icon) { icon.setAttribute('data-name', next === 'dark' ? 'sun' : 'moon'); }
  });

  rtlBtn && rtlBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', next);
    document.documentElement.setAttribute('lang', next === 'rtl' ? 'ar' : 'en');
    localStorage.setItem('ap-dir', next);
  });
}

function renderNavbar(activePage) {
  CURRENT_PAGE = activePage || 'home';
  const host = document.getElementById('site-header');
  if (!host) return;
  host.innerHTML = buildNavbarMarkup();
  wireNavActions();
  wireMobileMenu();
  applyTheme();
  applyDirection();
  if (window.lucide) lucide.createIcons();
}

function wireMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  if (!menu) return;
  const toggle = () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    backdrop && backdrop.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  const closeBtn = document.getElementById('mobileMenuClose');
  const navBtn = document.getElementById('navToggle');
  navBtn && navBtn.addEventListener('click', toggle);
  closeBtn && closeBtn.addEventListener('click', toggle);
  backdrop && backdrop.addEventListener('click', toggle);
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', toggle));
}
