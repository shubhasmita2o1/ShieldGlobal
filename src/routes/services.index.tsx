import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { ServicePage } from "@/sections/services/ServicePage";
import { getService } from "@/sections/services/serviceData";
import { serviceHead } from "@/lib/service-head";

const service = getService("/services");

export const Route = createFileRoute("/services/")({
  component: () => (
    <MainLayout>
      <ServicePage service={service} />
    </MainLayout>
  ),
  head: () => serviceHead(service),
});
