import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/sections/about/shared";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Shield Global mobilised over four hundred skilled workers across three countries inside a single quarter. Documentation, compliance and onboarding were handled with a level of discipline we rarely see from recruitment partners at this scale.",
    name: "Rashid Al Mansoori",
    role: "Head of Workforce Planning",
    company: "Gulf Infrastructure Holdings",
  },
  {
    quote:
      "The InfiCorp automation team rebuilt our plant's monitoring stack and cut unplanned downtime by close to a third within two quarters. They stayed on site until every line was stable.",
    name: "Anita Deshmukh",
    role: "Plant Operations Director",
    company: "Meridian Manufacturing",
  },
  {
    quote:
      "CineGlare delivered a national brand film end to end — concept, celebrity coordination and post — on a schedule everyone else told us was impossible.",
    name: "Daniel Osei",
    role: "Chief Marketing Officer",
    company: "Northbridge Consumer",
  },
  {
    quote:
      "One group, three capabilities, a single point of accountability. That structure is what keeps us renewing year after year.",
    name: "Sofia Lindqvist",
    role: "Group Procurement Lead",
    company: "Vantera Energy",
  },
];

const AUTOPLAY_MS = 6000;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

const AVATAR_STYLES = [
  "bg-[#e8f4fc] text-[#0a6e9c]",
  "bg-[#fce8f0] text-[#9c0a5a]",
  "bg-[#e8fcec] text-[#0a7a3c]",
  "bg-[#f5e8fc] text-[#5a0a9c]",
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  const active = TESTIMONIALS[index];
  const peek = TESTIMONIALS[(index + 1) % TESTIMONIALS.length];

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-sgg-surface-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="rounded-[28px] bg-[#f0f2f5] p-6 sm:p-8 lg:p-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-start lg:gap-12"
          >
            <motion.div variants={fadeUp} className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sgg-ink-tertiary">
                Clients
              </span>
              <h2
                id="testimonials-title"
                className="mt-3 max-w-[280px] font-[Fraunces,serif] text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-sgg-ink-primary sm:text-[2.15rem] lg:text-[2.4rem]"
              >
                What people say about us?
              </h2>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => go(index - 1, -1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-sgg-border-default bg-white text-sgg-ink-secondary shadow-sm transition-all duration-200 hover:border-sgg-ink-accent hover:text-sgg-ink-accent"
                >
                  <ArrowLeft size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => go(index + 1, 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-sgg-border-default bg-white text-sgg-ink-secondary shadow-sm transition-all duration-200 hover:border-sgg-ink-accent hover:text-sgg-ink-accent"
                >
                  <ArrowRight size={16} strokeWidth={2} />
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
              className="relative min-w-0"
              aria-live="polite"
            >
              <div className="relative flex items-stretch gap-4 overflow-hidden">
                <div className="relative z-10 w-full max-w-[420px] shrink-0">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.article
                      key={active.name}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 48 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -48 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl border border-white/80 bg-white p-6 shadow-[0_8px_30px_rgba(10,18,32,0.08)] sm:p-7"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                            AVATAR_STYLES[index % AVATAR_STYLES.length]
                          }`}
                        >
                          {initials(active.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-semibold text-sgg-ink-primary">
                            {active.name}
                          </p>
                          <p className="truncate text-[12.5px] text-sgg-ink-tertiary">
                            {active.role} at {active.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="mt-5 text-[14.5px] leading-[1.7] text-sgg-ink-secondary">
                        {active.quote}
                      </blockquote>
                    </motion.article>
                  </AnimatePresence>
                </div>

                <div
                  aria-hidden
                  className="hidden w-[280px] shrink-0 opacity-50 lg:block"
                >
                  <div className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-[0_4px_16px_rgba(10,18,32,0.05)]">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                          AVATAR_STYLES[(index + 1) % AVATAR_STYLES.length]
                        }`}
                      >
                        {initials(peek.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-sgg-ink-primary">
                          {peek.name}
                        </p>
                        <p className="truncate text-[12.5px] text-sgg-ink-tertiary">
                          {peek.role}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 line-clamp-4 text-[14.5px] leading-[1.7] text-sgg-ink-secondary">
                      {peek.quote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    aria-label={`Show testimonial from ${t.name}`}
                    aria-current={i === index}
                    onClick={() => go(i, i > index ? 1 : -1)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-7 bg-sgg-ink-accent"
                        : "w-2.5 bg-sgg-border-strong hover:bg-sgg-ink-tertiary"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10 border-t border-sgg-border-hairline pt-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:justify-between sm:gap-x-6">
              {[
                "Gulf Infrastructure",
                "Meridian Mfg",
                "Vantera Energy",
                "Northbridge",
                "Altura",
                "Sable Logistics",
                "Helion Systems",
                "Orient Marine",
              ].map((name) => (
                <span
                  key={name}
                  className="text-[13px] font-semibold tracking-wide text-sgg-ink-tertiary/80 transition-colors duration-200 hover:text-sgg-ink-secondary"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
