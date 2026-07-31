import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Slide = {
  video: string;
  kind: "intro" | "label";
  align?: "left" | "right";
  title?: string;
  subtitle?: string;
};

const SLIDES: Slide[] = [
  { video: "/hero/HV1.mp4", kind: "intro" },
  {
    video: "/hero/HV2.mp4",
    kind: "label",
    align: "right",
    title: "Shield Global HR Solutions",
    subtitle: "Recruiting Manpower from Asia, Africa and Europe",
  },
  {
    video: "/hero/HV3.mp4",
    kind: "label",
    align: "right",
    title: "Shield Workforce",
    subtitle: "Connecting talent with precision",
  },
  {
    video: "/hero/HV4.mp4",
    kind: "label",
    align: "left",
    title: "InfiCorp Technology",
    subtitle: "AI-Powered Industrial Automation Software",
  },
  {
    video: "/hero/HV5.mp4",
    kind: "label",
    align: "right",
    title: "CineGlare Entertainment",
    subtitle: "Ad Films, Corporate Films, Event & Celebrity Management",
  },
];

const TABS = [
  { line1: "Global Manpower", line2: "Recruitment", slide: 1 },
  { line1: "Staffing & Workforce", line2: "Solutions", slide: 2 },
  { line1: "AI-Powered", line2: "Industrial Automation", slide: 3 },
  { line1: "Media &", line2: "Entertainment", slide: 4 },
];

