import type { ServiceDetail } from "@/sections/services/serviceData";

/** Builds head() metadata for a service page. */
export function serviceHead(service: ServiceDetail) {
  const title = `${service.title} — ${service.company} | Shield Global Group`;
  return {
    meta: [
      { title },
      { name: "description", content: service.seoDescription },
      { property: "og:title", content: title },
      { property: "og:description", content: service.seoDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: service.slug },
      { property: "og:image", content: service.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: service.heroImage },
    ],
    links: [{ rel: "canonical", href: service.slug }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
            { "@type": "ListItem", position: 3, name: service.title, item: service.slug },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          provider: { "@type": "Organization", name: service.company },
          description: service.seoDescription,
        }),
      },
    ],
  };
}
