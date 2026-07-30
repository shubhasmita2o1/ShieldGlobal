import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { GroupOfCompaniesPage } from "@/pages/GroupOfCompaniesPage";

export const Route = createFileRoute("/group-of-companies")({
  component: CompaniesRoute,
  head: () => ({
    meta: [
      { title: "Group of Companies — Shield Global Group" },
      {
        name: "description",
        content:
          "Explore the Shield Global Group companies: Shield Global HR Solutions, Shield Workforce Solutions, InfiCorp Technology and Cineglare Entertainment.",
      },
      { property: "og:title", content: "Group of Companies — Shield Global Group" },
      {
        property: "og:description",
        content:
          "Four specialised companies delivering recruitment, workforce solutions, AI automation and media under one identity.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/group-of-companies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/group-of-companies" }],
  }),
});

function CompaniesRoute() {
  return (
    <MainLayout>
      <GroupOfCompaniesPage />
    </MainLayout>
  );
}