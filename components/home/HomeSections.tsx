"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Container, Eyebrow, Section, Split } from "../ui/Layout";
import { Button } from "../ui/Button";
import { Photo } from "../ui/Photo";
import { Reveal, RevealGroup, RevealItem, RuleReveal } from "../motion/Reveal";
import { businessLines } from "@/data/company";
import { featuredProjects } from "@/data/projects";
import { articles } from "@/data/news";
import { articlePhoto, businessPhoto, pagePhoto, projectThumb } from "@/data/assets";

export function AboutTeaser() {
  const { t } = useLang();
  return (
    <Section className="pt-16 lg:pt-[110px]">
      <Container>
        <Split>
          <div>
            <Eyebrow>About Us</Eyebrow>
            <h2 className="t-h2 mt-4">{t("home.about.title")}</h2>
            <RuleReveal className="mt-5.5" />
            <p className="t-body mt-6">
              Waskita Karya Infrastruktur is a fast-growing infrastructure and energy company in
              Indonesia. We invest and operate infrastructure and facilities in key sectors such as
              power plant, oil and gas, mining, property, transportation, and utility sectors.
            </p>
            <p className="t-body mt-4">
              Through better planning, process, and management, we create facilities that help
              improve the quality of life of people. Every aspect of our business is characterized by
              professionalism and high standards of corporate governance.
            </p>
            <Button variant="ghost" href="/about" className="mt-7.5">
              {t("cta.readMore")} &rarr;
            </Button>
          </div>
          <div>
            <Photo
              src={pagePhoto.homeAbout}
              alt="Dam and reservoir delivered by Waskita Karya Infrastruktur, aerial view"
              hint="Photo — flagship project or HQ exterior, portrait crop"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] min-h-60"
            />
            <div className="mt-px flex gap-px bg-navy/15">
              <div className="flex-1 bg-navy p-5">
                <p className="font-mono text-[22px] font-bold text-white">2014</p>
                <p className="t-cap mt-1.5 text-white/60">Established</p>
              </div>
              <div className="flex-1 bg-paper p-5">
                <p className="font-mono text-[22px] font-bold text-navy">6</p>
                <p className="t-cap mt-1.5">Subsidiaries</p>
              </div>
            </div>
          </div>
        </Split>
      </Container>
    </Section>
  );
}

