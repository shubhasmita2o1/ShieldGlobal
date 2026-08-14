import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { ServiceBlock } from "./serviceData";
import { BlockHeading, Reveal, SectionEyebrow, fadeUp, stagger } from "./shared";

export function ServiceBlockSection({ block }: { block: ServiceBlock }) {
  const Icon = block.icon;

  /* dark — the single dark navy anchor section (Industries We Serve) */
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
                className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#182333] p-5 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-sgg-border-accent hover:bg-[#1d2a3d]"
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

  /* cards — service offerings on a soft blue-grey section */
  if (block.variant === "cards") {
    return (
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #DEE9F0 0%, #D3E1EA 55%, #CBDCE7 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 sm:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 40% at 15% 0%, rgba(46, 124, 246, 0.06), transparent 55%), radial-gradient(ellipse 50% 35% at 90% 100%, rgba(47, 211, 232, 0.06), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
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
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(15,40,60,0.08)] bg-white/75 p-7 shadow-[0_8px_25px_rgba(15,35,50,0.06)] backdrop-blur-[2px] transition-all duration-300 hover:border-[rgba(15,40,60,0.16)] hover:bg-white/90 hover:shadow-[0_14px_32px_rgba(15,35,50,0.1)]"
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

  /* checks — benefits / why choose us on a soft light blue-grey section */
  if (block.variant === "checks") {
    return (
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #D8E4EC 0%, #C9DAE6 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 sm:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(15, 45, 70, 0.05), transparent 32%), radial-gradient(ellipse 50% 40% at 95% 90%, rgba(47, 211, 232, 0.06), transparent 55%)",
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
                  className="flex gap-3.5 rounded-xl border border-transparent p-3 transition-colors duration-300 hover:border-[rgba(15,40,60,0.08)] hover:bg-white/60"
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

  /* tiles — global presence / countries: navy cards on a cool light section */
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #F7FAFC 0%, #EFF5F8 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 sm:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(47, 211, 232, 0.08), transparent 50%), radial-gradient(ellipse 50% 35% at 90% 100%, rgba(46, 124, 246, 0.06), transparent 50%)",
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
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#14263f] via-[#182b45] to-[#12253c] p-5 shadow-[0_8px_22px_-12px_rgba(10,18,32,0.35)] transition-all duration-300 hover:border-sgg-ink-accent-dark/40 hover:from-[#182b45] hover:to-[#1b3350] hover:shadow-[0_12px_26px_-12px_rgba(10,18,32,0.45)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sgg-ink-accent-dark/15 text-sgg-ink-accent-dark transition-colors duration-300 group-hover:bg-sgg-ink-accent-dark/25">
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
