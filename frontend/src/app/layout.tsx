import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.skilledboys.com"),
  title: "SkilledBoys – Connecting Local Experts in One Click",
  description:
    "Find trusted electricians, plumbers, cleaners, carpenters, drivers, and other verified skilled professionals near you across India for free.",
  keywords: [
    "SkilledBoys",
    "electrician",
    "plumber",
    "carpenter",
    "cleaner",
    "cook",
    "local services",
    "hire workers",
    "India",
  ],
  authors: [{ name: "SkilledBoys Team" }],
  icons: {
    icon: "/images/skilledboyslogo1.png",
    shortcut: "/images/skilledboyslogo1.png",
    apple: "/images/skilledboyslogo1.png",
  },
  openGraph: {
    title: "SkilledBoys – Connecting Local Experts in One Click",
    description:
      "Connect directly with trusted local service professionals across India — simply, quickly and for free.",
    url: "https://skilledboys.com",
    siteName: "SkilledBoys",
    images: [
      {
        url: "/images/skilledboyslogo1.png",
        width: 800,
        height: 600,
        alt: "SkilledBoys Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased">
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
