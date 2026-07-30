import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ServiceDetail } from "./serviceData";

export function ServiceHero({ service }: { service: ServiceDetail }) {
  return (
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
  );
}