import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Cpu, Clapperboard } from "lucide-react";
import { Reveal, SectionHeading, fadeUp, stagger } from "@/sections/about/shared";

const COMPANIES = [
  {
    name: "Shield Global HR Solutions",
    icon: Users,
    focus: "Overseas Recruitment & HR Services",
    description:
      "Bridging the gap between global demand and local talent by connecting world-class professionals with international opportunities.",
    highlights: [
      "Overseas recruitment",
      "Executive search",
      "Compliance & documentation",
      "Mobilisation support",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Shield Workforce Solutions",
    icon: Briefcase,
    focus: "Payroll Management & Indian Outsourcing",
    description:
      "Streamlining the complexities of global workforce management with localized precision, statutory compliance and transparent payroll operations.",
    highlights: [
      "Payroll management",
      "Staffing & outsourcing",
      "Statutory compliance",
      "Workforce administration",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "InfiCorp Technology",
    icon: Cpu,
    focus: "AI-Powered Automation & Data Intelligence",
    description:
      "Transforming legacy processes into high-speed, intelligent workflows and turning raw information into actionable strategies that predict trends and optimise performance.",
    highlights: [
      "AI-powered automation",
      "Data intelligence",
      "Process engineering",
      "Performance analytics",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Cineglare Entertainment",
    icon: Clapperboard,
    focus: "Media, Events & Celebrity Management",
    description:
      "Crafting the narratives that define market leaders through high-impact ad and corporate films, immersive events and influential brand associations.",
    highlights: [
      "Ad & corporate films",
      "Brand storytelling",
      "Events management",
      "Celebrity management",
    ],
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80",
  },
];

export function CompanyShowcase() {
  return (
    <section className="relative bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Companies"
            title={
              <>
                A synchronised group built on{" "}
                <span className="text-[#0a8fb8]">focused expertise.</span>
              </>
            }
            intro="Four companies, one shared standard of delivery — enabling clients to scale talent, technology and brand impact without fragmented vendors."
          />
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {COMPANIES.map(({ name, icon: Icon, focus, description, highlights, image }) => (
            <motion.article
              key={name}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgba(10,143,184,0.4)]"
            >
              <div className="relative h-52 overflow-hidden sm:h-60">
                <img
                  src={image}
                  alt={`${name} — ${focus}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/10 to-transparent"
                />
                <span className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-[#0a8fb8] shadow-sm">
                  <Icon size={20} strokeWidth={1.75} aria-hidden />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a8fb8]">
                  {focus}
                </p>
                <h3 className="mt-3 font-[Fraunces,serif] text-2xl font-semibold leading-tight text-neutral-900">
                  {name}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
                  {description}
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-neutral-700">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a8fb8]"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-[#0a8fb8] hover:bg-[#0a8fb8] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8fb8]"
                >
                  Know more
                  <ArrowRight size={15} aria-hidden />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}