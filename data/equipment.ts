/**
 * Heavy equipment fleet — the rental catalogue behind /business/heavy-equipment.
 *
 * Unit counts and availability are INDICATIVE demo figures pending the real
 * asset register. Specifications follow manufacturer data sheets; exact model
 * and configuration are confirmed at quotation. Rental rates are deliberately
 * absent — they are issued on request and depend on duration, location, and
 * whether operator and fuel are included.
 */
export type EquipmentCategory =
  | "earthmoving"
  | "hauling"
  | "compaction"
  | "grading"
  | "paving"
  | "lifting"
  | "concrete"
  | "plant";

export type EquipmentStatus = "available" | "maintenance" | "deployed";

export type Equipment = {
  id: string;
  name: string;
  category: EquipmentCategory;
  /** Caption under the name, e.g. "Earthmoving · 0.9 m³ bucket". */
  kicker: string;
  /** Headline specification shown in the Capacity column. */
  spec: string;
  location: string;
  units: number;
  /** Units free to mobilise. 0 with status "maintenance"/"deployed". */
  available: number;
  status: EquipmentStatus;
  photo: string;
};

export const equipmentCategories: { id: EquipmentCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "earthmoving", label: "Earthmoving" },
  { id: "hauling", label: "Hauling" },
  { id: "compaction", label: "Compaction" },
  { id: "lifting", label: "Lifting" },
  { id: "concrete", label: "Concrete" },
  { id: "plant", label: "Plant" },
];

export const equipment: Equipment[] = [
  { id: "exc-20", name: "Hydraulic excavator 20 t", category: "earthmoving", kicker: "Earthmoving · 0.9 m³ bucket", spec: "20,000 kg · 110 kW", location: "Cibitung depot", units: 34, available: 18, status: "available", photo: "/img/eq-excavator.jpg" },
  { id: "exc-30", name: "Hydraulic excavator 30 t", category: "earthmoving", kicker: "Earthmoving · 1.4 m³ bucket", spec: "30,500 kg · 150 kW", location: "IKN Nusantara", units: 22, available: 6, status: "available", photo: "/img/eq-excavator.jpg" },
  { id: "dozer-d65", name: "Bulldozer D65", category: "earthmoving", kicker: "Earthmoving · straight tilt blade", spec: "20,600 kg · 153 kW", location: "Tebing Tinggi", units: 14, available: 5, status: "available", photo: "/img/eq-loader-depot.jpg" },
  { id: "dump-20", name: "Dump truck 20 m³", category: "hauling", kicker: "Hauling · tipper body", spec: "20 m³ · 6×4", location: "Multiple sites", units: 78, available: 41, status: "available", photo: "/img/eq-dumptruck.jpg" },
  { id: "roller-10", name: "Vibratory roller 10 t", category: "compaction", kicker: "Compaction · single drum", spec: "10,200 kg · 82 kW", location: "Jragung", units: 26, available: 12, status: "available", photo: "/img/eq-roller-drum.jpg" },
  { id: "grader-14", name: "Motor grader 14 ft", category: "grading", kicker: "Grading · ripper option", spec: "15,600 kg · 138 kW", location: "Palembang depot", units: 12, available: 0, status: "maintenance", photo: "/img/eq-grader.jpg" },
  { id: "finisher", name: "Asphalt finisher", category: "paving", kicker: "Paving · 3.0–6.0 m screed", spec: "6.0 m · 97 kW", location: "Bocimi Sc. 3", units: 9, available: 3, status: "available", photo: "/img/eq-paver-asphalt.jpg" },
  { id: "crane-crawler-80", name: "Crawler crane 80 t", category: "lifting", kicker: "Lifting · lattice boom", spec: "80 t · 52 m boom", location: "Jragung", units: 8, available: 2, status: "available", photo: "/img/eq-crane-crawler.jpg" },
  { id: "tower-crane", name: "Tower crane", category: "lifting", kicker: "Lifting · 60 m jib", spec: "8 t tip load · 60 m", location: "Jakarta & Bekasi", units: 11, available: 4, status: "available", photo: "/img/eq-crane-truck.jpg" },
  { id: "pump", name: "Concrete pump", category: "concrete", kicker: "Concrete · boom placing", spec: "37 m boom · 120 m³/h", location: "Jambi corridor", units: 19, available: 7, status: "available", photo: "/img/eq-paver-concrete.jpg" },
  { id: "batching", name: "Batching plant", category: "plant", kicker: "Plant · mobile, with silo", spec: "60 m³/h", location: "Sepaku, IKN", units: 6, available: 0, status: "deployed", photo: "/img/eq-roller-pneumatic.jpg" },
  { id: "crusher", name: "Stone crusher line", category: "plant", kicker: "Plant · jaw + cone", spec: "150 t/h", location: "Bojonegara", units: 3, available: 0, status: "deployed", photo: "/img/eq-pile-driver.jpg" },
];

export const fleetSummary = {
  total: 412,
  available: 190,
  utilisation: 74,
  depots: 8,
} as const;

/** Category roll-up shown on the Home teaser. */
export const fleetGroups = [
  { label: "Excavators & dozers", units: 118, available: 62 },
  { label: "Hauling & compaction", units: 146, available: 71 },
  { label: "Lifting & concrete", units: 94, available: 38 },
  { label: "Plant & production", units: 54, available: 19 },
];

/** Deployment tallies shown beside the fleet map. */
export const fleetDeployment = [
  { region: "IKN Nusantara", units: 67 },
  { region: "Java & Jakarta", units: 148 },
  { region: "Sumatra", units: 131 },
  { region: "Depot & workshop", units: 66, highlight: true },
];

export const rentalSteps = [
  { index: "01", title: "Enquiry", text: "Equipment type, duration, site location and access." },
  { index: "02", title: "Quotation", text: "Rate, mobilisation cost, operator and fuel options." },
  { index: "03", title: "Contract & inspection", text: "Joint inspection, condition report and HSE briefing." },
  { index: "04", title: "Mobilisation", text: "Delivery to site with certificates and maintenance log." },
];

export const rentalReasons = [
  { title: "Owned and maintained in-house", text: "Every unit is on our own asset register, serviced in WKI workshops with a maintenance log that travels with the machine." },
  { title: "Certified operators available", text: "Operators hold valid SIO certification, with HSE induction to the standard we apply on our own sites." },
  { title: "Eight depots, national reach", text: "Depots in Java, Sumatra and Kalimantan shorten mobilisation and keep spare parts close to site." },
  { title: "Contract terms that hold", text: "Standard rental agreement, joint inspection at handover and return, and a single point of contact for the duration." },
];

export const statusLabel = (e: Equipment) =>
  e.status === "maintenance" ? "Maintenance" : e.status === "deployed" ? "Deployed" : `${e.available} available`;
