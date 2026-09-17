import type { TranslationKey } from "./i18n";

export type NavLink = { label: string; href: string };

export type NavItem = {
  key: TranslationKey;
  href?: string;
  /** Eyebrow shown at the top of the mega-menu panel. */
  panelLabel?: string;
  children?: NavLink[];
  /** Right-align the panel so it does not overflow the viewport. */
  alignRight?: boolean;
};

/**
 * Restructured IA: 7 top-level items, maximum 2 levels deep.
 * Previously 9 top-level items nested up to 4 levels — "Information" and "KIP"
 * are merged into Governance, "The Management" folds into About.
 */
export const mainNav: NavItem[] = [
  {
    key: "nav.about",
    panelLabel: "The Company",
    children: [
      { label: "Introduction", href: "/about" },
      { label: "Vision & Mission", href: "/about/vision" },
      { label: "Core Values", href: "/about/vision#core-values" },
      { label: "Milestone", href: "/about/milestone" },
      { label: "Board of Directors", href: "/about/leadership" },
      { label: "Organizational Structure", href: "/about/leadership#structure" },
      { label: "The Group", href: "/about#group" },
      { label: "Awards & Certifications", href: "/about#accreditation" },
    ],
  },
  {
    key: "nav.business",
    panelLabel: "Four Business Lines",
    children: [
      { label: "Infrastructure", href: "/business/infrastructure" },
      { label: "Heavy Equipment", href: "/business/heavy-equipment" },
      { label: "Steel Fabrication", href: "/business/steel-fabrication" },
      { label: "Energy", href: "/business/energy" },
      { label: "All Business Lines", href: "/business" },
    ],
  },
  {
    key: "nav.projects",
    panelLabel: "36 Projects",
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Toll Roads", href: "/projects?category=toll" },
      { label: "Dams & Water", href: "/projects?category=dam" },
      { label: "Buildings & Civil", href: "/projects?category=building" },
      { label: "Towers & Transmission", href: "/projects?category=tower" },
      { label: "IKN Portfolio", href: "/projects?category=ikn" },
    ],
  },
  {
    key: "nav.newsroom",
    panelLabel: "News & Events",
    children: [
      { label: "Corporate News", href: "/newsroom?category=corporate" },
      { label: "CSR", href: "/newsroom?category=csr" },
      { label: "Procurement", href: "/newsroom#procurement" },
    ],
  },
  {
    key: "nav.governance",
    panelLabel: "Transparency",
    alignRight: true,
    children: [
      { label: "Corporate Governance", href: "/governance" },
      { label: "Whistleblowing System", href: "/governance#wbs" },
      { label: "Reporting of Gratification", href: "/governance#gratification" },
      { label: "Public Information (KIP)", href: "/governance#kip" },
      { label: "Company Profile", href: "/governance#documents" },
    ],
  },
  { key: "nav.career", href: "/career" },
];

export const utilityInfo = {
  phone: "021-8060 2821",
  phoneHref: "tel:02180602821",
  email: "info.wki@waskitainfrastruktur.co.id",
  portal: "http://portal.waskitainfrastruktur.co.id",
  address: [
    "Waskita - ID Survey Tower, 5th Floor",
    "Jl. Letjen MT Haryono Kav. 13",
    "Jatinegara, Jakarta Timur 13330",
  ],
  mapsUrl: "https://goo.gl/maps/bH7ikAnBtMZF7MqS9",
} as const;

export const footerNav = [
  {
    heading: "Company",
    links: [
      { label: "Introduction", href: "/about" },
      { label: "Vision & Mission", href: "/about/vision" },
      { label: "Core Values", href: "/about/vision#core-values" },
      { label: "Milestone", href: "/about/milestone" },
      { label: "Board of Directors", href: "/about/leadership" },
      { label: "The Group", href: "/about#group" },
    ],
  },
  {
    heading: "Business & Projects",
    links: [
      { label: "Infrastructure", href: "/business/infrastructure" },
      { label: "Heavy Equipment", href: "/business/heavy-equipment" },
      { label: "Steel Fabrication", href: "/business/steel-fabrication" },
      { label: "Energy", href: "/business/energy" },
      { label: "All Projects", href: "/projects" },
    ],
  },
  {
    heading: "Governance & More",
    links: [
      { label: "Corporate Governance", href: "/governance" },
      { label: "Whistleblowing System", href: "/governance#wbs" },
      { label: "Public Information (KIP)", href: "/governance#kip" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Career", href: "/career" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
