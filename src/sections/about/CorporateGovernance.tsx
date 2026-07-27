import { motion } from "framer-motion";
import { ShieldCheck, Leaf } from "lucide-react";
import { Reveal, stagger, fadeUp } from "./shared";

const GOVERNANCE_COMPANIES = [
  "Shield Global HR Solutions",
  "Shield Workforce Solutions",
  "InfiCorp Technology",
  "Cineglare Entertainment",
];

export function CorporateGovernance() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-24 text-white sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #0a8fb8 0px, transparent 40%), radial-gradient(circle at 80% 60%, #7ed7ee 0px, transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7ed7ee]">
              <span className="h-px w-8 bg-[#7ed7ee]" />
              Corporate Governance
            </span>
            <h2 className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Built on integrity.
              <br />
              Governed with accountability.
            </h2>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur">
              <Leaf size={16} className="text-[#7ed7ee]" />
              Sustainable growth · Long-term stakeholder value
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="space-y-6 text-[15.5px] leading-relaxed text-white/75">
              <p>
                <strong className="text-white">Shield Global Group</strong> is
                committed to maintaining the highest standards of corporate
                governance, ensuring transparency, accountability, and ethical
                business practices across all its operations. Our governance
                framework is built on integrity, compliance, and responsible
                decision-making, supporting sustainable growth and long-term
                stakeholder value.
              </p>
              <p>
                We adhere to applicable legal and regulatory requirements
                while promoting fair employment practices, transparent client
                engagement, and responsible financial management. The Group
                emphasizes strong internal controls, risk management, and
                data confidentiality across its companies —
              </p>
            </div>

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {GOVERNANCE_COMPANIES.map((c) => (
                <motion.li
                  key={c}
                  variants={fadeUp}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-medium text-white/90 backdrop-blur transition-all hover:border-[#7ed7ee]/40 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a8fb8]/20 text-[#7ed7ee]">
                    <ShieldCheck size={16} strokeWidth={2} />
                  </span>
                  {c}
                </motion.li>
              ))}
            </motion.ul>

            <p className="mt-8 text-[15.5px] leading-relaxed text-white/75">
              Our leadership encourages a culture of professionalism, ethical
              conduct, and operational excellence, ensuring that all business
              activities align with industry standards and corporate
              responsibility. Through effective governance, we aim to build
              trust with clients, partners, employees, and stakeholders while
              strengthening our position as a reliable and responsible
              conglomerate.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}