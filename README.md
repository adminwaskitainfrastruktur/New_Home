# Handoff: waskitainfrastruktur.co.id — full redesign (2026)

## Overview

A complete redesign of the PT Waskita Karya Infrastruktur corporate website. Same
menu inventory as the live site, entirely new information architecture, visual
system and front-end. 14 screens, three breakpoints, bilingual shell.

Two things ship in this bundle:

1. **`Waskita Infrastruktur Redesign.dc.html`** — the design reference. An
   interactive HTML prototype of all 14 screens with a presentation toolbar
   (Prototype / Board, 1440 / 834 / 390, EN / ID). This is the source of truth
   for look and behaviour. It is a prototype, not production code.
2. **This Next.js project** — the same design implemented as real TSX. It is a
   working starting point, not a finished site: copy is in place, photography is
   not, and no CMS is wired.

## About the design files

The `.dc.html` file is a **design reference created in HTML**. Do not port its
markup. If the target codebase already exists, recreate these designs there using
its established patterns and libraries. If it does not, this Next.js project is
the recommended starting point — it was written to be read and extended by
Claude Code.

## Fidelity

**High fidelity.** Colours, type scale, spacing, motion and interaction states are
final and should be matched exactly. Only photography is unresolved: every image
is a striped `<Placeholder>` with a caption saying what belongs there.

## Stack as delivered

- Next.js 15, App Router, React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first `@theme` — no `tailwind.config`)
- Framer Motion 11 for reveals, mega-menu, mobile nav, project filter
- No other runtime dependencies

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # static export to out/ (Hostinger deploy — see DEPLOY.md)
npm run preview    # serves out/ on :8080 the way Apache will
npm run typecheck
```

Swapping to Vite + React Router is mechanical: pages are plain components, only
`next/link`, `next/image` and the `generateStaticParams` / `generateMetadata`
exports are framework-specific.

## Design tokens

Defined once in `app/globals.css` (`@theme`) and mirrored in `lib/tokens.ts` for
JS consumers. **Hex values come verbatim from the 2026 brand guideline — do not
re-derive them.**

| Token | Hex | Role | Share of page |
| --- | --- | --- | --- |
| white | `#FFFFFF` | page, cards, body ground | 50% |
| navy | `#000075` | header strip, footer, headings, data bands | 30% |
| green | `#0B9D59` | hover, eyebrows, sustainability, success | 15% |
| red | `#BD0004` | section rule, live markers, download links | 5% |
| paper | `#F6F6F4` | alternate section ground | — |
| ink | `#1C1C22` | default text | — |
| body | `#4D4D58` | body copy | — |
| cap | `#55557A` | micro labels (solid — see contrast note) | — |
| shell | `#0B0B26` | prototype toolbar only, not a site colour | — |

Navy tint ramp (guideline p.24), available as `--color-navy-80 … -05`:
`#3B3B94`, `#6B6BB0`, `#9B9BCB`, `#CBCBE5`, `#F0F0F7`.

**Contrast rule.** Never set body or label text with an alpha-muted navy
(`rgba(0,0,117,.5)` measures 3.7:1 and fails). Micro labels use the solid
`cap` token at ~5:1. On navy and green grounds, `text-white/70` and above pass.

### Typography

One grotesk, no second face. Stack:
`"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif`, with
`ui-monospace` for data and labels. If a licensed brand face is adopted later,
replace the `--font-sans` token only.

| Class | Size | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| `.t-display` | `clamp(38px, 6.4vw, 90px)` | 0.95 | −3.5% | 700 |
| `.t-display-sm` | `clamp(30px, 4.3vw, 60px)` | 1.0 | −3.0% | 700 |
| `.t-h2` | `clamp(25px, 3.1vw, 44px)` | 1.04 | −2.5% | 700 |
| `.t-h3` | `clamp(17px, 1.65vw, 24px)` | 1.22 | −1.5% | 700 |
| `.t-lead` | `clamp(15px, 1.3vw, 19px)` | 1.62 | 0 | 400 |
| `.t-body` | `clamp(13.5px, 1vw, 15.5px)` | 1.72 | 0 | 400 |
| `.t-cap` | 10.5px | 1 | +10% | 400 mono, uppercase |
| `.t-eyebrow` | 11px | 1 | +18% | 600 mono, uppercase, green |

