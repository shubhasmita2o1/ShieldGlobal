import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/sections/about/shared";

type Partner = {
  name: string;
  sector: string;
};

const PARTNERS: Partner[] = [
  { name: "Gulf Infrastructure", sector: "Infrastructure" },
  { name: "Meridian Manufacturing", sector: "Industrial" },
  { name: "Vantera Energy", sector: "Energy" },
  { name: "Northbridge Consumer", sector: "Consumer brands" },
  { name: "Altura Hospitality", sector: "Hospitality" },
  { name: "Sable Logistics", sector: "Logistics" },
  { name: "Helion Systems", sector: "Technology" },
  { name: "Orient Marine", sector: "Maritime" },
];

export function Partners() {
  return (
    <section
      aria-labelledby="partners-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sgg-ink-tertiary">
              Partners & Clients
            </span>
            <h2
              id="partners-title"
              className="mt-3 font-[Fraunces,serif] text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-sgg-ink-primary sm:text-[2.15rem] lg:text-[2.4rem]"
            >
              Working alongside{" "}
              <span className="text-sgg-ink-tertiary">established organisations</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-sgg-ink-secondary">
              A selection of the enterprises, operators and institutions the
              group collaborates with across its markets.
            </p>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
          >
            {PARTNERS.map((partner) => (
              <li key={partner.name}>
                <div className="flex h-full min-h-[100px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-sgg-border-default bg-sgg-surface-canvas px-4 py-6 text-center transition-all duration-300 hover:border-sgg-border-accent hover:bg-white hover:shadow-[var(--sgg-e2)]">
                  <span className="font-[Fraunces,serif] text-[15px] font-semibold leading-tight tracking-tight text-sgg-ink-primary sm:text-[16px]">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sgg-ink-tertiary">
                    {partner.sector}
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            className="mt-10 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-sgg-ink-accent"
          >
            Global reach &nbsp;·&nbsp; Long-term partnerships
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
