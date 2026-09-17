import { clsx } from "./clsx";

/** Page gutter. Matches the mockup's clamp(20px, 5vw, 88px). */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("px-5 sm:px-10 lg:px-[88px]", className)}>{children}</div>
  );
}

/** Vertical section rhythm. `tone` sets the ground colour. */
export function Section({
  tone = "white",
  className,
  id,
  children,
}: {
  tone?: "white" | "paper" | "navy" | "green" | "shell";
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  const tones = {
    white: "bg-white",
    paper: "bg-paper",
    navy: "bg-navy text-white",
    green: "bg-green text-white",
    shell: "bg-shell text-white",
  } as const;
  return (
    <section
      id={id}
      className={clsx("py-12 sm:py-16 lg:py-[108px]", tones[tone], className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={clsx("t-eyebrow", className)}>{children}</p>;
}

/** The 3px red rule that sits under a section title. 5% of the palette, no more. */
export function Rule({ className }: { className?: string }) {
  return <span className={clsx("block h-[3px] w-[54px] bg-red", className)} />;
}

/**
 * Two-column editorial split: heading left, body right.
 * Collapses to one column below `lg` (the 834 breakpoint).
 */
export function Split({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-[72px]",
        className
      )}
    >
      {children}
    </div>
  );
}
