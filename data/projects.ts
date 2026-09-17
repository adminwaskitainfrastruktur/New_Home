export type ProjectCategory = "ikn" | "toll" | "dam" | "building" | "tower";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** Shown as the card eyebrow, e.g. "Toll Road · South Sumatra". */
  kicker: string;
  location: string;
  status: "Delivered" | "In progress";
  /** Detail-page fields. Optional until Corporate Secretariat supplies them. */
  client?: string;
  scope?: string;
  period?: string;
  summary?: string[];
  /** Data strip on the detail page. Unfilled cells read "To be confirmed". */
  metrics?: {
    length?: { value: string; unit: string };
    lanes?: { value: string; unit: string };
    structures?: string;
    /** Physical progress, 0–100. */
    progress?: number;
    progressNote?: string;
  };
  /**
   * Stage bars on a shared axis. `start` and `span` are percentages of the
   * axis width; `years` labels the axis ticks left to right.
   */
  milestones?: {
    years: string[];
    stages: { label: string; start: number; span: number; tone: "navy" | "green" | "red" }[];
  };
};

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All 36" },
  { id: "toll", label: "Toll Roads 16" },
  { id: "ikn", label: "IKN Nusantara 6" },
  { id: "dam", label: "Dams & Water 5" },
  { id: "building", label: "Buildings & Civil 3" },
  { id: "tower", label: "Towers 6" },
];

