import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { businessLines, getBusinessLine } from "@/data/company";
import { projects } from "@/data/projects";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { HeroGround, Photo } from "@/components/ui/Photo";
import { businessPhoto, projectThumb } from "@/data/assets";
import { Reveal, RuleReveal } from "@/components/motion/Reveal";

/**
 * Heavy Equipment has its own route (app/business/heavy-equipment) for the
 * rental catalogue, so it is excluded here — a static segment and a generated
 * param for the same path would collide in the export.
 */
const DEDICATED_ROUTES = new Set(["heavy-equipment"]);

export function generateStaticParams() {
  return businessLines.filter((b) => !DEDICATED_ROUTES.has(b.slug)).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: getBusinessLine(slug)?.name ?? "Business Line" };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = getBusinessLine(slug);
  if (!line) notFound();

  const selected = projects
    .filter((p) => (slug === "infrastructure" ? p.category !== "tower" : p.category === "tower"))
    .slice(0, 3);

  return (
    <>
      <section className="relative bg-navy">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <HeroGround src={businessPhoto[line.slug]?.hero} />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,117,0.95),rgba(0,0,117,0.55))]" />
        </div>
        <Container className="relative py-14 lg:py-[110px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
            Business &mdash; {line.index} / 04
          </p>
          <Reveal>
            <h1 className="t-display mt-4.5 max-w-[14em] text-white">{line.name}</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="t-lead mt-6 max-w-[30em] text-white/80">{line.blurb}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="white" href="/projects">
                See Projects &rarr;
              </Button>
              <Button variant="onNavy" href="/contact">
                Request Capability Statement
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {line.scope && (
        <Section>
          <Container>
            <Split>
              <div>
                <Eyebrow>Scope</Eyebrow>
                <h2 className="t-h2 mt-3.5">What we deliver</h2>
                <RuleReveal className="mt-5" />
              </div>
              <div className="grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2">
                {line.scope.map((s) => (
                  <div key={s.title} className="bg-white p-6">
                    <h3 className="t-h3 text-[16px]">{s.title}</h3>
                    <p className="t-body mt-2.5 text-[13.5px]">{s.text}</p>
                  </div>
                ))}
              </div>
            </Split>
          </Container>
        </Section>
      )}

      {line.stats && (
        <Section tone="navy">
          <Container>
            <div className="grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {line.stats.map((s) => (
                <div key={s.label} className="bg-navy p-5 lg:p-8">
                  <p className="font-mono text-[26px] font-bold tracking-[-0.03em] lg:text-[42px]">
                    {s.value}
                  </p>
                  <p className="t-cap mt-2.5 text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="paper">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="t-h2 mt-3.5">Recent {line.name.toLowerCase()} projects</h2>
            </div>
            <Button variant="ghost" href="/projects">
              All Projects &rarr;
            </Button>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-11">
            {selected.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group block bg-white">
                <Photo
                  src={projectThumb(p.slug)}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
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
    </>
  );
}
