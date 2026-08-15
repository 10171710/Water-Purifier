/* ============================================================
   AQUAPURE — admin-navbar.js
   Reusable admin sidebar for every dashboard page.
   Call: renderAdminNav('dashboard') after loading this file.
   Active keys: dashboard | categories | products | users |
                orders | messages | customer | amc
   ============================================================ */

const ADMIN_LINKS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: 'index.html', icon: 'layout-dashboard', key: 'dashboard' }
    ]
  },
  {
    label: 'Catalogue',
    items: [
      { label: 'Categories & Seasonal', href: 'categories.html', icon: 'boxes', key: 'categories' },
      { label: 'Products', href: 'products.html', icon: 'shopping-bag', key: 'products' },
      { label: 'AMC Plans', href: 'amc.html', icon: 'shield-check', key: 'amc' }
    ]
  },
  {
    label: 'Management',
    items: [
      { label: 'Orders & Service', href: 'orders.html', icon: 'clipboard-list', key: 'orders' },
      { label: 'Users', href: 'users.html', icon: 'users', key: 'users' },
      { label: 'Messages', href: 'messages.html', icon: 'message-circle', key: 'messages' }
    ]
  },
  {
    label: 'Site',
    items: [
      { label: 'View Website', href: '../index.html', icon: 'globe', key: '' }
    ]
  }
];

let ADMIN_ACTIVE = 'dashboard';

function buildSidebar(links, homeHref) {
  return `
  <a class="logo" href="${homeHref || 'index.html'}" style="margin-bottom:1.4rem;">
    <span class="logo-badge"><i data-lucide="droplet"></i></span>
    <span>Aqua<span class="text-grad">Pure</span></span>
  </a>
  <div class="glass-card" style="padding:1rem;display:flex;align-items:center;gap:.85rem;margin-bottom:.5rem;">
    <span class="avatar avatar-grad" style="background:var(--grad);">AK</span>
    <div style="min-width:0;">
      <div style="font-weight:700;font-size:.92rem;" id="adminUserName">Admin</div>
      <div class="text-muted" style="font-size:.78rem;" id="adminUserRole">Administrator</div>
    </div>
  </div>
  ${links.map((group) => `
    <div class="side-label">${group.label}</div>
    ${group.items.map((i) => `<a class="side-link ${i.key === ADMIN_ACTIVE ? 'active' : ''}" href="${i.href}"><i data-lucide="${i.icon}"></i>${i.label}</a>`).join('')}
  `).join('')}
  <div style="margin-top:auto;display:grid;gap:.5rem;padding-top:1rem;">
    <button class="btn btn-ghost btn-sm side-close" id="adminSidebarClose" type="button"><i data-lucide="panel-left-close"></i> Close Menu</button>
    <button class="btn btn-danger btn-sm" id="adminLogoutBtn" type="button" onclick="logoutAdmin()"><i data-lucide="log-out"></i> Logout</button>
  </div>`;
}

