import { Metadata } from "next";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Service Categories | SkilledBoys Local Service Directory",
  description:
    "Explore all 18+ service categories on SkilledBoys: Electricians, Plumbers, Carpenters, Home Cleaners, Cooks, Painters, Drivers, and Wellness Pros across Delhi NCR.",
  keywords: [
    "service categories",
    "home services list",
    "electrician plumber carpenter services",
    "hire local tradesmen",
    "skilledboys categories",
  ],
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: "All Service Categories | SkilledBoys Local Service Directory",
    description:
      "Explore 18+ verified trade categories. Connect with local pros across Noida, Greater Noida, and Delhi NCR.",
    url: `${SITE_URL}/categories`,
    type: "website",
  },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
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
