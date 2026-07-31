import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fadeUp, stagger, SectionEyebrow } from "@/sections/about/shared";

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
      className="relative overflow-hidden bg-sgg-surface-canvas py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_-20%,rgba(47,211,232,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16"
        >
          <motion.div variants={fadeUp} className="flex flex-col">
            <SectionEyebrow>Client Voices</SectionEyebrow>
            <h2
              id="testimonials-title"
              className="mt-4 max-w-[420px] font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-sgg-ink-primary sm:text-4xl lg:text-[2.75rem]"
            >
              What people say{" "}
              <span className="text-sgg-ink-tertiary">about us</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.85] text-sgg-ink-secondary">
              Partners across infrastructure, manufacturing, energy and consumer
              brands on what working with Shield Global Group looks like.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(index - 1, -1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-sgg-border-default bg-sgg-surface-raised text-sgg-ink-secondary shadow-[var(--sgg-e1)] transition-all duration-300 hover:border-sgg-border-accent hover:text-sgg-ink-accent hover:shadow-[var(--sgg-e3)]"
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(index + 1, 1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-sgg-border-default bg-sgg-surface-raised text-sgg-ink-secondary shadow-[var(--sgg-e1)] transition-all duration-300 hover:border-sgg-border-accent hover:text-sgg-ink-accent hover:shadow-[var(--sgg-e3)]"
              >
                <ArrowRight size={18} strokeWidth={2} />
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
            <div className="relative flex items-stretch gap-5 overflow-hidden">
              <div className="relative z-10 w-full max-w-[520px] shrink-0">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.article
                    key={active.name}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -48 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="min-h-[280px] rounded-2xl border border-sgg-border-default bg-sgg-surface-raised p-8 shadow-[var(--sgg-e1)] transition-shadow duration-300 sm:min-h-[300px] sm:p-9 lg:p-10"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className={
                          "grid h-14 w-14 shrink-0 place-items-center rounded-full text-base font-semibold " +
                          AVATAR_STYLES[index % AVATAR_STYLES.length]
                        }
                      >
                        {initials(active.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-[Fraunces,serif] text-[17px] font-semibold text-sgg-ink-primary sm:text-[18px]">
                          {active.name}
                        </p>
                        <p className="truncate text-[13px] text-sgg-ink-tertiary">
                          {active.role} · {active.company}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-7 text-[15px] leading-[1.85] text-sgg-ink-secondary sm:text-[16px]">
                      {active.quote}
                    </blockquote>
                  </motion.article>
                </AnimatePresence>
              </div>

              <div
                aria-hidden
                className="hidden w-[320px] shrink-0 opacity-50 lg:block"
              >
                <div className="min-h-[280px] rounded-2xl border border-sgg-border-default bg-sgg-surface-raised p-8 shadow-[var(--sgg-e1)] sm:min-h-[300px]">
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        "grid h-14 w-14 shrink-0 place-items-center rounded-full text-base font-semibold " +
                        AVATAR_STYLES[(index + 1) % AVATAR_STYLES.length]
                      }
                    >
                      {initials(peek.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-[Fraunces,serif] text-[17px] font-semibold text-sgg-ink-primary sm:text-[18px]">
                        {peek.name}
                      </p>
                      <p className="truncate text-[13px] text-sgg-ink-tertiary">
                        {peek.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-7 line-clamp-5 text-[15px] leading-[1.85] text-sgg-ink-secondary sm:text-[16px]">
                    {peek.quote}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-2.5">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === index}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className={
                    "h-2 rounded-full transition-all duration-300 " +
                    (i === index
                      ? "w-9 bg-sgg-ink-accent"
                      : "w-3 bg-sgg-border-strong hover:bg-sgg-ink-tertiary")
                  }
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
