import type { ServiceDetail } from "@/sections/services/serviceData";
import {
  ServiceHero,
  ServiceOverview,
  ServiceBlockSection,
  ServiceCommitment,
} from "@/sections/services";

export function ServicesPage({ service }: { service: ServiceDetail }) {
  return (
    <div className="bg-sgg-surface-canvas">
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      {service.blocks.map((block) => (
        <ServiceBlockSection key={block.heading} block={block} />
      ))}
      <ServiceCommitment service={service} />
    </div>
  );
}
