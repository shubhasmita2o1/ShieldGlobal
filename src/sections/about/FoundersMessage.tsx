import { Reveal } from "./shared";

export function FoundersMessage() {
  return (
    <section
      className="relative overflow-hidden py-10 sm:py-12 lg:py-14"
      style={{
        background:
          "linear-gradient(145deg, #ffffff 0%, #f0f9ff 38%, #e0f2fe 72%, #f0f9ff 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#0a8fb8]" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0a8fb8]">
              Founder's Message
            </span>
            <span className="h-px w-8 bg-[#0a8fb8]" />
          </div>

          <div className="mt-6 rounded-2xl border border-sky-200/60 bg-[#16273d]/92 px-6 py-7 sm:px-10 sm:py-9 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-sm">
            <blockquote className="font-[Montserrat,sans-serif] text-[14px] leading-[1.75] text-slate-200/95 sm:text-[15px] sm:leading-[1.8]">
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

              <footer className="mt-6 text-[13px] font-medium text-slate-400">
                &mdash; Founder, Shield Global Group
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
