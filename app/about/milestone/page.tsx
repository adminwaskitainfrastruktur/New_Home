import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui/Layout";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { milestones } from "@/data/company";

export const metadata: Metadata = { title: "Milestone" };

export default function MilestonePage() {
  return (
    <>
      <PageHero kicker="About — Milestone" title="Milestone" />

      <Section>
        <Container>
          <Eyebrow>2014 &mdash; 2026</Eyebrow>
          <h2 className="t-h2 mt-3.5 max-w-[22em]">
            Twelve years from a new subsidiary to an integrated infrastructure group
          </h2>

          <RevealGroup className="mt-9 lg:mt-16">
            {milestones.map((m, i) => {
              const dot =
                m.accent === "red" ? "bg-red" : m.accent === "green" ? "bg-green" : "bg-navy";
              const last = i === milestones.length - 1;
              return (
                <RevealItem key={m.year} className="flex items-start gap-5 lg:gap-12">
                  <span
                    className={`w-[70px] shrink-0 font-mono text-[20px] font-bold tracking-[-0.02em] lg:w-[130px] lg:text-[34px] ${
                      m.accent === "red" ? "text-red" : "text-navy"
                    }`}
                  >
                    {m.year}
                  </span>
                  <span
                    className={`relative w-0.5 shrink-0 self-stretch ${
                      last ? "bg-[linear-gradient(#BD0004,transparent)]" : "bg-navy/15"
                    }`}
                  >
                    <span
                      className={`absolute -left-[5px] top-2 h-3 w-3 rounded-full ${dot}`}
                    />
                  </span>
                  <span className="flex-1 pb-6.5 lg:pb-11">
                    <span
                      className={`t-h3 block ${m.accent === "red" ? "text-red" : ""}`}
                    >
                      {m.title}
                    </span>
                    <span className="t-body mt-2.5 block max-w-[40em]">{m.text}</span>
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
