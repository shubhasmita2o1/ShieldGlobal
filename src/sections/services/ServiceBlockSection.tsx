import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { ServiceBlock } from "./serviceData";
import { BlockHeading, Reveal, SectionEyebrow, fadeUp, stagger } from "./shared";

export function ServiceBlockSection({ block }: { block: ServiceBlock }) {
  const Icon = block.icon;

  if (block.variant === "dark") {
    return (
      <section className="bg-sgg-surface-dark">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <BlockHeading block={block} tone="dark" />
          <motion.ul
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {block.items.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 rounded-2xl border border-sgg-border-dark bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-sgg-border-accent hover:bg-white/[0.08]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sgg-ink-accent-dark/15 text-sgg-ink-accent-dark">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0 text-base font-medium text-sgg-ink-inverse">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    );
  }

  if (block.variant === "cards") {
    return (
      <section className="bg-sgg-surface-raised">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <BlockHeading block={block} />
          <motion.ul
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {block.items.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-sgg-border-default bg-sgg-surface-raised p-7 shadow-[var(--sgg-e1)] transition-all duration-300 hover:border-sgg-border-accent hover:shadow-[var(--sgg-e3)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[image:var(--sgg-g-cta)] transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sgg-surface-dark text-sgg-ink-inverse transition-colors duration-300 group-hover:bg-sgg-ink-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold leading-snug text-sgg-ink-primary">
                  {item}
                </h3>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    );
  }

  if (block.variant === "checks") {
    return (
      <section className="bg-sgg-surface-raised">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionEyebrow>{block.eyebrow}</SectionEyebrow>
              <h2 className="mt-4 font-[Fraunces,serif] text-2xl font-semibold leading-[1.15] tracking-tight text-sgg-ink-primary sm:text-3xl lg:text-4xl">
                {block.heading}
              </h2>
              <span
                aria-hidden="true"
                className="mt-6 block h-1 w-20 rounded-full bg-[image:var(--sgg-g-cta)]"
              />
            </Reveal>
            <motion.ul
              className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-8"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {block.items.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex gap-3.5 rounded-xl border border-transparent p-3 transition-colors duration-300 hover:border-sgg-border-default hover:bg-sgg-surface-tinted"
                >
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-sgg-ink-accent"
                  />
                  <span className="min-w-0 text-base leading-relaxed text-sgg-ink-secondary">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    );
  }

  /* tiles */
  return (
    <section className="border-y border-sgg-border-default bg-sgg-surface-sunken">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <BlockHeading block={block} />
        <motion.ul
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {block.items.map((item) => (
            <motion.li
              key={item}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-4 rounded-2xl border border-sgg-border-default bg-sgg-surface-raised p-5 shadow-[var(--sgg-e1)] transition-shadow duration-300 hover:border-sgg-border-accent hover:shadow-[var(--sgg-e3)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sgg-ink-accent/10 text-sgg-ink-accent transition-colors duration-300 group-hover:bg-sgg-ink-accent group-hover:text-white">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0 text-base font-medium leading-snug text-sgg-ink-primary">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}