export function BusinessLinesGrid() {
  const { t } = useLang();
  return (
    <Section tone="paper">
      <Container>
        <Eyebrow>Explore Our</Eyebrow>
        <h2 className="t-h2 mt-3.5">{t("home.business.title")}</h2>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {businessLines.map((line) => (
            <RevealItem key={line.slug}>
              <Link href={`/business/${line.slug}`} className="group block overflow-hidden bg-white">
                <Photo
                  src={businessPhoto[line.slug]?.tile}
                  hint={line.photoHint}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="aspect-[3/4] min-h-50 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex flex-col gap-2.5 p-5.5">
                  <span className="t-cap text-green">{line.index}</span>
                  <h3 className="t-h3">{line.name}</h3>
                  <p className="t-body text-[13px]">{line.blurb}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

export function FeaturedProjects() {
  const { t } = useLang();
  return (
    <Section tone="navy" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[14%] -top-[60%] h-[820px] w-[820px] rounded-full border border-white/10"
      />
      <Container className="relative">
        <Split>
          <div>
            <Eyebrow>Featured</Eyebrow>
            <h2 className="t-h2 mt-3.5 text-white">{t("home.projects.title")}</h2>
            <p className="t-body mt-5 max-w-[26em] text-white/70">
              From the new capital at Nusantara to toll roads, dams and transmission towers across
              Sumatra, Java and Kalimantan.
            </p>
            <Button variant="white" href="/projects" className="mt-7">
              All 36 Projects &rarr;
            </Button>
          </div>
          <div className="flex flex-col gap-px bg-white/15">
            {featuredProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group flex items-center gap-5 py-5"
              >
                <Photo
                  src={projectThumb(p.slug)}
                  tone="navy"
                  sizes="120px"
                  className="h-[78px] w-[120px] shrink-0 border border-white/15 transition-transform duration-700 group-hover:scale-105"
                />
                <span className="min-w-0">
                  <span className="t-cap block text-green">{p.kicker}</span>
                  <span className="t-h3 mt-2 block text-[19px] text-white">{p.name}</span>
                </span>
                <span className="ml-auto text-[20px] text-white/50 transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </Split>
      </Container>
    </Section>
  );
}

const reasons = [
  {
    index: "01",
    title: "Integrated capability",
    text: "Investment, construction, equipment and fabrication held in one group, so a project is delivered without hand-off risk.",
    bar: "bg-navy",
  },
  {
    index: "02",
    title: "Governance first",
    text: "Certified management systems, an internal audit function and a whistleblowing channel open to every stakeholder.",
    bar: "bg-green",
  },
  {
    index: "03",
    title: "Proven delivery",
    text: "Palembang–Betung Section 2 was completed ahead of target; BOCIMI Section 3 and the IKN packages are progressing on plan.",
    bar: "bg-red",
  },
];

export function WhyChooseUs() {
  return (
    <Section>
      <Container>
        <Eyebrow>Why Choose Us</Eyebrow>
        <h2 className="t-h2 mt-3.5 max-w-[20em]">Professionalism, governance, and delivery</h2>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 border-t border-navy/15 md:grid-cols-3 lg:mt-12">
          {reasons.map((r) => (
            <RevealItem key={r.index} className={`-mt-0.5 border-t-[3px] pt-6.5 ${r.bar}`}>
              <p className="font-mono text-[12px] tracking-[0.14em] text-red">{r.index}</p>
              <h3 className="t-h3 mt-3.5">{r.title}</h3>
              <p className="t-body mt-3">{r.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

export function NewsTeaser() {
  const { t } = useLang();
  return (
    <Section tone="paper">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>News &amp; Event</Eyebrow>
            <h2 className="t-h2 mt-3.5">{t("home.news.title")}</h2>
          </div>
          <Button variant="ghost" href="/newsroom">
            {t("cta.allNews")} &rarr;
          </Button>
        </div>
        <RevealGroup className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-11">
          {articles.slice(0, 3).map((a) => (
            <RevealItem key={a.slug}>
              <Link
                href={`/newsroom/${a.slug}`}
                className="group block overflow-hidden border border-navy/15 bg-white transition-all duration-400 hover:-translate-y-1 hover:border-green hover:shadow-[0_18px_44px_rgba(0,0,117,0.12)]"
              >
                <Photo
                  src={articlePhoto[a.slug]?.card}
                  hint="Photo — article lead image"
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-6">
                  <p className="t-cap text-green">
                    {a.categoryLabel} &middot; {a.dateLabel}
                  </p>
                  <h3 className="t-h3 mt-3 text-[18px]">{a.title}</h3>
                  <p className="t-cap mt-4">Read more &rarr;</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

const sustainabilityStats = [
  { value: "50", unit: " MW", label: "Hydro capacity in development" },
  { value: "12", unit: "", label: "CSR programmes in 2025" },
  { value: "ISO", unit: "", label: "9001 · 14001 · 45001 certified" },
  { value: "0", unit: "", label: "Fatal incidents target, always" },
];

export function SustainabilityBand() {
  return (
    <Section tone="green">
      <Container>
        <Split className="items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">
              Sustainability &amp; CSR
            </p>
            <h2 className="t-h2 mt-3.5 text-white">
              Building with, and for, the communities around us
            </h2>
            <Button variant="white" href="/newsroom?category=csr" className="mt-7">
              See Our Programmes &rarr;
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-px bg-white/30 sm:grid-cols-2">
            {sustainabilityStats.map((s) => (
              <div key={s.label} className="bg-green p-6.5">
                <p className="font-mono text-[30px] font-bold">
                  {s.value}
                  {s.unit && <span className="text-[16px]">{s.unit}</span>}
                </p>
                <p className="t-cap mt-2 text-white/85">{s.label}</p>
              </div>
            ))}
          </div>
        </Split>
      </Container>
    </Section>
  );
}

export function ClosingCta() {
  const { t } = useLang();
  return (
    <Container className="py-11 lg:py-20">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6.5 border-y border-navy/15 py-7 lg:py-13">
          <h2 className="t-h2 max-w-[20em]">{t("home.cta.title")}</h2>
          <div className="flex flex-wrap gap-3.5">
            <Button href="/contact">{t("cta.talk")}</Button>
            <Button variant="ghost" href="/career">
              {t("cta.join")}
            </Button>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
