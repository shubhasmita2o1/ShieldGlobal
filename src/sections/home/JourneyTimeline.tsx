import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, stagger, SectionEyebrow } from "@/sections/about/shared";

type Milestone = {
  year: string;
  index: string;
  name: string;
  sub: string;
  desc: string;
  tag: string;
  flag?: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2009",
    index: "01",
    name: "Vijay Infotech",
    sub: "ICA Vizag",
    desc: "The foundation — training, staffing and recruitment services launched in Visakhapatnam, planting the seed of a global enterprise.",
    tag: "Training, Staffing & Recruitment",
  },
  {
    year: "2016",
    index: "02",
    name: "Shield Global HR Solutions",
    sub: "Overseas Manpower Solutions",
    desc: "Expanding globally — connecting talent across Asia, Africa and the Middle East with end-to-end overseas recruitment.",
    tag: "Overseas Manpower",
  },
  {
    year: "2017",
    index: "03",
    name: "MEA Licence Secured",
    sub: "Shield Global HR Solutions",
    desc: "Official recognition — Government of India MEA recruitment licence obtained, enabling full global operations.",
    tag: "Govt. Licence",
  },
  {
    year: "2020",
    index: "04",
    name: "InfiCorp Technology",
    sub: "AI & Industrial Automation",
    desc: "Technology vertical launched — AI-powered industrial automation solutions for clients across manufacturing and enterprise sectors.",
    tag: "Technology",
  },
  {
    year: "2023",
    index: "05",
    name: "Shield Global Mgmt. LLC",
    sub: "Dubai, UAE",
    desc: "Going global — Shield Global Management Consultancies LLC established in Dubai, anchoring the group's Middle East presence.",
    tag: "Dubai Entity",
  },
  {
    year: "2025",
    index: "06",
    name: "Cineglare",
    sub: "Entertainment, Media & Brands",
    desc: "Creative arm established — brand storytelling, media production and entertainment services for global clients.",
    tag: "Entertainment",
  },
  {
    year: "2026",
    index: "07",
    name: "Shield Workforce Pvt Ltd",
    sub: "Staffing & Workforce Solutions",
    desc: "Domestic scale — a dedicated workforce company delivering compliant staffing, payroll and deployment across Indian industry.",
    tag: "Staffing & Workforce",
  },
  {
    year: "2026",
    index: "08",
    name: "Shield Global Group",
    sub: "Unified Global Brand",
    desc: "All verticals unified — HR, technology and entertainment operating under one global brand with international reach.",
    tag: "Group Launch",
    flag: "New",
  },
];

const N = MILESTONES.length;
const TOTAL_LABEL = String(N).padStart(2, "0");
const AUTOPLAY_MS = 4500;
const RESUME_MS = 5000;
const TRANSITION_MS = 650;

