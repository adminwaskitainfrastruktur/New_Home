import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/news";
import { Container, Eyebrow, Section } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { articlePhoto } from "@/data/assets";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: getArticle(slug)?.title ?? "Article" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Container className="pt-8 lg:pt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cap">
          Newsroom &mdash; {article.categoryLabel}
        </p>
        <Reveal>
          <h1 className="mt-5 max-w-[24em] text-[28px] font-bold leading-[1.04] tracking-[-0.03em] text-navy lg:text-[56px]">
            {article.title}
          </h1>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center gap-5.5 border-b border-navy/15 pb-6">
          <time className="t-cap" dateTime={article.date}>
            {article.dateLabel}
          </time>
          {article.author && <span className="t-cap">{article.author}</span>}
          <button type="button" className="t-cap text-red">
            Share
          </button>
        </div>

        <Photo
          src={articlePhoto[article.slug]?.hero ?? articlePhoto[article.slug]?.card}
          priority
          hint="Photo — lead image, press conference or site handover"
          className="mt-7 aspect-[21/9] min-h-50"
        />

        {/* 1/3 rail + 2/3 measure. Body measure stays under ~70 characters. */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[0.32fr_0.68fr] lg:gap-[72px]">
          <aside>
            <Eyebrow>In this release</Eyebrow>
            <div className="mt-4 flex flex-col gap-2.5">
              {["Return to profit in 2025", "New contract position", "Outlook for 2026"].map((s) => (
                <span key={s} className="t-body text-[13.5px]">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-7.5 border-t border-navy/15 pt-5">
              <p className="t-cap">Media contact</p>
              <p className="t-body mt-2.5 text-[13.5px]">
                Corporate Secretariat
                <br />
                info.wki@waskitainfrastruktur.co.id
              </p>
            </div>
          </aside>

          <article>
            {article.body?.map((para, i) =>
              i === 0 ? (
                <p key={para.slice(0, 24)} className="t-lead font-medium text-navy">
                  {para}
                </p>
              ) : (
                <p key={para.slice(0, 24)} className="t-body mt-4">
                  {para}
                </p>
              )
            )}
            {article.pullQuote && (
              <blockquote className="mt-7 border-l-[3px] border-green py-1.5 pl-6">
                <p className="t-lead text-navy">&ldquo;{article.pullQuote.text}&rdquo;</p>
                <footer className="t-cap mt-3">{article.pullQuote.attribution}</footer>
              </blockquote>
            )}
            {article.tags && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-navy/20 px-3.5 py-[7px] font-mono text-[11px] uppercase tracking-[0.1em] text-navy"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </div>
      </Container>

      <Section tone="paper" className="mt-9 lg:mt-16">
        <Container>
          <Eyebrow>Next</Eyebrow>
          <h2 className="t-h2 mt-3.5">More from the newsroom</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-11">
            {more.map((a) => (
              <Link key={a.slug} href={`/newsroom/${a.slug}`} className="group block bg-white">
                <Photo
                  src={articlePhoto[a.slug]?.card}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="t-cap text-green">
                    {a.categoryLabel} &middot; {a.dateLabel}
                  </p>
                  <h3 className="t-h3 mt-2.5 text-[17px]">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
