import { Quote } from "lucide-react";
import { Reveal } from "./shared";

export function FoundersMessage() {
  return (
    <section className="relative bg-sgg-surface-raised py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          {/* Centered eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#0a8fb8]" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0a8fb8]">
              Founder's Message
            </span>
            <span className="h-px w-8 bg-[#0a8fb8]" />
          </div>

          <div className="relative mt-6">
            <div className="flex gap-4 sm:gap-5">
              <Quote
                size={28}
                className="mt-0.5 shrink-0 text-[#0a8fb8]/30"
                strokeWidth={1.25}
                aria-hidden
              />

              <blockquote className="min-w-0 flex-1 font-[Montserrat,sans-serif] text-[15px] leading-[1.75] text-neutral-700 sm:text-base sm:leading-[1.8]">
                <div className="grid gap-5 md:grid-cols-2 md:gap-8">
                  <p>
                    &ldquo;At Shield Global Group, our vision is to build a
                    diversified and future-ready conglomerate delivering
                    integrated solutions across multiple industries, grounded in
                    trust, professionalism, and innovation. As a group, we
                    collectively offer services in Overseas Recruitment, Indian
                    Staffing, HR Services, Industrial Automation, Data
                    Intelligence, and Commercial Advertisement & Event
                    Management, enabling us to support organisations through
                    comprehensive and value-driven solutions.
                  </p>
                  <p>
                    Our objective is to create long-term partnerships by
                    connecting global talent, strengthening workforce
                    capabilities, driving technology-led transformation, and
                    delivering impactful brand experiences. We remain committed
                    to sustainable growth, operational excellence, and fostering
                    enduring relationships with our clients and stakeholders as
                    we continue to expand our footprint and contribute to
                    business success across sectors.&rdquo;
                  </p>
                </div>

                <footer className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                  <span className="h-px w-8 bg-neutral-300" />
                  Founder, Shield Global Group
                </footer>
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
