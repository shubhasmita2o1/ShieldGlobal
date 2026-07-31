import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import type { ServiceBlock } from "./serviceData";

/* ---------------------------------- Motion --------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------- Reusable primitives -------------------------- */

export function SectionEyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const color =
    tone === "dark" ? "text-sgg-ink-accent-dark" : "text-sgg-ink-accent";
  const bar =
    tone === "dark" ? "bg-sgg-ink-accent-dark" : "bg-sgg-ink-accent";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${color}`}
    >
      <span className={`h-px w-8 ${bar}`} />
      {children}
    </span>
  );
}

export function BlockHeading({
  block,
  tone = "light",
}: {
  block: ServiceBlock;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal>
      <SectionEyebrow tone={tone}>{block.eyebrow}</SectionEyebrow>
      <h2
        className={`mt-4 font-[Fraunces,serif] text-2xl font-semibold tracking-tight sm:text-3xl ${
          tone === "dark" ? "text-sgg-ink-inverse" : "text-sgg-ink-primary"
        }`}
      >
        {block.heading}
      </h2>
      {block.subheading && (
        <p
          className={`mt-4 text-base font-medium sm:text-lg ${
            tone === "dark" ? "text-sgg-ink-inverse-2" : "text-sgg-ink-secondary"
          }`}
        >
          {block.subheading}
        </p>
      )}
    </Reveal>
  );
}