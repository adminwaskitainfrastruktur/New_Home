import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Section, Split } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { AssetMap, MapRail } from "@/components/maps/AssetMap";
import { FleetTable } from "@/components/equipment/FleetTable";
import { fleetDeployment, fleetSummary, rentalReasons, rentalSteps } from "@/data/equipment";

export const metadata: Metadata = {
  title: "Heavy Equipment & Rental",
  description:
    "412 units of heavy equipment across earthmoving, hauling, lifting and production plant — available to rent, with certified operators and eight depots nationwide.",
};

/**
 * Screen 15. A dedicated route rather than a business/[slug] record, because
 * the rental catalogue, the fleet map and the enquiry flow have no equivalent
 * on the other three business lines.
 */
export default function HeavyEquipmentPage() {
  return (
    <>
      <section className="relative bg-navy">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <Image
            src="/img/operator-excavator.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,117,0.95)_0%,rgba(0,0,117,0.7)_55%,rgba(0,0,117,0.35)_100%)]" />
          <div className="absolute -right-[8%] -top-[60%] h-[700px] w-[700px] rounded-full border border-green/35" />
        </div>
        <Container className="relative py-12 lg:py-25">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
            Business &mdash; 02 / 04
          </p>
          <Reveal>
            <h1 className="t-display mt-4.5 max-w-[15em] text-white">
              Heavy Equipment
              <br />
              &amp; Rental
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="t-lead mt-5.5 max-w-[32em] text-white/80">
              {fleetSummary.total} units across earthmoving, hauling, lifting and production plant
              &mdash; operated by certified crews, maintained in our own workshops, and available to
              third parties.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7.5 flex flex-wrap gap-3">
              <Button variant="white" href="/contact?subject=equipment">
                Request a Quote &rarr;
              </Button>
              <Button variant="onNavy" href="/contact?subject=equipment">
                Download Fleet List
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Fleet size" value={String(fleetSummary.total)} note="units owned" />
          <Stat
            label="Available now"
            value={String(fleetSummary.available)}
            note="ready to mobilise"
            green
          />
          <Stat label="Utilisation" value={`${fleetSummary.utilisation}%`} bar={fleetSummary.utilisation} />
          <Stat label="Depots" value="08" note="Java, Sumatra, Kalimantan" />
        </div>
      </Container>

      {/* Map + rail. Collapses to one column below lg — the rail must never be
          squeezed into a ~150px column, which is what an inline grid-template did. */}
      <section className="bg-shell">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.55fr_.95fr]">
          <AssetMap layer="equipment" />
          <MapRail
            eyebrow="Fleet deployment"
            title="Where the fleet is working"
            note="Markers group units by site. Hover for category and utilisation; white markers are idle capacity available for hire."
            footer={
              <p className="font-mono text-[10px] uppercase leading-[1.7] tracking-[0.11em] text-white/55">
                Mobilisation typically 3&ndash;7 days within Java, 10&ndash;14 days inter-island.
                Operator and fuel options quoted separately.
              </p>
            }
          >
            {fleetDeployment.map((d) => (
              <div
                key={d.region}
                className="flex items-center justify-between gap-3 border-b border-white/15 pb-2.5 last:border-b-0 last:pb-0"
              >
                <span className="t-body text-[12.5px] text-white">{d.region}</span>
                <span
                  className={`font-mono text-[14px] font-bold ${d.highlight ? "text-green" : "text-white"}`}
                >
                  {d.units}
                </span>
              </div>
            ))}
          </MapRail>
        </div>
      </section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Fleet catalogue</Eyebrow>
              <h2 className="t-h2 mt-3.5">Available for rent</h2>
            </div>
          </div>
          <div className="mt-6">
            <FleetTable />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <Split>
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="t-h2 mt-3.5">From enquiry to mobilisation</h2>
              <p className="t-body mt-4.5 max-w-[26em]">
                Four steps. Most enquiries receive a written quotation within two working days.
              </p>
              <Button href="/contact?subject=equipment" className="mt-6.5">
                Start an Enquiry
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-px bg-navy/15 sm:grid-cols-2">
              {rentalSteps.map((s) => (
                <div key={s.index} className="bg-paper p-6">
                  <p className="font-mono text-[12px] tracking-[0.14em] text-red">{s.index}</p>
                  <h3 className="t-h3 mt-3 text-[16px]">{s.title}</h3>
                  <p className="t-body mt-2 text-[13px]">{s.text}</p>
                </div>
              ))}
            </div>
          </Split>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <Split>
            <div>
              <Eyebrow>Why rent from WKI</Eyebrow>
              <h2 className="t-h2 mt-3.5 max-w-[20em] text-white">
                A contractor&rsquo;s fleet, not a broker&rsquo;s list
              </h2>
            </div>
            <div>
              {rentalReasons.map((r) => (
                <div key={r.title} className="border-t border-white/20 py-4.5">
                  <h3 className="t-h3 text-[16px] text-white">{r.title}</h3>
                  <p className="t-body mt-2.5 text-[13px] text-white/70">{r.text}</p>
                </div>
              ))}
            </div>
          </Split>
        </Container>
      </Section>

      <Container className="py-11 lg:py-20">
        <div className="flex flex-wrap items-center justify-between gap-6.5 border-y border-navy/15 py-6.5 lg:py-12">
          <div>
            <h2 className="t-h2 max-w-[20em]">Need a unit on site next week?</h2>
            <p className="t-body mt-3.5">Equipment rental desk &mdash; Nirwan &middot; 021-8060 2821</p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <Button href="/contact?subject=equipment">Request a Quote</Button>
            <Button variant="ghost" href="/projects">
              See Our Projects
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

function Stat({
  label,
  value,
  note,
  green,
  bar,
}: {
  label: string;
  value: string;
  note?: string;
  green?: boolean;
  bar?: number;
}) {
  return (
    <div className="bg-white p-5 lg:p-7.5">
      <p className="t-cap">{label}</p>
      <p
        className={`mt-2.5 font-mono text-[22px] font-bold tracking-[-0.02em] lg:text-[34px] ${
          green ? "text-green" : "text-navy"
        }`}
      >
        {value}
      </p>
      {note && <p className="t-cap mt-1.5">{note}</p>}
      {bar !== undefined && (
        <div className="mt-3 h-1.5 overflow-hidden bg-navy/10">
          <span className="block h-full bg-navy" style={{ width: `${bar}%` }} />
        </div>
      )}
    </div>
  );
}
