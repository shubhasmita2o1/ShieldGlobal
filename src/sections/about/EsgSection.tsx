import { motion } from "framer-motion";
import { ShieldCheck, Zap, GraduationCap, HeartHandshake } from "lucide-react";
import { Reveal, SectionHeading, fadeUp, stagger } from "./shared";
import ab1 from "@/assets/images/ab1.png";
import ab2 from "@/assets/images/ab2.png";
import ab3 from "@/assets/images/ab3.png";
import ab4 from "@/assets/images/ab4.png";

const ESG_ITEMS = [
  {
    id: "ethical",
    icon: ShieldCheck,
    title: "Ethical Recruitment & Workforce Welfare",
    image: ab1,
    intro:
      "At Shield Global Group, we follow the highest standards of ethical recruitment and workforce welfare across our global network. We ensure fair, transparent, and responsible hiring practices that protect candidates while delivering reliable talent solutions worldwide.",
    groups: [
      {
        title: "Our Principles",
        items: [
          "Transparent hiring with no hidden costs",
          "Compliance with international labor laws",
          "Equal opportunity and non-discriminatory practices",
          "Verified job offers and employer credentials",
          "Zero tolerance for unethical recruitment",
        ],
      },
      {
        title: "We Act Differently",
        items: [
          "Pre-deployment briefing and documentation support",
          "Visa, travel, and onboarding assistance",
          "Accommodation and workplace guidance",
          "Grievance support and continuous communication",
          "Safe work environment collaboration with employers",
        ],
      },
    ],
    commitment:
      "Through integrity, transparency, and care, we build a sustainable global workforce ecosystem that benefits both businesses and professionals.",
  },
  {
    id: "energy",
    icon: Zap,
    title: "Energy Efficient Automation",
    image: ab2,
    intro:
      "At InfiCorp Technology, part of Shield Global Group, we develop SaaS-based industrial automation software focused on improving energy efficiency and supporting ESG goals. Our solutions help industries optimize operations, reduce energy consumption, and enable sustainable digital transformation.",
    groups: [
      {
        title: "Capabilities",
        items: [
          "Real-time energy monitoring and analytics",
          "Process optimization to reduce power usage",
          "Cloud-based SaaS model minimizing hardware footprint",
          "Predictive insights for efficient equipment performance",
          "Data-driven reporting for ESG compliance",
        ],
      },
    ],
    commitment:
      "Delivering smart automation software that enhances operational efficiency while supporting sustainable and responsible industrial growth.",
  },
  {
    id: "community",
    icon: GraduationCap,
    title: "Community Skill Development",
    image: ab3,
    intro:
      "Shield Global Group empowers communities through free technical training and certification programs. We focus on building industry-relevant skills, enhancing employability, and creating pathways for sustainable career growth.",
    groups: [
      {
        title: "Our Initiative",
        items: [
          "Free technical skill development programs",
          "Industry-oriented curriculum and practical learning",
          "Certification to enhance job readiness",
          "Guidance for international and domestic job opportunities",
          "Career counseling and interview preparation",
        ],
      },
      {
        title: "Our Impact",
        items: [
          "Supporting candidates in upgrading skills",
          "Promoting equal access to career opportunities",
          "Strengthening workforce readiness for global industries",
          "Encouraging sustainable community development",
        ],
      },
    ],
    commitment:
      "Shield Global Group builds a skilled talent pool through community skill development, supporting job seekers and promoting inclusive economic growth.",
  },
  {
    id: "bal",
    icon: HeartHandshake,
    title: "Bal Samriddhi Yojana",
    image: ab4,
    intro:
      "Starting June 2026, Shield Global Group introduces Bal Samriddhi Yojana, a new initiative aimed at supporting the education and career development of employees' children. This program is designed to encourage long-term growth and provide meaningful assistance for both sons and daughters of our workforce. Under this initiative, eligible employees will receive structured support from the employer towards their child's educational and skill development journey.",
    groups: [
      {
        title: "Key Objectives",
        items: [
          "Support for children's education and career development",
          "Inclusive benefits for both sons and daughters",
          "Encouraging long-term academic and skill growth",
          "Strengthening employee engagement and family support",
        ],
      },
    ],
    commitment:
      "Through Bal Samriddhi Yojana, Shield Global Group aims to invest in the future generation while reinforcing a culture of care, responsibility, and sustainable development.",
  },
] as const;

function EsgBlock({
  item,
  reverse,
}: {
  item: (typeof ESG_ITEMS)[number];
  reverse: boolean;
}) {
  const { icon: Icon } = item;
  return (
    <article
      id={item.id}
      className="scroll-mt-28 grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <Reveal className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
        <div className="group relative overflow-hidden rounded-3xl shadow-[0_25px_60px_-28px_rgba(8,17,30,0.45)]">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="block w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#08111e]/25 via-transparent to-transparent" />
        </div>
      </Reveal>

      <Reveal
        className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}
        delay={0.1}
      >
        <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#08111e] to-[#14263f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-slate-900/30">
          <Icon size={16} strokeWidth={2} />
          ESG Initiative
        </div>
        <h3 className="mt-5 font-[Fraunces,serif] text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl">
          {item.title}
        </h3>
        <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-neutral-600">
          {item.intro}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {item.groups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((li) => (
                  <li
                    key={li}
                    className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-neutral-700"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#08111e] to-[#2e7cf6]"
                    />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#14263f]/25 bg-gradient-to-br from-[#e8eef5] via-[#dce6f0] to-[#cfdceb] px-6 py-5 shadow-sm">
          <div className="mb-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#08111e] to-[#2e7cf6]" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14263f]">
            Our Commitment
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-800">
            {item.commitment}
          </p>
        </div>
      </Reveal>
    </article>
  );
}

export function EsgSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      {/* Strong base gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #e8f4f8 0%, #f0f7fb 28%, #e3f2f7 55%, #d8eef5 78%, #eaf5f9 100%)",
        }}
      />

      {/* Bold color orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 55% at 0% 5%, rgba(47, 211, 232, 0.28), transparent 55%), radial-gradient(ellipse 80% 50% at 100% 25%, rgba(46, 124, 246, 0.18), transparent 55%), radial-gradient(ellipse 70% 45% at 50% 100%, rgba(10, 143, 184, 0.22), transparent 55%), radial-gradient(circle 40% at 70% 70%, rgba(47, 211, 232, 0.12), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow="Sustainability & ESG Initiatives"
            title={
              <>
                Responsible by design.
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#0a8fb8] via-[#1ab8d4] to-[#2fd3e8] bg-clip-text text-transparent">
                  Sustainable by intent.
                </span>
              </>
            }
            intro="Four focused programs across ethics, energy, community and family — reflecting our long-term commitment to people, planet and progress."
          />
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ESG_ITEMS.map(({ id, icon: Icon, title }) => (
            <motion.a
              key={id}
              href={`#${id}`}
              variants={fadeUp}
              className="group flex items-center gap-3 rounded-xl border border-[#14263f]/20 bg-gradient-to-br from-[#e8eef5] via-[#dce6f0] to-[#c5d4e8] px-4 py-4 text-left text-sm font-medium text-neutral-800 shadow-md shadow-slate-900/10 transition-all hover:-translate-y-1 hover:border-[#14263f]/40 hover:shadow-lg hover:shadow-slate-900/15"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#08111e] to-[#14263f] text-white shadow-md shadow-slate-900/30 transition-transform group-hover:scale-110">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span className="min-w-0 leading-snug">{title}</span>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-20 space-y-24 lg:space-y-28">
          {ESG_ITEMS.map((item, i) => (
            <EsgBlock key={item.id} item={item} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
