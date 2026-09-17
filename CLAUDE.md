# Claude Code — start here

This is a **design handoff**, not a running product. Read in this order:

1. `README.md` — the full spec: tokens, type scale, motion table, information
   architecture, redirect map, screen-by-screen notes, and the addendum covering
   the project map, project data and the equipment rental catalogue.
2. `Waskita Infrastruktur Redesign.dc.html` — the **design reference**. Open it
   in a browser. 16 screens with a toolbar: Prototype / Board, 1440 / 834 / 390,
   EN / ID. This is the source of truth for look and behaviour.
3. The Next.js project in this folder — the same design implemented in TSX.

## Do not port the .dc.html markup

It is a design artifact created in HTML. If a real codebase already exists,
recreate these designs there using its own patterns. If it does not, this
Next.js project is the intended starting point.

## Run it

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # static export to out/ (Hostinger deploy — see DEPLOY.md)
npm run preview    # serves out/ on :8080 the way Apache will
npm run typecheck
```

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind v4
(CSS-first `@theme`, no `tailwind.config`) · Framer Motion 11. No other runtime
dependencies.

## Five things that will bite you

1. **Brand hex values are fixed.** `#000075` navy, `#0B9D59` green, `#BD0004`
   red, white. Proportion of use per page: 50 white / 30 navy / 15 green /
   5 red. Do not re-derive or "harmonise" them.
2. **Never alpha-mute text.** `rgba(0,0,117,.5)` measures 3.7:1 and fails. Micro
   labels use the solid `cap` token (`#55557A`, ~5:1).
3. **Border radius is 0 everywhere.** The only round shapes are the decorative
   orbit rings taken from the logo.
4. **The map is deliberately not a React component.** See the addendum in
   `README.md` — d3-geo needs a measured container and pinned CDN tags in a
   document `<head>`. The three constraints listed there (mount only when
   visible, bail on unmeasured/unchanged size, coalesce resize with rAF *plus* a
   timeout fallback) each fixed a real main-thread hang. Keep them.
5. **Fleet table column priority.** At mobile the row keeps name + status and
   drops capacity, location and units. Availability is the reason the page
   exists.

## What is real and what is demo

| Real | Demo / pending |
| --- | --- |
| Menu inventory, taken from the live site | Fleet unit counts and availability |
| 36 project names, categories, locations | Project length / lanes / structures / progress (only Palembang–Betung filled) |
| Director names and portraits | Director biographies and appointment dates |
| Company address, phones, enquiry desks | Newsroom article bodies beyond the lead release |
| 20 photographs from the client's media library | 12 of 36 project cards still have no photo |

No CMS is wired. `data/*.ts` is static and typed — point those exports at the
real source and nothing above them changes. The contact form is presentational;
`onSubmit` needs an endpoint.
