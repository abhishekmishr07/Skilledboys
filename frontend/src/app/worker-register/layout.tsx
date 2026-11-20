import { Metadata } from "next";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Register as a Worker / Professional – Join for Free | SkilledBoys",
  description:
    "Are you an electrician, plumber, carpenter, cook, cleaner, or painter? Register on SkilledBoys for free and get direct customer leads across Delhi NCR with zero commission fees.",
  keywords: [
    "register as electrician",
    "worker registration online",
    "electrician jobs noida",
    "plumber jobs greater noida",
    "join skilled worker platform",
    "skilledboys register",
  ],
  alternates: {
    canonical: `${SITE_URL}/worker-register`,
  },
  openGraph: {
    title: "Register as a Worker / Professional – Join for Free | SkilledBoys",
    description:
      "Get daily customer calls in your neighborhood. 100% free registration, zero commission cuts.",
    url: `${SITE_URL}/worker-register`,
    type: "website",
  },
};

export default function WorkerRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Worker Registration", url: "/worker-register" },
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
