import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slide = SLIDES[index];

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-neutral-950/45 via-neutral-950/25 to-neutral-950/70"
      />

      {/* ── Slide 1: centred brand intro ── */}
      {slide.kind === "intro" ? (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-0.5 px-6 pt-2 text-center">
          <motion.p
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-[Fraunces,serif] text-[clamp(17px,2vw,36px)] font-semibold leading-[1.25] tracking-[0.1em] text-white/95"
          >
            Welcome to
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="font-['Cormorant_Garamond',serif] text-[clamp(44px,7.6vw,104px)] font-semibold leading-[1.08] tracking-[-0.01em] text-white"
          >
            Shield Global
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="font-['Cormorant_Garamond',serif] text-[clamp(14px,1.6vw,22px)] font-semibold leading-[1.3] tracking-[0.42em] text-white/90"
          >
            GROUP
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="mt-3.5 rounded-full bg-gradient-to-r from-[rgba(100,220,210,0.9)] to-[rgba(220,215,140,0.9)] px-7 py-2.5 text-[clamp(12px,1.1vw,16px)] font-semibold leading-none tracking-[0.02em] text-neutral-900 shadow-lg shadow-black/20 sm:px-9 sm:py-3"
          >
            Connecting talent, technology & entertainment
          </motion.p>
        </div>
      ) : (
        <>
          {/* ── Slides 2–5: premium glass label card ── */}
          <motion.div
            key={`label-${index}`}
            initial={{ opacity: 0, x: slide.align === "left" ? -120 : 120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className={`absolute top-[36%] z-10 w-[calc(100%-48px)] max-w-[552px] -translate-y-1/2 rounded-[17px] border border-white/[0.12] bg-white/[0.07] px-5 py-4 shadow-[0_4px_6px_rgba(0,0,0,0.12),0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-[20px] sm:px-7 sm:py-5 lg:px-9 ${
              slide.align === "left"
                ? "left-5 text-left sm:left-10 lg:left-[60px]"
                : "right-5 text-left sm:right-10 sm:text-right lg:right-[60px]"
            }`}
          >
            <h2 className="text-[clamp(22px,2.55vw,34px)] font-semibold leading-[1.18] tracking-[-0.01em] text-white">
              {slide.title}
            </h2>
            <p className="mt-1 text-[clamp(13px,1.25vw,17px)] font-normal leading-[1.55] tracking-[0.01em] text-[#7aefff]">
              {slide.subtitle}
            </p>
          </motion.div>

          {/* ── Bottom tab bar ── */}
          <motion.nav
            aria-label="Group divisions"
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="absolute bottom-5 left-1/2 z-10 w-[calc(100%-40px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:bottom-8 lg:bottom-12 lg:w-[calc(100%-120px)]"
          >
            <ul className="grid grid-cols-2 lg:flex">
              {TABS.map((tab) => {
                const active = index === tab.slide;
                return (
                  <li key={tab.line1} className="flex-1">
                    <button
                      type="button"
                      onClick={() => setIndex(tab.slide)}
                      aria-current={active ? "true" : undefined}
                      className={`h-full w-full cursor-pointer border-0 px-4 py-3.5 text-center text-[clamp(12px,1.25vw,18px)] font-semibold leading-[1.35] tracking-[0.01em] text-white transition-colors duration-300 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70 sm:py-5 lg:px-5 lg:py-6 ${
                        active ? "bg-white/[0.18]" : "bg-transparent"
                      }`}
                    >
                      {tab.line1}
                      <br />
                      {tab.line2}
                    </button>
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
