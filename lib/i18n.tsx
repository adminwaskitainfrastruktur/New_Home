"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type Lang = "en" | "id";

/**
 * Scope note: the mockups translate navigation, page titles, section headings and
 * CTAs. Long-form body copy stays in English until the ID copy deck is delivered,
 * so `t()` falls back to the English string when no ID value exists.
 */
const dict = {
  "nav.about": { en: "About", id: "Tentang" },
  "nav.business": { en: "Business", id: "Bisnis" },
  "nav.projects": { en: "Projects", id: "Proyek" },
  "nav.newsroom": { en: "Newsroom", id: "Berita" },
  "nav.governance": { en: "Governance", id: "Tata Kelola" },
  "nav.career": { en: "Career", id: "Karier" },
  "nav.contact": { en: "Contact", id: "Kontak" },

  "home.hero.title": { en: "Collaborative\n& Sustainable", id: "Kolaboratif\n& Berkelanjutan" },
  "home.hero.lead": {
    en: "A fast-growing infrastructure and energy company investing in and operating facilities across power, oil and gas, mining, property, transportation and utilities.",
    id: "Perusahaan infrastruktur dan energi yang tumbuh cepat, berinvestasi dan mengoperasikan fasilitas di sektor kelistrikan, minyak dan gas, pertambangan, properti, transportasi, dan utilitas.",
  },
  "home.about.title": {
    en: "We build facilities that improve the quality of life",
    id: "Kami membangun fasilitas yang meningkatkan kualitas hidup",
  },
  "home.business.title": { en: "Business Lines", id: "Lini Bisnis" },
  "home.projects.title": { en: "Projects shaping the nation", id: "Proyek yang membentuk negeri" },
  "home.news.title": { en: "Latest from WKI", id: "Terbaru dari WKI" },
  "home.cta.title": {
    en: "Looking for a partner on your next infrastructure project?",
    id: "Mencari mitra untuk proyek infrastruktur Anda?",
  },

  "cta.explore": { en: "Explore More", id: "Selengkapnya" },
  "cta.readMore": { en: "Read More", id: "Baca Selengkapnya" },
  "cta.allProjects": { en: "All Projects", id: "Semua Proyek" },
  "cta.allNews": { en: "All News", id: "Semua Berita" },
  "cta.talk": { en: "Talk to Us", id: "Hubungi Kami" },
  "cta.join": { en: "Join the Team", id: "Bergabung" },

  "page.introduction": { en: "Introduction", id: "Pendahuluan" },
  "page.vision": { en: "Vision & Mission", id: "Visi & Misi" },
  "page.coreValues": { en: "Core Values", id: "Nilai Utama" },
  "page.milestone": { en: "Milestone", id: "Tonggak Sejarah" },
  "page.leadership": { en: "Board of Directors", id: "Dewan Direksi" },
  "page.business": { en: "Business Lines", id: "Lini Bisnis" },
  "page.projects": { en: "Projects", id: "Proyek" },
  "page.newsroom": { en: "News & Events", id: "Berita & Acara" },
  "page.governance": {
    en: "Corporate Governance & Public Information",
    id: "Tata Kelola & Informasi Publik",
  },
  "page.career": { en: "Build the country's infrastructure", id: "Bangun infrastruktur negeri" },
  "page.contact": { en: "Get in touch", id: "Hubungi Kami" },
} satisfies Record<string, Record<Lang, string>>;

export type TranslationKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: TranslationKey) => string };

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({
  children,
  initial = "en",
}: {
  children: React.ReactNode;
  initial?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initial);
  const t = useCallback((key: TranslationKey) => dict[key][lang] || dict[key].en, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
