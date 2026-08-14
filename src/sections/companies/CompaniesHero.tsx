import { motion } from "framer-motion";

export function CompaniesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-neutral-950/45 via-neutral-950/25 to-neutral-950/60"
      />

      <div className="relative mx-auto flex min-h-[52vh] w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-28 sm:px-8 lg:min-h-[60vh] lg:pb-24 lg:pt-36">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-white/70"
        >
          <a href="/" className="transition-colors hover:text-white">
            Home
          </a>
          <span aria-hidden>/</span>
          <span className="text-white">Group of Companies</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 max-w-4xl font-[Fraunces,serif] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Group of Companies
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Four specialised companies under one identity — recruitment, workforce
          solutions, AI automation and media.
        </motion.p>
      </div>
    </section>
  );
}