export function JourneyTimeline() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0); // card width + gap
  const [cardW, setCardW] = useState(340);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dragging, setDragging] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const dragStartOff = useRef(0);
  const didDrag = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  // ---- Reduced motion ----
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  // ---- Measure ----
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-tl-card]");
    if (!card) return;
    const w = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "24") || 24;
    if (w > 0) {
      setCardW(w);
      setStep(w + gap);
    }
  }, []);

  useLayoutEffect(() => {
    measure();
    const t = window.setTimeout(measure, 150);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  // ---- Pause / resume autoplay ----
  const pause = useCallback((auto = true) => {
    setIsPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    if (auto) {
      resumeTimer.current = window.setTimeout(() => setIsPaused(false), RESUME_MS);
    }
  }, []);

  const resumeSoon = useCallback(() => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setIsPaused(false), RESUME_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  // ---- Navigation (finite, no infinite clones) ----
  const goTo = useCallback((i: number) => {
    setActive(Math.max(0, Math.min(N - 1, i)));
  }, []);

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  // ---- Autoplay ----
  useEffect(() => {
    if (isPaused || reducedMotion || dragging) return;
    const id = window.setInterval(() => {
      setActive((a) => (a >= N - 1 ? 0 : a + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, reducedMotion, dragging]);

  // ---- Drag (mouse + touch) ----
  const onPointerDown = (clientX: number) => {
    dragStartX.current = clientX;
    dragStartOff.current = active * step;
    didDrag.current = false;
    setDragging(true);
    pause(false);
  };

  const onPointerMove = (clientX: number) => {
    if (dragStartX.current == null || !trackRef.current) return;
    const dx = dragStartX.current - clientX;
    if (Math.abs(dx) > 6) didDrag.current = true;
    if (didDrag.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translate3d(${-(dragStartOff.current + dx)}px, 0, 0)`;
    }
  };

  const onPointerUp = (clientX: number) => {
    if (dragStartX.current == null) return;
    const dx = dragStartX.current - clientX;
    dragStartX.current = null;
    setDragging(false);
    if (trackRef.current) {
      trackRef.current.style.transition = "";
    }
    if (Math.abs(dx) > 60) {
      goTo(active + (dx > 0 ? 1 : -1));
    } else {
      // snap back
      goTo(active);
    }
    resumeSoon();
  };

  // Transform: center active card
  // padding on track centers card 0; then we shift by active * step
  const transform = step > 0 ? `translate3d(${-active * step}px, 0, 0)` : "none";
  const progressPct = N <= 1 ? 100 : ((active + 1) / N) * 100;

  return (
       <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative overflow-hidden bg-sgg-surface-tinted py-10 sm:py-12 lg:py-14"
    >

      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap items-end justify-between gap-6 px-6 sm:px-8 lg:px-12"
        >
          <motion.div variants={fadeUp} className="min-w-0">
            <SectionEyebrow>Our Journey</SectionEyebrow>
            <h2
              id="journey-title"
              className="mt-3 font-[Fraunces,serif] text-3xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl"
            >
              From 2009 <span className="text-neutral-400">to today</span>
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-neutral-600">
              Seventeen years of deliberate expansion — one training desk in
              Visakhapatnam grown into a diversified group spanning human capital,
              technology and entertainment across four continents.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous milestone"
              onClick={() => {
                pause();
                goPrev();
              }}
              disabled={active === 0}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#0a8fb8] hover:text-[#0a8fb8] disabled:pointer-events-none disabled:opacity-25"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next milestone"
              onClick={() => {
                pause();
                goNext();
              }}
              disabled={active === N - 1}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#0a8fb8] hover:text-[#0a8fb8] disabled:pointer-events-none disabled:opacity-25"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* Horizontal carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-8"
        >
          <div
            ref={viewportRef}
            className="overflow-hidden py-3"
            onMouseEnter={() => pause(false)}
            onMouseLeave={resumeSoon}
          >
            <div
              ref={trackRef}
              className={`flex items-stretch gap-6 will-change-transform ${
                dragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                // Centers the active card (same idea as technoriya: padding = 50% - half card)
                paddingLeft: `max(1.5rem, calc(50% - ${cardW / 2}px))`,
                paddingRight: `max(1.5rem, calc(50% - ${cardW / 2}px))`,
                transform,
                transition: dragging || reducedMotion
                  ? "none"
                  : `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.35, 1)`,
              }}
              onMouseDown={(e) => onPointerDown(e.clientX)}
              onMouseMove={(e) => {
                if (dragStartX.current != null) onPointerMove(e.clientX);
              }}
              onMouseUp={(e) => onPointerUp(e.clientX)}
              onMouseLeave={(e) => {
                if (dragStartX.current != null) onPointerUp(e.clientX);
              }}
              onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
              onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
              onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
            >
              {MILESTONES.map((m, i) => {
                const isActive = i === active;
                const dist = Math.abs(i - active);

                return (
                  <article
                    key={m.index}
                    data-tl-card
                    onClick={() => {
                      if (didDrag.current) return;
                      pause();
                      goTo(i);
                    }}
                    className={`relative flex w-[min(85vw,320px)] shrink-0 flex-col overflow-hidden rounded-2xl border px-4 py-4 transition-[transform,opacity,border-color,box-shadow] duration-500 sm:w-[320px] sm:px-5 sm:py-5 ${
                      isActive
                        ? "z-[2] scale-100 border-sky-300/80 opacity-100 shadow-[0_28px_64px_-28px_rgba(10,143,184,0.32)]"
                        : dist === 1
                          ? "z-[1] scale-[0.94] border-white/80 opacity-80"
                          : "scale-[0.9] border-white/60 opacity-55"
                    } ${m.flag ? "ring-1 ring-[#0a8fb8]/30" : ""}`}
                    style={{
                      background:
                        "radial-gradient(120% 90% at 100% 0%, rgba(14,165,233,0.1) 0%, transparent 55%), linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
                      minHeight: 300,
                    }}
                  >
                    {/* Watermark year */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-2 select-none font-[Fraunces,serif] text-[56px] font-semibold leading-none text-sky-900/[0.04] sm:text-[64px]"
                    >
                      {m.year}
                    </span>

                    {/* Year + index */}
                    <div className="relative flex items-center gap-3">
                      <span className="font-[Montserrat,sans-serif] text-[30px] font-semibold leading-none tracking-tight text-neutral-900 sm:text-[32px]">
                        {m.year}
                      </span>
                      <span className="h-px flex-1 bg-sky-200/60" />
                      <span className="font-[Fraunces,serif] text-[11px] font-semibold tabular-nums tracking-[0.2em] text-sky-700/50">
                        {m.index}
                      </span>
                    </div>

                    <div className="relative mt-5 flex-1">
                      <h3 className="font-[Montserrat,sans-serif] text-[16px] font-semibold leading-snug text-neutral-900 sm:text-[17px]">
                        {m.name}
                      </h3>
                      <p className="mt-1.5 font-[Fraunces,serif] text-[11px] font-medium uppercase tracking-[0.14em] text-[#0a8fb8] sm:text-[12px]">
                        {m.sub}
                      </p>
                      <p className="mt-3.5 font-[Fraunces,serif] text-[13px] leading-[1.7] text-neutral-600 sm:text-[13.5px]">
                        {m.desc}
                      </p>
                    </div>

                    <div className="relative mt-5 flex flex-wrap items-center gap-2.5 border-t border-sky-100/80 pt-4">
                      <span className="inline-flex items-center rounded-full border border-sky-100 bg-white/80 px-3 py-1.5 font-[Fraunces,serif] text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-900/65 sm:text-[11px]">
                        {m.tag}
                      </span>
                      {m.flag && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a8fb8] px-3 py-1.5 font-[Fraunces,serif] text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[11px]">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          {m.flag}
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Progress + dots + counter */}
        <div className="mt-5 flex flex-col items-center gap-3 px-6 sm:px-8 lg:px-12">
          <div className="h-px w-full max-w-xl overflow-hidden rounded-full bg-neutral-200">
            <motion.div
              className="h-px bg-[#0a8fb8]"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.35, 1] }}
            />
          </div>

          <div className="flex items-center gap-5">
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Timeline milestones"
            >
              {MILESTONES.map((m, i) => (
                <button
                  key={m.index}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Go to ${m.year} — ${m.name}`}
                  onClick={() => {
                    pause();
                    goTo(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-7 bg-[#0a8fb8]"
                      : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <span
              className="font-[Fraunces,serif] text-sm font-semibold tabular-nums text-neutral-500"
              aria-live="polite"
            >
              {MILESTONES[active].index}{" "}
              <span className="text-neutral-300">/ {TOTAL_LABEL}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}