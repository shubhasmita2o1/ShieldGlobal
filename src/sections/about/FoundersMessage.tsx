import { Reveal } from "./shared";

export function FoundersMessage() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--sgg-g-hero)] py-12 sm:py-14 lg:py-16 text-sgg-ink-inverse">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--sgg-ink-accent) 0px, transparent 40%), radial-gradient(circle at 80% 60%, var(--sgg-ink-accent-dark) 0px, transparent 45%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-sgg-ink-accent-dark" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sgg-ink-accent-dark">
              Founder's Message
            </span>
            <span className="h-px w-8 bg-sgg-ink-accent-dark" />
          </div>

          <h2 className="mt-5 text-center font-[Fraunces,serif] text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Built on trust.
            <br />
            <span className="bg-gradient-to-r from-[#2fd3e8] via-[#5edff0] to-[#2fd3e8] bg-clip-text text-transparent">
              Driven by vision.
            </span>
          </h2>

          <div className="mt-8 rounded-2xl border border-sgg-border-dark bg-white/[0.06] px-6 py-7 sm:px-10 sm:py-9 backdrop-blur-sm">
            <blockquote className="font-[Montserrat,sans-serif] text-[14px] leading-[1.75] text-sgg-ink-inverse-2 sm:text-[15px] sm:leading-[1.8]">
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

              <footer className="mt-6 text-[13px] font-medium text-sgg-ink-inverse-2/80">
                &mdash; Founder, Shield Global Group
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
