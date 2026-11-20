import { Metadata } from "next";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & Customer Support",
  description:
    "Have questions or need assistance? Reach SkilledBoys support via WhatsApp (+91-8176033198), email (skilledboyss@gmail.com), or submit an inquiry. Based in Greater Noida, UP.",
  keywords: [
    "contact skilledboys",
    "skilledboys support",
    "skilledboys phone number",
    "skilledboys whatsapp",
    "skilledboys office greater noida",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact SkilledBoys | Customer Support & Worker Helpdesk",
    description:
      "Get in touch with the SkilledBoys team. 24/7 WhatsApp support and fast response for households and skilled workers.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact & Support", url: "/contact" },
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
