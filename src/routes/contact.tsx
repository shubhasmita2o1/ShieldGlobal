import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { ContactPage } from "@/pages/ContactPage";

const TITLE = "Contact Us — Shield Global Group";
const DESCRIPTION =
  "Contact Shield Global Group in Mumbai for overseas recruitment, workforce solutions, AI-powered industrial automation and media & entertainment enquiries.";

export const Route = createFileRoute("/contact")({
  component: ContactRoute,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "/contact" },
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
          email: "info@shieldglobalindia.com",
          telephone: "+22 2235056652",
          address: {
            "@type": "PostalAddress",
            streetAddress: "104, Hinal Residency, Dahanukarwadi Junction, Kandivali West",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400067",
            addressCountry: "IN",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "info@shieldglobalindia.com",
              telephone: "+22 28678678",
              availableLanguage: ["English", "Hindi"],
            },
          ],
        }),
      },
    ],
  }),
});

function ContactRoute() {
  return (
    <MainLayout>
      <ContactPage />
    </MainLayout>
  );
}