function renderAdminNav(activePage) {
  ADMIN_ACTIVE = activePage || 'dashboard';
  const host = document.getElementById('admin-sidebar');
  if (!host) return;
  const session = (() => { try { return JSON.parse(localStorage.getItem('aquapure_session')) || null; } catch (e) { return null; } })();
  const isCustomer = session && session.role === 'customer';
  const links = isCustomer
    ? ADMIN_LINKS.map((group) => ({
        label: group.label,
        items: group.items.filter((i) => i.key !== 'customer' && i.key !== 'categories' && i.key !== 'products' && i.key !== 'amc' && i.key !== 'orders' && i.key !== 'users' && i.key !== 'messages')
      })).filter((group) => group.items.length)
    : ADMIN_LINKS;
  if (isCustomer) {
    const dashGroup = links.find((g) => g.items && g.items[0] && g.items[0].key === 'dashboard');
    if (dashGroup) dashGroup.items[0].href = 'customer.html';
  }
  host.innerHTML = buildSidebar(links, isCustomer ? 'customer.html' : 'index.html');
  const saved = localStorage.getItem('ap-theme');
  const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.documentElement.setAttribute('dir', localStorage.getItem('ap-dir') || 'ltr');

  const uname = document.getElementById('adminUserName');
  if (uname) uname.textContent = session && session.name ? session.name : (isCustomer ? 'Customer' : 'Admin');
  const urole = document.getElementById('adminUserRole');
  if (urole) urole.textContent = isCustomer ? 'Customer' : 'Administrator';
  const avatar = host.querySelector('.avatar');
  if (avatar && session && session.name) {
    avatar.textContent = session.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  }
  const logoutBtn = document.getElementById('adminLogoutBtn');
  if (logoutBtn) logoutBtn.onclick = function () {
    localStorage.removeItem('aquapure_session');
    window.location.href = isCustomer ? '../login.html' : '../admin-login.html';
  };

  const closeBtn = document.getElementById('adminSidebarClose');
  if (closeBtn) closeBtn.onclick = toggleAdminSidebar;

  injectTopbarToggles();
  if (window.lucide) lucide.createIcons();
}

function injectTopbarToggles() {
  if (document.getElementById('themeToggle')) return;
  const topbar = document.querySelector('.admin-topbar');
  if (!topbar) return;
  const last = topbar.lastElementChild;
  let target;
  if (last && last.tagName === 'DIV' && !last.querySelector('h1')) {
    target = last;
  } else {
    target = document.createElement('div');
    target.className = 'flex items-center gap-3';
    if (last && last.tagName !== 'DIV') target.appendChild(last);
    topbar.appendChild(target);
  }
  const wrap = document.createElement('div');
  wrap.className = 'flex items-center gap-2';
  wrap.innerHTML =
    '<button class="icon-btn icon-btn-sm" id="rtlToggle" type="button" title="Toggle RTL / LTR" aria-label="Toggle layout direction"><i data-lucide="arrow-left-right"></i></button>' +
    '<button class="icon-btn icon-btn-sm" id="themeToggle" type="button" title="Toggle dark / light mode" aria-label="Toggle theme"><i data-lucide="moon"></i></button>';
  target.insertBefore(wrap, target.firstChild);

  const t = document.getElementById('themeToggle');
  if (t) {
    t.innerHTML = (document.documentElement.getAttribute('data-theme') === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>');
    t.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ap-theme', next);
      t.innerHTML = (next === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>');
      if (window.lucide) lucide.createIcons();
    });
  }
  const r = document.getElementById('rtlToggle');
  if (r) r.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', next);
    document.documentElement.setAttribute('lang', next === 'rtl' ? 'ar' : 'en');
    localStorage.setItem('ap-dir', next);
  });
  if (window.lucide) lucide.createIcons();
}

function logoutAdmin() {
  localStorage.removeItem('aquapure_session');
  window.location.href = '../admin-login.html';
}

function toggleAdminSidebar() {
  const sb = document.getElementById('admin-sidebar');
  if (!sb) return;
  const isOpen = sb.classList.toggle('open');
  document.body.classList.toggle('sidebar-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  let bd = document.getElementById('sidebarBackdrop');
  if (!bd) {
    bd = document.createElement('div');
    bd.id = 'sidebarBackdrop';
    bd.className = 'sidebar-backdrop';
    bd.addEventListener('click', closeAdminSidebar);
    document.body.appendChild(bd);
  }
  bd.classList.toggle('open', isOpen);
}

function closeAdminSidebar() {
  const sb = document.getElementById('admin-sidebar');
  if (!sb) return;
  sb.classList.remove('open');
  document.body.classList.remove('sidebar-open');
  document.body.style.overflow = '';
  const bd = document.getElementById('sidebarBackdrop');
  if (bd) bd.classList.remove('open');
}
