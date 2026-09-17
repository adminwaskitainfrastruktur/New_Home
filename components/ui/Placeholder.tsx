import { clsx } from "./clsx";

/**
 * Striped placeholder standing in for photography that has not been supplied.
 * Delete this component once real assets land — every usage site then takes
 * `next/image` with the same aspect ratio.
 */
export function Placeholder({
  hint,
  className,
  tone = "light",
}: {
  hint?: string;
  className?: string;
  tone?: "light" | "navy";
}) {
  return (
    <div
      className={clsx(
        "relative flex items-end overflow-hidden p-3.5",
        tone === "navy" ? "bg-stripe-navy" : "bg-stripe",
        className
      )}
    >
      {hint ? (
        <span
          className={clsx(
            "font-mono text-[9.5px] uppercase leading-[1.4] tracking-[0.1em]",
            tone === "navy" ? "text-white/45" : "text-cap"
          )}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}
