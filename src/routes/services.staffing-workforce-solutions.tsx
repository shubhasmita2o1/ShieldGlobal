import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { ServicesPage } from "@/pages/ServicesPage";
import { getService } from "@/sections/services/serviceData";
import { serviceHead } from "@/lib/service-head";

const service = getService("/services/staffing-workforce-solutions");

export const Route = createFileRoute("/services/staffing-workforce-solutions")({
  component: () => (
    <MainLayout>
      <ServicesPage service={service} />
    </MainLayout>
  ),
  head: () => serviceHead(service),
});