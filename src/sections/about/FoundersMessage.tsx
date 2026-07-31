import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal, SectionEyebrow } from "./shared";

export function FoundersMessage() {
  return (
    <section className="relative bg-sgg-surface-raised py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-[#0a8fb8]/15 via-transparent to-transparent" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]"
              >
                <img
                  src="http://shieldglobal.technoriya.com/Assets/founder.jpg"
                  alt="Founder, Shield Global Group"
                  loading="lazy"
                  className="aspect-[4/5] w-full bg-neutral-100 object-contain"
                />
              </motion.div>
              <div className="absolute -bottom-6 left-6 rounded-xl bg-white px-5 py-3 shadow-lg ring-1 ring-neutral-200">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                  Founder
                </p>
                <p className="text-sm font-semibold text-neutral-900">
                  Shield Global Group
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <SectionEyebrow>Founder&apos;s Message</SectionEyebrow>
            <Quote
              size={40}
              className="mt-6 text-[#0a8fb8]/40"
              strokeWidth={1.5}
              aria-hidden
            />
            <blockquote className="mt-4 space-y-5 font-[Cormorant_Garamond,serif] text-xl leading-relaxed text-neutral-800 sm:text-2xl">
              <p>
                At Shield Global Group, our vision is to build a diversified
                and future-ready conglomerate delivering integrated solutions
                across multiple industries, grounded in trust, professionalism,
                and innovation. As a group, we collectively offer services in
                Overseas Recruitment, Indian Staffing, HR Services, Industrial
                Automation, Data Intelligence, and Commercial Advertisement
                &amp; Event Management, enabling us to support organisations
                through comprehensive and value-driven solutions.
              </p>
              <p>
                Our objective is to create long-term partnerships by
                connecting global talent, strengthening workforce capabilities,
                driving technology-led transformation, and delivering impactful
                brand experiences. We remain committed to sustainable growth,
                operational excellence, and fostering enduring relationships
                with our clients and stakeholders as we continue to expand our
                footprint and contribute to business success across sectors.
              </p>
            </blockquote>
            <footer className="mt-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700">
              <span className="h-px w-10 bg-neutral-400" />
              Founder, Shield Global Group
            </footer>
          </Reveal>
        </div>
      </div>
    </section>
  );
}