### Spacing & geometry

- Page gutter: `clamp(20px, 5vw, 88px)` → `<Container>`
- Section rhythm: `clamp(48px, 6.6vw, 108px)` top and bottom → `<Section>`
- Editorial split: `1.05fr / .95fr`, gap `clamp(28px, 4.4vw, 72px)`, collapses at `lg`
- **Border radius is 0 everywhere.** The only round shapes are the decorative
  orbit rings (`rounded-full`, 1px border) taken from the logo.
- Card borders: `1px solid rgba(0,0,117,.13)`; hover shadow
  `0 18px 44px rgba(0,0,117,.12)`
- Grid dividers are achieved with `gap-px` over a `bg-navy/15` parent, not borders

### Motion

Brief: "halus (fade & reveal)". No parallax, no counters, no scroll-jacking.

| Interaction | Property | Duration | Easing |
| --- | --- | --- | --- |
| Section reveal on scroll in | opacity 0→1, y 24→0 | 0.85s | `cubic-bezier(.16,.8,.28,1)` |
| Stagger between siblings | — | 0.08s offset | — |
| Red section rule | `scaleX` 0→1, origin left | 0.9s | same |
| Mega menu open/close | opacity + y −8 | 0.22s | same |
| Mobile nav accordion | height auto | 0.30s | same |
| Card hover | `translateY(-4px)` + shadow + border→green | 0.40s | same |
| Image hover inside a card | `scale(1.05)` | 0.70s | same |
| Project filter | framer-motion `layout` + popLayout | 0.30s | same |
| Button hover | background→green, `translateY(-2px)` | 0.30s | — |

All reveals are `once: true, amount: 0.25`. Every motion component checks
`useReducedMotion()` and renders statically when reduced motion is requested;
`globals.css` also caps durations under that media query.

## Information architecture

Old: 9 top-level menus, dropdowns up to 4 levels deep, duplicate destinations.
New: **7 top-level items, maximum 2 levels.** Defined in `lib/nav.ts`.

- **About** — Introduction, Vision & Mission, Core Values, Milestone, Board of
  Directors, Organizational Structure, The Group, Awards & Certifications
- **Business** — Infrastructure, Heavy Equipment, Steel Fabrication, Energy
- **Projects** — All, Toll Roads, Dams & Water, Buildings & Civil, Towers &
  Transmission, IKN Portfolio
- **Newsroom** — Corporate News, CSR, Procurement
- **Governance** — Corporate Governance, WBS, Reporting of Gratification, Public
  Information (KIP), Company Profile
- **Career**
- **Contact** — a button, not a menu

"Information" and "KIP" are merged into Governance. "The Management" folds into
About. Projects gains a filtered index plus per-project detail pages.

### Redirects to configure

