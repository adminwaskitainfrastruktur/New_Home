/**
 * Shared page header for every inner page: navy band, breadcrumb-style kicker,
 * title, optional lead, and a decorative orbit ring lifted from the logo.
 */
import { Container } from "./Layout";
import { Reveal, RuleReveal } from "../motion/Reveal";
import { clsx } from "./clsx";

export function PageHero({
  kicker,
  title,
  lead,
  ring = "right",
  showRule = true,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  ring?: "right" | "left" | "center";
  showRule?: boolean;
  className?: string;
}) {
  const ringPos = {
    right: "-right-[6%] -top-[70%]",
    left: "-left-[10%] -bottom-[130%]",
    center: "left-[38%] -top-[90%]",
  } as const;

  return (
    <section className={clsx("relative overflow-hidden bg-navy text-white", className)}>
      <div
        aria-hidden
        className={clsx(
          "pointer-events-none absolute h-[720px] w-[720px] rounded-full border border-green/35",
          ringPos[ring]
        )}
      />
      <Container className="relative py-11 lg:py-[86px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">{kicker}</p>
        <Reveal delay={0.05}>
          <h1 className="t-display-sm mt-4.5 max-w-[20em] text-white">{title}</h1>
        </Reveal>
        {showRule && <RuleReveal className="mt-5.5" />}
        {lead && (
          <Reveal delay={0.12}>
            <p className="t-lead mt-5.5 max-w-[32em] text-white/75">{lead}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
