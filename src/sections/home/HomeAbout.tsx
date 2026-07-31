import { motion } from "framer-motion";
import { Users, Cpu, Clapperboard } from "lucide-react";
import { fadeUp, stagger, SectionEyebrow } from "@/sections/about/shared";

const VERTICALS = [
  {
    icon: Users,
    title: "Human Capital",
    body: "Global recruitment, staffing and workforce solutions across Asia, Africa, the Middle East and Europe.",
  },
  {
    icon: Cpu,
    title: "Technology",
    body: "AI-powered industrial automation and data intelligence for manufacturing and enterprise clients.",
  },
  {
    icon: Clapperboard,
    title: "Entertainment",
    body: "Ad films, corporate films, events and celebrity management under CineGlare Entertainment.",
  },
];

export function HomeAbout() {
  return (
    <section
      aria-labelledby="home-about-title"
      className="relative overflow-hidden bg-[#0f1a28] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_10%_-10%,rgba(10,143,184,0.12),transparent_55%),radial-gradient(700px_360px_at_95%_110%,rgba(10,143,184,0.07),transparent_50%)]"
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
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-20 lg:items-start"
        >
          {/* Left — story */}
          <div className="min-w-0">
            <motion.div variants={fadeUp}>
              <SectionEyebrow>About the Group</SectionEyebrow>
              <h2
                id="home-about-title"
                className="mt-4 max-w-xl font-[Fraunces,serif] text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                Connecting talent, technology{" "}
                <span className="text-white/40">&amp; entertainment</span>
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-7 max-w-2xl space-y-5 text-[15px] leading-[1.85] text-[#c2c8d6] sm:text-[15.5px]"
            >
              <p>
                <strong className="font-semibold text-white">
                  Shield Global Group
                </strong>{" "}
                is a diversified global business group delivering integrated
                solutions across Human Resources, Technology, and Media &amp;
                Entertainment. Backed by a growing network of international
                associations, strategic partners, and a broad global clientele,
                the group operates through its core companies — Shield Global HR
                Solutions, InfiCorp Technology, and Cineglare Entertainment.
              </p>
              <p>
                We provide end-to-end capabilities including global talent
                solutions, AI-powered industrial automation, and creative brand
                &amp; entertainment services. Our collaborative approach,
                combined with industry expertise and global partnerships,
                enables us to support organizations across diverse sectors and
                geographies.
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0a8fb8]"
            >
              Talent &nbsp;·&nbsp; Intelligence &nbsp;·&nbsp; Impact — One
              Identity
            </motion.p>
          </div>

          {/* Right — three vertical cards */}
          <motion.ul variants={stagger} className="grid gap-4">
            {VERTICALS.map(({ icon: Icon, title, body }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group flex gap-4 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#0a8fb8]/35 hover:bg-white/[0.07] sm:p-6"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a8fb8]/15 text-[#7ed7ee] transition-colors group-hover:bg-[#0a8fb8] group-hover:text-white">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-[Fraunces,serif] text-lg font-semibold tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#9aa3b6]">
                    {body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}