| Old path | New path |
| --- | --- |
| `/introduction/` | `/about` |
| `/the-group/` | `/about#group` |
| `/accreditations-and-certifications/` | `/about#accreditation` |
| `/vision-and-mission/` | `/about/vision` |
| `/core-values/` | `/about/vision#core-values` |
| `/corporate-identity/` | `/about/vision` |
| `/milestone/` | `/about/milestone` |
| `/board-of-directors/`, `/board-of-commissioners/`, `/corporate-secretary/`, `/internal-audit/`, `/sekretaris-dewan-komisaris/` | `/about/leadership` |
| `/organizational-structure/` | `/about/leadership#structure` |
| `/investment-and-construction/` | `/business/infrastructure` |
| `/heavy-duty-equipment/` | `/business/heavy-equipment` |
| `/steel-fabrication/` | `/business/steel-fabrication` |
| `/heavy-duty-equipment-2/` | `/business/energy` |
| `/project/` | `/projects` |
| `/corporate-news/` | `/newsroom` |
| `/csr/` | `/newsroom?category=csr` |
| `/procurement/` | `/newsroom#procurement` |
| `/corporate-governance/` | `/governance` |
| `/whistleblowing-system-wbs/` | `/governance#wbs` |
| `/pelaporan-gratifikasi/` | `/governance#gratification` |
| `/elementor-16208/`, `/informasi-setiap-saat/`, `/informasi-serta-merta/`, `/pengajuan-informasi/` | `/governance#kip` |
| `/company-profile-wki/` | `/governance#documents` |
| `/vision-and-mission-2/` (Awards) | `/about#accreditation` |

Existing article slugs are preserved under `/newsroom/<slug>`.

## Screens

Each entry lists the route, the file, and what is specific to it. Shared chrome
(header, footer, page hero) is described once at the end.

### 00 — Cover & rationale
Prototype only, not a website page. Problem statement, colour proportion bar,
type specimen, IA before/after, screen index. Use it as the deck for the board.

### 01 — Home · `/` · `app/page.tsx`
Sections in order, each its own component in `components/home/`:

1. **Hero** (`HomeHero.tsx`) — full-bleed photo ground, navy scrim
   `linear-gradient(105deg, rgba(0,0,117,.94) 0%, rgba(0,0,117,.72) 48%, rgba(0,0,117,.25) 100%)`,
   two orbit rings (760px white/15 top-right, 620px green/40 bottom-right).
   Eyebrow → `.t-display` two-line title → lead (30em) → white primary +
   outlined secondary button → "Scroll" rule. Padding `150px` top / `210px`
   bottom at desktop.
2. **Entry cards** — three cards overlapping the hero by 100px (`-mt-[100px]`,
   `z-20`). Figures 36 / 04 / GCG. Third card is green. These are the fastest
   route in for the three audiences: clients, partners, regulators.
3. **About teaser** — editorial split, red rule, portrait 4:5 placeholder with a
   2014 / 6 stat pair beneath.
4. **Business lines** — four 3:4 tiles on paper ground, image scales on hover.
5. **Featured projects** — navy band, large orbit ring, four-row list with 120×78
   thumbnails and an arrow that slides on hover.
6. **Why choose us** — three columns, each with a 3px top bar in navy / green /
   red respectively.
7. **News** — three cards, category · date eyebrow.
8. **Sustainability** — green band, 2×2 stat grid (50 MW, 12, ISO, 0).
9. **Closing CTA** — rules top and bottom, two buttons.

### 02 — Introduction · `/about` · `app/about/page.tsx`
Who we are split, 21:9 establishing photo, four-figure stat strip on paper,
The Group (6 cards), Certifications list (5 rows).

### 03 — Vision, Mission & Core Values · `/about/vision`
Two equal panels: vision on navy (`.t-display-sm`, 16em measure), mission on
paper as four numbered rows with red numerals. AKHLAK core values as a 3×2 grid
of white cells separated by `gap-px`. Corporate identity section shows the logo
at 360px on paper.

### 04 — Milestone · `/about/milestone`
Vertical timeline, six entries. Year column `clamp(20px, 2.4vw, 34px)` mono bold,
2px rail with a 12px dot. Dots are navy, green for 2023/2025, red for 2026; the
final rail segment fades out (`linear-gradient(#BD0004, transparent)`).

### 05 — Board of Directors · `/about/leadership`
Four tabs (Directors / Commissioners / Secretariat / Internal Audit — only the
first is populated). Three 4:5 portrait cards on paper. Below, `#structure`: a
built org chart (GMS → two boards → four functions with green top bars),
replacing the current flat image.

### 06 — Business Lines · `/business`
Four full-width bands, image side alternating, Energy on green. Whole band is
the link.

