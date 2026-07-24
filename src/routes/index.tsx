import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shield Global Group" },
      {
        name: "description",
        content:
          "Shield Global Group — connecting talent, technology and entertainment across manpower, workforce solutions, industrial automation, and media.",
      },
      { property: "og:title", content: "Shield Global Group" },
      {
        property: "og:description",
        content:
          "Shield Global Group — connecting talent, technology and entertainment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  // Sections will be added in later phases. Header/Navbar only for now.
  return <MainLayout>{null}</MainLayout>;
}
