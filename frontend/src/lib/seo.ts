export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilledboys.com";
export const SITE_NAME = "SkilledBoys";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/skilledboyslogo1.png`;

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Organization & WebSite JSON-LD Schema (Site-wide)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/skilledboyslogo1.png`,
      width: 512,
      height: 512,
      caption: "SkilledBoys Logo",
    },
    description:
      "India's transparent, commission-free platform connecting households with verified local service professionals including electricians, plumbers, carpenters, cooks, cleaners, and painters.",
    founder: {
      "@type": "Person",
      name: "Abhishek Mishra",
      url: "https://portfolio-abhishek-nu.vercel.app/",
    },
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-8176033198",
        contactType: "customer service",
        email: "skilledboyss@gmail.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      "https://wa.me/8176033198",
      "https://portfolio-abhishek-nu.vercel.app/",
    ],
  };
}

/**
 * WebSite & SearchAction Schema
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/results?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * LocalBusiness / ProfessionalService Schema for Local SEO
 */
export function generateLocalBusinessSchema({
  name = "SkilledBoys Local Service Network",
  category = "Home Services",
  city = "Delhi NCR",
  description = "Connect directly with verified local electricians, plumbers, cooks, carpenters, and technicians across Delhi NCR with zero commission fees.",
}: {
  name?: string;
  category?: string;
  city?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${name} in ${city}`,
    description,
    url: SITE_URL,
    telephone: "+91-8176033198",
    priceRange: "₹₹",
    image: `${SITE_URL}/images/skilledboyslogo1.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "Delhi NCR",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.4744",
      longitude: "77.5040",
    },
    areaServed: [
      { "@type": "City", name: "Noida" },
      { "@type": "City", name: "Greater Noida" },
      { "@type": "City", name: "Delhi" },
      { "@type": "City", name: "Gurgaon" },
      { "@type": "City", name: "Ghaziabad" },
      { "@type": "City", name: "Faridabad" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    serviceType: category,
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * FAQPage Schema for Rich Snippets in Google
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Worker Profile Person & LocalService Schema
 */
export function generateWorkerSchema(worker: {
  name: string;
  category: string;
  location: string;
  rating?: number;
  experience?: number;
  phone?: string;
  id: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: worker.name,
    jobTitle: `Verified ${worker.category}`,
    telephone: worker.phone ? `+91-${worker.phone}` : "+91-8176033198",
    url: `${SITE_URL}/workers/${worker.id}`,
    worksFor: {
      "@id": `${SITE_URL}/#organization`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: worker.location,
      addressCountry: "IN",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: `${worker.category} Professional Certification & Verification`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: worker.rating ? String(worker.rating) : "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "35",
    },
  };
}
