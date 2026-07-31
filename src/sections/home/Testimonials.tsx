import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { fadeUp, stagger, SectionEyebrow } from "@/sections/about/shared";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Shield Global mobilised over four hundred skilled workers across three countries inside a single quarter. Documentation, compliance and onboarding were handled with a level of discipline we rarely see from recruitment partners at this scale.",
    name: "Rashid Al Mansoori",
    role: "Head of Workforce Planning",
    company: "Gulf Infrastructure Holdings",
    rating: 5,
  },
  {
    quote:
      "The InfiCorp automation team rebuilt our plant's monitoring stack and cut unplanned downtime by close to a third within two quarters. They stayed on site until every line was stable.",
    name: "Anita Deshmukh",
    role: "Plant Operations Director",
    company: "Meridian Manufacturing",
    rating: 5,
  },
  {
    quote:
      "CineGlare delivered a national brand film end to end — concept, celebrity coordination and post — on a schedule everyone else told us was impossible.",
    name: "Daniel Osei",
    role: "Chief Marketing Officer",
    company: "Northbridge Consumer",
    rating: 5,
  },
  {
    quote:
      "One group, three capabilities, a single point of accountability. That structure is what keeps us renewing year after year.",
    name: "Sofia Lindqvist",
    role: "Group Procurement Lead",
    company: "Vantera Energy",
    rating: 5,
  },
];

const AUTOPLAY_MS = 7000;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

function Rating({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          size={14}
          strokeWidth={1.5}
          className={i < value ? "fill-[#0a8fb8] text-[#0a8fb8]" : "text-white/25"}
        />
      ))}
    </div>
  );
}

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
    const id = window.setInterval(
      () => go(index + 1, 1),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  const active = TESTIMONIALS[index];

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-[#0f1a28] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_85%_-10%,rgba(10,143,184,0.14),transparent_55%),radial-gradient(700px_380px_at_0%_105%,rgba(10,143,184,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <SectionEyebrow>Client Voices</SectionEyebrow>
            <h2
              id="testimonials-title"
              className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Trusted by teams who{" "}
              <span className="text-white/40">cannot afford delay</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-[#c2c8d6]">
              Partners across infrastructure, manufacturing, energy and consumer
              brands on what working with Shield Global Group looks like.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:gap-8"
          >
            {/* Interactive stage */}
            <div
              className="relative min-w-0 overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.05] p-7 backdrop-blur-sm sm:p-9 lg:p-10"
              aria-live="polite"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-8 text-[#0a8fb8]/15"
              >
                <Quote size={160} strokeWidth={1} />
              </div>

              <div className="relative min-h-[300px] sm:min-h-[320px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.figure
                    key={active.name}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full min-w-0 flex-col justify-between"
                  >
                    <div className="min-w-0">
                      <Rating value={active.rating} />
                      <blockquote className="mt-6 font-[Fraunces,serif] text-[21px] font-medium leading-[1.5] tracking-tight text-white sm:text-[25px] lg:text-[27px]">
                        “{active.quote}”
                      </blockquote>
                    </div>

                    <figcaption className="mt-9 flex items-center gap-4 border-t border-white/10 pt-6">
                      <span
                        aria-hidden
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0a8fb8]/15 font-[Fraunces,serif] text-base font-semibold text-[#7ed7ee]"
                      >
                        {initials(active.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-semibold text-white">
                          {active.name}
                        </span>
                        <span className="block truncate text-[13px] text-[#9aa3b6]">
                          {active.role} · {active.company}
                        </span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="relative mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => go(index - 1, -1)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-[#0a8fb8]/60 hover:text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => go(index + 1, 1)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-[#0a8fb8]/60 hover:text-white"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      aria-label={`Show testimonial from ${t.name}`}
                      aria-current={i === index}
                      onClick={() => go(i, i > index ? 1 : -1)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-8 bg-[#0a8fb8]"
                          : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Selectable client list */}
            <ul className="grid min-w-0 gap-3 self-start">
              {TESTIMONIALS.map((t, i) => {
                const isActive = i === index;
                return (
                  <li key={t.name} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => go(i, i > index ? 1 : -1)}
                      aria-pressed={isActive}
                      className={`group flex w-full min-w-0 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#0a8fb8]/45 bg-white/[0.08]"
                          : "border-white/[0.09] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-[Fraunces,serif] text-sm font-semibold transition-colors duration-300 ${
                          isActive
                            ? "bg-[#0a8fb8]/20 text-[#7ed7ee]"
                            : "bg-white/[0.06] text-white/50"
                        }`}
                      >
                        {initials(t.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold text-white">
                          {t.name}
                        </span>
                        <span className="block truncate text-[12.5px] text-[#9aa3b6]">
                          {t.company}
                        </span>
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="testimonial-active-bar"
                          aria-hidden
                          className="h-8 w-1 shrink-0 rounded-full bg-[#0a8fb8]"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
