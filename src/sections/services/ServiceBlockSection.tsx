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
                className="flex items-center gap-4 rounded-2xl border border-sgg-border-dark bg-white/[0.06] p-5 transition-colors duration-300 hover:border-sgg-border-accent hover:bg-white/[0.1]"
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
      <section className="relative overflow-hidden bg-[image:var(--sgg-g-hero)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--sgg-ink-accent) 0px, transparent 40%), radial-gradient(circle at 80% 60%, var(--sgg-ink-accent-dark) 0px, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <BlockHeading block={block} tone="dark" />
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
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-sgg-border-default bg-sgg-surface-tinted p-7 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-sgg-ink-accent-dark/40 hover:bg-white hover:shadow-[0_14px_32px_-10px_rgba(0,0,0,0.4)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[image:var(--sgg-g-cta)] transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#08111e] to-[#14263f] text-sgg-ink-inverse transition-colors duration-300 group-hover:from-sgg-ink-accent group-hover:to-sgg-ink-accent-dark">
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
      <section className="relative overflow-hidden bg-[#f8fafc]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 40% at 0% 80%, rgba(47, 211, 232, 0.07), transparent 50%), linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
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
                  whileHover={{ y: -3 }}
                  className="flex gap-3.5 rounded-xl border border-sgg-border-default bg-white p-4 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.12)] transition-all duration-300 hover:border-sgg-ink-accent/40 hover:shadow-[0_10px_24px_-10px_rgba(15,23,42,0.18)]"
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

  /* tiles — dark navy cards on light blue-gray section */
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #d8e4f0 0%, #e2ebf4 40%, #d5e2ef 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(47, 211, 232, 0.12), transparent 50%), radial-gradient(ellipse 50% 35% at 90% 100%, rgba(46, 124, 246, 0.08), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
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
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a1628] via-[#12253c] to-[#0c1a2e] p-5 shadow-[0_8px_24px_-8px_rgba(10,18,32,0.35)] transition-all duration-300 hover:border-sgg-ink-accent-dark/40 hover:from-[#12253c] hover:to-[#16304a] hover:shadow-[0_12px_28px_-8px_rgba(10,18,32,0.45)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sgg-ink-accent-dark/30 to-sgg-ink-accent/20 text-sgg-ink-accent-dark transition-colors duration-300 group-hover:from-sgg-ink-accent-dark group-hover:to-sgg-ink-accent group-hover:text-[#08111e]">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0 text-base font-medium leading-snug text-sgg-ink-inverse">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}