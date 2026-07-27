import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { AboutPage } from "@/pages/AboutPage";

export const Route = createFileRoute("/about-us")({
  component: AboutRoute,
  head: () => ({
    meta: [
      { title: "About Us — Shield Global Group" },
      {
        name: "description",
        content:
          "Shield Global Group — The Power of One. A diversified conglomerate uniting overseas recruitment, workforce solutions, AI-powered industrial automation and media & entertainment.",
      },
      { property: "og:title", content: "About Us — Shield Global Group" },
      {
        property: "og:description",
        content:
          "Uniting human potential, technological intelligence and creative storytelling into a single, synchronised ecosystem.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about-us" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about-us" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "About Us", item: "/about-us" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Shield Global Group",
          url: "/",
          slogan: "The Power of One",
          description:
            "A diversified conglomerate uniting overseas recruitment, workforce solutions, industrial automation and media & entertainment.",
          subOrganization: [
            { "@type": "Organization", name: "Shield Global HR Solutions" },
            { "@type": "Organization", name: "Shield Workforce Solutions" },
            { "@type": "Organization", name: "InfiCorp Technology" },
            { "@type": "Organization", name: "Cineglare Entertainment" },
          ],
        }),
      },
    ],
  }),
});

function AboutRoute() {
  return (
    <MainLayout>
      <AboutPage />
    </MainLayout>
  );
}