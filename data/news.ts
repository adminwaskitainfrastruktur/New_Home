export type NewsCategory = "corporate" | "award" | "project" | "energy" | "csr";

export type Article = {
  slug: string;
  title: string;
  category: NewsCategory;
  categoryLabel: string;
  date: string; // ISO
  dateLabel: string;
  excerpt?: string;
  author?: string;
  body?: string[];
  pullQuote?: { text: string; attribution: string };
  tags?: string[];
  featured?: boolean;
};

export const articles: Article[] = [
  {
    slug: "recovery-berbuah-hasil-wki-raih-laba-dan-kontrak-baru-2025",
    title: "Recovery Berbuah Hasil, WKI Raih Laba dan Kontrak Baru 2025",
    category: "corporate",
    categoryLabel: "Corporate",
    date: "2026-02-12",
    dateLabel: "12 February 2026",
    featured: true,
    author: "Corporate Secretariat",
    excerpt:
      "The company closed 2025 with a return to profit and a strengthened new-contract position, following two years of financial restructuring.",
    body: [
      "Jakarta — PT Waskita Karya Infrastruktur closed the 2025 financial year with a return to profit and a strengthened new-contract position, marking the end of a two-year recovery programme.",
      "The company attributed the result to tighter project selection, cost discipline across its four business lines, and the completion of several packages ahead of contracted schedule. Section 2 of the Palembang–Betung toll road was handed over earlier than target, while work on BOCIMI Section 3 and the IKN Nusantara packages progressed on plan.",
      "Management noted that the energy portfolio is expected to contribute from 2026, as the 50 MW hydro capacity held through PT Waskita Wado Energi moves towards operation. The steel fabrication and heavy equipment units are also expected to increase their share of external revenue.",
      "Governance improvements were recognised externally during the year, with two awards received at TOP GRC Awards 2025. The company continues to operate certified quality, environmental and occupational health and safety management systems.",
    ],
    pullQuote: {
      text: "The recovery is not a single year of numbers. It is a change in how we choose and run projects.",
      attribution: "Board of Directors",
    },
    tags: ["Financial", "Governance", "2025"],
  },
  {
    slug: "dua-prestasi-top-grc-awards-2025",
    title: "Dua Prestasi Sekaligus, WKI Raih Penghargaan TOP GRC Awards 2025",
    category: "award",
    categoryLabel: "Award",
    date: "2026-01-28",
    dateLabel: "28 January 2026",
  },
  {
    slug: "palembang-betung-seksi-2-selesai-lebih-cepat",
    title: "Proyek Palembang–Betung Seksi 2 Selesai Lebih Cepat dari Target",
    category: "project",
    categoryLabel: "Project",
    date: "2026-01-09",
    dateLabel: "09 January 2026",
  },
  {
    slug: "dukung-penyelesaian-tol-bocimi-seksi-3",
    title: "WKI Dukung Penuh Penyelesaian Proyek Jalan Tol BOCIMI Seksi 3",
    category: "project",
    categoryLabel: "Project",
    date: "2025-12-18",
    dateLabel: "18 December 2025",
  },
  {
    slug: "waskita-wado-energi-rupst-plta-50-mw",
    title: "PT Waskita Wado Energi Laksanakan RUPST, Menuju Operasional PLTA 50 MW",
    category: "energy",
    categoryLabel: "Energy",
    date: "2025-12-02",
    dateLabel: "02 December 2025",
  },
  {
    slug: "waskita-sangir-energi-rupst",
    title: "Waskita Sangir Energi Sukses Gelar RUPST dan Komitmen Energi Bersih",
    category: "energy",
    categoryLabel: "Energy",
    date: "2025-11-20",
    dateLabel: "20 November 2025",
  },
  {
    slug: "csr-kawasan-bendungan-jragung",
    title: "Program CSR WKI di Kawasan Proyek Bendungan Jragung",
    category: "csr",
    categoryLabel: "CSR",
    date: "2025-11-04",
    dateLabel: "04 November 2025",
  },
];

export const newsCategories = [
  { id: "all", label: "All" },
  { id: "corporate", label: "Corporate News" },
  { id: "csr", label: "CSR" },
  { id: "project", label: "Procurement" },
  { id: "award", label: "Awards" },
] as const;

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const tenders = [
  { title: "Supply of ready-mix concrete — Jragung", closes: "Closes 28 Feb 2026", open: true },
  { title: "Steel tower galvanising services", closes: "Closes 14 Mar 2026", open: true },
  { title: "Heavy equipment spare parts — annual", closes: "Closed 12 Jan 2026", open: false },
];
