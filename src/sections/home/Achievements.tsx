import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Award,
  Building2,
  Globe2,
  Layers,
  Users,
  Briefcase,
  FileDown,
} from "lucide-react";
import { fadeUp, stagger, SectionEyebrow } from "@/sections/about/shared";

type Stat = {
  icon: typeof Award;
  value: number;
  suffix?: string;
  label: string;
  detail: string;
};

/** Placeholder figures — update with verified group data when available. */
const STATS: Stat[] = [
  {
    icon: Award,
    value: 18,
    suffix: "+",
    label: "Years of experience",
    detail: "Operating across recruitment, technology and media since 2007.",
  },
  {
    icon: Briefcase,
    value: 12000,
    suffix: "+",
    label: "Mandates delivered",
    detail: "Workforce, automation and production programmes completed.",
  },
  {
    icon: Globe2,
    value: 31,
    label: "Countries served",
    detail: "Across Asia, Africa, the Middle East and Europe.",
  },
  {
    icon: Users,
    value: 350,
    suffix: "+",
    label: "Clients & partners",
    detail: "Long-term relationships with enterprise and government groups.",
  },
  {
    icon: Layers,
    value: 12,
    label: "Industries covered",
    detail: "Infrastructure, energy, manufacturing, hospitality and more.",
  },
  {
    icon: Building2,
    value: 4,
    label: "Business verticals",
    detail: "Human capital, technology and entertainment under one group.",
  },
];

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US")}
      {suffix ?? ""}
    </span>
  );
}

export function Achievements() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="achievements-title"
      className="relative overflow-hidden bg-[#0a1220] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_460px_at_50%_-15%,rgba(10,143,184,0.16),transparent_60%)]"
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
          className="grid items-stretch gap-10 lg:grid-cols-[45fr_55fr] lg:gap-16"
        >
          {/* LEFT — stats + CTA */}
          <div className="flex min-w-0 flex-col">
            <motion.div variants={fadeUp}>
              <SectionEyebrow>Achievements</SectionEyebrow>
              <h2
                id="achievements-title"
                className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]"
              >
                A record measured in{" "}
                <span className="text-white/40">scale and continuity</span>
              </h2>
              <p className="mt-4 max-w-xl text-[14.5px] leading-[1.8] text-[#c2c8d6]">
                Almost two decades of cross-border delivery across Asia, Africa,
                the Middle East and Europe — four business verticals under one
                group.
              </p>
            </motion.div>

            <motion.ul
              variants={stagger}
              className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-x-6"
            >
              {STATS.map(({ icon: Icon, value, suffix, label }) => (
                <motion.li key={label} variants={fadeUp} className="min-w-0">
                  <Icon
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden
                    className="text-[#0a8fb8]"
                  />
                  <p className="mt-2.5 font-[Fraunces,serif] text-[28px] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-[30px] lg:text-[34px]">
                    <CountUp value={value} suffix={suffix} />
                  </p>
                  <h3 className="mt-2 text-[10.5px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#7ed7ee]">
                    {label}
                  </h3>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8">
              <a
                href="/company-profile.pdf"
                download
                aria-label="Download the Shield Global Group company profile (PDF)"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0a8fb8] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#0b7ea3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed7ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1220]"
              >
                <FileDown size={17} strokeWidth={1.9} aria-hidden />
                Download Company Profile
              </a>
            </motion.div>
          </div>

          {/* RIGHT — cinematic video */}
          <motion.div
            variants={fadeUp}
            className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10"
          >
            <video
              className="h-[220px] w-full object-cover sm:h-[300px] lg:absolute lg:inset-0 lg:h-full"
              src="/achievement.mp4"
              autoPlay={!reduceMotion}
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Shield Global Group industrial and corporate operations footage"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1220]/75 via-[#0a1220]/20 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#0a8fb8]/10 mix-blend-overlay"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}