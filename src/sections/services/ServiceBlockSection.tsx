import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { ServiceBlock } from "./serviceData";
import { BlockHeading, Reveal, SectionEyebrow, fadeUp, stagger } from "./shared";

export function ServiceBlockSection({ block }: { block: ServiceBlock }) {
  const Icon = block.icon;

  if (block.variant === "dark") {
    return (
      <section className="bg-neutral-950">
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
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#4fd0f0]/50 hover:bg-white/[0.08]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#4fd0f0]/15 text-[#4fd0f0]">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0 text-base font-medium text-white/90">
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
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
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
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:border-[#0a8fb8]/40 hover:shadow-[0_24px_50px_-30px_rgba(10,143,184,0.6)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0a8fb8] to-[#4fd0f0] transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-[#0a8fb8]">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold leading-snug text-neutral-900">
                {item}
              </h3>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    );
  }

  if (block.variant === "checks") {
    return (
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionEyebrow>{block.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 font-[Fraunces,serif] text-2xl font-semibold leading-[1.15] tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              {block.heading}
            </h2>
            <span
              aria-hidden="true"
              className="mt-6 block h-1 w-20 rounded-full bg-gradient-to-r from-[#0a8fb8] to-[#4fd0f0]"
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
                className="flex gap-3.5 rounded-xl border border-transparent p-3 transition-colors duration-300 hover:border-neutral-200 hover:bg-neutral-50"
              >
                <CheckCircle2
                  size={20}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#0a8fb8]"
                />
                <span className="min-w-0 text-base leading-relaxed text-neutral-700">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    );
  }

  /* tiles */
  return (
    <section className="border-y border-neutral-200 bg-neutral-50/70">
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
              className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:border-[#0a8fb8]/40 hover:shadow-[0_18px_40px_-24px_rgba(10,143,184,0.55)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0a8fb8]/10 text-[#0a8fb8] transition-colors duration-300 group-hover:bg-[#0a8fb8] group-hover:text-white">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0 text-base font-medium leading-snug text-neutral-800">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}