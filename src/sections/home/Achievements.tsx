import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Award, Building2, Globe2, Layers, Users, Briefcase } from "lucide-react";
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
    value: 1200,
    suffix: "+",
    label: "Mandates delivered",
    detail: "Workforce, automation and production programmes completed.",
  },
  {
    icon: Globe2,
    value: 24,
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
    value: 3,
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
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <SectionEyebrow>Achievements</SectionEyebrow>
            <h2
              id="achievements-title"
              className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              A record measured in{" "}
              <span className="text-white/40">scale and continuity</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-[#c2c8d6]">
              Milestones built over almost two decades of cross-border delivery
              across three business verticals.
            </p>
          </motion.div>

          <motion.ul
            variants={stagger}
            className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.08] sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          >
            {STATS.map(({ icon: Icon, value, suffix, label, detail }) => (
              <motion.li
                key={label}
                variants={fadeUp}
                className="group min-w-0 bg-[#0d1725] p-7 transition-colors duration-300 hover:bg-[#101f31] sm:p-8 lg:p-9"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a8fb8]/15 text-[#7ed7ee] transition-colors group-hover:bg-[#0a8fb8] group-hover:text-white">
                  <Icon size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <p className="mt-6 font-[Fraunces,serif] text-[42px] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-[48px]">
                  <CountUp value={value} suffix={suffix} />
                </p>
                <h3 className="mt-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0a8fb8]">
                  {label}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#9aa3b6]">
                  {detail}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
