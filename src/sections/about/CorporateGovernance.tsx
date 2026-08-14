import { motion } from "framer-motion";
import { ShieldCheck, Leaf } from "lucide-react";
import { Reveal, stagger, fadeUp } from "./shared";
import governanceImg from "@/assets/images/ab5.jpg";

const GOVERNANCE_COMPANIES = [
  "Shield Global HR Solutions",
  "Shield Workforce Solutions",
  "InfiCorp Technology",
  "Cineglare Entertainment",
];

export function CorporateGovernance() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--sgg-g-hero)] py-24 text-sgg-ink-inverse sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--sgg-ink-accent) 0px, transparent 40%), radial-gradient(circle at 80% 60%, var(--sgg-ink-accent-dark) 0px, transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sgg-ink-accent-dark">
              <span className="h-px w-8 bg-sgg-ink-accent-dark" />
              Corporate Governance
            </span>
            <h2 className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Built on integrity.
              <br />
              Governed with accountability.
            </h2>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-sgg-border-dark bg-white/5 px-5 py-3 text-sm text-sgg-ink-inverse-2 backdrop-blur">
              <Leaf size={16} className="text-sgg-ink-accent-dark" />
              Sustainable growth · Long-term stakeholder value
            </div>

            {/* Single wrapper — same as ESG + aspect 16/9 */}
            <div className="group relative mt-10 overflow-hidden rounded-3xl bg-neutral-100 shadow-[var(--sgg-e4)]">
              <img
                src={governanceImg}
                alt="Corporate governance at Shield Global Group"
                loading="lazy"
                className="block aspect-[16/9] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sgg-surface-dark/25 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="space-y-6 text-[15.5px] leading-relaxed text-sgg-ink-inverse-2">
              <p>
                <strong className="text-sgg-ink-inverse">Shield Global Group</strong> is
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
                  className="group flex items-center gap-3 rounded-xl border border-sgg-border-dark bg-white/[0.04] px-4 py-4 text-sm font-medium text-sgg-ink-inverse-2 backdrop-blur transition-all hover:border-sgg-border-accent"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sgg-ink-accent/20 text-sgg-ink-accent-dark">
                    <ShieldCheck size={16} strokeWidth={2} />
                  </span>
                  {c}
                </motion.li>
              ))}
            </motion.ul>

            <p className="mt-8 text-[15.5px] leading-relaxed text-sgg-ink-inverse-2">
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
