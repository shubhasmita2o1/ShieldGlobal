import { motion } from "framer-motion";
import { Users, Cpu, Clapperboard, ArrowRight } from "lucide-react";
import { Reveal, SectionHeading, fadeUp, stagger } from "./shared";

const PILLARS = [
  {
    icon: Users,
    tag: "The Human Engine",
    body:
      "We build the foundation of success by bridging the gap between global demand and local talent. Through Overseas Recruitment & HR Services, we connect world-class professionals with international opportunities, while our Payroll Management & Indian Outsourcing divisions streamline the complexities of global workforce management with localized precision and compliance.",
  },
  {
    icon: Cpu,
    tag: "The Digital Brain",
    body:
      "In an era defined by data, we provide the tools to lead rather than follow. We deploy AI-Powered Automation to transform legacy processes into high-speed, intelligent workflows and utilize Data Intelligence to turn raw information into actionable strategies that predict trends and optimize performance.",
  },
  {
    icon: Clapperboard,
    tag: "The Creative Soul",
    body:
      "Every business needs a voice that resonates. We craft the narratives that define market leaders through high-impact Ad & Corporate Films — ranging from 30-second sparks to deep-dive brand stories. Our Events & Celebrity Management team completes the circle, creating immersive experiences and aligning brands with influential voices to dominate the cultural conversation.",
  },
];

export function GroupIdentity() {
  return (
    <section className="relative bg-sgg-surface-tinted py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Group Identity"
            title={
              <>
                We have redefined the conglomerate model —{" "}
                <span className="text-[#0a8fb8]">Power of One.</span>
              </>
            }
            intro="At Shield Global Group we operate under the philosophy of The Power of One — providing a 360-degree growth engine that eliminates the need for fragmented vendors."
          />
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {PILLARS.map(({ icon: Icon, tag, body }) => (
            <motion.article
              key={tag}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative flex flex-col rounded-2xl border border-neutral-200/80 bg-[#f4fafc] p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(10,143,184,0.35)]"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6f6fb] text-[#0a8fb8] transition-colors group-hover:bg-[#0a8fb8] group-hover:text-white">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="font-[Fraunces,serif] text-xl font-semibold text-neutral-900">
                {tag}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
                {body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-16 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-6 py-3 text-sm font-medium text-neutral-700">
            <span>Talent</span>
            <ArrowRight size={14} className="text-[#0a8fb8]" />
            <span>Intelligence</span>
            <ArrowRight size={14} className="text-[#0a8fb8]" />
            <span>Impact</span>
            <span className="mx-2 h-4 w-px bg-neutral-300" />
            <span className="font-semibold text-neutral-900">One Identity</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
