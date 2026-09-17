"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { Container } from "../ui/Layout";
import { Photo } from "../ui/Photo";
import { projectThumb } from "@/data/assets";
import { easing } from "@/lib/tokens";

type Filter = ProjectCategory | "all";

/**
 * Filter + grid. Replaces the old flat stack of 36 headings.
 * Layout animation is handled by framer-motion `layout` on the grid items, so
 * cards slide into their new position instead of snapping.
 */
const validCategories: ProjectCategory[] = ["ikn", "toll", "dam", "building", "tower"];

export function ProjectsIndex() {
  const params = useSearchParams();
  const requested = params.get("category");
  const initial: Filter = validCategories.includes(requested as ProjectCategory)
    ? (requested as ProjectCategory)
    : "all";
  const [filter, setFilter] = useState<Filter>(initial);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <div className="relative z-10 border-b border-navy/15 bg-white">
        <Container className="py-6.5">
          <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Project category">
            {projectCategories.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c.id as Filter)}
                  className={`whitespace-nowrap border px-4.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-navy/20 text-navy hover:border-green hover:text-green"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-13">
        <motion.div
          layout={!reduce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.slug}
                layout={!reduce}
                initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: easing }}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block h-full overflow-hidden border border-navy/15 bg-white transition-all duration-400 hover:-translate-y-1 hover:border-green hover:shadow-[0_18px_44px_rgba(0,0,117,0.12)]"
                >
                  <Photo
                    src={projectThumb(p.slug)}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-4.5">
                    <p className="t-cap text-green">{p.kicker}</p>
                    <h2 className="t-h3 mt-2.5 text-[15.5px]">{p.name}</h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="t-cap mt-8">
          Showing {visible.length} of {projects.length} projects
        </p>
      </Container>
    </>
  );
}
