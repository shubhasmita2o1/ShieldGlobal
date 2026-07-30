import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { HQ_ADDRESS_LINES, MAP_EMBED_SRC } from "./contactData";

export function ContactMapCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col"
    >
      <div className="min-h-[280px] flex-1 overflow-hidden rounded-t-2xl shadow-[0_12px_48px_rgba(0,0,0,0.35)]">
        <iframe
          title="Shield Global Group headquarters on Google Maps"
          src={MAP_EMBED_SRC}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full min-h-[280px] w-full border-0 grayscale-[20%] contrast-[1.05]"
        />
      </div>

      <div className="rounded-b-2xl border border-t-0 border-white/10 bg-white/5 px-8 py-7 backdrop-blur-xl">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#00e5ff]">
          Headquarter
        </span>
        <h3 className="mt-2.5 text-lg font-bold text-white sm:text-xl">
          Shield Global Group
        </h3>
        <p className="mt-2 text-sm leading-[1.8] text-[#c2c8d6]">
          {HQ_ADDRESS_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 text-sm text-[#c2c8d6]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00bcd4]/12 text-[#00bcd4]">
              <Phone size={16} aria-hidden />
            </span>
            <a
              href="tel:+2228678678"
              className="transition-colors hover:text-white"
            >
              Tel: +22 28678678
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-[#c2c8d6]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00bcd4]/12 text-[#00bcd4]">
              <Mail size={16} aria-hidden />
            </span>
            <a
              href="mailto:info@shieldglobalindia.com"
              className="break-all text-[#00e5ff] transition-colors hover:text-white"
            >
              info@shieldglobalindia.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}