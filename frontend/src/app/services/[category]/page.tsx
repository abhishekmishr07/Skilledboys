import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Sparkles,
  ChevronRight,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import {
  SITE_URL,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const NCR_CITIES = [
  { slug: "noida", name: "Noida" },
  { slug: "greater-noida", name: "Greater Noida" },
  { slug: "delhi", name: "Delhi" },
  { slug: "gurgaon", name: "Gurgaon" },
  { slug: "ghaziabad", name: "Ghaziabad" },
  { slug: "faridabad", name: "Faridabad" },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryTitle = slugToTitle(category);

  const title = `Top Verified ${categoryTitle}s in Delhi NCR`;
  const description = `Find verified local ${categoryTitle.toLowerCase()} professionals in Noida, Greater Noida, Ghaziabad, Delhi and Gurgaon. Direct calling with zero commission on SkilledBoys.`;
  const canonicalUrl = `${SITE_URL}/services/${category}`;

  return {
    title,
    description,
    keywords: [
      `${categoryTitle.toLowerCase()} near me`,
      `hire ${categoryTitle.toLowerCase()} delhi ncr`,
      `verified ${categoryTitle.toLowerCase()}`,
      `best ${categoryTitle.toLowerCase()} in noida`,
      `best ${categoryTitle.toLowerCase()} in greater noida`,
      `skilledboys ${categoryTitle.toLowerCase()}`,
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
          alt: `${categoryTitle} Services - SkilledBoys`,
        },
      ],
    },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryTitle = slugToTitle(category);

  const matchedCategory = CATEGORIES.find(
    (c) =>
      c.category.toLowerCase() === category.toLowerCase() ||
      c.id.toLowerCase() === category.toLowerCase()
  );

  let workers: any[] = [];
  try {
    const res = await fetch(
      `https://skilledboys.onrender.com/api/workers?category=${encodeURIComponent(
        matchedCategory ? matchedCategory.category : categoryTitle
      )}`,
      { next: { revalidate: 300 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        workers = data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch category workers:", err);
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/categories" },
    { name: categoryTitle, url: `/services/${category}` },
  ]);


  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
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
            <li className="text-gray-900 font-bold">{categoryTitle}</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-soft mb-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Service Hub</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Verified {categoryTitle} Services in Delhi NCR
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Find and hire skilled, verified {categoryTitle.toLowerCase()}s directly. 
              No third-party commissions, transparent rates, and same-day home visits across Delhi NCR.
            </p>
          </div>

          {/* City Quick Filter Bar */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Browse {categoryTitle}s by City:
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {NCR_CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/${category}/${c.slug}`}
                  className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-brand-600 text-brand-700 hover:text-white transition text-xs font-bold border border-purple-100"
                >
                  {categoryTitle} in {c.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Workers List */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Top Rated {categoryTitle}s
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                {workers.length} active verified professionals ready to assist you.
              </p>
            </div>
          </div>

          {workers.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-soft">
              <p className="text-3xl mb-2">🧑‍🔧</p>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Looking for a {categoryTitle}?
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Browse our complete worker directory to find available professionals across all nearby cities.
              </p>
              <Link
                href="/find-workers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition"
              >
                Browse All Workers
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
                        <span className="text-gray-400">Hours:</span>
                        <span className="font-semibold text-gray-800">
                          {w.startTime || "09:00"} - {w.endTime || "18:00"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-semibold text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Available
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

      </div>
    </div>
  );
}
