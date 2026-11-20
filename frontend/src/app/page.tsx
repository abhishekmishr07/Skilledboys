import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { RateCardSection } from "@/components/home/RateCardSection";
import { Testimonials } from "@/components/home/Testimonials";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake,
  MapPin,
  HelpCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  generateFAQSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo";

const HOME_FAQS = [
  {
    question: "How does SkilledBoys work for hiring local experts?",
    answer:
      "SkilledBoys connects you directly with verified local service professionals like electricians, plumbers, carpenters, cooks, and cleaners. Simply search by service and locality (e.g., Electrician in Noida), browse profiles, and call or message them on WhatsApp directly. No intermediaries, no booking fees.",
  },
  {
    question: "Is there any commission or booking fee charged by SkilledBoys?",
    answer:
      "No. SkilledBoys is 100% free for customers and charges zero commission to workers. You negotiate rates and pay the professional directly, ensuring total transparency and affordable pricing.",
  },
  {
    question: "Which areas in Delhi NCR are covered by SkilledBoys?",
    answer:
      "SkilledBoys has active service professionals across Noida, Greater Noida, Ghaziabad, Delhi, Gurgaon, and Faridabad, covering major residential sectors, society high-rises, and commercial hubs.",
  },
  {
    question: "How are workers verified on SkilledBoys?",
    answer:
      "Workers provide contact numbers, work experience, skill credentials, and live availability. Ratings and reviews from real local customers keep the community reliable and trustworthy.",
  },
  {
    question: "How can skilled professionals register on SkilledBoys?",
    answer:
      "Skilled workers can join in under 2 minutes by clicking 'Register as Pro', selecting their trade (Electrician, Plumber, Painter, etc.), entering their service city, and setting their working hours. Registration is completely free.",
  },
];

const LOCAL_HUBS = [
  {
    city: "Noida",
    slug: "noida",
    services: [
      { name: "Electrician in Noida", path: "/services/electrician/noida" },
      { name: "Plumber in Noida", path: "/services/plumber/noida" },
      { name: "Carpenter in Noida", path: "/services/carpenter/noida" },
      { name: "Cook in Noida", path: "/services/cook/noida" },
      { name: "House Cleaning Noida", path: "/services/cleaner/noida" },
      { name: "Painter in Noida", path: "/services/painter/noida" },
    ],
  },
  {
    city: "Greater Noida",
    slug: "greater-noida",
    services: [
      { name: "Electrician in Greater Noida", path: "/services/electrician/greater-noida" },
      { name: "Plumber in Greater Noida", path: "/services/plumber/greater-noida" },
      { name: "Cook in Greater Noida", path: "/services/cook/greater-noida" },
      { name: "Maid in Greater Noida", path: "/services/maid/greater-noida" },
      { name: "Driver in Greater Noida", path: "/services/driver/greater-noida" },
      { name: "Painter in Greater Noida", path: "/services/painter/greater-noida" },
    ],
  },
  {
    city: "Delhi",
    slug: "delhi",
    services: [
      { name: "Electrician in Delhi", path: "/services/electrician/delhi" },
      { name: "Plumber in Delhi", path: "/services/plumber/delhi" },
      { name: "Painter in Delhi", path: "/services/painter/delhi" },
      { name: "Cook / Chef in Delhi", path: "/services/cook/delhi" },
      { name: "House Cleaning Delhi", path: "/services/cleaner/delhi" },
      { name: "Carpenter in Delhi", path: "/services/carpenter/delhi" },
    ],
  },
  {
    city: "Ghaziabad & Gurgaon",
    slug: "ghaziabad",
    services: [
      { name: "Electrician in Ghaziabad", path: "/services/electrician/ghaziabad" },
      { name: "Plumber in Ghaziabad", path: "/services/plumber/ghaziabad" },
      { name: "Electrician in Gurgaon", path: "/services/electrician/gurgaon" },
      { name: "House Cleaner Gurgaon", path: "/services/cleaner/gurgaon" },
      { name: "Painter in Gurgaon", path: "/services/painter/gurgaon" },
      { name: "Plumber in Faridabad", path: "/services/plumber/faridabad" },
    ],
  },
];

export default function HomePage() {
  const faqSchema = generateFAQSchema(HOME_FAQS);
  const localBizSchema = generateLocalBusinessSchema({
    name: "SkilledBoys Delhi NCR",
    city: "Delhi NCR",
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Homepage JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Counter Section */}
      <StatsSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Category Carousel Section */}
      <CategoryCarousel />

      {/* Indicative Rate Benchmark Section */}
      <RateCardSection />

      {/* Value Proposition Highlights */}
      <section className="py-20 bg-gradient-to-br from-brand-900 via-purple-950 to-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/60 border border-purple-700/50 px-3.5 py-1.5 rounded-full">
              Why SkilledBoys
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight">
              A Transparent Marketplace Built on Trust
            </h2>
            <p className="text-purple-200 text-base mt-2">
              We eliminate third-party agency cuts and connect you directly with hard-working local experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Zero Commission</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                Customers pay zero booking fees, and workers keep 100% of their hard-earned money. Direct calling with no middlemen.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Response</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                Emergency leakage or power trip? Our real-time status indicator shows workers who are on duty right now in your area.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-6">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Empowering Local Pros</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                We empower skilled workers with an online presence, verified credentials, and steady direct leads from households.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Local SEO Service Coverage Hub */}
      <section className="py-20 bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-white px-3 py-1 rounded-full border border-purple-100 shadow-xs">
              Local Service Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
              Local Home Services Across Delhi NCR
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Quick access to top verified service professionals in your city and nearby neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCAL_HUBS.map((hub) => (
              <div
                key={hub.city}
                className="bg-white rounded-3xl p-6 border border-gray-100/90 shadow-soft"
              >
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <MapPin className="h-4 w-4 text-brand-600" />
                  <h3 className="font-black text-gray-900 text-base">
                    {hub.city}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {hub.services.map((srv) => (
                    <li key={srv.path}>
                      <Link
                        href={srv.path}
                        className="text-xs font-medium text-gray-600 hover:text-brand-600 transition flex items-center justify-between group"
                      >
                        <span>{srv.name}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400 group-hover:translate-x-0.5 group-hover:text-brand-600 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Homepage SEO FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Clear & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5">
              Everything you need to know about finding and hiring local professionals on SkilledBoys.
            </p>
          </div>

          <div className="space-y-4">
            {HOME_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-purple-200 transition"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Are You a Skilled Professional?
              </h2>
              <p className="text-purple-100 text-base leading-relaxed">
                Join thousands of verified electricians, plumbers, cooks, and cleaners getting direct daily client calls on SkilledBoys.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/worker-register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-700 font-bold text-base hover:bg-gray-100 shadow-lg transition active:scale-95"
              >
                <span>Register for Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/find-workers"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition active:scale-95"
              >
                Find Workers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
