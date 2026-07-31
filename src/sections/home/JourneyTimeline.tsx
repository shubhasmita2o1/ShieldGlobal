import { useEffect, useRef, useState } from "react";
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


export function JourneyTimeline() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const isClicking = useRef(false);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;

    const clamped = Math.min(MILESTONES.length - 1, Math.max(0, i));
    isClicking.current = true;
    setActive(clamped);

    const card = el.children[clamped] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }

    // Allow scroll-sync again after smooth scroll finishes
    window.setTimeout(() => {
      isClicking.current = false;
    }, 450);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);

    // Don't override while a button/dot is animating
    if (isClicking.current) return;

    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return;

    const trackLeft = el.getBoundingClientRect().left;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const origin = trackLeft + pad;

    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - origin);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    setActive(best);
  };

  useEffect(() => {
    onScroll();
  }, []);

  const nudge = (dir: -1 | 1) => scrollTo(active + dir);
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative overflow-hidden bg-[#faf8f5] py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_88%_-8%,rgba(10,143,184,0.07),transparent_62%),radial-gradient(700px_400px_at_-5%_105%,rgba(10,143,184,0.05),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* ── Header row ─────────────────────────────── */}
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

          <motion.div variants={fadeUp} className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous milestone"
              onClick={() => nudge(-1)}
              disabled={active === 0}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#0a8fb8] hover:text-[#0a8fb8] disabled:opacity-35 disabled:hover:border-neutral-300 disabled:hover:text-neutral-700"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next milestone"
              onClick={() => nudge(1)}
              disabled={active === MILESTONES.length - 1}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#0a8fb8] hover:text-[#0a8fb8] disabled:opacity-35 disabled:hover:border-neutral-300 disabled:hover:text-neutral-700"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* ── Horizontal rail ───────────────────────── */}
        <div className="relative mt-14">

          <motion.ol
            ref={trackRef}
            onScroll={onScroll}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex min-h-[500px] snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-hidden scroll-smooth scroll-pl-6 px-6 pb-6 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:scroll-pl-8 sm:px-8 lg:scroll-pl-12 lg:px-12"
          >
            {MILESTONES.map((m, i) => (
              <motion.li
                key={m.index}
                variants={fadeUp}
                className="group relative flex w-[85vw] shrink-0 flex-col snap-start sm:w-[380px] lg:w-[400px]"
              >
                {/* timeline connector above the card */}
                <div className="relative flex h-[46px] items-center">
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-1/2 h-px ${
                      active === i ? "bg-[#0a8fb8]/45" : "bg-neutral-200"
                    } transition-colors`}
                  />
                  <span
                    aria-hidden
                    className={`relative h-2.5 w-2.5 rotate-45 border transition-all duration-500 ${
                      active === i
                        ? "border-[#0a8fb8] bg-[#0a8fb8]"
                        : "border-neutral-300 bg-[#faf8f5] group-hover:border-[#0a8fb8]"
                    }`}
                  />
                </div>

                <article
                  className={`relative flex flex-1 min-h-[340px] flex-col overflow-hidden rounded-2xl border bg-white/85 px-7 py-8 shadow-[0_1px_2px_rgba(16,24,40,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_-30px_rgba(16,24,40,0.24)] sm:px-8 sm:py-9 ${
                    active === i
                      ? "border-neutral-300"
                      : "border-neutral-200/80 hover:border-neutral-300"
                  } ${m.flag ? "ring-1 ring-[#0a8fb8]/25" : ""}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-3 select-none font-[Fraunces,serif] text-[92px] font-semibold leading-none tracking-tight text-neutral-900/[0.04]"
                  >
                    {m.year}
                  </span>

                  <div className="relative flex items-center gap-4">
                    <span className="font-[Fraunces,serif] text-[44px] font-semibold leading-none tracking-tight text-neutral-900">
                      {m.year}
                    </span>
                    <span className="h-px flex-1 bg-neutral-200" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 tabular-nums">
                      {m.index}
                    </span>
                  </div>

                  <div className="relative mt-7">
                    <h3 className="font-[Fraunces,serif] text-[21px] font-semibold leading-snug tracking-tight text-neutral-900">
                      {m.name}
                    </h3>
                    <p className="mt-1.5 font-[Montserrat,sans-serif] text-[12px] font-medium uppercase tracking-[0.14em] text-[#0a8fb8]">
                      {m.sub}
                    </p>
                    <p className="mt-4 text-[14.5px] leading-[1.75] text-neutral-600">
                      {m.desc}
                    </p>
                  </div>

                  <div className="relative mt-auto flex flex-wrap items-center gap-3 border-t border-neutral-200/80 pt-6">
                    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-[#faf8f5] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                      {m.tag}
                    </span>
                    {m.flag && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a8fb8] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {m.flag}
                      </span>
                    )}
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* ── Progress + index ──────────────────────── */}
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 sm:px-8 lg:px-12">
          <div className="h-px w-full bg-neutral-200">
            <div
              className="h-px bg-[#0a8fb8] transition-[width] duration-200"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
          <div className="flex shrink-0 items-center gap-6">
            <div className="hidden items-center gap-2 sm:flex">
              {MILESTONES.map((m, i) => (
                <button
                  key={m.index}
                  type="button"
                  aria-label={`Go to ${m.year} — ${m.name}`}
                  onClick={() => scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-7 bg-[#0a8fb8]"
                      : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
            <span className="font-[Fraunces,serif] text-sm font-semibold tabular-nums text-neutral-500">
              {MILESTONES[active].index}{" "}
              <span className="text-neutral-300">/ 08</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
