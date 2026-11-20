import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ToastProvider } from "@/components/ui/Toast";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SkilledBoys: Verified Home Services & Local Experts in Delhi NCR",
    template: "%s | SkilledBoys",
  },
  description:
    "Hire verified electricians, plumbers, carpenters, cooks & cleaners across Delhi NCR. Call or WhatsApp local technicians directly with 0% commission & fair rates.",
  keywords: [
    "electrician near me",
    "plumber near me",
    "electrician in noida",
    "plumber in greater noida",
    "carpenter near me",
    "painter in delhi ncr",
    "maid services in noida",
    "cook for home in noida",
    "home cleaning services gurgaon",
    "local skilled workers delhi ncr",
    "hire electrician ghaziabad",
    "ac repair technician near me",
    "hire workers india",
    "skilledboys",
  ],
  authors: [{ name: "SkilledBoys Team", url: SITE_URL }],
  creator: "Abhishek Mishra",
  publisher: "SkilledBoys",
  applicationName: "SkilledBoys",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/skilledboyslogo1.png",
    shortcut: "/images/skilledboyslogo1.png",
    apple: "/images/skilledboyslogo1.png",
  },
  openGraph: {
    title: "SkilledBoys: Verified Home Services & Local Experts in Delhi NCR",
    description:
      "Hire verified electricians, plumbers, carpenters, cooks & cleaners across Delhi NCR. Call or WhatsApp local technicians directly with 0% commission & fair rates.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SkilledBoys - Verified Home Services & Local Experts in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkilledBoys: Verified Home Services & Local Experts in Delhi NCR",
    description:
      "Hire verified electricians, plumbers, carpenters, cooks & cleaners across Delhi NCR. Call or WhatsApp local technicians directly with 0% commission & fair rates.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@skilledboys",
  },
  verification: {
    google: "o_w-T53iexp3HdaruFazxzNJXw6TOJe2ZFd9wNUG6Oo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="o_w-T53iexp3HdaruFazxzNJXw6TOJe2ZFd9wNUG6Oo"
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* WebSite & SearchAction Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />

        {/* Google Analytics 4 (when configured) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-gray-900 bg-white">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ToastProvider>
      </body>
    </html>
  );
}
