import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal, SectionEyebrow } from "./shared";

export function FoundersMessage() {
  return (
    <section className="relative bg-sgg-surface-raised py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Image column — smaller & more refined */}
          <Reveal className="lg:col-span-4">
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[260px]">
              <div className="absolute -inset-2.5 -z-10 rounded-2xl bg-gradient-to-br from-[#0a8fb8]/12 via-transparent to-transparent" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl shadow-[0_16px_40px_-16px_rgba(15,23,42,0.28)] ring-1 ring-neutral-200/70"
              >
                <img
                  src="http://shieldglobal.technoriya.com/Assets/founder.jpg"
                  alt="Founder, Shield Global Group"
                  loading="lazy"
                  className="aspect-[3/4] w-full bg-neutral-100 object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".img-fallback")) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "img-fallback flex aspect-[3/4] w-full items-center justify-center bg-neutral-100 text-neutral-400";
                      fallback.innerHTML =
                        '<span class="text-sm font-medium">Founder photo</span>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </motion.div>

              {/* Name badge */}
              <div className="absolute -bottom-3.5 left-3 rounded-lg bg-white px-3.5 py-2 shadow-md ring-1 ring-neutral-200">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Founder
                </p>
                <p className="text-[13px] font-semibold text-neutral-900">
                  Shield Global Group
                </p>
              </div>
            </div>
          </Reveal>

          {/* Text column */}
          <Reveal className="lg:col-span-8" delay={0.08}>
            <SectionEyebrow>Founder&apos;s Message</SectionEyebrow>

            <Quote
              size={28}
              className="mt-4 text-[#0a8fb8]/35"
              strokeWidth={1.5}
              aria-hidden
            />

            <blockquote className="mt-3 space-y-4 font-[Montserrat,sans-serif] text-[15px] leading-[1.75] text-neutral-700 sm:text-base sm:leading-[1.8]">
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
                Our objective is to create long-term partnerships by connecting
                global talent, strengthening workforce capabilities, driving
                technology-led transformation, and delivering impactful brand
                experiences. We remain committed to sustainable growth,
                operational excellence, and fostering enduring relationships
                with our clients and stakeholders as we continue to expand our
                footprint and contribute to business success across sectors.
              </p>
            </blockquote>

            <footer className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
              <span className="h-px w-8 bg-neutral-300" />
              Founder, Shield Global Group
            </footer>
          </Reveal>
        </div>
      </div>
    </section>
  );
}