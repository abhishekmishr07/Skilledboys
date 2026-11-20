import { Metadata } from "next";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Service Categories | Verified Local Experts in Delhi NCR",
  description:
    "Browse 18+ verified trade categories across Delhi NCR. Directly connect with electricians, plumbers, carpenters, cooks & cleaners with 0% commission.",
  keywords: [
    "service categories",
    "home services list delhi ncr",
    "electrician plumber carpenter services",
    "hire local tradesmen noida",
    "skilledboys categories",
  ],
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: "All Service Categories | SkilledBoys Verified Home Services",
    description:
      "Browse 18+ verified trade categories across Delhi NCR. Directly connect with electricians, plumbers, carpenters, cooks & cleaners with 0% commission.",
    url: `${SITE_URL}/categories`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Service Categories | SkilledBoys Verified Home Services",
    description:
      "Browse 18+ verified trade categories across Delhi NCR. Directly connect with electricians, plumbers, carpenters, cooks & cleaners with 0% commission.",
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
