import Image from "next/image";
import { clsx } from "./clsx";
import { Placeholder } from "./Placeholder";

/**
 * Photograph slot. Renders the supplied image with `object-cover`, or falls
 * back to the striped <Placeholder> when no photo exists yet — so a usage site
 * can be wired to data/assets.ts now and lights up as photography lands.
 *
 * `className` carries the slot geometry (aspect ratio, hover scale) exactly as
 * it did on <Placeholder>, so swapping one for the other changes no layout.
 */
export function Photo({
  src,
  alt = "",
  hint,
  className,
  tone = "light",
  sizes = "100vw",
  priority,
}: {
  src?: string;
  alt?: string;
  /** Caption shown only by the placeholder fallback. */
  hint?: string;
  className?: string;
  tone?: "light" | "navy";
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) return <Placeholder hint={hint} className={className} tone={tone} />;

  return (
    <div className={clsx("relative overflow-hidden", tone === "navy" ? "bg-navy" : "bg-paper", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/**
 * Full-bleed photo ground for the navy heroes. Falls back to the navy stripe
 * pattern the heroes used before photography was supplied.
 */
export function HeroGround({ src, priority = true }: { src?: string; priority?: boolean }) {
  if (!src) return <div className="absolute inset-0 bg-stripe-navy" />;
  return <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover" />;
}
