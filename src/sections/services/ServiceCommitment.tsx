import { ShieldCheck, Sparkles } from "lucide-react";
import type { ServiceDetail } from "./serviceData";
import { Reveal } from "./shared";

export function ServiceCommitment({ service }: { service: ServiceDetail }) {
  return (
    <section className="border-t border-sgg-border-default bg-sgg-surface-sunken">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-sgg-ink-accent/10 text-sgg-ink-accent">
            <ShieldCheck size={24} aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-[Fraunces,serif] text-2xl font-semibold tracking-tight text-sgg-ink-primary sm:text-3xl">
            {service.commitmentTitle}
          </h2>
          {service.commitment.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mt-5 text-base leading-[1.9] text-sgg-ink-secondary sm:text-lg"
            >
              {p}
            </p>
          ))}
          {service.tagline && (
            <p className="mt-8 inline-flex items-center gap-2 font-[Cormorant_Garamond,serif] text-xl italic text-sgg-ink-primary sm:text-2xl">
              <Sparkles
                size={18}
                aria-hidden="true"
                className="text-sgg-ink-accent"
              />
              {service.tagline}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}