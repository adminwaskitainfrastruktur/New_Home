import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Placeholder } from "@/components/ui/Placeholder";
import { HeroGround, Photo } from "@/components/ui/Photo";
import { projectPhoto, projectThumb } from "@/data/assets";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProject(slug)?.name ?? "Project" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      {/* Photo ground with a bottom-up navy scrim so the title always clears 4.5:1. */}
      <section className="relative bg-navy">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <HeroGround src={projectPhoto[project.slug]} />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,117,0.96)_6%,rgba(0,0,117,0.45)_70%,rgba(0,0,117,0.6)_100%)]" />
        </div>
        <Container className="relative pb-9 pt-16 lg:pb-[66px] lg:pt-[150px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
            Projects &mdash; {project.kicker}
          </p>
          <Reveal>
            <h1 className="t-display mt-4.5 max-w-[16em] text-white">{project.name}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6.5 flex flex-wrap gap-2.5">
              <span className="bg-green px-3.5 py-[7px] font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                {project.status === "Delivered" ? "Completed" : "In progress"}
              </span>
              <span className="border border-white/30 px-3.5 py-[7px] font-mono text-[11px] uppercase tracking-[0.1em] text-white/85">
                {project.location}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Fact strip — the data the old site never published. */}
      <Container>
        <div className="grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Client", value: project.client ?? "To be confirmed" },
            { label: "Scope", value: project.scope ?? "To be confirmed" },
            { label: "Period", value: project.period ?? "To be confirmed" },
            { label: "Status", value: project.status },
          ].map((f) => (
            <div key={f.label} className="bg-white p-5 lg:p-7.5">
              <p className="t-cap">{f.label}</p>
              <p
                className={`t-h3 mt-2.5 text-[16px] ${
                  f.label === "Status" && project.status === "Delivered" ? "text-green" : ""
                }`}
              >
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <ProjectData project={project} />

      <Section>
        <Container>
          <Split>
            <div>
              <Eyebrow>Overview</Eyebrow>
              <h2 className="t-h2 mt-3.5 max-w-[18em]">
                {project.status === "Delivered"
                  ? "Delivered ahead of the contracted target"
                  : "In progress, on plan"}
              </h2>
              {(project.summary ?? [
                "Project narrative to be supplied by Corporate Secretariat.",
              ]).map((para) => (
                <p key={para.slice(0, 24)} className="t-body mt-5">
                  {para}
                </p>
              ))}
              <div className="mt-7.5">
                {["Project fact sheet (PDF)", "Handover press release"].map((d) => (
                  <a
                    key={d}
                    href="#"
                    className="flex items-center justify-between gap-4 border-b border-navy/10 py-4 transition-all hover:border-green hover:pl-2"
                  >
                    <span className="t-h3 text-[15px]">{d}</span>
                    <span className="t-cap text-red">Download</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <Photo
                src={projectPhoto[project.slug]}
                alt={project.name}
                hint="Photo — main alignment, aerial"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3]"
              />
              <div className="mt-px grid grid-cols-2 gap-px">
                <Placeholder hint="Photo — structure" className="aspect-square" />
                <Placeholder hint="Photo — detail" className="aspect-square" />
              </div>
            </div>
          </Split>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="paper">
          <Container>
            <Eyebrow>Related</Eyebrow>
            <h2 className="t-h2 mt-3.5">More in this category</h2>
            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-11">
              {related.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group block bg-white">
                  <Photo
                    src={projectThumb(p.slug)}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <p className="t-cap text-green">{p.kicker}</p>
                    <h3 className="t-h3 mt-2.5 text-[17px]">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

const TBC = "To be confirmed";

const stageTone = { navy: "bg-navy", green: "bg-green", red: "bg-red" } as const;

/**
 * Data strip and milestone timeline. Every project gets the strip so the gaps
 * are visible; the timeline renders only once stage dates exist.
 */
function ProjectData({ project }: { project: Project }) {
  const m = project.metrics;
  const progress = m?.progress;

  return (
    <section className="bg-paper">
      <Container className="py-7 lg:py-11.5">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
          <Figure label="Length" value={m?.length?.value} unit={m?.length?.unit} />
          <Figure label="Lanes" value={m?.lanes?.value} unit={m?.lanes?.unit} />
          <Figure label="Structures" value={m?.structures} />
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-baseline justify-between gap-2.5">
              <span className="t-cap">Physical progress</span>
              <span className="font-mono text-[15px] font-bold text-green">
                {progress === undefined ? "—" : `${progress}%`}
              </span>
            </div>
            <div className="mt-3 h-[5px] bg-navy/10">
              <div className="h-full bg-green" style={{ width: `${progress ?? 0}%` }} />
            </div>
            <p className="t-cap mt-2">{m?.progressNote ?? TBC}</p>
          </div>
        </div>

        {project.milestones && (
          <div className="mt-7 border-t border-navy/15 pt-5.5 lg:mt-10.5">
            <p className="t-cap mb-4">Milestones</p>
            <div className="flex flex-col gap-3">
              {project.milestones.stages.map((st) => (
                <div
                  key={st.label}
                  className="grid grid-cols-[minmax(120px,1.1fr)_3.2fr] items-center gap-4"
                >
                  <span className="t-body text-[12.5px] font-semibold text-navy">{st.label}</span>
                  <span className="relative h-3 bg-navy/[0.08]">
                    <span
                      className={`absolute inset-y-0 block ${stageTone[st.tone]}`}
                      style={{ left: `${st.start}%`, width: `${st.span}%` }}
                    />
                  </span>
                </div>
              ))}
              <div className="grid grid-cols-[minmax(120px,1.1fr)_3.2fr] gap-4">
                <span />
                <span className="flex justify-between">
                  {project.milestones.years.map((y) => (
                    <span key={y} className="t-cap">
                      {y}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function Figure({ label, value, unit }: { label: string; value?: string; unit?: string }) {
  return (
    <div>
      <p className="t-cap">{label}</p>
      {value ? (
        <p className="mt-2 font-mono text-[clamp(22px,2.2vw,32px)] font-bold tracking-[-0.03em] text-navy">
          {value}
          {unit && <span className="text-[14px] tracking-normal"> {unit}</span>}
        </p>
      ) : (
        <p className="t-h3 mt-2.5 text-[16px] text-cap">{TBC}</p>
      )}
    </div>
  );
}
