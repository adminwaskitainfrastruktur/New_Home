/**
 * Photography and geography attached to existing records.
 *
 * Kept separate from data/projects.ts so the project list stays a clean content
 * file: point these two maps at the CMS and nothing else changes. Slugs that are
 * absent simply render without a photo / without a map pin.
 *
 * Every file here came from the client's own WordPress media library. Photos are
 * re-encoded to JPEG at the largest size any slot uses (≤1600px); /img/thumb/*
 * holds 240–320px derivatives for the 62×44 table thumbs and 120×78 card thumbs.
 */
export const projectPhoto: Record<string, string> = {
  "jalan-lingkar-sepaku-4": "/img/ikn-aerial.jpg",
  "jalan-feeder-ikn-kipp": "/img/ikn-aerial.jpg",
  "jalan-6c1-sumbu-kebangsaan": "/img/ikn-aerial.jpg",
  "kantor-kemenko-3": "/img/ikn-aerial.jpg",
  "rusun-asn-3": "/img/ikn-aerial.jpg",
  "gedung-sekretariat-presiden-ikn": "/img/ikn-aerial.jpg",
  "tol-ikn-5a": "/img/ikn-aerial.jpg",
  "bendungan-rukoh": "/img/dam-aerial.jpg",
  "bendungan-way-sekampung": "/img/dam-park.jpg",
  "bendungan-jlantah": "/img/dam-aerial.jpg",
  "bendungan-jragung": "/img/dam-park.jpg",
  "jembatan-4-palu": "/img/bridge.jpg",
  "fo-sekip-ujung": "/img/bridge.jpg",
  "stone-crusher-bojonegara": "/img/aggregate-plant.jpg",
  "tol-palembang-betung-1-2": "/img/eq-paver-concrete.jpg",
  "tol-bocimi": "/img/eq-paver-asphalt.jpg",
  "tol-cisumdawu": "/img/eq-paver-asphalt.jpg",
  "pltmh-sangir": "/img/dam-park.jpg",
  "tower-500kv-sumsel-3": "/img/eq-crane-crawler.jpg",
  "tower-500kv-jambi": "/img/eq-crane-crawler.jpg",
  "tower-guyed-mast": "/img/eq-crane-crawler.jpg",
  "tower-150kv-balikpapan": "/img/eq-crane-truck.jpg",
  "tower-crane": "/img/eq-crane-truck.jpg",
  "tower-5g-cmi-186": "/img/eq-drill.jpg",
};

/** 240–320px derivative for card and table thumbnails. */
export const thumb = (src: string) => src.replace("/img/", "/img/thumb/");

/** Thumbnail for a project, or undefined when the project has no photo yet. */
export const projectThumb = (slug: string) => {
  const src = projectPhoto[slug];
  return src ? thumb(src) : undefined;
};

/**
 * Business-line photography per slot, as placed in the design reference:
 * `tile` on the Home grid (3:4), `band` on the Business index (16:10), `hero`
 * behind the detail-page title. Energy's detail hero is still unsupplied.
 */
export const businessPhoto: Record<string, { tile?: string; band?: string; hero?: string }> = {
  infrastructure: {
    tile: "/img/bridge.jpg",
    band: "/img/eq-paver-concrete.jpg",
    hero: "/img/bridge.jpg",
  },
  "heavy-equipment": {
    tile: "/img/eq-excavator.jpg",
    band: "/img/eq-dumptruck.jpg",
    hero: "/img/operator-excavator.jpg",
  },
  "steel-fabrication": {
    tile: "/img/eq-crane-crawler.jpg",
    band: "/img/eq-barbender.jpg",
    hero: "/img/eq-barbender.jpg",
  },
  energy: {
    tile: "/img/dam-park.jpg",
    band: "/img/dam-park.jpg",
  },
};

/**
 * Article photography. `card` is the 16:10 listing image; `hero` is the 21:9
 * lead image on the article page and falls back to `card` when absent.
 */
export const articlePhoto: Record<string, { card: string; hero?: string }> = {
  "recovery-berbuah-hasil-wki-raih-laba-dan-kontrak-baru-2025": {
    card: "/img/surveyor.jpg",
    hero: "/img/ikn-aerial.jpg",
  },
  "dua-prestasi-top-grc-awards-2025": { card: "/img/aggregate-plant.jpg" },
  "palembang-betung-seksi-2-selesai-lebih-cepat": { card: "/img/eq-paver-asphalt.jpg" },
};

/** One-off page photography that belongs to no record. */
export const pagePhoto = {
  homeHero: "/img/ikn-aerial.jpg",
  homeAbout: "/img/dam-aerial.jpg",
  aboutEstablishing: "/img/bridge.jpg",
  careerHero: "/img/surveyor.jpg",
};

export const directorPhoto: Record<string, string> = {
  "bambang-dwi-wijayanto": "/img/portrait-bambang.jpg",
  "ian-trevianto": "/img/portrait-ian.jpg",
  poerwanto: "/img/portrait-poerwanto.jpg",
};

/**
 * Site centroids for the national map, NOT survey points.
 * The map itself lives in public/maps/wki-asset-map.html and carries its own
 * copy of this list; keep the two in sync, or have the HTML fetch this as JSON.
 */
export const projectCoords: Record<string, [number, number]> = {
  "tol-palembang-betung-1-2": [104.7, -2.95],
  "tol-bayung-lencir-tempino-1": [103.6, -2.1],
  "tol-kapb": [104.05, -3.3],
  "tol-tebing-tinggi-parapat": [99.0, 3.1],
  "tol-kuala-tanjung-indrapura": [99.5, 3.35],
  "bendungan-rukoh": [95.95, 5.2],
  "bendungan-way-sekampung": [104.9, -5.3],
  "bendungan-jlantah": [111.05, -7.7],
  "bendungan-jragung": [110.6, -7.1],
  "pltmh-sangir": [101.3, -1.4],
  "tol-cisumdawu": [107.95, -6.8],
  "tol-cibitung-cilincing": [106.95, -6.15],
  "tol-cimanggis-cibitung": [106.9, -6.4],
  "tol-bocimi": [106.8, -6.7],
  "tol-becakayu-2a": [106.92, -6.23],
  "tol-pasuruan-probolinggo-4": [113.1, -7.8],
  "tol-klbm": [112.3, -7.2],
  "jls-lot-2": [111.7, -8.3],
  "fo-sekip-ujung": [104.75, -2.97],
  "stone-crusher-bojonegara": [106.1, -5.92],
  "jembatan-4-palu": [119.87, -0.9],
  "tower-500kv-sumsel-3": [104.3, -3.5],
  "tower-500kv-jambi": [103.6, -1.6],
  "tower-150kv-balikpapan": [116.85, -1.25],
  "jalan-lingkar-sepaku-4": [116.68, -0.98],
  "jalan-feeder-ikn-kipp": [116.72, -1.02],
  "jalan-6c1-sumbu-kebangsaan": [116.76, -0.94],
  "kantor-kemenko-3": [116.7, -0.9],
  "rusun-asn-3": [116.65, -0.93],
  "gedung-sekretariat-presiden-ikn": [116.74, -0.99],
};

/** Provinces with a WKI site, as stated beside the project map. */
export const portfolioProvinces = 12;

/** Portfolio spread shown beside the project map. */
export const projectRegions = [
  { region: "Sumatra", count: 13, share: 36 },
  { region: "Java & Jakarta", count: 11, share: 31 },
  { region: "Kalimantan · IKN", count: 7, share: 19 },
  { region: "Sulawesi & other", count: 5, share: 14 },
];