### 07 — Business line detail · `/business/[slug]`
Photo hero with navy scrim, eyebrow "Business — 01 / 04", two CTAs. Scope grid
(2×2), stats band on navy, selected projects (3). Only `infrastructure` has
`scope` and `stats` data; the other three fall through gracefully — fill
`data/company.ts` to light them up.

### 08 — Projects index · `/projects` · `components/projects/ProjectsIndex.tsx`
Sticky-feeling filter bar (6 chips, counts in the label, `white-space: nowrap`),
then a 4-up grid of 4:3 cards. Filter is client state; cards animate with
framer-motion `layout` so they slide rather than snap. `?category=` seeds the
initial filter. Footer line reports "Showing n of 36".

### 09 — Project detail · `/projects/[slug]`
Photo hero with a bottom-up scrim, status chip (green) + location chip. Fact
strip of four cells: Client / Scope / Period / Status — the data the old site
never published; unfilled records read "To be confirmed". Overview split with
two download rows, 4:3 + two 1:1 gallery placeholders. Related projects from the
same category.

### 10 — Newsroom · `/newsroom`
Category chips, lead story as a split, six cards, Load more, and a
`#procurement` band on navy listing open and closed tenders.

### 11 — Article · `/newsroom/[slug]`
Kicker, `clamp(28px, 3.9vw, 56px)` title, meta row, 21:9 lead image, then a
`0.32fr / 0.68fr` grid: left rail with in-this-release list and media contact,
right column with a lead paragraph in navy medium, body, a green-ruled pull
quote, and tag chips. Body measure stays under ~70 characters.

### 12 — Governance & KIP · `/governance`
Three pillar cells with navy / green / red top bars (framework, WBS,
gratification). Below, KIP as `<details>` accordions grouped by disclosure
obligation, each row a download with a red meta label. Fourth accordion is the
information request form with the 10-working-day rule stated.

### 13 — Career · `/career`
Photo hero with a navy→green gradient. Six vacancies as rows that indent on
hover. Four-step hiring process. Closing green band carrying the anti-fraud
notice — WKI never charges a fee — which the current site does not state.

### 14 — Contact · `/contact`
Left: address, a definition list of phone / email / portal, and the four
business-enquiry desks (Ali, Nirwan, Catur, Arief) taken from the live site's
floating contact widget. Right: message form (`components/contact/ContactForm.tsx`)
and a 16:9 map placeholder.

### Shared chrome

**Header** (`components/site/Header.tsx`) — two rows. Thin navy utility strip
(42px: phone, email, Portal WKI, EN/ID). White nav bar below with the logo at
46px, six nav items, and Contact as a solid button. Mega panels open on hover and
focus, 270px minimum, 3px green top border, shadow
`0 30px 60px rgba(0,0,117,.18)`; the Governance panel is right-aligned so it does
not overflow. Below `lg` the nav collapses to a 46px navy hamburger opening
`MobileNav` — a full-screen navy panel with one-open-at-a-time accordions.

> The logo PNG is full-colour (navy W, green and red orbits). It must sit on
> white. In the footer it is placed on a white chip for this reason. Ask the
> brand team for a mono-white lockup if a navy-ground placement is needed.

**Footer** (`components/site/Footer.tsx`) — navy, four columns: logo + address +
contact, then Company / Business & Projects / Governance & More. Bottom rule with
copyright and four social labels.

**PageHero** (`components/ui/PageHero.tsx`) — navy band used by every inner page:
kicker, `.t-display-sm` title, animated red rule, optional lead, and one orbit
ring positioned `right` / `left` / `center` to vary rhythm between pages.

## State

Very little, all client-side:

