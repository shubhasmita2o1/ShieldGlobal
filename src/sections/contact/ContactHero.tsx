import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section
      aria-label="Contact Shield Global Group"
      className="relative isolate overflow-hidden bg-neutral-900 text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-55"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/75 to-neutral-950/95"
      />
      <div
        aria-hidden
        className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#7ed7ee]/10 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[52vh] w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-28 sm:px-8 lg:min-h-[62vh] lg:pb-24 lg:pt-36">
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
          <span className="text-white">Contact</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-[Fraunces,serif] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Let’s start a conversation
          <span className="mt-3 block font-[Cormorant_Garamond,serif] text-2xl italic text-[#7ed7ee] sm:text-3xl lg:text-4xl">
            Contact Shield Global Group
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Whether you are hiring across borders, automating an industrial
          operation or building a production slate — our team is ready to
          respond with clarity and precision.
        </motion.p>
      </div>
    </section>
  );
}