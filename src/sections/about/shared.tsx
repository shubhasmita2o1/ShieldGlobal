import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

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
  show: { transition: { staggerChildren: 0.12 } },
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

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0a8fb8]">
      <span className="h-px w-8 bg-[#0a8fb8]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}