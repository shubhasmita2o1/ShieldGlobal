import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { ServicePage } from "@/sections/services/ServicePage";
import { getService } from "@/sections/services/serviceData";
import { serviceHead } from "@/lib/service-head";

const service = getService("/services/staffing-workforce-solutions");

export const Route = createFileRoute("/services/staffing-workforce-solutions")({
  component: () => (
    <MainLayout>
      <ServicePage service={service} />
    </MainLayout>
  ),
  head: () => serviceHead(service),
});
