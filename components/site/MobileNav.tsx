"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { mainNav } from "@/lib/nav";
import { useLang } from "@/lib/i18n";
import { easing } from "@/lib/tokens";

/** Full-height navy panel. One accordion open at a time; max two levels. */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const [section, setSection] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-navy text-white lg:hidden"
        >
          <div className="flex h-[88px] items-center justify-between px-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-[22px] leading-none"
            >
              &times;
            </button>
          </div>

          <nav className="px-5 pb-16">
            {mainNav.map((item) => (
              <div key={item.key} className="border-t border-white/15">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-[18px] text-[20px] font-bold tracking-[-0.02em] text-white"
                  >
                    {t(item.key)}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSection(section === item.key ? null : item.key)}
                      aria-expanded={section === item.key}
                      className="flex w-full items-center justify-between py-[18px] text-left text-[20px] font-bold tracking-[-0.02em] text-white"
                    >
                      {t(item.key)}
                      <span className="text-red text-[22px] leading-none">
                        {section === item.key ? "\u2212" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {section === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easing }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4">
                            {item.children?.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="block py-2.5 text-[15px] text-white/70"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
            <div className="border-t border-white/15">
              <Link
                href="/contact"
                onClick={onClose}
                className="block py-[18px] text-[20px] font-bold tracking-[-0.02em] text-green"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
