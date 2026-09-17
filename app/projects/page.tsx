import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { AssetMap, MapRail } from "@/components/maps/AssetMap";
import { projects } from "@/data/projects";
import { portfolioProvinces, projectRegions } from "@/data/assets";

export const metadata: Metadata = { title: "Projects" };

const delivered = projects.filter((p) => p.status === "Delivered").length;
const inProgress = projects.length - delivered;

/**
 * `?category=` seeds the initial filter. The static export has no request-time
 * server, so the query string is read in the client (`ProjectsIndex` →
 * `useSearchParams`) rather than from a `searchParams` prop. The Suspense
 * boundary is what `useSearchParams` requires during prerender.
 */
export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Projects"
        title={`${projects.length} Projects`}
        lead="Filter by type. Every project opens to a detail page with scope, location, period and gallery."
        ring="center"
        showRule={false}
      />

      {/* Map + rail. Stacks below lg so the rail never squeezes beside the map. */}
      <section className="bg-shell">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.55fr_.95fr]">
          <AssetMap layer="projects" />
          <MapRail
            eyebrow="Live portfolio"
            title="Where we are building"
            note="Hover a marker for scope and progress. Green markers are sites currently in execution."
            footer={
              <div className="grid grid-cols-3 gap-4">
                <RailFigure value={delivered} label="Delivered" />
                <RailFigure value={inProgress} label="In progress" green />
                <RailFigure value={portfolioProvinces} label="Provinces" />
              </div>
            }
          >
            {projectRegions.map((r) => (
              <div key={r.region}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="t-body text-[12.5px] text-white">{r.region}</span>
                  <span className="font-mono text-[14px] font-bold text-white">
                    {String(r.count).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-2 h-[3px] bg-white/15">
                  <div className="h-full bg-green" style={{ width: `${r.share}%` }} />
                </div>
              </div>
            ))}
          </MapRail>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProjectsIndex />
      </Suspense>
    </>
  );
}

function RailFigure({ value, label, green }: { value: number; label: string; green?: boolean }) {
  return (
    <div>
      <p className={`font-mono text-[22px] font-bold ${green ? "text-green" : "text-white"}`}>{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.11em] text-white/55">{label}</p>
    </div>
  );
}
