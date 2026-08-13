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

// One clone of the last card at the start and one clone of the first card at
// the end. This lets the track always move in a single direction and, once
// it glides past a clone, we silently snap the index back to the matching
// real card with the transition disabled for a single frame — the clone and
// the real card render identically, so the snap is invisible.
const EXTENDED: Milestone[] = [MILESTONES[N - 1], ...MILESTONES, MILESTONES[0]];

const AUTOPLAY_MS = 4200;
const RESUME_DELAY_MS = 4500;
const TRANSITION_MS = 800;
const TRANSITION = { duration: TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] as const };
const INSTANT = { duration: 0 };

export function JourneyTimeline() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  // trackIndex walks the EXTENDED array (0 = clone of last, 1..N = real cards, N+1 = clone of first)
  const [trackIndex, setTrackIndex] = useState(1);
  const [jumping, setJumping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [cardWidth, setCardWidth] = useState(340);
  const [step, setStep] = useState(364);
  const [containerWidth, setContainerWidth] = useState(0);

  const resumeTimeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activeIndex = ((trackIndex - 1) % N + N) % N;

  // ---- Reduced motion ----
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // ---- Measure card width / gap / viewport width ----
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return;

    const cw = firstCard.getBoundingClientRect().width;
    const cs = window.getComputedStyle(track);
    const gap = parseFloat(cs.columnGap || (cs as any).gap || "24") || 24;
    const vw = viewport.getBoundingClientRect().width;

    if (cw > 0) {
      setCardWidth(cw);
      setStep(cw + gap);
    }
    setContainerWidth(vw);
  }, []);

  useLayoutEffect(() => {
    measure();
    const t = window.setTimeout(measure, 200); // catch late font/layout settle

    // Plain debounced window resize only — a ResizeObserver on the viewport
    // can re-fire mid-transition (transforms/scale don't change layout size,
    // but some browsers still emit a tick) and was a source of the timer
    // getting knocked off its cadence. Window resize is enough here since
    // the track's own width never changes on its own.
    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(t);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  // ---- Infinite-loop snap: after crossing a clone, jump back silently ----
  // Rebuilt to match the technique already proven in the Partners marquee:
  // that section is pure CSS (a @keyframes animation on a duplicated list)
  // with zero JS timing involved, which is why it never stutters. This
  // track is a discrete "step to a position" carousel rather than a
  // continuously drifting one, so it can't be pure @keyframes — but it can
  // use the same underlying principle: a plain CSS `transition` on
  // `transform`, with the loop-reset driven by the browser's own native
  // `transitionend` event instead of a JS animation library's completion
  // callback or a guessed setTimeout. `transitionend` only ever fires when
  // the browser has actually finished painting the transition, so the snap
  // can never land mid-glide.
  const trackIndexRef = useRef(trackIndex);
  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  const snap = useCallback((target: number) => {
    setJumping(true);
    setTrackIndex(target);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.target !== el || e.propertyName !== "transform") return;
      const idx = trackIndexRef.current;
      if (idx === 0) snap(N);
      else if (idx === N + 1) snap(1);
    };

    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [snap]);

  // Reduced-motion (or an instant target already at rest, e.g. clicking a
  // dot while jumping) never fires transitionend, so cover that case too.
  useEffect(() => {
    if (!reducedMotion) return;
    if (trackIndex === 0) snap(N);
    else if (trackIndex === N + 1) snap(1);
  }, [trackIndex, reducedMotion, snap]);

  // Once the "no transition" snap frame has actually been painted, restore
  // normal transitions. Double rAF guarantees the browser painted the
  // jumped position at least once before transitions re-enable — a single
  // rAF can still land before paint on some browsers and cause a flash of
  // the old glide animation.
  useEffect(() => {
    if (!jumping) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setJumping(false));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [jumping]);

  // ---- Pause / resume ----
  const pause = useCallback((autoResume = true) => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    if (autoResume) {
      resumeTimeoutRef.current = window.setTimeout(() => setIsPaused(false), RESUME_DELAY_MS);
    }
  }, []);

  const resumeSoon = useCallback(() => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => setIsPaused(false), RESUME_DELAY_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // ---- Navigation ----
  const goNext = useCallback(() => setTrackIndex((i) => i + 1), []);
  const goPrev = useCallback(() => setTrackIndex((i) => i - 1), []);
  const goToReal = useCallback((i: number) => setTrackIndex(i + 1), []);

  const handleNext = () => {
    pause();
    goNext();
  };
  const handlePrev = () => {
    pause();
    goPrev();
  };
  const handleDot = (i: number) => {
    pause();
    goToReal(i);
  };

  // ---- Autoplay: one steady interval, independent of trackIndex ----
  // Deliberately NOT depending on trackIndex here. The infinite-loop "snap"
  // above also changes trackIndex once per full cycle (to reset off the
  // cloned card), and if the interval were rebuilt on every trackIndex
  // change it would restart its countdown right after that snap too —
  // producing a short extra gap/stutter once per loop. A ref keeps the
  // callback fresh without that coupling.
  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const id = window.setInterval(() => {
      goNextRef.current();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, reducedMotion]);

  // ---- Touch swipe ----
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    pause(false);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) {
      resumeSoon();
      return;
    }
    const end = e.changedTouches[0]?.clientX ?? start;
    const delta = end - start;
    if (delta < -40) goNext();
    else if (delta > 40) goPrev();
    resumeSoon();
  };

  const paddingX = Math.max(0, (containerWidth - cardWidth) / 2);
  const cssTransition =
    jumping || reducedMotion
      ? "none"
      : `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
  // Kept for the per-card scale/opacity, which stay on Framer Motion since
  // getting those a frame early/late is cosmetically harmless.
  const cardTransition = jumping || reducedMotion ? INSTANT : TRANSITION;

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(145deg, #ffffff 0%, #f0f9ff 38%, #e0f2fe 72%, #f0f9ff 100%)",
      }}
    >
      {/* Animated popup gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute -left-[14%] top-[-10%] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(10,143,184,0.22)_0%,rgba(56,189,248,0.1)_42%,transparent_70%)] blur-2xl will-change-transform"
          initial={{ opacity: 0, scale: 0.7, y: 48 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 1.15,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          viewport={{ once: true, amount: 0.2 }}
          animate={{
            x: [0, 28, 0],
            y: [0, -18, 0],
            transition: {
              x: {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        <motion.div
          className="absolute -right-[10%] top-[12%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.2)_0%,rgba(125,211,252,0.09)_48%,transparent_72%)] blur-2xl will-change-transform"
          initial={{ opacity: 0, scale: 0.65, y: 56 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 1.3,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          viewport={{ once: true, amount: 0.15 }}
          animate={{
            x: [0, -22, 0],
            y: [0, 16, 0],
            transition: {
              x: {
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              },
              y: {
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              },
            },
          }}
        />

        <motion.div
          className="absolute bottom-[-14%] left-[28%] h-[460px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(10,143,184,0.18)_0%,rgba(186,230,253,0.1)_48%,transparent_70%)] blur-3xl will-change-transform"
          initial={{ opacity: 0, scale: 0.75, y: 64 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 1.35,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          viewport={{ once: true, amount: 0.1 }}
          animate={{
            x: [0, 18, 0],
            y: [0, -12, 0],
            transition: {
              x: {
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              },
              y: {
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              },
            },
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-8 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)_auto] lg:px-12"
        >
          <motion.div variants={fadeUp} className="min-w-0">
            <SectionEyebrow>Our Journey</SectionEyebrow>

            <h2
              id="journey-title"
              className="mt-4 font-[Fraunces,serif] text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl"
            >
              From 2009{" "}
              <span className="text-neutral-400">to today</span>
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="col-span-2 max-w-md text-[15px] leading-relaxed text-neutral-600 lg:col-span-1 lg:pb-2"
          >
            Seventeen years of deliberate expansion — one training desk in
            Visakhapatnam grown into a diversified group spanning human capital,
            technology and entertainment across four continents.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex shrink-0 items-center gap-3"
          >
            <button
              type="button"
              aria-label="Previous milestone"
              onClick={handlePrev}
              onFocus={() => pause(false)}
              onBlur={resumeSoon}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#0a8fb8] hover:text-[#0a8fb8]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Next milestone"
              onClick={handleNext}
              onFocus={() => pause(false)}
              onBlur={resumeSoon}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#0a8fb8] hover:text-[#0a8fb8]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-14"
        >
          <div
            ref={viewportRef}
            className="overflow-hidden"
            onMouseEnter={() => pause(false)}
            onMouseLeave={resumeSoon}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <ol
              ref={trackRef}
              style={{
                paddingLeft: paddingX,
                paddingRight: paddingX,
                transform: `translate3d(${-trackIndex * step}px, 0, 0)`,
                transition: cssTransition,
              }}
              className="flex min-h-[380px] items-stretch gap-6 pb-6 pt-1 will-change-transform"
            >
              {EXTENDED.map((m, i) => {
                const dist = i - trackIndex;
                const isActive = dist === 0;
                const near = Math.abs(dist) === 1;

                return (
                  <li
                    key={`${m.index}-${i}`}
                    className="group relative flex w-[85vw] shrink-0 flex-col sm:w-[320px] lg:w-[340px]"
                  >
                    {/* Timeline connector */}
                    <div className="relative flex h-[46px] items-center">
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 top-1/2 h-px transition-colors duration-500 ${
                          isActive ? "bg-[#0a8fb8]/45" : "bg-neutral-200"
                        }`}
                      />

                      <span
                        aria-hidden
                        className={`relative h-2.5 w-2.5 rotate-45 border transition-all duration-500 ${
                          isActive
                            ? "border-[#0a8fb8] bg-[#0a8fb8]"
                            : "border-neutral-300 bg-white/80 group-hover:border-[#0a8fb8]"
                        }`}
                      />
                    </div>

                    {/* Card */}
                    <motion.article
                      animate={{
                        scale: isActive ? 1 : near ? 0.96 : 0.93,
                        opacity: isActive ? 1 : near ? 0.85 : 0.6,
                      }}
                      transition={cardTransition}
                      className={`relative flex flex-1 min-h-[280px] flex-col overflow-hidden rounded-2xl border px-5 py-6 backdrop-blur-sm sm:px-6 sm:py-7 ${
                        isActive
                          ? "border-sky-300/70 shadow-[0_26px_60px_-30px_rgba(10,143,184,0.28)]"
                          : "border-white/80 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
                      } ${m.flag ? "ring-1 ring-[#0a8fb8]/25" : ""}`}
                      style={{
                        background:
                          "radial-gradient(120% 90% at 100% 0%, rgba(14,165,233,0.1) 0%, transparent 55%), linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 100%)",
                      }}
                    >
                      {/* Decorative glow */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12)_0%,transparent_70%)] blur-xl"
                      />

                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/40 to-transparent"
                      />

                      {/* Background Year */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-5 top-3 select-none font-[Fraunces,serif] text-[64px] font-semibold leading-none tracking-tight text-sky-900/[0.045]"
                      >
                        {m.year}
                      </span>

                      {/* Year */}
                      <div className="relative flex items-center gap-3">
                        <span className="font-[Fraunces,serif] text-[32px] font-semibold leading-none tracking-tight text-neutral-900">
                          {m.year}
                        </span>

                        <span className="h-px flex-1 bg-sky-200/60" />

                        <span className="font-[Fraunces,serif] text-[11px] font-semibold tracking-[0.2em] text-sky-700/45 tabular-nums">
                          {m.index}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative mt-6">
                        <h3 className="font-[Montserrat,sans-serif] text-[17px] font-semibold leading-snug tracking-tight text-neutral-900">
                          {m.name}
                        </h3>

                        <p className="mt-1.5 font-[Fraunces,serif] text-[12px] font-medium uppercase tracking-[0.14em] text-[#0a8fb8]">
                          {m.sub}
                        </p>

                        <p className="mt-4 font-[Fraunces,serif] text-[13.5px] leading-[1.7] text-neutral-600">
                          {m.desc}
                        </p>
                      </div>

                      {/* Footer Tags */}
                      <div className="relative mt-auto flex flex-wrap items-center gap-3 border-t border-sky-100/80 pt-5">
                        <span className="inline-flex items-center rounded-full border border-sky-100 bg-white/80 px-3 py-1.5 font-[Fraunces,serif] text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-900/65">
                          {m.tag}
                        </span>

                        {m.flag && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a8fb8] px-3 py-1.5 font-[Fraunces,serif] text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            {m.flag}
                          </span>
                        )}
                      </div>
                    </motion.article>
                  </li>
                );
              })}
            </ol>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 sm:px-8 lg:px-12">
          <div className="h-px w-full bg-neutral-200">
            <motion.div
              className="h-px bg-[#0a8fb8]"
              animate={{ width: `${Math.max(8, (activeIndex / (N - 1)) * 100)}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="flex shrink-0 items-center gap-6">
            <div className="hidden items-center gap-2 sm:flex">
              {MILESTONES.map((m, i) => (
                <button
                  key={m.index}
                  type="button"
                  aria-label={`Go to ${m.year} — ${m.name}`}
                  onClick={() => handleDot(i)}
                  onFocus={() => pause(false)}
                  onBlur={resumeSoon}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-7 bg-[#0a8fb8]"
                      : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <span className="font-[Fraunces,serif] text-sm font-semibold tabular-nums text-neutral-500">
              {MILESTONES[activeIndex].index}{" "}
              <span className="text-neutral-300">/ 08</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}