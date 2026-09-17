# Deploy — new.waskitainfrastruktur.co.id (Hostinger)

The site is a **Next.js static export**. Hostinger shared hosting runs Apache with
no Node process, so nothing is server-rendered at request time — the build emits
plain HTML and Apache serves it.

## Local

```bash
npm run dev        # http://localhost:8080 — live reload, use this while editing
npm run build      # writes the deploy artifact to out/
npm run preview    # http://localhost:8080 — serves out/ the way Apache will
npm run typecheck
```

`npm run preview` mirrors the parts of `.htaccess` that change what a visitor
sees (DirectoryIndex, DirectorySlash, ErrorDocument), so a route that works there
works on Hostinger.

**Port 8080 already taken** (another local app, e.g. a react-scripts dev server)?
Pick another port instead of stopping that app:

```powershell
$env:PORT=8081; npm run preview
npm run dev -- -p 8081
```

Do not open `out/index.html` by double-clicking or through Laragon at
`localhost/Home/out/`. Asset paths are root-absolute (`/_next/...`, `/img/...`),
which is correct for the subdomain root but resolves to nothing from a
subfolder, so the page renders unstyled.

## Build and upload

1. `npm run build` → everything to ship is in `out/` (61 pages, ~103 kB shared JS).
2. Upload the **contents** of `out/` — not the folder itself — into the document
   root of the `new.waskitainfrastruktur.co.id` subdomain. In hPanel that is
   usually `public_html/new/` or a dedicated subdomain folder; File Manager →
   Upload → select the zip of `out/`'s contents → Extract is the fastest route.
3. Confirm `.htaccess` arrived. It is a dotfile: File Manager hides it until you
   enable **Settings → Show hidden files**. If it is missing, the redirects,
   HTTPS forcing, and caching silently do nothing.
4. Issue the SSL certificate for the subdomain in hPanel **before** testing, or
   the HTTPS redirect in `.htaccess` will send visitors to a certificate warning.

## What `.htaccess` does

Source of truth is `public/.htaccess`. Next copies it into `out/` on every build,
so **edit it in `public/`** — edits made inside `out/` are destroyed by the next
build.

| Section | Effect |
| --- | --- |
| 1 | Forces HTTPS and strips `www.` → one canonical origin |
| 2 | 301s all 30 legacy WordPress paths onto the new 7-item IA |
| 3 | gzip / brotli on HTML, CSS, JS, SVG, fonts |
| 4 | `/_next/static/*` immutable for a year; HTML must revalidate |
| 5 | nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy, HSTS |
| 6 | MIME types Hostinger does not always declare (webp, avif, woff2) |
| 7 | Denies dotfiles (except `.well-known`) and `.map` files |

Routes are exported as `<route>/index.html` (`trailingSlash: true` in
`next.config.ts`), so Apache resolves `/about` → `/about/` → `about/index.html`
with no rewrite rule. That is why the redirect targets in section 2 all end in a
slash.

## Verify after upload

```bash
curl -sI https://new.waskitainfrastruktur.co.id/about/ | head -1          # 200
curl -sI http://new.waskitainfrastruktur.co.id/ | head -2                 # 301 -> https
curl -sI https://new.waskitainfrastruktur.co.id/board-of-directors/       # 301 -> /about/leadership/
curl -sI https://new.waskitainfrastruktur.co.id/nope/ | head -1           # 404
```

## Still open before this is a public launch

These are content and integration gaps carried over from the handoff, not build
problems:

- **Photography — partial.** 23 client photos are wired through
  `data/assets.ts` (`projectPhoto`, `businessPhoto`, `articlePhoto`,
  `directorPhoto`, `pagePhoto`) and rendered by `components/ui/Photo.tsx`, which
  falls back to the striped placeholder for any slug without a photo. Still
  unphotographed: 12 of 36 projects, 4 of 7 articles, the Energy detail hero,
  the Contact map, and the two small gallery squares on project detail. Adding
  one is a single line in `data/assets.ts`.
- **Three equipment photos don't show what their filename says.**
  `eq-drill.jpg` is a transmission-line pulling winch, `eq-crane-crawler.jpg` is
  a wheeled mobile crane, and `eq-roller-pneumatic.jpg` is a padfoot compactor.
  They are used as delivered; the fleet table rows they illustrate should get
  matching photos from the client.
- **The asset map needs the internet.** `public/maps/wki-asset-map.html` loads
  d3 and topojson from unpkg and Indonesia geometry from jsDelivr at runtime.
  If either CDN is unreachable, it shows "Map geometry unavailable offline". Do
  not add a `Content-Security-Policy` to `.htaccess` without allowing both hosts.
- **Fleet figures are demo data.** Unit counts and availability in
  `data/equipment.ts` are indicative until the real asset register arrives.
- **Contact form.** `components/contact/ContactForm.tsx` fakes a 600 ms success —
  it posts nowhere. A static export has no API route, so on Hostinger this needs
  either a small PHP handler next to the export or a third-party form endpoint.
- **Director biographies and appointment dates** (names and portraits are in),
  and project records — client, scope, period, length, lanes, structures,
  progress, milestones — for the 35 projects that are not
  `tol-palembang-betung-1-2`. Their data strip reads "To be confirmed" until
  filled in `data/projects.ts`.
- **`projectCoords` exists twice** — in `data/assets.ts` and inside the map
  HTML. Edit both, or have the map fetch it as JSON.
- **KIP / annual report PDFs** — every download link is `#`.
- **Indonesian body copy.** `lib/i18n.tsx` covers chrome only; long-form copy
  renders in English until the ID deck lands.
- **Favicon and OG image.**
- **Old-domain redirects.** Section 2 only works once traffic actually reaches
  this host. While the old site still owns `waskitainfrastruktur.co.id`, add the
  same map there, or at cutover point the apex at this export.
