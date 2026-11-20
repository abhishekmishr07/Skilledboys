import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  PhoneCall,
  Clock,
  Sparkles,
  ChevronRight,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import {
  SITE_URL,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{
    category: string;
    city: string;
  }>;
}

// Helpers to format slug
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const CITY_DETAILS: Record<
  string,
  { name: string; state: string; popularAreas: string[] }
> = {
  noida: {
    name: "Noida",
    state: "Uttar Pradesh",
    popularAreas: ["Sector 18", "Sector 62", "Sector 137", "Sector 76", "Noida Expressway"],
  },
  "greater-noida": {
    name: "Greater Noida",
    state: "Uttar Pradesh",
    popularAreas: ["Pari Chowk", "Alpha 1", "Beta 2", "Knowledge Park", "Gaur City"],
  },
  delhi: {
    name: "Delhi",
    state: "Delhi NCR",
    popularAreas: ["South Delhi", "Dwarka", "Rohini", "Laxmi Nagar", "Saket"],
  },
  gurgaon: {
    name: "Gurgaon",
    state: "Haryana",
    popularAreas: ["Cyber City", "Golf Course Road", "Sohna Road", "Sector 56", "DLF Phase 1-5"],
  },
  ghaziabad: {
    name: "Ghaziabad",
    state: "Uttar Pradesh",
    popularAreas: ["Indirapuram", "Vaishali", "Crossings Republik", "Vasundhara", "Raj Nagar"],
  },
  faridabad: {
    name: "Faridabad",
    state: "Haryana",
    popularAreas: ["Sector 15", "Sector 21", "NIT", "Neharpar", "Green Field Colony"],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, city } = await params;
  const categoryTitle = slugToTitle(category);
  const cityInfo = CITY_DETAILS[city.toLowerCase()];
  const cityName = cityInfo ? cityInfo.name : slugToTitle(city);

  const title = `Best ${categoryTitle}s in ${cityName} | Verified Local Experts | SkilledBoys`;
  const description = `Looking for trusted ${categoryTitle.toLowerCase()} services in ${cityName}? Find verified local professionals for same-day home visits. Direct calling with 0% commission on SkilledBoys.`;
  const canonicalUrl = `${SITE_URL}/services/${category}/${city}`;

  return {
    title,
    description,
    keywords: [
      `${categoryTitle.toLowerCase()} in ${cityName}`,
      `best ${categoryTitle.toLowerCase()} ${cityName}`,
      `${categoryTitle.toLowerCase()} near me`,
      `hire ${categoryTitle.toLowerCase()} ${cityName}`,
      `emergency ${categoryTitle.toLowerCase()} in ${cityName}`,
      `skilledboys ${cityName}`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/skilledboyslogo1.png`,
          width: 800,
          height: 600,
          alt: `${categoryTitle} in ${cityName} - SkilledBoys`,
        },
      ],
    },
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { category, city } = await params;
  const categoryTitle = slugToTitle(category);
  const cityInfo = CITY_DETAILS[city.toLowerCase()] || {
    name: slugToTitle(city),
    state: "Delhi NCR",
    popularAreas: ["Main City Area", "Sector Hubs", "Residential Enclaves"],
  };
  const cityName = cityInfo.name;

  // Matching category from constants
  const matchedCategory = CATEGORIES.find(
    (c) =>
      c.category.toLowerCase() === category.toLowerCase() ||
      c.id.toLowerCase() === category.toLowerCase()
  );

  // Fetch live workers for this category and location
  let workers: any[] = [];
  try {
    const res = await fetch(
      `https://skilledboys.onrender.com/api/workers?category=${encodeURIComponent(
        matchedCategory ? matchedCategory.category : categoryTitle
      )}&location=${encodeURIComponent(cityName)}`,
      { next: { revalidate: 300 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        workers = data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch location workers:", err);
  }

  // Structured Data Schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/categories" },
    { name: categoryTitle, url: `/services/${category}` },
    { name: cityName, url: `/services/${category}/${city}` },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema({
    name: `${categoryTitle} Services in ${cityName}`,
    category: categoryTitle,
    city: cityName,
    description: `Connect directly with verified ${categoryTitle.toLowerCase()} professionals in ${cityName}. Same-day visit, direct WhatsApp/call, and zero platform commission.`,
  });

  const faqs = [
    {
      question: `How do I hire a verified ${categoryTitle.toLowerCase()} in ${cityName}?`,
      answer: `Search on SkilledBoys, select your preferred ${categoryTitle.toLowerCase()} in ${cityName}, check their experience and rating, and call them directly or message them on WhatsApp with zero intermediary fees.`,
    },
    {
      question: `Are there any commission or booking charges for ${categoryTitle.toLowerCase()} services in ${cityName}?`,
      answer: `No. SkilledBoys is completely free for customers. You negotiate and pay the service professional directly with 100% transparency.`,
    },
    {
      question: `Which sectors and areas of ${cityName} are covered?`,
      answer: `SkilledBoys covers all key localities in ${cityName} including ${cityInfo.popularAreas.join(
        ", "
      )} and adjacent residential neighborhoods.`,
    },
    {
      question: `Can I get emergency same-day ${categoryTitle.toLowerCase()} service in ${cityName}?`,
      answer: `Yes. Look for professionals marked "Available Now" with live working status for immediate response and emergency visits.`,
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <li>
              <Link href="/" className="hover:text-brand-600 transition">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 text-gray-400" />
            </li>
            <li>
              <Link href="/categories" className="hover:text-brand-600 transition">
                Services
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 text-gray-400" />
            </li>
            <li className="text-gray-900 font-bold">
              {categoryTitle} in {cityName}
            </li>
          </ol>
        </nav>

        {/* Page Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-soft mb-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Verified Local Service • {cityName}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Best Verified {categoryTitle} in {cityName}
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Find reliable, background-verified {categoryTitle.toLowerCase()} professionals across {cityName}. 
              Connect directly on call or WhatsApp with zero middleman commissions and clear, upfront pricing.
            </p>

            {/* Quick Benefits Bar */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Zero Commission Fee
              </span>
              <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-100">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Same-Day Emergency Visit
              </span>
              <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Direct WhatsApp Booking
              </span>
            </div>
          </div>
        </div>

        {/* Live Workers List in this city */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Available {categoryTitle}s in {cityName}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                Showing {workers.length} active verified professionals serving {cityName}.
              </p>
            </div>
            <Link
              href={`/results?category=${encodeURIComponent(categoryTitle)}&location=${encodeURIComponent(cityName)}`}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
            >
              <span>View full directory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {workers.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-soft">
              <p className="text-3xl mb-2">🧑‍🔧</p>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Looking for a {categoryTitle} in {cityName}?
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                We have verified experts on standby across neighboring sectors. Click below to browse all nearby service providers.
              </p>
              <Link
                href={`/find-workers?category=${encodeURIComponent(categoryTitle)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition"
              >
                Browse All Nearby {categoryTitle}s
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.slice(0, 9).map((w) => (
                <div
                  key={w._id || w.id}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-700 text-[11px] font-bold mb-1.5">
                          {w.category}
                        </span>
                        <h3 className="text-lg font-black text-gray-900 leading-snug">
                          {w.name}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{w.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-amber-900">
                          {w.rating || 4.8}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-600 mb-5 pt-3 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Experience:</span>
                        <span className="font-semibold text-gray-800">
                          {w.experience ? `${w.experience} yrs` : "Experienced"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Available Hours:</span>
                        <span className="font-semibold text-gray-800">
                          {w.startTime || "09:00"} - {w.endTime || "18:00"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-semibold text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Available in {cityName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                    <Link
                      href={`/workers/${w._id || w.id}`}
                      className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs text-center transition"
                    >
                      View Profile
                    </Link>
                    <a
                      href={`tel:${w.phone || w.number || "8176033198"}`}
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs text-center inline-flex items-center justify-center gap-1 transition"
                    >
                      <PhoneCall className="h-3 w-3" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Local Popular Areas Covered in this City */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-soft mb-12">
          <h2 className="text-xl font-black text-gray-900 mb-2">
            Localities Covered in {cityName} for {categoryTitle} Services
          </h2>
          <p className="text-xs text-gray-500 mb-5">
            Our network of verified service professionals serves residential societies, commercial sectors, and independent homes across:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {cityInfo.popularAreas.map((area) => (
              <span
                key={area}
                className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-gray-800 text-xs font-semibold border border-purple-100"
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ Section) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-soft mb-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-purple-50 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
              Frequently Asked Questions about {categoryTitle} in {cityName}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-start gap-2.5">
                  <HelpCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 pl-6.5 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Cities Internal Linking Mesh */}
        <div className="p-8 rounded-3xl bg-purple-50/70 border border-purple-100/80">
          <h2 className="text-lg font-black text-gray-900 mb-2">
            Looking for {categoryTitle} in Other Delhi NCR Cities?
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            SkilledBoys also connects you with top-rated professionals in nearby locations:
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CITY_DETAILS)
              .filter(([cKey]) => cKey !== city.toLowerCase())
              .map(([cKey, cVal]) => (
                <Link
                  key={cKey}
                  href={`/services/${category}/${cKey}`}
                  className="px-3.5 py-1.5 rounded-xl bg-white text-brand-700 hover:bg-brand-600 hover:text-white transition text-xs font-bold shadow-xs border border-purple-100"
                >
                  {categoryTitle} in {cVal.name} →
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
