import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Split } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { businessLines } from "@/data/company";
import { businessPhoto } from "@/data/assets";

export const metadata: Metadata = { title: "Business Lines" };

/** Alternating full-width bands — image side flips each row, Energy on green. */
export default function BusinessPage() {
  return (
    <>
      <PageHero
        kicker="Business"
        title="Business Lines"
        lead="Four capabilities held in one group, so a project can be funded, built, equipped and fabricated without leaving the company."
        showRule={false}
      />

      {businessLines.map((line, i) => {
        const flip = i % 2 === 1;
        const green = line.tone === "green";
        const ground = green ? "bg-green text-white" : line.tone === "paper" ? "bg-paper" : "bg-white";
        return (
          <Link
            key={line.slug}
            href={`/business/${line.slug}`}
            className={`group block border-b border-navy/15 last:border-b-0 ${ground}`}
          >
            <Container className="py-9 lg:py-16">
              <Split className="items-center">
                {flip && (
                  <Photo
                    src={businessPhoto[line.slug]?.band}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    hint={line.photoHint}
                    tone={green ? "navy" : "light"}
                    className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                <div>
                  <p
                    className={`font-mono text-[11px] tracking-[0.16em] ${
                      green ? "text-white/75" : "text-red"
                    }`}
                  >
                    {line.index}
                  </p>
                  <h2 className={`t-h2 mt-3.5 ${green ? "text-white" : ""}`}>{line.name}</h2>
                  <p
                    className={`t-body mt-4 max-w-[30em] ${green ? "text-white/85" : ""}`}
                  >
                    {line.blurb}
                  </p>
                  <p
                    className={`t-cap mt-5.5 transition-transform group-hover:translate-x-1 ${
                      green ? "text-white" : "text-green"
                    }`}
                  >
                    View business line &rarr;
                  </p>
                </div>
                {!flip && (
                  <Photo
                    src={businessPhoto[line.slug]?.band}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    hint={line.photoHint}
                    tone={green ? "navy" : "light"}
                    className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
              </Split>
            </Container>
          </Link>
        );
      })}
    </>
  );
}