| State | Where | Purpose |
| --- | --- | --- |
| `lang: "en" \| "id"` | `lib/i18n.tsx` (`LangProvider`) | Language switch |
| `open: string \| null` | `Header` | Which mega panel is open |
| `mobileOpen: boolean` | `Header` | Mobile panel visibility |
| `section: string \| null` | `MobileNav` | Open accordion |
| `filter: ProjectCategory \| "all"` | `ProjectsIndex` | Project filter |
| `status: idle/sending/sent/error` | `ContactForm` | Submit feedback |

No data fetching is wired. `data/*.ts` is static and typed; point those exports
at the CMS and nothing above them changes.

## Language

`lib/i18n.tsx` holds a small dictionary covering navigation, page titles, section
headings and CTAs — the scope the mockups translate. `t()` falls back to English
when an ID string is missing, so long-form body copy renders in English until the
ID copy deck is delivered. When it arrives, either extend the dictionary or move
to route-based i18n (`/id/...`) and keep `t()` for chrome.

## Responsive behaviour

Designed at 1440 / 834 / 390.

- Nav collapses to hamburger below `lg` (1024px); utility-strip email and Portal
  hide at the same point
- `.split` goes single column below `lg`
- 4-up grids → 2-up at `sm`…`lg`, 1-up below `sm` (640px)
- Type and gutters scale fluidly via `clamp()` with `vw`, so there are no jumps
  between the three reference widths
- Hit targets stay at or above 44px (hamburger is 46px, buttons 15px padding)
- No fixed heights on any text container

## Assets

| Asset | Status |
| --- | --- |
| `public/brand/logo-wki.png` | Supplied (519×404, transparent) |
| `public/img/*.jpg` (20 photos) | Supplied from the client's WordPress media library. Re-encoded to JPEG at ≤1600px. |
| `public/img/thumb/*.jpg` (18) | 240–320px derivatives for 62×44 table thumbs and 120×78 card thumbs. |
| Director portraits (3) | Supplied — `portrait-bambang`, `portrait-ian`, `portrait-poerwanto`, cropped above the baked-in nameplate |
| Remaining photography | **Partial.** 24 of 36 project cards have a photo; 12 have none, and Contact/Energy still use `<Placeholder>`. |
| KIP / annual report PDFs | **Missing** — links are `#` |
| Map embed | **Missing** — 16:9 slot on Contact |
| Favicon / OG image | **Missing** |

Replacing a placeholder is a one-line swap: same wrapper, same aspect ratio,
`next/image` with `fill` and `sizes`.

## Open items for the client

1. Board of Directors and Commissioners: names, portraits, biographies.
2. Project records: client, scope, period and summary for the other 35 projects
   (only `tol-palembang-betung-1-2` is fully populated as the reference shape).
3. `scope` and `stats` for Heavy Equipment, Steel Fabrication and Energy.
4. Indonesian body copy.
5. Whether a licensed brand typeface exists; the system currently uses a
   Helvetica-family stack drawn from the guideline.
6. CMS choice for Newsroom and Career, and the contact form endpoint.

## Files

```
handoff_wki_website/
├── Waskita Infrastruktur Redesign.dc.html   design reference — all 14 screens
├── app/
│   ├── globals.css        tokens, type scale, placeholder patterns
│   ├── layout.tsx         LangProvider + Header + Footer
│   ├── page.tsx           01 Home
│   ├── about/             02 · 03 vision · 04 milestone · 05 leadership
│   ├── business/          06 index · 07 [slug]
│   ├── projects/          08 index · 09 [slug]
│   ├── newsroom/          10 index · 11 [slug]
│   ├── governance/        12
│   ├── career/            13
│   └── contact/           14
├── components/
│   ├── site/              Header, MobileNav, Footer
│   ├── ui/                Layout (Container/Section/Eyebrow/Rule/Split),
│   │                      Button, Placeholder, PageHero, clsx
│   ├── motion/            Reveal, RevealGroup, RevealItem, RuleReveal
│   ├── home/              HomeHero, HomeSections
│   ├── projects/          ProjectsIndex
│   └── contact/           ContactForm
├── data/                  projects.ts (36), news.ts, company.ts
├── lib/                   tokens.ts, i18n.tsx, nav.ts
└── public/brand/logo-wki.png
```


