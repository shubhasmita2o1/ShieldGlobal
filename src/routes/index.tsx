import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { HomeHero } from "@/sections/home/HomeHero";
import { BrandStrip } from "@/sections/home/BrandStrip";
import { HomeAbout } from "@/sections/home/HomeAbout";
import { JourneyTimeline } from "@/sections/home/JourneyTimeline";
import { GlobalPresence } from "@/sections/GlobalPresence";
import { Testimonials } from "@/sections/home/Testimonials";
import { Achievements } from "@/sections/home/Achievements";
import { Partners } from "@/sections/home/Partners";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shield Global Group — Talent, Technology & Entertainment" },
      {
        name: "description",
        content:
          "Shield Global Group — connecting talent, technology and entertainment across manpower, workforce solutions, industrial automation, and media.",
      },
      {
        property: "og:title",
        content: "Shield Global Group — Talent, Technology & Entertainment",
      },
      {
        property: "og:description",
        content:
          "Shield Global Group — connecting talent, technology and entertainment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <MainLayout>
      <HomeHero />
      <BrandStrip />
      <HomeAbout />
      <JourneyTimeline />
      <Achievements />
      <Testimonials />
      <Partners />
      <GlobalPresence />
    </MainLayout>
  );
}
