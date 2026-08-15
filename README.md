# AquaPure — Water Purifier Sales & Service HTML Template

A modern, multipurpose HTML template for **water purifier sales & service companies**.
Ready for marketplaces (ThemeForest / TemplateMonster) or direct client projects.

**Design:** TailwindCSS + custom glassmorphism & neumorphism layer, dark/light mode,
RTL/LTR toggle, fully responsive, mobile-first, SEO-friendly semantic HTML.

---

## Quick Start

No build step. Open any page directly in a browser:

1. Download / copy the `aquapure-template` folder.
2. Open `index.html` (Home — General Services) or `home-water.html` (Home — Purifier niche).
3. Admin: open `admin/index.html` (Admin) or `admin/customer.html` (Customer dashboard).

> Internet connection is required for the CDN assets (Tailwind, Google Fonts, Lucide icons).
> To work offline, download these files and serve them from `assets/` instead.

---

## Folder Structure

```
aquapure-template/
├── index.html              Home — General services landing
├── home-water.html         Home — Water purifier niche landing
├── about.html              Team, mission, history, testimonials
├── products.html           RO / UV / Gravity purifiers with specs
├── product-single.html     Product detail + full specifications
├── amc-plans.html          Annual maintenance contracts
├── installation.html       Step-by-step installation process
├── service-centers.html    Centers, search, map
├── service-details.html    Service pricing table + FAQs
├── blog.html               Searchable / filterable article list
├── blog-single.html        Article with sidebar
├── contact.html            Form, map, contact info
├── pricing.html            Purifiers / AMC / services pricing
├── login.html              Customer login
├── register.html           Customer registration
├── coming-soon.html        Maintenance / countdown page
├── 404.html                Error page
├── admin/
│   ├── index.html          Analytics dashboard
│   ├── categories.html     Purifier categories + seasonal stock
│   ├── products.html       Catalogue management
│   ├── users.html          Customer management
│   ├── orders.html         Orders & service jobs
│   ├── messages.html       Inbox
│   ├── amc.html            AMC plan management
│   └── customer.html       Customer dashboard (AMC, scheduler, certificates)
└── assets/
    ├── css/style.css       Design system (theming, glass, neumorphism, RTL)
    └── js/
        ├── navbar.js       Reusable site navigation (edit once)
        ├── footer.js       Reusable site footer (edit once)
        ├── admin-navbar.js Reusable admin sidebar (edit once)
        └── main.js         Shared interactions (accordion, tabs, counters, filters)
```

---

## Reusing the Navigation & Footer

Navigation and footer are rendered from two small JS files so you edit them **once**
and every page updates.

**To change the nav:** edit `assets/js/navbar.js` (`NAV_LINKS` + `NAVBAR_MARKUP`).
**To change the footer:** edit `assets/js/footer.js` (`FOOTER_MARKUP`).
**To change the admin sidebar:** edit `assets/js/admin-navbar.js` (`ADMIN_LINKS`).

Every page includes them like this (kept at the end of `<body>`):

```html
<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
<script src="assets/js/navbar.js"></script>
<script>renderNavbar('home');</script>       <!-- pass the active page key -->
<script src="assets/js/footer.js"></script>
<script>renderFooter();</script>
<script src="assets/js/main.js"></script>
```

Active page keys: `home · home-water · about · products · product-single · amc ·
installation · centers · service-details · blog · blog-single · contact ·
pricing · login · register · coming-soon · error`

Admin pages instead use:

```html
<script src="../assets/js/admin-navbar.js"></script>
<script>renderAdminNav('dashboard');</script>
```

Active admin keys: `dashboard · customer · categories · products · amc · orders · users · messages`

---

## Dark / Light Mode

- Toggle lives in the navbar (moon/sun icon) and admin sidebar.
- Choice is saved to `localStorage` (`ap-theme`) and defaults to your OS preference.
- Tailwind `dark:` variants + custom `[data-theme="dark"]` variables are both wired.

## RTL / LTR Layout

- The navbar toggle (languages icon) flips the whole site between LTR and RTL.
- Choice is saved to `localStorage` (`ap-dir`).
- Layouts use logical properties (`inset-inline-start`, `ms-*`, `ps-*`) so most
  spacing, text alignment and arrows flip automatically.

---

## Design System

- **Colors:** fresh cyan → indigo gradient brand, emerald + amber accents.
- **Glassmorphism:** `.glass`, `.glass-card`, `.glass-strong` (backdrop blur).
- **Neumorphism:** `.neumorph`, `.neumorph-sm`, `.neumorph-inset`, `.neumorph-circle`.
- **Theme tokens** live at the top of `assets/css/style.css` — change a few variables
  to re-skin the whole template.

## Customization Checklist

1. Replace the brand name "AquaPure", logo and contact details (navbar.js / footer.js).
2. Swap placeholder product thumbs and pricing with real data.
3. Add your own Google Maps embed URLs in `contact.html` / `service-centers.html`.
4. Replace demo phone / email and addresses throughout.
5. Attach your real admin backend to the forms and dashboard tables.

---

© 2026 AquaPure template. Free to use for commercial projects.
