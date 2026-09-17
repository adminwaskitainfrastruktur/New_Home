/**
 * Single source of truth for brand values that also need to exist in JS
 * (chart colours, framer-motion style props, canvas, meta theme-color).
 * Keep in sync with the @theme block in app/globals.css.
 */
export const color = {
  white: "#FFFFFF",
  navy: "#000075",
  green: "#0B9D59",
  red: "#BD0004",
  paper: "#F6F6F4",
  ink: "#1C1C22",
  body: "#4D4D58",
  cap: "#55557A",
  shell: "#0B0B26",
} as const;

/** Guideline proportion of colour use across any given page. */
export const colorProportion = [
  { token: "white", share: 0.5, role: "page, cards, body" },
  { token: "navy", share: 0.3, role: "header, footer, headings, data bands" },
  { token: "green", share: 0.15, role: "hover, eyebrows, sustainability" },
  { token: "red", share: 0.05, role: "section rule, live markers, download links" },
] as const;

export const easing = [0.16, 0.8, 0.28, 1] as const;

export const duration = {
  fast: 0.25,
  base: 0.4,
  slow: 0.85,
} as const;

/** Design breakpoints the mockups were drawn at. */
export const breakpoint = { mobile: 390, tablet: 834, desktop: 1440 } as const;
