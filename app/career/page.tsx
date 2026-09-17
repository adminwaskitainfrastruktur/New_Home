import type { Metadata } from "next";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { HeroGround } from "@/components/ui/Photo";
import { hiringSteps, vacancies } from "@/data/company";
import { pagePhoto } from "@/data/assets";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <>
      <section className="relative bg-navy">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <HeroGround src={pagePhoto.careerHero} />
          <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(0,0,117,0.95),rgba(11,157,89,0.35))]" />
        </div>
        <Container className="relative py-13 lg:py-30">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">Career</p>
          <Reveal>
            <h1 className="t-display mt-4.5 max-w-[15em] text-white">
              Build the country&rsquo;s infrastructure
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="t-lead mt-6 max-w-[30em] text-white/85">
              Engineering, project management, finance and corporate roles across Java, Sumatra and
              Kalimantan.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Button variant="white" href="#positions" className="mt-8">
              See open positions &rarr;
            </Button>
          </Reveal>
        </Container>
      </section>

      <Section id="positions">
        <Container>
          <Eyebrow>Open positions</Eyebrow>
          <h2 className="t-h2 mt-3.5">{vacancies.length} vacancies</h2>
          <div className="mt-7 border-t border-navy/15 lg:mt-11">
            {vacancies.map((v) => (
              <a
                key={v.title}
                href="#"
                className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 py-4.5 transition-all hover:border-green hover:pl-2"
              >
                <span>
                  <span className="t-h3 block text-[17px]">{v.title}</span>
                  <span className="t-cap mt-2 block">{v.meta}</span>
                </span>
                <span className="t-cap text-red">Apply</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <Split>
            <div>
              <Eyebrow>Process</Eyebrow>
              <h2 className="t-h2 mt-3.5">How hiring works</h2>
              <p className="t-body mt-4.5 max-w-[26em]">
                Four stages, typically four to six weeks. Every applicant receives an outcome.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2">
              {hiringSteps.map((s) => (
                <div key={s.index} className="bg-paper p-6">
                  <p className="font-mono text-[12px] tracking-[0.14em] text-red">{s.index}</p>
                  <h3 className="t-h3 mt-3 text-[16px]">{s.title}</h3>
                  <p className="t-body mt-2 text-[13.5px]">{s.text}</p>
                </div>
              ))}
            </div>
          </Split>
        </Container>
      </Section>

      {/* Anti-fraud notice — stated plainly, on green, so it cannot be missed. */}
      <Section tone="green">
        <Container>
          <Split className="items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">
                Beware of fraud
              </p>
              <h2 className="t-h2 mt-3.5 max-w-[20em] text-white">
                WKI never charges any fee in its recruitment process
              </h2>
              <p className="t-body mt-4.5 max-w-[28em] text-white/85">
                All official vacancies are published on this page. Report suspicious offers to the
                Corporate Secretariat.
              </p>
            </div>
            <div>
              <Button variant="white" href="/contact">
                Report to us
              </Button>
            </div>
          </Split>
        </Container>
      </Section>
    </>
  );
}
