import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section
      aria-label="About Shield Global Group"
      className="relative isolate overflow-hidden bg-sgg-surface-dark text-sgg-ink-inverse"
    >
      {/* Video background — Tom Fisk / Pexels */}
      <video
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://videos.pexels.com/video-files/10407687/10407687-hd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
         background:
           "linear-gradient(to bottom, rgba(10,18,32,0.55), rgba(10,18,32,0.40), rgba(10,18,32,0.70))",
        }}
      />

      <div className="relative mx-auto flex min-h-[68vh] w-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 sm:px-8 lg:min-h-[78vh] lg:pb-28 lg:pt-40">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-white/70"
        >
          <a href="/" className="transition-colors hover:text-white">
            Home
          </a>
          <span aria-hidden>/</span>
          <span className="text-white">About Us</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-[Fraunces,serif] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
        >
          Shield Global Group
          <span className="mt-3 block font-[Cormorant_Garamond,serif] text-2xl italic text-sgg-ink-accent-dark sm:text-3xl lg:text-4xl">
            The Power of One
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          A synchronised ecosystem uniting human potential, technological
          intelligence and creative storytelling under a single identity.
        </motion.p>
      </div>
    </section>
  );
}