import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { ServicePage } from "@/sections/services/ServicePage";
import { getService } from "@/sections/services/serviceData";
import { serviceHead } from "@/lib/service-head";

const service = getService("/services/ai-powered-automation");

export const Route = createFileRoute("/services/ai-powered-automation")({
  component: () => (
    <MainLayout>
      <ServicePage service={service} />
    </MainLayout>
  ),
  head: () => serviceHead(service),
});
