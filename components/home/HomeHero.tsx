"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Container } from "../ui/Layout";
import { Button } from "../ui/Button";
import { Reveal } from "../motion/Reveal";
import { HeroGround } from "../ui/Photo";
import { pagePhoto } from "@/data/assets";

/**
 * Full-bleed hero (option 1a from the review): photograph ground, navy gradient
 * scrim for text contrast, two orbit rings, and a three-card row that overlaps
 * the fold below.
 */
export function HomeHero() {
  const { t } = useLang();
  const [line1, line2] = t("home.hero.title").split("\n");

  return (
    <>
      <section className="relative bg-navy">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <HeroGround src={pagePhoto.homeHero} />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,117,0.94)_0%,rgba(0,0,117,0.72)_48%,rgba(0,0,117,0.25)_100%)]" />
          <div className="absolute -right-[8%] -top-[24%] h-[760px] w-[760px] rounded-full border border-white/15" />
          <div className="absolute -bottom-[36%] right-[4%] h-[620px] w-[620px] rounded-full border border-green/40" />
        </div>

        <Container className="relative pb-32 pt-16 lg:pb-[210px] lg:pt-[150px]">
          <Reveal variant="fade">
            <p className="t-eyebrow">PT Waskita Karya Infrastruktur</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="t-display mt-5 max-w-[14em] text-white">
              {line1}
              <br />
              {line2}
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="t-lead mt-6.5 max-w-[30em] text-white/80">{t("home.hero.lead")}</p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-8.5 flex flex-wrap gap-3">
              <Button variant="white" href="/about">
                {t("cta.explore")} &rarr;
              </Button>
              <Button variant="onNavy" href="/projects">
                {t("cta.allProjects")}
              </Button>
            </div>
          </Reveal>
          <div className="mt-10 flex items-center gap-6.5 lg:mt-[72px]">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
              Scroll
            </span>
            <span className="h-px max-w-[180px] flex-1 bg-white/25" />
          </div>
        </Container>
      </section>

      {/* Overlapping entry cards — the fastest route into the three things
          different audiences come for: projects, capability, governance. */}
      <Container className="relative z-20 -mt-16 lg:-mt-[100px]">
        <div className="grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-3">
          <HeroCard href="/projects" figure="36" label="Projects delivered & in progress" cta="View index" />
          <HeroCard href="/business" figure="04" label="Business lines under one group" cta="Explore" />
          <HeroCard
            href="/governance"
            figure="GCG"
            label="Governance, WBS & public information"
            cta="Open"
            tone="green"
          />
        </div>
      </Container>
    </>
  );
}

function HeroCard({
  href,
  figure,
  label,
  cta,
  tone = "white",
}: {
  href: string;
  figure: string;
  label: string;
  cta: string;
  tone?: "white" | "green";
}) {
  const green = tone === "green";
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-3 p-6 transition-transform duration-400 hover:-translate-y-1 lg:p-8.5 ${
        green ? "bg-green" : "bg-white"
      }`}
    >
      <span
        className={`font-mono text-[28px] font-bold tracking-[-0.03em] lg:text-[46px] ${
          green ? "text-white" : "text-navy"
        }`}
      >
        {figure}
      </span>
      <span className={`t-h3 text-[16px] ${green ? "text-white" : ""}`}>{label}</span>
      <span
        className={`t-cap ${green ? "text-white/85" : "text-green"} transition-transform group-hover:translate-x-1`}
      >
        {cta} &rarr;
      </span>
    </Link>
  );
}
