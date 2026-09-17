export type BusinessLine = {
  slug: string;
  index: string;
  name: string;
  blurb: string;
  photoHint: string;
  /** Green ground for the Energy line, matching the mockup rhythm. */
  tone: "light" | "paper" | "green";
  scope?: { title: string; text: string }[];
  stats?: { value: string; label: string }[];
};

export const businessLines: BusinessLine[] = [
  {
    slug: "infrastructure",
    index: "01",
    name: "Infrastructure",
    blurb:
      "Investment and construction of toll roads, dams, bridges, buildings and housing — including the group's packages in IKN Nusantara.",
    photoHint: "Photo — toll road under construction",
    tone: "light",
    scope: [
      { title: "Toll roads", text: "Earthworks, pavement, structures, gantries and toll gates." },
      { title: "Dams & water", text: "Embankment dams, spillways and irrigation structures." },
      { title: "Buildings", text: "Government offices, housing and mixed-use developments." },
      { title: "Bridges & flyovers", text: "Reconstruction, girder erection and flyover packages." },
    ],
    stats: [
      { value: "23", label: "Road & toll packages" },
      { value: "04", label: "Dams delivered" },
      { value: "07", label: "IKN Nusantara packages" },
      { value: "ISO", label: "9001 / 14001 / 45001" },
    ],
  },
  {
    slug: "heavy-equipment",
    index: "02",
    name: "Heavy Equipment",
    blurb:
      "Rental, operation and maintenance of heavy duty equipment, supported by workshops and certified operators.",
    photoHint: "Photo — excavator and dump truck fleet",
    tone: "paper",
  },
  {
    slug: "steel-fabrication",
    index: "03",
    name: "Steel Fabrication",
    blurb:
      "Transmission towers, telecommunication towers, girders and structural steel fabricated to national and client standards.",
    photoHint: "Photo — fabrication workshop",
    tone: "light",
  },
  {
    slug: "energy",
    index: "04",
    name: "Energy",
    blurb:
      "Hydro and renewable generation through Waskita Wado Energi and Waskita Sangir Energi, with 50 MW moving towards operation.",
    photoHint: "Photo — hydro power plant",
    tone: "green",
  },
];

export const getBusinessLine = (slug: string) => businessLines.find((b) => b.slug === slug);

export const coreValues = [
  { index: "01", name: "Amanah", text: "We hold firmly to trust given to us." },
  { index: "02", name: "Kompeten", text: "We keep learning and developing capability." },
  { index: "03", name: "Harmonis", text: "We care for one another and respect difference." },
  { index: "04", name: "Loyal", text: "We are dedicated to the company and the nation." },
  { index: "05", name: "Adaptif", text: "We keep innovating and moving with change." },
  { index: "06", name: "Kolaboratif", text: "We build productive partnerships to create value." },
];

export const missionPoints = [
  "Deliver infrastructure and energy assets that create long-term value for shareholders and the nation.",
  "Operate with professionalism, safety and the highest standards of corporate governance.",
  "Grow through collaboration with industry leaders, research institutions and local partners.",
  "Develop people, and contribute to the communities and environment around every project.",
];

export const milestones = [
  {
    year: "2014",
    title: "Company established",
    text: "PT Waskita Karya Infrastruktur is founded as a subsidiary focused on infrastructure investment and construction.",
  },
  {
    year: "2017",
    title: "Heavy equipment & fabrication added",
    text: "Equipment rental and steel fabrication units begin operating, broadening the group beyond construction.",
  },
  {
    year: "2020",
    title: "Energy ventures formed",
    text: "Waskita Wado Energi and Waskita Sangir Energi are established to develop hydro power generation.",
  },
  {
    year: "2023",
    title: "IKN Nusantara portfolio",
    text: "Work begins on roads, government buildings and housing in the new capital, including the Presidential Secretariat.",
    accent: "green" as const,
  },
  {
    year: "2025",
    title: "Recovery and new contracts",
    text: "The company returns to profit, wins new contracts, and receives two TOP GRC Awards for governance.",
    accent: "green" as const,
  },
  {
    year: "2026",
    title: "Now",
    text: "Palembang–Betung Section 2 delivered ahead of target; 50 MW of hydro capacity moving towards operation.",
    accent: "red" as const,
  },
];

export const groupCompanies = [
  { tag: "Energy", name: "PT Waskita Wado Energi", text: "Hydro power plant development, 50 MW, West Java." },
  { tag: "Energy", name: "PT Waskita Sangir Energi", text: "Mini hydro generation, West Sumatra." },
  { tag: "Fabrication", name: "Steel Fabrication Unit", text: "Transmission towers, girders and structural steel." },
  { tag: "Equipment", name: "Heavy Equipment Unit", text: "Fleet rental, operation and maintenance services." },
  { tag: "Trading", name: "Material & Steel Trading", text: "Supply of steel and construction material." },
  { tag: "Infrastructure", name: "Investment & Construction", text: "Toll roads, dams, bridges and buildings." },
];

export const certifications = [
  { name: "ISO 9001:2015", scope: "Quality Management" },
  { name: "ISO 14001:2015", scope: "Environmental Management" },
  { name: "ISO 45001:2018", scope: "Occupational Health & Safety" },
  { name: "TOP GRC Awards 2025", scope: "Two recognitions" },
  { name: "SMK3 Certification", scope: "Safety Management" },
];

export const vacancies = [
  { title: "Site Engineer — Toll Road", meta: "Project based · South Sumatra · 3+ years" },
  { title: "Quantity Surveyor", meta: "Project based · IKN Nusantara · 2+ years" },
  { title: "HSE Officer", meta: "Project based · Central Java · 2+ years" },
  { title: "Structural Design Engineer", meta: "Head office · Jakarta · 4+ years" },
  { title: "Finance & Reporting Analyst", meta: "Head office · Jakarta · 3+ years" },
  { title: "Management Trainee Programme 2026", meta: "Head office · Jakarta · Fresh graduate" },
];

export const hiringSteps = [
  { index: "01", title: "Application", text: "Online form and CV." },
  { index: "02", title: "Assessment", text: "Technical and psychometric tests." },
  { index: "03", title: "Interview", text: "User and HC interview." },
  { index: "04", title: "Offer", text: "Medical check and placement." },
];

/** KIP disclosure groups. Documents are placeholders until the real PDFs land. */
export const kipGroups = [
  {
    id: "periodic",
    title: "Periodic information",
    items: [
      { label: "Annual Report 2025", meta: "PDF · 8.2 MB" },
      { label: "Sustainability Report 2025", meta: "PDF · 5.4 MB" },
      { label: "Financial Statements 2025 (audited)", meta: "PDF · 3.1 MB" },
      { label: "Company Profile WKI", meta: "PDF · 12 MB" },
    ],
  },
  {
    id: "anytime",
    title: "Information available at any time",
    items: [
      { label: "Organizational structure & officials", meta: "View" },
      { label: "Procurement procedures", meta: "View" },
      { label: "List of public information", meta: "PDF" },
    ],
  },
  {
    id: "instant",
    title: "Instant information",
    items: [{ label: "Emergency and safety notices", meta: "View" }],
  },
];
