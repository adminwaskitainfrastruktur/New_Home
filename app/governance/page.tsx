import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { kipGroups } from "@/data/company";

export const metadata: Metadata = { title: "Corporate Governance" };

const pillars = [
  {
    id: "framework",
    title: "Governance framework",
    text: "GCG guidelines, code of conduct, board charters and committee structure.",
    cta: "4 documents",
    bar: "border-t-navy",
  },
  {
    id: "wbs",
    title: "Whistleblowing System",
    text: "Report suspected fraud, corruption or misconduct. Confidential, with protection for the reporter.",
    cta: "Submit a report",
    bar: "border-t-green",
  },
  {
    id: "gratification",
    title: "Reporting of Gratification",
    text: "Declare gifts and hospitality received in the course of duty, per KPK guidance.",
    cta: "Open form",
    bar: "border-t-red",
  },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        kicker="Governance"
        title="Corporate Governance & Public Information"
        lead="Everything a stakeholder, regulator or journalist needs, in one place — replacing the previous Information and KIP menus."
        ring="left"
        showRule={false}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-px bg-navy/15 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.id}
                id={p.id}
                className={`border-t-[3px] bg-white p-5.5 lg:p-8.5 ${p.bar}`}
              >
                <h2 className="t-h3">{p.title}</h2>
                <p className="t-body mt-3 text-[13.5px]">{p.text}</p>
                <p className="t-cap mt-4.5 text-green">{p.cta} &rarr;</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="kip" tone="paper" className="pt-0">
        <Container className="pt-10 lg:pt-20">
          <Split>
            <div>
              <Eyebrow>KIP</Eyebrow>
              <h2 className="t-h2 mt-3.5">Public information</h2>
              <p className="t-body mt-4.5 max-w-[26em]">
                Published under Indonesia&rsquo;s public information disclosure framework, grouped by
                disclosure obligation.
              </p>
            </div>

            <div id="documents">
              {kipGroups.map((group, i) => (
                <details
                  key={group.id}
                  open={i === 0}
                  className="group border-t border-navy/15 last:border-b"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-bold tracking-[-0.01em] text-navy transition-colors hover:text-green lg:text-[19px]">
                    {group.title}
                    <span className="text-[20px] leading-none text-red">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">&minus;</span>
                    </span>
                  </summary>
                  <div className="pb-4.5">
                    {group.items.map((item) => (
                      <a
                        key={item.label}
                        href="#"
                        className="flex items-center justify-between gap-4 border-b border-navy/10 py-4 transition-all last:border-b-0 hover:border-green hover:pl-2"
                      >
                        <span className="t-body font-semibold text-navy">{item.label}</span>
                        <span className="t-cap text-red">{item.meta}</span>
                      </a>
                    ))}
                  </div>
                </details>
              ))}

              <details className="group border-t border-navy/15 border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-bold tracking-[-0.01em] text-navy transition-colors hover:text-green lg:text-[19px]">
                  Information request
                  <span className="text-[20px] leading-none text-red">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>
                <div className="pb-5.5">
                  <p className="t-body">
                    Submit a request through the online form. Requests are answered within 10 working
                    days, extendable by 7 days with written notice.
                  </p>
                  <Button className="mt-4.5">Open request form</Button>
                </div>
              </details>
            </div>
          </Split>
        </Container>
      </Section>
    </>
  );
}
