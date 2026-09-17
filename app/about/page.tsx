import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { RevealGroup, RevealItem, RuleReveal } from "@/components/motion/Reveal";
import { certifications, groupCompanies } from "@/data/company";
import { pagePhoto } from "@/data/assets";

export const metadata: Metadata = { title: "Introduction" };

const stats = [
  { value: "2014", label: "Year established" },
  { value: "36", label: "Projects delivered & running" },
  { value: "04", label: "Business lines" },
  { value: "06", label: "Subsidiaries & ventures" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About — Introduction" title="Introduction" />

      <Section>
        <Container>
          <Split>
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="t-h2 mt-4 max-w-[18em]">
                A fast-growing infrastructure and energy company in Indonesia
              </h2>
              <RuleReveal className="mt-5" />
            </div>
            <div>
              <p className="t-body">
                We invest and operate infrastructure and facilities in key sectors such as power
                plant, oil and gas, mining, property, transportation, and utility sectors. Since our
                inception, we have been vastly engaged in some major energy and infrastructure
                projects.
              </p>
              <p className="t-body mt-4">
                Through better planning, process, and management, we create facilities that help
                improve the quality of life of people. Every aspect of our business is characterized
                by professionalism and high standards of corporate governance.
              </p>
              <p className="t-body mt-4">
                We collaborate with industry leaders and research institutions to ensure that our
                projects conform to the industry&rsquo;s best practices. We are committed to
                delivering excellence in every single project we do.
              </p>
            </div>
          </Split>
          <Photo
            src={pagePhoto.aboutEstablishing}
            alt="Steel truss bridge crossing a reservoir, aerial view"
            hint="Photo — wide establishing shot, toll road or dam at scale"
            className="mt-9 aspect-[21/9] min-h-55 lg:mt-16"
          />
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <Eyebrow>At a glance</Eyebrow>
          <h2 className="t-h2 mt-3.5">The company in numbers</h2>
          <div className="mt-8 grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-5 lg:p-8">
                <p className="font-mono text-[26px] font-bold tracking-[-0.03em] text-navy lg:text-[42px]">
                  {s.value}
                </p>
                <p className="t-cap mt-2.5">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="group">
        <Container>
          <Eyebrow>The Group</Eyebrow>
          <h2 className="t-h2 mt-3.5">Subsidiaries &amp; joint ventures</h2>
          <RevealGroup className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-11 lg:grid-cols-3">
            {groupCompanies.map((c) => (
              <RevealItem
                key={c.name}
                className="h-full border border-navy/15 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-green hover:shadow-[0_18px_44px_rgba(0,0,117,0.12)]"
              >
                <p className="t-cap text-green">{c.tag}</p>
                <h3 className="t-h3 mt-3 text-[18px]">{c.name}</h3>
                <p className="t-body mt-2.5 text-[13.5px]">{c.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section id="accreditation" tone="paper">
        <Container>
          <Split>
            <div>
              <Eyebrow>Accreditation</Eyebrow>
              <h2 className="t-h2 mt-3.5">Certifications &amp; awards</h2>
              <p className="t-body mt-4.5 max-w-[26em]">
                Management systems audited and certified, with recognition from national governance
                bodies.
              </p>
            </div>
            <div className="border-t border-navy/15">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 py-4.5 last:border-b-0"
                >
                  <span className="t-h3 text-[16px]">{c.name}</span>
                  <span className="t-cap">{c.scope}</span>
                </div>
              ))}
            </div>
          </Split>
        </Container>
      </Section>
    </>
  );
}
