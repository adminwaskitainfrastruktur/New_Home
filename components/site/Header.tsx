"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { mainNav, utilityInfo } from "@/lib/nav";
import { useLang } from "@/lib/i18n";
import { Container } from "../ui/Layout";
import { Button } from "../ui/Button";
import { MobileNav } from "./MobileNav";
import { easing } from "@/lib/tokens";

/**
 * Two rows: a thin navy utility strip, then a white nav bar.
 * The logo is full-colour (navy W + green/red orbits) so it must sit on white —
 * never place the PNG directly on the navy ground without a white chip.
 */
export function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-navy/10 bg-white">
      <div className="bg-navy text-white">
        <Container className="flex h-[42px] items-center justify-between gap-4">
          <div className="flex items-center gap-[22px]">
            <a
              href={utilityInfo.phoneHref}
              className="whitespace-nowrap font-mono text-[11px] tracking-[0.06em] text-white/75 hover:text-green"
            >
              {utilityInfo.phone}
            </a>
            <a
              href={`mailto:${utilityInfo.email}`}
              className="hidden whitespace-nowrap font-mono text-[11px] tracking-[0.06em] text-white/75 hover:text-green lg:inline"
            >
              {utilityInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={utilityInfo.portal}
              className="hidden font-mono text-[11px] tracking-[0.06em] text-white/75 hover:text-green lg:inline"
            >
              Portal WKI
            </a>
            <div className="flex items-center gap-2">
              {(["en", "id"] as const).map((code, i) => (
                <span key={code} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[11px] text-white/30">/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`font-mono text-[11px] tracking-[0.08em] transition-colors ${
                      lang === code ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3.5 py-3.5">
          <Image
            src="/brand/logo-wki.png"
            alt="PT Waskita Karya Infrastruktur"
            width={519}
            height={404}
            priority
            className="h-[46px] w-auto"
          />
          <span className="hidden border-l border-navy/15 pl-3.5 text-[13px] font-bold leading-[1.15] tracking-[-0.01em] text-navy lg:block">
            PT Waskita Karya
            <br />
            Infrastruktur
          </span>
        </Link>

        <nav
          className="hidden items-center gap-4 xl:gap-8 lg:flex"
          onMouseLeave={() => setOpen(null)}
        >
          {mainNav.map((item) => (
            <div key={item.key} className="relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className="block py-[26px] text-[12.5px] font-semibold uppercase tracking-[0.08em] text-navy hover:text-green"
                >
                  {t(item.key)}
                </Link>
              ) : (
                <button
                  type="button"
                  onMouseEnter={() => setOpen(item.key)}
                  onFocus={() => setOpen(item.key)}
                  aria-expanded={open === item.key}
                  className={`py-[26px] text-[12.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                    open === item.key ? "text-green" : "text-navy"
                  }`}
                >
                  {t(item.key)}
                </button>
              )}

              <AnimatePresence>
                {open === item.key && item.children && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: easing }}
                    className={`absolute top-full z-50 min-w-[270px] border-t-[3px] border-green bg-white px-[30px] py-[26px] shadow-[0_30px_60px_rgba(0,0,117,0.18)] ${
                      item.alignRight ? "right-[-24px]" : "left-[-24px]"
                    }`}
                  >
                    <p className="t-eyebrow mb-3.5">{item.panelLabel}</p>
                    {item.children.map((child, i) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block py-[9px] text-[13.5px] leading-none text-body transition-all hover:pl-1.5 hover:text-green ${
                          i === item.children!.length - 1 ? "" : "border-b border-navy/[0.07]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Button href="/contact" className="px-[22px] py-[13px]">
            {t("nav.contact")}
          </Button>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="flex h-[46px] w-[46px] shrink-0 flex-col items-center justify-center gap-1 bg-navy lg:hidden"
        >
          <span className="block h-0.5 w-[18px] bg-white" />
          <span className="block h-0.5 w-[18px] bg-white" />
          <span className="block h-0.5 w-[18px] bg-white" />
        </button>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
