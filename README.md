# Royal Taste Restaurant & Cafe – Demo Website
Pure HTML5 + CSS3 + Vanilla JavaScript. No build step, no frameworks.

## Run locally
1. Unzip the folder. 2. Double-click `index.html` (or run `npx serve` / VS Code "Live Server"). 3. Internet is needed only for Google Fonts and the Google Map.

## Deploy
- **Netlify:** app.netlify.com/drop, drag the `restaurant-website` folder in. Done.
- **Vercel:** install Vercel CLI, run `vercel` inside the folder (framework: Other, no build command, output directory `.`).
- **GitHub Pages:** push to a repo, enable Pages on the main branch.
After deploying, change `og:image` in each HTML head to your full image URL for better social previews.

## Customize
| What | Where |
|---|---|
| WhatsApp number | `js/script.js` → `CONFIG.whatsapp` (e.g. `919876543210`) |
| Phone / email / address / hours | search `99999`, `royaltaste.example`, `Gourmet Street` in all `.html` files |
| Google Map | `<iframe class="map">` in `index.html` and `contact.html` → change `q=` to your address |
| Menu items & prices | each `<article class="menu-item">` in `index.html` and `menu.html`; keep `data-cat` as `starters, main, pizza, burgers, desserts, beverages` |
| Dish photos | replace files in `images/food/` (keep names, or update `src`). `.jpg`/`.webp` work; use ~800×600 px and compress |
| Gallery photos | `images/gallery/`; hero: `images/hero.svg` (also edit the `url()` in `css/style.css`) |
| Logo / tab icon | `images/logo.svg`, `images/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` |
| Colors & fonts | `:root` variables at the top of `css/style.css` |
| Social links | footer and contact sections (currently generic homepages) |

The bundled images are illustrations so the demo has no broken links. Swap in real food photography before delivering to a client.
Testimonials are labelled samples; replace them only with real, permitted reviews.
The reservation form sends an **enquiry** via WhatsApp; it does not confirm bookings. Connect a booking backend/form service (Formspree, Netlify Forms) for real reservations.

## Responsive testing checklist
- [ ] 360px, 390px (iPhone), 768px (tablet), 1024px, 1440px: no horizontal scroll
- [ ] Hamburger opens/closes; links close it; sticky header works
- [ ] Active nav link highlights on every page
- [ ] Menu filter works for all 7 buttons; tapping photos opens lightbox (arrows, Esc, swipe-sized buttons)
- [ ] Form: empty fields show errors; valid submit shows message + WhatsApp button
- [ ] WhatsApp buttons open correct number; dish "Order" buttons prefill dish name
- [ ] Back-to-top appears after scrolling; map loads; all images load
- [ ] Favicon shows in browser tab; keyboard Tab focus visible; Lighthouse ≥ 90
