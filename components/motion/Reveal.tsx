"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { easing, duration } from "@/lib/tokens";

/**
 * The only motion primitive on the site: a short upward reveal, once, on scroll in.
 * Brief calls for "halus (fade & reveal)" — no parallax, no counters.
 */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/** Stagger container: children animate in sequence. */
export const staggerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Reveal({
  children,
  delay = 0,
  variant = "rise",
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: "rise" | "fade";
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={variant === "rise" ? riseVariants : fadeVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: duration.slow, ease: easing, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wrap a group; each direct <RevealItem> child animates in sequence. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={riseVariants}
      transition={{ duration: duration.slow, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

/** The red section rule, drawn left to right when it enters. */
export function RuleReveal({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`block h-[3px] w-[54px] origin-left bg-red ${className ?? ""}`}
      initial={reduce ? undefined : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: easing }}
    />
  );
}
