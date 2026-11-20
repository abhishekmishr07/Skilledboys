import { Metadata } from "next";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Service Areas & Cities Covered",
  description:
    "SkilledBoys connects households with verified local experts across Noida, Greater Noida, Delhi, Gurgaon, Ghaziabad, and Faridabad. Check active service coverage.",
  keywords: [
    "service areas delhi ncr",
    "electrician in noida",
    "plumber in greater noida",
    "home services ghaziabad",
    "local workers delhi",
  ],
  alternates: {
    canonical: `${SITE_URL}/areas`,
  },
  openGraph: {
    title: "Service Areas & Cities Covered | SkilledBoys",
    description:
      "Find verified local service professionals in Noida, Greater Noida, Delhi, Gurgaon, Ghaziabad, and Faridabad.",
    url: `${SITE_URL}/areas`,
    type: "website",
  },
};

export default function AreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/areas" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {children}
    </>
  );
}
