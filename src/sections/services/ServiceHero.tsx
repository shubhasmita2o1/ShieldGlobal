import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "./serviceData";

export function ServiceHero({ service }: { service: ServiceDetail }) {
  const websiteUrl = service.websiteUrl;

  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-sgg-surface-dark sm:min-h-[62vh] lg:min-h-[70vh]">
      <motion.img
        src={service.heroImage}
        alt={`${service.title} — ${service.company}`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        loading="eager"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,18,32,0.85), rgba(10,18,32,0.70), rgba(10,18,32,0.95))",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-24 sm:px-8 sm:pb-20 lg:pb-24">
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
            <li aria-current="page" className="text-sgg-ink-accent-dark">
              {service.navLabel}
            </li>
          </ol>
        </motion.nav>

        <motion.h1
          className="mt-6 max-w-4xl font-[Fraunces,serif] text-4xl font-semibold leading-[1.05] tracking-tight text-sgg-ink-inverse sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.title}
        </motion.h1>

        <motion.p
          className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-sgg-ink-accent-dark sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {service.company}
        </motion.p>

        {websiteUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8"
          >
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "relative z-10")}
            >
              Click here to Visit main website
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
