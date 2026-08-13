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
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "linear-gradient(145deg, #ffffff 0%, #f0f9ff 38%, #e0f2fe 72%, #f0f9ff 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-[14%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(10,143,184,0.2)_0%,rgba(56,189,248,0.09)_42%,transparent_70%)] blur-2xl will-change-transform"
          initial={{ opacity: 0, scale: 0.7, y: 48 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
          }}
          viewport={{ once: true, amount: 0.2 }}
          animate={{
            x: [0, 24, 0],
            y: [0, -16, 0],
            transition: {
              x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            },
          }}
        />
        <motion.div
          className="absolute -right-[10%] bottom-[-16%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18)_0%,rgba(125,211,252,0.08)_48%,transparent_72%)] blur-2xl will-change-transform"
          initial={{ opacity: 0, scale: 0.65, y: 56 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1.3, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
          }}
          viewport={{ once: true, amount: 0.15 }}
          animate={{
            x: [0, -20, 0],
            y: [0, 14, 0],
            transition: {
              x: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
              y: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            },
          }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent"
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
                    className="relative min-h-[280px] overflow-hidden rounded-2xl border border-sky-200/80 bg-white p-8 shadow-[0_4px_24px_-4px_rgba(16,24,40,0.1),0_1px_3px_rgba(16,24,40,0.06)] transition-shadow duration-300 hover:border-sky-300 hover:shadow-[0_20px_50px_-20px_rgba(10,143,184,0.22)] sm:min-h-[300px] sm:p-9 lg:p-10"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.08)_0%,transparent_70%)] blur-xl"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/50 to-transparent"
                    />
                    <div className="relative flex items-center gap-4">
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
                    <blockquote className="relative mt-7 text-[15px] leading-[1.85] text-sgg-ink-secondary sm:text-[16px]">
                      {active.quote}
                    </blockquote>
                  </motion.article>
                </AnimatePresence>
              </div>

              <div
                aria-hidden
                className="hidden w-[320px] shrink-0 opacity-50 lg:block"
              >
                <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-sky-200/70 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(16,24,40,0.08)] sm:min-h-[300px]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.06)_0%,transparent_70%)] blur-xl"
                  />
                  <div className="relative flex items-center gap-4">
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
                  <p className="relative mt-7 line-clamp-5 text-[15px] leading-[1.85] text-sgg-ink-secondary sm:text-[16px]">
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