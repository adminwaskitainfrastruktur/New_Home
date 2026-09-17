import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { coreValues, missionPoints } from "@/data/company";

export const metadata: Metadata = { title: "Vision & Mission" };

export default function VisionPage() {
  return (
    <>
      <PageHero kicker="About — Vision, Mission & Core Values" title="Vision & Mission" ring="left" />

      <Section>
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col justify-between gap-7.5 bg-navy p-6.5 text-white lg:p-13">
              <Eyebrow>Vision</Eyebrow>
              <p className="t-display-sm max-w-[16em] text-white">
                To become a trusted, sustainable infrastructure and energy investment company in
                Indonesia.
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                2026 Statement
              </p>
            </div>
            <div className="bg-paper p-6.5 lg:p-13">
              <Eyebrow className="text-navy">Mission</Eyebrow>
              <div className="mt-6.5">
                {missionPoints.map((point, i) => (
                  <div key={point.slice(0, 20)} className="flex gap-4.5 border-t border-navy/15 py-4.5">
                    <span className="pt-0.5 font-mono text-[12px] font-bold text-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="t-body text-ink">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="core-values" tone="paper">
        <Container>
          <Eyebrow>Core Values</Eyebrow>
          <h2 className="t-h2 mt-3.5">AKHLAK</h2>
          <p className="t-body mt-4 max-w-[34em]">
            The shared values of Indonesian state-owned enterprises, applied to how we plan, build
            and operate.
          </p>
          <RevealGroup className="mt-8 grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {coreValues.map((v) => (
              <RevealItem key={v.name} className="bg-white p-5.5 lg:p-8.5">
                <p className="font-mono text-[11px] tracking-[0.14em] text-green">{v.index}</p>
                <h3 className="t-h3 mt-3.5">{v.name}</h3>
                <p className="t-body mt-2.5 text-[13.5px]">{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section>
        <Container>
          <Split>
            <div>
              <Eyebrow>Corporate Identity</Eyebrow>
              <h2 className="t-h2 mt-3.5">The mark</h2>
              <p className="t-body mt-4.5 max-w-[26em]">
                The W is carried by two orbits: green for sustainable growth, red for the drive to
                move forward. Navy holds both, standing for trust, professionalism and stability.
              </p>
            </div>
            <div className="flex items-center justify-center bg-paper p-7 lg:p-14">
              <Image
                src="/brand/logo-wki.png"
                alt="Waskita Karya Infrastruktur logo"
                width={519}
                height={404}
                className="w-full max-w-[360px]"
              />
            </div>
          </Split>
        </Container>
      </Section>
    </>
  );
}
