import { Reveal } from "./shared";

export function FoundersMessage() {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-14 lg:py-16"
      style={{
        background:
          "linear-gradient(145deg, #ffffff 0%, #f0f9ff 38%, #e0f2fe 72%, #f0f9ff 100%)",
      }}
    >
      {/* Soft ambient glow like testimonials */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-[10%] top-[-20%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(10,143,184,0.14)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute -right-[8%] bottom-[-24%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12)_0%,transparent_70%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#0a8fb8]" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0a8fb8]">
              Founder's Message
            </span>
            <span className="h-px w-8 bg-[#0a8fb8]" />
          </div>

          <div className="mt-6 rounded-2xl border border-sky-200/70 bg-[#1a3352]/80 px-6 py-7 sm:px-10 sm:py-9 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.12)] backdrop-blur-md">
            <blockquote className="font-[Montserrat,sans-serif] text-[14px] leading-[1.75] text-slate-100/95 sm:text-[15px] sm:leading-[1.8]">
              <p>
                At Shield Global Group, our vision is to build a diversified and
                future-ready conglomerate delivering integrated solutions across
                multiple industries, grounded in trust, professionalism, and
                innovation. As a group, we collectively offer services in Overseas
                Recruitment, Indian Staffing, HR Services, Industrial Automation,
                Data Intelligence, and Commercial Advertisement & Event
                Management, enabling us to support organisations through
                comprehensive and value-driven solutions.
              </p>
              <p className="mt-5">
                Our objective is to create long-term partnerships by connecting
                global talent, strengthening workforce capabilities, driving
                technology-led transformation, and delivering impactful brand
                experiences. We remain committed to sustainable growth,
                operational excellence, and fostering enduring relationships with
                our clients and stakeholders as we continue to expand our
                footprint and contribute to business success across sectors.
              </p>

              <footer className="mt-6 text-[13px] font-medium text-sky-200/70">
                &mdash; Founder, Shield Global Group
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
