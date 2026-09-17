import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { directorPhoto } from "@/data/assets";

export const metadata: Metadata = { title: "Board of Directors" };

/**
 * Names and portraits come from the current company records; biographies and
 * appointment dates are still pending from Corporate Secretariat. The layout
 * takes any number of entries (3 per row at desktop, 2 at tablet, 1 at mobile).
 */
const directors = [
  { slug: "bambang-dwi-wijayanto", role: "President Director", name: "Bambang Dwi Wijayanto" },
  { slug: "ian-trevianto", role: "Director of Finance", name: "Ian Trevianto H.H" },
  { slug: "poerwanto", role: "Director of Operations", name: "Poerwanto" },
];

const tabs = [
  "Board of Directors",
  "Board of Commissioners",
  "Corporate Secretariat",
  "Internal Audit",
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero kicker="About — Leadership" title="Board of Directors" ring="center" />

      <Section>
        <Container>
          <div className="mb-7 flex flex-wrap gap-2.5 lg:mb-11">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                className={`border px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  i === 0
                    ? "border-navy bg-navy text-white"
                    : "border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {directors.map((d) => (
              <article key={d.role} className="group overflow-hidden bg-paper">
                <Photo
                  src={directorPhoto[d.slug]}
                  alt={`${d.name}, ${d.role}`}
                  hint={`Portrait — ${d.role}`}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="aspect-[4/5] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-6">
                  <p className="t-cap text-green">{d.role}</p>
                  <h2 className="t-h3 mt-2.5">{d.name}</h2>
                  <p className="t-body mt-3 text-[13.5px]">
                    Biography and appointment date to be supplied.
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="t-cap mt-5">
            Portraits from the current company records. Biographies and appointment dates to be
            supplied by Corporate Secretariat.
          </p>
        </Container>
      </Section>

      <Section id="structure" tone="paper">
        <Container>
          <Eyebrow>Structure</Eyebrow>
          <h2 className="t-h2 mt-3.5">Organizational structure</h2>
          <p className="t-body mt-4 max-w-[34em]">
            Replacing the current flat image with a structure that can be read and navigated on any
            screen.
          </p>

          <div className="mt-8 flex flex-col items-center lg:mt-12">
            <div className="bg-navy px-7 py-4 text-center text-white">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/60">
                GMS
              </p>
              <p className="t-h3 mt-1.5 text-[16px] text-white">
                General Meeting of Shareholders
              </p>
            </div>
            <span className="h-6.5 w-0.5 bg-navy/20" />
            <div className="grid w-full max-w-[760px] grid-cols-1 gap-6 sm:grid-cols-2">
              {["Board of Commissioners", "Board of Directors"].map((n) => (
                <div key={n} className="border border-navy/15 bg-white px-5.5 py-4 text-center">
                  <p className="t-h3 text-[15px]">{n}</p>
                </div>
              ))}
            </div>
            <span className="h-6.5 w-0.5 bg-navy/20" />
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Corporate Secretariat",
                "Internal Audit",
                "Operations & Projects",
                "Finance & HC",
              ].map((n) => (
                <div
                  key={n}
                  className="border border-navy/15 border-t-[3px] border-t-green bg-white p-4.5 text-center"
                >
                  <p className="t-h3 text-[14px]">{n}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