export const projects: Project[] = [
  { slug: "jalan-lingkar-sepaku-4", name: "Jalan Lingkar Sepaku Segmen 4", category: "ikn", kicker: "IKN · East Kalimantan", location: "East Kalimantan", status: "In progress" },
  { slug: "jalan-feeder-ikn-kipp", name: "Jalan Feeder (Distrik) Kawasan IKN KIPP", category: "ikn", kicker: "IKN · East Kalimantan", location: "East Kalimantan", status: "In progress" },
  { slug: "jalan-6c1-sumbu-kebangsaan", name: "Jalan Seksi 6C-1 Sumbu Kebangsaan Timur KIPP", category: "ikn", kicker: "IKN · East Kalimantan", location: "East Kalimantan", status: "In progress" },
  { slug: "kantor-kemenko-3", name: "Gedung dan Kawasan Kantor Kementerian Koordinator 3", category: "ikn", kicker: "IKN · Building", location: "East Kalimantan", status: "In progress" },
  { slug: "rusun-asn-3", name: "Rusun ASN 3", category: "ikn", kicker: "IKN · Housing", location: "East Kalimantan", status: "In progress" },
  { slug: "gedung-sekretariat-presiden-ikn", name: "Gedung Sekretariat Presiden IKN", category: "ikn", kicker: "IKN · Building", location: "East Kalimantan", status: "Delivered" },
  { slug: "tol-ikn-5a", name: "Tol IKN 5A", category: "toll", kicker: "Toll Road · IKN", location: "East Kalimantan", status: "In progress" },
  { slug: "tol-bayung-lencir-tempino-1", name: "Tol Bayung Lencir – Tempino Seksi 1", category: "toll", kicker: "Toll Road · Jambi", location: "Jambi", status: "Delivered" },
  {
    slug: "tol-palembang-betung-1-2",
    name: "Tol Palembang – Betung Seksi 1 & 2",
    category: "toll",
    kicker: "Toll Road · South Sumatra",
    location: "South Sumatra",
    status: "Delivered",
    client: "PT Waskita Sriwijaya Tol",
    scope: "Earthworks, pavement, structures",
    period: "2022 – 2025",
    summary: [
      "Sections 1 and 2 of the Palembang–Betung toll road form part of the Trans-Sumatra corridor, connecting the provincial capital to the Betung junction and shortening travel time across South Sumatra.",
      "The package covered earthworks, rigid and flexible pavement, drainage, bridges and overpasses, along with toll facilities. Work was completed ahead of the contracted target, with handover confirmed in 2025.",
    ],
    metrics: {
      length: { value: "69.19", unit: "km" },
      lanes: { value: "2", unit: "× 2" },
      structures: "37",
      progress: 100,
      progressNote: "Handover confirmed 2025",
    },
    milestones: {
      years: ["2022", "2023", "2024", "2025"],
      stages: [
        { label: "Land & earthworks", start: 0, span: 34, tone: "navy" },
        { label: "Structures & bridges", start: 22, span: 40, tone: "navy" },
        { label: "Pavement", start: 48, span: 34, tone: "green" },
        { label: "Toll facilities & handover", start: 76, span: 24, tone: "red" },
      ],
    },
  },
  { slug: "tol-kapb", name: "Tol KAPB", category: "toll", kicker: "Toll Road · Sumatra", location: "Sumatra", status: "In progress" },
  { slug: "tol-pasuruan-probolinggo-4", name: "Tol Pasuruan – Probolinggo Seksi 4", category: "toll", kicker: "Toll Road · East Java", location: "East Java", status: "Delivered" },
  { slug: "jls-lot-2", name: "JLS Lot 2", category: "toll", kicker: "Road · South Java", location: "East Java", status: "Delivered" },
  { slug: "jls-lot-6", name: "JLS Lot 6", category: "toll", kicker: "Road · South Java", location: "East Java", status: "Delivered" },
  { slug: "tol-klbm", name: "Tol KLBM", category: "toll", kicker: "Toll Road · East Java", location: "East Java", status: "Delivered" },
  { slug: "tol-cisumdawu", name: "Tol Cisumdawu", category: "toll", kicker: "Toll Road · West Java", location: "West Java", status: "Delivered" },
  { slug: "tol-cibitung-cilincing", name: "Tol Cibitung – Cilincing", category: "toll", kicker: "Toll Road · Jakarta", location: "Jakarta", status: "Delivered" },
  { slug: "tol-tebing-tinggi-parapat", name: "Tol Tebing Tinggi – Parapat", category: "toll", kicker: "Toll Road · North Sumatra", location: "North Sumatra", status: "In progress" },
  { slug: "tol-kuala-tanjung-indrapura", name: "Tol Kuala Tanjung – Indrapura", category: "toll", kicker: "Toll Road · North Sumatra", location: "North Sumatra", status: "Delivered" },
  { slug: "tol-cimanggis-cibitung", name: "Tol Cimanggis – Cibitung", category: "toll", kicker: "Toll Road · West Java", location: "West Java", status: "Delivered" },
  { slug: "tol-bocimi", name: "Tol Bocimi", category: "toll", kicker: "Toll Road · West Java", location: "West Java", status: "In progress" },
  { slug: "tol-becakayu-2a", name: "Tol Becakayu Seksi 2A", category: "toll", kicker: "Toll Road · Jakarta", location: "Jakarta", status: "Delivered" },
  { slug: "gerbang-tol-becakayu-2a", name: "Gerbang Tol Becakayu 2A", category: "toll", kicker: "Toll Road · Jakarta", location: "Jakarta", status: "Delivered" },
  { slug: "fo-sekip-ujung", name: "FO Sekip Ujung", category: "building", kicker: "Flyover · Palembang", location: "South Sumatra", status: "Delivered" },
  { slug: "jembatan-4-palu", name: "Rekonstruksi Jembatan 4 Palu", category: "building", kicker: "Bridge · Central Sulawesi", location: "Central Sulawesi", status: "Delivered" },
  { slug: "stone-crusher-bojonegara", name: "Stone Crusher – Bojonegara", category: "building", kicker: "Plant · Banten", location: "Banten", status: "Delivered" },
  { slug: "bendungan-rukoh", name: "Bendungan Rukoh", category: "dam", kicker: "Dam · Aceh", location: "Aceh", status: "Delivered" },
  { slug: "bendungan-way-sekampung", name: "Bendungan Way Sekampung", category: "dam", kicker: "Dam · Lampung", location: "Lampung", status: "Delivered" },
  { slug: "bendungan-jlantah", name: "Bendungan Jlantah", category: "dam", kicker: "Dam · Central Java", location: "Central Java", status: "Delivered" },
  { slug: "bendungan-jragung", name: "Bendungan Jragung", category: "dam", kicker: "Dam · Central Java", location: "Central Java", status: "In progress" },
  { slug: "pltmh-sangir", name: "PLTMH Sangir", category: "dam", kicker: "Energy · West Sumatra", location: "West Sumatra", status: "In progress" },
  { slug: "tower-crane", name: "Tower Crane", category: "tower", kicker: "Fabrication", location: "Nationwide", status: "Delivered" },
  { slug: "tower-5g-cmi-186", name: "Tower Telekomunikasi 5G CMI 186", category: "tower", kicker: "Telecom Tower", location: "Nationwide", status: "Delivered" },
  { slug: "tower-500kv-sumsel-3", name: "Tower 500 KV Sumatera Selatan Paket 3", category: "tower", kicker: "Transmission · South Sumatra", location: "South Sumatra", status: "In progress" },
  { slug: "tower-500kv-jambi", name: "Tower 500 KV Jambi", category: "tower", kicker: "Transmission · Jambi", location: "Jambi", status: "In progress" },
  { slug: "tower-guyed-mast", name: "Tower Guyed Mast", category: "tower", kicker: "Fabrication", location: "Nationwide", status: "Delivered" },
  { slug: "tower-150kv-balikpapan", name: "Tower 150 KV Balikpapan", category: "tower", kicker: "Transmission · East Kalimantan", location: "East Kalimantan", status: "Delivered" },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = [
  "tol-palembang-betung-1-2",
  "gedung-sekretariat-presiden-ikn",
  "bendungan-jragung",
  "tower-500kv-jambi",
].map((slug) => projects.find((p) => p.slug === slug)!);
