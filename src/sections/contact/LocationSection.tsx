import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { HQ_ADDRESS_LINES, MAP_EMBED_SRC, MAP_LINK } from "./contactData";

export function LocationSection() {
  return (
    <section
      aria-labelledby="contact-location-heading"
      className="relative isolate overflow-hidden bg-neutral-950 py-20 text-white lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(126,215,238,0.14),transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7ed7ee]">
            <span className="h-px w-8 bg-[#7ed7ee]" />
            Our location
          </span>
          <h2
            id="contact-location-heading"
            className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
          >
            Visit our Mumbai headquarters
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Appointments are welcome Monday to Saturday. Please write ahead so we
            can have the right specialists in the room.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.9)]">
            <iframe
              title="Shield Global Group headquarters on Google Maps"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[320px] w-full border-0 grayscale-[35%] transition-all duration-500 hover:grayscale-0 sm:h-[420px]"
            />
          </div>

          <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#7ed7ee]/15 text-[#7ed7ee]">
                <MapPin size={18} aria-hidden />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Headquarters
              </p>
              <h3 className="mt-3 font-[Fraunces,serif] text-2xl font-semibold">
                Shield Global Group
              </h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-white/70">
                {HQ_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7ed7ee] hover:text-[#7ed7ee] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7ed7ee]/30"
            >
              Get directions
              <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}