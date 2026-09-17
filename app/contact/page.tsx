import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Placeholder } from "@/components/ui/Placeholder";
import { ContactForm } from "@/components/contact/ContactForm";
import { utilityInfo } from "@/lib/nav";

export const metadata: Metadata = { title: "Contact" };

const desks = [
  { title: "Construction rental", person: "Ali" },
  { title: "Equipment rental", person: "Nirwan" },
  { title: "Steel trading", person: "Catur" },
  { title: "Material trading", person: "Arief" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title="Get in touch" />

      <Section>
        <Container>
          <Split>
            <div>
              <Eyebrow>Head office</Eyebrow>
              <h2 className="t-h2 mt-3.5 max-w-[18em]">Waskita &ndash; ID Survey Tower</h2>
              <p className="t-body mt-4.5">
                {utilityInfo.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <dl className="mt-7 border-t border-navy/15">
                <Row label="Phone" value={utilityInfo.phone} href={utilityInfo.phoneHref} />
                <Row
                  label="Email"
                  value={utilityInfo.email}
                  href={`mailto:${utilityInfo.email}`}
                />
                <Row
                  label="Portal"
                  value="portal.waskitainfrastruktur.co.id"
                  href={utilityInfo.portal}
                  last
                />
              </dl>

              <Eyebrow className="mt-8.5">Business enquiries</Eyebrow>
              <div className="mt-4 grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2">
                {desks.map((d) => (
                  <div key={d.title} className="bg-white p-5">
                    <p className="t-h3 text-[15px]">{d.title}</p>
                    <p className="t-cap mt-2">{d.person}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <ContactForm />
              <Placeholder
                hint="Map — embedded location, MT Haryono Kav. 13"
                className="mt-px aspect-video"
              />
            </div>
          </Split>
        </Container>
      </Section>
    </>
  );
}

function Row({
  label,
  value,
  href,
  last,
}: {
  label: string;
  value: string;
  href: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 py-4 ${
        last ? "" : "border-b border-navy/10"
      }`}
    >
      <dt className="t-cap">{label}</dt>
      <dd>
        <a href={href} className="t-body font-semibold text-navy">
          {value}
        </a>
      </dd>
    </div>
  );
}
