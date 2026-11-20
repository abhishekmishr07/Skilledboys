import { Metadata } from "next";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Find Verified Skilled Workers Near You | SkilledBoys",
  description:
    "Browse over 500+ verified electricians, plumbers, carpenters, cooks, cleaners, and painters across Noida, Greater Noida, Ghaziabad, and Delhi NCR. Direct call, zero commission.",
  keywords: [
    "find workers near me",
    "hire skilled workers",
    "electrician near me",
    "plumber near me",
    "cook in noida",
    "maid in noida",
    "verified home services",
    "skilledboys directory",
  ],
  alternates: {
    canonical: `${SITE_URL}/find-workers`,
  },
  openGraph: {
    title: "Find Verified Skilled Workers Near You | SkilledBoys",
    description:
      "Directly connect with 500+ verified local service experts in Delhi NCR. Upfront pricing and zero platform booking fee.",
    url: `${SITE_URL}/find-workers`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/skilledboyslogo1.png`,
        width: 800,
        height: 600,
        alt: "Find Workers on SkilledBoys",
      },
    ],
  },
};

export default function FindWorkersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Find Workers", url: "/find-workers" },
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
