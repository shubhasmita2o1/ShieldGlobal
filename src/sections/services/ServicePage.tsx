import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { ServiceBlock, ServiceDetail } from "./serviceData";

/* ---------------------------------- Motion --------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Reveal({
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

function SectionEyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const color = tone === "dark" ? "text-[#4fd0f0]" : "text-[#0a8fb8]";
  const bar = tone === "dark" ? "bg-[#4fd0f0]" : "bg-[#0a8fb8]";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${color}`}
    >
      <span className={`h-px w-8 ${bar}`} />
      {children}
    </span>
  );
}

/* ---------------------------------- Blocks --------------------------------- */

function BlockHeading({
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
          tone === "dark" ? "text-white" : "text-neutral-900"
        }`}
      >
        {block.heading}
      </h2>
      {block.subheading && (
        <p
          className={`mt-4 text-base font-medium sm:text-lg ${
            tone === "dark" ? "text-white/80" : "text-neutral-700"
          }`}
        >
          {block.subheading}
        </p>
      )}
    </Reveal>
  );
}

function ServiceBlockSection({ block }: { block: ServiceBlock }) {
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

/* ----------------------------------- Page ---------------------------------- */

export function ServicePage({ service }: { service: ServiceDetail }) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[52vh] items-end overflow-hidden sm:min-h-[62vh] lg:min-h-[70vh]">
        <motion.img
          src={service.heroImage}
          alt={`${service.title} — ${service.company}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          loading="eager"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-neutral-950/92 via-neutral-950/70 to-neutral-950/45"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-24 sm:px-8 sm:pb-20 lg:pb-24">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
              <li>
                <a href="/" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li aria-hidden="true" className="text-white/40">
                /
              </li>
              <li>
                <a href="/services" className="transition-colors hover:text-white">
                  Services
                </a>
              </li>
              <li aria-hidden="true" className="text-white/40">
                /
              </li>
              <li aria-current="page" className="text-[#4fd0f0]">
                {service.navLabel}
              </li>
            </ol>
          </motion.nav>

          <motion.h1
            className="mt-6 max-w-4xl font-[Fraunces,serif] text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.title}
          </motion.h1>

          <motion.p
            className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#4fd0f0] sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {service.company}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a8fb8] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0a8fb8]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b7ea3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              Click here to Visit main website
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionEyebrow>Overview</SectionEyebrow>
            <h2 className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-4xl">
              {service.company}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="max-w-2xl text-base leading-[1.85] text-neutral-600 sm:text-lg">
              {service.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {service.blocks.map((block) => (
        <ServiceBlockSection key={block.heading} block={block} />
      ))}

      {/* Commitment */}
      <section className="border-t border-neutral-200 bg-neutral-50/70">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#0a8fb8]/10 text-[#0a8fb8]">
              <ShieldCheck size={24} aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-[Fraunces,serif] text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {service.commitmentTitle}
            </h2>
            {service.commitment.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mt-5 text-base leading-[1.9] text-neutral-600 sm:text-lg"
              >
                {p}
              </p>
            ))}
            {service.tagline && (
              <p className="mt-8 inline-flex items-center gap-2 font-[Cormorant_Garamond,serif] text-xl italic text-neutral-800 sm:text-2xl">
                <Sparkles size={18} aria-hidden="true" className="text-[#0a8fb8]" />
                {service.tagline}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
