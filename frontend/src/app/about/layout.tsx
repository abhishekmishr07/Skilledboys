import { Metadata } from "next";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us – Empowering Local Workers & Households",
  description:
    "Learn about SkilledBoys, founded by Abhishek Mishra in Greater Noida. We are on a mission to organize local skilled trades in India with zero commission and direct customer connect.",
  keywords: [
    "about skilledboys",
    "skilledboys founder",
    "abhishek mishra",
    "local worker network india",
    "zero commission home services",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About SkilledBoys – Bridging Customers & Workers with Trust",
    description:
      "Our mission is to empower local trade professionals with an online presence while giving households instant, commission-free access to trusted help.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
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
