import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { articles, newsCategories, tenders } from "@/data/news";
import { articlePhoto } from "@/data/assets";

export const metadata: Metadata = { title: "News & Events" };

export default function NewsroomPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero kicker="Newsroom" title="News & Events" />

      <div className="border-b border-navy/15 bg-white">
        <Container className="py-6">
          <div className="flex flex-wrap gap-2.5">
            {newsCategories.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`whitespace-nowrap border px-4.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  i === 0
                    ? "border-navy bg-navy text-white"
                    : "border-navy/20 text-navy hover:border-green hover:text-green"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Section className="pt-8 lg:pt-13">
        <Container>
          <Link href={`/newsroom/${lead.slug}`} className="group block">
            <Split className="items-center">
              <Photo
                src={articlePhoto[lead.slug]?.card}
                sizes="(min-width: 1024px) 50vw, 100vw"
                hint="Photo — lead story image"
                className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div>
                <p className="t-cap text-green">
                  {lead.categoryLabel} &middot; {lead.dateLabel}
                </p>
                <h2 className="t-h2 mt-3.5 max-w-[20em]">{lead.title}</h2>
                <p className="t-body mt-4 max-w-[32em]">{lead.excerpt}</p>
                <p className="t-cap mt-5.5 text-red transition-transform group-hover:translate-x-1">
                  Read the release &rarr;
                </p>
              </div>
            </Split>
          </Link>

          <RevealGroup className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {rest.map((a) => (
              <RevealItem key={a.slug}>
                <Link
                  href={`/newsroom/${a.slug}`}
                  className="group block h-full overflow-hidden border border-navy/15 bg-white transition-all duration-400 hover:-translate-y-1 hover:border-green hover:shadow-[0_18px_44px_rgba(0,0,117,0.12)]"
                >
                  <Photo
                    src={articlePhoto[a.slug]?.card}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-5.5">
                    <p className="t-cap text-green">
                      {a.categoryLabel} &middot; {a.dateLabel}
                    </p>
                    <h3 className="t-h3 mt-3 text-[17px]">{a.title}</h3>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-8 flex justify-center lg:mt-13">
            <Button variant="ghost">Load more</Button>
          </div>
        </Container>
      </Section>

      <Section id="procurement" tone="navy">
        <Container>
          <Split className="items-center">
            <div>
              <Eyebrow>Procurement</Eyebrow>
              <h2 className="t-h2 mt-3.5 text-white">Open tenders and vendor registration</h2>
              <p className="t-body mt-4.5 max-w-[28em] text-white/70">
                Announcements are published here and on the WKI portal. Vendor registration is open
                year-round.
              </p>
            </div>
            <div className="border-t border-white/20">
              {tenders.map((t) => (
                <div
                  key={t.title}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 py-4.5 last:border-b-0"
                >
                  <div>
                    <p className="t-h3 text-[15px] text-white">{t.title}</p>
                    <p className="t-cap mt-1.5 text-white/55">{t.closes}</p>
                  </div>
                  <span className={`t-cap ${t.open ? "text-green" : "text-white/45"}`}>
                    {t.open ? "Open" : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </Split>
        </Container>
      </Section>
    </>
  );
}
