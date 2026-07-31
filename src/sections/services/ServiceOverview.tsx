import type { ServiceDetail } from "./serviceData";
import { Reveal, SectionEyebrow } from "./shared";

export function ServiceOverview({ service }: { service: ServiceDetail }) {
  return (
    <section className="bg-sgg-surface-tinted">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionEyebrow>Overview</SectionEyebrow>
            <h2 className="mt-4 font-[Fraunces,serif] text-3xl font-semibold leading-[1.1] tracking-tight text-sgg-ink-primary sm:text-4xl">
              {service.company}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="max-w-2xl text-base leading-[1.85] text-sgg-ink-secondary sm:text-lg">
              {service.intro}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}