/** Premium ease — soft deceleration, no bounce */
const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slide = SLIDES[index];
  const reduceMotion = useReducedMotion();
  /** Overlays only on the 5th video (index 4) */
  const showOverlay = index === 4;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  // Fallback timer in case the video cannot autoplay (e.g. reduced data).
  useEffect(() => {
    const el = videoRef.current;
    el?.play().catch(() => undefined);
    const timer = window.setTimeout(next, 12000);
    return () => window.clearTimeout(timer);
  }, [index, next]);

  const fadeUp = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      aria-label="Shield Global Group introduction"
      className="relative isolate h-[86svh] min-h-[480px] w-full overflow-hidden bg-neutral-950"
    >
      <AnimatePresence mode="sync">
        <motion.video
          key={slide.video}
          ref={videoRef}
          src={slide.video}
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={next}
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 1.03,
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: reduceMotion ? 0.35 : 1.05, ease: "easeInOut" },
            scale: {
              duration: reduceMotion ? 0 : 12,
              ease: "linear",
            },
          }}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] contrast-[1.06] saturate-[0.92]"
        />
      </AnimatePresence>

      {showOverlay && (
        <>
          {/* Uniform dark base */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-neutral-950/34"
          />
          {/* Vertical depth gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-neutral-950/58 via-neutral-950/18 to-neutral-950/74"
          />
          {/* Soft vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_44%,rgba(10,18,32,0.4)_100%)]"
          />
        </>
      )}

      {/* ── Slide 1: centred brand intro ── */}
      {slide.kind === "intro" ? (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1 px-5 pt-1 text-center sm:px-8">
          <motion.p
            key={`welcome-${index}`}
            {...fadeUp}
            transition={{
              duration: reduceMotion ? 0.3 : 0.8,
              delay: reduceMotion ? 0 : 0.12,
              ease: EASE,
            }}
            className="font-[Fraunces,serif] text-[clamp(16px,1.9vw,34px)] font-semibold leading-[1.3] tracking-[0.1em] text-white/95 [text-shadow:0_1px_18px_rgba(0,0,0,0.35)]"
          >
            Welcome to
          </motion.p>
          <motion.h1
            key={`title-${index}`}
            {...fadeUp}
            transition={{
              duration: reduceMotion ? 0.3 : 0.8,
              delay: reduceMotion ? 0 : 0.26,
              ease: EASE,
            }}
            className="font-['Cormorant_Garamond',serif] text-[clamp(42px,7.4vw,100px)] font-semibold leading-[1.06] tracking-[-0.012em] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
          >
            Shield Global
          </motion.h1>
          <motion.p
            key={`group-${index}`}
            {...fadeUp}
            transition={{
              duration: reduceMotion ? 0.3 : 0.8,
              delay: reduceMotion ? 0 : 0.38,
              ease: EASE,
            }}
            className="font-['Cormorant_Garamond',serif] text-[clamp(13px,1.55vw,21px)] font-semibold leading-[1.35] tracking-[0.4em] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.35)]"
          >
            GROUP
          </motion.p>
          <motion.span
            key={`cta-${index}`}
            {...fadeUp}
            transition={{
              duration: reduceMotion ? 0.3 : 0.8,
              delay: reduceMotion ? 0 : 0.5,
              ease: EASE,
            }}
            whileHover={{
              y: reduceMotion ? 0 : -1,
              boxShadow:
                "0 10px 28px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)",
            }}
            className="mt-4 inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[rgba(100,220,210,0.96)] to-[rgba(220,215,140,0.96)] px-7 py-2.5 text-[clamp(11px,1.05vw,15px)] font-semibold leading-none tracking-[0.02em] text-neutral-900 shadow-[0_6px_22px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.14)] sm:mt-5 sm:px-9 sm:py-3"
          >
            Connecting talent, technology & entertainment
          </motion.span>
        </div>
      ) : (
        <>
          {/* ── Slides 2–5: premium glass label card ── */}
          <motion.div
            key={`label-${index}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: reduceMotion ? 0.3 : 0.85,
              delay: reduceMotion ? 0 : 0.18,
              ease: EASE,
            }}
            className={`absolute top-[36%] z-10 w-[calc(100%-40px)] max-w-[540px] -translate-y-1/2 rounded-[16px] border border-white/[0.13] bg-white/[0.075] px-5 py-4 shadow-[0_4px_8px_rgba(0,0,0,0.14),0_18px_44px_rgba(0,0,0,0.3)] backdrop-blur-[22px] sm:w-[calc(100%-56px)] sm:px-7 sm:py-5 lg:px-8 ${
              slide.align === "left"
                ? "left-5 text-left sm:left-10 lg:left-[60px]"
                : "right-5 text-left sm:right-10 sm:text-right lg:right-[60px]"
            }`}
          >
            <h2 className="text-[clamp(21px,2.5vw,33px)] font-semibold leading-[1.2] tracking-[-0.012em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.25)]">
              {slide.title}
            </h2>
            <p className="mt-1.5 text-[clamp(13px,1.2vw,16.5px)] font-normal leading-[1.55] tracking-[0.01em] text-[#8af0ff]">
              {slide.subtitle}
            </p>
          </motion.div>

          {/* ── Bottom tab bar ── */}
          <motion.nav
            aria-label="Group divisions"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.3 : 0.85,
              delay: reduceMotion ? 0 : 0.3,
              ease: EASE,
            }}
            className="absolute bottom-5 left-1/2 z-10 w-[calc(100%-32px)] -translate-x-1/2 overflow-hidden rounded-[14px] border border-white/[0.14] bg-white/[0.055] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:bottom-8 sm:w-[calc(100%-48px)] lg:bottom-12 lg:w-[calc(100%-120px)]"
          >
            <ul className="grid grid-cols-2 divide-x divide-y divide-white/[0.08] lg:flex lg:divide-y-0">
              {TABS.map((tab) => {
                const active = index === tab.slide;
                const label = `${tab.line1} ${tab.line2}`;
                return (
                  <li key={tab.line1} className="relative flex min-w-0 flex-1">
                    <motion.button
                      type="button"
                      onClick={() => setIndex(tab.slide)}
                      aria-label={label}
                      aria-current={active ? "true" : undefined}
                      whileHover={{
                        backgroundColor: active
                          ? "rgba(255,255,255,0.16)"
                          : "rgba(255,255,255,0.09)",
                      }}
                      whileTap={{ scale: reduceMotion ? 1 : 0.988 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className={`relative h-full w-full min-w-0 cursor-pointer border-0 px-2.5 py-2.5 text-center text-[clamp(11px,1.1vw,15.5px)] font-semibold leading-[1.3] tracking-[0.012em] transition-[background-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00e5ff]/70 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 ${
                        active
                          ? "bg-white/[0.14] text-white"
                          : "bg-transparent text-white/80"
                      }`}
                    >
                      <span className="block truncate sm:whitespace-normal">
                        {tab.line1}
                      </span>
                      <span className="block truncate sm:whitespace-normal">
                        {tab.line2}
                      </span>
                      {/* Active accent indicator */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-x-2.5 bottom-0 h-[2px] rounded-full bg-[#00e5ff] transition-opacity duration-300 sm:inset-x-4 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </section>
  );
}
