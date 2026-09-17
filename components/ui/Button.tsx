import Link from "next/link";
import { clsx } from "./clsx";

type Variant = "solid" | "ghost" | "white" | "onNavy";

const base =
  "inline-flex items-center gap-[11px] whitespace-nowrap px-[26px] py-[15px] font-sans text-[12.5px] font-semibold uppercase tracking-[0.09em] transition-all duration-300 disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-navy text-white hover:-translate-y-0.5 hover:bg-green",
  ghost:
    "border border-navy/30 px-[25px] py-[14px] text-navy hover:border-green hover:text-green",
  white: "bg-white text-navy hover:bg-green hover:text-white",
  onNavy: "border border-white/40 text-white hover:border-green hover:bg-green",
};

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  variant = "solid",
  href,
  className,
  children,
  onClick,
  type = "button",
}: Props) {
  const cls = clsx(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