---

## Addendum — project map, project data, equipment rental

Added after the first handoff, in response to the client brief asking the site to
show delivered projects *with their data* and to present the heavy-equipment
rental business.

### National asset map

`public/maps/wki-asset-map.html` — a standalone HTML document, **not** a React
component, and it must stay that way:

- d3-geo needs a measured container at script time, and the pinned,
  integrity-checked CDN tags have to sit in a document `<head>`.
- Geometry is real: Natural Earth via `world-atlas@2.0.2/countries-110m.json`,
  `topojson.feature()`, `d3.geoMercator().fitExtent()` on the Indonesia feature.
  **Never hand-draw the archipelago.**
- `?layer=projects` (31 site pins) or `?layer=equipment` (16 fleet pins).
- Pin click posts `{type:"wki:pin", layer, item}` to the parent.

`components/maps/AssetMap.tsx` wraps it. Three constraints are load-bearing —
each one caused a main-thread hang or a mis-sized render during development:

1. **Mount only when visible.** An iframe in a hidden container measures 0×0;
   d3 then boots and draws at a guessed size. `AssetMap` gates on
   `IntersectionObserver`. In the mockup the equivalent gate is `<sc-if>`.
2. **`render()` bails** when the host is unmeasured or unchanged in size — it
   must never fall back to fixed dimensions.
3. **Resize is coalesced** through `requestAnimationFrame` *plus* a
   `setTimeout` fallback, because rAF is dropped while a frame is hidden or
   throttled and the redraw would otherwise be lost.

Pulse animation is limited to `big` markers (3 per map). At 31 + 16 pins all
animating, the two maps together saturated the main thread.

### Project data

`data/assets.ts` carries photography and geography as lookups keyed by project
slug, kept out of `data/projects.ts` so the content file stays clean:
`projectPhoto`, `thumb()`, `directorPhoto`, `projectCoords`, `projectRegions`.

The project detail page gained a data strip — length, lanes, structures, physical
progress with a bar — and a four-stage milestone timeline. Only
`tol-palembang-betung-1-2` is populated; the rest read "To be confirmed".

### Equipment rental — screen 15

`app/business/heavy-equipment/page.tsx`, a dedicated route rather than a
`business/[slug]` record, because the catalogue, fleet map and enquiry flow have
no equivalent on the other three lines.

- `data/equipment.ts` — 12 catalogue entries with category, headline
  specification, location, unit count, availability and photo; plus
  `fleetSummary`, `fleetGroups`, `fleetDeployment`, `rentalSteps`,
  `rentalReasons`.
- `components/equipment/FleetTable.tsx` — filter chips + table.

**Column priority in the fleet table is deliberate.** At mobile the middle three
columns (capacity, location, units) drop and the row keeps **name + status**,
because availability is what a renting customer came for. An earlier
`nth-child(n+3)` hide dropped location, units *and* status, leaving a phone user
with no availability at all. Do not "simplify" it back.

**No rental rates anywhere.** They are issued on request and depend on duration,
location, and whether operator and fuel are included. Unit counts and
availability in `data/equipment.ts` are indicative demo figures pending the real
asset register; specifications follow manufacturer data sheets.

### Redirect addendum

| Old path | New path |
| --- | --- |
| `/heavy-duty-equipment/` | `/business/heavy-equipment` (now the rental catalogue) |

### Still open

1. 12 of 36 project cards have no photo; Contact and Energy still use placeholders.
2. Real asset register for the fleet — counts, availability, depot allocation.
3. Project records: client, scope, period, summary and physical progress for the
   other 35 projects.
4. Director biographies and appointment dates (portraits and names are in).
5. `projectCoords` is duplicated inside the map HTML — either keep the two in
   sync or have the HTML fetch it as JSON.
# New_Home
