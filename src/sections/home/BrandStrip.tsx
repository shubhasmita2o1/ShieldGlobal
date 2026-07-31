import { motion, useReducedMotion } from "framer-motion";

import logoHr from "@/assets/logos/1.png";
import logoWorkforce from "@/assets/logos/2.png";
import logoInficorp from "@/assets/logos/3.png";
import logoCineglare from "@/assets/logos/4.png";

/** Premium ease — matches the hero */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Optical alignment model.
 *
 * Every lockup has its company name baked in at a different position, so we do
 * NOT centre the artwork. Instead each logo is drawn at a height tuned so the
 * company names read at the same optical size, then shifted vertically so the
 * name baseline of every lockup lands on one shared horizontal line (BASELINE).
 *
 * `baseline` = where the company-name baseline sits inside the source artwork,
 * as a fraction of the artwork height (measured from the top).
 */
const BASELINE = 46; // shared baseline, px from the top of the logo box
const BOX_HEIGHT = 76; // logo box height, px (before responsive scaling)

type Brand = {
  src: string;
  /** Full company name — used for the accessible label */
  name: string;
  /** Rendered artwork height in px */
  height: number;
  /** Name-baseline position inside the artwork, 0–1 from the top */
  baseline: number;
  /** Final optical correction in px (positive = down) */
  nudge?: number;
};

const BRANDS: Brand[] = [
  {
    src: logoHr,
    name: "Shield Global HR Solutions",
    height: 38,
    baseline: 0.453,
    nudge: 1,
  },
  {
    src: logoWorkforce,
    name: "Shield Workforce",
    height: 40,
    baseline: 0.5125,
  },
  // Taller lockup: the InfiCorp crown rises above the name, so the artwork sits
  // higher while its name still lands on the shared baseline.
  {
    src: logoInficorp,
    name: "InfiCorp Technology",
    height: 42,
    baseline: 0.955,
    nudge: 2,
  },
  {
    src: logoCineglare,
    name: "CineGlare Entertainment",
    height: 48,
    baseline: 0.457,
    nudge: -1.5,
  },
];

export function BrandStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Shield Global Group companies"
      className="relative z-10 bg-neutral-950"
    >
      <div className="mx-auto w-[calc(100%-32px)] pb-8 pt-5 sm:w-[calc(100%-48px)] sm:pb-10 sm:pt-6 lg:w-[calc(100%-120px)] lg:pb-14 lg:pt-8">
        <motion.ul
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.8, ease: EASE }}
          className="grid grid-cols-2 overflow-hidden rounded-[14px] border border-white/[0.14] bg-white/[0.055] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl divide-x divide-y divide-white/[0.08] lg:grid-cols-4 lg:divide-y-0"
        >
          {BRANDS.map((brand, i) => (
            <motion.li
              key={brand.name}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduceMotion ? 0.3 : 0.7,
                delay: reduceMotion ? 0 : 0.1 + i * 0.08,
                ease: EASE,
              }}
              className="group flex min-w-0 items-center justify-center px-4 py-3 transition-colors duration-300 hover:bg-white/[0.06] sm:px-6 sm:py-4 lg:px-8"
            >
              <div
                className="relative w-full origin-center scale-[0.62] sm:scale-[0.78] lg:scale-100"
                style={{ height: BOX_HEIGHT }}
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute left-1/2 w-auto max-w-full -translate-x-1/2 opacity-80 brightness-0 invert transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
                  style={{
                    height: brand.height,
                    top: BASELINE - brand.height * brand.baseline + (brand.nudge ?? 0),
                  }}
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
